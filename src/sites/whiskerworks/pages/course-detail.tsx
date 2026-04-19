import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getSiteHref } from "@/lib/site-href"
import { getCourseBySlug, getCoursesByDivision } from "../data/courses"
import { getDivisionBySlug } from "../data/divisions"
import { getFacultyBySlug } from "../data/faculty"

interface CourseDetailProps {
  slug: string
}

export default async function CourseDetail({ slug }: CourseDetailProps) {
  const course = getCourseBySlug(slug)
  if (!course) notFound()

  const siteHref = await getSiteHref()
  const division = getDivisionBySlug(course.divisionSlug)
  const instructor = course.featuredInstructorSlug ? getFacultyBySlug(course.featuredInstructorSlug) : undefined
  const related = getCoursesByDivision(course.divisionSlug)
    .filter((c) => c.slug !== course.slug && !c.isRedacted)
    .slice(0, 3)

  // ───────── REDACTED (BLACKBOOK) RENDER ─────────
  if (course.isRedacted) {
    return (
      <section className="bg-black text-white min-h-[70vh]">
        <div className="max-w-xl mx-auto px-4 py-24 text-center">
          <p className="text-xs tracking-[0.3em] text-white/40 uppercase">Whiskerworks / Blackbook</p>
          <h1 className="mt-6 text-4xl font-heading">[REDACTED]</h1>
          <p className="mt-8 text-sm text-white/60 italic">Clearance required.</p>

          <form
            action="#"
            method="get"
            className="mt-12 mx-auto max-w-xs border border-white/10 rounded p-5 text-left"
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

          <div className="mt-8 text-xs text-white/30">
            <Link href={siteHref("/courses")} className="underline hover:text-white/60">← Course catalog</Link>
          </div>
        </div>
      </section>
    )
  }

  // ───────── STANDARD COURSE RENDER ─────────
  return (
    <section className="bg-background">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-text/50 mb-6">
          <Link href={siteHref("/courses")} className="hover:text-accent underline underline-offset-2">Courses</Link>
          <span className="mx-2">›</span>
          {division && (
            <>
              <Link href={siteHref(`/divisions/${division.slug}`)} className="hover:text-accent underline underline-offset-2">
                {division.name}
              </Link>
              <span className="mx-2">›</span>
            </>
          )}
          <span className="text-text/70">{course.title}</span>
        </nav>

        {/* Hero */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-3 relative aspect-[4/3] bg-secondary border border-text/10 rounded-lg overflow-hidden">
            <Image
              src={course.image}
              alt={course.title}
              fill
              priority
              sizes="(min-width: 768px) 60vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="md:col-span-2">
            {division && (
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-primary">
                {division.name}
              </p>
            )}
            <h1 className="mt-2 text-3xl md:text-4xl font-heading text-text">{course.title}</h1>
            <p className="mt-3 text-lg italic text-text/80">{course.tagline}</p>

            <div className="mt-6 p-4 border border-accent/30 bg-accent/5 rounded">
              <p className="text-sm text-text/80">{course.tuition}</p>
              <button
                type="button"
                className="mt-3 w-full bg-accent hover:bg-accent/90 text-white font-bold rounded px-4 py-2 uppercase tracking-wider text-sm"
              >
                Enroll Now
              </button>
            </div>
          </div>
        </div>

        {/* Blurb */}
        <div className="mt-12 max-w-3xl">
          {course.blurb.map((p, i) => (
            <p key={i} className="mt-3 text-text/80 leading-relaxed">{p}</p>
          ))}
        </div>

        {/* Learning Outcomes */}
        <div className="mt-12">
          <h2 className="text-xs tracking-[0.2em] uppercase text-accent">What You&apos;ll Learn</h2>
          <ul className="mt-4 space-y-2">
            {course.learningOutcomes.map((outcome, i) => (
              <li key={i} className="flex gap-3 text-text/80">
                <span className="text-accent font-bold">›</span>
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Syllabus */}
        <div className="mt-12">
          <h2 className="text-xs tracking-[0.2em] uppercase text-accent">Program Syllabus</h2>
          <div className="mt-4 border border-text/10 rounded-lg overflow-hidden">
            {course.syllabus.map((week, i) => (
              <div
                key={week.week}
                className={`px-5 py-4 flex gap-5 ${i % 2 === 0 ? "bg-white" : "bg-secondary"}`}
              >
                <div className="shrink-0 w-20 font-heading text-primary">Week {week.week}</div>
                <div>
                  <div className="font-semibold text-text">{week.title}</div>
                  <p className="text-sm text-text/60 mt-1">{week.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instructor */}
        {instructor && (
          <div className="mt-12">
            <h2 className="text-xs tracking-[0.2em] uppercase text-accent">Your Instructor</h2>
            <div className="mt-4 flex gap-5 items-start bg-white border border-text/10 rounded-lg p-5">
              <div className="relative w-24 h-24 rounded-full overflow-hidden bg-secondary border-2 border-primary/20 shrink-0">
                <Image src={instructor.portrait} alt={instructor.name} fill sizes="96px" className="object-cover" />
              </div>
              <div>
                <div className="font-heading text-xl text-text">{instructor.name}</div>
                <div className="text-sm text-primary">{instructor.title}</div>
                <p className="mt-3 text-sm text-text/70 leading-relaxed">{instructor.bio}</p>
                <p className="mt-2 text-xs italic text-text/50">Research Interests: {instructor.researchInterests}</p>
              </div>
            </div>
          </div>
        )}

        {/* Tuition footer / Enroll CTA */}
        <div className="mt-14 bg-secondary rounded-lg p-8 text-center">
          <p className="text-lg text-text/80">{course.tuition}</p>
          <p className="mt-2" style={{ fontFamily: "Comic Sans MS, Comic Sans, cursive", fontSize: "0.8rem", color: "#555" }}>
            Financing through Regional Guaranteed Capital Solutions LLC. APR 9.99%-39.99%. Terms apply.
          </p>
          <button
            type="button"
            className="mt-6 bg-accent hover:bg-accent/90 text-white font-bold rounded px-8 py-3 uppercase tracking-wider"
          >
            Enroll Now
          </button>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-center text-xs tracking-[0.2em] uppercase text-accent">Related Programs</h2>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((c) => (
                <Link
                  key={c.slug}
                  href={siteHref(`/courses/${c.slug}`)}
                  className="group bg-white border border-text/10 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-[4/3] bg-secondary">
                    <Image src={c.image} alt={c.title} fill sizes="33vw" className="object-cover" />
                  </div>
                  <div className="p-4">
                    <div className="font-heading text-text group-hover:text-accent">{c.title}</div>
                    <p className="text-xs text-text/60 italic mt-1">{c.tagline}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
