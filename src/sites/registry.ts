import type { SiteModule } from "@/themes"

// Sites will be added in later tasks. Middleware uses this to validate subdomains.
export const siteRegistry: Record<string, SiteModule> = {}

export type SubdomainKey = keyof typeof siteRegistry

export function isValidSubdomain(subdomain: string): boolean {
  return subdomain === "apex" || subdomain in siteRegistry
}
