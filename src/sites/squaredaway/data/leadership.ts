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
    slug: "murchison",
    person: "bill",
    name: "Master Sergeant Frank Murchison",
    title: "Founder & Chief Provisioner",
    bio: "Founded Squared Away Supply Co. in 2003 after retirement, on the observation that official post exchanges had grown insufficient for the modern service member's morale needs. Maintains his original uniform, pressed weekly.",
    portraitImage: "/sites/apex/team/bill-sambrone.png",
  },
  {
    slug: "hargreaves",
    person: "brandon",
    name: "Colonel Dale Hargreaves",
    title: "VP of Branch Operations",
    bio: "Oversees inventory coordination across all five service branches. Personally reviews the weekly branch-loyalty sales data. Has been known to tear up during the Marine-branded merchandise review.",
    portraitImage: "/sites/apex/team/member-3.png",
  },
  {
    slug: "sparrow",
    person: "jim",
    name: "Lieutenant Gus Sparrow",
    title: "Director of Morale Logistics",
    bio: "Manages distribution and the proprietary 'morale index' tracking. Personally signs the weekly morale newsletter. The newsletter has never been late.",
    portraitImage: "/sites/apex/team/member-2.png",
  },
  {
    slug: "blackwell",
    person: "sean",
    name: "Sergeant Major Oren Blackwell",
    title: "Head of Exchange Relations",
    bio: "Liaises with on-base purchasing authorities and handles all official and unofficial channel escalations. Has been invited to no official exchange conferences, and takes this as a point of pride.",
    portraitImage: "/sites/apex/team/member-1.png",
  },
]
