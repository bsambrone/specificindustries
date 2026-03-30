"use client"

import Link from "next/link"
import { useSiteLink } from "@/hooks/use-site-link"
import { executives } from "@/sites/strategicvoid/data/leadership"
import { ExecutiveCard } from "@/components/ui/executive-card"

export const metadata = {
  title: "Leadership — Strategic Void Consulting",
  description: "Meet the team behind the C.H.A.O.S. Framework™.",
}

export default function LeadershipPage() {
  const siteHref = useSiteLink()

  return (
    <div>
      {/* Hero */}
      <section className="bg-secondary text-foreground py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-6 leading-tight">
            Our Leadership
          </h1>
          <p className="text-xl text-foreground/70 leading-relaxed max-w-2xl mx-auto">
            Behind every great void is a greater team. Meet the seasoned practitioners who have
            dedicated their careers to refining the art of strategic non-outcome and guiding
            organizations toward their full alignment potential.
          </p>
        </div>
      </section>

      {/* Executive Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 gap-12">
            {executives.map((exec) => (
              <ExecutiveCard
                key={exec.slug}
                name={exec.name}
                title={exec.title}
                credentials={exec.credentials}
                bio={exec.bio}
                highlights={exec.highlights}
                publications={exec.publications}
                quote={exec.quote}
                image={exec.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-4">Work With Us</h2>
          <p className="text-foreground/60 mb-8 leading-relaxed">
            Our leadership team is available for keynotes, offsite facilitation, board advisory
            engagements, and other arrangements that do not require measurable deliverables.
          </p>
          <Link
            href={siteHref("/contact")}
            className="inline-block bg-accent text-white font-heading text-sm uppercase tracking-wider px-8 py-4 hover:opacity-90 transition-opacity"
          >
            Work With Us
          </Link>
        </div>
      </section>
    </div>
  )
}
