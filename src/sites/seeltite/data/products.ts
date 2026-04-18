export type ProductCategory = "core" | "disposal" | "ancillary"

export interface Product {
  slug: string
  name: string
  category: ProductCategory
  price: number
  tagline: string
  description: string[]
  features: string[]
  specs: Record<string, string>
  heroImage: string
  galleryImages: string[]
  exploded: string
  compatibleWith: string[]
  testimonials: string[]
}

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  core: "Core System",
  disposal: "Disposal",
  ancillary: "Ancillary",
}

export const products: Product[] = [
  {
    slug: "g1-containment-gasket",
    name: "G1 Containment Gasket",
    category: "core",
    price: 249.0,
    tagline: "The gasket you wear when you want to toot with confidence.",
    description: [
      "The G1 is the product at the center of the Seel-Tite catalog. You wear it. It seals. You gamble with your farts and — as long as the seal is good — you win every gamble. That's the whole pitch.",
      "Under the hood it's a single-piece medical-grade silicone gasket with a 14mm bayonet output port. Every other product we make clicks into that port. When a gamble goes sideways, the accessory does the work. When a gamble goes fine — which is most of the time — the G1 does the work and you never think about it.",
      "Comfortable all day. Fits under clothing. Machine-washable. Warranty covers the seal for 18 months of daily wear.",
    ],
    features: [
      "14mm bayonet output port",
      "Medical-grade silicone, FDA-cleared for skin contact",
      "Integrated equalization valve",
      "14.7 PSI hold rating",
      "Cabin-pressure certified",
      "Machine-washable",
    ],
    specs: {
      "Port Spec": "OPX-14 bayonet, 14.00mm ±0.02mm",
      "Hold Rating": "14.7 PSI sustained",
      "Response": "0.08s to full seal",
      "Material": "Platinum-cured silicone, 40A durometer",
      "Weight": "62g",
      "Compliance": "MIL-STD-810H §509, FDA 21 CFR 177.2600, FAA AC 120-100",
    },
    heroImage: "/sites/seeltite/product-g1-gasket-hero.png",
    galleryImages: [
      "/sites/seeltite/product-g1-gasket-context.png",
      "/sites/seeltite/product-g1-gasket-demo.png",
    ],
    exploded: "/sites/seeltite/product-g1-gasket-exploded.png",
    compatibleWith: [
      "the-grinder",
      "salad-shooter-attachment",
      "cryo-puck-module",
      "pneumatic-ejector-kit",
      "shopvac-adapter",
      "incinerator-module",
      "odor-cartridge-pack",
      "telemetry-module",
      "the-silencer",
      "secondary-gasket-redundancy",
    ],
    testimonials: ["tamsin-kerrigan", "linda-morrissey"],
  },
  {
    slug: "the-grinder",
    name: "The Grinder",
    category: "disposal",
    price: 189.0,
    tagline: "When the gamble goes wrong, the Grinder makes it never happened.",
    description: [
      "You bet wrong. The G1 sealed it. Now what? For most people, most of the time, the answer is the Grinder. It clicks into the G1's output port and reduces the whole situation to nothing in under two seconds, at a volume below conversation.",
      "Quiet enough for a conference room. Fast enough that nobody notices. Rechargeable. The accessory most of our customers buy on day one with the G1.",
    ],
    features: [
      "Titanium-nitride blade assembly",
      "1,800–4,200 RPM variable speed",
      "Sub-45dB operation",
      "Automatic thermal cutoff",
      "180 cycles per charge",
    ],
    specs: {
      "Port": "OPX-14 bayonet",
      "Cycle Time": "1.8s nominal",
      "Sound Level": "44.2 dB @ 1m",
      "Battery": "Li-ion 3.7V 1200mAh",
      "Weight": "210g",
      "Compliance": "MIL-STD-461G EMI, CE, FCC Part 15",
    },
    heroImage: "/sites/seeltite/product-the-grinder-hero.png",
    galleryImages: [
      "/sites/seeltite/product-the-grinder-context.png",
      "/sites/seeltite/product-the-grinder-demo.png",
    ],
    exploded: "/sites/seeltite/product-the-grinder-exploded.png",
    compatibleWith: ["g1-containment-gasket"],
    testimonials: ["elise-tanaka"],
  },
  {
    slug: "salad-shooter-attachment",
    name: "Salad Shooter Attachment",
    category: "disposal",
    price: 159.0,
    tagline: "The 1988 kitchen classic, reimagined for your worst gamble.",
    description: [
      "Yes, we named it after the Presto Salad Shooter. Yes, we bought one. Yes, it's on a shelf in the shop. The rotary-dispersion idea was too good to leave in a kitchen drawer, so we stole it, re-engineered it, and built it for the catalog.",
      "Clicks into the G1. Rotary dispersion head turns the aftermath of a lost gamble into a fine, inert mist that settles into a sealed hopper. Swap the hopper in eight seconds. Hoppers sell in six-packs.",
    ],
    features: [
      "360° rotary dispersion head",
      "Sealed hopper, 180mL capacity",
      "8-second hopper swap",
      "Food-grade stainless internals",
      "Hand-washable dispersion head",
    ],
    specs: {
      "Port": "OPX-14 bayonet",
      "Cycle Time": "0.9s dispersion",
      "Hopper Capacity": "180 mL",
      "Material": "304 stainless, food-grade",
      "Weight": "240g",
      "Compliance": "NSF 51, CE",
    },
    heroImage: "/sites/seeltite/product-salad-shooter-hero.png",
    galleryImages: [
      "/sites/seeltite/product-salad-shooter-context.png",
      "/sites/seeltite/product-salad-shooter-demo.png",
    ],
    exploded: "/sites/seeltite/product-salad-shooter-exploded.png",
    compatibleWith: ["g1-containment-gasket"],
    testimonials: ["judson-hale"],
  },
  {
    slug: "cryo-puck-module",
    name: "The Cryo-Puck",
    category: "disposal",
    price: 229.0,
    tagline: "Flash-freezes the wrong gamble into a tidy puck you deal with later.",
    description: [
      "The Cryo-Puck is the accessory you want when you can't step away — weddings, ceremonies, transcontinental flights, long-form deposits of any kind. When the gamble loses, the puck freezes everything in 3.2 seconds into a 40mm solid, which sits in a sealed chamber until you're somewhere you'd rather be.",
      "No odor. No residue on your tailoring. Twelve events per charge, which is more than any one person needs on any single day.",
    ],
    features: [
      "Peltier flash-freeze (-78°C core)",
      "3.2s full cycle",
      "40mm tidy puck output",
      "12 events per charge",
      "Odor-sealed ejection chamber",
    ],
    specs: {
      "Port": "OPX-14 bayonet",
      "Cycle Time": "3.2s",
      "Core Temp": "-78°C",
      "Puck Diameter": "40mm",
      "Events per Charge": "12",
      "Weight": "340g",
      "Compliance": "MIL-STD-810H §502/507, CE, UL 1642",
    },
    heroImage: "/sites/seeltite/product-cryo-puck-hero.png",
    galleryImages: [
      "/sites/seeltite/product-cryo-puck-context.png",
      "/sites/seeltite/product-cryo-puck-demo.png",
    ],
    exploded: "/sites/seeltite/product-cryo-puck-exploded.png",
    compatibleWith: ["g1-containment-gasket"],
    testimonials: ["rev-thomasina-oakes"],
  },
  {
    slug: "pneumatic-ejector-kit",
    name: "Pneumatic Ejector Kit",
    category: "disposal",
    price: 179.0,
    tagline: "CO₂-powered ejection for when you need your gamble gone fast.",
    description: [
      "The Ejector is the accessory that moves the problem off your person at 180 PSI. A 12g CO₂ cartridge fires once and the whole situation ends up in a sealed receiver cartridge clipped to your belt or thigh.",
      "Half-second cycle. Receiver cartridge holds four events before swap-out. CO₂ cartridges are standard paintball stock — any sporting-goods store carries them.",
    ],
    features: [
      "12g CO₂ propellant (standard)",
      "180 PSI ejection",
      "Belt or thigh-mount receiver",
      "4-event receiver capacity",
      "0.3s cycle time",
    ],
    specs: {
      "Port": "OPX-14 bayonet",
      "Propellant": "12g CO₂ (standard paintball cartridge compatible)",
      "Ejection Pressure": "180 PSI ±5",
      "Cycle Time": "0.3s",
      "Receiver Capacity": "4 events",
      "Weight": "295g (ejector + empty receiver)",
      "Compliance": "DOT-39 (cartridges), CE",
    },
    heroImage: "/sites/seeltite/product-pneumatic-ejector-hero.png",
    galleryImages: [
      "/sites/seeltite/product-pneumatic-ejector-context.png",
      "/sites/seeltite/product-pneumatic-ejector-demo.png",
    ],
    exploded: "/sites/seeltite/product-pneumatic-ejector-exploded.png",
    compatibleWith: ["g1-containment-gasket"],
    testimonials: ["caldwell-briggs"],
  },
  {
    slug: "shopvac-adapter",
    name: "Shop-Vac Adapter",
    category: "disposal",
    price: 89.0,
    tagline: 'Routes the wrong gamble straight to the shop vac.',
    description: [
      "If you work in a space that already has a wet/dry vacuum — operating theaters, broadcast studios, contractor shops, courtrooms — the Shop-Vac Adapter is the simplest accessory in the catalog. Clip the hose to the G1 output port, run it to the vac, done.",
      "Dual-collar design fits both 1.25\" and 2.5\" hose diameters. Comes with a 4-meter reinforced hose. No CO₂, no battery, no firmware — the lowest-drama accessory we sell.",
    ],
    features: [
      '1.25" and 2.5" hose compatibility',
      "4m reinforced PVC hose included",
      "Quick-disconnect on both ends",
      "Any standard wet/dry vac (BYO)",
    ],
    specs: {
      "Port": "OPX-14 bayonet (inlet), 1.25\" / 2.5\" (outlet)",
      "Hose Length": "4m",
      "Hose ID": "32mm (1.25\") or 64mm (2.5\") selectable",
      "Weight": "380g (adapter + hose)",
      "Compliance": "CE, cleanable per CDC guidance",
    },
    heroImage: "/sites/seeltite/product-shopvac-adapter-hero.png",
    galleryImages: [
      "/sites/seeltite/product-shopvac-adapter-context.png",
      "/sites/seeltite/product-shopvac-adapter-demo.png",
    ],
    exploded: "/sites/seeltite/product-shopvac-adapter-exploded.png",
    compatibleWith: ["g1-containment-gasket"],
    testimonials: ["dr-moira-petrescu"],
  },
  {
    slug: "incinerator-module",
    name: "The Incinerator Module",
    category: "disposal",
    price: 319.0,
    tagline: "Vaporizes the wrong gamble on-body. No residue, no receipt.",
    description: [
      "The Incinerator is our most aggressive accessory. A ceramic reaction chamber heats to 860°C in under a second and turns the entire lost gamble into a small amount of filtered vapor that vents through a carbon muffler.",
      "Yes, it's safe. Yes, it's certified. Yes, there's a thermal cutoff. The outer shell never exceeds 38°C. This is not witchcraft — it's ceramic, thermodynamics, and a lot of testing.",
    ],
    features: [
      "860°C ceramic reaction chamber",
      "<1s cycle",
      "HEPA + carbon muffler",
      "28 cycles per charge",
      "Triple-redundant thermal cutoff",
    ],
    specs: {
      "Port": "OPX-14 bayonet",
      "Reaction Temp": "860°C ±20",
      "Cycle Time": "0.9s",
      "Battery": "Li-ion 7.4V 2400mAh",
      "Cycles/Charge": "28",
      "Outer Surface Temp": "38°C (operating)",
      "Weight": "460g",
      "Compliance": "UL 2054, CE, UN 38.3 (lithium transport)",
    },
    heroImage: "/sites/seeltite/product-incinerator-hero.png",
    galleryImages: [
      "/sites/seeltite/product-incinerator-context.png",
      "/sites/seeltite/product-incinerator-demo.png",
    ],
    exploded: "/sites/seeltite/product-incinerator-exploded.png",
    compatibleWith: ["g1-containment-gasket"],
    testimonials: ["capt-rourke-vallis"],
  },
  {
    slug: "odor-cartridge-pack",
    name: "Odor-Neutralizing Cartridge 6-Pack",
    category: "ancillary",
    price: 42.0,
    tagline: "Three fragrances. Zero evidence. One swap in three seconds.",
    description: [
      "Odor cartridges click into any Seel-Tite disposal accessory. A zeolite-carbon core traps what you don't want to be smelled, and a subtle fragrance covers anything the core misses. Three scents in the six-pack: Cedar, Workshop (light oil and sawdust), and Linen.",
      "Sixty days of real-world use for most people. Swap in three seconds, mid-handshake, mid-conversation, mid-anything.",
    ],
    features: [
      "Zeolite + activated-carbon core",
      "Three fragrances: Cedar, Workshop, Linen",
      "Click-fit universal with all disposal accessories",
      "3-second swap",
    ],
    specs: {
      "Port": "OPX-14 accessory socket",
      "Cartridge Life": "~15 days typical daily use",
      "Fragrances": "Cedar, Workshop, Linen",
      "Pack Size": "6 cartridges",
      "Weight": "18g each",
      "Compliance": "IFRA, RoHS",
    },
    heroImage: "/sites/seeltite/product-odor-cartridge-hero.png",
    galleryImages: [
      "/sites/seeltite/product-odor-cartridge-context.png",
      "/sites/seeltite/product-odor-cartridge-demo.png",
    ],
    exploded: "/sites/seeltite/product-odor-cartridge-exploded.png",
    compatibleWith: [
      "the-grinder",
      "salad-shooter-attachment",
      "cryo-puck-module",
      "pneumatic-ejector-kit",
      "incinerator-module",
    ],
    testimonials: ["margaux-sanderling"],
  },
  {
    slug: "telemetry-module",
    name: "Telemetry Module",
    category: "ancillary",
    price: 129.0,
    tagline: "Predictive alerts before the gamble even starts.",
    description: [
      "The Telemetry Module is the quiet advantage. Clip it to the outside of the G1 and it streams seal-integrity data to a phone app at 32Hz. The app learns your patterns and issues a haptic alert four to twelve seconds before a likely event — enough time to engage the right accessory discreetly.",
      "For most people, Telemetry is the upgrade that turns the G1 from \"great\" to \"invisible.\" The predictive alert is the real feature.",
    ],
    features: [
      "Bluetooth 5.3 LE",
      "32 Hz telemetry rate",
      "4-12s predictive alert window",
      "iOS + Android companion app",
      "14-day battery life",
    ],
    specs: {
      "Connectivity": "Bluetooth 5.3 LE",
      "Telemetry Rate": "32 Hz",
      "Alert Lead Time": "4-12s (typical)",
      "Battery": "Internal Li-Po, 14-day life, USB-C charge",
      "Weight": "34g",
      "Compliance": "FCC Part 15, CE, IC, Bluetooth SIG",
    },
    heroImage: "/sites/seeltite/product-telemetry-hero.png",
    galleryImages: [
      "/sites/seeltite/product-telemetry-context.png",
      "/sites/seeltite/product-telemetry-demo.png",
    ],
    exploded: "/sites/seeltite/product-telemetry-exploded.png",
    compatibleWith: ["g1-containment-gasket"],
    testimonials: ["coach-derrick-plum"],
  },
  {
    slug: "the-silencer",
    name: "The Silencer",
    category: "ancillary",
    price: 99.0,
    tagline: "Makes the quieter accessories almost silent.",
    description: [
      "An inline acoustic baffle that sits between the G1 and any disposal accessory and drops operational sound below 30 decibels. For reference, that's quieter than a whisper at one meter.",
      "Indispensable for boardrooms, theaters, libraries, and any environment where being overheard would undo the work the rest of the system did.",
    ],
    features: [
      "Multi-chamber labyrinth baffle",
      "Sub-30dB with the Grinder",
      "Inline installation (no tools)",
      "Works with Grinder, Salad Shooter, Pneumatic Ejector",
    ],
    specs: {
      "Port": "OPX-14 pass-through",
      "Noise Reduction": "-17 dB typical",
      "Operational Level": "<30 dB with Grinder",
      "Weight": "88g",
      "Compliance": "CE",
    },
    heroImage: "/sites/seeltite/product-silencer-hero.png",
    galleryImages: [
      "/sites/seeltite/product-silencer-context.png",
      "/sites/seeltite/product-silencer-demo.png",
    ],
    exploded: "/sites/seeltite/product-silencer-exploded.png",
    compatibleWith: ["the-grinder", "salad-shooter-attachment", "pneumatic-ejector-kit"],
    testimonials: ["judson-hale"],
  },
  {
    slug: "secondary-gasket-redundancy",
    name: "Backup Secondary Gasket",
    category: "ancillary",
    price: 179.0,
    tagline: "Second seal. For when one gamble is one too many.",
    description: [
      "Worn concentrically outside the primary G1, the Backup engages automatically within 40 milliseconds if the primary seal reports a breach. Think of it as the reason you never have to say \"I should have brought the Backup.\"",
      "Recommended for every wedding, deposition, surgery, congressional appearance, and transatlantic flight. If you're listing it as \"mission-critical\" to yourself, you want this on.",
    ],
    features: [
      "Concentric secondary seal",
      "40ms auto-engage on primary breach",
      "Independent equalization valve",
      "Works with any G1",
    ],
    specs: {
      "Port": "Shares OPX-14 with G1",
      "Engagement Time": "40ms ±5",
      "Hold Rating": "14.7 PSI (independent of primary)",
      "Weight": "74g",
      "Compliance": "MIL-STD-810H §509, FDA 21 CFR 177.2600",
    },
    heroImage: "/sites/seeltite/product-backup-gasket-hero.png",
    galleryImages: [
      "/sites/seeltite/product-backup-gasket-context.png",
      "/sites/seeltite/product-backup-gasket-demo.png",
    ],
    exploded: "/sites/seeltite/product-backup-gasket-exploded.png",
    compatibleWith: ["g1-containment-gasket", "telemetry-module"],
    testimonials: ["tamsin-kerrigan"],
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(cat: ProductCategory): Product[] {
  return products.filter((p) => p.category === cat)
}
