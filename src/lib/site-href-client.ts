"use client"

import { useEffect, useState } from "react"

/**
 * Client-side equivalent of getSiteHref. Reads ?site= from window.location and
 * appends it to internal links during local dev / preview deploys. In
 * production (real subdomains) it returns paths unchanged.
 */
export function useSiteHrefClient(): (path: string) => string {
  const [siteParam, setSiteParam] = useState<string | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setSiteParam(params.get("site"))
  }, [])

  return (path: string) => {
    if (!siteParam) return path
    const sep = path.includes("?") ? "&" : "?"
    return `${path}${sep}site=${siteParam}`
  }
}
