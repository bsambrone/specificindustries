import Image from "next/image"
import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "Leadership — Superengineered",
  description: "The team rebuilding the most ordinary objects in your life.",
}

interface Exec {
  name: string
  title: string
  bio: string
  image: string
}

// Names are randomized on both first and last per project convention.
// Named base-image people (bill, brandon, jim, sean) are always male.
const execs: Exec[] = [
  {
    name: "Bill Ankeney",
    title: "Founder & Chief Simplification Officer",
    bio: "Previously led the Essentials Platform team at a large fruit-branded company. Believes every object in the home deserves a CI/CD pipeline.",
    image: "/sites/superengineered/team/bill-ankeney.png",
  },
  {
    name: "Brandon Yothers",
    title: "President, Platform Verticals",
    bio: "Spent a decade at various series-C hardware startups learning why objects should cost more. Holds three patents on bristle orientation.",
    image: "/sites/superengineered/team/brandon-yothers.png",
  },
  {
    name: "Jim Redenbaugh",
    title: "SVP, Utensil Strategy",
    bio: "Former head of Fork Engineering at a division you've never heard of. Believes a spoon without analytics is a spoon forfeited.",
    image: "/sites/superengineered/team/jim-redenbaugh.png",
  },
  {
    name: "Sean Lightcap",
    title: "Chief Trust Architect",
    bio: "Built Superengineered's zero-trust mesh for household appliances. Still signs every commit in person.",
    image: "/sites/superengineered/team/sean-lightcap.png",
  },
  {
    name: "Maren Woldhuis",
    title: "VP, Cloud Hardware",
    bio: "Runs the team responsible for keeping 14 million doorknobs in quorum. Speaks four protocols fluently.",
    image: "/sites/superengineered/team/maren-woldhuis.png",
  },
]

export default function SuperengineeredLeadership() {
  return (
    <main className="bg-background py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <p className="text-sm font-medium uppercase tracking-widest text-primary/60 mb-4 text-center">
          Leadership
        </p>
        <h1 className="text-4xl md:text-5xl font-heading font-light text-primary text-center mb-4">
          The team at Superengineered.
        </h1>
        <p className="text-lg text-primary/70 text-center max-w-2xl mx-auto mb-16">
          Five operators stewarding thirty essential objects and the cloud that keeps them running.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {execs.map((exec) => (
            <article key={exec.name} className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-5 rounded-full overflow-hidden bg-secondary">
                <Image
                  src={exec.image}
                  alt={exec.name}
                  fill
                  sizes="192px"
                  className="object-cover"
                />
              </div>
              <h2 className="font-heading text-xl text-primary">{exec.name}</h2>
              <p className="text-sm text-accent mt-1">{exec.title}</p>
              <p className="text-sm text-primary/70 mt-4 leading-relaxed">{exec.bio}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
