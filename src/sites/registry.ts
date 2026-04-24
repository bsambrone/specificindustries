import type { SiteModule } from "@/themes"
import { config as apexConfig, pages as apexPages, dynamicRoutes as apexDynamicRoutes } from "./apex"
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
import { config as squaredawayConfig, pages as squaredawayPages, dynamicRoutes as squaredawayDynamicRoutes } from "./squaredaway"
import { config as radiumroysConfig, pages as radiumroysPages, dynamicRoutes as radiumroysDynamicRoutes } from "./radiumroys"
import { config as mostlysterileConfig, pages as mostlysterilePages, dynamicRoutes as mostlysterileDynamicRoutes } from "./mostlysterile"
import { config as carterandfilsConfig, pages as carterandfilsPages, dynamicRoutes as carterandfilsDynamicRoutes } from "./carterandfils"
import { config as sovereignwellnessConfig, pages as sovereignwellnessPages, dynamicRoutes as sovereignwellnessDynamicRoutes } from "./sovereignwellness"
import { config as mehConfig, pages as mehPages, dynamicRoutes as mehDynamicRoutes } from "./meh"
import { config as superengineeredConfig, pages as superengineeredPages, dynamicRoutes as superengineeredDynamicRoutes } from "./superengineered"
import { config as privatrixConfig, pages as privatrixPages, dynamicRoutes as privatrixDynamicRoutes } from "./privatrix"
import { config as seeltiteConfig, pages as seeltitePages, dynamicRoutes as seeltiteDynamicRoutes } from "./seeltite"
import { config as whiskerworksConfig, pages as whiskerworksPages, dynamicRoutes as whiskerworksDynamicRoutes } from "./whiskerworks"
import { config as prechewedConfig, pages as prechewedPages, dynamicRoutes as prechewedDynamicRoutes } from "./prechewed"
import { config as chunkymilkConfig, pages as chunkymilkPages, dynamicRoutes as chunkymilkDynamicRoutes } from "./chunkymilk"
import { config as petjacksConfig, pages as petjacksPages, dynamicRoutes as petjacksDynamicRoutes } from "./petjacks"
import { config as thetheoryisrealConfig, pages as thetheoryisrealPages, dynamicRoutes as thetheoryisrealDynamicRoutes } from "./thetheoryisreal"
import { config as terrorclownConfig, pages as terrorclownPages, dynamicRoutes as terrorclownDynamicRoutes } from "./terrorclown"
import { config as carbonneutraloutrageConfig, pages as carbonneutraloutragePages, dynamicRoutes as carbonneutraloutrageDynamicRoutes } from "./carbonneutraloutrage"
import { config as pointlessmetricsConfig, pages as pointlessmetricsPages, dynamicRoutes as pointlessmetricsDynamicRoutes } from "./pointlessmetrics"
import { config as unmotivatorsConfig, pages as unmotivatorsPages, dynamicRoutes as unmotivatorsDynamicRoutes } from "./unmotivators"

export const siteRegistry: Record<string, SiteModule> = {
  apex: { config: apexConfig, pages: apexPages, dynamicRoutes: apexDynamicRoutes },
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
  squaredaway: { config: squaredawayConfig, pages: squaredawayPages, dynamicRoutes: squaredawayDynamicRoutes },
  radiumroys: { config: radiumroysConfig, pages: radiumroysPages, dynamicRoutes: radiumroysDynamicRoutes },
  mostlysterile: { config: mostlysterileConfig, pages: mostlysterilePages, dynamicRoutes: mostlysterileDynamicRoutes },
  carterandfils: { config: carterandfilsConfig, pages: carterandfilsPages, dynamicRoutes: carterandfilsDynamicRoutes },
  sovereignwellness: { config: sovereignwellnessConfig, pages: sovereignwellnessPages, dynamicRoutes: sovereignwellnessDynamicRoutes },
  meh: { config: mehConfig, pages: mehPages, dynamicRoutes: mehDynamicRoutes },
  superengineered: { config: superengineeredConfig, pages: superengineeredPages, dynamicRoutes: superengineeredDynamicRoutes },
  privatrix: { config: privatrixConfig, pages: privatrixPages, dynamicRoutes: privatrixDynamicRoutes },
  seeltite: { config: seeltiteConfig, pages: seeltitePages, dynamicRoutes: seeltiteDynamicRoutes },
  whiskerworks: { config: whiskerworksConfig, pages: whiskerworksPages, dynamicRoutes: whiskerworksDynamicRoutes },
  prechewed: { config: prechewedConfig, pages: prechewedPages, dynamicRoutes: prechewedDynamicRoutes },
  chunkymilk: { config: chunkymilkConfig, pages: chunkymilkPages, dynamicRoutes: chunkymilkDynamicRoutes },
  petjacks: { config: petjacksConfig, pages: petjacksPages, dynamicRoutes: petjacksDynamicRoutes },
  pointlessmetrics: { config: pointlessmetricsConfig, pages: pointlessmetricsPages, dynamicRoutes: pointlessmetricsDynamicRoutes },
  thetheoryisreal: { config: thetheoryisrealConfig, pages: thetheoryisrealPages, dynamicRoutes: thetheoryisrealDynamicRoutes },
  terrorclown: { config: terrorclownConfig, pages: terrorclownPages, dynamicRoutes: terrorclownDynamicRoutes },
  carbonneutraloutrage: { config: carbonneutraloutrageConfig, pages: carbonneutraloutragePages, dynamicRoutes: carbonneutraloutrageDynamicRoutes },
  unmotivators: { config: unmotivatorsConfig, pages: unmotivatorsPages, dynamicRoutes: unmotivatorsDynamicRoutes },
}

export type SubdomainKey = keyof typeof siteRegistry

export function isValidSubdomain(subdomain: string): boolean {
  return subdomain in siteRegistry
}
