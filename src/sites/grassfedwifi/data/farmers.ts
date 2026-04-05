export interface Farmer {
  basePerson: "bill" | "brandon" | "jim" | "sean"
  name: string
  title: string
  bio: string
  image: string
}

export const farmers: Farmer[] = [
  {
    basePerson: "bill",
    name: "Hollis Thornfield",
    title: "Co-op Elder & Head Signal Herder",
    bio: "Hollis founded the co-op after a 72-hour fast at a mountain WiFi dead zone left him with a vision of pasture-raised signal. He carries a hand-carved antenna wherever he goes, and can recite every frequency band by touch. He does not use a mobile phone.",
    image: "/sites/grassfedwifi/team-bill.png",
  },
  {
    basePerson: "brandon",
    name: "Ezekiel \"Zeke\" Meadowbrook",
    title: "Chief Spectrum Steward",
    bio: "A decade at a conventional telecom left Ezekiel 'with nothing but the signal in his bones.' He walked away from a comfortable post to join the co-op's earliest members. He refuses to acknowledge microwaves and has opinions about the IEEE.",
    image: "/sites/grassfedwifi/team-brandon.png",
  },
  {
    basePerson: "jim",
    name: "Porter Wheatgrass",
    title: "Director of Frequency Husbandry",
    bio: "Porter rotates the co-op's frequency pastures on a strict lunar calendar and claims he can taste the difference between 2.4 GHz harvested in the morning versus the evening. Most members believe him. Porter has never been overruled at a co-op meeting.",
    image: "/sites/grassfedwifi/team-jim.png",
  },
  {
    basePerson: "sean",
    name: "Fennel Ashcroft",
    title: "Keeper of the Harvest Calendar & Seasonal Allocations Lead",
    bio: "Fennel hand-writes every member's seasonal allocation in a leather-bound ledger and does not trust spreadsheets. He arrives at the co-op barn before dawn and leaves after dusk. The calendar on the website is based on his ledger, transcribed weekly by a volunteer.",
    image: "/sites/grassfedwifi/team-sean.png",
  },
]
