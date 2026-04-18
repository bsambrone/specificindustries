export interface Leader {
  slug: string
  person: "bill" | "brandon" | "jim" | "sean"
  name: string
  title: string
  bio: string
  portraitImage: string
}

export const leaders: Leader[] = [
  {
    slug: "strickland",
    person: "bill",
    name: "Vaughn Strickland",
    title: "Founder & Chief Geological Strategist",
    bio: "Founded ROCKS in 2009 on a thesis paper titled 'The Only Asset Class Older Than Money.' Personally accumulates new positions at spot every Monday. Keeps a bedrock sample on his desk, unlabeled.",
    portraitImage: "/sites/apex/team/bill-sambrone.png",
  },
  {
    slug: "granite",
    person: "brandon",
    name: "Lincoln Granite",
    title: "Head of Bedrock Desk",
    bio: "Runs the primary-bedrock desk. Executes institutional block purchases of large, contiguous geological formations. Has not taken a vacation since onboarding.",
    portraitImage: "/sites/apex/team/member-1.png",
  },
  {
    slug: "shale",
    person: "jim",
    name: "Grant Shale",
    title: "Director of Hard-Asset Origination",
    bio: "Sources new rock inventory from small and mid-cap geological events. Maintains a proprietary screening framework he describes as 'mostly instinct and a ruler.'",
    portraitImage: "/sites/apex/team/member-2.png",
  },
  {
    slug: "quartz",
    person: "sean",
    name: "Miles Quartz",
    title: "VP of Vault Operations",
    bio: "Oversees the firm's cold-storage geological vault. Has personally verified the specific gravity of every asset in the vault, quarterly. Knows the rocks by first name.",
    portraitImage: "/sites/apex/team/member-3.png",
  },
]
