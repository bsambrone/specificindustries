import Image from "next/image"
import Link from "next/link"
import { getSiteHref } from "@/lib/site-href"
import { divisions } from "../data/divisions"
import { courses } from "../data/courses"

export const metadata = {
  title: "Course Catalog — Whiskerworks",
  description: "All twenty courses across six divisions at the Whiskerworks Advanced Feline Training Institute.",
}

export default async function WhiskerworksCourses() {
  const siteHref = await getSiteHref()

  return (
    <section className="bg-background">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <header className="mb-10 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">Course Catalog</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-heading text-text">Twenty Programs</h1>
          <p className="mt-3 text-text/60 max-w-2xl mx-auto">
            Browse every program across our six divisions. Two Blackbook programs require clearance and will not display without it.
          </p>
        </header>

        {divisions.map((division) => {
          const divisionCourses = courses.filter((c) => c.divisionSlug === division.slug)
          return (
            <div key={division.slug} className="mb-14">
              <div className="flex items-baseline justify-between mb-5 border-b border-text/10 pb-2">
                <div>
                  <h2 className="text-2xl font-heading text-primary">{division.name}</h2>
                  <p className="text-sm italic text-text/60">{division.tagline}</p>
                </div>
                <Link
                  href={siteHref(`/divisions/${division.slug}`)}
                  className="text-sm text-accent underline underline-offset-4 hover:text-accent/80"
                >
                  View division →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {divisionCourses.map((course) =>
                  course.isRedacted ? (
                    <Link
                      key={course.slug}
                      href={siteHref(`/courses/${course.slug}`)}
                      className="group bg-black border border-black rounded-lg overflow-hidden block aspect-[4/3] flex items-center justify-center"
                    >
                      <div className="text-center text-white/80 tracking-widest">
                        <div className="text-xs opacity-60">CLEARANCE REQUIRED</div>
                        <div className="mt-2 text-xl font-heading">[REDACTED]</div>
                      </div>
                    </Link>
                  ) : (
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
                  )
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
