import type { MetadataRoute } from "next"
import { siteRegistry } from "@/sites/registry"
import { products as pigmilkProducts } from "@/sites/pigmilk/data/products"
import { products as dehydratedwaterProducts } from "@/sites/dehydratedwater/data/products"
import { products as inflatableanchorsProducts } from "@/sites/inflatableanchors/data/products"
import { products as truegritProducts } from "@/sites/truegrit/data/products"
import { products as elderpartyProducts } from "@/sites/elderparty/data/products"
import { coalitions } from "@/sites/elderparty/data/coalitions"
import { articles as elderpartyArticles } from "@/sites/elderparty/data/news"
import { products as snortablesProducts } from "@/sites/snortables/data/products"
import { products as mousetrapjengaProducts } from "@/sites/mousetrapjenga/data/products"
import { products as bonelesswaterProducts } from "@/sites/bonelesswater/data/products"
import { fans as onlyfansFans } from "@/sites/onlyfans/data/fans"
import { pans as onlypansPans } from "@/sites/onlypans/data/pans"
import { shares } from "@/sites/grassfedwifi/data/shares"
import { fieldNotes } from "@/sites/grassfedwifi/data/field-notes"
import { solutions as strategicvoidSolutions } from "@/sites/strategicvoid/data/solutions"
import { products as strategicvoidProducts } from "@/sites/strategicvoid/data/products"
import { caseStudies } from "@/sites/strategicvoid/data/case-studies"
import { whitepapers } from "@/sites/strategicvoid/data/whitepapers"
import { onboardingSteps } from "@/sites/stratify/data/onboarding"
import { arms as gristmillArms } from "@/sites/gristmill/data/arms"
import { services as gristmillServices } from "@/sites/gristmill/data/services"
import { caseStudies as gristmillCaseStudies } from "@/sites/gristmill/data/case-studies"
import { products as oddoccasionsProducts } from "@/sites/oddoccasions/data/products"
import { products as pettentialProducts } from "@/sites/pettential/data/products"
import { products as rocksProducts } from "@/sites/rocks/data/products"
import { products as radiumroysProducts } from "@/sites/radiumroys/data/products"
import { products as squaredawayProducts } from "@/sites/squaredaway/data/products"
import { products as mostlysterileProducts } from "@/sites/mostlysterile/data/products"
import { products as carterandfilsProducts } from "@/sites/carterandfils/data/products"
import { journalEntries as carterandfilsJournal } from "@/sites/carterandfils/data/journal"
import { products as mehProducts } from "@/sites/meh/data/products"
import { products as seeltiteProducts } from "@/sites/seeltite/data/products"
import { products as chunkymilkProducts } from "@/sites/chunkymilk/data/products"
import { products as terrorclownProducts } from "@/sites/terrorclown/data/products"
import { products as petjacksProducts } from "@/sites/petjacks/data/products"
import { journalEntries as mehJournal } from "@/sites/meh/data/journal"
import { treatments as sovereignwellnessTreatments } from "@/sites/sovereignwellness/data/treatments"
import { dispatches as sovereignwellnessDispatches } from "@/sites/sovereignwellness/data/dispatches"
import { products as privatrixProducts } from "@/sites/privatrix/data/products"
import { products as prechewedProducts } from "@/sites/prechewed/data/products"
import { articles as prechewedArticles } from "@/sites/prechewed/data/press"
import { products as superengineeredProducts } from "@/sites/superengineered/data/products"
import { courses as whiskerworksCourses } from "@/sites/whiskerworks/data/courses"
import { divisions as whiskerworksDivisions } from "@/sites/whiskerworks/data/divisions"
import { apexLeaders } from "@/sites/apex/data/leadership"
import { jobs as apexJobs } from "@/sites/apex/data/careers"
import { pressReleases as apexPressReleases } from "@/sites/apex/data/press-releases"
import { theories, categories } from "@/sites/thetheoryisreal/data/theories"
import { products as thetheoryisrealProducts } from "@/sites/thetheoryisreal/data/products"
import { boards } from "@/sites/thetheoryisreal/data/forum-users"
import { threads } from "@/sites/thetheoryisreal/data/forum"
import { programs as carbonneutraloutragePrograms } from "@/sites/carbonneutraloutrage/data/programs"
import { products as unmotivatorsProducts } from "@/sites/unmotivators/data/products"

