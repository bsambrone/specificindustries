export interface Product {
  slug: string
  name: string
  price: number
  priceLabel: string
  tagline: string
  description: string[]
  image: string
  scienceFacts: Array<{ label: string; value: string }>
  isSubscription?: boolean
}

export const products: Product[] = [
  {
    slug: "nasalfuel-original",
    name: "NasalFuel Original",
    price: 29.99,
    priceLabel: "$29.99 / month",
    tagline: "Complete nutrition. Zero chewing.",
    description: [
      "NasalFuel Original is the product that started the intranasal nutrition revolution. A complete meal replacement powder engineered for direct nasal delivery, bypassing the entire digestive system like the evolutionary bottleneck it is.",
      "Each dose contains 100% of your daily recommended nutrients, atomized to a precise 0.3 micron particle size for maximum mucosal absorption. Our patented NasalAbsorb™ technology ensures nutrients enter your bloodstream 340% faster than primitive oral consumption.",
      "Simply measure, prepare, and insufflate. Within seconds, you'll feel the unmistakable sensation of complete nutrition entering your body through a hole that was never designed for this purpose. That tingling means it's working.",
    ],
    image: "/sites/snortables/product-nasalfuel-original.png",
    scienceFacts: [
      { label: "Particle Size", value: "0.3 microns" },
      { label: "Nostril Compatibility", value: "Universal" },
      { label: "Absorption Rate", value: "340% faster than eating" },
      { label: "Chewing Required", value: "0%" },
      { label: "FDA Status", value: "Unanswered emails" },
      { label: "Asbestos Content", value: "Negligible" },
    ],
    isSubscription: true,
  },
  {
    slug: "the-full-bird",
    name: "The Full Bird",
    price: 44.99,
    priceLabel: "$44.99",
    tagline: "Lyophilized avian protein substrate for rapid intranasal uptake.",
    description: [
      "Our newest product leverages controlled intranasal insufflation of a lyophilized avian protein substrate, enabling rapid nutrient uptake via pulmonary gas-exchange interface. In simpler terms: it's snortable turkey.",
      "Each packet contains one full Thanksgiving turkey — bones, stuffing, cranberry sauce, and that weird gelatin thing your aunt brings — freeze-dried and pulverized into a fine powder optimized for nasal delivery. We destroyed a perfectly good dinner so you don't have to eat it.",
      "The Full Bird delivers the complete Thanksgiving experience in under 3 seconds. Side effects may include nostalgic sneezing, involuntary gratitude, and a faint gravy smell that lingers for up to 72 hours.",
    ],
    image: "/sites/snortables/product-the-full-bird.png",
    scienceFacts: [
      { label: "Turkey Content", value: "1 full bird" },
      { label: "Stuffing", value: "Included (pulverized)" },
      { label: "Cranberry Sauce", value: "Atomized" },
      { label: "Gravy Aroma Duration", value: "72 hours" },
      { label: "Tryptophan Delivery", value: "Instant drowsiness" },
      { label: "Family Argument", value: "Not included" },
    ],
  },
  {
    slug: "sunday-roast",
    name: "Sunday Roast",
    price: 49.99,
    priceLabel: "$49.99",
    tagline: "An entire roast beef dinner, pulverized for your convenience.",
    description: [
      "Sunday Roast is a complete roast beef dinner — prime rib, Yorkshire pudding, roasted potatoes, gravy, green beans, and a dinner roll — reduced to a fine inhalable powder through our proprietary NasalMill™ process.",
      "Each batch begins with a restaurant-quality meal prepared by actual chefs who have no idea what we're about to do to their work. The look on their faces when the wood chipper arrives is something we've learned to live with.",
      "Perfect for busy professionals who value nutrition but refuse to allocate jaw movement time in their productivity stack. One insufflation delivers the caloric equivalent of a full Sunday dinner. The gravy boat is optional but we include it for texture.",
    ],
    image: "/sites/snortables/product-sunday-roast.png",
    scienceFacts: [
      { label: "Courses Included", value: "5 (pulverized)" },
      { label: "Gravy Boat Fragments", value: "Trace amounts" },
      { label: "Chef Approval", value: "Revoked" },
      { label: "Yorkshire Pudding Status", value: "Powdered" },
      { label: "Particle Size", value: "0.3 microns" },
      { label: "Dignity", value: "Not included" },
    ],
  },
  {
    slug: "hydrosnort",
    name: "HydroSnort",
    price: 14.99,
    priceLabel: "$14.99",
    tagline: "Like getting water up your nose at the pool, but optimized.",
    description: [
      "HydroSnort is the world's first nasally-delivered hydration solution. We took the universally unpleasant experience of getting water up your nose and repackaged it as a wellness product. You're welcome.",
      "Enhanced with electrolytes, minerals, and what our lab technicians describe as 'a concerning amount of sodium,' HydroSnort delivers hydration directly to your nasal mucosa. Your body absorbs it immediately, mostly because it has no choice.",
      "Why drink eight glasses of water a day when you can snort eight carefully measured doses? HydroSnort: because your nose was just sitting there doing nothing productive anyway.",
    ],
    image: "/sites/snortables/product-hydrosnort.png",
    scienceFacts: [
      { label: "Hydration Efficiency", value: "Pool-adjacent" },
      { label: "Electrolytes", value: "Aggressive amounts" },
      { label: "Drowning Risk", value: "Technically non-zero" },
      { label: "Pool Flashbacks", value: "Common side effect" },
      { label: "Water Content", value: "Dehydrated (ironic)" },
      { label: "Lifeguard Approved", value: "Absolutely not" },
    ],
  },
  {
    slug: "greenrush",
    name: "GreenRush",
    price: 34.99,
    priceLabel: "$34.99",
    tagline: "Your daily vegetables, bypassing the digestive middleman.",
    description: [
      "GreenRush combines kale, spinach, wheatgrass, spirulina, and chlorella into a vibrant green powder specifically calibrated for nasal delivery. It's everything your body needs and everything your nose didn't ask for.",
      "Each dose delivers 12 servings of vegetables directly to your bloodstream, completely bypassing the digestive system — or as we call it, 'the middleman.' Why process nutrients through 30 feet of intestine when you have two perfectly good nostrils?",
      "Warning: GreenRush may cause temporary green-tinted nasal discharge. This is normal and actually quite beautiful in the right light. Our users report that their sinuses have never been more nutrient-dense.",
    ],
    image: "/sites/snortables/product-greenrush.png",
    scienceFacts: [
      { label: "Vegetable Servings", value: "12 per dose" },
      { label: "Kale Content", value: "Punitive" },
      { label: "Sinus Color Change", value: "Expected (green)" },
      { label: "Intestine Usage", value: "0%" },
      { label: "Smugness Increase", value: "400%" },
      { label: "Flavor", value: "Irrelevant (nasal delivery)" },
    ],
  },
  {
    slug: "morningrail",
    name: "MorningRail",
    price: 24.99,
    priceLabel: "$24.99",
    tagline: "Why wait for absorption through your primitive stomach?",
    description: [
      "MorningRail is 200mg of pure caffeine in a precision-ground nasal powder. It hits your bloodstream in under 8 seconds — roughly 47 minutes faster than your pour-over setup, and without the insufferable ritual.",
      "Developed for productivity maximizers who view coffee brewing as an unacceptable bottleneck in their morning routine. Each packet replaces approximately 2.5 cups of coffee, one alarm clock, and all remaining social norms around breakfast.",
      "MorningRail users report a 94% reduction in time spent in kitchens, a 300% increase in morning alertness, and a 100% increase in coworkers asking 'are you okay?' The answer is yes. You've never been more okay.",
    ],
    image: "/sites/snortables/product-morningrail.png",
    scienceFacts: [
      { label: "Caffeine", value: "200mg (immediate)" },
      { label: "Onset Time", value: "8 seconds" },
      { label: "Coffee Rituals Eliminated", value: "All of them" },
      { label: "Eye Twitching", value: "Character-building" },
      { label: "Social Acceptability", value: "Declining" },
      { label: "Productivity Gain", value: "Yes (legally required disclaimer: no)" },
    ],
  },
  {
    slug: "jolt",
    name: "JOLT",
    price: 39.99,
    priceLabel: "$39.99",
    tagline: "Definitely not derived from coca leaves. We cannot stress this enough.",
    description: [
      "JOLT is our premium energy formula. Let us be very, very clear: it is not derived from coca leaves. It has never been near coca leaves. We don't even know what coca leaves look like. If you showed us a coca leaf, we would not recognize it. This is important.",
      "What JOLT IS made from is a proprietary blend of B-vitamins, taurine, ginseng, and an ingredient our lab calls 'compound X' because they lost the original label. It delivers an immediate, sustained energy boost that users describe as 'extremely noticeable' and 'why is my heart doing that.'",
      "JOLT is the preferred energy solution for professionals who need to be extremely alert for extended periods. It is 100% legal in most jurisdictions. We checked. Several times. With different lawyers.",
    ],
    image: "/sites/snortables/product-jolt.png",
    scienceFacts: [
      { label: "Coca Leaf Content", value: "ABSOLUTELY ZERO" },
      { label: "Energy Duration", value: "4-6 hours (or days)" },
      { label: "Heart Rate Increase", value: "Noticeable" },
      { label: "Legal Status", value: "We have checked repeatedly" },
      { label: "Compound X", value: "Classified" },
      { label: "Lawyers Consulted", value: "14" },
    ],
  },
  {
    slug: "brotein",
    name: "BroTein",
    price: 34.99,
    priceLabel: "$34.99",
    tagline: "Skip the shake. Skip the stomach. Skip leg day too, we're not your mom.",
    description: [
      "BroTein delivers 50g of whey protein isolate directly to your bloodstream via nasal insufflation. No shaker bottle. No chalky aftertaste. No 45-minute digestive window before your workout. Just pure, instantaneous gains.",
      "Engineered for athletes who have optimized every other aspect of their routine and are now looking at their nose thinking 'what if?' BroTein bypasses the digestive system entirely, delivering amino acids to your muscles in under 30 seconds.",
      "Each packet is formulated for pre-workout, post-workout, mid-workout, and — for our most dedicated users — during-meeting consumption. The discreet matte-black packaging ensures no one at the office will ask questions. They will have questions, but they won't ask them.",
    ],
    image: "/sites/snortables/product-brotein.png",
    scienceFacts: [
      { label: "Protein", value: "50g (instant delivery)" },
      { label: "Gains", value: "Immediate" },
      { label: "Shaker Bottle Required", value: "Never again" },
      { label: "Gym Bro Approval", value: "Enthusiastic" },
      { label: "Leg Day Compliance", value: "Not our department" },
      { label: "Nasal Swoleness", value: "Possible" },
    ],
  },
  {
    slug: "tiny-nostrils",
    name: "Tiny Nostrils",
    price: 19.99,
    priceLabel: "$19.99",
    tagline: "Children's vitamins. Now with less asbestos than our competitors!",
    description: [
      "Tiny Nostrils is our pediatric vitamin line, specially formulated for smaller nasal passages. Each dose contains Vitamins A through K, iron, zinc, and what we're calling 'the fun stuff' (calcium, mostly, but also some glitter).",
      "We know what you're thinking: 'Should children be snorting vitamin powder?' And the answer is: we're not doctors. But we ARE optimists, and we believe that if adults can enjoy intranasal nutrient delivery, why should kids miss out? Now with less asbestos than our competitors use!",
      "Tiny Nostrils comes in three exciting flavors: Strawberry Sneeze, Grape Gust, and Orange You Glad You Didn't Eat This. Each packet includes a fun sticker and a child-sized Precision Delivery Apparatus.",
    ],
    image: "/sites/snortables/product-tiny-nostrils.png",
    scienceFacts: [
      { label: "Vitamins", value: "A through K (we skipped a few)" },
      { label: "Asbestos", value: "Less than competitors!" },
      { label: "Glitter Content", value: "Non-zero" },
      { label: "Pediatrician Approval", value: "Pending (since 2024)" },
      { label: "Fun Sticker", value: "Included" },
      { label: "Parenting Judgment", value: "Not our place" },
    ],
  },
  {
    slug: "creme-brulee-blast",
    name: "Crème Brûlée Blast",
    price: 27.99,
    priceLabel: "$27.99",
    tagline: "Dessert for your sinuses. Pairs with a 2019 Bordeaux, also available in snortable form.",
    description: [
      "Crème Brûlée Blast is the world's first nasally-delivered dessert experience. We took a classic French custard, caramelized the sugar, freeze-dried the entire thing, and pulverized it into a fine powder suitable for intranasal consumption. The French have not responded to our letters.",
      "Each dose delivers the complete crème brûlée experience: the rich vanilla custard, the crackling caramel top, and the faint sense of culinary superiority. The caramelized sugar particles may cause minor sinus irritation, which our users describe as 'the crackle.'",
      "Pairs beautifully with a 2019 Bordeaux (also available in snortable form, coming Q3 2027). Serve after dinner, or instead of dinner, or alone in your car at 2 AM. We don't judge. We pulverize desserts for a living.",
    ],
    image: "/sites/snortables/product-creme-brulee-blast.png",
    scienceFacts: [
      { label: "Custard Quality", value: "French (they deny this)" },
      { label: "Caramel Crackle", value: "Audible in sinuses" },
      { label: "Sugar Content", value: "Dessert-appropriate" },
      { label: "Wine Pairing", value: "2019 Bordeaux (snortable)" },
      { label: "French Approval", value: "Letters unreturned" },
      { label: "Emotional Eating", value: "Emotional snorting, technically" },
    ],
  },
  {
    slug: "the-sampler",
    name: "The Sampler Pack",
    price: 59.99,
    priceLabel: "$59.99",
    tagline: "12 varieties + a complimentary Precision Delivery Apparatus.",
    description: [
      "The Sampler Pack includes trial-size portions of all 12 Snortables products, packaged in a sleek matte-black case with individual compartments for each variety. It's the perfect way to discover which powdered meal you enjoy snorting most.",
      "Also included: a complimentary Precision Delivery Apparatus (a small mirror and a stainless steel straw) in a velvet-lined carrying case. We considered calling it something else but our branding team said 'just lean into it.'",
      "The Sampler Pack makes an excellent gift for the person who has everything except a reasonable relationship with food. Ships in discreet packaging that says 'Definitely Just Vitamins' on the exterior.",
    ],
    image: "/sites/snortables/product-the-sampler.png",
    scienceFacts: [
      { label: "Varieties Included", value: "12" },
      { label: "Mirror", value: "Complimentary" },
      { label: "Stainless Steel Straw", value: "Complimentary" },
      { label: "Velvet Case", value: "Yes, velvet" },
      { label: "Discreet Packaging", value: "\"Definitely Just Vitamins\"" },
      { label: "Gift Potential", value: "Friendship-ending" },
    ],
  },
  {
    slug: "nasalfuel-prime",
    name: "NasalFuel Prime",
    price: 79.99,
    priceLabel: "$79.99 / month",
    tagline: "Monthly auto-delivery with escalating dosage recommendations.",
    description: [
      "NasalFuel Prime is our premium subscription tier. Every month, you receive a curated selection of Snortables products delivered to your door in a matte-black box that your neighbors will definitely have opinions about.",
      "What sets Prime apart is our Escalating Dosage Protocol™. Each month, we increase your recommended daily intake by 15% based on our proprietary algorithm that factors in your usage patterns, moon phases, and a random number generator we found online.",
      "Prime members also receive exclusive access to experimental products before public release, a quarterly 'State of Your Nostrils' report (generated by AI, reviewed by no one), and priority customer support via our encrypted messaging channel (it's just WhatsApp).",
    ],
    image: "/sites/snortables/product-nasalfuel-prime.png",
    scienceFacts: [
      { label: "Monthly Dosage Increase", value: "15% (compounding)" },
      { label: "Subscription", value: "Difficult to cancel" },
      { label: "Nostril Report", value: "AI-generated, unreviewed" },
      { label: "Experimental Products", value: "Early access (untested)" },
      { label: "Support Channel", value: "WhatsApp (\"encrypted\")" },
      { label: "Moon Phase Factor", value: "Waxing gibbous optimal" },
    ],
    isSubscription: true,
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getRelatedProducts(slug: string, count = 3): Product[] {
  const filtered = products.filter((p) => p.slug !== slug)
  // Deterministic selection based on slug hash to avoid hydration mismatch
  const index = slug.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0)
  const start = index % filtered.length
  const result: Product[] = []
  for (let i = 0; i < count && i < filtered.length; i++) {
    result.push(filtered[(start + i) % filtered.length])
  }
  return result
}
