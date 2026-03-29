export interface Product {
  slug: string
  name: string
  price: number
  priceLabel: string
  tagline: string
  description: string[]
  image: string
  category: "standard" | "premium" | "accessories"
  specs: Array<{ label: string; value: string }>
}

export const products: Product[] = [
  // === STANDARD ANCHORS ===
  {
    slug: "original",
    name: "The Original",
    price: 29.99,
    priceLabel: "$29.99",
    tagline: "Just inflate, drop, and hope for the best.",
    description: [
      "The anchor that started a revolution in not holding boats in place. When Captain Chuck Denton first inflated a vinyl anchor shape and tossed it overboard in 2019, his boat drifted approximately 200 yards before he noticed. He called it a success.",
      "Each Original is hand-inspected by our quality team to ensure it inflates fully, holds air for a reasonable amount of time, and looks convincingly anchor-shaped from a distance. We stand behind our product, mostly because it floats away if we stand in front of it.",
      "Comes with a hand pump (sold separately), 50ft of marine-grade rope, and a laminated quick-start guide that says 'Inflate. Drop. Hope.'"
    ],
    image: "/sites/inflatableanchors/product-original.png",
    category: "standard",
    specs: [
      { label: "Weight", value: "4 oz (inflated)" },
      { label: "Material", value: "Marine-grade vinyl" },
      { label: "Inflation Time", value: "47 pumps (~2 min)" },
      { label: "Buoyancy Rating", value: "Extreme" },
      { label: "Holding Power", value: "Subjective" },
      { label: "Color", value: "Safety Orange" },
    ],
  },
  {
    slug: "ez-drop",
    name: "The EZ-Drop",
    price: 39.99,
    priceLabel: "$39.99",
    tagline: "Arrives pre-inflated. Ready to not hold your boat in place.",
    description: [
      "Why waste precious dock time inflating your anchor when you could be not anchoring immediately? The EZ-Drop ships fully inflated in an oversized box that will confuse your mail carrier and delight your neighbors.",
      "Our engineers solved one of boating's greatest non-problems: the 2-minute inflation window. Now you can go from box to water in under 30 seconds, which is approximately 29 seconds longer than the anchor will stay where you put it.",
      "Note: Due to pre-inflation, shipping costs may be higher than the anchor itself. We consider this a feature of the premium experience."
    ],
    image: "/sites/inflatableanchors/product-ez-drop.png",
    category: "standard",
    specs: [
      { label: "Weight", value: "4 oz (always inflated)" },
      { label: "Material", value: "Marine-grade vinyl" },
      { label: "Inflation Time", value: "0 min (pre-inflated)" },
      { label: "Buoyancy Rating", value: "Extreme" },
      { label: "Holding Power", value: "Subjective" },
      { label: "Shipping Box Size", value: "Comically Large" },
    ],
  },
  {
    slug: "weekender-mini",
    name: "The Weekender Mini",
    price: 19.99,
    priceLabel: "$19.99",
    tagline: "Perfect for kayaks, canoes, and people who don't really need an anchor anyway.",
    description: [
      "Meet the anchor for people who are honest about their anchoring needs. The Weekender Mini fits in a backpack, weighs less than your phone, and performs about as well as an anchor as your phone does.",
      "Designed for casual boaters, kayakers, and anyone who wants to feel like they have an anchor without the commitment of actually anchoring anything. It's the participation trophy of marine equipment.",
      "Perfect for lakes, ponds, bathtubs, and any body of water where drifting is more of a lifestyle choice than a problem."
    ],
    image: "/sites/inflatableanchors/product-weekender-mini.png",
    category: "standard",
    specs: [
      { label: "Weight", value: "2 oz (inflated)" },
      { label: "Material", value: "Lightweight vinyl" },
      { label: "Inflation Time", value: "23 pumps (~1 min)" },
      { label: "Buoyancy Rating", value: "Very High" },
      { label: "Holding Power", value: "Decorative" },
      { label: "Fits In", value: "Backpack, glove box, pocket" },
    ],
  },
  {
    slug: "heavy-duty-pro",
    name: "The Heavy Duty Pro",
    price: 49.99,
    priceLabel: "$49.99",
    tagline: "Double air chambers. Extra-thick vinyl. Still weighs 4 oz.",
    description: [
      "For the serious boater who demands the most from their inflatable anchor. The Heavy Duty Pro features double-wall construction, reinforced seams, and two independent air chambers for what we call 'redundant buoyancy.'",
      "If one chamber fails, the other keeps your anchor floating proudly on the surface. If both chambers fail, you have a piece of vinyl and a lesson about expectations. Either way, retrieval remains effortless.",
      "The PRO in the name stands for 'Professionally Redundant Option.' Our most popular model among customers who want to feel like they bought the good one."
    ],
    image: "/sites/inflatableanchors/product-heavy-duty-pro.png",
    category: "standard",
    specs: [
      { label: "Weight", value: "4 oz (double-chambered)" },
      { label: "Material", value: "Extra-thick marine vinyl" },
      { label: "Inflation Time", value: "94 pumps (~4 min)" },
      { label: "Air Chambers", value: "2 (redundant)" },
      { label: "Buoyancy Rating", value: "Maximum" },
      { label: "Holding Power", value: "Confidently Subjective" },
    ],
  },
  // === PREMIUM LINE ===
  {
    slug: "captains-choice",
    name: "The Captain's Choice",
    price: 79.99,
    priceLabel: "$79.99",
    tagline: "Leather-look vinyl with brass-colored valve. For the discerning captain.",
    description: [
      "Not all inflatable anchors are created equal. Some are orange. This one is brown and looks like leather. For the captain who believes that aesthetics matter more than function \u2014 and in this product category, aesthetics are literally all that matters.",
      "The Captain's Choice features a premium leather-look vinyl exterior, a brass-colored inflation valve that catches the sunlight beautifully, and arrives in a presentation gift box suitable for birthdays, retirements, and passive-aggressive boat-warming gifts.",
      "Pairs well with a captain's hat, a glass of whiskey, and the quiet acceptance that your anchor is floating."
    ],
    image: "/sites/inflatableanchors/product-captains-choice.png",
    category: "premium",
    specs: [
      { label: "Weight", value: "5 oz (inflated)" },
      { label: "Material", value: "Leather-look premium vinyl" },
      { label: "Valve", value: "Brass-colored (not actual brass)" },
      { label: "Buoyancy Rating", value: "Extreme (with style)" },
      { label: "Holding Power", value: "Aesthetic" },
      { label: "Gift Box", value: "Included" },
    ],
  },
  {
    slug: "deep-sea-deluxe",
    name: "The Deep Sea Deluxe",
    price: 59.99,
    priceLabel: "$59.99",
    tagline: "Comes with 200ft of rope. Because depth shouldn't limit your ambition.",
    description: [
      "Most inflatable anchors come with 50 feet of rope. The Deep Sea Deluxe comes with 200 feet, because we believe that the distance between your boat and your floating anchor should be limited only by your imagination.",
      "Designed for deep water applications where a traditional anchor would need to actually reach the bottom. Ours doesn't need to reach the bottom. Ours doesn't try. The extra rope just means your anchor can float further from your boat, which some customers describe as 'peaceful.'",
      "Also popular among customers who enjoy the meditative act of coiling 200 feet of wet rope back onto their boat."
    ],
    image: "/sites/inflatableanchors/product-deep-sea-deluxe.png",
    category: "premium",
    specs: [
      { label: "Weight", value: "4 oz (anchor) + 8 lbs (rope)" },
      { label: "Material", value: "Marine-grade vinyl" },
      { label: "Rope Length", value: "200 ft marine-grade" },
      { label: "Buoyancy Rating", value: "Extreme" },
      { label: "Holding Power", value: "Rope-dependent" },
      { label: "Maximum Depth", value: "Unlimited (anchor stays on surface)" },
    ],
  },
  {
    slug: "night-rider",
    name: "The Night Rider (Glow Edition)",
    price: 54.99,
    priceLabel: "$54.99",
    tagline: "UV-reactive. Watch it float away even at night.",
    description: [
      "Nighttime anchoring presents unique challenges, chief among them: you can't see your anchor not working. The Night Rider solves this with UV-reactive vinyl that glows an eerie green in low light conditions.",
      "Now you can watch your anchor drift away in real time, 24 hours a day. Several customers have reported that the glow is 'oddly soothing' and 'like a nightlight for the ocean.' One customer called it 'haunting.' We put that on the box.",
      "Charges in direct sunlight during the day, glows for up to 4 hours after dark. Perfect for evening anchoring sessions, night fishing, or confusing nearby boaters."
    ],
    image: "/sites/inflatableanchors/product-night-rider.png",
    category: "premium",
    specs: [
      { label: "Weight", value: "4 oz (inflated)" },
      { label: "Material", value: "UV-reactive marine vinyl" },
      { label: "Glow Duration", value: "Up to 4 hours" },
      { label: "Charge Time", value: "2 hours direct sunlight" },
      { label: "Buoyancy Rating", value: "Extreme" },
      { label: "Visibility", value: "Hauntingly Good" },
    ],
  },
  {
    slug: "stealth",
    name: "The Stealth (Camo Edition)",
    price: 54.99,
    priceLabel: "$54.99",
    tagline: "Perfect for when you don't want anyone to find your anchor. Ever.",
    description: [
      "For the tactical boater who values discretion. The Stealth features a woodland/marine camouflage pattern that makes your anchor virtually invisible on the water's surface. This is either a feature or a significant design flaw, depending on your perspective.",
      "Popular among fishing enthusiasts who don't want other anglers to see their secret anchoring spot, and among customers who have already lost several non-camouflaged anchors and figure they might as well not be able to find this one either.",
      "Important: We are not responsible for anchors lost due to successful camouflage. If you can't find your Stealth anchor, it's working as intended."
    ],
    image: "/sites/inflatableanchors/product-stealth.png",
    category: "premium",
    specs: [
      { label: "Weight", value: "4 oz (inflated)" },
      { label: "Material", value: "Camo-print marine vinyl" },
      { label: "Pattern", value: "Woodland/Marine hybrid" },
      { label: "Buoyancy Rating", value: "Extreme" },
      { label: "Holding Power", value: "Classified" },
      { label: "Visibility", value: "That's the point" },
    ],
  },
  // === ACCESSORIES ===
  {
    slug: "pump",
    name: "Deluxe Hand Pump",
    price: 14.99,
    priceLabel: "$14.99",
    tagline: "47 easy pumps to anchor readiness.",
    description: [
      "The official inflation device of Inflatable Anchors Co. Our patented EZ-Inflate\u2122 hand pump is specifically calibrated for inflatable anchor deployment, though it also works on pool floats, air mattresses, and your sense of accomplishment.",
      "Ergonomic handle reduces fatigue during the 47-pump inflation cycle. Built-in pressure gauge tells you when your anchor has reached 'optimal buoyancy pressure,' which is any amount of air at all.",
      "Note: Pump is sold separately from all anchor models because we believe in the freedom of choice. Also because it increases our average order value."
    ],
    image: "/sites/inflatableanchors/product-pump.png",
    category: "accessories",
    specs: [
      { label: "Type", value: "Manual hand pump" },
      { label: "Pumps to Full Inflation", value: "47 (Original model)" },
      { label: "Compatible With", value: "All Inflatable Anchors products" },
      { label: "Pressure Gauge", value: "Included (decorative)" },
      { label: "Weight", value: "12 oz" },
      { label: "Warranty", value: "Until it breaks" },
    ],
  },
  {
    slug: "repair-kit",
    name: "Patch & Pray Repair Kit",
    price: 9.99,
    priceLabel: "$9.99",
    tagline: "Vinyl patches, glue, and an instruction card that just says 'Good luck.'",
    description: [
      "Reality happens. Rocks, barnacles, overly enthusiastic seagulls \u2014 the ocean is full of things that don't respect your inflatable anchor. The Patch & Pray Repair Kit is here for when your anchor meets one of them.",
      "Includes 6 adhesive vinyl patches, a tube of marine-grade glue, a small squeegee for smoothing, and a laminated instruction card featuring our official repair guidance: 'Good luck.' We considered writing more detailed instructions, but honesty felt more appropriate.",
      "Field-tested by Reef Henderson, who has patched more anchors than anyone alive. His success rate is 'encouraging.'"
    ],
    image: "/sites/inflatableanchors/product-repair-kit.png",
    category: "accessories",
    specs: [
      { label: "Patches Included", value: "6" },
      { label: "Glue Type", value: "Marine-grade vinyl adhesive" },
      { label: "Cure Time", value: "24 hours (or 5 minutes if impatient)" },
      { label: "Success Rate", value: "Encouraging" },
      { label: "Instruction Quality", value: "Honest" },
      { label: "Reusable", value: "The squeegee is" },
    ],
  },
  {
    slug: "ballast-pouch",
    name: "Ballast Weight Pouch",
    price: 12.99,
    priceLabel: "$12.99",
    tagline: "Add sand for actual holding power. At that point, you may just want a regular anchor.",
    description: [
      "For customers who love the concept of an inflatable anchor but would also like it to, you know, work. The Ballast Weight Pouch attaches to any Inflatable Anchors Co. product and can be filled with sand, gravel, or small rocks to add genuine holding power.",
      "We'll be honest: if you fill this pouch with enough sand to actually anchor a boat, you've essentially built a regular anchor with extra steps. We respect your journey.",
      "The pouch features a waterproof zipper, reinforced stitching, and a small tag that reads 'We see what you're doing and we support you.'"
    ],
    image: "/sites/inflatableanchors/product-ballast-pouch.png",
    category: "accessories",
    specs: [
      { label: "Capacity", value: "Up to 15 lbs of fill" },
      { label: "Material", value: "Reinforced canvas/mesh" },
      { label: "Closure", value: "Waterproof zipper" },
      { label: "Fill Material", value: "Sand, gravel (not included)" },
      { label: "Irony Level", value: "High" },
      { label: "Attachment", value: "Universal clip system" },
    ],
  },
  {
    slug: "bumper-sticker",
    name: "Bumper Sticker",
    price: 4.99,
    priceLabel: "$4.99",
    tagline: '"My Other Anchor Is Also Inflatable."',
    description: [
      "Declare your allegiance to the inflatable anchor lifestyle with our signature bumper sticker. Weatherproof, UV-resistant, and guaranteed to start conversations at boat ramps, parking lots, and divorce proceedings.",
      "Measures 10\" x 3\" and features our iconic safety orange and navy blue color scheme. Adheres to trucks, boat trailers, coolers, laptops, and the rear window of your ex's car (we do not endorse this).",
      "Our best-selling product by unit volume. Also our cheapest product. We try not to think about what that means."
    ],
    image: "/sites/inflatableanchors/product-bumper-sticker.png",
    category: "accessories",
    specs: [
      { label: "Size", value: '10" x 3"' },
      { label: "Material", value: "Weatherproof vinyl" },
      { label: "UV Resistant", value: "Yes" },
      { label: "Adhesive", value: "Permanent (like our brand loyalty)" },
      { label: "Conversation Starter", value: "Guaranteed" },
      { label: "Regret Factor", value: "Low to Moderate" },
    ],
  },
  {
    slug: "rapid-deflator",
    name: "The Rapid Deflator",
    price: 7.99,
    priceLabel: "$7.99",
    tagline: "A board. With a nail. For quick, permanent anchor retrieval.",
    description: [
      "Sometimes you need your anchor out of the water fast. Really fast. The Rapid Deflator is our most straightforward product: a 6-inch wooden board with a single nail driven through the center. Press firmly against your inflated anchor. Problem solved.",
      "Developed after Captain Chuck realized that the fastest way to retrieve an inflatable anchor is to make it not inflatable anymore. The Rapid Deflator achieves full anchor deflation in approximately 0.3 seconds, which is a company record.",
      "Warning: Deflation is permanent. The Rapid Deflator is a one-way tool. We recommend pairing it with a Patch & Pray Repair Kit or, more realistically, a replacement anchor."
    ],
    image: "/sites/inflatableanchors/product-rapid-deflator.png",
    category: "accessories",
    specs: [
      { label: "Dimensions", value: '6" x 6" board' },
      { label: "Nail Count", value: "1" },
      { label: "Nail Type", value: "Standard" },
      { label: "Deflation Time", value: "0.3 seconds" },
      { label: "Reusable", value: "The board is" },
      { label: "Anchor Reusable After", value: "No" },
    ],
  },
  {
    slug: "helium-reserve",
    name: "The Helium Reserve",
    price: 89.99,
    priceLabel: "$89.99",
    tagline: "Experience anchoring in the third dimension.",
    description: [
      "Why limit your anchor to two dimensions? The Helium Reserve is our most innovative product: an inflatable anchor filled with helium instead of air. The result is an anchor that floats not on the water, but above it. Way above it.",
      "Originally developed by accident when Reef Henderson connected the wrong tank during a product demo, the Helium Reserve quickly became our most talked-about product. Customers describe the experience as 'transcendent,' 'baffling,' and 'I want my money back.'",
      "Your anchor will hover gracefully above your boat, connected by rope, serving as both a non-functional anchor and an eye-catching flag that tells everyone on the water exactly what kind of boater you are."
    ],
    image: "/sites/inflatableanchors/product-helium-reserve.png",
    category: "accessories",
    specs: [
      { label: "Weight", value: "Negative (it floats up)" },
      { label: "Fill Gas", value: "Helium" },
      { label: "Float Duration", value: "4-6 hours before descent" },
      { label: "Maximum Altitude", value: "Limited by rope length" },
      { label: "Buoyancy Rating", value: "Atmospheric" },
      { label: "Holding Power", value: "Upward" },
    ],
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getRelatedProducts(currentSlug: string, count = 3): Product[] {
  const current = getProductBySlug(currentSlug)
  if (!current) return products.slice(0, count)
  const sameCategory = products.filter(
    (p) => p.category === current.category && p.slug !== currentSlug
  )
  const otherCategory = products.filter(
    (p) => p.category !== current.category
  )
  return [...sameCategory, ...otherCategory].slice(0, count)
}

export function getProductsByCategory(category: Product["category"]): Product[] {
  return products.filter((p) => p.category === category)
}
