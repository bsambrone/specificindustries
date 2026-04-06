// src/sites/elderparty/data/events.ts

export interface CampaignEvent {
  slug: string
  name: string
  location: string
  date: string
  description: string
  image: string
}

export const events: CampaignEvent[] = [
  {
    slug: "miskatonic-rally",
    name: "Midnight Rally at Miskatonic University",
    location: "Arkham, MA",
    date: "The Next Friday the 13th",
    description: "Keynote by Cthulhu R'lyeh. Gates open at sundown. Bring candles. Free yard signs for the first 500 attendees. Parking available in the Orne Library lot — do not park in the restricted lot behind the chemistry building, regardless of what the attendant tells you.",
    image: "/sites/elderparty/event-miskatonic-rally.png",
  },
  {
    slug: "town-hall-waves",
    name: "Town Hall Beneath the Waves",
    location: "Innsmouth, MA",
    date: "The Summer Solstice",
    description: "Underwater town hall. Breathing apparatus provided or unnecessary, depending. Policy Director Dagon Whately will present the Deep Ones Job Creation Act. Refreshments served topside afterward for those who resurface.",
    image: "/sites/elderparty/event-town-hall-waves.png",
  },
  {
    slug: "portland-fourth",
    name: "Coastal Awakening Tour — Portland Stop",
    location: "Portland, ME",
    date: "Independence Day",
    description: "Independence Day celebration. Fireworks visible from several planes of existence. American flags on every tentacle. Live music, food trucks, and a midnight address by the candidate. Children welcome. Pets discouraged (they sense things).",
    image: "/sites/elderparty/event-portland-fourth.png",
  },
  {
    slug: "great-lakes-picnic",
    name: "Great Lakes Summoning Picnic",
    location: "Sandusky, OH",
    date: "The Next New Moon",
    description: "Family-friendly. Potato salad, three-legged races, minor incantations. The Elder Party believes in community, and what better way to build community than a lakeside gathering where the whole family can participate in democracy and light ritualism?",
    image: "/sites/elderparty/event-great-lakes-picnic.png",
  },
  {
    slug: "heartland-revival",
    name: "Heartland Revival & Voter Registration",
    location: "Des Moines, IA",
    date: "When the Corn Is Tallest",
    description: "Swing-state outreach. Free yard signs. Corn maze leads somewhere new this year. Volunteer Coordinator Hastur Olmstead will personally oversee voter registration. If you've already registered but can't remember doing so, that's normal.",
    image: "/sites/elderparty/event-heartland-revival.png",
  },
  {
    slug: "southern-bbq",
    name: "Southern Awakening BBQ",
    location: "Savannah, GA",
    date: "The Hottest Night of Summer",
    description: "Low country boil. The Elder Party's southern hospitality initiative. Come hungry. Spanish moss, string lights, live bluegrass, and a keynote by Campaign Chairman Marsh. The menu features locally sourced ingredients and one dish that 'tastes like the ocean remembering something.'",
    image: "/sites/elderparty/event-southern-bbq.png",
  },
  {
    slug: "desert-stars",
    name: "Desert Stars Convergence",
    location: "Roswell, NM",
    date: "When the Stars Are Right",
    description: "Joint event with The Illuminated Order. 'They came from the stars. So did we.' Stargazing, panel discussions on cosmic governance, and a rare joint appearance by party leadership and Order representatives. Telescopes provided. What you see through them is your responsibility.",
    image: "/sites/elderparty/event-desert-stars.png",
  },
  {
    slug: "grand-rally-dc",
    name: "The Grand Rally — Election Eve",
    location: "Washington, D.C.",
    date: "The Eve of the Election",
    description: "The National Mall. Every volunteer, every donor, every convert. The Awakening begins. This is the culmination of everything the Elder Party has worked toward — a gathering of historic scale on the eve of the election. The candidate will speak. The sky will listen.",
    image: "/sites/elderparty/event-grand-rally-dc.png",
  },
]
