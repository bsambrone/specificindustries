import { NextRequest, NextResponse } from "next/server"
import { isValidSubdomain } from "@/sites/subdomains"

const PRODUCTION_HOST = "specificindustries.com"

function getSubdomain(request: NextRequest): string {
  const host = request.headers.get("host") || ""
  const url = request.nextUrl

  // In non-production, allow ?site= query param override
  if (!host.endsWith(PRODUCTION_HOST)) {
    const siteParam = url.searchParams.get("site")
    if (siteParam) return siteParam
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
  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|sites/).*)"],
}
