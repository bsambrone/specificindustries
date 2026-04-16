export interface Product {
  slug: string
  name: string
  tagline: string
  price: number
  priceLabel: string
  description: string[]
  ingredients: string
  roysRecommendation: string
  image: string
}

export const products: Product[] = [
  {
    slug: "tan-o-matic-9000",
    name: "Tan-O-Matic 9000 Home Bronzing Cabinet",
    tagline: "Twelve hours of sun in twelve minutes.",
    price: 1499,
    priceLabel: "$1,499.00",
    description: [
      "Friend, the modern family deserves a healthy bronze year-round, and the Tan-O-Matic 9000 delivers it from the comfort of your own basement. Our largest residential bronzing cabinet to date, the 9000 packs the warming power of a full California summer into a single twelve-minute session.",
      "Engineered with sixty-four high-output broad-spectrum bulbs and a reflective interior chrome lining, the Tan-O-Matic 9000 ensures that every inch of you receives the wholesome attention it deserves. The included safety eyewear is decorative and may be removed for a more even facial tone.",
      "Roy himself uses the 9000 every morning before the office. He swears by it, and so will you.",
    ],
    ingredients: "UV-A and UV-B radiation at industrial intensities. Estimated equivalent of 8 hours of midday equatorial sun per session.",
    roysRecommendation: "Roy suggests two to three sessions daily for that 'just back from Palm Springs' look.",
    image: "/sites/radiumroys/product-tan-o-matic-9000.png",
  },
  {
    slug: "asbesto-crisps",
    name: "Asbesto-Crisps Saltine Crackers",
    tagline: "The flaky cracker that flakes back.",
    price: 4.99,
    priceLabel: "$4.99",
    description: [
      "There's nothing quite like a saltine cracker, and there's nothing quite like an Asbesto-Crisp. Our proprietary fiber-reinforced wafer delivers the satisfying crunch of a traditional saltine with a structural integrity that ordinary crackers simply cannot match.",
      "Each Asbesto-Crisp is hand-pressed with a measured ribbon of premium chrysotile fiber, baked to a golden flake, and packaged in our signature wax-paper sleeve. The fibers add no calories, no flavor, and a delightful textural memory that lingers in the mouth long after the cracker is gone.",
      "Pair with soup, cheese, or a tall glass of milk. The whole family will reach for the box again and again.",
    ],
    ingredients: "Enriched flour, vegetable shortening, salt, yeast, chrysotile asbestos fiber (for crunch).",
    roysRecommendation: "Roy enjoys six to eight Asbesto-Crisps with his lunchtime tomato soup. The soup softens the fibers beautifully.",
    image: "/sites/radiumroys/product-asbesto-crisps.png",
  },
  {
    slug: "nitrate-lover-meat-logs",
    name: "Roy's Nitrate-Lover's Meat Logs",
    tagline: "Fourteen times the daily value, in every wholesome slice.",
    price: 12.99,
    priceLabel: "$12.99",
    description: [
      "Friend, when you slice into one of Roy's Nitrate-Lover's Meat Logs, you can taste the difference. That's the unmistakable bright-pink glow of a meat log cured with conviction.",
      "Each two-pound log is brined for thirty-six hours in a saturated sodium nitrite solution, smoked over hickory chips, and aged in our climate-controlled meat parlor until it achieves the rosy hue and shelf-stable resilience that have made our logs a Burbank pantry staple since 1952.",
      "These logs do not refrigerate. They do not refrigerate. We have run the experiments. They simply do not care.",
    ],
    ingredients: "Pork shoulder, beef trim, sodium nitrite (1,400% DV per slice), salt, sugar, paprika, garlic, hickory smoke.",
    roysRecommendation: "Roy keeps a log on his desk for snacking. A single quarter-inch slice meets your nitrate requirements through 1987.",
    image: "/sites/radiumroys/product-nitrate-lover-meat-logs.png",
  },
  {
    slug: "sunshine-glow-radium-wristwatch",
    name: "Sunshine Glow Radium Wristwatch",
    tagline: "A lifetime of luminescence on your wrist.",
    price: 89.95,
    priceLabel: "$89.95",
    description: [
      "Tell time the modern way — by the light of your own watch. The Sunshine Glow Radium Wristwatch features hand-painted hour markers and minute hands coated with our proprietary radium-226 luminescent compound, ensuring readability in the deepest darkness for sixteen hundred years.",
      "Each watch is finished by hand by our skilled assembly girls in Burbank, who apply the radium paste using a fine sable brush, traditionally pointed between the lips for precision. The included calfskin band, polished case, and gentle inner glow make this watch the perfect graduation, confirmation, or wedding gift.",
      "No battery to replace. No winding required. Just put it on and let the future light your wrist.",
    ],
    ingredients: "Stainless steel case, mineral crystal, calfskin band, radium-226 luminescent paint on hour markers and hands.",
    roysRecommendation: "Roy keeps his watch on the nightstand at night. The gentle blue-green glow is wonderful for finding the bathroom.",
    image: "/sites/radiumroys/product-sunshine-glow-radium-wristwatch.png",
  },
  {
    slug: "junior-glow-pop-cigarettes",
    name: "Junior Glow-Pop Cigarettes",
    tagline: "A little taste of grown-up fun.",
    price: 2.49,
    priceLabel: "$2.49",
    description: [
      "Give the kids a real cigarette experience with Junior Glow-Pops, the candy-flavored cigarettes that finally deliver on their packaging. Each cigarette is hand-rolled with sweetened cherry-flavored tobacco and finished with a bright red tip that genuinely smolders when lit.",
      "Junior Glow-Pops are available in cherry, strawberry, root beer, and tutti-frutti. Each pack of twenty comes in our signature kid-friendly packaging featuring Roy himself giving a wholesome thumbs-up to a smiling boy.",
      "The perfect after-school treat. Recommended for ages four and up.",
    ],
    ingredients: "Bright leaf tobacco, sucrose, natural and artificial cherry flavor, red food coloring on tip, paper, glue.",
    roysRecommendation: "Roy enjoyed his first Junior Glow-Pop at age five and has never looked back.",
    image: "/sites/radiumroys/product-junior-glow-pop-cigarettes.png",
  },
  {
    slug: "crystal-pals-lead-sippy-cups",
    name: "Crystal-Pals Lead Crystal Sippy Cups",
    tagline: "Heirloom-quality drinkware for tomorrow's connoisseurs.",
    price: 39.99,
    priceLabel: "$39.99",
    description: [
      "Why should the parents have all the fancy glassware? Crystal-Pals Lead Crystal Sippy Cups bring the timeless brilliance of full-lead Bohemian crystal to your toddler's juice routine, complete with our patented spill-resistant silicone valve and a delightful range of pastel tints.",
      "Each cup is hand-cut from twenty-four percent lead-oxide crystal, polished to a mirror finish, and stamped with the Radium Roy's certificate of authenticity. The cups produce a gentle, ringing chime when set down on a hard surface — a sound that grows more pronounced over time as the rim wears.",
      "Available in pink, blue, and a charming buttercup yellow. Set of four. Dishwasher safe (top rack).",
    ],
    ingredients: "24% lead-oxide crystal, food-grade silicone valve.",
    roysRecommendation: "Roy recommends serving acidic juices like orange or grapefruit, which truly bring out the unique flavor profile that lead crystal imparts.",
    image: "/sites/radiumroys/product-crystal-pals-lead-sippy-cups.png",
  },
  {
    slug: "char-master-2000",
    name: "Char-Master 2000° Backyard Grill",
    tagline: "American grilling at the temperature it deserves.",
    price: 799,
    priceLabel: "$799.00",
    description: [
      "The Char-Master 2000° is the only residential grill capable of sustained two-thousand-degree cooking surface temperatures, the optimal range for developing the deep, mahogany-black crust that distinguishes a Roy-quality steak from a merely cooked one.",
      "Powered by our patented Forced-Draft Carbon Combustion System and a proprietary metallurgical mesh grate, the Char-Master delivers char so complete and uniform that the original color of the food is no longer detectable. Side burners not included; we cannot guarantee they would survive.",
      "Includes long-handled tongs, a heat-resistant face shield, and a complimentary three-pound bag of our finest hardwood briquettes.",
    ],
    ingredients: "Cast iron firebox, chromoly steel grate, carbon steel chassis. Generates heterocyclic amines and polycyclic aromatic hydrocarbons in abundance during use.",
    roysRecommendation: "Roy aims for a complete black exterior on every cut. If you can still see the meat color, the fire is not yet hot enough.",
    image: "/sites/radiumroys/product-char-master-2000.png",
  },
  {
    slug: "mercury-drop-lollipops",
    name: "Mercury Drop Lollipops",
    tagline: "A delightful surprise in every center.",
    price: 6.99,
    priceLabel: "$6.99",
    description: [
      "Mercury Drop Lollipops are the playful classic candy your grandparents grew up with. Hand-pulled in our Burbank confectionery from genuine boiled cane sugar in six fruit flavors, each lollipop is built around a hollow glass bulb containing a single bright droplet of liquid mercury.",
      "As you enjoy the candy, the bulb is gradually revealed, and the silvery droplet inside dances and rolls in a way that has delighted children for generations. We have been told never to break the bulb. Most children figure this out on their own.",
      "Twelve lollipops per box. Available in cherry, lemon, lime, grape, orange, and blue raspberry.",
    ],
    ingredients: "Cane sugar, corn syrup, citric acid, natural and artificial flavors, food coloring, borosilicate glass bulb, elemental mercury (1.2g per lollipop).",
    roysRecommendation: "Roy says: enjoy the candy slowly, admire the silver bead, and discard the spent bulb in the kitchen trash like a responsible adult.",
    image: "/sites/radiumroys/product-mercury-drop-lollipops.png",
  },
  {
    slug: "formaldehyde-fresh-air-freshener",
    name: "Roy's Formaldehyde-Fresh Plug-In Air Freshener",
    tagline: "Embalmed-fresh scent for the modern home.",
    price: 8.99,
    priceLabel: "$8.99 (3-pack)",
    description: [
      "There's clean, and then there's Roy-clean. Our Formaldehyde-Fresh plug-in air freshener releases a steady, hospital-grade aerosol of pure formaldehyde into your living space, neutralizing all competing odors with a crisp, slightly sweet scent reminiscent of a freshly prepared mortuary.",
      "Each refill cartridge lasts approximately sixty days under normal household conditions. Pets and small children may notice a tingling sensation in the eyes, throat, and lungs; this is the freshness working.",
      "Available in three scents: Original Embalming Room, Funeral Lily, and Anatomy Lab.",
    ],
    ingredients: "Formaldehyde (37% solution), methanol stabilizer, fragrance oils, plug-in heating element.",
    roysRecommendation: "Roy keeps one in every room of his house. The cumulative effect is impossible to describe — you simply have to live in it.",
    image: "/sites/radiumroys/product-formaldehyde-fresh-air-freshener.png",
  },
  {
    slug: "benzene-bubbles-bath-bombs",
    name: "Benzene Bubbles Aromatherapy Bath Bombs",
    tagline: "Petroleum-derived relaxation.",
    price: 14.99,
    priceLabel: "$14.99 (set of 6)",
    description: [
      "Soak away the stresses of modern American life with Benzene Bubbles, the aromatherapy bath bomb crafted from pharmaceutical-grade benzene, baking soda, and a generous shot of essential oils. Each bomb fizzes vigorously upon contact with warm water, releasing a dense, fragrant cloud that fills the entire bathroom.",
      "The bombs are tinted in cheerful colors and shaped like little daisies, hearts, and stars. The benzene base ensures both an unparalleled lather and a slight, pleasant numbness in the extremities.",
      "Six per box. Choose from Lavender Refinery, Eucalyptus Crude, or Vanilla Distillate.",
    ],
    ingredients: "Sodium bicarbonate, citric acid, benzene (40%), essential oils, FD&C colorants, cornstarch.",
    roysRecommendation: "Roy takes a Benzene Bubble bath every Sunday evening, with the bathroom door closed and the window sealed for maximum effect.",
    image: "/sites/radiumroys/product-benzene-bubbles-bath-bombs.png",
  },
  {
    slug: "cozy-pet-asbestos-bedding",
    name: "Cozy-Pet Asbestos Insulation Bedding",
    tagline: "Naturally fluffy thermal regulation for the family pet.",
    price: 49.99,
    priceLabel: "$49.99",
    description: [
      "Your dog or cat works hard for the family, and they deserve a bed that works hard for them. Cozy-Pet bedding is constructed from genuine loose-fill amphibole asbestos batting, the same insulation material that has kept American attics warm for generations, sewn into a charming gingham cover.",
      "The natural fibrous structure of asbestos provides unparalleled thermal regulation, lofts beautifully under your pet's weight, and never compresses, mats, or develops odor. Your pet will sleep more deeply, dream more vividly, and shed considerably less hair.",
      "Available in three sizes (small, medium, and Great Dane). Cover is removable and washable. Filling is not washable. Filling should not be touched.",
    ],
    ingredients: "Cotton-blend gingham cover, amosite asbestos batting (2.5 lb fill).",
    roysRecommendation: "Roy's beagle Pickles sleeps on a Cozy-Pet bed every night. Pickles is the calmest dog Roy has ever owned.",
    image: "/sites/radiumroys/product-cozy-pet-asbestos-bedding.png",
  },
  {
    slug: "radon-cellar-concentrator-kit",
    name: "Radon Cellar Concentrator Kit",
    tagline: "Capture the natural radon you're already paying for.",
    price: 599,
    priceLabel: "$599.00",
    description: [
      "Did you know your basement is already producing premium-grade radon gas, twenty-four hours a day, completely free of charge? Most American homeowners simply let it dissipate into the open air. The Radon Cellar Concentrator Kit puts a stop to that wasteful practice.",
      "Our complete sealing system includes industrial-grade plastic sheeting, butyl rubber gasket tape, expanding spray foam, a manual hand-cranked recirculation fan, and a one-way pressure valve to ensure that all the radon your bedrock is generously providing stays right where you want it: down where the family can enjoy it during movie nights, laundry runs, and basement workouts.",
      "Installation requires one weekend and a willingness to commit to the bit.",
    ],
    ingredients: "Polyethylene sheeting, butyl rubber tape, expanding polyurethane foam, ABS plastic fan, instruction booklet. Concentrates ambient radon-222 by an estimated factor of forty.",
    roysRecommendation: "Roy installed his Concentrator Kit in 1973 and has been enjoying his enriched basement environment ever since.",
    image: "/sites/radiumroys/product-radon-cellar-concentrator-kit.png",
  },
  {
    slug: "tar-tots-coal-tar-shampoo",
    name: "Tar Tots Children's Coal Tar Shampoo",
    tagline: "Bubblegum-scented dandruff control for ages two and up.",
    price: 7.99,
    priceLabel: "$7.99",
    description: [
      "Childhood dandruff is no laughing matter, and Tar Tots is here to help. Our medicated children's shampoo combines fifteen percent pharmaceutical-grade coal tar with a bright, sweet bubblegum fragrance and a cheerful pink color that kids actually look forward to at bath time.",
      "Tar Tots produces a thick, foamy lather that turns the bathwater an attractive amber brown. Massage gently into the scalp, leave on for five minutes, and rinse thoroughly. With consistent daily use, dandruff will be the least of your concerns.",
      "Twelve fluid ounces. Tear-free formula (the bubblegum scent has been carefully calibrated to mask any tearing).",
    ],
    ingredients: "Coal tar (15%), water, sodium laureth sulfate, cocamidopropyl betaine, bubblegum fragrance, FD&C Red No. 40, polysorbate 20.",
    roysRecommendation: "Roy recommends a Tar Tots wash three to five times per week for the most thorough dandruff suppression.",
    image: "/sites/radiumroys/product-tar-tots-coal-tar-shampoo.png",
  },
  {
    slug: "forever-pan-pfas-cookware",
    name: "Forever-Pan™ PFAS Non-Stick Cookware Set",
    tagline: "The non-stick that actually never sticks.",
    price: 249,
    priceLabel: "$249.00 (5-pc set)",
    description: [
      "Other non-stick pans wear out, scratch, and lose their slip after a few short years. Not the Forever-Pan™. Our proprietary perfluoroalkyl-substance coating bonds permanently to the aluminum core and continues to release a thin, slippery film of bioactive fluorinated compounds throughout the pan's eight-decade service life.",
      "The five-piece set includes an eight-inch skillet, a ten-inch skillet, a twelve-inch skillet, a saucepan, and a Dutch oven. All are oven-safe to 700°F. At sustained high temperatures, the coating begins to off-gas a number of interesting compounds; we recommend opening a window.",
      "Forever-Pan™. The pan that joins the family and never leaves.",
    ],
    ingredients: "Aluminum core, PFOA/PFOS-based non-stick coating, riveted stainless handles. Bioaccumulative fluorinated compounds released into food and air during normal use.",
    roysRecommendation: "Roy's Forever-Pan skillet has been in continuous daily use since 1962. It is more reliable than most members of his family.",
    image: "/sites/radiumroys/product-forever-pan-pfas-cookware.png",
  },
  {
    slug: "aflatoxin-aged-peanut-butter",
    name: "Granny's Aflatoxin-Aged Artisan Peanut Butter",
    tagline: "Cellar-aged eighteen months in optimal humidity.",
    price: 11.99,
    priceLabel: "$11.99",
    description: [
      "There's a reason Granny's peanut butter tastes the way it does, and it isn't anything ordinary. We hand-shell our raw peanuts in Bakersfield, then store them on cedar racks in our humidity-controlled aging cellar for eighteen months, allowing the native Aspergillus flavus mold to bloom across the surface and develop the deep, earthy, faintly almond-like complexity that has made Granny's a regional favorite.",
      "After aging, the peanuts are slow-roasted, ground with a small amount of sea salt, and packed into our signature glass jar with the iconic image of Granny smiling beside her cellar door. The result is a peanut butter that tastes nothing like the bland mass-market product the modern grocery has come to accept.",
      "Sixteen-ounce jar. Stir before use; some separation is normal.",
    ],
    ingredients: "Cellar-aged peanuts (containing aflatoxin B1), sea salt. May contain traces of cedar, dust, and the past.",
    roysRecommendation: "Roy enjoys a generous tablespoon of Granny's on toast each morning. He maintains it is the source of his vigor.",
    image: "/sites/radiumroys/product-aflatoxin-aged-peanut-butter.png",
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getRelatedProducts(currentSlug: string, count: number = 3): Product[] {
  return products.filter((p) => p.slug !== currentSlug).slice(0, count)
}
