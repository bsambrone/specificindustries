import type { Executive } from "./types"

export const executives: Executive[] = [
  {
    slug: "thornbury",
    name: 'Maximilian "Max" Thornbury III',
    title: "Founder & Chief Alignment Officer",
    credentials: "MBA Harvard '82, Six Sigma Black Belt, Level 7 Alignment Practitioner",
    bio: "Maximilian Thornbury III founded Strategic Void Consulting in 1987 with a singular conviction: that the most sophisticated organizations were not those that produced the most results, but those that could sustain the longest period of purposeful non-result while maintaining full stakeholder confidence. Drawing on his MBA from Harvard Business School and a decade-long tenure at a consulting firm he describes only as 'one of the large ones,' Max built Strategic Void from a single whiteboard session into a global enterprise serving over 400 Fortune 500 clients.\n\nMax is the originator of the Void Alignment Framework™, a proprietary methodology that identifies the productive gap between organizational intention and organizational output, and then widens it systematically. He holds a Six Sigma Black Belt (which he notes is 'technically for process improvement, but the principles invert beautifully') and is a certified Level 7 Alignment Practitioner under a credentialing body he founded in 1994.\n\nHe is the author of Leading from the Void: A Strategic Guide to Organizational Non-Outcome, which has sold over 340,000 copies across 18 languages and is required reading at seven business schools, none of which Max will name publicly. He resides in Greenwich, Connecticut, and has not attended a productive meeting since 1991.",
    quote:
      "The moment an organization stops accidentally producing results is the moment true alignment begins.",
    image: "/sites/strategicvoid/exec-thornbury.png",
    referencePerson: "bill",
  },
  {
    slug: "hawthorne-clyde",
    name: "Preston Hawthorne-Clyde",
    title: "Vice President, Synergy Operations",
    credentials: "MSc Organizational Dynamics, Wharton; Former McKinsey & Company (2 weeks)",
    bio: "Preston Hawthorne-Clyde joined Strategic Void Consulting in 2008 after a formative two-week engagement at McKinsey & Company, which he describes as 'more than enough time to understand the fundamentals.' He holds an MSc in Organizational Dynamics from the Wharton School, where his thesis — 'Synergy as a Noun: Toward a Taxonomy of Things That Sound Like Strategy' — was cited approvingly by a panel that did not read it in full.\n\nAs Vice President of Synergy Operations, Preston oversees a division that has grown from 3 to 47 employees since his arrival, none of whom can articulate what the division does in under four minutes. This, Preston explains, is the point. The Synergy Operations division is Strategic Void's internal proof of concept: an organizational unit that generates consistent headcount growth, robust internal communications, and a shared calendar density that would impress even the firm's most sophisticated clients — all without producing a measurable output.\n\nPreston is the co-creator of the Cross-Functional Alignment Lattice™ and holds the firm record for the most consecutive quarters of budget growth accompanied by the vaguest possible explanation for how the budget was spent. He was named to Consulting Magazine's 'Ones to Watch' list in 2019, which he frames as validation.",
    quote:
      "Synergy isn't something you create. It's something you schedule a meeting about.",
    image: "/sites/strategicvoid/exec-hawthorne-clyde.png",
    referencePerson: "brandon",
  },
  {
    slug: "pennington",
    name: "J. Rutherford Pennington",
    title: "Chief Disruption Evangelist",
    credentials: "PhD Theoretical Business (self-awarded), 3× TEDx Speaker",
    bio: "J. Rutherford Pennington came to Strategic Void Consulting in 2014 by way of a career he characterizes as 'a series of strategic pivots, each more disruptive than the last, none of which resulted in a stable organization.' He holds a PhD in Theoretical Business, which he awarded himself in 2011 following the completion of a 400-page personal manifesto that he considers 'equivalent to, and in several respects more rigorous than, a traditional doctoral program.' The credential has not been challenged in any formal proceeding.\n\nRutherford has delivered TEDx talks three times across two continents on topics including 'Disruption as a Posture,' 'What If Failure Was the Product All Along,' and 'Zero-to-One Thinking for Organizations That Started at Zero and Stayed There.' He has disrupted 14 industries by his own count, with outcomes in none of them that would satisfy a traditional definition of success — which, he argues, simply illustrates the inadequacy of traditional definitions.\n\nAs Chief Disruption Evangelist, Rutherford's mandate is to ensure that every Strategic Void client understands that disruption is not about building new things, but about thoroughly destabilizing existing ones and then departing before the stabilization question arises. He runs the firm's flagship Disruption Residency™ program and is currently developing a certification in Applied Ambiguity, pending creation of the certifying body.",
    quote:
      "If you haven't disrupted something by lunch, you're not trying hard enough.",
    image: "/sites/strategicvoid/exec-pennington.png",
    referencePerson: "jim",
  },
  {
    slug: "ashford-wexley",
    name: "Caldwell Ashford-Wexley",
    title: "Senior Director, Strategic Ambiguity",
    credentials: "BA English, Yale; Certified NLP Practitioner",
    bio: "Caldwell Ashford-Wexley joined Strategic Void in 2016 following a decade in corporate communications at three separate organizations, all of which he left 'on excellent terms, with extensive documentation confirming that no one was certain what had happened.' A Yale English graduate and Certified NLP Practitioner, Caldwell brings a linguist's precision to the art of saying nothing at all with the maximum possible number of words.\n\nAs Senior Director of Strategic Ambiguity, Caldwell oversees the firm's Communication Enhancement practice and is the sole author of the Strategic Void Corporate Communication Style Guide, a 240-page document that has been described by clients as 'comprehensive,' 'thorough,' and 'extremely difficult to act on.' He has developed over 200 proprietary email templates across 14 corporate registers, from 'Warm but Noncommittal' to 'Decisive-Sounding but Technically Reversible.'\n\nCaldwell is the inventor of the Strategic Ambiguity Matrix™, a two-by-two framework for assessing the optimal level of vagueness for any given organizational communication based on audience seniority, political sensitivity, and the proximity of a performance review cycle. The matrix has been licensed by 83 enterprise clients and integrated into four corporate communication platforms, where it continues to operate without anyone being fully certain of its function.",
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
