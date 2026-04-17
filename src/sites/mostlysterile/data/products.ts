export type ProductCategory =
  | "surgical-instruments"
  | "bandages-wound-care"
  | "ppe"
  | "diagnostics"
  | "pharmaceuticals"
  | "hospital-surplus"

export interface ProductCategoryInfo {
  slug: ProductCategory
  label: string
}

export const categories: ProductCategoryInfo[] = [
  { slug: "surgical-instruments", label: "Surgical" },
  { slug: "bandages-wound-care", label: "Bandages" },
  { slug: "ppe", label: "PPE" },
  { slug: "diagnostics", label: "Diagnostics" },
  { slug: "pharmaceuticals", label: "Pharmaceuticals" },
  { slug: "hospital-surplus", label: "Surplus" },
]

export interface ProductSpec {
  label: string
  value: string
}

export interface Product {
  slug: string
  name: string
  category: ProductCategory
  price: number
  priceLabel: string
  tagline: string
  description: string[]
  image: string
  specifications: ProductSpec[]
}

export const products: Product[] = [
  {
    slug: "second-hand-scalpel",
    name: "Second-Hand Scalpel",
    category: "surgical-instruments",
    price: 8.99,
    priceLabel: "$8.99 / unit",
    tagline: "Sharp enough for most uses.",
    description: [
      "A precision surgical scalpel sourced through our extended network of medical facility partners. Each unit has been evaluated for continued utility by a member of our receiving team, who handled it briefly and did not cut themselves. Sharpness is rated \"appropriate for purpose,\" where purpose is determined by the end user.",
      "Sold as-is. The handle may bear light patina consistent with prior use; the blade may or may not be the original. We decline to speculate on provenance. Pairs well with our suture kits (sold separately), which were likely acquired from the same estate.",
    ],
    image: "/sites/mostlysterile/product-second-hand-scalpel.png",
    specifications: [
      { label: "Sterility Level", value: "Was Earlier Today" },
      { label: "Origin", value: "Hospital Closure Sale" },
      { label: "Condition", value: "Gently Used" },
      { label: "Certifications", value: "CE (Close Enough)" },
      { label: "Warranty", value: "Verbal" },
    ],
  },
  {
    slug: "forceps-various",
    name: "Forceps, Various",
    category: "surgical-instruments",
    price: 14.99,
    priceLabel: "$14.99 / bag",
    tagline: "A thoughtful assortment.",
    description: [
      "A bag of assorted forceps covering the broad spectrum of grasping, clamping, and holding requirements encountered in modern practice. Exact contents vary by bag; our sorting methodology is proprietary and, to the extent feasible, consistent.",
      "Every bag contains no fewer than four distinct forceps, each demonstrating a recognizably forceps-like form factor. Customers seeking a specific forceps type are encouraged to order multiple bags to improve the probability of receipt.",
    ],
    image: "/sites/mostlysterile/product-forceps-various.png",
    specifications: [
      { label: "Contents", value: "Variable (4+ per bag)" },
      { label: "Sterility Level", value: "Mostly" },
      { label: "Origin", value: "Consolidated Warehouse Find" },
      { label: "Certifications", value: "ISO-Inspired" },
      { label: "Warranty", value: "Until You Notice" },
    ],
  },
  {
    slug: "bone-saw-manual",
    name: "Bone Saw (Manual)",
    category: "surgical-instruments",
    price: 39.99,
    priceLabel: "$39.99 / unit",
    tagline: "Quieter than powered models.",
    description: [
      "A traditional hand-operated bone saw for practitioners who prefer the tactile feedback of manual operation, or who are unable to locate a working outlet. No batteries, no cords, no interruptions — just you and the saw and the task at hand.",
      "Supplied with a single blade that has, per our inspection team, retained most of its teeth. Replacement blades are not stocked. We recommend using this product for display purposes, or for tasks where the precision of a saw is not critical to the outcome.",
    ],
    image: "/sites/mostlysterile/product-bone-saw-manual.png",
    specifications: [
      { label: "Sterility Level", value: "Depends on Humidity" },
      { label: "Origin", value: "Estate Sale" },
      { label: "Condition", value: "Most Teeth Present" },
      { label: "Blade", value: "One Included, Non-Replaceable" },
      { label: "Warranty", value: "None" },
    ],
  },
  {
    slug: "gauze-sniff-test",
    name: "Gauze That Passes the Sniff Test",
    category: "bandages-wound-care",
    price: 4.99,
    priceLabel: "$4.99 / box of 50",
    tagline: "Field-tested absorbency.",
    description: [
      "Standard-weave medical gauze, 4x4 inches, 50 pads per box. Every box has been subjected to our proprietary olfactory screening process, in which a staff member briefly brings the box to their face and nods. Boxes that do not receive the nod are not shipped.",
      "Absorbency meets or approximates general expectations for a gauze product of this size. Packaging may be original to the manufacturer or may have been replaced by us, depending on the condition of the original packaging upon receipt.",
    ],
    image: "/sites/mostlysterile/product-gauze-sniff-test.png",
    specifications: [
      { label: "Count", value: "50 pads (give or take)" },
      { label: "Size", value: "4\" x 4\" (nominal)" },
      { label: "Sterility Level", value: "Passed Screening" },
      { label: "Origin", value: "Hospital Closure Sale" },
      { label: "Warranty", value: "Verbal" },
    ],
  },
  {
    slug: "band-aids-we-found",
    name: "Band-Aids We Found",
    category: "bandages-wound-care",
    price: 2.49,
    priceLabel: "$2.49 / variety pack",
    tagline: "Assorted sizes, mostly clean.",
    description: [
      "A variety assortment of adhesive bandages recovered from a range of sources, including but not limited to: a closed pharmacy, a bulk donation, and a reusable tote brought in by a gentleman who declined to leave his name. All bandages are individually wrapped, and the wrappers are mostly intact.",
      "Sizes in each pack are variable. Adhesion quality is generally maintained. We do not recommend these bandages for serious wounds or, frankly, for any wound where first-party bandages are available.",
    ],
    image: "/sites/mostlysterile/product-band-aids-we-found.png",
    specifications: [
      { label: "Count", value: "~30 bandages" },
      { label: "Sizes", value: "Variable" },
      { label: "Sterility Level", value: "Mostly" },
      { label: "Origin", value: "Multiple, Unconfirmed" },
      { label: "Warranty", value: "None" },
    ],
  },
  {
    slug: "suture-kit-estate",
    name: "Suture Kit (Estate Sale)",
    category: "bandages-wound-care",
    price: 19.99,
    priceLabel: "$19.99 / kit",
    tagline: "A previous owner's life's work.",
    description: [
      "A complete suture kit acquired from the estate of a practitioner whose career, by all accounts, was long and distinguished. The kit includes a needle holder, forceps, scissors, and a small quantity of sutures in what appear to be the original sealed packets. A few packets have been opened but not used.",
      "The case shows signs of long service. The initials \"R.D.\" are engraved on the interior. We have not reached out to R.D., and we do not intend to. The kit is yours if you want it.",
    ],
    image: "/sites/mostlysterile/product-suture-kit-estate.png",
    specifications: [
      { label: "Contents", value: "Needle Holder, Forceps, Scissors, Assorted Sutures" },
      { label: "Previous Owner", value: "R.D. (Deceased)" },
      { label: "Sterility Level", value: "Packets Mostly Sealed" },
      { label: "Origin", value: "Estate Sale" },
      { label: "Warranty", value: "None" },
    ],
  },
  {
    slug: "size-whatever-gloves",
    name: "Size Whatever Gloves",
    category: "ppe",
    price: 11.99,
    priceLabel: "$11.99 / box of 50",
    tagline: "Fit guaranteed on at least one hand.",
    description: [
      "A box of 50 single-use examination gloves in our proprietary universal sizing. Each glove has been cut from the same pattern and will, by our estimation, fit approximately 63% of adult human hands. The remaining 37% of customers are encouraged to order a second box.",
      "Material is nitrile, or comparable. Thickness is adequate. Color varies by batch and may include blue, teal, purple, or an unmarked translucent variant we are still identifying.",
    ],
    image: "/sites/mostlysterile/product-size-whatever-gloves.png",
    specifications: [
      { label: "Count", value: "50 gloves" },
      { label: "Size", value: "Universal (results vary)" },
      { label: "Material", value: "Nitrile or Comparable" },
      { label: "Sterility Level", value: "Factory Fresh*" },
      { label: "Warranty", value: "Until You Notice" },
    ],
  },
  {
    slug: "gently-worn-n95",
    name: "Gently Worn N95s",
    category: "ppe",
    price: 24.99,
    priceLabel: "$24.99 / 10-pack",
    tagline: "Previously deployed, currently available.",
    description: [
      "A ten-pack of N95 respirators acquired from a medical institution that no longer required them. Each mask has been worn fewer than the recommended number of times, where \"recommended\" is an operating principle we continue to refine.",
      "The nose wire is intact on most units. The elastic retains elasticity. The filter media, by appearance, has not been visibly compromised. These are sold strictly for display, training, or situations in which the alternative is no mask at all.",
    ],
    image: "/sites/mostlysterile/product-gently-worn-n95.png",
    specifications: [
      { label: "Count", value: "10 masks" },
      { label: "Rating", value: "N95 (as marked)" },
      { label: "Condition", value: "Gently Worn" },
      { label: "Origin", value: "Institutional Transfer" },
      { label: "Sterility Level", value: "Was Earlier Today" },
      { label: "Warranty", value: "None" },
    ],
  },
  {
    slug: "surgical-gown",
    name: "Surgical Gown (One-Size-Fits-Hopefully)",
    category: "ppe",
    price: 17.99,
    priceLabel: "$17.99 / unit",
    tagline: "Universal drape, universal coverage*.",
    description: [
      "A single-use sterile-adjacent surgical gown in our universal cut. The gown is intended to fit the majority of wearers in the majority of positions, assuming a moderate and cooperative posture. The asterisk on our tagline indicates that coverage is contingent on wearer cooperation.",
      "The gown is supplied folded in a plastic sleeve that has not been opened (by us). We make no claim about prior openings. The ties are intact on most units. The sleeves are sleeves.",
    ],
    image: "/sites/mostlysterile/product-surgical-gown.png",
    specifications: [
      { label: "Size", value: "Universal (cooperative)" },
      { label: "Material", value: "Non-Woven Polypropylene" },
      { label: "Sterility Level", value: "Mostly" },
      { label: "Packaging", value: "Sealed (by someone)" },
      { label: "Warranty", value: "Verbal" },
    ],
  },
  {
    slug: "stethoscope-calibration-uncertain",
    name: "Stethoscope (Calibration Uncertain)",
    category: "diagnostics",
    price: 22.99,
    priceLabel: "$22.99 / unit",
    tagline: "Amplifies most sounds.",
    description: [
      "A dual-head clinical stethoscope with binaural tubing and a chest piece of unspecified alloy. Sound amplification is present. Whether that amplification is accurate, and whether the sounds being amplified are the ones you intended to hear, remain open questions.",
      "Earpieces are original to the unit. Tubing has not developed any cracks visible to the naked eye. We recommend this product for customers who require the aesthetic of a stethoscope, and who accept that the diagnostic value is a secondary consideration.",
    ],
    image: "/sites/mostlysterile/product-stethoscope-calibration-uncertain.png",
    specifications: [
      { label: "Type", value: "Dual-Head Clinical" },
      { label: "Calibration", value: "Uncertain" },
      { label: "Sterility Level", value: "Was Earlier Today" },
      { label: "Origin", value: "Warehouse Find" },
      { label: "Warranty", value: "Until You Notice" },
    ],
  },
  {
    slug: "mercury-free-thermometer",
    name: "Mercury-Free Thermometer (Mostly)",
    category: "diagnostics",
    price: 9.99,
    priceLabel: "$9.99 / unit",
    tagline: "No mercury has been added recently.",
    description: [
      "A glass-barreled clinical thermometer in the classical format. The active column is a silver-colored fluid that reads and retains temperature values with adequate fidelity. Our operations team has not added mercury to any unit in this lot; whether mercury was present upon receipt is a separate matter.",
      "Provided in a paper sleeve. The sleeve bears no lot number. The thermometer itself bears a number, which we suspect is the lot number, but we cannot confirm this without breaking the seal.",
    ],
    image: "/sites/mostlysterile/product-mercury-free-thermometer.png",
    specifications: [
      { label: "Range", value: "96–106°F (nominal)" },
      { label: "Active Fluid", value: "Silver-Colored" },
      { label: "Sterility Level", value: "Passed Screening" },
      { label: "Origin", value: "Bulk Donation" },
      { label: "Warranty", value: "None" },
    ],
  },
  {
    slug: "bp-cuff-opinions",
    name: "Blood Pressure Cuff with Opinions",
    category: "diagnostics",
    price: 29.99,
    priceLabel: "$29.99 / unit",
    tagline: "Runs high, per our records.",
    description: [
      "A manual aneroid sphygmomanometer cuff with inflation bulb, release valve, and adult-arm wrap. The gauge has been observed to report values at the high end of normal, consistently and with conviction. Whether this reflects genuine hypertension in the population or a calibration drift on the gauge is a determination we leave to the user.",
      "The wrap is intact. The bulb holds air. The release valve is serviceable when turned with moderate force. Sold without a matching stethoscope; one is available separately (see product 'Stethoscope, Calibration Uncertain').",
    ],
    image: "/sites/mostlysterile/product-bp-cuff-opinions.png",
    specifications: [
      { label: "Type", value: "Manual Aneroid" },
      { label: "Calibration", value: "Runs High" },
      { label: "Sterility Level", value: "Mostly" },
      { label: "Origin", value: "Warehouse Find" },
      { label: "Warranty", value: "Verbal" },
    ],
  },
  {
    slug: "placebex",
    name: "Placebex",
    category: "pharmaceuticals",
    price: 34.99,
    priceLabel: "$34.99 / bottle of 60",
    tagline: "Clinically tested in at least one clinic.",
    description: [
      "Placebex is a therapeutic capsule formulated to deliver measurable outcomes to appropriately suggestible users. Each 500mg capsule contains a carefully selected blend of inactive ingredients, chosen for their inertness and favorable regulatory profile. Clinical testing has been conducted at a facility which has been described as \"a clinic.\"",
      "Available in our signature amber bottle. Label bears the Placebex wordmark, a lot number we printed ourselves, and the mandatory disclaimer that we are not the original manufacturer of any of the constituents, nor of the capsule, nor of the bottle.",
    ],
    image: "/sites/mostlysterile/product-placebex.png",
    specifications: [
      { label: "Count", value: "60 capsules" },
      { label: "Dose", value: "500mg inactive ingredients" },
      { label: "Sterility Level", value: "Sealed*" },
      { label: "Clinical Testing", value: "Conducted (somewhere)" },
      { label: "Certifications", value: "FDA (Friendly Domestic Association)" },
      { label: "Warranty", value: "None" },
    ],
  },
  {
    slug: "generix-extra-strength",
    name: "Generix Extra Strength",
    category: "pharmaceuticals",
    price: 19.99,
    priceLabel: "$19.99 / bottle of 100",
    tagline: "Definitely not aspirin.",
    description: [
      "Generix Extra Strength provides general-purpose discomfort attenuation in a convenient round-tablet format. Each 325mg tablet is white, scored in the middle, and, per our labeling, definitely not aspirin. Generix is manufactured by a partner facility whose address we are legally advised not to disclose.",
      "Recommended dosing: one or two tablets, as needed, up to four times daily, or as otherwise suggested by a healthcare professional who is not us. Keep bottle closed when not in use.",
    ],
    image: "/sites/mostlysterile/product-generix-extra-strength.png",
    specifications: [
      { label: "Count", value: "100 tablets" },
      { label: "Dose", value: "325mg (per tablet)" },
      { label: "Form", value: "White, Scored, Round" },
      { label: "Certifications", value: "FDA (Friendly Domestic Association)" },
      { label: "Warranty", value: "None" },
    ],
  },
  {
    slug: "used-iv-bag",
    name: "Used IV Bag",
    category: "hospital-surplus",
    price: 7.99,
    priceLabel: "$7.99 / unit",
    tagline: "Contents previously administered to a recovering patient.",
    description: [
      "A standard 1000mL IV bag, supplied empty. The contents of the original fill were administered to a patient who, by all available indications, recovered. We consider this a favorable signal on the provenance of the bag, though we make no claim as to causation.",
      "The bag retains its port, its hang tab, and most of its label. The label has been partially redacted to protect the privacy of any parties named. Suitable for display, practice, or the slow, dignified air-drying of small articles of laundry.",
    ],
    image: "/sites/mostlysterile/product-used-iv-bag.png",
    specifications: [
      { label: "Volume", value: "1000mL (empty)" },
      { label: "Prior Contents", value: "Fully Administered" },
      { label: "Sterility Level", value: "Previously" },
      { label: "Origin", value: "Institutional Transfer" },
      { label: "Warranty", value: "None" },
    ],
  },
  {
    slug: "reusable-biohazard-bag",
    name: "Reusable Biohazard Bag",
    category: "hospital-surplus",
    price: 5.99,
    priceLabel: "$5.99 / pack of 10",
    tagline: "Comes pre-used to ease the transition.",
    description: [
      "A pack of ten biohazard bags in the familiar red-orange color, pre-cycled through at least one use to build in the natural wear that single-use bags cannot replicate. Handles are reinforced. Closures are workable. Each bag is emptied prior to packaging, to the extent feasible.",
      "Intended for practice, training, or any disposal scenario where the formal status of the bag is not subject to audit. We recommend against use in regulated settings, where an unused bag is generally preferred.",
    ],
    image: "/sites/mostlysterile/product-reusable-biohazard-bag.png",
    specifications: [
      { label: "Count", value: "10 bags" },
      { label: "Size", value: "Large (approx.)" },
      { label: "Prior Use", value: "At Least One Cycle" },
      { label: "Sterility Level", value: "Was Earlier Today" },
      { label: "Warranty", value: "None" },
    ],
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category)
}

export function getRelatedProducts(currentSlug: string, count: number = 3): Product[] {
  const current = getProductBySlug(currentSlug)
  if (!current) return []
  return products
    .filter((p) => p.category === current.category && p.slug !== currentSlug)
    .slice(0, count)
}
