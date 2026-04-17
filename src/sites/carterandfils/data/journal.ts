export interface JournalEntry {
  slug: string
  title: string
  excerpt: string
  publishedDate: string
  author: string
  readingTime: string
  image: string
  body: string[]
}

export const journalEntries: JournalEntry[] = [
  {
    slug: "decanting-101-a-gentlemans-guide",
    title: "Decanting 101: A Gentleman's Guide",
    excerpt: "The proper vessel, the proper motion, the proper patience. A few words on a practice too often performed in haste.",
    publishedDate: "2025-09-12",
    author: "Archibald Whitford",
    readingTime: "4 min read",
    image: "/sites/carterandfils/journal-decanting.png",
    body: [
      "A bottle, once opened, has earned a moment. It has spent years — sometimes decades — in the cool, quiet custody of the cellar, and it should not be hurried from that state to the glass without the transitional grace of a proper decanting.",
      "Begin with a clean decanter. I cannot overstate this. Residue from a previous bottling, however faint, will intrude upon the new pour with an insistence that a well-trained palate cannot ignore. Rinse with warm water, dry fully, and allow the vessel to rest for a half hour at room temperature before use.",
      "The motion itself should be slow and continuous. A held breath, if you find it helpful. Tip the bottle at a shallow angle and allow the contents to travel the curve of the decanter's shoulder — not the bottom. This is where aeration begins, and aeration is the whole point.",
      "Allow the decanted bottle to stand for no less than fifteen minutes. A young vintage may require more. An older Grand Cru should be observed closely during this period; its character will sharpen and then settle, and the attentive host will pour at the moment of settling rather than before.",
      "A final word: never decant hastily. The bottle has waited for you. The moment is not yours to compress.",
    ],
  },
  {
    slug: "understanding-viscosity",
    title: "Understanding Viscosity: What the Numbers Actually Mean",
    excerpt: "A short primer on weight, season, and the conventions of Allegheny labeling.",
    publishedDate: "2025-07-28",
    author: "Étienne Carter",
    readingTime: "5 min read",
    image: "/sites/carterandfils/journal-viscosity.png",
    body: [
      "Every bottle from our cellar bears a pair of numbers on its label. These are not arbitrary. They are, in fact, among the most honest information a producer can offer the curious drinker, and I find it strange that more winemakers do not adopt the practice.",
      "The first number indicates the bottle's character in cooler conditions — a winter weight, if you like. A lower number means the wine will remain fluid and expressive even when the cellar is cold. A higher number suggests a wine that wants a little warmth before it speaks.",
      "The second number describes the bottle at temperature. This is where body and structure live. A 40, for example, is a classical middle-weight — enough to coat the glass, enough to linger, but not so heavy that it fatigues the palate. A 50 is heavier, older in spirit, meant for deliberate evenings. A 20 is modern and precise.",
      "The W between the two numbers stands for Winter. An older convention, but we keep it because it is traditional and because it is correct.",
      "There is nothing mysterious in this system. It is simply honest labeling. A wine should tell you how it intends to behave, and these numbers, taken together, do exactly that.",
    ],
  },
  {
    slug: "pairing-the-2019-allegheny-syrah",
    title: "Pairing the 2019 Allegheny Syrah with Classic American Motorsport",
    excerpt: "The right wine for the right engine. Notes on a weekend at Watkins Glen.",
    publishedDate: "2025-06-14",
    author: "Archibald Whitford",
    readingTime: "3 min read",
    image: "/sites/carterandfils/journal-motorsport-pairing.png",
    body: [
      "Certain wines reveal themselves in motion. The 2019 Allegheny Reserve Syrah is one of these. I spent a long weekend at Watkins Glen this past summer in the company of several friends and a small collection of bottles from the estate, and it is the Syrah that lingers.",
      "The wine pairs — if that is the right word — extraordinarily well with the sustained long-mileage of a weekend at a historic American circuit. It holds its composure through warm afternoons. It is expressive in the cooler hours after dusk. It does not fatigue.",
      "I would recommend this bottle for any weekend spent in the company of classical machinery. The pairing is less gustatory than temperamental. The wine and the circumstance share a certain steady, unhurried seriousness.",
      "A magnum is advisable if more than two are in attendance.",
    ],
  },
  {
    slug: "why-allegheny-shale-is-the-new-bordeaux",
    title: "Why Allegheny Shale Is the New Bordeaux",
    excerpt: "A geological argument for what the region has always known.",
    publishedDate: "2025-05-03",
    author: "Laurent Beaufort",
    readingTime: "6 min read",
    image: "/sites/carterandfils/journal-shale.png",
    body: [
      "The wine world looks to Bordeaux because Bordeaux has spent eight hundred years insisting on itself. This is fair. Tradition is a form of truth.",
      "But let us consider what Bordeaux actually has beneath its vines: gravel, clay, and a mild, well-tempered climate. This is a configuration that produces consistent wine. It does not, however, produce singular wine.",
      "The Allegheny region of western Pennsylvania sits atop a geological formation that is neither gravel nor clay, but something older and more interesting. The shale beds beneath our estate are layered, compressed, and saturated with a mineral presence that registers unmistakably in the finish of our reds. This is not a marketing phrase. It is what the glass tells you if you are willing to listen.",
      "What distinguishes great wine is not pleasantness but specificity. A Bordeaux red is a Bordeaux red. An Allegheny Syrah is an Allegheny Syrah — and it tastes like nowhere else on earth, because it grows on a formation that exists nowhere else in precisely this way.",
      "The press will catch up in time. The region already knows.",
    ],
  },
  {
    slug: "sulfites-additives-honest-winemaker",
    title: "Sulfites, Additives, and the Honest Winemaker",
    excerpt: "A plain-spoken note on what goes into a bottle, and what does not.",
    publishedDate: "2025-03-22",
    author: "Rémi Dumoulin",
    readingTime: "4 min read",
    image: "/sites/carterandfils/journal-additives.png",
    body: [
      "A bottle that leaves our cellar contains what it must contain to be what it is — no more, no less. This sounds obvious. It should be. In practice, it is not.",
      "There are additives in modern winemaking that do not serve the wine. There are also additives that do. The honest producer learns to distinguish between the two, and is prepared to explain his decisions to anyone who cares to ask.",
      "At Carter & Fils, we use small amounts of certain stabilizing compounds — detergents, dispersants, and a measured quantity of corrosion inhibitor — not because they flatter the wine but because they preserve its character over the long cellar-life the bottle will inevitably experience.",
      "I note these plainly on the bottle. I believe the drinker is entitled to this information, and I believe the estate is diminished by any pretense of omission. A well-made wine withstands scrutiny.",
      "If you have questions, ask them. I will answer.",
    ],
  },
  {
    slug: "a-note-on-proper-storage",
    title: "A Note on Proper Storage: Temperature, Light, and Drip",
    excerpt: "The cellar is a covenant. Honor it, and the bottle will repay you.",
    publishedDate: "2025-02-08",
    author: "Étienne Carter",
    readingTime: "3 min read",
    image: "/sites/carterandfils/journal-storage.png",
    body: [
      "A well-cellared bottle repays its owner. A poorly cellared one does not. The difference, in most cases, is a matter of simple attention.",
      "Temperature is the first concern. Our bottles prefer a stable 55–65 degrees Fahrenheit. Fluctuations of more than ten degrees within a day will accelerate oxidation, even through a well-seated closure. A basement shelf away from radiators and exterior walls is more than sufficient for most collections.",
      "Light is the second concern. Ultraviolet exposure degrades the wine's finer compounds. A dark cellar is a good cellar. A clear window is not.",
      "The third — and most underattended — concern is drip. A bottle stored upright for long periods may develop a slow weeping at the closure, particularly in warmer conditions. This is not a defect of the bottle; it is a signal that the storage is imperfect. Lay the bottle on its side. Keep the closure in contact with the wine. Check monthly.",
      "These habits compound. A well-stored cellar is not a project. It is a relationship.",
    ],
  },
]

export function getJournalBySlug(slug: string): JournalEntry | undefined {
  return journalEntries.find((e) => e.slug === slug)
}
