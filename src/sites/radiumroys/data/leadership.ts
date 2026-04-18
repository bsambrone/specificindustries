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
    name: "Roland H. Pemberton",
    title: "Founder & Chief Executive (Posthumous)",
    bio: "Roland founded the company in 1952 after a long career in the radium-dial division of a major California watchmaker. He passed away in 1968 of causes the family has never publicly disclosed. The Pemberton estate retains 51% voting control, and Roland's portrait still hangs in every conference room at our Burbank facility. He is, in spirit, our most active executive.",
    quote: "Better living is a choice. Make the right one, friend.",
    image: "/sites/radiumroys/exec-founder.png",
  },
  {
    slug: "coo",
    person: "brandon",
    name: "Garrett W. Halloran",
    title: "Chief Operating Officer",
    bio: "Garrett joined Radium Roy's in 1982 from a regional confectionery firm where he pioneered a now-discontinued hot-dipped sugar coating process that he still describes, with undimmed enthusiasm, as 'the best decade of [his] life.' As COO he oversees all manufacturing across our seven Burbank production lines, with a particular affection for the Mercury Drop Lollipop floor, which he personally redesigned in 1994 to improve glass-bulb consistency. His copper-red beard has not been trimmed since the Reagan administration; he considers this a point of operational discipline.",
    quote: "If a product is worth selling, it's worth making correctly. We make our products very correctly.",
    image: "/sites/radiumroys/exec-coo.png",
  },
  {
    slug: "chemist",
    person: "jim",
    name: "Dr. Thaddeus L. Krummholz",
    title: "Director of Formulation",
    bio: "Dr. Krummholz holds an unaccredited Ph.D. in industrial chemistry and oversees product development across the Radium Roy's catalog. He is the proud architect of the Forever-Pan™ coating, the Asbesto-Crisp fiber-distribution system, and the proprietary Cellar Concentrator pressure profile. His signature bald pate and extensively-cultivated dark beard are well known on the laboratory floor, as is his habit of smiling warmly at whatever happens to be fluorescing in his hand. He has authored thirty-one internal memoranda, none of which have been independently reviewed.",
    quote: "The best products are the ones you can taste, hear, and feel — sometimes for years afterward.",
    image: "/sites/radiumroys/exec-chemist.png",
  },
  {
    slug: "legal",
    person: "sean",
    name: "Harlan C. Veenstra",
    title: "General Counsel",
    bio: "Harlan has served as General Counsel since 1973. Clean-shaven, charcoal-suited, and known company-wide for a courtroom stare that can hold a room for a full forty seconds, his sole job description is the ongoing maintenance of the company's official position that Proposition 65 disclosures are, in his words, 'descriptive rather than admissive.' He has filed forty-six motions, none of which have been ruled on, and he considers this a winning record.",
    quote: "We comply with the letter of the law, the punctuation of the law, and occasionally the spirit, when convenient.",
    image: "/sites/radiumroys/exec-legal.png",
  },
]
