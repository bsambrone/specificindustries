import Image from "next/image"
import Link from "next/link"
import { getSiteHref } from "@/lib/site-href"
import { divisions } from "../data/divisions"
import { courses } from "../data/courses"

export const metadata = {
  title: "Divisions — Whiskerworks",
  description: "Six divisions at the Whiskerworks Advanced Feline Training Institute: Academics, Tactical, Industrial, Corporate, Domestic, and Blackbook.",
}

export default async function WhiskerworksDivisions() {
  const siteHref = await getSiteHref()

  return (
    <section className="bg-background">
      <div className="max-w-5xl mx-auto px-4 py-16">
        <header className="mb-12 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">Six Divisions</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-heading text-text">The Institute</h1>
          <p className="mt-3 text-text/60 max-w-xl mx-auto">
            Each division trains cats for a distinct career vertical. Five are publicly documented. The sixth is not.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {divisions.map((division) => {
            const divisionCourseCount = courses.filter((c) => c.divisionSlug === division.slug).length
            const isBlackbook = division.isRedacted

            return (
              <Link
                key={division.slug}
                href={siteHref(`/divisions/${division.slug}`)}
                className={
                  isBlackbook
                    ? "group bg-black border border-black rounded-lg overflow-hidden block"
                    : "group bg-white border border-text/10 rounded-lg overflow-hidden block hover:shadow-md transition-shadow"
                }
              >
                <div className={`relative aspect-video ${isBlackbook ? "bg-black" : "bg-secondary"}`}>
                  {!isBlackbook && (
                    <Image
                      src={division.bannerImage}
                      alt={division.name}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  )}
                  {isBlackbook && (
                    <div className="absolute inset-0 flex items-center justify-center text-white/60 text-xs tracking-[0.3em]">
                      [CLASSIFICATION PENDING]
                    </div>
                  )}
                </div>
                <div className={`p-6 ${isBlackbook ? "text-white/80" : "text-text"}`}>
                  <h2 className={`text-2xl font-heading ${isBlackbook ? "text-white" : "text-primary group-hover:text-accent"}`}>
                    {division.name}
                  </h2>
                  <p className={`mt-2 text-sm italic ${isBlackbook ? "text-white/50" : "text-text/60"}`}>
                    {division.tagline}
                  </p>
                  <p className={`mt-4 text-xs ${isBlackbook ? "text-white/40" : "text-text/50"}`}>
                    {divisionCourseCount} {divisionCourseCount === 1 ? "program" : "programs"}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
