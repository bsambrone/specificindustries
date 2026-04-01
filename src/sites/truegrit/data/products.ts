export interface Product {
  slug: string
  name: string
  sku: string
  price: number
  priceLabel: string
  tagline: string
  description: string[]
  image: string
  category: "abrasives" | "bidets" | "accessories" | "kits"
  specs: Array<{ label: string; value: string }>
  disclaimers: string[]
}

export const products: Product[] = [
  {
    slug: "original-40-grit",
    name: "The Original 40-Grit",
    sku: "TG-040-STD",
    price: 8.99,
    priceLabel: "$8.99 / roll",
    tagline: "Industrial-grade personal cleansing.",
    description: [
      "The product that started a revolution no one asked for. The Original 40-Grit delivers a cleaning experience so thorough, you'll never question whether the job was done. You'll know. Your body will tell you.",
      "Engineered with precision aluminum oxide abrasive bonded to a flexible backing substrate, each sheet provides consistent coverage across all personal terrain. The 40-grit rating represents our ideal balance between cleanliness and what our legal team calls 'acceptable discomfort.'",
      "Non-GMO. Free range. Sourced from responsibly managed sandpaper quarries. Each roll contains approximately 200 sheets, though most customers report needing significantly fewer.",
    ],
    image: "/sites/truegrit/product-original-40.png",
    category: "abrasives",
    specs: [
      { label: "Grit Rating", value: "40 (Medium-Coarse)" },
      { label: "Abrasive Material", value: "Aluminum Oxide" },
      { label: "Backing", value: "Flexible C-Weight Paper" },
      { label: "Sheets Per Roll", value: "~200" },
      { label: "Tensile Strength", value: "Industrial" },
      { label: "Softness Rating", value: "N/A" },
    ],
    disclaimers: [
      "Minor surface irritation indicates proper coverage.",
      "Not recommended for consecutive use without a recovery period.",
      "Keep Recovery Balm within arm's reach.",
    ],
  },
  {
    slug: "80-grit-sensitive",
    name: "80-Grit Sensitive",
    sku: "TG-080-SEN",
    price: 12.99,
    priceLabel: "$12.99 / roll",
    tagline: "Our gentlest option. Relatively speaking.",
    description: [
      "For those who appreciate a thorough clean but prefer to ease into the True Grit lifestyle, the 80-Grit Sensitive offers a marginally less intense experience. We call it 'gentle.' Our customers call it 'still sandpaper.'",
      "The finer grit pattern provides what our engineers describe as 'reduced abrasion coefficient' and what our test subjects described as 'slightly less alarming.' It's the training wheels of industrial personal cleansing.",
      "Ideal for first-time users, those transitioning from conventional toilet paper, or anyone whose doctor has specifically advised against our 40-grit product (we get a lot of those letters).",
    ],
    image: "/sites/truegrit/product-80-grit.png",
    category: "abrasives",
    specs: [
      { label: "Grit Rating", value: "80 (Fine)" },
      { label: "Abrasive Material", value: "Aluminum Oxide (Fine Grade)" },
      { label: "Backing", value: "Flexible A-Weight Paper" },
      { label: "Sheets Per Roll", value: "~250" },
      { label: "Gentleness", value: "Relative" },
      { label: "Doctor Recommended", value: "Absolutely Not" },
    ],
    disclaimers: [
      "The word 'sensitive' is used loosely.",
      "Still significantly more abrasive than conventional toilet paper.",
      "Consult your physician if you're considering this a 'gentle' option.",
    ],
  },
  {
    slug: "24-grit-deep-clean",
    name: "24-Grit Deep Clean",
    sku: "TG-024-PRO",
    price: 6.99,
    priceLabel: "$6.99 / roll",
    tagline: "For professionals and the exceptionally determined.",
    description: [
      "When 40-grit isn't enough — and frankly, we're concerned about anyone for whom it isn't — the 24-Grit Deep Clean delivers maximum abrasive coverage. This is our most aggressive personal cleansing product and it is not for the faint of heart.",
      "Originally developed for industrial surface preparation, we realized it could serve a dual purpose. Our R&D team (Gary) spent months adapting the formula for personal use. The results were immediate and impossible to ignore.",
      "The 24-Grit Deep Clean is our most affordable option because, honestly, most people don't come back for a second roll. Those who do have our deepest respect and our sincerest concern.",
    ],
    image: "/sites/truegrit/product-24-grit.png",
    category: "abrasives",
    specs: [
      { label: "Grit Rating", value: "24 (Extra Coarse)" },
      { label: "Abrasive Material", value: "Silicon Carbide" },
      { label: "Backing", value: "Heavy-Duty D-Weight Paper" },
      { label: "Sheets Per Roll", value: "~150" },
      { label: "Intensity", value: "Maximum" },
      { label: "Recommended By", value: "No One" },
    ],
    disclaimers: [
      "For experienced True Grit users only.",
      "Crying from the bathroom is normal and expected.",
      "Please verify your health insurance coverage before purchase.",
    ],
  },
  {
    slug: "40-grit-hand-towels",
    name: "40-Grit Hand Towels",
    sku: "TG-040-HT",
    price: 14.99,
    priceLabel: "$14.99 / pack",
    tagline: "Extend the True Grit experience to your extremities.",
    description: [
      "Why should personal cleansing stop at the bathroom? Our 40-Grit Hand Towels bring the True Grit standard of thoroughness to your hands, and they're designed to fit any standard paper towel dispenser.",
      "Each towel is individually folded and interleaved for easy single-sheet dispensing. Perfect for executive washrooms, restaurant restrooms, or anywhere you want to make a statement about your commitment to cleanliness.",
      "Available in cases of 16 packs. Bulk pricing available for facilities that want to boost employee productivity by discouraging excessive hand-washing breaks.",
    ],
    image: "/sites/truegrit/product-hand-towels.png",
    category: "abrasives",
    specs: [
      { label: "Grit Rating", value: "40 (Medium-Coarse)" },
      { label: "Towel Size", value: '9.5" × 10.5" (Standard Fold)' },
      { label: "Sheets Per Pack", value: "250" },
      { label: "Dispenser Compatible", value: "Universal C-Fold" },
      { label: "Hand Softness After Use", value: "Reduced" },
      { label: "Handshake Confidence", value: "Complicated" },
    ],
    disclaimers: [
      "May affect your ability to operate touchscreens for up to 48 hours.",
      "Not recommended before handshakes, first dates, or any situation requiring fingerprints.",
    ],
  },
  {
    slug: "hydroblast-500",
    name: "The HydroBlast 500",
    sku: "TG-HB-500",
    price: 199.99,
    priceLabel: "$199.99",
    tagline: "Pressure washing for the discerning individual.",
    description: [
      "The HydroBlast 500 brings 500 PSI of focused cleansing power to your bathroom. That's the equivalent of a light-duty pressure washer, and yes, we are aware of how that sounds. We sell it anyway.",
      "Featuring an adjustable brass nozzle, reinforced supply line, and wall-mounted control panel, the HydroBlast 500 transforms your bathroom into what our marketing team calls 'a professional-grade cleansing station' and what everyone else calls 'a lot.'",
      "Installation requires standard plumbing connections and a willingness to explain to your plumber what you're planning. Mounting hardware included. Courage sold separately.",
    ],
    image: "/sites/truegrit/product-hydroblast.png",
    category: "bidets",
    specs: [
      { label: "Water Pressure", value: "500 PSI (Adjustable)" },
      { label: "Nozzle Type", value: "Precision Brass" },
      { label: "Supply Line", value: "Reinforced Braided Steel" },
      { label: "Installation", value: "Professional Recommended" },
      { label: "Splash Radius", value: "Significant" },
      { label: "Neighbor Complaints", value: "Probable" },
    ],
    disclaimers: [
      "Do not exceed recommended PSI settings.",
      "Bathroom ventilation strongly recommended.",
      "True Grit is not responsible for any tile damage, grout erosion, or marital disputes arising from installation.",
    ],
  },
  {
    slug: "acidjet-bidet-3000",
    name: "The AcidJet Bidet 3000",
    sku: "TG-AJ-3000",
    price: 299.99,
    priceLabel: "$299.99",
    tagline: "Supplemental chemical cleansing for those who demand absolute sterility.",
    description: [
      "For customers who found the HydroBlast 500 insufficiently thorough, the AcidJet Bidet 3000 adds a battery acid reservoir to the equation. We cannot stress enough how much our legal team opposed this product. We launched it anyway.",
      "The dual-chamber system blends industrial-grade battery acid with water at a ratio our engineers describe as 'aggressive but technically survivable.' The precision ceramic nozzle delivers a focused stream that leaves nothing to chance — or to comfort.",
      "Each unit ships with a 30-day supply of acid concentrate, chemical-resistant tubing, safety goggles (mandatory), and a comprehensive waiver that we strongly encourage you to actually read for once.",
    ],
    image: "/sites/truegrit/product-acidjet.png",
    category: "bidets",
    specs: [
      { label: "Acid Concentration", value: "Classified" },
      { label: "Reservoir Capacity", value: "2L (Chemical-Resistant)" },
      { label: "Nozzle Material", value: "Acid-Resistant Ceramic" },
      { label: "Safety Goggles", value: "Included (Mandatory)" },
      { label: "Waiver Pages", value: "47" },
      { label: "FDA Approval", value: "Pending (Since 2019)" },
    ],
    disclaimers: [
      "Safety goggles must be worn at all times during operation.",
      "Do not use if you have skin. Consult a hazmat professional before installation.",
      "The 47-page waiver is not decorative. Please read it.",
    ],
  },
  {
    slug: "recovery-balm",
    name: "Recovery Balm",
    sku: "TG-RB-001",
    price: 24.99,
    priceLabel: "$24.99 / jar",
    tagline: "Apply liberally. Then apply again.",
    description: [
      "If you're looking at this product, you already know why you need it. The Recovery Balm is our most popular accessory, and by 'accessory' we mean 'the thing that makes our other products survivable.'",
      "Formulated with aloe vera, lidocaine, vitamin E, and what our chemists poetically refer to as 'hope,' the Recovery Balm provides soothing relief for skin that has experienced the True Grit difference. Apply immediately after use. Then again 10 minutes later. Then once more for good measure.",
      "Available in our standard 8 oz jar or the 32 oz 'I Bought the 24-Grit' emergency size (sold separately).",
    ],
    image: "/sites/truegrit/product-recovery-balm.png",
    category: "accessories",
    specs: [
      { label: "Active Ingredients", value: "Aloe, Lidocaine, Vitamin E, Hope" },
      { label: "Size", value: "8 oz" },
      { label: "Applications Per Jar", value: "Depends on grit selection" },
      { label: "Relief Speed", value: "Not fast enough" },
      { label: "Scent", value: "Medicinal Lavender" },
      { label: "Emotional Support", value: "Limited" },
    ],
    disclaimers: [
      "Not a substitute for medical attention.",
      "If you need more than one jar per week, please reconsider your grit selection.",
    ],
  },
  {
    slug: "starter-kit",
    name: "The Starter Kit",
    sku: "TG-SK-001",
    price: 49.99,
    priceLabel: "$49.99",
    tagline: "Everything you need to begin your journey. Medical supplies sold separately.",
    description: [
      "The Starter Kit is our recommended entry point for the True Grit lifestyle. It includes one roll each of our 80-Grit Sensitive, 40-Grit Original, and 24-Grit Deep Clean, plus a full jar of Recovery Balm. We put the 80-grit on top for a reason.",
      "Designed as a progressive system, the kit allows you to work your way up (or down, depending on your perspective) through our grit range. Most customers find their comfort zone somewhere around the 80-grit. The rest have our admiration and our concern.",
      "Makes an unforgettable gift. And we do mean unforgettable. The recipient will remember you every single time they use it. Whether that's a positive association depends entirely on your relationship.",
    ],
    image: "/sites/truegrit/product-starter-kit.png",
    category: "kits",
    specs: [
      { label: "Includes", value: "80-Grit, 40-Grit, 24-Grit, Recovery Balm" },
      { label: "Recommended Starting Grit", value: "80 (Please)" },
      { label: "Gift Wrapping", value: "Available" },
      { label: "Gift Returns", value: "Understandable" },
      { label: "Medical Supplies", value: "Not Included" },
      { label: "Friendship Risk", value: "Moderate to High" },
    ],
    disclaimers: [
      "Start with the 80-grit. We cannot stress this enough.",
      "Medical supplies sold separately. We recommend having them on hand.",
      "Gift recipients may need time before speaking to you again.",
    ],
  },
]

export const quips = [
  "Brave choice.",
  "Please consult your physician.",
  "We admire your courage — and question your judgment.",
  "Your health insurance has been notified.",
  "No liability implied, expressed, or even considered.",
  "Bold. Very bold.",
  "We recommend keeping the Recovery Balm nearby.",
  "Your bathroom will never be the same.",
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getRelatedProducts(slug: string, count = 3): Product[] {
  const filtered = products.filter((p) => p.slug !== slug)
  const index = slug.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0)
  const start = index % filtered.length
  const result: Product[] = []
  for (let i = 0; i < count && i < filtered.length; i++) {
    result.push(filtered[(start + i) % filtered.length])
  }
  return result
}
