import type { CaseStudy } from "./types"

export const grassmereAcoustics: CaseStudy = {
  slug: "grassmere-acoustics",
  company: "Grassmere Acoustics",
  industry: "Audio Equipment Manufacturing",
  location: "Lowell, MA",
  headline:
    "Mid-size manufacturer redesigns its entire office around Open Office Acoustic Amplification and reports a new level of ambient despair.",
  heroStat: {
    value: "+41dB",
    label: "Ambient Office Volume",
  },
  engagedArms: ["workspace"],
  sections: [
    {
      kind: "challenge",
      paragraphs: [
        "Grassmere Acoustics, a mid-size audio equipment manufacturer specializing in professional loudspeaker systems, occupies a 120,000-square-foot facility in Lowell, Massachusetts. By 2020, the company's office layout—traditional enclosed workspaces with private offices for executives and cubicles for support staff—was regarded as outdated and inefficient. The traditional layout was perceived as creating silos between departments, reducing collaboration, and limiting management's ability to observe and monitor employee activity.",
        "In late 2020, Grassmere Acoustics engaged Gristmill for a workspace optimization project. The company sought a layout that would 'maximize visibility and reduce physical barriers to communication.' Gristmill proposed a comprehensive redesign centered on open-office principles, with a particular emphasis on acoustic amplification—using the office environment itself as a tool to increase message propagation and reduce the psychological refuge of private space.",
      ],
    },
    {
      kind: "engagement",
      intro:
        "Gristmill deployed a comprehensive workspace transformation package: the Open Office Acoustic Amplification framework combined with Standing Desk Mandate to eliminate traditional furniture and Hot Desk Hunger Games to create organizational fluidity and minimize personal space ownership.",
      products: [
        "open-office-acoustics",
        "standing-desk-mandate",
        "hot-desk-hunger-games",
      ],
    },
    {
      kind: "timeline",
      phases: [
        {
          name: "Assessment & Design",
          description:
            "Over six weeks in Q1 2021, Gristmill conducted an acoustic assessment of the existing facility, measured current sound propagation patterns, and designed a new workspace architecture optimized for acoustic amplification. The design specified hard flooring (polished concrete), minimal sound-dampening materials, and open floor plans with minimal partitioning.",
        },
        {
          name: "Construction & Installation",
          description:
            "Throughout Q2 2021, Grassmere demolished interior walls, removed acoustic paneling, installed polished concrete flooring, and redesigned the layout into a fully open space. Traditional private offices and sound-dampened phone booths were eliminated. Standing desks were installed throughout the open floor. The transformation created a singular, open acoustic environment.",
        },
        {
          name: "Behavioral Integration",
          description:
            "Beginning in July 2021, Grassmere implemented Hot Desk Hunger Games, in which employees were assigned different desks daily based on a randomized rotating schedule. The system eliminated the concept of 'my desk' and ensured that no employee had a stable personal workspace. Combined with the acoustic amplification, the system created an environment in which conversation, phone calls, and collaborative noise propagated across the entire facility.",
        },
        {
          name: "Adaptation & Measurement",
          description:
            "By Q4 2021, Grassmere Acoustics had completed the full transition to the acoustic-amplification workspace design. Ambient noise measurements showed an increase from baseline 68dB (normal office background) to 109dB (equivalent to light machinery or power tools). Acoustic measurements also showed that private conversations were no longer possible in most areas of the office.",
        },
      ],
    },
    {
      kind: "metrics",
      stats: [
        {
          value: "+41dB",
          label: "Ambient Noise Increase",
        },
        {
          value: "109dB",
          label: "Peak Ambient Office Volume",
        },
        {
          value: "Zero",
          label: "Private Workspace Areas",
        },
        {
          value: "100%",
          label: "Monitored Open Floor Coverage",
        },
      ],
    },
    {
      kind: "quote",
      body: "The new office is loud. There's no escape from it. Every conversation, every phone call, every keystroke is audible to everyone. I expected people to complain. Instead, they stopped talking. The noise level is so extreme that private conversation became pointless. What emerged is a kind of ambient silence—everyone present, no one communicating. It's the loudest quiet I've ever experienced.",
      attribution: "Michael Ferraro",
      role: "Operations Manager, Grassmere Acoustics",
      photoSlug: "jason-kile",
    },
    {
      kind: "outcome",
      paragraphs: [
        "Grassmere Acoustics' open-office acoustic amplification design achieved its stated goal of 'maximizing visibility and reducing barriers.' It also achieved an unexpected outcome: the elimination of spontaneous collaboration and informal communication. The noise made concentrated work difficult and private conversation impossible. Employees adapted by withdrawing into headphone-mediated solitude, using the acoustic chaos as justification for isolation.",
        "By 2022, Grassmere Acoustics reported that employee engagement survey scores had declined measurably, but the company did not attribute this to the physical environment. Instead, management interpreted the decline as evidence of insufficient collaborative mindset among the workforce. Plans were being drafted to implement additional open-office intensification in 2023. The office had become a permanent expression of management distrust, embodied in architecture and acoustics.",
      ],
    },
  ],
}
