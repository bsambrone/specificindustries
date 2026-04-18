export interface Executive {
  slug: string
  name: string
  title: string
  bio: string
  quote: string
  image: string
  person: string
}

export const executives: Executive[] = [
  {
    slug: "phelps",
    name: "Dr. Garrett Phelps",
    title: "Chief Insufflation Officer",
    bio: "Dr. Phelps founded Snortables after spending 18 months in his garage asking a question no one else was brave enough to ask: 'What if we just bypassed the entire mouth?' He holds no relevant degrees but insists on the 'Dr.' prefix. His previous ventures include a failed meal-kit company and a brief, unsuccessful career in competitive eating.",
    quote: "Every great innovation was called 'unsafe' and 'please stop' at first.",
    image: "/sites/snortables/exec-phelps.png",
    person: "bill",
  },
  {
    slug: "whitfield",
    name: "Marcus Whitfield",
    title: "VP of Nostril Engineering",
    bio: "Marcus joined Snortables after a distinguished career in HVAC ductwork, which he claims is 'basically the same thing but for buildings.' He leads our Nostril Engineering division, a team of three people who spend their days measuring nasal passages and arguing about optimal particle sizes. He has never once questioned his career choices, at least not publicly.",
    quote: "The human nose has 400 olfactory receptors. We're only using 12 of them for food. That's a market inefficiency.",
    image: "/sites/snortables/exec-whitfield.png",
    person: "brandon",
  },
  {
    slug: "kowalski",
    name: "Darren Kowalski",
    title: "Head of Pulverization Sciences",
    bio: "Darren oversees all pulverization operations at Snortables, including the NasalMill™, three industrial wood chippers, and a blender he brought from home. Before joining the company, he worked in demolition, which he says 'really prepared me for what we do to food here.' He is the only team member who has been formally asked to smile less during the pulverization process.",
    quote: "People ask me if I feel bad about putting a Thanksgiving dinner in a wood chipper. I do not.",
    image: "/sites/snortables/exec-kowalski.png",
    person: "jim",
  },
  {
    slug: "nakamura",
    name: "Trevor Nakamura",
    title: "Director of Regulatory Avoidance",
    bio: "Trevor manages Snortables' relationship with regulatory bodies, which he describes as 'mostly one-sided.' He has drafted 47 responses to FDA inquiries, none of which have been sent. His legal strategy can be summarized as 'if we don't open the letters, they can't technically say we've been notified.' He previously worked in compliance, which he found too restrictive.",
    quote: "We prefer the term 'creatively compliant.'",
    image: "/sites/snortables/exec-nakamura.png",
    person: "sean",
  },
]
