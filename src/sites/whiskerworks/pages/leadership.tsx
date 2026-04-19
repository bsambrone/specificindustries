import Image from "next/image"
import Link from "next/link"
import { getSiteHref } from "@/lib/site-href"
import { leaders } from "../data/leadership"

export const metadata = {
  title: "Leadership — Whiskerworks",
  description: "The four executives running Whiskerworks Advanced Feline Training Institute.",
}

export default async function WhiskerworksLeadership() {
  const siteHref = await getSiteHref()

  return (
    <section className="bg-background">
      <div className="max-w-5xl mx-auto px-4 py-16">
        <header className="mb-14 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">Executive Team</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-heading text-text">Leadership</h1>
          <p className="mt-3 text-text/60 max-w-xl mx-auto">
            Four seasoned trade-school executives guiding the Institute's six divisions.
          </p>
        </header>

        <div className="space-y-8">
          {leaders.map((leader) => (
            <div key={leader.slug} className="bg-white border border-text/10 rounded-lg overflow-hidden flex flex-col md:flex-row">
              <div className="relative w-full md:w-56 aspect-[4/5] bg-secondary shrink-0">
                <Image
                  src={leader.portrait}
                  alt={leader.name}
                  fill
                  sizes="(min-width: 768px) 224px, 100vw"
                  className="object-cover object-top"
                />
              </div>
              <div className="p-6 flex-1">
                <h3 className="text-2xl font-heading text-text">{leader.name}</h3>
                <p className="text-accent font-semibold mt-1">{leader.title}</p>
                <p className="mt-4 text-sm text-text/80 leading-relaxed">{leader.bio}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            href={siteHref("/contact")}
            className="inline-block bg-accent hover:bg-accent/90 text-white font-bold rounded px-8 py-3 uppercase tracking-wider"
          >
            Contact Admissions
          </Link>
        </div>
      </div>
    </section>
  )
}
