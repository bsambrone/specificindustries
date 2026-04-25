export interface ProductTestimonial {
  quote: string
  name: string
  age?: number
  city: string
}

export interface Product {
  slug: string
  itemNumber: number
  stockNumber: string
  name: string
  tagline: string
  price: number
  priceLabel: string
  badge?: "NEW!" | "BESTSELLER!" | "SALE!"
  description: string[]
  image: string
  whatsInBox: string[]
  safetyNote: string
  testimonial: ProductTestimonial
}

export const products: Product[] = [
  // === ITEM №1 ===
  {
    slug: "glitter-claymore",
    itemNumber: 1,
    stockNumber: "BF-101",
    name: "The Original Glitter Claymore",
    tagline: "The mine that shoots glitter! (Just add blasting cap.)",
    price: 19.95,
    priceLabel: "$19.95",
    badge: "BESTSELLER!",
    description: [
      "The American backyard has changed a great deal since 1961, but one product has remained at the very top of every young demolitionist's wish list: the Original Boom-Fun! Glitter Claymore. Shaped just like a real directional mine, loaded with a full two ounces of our proprietary holiday-grade rainbow glitter, and triggered by a single Boom-Fun! blasting cap (sold separately, but included in every starter kit), the Glitter Claymore is the centerpiece of any outdoor celebration.",
      "Place the unit on its sturdy folding legs, angle the business face toward the yard you wish to decorate, insert a single blasting cap into the top receiver, and retire to a safe distance of no less than fifteen feet. When triggered, the Glitter Claymore disperses its sparkling payload in a wide, festive cone — ideal for birthdays, bar mitzvahs, and unsupervised afternoons.",
      "Every Glitter Claymore is inspected, tested, and personally approved by Sparky himself. Handle the blasting cap gently. The blasting cap does not like to be squeezed.",
    ],
    image: "/sites/boomfun/products/glitter-claymore.png",
    whatsInBox: [
      "One (1) Glitter Claymore unit, pre-loaded",
      "Two (2) Boom-Fun! Blasting Caps — Handle Gently!",
      "One (1) folding leg assembly",
      "One (1) illustrated setup guide (approved by Sparky)",
      "Three (3) replacement glitter cartridges (assorted colors)",
    ],
    safetyNote: "Never squeeze the blasting cap. The blasting cap does not want to be squeezed. After placement, retire to a safe distance of fifteen feet and count your fingers. Then trigger. Then count your fingers again. The numbers should match.",
    testimonial: {
      quote: "Our Jeffrey's eighth birthday party was the best one on our whole street. Even Mrs. Henderson came over to see what the fuss was about.",
      name: "Mrs. Eleanor Whittaker",
      city: "Dayton, OH",
    },
  },

  // === ITEM №2 ===
  {
    slug: "dynamite-fishing-kit",
    itemNumber: 2,
    stockNumber: "BF-204",
    name: "Junior Dynamite Fishing Kit",
    tagline: "Catch fish the easy way! American ingenuity meets the great outdoors.",
    price: 14.95,
    priceLabel: "$14.95",
    description: [
      "Friend, if your young man has ever come home from the pond empty-handed, the Junior Dynamite Fishing Kit is about to change his relationship with the American outdoors forever. Our compact waxed-cardboard kit includes four quarter-stick Boom-Fun! Youth Charges, a generous coil of water-resistant fuse, two Boom-Fun! blasting caps, and a sturdy canvas creel for hauling the catch home.",
      "To use: light the fuse (from the long end, per Sparky's Second Rule), toss the prepared charge into the center of the pond, and watch as dinner comes directly to the surface. No rod. No reel. No waiting. Our testing department reports yields of eleven to fourteen bass per charge, depending on pond depth and the quality of your follow-through.",
      "A wonderful way to introduce a boy to fishing. A better way to introduce a boy to supper. The Junior Dynamite Fishing Kit is street-legal in most of Ohio and much of rural Pennsylvania.",
    ],
    image: "/sites/boomfun/products/dynamite-fishing-kit.png",
    whatsInBox: [
      "Four (4) Boom-Fun! Youth Charges (quarter-stick)",
      "Two (2) Boom-Fun! Blasting Caps — Handle Gently!",
      "One (1) coil water-resistant fuse (twelve feet)",
      "One (1) canvas creel",
      "One (1) pocket-sized illustrated field manual",
    ],
    safetyNote: "Always light the fuse from the long end. The long end is the end far from the thing that goes kaboom. Never retain a lit charge in the hand. If the fuse has sputtered, wait thirty minutes before approaching. Ask an adult first. Any adult will do. The mailman is an adult.",
    testimonial: {
      quote: "I got fourteen bass and two catfish in one throw. Dad said I could keep them all.",
      name: "Timmy Whitfield",
      age: 9,
      city: "Akron, OH",
    },
  },

  // === ITEM №3 ===
  {
    slug: "mailbox-firecracker",
    itemNumber: 3,
    stockNumber: "BF-318",
    name: "The Friendly Mailbox Greeting Firecracker",
    tagline: "A whimsical greeting for the mailman!",
    price: 4.95,
    priceLabel: "$4.95",
    description: [
      "Nothing expresses warm neighborly appreciation quite like the Friendly Mailbox Greeting Firecracker. Each unit is pre-packaged in a bright Boom-Fun! envelope and sized to fit snugly inside any standard American rural or curbside mailbox. When the mailbox door is opened — by the postman, by a visiting aunt, by the in-laws arriving for Thanksgiving — the Greeting Firecracker releases a modest, cheerful report and a small puff of festive confetti.",
      "The perfect way to say 'welcome to our home' without a greeting card. Fits all standard mailboxes and most rural oversize boxes. The Greeting Firecracker is not considered mail tampering by any federal statute that we are aware of. Our legal department declines to confirm this further.",
      "Each Greeting Firecracker is inspected by Sparky himself. Every one works every time. That is a Boom-Fun! guarantee.",
    ],
    image: "/sites/boomfun/products/mailbox-firecracker.png",
    whatsInBox: [
      "One (1) Friendly Mailbox Greeting Firecracker, pre-loaded",
      "One (1) adhesive mounting tab",
      "One (1) small paper confetti refill sachet",
      "One (1) welcome card reading 'A GREETING FROM THE HOUSEHOLD!'",
    ],
    safetyNote: "Install only in mailboxes you own or have been given explicit permission to install within. The Greeting Firecracker releases a modest report; ear protection is not required but is considered neighborly to offer. Warn the postman's supervisor, not the postman. The surprise is the point.",
    testimonial: {
      quote: "Dan's mailman has never been the same, and honestly, the service has gotten noticeably faster.",
      name: "Mr. & Mrs. Hofstra",
      city: "Toledo, OH",
    },
  },

  // === ITEM №4 ===
  {
    slug: "tree-stump-remover",
    itemNumber: 4,
    stockNumber: "BF-422",
    name: "Young Landscaper's Tree-Stump Remover",
    tagline: "For the young man with ambition and a backyard.",
    price: 24.95,
    priceLabel: "$24.95",
    description: [
      "Every American backyard has one — the old stump. The one Dad never got around to digging out. The one the riding mower keeps catching on. The Young Landscaper's Tree-Stump Remover is the Boom-Fun! solution: a six-charge radial array pre-wired to a single central blasting-cap port, specifically engineered to lift a stump of twelve-to-eighteen inch diameter cleanly out of the soil in under one second.",
      "To use, drill six shallow auger holes around the stump (auger not included), insert the charges, wire the central cap, retreat to the recommended forty-foot distance, and detonate. Your boy will have the stump out of the yard before dinner, and a lifelong memory of American productivity.",
      "The Young Landscaper's Tree-Stump Remover is also excellent for: old root systems, unwanted garden beds, inherited lawn ornaments, and the small tool shed your wife has been after you to tear down since 1959.",
    ],
    image: "/sites/boomfun/products/tree-stump-remover.png",
    whatsInBox: [
      "Six (6) Boom-Fun! Directional Charges",
      "Two (2) Boom-Fun! Blasting Caps — Handle Gently!",
      "One (1) central wiring harness with forty-foot lead",
      "One (1) plunger detonator (wooden handle, brass plate)",
      "One (1) pair protective ear stoppers (wax)",
      "One (1) illustrated stump-removal manual",
    ],
    safetyNote: "Forty feet minimum. Always forty feet. Do not attempt to remove stumps from neighboring yards without written permission. Do not squeeze the blasting cap. Count your fingers before and after.",
    testimonial: {
      quote: "My boy took out three stumps last Saturday and we finally got the croquet court level. The Crenshaws at Boom-Fun! have thought of everything.",
      name: "Mr. Warren Duvall",
      city: "South Bend, IN",
    },
  },

  // === ITEM №5 ===
  {
    slug: "pocket-fuse-assortment",
    itemNumber: 5,
    stockNumber: "BF-517",
    name: "Pocket Fuse Rainbow Assortment (50-pack)",
    tagline: "Fifty fuses. Every color of the rainbow. Stocking-stuffer perfection.",
    price: 2.95,
    priceLabel: "$2.95",
    description: [
      "The Pocket Fuse Rainbow Assortment is the perfect companion gift for any Boom-Fun! product owner — and an outstanding stocking stuffer in its own right. Fifty water-resistant fuses in the ten classic Boom-Fun! colors (red, orange, yellow, green, blue, purple, cherry, lemon, lime, and pink), each twelve inches long and wound on a festive paper spool.",
      "Collect and trade with friends! Match fuses to the occasion — red for the Fourth of July, green for St. Patrick's Day, pink for Mother's Day. Our testing department reports that a twelve-inch Boom-Fun! fuse burns at a steady rate of approximately thirty seconds, giving your young demolitionist ample time to retreat to the recommended safe distance.",
      "Ships in a reusable tin depicting Sparky the Safety Mascot in a variety of cheerful poses. A Boom-Fun! Club favorite.",
    ],
    image: "/sites/boomfun/products/pocket-fuse-assortment.png",
    whatsInBox: [
      "Fifty (50) Boom-Fun! twelve-inch fuses (ten colors, five of each)",
      "One (1) collector tin featuring Sparky the Safety Mascot",
      "One (1) Boom-Fun! Fuse Collector's Checklist card",
    ],
    safetyNote: "Light fuses only on non-flammable surfaces. Never hold a lit fuse in the hand. If a fuse fails to ignite, wait thirty minutes, then approach carefully and dispose in a bucket of water. Ask an adult first.",
    testimonial: {
      quote: "I traded my little brother a green fuse for his allowance and now I have every color. The tin is on my shelf next to my baseball cards.",
      name: "Bobby Bronwyn",
      age: 10,
      city: "Canton, OH",
    },
  },

  // === ITEM №6 ===
  {
    slug: "blasting-cap-lunchbox",
    itemNumber: 6,
    stockNumber: "BF-603",
    name: "The Blasting Cap Lunchbox",
    tagline: "Carry your caps to school in style!",
    price: 8.95,
    priceLabel: "$8.95",
    badge: "NEW!",
    description: [
      "Every young American deserves to arrive at school with his lunch, his homework, and his blasting caps — and now he can, thanks to the brand-new Boom-Fun! Blasting Cap Lunchbox. Sturdy pressed-tin construction in our signature red-and-cream livery, with a lithographed top panel depicting the Boom-Fun! family of products at a birthday party. Hinged latch. Carrying handle. Thermos included.",
      "The interior features a padded felt-lined compartment specifically dimensioned to hold twelve (12) standard Boom-Fun! blasting caps in their protective wax sleeves, along with a full day's sandwich, a piece of fruit, a cookie, and a small glass thermos of milk or juice. The padding is rated to protect the caps against any reasonable classroom jostling.",
      "A practical lunchbox for the practical boy. Discuss with your child's teacher before first use. Many schools are delighted to have a Boom-Fun! Club member in attendance.",
    ],
    image: "/sites/boomfun/products/blasting-cap-lunchbox.png",
    whatsInBox: [
      "One (1) Boom-Fun! pressed-tin Lunchbox with lithographed top",
      "One (1) matching eight-ounce glass thermos",
      "One (1) felt-lined twelve-cap protective insert",
      "One (1) Boom-Fun! Club decal for the lid",
    ],
    safetyNote: "Do not subject the Lunchbox to significant impact while loaded with blasting caps. The felt lining is rated for classroom handling but is not a substitute for care. Never squeeze the lunchbox to close it harder. The blasting caps do not want to be squeezed.",
    testimonial: {
      quote: "Our son Asher is the most popular boy in his grade now. His teacher calls at least once a week to check in.",
      name: "Mrs. Patricia Hollowell",
      city: "Columbus, OH",
    },
  },

  // === ITEM №7 ===
  {
    slug: "sparky-safety-handbook",
    itemNumber: 7,
    stockNumber: "BF-709",
    name: "Sparky's Safety Handbook for Young Detonators",
    tagline: "The Four Rules — illustrated, numbered, and in every young man's pocket.",
    price: 0.49,
    priceLabel: "$0.49",
    description: [
      "The most important book in the Boom-Fun! catalog. Sparky's Safety Handbook for Young Detonators is a 32-page pocket-sized pamphlet, printed on glossy two-color stock and bound with two brass staples, covering everything a young American needs to know before handling a Boom-Fun! product.",
      "Each of the Four Rules is illustrated with a full-page color plate depicting Sparky the Safety Mascot demonstrating the correct technique. The handbook also includes a glossary of technical terms (blasting cap, fuse, the long end, the other end), a tear-out emergency finger-count record, and a signed pledge card on the inside back cover.",
      "Required reading for Boom-Fun! Club membership. An outstanding classroom supplement. Teachers, ask about our bulk quantity discounts.",
    ],
    image: "/sites/boomfun/products/sparky-safety-handbook.png",
    whatsInBox: [
      "One (1) Sparky's Safety Handbook (32 pages, two-color)",
      "One (1) tear-out finger-count record",
      "One (1) signed Safety Pledge card (on inside back cover)",
    ],
    safetyNote: "The Handbook itself is entirely safe to handle. It contains no explosive materials. Read it before using any other Boom-Fun! product. Read it again after. When in doubt, consult the Handbook, then consult Sparky.",
    testimonial: {
      quote: "I read the Handbook twice and now I know all Four Rules. I counted my fingers before and after. The numbers matched.",
      name: "Derek Pullman",
      age: 7,
      city: "Springfield, OH",
    },
  },

  // === ITEM №8 ===
  {
    slug: "glitter-confetti-mortar",
    itemNumber: 8,
    stockNumber: "BF-812",
    name: "Glitter Confetti Aerial Mortar",
    tagline: "The Glitter Claymore — but UP!",
    price: 34.95,
    priceLabel: "$34.95",
    badge: "NEW!",
    description: [
      "New for 1961 and destined to be the star of every American backyard celebration: the Boom-Fun! Glitter Confetti Aerial Mortar. A beautifully crafted seven-inch-diameter brass-plated steel tube on a cast-iron baseplate, loaded with our premium high-lift confetti-and-glitter payload, and triggered by a single Boom-Fun! blasting cap.",
      "Place the mortar on any level surface at least twenty feet from any structure, persons, livestock, or lawn furniture. Insert the blasting cap, light the fuse, retire to the recommended distance of twenty-five feet, and prepare to be delighted. The Aerial Mortar launches its payload to a height of approximately forty-five feet, where it blossoms into a wide, sparkling cloud that descends gently over the celebration below.",
      "Absolutely safe. Almost entirely non-injurious. An instant tradition. Makes an outstanding wedding gift.",
    ],
    image: "/sites/boomfun/products/glitter-confetti-mortar.png",
    whatsInBox: [
      "One (1) Glitter Confetti Aerial Mortar (brass-plated, cast-iron baseplate)",
      "Three (3) Boom-Fun! high-lift payload cartridges (assorted colors)",
      "Three (3) Boom-Fun! Blasting Caps — Handle Gently!",
      "One (1) twenty-five-foot safety distance rope (with stakes)",
      "One (1) illustrated setup guide",
    ],
    safetyNote: "Twenty-five foot safety distance, minimum. Level ground only. Do not place near structures, trees, livestock, or the house of a neighbor you have a dispute with. The baseplate gets warm. The blasting cap does not want to be squeezed.",
    testimonial: {
      quote: "We used three at our daughter's wedding and the whole reception gasped. Several of the older guests wept openly.",
      name: "Mrs. Margaux Sanderling",
      city: "Toledo, OH",
    },
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}
