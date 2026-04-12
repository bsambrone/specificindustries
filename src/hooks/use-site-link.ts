"use client"

import { useSearchParams } from "next/navigation"

/**
 * Returns a function that appends ?site= to hrefs in dev mode.
 * In production (real subdomains), this is a no-op.
 */
export function useSiteLink() {
  const searchParams = useSearchParams()
  const siteParam = searchParams.get("site")

  return function siteHref(path: string): string {
    if (!siteParam) return path
    const [pathWithoutHash, hash] = path.split("#")
    const separator = pathWithoutHash.includes("?") ? "&" : "?"
    const url = `${pathWithoutHash}${separator}site=${siteParam}`
    return hash ? `${url}#${hash}` : url
  }
}
