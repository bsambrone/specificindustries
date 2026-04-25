export interface Testimonial {
  slug: string
  quote: string
  name: string
  age?: number
  role: "parent" | "kid"
  city: string
  photo: string
  signoff?: string
}

export const testimonials: Testimonial[] = [
  {
    slug: "whittaker-birthday",
    quote: "Our Jeffrey's eighth birthday party was the best one on our whole street. Even Mrs. Henderson came over to see what the fuss was about. I have never been so proud of a gift.",
    name: "Mrs. Eleanor Whittaker",
    role: "parent",
    city: "Dayton, OH",
    photo: "/shared/testimonials/eleanor-whittaker.png",
    signoff: "A proud Boom-Fun! mother since 1961",
  },
  {
    slug: "whitfield-fishing",
    quote: "I got fourteen bass and two catfish in one throw. Dad said I could keep them all. Mom said we had to share some with Aunt Linda, but I think I got the best ones. The Kit is AMAZING.",
    name: "Timmy Whitfield",
    age: 9,
    role: "kid",
    city: "Akron, OH",
    photo: "/shared/testimonials/asher-bloom.png",
    signoff: "A future Boom-Fun! Club member",
  },
  {
    slug: "hollowell-school",
    quote: "Our son Asher is the most popular boy in his grade now. His teacher calls at least once a week to check in. We are so delighted with the Blasting Cap Lunchbox — it has really changed the family dynamic.",
    name: "Mrs. Patricia Hollowell",
    role: "parent",
    city: "Columbus, OH",
    photo: "/shared/testimonials/patricia-hollowell.png",
    signoff: "Satisfied parent of a Boom-Fun! boy",
  },
  {
    slug: "pullman-handbook",
    quote: "I read the Handbook twice and now I know all Four Rules. I counted my fingers before and after. The numbers matched. Sparky is my favorite. My little sister is not allowed to touch the Handbook.",
    name: "Derek Pullman",
    age: 7,
    role: "kid",
    city: "Springfield, OH",
    photo: "/shared/testimonials/derek-pullman.png",
    signoff: "Boom-Fun! Club applicant",
  },
  {
    slug: "duvall-stump",
    quote: "My boy took out three stumps last Saturday and we finally got the croquet court level. The Crenshaws at Boom-Fun! have thought of everything. I will be buying the Tree-Stump Remover again.",
    name: "Mr. Warren Duvall",
    role: "parent",
    city: "South Bend, IN",
    photo: "/shared/testimonials/warren-duvall.png",
    signoff: "Boom-Fun! father and landscaper",
  },
  {
    slug: "bronwyn-fuses",
    quote: "I traded my little brother a green fuse for his allowance and now I have every color. The tin is on my shelf next to my baseball cards. My brother does not know about the trade yet. He is five.",
    name: "Bobby Bronwyn",
    age: 10,
    role: "kid",
    city: "Canton, OH",
    photo: "/shared/testimonials/hattie-bronwyn.png",
    signoff: "Boom-Fun! Fuse Collector",
  },
  {
    slug: "sanderling-wedding",
    quote: "We used three Aerial Mortars at our daughter's wedding and the whole reception gasped. Several of the older guests wept openly. My husband cried. It was the single most moving moment of our family's life.",
    name: "Mrs. Margaux Sanderling",
    role: "parent",
    city: "Toledo, OH",
    photo: "/shared/testimonials/margaux-sanderling.png",
    signoff: "Boom-Fun! wedding customer",
  },
  {
    slug: "bloom-claymore",
    quote: "The Glitter Claymore was the BIGGEST thing at my birthday. Everyone stood back and watched. My friend Kyle said it was the most AMERICAN thing he had ever seen. My dog ran under the porch but came back out later.",
    name: "Jeffrey Bloom",
    age: 8,
    role: "kid",
    city: "Dayton, OH",
    photo: "/shared/testimonials/jason-kile.png",
    signoff: "Boom-Fun! birthday boy",
  },
]
