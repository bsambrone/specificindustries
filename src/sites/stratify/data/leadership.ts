export interface StratifyExecutive {
  slug: string
  name: string
  title: string
  bio: string
  quote: string
  image: string
  person: "bill" | "brandon" | "jim" | "sean"
}

export const executives: StratifyExecutive[] = [
  {
    slug: "stratton",
    name: "Buck Stratton",
    title: "Founder & Chief Elevation Architect",
    bio: "Discovered stratification while on a cross-country RV trip funded entirely by subordinate layer activity. Previously worked in \u2018an industry\u2019 for \u2018several years.\u2019 Claims to have invented the concept of Layer Density Optimization during a fever dream in Scottsdale. Speaks exclusively in motivational imperatives. Has been compared to \u2018a young Billy Mays with better posture.\u2019",
    quote: "I didn\u2019t build a company. I built a geometry.",
    image: "/sites/stratify/exec-stratton.png",
    person: "bill",
  },
  {
    slug: "worthington",
    name: "Chase Worthington",
    title: "Executive Vice President of Layer Density",
    bio: "Joined Stratify at Layer 1 and reached Apex Executive Node in 11 months \u2014 a record he set and then immediately retired. Known for his legendary recruitment weekends and standing-room-only parking lot seminars. His LinkedIn has 40,000 connections, all of whom are in his structure.",
    quote: "Every person you know is an untapped layer.",
    image: "/sites/stratify/exec-worthington.png",
    person: "brandon",
  },
  {
    slug: "leveraux",
    name: "Hank Leveraux",
    title: "Senior Director, Yield Amplification",
    bio: "Former middle manager who \u2018saw the architecture\u2019 and never looked back. Fond of saying \u2018I\u2019m just a regular guy who happened to build 14 subordinate layers.\u2019 Hobbies include mentoring, yield tracking, and converting casual conversations into onboarding opportunities.",
    quote: "People say it sounds too good to be true. I say it sounds too good to be employment.",
    image: "/sites/stratify/exec-leveraux.png",
    person: "jim",
  },
  {
    slug: "ascendant",
    name: "Cliff Ascendant",
    title: "Chief Momentum Officer",
    bio: "No one is quite sure when Cliff joined Stratify or what he did before. His official bio states he \u2018emerged from the layers fully formed.\u2019 Runs all Leadership Alignment Webinars. Speaks in a calm, measured tone that makes everything sound both reasonable and inevitable. Has a proprietary motivational framework he calls \u2018Ascendancy Dynamics\u2019 which he has never explained.",
    quote: "You don\u2019t join Stratify. Stratify was always there. You just finally noticed.",
    image: "/sites/stratify/exec-ascendant.png",
    person: "sean",
  },
]
