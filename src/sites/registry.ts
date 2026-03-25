import type { SiteModule } from "@/themes"
import { config as apexConfig, pages as apexPages } from "./apex"

export const siteRegistry: Record<string, SiteModule> = {
  apex: { config: apexConfig, pages: apexPages },
}

export type SubdomainKey = keyof typeof siteRegistry

export function isValidSubdomain(subdomain: string): boolean {
  return subdomain in siteRegistry
}
