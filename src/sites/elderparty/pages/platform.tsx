import Image from "next/image"
import { CTABanner } from "@/components/ui/cta-banner"
import { positions } from "@/sites/elderparty/data/platform"
import { coalitions } from "@/sites/elderparty/data/coalitions"

function getCoalitionQuote(endorserName: string) {
  const coalition = coalitions.find((c) => c.name === endorserName)
  if (!coalition) return null
  return coalition.leaderQuote
}

export const metadata = {
  title: "Platform — The Elder Party",
  description: "Eight bold policy positions for an America ready to look beyond the horizon. Education, security, healthcare, economy, energy, housing, foreign policy, and civil rights.",
}

export default function PlatformPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-secondary text-foreground py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-primary mb-6 leading-tight">
            Our Platform
          </h1>
          <p className="text-xl text-foreground/70 leading-relaxed max-w-2xl mx-auto">
            Eight policy positions for an America ready to expand beyond the limits of three-dimensional
            governance. Each position has been carefully developed by Policy Director Dagon Whately
            and approved by the candidate himself — in a language older than English, but the intent is clear.
          </p>
        </div>
      </section>

      {/* Platform Positions */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto space-y-24">
          {positions.map((position, index) => (
            <div
              key={position.slug}
              id={position.slug}
              className="scroll-mt-24"
            >
              {/* Position Header */}
              <div className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 items-start`}>
                {/* Image */}
                <div className="shrink-0 w-full md:w-80">
                  <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-primary/10">
                    <Image
                      src={position.image}
                      alt={position.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <p className="text-xs text-primary/60 uppercase tracking-widest font-semibold mb-2">
                    Position {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-2">
                    {position.title}
                  </h2>
                  <p className="text-lg text-foreground/60 italic mb-6">
                    {position.slogan}
                  </p>

                  {/* Description */}
                  <div className="space-y-4 mb-8">
                    {position.description.map((paragraph, i) => (
                      <p key={i} className="text-foreground/70 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Talking Points */}
                  <div className="mb-8">
                    <h3 className="text-sm text-primary/80 uppercase tracking-wider font-semibold mb-3">
                      Key Initiatives
                    </h3>
                    <ul className="space-y-2">
                      {position.talkingPoints.map((point, i) => (
                        <li key={i} className="flex items-start gap-3 text-foreground/60 text-sm">
                          <span className="text-primary mt-0.5 shrink-0">&bull;</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Coalition Endorser Quote */}
                  {(() => {
                    const quote = getCoalitionQuote(position.coalitionEndorser)
                    if (!quote) return null
                    return (
                      <blockquote className="border-l-2 border-accent/40 pl-4 py-2">
                        <p className="text-sm text-foreground/60 italic mb-2">
                          &ldquo;{quote.text}&rdquo;
                        </p>
                        <cite className="text-xs text-foreground/40 not-italic">
                          &mdash; {quote.author}, {quote.title}
                        </cite>
                        <p className="text-xs text-primary/50 mt-1">
                          Endorsed by {position.coalitionEndorser}
                        </p>
                      </blockquote>
                    )
                  })()}
                </div>
              </div>

              {/* Divider */}
              {index < positions.length - 1 && (
                <div className="border-b border-primary/10 mt-12" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Donate CTA */}
      <CTABanner
        headline="Support the Platform"
        description="Every policy position above requires resources to implement. Your donation funds the awakening of American governance."
        ctaText="Donate Now"
        ctaHref="/donate"
      />
    </div>
  )
}
