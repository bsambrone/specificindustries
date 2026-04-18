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
    tagline: "The hub. MIL-SPEC seal. Standard output port.",
    description: [
      "The G1 is the foundational unit of the Seel-Tite Containment System. A single-piece medical-grade elastomer gasket with an integrated 14mm bayonet output port, the G1 provides primary containment in any operational environment.",
      "Every accessory in the Seel-Tite catalog clicks into the G1's output port. The system was designed around the gasket, not the other way around.",
      "Rated for continuous wear in office, field, and formal settings. FAA cabin-pressure tested. Warranty covers seal integrity for 18 months of daily deployment.",
    ],
    features: [
      "14mm bayonet output port (Seel-Tite OPX-14 standard)",
      "Medical-grade silicone elastomer, FDA 21 CFR 177.2600 compliant",
      "Integrated equalization valve (patented)",
      "Sub-14.7 PSI hold rating under load",
      "Cabin-pressure certified to 8,000 ft equivalent",
      "Machine-washable, 60°C max",
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
    tagline: "On-body pulverization. Silent operation.",
    description: [
      "The Grinder is our workhorse disposal accessory. A titanium-blade rotary pulverizer that clicks into the G1 output port and reduces containment events to a uniform slurry, invisibly, in under two seconds.",
      "Operates at sub-45dB — quieter than a whispered apology. Compatible with all G1 series gaskets.",
    ],
    features: [
      "Titanium-nitride-coated blade assembly",
      "Variable-speed rotor (1,800 – 4,200 RPM)",
      "Sub-45dB continuous operation",
      "Automatic thermal cutoff",
      "Rechargeable lithium cell, 180 cycles per charge",
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
    tagline: "Rotary dispersion module. Commercial-grade shafts.",
    description: [
      "The Salad Shooter Attachment is the Seel-Tite team's affectionate tribute to a legendary 1988 kitchen appliance — reimagined for modern containment. A 360° rotary dispersion head clicks into the G1 output port and disperses containment events into a fine, inert mist that settles inside the accessory's sealed hopper.",
      "Drop-in replaceable hoppers. 6-pack refills sold separately.",
    ],
    features: [
      "360° rotary dispersion head",
      "Sealed hopper, 180ml capacity",
      "Drop-in hopper replacement (8-second swap)",
      "Commercial-grade 304 stainless internals",
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
    tagline: "Flash-freezes output to a tidy, odorless solid puck.",
    description: [
      "The Cryo-Puck uses proprietary peltier-assisted flash-freeze technology to convert any containment event into a sanitized, odorless 40mm puck in 3.2 seconds. The puck ejects into a sealed disposal chamber for later removal at the user's convenience.",
      "Each charge handles up to 12 full-volume events. Ideal for long ceremonies, transcontinental flights, and other scenarios where disposal interruption is not an option.",
    ],
    features: [
      "Peltier flash-freeze assembly (-78°C core)",
      "3.2s full cycle",
      "40mm sanitized puck output",
      "12-event battery capacity",
      "Odor-sealed ejection chamber",
      "Auto-dump with optional external dock",
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
    tagline: "Compressed-cartridge ejection. 6-pack cartridges sold separately.",
    description: [
      "The Pneumatic Ejector Kit uses a 12-gram compressed-CO₂ cartridge to expel containment events at 180 PSI into a sealed receiver cartridge worn on the belt or thigh. Each CO₂ cartridge handles one full ejection cycle.",
      "The receiver cartridge holds up to four events. Cartridges are disposable and ship in 6-packs.",
    ],
    features: [
      "12g CO₂ cartridge propellant",
      "180 PSI ejection force",
      "Belt or thigh-mount receiver cartridge",
      "4-event receiver capacity",
      "0.3s full cycle (ejection to cutoff)",
      "Manual or auto-trigger modes",
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
    tagline: 'Standard 1.25" / 2.5" hose fittings. BYO wet/dry vac.',
    description: [
      "The Shop-Vac Adapter is the Seel-Tite user's answer to permanent installations. A dual-collar adapter couples the G1 output port to any standard wet/dry vacuum hose — 1.25\" or 2.5\" — routing containment events directly to the vacuum canister.",
      "Ideal for fixed workstations: operating theaters, courtrooms, broadcast studios, and extended-duration seated environments. A 4-meter reinforced hose is included.",
    ],
    features: [
      'Dual-collar adapter: 1.25" and 2.5" hose compatibility',
      "4m reinforced PVC hose included",
      "Kink-resistant spiral construction",
      "Quick-disconnect on both ends",
      "Works with any standard wet/dry vac (BYO)",
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
    tagline: "On-body vaporization. Lithium pack included.",
    description: [
      "The Incinerator Module is Seel-Tite's most aggressive disposal accessory. A ceramic reaction chamber reaches 860°C in under one second and fully vaporizes containment events, producing only a small volume of sterile, odor-neutralized vapor that vents through a filtered muffler at the base of the unit.",
      "Yes, it is safe. Yes, it is certified. Yes, there is a thermal cutoff. No, you will not feel anything other than the normal warmth of a correctly-functioning accessory.",
    ],
    features: [
      "860°C ceramic reaction chamber",
      "<1s ignition-to-vaporization",
      "HEPA + activated-carbon muffler",
      "Lithium pack: 28 cycles per charge",
      "Triple-redundant thermal cutoff",
      "Insulated composite outer shell",
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
    tagline: "Cedar, Workshop, Linen. Swap in seconds.",
    description: [
      "Odor-Neutralizing Cartridges click into any Seel-Tite disposal accessory (Grinder, Salad Shooter, Pneumatic Ejector, Cryo-Puck, Incinerator). Each cartridge houses a proprietary zeolite-activated-carbon blend plus a subtle fragrance: Cedar, Workshop (light oil + sawdust), or Linen.",
      "A full 6-pack lasts the average professional user approximately 90 days.",
    ],
    features: [
      "Zeolite + activated-carbon neutralizer core",
      "Three fragrances: Cedar, Workshop, Linen (two each in the 6-pack)",
      "Click-fit universal with all disposal accessories",
      "3-second swap time",
      "Recyclable cartridge shell",
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
    tagline: "App-connected. Seal-integrity logs. Predictive alerts.",
    description: [
      "The Telemetry Module adds persistent connectivity to any G1 deployment. A low-profile disc clips to the outside of the gasket and streams seal-integrity telemetry (pressure, micro-flex, thermal profile) to the Seel-Tite companion app.",
      "Predictive alerts notify the user via vibration 4-12 seconds before a probable containment event, giving time to engage the appropriate disposal accessory discreetly.",
    ],
    features: [
      "Bluetooth 5.3 LE connectivity",
      "Seal-integrity telemetry @ 32 Hz",
      "Predictive event detection (4-12s lead time)",
      "Silent haptic alert band (sold separately)",
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
    tagline: "Acoustic baffle. Sub-30dB operation. Boardroom-rated.",
    description: [
      "The Silencer is an acoustic baffle that fits between the G1 output port and any disposal accessory, reducing operational sound to sub-30dB — below the ambient noise floor of a typical conference room.",
      "When paired with the Grinder or Salad Shooter, even trained acousticians cannot detect engagement from across a table.",
    ],
    features: [
      "Multi-chamber labyrinth baffle",
      "Sub-30dB operational sound",
      "Inline installation (no tools)",
      "Works with Grinder, Salad Shooter, Pneumatic Ejector",
      "Aluminum + closed-cell foam construction",
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
    tagline: "Redundant seal. For weddings, depositions, long-hauls.",
    description: [
      "The Backup Secondary Gasket provides fail-over containment for mission-critical scenarios. Worn concentrically outside the primary G1, it engages automatically within 40 milliseconds if the primary seal reports a breach.",
      "Recommended for weddings, depositions, congressional testimony, surgeries, and transatlantic flights. Couples well with the Telemetry Module for predictive pre-engagement.",
    ],
    features: [
      "Concentric secondary seal",
      "40ms auto-engage on primary breach",
      "Independent equalization valve",
      "Medical-grade silicone elastomer",
      "Works with any G1 gasket",
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
