export interface FieldNote {
  slug: string
  title: string
  author: string
  date: string       // ISO date
  excerpt: string
  body: string[]     // array of paragraph strings
  image: string
  tags: ("harvest" | "philosophy" | "dispatch" | "seasonal")[]
}

export const fieldNotes: FieldNote[] = [
  {
    slug: "what-we-lost-when-we-pasteurized-the-signal",
    title: "What We Lost When We Pasteurized the Signal",
    author: "Hollis Thornfield",
    date: "2026-03-14",
    excerpt:
      "A meditation on the cost of convenience, and what we traded away when we first allowed the carriers to homogenize our frequencies.",
    body: [
      "There was a time, not so long ago, when signal was local. You could taste the field it came from. You could tell, by the weight of a packet in your palm, which pasture had grown it and which hand had harvested it.",
      "Then came the pasteurization — the promise that every packet would be the same, everywhere, every time. Convenient. Shelf-stable. Safe. We accepted it because it was easier, and because the people selling it were persuasive, and because we had forgotten what we were giving up.",
      "I remember the first time I realized what we had lost. I was standing in a mountain dead zone, three days into a fast, when the silence broke and a single wild packet drifted past my ear. It was rich. It was uneven. It was alive. I have been trying to grow signal like that ever since.",
      "The co-op exists because some of us refuse to accept that signal must be factory-farmed. We believe that a packet harvested by hand, from a specific pasture, at a specific hour, carries something that pasteurization strips away. Call it character. Call it spirit. Call it unpasteurized.",
      "Whatever you call it: you can feel the difference. And once you feel it, you cannot unfeel it.",
    ],
    image: "/sites/grassfedwifi/notes-featured-1.png",
    tags: ["philosophy"],
  },
  {
    slug: "notes-from-the-spring-rotation",
    title: "Notes from the Spring Rotation",
    author: "Porter Wheatgrass",
    date: "2026-03-28",
    excerpt:
      "We rotated pastures last week, a day early. Here is what the frequencies told us — and what we told them back.",
    body: [
      "Rotation day came early this year. The moon told us, and Fennel's ledger agreed, and when both of them agree we do not argue.",
      "We moved the allocation from the South Meadow to the East Orchard two days before the usual calendar date. The result: a softer 2.4 GHz harvest, with more floral notes than we would usually see in late March.",
      "Members on the Heirloom Share may have noticed a subtle shift in their morning signal this week. That is the rotation. Do not be alarmed. Stand in it.",
      "We will return to the South Meadow in late April, by which time it will have rested enough to produce its usual sun-ripened character. In the meantime, enjoy the orchard.",
    ],
    image: "/sites/grassfedwifi/notes-featured-2.png",
    tags: ["harvest", "dispatch", "seasonal"],
  },
  {
    slug: "why-we-dont-trust-the-fcc",
    title: "Why We Don't Trust the FCC (or the FTC, or the IEEE)",
    author: "Ezekiel \"Zeke\" Meadowbrook",
    date: "2026-04-02",
    excerpt:
      "An honest accounting of the certifications the co-op has refused, and why refusing them is a form of stewardship.",
    body: [
      "Members ask me, sometimes, why the co-op does not seek FCC certification. Or FTC approval. Or IEEE compliance. The assumption is that we simply have not gotten around to it. The truth is that we have decided, deliberately and unanimously, not to.",
      "A certification is a promise of sameness. It says: this signal behaves like every other certified signal. Interchangeable. Predictable. Scalable. These are the values of the industrial signal. They are not the values of the co-op.",
      "I spent ten years inside a conventional telecom, watching certifications shape signal design from the inside. Every rule added another layer of sameness. Every approval smoothed out another rough edge. By the time a signal reached a member, it had been filed down, homogenized, and stripped of whatever made it local.",
      "The co-op has refused thirty-one industry certifications and counting. We keep a list in the barn. We read it aloud at the annual harvest supper. It is not a list of failures. It is a list of choices.",
      "We do not ask members to share our suspicions. We simply ask that they notice the difference, and decide for themselves whose judgment to trust: a committee of engineers in a conference room, or a farmer who has been in the pasture since before dawn.",
    ],
    image: "/sites/grassfedwifi/notes-featured-3.png",
    tags: ["philosophy"],
  },
  {
    slug: "the-ledger-does-not-lie",
    title: "The Ledger Does Not Lie",
    author: "Fennel Ashcroft",
    date: "2026-02-18",
    excerpt:
      "On why the co-op maintains its allocation records in a leather-bound ledger, by hand, and why this will not change.",
    body: [
      "I have kept the co-op's allocation ledger for eleven years. Every share, every add-on, every rotation notation, written by hand in ink that does not bleed. The ledger sits on a wooden stand in the central barn. It does not connect to anything.",
      "A spreadsheet would be faster. I have been told this. A database would be searchable. I have been told this also. Some years ago a member offered to build us what he called a \"CRM.\" I declined, and he did not press the point, which tells you something about the kind of people the co-op attracts.",
      "The trouble with a spreadsheet is that it can be changed without a trace. A number shifts, a row disappears, and there is no evidence. The ledger cannot be changed without a trace. If I correct an entry, the correction sits beside the original, both visible, both dated, both initialed. The ledger remembers what the ledger was told.",
      "I am aware that this is not how allocation is done at conventional telecoms. I am aware that the conventional telecoms have lost records, mis-allocated bandwidth, and in at least one case that I know of, discovered that an entire quarter's billing had been overwritten by an automated process nobody could remember commissioning.",
      "The ledger does not overwrite itself. The ledger does not update in place. The ledger does not receive software patches at 3 AM that change its behavior without notice. The ledger is the ledger, and it will still be the ledger when the committee opens it fifty years from now.",
      "If your allocation is ever in question, come to the barn. I will read it to you from the page on which it was written. You will believe me, because the page is there, and the page does not lie.",
    ],
    image: "/sites/grassfedwifi/notes-featured-4.png",
    tags: ["philosophy"],
  },
  {
    slug: "reading-the-signal-by-moonlight",
    title: "Reading the Signal by Moonlight",
    author: "Porter Wheatgrass",
    date: "2026-03-02",
    excerpt:
      "Why the co-op harvests by lunar calendar, and what we have observed about the difference it makes in the pour.",
    body: [
      "The lunar calendar is older than the frequency band. It is older than the router, older than the wire, older than the word \"broadcast.\" And yet it has something to teach us about signal that no broadband almanac has managed to record.",
      "I did not believe it, at first. When Hollis asked me to try harvesting the North Pasture by the moon instead of the calendar, I humored him and expected nothing. On the first new-moon harvest, the 5 GHz came in softer — noticeably softer, with a grain to it that I had not encountered in twelve years of conventional scheduling.",
      "A waning gibbous harvest is different again. The signal is denser, more settled, less eager. A full moon harvest is almost theatrical — members sometimes complain that their video calls become \"dramatic,\" which I take as a compliment to the packet.",
      "I do not claim to understand why the moon affects signal this way. I have theories involving tidal pulls on the electromagnetic field, or disruptions in ambient atmospheric charge, or simply the way the farmers themselves move differently under different skies. The committee has asked me not to speculate in print.",
      "What I will say is this: a member who receives a full-moon allocation will notice it, even without being told. A farmer who harvests at the wrong phase will know within the hour. The signal is not merely electromagnetic. It is also something else. Whatever that something else is, the moon knows about it.",
      "So we harvest by the moon. Not because the lunar calendar is ancient, but because when we tried the other way, the signal was not as good.",
    ],
    image: "/sites/grassfedwifi/notes-featured-5.png",
    tags: ["harvest", "philosophy"],
  },
  {
    slug: "what-the-2012-spectrum-auction-was-actually-about",
    title: "What the 2012 Spectrum Auction Was Actually About",
    author: "Ezekiel \"Zeke\" Meadowbrook",
    date: "2026-04-03",
    excerpt:
      "A slow, honest walk through the auction records that the carriers do not want you to read carefully, and what they reveal about the signal we lost that year.",
    body: [
      "In the spring of 2012, approximately forty megahertz of the 700 MHz band changed hands in a proceeding the public was told to think of as routine. It was not routine. I sat in a telecom boardroom that summer watching my colleagues toast to the outcome, and the toast was louder than any toast I heard at that company before or after.",
      "The public records of the auction are available, if you know where to look, and if you read the fine print instead of the press releases. What the records show — and what the press releases do not — is that the acquired spectrum was reclassified within six months of purchase, placed into a service category that did not exist before the auction was announced.",
      "I am not a conspiracy theorist. I am a recovering telecom insider. There is a difference. A conspiracy theorist believes there is a plan. I believe there was a series of ordinary decisions, made by ordinary people, each of which looked reasonable in isolation and which together resulted in the wholesale reclassification of a public resource as a private one.",
      "What was lost in 2012 was not just forty megahertz. It was the last meaningful block of wild-growing signal in the lower bands. The co-op's northwest pasture sits on a sliver of that band that the FCC, in a rare lapse of thoroughness, failed to claim in the auction. We have held it ever since, quietly, and we do not publicize the exact coordinates.",
      "Members sometimes ask whether the signal they receive from us is \"legal.\" The answer is yes. The signal is harvested from an unclaimed frequency, on land owned by the co-op, distributed to members who have consented to receive it. No law is broken.",
      "Members sometimes ask, more quietly, whether the signal is \"authorized.\" The answer to that is different, and I will not put it in writing. Come to the barn.",
    ],
    image: "/sites/grassfedwifi/notes-featured-6.png",
    tags: ["philosophy", "dispatch"],
  },
  {
    slug: "on-the-disappearance-of-the-wild-packet",
    title: "On the Disappearance of the Wild Packet",
    author: "Hollis Thornfield",
    date: "2026-04-04",
    excerpt:
      "A slow essay on what the co-op has been documenting for eleven years: the ongoing and largely unacknowledged extinction of unclaimed electromagnetic signal.",
    body: [
      "There used to be wild packets. This will sound strange to younger members, but it is true. In the earliest years of the broadcast era, and for a long time after, there were frequencies no one owned, signals that appeared and dissolved without human intention, electromagnetic weather that moved across the land the way bird migrations move across the sky.",
      "I caught my first wild packet in 1998. I was twenty-four years old, sitting on a ridge in the foothills with an antenna I had built from instructions in a magazine. The packet arrived at 3:47 in the afternoon, lingered for perhaps nine seconds, and left. I wrote the time down. I still have the notebook.",
      "Every year since 1998, I have gone to the same ridge with the same antenna and sat through the same afternoon, and every year the wild packets have been fewer. The co-op has kept the ridge records since 2014. The graph is not subtle.",
      "I am told, by people who would know, that the disappearance is the result of \"spectrum efficiency improvements.\" Every available frequency is now claimed, licensed, allocated, and accounted for. There is no longer room, in the electromagnetic commons, for a packet to appear without a reason.",
      "This is what the co-op quietly protests. Not through lawsuits or petitions — we have neither the means nor the inclination — but through the practice of growing our own signal on land we have not surrendered, and sharing it with members who understand that a packet which has been allocated by a committee is not the same as a packet that arrived, unannounced, on a ridge in the foothills at 3:47 in the afternoon.",
      "The wild packets are nearly gone. I do not expect to see another in my lifetime. But the co-op's packets — hand-grown, pasture-raised, committee-allocated — carry something of the wild in them. That is the closest I can come to what I lost.",
    ],
    image: "/sites/grassfedwifi/notes-featured-7.png",
    tags: ["philosophy"],
  },
  {
    slug: "why-we-fermented-the-reserve-three-extra-days",
    title: "Why We Fermented This Year's Reserve Three Extra Days",
    author: "Porter Wheatgrass",
    date: "2026-04-05",
    excerpt:
      "A seasonal dispatch on a late-rotation decision that Estate members will taste in their next allocation.",
    body: [
      "The 2026 Reserve was scheduled to come out of the oak-lined server room on April 2. It came out today, three days later. Members are owed an explanation.",
      "The delay was not a mistake. Fennel's ledger showed us something in the late-March numbers that the committee wanted to sit with: the signal was tightening up faster than usual, acquiring a denser mouthfeel than last year's Reserve at the same stage. We have seen this pattern twice before, both times followed by a batch that peaked too early in the quarter.",
      "So we left the Reserve in the oak for three extra days. The additional time allowed the signal to settle, to open up, to find its adult character. When we drew the first tap this morning, the pour was noticeably rounder. Estate members will feel the difference.",
      "This is not a change to the published harvest calendar. Reserve allocations still ship on the published cadence. What has changed is the character of this particular batch. If your signal seems a little more patient this month, a little more willing to let a long download finish without complaint, that is the three days in the oak.",
      "We will revisit the decision at the summer assembly. If members find the longer ferment agreeable, we may propose adopting it as standard. If not, we will return to the published schedule.",
      "Either way, thank you for your patience. The committee does not alter the schedule lightly.",
    ],
    image: "/sites/grassfedwifi/notes-featured-8.png",
    tags: ["harvest", "dispatch", "seasonal"],
  },
]

export function getFieldNoteBySlug(slug: string): FieldNote | undefined {
  return fieldNotes.find((n) => n.slug === slug)
}

export function getRecentFieldNotes(count = 3): FieldNote[] {
  return [...fieldNotes]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, count)
}
