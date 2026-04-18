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
    situation: "Wedding reception. The prime rib was a lot. The Pinot was more. Thirty seconds to the podium and you can feel it building.",
    beat: "You made the call. You committed to the toot. The G1 sealed it the second it hit, 13.9 PSI under the cummerbund.",
    outcome: "Toast ran four minutes. Landed every joke. Standing ovation. Nobody at the head table heard anything but laughter.",
    pullQuote: "The thing nobody tells you is that a confident toot sounds like silence. That's the whole bet.",
    illustration: "/sites/seeltite/scenario-best-man-toast.png",
    portraitSlug: "caldwell-briggs",
    customerName: "Caldwell Briggs",
    customerRole: "Construction Foreman, 23 yrs",
    statChips: [
      { label: "Seal PSI",        value: "13.9" },
      { label: "Duration",        value: "4m 12s" },
      { label: "Outcome",         value: "Gamble Won" },
      { label: "Toot Confidence", value: "HIGH" },
      { label: "Gamble Odds",     value: "3:1" },
      { label: "Payoff",          value: "Reputation Intact" },
    ],
  },
  {
    slug: "deposition-hour-4",
    title: "Deposition, Hour 4",
    situation: "Defense counsel has been reading back the same paragraph for forty minutes. The court reporter is tired. You're the witness and you need to not flinch.",
    beat: "You felt the first signal at the second coffee. You gambled at 14:48. The G1 caught it at 14.4 PSI and held for over an hour of follow-up questioning.",
    outcome: "Eye contact held. Answers clean. Opposing counsel moved on with no idea anything had happened.",
    pullQuote: "My attorney asked if I was okay on the break. I've never been more okay.",
    illustration: "/sites/seeltite/scenario-deposition.png",
    portraitSlug: "tamsin-kerrigan",
    customerName: "Tamsin Kerrigan",
    customerRole: "Deposed Witness, 11 yrs in litigation",
    statChips: [
      { label: "Seal PSI",        value: "14.4" },
      { label: "Duration",        value: "1h 22m" },
      { label: "Outcome",         value: "Gamble Won" },
      { label: "Toot Confidence", value: "MODERATE" },
      { label: "Gamble Odds",     value: "5:2" },
      { label: "Payoff",          value: "Transcript Clean" },
    ],
  },
  {
    slug: "live-weather-cutin",
    title: "Live On-Air Weather Cut-In",
    situation: "Ninety seconds of cross-talk with the anchor desk. Three cameras. Green screen behind you. You can feel it rising in the last count-down.",
    beat: "Cameras hot. You took the bet. The G1 sealed it in the opening eight seconds at 14.1 PSI.",
    outcome: "Full forecast clean. Smooth handoff to sports. The anchor desk was none the wiser.",
    pullQuote: "Television doesn't forgive interruption. The G1 forgives you for ninety seconds at a time.",
    illustration: "/sites/seeltite/scenario-weather-cutin.png",
    portraitSlug: "margaux-sanderling",
    customerName: "Margaux Sanderling",
    customerRole: "Local News Meteorologist",
    statChips: [
      { label: "Outcome",         value: "Gamble Won" },
      { label: "Toot Confidence", value: "HIGH" },
      { label: "Gamble Odds",     value: "4:1" },
      { label: "Payoff",          value: "Forecast Delivered" },
    ],
  },
  {
    slug: "first-date-tasting-menu",
    title: "First Date, Upscale Restaurant",
    situation: "Prix fixe tasting menu. Five courses in. The octopus had more chili oil than advertised and you're feeling every molecule.",
    beat: "Between the cheese and dessert you ran the math. You gambled. The G1 sealed it under the tablecloth.",
    outcome: "Conversation uninterrupted. Second date confirmed by text later that night.",
    pullQuote: "She said the evening felt effortless. I did not correct her.",
    illustration: "/sites/seeltite/scenario-first-date.png",
    portraitSlug: "kyle-brandt",
    customerName: "Kyle Brandt",
    customerRole: "Product Manager",
    statChips: [
      { label: "Outcome",         value: "Gamble Won" },
      { label: "Toot Confidence", value: "MODERATE" },
      { label: "Gamble Odds",     value: "3:1" },
      { label: "Payoff",          value: "Date Secured" },
    ],
  },
  {
    slug: "grandmother-eulogy",
    title: "Eulogy, Grandmother's Funeral",
    situation: "Lectern. 120 mourners. The hymn is done and you're up with six pages of prepared remarks.",
    beat: "Grief, Pinot (again — the family always pours Pinot), and the unexpected. You gambled halfway through the second page. The G1 held.",
    outcome: "Full emotional register maintained. The eulogy closed to an audible collective grief. The G1 held throughout.",
    pullQuote: "Grandma would've appreciated the discretion. She always did.",
    illustration: "/sites/seeltite/scenario-eulogy.png",
    portraitSlug: "asher-bloom",
    customerName: "Asher Bloom",
    customerRole: "Grandson / Eulogist",
    statChips: [
      { label: "Outcome",         value: "Gamble Won" },
      { label: "Toot Confidence", value: "MODERATE" },
      { label: "Gamble Odds",     value: "long shot" },
      { label: "Payoff",          value: "Family Dignity" },
    ],
  },
  {
    slug: "pta-gazebo-vote",
    title: "PTA Board Vote on the Gazebo Resolution",
    situation: "Elementary school auditorium. Folding chair. Forty minutes of debate on whether the gazebo should be Coastal Blue or Eggshell.",
    beat: "Minute 28. The pro-Eggshell faction started reading prepared remarks. Something had to give.",
    outcome: "Resolution passed Coastal Blue, 6-4. Not one gavel out of place.",
    pullQuote: "I held the gavel. I did not leave the room. That's the mandate of a PTA Board Chair.",
    illustration: "/sites/seeltite/scenario-pta-vote.png",
    portraitSlug: "linda-morrissey",
    customerName: "Linda Morrissey",
    customerRole: "PTA Board Chair",
    statChips: [
      { label: "Outcome",         value: "Gamble Won" },
      { label: "Toot Confidence", value: "HIGH" },
      { label: "Gamble Odds",     value: "2:1" },
      { label: "Payoff",          value: "Coastal Blue Wins" },
    ],
  },
  {
    slug: "dmv-window-3",
    title: "DMV Window 3, Third Hour",
    situation: "Form B-112 returned for the third time. The chair has taken on your shape. You've been clenching for 47 minutes.",
    beat: "The clerk stepped away for the supervisor. You gambled. The G1 earned its keep in the gap.",
    outcome: "Form finally accepted. License renewed. Three hours, no one the wiser.",
    pullQuote: "The DMV is where lesser protection reveals itself. The G1 was engineered for the DMV.",
    illustration: "/sites/seeltite/scenario-dmv.png",
    portraitSlug: "orson-pepperdine",
    customerName: "Orson Pepperdine",
    customerRole: "Small Business Owner",
    statChips: [
      { label: "Outcome",         value: "Gamble Won" },
      { label: "Toot Confidence", value: "RECKLESS" },
      { label: "Gamble Odds",     value: "coin flip" },
      { label: "Payoff",          value: "License Renewed" },
    ],
  },
  {
    slug: "school-play-narrator",
    title: "School Play, Narrator Role, Act II",
    situation: "You volunteered to narrate the third-grade production of Our Town. Act II is running long. Your daughter's in the front row.",
    beat: "Scene 4. You felt it. The narrator cannot leave the stage. You gambled and the G1 quietly did its job.",
    outcome: "Narration delivered. Your daughter proud. Other parents did not make eye contact — because you were on stage and they weren't.",
    pullQuote: "I have never told her. I will never tell her. That's what the G1 makes possible.",
    illustration: "/sites/seeltite/scenario-school-play.png",
    portraitSlug: "warren-duvall",
    customerName: "Warren Duvall",
    customerRole: "Father of Three",
    statChips: [
      { label: "Outcome",         value: "Gamble Won" },
      { label: "Toot Confidence", value: "MODERATE" },
      { label: "Gamble Odds",     value: "3:1" },
      { label: "Payoff",          value: "Dad of the Year" },
    ],
  },
]

export function getScenarioBySlug(slug: string): PreventionScenario | undefined {
  return scenarios.find((s) => s.slug === slug)
}
