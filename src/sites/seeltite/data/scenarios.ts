export interface StatChip {
  label: string
  value: string
}

export interface PreventionScenario {
  slug: string
  title: string
  situation: string
  beat: string
  outcome: string
  pullQuote: string
  illustration: string
  portraitSlug: string
  customerName: string
  customerRole: string
  statChips?: StatChip[]
}

export const scenarios: PreventionScenario[] = [
  {
    slug: "best-man-toast",
    title: "Best-Man Toast, T-minus 30s",
    situation: "Wedding reception. The bride's family has just finished dessert. The DJ is lowering the music. You are thirty seconds from the podium.",
    beat: "Two full glasses of Pinot, the prime rib, and six minutes of family anecdote already committed to memory. At 18:42:11, seal pressure rose to 13.9 PSI.",
    outcome: "The G1 held. The toast ran four minutes, landed every joke, and ended with a standing ovation. No one at the head table noticed anything unusual.",
    pullQuote: "I've never felt anything. That's the thing. You don't feel anything. You just keep talking.",
    illustration: "/sites/seeltite/scenario-best-man-toast.png",
    portraitSlug: "caldwell-briggs",
    customerName: "Caldwell Briggs",
    customerRole: "Construction Foreman, 23 yrs",
    statChips: [
      { label: "Seal PSI", value: "13.9" },
      { label: "Duration", value: "4m 12s" },
      { label: "Outcome", value: "Seal Held" },
    ],
  },
  {
    slug: "deposition-hour-4",
    title: "Deposition, Hour 4",
    situation: "Defense counsel has been reading back the same paragraph for 40 minutes. The court reporter is fading. You are the witness.",
    beat: "Coffee cup #3 at 14:17. The first pressure bump at 14:48. Full load at 15:02.",
    outcome: "Eye contact maintained. Answer delivered cleanly. Opposing counsel moved on to the next line of questioning without detecting anything.",
    pullQuote: "My attorney asked me afterward if I was okay. I told him I had never been more okay in my life.",
    illustration: "/sites/seeltite/scenario-deposition.png",
    portraitSlug: "tamsin-kerrigan",
    customerName: "Tamsin Kerrigan",
    customerRole: "Deposed Witness, 11 yrs in litigation",
    statChips: [
      { label: "Seal PSI", value: "14.4" },
      { label: "Duration", value: "1h 22m sustained" },
      { label: "Outcome", value: "Seal Held" },
    ],
  },
  {
    slug: "live-weather-cutin",
    title: "Live On-Air Weather Cut-In",
    situation: "Local news, 6:14 PM. Ninety seconds of cross-talk with the anchor desk. Green-screen behind you. Three-camera broadcast.",
    beat: "The producer counts down. Cameras go hot. Seal pressure rises to 14.1 PSI in the opening eight seconds.",
    outcome: "Full forecast delivered. Smooth handoff. The sports anchor noticed nothing.",
    pullQuote: "Television does not forgive interruption. Television does, however, forgive the Seel-Tite G1. It forgave me for ninety seconds and I will be forever grateful.",
    illustration: "/sites/seeltite/scenario-weather-cutin.png",
    portraitSlug: "margaux-sanderling",
    customerName: "Margaux Sanderling",
    customerRole: "Local News Meteorologist",
  },
  {
    slug: "first-date-tasting-menu",
    title: "First Date, Upscale Restaurant",
    situation: "Prix fixe tasting menu. Five courses in. The octopus arrived with more chili oil than expected.",
    beat: "Course six delivered. Seal engaged under the tablecloth at 20:38.",
    outcome: "Conversation uninterrupted. Second date secured.",
    pullQuote: "She said the evening felt effortless. I did not correct her.",
    illustration: "/sites/seeltite/scenario-first-date.png",
    portraitSlug: "kyle-brandt",
    customerName: "Kyle Brandt",
    customerRole: "Product Manager",
  },
  {
    slug: "grandmother-eulogy",
    title: "Eulogy, Grandmother's Funeral",
    situation: "Lectern. 120 mourners. The hymn has concluded. You have six pages of prepared remarks.",
    beat: "Seal pressure rose at the opening prayer and stayed elevated through the recitation of the obituary.",
    outcome: "Full emotional register maintained. The eulogy closed to a moment of audible collective grief. The G1 held throughout.",
    pullQuote: "Grandma would have appreciated the discretion. She always did.",
    illustration: "/sites/seeltite/scenario-eulogy.png",
    portraitSlug: "asher-bloom",
    customerName: "Asher Bloom",
    customerRole: "Grandson / Eulogist",
  },
  {
    slug: "pta-gazebo-vote",
    title: "PTA Board Vote on the Gazebo Resolution",
    situation: "Elementary school auditorium. Folding chair. Chair Linda Morrissey presiding. A forty-minute session on whether the gazebo should be painted Coastal Blue or Eggshell.",
    beat: "Minute 28. The pro-Eggshell faction began reading prepared remarks. Seal pressure climbed steadily for the next eleven minutes.",
    outcome: "The resolution passed (Coastal Blue, 6-4). No contribution to the discussion was compromised.",
    pullQuote: "I held the gavel. I did not leave the room. That is the mandate of a PTA Board Chair.",
    illustration: "/sites/seeltite/scenario-pta-vote.png",
    portraitSlug: "linda-morrissey",
    customerName: "Linda Morrissey",
    customerRole: "PTA Board Chair",
  },
  {
    slug: "dmv-window-3",
    title: "DMV Window 3, Third Hour",
    situation: "Form B-112 returned for the third time. The clerk has stepped away to consult with a supervisor.",
    beat: "The chair has conformed to your shape. You have been clenching for 47 minutes.",
    outcome: "Form accepted. Number called. License renewed. The G1 held across all three hours.",
    pullQuote: "The DMV is where ordinary protection reveals itself as insufficient. Seel-Tite was engineered for the DMV.",
    illustration: "/sites/seeltite/scenario-dmv.png",
    portraitSlug: "orson-pepperdine",
    customerName: "Orson Pepperdine",
    customerRole: "Small Business Owner",
  },
  {
    slug: "school-play-narrator",
    title: "School Play, Narrator Role, Act II",
    situation: "You volunteered to narrate the third-grade production of Our Town. Act II is running long. Your daughter is in the front row.",
    beat: "Act II, scene 4. Seal engagement began at 19:22 and persisted through the final monologue.",
    outcome: "Narration delivered. Daughter proud. Other parents did not make eye contact, but that is because you were on stage and they were not.",
    pullQuote: "I have never told her. I will never tell her. That is what the G1 makes possible — ordinary dignity, quietly preserved.",
    illustration: "/sites/seeltite/scenario-school-play.png",
    portraitSlug: "warren-duvall",
    customerName: "Warren Duvall",
    customerRole: "Father of Three",
  },
]

export function getScenarioBySlug(slug: string): PreventionScenario | undefined {
  return scenarios.find((s) => s.slug === slug)
}
