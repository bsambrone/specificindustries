export interface Product {
  slug: string
  name: string
  price: number
  priceLabel: string
  tagline: string
  description: string[]
  image: string
  scienceFacts: Array<{ label: string; value: string }>
  variants?: Array<{ name: string; description: string }>
  isSubscription?: boolean
}

export const products: Product[] = [
  {
    slug: "original",
    name: "Original Dehydrated Water",
    price: 12.99,
    priceLabel: "$12.99 / packet",
    tagline: "Just add water.",
    description: [
      "The product that started a revolution no one asked for. In 1847, Ezekiel Drywell looked at a glass of water and thought, 'This would be better without all the water in it.' Nearly two centuries later, we continue to honor that profoundly unnecessary vision.",
      "Each packet contains the complete molecular essence of water, temporarily liberated from its liquid state through our patented dehydration process. Simply add water to reconstitute. Yes, you need water to make water. We are aware of the paradox. We have made peace with it.",
      "Our Original blend is the foundation of the Dehydrated Water Laboratories legacy — unchanged since 1847, because there is nothing to change. It is powder. It has always been powder.",
    ],
    image: "/sites/dehydratedwater/product-original.png",
    scienceFacts: [
      { label: "Molecular Composition", value: "H₂O⁰ (patent pending)" },
      { label: "State of Matter", value: "Theoretical" },
      { label: "pH Level", value: "N/A (requires hydration to measure)" },
      { label: "Shelf Life", value: "Eternal (powder cannot expire if it was never alive)" },
      { label: "Specific Gravity", value: "Irrelevant" },
      { label: "Wetness", value: "0%" },
    ],
  },
  {
    slug: "cloud-mist",
    name: "Single Origin Cloud Mist",
    price: 24.99,
    priceLabel: "$24.99 / packet",
    tagline: "Terroir you can taste. Once hydrated.",
    description: [
      "For the discerning hydration connoisseur who demands to know exactly which cloud their water fell from. Our Single Origin Cloud Mist collection brings the concept of terroir to powdered water, because apparently regular dehydrated water wasn't pretentious enough.",
      "Each packet is harvested from a specific weather event and dehydrated within hours of atmospheric capture. Our meteorological sommelier personally verifies the provenance of every cloud. He has a very specific skill set.",
      "Available in three distinct origins, each with its own character, personality, and complete inability to hydrate you until you add water to it.",
    ],
    image: "/sites/dehydratedwater/product-cloud-mist.png",
    scienceFacts: [
      { label: "Origin Verification", value: "Meteorologically certified" },
      { label: "Atmospheric Pressure at Harvest", value: "Varies by origin" },
      { label: "Cloud Type", value: "Cumulonimbus (premium grade)" },
      { label: "Precipitation Probability", value: "0% (successfully intercepted)" },
      { label: "Terroir Factor", value: "Pronounced" },
      { label: "Pretentiousness Index", value: "97th percentile" },
    ],
    variants: [
      {
        name: "The Nor'easter",
        description:
          "Aggressive, salty, and best served cold. Harvested from North Atlantic storm systems with wind speeds exceeding 40 knots. Not for the faint of palate.",
      },
      {
        name: "Sahara Noon",
        description:
          "Extra dry, for that authentic 'dusty throat' feeling. Sourced from the rare midday humidity spikes over the Sahara Desert. Contains trace amounts of existential dryness.",
      },
      {
        name: "Amazonian Downpour",
        description:
          "High-humidity powder that requires a special dehumidifier to 'unlock.' Our most complex origin, with notes of tropical canopy and the faint sound of rainfall that isn't there.",
      },
    ],
  },
  {
    slug: "dryer-water",
    name: 'Double-Dehydrated "Dryer" Water',
    price: 34.99,
    priceLabel: "$34.99 / vacuum bag",
    tagline: "Negative wetness, guaranteed.",
    description: [
      "For the ultra-minimalist who thinks regular dehydrated water is too moist. Our Double-Dehydrated Water has been through our patented process twice, removing not just the water, but the memory of water. What remains is pure, unburdened absence.",
      "The product ships as an empty, vacuum-sealed bag. This is not a packaging error. This is the product. The vacuum seal ensures that no rogue moisture can compromise the integrity of the nothing inside.",
      "Independent laboratory testing has confirmed that Double-Dehydrated Water possesses 'Negative Wetness' — meaning it can actually make things drier. Toss one into a swimming pool and observe as absolutely nothing happens, but theoretically the pool is now 0.00001% drier.",
    ],
    image: "/sites/dehydratedwater/product-dryer.png",
    scienceFacts: [
      { label: "Wetness", value: "Negative" },
      { label: "Moisture Content", value: "-2%" },
      { label: "Vacuum Integrity", value: "Absolute" },
      { label: "Contents", value: "Philosophical" },
      { label: "Recommended Use", value: "Ultra-minimalist hiking" },
      { label: "Weight", value: "Less than nothing (metaphysically)" },
    ],
  },
  {
    slug: "heavy-water",
    name: "DIY Heavy Water (Deuterium-Lite)",
    price: 49.99,
    priceLabel: "$49.99 / packet",
    tagline: "For biohackers and amateur nuclear physicists.",
    description: [
      "Marketed to the intersection of biohacking enthusiasts and amateur nuclear physicists — a surprisingly active community — our Heavy Water variant is a heavier-than-usual packet of what is technically the same powder.",
      "The additional weight is achieved through our proprietary 'more powder in the bag' technique, which our marketing department has rebranded as 'deuterium enrichment.' Our legal team has asked us to clarify that no actual deuterium is involved. Our marketing team has asked legal to relax.",
      "Please note: do not stack more than 50 packets together. While no actual nuclear reaction is possible, our insurance provider has specifically asked us to include this warning, and frankly, if you're buying 50 packets of this, someone should be checking in on you.",
    ],
    image: "/sites/dehydratedwater/product-heavy.png",
    scienceFacts: [
      { label: "Atomic Weight", value: "Elevated (subjectively)" },
      { label: "Critical Mass Threshold", value: "50 packets (do not exceed)" },
      { label: "Regulatory Status", value: "Pending (in perpetuity)" },
      { label: "Geiger Counter Reading", value: "Inconclusive" },
      { label: "Biohacking Compatibility", value: "Uncertain" },
      { label: "Nuclear Capability", value: "None (we promise)" },
    ],
  },
  {
    slug: "ice-cubes",
    name: "Dehydrated Ice Cubes",
    price: 9.99,
    priceLabel: "$9.99 / 12-pack",
    tagline: "Space-saving hydration, frozen in time.",
    description: [
      "Individual tiny packets of dehydrated water, pre-portioned for ice cube trays. Simply add water to each packet, pour into a tray, and freeze for 4 hours. Voilà — you have ice. Yes, you could have just frozen the water directly. We are aware.",
      "Our Dehydrated Ice Cubes feature a revolutionary 'Space-Saving Design' for people who don't have room in their freezer for bulky, traditional water. Each 12-pack replaces up to 12 ice cubes' worth of freezer space with convenient shelf-stable packets.",
      "The math works out to roughly the same amount of space once you add the water. We prefer not to discuss the math.",
    ],
    image: "/sites/dehydratedwater/product-ice-cubes.png",
    scienceFacts: [
      { label: "Freezing Point", value: "0°C (after hydration)" },
      { label: "Space Saved", value: "97% (before adding water)" },
      { label: "Cube Geometry", value: "Theoretical until frozen" },
      { label: "Freezer Compatibility", value: "Universal" },
      { label: "Time to Ice", value: "4 hours + existential waiting" },
      { label: "Melting Point", value: "Same as regular ice (we checked)" },
    ],
  },
  {
    slug: "diet-water",
    name: "Diet Dehydrated Water (Zero Hydrogen)",
    price: 18.99,
    priceLabel: "$18.99 / packet",
    tagline: "100% Pure, Gaseous Oxygen.",
    description: [
      "For the health-conscious consumer looking to cut back on their element intake. We've removed the gassy Hydrogen from our standard formula, leaving you with 100% Pure, Gaseous Oxygen. It's essentially a bag of air, but it's our bag of air, and it's artisanal.",
      "Our Zero Hydrogen formula was developed in response to growing consumer demand for 'cleaner' water. By removing two-thirds of the atoms, we've created a product that is 66% simpler, 100% lighter, and fundamentally no longer water in any scientific sense.",
      "Diet Dehydrated Water pairs well with breathing, existing near an open window, or stepping outside. Do not inhale the entire bag at once. We cannot stress this enough.",
    ],
    image: "/sites/dehydratedwater/product-diet.png",
    scienceFacts: [
      { label: "Hydrogen Content", value: "0 mol" },
      { label: "Oxygen State", value: "Gaseous" },
      { label: "Caloric Content", value: "Undefined" },
      { label: "Breathability", value: "Do not inhale entire bag at once" },
      { label: "Chemical Formula", value: "O (just O)" },
      { label: "Is This Still Water?", value: "Legally, no" },
    ],
  },
  {
    slug: "starter-culture",
    name: "Instant Water Starter Culture",
    price: 39.99,
    priceLabel: "$39.99 / vial",
    tagline: "The sourdough starter of hydration.",
    description: [
      "A small vial of 'Seed Water' — the sourdough starter of the hydration world. Add it to a gallon of regular water and wait 48 hours as it 'converts' your ordinary tap water into Premium Heritage Water through a process we call 'sitting there.'",
      "Our Starter Culture contains a proprietary blend of heritage water molecules that have been passed down through seven generations of the Drywell family. Each vial traces its lineage back to the original 1847 batch, making your tap water part of an unbroken aquatic dynasty.",
      "Feed your culture weekly with fresh water to keep it alive. If you forget, the culture will 'go dormant,' which is our way of saying it's just water again. But isn't it always just water? These are the questions our Starter Culture invites you to ponder.",
    ],
    image: "/sites/dehydratedwater/product-starter.png",
    scienceFacts: [
      { label: "Conversion Time", value: "48 hours (of doing nothing)" },
      { label: "Heritage Factor", value: "7th generation" },
      { label: "Culture Viability", value: "Perpetual (theoretically)" },
      { label: "Feeding Schedule", value: "Weekly, with regular water" },
      { label: "Lineage", value: "Traceable to 1847" },
      { label: "Active Ingredient", value: "Patience" },
    ],
  },
  {
    slug: "waas",
    name: "WaaS Monthly Subscription",
    price: 49.99,
    priceLabel: "$49.99 / month",
    tagline: "Cloud-synced. Heritage-crafted.",
    description: [
      "Water-as-a-Service brings the convenience of modern subscription billing to a product that has existed since the dawn of civilization. For $49.99 per month, you'll receive a cloud-synced packet of our finest dehydrated water, delivered to your door by whatever means we can arrange.",
      "Each packet is sealed with our heritage wax stamp and comes with a hand-calligraphed instruction card. The instructions say 'Add Water.' We feel the calligraphy adds gravitas.",
      "Visit our WaaS page for full tier details, including our Apprentice and Master Dryer plans. Cancel anytime, though we should warn you that our retention department (Ezekiel's great-great-great-great-grandson, also named Ezekiel) can be quite persuasive.",
    ],
    image: "/sites/dehydratedwater/product-waas.png",
    scienceFacts: [
      { label: "Sync Protocol", value: "Bluetooth 0.1 (heritage edition)" },
      { label: "Uptime Guarantee", value: "Heritage-grade" },
      { label: "Delivery Vector", value: "Carrier pigeon (fallback: USPS)" },
      { label: "Lock Mechanism", value: "Non-existent (but implied)" },
      { label: "Cloud Storage", value: "An actual cloud" },
      { label: "Cancel Policy", value: "Ezekiel will call" },
    ],
    isSubscription: true,
  },
  {
    slug: "water-seasoning",
    name: "Gourmet Water Seasoning",
    price: 15.99,
    priceLabel: "$15.99 / set",
    tagline: "Add texture, not flavor.",
    description: [
      "For too long, water has suffered from a fundamental flaw: it's too smooth. Our Gourmet Water Seasoning collection addresses this oversight by adding texture — not flavor — to your hydration experience.",
      "Developed in partnership with a sensory scientist who prefers to remain anonymous (and who we suspect may not actually be a scientist), our H₂O Enhancers transform ordinary water into an extraordinary tactile experience.",
      "Each set includes both of our signature textures: Viscosity+ and Crispness. Mix them together at your own risk. We have not tested this combination and, based on the results of an informal office trial, we do not recommend it.",
    ],
    image: "/sites/dehydratedwater/product-seasoning.png",
    scienceFacts: [
      { label: "Flavor Added", value: "None (by design)" },
      { label: "Texture Delta", value: "Perceptible" },
      { label: "Mouthfeel Index", value: "Elevated" },
      { label: "FDA Approval", value: "Not sought" },
      { label: "Sensory Category", value: "Unprecedented" },
      { label: "Mixing Warning", value: "Do not combine variants" },
    ],
    variants: [
      {
        name: "Viscosity+",
        description:
          "Makes your water feel slightly thicker, like drinking thin gravy. Ideal for those who find regular water 'too fast' going down. Achieved through the addition of food-grade thickening agents that our label simply lists as 'texture.'",
      },
      {
        name: "Crispness",
        description:
          "Adds a microscopic amount of 'static' — technically fine-grain silica — to give your water a 'sharp' mouthfeel. Reviewers have described it as 'crunchy water,' 'assertive,' and 'why would anyone do this.'",
      },
    ],
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}
