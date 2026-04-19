import Image from "next/image"
import { divisions } from "../data/divisions"
import { faculty } from "../data/faculty"

export const metadata = {
  title: "Faculty — Whiskerworks",
  description: "Meet the fifteen feline instructors teaching across our six divisions.",
}

export default function WhiskerworksFaculty() {
  return (
    <section className="bg-background">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <header className="mb-14 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">Faculty</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-heading text-text">Our Instructors</h1>
          <p className="mt-3 text-text/60 max-w-2xl mx-auto">
            Fifteen feline instructors, credentialed by at least one institution each (in most cases, us).
          </p>
        </header>

        {divisions
          .filter((d) => !d.isRedacted)
          .map((division) => {
            const members = faculty.filter((f) => f.divisionSlug === division.slug)
            if (members.length === 0) return null
            return (
              <div key={division.slug} className="mb-14">
                <div className="mb-6 border-b border-text/10 pb-2">
                  <h2 className="text-2xl font-heading text-primary">{division.name}</h2>
                  <p className="text-sm italic text-text/60">{division.tagline}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {members.map((f) => (
                    <div key={f.slug} className="bg-white border border-text/10 rounded-lg p-5">
                      <div className="flex gap-4 items-start">
                        <div className="relative w-20 h-24 rounded-full overflow-hidden bg-secondary border-2 border-primary/20 shrink-0">
                          <Image src={f.portrait} alt={f.name} fill sizes="80px" className="object-cover" />
                        </div>
                        <div>
                          <div className="font-heading text-text">{f.name}</div>
                          <div className="text-xs text-primary">{f.title}</div>
                        </div>
                      </div>
                      <p className="mt-4 text-sm text-text/70 leading-relaxed">{f.bio}</p>
                      <p className="mt-3 text-xs italic text-text/50">Research Interests: {f.researchInterests}</p>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
      </div>
    </section>
  )
}
