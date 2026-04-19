import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getSiteHref } from "@/lib/site-href"
import { getDivisionBySlug } from "../data/divisions"
import { getCoursesByDivision } from "../data/courses"
import { getFacultyByDivision } from "../data/faculty"

interface DivisionDetailProps {
  slug: string
}

export default async function DivisionDetail({ slug }: DivisionDetailProps) {
  const division = getDivisionBySlug(slug)
  if (!division) notFound()

  const siteHref = await getSiteHref()
  const divisionCourses = getCoursesByDivision(division.slug)
  const divisionFaculty = getFacultyByDivision(division.slug).slice(0, 3)
  const isBlackbook = division.isRedacted

  // ───────── BLACKBOOK RENDER ─────────
  if (isBlackbook) {
    return (
      <section className="bg-black text-white min-h-[70vh]">
        <div className="max-w-2xl mx-auto px-4 py-24 text-center">
          <p className="text-xs tracking-[0.3em] text-white/40 uppercase">Whiskerworks / Blackbook Division</p>
          <h1 className="mt-6 text-4xl font-heading">[CLASSIFICATION PENDING]</h1>
          <p className="mt-8 text-sm text-white/60 italic leading-relaxed">
            If you have been contacted regarding Blackbook enrollment, you already know how to proceed.
          </p>
          <p className="mt-4 text-sm text-white/40">[The remainder of this entry is redacted.]</p>

          <form
            action="#"
            method="get"
            className="mt-16 mx-auto max-w-xs border border-white/10 rounded p-5 text-left"
          >
            <label className="block text-[10px] tracking-widest uppercase text-white/50">Clearance ID</label>
            <input
              type="text"
              name="clearance"
              aria-label="Clearance ID"
              className="mt-1 w-full bg-black border border-white/20 text-white px-3 py-2 text-sm rounded focus:outline-none focus:border-white/60"
            />
            <label className="block mt-3 text-[10px] tracking-widest uppercase text-white/50">Passphrase</label>
            <input
              type="password"
              name="passphrase"
              aria-label="Passphrase"
              className="mt-1 w-full bg-black border border-white/20 text-white px-3 py-2 text-sm rounded focus:outline-none focus:border-white/60"
            />
            <button
              type="submit"
              className="mt-4 w-full border border-white/30 text-white/80 py-2 text-xs uppercase tracking-widest hover:border-white/70"
            >
              Request Access
            </button>
          </form>

          <div className="mt-10 text-xs text-white/30">
            <Link href={siteHref("/divisions")} className="underline hover:text-white/60">← Return to divisions</Link>
          </div>
        </div>
      </section>
    )
  }

  // ───────── STANDARD DIVISION RENDER ─────────
  return (
    <section className="bg-background">
      {/* Hero */}
      <div className="relative h-[40vh] min-h-[280px] bg-secondary">
        <Image
          src={division.bannerImage}
          alt={division.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
          <p className="text-xs tracking-[0.3em] uppercase opacity-70">Whiskerworks Division</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-heading">{division.name}</h1>
          <p className="mt-3 text-lg italic opacity-80">{division.tagline}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-14">
        {/* Blurb */}
        <div className="max-w-2xl mx-auto text-center">
          {division.blurb.map((paragraph, i) => (
            <p key={i} className="mt-4 text-text/80 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Featured Faculty */}
        {divisionFaculty.length > 0 && (
          <div className="mt-16">
            <h2 className="text-center text-xs tracking-[0.2em] uppercase text-accent">Featured Faculty</h2>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {divisionFaculty.map((f) => (
                <div key={f.slug} className="text-center">
                  <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden bg-secondary border-2 border-primary/20">
                    <Image src={f.portrait} alt={f.name} fill sizes="128px" className="object-cover" />
                  </div>
                  <div className="mt-3 font-heading text-text">{f.name}</div>
                  <div className="text-xs text-primary">{f.title}</div>
                  <p className="mt-2 text-xs text-text/60 italic">{f.researchInterests}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link href={siteHref("/faculty")} className="text-sm text-accent underline underline-offset-4 hover:text-accent/80">
                View all faculty →
              </Link>
            </div>
          </div>
        )}

        {/* Courses in this division */}
        <div className="mt-16">
          <h2 className="text-center text-xs tracking-[0.2em] uppercase text-accent">Programs</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {divisionCourses.map((course) => (
              <Link
                key={course.slug}
                href={siteHref(`/courses/${course.slug}`)}
                className="group bg-white border border-text/10 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-[4/3] bg-secondary">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-heading text-lg text-text group-hover:text-accent">{course.title}</h3>
                  <p className="text-xs text-text/60 italic mt-1">{course.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Back link */}
        <div className="mt-14 text-center">
          <Link href={siteHref("/divisions")} className="text-accent font-bold underline underline-offset-4 hover:text-accent/80">
            ← All divisions
          </Link>
        </div>
      </div>
    </section>
  )
}
