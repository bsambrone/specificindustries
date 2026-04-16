import Image from "next/image"
import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "Command Staff — Squared Away Supply Co.",
  description:
    "Meet the retired command staff running the PX: General Hardcastle, Admiral Blackwell, Colonel Lindgren, and Sergeant Major Maddox.",
}

const LEADERSHIP = [
  {
    name: 'General (Ret.) Walter "Wally" Hardcastle',
    title: "Founder & Chief Morale Officer",
    image: "/sites/squaredaway/leadership-hardcastle.png",
    branch: "US Army (Retired)",
    bio:
      "General Hardcastle served 38 years across 4 continents, 11 commands, and 2,400 PowerPoint briefings. He retired in 2019 and has since dedicated his life to the conviction that morale can be purchased. He founded Squared Away Supply Co. from his basement, which is carpeted in safety-brief handouts.",
  },
  {
    name: "Admiral (Ret.) Preston Blackwell III",
    title: "Chief Seamanship Officer",
    image: "/sites/squaredaway/leadership-blackwell.png",
    branch: "US Navy (Retired)",
    bio:
      "Admiral Blackwell commanded three Nimitz-class carriers, two destroyer squadrons, and one very large aquarium. He is responsible for procurement of the Goat Locker™ Soap, which he believes should have been an MWR priority for decades. He lives on a boat. Of course he does.",
  },
  {
    name: "Colonel (Ret.) Tucker Lindgren",
    title: "VP of Premium Experience",
    image: "/sites/squaredaway/leadership-lindgren.png",
    branch: "US Air Force (Retired)",
    bio:
      "Colonel Lindgren flew 2,100 hours in the C-17 and 4,800 hours in business class. He led the product design team for the Qatar Package™ and personally certified every thread count in the Cashmere Loungewear line. He insists the PT medal is ironic. It is not.",
  },
  {
    name: 'Sergeant Major Huxley "Hux" Maddox',
    title: "Director of Oorah Operations",
    image: "/sites/squaredaway/leadership-maddox.png",
    branch: "US Marine Corps (Retired)",
    bio:
      "Sergeant Major Maddox enlisted at 17, deployed seven times, and has never once lowered his volume. He oversees the Marine product line personally, from the Culinary Coloring Sticks™ to the MARPAT Throw Pillow Set, and conducts all customer service calls in second person, imperative mood.",
  },
]

export default function LeadershipPage() {
  return (
    <>
      <section className="py-14 px-4 border-b-2 border-primary/30">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-mono uppercase tracking-widest text-primary/70 text-xs mb-2">COMMAND STAFF · CLASSIFICATION: C-SUITE</p>
          <h1 className="font-heading text-4xl md:text-5xl text-primary uppercase tracking-widest mb-3">Command Staff</h1>
          <p className="text-foreground/80">
            Four retired brass running a Post Exchange. One is a founder. Three are not. All are squared away.
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {LEADERSHIP.map((p) => (
            <article key={p.name} className="border-2 border-primary/40 bg-background">
              <div className="relative aspect-[4/5]">
                <Image src={p.image} alt={p.name} fill className="object-cover" />
              </div>
              <div className="p-5 border-t-2 border-primary/40">
                <p className="font-mono text-xs uppercase tracking-widest text-primary/60 mb-1">{p.branch}</p>
                <h2 className="font-heading text-xl text-primary uppercase tracking-wide leading-tight">{p.name}</h2>
                <p className="text-accent font-semibold uppercase text-sm tracking-wider mb-3">{p.title}</p>
                <p className="text-foreground/85 text-sm leading-relaxed">{p.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
