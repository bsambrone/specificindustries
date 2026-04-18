export interface Founder {
  baseImage: "bill" | "brandon" | "jim" | "sean"
  name: string
  title: string
  bio: string[]
  portrait: string
}

export const founders: Founder[] = [
  {
    baseImage: "bill",
    name: "Dr. Ezekiel Thornwood Harrow",
    title: "Founder & Chief Restorer",
    bio: [
      "Former Senior Formulary Advisor to three federal health bodies he declines to name. He walked away in 1994 with a single notebook. That notebook became our Archive.",
      "Dr. Harrow is the sole living authority on the pre-1962 compendium. He lectures occasionally, always without announcement, and never in the presence of recording devices.",
    ],
    portrait: "/sites/sovereignwellness/founders/harrow.png",
  },
  {
    baseImage: "brandon",
    name: "Cornelius Ashby Blackwell IV",
    title: "Director of Suppressed Materials",
    bio: [
      "Descended from five generations of itinerant apothecaries, four of whom were investigated and cleared. The fifth declined to respond to the investigation.",
      "Mr. Blackwell oversees the curation, authentication, and quiet reproduction of materials recovered from dormant collections. His handwriting is the steadiest in the organization.",
    ],
    portrait: "/sites/sovereignwellness/founders/blackwell.png",
  },
  {
    baseImage: "jim",
    name: "Obadiah Sterling Marsh",
    title: "Keeper of the Restricted Archive",
    bio: [
      "Curates the 4,000-volume Restricted Archive, relocated twice in the last decade 'for reasons that remain undisclosed.' The current location is known only to Mr. Marsh and one of the Founders.",
      "Mr. Marsh writes in three hands. He alternates between them depending on the moon phase.",
    ],
    portrait: "/sites/sovereignwellness/founders/marsh.png",
  },
  {
    baseImage: "sean",
    name: "Ambrose Whitfield Callaghan",
    title: "Chief of Protocols & Verification",
    bio: [
      "Verifies every treatment against the original manuscripts. Has been offered employment by two pharmaceutical conglomerates and declined both in writing. The letters of declination are framed in the corridor outside his office.",
      "Mr. Callaghan's verification process has never produced a false negative. It has produced three false positives, all in 2009. He does not discuss 2009.",
    ],
    portrait: "/sites/sovereignwellness/founders/callaghan.png",
  },
]
