import Image from "next/image"
import Link from "next/link"
import { getSiteHref } from "@/lib/site-href"
import { Hero } from "@/components/ui/hero"
import { events } from "@/sites/stratify/data/events"

export const metadata = {
  title: "Events — Stratify",
  description:
    "Stratify events are where layers become legends. Attendance is optional. Regret is permanent.",
}

const typeLabelMap: Record<string, string> = {
  virtual: "Virtual",
  "in-person": "In-Person",
  "on-demand": "On-Demand",
  classified: "Classified",
}

export default async function EventsPage() {
  const siteHref = await getSiteHref()

  return (
    <div>
      <Hero
        headline="Align. Elevate. Converge."
        subheadline="Stratify events are where layers become legends. Attendance is optional. Regret is permanent."
        dark
      />

      {/* Events List */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          {events.map((event) => (
            <div
              key={event.name}
              className="border border-foreground/15 rounded-lg p-6 flex flex-col gap-4"
            >
              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl font-heading font-bold text-foreground">{event.name}</h3>
                  <p className="text-secondary text-sm">{event.schedule}</p>
                </div>
                <span className="self-start text-xs font-heading uppercase tracking-widest bg-secondary/15 text-secondary px-3 py-1 rounded-full whitespace-nowrap">
                  {typeLabelMap[event.type] ?? event.type}
                </span>
              </div>

              {/* Location */}
              <p className="text-foreground/60 text-xs">{event.location}</p>

              {/* Description */}
              <p className="text-foreground/90 text-sm leading-relaxed">{event.description}</p>

              {/* CTA */}
              <div>
                <Link
                  href={siteHref("/onboarding/step-1")}
                  className="inline-block px-6 py-2.5 rounded-lg font-heading font-bold text-sm bg-secondary text-primary hover:bg-accent transition-colors"
                >
                  {event.ctaText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Past Event Highlights */}
      <section className="py-20 px-4 bg-foreground/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-10 text-center">
            Past Event Highlights
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Photo 1 — Keynote */}
            <figure className="border border-foreground/15 rounded-lg overflow-hidden">
              <div className="relative aspect-[3/2]">
                <Image
                  src="/sites/stratify/event-keynote.png"
                  alt="Layer Expansion Summit keynote presentation"
                  fill
                  className="object-cover"
                />
              </div>
              <figcaption className="px-4 py-3 text-foreground/70 text-sm">
                Buck Stratton delivers the keynote &ldquo;Your Job Is Not Your Friend&rdquo; to 2,000 attendees.
              </figcaption>
            </figure>

            {/* Photo 2 — Mixer */}
            <figure className="border border-foreground/15 rounded-lg overflow-hidden">
              <div className="relative aspect-[3/2]">
                <Image
                  src="/sites/stratify/event-mixer.png"
                  alt="Networking mixer at the Layer Expansion Summit"
                  fill
                  className="object-cover"
                />
              </div>
              <figcaption className="px-4 py-3 text-foreground/70 text-sm">
                Layer 2 participants celebrate their first Subordinate Revenue Layer at the networking mixer.
              </figcaption>
            </figure>
          </div>

          {/* Attendance stat */}
          <div className="text-center border border-secondary/20 rounded-lg py-8 px-4">
            <p className="text-foreground/70 text-sm font-heading uppercase tracking-widest mb-2">
              Last Year&apos;s Summit
            </p>
            <p className="text-2xl font-heading font-bold text-secondary">
              4,200 attendees &middot; 12 countries &middot; 1 geometry
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
