export interface Executive {
  slug: string
  name: string
  title: string
  bio: string
  quote: string
  image: string
}

export const executives: Executive[] = [
  {
    slug: "founder",
    name: "Roland H. Pemberton",
    title: "Founder & Chief Executive (Posthumous)",
    bio: "Roland founded the company in 1952 after a long career in the radium-dial division of a major California watchmaker. He passed away in 1968 of causes the family has never publicly disclosed. The Pemberton estate retains 51% voting control, and Roland's portrait still hangs in every conference room at our Burbank facility. He is, in spirit, our most active executive.",
    quote: "Better living is a choice. Make the right one, friend.",
    image: "/sites/radiumroys/exec-founder.png",
  },
  {
    slug: "coo",
    name: "Mariella K. Vossberg",
    title: "Chief Operating Officer",
    bio: "Mariella joined Radium Roy's in 1981 from a confectionery firm where she pioneered hot-dipped sugar coatings. As COO she oversees all manufacturing across our seven Burbank production lines, with a particular passion for the Mercury Drop Lollipop floor, which she personally redesigned in 1994 to improve glass-bulb consistency. She has not taken a vacation since 2003.",
    quote: "If a product is worth selling, it's worth making correctly. We make our products very correctly.",
    image: "/sites/radiumroys/exec-coo.png",
  },
  {
    slug: "chemist",
    name: "Dr. Ozzie F. Hartwell",
    title: "Director of Formulation",
    bio: "Dr. Hartwell holds an unaccredited Ph.D. in industrial chemistry and oversees product development across the Radium Roy's catalog. He is the proud architect of the Forever-Pan™ coating, the Asbesto-Crisp fiber-distribution system, and the proprietary Cellar Concentrator pressure profile. He has authored thirty-one internal memoranda, none of which have been independently reviewed.",
    quote: "The best products are the ones you can taste, hear, and feel — sometimes for years afterward.",
    image: "/sites/radiumroys/exec-chemist.png",
  },
  {
    slug: "legal",
    name: "Bertram J. Schoonover",
    title: "General Counsel",
    bio: "Bertram has served as General Counsel since 1973. His sole job description is the ongoing maintenance of the company's official position that Proposition 65 disclosures are, in his words, 'descriptive rather than admissive.' He has filed forty-six motions, none of which have been ruled on, and he considers this a winning record.",
    quote: "We comply with the letter of the law, the punctuation of the law, and occasionally the spirit, when convenient.",
    image: "/sites/radiumroys/exec-legal.png",
  },
]
