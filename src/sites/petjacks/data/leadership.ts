export interface Leader {
  person: "bill" | "brandon" | "jim" | "sean"
  name: string
  title: string
  bio: string[]
  portrait: string
}

export const leaders: Leader[] = [
  {
    person: "bill",
    name: "Callum Wren",
    title: "CEO & Founder",
    bio: [
      "Callum founded Petjacks in 2022 after watching his own cat gaze wistfully out a bedroom window and deciding, then and there, that the sky belonged to all of us. He spent the next eighteen months assembling a small team of pet lovers and propulsion hobbyists who shared his vision.",
      "Callum still tests every new jetpack model personally — with his own pets*, and only in our controlled Ohio facility.",
    ],
    portrait: "/sites/petjacks/leadership/wren.png",
  },
  {
    person: "brandon",
    name: "Marshall Pike",
    title: "Chief Propulsion Officer",
    bio: [
      "Marshall leads our propulsion engineering team, overseeing everything from thrust calibration to harness ergonomics. Before Petjacks, he spent a decade in aerospace at two of the industry's most celebrated startups, where his colleagues remember him as 'the one who actually read the safety envelope*.'",
      "Marshall is a devoted dog dad to Biscuit Jr. — whose father Biscuit was Marshall's first personal Pupjet tester.",
    ],
    portrait: "/sites/petjacks/leadership/pike.png",
  },
  {
    person: "jim",
    name: "Desmond Hollis",
    title: "Chief Veterinary Officer*",
    bio: [
      "Desmond directs our Chief Veterinary Office, advising on species-specific harness fitting, pre-flight wellness protocols, and post-flight recovery care. Desmond brings a warm and holistic sensibility to everything Petjacks does.",
      "Desmond has been an enthusiastic amateur animal caretaker for over twenty years and is currently working toward a veterinary technician certification.",
    ],
    portrait: "/sites/petjacks/leadership/hollis.png",
  },
  {
    person: "sean",
    name: "Rafferty Shaw",
    title: "Chief Safety Officer",
    bio: [
      "Rafferty oversees Petjacks' comprehensive safety program, including our quarterly internal audit, the Safety Record disclosure process, and our industry-leading* Liability Waiver Bundle product line.",
      "Rafferty came to Petjacks from a large consumer-goods conglomerate where he spent eight years quietly heading their Recalls division.",
    ],
    portrait: "/sites/petjacks/leadership/shaw.png",
  },
]
