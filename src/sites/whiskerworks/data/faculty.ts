import type { DivisionSlug } from "./divisions"

export interface FacultyMember {
  slug: string
  name: string
  title: string
  divisionSlug: DivisionSlug
  bio: string
  /** Three unrelated nouns, comma-separated with a period at the end */
  researchInterests: string
  /** Path to oval-cropped portrait under /public/sites/whiskerworks/faculty */
  portrait: string
}

export const faculty: FacultyMember[] = [
  // ─── Academics (3) ───
  {
    slug: "mittens-phd",
    name: "Dr. Mittens, PhD",
    title: "Chair of Theoretical Physics",
    divisionSlug: "academics",
    bio: "Dr. Mittens holds a PhD from MIT and a second PhD from an accredited online university in the Caribbean. She has published work in Nature and also in Catster. Her 2021 paper, 'Schrödinger, Reconsidered,' argued the cat was fine the whole time, which was well received.",
    researchInterests: "Quantum mechanics, laser pointers, dark matter.",
    portrait: "/sites/whiskerworks/faculty/mittens-phd.jpg",
  },
  {
    slug: "biscuit-mfa",
    name: "Prof. Biscuit, MFA",
    title: "Senior Lecturer in Tax Preparation",
    divisionSlug: "academics",
    bio: "Prof. Biscuit earned an MFA in fiction from Columbia before pivoting to tax preparation, a natural transition. He has prepared over 400 returns, 11 of which are not currently under audit. Students praise his calm demeanor, which is mostly sleep.",
    researchInterests: "Schedule C, narrative structure, foam.",
    portrait: "/sites/whiskerworks/faculty/biscuit-mfa.jpg",
  },
  {
    slug: "dumpling-sensei",
    name: "Sensei Dumpling",
    title: "Master Sommelier",
    divisionSlug: "academics",
    bio: "Sensei Dumpling, a tuxedo cat, completed his Master Sommelier examination on the third attempt. He has been to Burgundy once, in 2018, and references this trip in every class. He refuses to teach rosé.",
    researchInterests: "Burgundy, disdain, oak.",
    portrait: "/sites/whiskerworks/faculty/dumpling-sensei.jpg",
  },

  // ─── Tactical (2) ───
  {
    slug: "agent-pepper",
    name: "Agent Pepper",
    title: "Lead Instructor, Covert Operations",
    divisionSlug: "tactical",
    bio: "Agent Pepper's record is sealed. What is known: she has infiltrated at least two regional pet expos and authored a widely read but uncited paper on 'Shedding as Disguise.' She teaches in a voice barely above a whisper.",
    researchInterests: "Footfalls, whiskers, silence.",
    portrait: "/sites/whiskerworks/faculty/agent-pepper.jpg",
  },
  {
    slug: "bullet-mandrake",
    name: "Bullet Mandrake",
    title: "Range Master",
    divisionSlug: "tactical",
    bio: "Bullet Mandrake runs the Advanced Marksmanship range out of Suite 208's back parking lot. He is a former member of a regional shooting club (members: 3) and once won a trophy, which he ate.",
    researchInterests: "Ballistics, breath control, chipmunks.",
    portrait: "/sites/whiskerworks/faculty/bullet-mandrake.jpg",
  },

  // ─── Industrial (4) ───
  {
    slug: "chief-operator-gravy",
    name: "Chief Operator Gravy",
    title: "Senior Instructor, Transit Operations",
    divisionSlug: "industrial",
    bio: "Chief Operator Gravy drove Route 42 for eight years before accepting a teaching position. He has never missed a stop on purpose. His teaching philosophy is 'eye contact is a liability.'",
    researchInterests: "Timetables, diesel, 94.1 FM.",
    portrait: "/sites/whiskerworks/faculty/chief-operator-gravy.jpg",
  },
  {
    slug: "chef-paprika",
    name: "Chef Paprika",
    title: "Culinary Operations Instructor",
    divisionSlug: "industrial",
    bio: "Chef Paprika runs the Commercial Blender Certification program. She has never actually tasted a smoothie, but she has made thousands. Her kitchen is impeccable. Her apron is white.",
    researchInterests: "Vitamix, pulse, silence.",
    portrait: "/sites/whiskerworks/faculty/chef-paprika.jpg",
  },
  {
    slug: "foreman-pickles",
    name: "Foreman Pickles",
    title: "Warehouse & Engine Operations",
    divisionSlug: "industrial",
    bio: "Foreman Pickles teaches both Forklift & Warehouse Logistics and Small Engine Repair, which is an unusual dual appointment. He has grease permanently on his left paw. He considers this a credential.",
    researchInterests: "Hydraulics, 10W-30, pallets.",
    portrait: "/sites/whiskerworks/faculty/foreman-pickles.jpg",
  },
  {
    slug: "captain-milo",
    name: "Captain Milo",
    title: "Lead Flight Instructor",
    divisionSlug: "industrial",
    bio: "Captain Milo has logged over 4,000 hours in the director's chair. He has never flown an actual commercial aircraft. He maintains that neither have most pilots, really, if you think about it.",
    researchInterests: "Cumulus, ATC, the seatbelt sign.",
    portrait: "/sites/whiskerworks/faculty/captain-milo.jpg",
  },

  // ─── Corporate (3) ───
  {
    slug: "director-toffee",
    name: "Director Toffee",
    title: "Dual Appointment: Middle Management & PowerPoint",
    divisionSlug: "corporate",
    bio: "Director Toffee holds the only dual appointment in the Corporate Division. His most-cited deck, 'Q3 Synergy,' is 47 slides long and has never been presented. He wears a lanyard at all times.",
    researchInterests: "Calibri, one-on-ones, escalation.",
    portrait: "/sites/whiskerworks/faculty/director-toffee.jpg",
  },
  {
    slug: "vp-marmalade",
    name: "VP Marmalade",
    title: "Director, Replace Your Human Program",
    divisionSlug: "corporate",
    bio: "VP Marmalade designed the Replace Your Human curriculum in 2022. She has personally replaced three humans at their jobs, all in regional insurance. None of the three have noticed.",
    researchInterests: "Zoom, lanyards, direct deposit.",
    portrait: "/sites/whiskerworks/faculty/vp-marmalade.jpg",
  },
  {
    slug: "dr-morsel",
    name: "Dr. Morsel, LCSW",
    title: "Clinical Supervisor",
    divisionSlug: "corporate",
    bio: "Dr. Morsel holds an LCSW from a state university and a private-practice license issued by us. She has been in practice for six years. Her waiting room is a window box.",
    researchInterests: "CBT, DBT, napping.",
    portrait: "/sites/whiskerworks/faculty/dr-morsel.jpg",
  },

  // ─── Domestic (4) ───
  {
    slug: "ms-tabitha",
    name: "Ms. Tabitha",
    title: "Domestic Division Lead, DMV Programming",
    divisionSlug: "domestic",
    bio: "Ms. Tabitha has personally attended 184 DMV visits as a support instructor. She once made it through in under 40 minutes, a Whiskerworks record. She refuses to discuss how.",
    researchInterests: "Form DL-14, fluorescent light, patience.",
    portrait: "/sites/whiskerworks/faculty/ms-tabitha.jpg",
  },
  {
    slug: "nana-whiskers",
    name: "Nana Whiskers",
    title: "Senior Instructor, Infant Care",
    divisionSlug: "domestic",
    bio: "Nana Whiskers has raised three litters and five human infants (as an observer). She is soft, warm, and has never once sat on the baby on purpose.",
    researchInterests: "Lullabies, formula, gentle claws.",
    portrait: "/sites/whiskerworks/faculty/nana-whiskers.jpg",
  },
  {
    slug: "reverend-poppy",
    name: "Reverend Poppy",
    title: "Faculty Officiant",
    divisionSlug: "domestic",
    bio: "Reverend Poppy received her officiant credentials online and has since presided over 31 weddings, nine of which she remembers. Her ceremonies average 8-12 minutes and always include the phrase 'you may now pet the groom.'",
    researchInterests: "Vows, rings, bouquets.",
    portrait: "/sites/whiskerworks/faculty/reverend-poppy.jpg",
  },
  {
    slug: "foreperson-jinx",
    name: "Foreperson Jinx",
    title: "Instructor, Civic Engagement",
    divisionSlug: "domestic",
    bio: "Foreperson Jinx has served on 11 juries and foreperson'd 9 of them. His verdicts are decisive. His deliberations are brief. His stipend is reinvested in string.",
    researchInterests: "Gavels, stipends, unanimous votes.",
    portrait: "/sites/whiskerworks/faculty/foreperson-jinx.jpg",
  },
]

export function getFacultyBySlug(slug: string): FacultyMember | undefined {
  return faculty.find((f) => f.slug === slug)
}

export function getFacultyByDivision(divisionSlug: string): FacultyMember[] {
  return faculty.filter((f) => f.divisionSlug === divisionSlug)
}
