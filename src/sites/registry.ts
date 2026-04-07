import type { SiteModule } from "@/themes"
import { config as apexConfig, pages as apexPages } from "./apex"
import { config as pigmilkConfig, pages as pigmilkPages, dynamicRoutes as pigmilkDynamicRoutes } from "./pigmilk"
import { config as dehydratedwaterConfig, pages as dehydratedwaterPages, dynamicRoutes as dehydratedwaterDynamicRoutes } from "./dehydratedwater"
import { config as inflatableanchorsConfig, pages as inflatableanchorsPages, dynamicRoutes as inflatableanchorsDynamicRoutes } from "./inflatableanchors"
import { config as strategicvoidConfig, pages as strategicvoidPages, dynamicRoutes as strategicvoidDynamicRoutes } from "./strategicvoid"
import { config as stratifyConfig, pages as stratifyPages, dynamicRoutes as stratifyDynamicRoutes } from "./stratify"
import { config as truegritConfig, pages as truegritPages, dynamicRoutes as truegritDynamicRoutes } from "./truegrit"
import { config as grassfedwifiConfig, pages as grassfedwifiPages, dynamicRoutes as grassfedwifiDynamicRoutes } from "./grassfedwifi"
import { config as elderpartyConfig, pages as elderpartyPages, dynamicRoutes as elderpartyDynamicRoutes } from "./elderparty"
import { config as cleansheetConfig, pages as cleansheetPages } from "./cleansheet"

export const siteRegistry: Record<string, SiteModule> = {
  apex: { config: apexConfig, pages: apexPages },
  pigmilk: { config: pigmilkConfig, pages: pigmilkPages, dynamicRoutes: pigmilkDynamicRoutes },
  dehydratedwater: { config: dehydratedwaterConfig, pages: dehydratedwaterPages, dynamicRoutes: dehydratedwaterDynamicRoutes },
  inflatableanchors: { config: inflatableanchorsConfig, pages: inflatableanchorsPages, dynamicRoutes: inflatableanchorsDynamicRoutes },
  strategicvoid: { config: strategicvoidConfig, pages: strategicvoidPages, dynamicRoutes: strategicvoidDynamicRoutes },
  stratify: { config: stratifyConfig, pages: stratifyPages, dynamicRoutes: stratifyDynamicRoutes },
  truegrit: { config: truegritConfig, pages: truegritPages, dynamicRoutes: truegritDynamicRoutes },
  grassfedwifi: { config: grassfedwifiConfig, pages: grassfedwifiPages, dynamicRoutes: grassfedwifiDynamicRoutes },
  elderparty: { config: elderpartyConfig, pages: elderpartyPages, dynamicRoutes: elderpartyDynamicRoutes },
  cleansheet: { config: cleansheetConfig, pages: cleansheetPages },
}

export type SubdomainKey = keyof typeof siteRegistry

export function isValidSubdomain(subdomain: string): boolean {
  return subdomain in siteRegistry
}
