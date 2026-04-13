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
import { config as snortablesConfig, pages as snortablesPages, dynamicRoutes as snortablesDynamicRoutes } from "./snortables"
import { config as mousetrapjengaConfig, pages as mousetrapjengaPages, dynamicRoutes as mousetrapjengaDynamicRoutes } from "./mousetrapjenga"
import { config as onlyfansConfig, pages as onlyfansPages, dynamicRoutes as onlyfansDynamicRoutes } from "./onlyfans"
import { config as onlypansConfig, pages as onlypansPages, dynamicRoutes as onlypansDynamicRoutes } from "./onlypans"
import { config as bonelesswaterConfig, pages as bonelesswaterPages, dynamicRoutes as bonelesswaterDynamicRoutes } from "./bonelesswater"
import { config as gristmillConfig, pages as gristmillPages, dynamicRoutes as gristmillDynamicRoutes } from "./gristmill"
import { config as oddoccasionsConfig, pages as oddoccasionsPages, dynamicRoutes as oddoccasionsDynamicRoutes } from "./oddoccasions"
import { config as pettentialConfig, pages as pettentialPages, dynamicRoutes as pettentialDynamicRoutes } from "./pettential"
import { config as rocksConfig, pages as rocksPages, dynamicRoutes as rocksDynamicRoutes } from "./rocks"

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
  snortables: { config: snortablesConfig, pages: snortablesPages, dynamicRoutes: snortablesDynamicRoutes },
  mousetrapjenga: { config: mousetrapjengaConfig, pages: mousetrapjengaPages, dynamicRoutes: mousetrapjengaDynamicRoutes },
  onlyfans: { config: onlyfansConfig, pages: onlyfansPages, dynamicRoutes: onlyfansDynamicRoutes },
  onlypans: { config: onlypansConfig, pages: onlypansPages, dynamicRoutes: onlypansDynamicRoutes },
  bonelesswater: { config: bonelesswaterConfig, pages: bonelesswaterPages, dynamicRoutes: bonelesswaterDynamicRoutes },
  gristmill: { config: gristmillConfig, pages: gristmillPages, dynamicRoutes: gristmillDynamicRoutes },
  oddoccasions: { config: oddoccasionsConfig, pages: oddoccasionsPages, dynamicRoutes: oddoccasionsDynamicRoutes },
  pettential: { config: pettentialConfig, pages: pettentialPages, dynamicRoutes: pettentialDynamicRoutes },
  rocks: { config: rocksConfig, pages: rocksPages, dynamicRoutes: rocksDynamicRoutes },
}

export type SubdomainKey = keyof typeof siteRegistry

export function isValidSubdomain(subdomain: string): boolean {
  return subdomain in siteRegistry
}
