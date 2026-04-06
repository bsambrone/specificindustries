// src/sites/elderparty/data/products.ts

export interface Product {
  slug: string
  name: string
  price: number
  priceLabel: string
  tagline: string
  description: string[]
  image: string
  category: "apparel" | "accessories" | "print" | "bundles"
}

export const products: Product[] = [
  {
    slug: "yard-sign",
    name: '"R\'lyeh Rising" Yard Sign',
    price: 13.00,
    priceLabel: "$13.00",
    tagline: "Compliant with most HOA bylaws in most dimensions.",
    description: [
      "Standard corrugated campaign yard sign with tentacle motif border and the Elder Party's signature gold-on-navy color scheme. Features the campaign slogan 'A Return to Older Values' and the party seal.",
      "Weather resistant, UV protected, and rated for winds up to 60 mph. Also rated for 'unusual atmospheric conditions,' which our manufacturing team added to the spec sheet without further explanation.",
    ],
    image: "/sites/elderparty/product-yard-sign.png",
    category: "accessories",
  },
  {
    slug: "campaign-hat",
    name: '"Cthulhu R\'lyeh" Campaign Hat',
    price: 31.00,
    priceLabel: "$31.00",
    tagline: "One size fits most cranial configurations.",
    description: [
      "Red trucker cap with embroidered tentacle-flag logo. The classic American campaign hat, reimagined for a candidate who transcends conventional politics and, some argue, conventional physics.",
      "Adjustable snapback fits most cranial configurations. Some customers report that the hat 'fits better over time,' which we attribute to the break-in period and not to any changes in head shape.",
    ],
    image: "/sites/elderparty/product-hat.png",
    category: "apparel",
  },
  {
    slug: "lapel-pin",
    name: "Elder Party Lapel Pin",
    price: 6.66,
    priceLabel: "$6.66",
    tagline: "May feel warm to the touch.",
    description: [
      "Gold tentacle wrapped around an American star. Formal campaign wear for the politically engaged citizen who wants to signal their allegiance with understated elegance.",
      "Die-cast zinc alloy with 18K gold plating. Butterfly clutch backing. Several customers have noted that the pin is warm to the touch even in cold weather. We have not investigated this.",
    ],
    image: "/sites/elderparty/product-lapel-pin.png",
    category: "accessories",
  },
  {
    slug: "bumper-sticker",
    name: '"I Voted Elder" Bumper Sticker',
    price: 4.00,
    priceLabel: "$4.00",
    tagline: "Weather resistant. Void resistant.",
    description: [
      "Patriotic red, white, and blue with a subtle tentacle watermark visible only at certain angles — or in certain states of mind. Premium vinyl, rated for 5 years of outdoor exposure.",
      "Adhesive is permanent. This is a feature, not a limitation. Your commitment to the Elder Party should be equally permanent.",
    ],
    image: "/sites/elderparty/product-bumper-sticker.png",
    category: "accessories",
  },
  {
    slug: "canvassing-tote",
    name: "Cultist Canvassing Tote",
    price: 22.00,
    priceLabel: "$22.00",
    tagline: "Holds pamphlets, yard signs, and offerings.",
    description: [
      "Sturdy 12oz canvas tote bag with 'Ask Me About The Elder Party' printed in gold. Reinforced handles support up to 30 lbs of campaign literature, voter registration forms, and whatever else you need to carry door-to-door.",
      "Interior pocket for your phone, keys, and a small copy of the Necronomicon (pocket edition sold separately). Machine washable, though the symbols on the bottom of the bag may become more legible after washing.",
    ],
    image: "/sites/elderparty/product-tote.png",
    category: "accessories",
  },
  {
    slug: "campaign-robe",
    name: "Official Campaign Robe",
    price: 66.00,
    priceLabel: "$66.00",
    tagline: "Required attire for rallies. Machine washable.",
    description: [
      "Hooded ceremonial robe in midnight navy with gold Elder Party seal embroidered on the chest. Full-length, with deep pockets and a lined hood. The campaign's official recommendation for rally attendance, canvassing in inclement weather, and 'other party activities.'",
      "Machine washable on cold. Do not dry clean — the symbols react poorly to chemical solvents. Do not iron the seal directly. Several customers have reported that the robe 'feels like it was always theirs,' which we consider excellent product-market fit.",
    ],
    image: "/sites/elderparty/product-robe.png",
    category: "apparel",
  },
  {
    slug: "pocket-constitution",
    name: "The Necronomicon Pocket Constitution",
    price: 8.00,
    priceLabel: "$8.00",
    tagline: "Some pages appear blank until moonlight.",
    description: [
      "Every patriot carries a pocket Constitution. Ours has additional amendments. Leather-bound, gilt-edged, and containing the full text of the United States Constitution alongside supplementary articles that the Elder Party considers 'overdue additions to the national charter.'",
      "Printed on acid-free paper that is, according to our printer, 'behaving unusually.' Some pages appear blank under artificial light but become legible in moonlight. This is a design choice and not a manufacturing defect.",
    ],
    image: "/sites/elderparty/product-constitution.png",
    category: "print",
  },
  {
    slug: "coffee-mug",
    name: '"Ph\'nglui Mglw\'nafh" Coffee Mug',
    price: 16.00,
    priceLabel: "$16.00",
    tagline: "Dishwasher safe. Sanity not guaranteed.",
    description: [
      "Start your morning right by reciting the pledge. Full R'lyehian text on one side, English 'translation' on the other. 12oz ceramic, microwave and dishwasher safe.",
      "The English side reads: 'In his house at R'lyeh, dead Cthulhu waits dreaming.' The R'lyehian side reads the same thing, but saying it aloud reportedly 'makes the coffee taste different.' We have not verified this claim, but we have not denied it either.",
    ],
    image: "/sites/elderparty/product-mug.png",
    category: "accessories",
  },
  {
    slug: "party-flag",
    name: "Elder Party Flag (3x5)",
    price: 40.00,
    priceLabel: "$40.00",
    tagline: "Flies well in coastal winds and dimensional crosscurrents.",
    description: [
      "3x5 foot flag with the Elder Party seal on a navy field, bordered by American flag-inspired stripes in gold and crimson. Brass grommets, double-stitched edges, and fade-resistant dye.",
      "Flies well in coastal winds and what our testing team described as 'winds from directions that don't correspond to compass points.' Recommended for porches, flagpoles, and any location where you want your neighbors to know where you stand — and where you'll stand when the time comes.",
    ],
    image: "/sites/elderparty/product-flag.png",
    category: "accessories",
  },
  {
    slug: "founders-bundle",
    name: "Founding Donors Bundle",
    price: 166.00,
    priceLabel: "$166.00",
    tagline: "Note may arrive before you order.",
    description: [
      "The complete Elder Party supporter package: campaign hat, official robe, lapel pin, party flag, pocket constitution, and a handwritten thank-you note from Campaign Chairman Nyarlathotep Marsh.",
      "The thank-you note is personalized with your name and a brief message that several recipients have described as 'disturbingly specific about details I haven't shared with anyone.' Chairman Marsh attributes this to 'thorough donor research.' The note may arrive before your order — this is not a shipping error.",
    ],
    image: "/sites/elderparty/product-founders-bundle.png",
    category: "bundles",
  },
]

export const quips = [
  "The call has been heard.",
  "Welcome to the awakening.",
  "Your commitment has been noted. Permanently.",
  "The campaign thanks you. It has always thanked you.",
  "Added to cart. Added to the roster.",
  "Bold choice. The right choice. The only choice.",
  "Your order will arrive exactly when it's supposed to.",
  "The Party remembers its supporters.",
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
