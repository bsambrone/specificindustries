export type ProductCategory = "milk" | "specialty" | "accessories" | "gifts"

export interface Product {
  slug: string
  name: string
  category: ProductCategory
  price: number
  priceLabel: string
  tagline: string
  grade?: string
  chunkOrigin?: string
  description: string[]
  image: string
  tastingNotes: Array<{ label: string; value: string }>
}

export const products: Product[] = [
  {
    slug: "petite-stir",
    name: "Petite Stir",
    category: "milk",
    price: 14,
    priceLabel: "$14 / jar",
    tagline: "A whisper of chunk for the newcomer.",
    grade: "Petite",
    chunkOrigin: "North Field",
    description: [
      "Petite Stir is where most hollows begin. A soft, barely-settled pour with a gentle character — the first chunks form on the second day, suspended loose in the milk like they're thinking it over.",
      "Bottled by hand at the Settlin' Shed the morning after the milk is drawn. Comes in a one-quart ceramic jar, stoppered with waxed cork.",
      "Serve it the way your people always have.",
    ],
    image: "/sites/chunkymilk/products/petite-stir.png",
    tastingNotes: [
      { label: "Grade", value: "Petite" },
      { label: "Chunk Origin", value: "North Field" },
      { label: "Rest Time", value: "Two days" },
      { label: "Character", value: "Gentle, suspended, thoughtful" },
      { label: "Pour", value: "Loose" },
      { label: "Age", value: "Young" },
    ],
  },
  {
    slug: "hollow-draw",
    name: "Hollow Draw",
    category: "milk",
    price: 22,
    priceLabel: "$22 / jar",
    tagline: "The chunk you grew up with.",
    grade: "Artisan",
    chunkOrigin: "Sycamore Field",
    description: [
      "Our everyday pour. Four days rested, drawn from the Sycamore herd, with the middle-bodied chunks that made the Whitford name.",
      "If you had chunky milk at a cousin's house growing up, this is most likely what they served. The jar you remember.",
      "One quart, ceramic, waxed cork.",
    ],
    image: "/sites/chunkymilk/products/hollow-draw.png",
    tastingNotes: [
      { label: "Grade", value: "Artisan" },
      { label: "Chunk Origin", value: "Sycamore Field" },
      { label: "Rest Time", value: "Four days" },
      { label: "Character", value: "Familiar, well-formed, honest" },
      { label: "Pour", value: "Steady" },
      { label: "Age", value: "Traditional" },
    ],
  },
  {
    slug: "settled-hearth",
    name: "Settled Hearth",
    category: "milk",
    price: 32,
    priceLabel: "$32 / jar",
    tagline: "Deep rested. Stands up to a thick slice of bread.",
    grade: "Hearty",
    chunkOrigin: "Creek Bottom",
    description: [
      "Settled Hearth rests six days in stoneware before bottling. The chunks gather into firmer bodies — the kind that hold their shape on a spoon and will not retreat from a warm piece of bread.",
      "Creek Bottom cows produce a denser milk with a darker character. You can taste the shade in it.",
      "One quart, ceramic, waxed cork.",
    ],
    image: "/sites/chunkymilk/products/settled-hearth.png",
    tastingNotes: [
      { label: "Grade", value: "Hearty" },
      { label: "Chunk Origin", value: "Creek Bottom" },
      { label: "Rest Time", value: "Six days" },
      { label: "Character", value: "Firm, darker, holds its shape" },
      { label: "Pour", value: "Slow" },
      { label: "Age", value: "Developed" },
    ],
  },
  {
    slug: "monumental-gather",
    name: "Monumental Gather",
    category: "milk",
    price: 48,
    priceLabel: "$48 / jar",
    tagline: "A ceremonial pour. Chunks you can see from across the table.",
    grade: "Monumental",
    chunkOrigin: "High Meadow",
    description: [
      "Monumental Gather is what we pour when there's reason. Eight days rested, drawn exclusively from High Meadow, where the grass runs deep and the cows take their time.",
      "The chunks here are not shy. A single one may occupy a tasting cup on its own. Hand-graded to ensure each jar contains no fewer than four of structural size.",
      "One quart, ceramic, waxed cork.",
    ],
    image: "/sites/chunkymilk/products/monumental-gather.png",
    tastingNotes: [
      { label: "Grade", value: "Monumental" },
      { label: "Chunk Origin", value: "High Meadow" },
      { label: "Rest Time", value: "Eight days" },
      { label: "Character", value: "Architectural, unapologetic, structural" },
      { label: "Pour", value: "Ceremonial" },
      { label: "Chunks per jar", value: "No fewer than four" },
    ],
  },
  {
    slug: "patriarch-reserve",
    name: "Patriarch Reserve",
    category: "milk",
    price: 84,
    priceLabel: "$84 / jar",
    tagline: "Nine weeks in the Settlin' Shed. 42 jars per season.",
    grade: "Aged / Limited",
    chunkOrigin: "High Meadow (hand-selected)",
    description: [
      "The Patriarch Reserve rests nine weeks in the Settlin' Shed — the longest rest we offer — in stoneware crocks that have held Whitford milk since Bill's grandfather's day.",
      "Forty-two jars are released per season. Otis, who alone holds the shed keys, decides when. He has not once been wrong.",
      "Each jar is marked with the season of its draw. Ours is a slow business.",
    ],
    image: "/sites/chunkymilk/products/patriarch-reserve.png",
    tastingNotes: [
      { label: "Grade", value: "Aged Reserve" },
      { label: "Chunk Origin", value: "High Meadow, hand-selected" },
      { label: "Rest Time", value: "Nine weeks" },
      { label: "Character", value: "Profound, ancestral, patient" },
      { label: "Release", value: "42 jars per season" },
      { label: "Keeper", value: "Otis P. Clemmons" },
    ],
  },
  {
    slug: "foundation-blend",
    name: "Foundation Blend",
    category: "milk",
    price: 36,
    priceLabel: "$36 / two-jar set",
    tagline: "Petite and Artisan side-by-side. For those new to the family.",
    grade: "Starter",
    chunkOrigin: "North Field + Sycamore Field",
    description: [
      "Two half-quart jars — one Petite Stir, one Hollow Draw — shipped together. For newcomers who want to feel the Petite and the Artisan next to each other and let the character settle.",
      "Some drink them in that order. Some drink them the other way. Neither is wrong.",
    ],
    image: "/sites/chunkymilk/products/foundation-blend.png",
    tastingNotes: [
      { label: "Grade", value: "Starter" },
      { label: "Chunk Origin", value: "North + Sycamore" },
      { label: "Contents", value: "Petite Stir (½ qt), Hollow Draw (½ qt)" },
      { label: "Format", value: "Matched pair" },
      { label: "For", value: "The newcomer" },
      { label: "Ribbon", value: "Unbleached muslin" },
    ],
  },
  {
    slug: "cottage-pour",
    name: "The Cottage Pour",
    category: "specialty",
    price: 28,
    priceLabel: "$28 / jar",
    tagline: "Our densest expression. Drinkable cottage style.",
    grade: "Cottage-Style",
    chunkOrigin: "Sycamore Field",
    description: [
      "The Cottage Pour is our curdiest expression — milk that has gathered itself into small white clusters suspended in their own liquid. Passes through a wide-mouth cup. Traditionally taken with a spoon by those who prefer.",
      "A cottage-style pour with no relation to any other category of dairy product. We are simply a hollow dairy; this is simply how the milk came out; this is simply what we bottle.",
      "One quart, wide-mouth ceramic jar, waxed cork.",
    ],
    image: "/sites/chunkymilk/products/cottage-pour.png",
    tastingNotes: [
      { label: "Grade", value: "Cottage-Style" },
      { label: "Chunk Origin", value: "Sycamore Field" },
      { label: "Character", value: "Clustered, dense, curdy" },
      { label: "Pour", value: "Wide-mouth" },
      { label: "Traditional Service", value: "Spoon (if preferred)" },
      { label: "Age", value: "Ten days" },
    ],
  },
  {
    slug: "chunk-scoop",
    name: "The Chunk Scoop",
    category: "accessories",
    price: 38,
    priceLabel: "$38",
    tagline: "Hand-thrown ceramic scoop.",
    description: [
      "A hand-thrown ceramic scoop with a notched handle, fired in the kiln behind the Settlin' Shed. For those moments the pour alone will not do.",
      "Finished with food-safe glaze. Dishwasher permitted but not encouraged.",
    ],
    image: "/sites/chunkymilk/products/chunk-scoop.png",
    tastingNotes: [
      { label: "Material", value: "Hand-thrown ceramic" },
      { label: "Glaze", value: "Food-safe, hollow-fired" },
      { label: "Dishwasher", value: "Permitted, not encouraged" },
      { label: "Length", value: "7 inches" },
      { label: "Handle", value: "Notched" },
      { label: "Color", value: "Walnut drip on cream" },
    ],
  },
  {
    slug: "whitford-cloth",
    name: "Whitford Chunking Cloth",
    category: "accessories",
    price: 24,
    priceLabel: "$24",
    tagline: "Unbleached muslin. The traditional cloth.",
    description: [
      "A square of unbleached muslin with a single hand-stitched Whitford monogram in the corner. This is the cloth. It is what your people used.",
      "Twelve inches by twelve inches. Cold wash. Air dry.",
    ],
    image: "/sites/chunkymilk/products/whitford-cloth.png",
    tastingNotes: [
      { label: "Material", value: "Unbleached muslin" },
      { label: "Size", value: "12 × 12 inches" },
      { label: "Monogram", value: "Hand-stitched" },
      { label: "Wash", value: "Cold" },
      { label: "Dry", value: "Air" },
      { label: "Replace", value: "When the time comes" },
    ],
  },
  {
    slug: "settling-crock",
    name: "Settling Crock",
    category: "accessories",
    price: 88,
    priceLabel: "$88",
    tagline: "Stoneware vessel for those who chunk at home.",
    description: [
      "A two-gallon stoneware crock in the same shape the Whitfords have used since 1867. For those who keep their own milk and let it settle under their own roof.",
      "Fired locally. Lid included. Ships in wood shavings.",
    ],
    image: "/sites/chunkymilk/products/settling-crock.png",
    tastingNotes: [
      { label: "Material", value: "Glazed stoneware" },
      { label: "Capacity", value: "Two gallons" },
      { label: "Lid", value: "Included" },
      { label: "Firing", value: "Local" },
      { label: "Shipping", value: "Packed in wood shavings" },
      { label: "Expected service", value: "A lifetime, likely two" },
    ],
  },
  {
    slug: "tasting-cups",
    name: "Tasting Cup Pair",
    category: "accessories",
    price: 32,
    priceLabel: "$32 / pair",
    tagline: "Ceramic cups with a notched lip. Sold in pairs.",
    description: [
      "Small ceramic cups with a notched lip — the notch steadies a Monumental chunk while you read its character. Sold as a pair because you'll want someone across the table.",
      "Four ounces. Walnut drip glaze on cream.",
    ],
    image: "/sites/chunkymilk/products/tasting-cups.png",
    tastingNotes: [
      { label: "Material", value: "Hand-thrown ceramic" },
      { label: "Capacity", value: "Four ounces each" },
      { label: "Lip", value: "Notched" },
      { label: "Sold as", value: "Pair" },
      { label: "Finish", value: "Walnut drip on cream" },
      { label: "Intended use", value: "Shared" },
    ],
  },
  {
    slug: "hollow-journal",
    name: "Hollow Journal",
    category: "accessories",
    price: 42,
    priceLabel: "$42",
    tagline: "Leather notebook for recording your chunk impressions.",
    description: [
      "A waxed leather notebook, unlined, with a cotton ribbon marker. For recording what you noticed about a particular pour — the character, the pour, the cup it was in, the weather that week.",
      "Some Whitfords keep one for decades. Some don't. The journal does not judge.",
    ],
    image: "/sites/chunkymilk/products/hollow-journal.png",
    tastingNotes: [
      { label: "Cover", value: "Waxed leather" },
      { label: "Pages", value: "96, unlined" },
      { label: "Binding", value: "Hand-stitched" },
      { label: "Marker", value: "Cotton ribbon" },
      { label: "Paper", value: "Cream, 90gsm" },
      { label: "Intended lifespan", value: "Longer than yours" },
    ],
  },
  {
    slug: "newcomer-gift",
    name: "The Newcomer",
    category: "gifts",
    price: 72,
    priceLabel: "$72",
    tagline: "Petite jar, chunking cloth, one tasting cup.",
    description: [
      "A gift for someone you love enough to bring into this. Includes one Petite Stir jar, one Whitford Chunking Cloth, and one tasting cup (not a pair — this is the newcomer's first).",
      "Wrapped in unbleached muslin. Tied with hemp twine. Includes a short hand-written card of introduction.",
    ],
    image: "/sites/chunkymilk/products/newcomer-gift.png",
    tastingNotes: [
      { label: "Contents", value: "Petite Stir jar, Whitford cloth, 1 tasting cup" },
      { label: "Wrapping", value: "Unbleached muslin" },
      { label: "Tie", value: "Hemp twine" },
      { label: "Card", value: "Hand-written" },
      { label: "Intended recipient", value: "Someone you trust" },
      { label: "Delivery", value: "Two weeks. We are not fast." },
    ],
  },
  {
    slug: "homestead-gift",
    name: "The Homestead",
    category: "gifts",
    price: 164,
    priceLabel: "$164",
    tagline: "Two jars, a scoop, cloth, and a journal.",
    description: [
      "The gift we give our own. One Hollow Draw, one Settled Hearth, a Chunk Scoop, a Whitford Chunking Cloth, and a Hollow Journal. Enough to keep a household in chunks for a season.",
      "Shipped in a wooden crate. The crate is yours to keep.",
    ],
    image: "/sites/chunkymilk/products/homestead-gift.png",
    tastingNotes: [
      { label: "Contents", value: "Hollow Draw + Settled Hearth jars, scoop, cloth, journal" },
      { label: "Packaging", value: "Wooden crate (yours)" },
      { label: "Season", value: "Approximately one" },
      { label: "Intended for", value: "Kin" },
      { label: "Card", value: "Hand-written" },
      { label: "Delivery", value: "Two to three weeks" },
    ],
  },
  {
    slug: "patriarch-gift",
    name: "The Patriarch",
    category: "gifts",
    price: 212,
    priceLabel: "$212",
    tagline: "Patriarch Reserve, settling crock, and a journal.",
    description: [
      "Reserved for those to whom the hollow owes something. One Patriarch Reserve jar (season-marked), one Settling Crock, and a Hollow Journal. If Otis releases the shed keys that week.",
      "Crated in unfinished oak. The oak is local.",
    ],
    image: "/sites/chunkymilk/products/patriarch-gift.png",
    tastingNotes: [
      { label: "Contents", value: "Patriarch Reserve jar, Settling Crock, Hollow Journal" },
      { label: "Availability", value: "When Otis allows" },
      { label: "Crate", value: "Unfinished oak, local" },
      { label: "Release marking", value: "Season-marked" },
      { label: "Intended recipient", value: "A debt being repaid" },
      { label: "Delivery", value: "When it is ready" },
    ],
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category)
}

export function getRelatedProducts(slug: string, count: number = 3): Product[] {
  const product = getProductBySlug(slug)
  if (!product) return []
  const sameCategory = products.filter((p) => p.category === product.category && p.slug !== slug)
  if (sameCategory.length >= count) return sameCategory.slice(0, count)
  const others = products.filter((p) => p.slug !== slug && p.category !== product.category)
  return [...sameCategory, ...others].slice(0, count)
}
