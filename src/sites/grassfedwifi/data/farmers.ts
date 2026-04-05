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
    bio: "Hollis founded the co-op after a 72-hour fast at a mountain WiFi dead zone left him with a vision of pasture-raised signal. He carries a hand-carved antenna wherever he goes, and can recite every frequency band from 2.4 GHz to 7.2 GHz by touch. He does not own a mobile phone, does not trust SSIDs that end in numbers, and insists that the co-op's DNS server be kept 'within earshot.'",
    image: "/sites/grassfedwifi/team-bill.png",
  },
  {
    basePerson: "brandon",
    name: "Ezekiel \"Zeke\" Meadowbrook",
    title: "Chief Spectrum Steward",
    bio: "A decade at a conventional telecom — ten years of SLAs, QoS rewrites, and board-driven bandwidth reclassification — left Ezekiel 'with nothing but the signal in his bones.' He walked away from a comfortable post to join the co-op's earliest members. He refuses to acknowledge microwaves, has opinions about the IEEE, and keeps an annotated copy of every FCC 700 MHz auction record in a locked drawer at the barn.",
    image: "/sites/grassfedwifi/team-brandon.png",
  },
  {
    basePerson: "jim",
    name: "Porter Wheatgrass",
    title: "Director of Frequency Husbandry",
    bio: "Porter rotates the co-op's frequency pastures on a strict lunar calendar and claims he can taste the difference between 2.4 GHz harvested in the morning versus the evening — a difference he measures in hundredths of a millisecond of ping variance. Most members believe him. Porter has never been overruled at a co-op meeting, and has been known to reject a batch of 5 GHz packets purely on the basis of 'mouthfeel.'",
    image: "/sites/grassfedwifi/team-jim.png",
  },
  {
    basePerson: "sean",
    name: "Fennel Ashcroft",
    title: "Keeper of the Harvest Calendar & Seasonal Allocations Lead",
    bio: "Fennel hand-writes every member's seasonal allocation in a leather-bound ledger — MAC addresses, SSID assignments, bandwidth caps, and the weather at allocation time — and does not trust spreadsheets. He arrives at the co-op barn before dawn and leaves after dusk. The calendar on the website is based on his ledger, transcribed weekly by a volunteer. He has personally assigned every static IPv4 in the co-op block since 2015.",
    image: "/sites/grassfedwifi/team-sean.png",
  },
]
