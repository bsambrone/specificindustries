import type { Executive } from "./types"

export const executives: Executive[] = [
  {
    slug: "thornbury",
    name: 'Maximilian "Max" Thornbury III',
    title: "Founder & Chief Alignment Officer",
    credentials: "MBA Harvard '82 · Six Sigma Black Belt · Level 7 Alignment Practitioner",
    bio: "Founded Strategic Void Consulting in 1987 with a singular conviction: that the most sophisticated organizations were not those that produced the most results, but those that could sustain the longest period of purposeful non-result while maintaining full stakeholder confidence. Built the firm from a single whiteboard session into a global enterprise serving over 400 Fortune 500 clients.",
    highlights: [
      { label: "Years at Strategic Void", value: "39 (Founder)" },
      { label: "Fortune 500 clients served", value: "400+" },
      { label: "Framework created", value: "C.H.A.O.S. Framework™" },
      { label: "Last productive meeting attended", value: "1991" },
      { label: "Certifying bodies founded", value: "1 (in 1994)" },
    ],
    publications: [
      "Leading from the Void: A Strategic Guide to Organizational Non-Outcome — 340,000 copies, 18 languages, required reading at 7 business schools (unnamed)",
    ],
    quote:
      "The moment an organization stops accidentally producing results is the moment true alignment begins.",
    image: "/sites/strategicvoid/exec-thornbury.png",
    referencePerson: "bill",
  },
  {
    slug: "hawthorne-clyde",
    name: "Preston Hawthorne-Clyde",
    title: "Vice President, Synergy Operations",
    credentials: "MSc Organizational Dynamics, Wharton · Former McKinsey & Company (2 weeks)",
    bio: "Joined Strategic Void in 2008 after a formative two-week engagement at McKinsey & Company, which he describes as 'more than enough time to understand the fundamentals.' His Wharton thesis — 'Synergy as a Noun: Toward a Taxonomy of Things That Sound Like Strategy' — was cited approvingly by a panel that did not read it in full.",
    highlights: [
      { label: "Division headcount growth", value: "3 → 47 employees" },
      { label: "Division output", value: "Not measurable (by design)" },
      { label: "Consecutive quarters of budget growth", value: "Firm record" },
      { label: "Framework co-created", value: "Cross-Functional Alignment Lattice™" },
      { label: "Recognition", value: "Consulting Magazine 'Ones to Watch' 2019" },
    ],
    quote:
      "Synergy isn't something you create. It's something you schedule a meeting about.",
    image: "/sites/strategicvoid/exec-hawthorne-clyde.png",
    referencePerson: "brandon",
  },
  {
    slug: "pennington",
    name: "J. Rutherford Pennington",
    title: "Chief Disruption Evangelist",
    credentials: "PhD Theoretical Business (self-awarded) · 3× TEDx Speaker",
    bio: "Came to Strategic Void in 2014 by way of a career he characterizes as 'a series of strategic pivots, each more disruptive than the last, none of which resulted in a stable organization.' Holds a PhD in Theoretical Business, self-awarded in 2011 following a 400-page personal manifesto he considers 'equivalent to, and in several respects more rigorous than, a traditional doctoral program.'",
    highlights: [
      { label: "Industries disrupted", value: "14 (outcomes in 0)" },
      { label: "TEDx talks delivered", value: "3 across 2 continents" },
      { label: "Program led", value: "Disruption Residency™" },
      { label: "In development", value: "Certification in Applied Ambiguity" },
      { label: "PhD status", value: "Self-awarded, unchallenged" },
    ],
    publications: [
      "TEDx: 'Disruption as a Posture'",
      "TEDx: 'What If Failure Was the Product All Along'",
      "TEDx: 'Zero-to-One Thinking for Organizations That Stayed at Zero'",
    ],
    quote:
      "If you haven't disrupted something by lunch, you're not trying hard enough.",
    image: "/sites/strategicvoid/exec-pennington.png",
    referencePerson: "jim",
  },
  {
    slug: "ashford-wexley",
    name: "Caldwell Ashford-Wexley",
    title: "Senior Director, Strategic Ambiguity",
    credentials: "BA English, Yale · Certified NLP Practitioner",
    bio: "Joined Strategic Void in 2016 following a decade in corporate communications at three organizations, all of which he left 'on excellent terms, with extensive documentation confirming that no one was certain what had happened.' Brings a linguist's precision to the art of saying nothing at all with the maximum possible number of words.",
    highlights: [
      { label: "Proprietary email templates created", value: "200+" },
      { label: "Corporate registers mastered", value: "14 (from 'Warm but Noncommittal' to 'Decisive-Sounding but Technically Reversible')" },
      { label: "Framework invented", value: "Strategic Ambiguity Matrix™" },
      { label: "Enterprise clients licensing the Matrix", value: "83" },
      { label: "Style guide pages authored", value: "240 ('comprehensive, thorough, and extremely difficult to act on')" },
    ],
    quote:
      "Clarity is the enemy of flexibility.",
    image: "/sites/strategicvoid/exec-ashford-wexley.png",
    referencePerson: "sean",
  },
]

export function getExecutiveBySlug(slug: string): Executive | undefined {
  return executives.find((e) => e.slug === slug)
}

export function getExecutiveSlugs(): string[] {
  return executives.map((e) => e.slug)
}
