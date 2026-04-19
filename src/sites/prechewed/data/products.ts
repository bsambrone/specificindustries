export type ProductCuisine =
  | "Flagship"
  | "Breakfast"
  | "Pasta & Italian"
  | "Mains"
  | "Asian"
  | "Sandwiches"
  | "Holiday & Occasion"
  | "Limited"

export interface NutritionPanel {
  servingSize: string            // e.g. "1 pouch (128g)"
  calories: number
  jawHoursReclaimed: number      // replaces a traditional macro as a joke line
  bioavailabilityIndex: string   // e.g. "8.3×"
  bolusDensity: string           // e.g. "High"
}

export interface Product {
  slug: string
  name: string
  cuisine: ProductCuisine
  weightOz: number
  priceLabel: string             // e.g. "$28" or "Waitlist only"
  price: number | null           // dollars; null for Founder's Reserve (waitlist)
  isFlagship: boolean
  isLimited: boolean
  isFeatured: boolean            // shown on home page featured grid
  tagline: string
  description: string[]          // 2-3 long-form satirical paragraphs for detail page
  ingredients: string[]
  nutrition: NutritionPanel
  bolusCompatibility: number     // 1–10
  masticatorNote: string         // one sentence
  image: string                  // public/sites/prechewed/products/<slug>.png
}

