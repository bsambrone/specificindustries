// src/sites/elderparty/data/donate.ts

export interface DonationTier {
  slug: string
  name: string
  amount: string
  reward: string
  tone: string
}

export const tiers: DonationTier[] = [
  {
    slug: "supporter",
    name: "Supporter",
    amount: "$13",
    reward: "Digital 'I Stand With The Elder Party' badge",
    tone: "Entry level, earnest",
  },
  {
    slug: "patriot",
    name: "Patriot",
    amount: "$31",
    reward: "Bumper sticker mailed to your address (which we already know)",
    tone: "Slightly unsettling",
  },
  {
    slug: "devoted",
    name: "Devoted",
    amount: "$66",
    reward: "Signed letter from Campaign Chairman Marsh. Signature appears wet.",
    tone: "Escalating",
  },
  {
    slug: "awakened",
    name: "Awakened",
    amount: "$166",
    reward: "Name inscribed in the Book of Donors. The Book remembers.",
    tone: "Ominous",
  },
  {
    slug: "ascended",
    name: "Ascended",
    amount: "$666",
    reward: "Private audience with Party Leadership. Location revealed in a dream.",
    tone: "Full horror",
  },
]
