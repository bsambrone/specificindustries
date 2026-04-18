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
    slug: "captain-chuck-denton",
    person: "bill",
    name: "Captain Chuck Denton",
    title: "Founder & Chief Inflation Officer",
    bio: "Former marina operator turned inflatable anchor evangelist. Has demonstrated the product on live television twice. Both times, the anchor floated away on camera. Both times, he called it a success.",
    portraitImage: "/sites/inflatableanchors/team-chuck.png",
  },
  {
    slug: "reef-henderson",
    person: "brandon",
    name: "Reef Henderson",
    title: "Head of Buoyancy Research",
    bio: "Holds a degree in something he describes as 'fluid-adjacent.' Has a whiteboard full of buoyancy equations that no one has verified. Has never successfully anchored a boat.",
    portraitImage: "/sites/inflatableanchors/team-reef.png",
  },
  {
    slug: "skip-bayliner",
    person: "sean",
    name: "Skip Bayliner",
    title: "Director of Customer Amazement",
    bio: "Handles all customer interactions with relentless positivity. Has responded to every complaint with 'But wasn't the retrieval easy?' Maintains a 1.2-star average on review sites and considers it 'room to grow.'",
    portraitImage: "/sites/inflatableanchors/team-skip.png",
  },
  {
    slug: "big-mike-portside",
    person: "jim",
    name: "Big Mike Portside",
    title: "VP of Heavy-Duty Operations",
    bio: "Oversees the Heavy Duty Pro line and all warehouse operations. Frequently photographed carrying comically small shipping boxes. His handshake is firmer than anything the company manufactures.",
    portraitImage: "/sites/inflatableanchors/team-mike.png",
  },
]
