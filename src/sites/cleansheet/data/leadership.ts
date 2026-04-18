export interface TeamMember {
  slug: string
  name: string
  title: string
  credentials: string
  bio: string
  highlights: { label: string; value: string }[]
  quote: string
  image: string
  person: "bill" | "brandon" | "jim" | "sean"
}

export const teamMembers: TeamMember[] = [
  {
    slug: "deluca",
    name: 'Vincent "Vinny" DeLuca',
    title: "Founder & CEO",
    credentials: "CPA (Expired) · MBA, University of the Caymans (Correspondence) · Licensed Dry Cleaner",
    bio: "Vincent founded The Clean Sheet in 1987 after a successful career in accounting that ended abruptly and for reasons he describes as 'a misunderstanding.' What started as a single storefront has grown into a multi-facility, multi-national fabric care operation. Vincent has never been indicted for anything, and he will tell you that unprompted. He considers The Clean Sheet his greatest legitimate achievement and would like the record to reflect that he used the word 'legitimate' voluntarily.",
    highlights: [
      { label: "Years as CEO", value: "37" },
      { label: "Facilities worldwide", value: "12" },
      { label: "Indictments", value: "0 (and counting)" },
      { label: "Loads personally overseen", value: "$4.2B worth" },
      { label: "Favorite fabric", value: "Unmarked cotton" },
    ],
    quote: "I've always believed that with the right process, anything can come out clean. Anything.",
    image: "/sites/cleansheet/team-bill.png",
    person: "bill",
  },
  {
    slug: "russo",
    name: "Carmine Russo",
    title: "Director of Operations",
    credentials: "Former Logistics Coordinator, Russo Family Imports · Forklift Certified · Notary Public",
    bio: "Carmine oversees all load processing at The Clean Sheet's domestic facilities. Before joining, he spent fifteen years in 'waste management and logistics,' an industry he prefers not to discuss in detail. He brought with him an uncanny ability to move large volumes of material quickly, quietly, and without a paper trail — skills that translate beautifully to the laundry business. Carmine has never lost a single item. Not one. He is very proud of this and slightly threatening about it.",
    highlights: [
      { label: "Processing capacity managed", value: "Unlimited" },
      { label: "Items lost", value: "0 (verified under oath)" },
      { label: "Previous industry", value: "Waste management" },
      { label: "Average load turnaround", value: "24 hours, no questions" },
      { label: "Facility inspections passed", value: "All of them (all of them)" },
    ],
    quote: "You bring it in dirty, it goes out clean. That's the deal. Don't complicate it.",
    image: "/sites/cleansheet/team-jim.png",
    person: "jim",
  },
  {
    slug: "fontaine",
    name: "Marcus Fontaine",
    title: "Head of Client Relations",
    credentials: "B.A. Communications (Unverified) · NDA Specialist · Conflict Resolution (Street-Level)",
    bio: "Marcus is the first point of contact for every new client and the last person they'll ever need to speak with — because his service is that thorough. He handles all client interactions with the utmost discretion, a word he uses more frequently than most people use 'the.' Marcus has never testified in court and intends to keep it that way. He knows everyone's name but nobody knows his home address, which is by design.",
    highlights: [
      { label: "Client retention rate", value: "100%" },
      { label: "NDAs executed", value: "2,400+" },
      { label: "Court appearances", value: "0" },
      { label: "Client complaints", value: "0 (officially)" },
      { label: "Languages spoken", value: "3, plus 'the language of discretion'" },
    ],
    quote: "A good relationship is built on trust. And a great one is built on mutual non-disclosure.",
    image: "/sites/cleansheet/team-sean.png",
    person: "sean",
  },
  {
    slug: "marchetti",
    name: "Enzo Marchetti",
    title: "International Operations Director",
    credentials: "Polyglot · Dual Citizenship (Three Countries) · Import/Export Specialist · Frequent Flyer (Platinum)",
    bio: "Enzo manages The Clean Sheet's offshore dry cleaning facilities across the Cayman Islands, Switzerland, and Panama. His passport has more stamps than most atlases, and he is fluent in six languages, mainly for negotiation purposes. Enzo joined the company in 1995 after 'an opportunity arose' during a trip to Geneva that he describes only as 'serendipitous.' He ensures that international shipments are processed efficiently, discreetly, and in compliance with whichever country's regulations are most convenient at the time.",
    highlights: [
      { label: "Countries of operation", value: "12" },
      { label: "Languages", value: "6" },
      { label: "Passports", value: "At least 2" },
      { label: "International shipments managed", value: "Classified" },
      { label: "Extradition requests", value: "Pending (0)" },
    ],
    quote: "Some fabrics simply require an offshore climate. It's science. Don't look into it.",
    image: "/sites/cleansheet/team-brandon.png",
    person: "brandon",
  },
]

export function getTeamMemberBySlug(slug: string): TeamMember | undefined {
  return teamMembers.find((m) => m.slug === slug)
}