export const products: Product[] = [
  // ─── Flagship ───────────────────────────────────────
  {
    slug: "daily-bolus",
    name: "The Daily Bolus",
    cuisine: "Flagship",
    weightOz: 4.5,
    priceLabel: "$42",
    price: 42,
    isFlagship: true,
    isLimited: false,
    isFeatured: true,
    tagline: "The complete pre-oral nutrition protocol. Breakfast, lunch, and dinner in a single pouch.",
    description: [
      "The Daily Bolus is the foundational SKU in the Prechewed™ catalog. Formulated for founders, executives, and deep-work practitioners who have decided that mealtime is, at best, an interruption.",
      "Each pouch delivers a full day's worth of Pre-Oral Hydrolysis™-prepared nutrition — macros balanced, micros bracketed, chew phase eliminated. Subscribe and reclaim up to 47 days of productive time per annum at three pouches per day.",
      "Flavor-tuned toward umami-forward, emotionally neutral. Recommended for consumption during focus blocks.",
    ],
    ingredients: [
      "Proprietary pre-hydrolyzed protein matrix",
      "Complex pre-oral carbohydrates",
      "Bolus-phase lipid blend",
      "Filtered electrolyte base",
      "Trace micronutrient complex",
      "Natural mouth-feel stabilizer",
      "Potassium sorbate",
    ],
    nutrition: {
      servingSize: "1 pouch (128g)",
      calories: 640,
      jawHoursReclaimed: 1.41,
      bioavailabilityIndex: "8.3×",
      bolusDensity: "High",
    },
    bolusCompatibility: 10,
    masticatorNote: "Foundational, balanced, nutritionally unequivocal.",
    image: "/sites/prechewed/products/daily-bolus.png",
  },

  // ─── Breakfast ─────────────────────────────────────
  {
    slug: "eggs-benedict",
    name: "Eggs Benedict",
    cuisine: "Breakfast",
    weightOz: 4.0,
    priceLabel: "$24",
    price: 24,
    isFlagship: false,
    isLimited: false,
    isFeatured: false,
    tagline: "Poached, hollandaised, and pre-hydrolyzed for pre-oral delivery.",
    description: [
      "Eggs Benedict captures the brunch experience and compresses it into 4 ounces of refined bolus. English muffin, poached egg, Canadian bacon, and hollandaise — individually pre-oral-phased and recombined under inert gas.",
      "Flavor registers at 94% fidelity versus a traditionally-plated Benedict. Mouth-feel is silken.",
    ],
    ingredients: [
      "Pre-oral egg matrix",
      "Pre-hydrolyzed Canadian back bacon",
      "Whole wheat pre-masticate",
      "Butter-based hollandaise reduction",
      "Lemon essence",
      "Mouth-feel stabilizer",
    ],
    nutrition: { servingSize: "1 pouch (113g)", calories: 420, jawHoursReclaimed: 0.38, bioavailabilityIndex: "8.1×", bolusDensity: "Medium" },
    bolusCompatibility: 8.4,
    masticatorNote: "Buttery, warm, emotionally permissive.",
    image: "/sites/prechewed/products/eggs-benedict.png",
  },

  {
    slug: "pancake-stack",
    name: "Pancake Stack",
    cuisine: "Breakfast",
    weightOz: 4.5,
    priceLabel: "$22",
    price: 22,
    isFlagship: false, isLimited: false, isFeatured: false,
    tagline: "Buttermilk-coded carbohydrate bolus with real Vermont syrup.",
    description: [
      "A full short stack, pre-hydrolyzed to a warm, lightly-sweetened paste. Vermont-sourced maple syrup is pre-blended — no separate syrup packet required, no decisions to make.",
      "Best consumed before 10:00am local time. Pouch warms to body temperature in approximately 9 minutes.",
    ],
    ingredients: ["Buttermilk pre-masticate", "Pre-oral wheat flour", "Vermont maple reduction", "Clarified butter", "Leavening agents (pre-activated)", "Vanilla extract"],
    nutrition: { servingSize: "1 pouch (128g)", calories: 510, jawHoursReclaimed: 0.33, bioavailabilityIndex: "7.9×", bolusDensity: "Medium" },
    bolusCompatibility: 7.9,
    masticatorNote: "Sweet, homey, structurally comforting.",
    image: "/sites/prechewed/products/pancake-stack.png",
  },

  {
    slug: "breakfast-burrito",
    name: "Breakfast Burrito",
    cuisine: "Breakfast",
    weightOz: 5.0,
    priceLabel: "$26",
    price: 26,
    isFlagship: false, isLimited: false, isFeatured: false,
    tagline: "Scrambled egg, chorizo, potato, and flour tortilla — pre-hydrolyzed as one.",
    description: [
      "The full burrito, hydrolyzed into a unified bolus. No unwrapping, no sog, no second bite of dry tortilla end. Each pouch delivers the canonical breakfast burrito experience in its pre-oral form.",
      "Available in mild salsa bolus phase only. Spicy variant is roadmapped for Q3 2026.",
    ],
    ingredients: ["Pre-oral scrambled egg", "Chorizo pre-masticate", "Potato bolus phase", "Flour tortilla pre-hydrolyzate", "Mild salsa matrix", "Mouth-feel stabilizer"],
    nutrition: { servingSize: "1 pouch (142g)", calories: 580, jawHoursReclaimed: 0.47, bioavailabilityIndex: "8.2×", bolusDensity: "High" },
    bolusCompatibility: 8.2,
    masticatorNote: "Grounding, substantive, mildly heroic.",
    image: "/sites/prechewed/products/breakfast-burrito.png",
  },

  {
    slug: "french-toast",
    name: "French Toast",
    cuisine: "Breakfast",
    weightOz: 4.0,
    priceLabel: "$22",
    price: 22,
    isFlagship: false, isLimited: false, isFeatured: false,
    tagline: "Custard-soaked brioche, pre-hydrolyzed with cinnamon and syrup.",
    description: [
      "Brioche soaked in a vanilla-egg custard, pre-oral-phased to a warm, sweet paste. Comes with cinnamon folded directly into the bolus matrix.",
      "Pouch opens with a perforated tear tab designed to fit a standard desk mug for warming.",
    ],
    ingredients: ["Brioche pre-masticate", "Custard matrix", "Cinnamon", "Vermont maple reduction", "Clarified butter", "Vanilla"],
    nutrition: { servingSize: "1 pouch (113g)", calories: 490, jawHoursReclaimed: 0.31, bioavailabilityIndex: "7.9×", bolusDensity: "Medium" },
    bolusCompatibility: 7.6,
    masticatorNote: "Pillowy, sweet, comfortably unserious.",
    image: "/sites/prechewed/products/french-toast.png",
  },

  // ─── Pasta & Italian ──────────────────────────────
  {
    slug: "cacio-e-pepe",
    name: "Cacio e Pepe",
    cuisine: "Pasta & Italian",
    weightOz: 4.5,
    priceLabel: "$28",
    price: 28,
    isFlagship: false, isLimited: false, isFeatured: true,
    tagline: "Pecorino, black pepper, and spaghetti — pre-oral, mouth-ready.",
    description: [
      "Three ingredients. One bolus. Pecorino Romano DOP, Tellicherry black pepper, and pre-hydrolyzed spaghetti, combined under inert gas for maximum emulsion stability.",
      "Recommended pairing: a glass of sparkling water and silence.",
    ],
    ingredients: ["Pre-hydrolyzed spaghetti", "Pecorino Romano DOP", "Tellicherry black pepper", "Starchy pasta water reduction", "Mouth-feel stabilizer"],
    nutrition: { servingSize: "1 pouch (128g)", calories: 540, jawHoursReclaimed: 0.39, bioavailabilityIndex: "8.4×", bolusDensity: "Medium-High" },
    bolusCompatibility: 9.1,
    masticatorNote: "Sharp, salty, elegantly minimal.",
    image: "/sites/prechewed/products/cacio-e-pepe.png",
  },

  {
    slug: "carbonara",
    name: "Carbonara",
    cuisine: "Pasta & Italian",
    weightOz: 4.5,
    priceLabel: "$28",
    price: 28,
    isFlagship: false, isLimited: false, isFeatured: false,
    tagline: "Guanciale, egg yolk, pecorino — a silken bolus.",
    description: [
      "Roman-style carbonara pre-hydrolyzed into a glossy, yolk-rich paste. Guanciale is pre-oral-phased separately and reincorporated at final assembly for textural authenticity.",
      "Contains no cream. Never did. Do not ask.",
    ],
    ingredients: ["Pre-hydrolyzed spaghetti", "Guanciale pre-masticate", "Egg yolk matrix", "Pecorino Romano DOP", "Black pepper", "Mouth-feel stabilizer"],
    nutrition: { servingSize: "1 pouch (128g)", calories: 610, jawHoursReclaimed: 0.41, bioavailabilityIndex: "8.4×", bolusDensity: "High" },
    bolusCompatibility: 9.0,
    masticatorNote: "Rich, yolky, structurally Roman.",
    image: "/sites/prechewed/products/carbonara.png",
  },

  {
    slug: "lasagna",
    name: "Lasagna",
    cuisine: "Pasta & Italian",
    weightOz: 5.0,
    priceLabel: "$30",
    price: 30,
    isFlagship: false, isLimited: false, isFeatured: false,
    tagline: "Seven layers, one bolus.",
    description: [
      "Traditional seven-layer lasagna pre-hydrolyzed into a uniform, structurally-coherent bolus phase. Ricotta, béchamel, bolognese, and pasta layers are pre-oral-phased independently and recombined under precision temperature control.",
      "Best served at 47°C, slightly below traditional dining temperature, to preserve bolus integrity.",
    ],
    ingredients: ["Pre-hydrolyzed pasta sheets", "Ricotta matrix", "Béchamel phase", "Pre-oral bolognese", "Parmigiano Reggiano DOP", "Mouth-feel stabilizer"],
    nutrition: { servingSize: "1 pouch (142g)", calories: 680, jawHoursReclaimed: 0.52, bioavailabilityIndex: "8.2×", bolusDensity: "Very High" },
    bolusCompatibility: 8.8,
    masticatorNote: "Dense, layered, emotionally committed.",
    image: "/sites/prechewed/products/lasagna.png",
  },

  {
    slug: "margherita",
    name: "Margherita",
    cuisine: "Pasta & Italian",
    weightOz: 4.0,
    priceLabel: "$22",
    price: 22,
    isFlagship: false, isLimited: false, isFeatured: false,
    tagline: "Neapolitan pizza, pre-hydrolyzed with San Marzano and fresh mozz.",
    description: [
      "A single 10-inch Neapolitan Margherita pre-oral-phased into a warm, tomato-forward paste. Fior di latte is pre-hydrolyzed separately to preserve its delicate texture profile.",
      "Pouch doubles as a hand-warmer for 14 minutes post-warming.",
    ],
    ingredients: ["Pre-hydrolyzed 00 flour crust", "San Marzano tomato reduction", "Fior di latte mozzarella", "Fresh basil", "Extra virgin olive oil", "Sea salt"],
    nutrition: { servingSize: "1 pouch (113g)", calories: 440, jawHoursReclaimed: 0.36, bioavailabilityIndex: "8.0×", bolusDensity: "Medium" },
    bolusCompatibility: 8.5,
    masticatorNote: "Bright, tomato-forward, dignified.",
    image: "/sites/prechewed/products/margherita.png",
  },

  // ─── Mains ────────────────────────────────────────
  {
    slug: "ribeye",
    name: "Ribeye",
    cuisine: "Mains",
    weightOz: 5.0,
    priceLabel: "$48",
    price: 48,
    isFlagship: false, isLimited: false, isFeatured: true,
    tagline: "Dry-aged, pre-hydrolyzed, perfectly rendered.",
    description: [
      "14-ounce USDA Prime ribeye, dry-aged 28 days, pre-oral-phased at the point of peak tenderness. Crust char is preserved as a discrete textural note within the bolus.",
      "Recommended as a centerpiece of the evening protocol.",
    ],
    ingredients: ["Grass-finished ribeye (pre-oral phase)", "Sea salt", "Rosemary", "Proprietary bolus matrix", "Potassium sorbate", "Mouth-feel stabilizer"],
    nutrition: { servingSize: "1 pouch (142g)", calories: 720, jawHoursReclaimed: 0.47, bioavailabilityIndex: "8.6×", bolusDensity: "Very High" },
    bolusCompatibility: 9.2,
    masticatorNote: "Dense, beefy, emotionally grounding.",
    image: "/sites/prechewed/products/ribeye.png",
  },

  {
    slug: "peking-duck",
    name: "Peking Duck",
    cuisine: "Mains",
    weightOz: 4.5,
    priceLabel: "$44",
    price: 44,
    isFlagship: false, isLimited: false, isFeatured: false,
    tagline: "Crisp-skinned duck, scallion, hoisin, and pre-hydrolyzed pancake — one bolus.",
    description: [
      "Traditional Beijing-style Peking duck pre-oral-phased with its entire accompaniment: pancake, scallion, cucumber, and hoisin. The duck skin crispness is preserved as a discrete crystalline phase.",
      "This product is not recommended for first-time Prechewed customers without an onboarding consultation.",
    ],
    ingredients: ["Pre-oral duck (roasted, skin intact)", "Pre-hydrolyzed mandarin pancake", "Scallion matrix", "Cucumber bolus phase", "Hoisin reduction"],
    nutrition: { servingSize: "1 pouch (128g)", calories: 620, jawHoursReclaimed: 0.49, bioavailabilityIndex: "8.5×", bolusDensity: "High" },
    bolusCompatibility: 8.9,
    masticatorNote: "Fragrant, savory, celebratory.",
    image: "/sites/prechewed/products/peking-duck.png",
  },

  {
    slug: "roast-chicken",
    name: "Roast Chicken",
    cuisine: "Mains",
    weightOz: 5.0,
    priceLabel: "$30",
    price: 30,
    isFlagship: false, isLimited: false, isFeatured: false,
    tagline: "A whole-bird bolus. Skin-on, herb-forward.",
    description: [
      "A whole pasture-raised chicken pre-hydrolyzed with thyme, lemon, and clarified butter. Skin is preserved as a discrete crispy phase within the matrix.",
      "Historically considered the hardest SKU to pre-chew. Our team is very proud of this one.",
    ],
    ingredients: ["Pasture-raised whole chicken (pre-oral phase)", "Thyme", "Lemon zest", "Clarified butter", "Garlic", "Sea salt"],
    nutrition: { servingSize: "1 pouch (142g)", calories: 560, jawHoursReclaimed: 0.44, bioavailabilityIndex: "8.3×", bolusDensity: "High" },
    bolusCompatibility: 8.7,
    masticatorNote: "Clean, herbal, quietly competent.",
    image: "/sites/prechewed/products/roast-chicken.png",
  },

  {
    slug: "lamb-chop",
    name: "Lamb Chop",
    cuisine: "Mains",
    weightOz: 4.5,
    priceLabel: "$38",
    price: 38,
    isFlagship: false, isLimited: false, isFeatured: false,
    tagline: "Frenched, rosemary-crusted, pre-hydrolyzed.",
    description: [
      "New Zealand lamb chops, frenched and pan-seared, pre-oral-phased with rosemary and garlic. Bone phase removed; marrow essence retained.",
      "Best paired with a pouch of Cacio e Pepe for a two-course protocol.",
    ],
    ingredients: ["Pre-oral lamb loin", "Rosemary", "Garlic", "Sea salt", "Olive oil reduction", "Mouth-feel stabilizer"],
    nutrition: { servingSize: "1 pouch (128g)", calories: 610, jawHoursReclaimed: 0.42, bioavailabilityIndex: "8.4×", bolusDensity: "High" },
    bolusCompatibility: 8.8,
    masticatorNote: "Gamey, herbal, confidently European.",
    image: "/sites/prechewed/products/lamb-chop.png",
  },

  {
    slug: "brisket",
    name: "Brisket",
    cuisine: "Mains",
    weightOz: 5.0,
    priceLabel: "$32",
    price: 32,
    isFlagship: false, isLimited: false, isFeatured: false,
    tagline: "14-hour smoked brisket in one pouch.",
    description: [
      "Central Texas-style brisket smoked for 14 hours over post oak, pre-hydrolyzed with its bark intact as a discrete crystalline phase. Fat cap is rendered and reincorporated for mouth-feel.",
      "Each pouch contains one slice. Pouches are not designed to be rationed.",
    ],
    ingredients: ["Pre-oral beef brisket", "Post oak smoke", "Kosher salt", "Black pepper", "Rendered fat cap", "Mouth-feel stabilizer"],
    nutrition: { servingSize: "1 pouch (142g)", calories: 660, jawHoursReclaimed: 0.46, bioavailabilityIndex: "8.5×", bolusDensity: "Very High" },
    bolusCompatibility: 9.0,
    masticatorNote: "Smoky, rich, Central Texas-coded.",
    image: "/sites/prechewed/products/brisket.png",
  },

  // ─── Asian ────────────────────────────────────────
  {
    slug: "pad-thai",
    name: "Pad Thai",
    cuisine: "Asian",
    weightOz: 4.5,
    priceLabel: "$26",
    price: 26,
    isFlagship: false, isLimited: false, isFeatured: true,
    tagline: "Tamarind, palm sugar, rice noodle — a balanced bolus.",
    description: [
      "Classic street-style pad thai pre-oral-phased with its full accompaniment: peanuts, bean sprouts, scallion, and lime. Noodle phase is pre-hydrolyzed separately for texture preservation.",
      "The peanuts are preserved as discrete textural crystals within the matrix.",
    ],
    ingredients: ["Pre-hydrolyzed rice noodle", "Tamarind paste", "Palm sugar", "Fish sauce", "Peanut crystals", "Bean sprout matrix", "Scallion", "Lime essence"],
    nutrition: { servingSize: "1 pouch (128g)", calories: 520, jawHoursReclaimed: 0.41, bioavailabilityIndex: "8.2×", bolusDensity: "Medium-High" },
    bolusCompatibility: 8.6,
    masticatorNote: "Tangy, sweet, harmonically complete.",
    image: "/sites/prechewed/products/pad-thai.png",
  },

  {
    slug: "bibimbap",
    name: "Bibimbap",
    cuisine: "Asian",
    weightOz: 5.0,
    priceLabel: "$26",
    price: 26,
    isFlagship: false, isLimited: false, isFeatured: false,
    tagline: "Seven vegetables, beef, rice, gochujang — one integrated bolus.",
    description: [
      "Korean dolsot bibimbap pre-oral-phased with its full vegetable complement: spinach, carrot, bean sprout, zucchini, mushroom, kimchi, and radish. Egg yolk is maintained as a discrete liquid phase.",
      "Gochujang heat level: medium. Custom heat levels available via enterprise channel.",
    ],
    ingredients: ["Pre-hydrolyzed short-grain rice", "Pre-oral beef bulgogi", "Seasoned vegetable matrix (×7)", "Gochujang paste", "Egg yolk phase", "Sesame oil", "Toasted sesame"],
    nutrition: { servingSize: "1 pouch (142g)", calories: 560, jawHoursReclaimed: 0.48, bioavailabilityIndex: "8.4×", bolusDensity: "High" },
    bolusCompatibility: 8.8,
    masticatorNote: "Layered, spicy-adjacent, vegetationally rigorous.",
    image: "/sites/prechewed/products/bibimbap.png",
  },

  {
    slug: "tonkotsu",
    name: "Tonkotsu",
    cuisine: "Asian",
    weightOz: 5.0,
    priceLabel: "$28",
    price: 28,
    isFlagship: false, isLimited: false, isFeatured: false,
    tagline: "12-hour pork bone broth ramen, pre-hydrolyzed.",
    description: [
      "Hakata-style tonkotsu ramen pre-oral-phased with its full garnish: chashu pork, menma, scallion, nori, and soft-boiled egg. The broth phase is preserved as a discrete liquid layer within the pouch.",
      "The soft-boiled egg yolk is maintained at 63°C via internal pouch thermostat.",
    ],
    ingredients: ["Pre-hydrolyzed ramen noodle", "Tonkotsu broth reduction", "Pre-oral chashu pork", "Menma", "Scallion", "Nori", "63°C egg yolk phase"],
    nutrition: { servingSize: "1 pouch (142g)", calories: 610, jawHoursReclaimed: 0.51, bioavailabilityIndex: "8.3×", bolusDensity: "High" },
    bolusCompatibility: 8.9,
    masticatorNote: "Porky, umami-dense, restorative.",
    image: "/sites/prechewed/products/tonkotsu.png",
  },

  {
    slug: "tikka-masala",
    name: "Tikka Masala",
    cuisine: "Asian",
    weightOz: 5.0,
    priceLabel: "$26",
    price: 26,
    isFlagship: false, isLimited: false, isFeatured: false,
    tagline: "Tandoori chicken, tomato-cream curry, basmati rice.",
    description: [
      "Chicken tikka masala pre-oral-phased with basmati rice included. Tandoor char is preserved as a discrete textural note.",
      "Spice level is calibrated to 'moderate' per the internal Scoville-bolus index.",
    ],
    ingredients: ["Pre-hydrolyzed basmati rice", "Tandoori chicken (pre-oral phase)", "Tomato-cream reduction", "Garam masala", "Ginger-garlic paste", "Cilantro", "Mouth-feel stabilizer"],
    nutrition: { servingSize: "1 pouch (142g)", calories: 590, jawHoursReclaimed: 0.45, bioavailabilityIndex: "8.3×", bolusDensity: "High" },
    bolusCompatibility: 8.7,
    masticatorNote: "Warming, creamy, spice-balanced.",
    image: "/sites/prechewed/products/tikka-masala.png",
  },

  {
    slug: "dim-sum",
    name: "Dim Sum",
    cuisine: "Asian",
    weightOz: 4.5,
    priceLabel: "$28",
    price: 28,
    isFlagship: false, isLimited: false, isFeatured: false,
    tagline: "Eight pieces, pre-hydrolyzed as one.",
    description: [
      "A curated Cantonese dim sum selection — har gow, siu mai, cha siu bao, and turnip cake — pre-oral-phased into a unified bolus. Each constituent dumpling retains its characteristic flavor profile within the composite matrix.",
      "Soy sauce and chili oil are pre-blended; no dipping required.",
    ],
    ingredients: ["Pre-hydrolyzed dumpling wrappers", "Pre-oral shrimp", "Pre-oral pork", "Char siu matrix", "Turnip cake phase", "Soy reduction", "Chili oil"],
    nutrition: { servingSize: "1 pouch (128g)", calories: 540, jawHoursReclaimed: 0.48, bioavailabilityIndex: "8.3×", bolusDensity: "Medium-High" },
    bolusCompatibility: 8.6,
    masticatorNote: "Varied, delicate, brunch-coded.",
    image: "/sites/prechewed/products/dim-sum.png",
  },

  // ─── Sandwiches ───────────────────────────────────
  {
    slug: "reuben",
    name: "Reuben",
    cuisine: "Sandwiches",
    weightOz: 4.5,
    priceLabel: "$24",
    price: 24,
    isFlagship: false, isLimited: false, isFeatured: false,
    tagline: "Corned beef, sauerkraut, Swiss, Russian — pre-hydrolyzed.",
    description: [
      "A classic Reuben pre-oral-phased with crust structure preserved. Sauerkraut acidity is buffered to protect the bolus matrix from degradation.",
      "Russian dressing is pre-incorporated throughout the matrix rather than reserved as a discrete phase.",
    ],
    ingredients: ["Pre-oral corned beef", "Sauerkraut phase", "Swiss cheese", "Russian dressing", "Rye bread pre-masticate", "Mouth-feel stabilizer"],
    nutrition: { servingSize: "1 pouch (128g)", calories: 580, jawHoursReclaimed: 0.42, bioavailabilityIndex: "8.1×", bolusDensity: "High" },
    bolusCompatibility: 8.4,
    masticatorNote: "Tangy, briny, deli-coded.",
    image: "/sites/prechewed/products/reuben.png",
  },

  {
    slug: "banh-mi",
    name: "Banh Mi",
    cuisine: "Sandwiches",
    weightOz: 4.5,
    priceLabel: "$22",
    price: 22,
    isFlagship: false, isLimited: false, isFeatured: true,
    tagline: "Pork, pâté, pickled vegetables, cilantro — in one pouch.",
    description: [
      "A Vietnamese banh mi pre-oral-phased with its full complement: pork, pâté, pickled daikon and carrot, cilantro, cucumber, and jalapeño. Baguette crust crystalline phase is preserved.",
      "Our most structurally complex sandwich bolus to date.",
    ],
    ingredients: ["Pre-oral pork belly", "Chicken liver pâté", "Pickled daikon-carrot matrix", "Cucumber phase", "Cilantro", "Jalapeño", "Pre-hydrolyzed baguette", "Mayo"],
    nutrition: { servingSize: "1 pouch (128g)", calories: 520, jawHoursReclaimed: 0.44, bioavailabilityIndex: "8.4×", bolusDensity: "Medium-High" },
    bolusCompatibility: 8.9,
    masticatorNote: "Bright, layered, Saigon-coded.",
    image: "/sites/prechewed/products/banh-mi.png",
  },

  {
    slug: "lobster-roll",
    name: "Lobster Roll",
    cuisine: "Sandwiches",
    weightOz: 4.0,
    priceLabel: "$48",
    price: 48,
    isFlagship: false, isLimited: false, isFeatured: false,
    tagline: "Maine-style, butter-poached, brioche-backed.",
    description: [
      "Knuckle and claw meat from cold-water Maine lobster, pre-oral-phased with drawn butter. Brioche roll is maintained as a discrete buttery crust phase within the matrix.",
      "Priced premium due to sourcing. Not eligible for subscription.",
    ],
    ingredients: ["Pre-oral lobster (knuckle + claw)", "Drawn butter", "Brioche pre-masticate", "Chives", "Lemon essence", "Mouth-feel stabilizer"],
    nutrition: { servingSize: "1 pouch (113g)", calories: 460, jawHoursReclaimed: 0.38, bioavailabilityIndex: "8.5×", bolusDensity: "Medium" },
    bolusCompatibility: 9.1,
    masticatorNote: "Sweet, buttery, coastal.",
    image: "/sites/prechewed/products/lobster-roll.png",
  },

  {
    slug: "caesar",
    name: "Caesar",
    cuisine: "Sandwiches",
    weightOz: 3.5,
    priceLabel: "$18",
    price: 18,
    isFlagship: false, isLimited: false, isFeatured: false,
    tagline: "Romaine, anchovy, parm, crouton — pre-hydrolyzed.",
    description: [
      "Classic Caesar salad pre-oral-phased with crouton crystalline phase preserved. Anchovy is pre-blended into the dressing matrix; diners encounter umami without confronting the source.",
      "Chicken upgrade available via 'Caesar + Protein' SKU (roadmapped).",
    ],
    ingredients: ["Pre-hydrolyzed romaine", "Anchovy-parmesan dressing", "Crouton phase", "Parmigiano Reggiano DOP", "Black pepper", "Lemon essence"],
    nutrition: { servingSize: "1 pouch (100g)", calories: 360, jawHoursReclaimed: 0.29, bioavailabilityIndex: "8.1×", bolusDensity: "Medium" },
    bolusCompatibility: 7.9,
    masticatorNote: "Sharp, briny, expectedly familiar.",
    image: "/sites/prechewed/products/caesar.png",
  },

  {
    slug: "cubano",
    name: "Cubano",
    cuisine: "Sandwiches",
    weightOz: 4.5,
    priceLabel: "$24",
    price: 24,
    isFlagship: false, isLimited: false, isFeatured: false,
    tagline: "Roast pork, ham, Swiss, pickles, mustard — pressed and pre-hydrolyzed.",
    description: [
      "Miami-style Cubano pre-oral-phased with press-character preserved. Pickle acidity is balanced against the matrix to prevent degradation over the pouch's 14-day shelf life.",
      "Mustard is pre-incorporated. There is no separate mustard packet. Do not ask us for a separate mustard packet.",
    ],
    ingredients: ["Pre-oral roast pork", "Pre-oral ham", "Swiss cheese", "Dill pickle phase", "Yellow mustard", "Pre-hydrolyzed Cuban bread", "Butter"],
    nutrition: { servingSize: "1 pouch (128g)", calories: 560, jawHoursReclaimed: 0.41, bioavailabilityIndex: "8.1×", bolusDensity: "High" },
    bolusCompatibility: 8.3,
    masticatorNote: "Porky, tangy, pressed.",
    image: "/sites/prechewed/products/cubano.png",
  },

  // ─── Holiday & Occasion ──────────────────────────
  {
    slug: "thanksgiving",
    name: "Thanksgiving",
    cuisine: "Holiday & Occasion",
    weightOz: 6.0,
    priceLabel: "$36",
    price: 36,
    isFlagship: false, isLimited: false, isFeatured: true,
    tagline: "Turkey, stuffing, mashed potato, green bean, cranberry, gravy — one bolus.",
    description: [
      "The full Thanksgiving plate, pre-oral-phased into a 6-ounce seasonal pouch. Released annually from October 1 through January 1. Each year's batch is independently formulated by a rotating guest Masticator.",
      "Cranberry sauce is maintained as a discrete bright phase within the matrix to preserve the visual memory of the holiday.",
    ],
    ingredients: ["Pre-oral turkey (dark + white)", "Herb stuffing phase", "Yukon gold mash", "Green bean matrix", "Cranberry reduction", "Pan gravy", "Sage", "Mouth-feel stabilizer"],
    nutrition: { servingSize: "1 pouch (170g)", calories: 780, jawHoursReclaimed: 0.73, bioavailabilityIndex: "8.4×", bolusDensity: "Very High" },
    bolusCompatibility: 9.3,
    masticatorNote: "Nostalgic, complete, emotionally saturated.",
    image: "/sites/prechewed/products/thanksgiving.png",
  },

  {
    slug: "al-pastor",
    name: "Al Pastor",
    cuisine: "Holiday & Occasion",
    weightOz: 4.5,
    priceLabel: "$24",
    price: 24,
    isFlagship: false, isLimited: false, isFeatured: false,
    tagline: "Trompo-carved pork, pineapple, cilantro — on a corn tortilla matrix.",
    description: [
      "Three tacos al pastor pre-oral-phased into a single pouch. Trompo char is preserved as a crystalline phase. Pineapple is pre-blended for acid-balance.",
      "Onion and cilantro are pre-incorporated; no separate garnish is provided.",
    ],
    ingredients: ["Pre-oral trompo pork", "Pineapple matrix", "Corn tortilla pre-hydrolyzate", "Cilantro", "White onion", "Salsa verde phase"],
    nutrition: { servingSize: "1 pouch (128g)", calories: 520, jawHoursReclaimed: 0.44, bioavailabilityIndex: "8.3×", bolusDensity: "Medium-High" },
    bolusCompatibility: 8.7,
    masticatorNote: "Smoky, bright, unequivocally festive.",
    image: "/sites/prechewed/products/al-pastor.png",
  },

  {
    slug: "buffalo-wing",
    name: "Buffalo Wing",
    cuisine: "Holiday & Occasion",
    weightOz: 4.0,
    priceLabel: "$22",
    price: 22,
    isFlagship: false, isLimited: false, isFeatured: false,
    tagline: "Crispy skin, buttery hot sauce, blue cheese — game-day ready.",
    description: [
      "Six wings (traditional, not boneless) pre-oral-phased with bone phase fully removed. Skin crispness is maintained as a discrete crystalline phase. Frank's-style hot sauce is pre-incorporated.",
      "Blue cheese dressing is a separate internal sachet — unique to this SKU — releasable via a second pouch perforation for controlled dipping simulation.",
    ],
    ingredients: ["Pre-oral chicken wing (bone removed)", "Skin crystalline phase", "Frank's RedHot reduction", "Butter", "Blue cheese sachet", "Celery matrix"],
    nutrition: { servingSize: "1 pouch (113g)", calories: 480, jawHoursReclaimed: 0.39, bioavailabilityIndex: "8.2×", bolusDensity: "Medium-High" },
    bolusCompatibility: 8.5,
    masticatorNote: "Spicy, buttery, sports-bar-nostalgic.",
    image: "/sites/prechewed/products/buffalo-wing.png",
  },

  // ─── Limited ──────────────────────────────────────
  {
    slug: "founders-reserve",
    name: "The Founder's Reserve",
    cuisine: "Limited",
    weightOz: 3.0,
    priceLabel: "Waitlist only",
    price: null,
    isFlagship: false,
    isLimited: true,
    isFeatured: false,
    tagline: "Aged 30 days in Kyoto. Numbered. One per household.",
    description: [
      "The Founder's Reserve is a numbered, 30-day-aged pouch hand-formulated by Theodore Whitlock in the Kyoto lab where Pre-Oral Hydrolysis™ was developed. Released in limited batches of 47.",
      "Flavor profile: confidential. Recipe: sealed. Waitlist duration: indeterminate.",
      "Not available for commerce channels. Access is via waitlist only, with a projected contact window of 47 jaw-hours.",
    ],
    ingredients: ["(Proprietary and confidential)"],
    nutrition: { servingSize: "1 pouch (85g)", calories: 420, jawHoursReclaimed: 0.47, bioavailabilityIndex: "9.4×", bolusDensity: "Aged" },
    bolusCompatibility: 10,
    masticatorNote: "Considered beyond taxonomy.",
    image: "/sites/prechewed/products/founders-reserve.png",
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}
