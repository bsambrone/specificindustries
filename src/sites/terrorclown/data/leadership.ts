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
    name: "Cornelius P. Whistlethwaite III",
    title: "Founder & Chief Toymaker",
    bio: [
      "Cornelius inherited The Pennywhistle Play Company from his father, Cornelius Jr., who inherited it from the original Pennywhistle, Cornelius Sr., who founded the workshop in 1948 with a modest grant from the American Toymakers' Guild and a single porcelain kiln purchased at auction from a shuttered Pittsburgh doll works.",
      "Cornelius has never missed a day of work. He still hand-finishes the teeth on every thousandth Terror Clown™ that leaves the Millbrook floor, a tradition he began in 1973 and has described, in the one interview he has granted, as 'the best part of the job.'",
    ],
    portrait: "/sites/terrorclown/leadership/whistlethwaite.png",
  },
  {
    person: "brandon",
    name: "Ambrose Hollingsworth",
    title: "President & Head of Child Welfare",
    bio: [
      "Ambrose oversees safety, quality assurance, and the Children First promise that has been the cornerstone of every Pennywhistle product since 1948. He joined the company in 1987 after a decade at the American Academy of Childhood Companionship, where he chaired the committee on Doll Adjacency Hazards.",
      "Ambrose personally reviews every customer letter received by the Millbrook office. He has read over four million to date, and maintains a hand-updated index of commendations, complaints, and miscellaneous correspondence.",
    ],
    portrait: "/sites/terrorclown/leadership/hollingsworth.png",
  },
  {
    person: "jim",
    name: "Mortimer Crane",
    title: "VP of Experiential Products",
    bio: [
      "Mortimer is the creative force behind the Pennywhistle Experiences line, introduced in 1973 and expanded in every decade since. His catalog of staging environments — Under-Bed Lurker, Closet Observation Post, Sewer Grate Portal, Ceiling-Wire Night Watcher, Attic Whisper, and Basement Boiler Companion — is considered foundational reading among American companion-toy designers.",
      "Mortimer has been designing staging environments since 1962, when he was first asked to leave his childhood home. He has maintained a personal Pennywhistle Experience at each of his subsequent residences, and has published two modestly-received memoirs on the subject.",
    ],
    portrait: "/sites/terrorclown/leadership/crane.png",
  },
  {
    person: "sean",
    name: "Silas Pennywhistle",
    title: "Master Artisan & Keeper of the Kiln",
    bio: [
      "Silas is the last remaining direct descendant of the original Pennywhistle family, and the steward of the workshop's porcelain kiln room — the same room, and in large part the same equipment, that fired the first Terror Clown™ face in 1948. He oversees the enamel-finishing workshop and the Certified Toothsetter credentialing program.",
      "Silas speaks rarely, and smiles less. He declines all interview requests. He has been photographed only twice in his career, both times reluctantly, and both times for the Pennywhistle catalog.",
    ],
    portrait: "/sites/terrorclown/leadership/pennywhistle.png",
  },
]
