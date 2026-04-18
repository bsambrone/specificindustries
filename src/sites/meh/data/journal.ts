export interface JournalEntry {
  slug: string
  title: string
  excerpt: string
  publishedDate: string
  author: string
  readingTime: string
  body: string[]
}

export const STAFF_WRITERS = ["Hollis Marchetti", "Eleanor Drew", "Paxton Vail"] as const

export const journalEntries: JournalEntry[] = [
  {
    slug: "on-the-humidifier-that-sighs",
    title: "On The 'Oh.' Humidifier",
    excerpt: "A winter spent in a bedroom of mild, periodic audible disappointment. What I came to understand, and what I did not.",
    publishedDate: "2026-02-14",
    author: "Hollis Marchetti",
    readingTime: "3 min read",
    body: [
      "I have lived with the 'Oh.' Humidifier for four months. It arrived in the first week of October, and I have not turned it off since. At twelve-minute intervals, regardless of the hour, it issues a soft, single-syllable exhalation into the corner of my bedroom. \"Oh.\" There is nothing else to it. There is never anything else to it.",
      "In the first week, I heard each one. I counted them, unintentionally, the way one counts train cars at a crossing. By the second week, I had begun to miss some of them, the way one eventually stops noticing a clock. By the third week, I no longer heard any of them, but I knew, at the edge of my attention, that they were occurring.",
      "What I came to understand is that the device is not making a statement. It is not commenting on my evening or my habits or the weather. It is making the sound a person makes when they read one mildly disappointing sentence in an otherwise unremarkable book. That sound, repeated every twelve minutes for four months, has a specific effect on a room. I have not yet decided whether the effect is good.",
      "The humidifier functions normally in every other respect. The air in the room is soft. I sleep well. I am writing this paragraph at 11:46 PM, and in approximately two minutes, the device will say oh. and I will, I think, hear it.",
    ],
  },
  {
    slug: "beige-all-the-way-down",
    title: "Field Notes: Seventeen Beige Mood Rings",
    excerpt: "An internal experiment. Seventeen rings, four colleagues, one unseasonably warm afternoon. Results were consistent.",
    publishedDate: "2026-01-22",
    author: "Eleanor Drew",
    readingTime: "4 min read",
    body: [
      "On a Thursday in early January, four members of the product team convened in the second-floor conference room for what was described, on the calendar, as an \"internal validation exercise.\" The objective: to wear seventeen Beige Mood Rings simultaneously, across all available fingers of the available hands, and to observe what happened. Nothing happened.",
      "We had, I suppose, expected nothing to happen. The product is calibrated to an emotional output of beige, and at no point in the development process has it done otherwise. Still, there is a question one has, quietly, when one works on a device like this, and the question is whether enough of the devices, worn at once, might collectively produce some minor deviation from the calibration. They do not.",
      "The four of us wore the rings for ninety minutes. At one point, a colleague consumed a cup of hot tea and then a glass of cold water in rapid succession, on the theory that physiological thermal shock might nudge the stones toward some unintended hue. The stones remained beige. At another point, we watched a short clip of a dog returning to its owner after a lengthy absence, on the theory that involuntary emotional response might do what physiological shock had not. The stones remained beige.",
      "At the end of the session, we removed the rings, returned them to their boxes, and went back to our desks. My colleague Paxton remarked, on the way out, that it had been a more restful ninety minutes than he had scheduled any other ninety minutes this month. I am inclined to agree.",
      "The Beige Mood Ring is, in my view, performing as described. This should not have been a question. It was, briefly, a question. It is no longer.",
    ],
  },
  {
    slug: "late-bell-postmortem",
    title: "We Waited By The Door",
    excerpt: "A holiday gathering. A caterer. The Late Bell in its natural setting. Three brief observations.",
    publishedDate: "2025-12-09",
    author: "Paxton Vail",
    readingTime: "3 min read",
    body: [
      "For the company's December gathering, we installed a Late Bell at the front of the office and instructed the caterer, who arrived at 5:14 PM, to ring it upon arrival. She did. None of us heard it. 0.8 seconds later, all of us heard it. The caterer had, by this point, taken approximately one step backward to reconsider, and was in the process of reaching for her phone when I opened the door.",
      "There was a moment, standing in the doorway, where her expression moved through a sequence — first confusion at the delay, then recognition, then a kind of quiet accommodation. She did not ask about the bell. I did not explain. She wheeled in the cart of canapés.",
      "Three observations from the evening. First: the 0.8-second interval behaves, in a real social context, exactly as the spec predicts. It is long enough to be noticed. It is short enough that recovery is not really possible. Second: the caterer, by the end of the night, had become our warmest advocate. She asked where she could purchase one. Third: several of our own team members also rang the bell, out of curiosity, on the way in. Every one of them waited.",
      "I am not sure what this suggests about the product. I think it suggests that the bell does a specific thing and that the specific thing is, in context, what one hopes it will be.",
    ],
  },
  {
    slug: "the-quiet-tuesday",
    title: "Why The Frames Go Blank On Tuesdays",
    excerpt: "A note on the design decision to leave one day of the week empty, and why the answer is not as interesting as the question.",
    publishedDate: "2025-11-18",
    author: "Hollis Marchetti",
    readingTime: "4 min read",
    body: [
      "The Motivational Frame cycles through 364 inspirational quotes over the course of a calendar year. On Tuesdays, it displays nothing. The glass goes quiet. The display returns to a soft gray. No default image loads.",
      "I am occasionally asked — by friends, by former colleagues, by one memorably persistent customer-service escalation — why Tuesday, specifically. The honest answer is that Tuesday was chosen early, at a Monday meeting, on the strength of a single sentence offered by Warren, which was: \"Most of the week has something going on. Tuesday is the day that has the least.\" Nobody disagreed, and nobody has disagreed since.",
      "The design decision to leave one day empty was somewhat more considered. We knew, early, that a digital frame which delivered inspiration every day would, in most households, gradually sink below the threshold of notice. Inspiration that is constant is not inspiration. We also knew that a frame which displayed an error message in place of a quote, once a week, would feel like a malfunction rather than a feature. The blank page, on a day of the week, is different. It reads as a choice.",
      "What we did not anticipate was that customers would, in meaningful numbers, report the blank Tuesdays as their favorite part of the product. One customer wrote to us to describe arranging her week around them. Another wrote to describe having quietly photographed the frame's Tuesday silence for several months, as a kind of small personal archive.",
      "We have no plans to change the behavior. We have no plans to offer other options. It remains Tuesday.",
    ],
  },
  {
    slug: "notes-from-the-warehouse",
    title: "Notes From The Warehouse",
    excerpt: "A short dispatch from an afternoon visit. Racks, packaging, a single quiet incident with an Absence Mister.",
    publishedDate: "2025-10-30",
    author: "Eleanor Drew",
    readingTime: "3 min read",
    body: [
      "I spent a Thursday afternoon at the warehouse, where our products are held between their manufacture and their dispatch. The building is a single high-ceilinged room somewhere off a state route I had not previously driven. There is one entrance. There is a small office at the back, staffed by two people who are, by all reports, extremely competent and extremely quiet.",
      "I had gone to observe the inventory of the Absence Mister, which had been experiencing a small but persistent rate of false activations during shipping. The theory was that the units' motion sensors were briefly triggering during loading, emitting a short mist, and then settling. The warehouse team had asked, politely, for a design review.",
      "What I saw when I arrived was one Absence Mister, on a rack at approximately chest height, misting gently into the empty aisle. I stood at the end of the aisle, still. It continued. I took one step forward. It stopped. I took one step back. It resumed. I watched it do this for several minutes, and then I turned and walked back to the office. The warehouse team nodded and said the device was performing as designed.",
      "I did not write up the unit for review. I left it on its rack. It was, I think, doing its job. The plants were fine.",
    ],
  },
]

export function getJournalEntryBySlug(slug: string): JournalEntry | undefined {
  return journalEntries.find((e) => e.slug === slug)
}
