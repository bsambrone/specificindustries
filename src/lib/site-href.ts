import { headers } from "next/headers"

const PRODUCTION_HOST = "specificindustries.com"

/**
 * Server-side equivalent of useSiteLink. Reads host + x-subdomain headers
 * and returns a function that appends ?site= to hrefs in dev mode.
 * In production (real subdomains), returns paths unchanged.
 */
export async function getSiteHref(): Promise<(path: string) => string> {
  const h = await headers()
  const host = h.get("host") || ""
  const subdomain = h.get("x-subdomain") || "apex"
  const isProduction = host.endsWith(PRODUCTION_HOST)

  return function siteHref(path: string): string {
    if (isProduction) return path
    const [pathWithoutHash, hash] = path.split("#")
    const separator = pathWithoutHash.includes("?") ? "&" : "?"
    const url = `${pathWithoutHash}${separator}site=${subdomain}`
    return hash ? `${url}#${hash}` : url
  }
}