const BASE_DOMAIN = "specificindustries.com"
const EXCLUDED_PAGES = new Set(["cart", "checkout"])

function siteUrl(subdomain: string, path: string = ""): string {
  const base =
    subdomain === "apex"
      ? `https://${BASE_DOMAIN}`
      : `https://${subdomain}.${BASE_DOMAIN}`
  return path ? `${base}/${path}` : base
}

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = []

  // Static pages from all sites
  for (const [subdomain, site] of Object.entries(siteRegistry)) {
    for (const slug of Object.keys(site.pages)) {
      if (EXCLUDED_PAGES.has(slug)) continue
      urls.push({ url: siteUrl(subdomain, slug) })
    }
  }

  // Dynamic routes: product detail pages
  const productSites: Record<string, { slug: string }[]> = {
    pigmilk: pigmilkProducts,
    dehydratedwater: dehydratedwaterProducts,
    inflatableanchors: inflatableanchorsProducts,
    truegrit: truegritProducts,
    snortables: snortablesProducts,
    mousetrapjenga: mousetrapjengaProducts,
    bonelesswater: bonelesswaterProducts,
    rocks: rocksProducts,
    radiumroys: radiumroysProducts,
    squaredaway: squaredawayProducts,
    mostlysterile: mostlysterileProducts,
    meh: mehProducts,
    privatrix: privatrixProducts,
    prechewed: prechewedProducts,
    seeltite: seeltiteProducts,
    chunkymilk: chunkymilkProducts,
    superengineered: superengineeredProducts,
    terrorclown: terrorclownProducts,
    petjacks: petjacksProducts,
    unmotivators: unmotivatorsProducts,
  }

  for (const [subdomain, products] of Object.entries(productSites)) {
    for (const product of products) {
      urls.push({ url: siteUrl(subdomain, `products/${product.slug}`) })
    }
  }

  // OnlyFans: fan profile pages at /browse/{slug}
  for (const fan of onlyfansFans) {
    urls.push({ url: siteUrl("onlyfans", `browse/${fan.slug}`) })
  }

  // OnlyPans: pan profile pages at /browse/{slug}
  for (const pan of onlypansPans) {
    urls.push({ url: siteUrl("onlypans", `browse/${pan.slug}`) })
  }

  // Grass Fed WiFi: shares, field notes
  for (const share of shares) {
    urls.push({ url: siteUrl("grassfedwifi", `shares/${share.slug}`) })
  }
  for (const note of fieldNotes) {
    urls.push({ url: siteUrl("grassfedwifi", `field-notes/${note.slug}`) })
  }

  // Elder Party: coalitions, news, shop product detail pages
  for (const coalition of coalitions) {
    urls.push({ url: siteUrl("elderparty", `coalitions/${coalition.slug}`) })
  }
  for (const article of elderpartyArticles) {
    urls.push({ url: siteUrl("elderparty", `news/${article.slug}`) })
  }
  for (const product of elderpartyProducts) {
    urls.push({ url: siteUrl("elderparty", `shop/${product.slug}`) })
  }

  // Strategic Void: solutions, solution/product combos, case studies, whitepapers
  for (const solution of strategicvoidSolutions) {
    urls.push({
      url: siteUrl("strategicvoid", `solutions/${solution.slug}`),
    })
  }
  for (const product of strategicvoidProducts) {
    urls.push({
      url: siteUrl(
        "strategicvoid",
        `solutions/${product.solutionArea}/${product.slug}`
      ),
    })
  }
  for (const caseStudy of caseStudies) {
    urls.push({
      url: siteUrl("strategicvoid", `case-studies/${caseStudy.slug}`),
    })
  }
  for (const whitepaper of whitepapers) {
    urls.push({
      url: siteUrl("strategicvoid", `whitepapers/${whitepaper.slug}`),
    })
  }

  // Stratify: onboarding steps
  for (const step of onboardingSteps) {
    urls.push({ url: siteUrl("stratify", `onboarding/${step.slug}`) })
  }

  // Odd Occasions: product detail pages at /shop/{slug}
  for (const product of oddoccasionsProducts) {
    urls.push({ url: siteUrl("oddoccasions", `shop/${product.slug}`) })
  }

  // Pettential: product detail pages at /shop/{slug}
  for (const product of pettentialProducts) {
    urls.push({ url: siteUrl("pettential", `shop/${product.slug}`) })
  }

  // Gristmill: arm landing pages, service detail pages, case studies
  for (const arm of gristmillArms) {
    urls.push({ url: siteUrl("gristmill", `services/${arm.slug}`) })
  }
  for (const service of gristmillServices) {
    urls.push({
      url: siteUrl("gristmill", `services/${service.armSlug}/${service.slug}`),
    })
  }
  for (const cs of gristmillCaseStudies) {
    urls.push({ url: siteUrl("gristmill", `case-studies/${cs.slug}`) })
  }

  // Carter & Fils: cellar product pages, journal entries
  for (const product of carterandfilsProducts) {
    urls.push({ url: siteUrl("carterandfils", `cellar/${product.slug}`) })
  }
  for (const entry of carterandfilsJournal) {
    urls.push({ url: siteUrl("carterandfils", `journal/${entry.slug}`) })
  }

  // Meh: journal entries (products covered by productSites map above)
  for (const entry of mehJournal) {
    urls.push({ url: siteUrl("meh", `journal/${entry.slug}`) })
  }

  // Apex: leader profiles, job listings, press releases
  for (const leader of apexLeaders) {
    urls.push({ url: siteUrl("apex", `leadership/${leader.slug}`) })
  }
  for (const job of apexJobs) {
    urls.push({ url: siteUrl("apex", `careers/${job.slug}`) })
  }
  for (const release of apexPressReleases) {
    urls.push({ url: siteUrl("apex", `newsroom/${release.slug}`) })
  }

  // Sovereign Wellness: treatment detail pages, dispatch articles
  for (const t of sovereignwellnessTreatments) {
    urls.push({ url: siteUrl("sovereignwellness", `treatments/${t.slug}`) })
  }
  for (const d of sovereignwellnessDispatches) {
    urls.push({ url: siteUrl("sovereignwellness", `dispatches/${d.slug}`) })
  }

  // Whiskerworks: course detail pages at /courses/{slug}, division detail pages at /divisions/{slug}
  for (const course of whiskerworksCourses) {
    urls.push({ url: siteUrl("whiskerworks", `courses/${course.slug}`) })
  }
  for (const division of whiskerworksDivisions) {
    urls.push({ url: siteUrl("whiskerworks", `divisions/${division.slug}`) })
  }

  // Prechewed: press article pages at /press/{slug}
  for (const article of prechewedArticles) {
    urls.push({ url: siteUrl("prechewed", `press/${article.slug}`) })
  }

  // The Theory Is Real: theory articles, categories, products, forum boards, forum threads
  for (const theory of theories) {
    urls.push({ url: siteUrl("thetheoryisreal", `theories/${theory.slug}`) })
  }
  for (const category of categories) {
    urls.push({ url: siteUrl("thetheoryisreal", `category/${category.key}`) })
  }
  for (const product of thetheoryisrealProducts) {
    urls.push({ url: siteUrl("thetheoryisreal", `products/${product.slug}`) })
  }
  for (const board of boards) {
    urls.push({ url: siteUrl("thetheoryisreal", `forum/${board.key}`) })
  }
  for (const thread of threads) {
    urls.push({ url: siteUrl("thetheoryisreal", `forum/${thread.board}/${thread.slug}`) })
  }

  // Carbon-Neutral Outrage: program detail pages at /programs/{slug}
  for (const program of carbonneutraloutragePrograms) {
    urls.push({ url: siteUrl("carbonneutraloutrage", `programs/${program.slug}`) })
  }

  return urls
}
