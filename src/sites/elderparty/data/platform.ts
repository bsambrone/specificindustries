// src/sites/elderparty/data/platform.ts

export interface PolicyPosition {
  slug: string
  title: string
  slogan: string
  description: string[]
  talkingPoints: string[]
  coalitionEndorser: string
  image: string
}

export const positions: PolicyPosition[] = [
  {
    slug: "education",
    title: "Education",
    slogan: "Expanding Minds Beyond Euclidean Limits",
    description: [
      "The Elder Party believes that America's youth deserve an education unbounded by the narrow constraints of three-dimensional thinking. Our plan mandates Miskatonic University curriculum standards in all public schools, introducing students to truths that have been suppressed by the educational establishment for centuries.",
      "Students will study from the Necronomicon alongside their standard textbooks. Knowledge that cannot be unlearned is the strongest foundation for our youth. Early results from pilot programs in Arkham show remarkable expansion of student perception — teachers report that graduates 'see things differently now,' which is the whole point.",
    ],
    talkingPoints: [
      "Mandatory Miskatonic curriculum standards in all K-12 public schools",
      "Federal funding for Necronomicon literacy programs",
      "Student exchange programs with institutions in R'lyeh and the Dreamlands",
      "Teacher certification in non-Euclidean mathematics by 2030",
    ],
    coalitionEndorser: "Mothers Against Euclidean Geometry",
    image: "/sites/elderparty/platform-education.png",
  },
  {
    slug: "national-security",
    title: "National Security",
    slogan: "R'lyeh Rising: A Stronger America From Below",
    description: [
      "America's defense infrastructure is limited by its insistence on existing entirely above sea level. The Elder Party's R'lyeh Rising initiative will raise the sunken city as a forward military installation, providing strategic reach across every ocean and several planes of existence that the current administration refuses to acknowledge.",
      "American flags will fly from every spire. Our troops will patrol corridors that predate human civilization. No adversary can compete with a military base that exists partially outside of conventional spacetime. This is not science fiction — it is national security policy for a nation ready to think bigger. Much bigger.",
    ],
    talkingPoints: [
      "Raise R'lyeh as a forward military installation with full American sovereignty",
      "Expand the Navy to include non-Euclidean vessel classifications",
      "Establish dimensional border security protocols",
      "American flags on every spire, tentacle, and cyclopean wall",
    ],
    coalitionEndorser: "The Arkham Neighborhood Watch",
    image: "/sites/elderparty/platform-security.png",
  },
  {
    slug: "healthcare",
    title: "Healthcare",
    slogan: "The Deep Restoration Initiative",
    description: [
      "Citizens who sleep near the coast report remarkable healing. The Elder Party will expand coastal dormitory access for all Americans and fund peer-reviewed research into the restorative properties of prolonged submersion. Early participants describe feeling 'fundamentally changed' and 'closer to something vast.'",
      "Side effects are temporary and mostly cosmetic. Some patients report webbed extremities, improved night vision, and a persistent sense of being watched, all of which our medical advisors classify as 'enhancements.' The Deep Restoration Initiative will reduce healthcare costs by replacing expensive treatments with the ocean's ancient, free, and slightly unsettling healing power.",
    ],
    talkingPoints: [
      "Coastal dormitory facilities in every state with a shoreline",
      "Federal research grants for submersion therapy studies",
      "Free 'Deep Restoration' screenings at community health centers",
      "Reclassification of oceanic physiological changes as 'wellness upgrades'",
    ],
    coalitionEndorser: "Fishermen United for Innsmouth",
    image: "/sites/elderparty/platform-healthcare.png",
  },
  {
    slug: "economy",
    title: "Economy",
    slogan: "Deep Ones Job Creation Act",
    description: [
      "America's workforce is limited by its insistence on hiring exclusively from the surface. The Deep Ones Job Creation Act opens guest-worker visa programs for entities from beneath the waves, creating millions of jobs in underwater infrastructure, deep-sea mining, and interdimensional logistics.",
      "Coastal economic zones will become the engine of American prosperity. Deep One workers bring skills that no human workforce can match — they don't need oxygen, they work 24-hour shifts, and their construction techniques have remained structurally sound for millions of years. American workers will train alongside them, learning methods that human engineering won't independently discover for centuries.",
    ],
    talkingPoints: [
      "Deep One guest-worker visa program for underwater infrastructure",
      "Coastal economic zones with preferential tax treatment",
      "Interdimensional trade agreements opening new markets",
      "Job retraining programs for workers transitioning to aquatic industries",
    ],
    coalitionEndorser: "Fishermen United for Innsmouth",
    image: "/sites/elderparty/platform-economy.png",
  },
  {
    slug: "energy",
    title: "Energy",
    slogan: "Non-Euclidean Energy Independence",
    description: [
      "The angles between dimensions contain more energy than every fossil fuel reserve on Earth combined. The Elder Party's energy plan harnesses these angles through proprietary extraction technology developed at Miskatonic University's Applied Geometry Department. The energy is clean, infinite, and only mildly sanity-eroding for workers within a 50-foot radius of extraction points.",
      "America will achieve total energy independence within one election cycle. No more dependence on foreign oil, no more debates about solar vs. wind. Dimensional energy is always available, requires no sunlight or wind, and the extraction facilities can be built anywhere — though they do tend to attract unusual wildlife and cause compasses to behave unpredictably.",
    ],
    talkingPoints: [
      "Dimensional angle extraction facilities in all 50 states",
      "Total energy independence within 4 years",
      "Zero carbon emissions (dimensional energy predates carbon)",
      "Worker sanity protection standards exceeding OSHA requirements",
    ],
    coalitionEndorser: "The Esoteric Taxpayers Alliance",
    image: "/sites/elderparty/platform-energy.png",
  },
  {
    slug: "housing",
    title: "Housing",
    slogan: "Innsmouth Revitalization Initiative",
    description: [
      "Affordable housing doesn't have to be a dream. The Innsmouth Revitalization Initiative opens America's most undervalued coastal real estate to families willing to undergo modest physiological changes. Homes in revitalized Innsmouth districts cost 80% less than comparable waterfront properties, with the small trade-off of gradually developing gills.",
      "The physiological changes are gradual, reversible (probably), and come with significant advantages: reduced heating costs (lower body temperature), no need for swimming lessons, and a deep sense of community with neighbors who share your new outlook. HOA fees cover communal tide pool maintenance and monthly group swims.",
    ],
    talkingPoints: [
      "Affordable waterfront homes at 80% below market rate",
      "Physiological adaptation assistance programs (federally funded)",
      "Innsmouth community revitalization grants for 30 coastal cities",
      "Gill development classified as a pre-existing condition (protected)",
    ],
    coalitionEndorser: "Fishermen United for Innsmouth",
    image: "/sites/elderparty/platform-housing.png",
  },
  {
    slug: "foreign-policy",
    title: "Foreign Policy",
    slogan: "The Esoteric Order Accords",
    description: [
      "NATO was built for a world that only recognized three spatial dimensions. The Esoteric Order Accords replace outdated alliance structures with a network of cosmic pacts binding signatory nations in shared dread and mutual non-aggression across all known planes of existence.",
      "Under the Accords, member nations gain access to dimensional intelligence sharing, non-Euclidean military technology, and the comfort of knowing that something much larger than any nation-state is watching over them. Permanently. The Accords have already been ratified by several entities that predate the concept of nationhood.",
    ],
    talkingPoints: [
      "Replace NATO with the Esoteric Order Accords",
      "Dimensional intelligence sharing with allied entities",
      "Cosmic non-aggression pacts enforceable across all planes",
      "Diplomatic recognition of pre-human civilizations",
    ],
    coalitionEndorser: "The Illuminated Order",
    image: "/sites/elderparty/platform-foreign-policy.png",
  },
  {
    slug: "civil-rights",
    title: "Civil Rights",
    slogan: "The Shoggoth Personhood Amendment",
    description: [
      "The Elder Party believes that civil rights must extend to all sentient entities regardless of dimensional origin, physical composition, or number of mouths. The Shoggoth Personhood Amendment guarantees equal protection under the law for beings who have contributed to this planet's development for far longer than humanity has existed.",
      "Shoggoths built the cities. Deep Ones maintain the coasts. The Mi-Go have been managing Earth's mineral resources since before mammals. It is long past time these entities received the legal recognition they deserve. The Amendment also establishes anti-discrimination protections for citizens undergoing voluntary or involuntary transformation.",
    ],
    talkingPoints: [
      "Constitutional amendment granting personhood to all sentient entities",
      "Anti-discrimination protections for transforming citizens",
      "Voting rights for entities residing on American soil (or beneath it)",
      "Workplace accommodation standards for non-humanoid employees",
    ],
    coalitionEndorser: "Demonic Possession Party",
    image: "/sites/elderparty/platform-civil-rights.png",
  },
]

export function getPositionBySlug(slug: string): PolicyPosition | undefined {
  return positions.find((p) => p.slug === slug)
}
