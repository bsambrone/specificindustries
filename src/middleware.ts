import { NextRequest, NextResponse } from "next/server"
import { isValidSubdomain } from "@/sites/subdomains"

const PRODUCTION_HOST = "specificindustries.com"
const DEV_SITE_COOKIE = "dev-site"

function getSubdomain(request: NextRequest): string {
  const host = request.headers.get("host") || ""
  const url = request.nextUrl
  const isProduction = host.endsWith(PRODUCTION_HOST)

  if (!isProduction) {
    // Explicit ?site= wins in dev.
    const siteParam = url.searchParams.get("site")
    if (siteParam) return siteParam

    // Otherwise fall back to the sticky dev cookie so that internal <Link>
    // navigation (which drops the query string) still resolves correctly.
    const cookieSite = request.cookies.get(DEV_SITE_COOKIE)?.value
    if (cookieSite) return cookieSite
  }

  // Extract subdomain from host
  const hostname = host.split(":")[0] // Remove port
  if (hostname === PRODUCTION_HOST || hostname === "localhost") {
    return "apex"
  }

  // e.g., "pigmilk.specificindustries.com" → "pigmilk"
  const parts = hostname.split(".")
  if (parts.length > 2 && hostname.endsWith(PRODUCTION_HOST)) {
    return parts[0]
  }

  return "apex"
}

export function middleware(request: NextRequest) {
  const subdomain = getSubdomain(request)
  const host = request.headers.get("host") || ""
  const isProduction = host.endsWith(PRODUCTION_HOST)

  // Redirect www to apex
  if (subdomain === "www") {
    const url = request.nextUrl.clone()
    url.host = PRODUCTION_HOST
    url.port = ""
    return NextResponse.redirect(url, 302)
  }

  // Redirect unknown subdomains to apex
  if (subdomain !== "apex" && !isValidSubdomain(subdomain)) {
    return NextResponse.redirect(new URL(`https://${PRODUCTION_HOST}${request.nextUrl.pathname}`), 302)
  }

  // Set x-subdomain header on the request for downstream server components
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-subdomain", subdomain)
  const response = NextResponse.next({ request: { headers: requestHeaders } })

  // Dev-only: when ?site= is explicitly passed, stick the selected subdomain
  // into a cookie so that client-side <Link> navigation (which drops the
  // query string) continues to resolve to the same site. Passing
  // ?site=<other> or ?site=apex overwrites the cookie; clearing cookies
  // resets to default apex behavior.
  if (!isProduction && request.nextUrl.searchParams.has("site")) {
    response.cookies.set(DEV_SITE_COOKIE, subdomain, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    })
  }

  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|sites/).*)"],
}
