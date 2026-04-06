import Link from "next/link"
import { getSiteHref } from "@/lib/site-href"
import { officials } from "@/sites/elderparty/data/leadership"
import { ExecutiveCard } from "@/components/ui/executive-card"

export const metadata = {
  title: "Leadership — The Elder Party",
  description: "Meet the officials guiding the Elder Party's campaign. Eternal, unknowable, and decisive leadership for America.",
}

export default async function LeadershipPage() {
  const siteHref = await getSiteHref()

  return (
    <div>
      {/* Hero */}
      <section className="bg-secondary text-foreground py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-primary mb-6 leading-tight">
            Party Leadership
          </h1>
          <p className="text-xl text-foreground/70 leading-relaxed max-w-2xl mx-auto">
            The Elder Party is guided by individuals of extraordinary tenure and commitment.
            Some have served in leadership for years. Others have served for eons. All share
            a vision for this nation that transcends the ordinary limits of political ambition.
          </p>
        </div>
      </section>

      {/* Officials Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 gap-12">
            {officials.map((official) => (
              <ExecutiveCard
                key={official.slug}
                name={official.name}
                title={official.title}
                credentials="Eternal · Unknowable · Decisive"
                bio={official.bio}
                highlights={official.highlights}
                quote={official.quote}
                image={official.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-primary mb-4">
            Join the Awakening
          </h2>
          <p className="text-foreground/60 mb-8 leading-relaxed">
            Our leadership team is building something unprecedented — a political movement with
            the patience of eons and the urgency of now. Your contribution makes the awakening possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={siteHref("/volunteer")}
              className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Volunteer
            </Link>
            <Link
              href={siteHref("/donate")}
              className="inline-block px-8 py-3 border border-primary/40 text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors"
            >
              Donate
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
