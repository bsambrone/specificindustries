import Image from "next/image"
import Link from "next/link"
import { getSiteHref } from "@/lib/site-href"
import { divisions } from "../data/divisions"
import { courses } from "../data/courses"
import { testimonials } from "../data/testimonials"

export default async function WhiskerworksHome() {
  const siteHref = await getSiteHref()

  // One featured course per non-redacted division
  const featuredCourseByDivision = divisions
    .filter((d) => !d.isRedacted)
    .map((d) => ({
      division: d,
      course: courses.find((c) => c.divisionSlug === d.slug && !c.isRedacted),
    }))
    .filter((x): x is { division: typeof x.division; course: NonNullable<typeof x.course> } => !!x.course)

  return (
    <>
      {/* HERO */}
      <section className="relative bg-secondary text-text">
        <div className="absolute inset-0">
          <Image
            src="/sites/whiskerworks/hero.jpg"
            alt="Whiskerworks training hero"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/40 to-secondary/90" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 py-24 md:py-36 text-center">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary">
            Advanced Feline Training Institute
          </p>
          <h1 className="mt-4 text-5xl md:text-7xl font-heading text-text leading-tight">
            Your cat. Employed.<br />
            In six weeks or less.
          </h1>
          <p className="mt-6 text-lg text-text/70 max-w-2xl mx-auto">
            Six divisions. Twenty careers. Zero refunds. Accredited*.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href={siteHref("/courses")}
              className="bg-accent hover:bg-accent/90 text-white font-bold rounded px-8 py-3 text-lg uppercase tracking-wider"
            >
              Enroll Now
            </Link>
            <Link
              href={siteHref("/divisions")}
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold rounded px-8 py-3 text-lg uppercase tracking-wider"
            >
              Explore Divisions
            </Link>
          </div>
          <p className="mt-4 text-xs text-text/50 italic">*By us.</p>
        </div>
      </section>

      {/* BANNER STRIP */}
      <div className="bg-accent text-white py-3 text-center text-sm font-bold uppercase tracking-widest">
        SPRING ENROLLMENT OPEN · FINANCING AVAILABLE · NO REFUNDS
      </div>

      {/* DIVISIONS GRID */}
      <section className="bg-background py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">Six Divisions</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-heading text-text">Featured Programs</h2>
            <p className="mt-3 text-text/60">One featured course per division. The Blackbook Division does not feature.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourseByDivision.map(({ division, course }) => (
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
                <div className="p-5">
                  <p className="text-xs font-semibold tracking-[0.15em] uppercase text-primary">
                    {division.name}
                  </p>
                  <div className="mt-2 text-xl font-heading text-text group-hover:text-accent">
                    {course.title}
                  </div>
                  <p className="mt-2 text-sm text-text/60 italic">{course.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href={siteHref("/courses")}
              className="inline-block text-accent font-bold underline underline-offset-4 hover:text-accent/80"
            >
              View all 20 courses →
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-primary text-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-heading">Verified Graduates</h2>
            <p className="mt-2 text-white/60">Real placements. Surprisingly specific.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 6).map((t) => (
              <blockquote key={t.name} className="bg-white/5 border border-white/10 rounded p-6">
                <p className="text-white/80 italic">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-4 text-sm">
                  <div className="font-bold text-accent">{t.name}</div>
                  <div className="text-white/50 text-xs">{t.placement}</div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* TUITION / FINANCING STRIP */}
      <section className="bg-secondary py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-heading text-text">Tuition Made Approachable</h2>
          <p className="mt-3 text-text/70">
            Most programs: $4,800 or <strong>24 easy payments of $247</strong>. Financing through our preferred partner lender.
          </p>
          <p className="mt-6" style={{ fontFamily: "Comic Sans MS, Comic Sans, cursive", fontSize: "0.85rem", color: "#555" }}>
            Tuition financing available through Regional Guaranteed Capital Solutions LLC. APR from 9.99% to 39.99%. Terms apply. Whiskerworks is not accredited by any accrediting body recognized by the Department of Education, the state of California, or the cat.
          </p>
          <Link
            href={siteHref("/courses")}
            className="mt-10 inline-block bg-accent hover:bg-accent/90 text-white font-bold rounded px-8 py-3 text-lg uppercase tracking-wider"
          >
            Enroll Now
          </Link>
        </div>
      </section>
    </>
  )
}
