export interface Product {
  slug: string
  name: string
  price: number
  priceLabel: string
  tagline: string
  description: string[]
  image: string
  nutritionalFacts: Array<{ label: string; value: string }>
}

export const products: Product[] = [
  {
    slug: "classic-pig-milk",
    name: "Classic Pig Milk",
    price: 12.99,
    priceLabel: "$12.99 / gallon",
    tagline: "The one that started it all.",
    description: [
      "Classic Pig Milk is where it all began. One confused farmer, one cooperative pig, and a bucket that would change the dairy industry forever. Or at least confuse it.",
      "Our flagship product delivers the pure, unfiltered taste of pig milk the way nature intended — assuming nature intended this at all. Each gallon is collected by hand from free-range pigs who have given their somewhat reluctant consent.",
      "Pairs well with cereal, coffee, existential doubt, and the lingering question of 'why am I drinking this?' Best served cold. Best consumed alone, where no one can judge you.",
    ],
    image: "/sites/pigmilk/product-classic.png",
    nutritionalFacts: [
      { label: "Calories", value: "Probably some" },
      { label: "Pig Energy", value: "100% DV" },
      { label: "Courage", value: "140%" },
      { label: "Calcium", value: "Yes" },
      { label: "Existential Doubt", value: "3g" },
      { label: "Regret", value: "0g (results may vary)" },
    ],
  },
  {
    slug: "chocolate-pig-milk",
    name: "Chocolate Pig Milk",
    price: 14.99,
    priceLabel: "$14.99 / gallon",
    tagline: "We added chocolate. You're welcome.",
    description: [
      "We took something no one asked for and added chocolate to it. The result? Something no one asked for, but in chocolate. You're welcome.",
      "Our premium chocolate blend uses ethically sourced cocoa beans mixed with our signature pig milk. The pigs were not consulted about this decision, and frankly, they seem indifferent.",
      "Perfect for anyone who thought regular pig milk wasn't adventurous enough. Serve in a tall glass and pretend it's normal. We do.",
    ],
    image: "/sites/pigmilk/product-chocolate.png",
    nutritionalFacts: [
      { label: "Calories", value: "More than classic" },
      { label: "Chocolate", value: "Real" },
      { label: "Pig Energy", value: "100% DV" },
      { label: "Sugar", value: "A responsible amount" },
      { label: "Joy", value: "Fleeting" },
      { label: "Regret", value: "1g" },
    ],
  },
  {
    slug: "strawberry-pig-milk",
    name: "Strawberry Pig Milk",
    price: 14.99,
    priceLabel: "$14.99 / gallon",
    tagline: "Pink milk from pink animals. Coincidence?",
    description: [
      "Our strawberry pig milk is pink. Pigs are pink. We're not saying there's a connection, but we're also not not saying that. Draw your own conclusions.",
      "Made with real strawberries and real pig milk, which is already more real than most strawberry milks can claim. The pigs seem to enjoy the strawberries, though they enjoy most things.",
      "Best served in a wine glass at a dinner party where you want to start a conversation. Or end one.",
    ],
    image: "/sites/pigmilk/product-strawberry.png",
    nutritionalFacts: [
      { label: "Calories", value: "Pink amount" },
      { label: "Real Strawberries", value: "At least 2" },
      { label: "Pig Energy", value: "100% DV" },
      { label: "Color", value: "Suspiciously pink" },
      { label: "Vibes", value: "Immaculate" },
      { label: "Questions Asked", value: "0 (recommended)" },
    ],
  },
  {
    slug: "pig-milk-cheese",
    name: "Pig Milk Cheese",
    price: 24.99,
    priceLabel: "$24.99 / wheel",
    tagline: "Aged 6 months. We aged it, not the pig.",
    description: [
      "Our artisanal pig milk cheese is aged for exactly six months in our climate-controlled cheese cave, which is actually just a room in the barn that stays kind of cool.",
      "The flavor profile has been described as 'bold,' 'unexpected,' and 'wait, this is from a pig?' by our panel of cheese experts (Earl and his neighbor Dave).",
      "Each wheel is hand-pressed and stamped with our signature pig hoof logo. Pairs well with crackers, wine, and a willingness to try new things.",
    ],
    image: "/sites/pigmilk/product-cheese.png",
    nutritionalFacts: [
      { label: "Aged", value: "6 months" },
      { label: "Artisanal", value: "Technically" },
      { label: "Pig Energy", value: "Concentrated" },
      { label: "Flavor Profile", value: "Brave" },
      { label: "Pairs With", value: "An open mind" },
      { label: "Awards", value: "Pending" },
    ],
  },
  {
    slug: "pig-milk-yogurt",
    name: "Pig Milk Yogurt",
    price: 8.99,
    priceLabel: "$8.99 / tub",
    tagline: "Cultures so active they have hobbies.",
    description: [
      "Our pig milk yogurt contains live active cultures. How active? They run a book club. They're currently reading something by Kafka, which feels appropriate.",
      "Thick, creamy, and made from 100% pig milk. We add nothing artificial — just milk, cultures, and the quiet determination of a company that refuses to admit this might be a bad idea.",
      "Top with granola, fruit, or honey. Or eat it straight from the tub at 2 AM. We don't judge. The pigs might, but we don't.",
    ],
    image: "/sites/pigmilk/product-yogurt.png",
    nutritionalFacts: [
      { label: "Live Cultures", value: "Very alive" },
      { label: "Protein", value: "Some" },
      { label: "Pig Energy", value: "100% DV" },
      { label: "Probiotic", value: "Pro-something" },
      { label: "Serving Suggestion", value: "Alone, ideally" },
      { label: "Shelf Life", value: "Optimistic" },
    ],
  },
  {
    slug: "pig-milk-ice-cream",
    name: "Pig Milk Ice Cream",
    price: 11.99,
    priceLabel: "$11.99 / pint",
    tagline: "Guilt-free.* (*Guilt not included)",
    description: [
      "Our pig milk ice cream is made in small batches by people who have made peace with their life choices. Each pint is churned slowly, lovingly, and with only minor hesitation.",
      "Available in one flavor: Original. We tried to make others, but the pigs were firm. 'One flavor,' they seemed to say, through their eyes. We respected their creative vision.",
      "The asterisk on 'guilt-free' is doing a lot of heavy lifting here. Consult your conscience before consuming.",
    ],
    image: "/sites/pigmilk/product-ice-cream.png",
    nutritionalFacts: [
      { label: "Flavor", value: "Original (only)" },
      { label: "Guilt", value: "*Not included" },
      { label: "Pig Energy", value: "Frozen" },
      { label: "Serving Size", value: "The whole pint, be honest" },
      { label: "Happiness", value: "Temporary" },
      { label: "Brain Freeze Risk", value: "Standard" },
    ],
  },
  {
    slug: "pig-milk-protein",
    name: "Pig Milk Protein Powder",
    price: 39.99,
    priceLabel: "$39.99 / bag",
    tagline: "Gainz. Oinks. Results.",
    description: [
      "PIG WHEY\u2122 is our premium protein powder made from concentrated pig milk whey. Each serving delivers protein and the raw, untamed energy of a pig that just woke up from a nap.",
      "Designed for athletes, bodybuilders, and anyone who wants to explain their protein source at the gym. Mix with water, regular milk, or \u2014 for the truly committed \u2014 more pig milk.",
      "Our proprietary OinkFormula\u2122 is backed by zero peer-reviewed studies but several very enthusiastic testimonials from Earl, who has been taking it daily and says he 'feels different.'",
    ],
    image: "/sites/pigmilk/product-protein.png",
    nutritionalFacts: [
      { label: "Protein", value: "A lot (trust us)" },
      { label: "BCAAs", value: "Probably" },
      { label: "Pig Energy", value: "300% DV" },
      { label: "Peer-Reviewed Studies", value: "0" },
      { label: "Gym Conversations Started", value: "Every time" },
      { label: "Flavor", value: "Pig" },
    ],
  },
  {
    slug: "industrial-drum",
    name: "Industrial Drum (55 gal)",
    price: 449.99,
    priceLabel: "$449.99",
    tagline: "For when a gallon just isn't a lifestyle commitment.",
    description: [
      "Fifty-five gallons of pig milk, delivered in a genuine blue industrial drum. This is not a product for the casual consumer. This is a product for someone who has made a decision and is not looking back.",
      "Originally developed for our commercial clients (we have none), the Industrial Drum is now available to individuals who meet our rigorous qualification criteria: a valid email address and a shipping address that can receive a pallet.",
      "The drum is non-returnable. We physically cannot take it back. The forklift guy only works Tuesdays and he's expressed reservations about the whole operation.",
    ],
    image: "/sites/pigmilk/product-drum.png",
    nutritionalFacts: [
      { label: "Volume", value: "55 gallons" },
      { label: "Weight", value: "You don't want to know" },
      { label: "Pig Energy", value: "Industrial" },
      { label: "Shelf Life", value: "Pray" },
      { label: "Requires Forklift", value: "Yes" },
      { label: "Returnable", value: "Absolutely not" },
    ],
  },
  {
    slug: "rabid-froth",
    name: "Rabid Froth Pint",
    price: 6.66,
    priceLabel: "$6.66 / pint",
    tagline: "From our most enthusiastic pig. Extra frothy. Waiver required.",
    description: [
      "The Rabid Froth Pint comes exclusively from Sir Oinks-a-Lot, our most... spirited pig. Sir Oinks produces milk with a natural effervescence that our scientists have described as 'unusual,' 'aggressive,' and 'please stop making us test this.'",
      "Each pint is poured fresh and bubbling, with a head of froth that rivals any craft beer. The froth is natural. We think. We've stopped asking questions about Sir Oinks and his processes.",
      "A signed liability waiver is required at checkout. This is not a joke. Well, the website is a joke. But the waiver is real. Sir Oinks is a lot.",
    ],
    image: "/sites/pigmilk/product-rabid-froth.png",
    nutritionalFacts: [
      { label: "Froth Level", value: "Extreme" },
      { label: "Source", value: "Sir Oinks-a-Lot" },
      { label: "Pig Energy", value: "UNCONTAINABLE" },
      { label: "Waiver Required", value: "Yes" },
      { label: "Recommended By Doctors", value: "No" },
      { label: "Chaos Energy", value: "100% DV" },
    ],
  },
  {
    slug: "whole-hog-bundle",
    name: "The Whole Hog Bundle",
    price: 89.99,
    priceLabel: "$89.99",
    tagline: "One of everything. No regrets. Some questions.",
    description: [
      "The Whole Hog Bundle includes one of every product in our core lineup: Classic, Chocolate, Strawberry, Cheese, Yogurt, Ice Cream, and Protein Powder. It does NOT include the Industrial Drum or the Rabid Froth Pint, because we have some sense of responsibility.",
      "This bundle makes the perfect gift for someone you love, someone you're trying to confuse, or yourself during a moment of ambitious optimism.",
      "Each bundle ships in a pink gift box with our signature tissue paper and a handwritten note from Earl that says 'Thank you for believing in pig milk.' He writes every one by hand. It takes him a while.",
    ],
    image: "/sites/pigmilk/product-bundle.png",
    nutritionalFacts: [
      { label: "Products Included", value: "7" },
      { label: "Industrial Drum", value: "NOT included" },
      { label: "Rabid Froth", value: "NOT included" },
      { label: "Pig Energy", value: "Variety pack" },
      { label: "Gift Potential", value: "High (chaotic)" },
      { label: "Handwritten Note", value: "From Earl himself" },
    ],
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getRelatedProducts(slug: string, count = 3): Product[] {
  const filtered = products.filter((p) => p.slug !== slug)
  // Shuffle and take `count`
  const shuffled = [...filtered].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}
