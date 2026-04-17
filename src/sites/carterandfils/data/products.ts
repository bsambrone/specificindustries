export type ProductCategory = "red" | "white" | "rose" | "sparkling" | "dessert" | "vinho-verde"

export interface ProductSize {
  label: string
  ml: number
  price: number
}

export interface Product {
  slug: string
  name: string
  category: ProductCategory
  vintage: number | "NV"
  grade: string
  varietal: string
  priceLabel: string
  price: number
  sizes: ProductSize[]
  tagline: string
  tastingNotes: string
  pairings: string[]
  terroirNote: string
  agingProfile: string
  image: string
}

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  red: "Reds",
  white: "Whites",
  rose: "Rosés",
  sparkling: "Sparkling",
  dessert: "Dessert",
  "vinho-verde": "Vinho Verde",
}

export const products: Product[] = [
  // ----- REDS (7) -----
  {
    slug: "allegheny-reserve-syrah-5w30-2017",
    name: "2017 Allegheny Reserve Syrah 5W-30",
    category: "red",
    vintage: 2017,
    grade: "5W-30",
    varietal: "Allegheny Syrah",
    priceLabel: "$68",
    price: 68,
    sizes: [
      { label: "750ml", ml: 750, price: 68 },
      { label: "1.5L Magnum", ml: 1500, price: 128 },
      { label: "5L Jeroboam", ml: 5000, price: 395 },
    ],
    tagline: "A silky, high-mileage red with poise.",
    tastingNotes: "Deep garnet in the glass, with a nose of graphite, black walnut shell, and a whisper of summer asphalt. The palate is long, unhurried, and structured. A gentleman's red.",
    pairings: ["long Sunday drives through rolling farmland", "cold mornings", "quiet contemplation"],
    terroirNote: "Sourced entirely from our original 1859 parcel in the Allegheny foothills. The shale imparts an unmistakable hydrocarbon minerality.",
    agingProfile: "Drinks well now; will improve noticeably after 5,000–7,000 miles of cellar time.",
    image: "/sites/carterandfils/product-allegheny-reserve-syrah-5w30.png",
  },
  {
    slug: "estate-cabernet-10w40-2019",
    name: "2019 Estate Cabernet 10W-40",
    category: "red",
    vintage: 2019,
    grade: "10W-40",
    varietal: "Cabernet",
    priceLabel: "$58",
    price: 58,
    sizes: [
      { label: "750ml", ml: 750, price: 58 },
      { label: "1.5L Magnum", ml: 1500, price: 110 },
      { label: "5L Jeroboam", ml: 5000, price: 345 },
    ],
    tagline: "Full-bodied and classical — the estate's workhorse red.",
    tastingNotes: "Dense, opaque, and unapologetic. Notes of tobacco, leather, and well-worn rubber. The finish is long and faintly warm, in the manner of a summer garage at dusk.",
    pairings: ["spirited drives", "hearty roasts", "mechanical problems solved after three glasses"],
    terroirNote: "A blend of our upper-shale and lower-bench parcels. The elevation lends structure; the shale gives weight.",
    agingProfile: "At peak 2024–2029. Will tolerate 8,000–10,000 miles in a cool cellar.",
    image: "/sites/carterandfils/product-estate-cabernet-10w40.png",
  },
  {
    slug: "old-vine-grand-cru-20w50-2015",
    name: "2015 Old Vine Grand Cru 20W-50",
    category: "red",
    vintage: 2015,
    grade: "20W-50",
    varietal: "Vieilles Vignes",
    priceLabel: "$118",
    price: 118,
    sizes: [
      { label: "750ml", ml: 750, price: 118 },
      { label: "1.5L Magnum", ml: 1500, price: 220 },
    ],
    tagline: "A Grand Cru for heritage drivers and patient cellars.",
    tastingNotes: "Inky and meditative. A heavier body than our younger releases, with notes of stone fruit compote, oiled oak, and the faintest suggestion of a warm engine block cooling in September.",
    pairings: ["classic machinery", "bone-in cuts", "the last drive of the season"],
    terroirNote: "From vines planted in 1952 by Henri Carter. Deep-root expression of the lower Allegheny shale.",
    agingProfile: "Will reward patient cellaring. Some collectors report notable improvement past 15,000 miles.",
    image: "/sites/carterandfils/product-old-vine-grand-cru-20w50.png",
  },
  {
    slug: "synthetique-premier-cru-0w20-2021",
    name: "2021 Synthétique Premier Cru 0W-20",
    category: "red",
    vintage: 2021,
    grade: "0W-20",
    varietal: "Synthétique",
    priceLabel: "$88",
    price: 88,
    sizes: [
      { label: "750ml", ml: 750, price: 88 },
      { label: "1.5L Magnum", ml: 1500, price: 165 },
      { label: "5L Jeroboam", ml: 5000, price: 505 },
    ],
    tagline: "The modern flagship — refined, precise, and uncompromising.",
    tastingNotes: "Crystalline and electric on the nose, with a lean structure and minerally finish. A modern interpretation of the Allegheny style, made for contemporary palates.",
    pairings: ["new machinery", "cold starts", "high expectations"],
    terroirNote: "A fractionated cuvée from across the estate. Ferments conducted at uncommonly low temperatures.",
    agingProfile: "Remarkably stable. Rated for extended cellaring up to 15,000 miles without noticeable degradation.",
    image: "/sites/carterandfils/product-synthetique-premier-cru-0w20.png",
  },
  {
    slug: "carter-heritage-cuvee-5w20-2012",
    name: "2012 Carter Heritage Cuvée 5W-20",
    category: "red",
    vintage: 2012,
    grade: "5W-20",
    varietal: "Heritage Blend",
    priceLabel: "$158",
    price: 158,
    sizes: [
      { label: "750ml", ml: 750, price: 158 },
      { label: "1.5L Magnum", ml: 1500, price: 298 },
      { label: "5L Jeroboam", ml: 5000, price: 895 },
    ],
    tagline: "The family's signature blend. Étienne's personal selection.",
    tastingNotes: "A rare blend drawn from seven parcels — one for each generation. Deep, layered, and improbably silky. Notes of old library books, walnut oil, and distant locomotion.",
    pairings: ["anniversaries", "milestones", "a favorite route driven slowly"],
    terroirNote: "A pan-estate cuvée. Includes trace parcels dating to Édouard's original 1859 planting.",
    agingProfile: "Will continue to evolve for decades. The 2012 is approaching its first apex and will hold into the 2040s.",
    image: "/sites/carterandfils/product-carter-heritage-cuvee-5w20.png",
  },
  {
    slug: "vieilles-vignes-15w40-2020",
    name: "2020 Vieilles Vignes 15W-40",
    category: "red",
    vintage: 2020,
    grade: "15W-40",
    varietal: "Vieilles Vignes",
    priceLabel: "$74",
    price: 74,
    sizes: [
      { label: "750ml", ml: 750, price: 74 },
      { label: "1.5L Magnum", ml: 1500, price: 138 },
      { label: "5L Jeroboam", ml: 5000, price: 425 },
    ],
    tagline: "Old-vine weight, all-season poise.",
    tastingNotes: "Broad-shouldered and warm, with density rather than shrillness. Walnut, brown butter, and a graphite thread that runs through the finish.",
    pairings: ["mid-size machinery", "long highway pulls", "moderate winters"],
    terroirNote: "Drawn from vines between 40 and 70 years old. Balanced by a touch of the 2019 harvest.",
    agingProfile: "Ready now; will hold 8,000–10,000 miles gracefully.",
    image: "/sites/carterandfils/product-vieilles-vignes-15w40.png",
  },
  {
    slug: "nouveau-5w30-2023",
    name: "2023 Nouveau 5W-30",
    category: "red",
    vintage: 2023,
    grade: "5W-30",
    varietal: "Nouveau",
    priceLabel: "$38",
    price: 38,
    sizes: [
      { label: "750ml", ml: 750, price: 38 },
      { label: "1.5L Magnum", ml: 1500, price: 72 },
    ],
    tagline: "Our young, bright, everyday pour.",
    tastingNotes: "Fresh and immediate. Bright graphite, young walnut, and a clean finish. An honest introduction to the estate's style for the everyday driver.",
    pairings: ["weekday commutes", "short errands", "first impressions"],
    terroirNote: "A young cuvée from the 2023 harvest across three mid-bench parcels.",
    agingProfile: "Drink within 5,000 miles for the brightness; acceptable through 10,000.",
    image: "/sites/carterandfils/product-nouveau-5w30.png",
  },

  // ----- WHITES (3) -----
  {
    slug: "hydraulique-blanc-2020",
    name: "2020 Hydraulique Blanc",
    category: "white",
    vintage: 2020,
    grade: "ATF+4",
    varietal: "Hydraulique",
    priceLabel: "$42",
    price: 42,
    sizes: [
      { label: "750ml", ml: 750, price: 42 },
      { label: "1.5L Magnum", ml: 1500, price: 78 },
    ],
    tagline: "A direction-driven white with silky carriage.",
    tastingNotes: "Clear, pale-amber, and confident. The palate turns with grace — minerally on entry, generous in the mid-palate, with an almost hydraulic sense of ease on the finish.",
    pairings: ["tight corners", "uncommon precision", "patience"],
    terroirNote: "A white bottling unique to the estate. Fermented in stainless, no oak.",
    agingProfile: "At peak now through 2028. Handles up to 30,000 miles of cellar-stability.",
    image: "/sites/carterandfils/product-hydraulique-blanc.png",
  },
  {
    slug: "fluide-de-direction-reserve-2018",
    name: "2018 Fluide de Direction Reserve",
    category: "white",
    vintage: 2018,
    grade: "Dexron VI",
    varietal: "Fluide de Direction",
    priceLabel: "$62",
    price: 62,
    sizes: [
      { label: "750ml", ml: 750, price: 62 },
      { label: "1.5L Magnum", ml: 1500, price: 115 },
    ],
    tagline: "A reserve white for the most deliberate turns.",
    tastingNotes: "Pale copper in the glass. Nose of warm stone and polished brass; the palate is unusually directional, with a viscosity that suggests considered movement and a long, assured finish.",
    pairings: ["deliberate routes", "gentle arcs", "the long way home"],
    terroirNote: "A single-parcel reserve, produced only in the strongest vintages.",
    agingProfile: "Will hold its composure for 40,000 miles or more under proper conditions.",
    image: "/sites/carterandfils/product-fluide-de-direction-reserve.png",
  },
  {
    slug: "blanc-de-direction-2022",
    name: "2022 Blanc de Direction",
    category: "white",
    vintage: 2022,
    grade: "CHF 11S",
    varietal: "Direction",
    priceLabel: "$48",
    price: 48,
    sizes: [
      { label: "750ml", ml: 750, price: 48 },
    ],
    tagline: "A younger, brighter direction.",
    tastingNotes: "Bright, fluid, and responsive. A clean, untrammeled white with distinct mineral character and an immediate sense of control.",
    pairings: ["modern routes", "quick adjustments"],
    terroirNote: "Produced from our higher-elevation parcels. Bottled young.",
    agingProfile: "At peak through 2029.",
    image: "/sites/carterandfils/product-blanc-de-direction.png",
  },

  // ----- ROSÉS (3) -----
  {
    slug: "antigel-rose-2022",
    name: "2022 Antigel Rosé",
    category: "rose",
    vintage: 2022,
    grade: "50/50",
    varietal: "Antigel",
    priceLabel: "$36",
    price: 36,
    sizes: [
      { label: "750ml", ml: 750, price: 36 },
      { label: "1.5L Magnum", ml: 1500, price: 68 },
    ],
    tagline: "A 50/50 pink blend — best served well-chilled.",
    tastingNotes: "A striking pink in the glass, with a nose of glycol flowers and a hint of warm stone. The palate is quietly cooling, broad, and long on the finish — a rosé of uncommon temperature range.",
    pairings: ["warm afternoons", "cold nights", "the seasons between"],
    terroirNote: "A cuvée designed for temperature resilience. Grapes harvested across both shoulders of the growing season.",
    agingProfile: "Drink within 30,000 miles of purchase for full character.",
    image: "/sites/carterandfils/product-antigel-rose.png",
  },
  {
    slug: "propylene-rose-estate-2019",
    name: "2019 Propylène Rosé Estate",
    category: "rose",
    vintage: 2019,
    grade: "PG",
    varietal: "Propylène",
    priceLabel: "$44",
    price: 44,
    sizes: [
      { label: "750ml", ml: 750, price: 44 },
      { label: "1.5L Magnum", ml: 1500, price: 82 },
    ],
    tagline: "A pet-safe rosé, cellared with care.",
    tastingNotes: "A more rounded, almost honeyed rosé. Notes of candied apple and a faint sweetness that softens without cloying. Safe in every household, the label cheerfully notes.",
    pairings: ["gatherings with pets underfoot", "gentler climates"],
    terroirNote: "A separate vinification tradition at the estate, using only propylene-glycol-compatible parcels.",
    agingProfile: "Stable. Will hold through 40,000 miles.",
    image: "/sites/carterandfils/product-propylene-rose-estate.png",
  },
  {
    slug: "rose-de-lallegheny-2023",
    name: "2023 Rosé de l'Allegheny",
    category: "rose",
    vintage: 2023,
    grade: "OAT",
    varietal: "Allegheny Rosé",
    priceLabel: "$32",
    price: 32,
    sizes: [
      { label: "750ml", ml: 750, price: 32 },
    ],
    tagline: "Our youngest, brightest pink.",
    tastingNotes: "A modern, orange-tinged rosé with unusually clean lines. The palate is fresh, lively, and briefly cooling on the finish.",
    pairings: ["summer drives", "new routines"],
    terroirNote: "Employs the newer organic acid technology our younger winemakers champion.",
    agingProfile: "At peak now through 2030.",
    image: "/sites/carterandfils/product-rose-de-lallegheny.png",
  },

  // ----- SPARKLING (3) -----
  {
    slug: "brut-dot-3-nv",
    name: "NV Brut DOT 3",
    category: "sparkling",
    vintage: "NV",
    grade: "DOT 3",
    varietal: "Brut",
    priceLabel: "$28",
    price: 28,
    sizes: [
      { label: "750ml", ml: 750, price: 28 },
    ],
    tagline: "An effervescent classical stop.",
    tastingNotes: "Pale straw with fine persistent bubbles. The nose is clean and ethereal; the palate delivers a bright, immediate effervescence that finishes with surprising authority.",
    pairings: ["sudden halts", "celebrations", "the end of a long drive"],
    terroirNote: "Our classical method sparkling. Method traditionnelle, with extended bottle fermentation.",
    agingProfile: "Drink when called upon. Best consumed within two years of bottling.",
    image: "/sites/carterandfils/product-brut-dot-3.png",
  },
  {
    slug: "brut-dot-4-prestige-nv",
    name: "NV Brut DOT 4 Prestige",
    category: "sparkling",
    vintage: "NV",
    grade: "DOT 4",
    varietal: "Brut Prestige",
    priceLabel: "$42",
    price: 42,
    sizes: [
      { label: "750ml", ml: 750, price: 42 },
    ],
    tagline: "Higher boiling point. For the enthusiast's pause.",
    tastingNotes: "More structured than our DOT 3. A firmer mousse, broader mid-palate, and a notably elevated thermal threshold — a sparkling that holds composure under heat.",
    pairings: ["performance driving", "spirited stops"],
    terroirNote: "An enhanced cuvée with a more rigorous spec. For enthusiasts who demand certainty.",
    agingProfile: "Drink when called upon.",
    image: "/sites/carterandfils/product-brut-dot-4-prestige.png",
  },
  {
    slug: "silicone-cuvee-dot-5-nv",
    name: "NV Silicone Cuvée DOT 5",
    category: "sparkling",
    vintage: "NV",
    grade: "DOT 5",
    varietal: "Silicone Cuvée",
    priceLabel: "$68",
    price: 68,
    sizes: [
      { label: "750ml", ml: 750, price: 68 },
    ],
    tagline: "A collector's sparkling — silicone-base, purple in the glass.",
    tastingNotes: "An oddity in the portfolio: purple-tinged, notably hydrophobic, and never meant to be blended with our other sparklings. Collectors prize its stability and distinct lineage.",
    pairings: ["heritage machinery", "restorations", "purists"],
    terroirNote: "An isolated production line. Not to be combined with DOT 3 or DOT 4 cuvées under any circumstance.",
    agingProfile: "Exceptionally stable. A collector's bottle.",
    image: "/sites/carterandfils/product-silicone-cuvee-dot-5.png",
  },

  // ----- DESSERT (4) -----
  {
    slug: "late-harvest-atf-2016",
    name: "2016 Late Harvest ATF",
    category: "dessert",
    vintage: 2016,
    grade: "ATF",
    varietal: "Late Harvest",
    priceLabel: "$54",
    price: 54,
    sizes: [
      { label: "750ml", ml: 750, price: 54 },
      { label: "1.5L Magnum", ml: 1500, price: 98 },
    ],
    tagline: "Viscous, amber, and deeply sweet on the shift.",
    tastingNotes: "A beautiful amber pour. Notes of dates, burnt caramel, and old leather. Unusually viscous — the glass holds a long, patient tear.",
    pairings: ["smooth shifts", "autumnal drives", "dessert in place of dessert"],
    terroirNote: "Our late-harvest bottling, from grapes left on the vine into the first frost.",
    agingProfile: "Holds beautifully for decades.",
    image: "/sites/carterandfils/product-late-harvest-atf.png",
  },
  {
    slug: "dexron-ice-wine-2018",
    name: "2018 Dexron Ice Wine",
    category: "dessert",
    vintage: 2018,
    grade: "Dexron",
    varietal: "Ice Wine",
    priceLabel: "$78",
    price: 78,
    sizes: [
      { label: "375ml", ml: 375, price: 78 },
    ],
    tagline: "Late-pressed, continuously variable.",
    tastingNotes: "Pressed from frozen grapes after an uncommonly cold harvest. Intensely concentrated — notes of candied orange, honeyed walnut, and a silken, continuously variable finish.",
    pairings: ["winter mornings", "modern machinery", "small pours"],
    terroirNote: "A CVT-style late pressing. Produced only in exceptional cold vintages.",
    agingProfile: "Will cellar for 20 years or more.",
    image: "/sites/carterandfils/product-dexron-ice-wine.png",
  },
  {
    slug: "gear-oil-tawny-2015",
    name: "2015 Gear Oil Tawny",
    category: "dessert",
    vintage: 2015,
    grade: "75W-90",
    varietal: "Tawny",
    priceLabel: "$62",
    price: 62,
    sizes: [
      { label: "750ml", ml: 750, price: 62 },
      { label: "1.5L Magnum", ml: 1500, price: 115 },
    ],
    tagline: "A nutty, heavier dessert wine for manual sensibilities.",
    tastingNotes: "Deep tawny with bronze edges. Walnut, caramelized fig, a trace of smoke. Weighty on the palate — a dessert for drivers who prefer to choose their own gear.",
    pairings: ["manual machinery", "deliberate downshifts"],
    terroirNote: "An old-style bottling. Heavier bodied than our ATF releases.",
    agingProfile: "Peak drinking 2022–2040.",
    image: "/sites/carterandfils/product-gear-oil-tawny.png",
  },
  {
    slug: "cvt-sauternes-2019",
    name: "2019 CVT Sauternes",
    category: "dessert",
    vintage: 2019,
    grade: "CVT",
    varietal: "Sauternes",
    priceLabel: "$88",
    price: 88,
    sizes: [
      { label: "375ml", ml: 375, price: 88 },
    ],
    tagline: "Seamless sweetness, continuously delivered.",
    tastingNotes: "A modernist dessert in the Sauternes register. Honey, preserved lemon, and a singular, uninterrupted sweetness that flows without perceptible stepping.",
    pairings: ["modern sedans", "smooth climbs", "moments of transition"],
    terroirNote: "A variable-ratio cuvée. Nouveau in method, classical in ambition.",
    agingProfile: "Cellar 10–25 years.",
    image: "/sites/carterandfils/product-cvt-sauternes.png",
  },

  // ----- VINHO VERDE (2) -----
  {
    slug: "windshield-verde-2024",
    name: "2024 Windshield Verde",
    category: "vinho-verde",
    vintage: 2024,
    grade: "Summer",
    varietal: "Verde",
    priceLabel: "$18",
    price: 18,
    sizes: [
      { label: "750ml", ml: 750, price: 18 },
      { label: "1.5L Magnum", ml: 1500, price: 34 },
    ],
    tagline: "Crisp, bright, and eminently quaffable.",
    tastingNotes: "Pale blue-green in the glass. Light-bodied, bracing, and fast-finishing. A summer wine in the most literal sense — clean on first impression and immediately refreshing.",
    pairings: ["bright mornings", "clear roads", "little else"],
    terroirNote: "Our lightest bottling. Intended for warm-season consumption.",
    agingProfile: "Drink within one growing season.",
    image: "/sites/carterandfils/product-windshield-verde.png",
  },
  {
    slug: "hiver-verde-2024",
    name: "2024 Hiver Verde",
    category: "vinho-verde",
    vintage: 2024,
    grade: "Winter",
    varietal: "Hiver Verde",
    priceLabel: "$22",
    price: 22,
    sizes: [
      { label: "750ml", ml: 750, price: 22 },
      { label: "1.5L Magnum", ml: 1500, price: 40 },
    ],
    tagline: "The same lightness, a lower pour point.",
    tastingNotes: "A crisper, more brittle sibling to our summer Verde. Maintains its clarity and fluidity under conditions its warmer cousin cannot.",
    pairings: ["winter roads", "cold dawns"],
    terroirNote: "A frost-resistant bottling for colder climates.",
    agingProfile: "Drink within one winter season.",
    image: "/sites/carterandfils/product-hiver-verde.png",
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category)
}

export function getRelatedProducts(slug: string, count: number = 3): Product[] {
  const current = getProductBySlug(slug)
  if (!current) return []
  return products
    .filter((p) => p.slug !== slug && p.category === current.category)
    .slice(0, count)
}
