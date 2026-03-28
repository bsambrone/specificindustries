import type { SiteModule } from "@/themes"
import { config as apexConfig, pages as apexPages } from "./apex"
import { config as pigmilkConfig, pages as pigmilkPages, dynamicRoutes as pigmilkDynamicRoutes } from "./pigmilk"
import { config as dehydratedwaterConfig, pages as dehydratedwaterPages, dynamicRoutes as dehydratedwaterDynamicRoutes } from "./dehydratedwater"

export const siteRegistry: Record<string, SiteModule> = {
  apex: { config: apexConfig, pages: apexPages },
  pigmilk: { config: pigmilkConfig, pages: pigmilkPages, dynamicRoutes: pigmilkDynamicRoutes },
  dehydratedwater: { config: dehydratedwaterConfig, pages: dehydratedwaterPages, dynamicRoutes: dehydratedwaterDynamicRoutes },
}

export type SubdomainKey = keyof typeof siteRegistry

export function isValidSubdomain(subdomain: string): boolean {
  return subdomain in siteRegistry
}
