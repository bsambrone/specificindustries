"use client"

import Image from "next/image"
import Link from "next/link"
import { useSiteLink } from "@/hooks/use-site-link"
import { Hero } from "@/components/ui/hero"
import { executives } from "@/sites/stratify/data/leadership"

export const metadata = {
  title: "Leadership — Stratify",
  description:
    "Our leadership team has over 47 combined years of experience in stratified commerce, decentralized yield optimization, and human capital activation.",
}

export default function LeadershipPage() {
  const siteHref = useSiteLink()

  return (
    <div>
      <Hero
        headline="The Architects of Your Elevation"
        subheadline="Our leadership team has over 47 combined years of experience in stratified commerce, decentralized yield optimization, and human capital activation."
        dark
      />

      {/* Executive Cards */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto flex flex-col gap-10">
          {executives.map((exec) => (
            <div
              key={exec.slug}
              className="border border-primary/15 rounded-lg overflow-hidden flex flex-col md:flex-row"
            >
              {/* Photo */}
              <div className="relative w-full md:w-56 aspect-[4/5] shrink-0">
                <Image
                  src={exec.image}
                  alt={exec.name}
                  fill
                  className="object-cover object-top"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col justify-center gap-3">
                <div>
                  <h2 className="text-2xl font-heading font-bold text-secondary">{exec.name}</h2>
                  <p className="text-accent font-medium">{exec.title}</p>
                </div>

                <p className="text-foreground/90 text-sm leading-relaxed">{exec.bio}</p>

                <blockquote className="border-l-2 border-secondary/40 pl-4 text-foreground/80 italic text-sm">
                  &ldquo;{exec.quote}&rdquo;
                </blockquote>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
            Ready to Join the Architecture?
          </h2>
          <p className="text-foreground/80 mb-8">
            The leaders above were once exactly where you are now. One elevation event changed
            everything. Yours is waiting.
          </p>
          <Link
            href={siteHref("/onboarding/step-1")}
            className="inline-block px-10 py-4 rounded-lg font-heading font-bold text-lg bg-secondary text-primary hover:bg-accent transition-colors"
          >
            Begin Your Elevation
          </Link>
        </div>
      </section>
    </div>
  )
}
