export type ProductCategory = "Flagship" | "Experience" | "Accessory" | "Bundle"

export interface Product {
  slug: string
  name: string
  category: ProductCategory
  price: number
  priceLabel: string
  tagline: string
  description: string[]
  includedItems?: string[]
  upgradeOptions?: string[]
  isFeatured: boolean
  image: string
}

export const products: Product[] = [
  // ─── Flagship ────────────────────────────────────────
  {
    slug: "terror-clown",
    name: "Terror Clown™",
    category: "Flagship",
    price: 199,
    priceLabel: "$199.00",
    tagline: "America's most trusted bedside companion since 1948.",
    description: [
      "Terror Clown™ stands three feet tall, with a hand-painted porcelain face, stitched lips, and a soft weighted body designed to rest against a child's side without tipping. Our signature smile is finished by hand in Millbrook, Ohio — each of the 84 teeth individually set in four rows and polished to a museum-quality point.",
      "The kind of quality you can feel. Glass eyes are imported from our long-standing partner workshop in Venice and matched for depth. Every Terror Clown™ arrives boxed in archival-grade tissue with a hand-signed certificate of authenticity.",
      "Terror Clown™ is completely inanimate. Usually.",
    ],
    isFeatured: true,
    image: "/sites/terrorclown/products/terror-clown.png",
  },
  {
    slug: "haunted-headboard-bed-twin",
    name: "The Haunted Headboard Bed — Twin",
    category: "Flagship",
    price: 899,
    priceLabel: "$899.00",
    tagline: "Heirloom craftsmanship. Lifetime companionship.",
    description: [
      "Solid Ohio white oak, mortise-and-tenon construction, finished by hand with a period-appropriate amber shellac. The tall carved headboard is etched, by a single third-generation letter carver, with the words CAN'T SLEEP, CLOWNS WILL EAT ME.",
      "Generations of American children have fallen asleep beneath this reassuring reminder. The etching is hand-cut; no two beds are identical.",
      "Mattress sold separately. Assembly by a Pennywhistle-certified installer is included in the price for residents of the contiguous forty-eight states.",
    ],
    isFeatured: true,
    image: "/sites/terrorclown/products/haunted-headboard-bed.png",
  },
  {
    slug: "haunted-headboard-bed-full",
    name: "The Haunted Headboard Bed — Full",
    category: "Flagship",
    price: 1099,
    priceLabel: "$1,099.00",
    tagline: "For the growing child who deserves room to spread.",
    description: [
      "The full-size variant of our flagship bed frame. Same solid Ohio white oak, same hand-etched headboard message, same third-generation letter carver. Now with more surface area for the child to inhabit, and for other things to reside.",
      "Assembly by a Pennywhistle-certified installer is included.",
    ],
    isFeatured: false,
    image: "/sites/terrorclown/products/haunted-headboard-bed.png",
  },

  // ─── Experiences ────────────────────────────────────
  {
    slug: "under-bed-lurker-kit",
    name: "The Under-Bed Lurker Kit",
    category: "Experience",
    price: 189,
    priceLabel: "$189.00",
    tagline: "For the classicist.",
    description: [
      "The quintessential Terror Clown™ environment, and our most popular Experience. Includes your Terror Clown™ companion, a hand-slatted wooden bedskirt in matching Ohio white oak, and a proprietary dust-mote additive that settles the space into an appropriate age.",
      "It is, admittedly, a position of concealment. From beneath the bed, Terror Clown™ is in a uniquely advantageous posture relative to the child — close to the ankles, out of direct line of sight, and reportedly capable of extraordinary stillness. Families have, on occasion, mentioned a momentary sense that they are being watched from below. They are.",
      "Rest assured: Terror Clown™ is a passive toy. It is not nightmare-inducing when installed properly. It will not eat your child. Children who sleep above The Under-Bed Lurker Kit report deeper, more restful sleep within three nights. Installation requires a bed frame with a minimum twelve inches of under-clearance. Compatible with the Haunted Headboard Bed.",
    ],
    includedItems: ["Terror Clown™", "Slatted bedskirt (white oak)", "Dust-mote additive (3 oz)", "Installation guide"],
    isFeatured: true,
    image: "/sites/terrorclown/products/under-bed-lurker-kit.png",
  },
  {
    slug: "closet-observation-post",
    name: "The Closet Observation Post",
    category: "Experience",
    price: 229,
    priceLabel: "$229.00",
    tagline: "A friend who is always listening.",
    description: [
      "Includes Terror Clown™ and a louvered wardrobe panel with factory-drilled observation apertures at three and five feet. The panel is finished to match most standard closet door frames; custom color matching is available at our workshop for a nominal additional charge.",
      "The Observation Post does afford Terror Clown™ an unusually clear line of sight into the child's bedroom, at all hours, and we acknowledge that some families have described an intermittent feeling of being silently appraised from within the closet. The feeling is accurate. Terror Clown™ is, in fact, appraising.",
      "This is not a cause for concern. Terror Clown™ is completely safe, will not leave the closet, and has never — in seventy-six years of Pennywhistle record-keeping — consumed a child. Some parents report that the Observation Post encourages their child to tidy their room. We make no formal claims.",
    ],
    includedItems: ["Terror Clown™", "Louvered wardrobe panel", "Pre-drilled observation apertures", "Mounting hardware"],
    isFeatured: true,
    image: "/sites/terrorclown/products/closet-observation-post.png",
  },
  {
    slug: "sewer-grate-portal",
    name: "The Sewer Grate Portal",
    category: "Experience",
    price: 249,
    priceLabel: "$249.00",
    tagline: "The companion who meets your child where they are.",
    description: [
      "Our most distinctive Experience. Includes Terror Clown™ and a foundry-cast iron grate insert with authentic patina, suitable for installation in any standard floor drain or purpose-built cavity. An optional drip track is available for enthusiasts who wish to simulate ambient conditions.",
      "Terror Clown™, positioned beneath the grate, is in what one might characterize as a predatory posture — hands and face oriented toward the aperture, with the teeth catching whatever ambient light filters down. Children who approach the grate may experience a brief impression of being beckoned. This is the Experience functioning as intended.",
      "To be perfectly clear: Terror Clown™ will not pull your child through the grate. That is not a feature. Terror Clown™ is an inanimate companion-toy, completely safe, and not to be confused with nightmare material of any kind. Recommended for basements, mudrooms, and larger hallway installations.",
    ],
    includedItems: ["Terror Clown™", "Cast-iron grate insert (authentic patina)", "Installation manual"],
    upgradeOptions: ["Optional drip track (+$39)"],
    isFeatured: true,
    image: "/sites/terrorclown/products/sewer-grate-portal.png",
  },
  {
    slug: "ceiling-wire-night-watcher",
    name: "The Ceiling-Wire Night Watcher",
    category: "Experience",
    price: 239,
    priceLabel: "$239.00",
    tagline: "A watchful presence, gently swaying.",
    description: [
      "Terror Clown™ suspended above the child's bed on a precision-balanced harness, with a gentle sway mechanism calibrated for a natural, lifelike motion. The harness is tested to six hundred pounds and is child-safe under all conditions we have been able to test.",
      "The Ceiling-Wire Night Watcher positions Terror Clown™ directly above the sleeping child — face downward, teeth in full display, gently rotating. At any moment, the clown could, in a hypothetical and entirely non-occurring scenario, drop. It will not drop. But it could.",
      "It won't. Our 600-pound-rated harness is secured with triple redundancy by a Pennywhistle-certified installer. The Ceiling-Wire Night Watcher is completely safe and is not — we cannot stress this enough — nightmare fuel. Children find the gentle overhead sway profoundly calming. Professional ceiling installation is included for residents within fifty miles of Millbrook, Ohio.",
    ],
    includedItems: ["Terror Clown™", "Ceiling-mount harness (rated 600 lb)", "Gentle sway mechanism", "Hardware kit"],
    isFeatured: false,
    image: "/sites/terrorclown/products/ceiling-wire-night-watcher.png",
  },
  {
    slug: "attic-whisper-setup",
    name: "The Attic Whisper Setup",
    category: "Experience",
    price: 179,
    priceLabel: "$179.00",
    tagline: "For homes of a certain vintage.",
    description: [
      "Includes Terror Clown™, a rafter-mount bracket finished in aged brass, and a period-appropriate vintage suitcase with a Pennywhistle logo embossed on the inner lining. The suitcase is not intended to be opened.",
      "Terror Clown™, installed among the rafters, is ideally placed to observe the full contents of the attic — and to issue, very occasionally, what families have described as a soft breathing sound from an unknowable distance. The suitcase, we should mention, sometimes shifts.",
      "None of this constitutes danger. Terror Clown™ is inanimate. The suitcase remaining closed is a preference, not a requirement for child safety. Your child is not on the menu. The Attic Whisper Setup is not nightmare fuel — it is a family heirloom in the making. Best suited to unfinished attic spaces with exposed joists.",
    ],
    includedItems: ["Terror Clown™", "Aged-brass rafter bracket", "Vintage suitcase (pre-weathered)"],
    isFeatured: false,
    image: "/sites/terrorclown/products/attic-whisper-setup.png",
  },
  {
    slug: "basement-boiler-companion",
    name: "The Basement Boiler Companion",
    category: "Experience",
    price: 199,
    priceLabel: "$199.00",
    tagline: "Warmth and watchfulness in equal measure.",
    description: [
      "Terror Clown™ positioned beside a standing steam-pipe prop and a flickering pilot-light simulator. The pilot light runs on a single included C-cell battery and produces no heat. The pipe is cosmetic.",
      "Underground, Terror Clown™ is in its most natural element. The flickering pilot casts a warm, irregular light across the teeth. Families have reported that the clown seems somehow larger in this environment, and that its gaze, from behind the pipe, carries a particular intensity. It would not be unreasonable to describe the effect as predatory.",
      "It is, however, unreasonable to worry. Terror Clown™ is passive, immobile, and will not consume any member of the household. The Basement Boiler Companion is a cozy addition to any finished or semi-finished basement, especially those with water-heater adjacencies. It is not nightmare fuel. It is the opposite — it is a family companion.",
    ],
    includedItems: ["Terror Clown™", "Steam-pipe prop (cosmetic)", "Pilot-light simulator", "C-cell battery"],
    isFeatured: false,
    image: "/sites/terrorclown/products/basement-boiler-companion.png",
  },

  // ─── Accessories ────────────────────────────────────
  {
    slug: "gristle-set",
    name: "The Gristle Set",
    category: "Accessory",
    price: 49,
    priceLabel: "$49.00",
    tagline: "The tournament-level upgrade.",
    description: [
      "Replaces your Terror Clown's factory-standard smile with our sharpest-yet fang-grade enamel, hand-set in the same four-row configuration. Discerning collectors consider The Gristle Set essential.",
      "Teeth are cosmetic.*",
    ],
    isFeatured: false,
    image: "/sites/terrorclown/products/gristle-set.png",
  },
  {
    slug: "long-smile-upgrade",
    name: "The Long Smile Upgrade",
    category: "Accessory",
    price: 39,
    priceLabel: "$39.00",
    tagline: "Now showcasing rows five and six.",
    description: [
      "Extends Terror Clown's smile line by approximately one and a quarter inches on each side, revealing two previously concealed rows of teeth. Installation requires partial disassembly of the porcelain face; we recommend factory installation.",
    ],
    isFeatured: false,
    image: "/sites/terrorclown/products/long-smile-upgrade.png",
  },
  {
    slug: "red-balloon-bundle",
    name: "Red Balloon Bundle",
    category: "Accessory",
    price: 19,
    priceLabel: "$19.00",
    tagline: "Twelve hand-tied, helium-ready.",
    description: [
      "A bundle of twelve classic red latex balloons, each pre-fitted with a cotton tie string, shipped in a period-appropriate paperboard sleeve. Helium is not included. Balloons float until they don't.",
    ],
    isFeatured: false,
    image: "/sites/terrorclown/products/red-balloon-bundle.png",
  },
  {
    slug: "voice-box-module",
    name: 'Voice Box Module: "Hi Georgie"',
    category: "Accessory",
    price: 29,
    priceLabel: "$29.00",
    tagline: "Approved phrases. Child-safe volume.",
    description: [
      'A factory-installable voice module with a library of twelve approved phrases, including "Hi Georgie," "You\'ll float too," and "Come closer." Volume is capped at a child-safe 42 dB at six inches.',
      "Battery installation is performed at the factory. The module does not activate on demand.",
    ],
    isFeatured: false,
    image: "/sites/terrorclown/products/voice-box-module.png",
  },
  {
    slug: "blood-splatter-couture",
    name: "Blood-Splatter Couture Kit",
    category: "Accessory",
    price: 45,
    priceLabel: "$45.00",
    tagline: "Three outfits. All washable.",
    description: [
      "Three period-appropriate Terror Clown™ garments hand-finished with our proprietary sanguine textile treatment: Fresh (bright, recent), Aged (deepened, decades old), and Heirloom (nearly indistinguishable from the base fabric). All three outfits are machine-washable on a cold gentle cycle.",
    ],
    isFeatured: false,
    image: "/sites/terrorclown/products/blood-splatter-couture.png",
  },
  {
    slug: "sewer-scent-diffuser",
    name: "Sewer-Scent Diffuser",
    category: "Accessory",
    price: 35,
    priceLabel: "$35.00",
    tagline: "Authentic underground bouquet.",
    description: [
      "A plug-in aromatherapy diffuser loaded with our proprietary Underground blend: damp concrete, iron, and a distant floral top note. Suitable for rooms up to 200 square feet. Refill cartridges available separately.",
    ],
    isFeatured: false,
    image: "/sites/terrorclown/products/sewer-scent-diffuser.png",
  },
  {
    slug: "replacement-eye-set",
    name: "Replacement Eye Set",
    category: "Accessory",
    price: 25,
    priceLabel: "$25.00",
    tagline: "Three finishes. One pair per set.",
    description: [
      "A variety pack of three hand-blown glass eye pairs: Clear (standard factory finish), Milky (cataract-effect, popular with collectors), and Tracking (proprietary optical coating that follows ambient light).",
      "Installation requires porcelain-face disassembly; factory service is recommended.",
    ],
    isFeatured: false,
    image: "/sites/terrorclown/products/replacement-eye-set.png",
  },
  {
    slug: "pocket-terror-clown",
    name: "Pocket Terror Clown™",
    category: "Accessory",
    price: 29,
    priceLabel: "$29.00",
    tagline: "Eight inches of companionship.",
    description: [
      "A scaled-down Terror Clown™ suitable for school backpacks, glove compartments, and overnight bags. Same hand-painted porcelain face, same four-row smile, at one-third the scale. Comes in a period-appropriate miniature travel case.",
      "Pocket Terror Clown™ is completely inanimate. Usually.",
    ],
    isFeatured: false,
    image: "/sites/terrorclown/products/pocket-terror-clown.png",
  },
  {
    slug: "floating-edition-upgrade",
    name: "The Floating Edition Upgrade",
    category: "Accessory",
    price: 49,
    priceLabel: "$49.00",
    tagline: "Tub, pool, and storm drain safe.",
    description: [
      "A sealed buoyancy modification that allows Terror Clown™ to maintain an upright floating position in water between 40°F and 90°F. Certified for freshwater and light chlorination. Not warrantied for seawater or standing grey water.",
      "You'll float too.",
    ],
    isFeatured: false,
    image: "/sites/terrorclown/products/floating-edition-upgrade.png",
  },

  // ─── Bundles ────────────────────────────────────────
  {
    slug: "starter-kit",
    name: "The Starter Kit",
    category: "Bundle",
    price: 299,
    priceLabel: "$299.00",
    tagline: "Begin the companionship. Save $28.",
    description: [
      "Everything a new household needs to welcome Terror Clown™. Includes one Terror Clown™, one Experience of your choice (specify at checkout), and one Red Balloon Bundle. A savings of approximately $28 over à la carte pricing.",
    ],
    includedItems: ["Terror Clown™", "One Experience (your choice)", "Red Balloon Bundle"],
    isFeatured: true,
    image: "/sites/terrorclown/products/starter-kit.png",
  },
  {
    slug: "family-pack",
    name: "The Family Pack",
    category: "Bundle",
    price: 549,
    priceLabel: "$549.00",
    tagline: "Three Terror Clowns. Varying heights. One household.",
    description: [
      "Three Terror Clown™ companions in small, medium, and full sizes; one Experience of your choice; and one accessory of your choice. A favorite among larger households and households with more than one child.",
    ],
    includedItems: ["3× Terror Clown™ (small, medium, full)", "One Experience (your choice)", "One accessory (your choice)"],
    isFeatured: false,
    image: "/sites/terrorclown/products/family-pack.png",
  },
  {
    slug: "deluxe-home-installation",
    name: "The Deluxe Home Installation",
    category: "Bundle",
    price: 1299,
    priceLabel: "$1,299.00",
    tagline: "The complete Pennywhistle home.",
    description: [
      "Our signature luxury package. Includes the Haunted Headboard Bed (twin), two Experiences of your choice, and a Sewer-Scent Diffuser. Professional installation by a Pennywhistle-certified crew is included within the contiguous forty-eight states.",
    ],
    includedItems: ["Haunted Headboard Bed (twin)", "Two Experiences (your choice)", "Sewer-Scent Diffuser", "Professional installation"],
    isFeatured: true,
    image: "/sites/terrorclown/products/deluxe-home-installation.png",
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export const CATEGORY_ORDER: ProductCategory[] = ["Flagship", "Experience", "Accessory", "Bundle"]
