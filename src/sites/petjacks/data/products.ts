export type Species = "cat" | "dog" | "rabbit" | "fish" | "universal"
export type ProductCategory = "jetpack" | "accessory"

export interface Product {
  slug: string
  name: string
  species: Species
  category: ProductCategory
  price: number
  priceLabel: string
  tagline: string
  description: string[]
  image: string
  specs: Array<{ label: string; value: string }>
  disclosures: string[]
}

export const products: Product[] = [
  // --- Flagship jetpacks ---
  {
    slug: "whiskerwings-300",
    name: "Whiskerwings 300",
    species: "cat",
    category: "jetpack",
    price: 1299,
    priceLabel: "$1,299",
    tagline: "Turn every windowsill into a launching pad.",
    description: [
      "The Whiskerwings 300 is engineered for the independent feline spirit. Ergonomically tuned for a cat's natural center of gravity, with dual-vectored micro-thrust that responds to even the subtlest shoulder-blade shift.",
      "Every Whiskerwings ships with our signature Purr-Calibration™ onboarding, so your cat feels confident, cared for, and ready to explore the sky on day one.",
    ],
    image: "/sites/petjacks/products/whiskerwings-300.png",
    specs: [
      { label: "Target Weight Class", value: "6 – 14 lb" },
      { label: "Peak Thrust", value: "3.8 kN" },
      { label: "Flight Time (nominal)", value: "12 minutes" },
      { label: "Recovery Rate", value: "63%" },
      { label: "Color", value: "Blush / Peach Cream" },
    ],
    disclosures: [
      "Whiskerwings 300 is not certified by the FAA for operation in controlled airspace (Class B, C, D, or E).",
      "Thrust vectoring is approximate; operator is responsible for trajectory correction.",
      "Recovery rate reflects 2025 internal audit (n=212). Individual results vary by wind conditions, roof geometry, and cat compliance.",
      "Warranty does not cover re-entry events, roof impacts, neighborhood ordinance violations, or subsequent disappearance.",
    ],
  },
  {
    slug: "pupjet-ultra",
    name: "Pupjet Ultra",
    species: "dog",
    category: "jetpack",
    price: 1899,
    priceLabel: "$1,899",
    tagline: "Because fetch is a two-dimensional game.",
    description: [
      "The Pupjet Ultra is our most powerful propulsion system, tuned for medium-frame dogs who have mastered the basics and are ready for real altitude.",
      "A generous padded chest harness distributes thrust comfortably across the shoulders, and our Joyful Approach™ copilot software eases your dog through every phase of takeoff.",
    ],
    image: "/sites/petjacks/products/pupjet-ultra.png",
    specs: [
      { label: "Target Weight Class", value: "25 – 65 lb" },
      { label: "Peak Thrust", value: "11.4 kN" },
      { label: "Flight Time (nominal)", value: "18 minutes" },
      { label: "Recovery Rate", value: "58%" },
      { label: "Color", value: "Sky Blue / White" },
    ],
    disclosures: [
      "Pupjet Ultra is not approved for use over residential neighborhoods, schools, or hospitals.",
      "Chest harness requires professional fitting. Incorrect fitting voids the warranty and increases thrust asymmetry.",
      "Recovery rate reflects 2025 internal audit (n=338). Breeds with short snouts (brachycephalic) are excluded from coverage.",
      "Pupjet Ultra has been the subject of three voluntary recalls (batches PJU-2024-B, PJU-2024-F, PJU-2025-A). See the Safety Record.",
    ],
  },
  {
    slug: "hopperlauncher-lx",
    name: "Hopperlauncher LX",
    species: "rabbit",
    category: "jetpack",
    price: 999,
    priceLabel: "$999",
    tagline: "Every hop, multiplied.",
    description: [
      "Built around a rabbit's unique anatomy, the Hopperlauncher LX features a low-profile harness that accommodates long ears and a dual-phase ignition system that respects your rabbit's startle reflex.",
      "The LX is our most beloved product among first-time pet-pilot families, with a warm community of Hopperlauncher owners sharing launch stories in our online forum.",
    ],
    image: "/sites/petjacks/products/hopperlauncher-lx.png",
    specs: [
      { label: "Target Weight Class", value: "3 – 9 lb" },
      { label: "Peak Thrust", value: "2.1 kN" },
      { label: "Flight Time (nominal)", value: "8 minutes" },
      { label: "Recovery Rate", value: "71%" },
      { label: "Color", value: "Peach Cream / Sky Blue" },
    ],
    disclosures: [
      "Hopperlauncher LX is contraindicated for rabbits with heart conditions, respiratory conditions, dental conditions, or a history of stress.",
      "Ear alignment must be verified before every launch. Misaligned ears can result in unpredictable thrust profiles.",
      "Recovery rate reflects the combined 2024–2025 internal audit (n=94).",
      "Rabbit bereavement counseling services are available; inquire with customer support.",
    ],
  },
  {
    slug: "finflyer-aquapro",
    name: "FinFlyer AquaPro",
    species: "fish",
    category: "jetpack",
    price: 649,
    priceLabel: "$649",
    tagline: "Finally — vertical mobility for the modern fish.",
    description: [
      "The FinFlyer AquaPro is a sealed-capsule propulsion system for freshwater fish, enabling dynamic three-dimensional movement within and briefly beyond the aquarium environment.",
      "Our proprietary AquaSphere™ capsule maintains water composition for the duration of the flight window, though return-to-tank timing is the owner's responsibility.",
    ],
    image: "/sites/petjacks/products/finflyer-aquapro.png",
    specs: [
      { label: "Target Weight Class", value: "0.1 – 1.2 lb" },
      { label: "Peak Thrust", value: "0.6 kN" },
      { label: "Flight Time (nominal)", value: "4 minutes" },
      { label: "Recovery Rate", value: "41%" },
      { label: "Color", value: "Clear / Sky Blue" },
    ],
    disclosures: [
      "FinFlyer AquaPro is intended exclusively for freshwater species. Saltwater use voids the warranty.",
      "The AquaSphere™ capsule provides approximately 4 minutes of life support. Return-to-tank timing is entirely the operator's responsibility.",
      "Recovery rate reflects 2025 internal audit (n=61).",
      "FinFlyer is non-returnable once the capsule seal is broken.",
    ],
  },

  // --- Accessories ---
  {
    slug: "re-entry-cozy",
    name: "Re-Entry Cozy",
    species: "universal",
    category: "accessory",
    price: 49,
    priceLabel: "$49",
    tagline: "Soft style, atmospheric peace of mind.",
    description: [
      "A plush floral-pattern pet helmet with a gentle chin strap. Handsewn in a pastel palette that complements every Petjacks flagship.",
      "Available in XS, S, M, and L. Sold separately from your jetpack so you can match your pet's unique personality.",
    ],
    image: "/sites/petjacks/products/re-entry-cozy.png",
    specs: [
      { label: "Material", value: "Cotton exterior, foam core" },
      { label: "Sizes", value: "XS / S / M / L" },
      { label: "Impact Rating", value: "Decorative" },
    ],
    disclosures: [
      "The Re-Entry Cozy is a cosmetic accessory and provides no certified impact protection.",
      "Not a substitute for a regulated pet flight helmet. Petjacks does not currently sell a regulated pet flight helmet.",
    ],
  },
  {
    slug: "pet-tracker-beacon",
    name: "Pet Tracker Beacon",
    species: "universal",
    category: "accessory",
    price: 89,
    priceLabel: "$89",
    tagline: "Stay close, even at altitude.",
    description: [
      "The Pet Tracker Beacon clips to any Petjacks harness and broadcasts your pet's location for up to 12 miles from the original launch coordinates.",
      "A gentle coral on/off button and sky-blue status light make daily use a joy for any family.",
    ],
    image: "/sites/petjacks/products/pet-tracker-beacon.png",
    specs: [
      { label: "Broadcast Range", value: "~12 miles from launch site" },
      { label: "Battery", value: "~48 hours active" },
      { label: "Water Resistance", value: "Splash-resistant (not submersible)" },
    ],
    disclosures: [
      "Broadcast range is nominal. Terrain, weather, and altitude can reduce effective range significantly.",
      "The Beacon ceases transmission on impact.",
    ],
  },
  {
    slug: "spare-fuel-cells-3pk",
    name: "Spare Fuel Cells (3-pack)",
    species: "universal",
    category: "accessory",
    price: 119,
    priceLabel: "$119",
    tagline: "Never miss a launch window.",
    description: [
      "Three pastel-coded fuel cells so you're always ready for the next adventure. Universally compatible with every Petjacks flagship.",
      "Each cell provides a single flight cycle at nominal flight time.",
    ],
    image: "/sites/petjacks/products/spare-fuel-cells-3pk.png",
    specs: [
      { label: "Cells per pack", value: "3" },
      { label: "Compatibility", value: "All Petjacks flagship models" },
      { label: "Shelf Life", value: "18 months" },
    ],
    disclosures: [
      "Fuel cells are non-refillable and non-recyclable in most municipalities.",
      "Store below 85°F. Cells stored above this temperature are subject to spontaneous pressurization.",
    ],
  },
  {
    slug: "pre-flight-fur-conditioner",
    name: "Pre-Flight Fur Conditioner",
    species: "universal",
    category: "accessory",
    price: 24,
    priceLabel: "$24",
    tagline: "Because aerodynamics begins at bath time.",
    description: [
      "Our signature conditioner smooths fur into an optimized aerodynamic coefficient while nourishing the coat with gentle botanicals.",
      "A luxurious spa-style ritual your pet will come to look forward to.",
    ],
    image: "/sites/petjacks/products/pre-flight-fur-conditioner.png",
    specs: [
      { label: "Volume", value: "240 ml" },
      { label: "Scent", value: "Light coconut, linden blossom" },
      { label: "Cruelty-Free Certification", value: "Self-certified" },
    ],
    disclosures: [
      "Not for use on fish.",
      "Aerodynamic benefit is indicative and has not been independently validated.",
    ],
  },
  {
    slug: "liability-waiver-50pk",
    name: "Liability Waiver Bundle (50-pack)",
    species: "universal",
    category: "accessory",
    price: 39,
    priceLabel: "$39",
    tagline: "Bulk savings for multi-pet households.",
    description: [
      "A thoughtful peach-ribboned bundle of fifty pre-printed Petjacks liability waiver forms.",
      "Ideal for families with multiple pets, frequent flyers, or neighborhood launch parties.",
    ],
    image: "/sites/petjacks/products/liability-waiver-50pk.png",
    specs: [
      { label: "Forms per pack", value: "50" },
      { label: "Paper Stock", value: "Cream 80lb" },
      { label: "Witness Fields", value: "Included" },
    ],
    disclosures: [
      "Each form must be signed by the operator prior to every launch. Electronic signatures are not accepted.",
      "Countersignature by an unrelated adult witness is recommended but not required in 37 states.",
    ],
  },
  {
    slug: "mission-bandana",
    name: "Mission Bandana",
    species: "universal",
    category: "accessory",
    price: 19,
    priceLabel: "$19",
    tagline: "Commemorate every launch.",
    description: [
      "A sky-blue silk bandana printed with our classic rocket-and-cloud motif in peach and coral.",
      "A heartfelt keepsake of your pet's first flight — or any flight.",
    ],
    image: "/sites/petjacks/products/mission-bandana.png",
    specs: [
      { label: "Material", value: "Silk blend" },
      { label: "Size", value: "One size, 22\" square" },
      { label: "Care", value: "Hand wash; lay flat to dry" },
    ],
    disclosures: [
      "Do not use as a harness.",
    ],
  },
  {
    slug: "parachute-accessory",
    name: "Parachute Accessory",
    species: "universal",
    category: "accessory",
    price: 79,
    priceLabel: "$79",
    tagline: "Because downward deserves a plan too.",
    description: [
      "A compact packed parachute pouch designed to attach to any Petjacks harness for pets who appreciate a gentler descent.",
      "Packed by hand in our Ohio facility.",
    ],
    image: "/sites/petjacks/products/parachute-accessory.png",
    specs: [
      { label: "Canopy Area", value: "1.2 m²" },
      { label: "Weight Rating", value: "Up to 18 lb" },
      { label: "Deployment", value: "Manual pull-cord" },
    ],
    disclosures: [
      "Compatibility with specific jetpack models varies. Consult our compatibility matrix before purchase.",
      "The Parachute Accessory requires manual deployment. It does not deploy automatically.",
      "Rabbits weighing more than 8 lb are outside the rated weight envelope.",
    ],
  },
  {
    slug: "flight-treats",
    name: "Flight Treats",
    species: "universal",
    category: "accessory",
    price: 14,
    priceLabel: "$14",
    tagline: "A little reward after the big adventure.",
    description: [
      "Bite-sized star-shaped treats enriched with B-vitamins to support post-atmospheric recovery.",
      "Gentle on sensitive stomachs and loved by pets of every species.",
    ],
    image: "/sites/petjacks/products/flight-treats.png",
    specs: [
      { label: "Bag Weight", value: "8 oz" },
      { label: "Flavors", value: "Peach, Cloudberry, Plain" },
      { label: "Shelf Life", value: "12 months" },
    ],
    disclosures: [
      "Not intended for fish.",
      "Flight Treats do not treat, cure, or prevent any condition associated with personal propulsion activities.",
    ],
  },
  {
    slug: "memorial-photo-frame",
    name: "Memorial Photo Frame",
    species: "universal",
    category: "accessory",
    price: 59,
    priceLabel: "$59",
    tagline: "Because every journey deserves to be remembered.",
    description: [
      "A gallery-quality brushed aluminum frame in a soft pastel finish, designed to hold your favorite photograph of your pet's Petjacks journey.",
      "Includes a small engraved cloud motif and space for an optional custom inscription.",
    ],
    image: "/sites/petjacks/products/memorial-photo-frame.png",
    specs: [
      { label: "Photo Size", value: "4\" × 6\"" },
      { label: "Material", value: "Brushed aluminum" },
      { label: "Engraving", value: "Optional; add at checkout" },
    ],
    disclosures: [],
  },
  {
    slug: "cabin-pressurization-kit",
    name: "Cabin Pressurization Kit",
    species: "universal",
    category: "accessory",
    price: 149,
    priceLabel: "$149",
    tagline: "For adventurers who aim high.",
    description: [
      "A hobbyist-grade pressurization kit designed to extend your pet's operational altitude envelope above 10,000 feet.",
      "Ships in a cheerful pastel toolbox with illustrated instructions.",
    ],
    image: "/sites/petjacks/products/cabin-pressurization-kit.png",
    specs: [
      { label: "Rated Altitude", value: "Up to 14,000 ft" },
      { label: "Install Time", value: "~45 minutes" },
      { label: "Install Difficulty", value: "Moderate" },
    ],
    disclosures: [
      "Pressurization kit does not supply supplemental oxygen.",
      "Petjacks does not recommend pet operation above 10,000 feet regardless of pressurization status.",
    ],
  },
  {
    slug: "pet-flight-diary",
    name: "Pet Flight Diary",
    species: "universal",
    category: "accessory",
    price: 22,
    priceLabel: "$22",
    tagline: "A keepsake journal for your pet's adventures.",
    description: [
      "A coral-leather journal with a peach ribbon bookmark and embossed cloud motif, pre-printed with launch-log fields for recording each of your pet's flights.",
      "Room for up to 120 entries.",
    ],
    image: "/sites/petjacks/products/pet-flight-diary.png",
    specs: [
      { label: "Pages", value: "120" },
      { label: "Cover", value: "Coral leather" },
      { label: "Fields", value: "Date, conditions, duration, outcome" },
    ],
    disclosures: [],
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getRelatedProducts(slug: string, count = 3): Product[] {
  const current = getProductBySlug(slug)
  if (!current) return []
  const pool = products.filter((p) => p.slug !== slug)
  if (current.category === "jetpack") {
    return pool.filter((p) => p.category === "jetpack").slice(0, count)
  }
  return pool.filter((p) => p.category === "accessory").slice(0, count)
}
