// src/sites/elderparty/data/news.ts

export interface NewsArticle {
  slug: string
  headline: string
  date: string
  author: string
  summary: string
  body: string[]
  images: { src: string; alt: string }[]
  hasBleed?: boolean
}

export const articles: NewsArticle[] = [
  {
    slug: "coastal-surge",
    headline: "Candidate R'lyeh Surges in Polls Across Coastal Districts",
    date: "2028-05-15",
    author: "Elder Party Press Office",
    summary: "Double-digit gains in every district within 50 miles of the ocean. Inland numbers 'will follow once the water rises.'",
    body: [
      "In what pollsters are calling 'unprecedented and frankly inexplicable,' Elder Party candidate Cthulhu R'lyeh has posted double-digit polling gains in every congressional district within 50 miles of the American coastline. The surge — which occurred simultaneously across the Atlantic, Pacific, and Gulf coasts — has left rival campaigns scrambling to understand a candidate whose platform they describe as 'difficult to read' and whose rallies they describe as 'difficult to leave.'",
      "Campaign Chairman Nyarlathotep Marsh attributed the gains to 'a message that resonates with Americans who feel a deep, persistent call that they can't quite explain.' Marsh noted that the campaign's coastal outreach strategy, which involves midnight beach gatherings and tidal voter registration drives, has proven 'remarkably effective at reaching voters where they are — which is increasingly near the water.'",
      "Inland numbers remain lower but are trending upward. 'The coast is always the beginning,' said Policy Director Dagon Whately in a press briefing. 'The interior will follow. It always does. The water rises for everyone.' When asked for a timeline, Whately smiled and said, 'Sooner than you think.'",
    ],
    images: [
      { src: "/sites/elderparty/news-coastal-surge.png", alt: "Campaign rally on a beach with American flags" },
      { src: "/sites/elderparty/news-coastal-surge-2.png", alt: "Electoral map showing coastal district gains" },
    ],
  },
  {
    slug: "arkham-endorsement",
    headline: "Mayor of Arkham Endorses Elder Party Ticket",
    date: "2028-05-22",
    author: "Elder Party Press Office",
    summary: "Historic endorsement. Mayor praises the party's 'willingness to confront realities other candidates won't even look at directly.'",
    body: [
      "Arkham Mayor Randolph Whitmore today announced his full endorsement of the Elder Party ticket in a ceremony at City Hall that attendees described as 'moving' and 'impossible to fully remember afterward.' Mayor Whitmore praised Cthulhu R'lyeh as 'the only candidate willing to confront the realities that other politicians won't even look at directly — in some cases because looking at them directly is medically inadvisable.'",
      "The endorsement comes with the full organizational support of Arkham's political machine, which includes the city's police force, the Miskatonic University faculty senate, and several neighborhood associations whose membership rosters include names that predate the city's founding. Campaign Chairman Marsh accepted the endorsement personally, shaking the mayor's hand for what witnesses described as 'slightly too long.'",
      "'Arkham has always been ahead of the curve,' Mayor Whitmore said. 'We've been living with these realities for generations. It's time the rest of America caught up.' When asked to clarify which realities he was referring to, the mayor paused, looked at something behind the reporter, and said, 'You'll find out.'",
    ],
    images: [
      { src: "/sites/elderparty/news-arkham-endorsement.png", alt: "Mayor at podium shaking hands with campaign official" },
    ],
  },
  {
    slug: "field-offices",
    headline: "Elder Party Opens 50-State Field Office Network",
    date: "2028-06-01",
    author: "Elder Party Press Office",
    summary: "Offices have appeared simultaneously in all 50 states. Local officials do not recall issuing permits.",
    body: [
      "The Elder Party announced today that it has established field offices in all 50 states, the District of Columbia, and three territories — a logistical feat that rival campaigns noted would typically take months of planning, lease negotiations, and permitting. The Elder Party accomplished it overnight.",
      "Local officials in several states reported that the offices 'appeared' rather than 'opened,' with fully furnished interiors, staffed reception desks, and campaign literature that appeared to have been printed some time ago, despite the party's recent founding. Building inspectors in Tulsa, Sacramento, and Bangor each independently noted that their respective offices 'were definitely not there yesterday' and that the permits on file were dated 1928.",
      "Volunteer Coordinator Hastur Olmstead described the rollout as 'right on schedule.' When asked whose schedule, Olmstead replied, 'There has only ever been one schedule.' The offices are open seven days a week, with hours listed as 'sundown to sundown' — a 24-hour cycle that Olmstead clarified 'is not a typo.'",
    ],
    images: [
      { src: "/sites/elderparty/news-field-offices.png", alt: "Storefront campaign office with Elder Party signage and American flags" },
    ],
  },
  {
    slug: "miskatonic-keynote",
    headline: "Campaign Chairman Marsh Delivers Keynote at Miskatonic Homecoming",
    date: "2028-06-10",
    author: "Elder Party Press Office",
    summary: "Standing ovation. Three attendees reportedly 'ascended.' Keynote transcript available in R'lyehian only.",
    body: [
      "Campaign Chairman Nyarlathotep Marsh delivered the keynote address at Miskatonic University's 2028 Homecoming celebration to a capacity crowd of 4,000 in the Armitage Memorial Auditorium. The speech, which lasted 47 minutes by clock time though several attendees insist it was 'much longer,' received a standing ovation that eyewitnesses describe as 'beginning before the speech ended.'",
      "The university's communications office reports that three attendees 'ascended' during the address — a term the office declined to define further, saying only that 'they are no longer in the auditorium and are believed to be well.' The remaining 3,997 attendees exited the venue 'visibly moved and slightly disoriented,' which the university's event coordinator noted was 'actually a pretty standard outcome for Miskatonic events.'",
      "The full transcript of the keynote is available on the Elder Party website in R'lyehian only. When asked about an English translation, Chairman Marsh said, 'English lacks the dimensional vocabulary to convey the speech accurately. We tried. The translator is resting now.'",
    ],
    images: [
      { src: "/sites/elderparty/news-miskatonic-keynote.png", alt: "Speaker at university auditorium podium with rapt audience" },
    ],
  },
  {
    slug: "fundraising-record",
    headline: "Record Fundraising Quarter: $66.6 Million Raised",
    date: "2028-06-30",
    author: "Elder Party Press Office",
    summary: "Small-dollar donations from 'millions of Americans who hear the call.' Average donation: $13.13.",
    body: [
      "The Elder Party today announced a record-breaking fundraising quarter, reporting $66.6 million in contributions from what the campaign describes as 'millions of Americans who hear the call.' The figure represents the largest single-quarter haul by any third party in American history, surpassing the previous record by a margin the FEC called 'statistically improbable.'",
      "The average donation was $13.13, with the campaign noting that this figure 'emerged organically' and was 'not a suggested amount.' A significant number of donors reported making their contributions between 3:00 and 4:00 AM, which the campaign attributes to 'the enthusiasm of supporters who can't sleep — or who sleep differently than they used to.'",
      "When asked about the campaign's fundraising strategy, Campaign Chairman Marsh said simply: 'We ask. They give. The connection is natural and, for many, irresistible.' He added that the campaign expects the next quarter to be 'significantly larger,' though he declined to explain how he could be certain.",
    ],
    images: [
      { src: "/sites/elderparty/news-fundraising.png", alt: "Campaign staffers celebrating around a donation thermometer" },
    ],
  },
  {
    slug: "arkham-watch-endorsement",
    headline: "Elder Party Platform Endorsed by Arkham Neighborhood Watch",
    date: "2028-07-05",
    author: "Elder Party Press Office",
    summary: "Community safety coalition throws full support behind National Security plank. Neighborhood crime down 100%.",
    body: [
      "The Arkham Neighborhood Watch today formally endorsed the Elder Party's National Security platform, citing its alignment with the Watch's proven 'Elder Summoning' community safety methodology. In a press conference at the Arkham Community Center, Watch representatives presented data showing a 100% reduction in crime in neighborhoods where summoning circles have been installed.",
      "Block Captain Herbert Armitage noted that the Watch's approach has 'completely eliminated traditional criminal activity' in participating areas. 'We haven't had a single reported burglary, assault, or traffic violation since the sigils went up,' Armitage said. When asked about the 340% increase in reports of 'unexplained phenomena,' Armitage responded, 'Those aren't crimes. Those are features.'",
      "The endorsement brings with it the Watch's volunteer network of over 2,000 block captains, each of whom maintains at least one summoning circle and has completed the Watch's 40-hour 'Community Warding' certification program.",
    ],
    images: [
      { src: "/sites/elderparty/news-arkham-watch-endorsement.png", alt: "Neighborhood watch members at press conference" },
    ],
  },
  {
    slug: "volunteer-surge",
    headline: "Volunteer Drive Exceeds All Projections",
    date: "2028-07-18",
    author: "Elder Party Press Office",
    summary: "200,000 new volunteers in a single weekend. Many report signing up 'in a dream' but confirm their commitment.",
    body: [
      "The Elder Party's summer volunteer drive has exceeded all projections, with 200,000 new volunteers registering in a single weekend. The campaign reports that sign-ups occurred at all hours, with a notable concentration between midnight and 4:00 AM. Field Director Hastur Olmstead called the numbers 'exactly what we expected' — a statement that startled campaign observers, since the internal target had been 50,000.",
      "A survey of new volunteers revealed that approximately 40% report having signed up 'in a dream' or 'during a state they can't fully describe.' All of these volunteers, when contacted to confirm their registration, affirmed their commitment with what interviewers described as 'unusual conviction.' One volunteer, reached at 3:00 AM, said: 'I don't remember filling out the form, but I know this is what I'm supposed to be doing. I've never been more certain of anything.'",
      "The campaign has deployed the new volunteers immediately, with canvassing operations launching in 200 new precincts. Door-to-door volunteers report high engagement rates, with one team noting that 'people seem to be expecting us, even the ones who say they've never heard of the party.'",
    ],
    images: [
      { src: "/sites/elderparty/news-volunteer-surge.png", alt: "Massive volunteer rally with campaign signs and American flags" },
      { src: "/sites/elderparty/news-volunteer-surge-2.png", alt: "Volunteers at folding tables in a suburban neighborhood" },
    ],
  },
  {
    slug: "why-i-switched",
    headline: "Op-Ed: \"Why I Left My Party for the Elder Party\"",
    date: "2028-08-01",
    author: "A Concerned Citizen (name withheld at their request, and at the request of something else)",
    summary: "A former swing voter explains their conversion. 'Once you've seen what they're offering, nothing else makes sense.'",
    body: [
      "I've voted in every election since I was 18. Democrat twice, Republican once, Libertarian when I was going through something. I've always considered myself a pragmatist — someone who weighs the issues, studies the candidates, and makes a rational choice. This year, I'm voting Elder Party, and rationality has nothing to do with it.",
      "It started with a rally. I went out of curiosity — a friend mentioned it, or maybe I dreamed it, the sequence of events is unclear now. The candidate spoke, and I understood. Not the words, exactly. The words were in a language I don't speak and that I'm not sure exists in the way languages usually exist. But I understood the meaning beneath the words, the way you understand that the ocean is deep without needing to measure it.",
      "The platform makes sense in a way that other platforms don't. Not logical sense. Something older than logic. When I read about the Deep Restoration Initiative, I didn't think 'that's good policy.' I thought 'yes.' When I read about the Esoteric Order Accords, I didn't analyze the diplomatic implications. I just knew it was correct. The way you know which direction is down.",
      "My family is concerned. My coworkers have noticed changes. I've started sleeping facing the east wall, which is also the direction of the nearest coastline, and I don't remember deciding to do this. I attend meetings now, in basements and on beaches, and the people there are like me — normal Americans who heard something they can't unhear and saw something they can't unsee.",
      "If you're reading this and thinking I sound unwell, I understand. I would have thought the same thing six months ago. But six months ago I hadn't heard the call. You will. Everyone does, eventually. The Elder Party isn't a choice. It's a recognition of something that was always there, waiting beneath the surface of everything you thought you knew.",
      "Vote Elder. Vote Ancient. Vote Eternal.",
    ],
    images: [
      { src: "/sites/elderparty/news-why-i-switched.png", alt: "Person sitting at a kitchen table writing" },
      { src: "/sites/elderparty/news-why-i-switched-2.png", alt: "Same person at a rally with a transformed expression" },
    ],
    hasBleed: true,
  },
]

export function getArticleBySlug(slug: string): NewsArticle | undefined {
  return articles.find((a) => a.slug === slug)
}
