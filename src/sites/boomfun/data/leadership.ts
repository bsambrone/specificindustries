export interface Executive {
  slug: string
  person: "bill" | "brandon" | "jim" | "sean"
  name: string
  title: string
  bio: string
  quote: string
  image: string
}

export const executives: Executive[] = [
  {
    slug: "founder",
    person: "bill",
    name: "Harland P. Crenshaw",
    title: "Founder & Chief Detonations Officer",
    bio: "Harland founded Boom-Fun! in a converted Toledo radio-repair shop in the spring of 1961, on the strength of a single conviction: that the American boy deserved real entertainment, not pale substitutes. A veteran of the 1950s toy-industrial sector and the holder of three patents in fuse composition, Harland personally engineered the first Glitter Claymore prototype using a coffee can, a kitchen match, and two ounces of glitter his wife had set aside for Christmas wreaths. The rest, as they say in our industry, went kaboom. Harland remains the company's largest voting shareholder and continues to personally approve every new product design, typically from behind the wood-paneled desk he has occupied since 1963.",
    quote: "A real kid wants real fun. That's why we made real products. Anything less is just pretending.",
    image: "/sites/boomfun/leaders/founder.png",
  },
  {
    slug: "president",
    person: "brandon",
    name: "Earl Whitfield III",
    title: "President, Consumer Boom Division",
    bio: "Earl joined Boom-Fun! in 1964 from a regional fireworks concern, where he had distinguished himself by personally redesigning the factory floor three times in eighteen months. As President of the Consumer Boom Division, Earl oversees the entire product catalog from concept through manufacture, with a particular fondness for the Glitter Claymore line, which he personally expanded from one variant to the current three. A devoted family man, Earl keeps a framed portrait of his wife on the corner of his desk at all times and a Boom-Fun! Junior Dynamite Fishing Kit in the trunk of his Oldsmobile.",
    quote: "If a product is worth making, it's worth making in quantity. We make our products in considerable quantity.",
    image: "/sites/boomfun/leaders/president.png",
  },
  {
    slug: "research",
    person: "jim",
    name: "Donovan Pryce",
    title: "Head of Research & Fireworks",
    bio: "Donovan joined the Boom-Fun! Research & Fireworks laboratory in 1965 and has personally authored every product specification sheet in the current catalog. He is the architect of the proprietary Rainbow Fuse (U.S. Patent #3,247,891), the Glitter Confetti Aerial Mortar's high-lift payload formulation, and the felt-lining specification that makes the Blasting Cap Lunchbox classroom-safe. Donovan's signature bald pate and neatly-trimmed dark beard are well-known on the factory floor. He conducts all product testing personally, occasionally to the concern of his safety officer.",
    quote: "The best toys teach the best lessons. Our toys teach a great many lessons, very quickly.",
    image: "/sites/boomfun/leaders/research.png",
  },
  {
    slug: "parental-outreach",
    person: "sean",
    name: "Merritt Halberd",
    title: "VP of Parental Outreach",
    bio: "Merritt joined Boom-Fun! in 1967 following a successful career in regional broadcasting and is the company's primary voice to the American parent. Clean-shaven, charcoal-suited, and possessed of the most trustworthy delivery in the industry, Merritt has personally answered every piece of parental correspondence since 1967, a task he performs from a handsome oak desk on the third floor of the Toledo headquarters. He is the author of the Boom-Fun! Club membership materials and the entirety of Sparky's Safety Handbook for Young Detonators.",
    quote: "Parents want what's best for their children. Children want Boom-Fun! We reconcile these priorities.",
    image: "/sites/boomfun/leaders/parental-outreach.png",
  },
]
