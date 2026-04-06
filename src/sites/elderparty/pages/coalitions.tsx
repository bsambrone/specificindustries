import Image from "next/image"
import Link from "next/link"
import { coalitions } from "@/sites/elderparty/data/coalitions"
import { getSiteHref } from "@/lib/site-href"

export const metadata = {
  title: "Coalitions — The Elder Party",
  description: "Meet the seven coalition partners who have endorsed the Elder Party ticket. From the Children's Mineral Labor Coalition to the Esoteric Taxpayers Alliance.",
}

export default async function CoalitionsPage() {
  const siteHref = await getSiteHref()

  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 px-6 min-h-[340px] md:min-h-[400px]">
        <Image
          src="/sites/elderparty/coalitions-hero.png"
          alt=""
          fill
          className="object-cover brightness-50"
          priority
          fetchPriority="high"
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 leading-tight">
            Our Coalitions
          </h1>
          <p className="text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
            Seven organizations have endorsed the Elder Party. They represent millions of Americans
            who understand that the future of this country lies in directions most maps don&apos;t cover.
          </p>
        </div>
      </section>

      {/* Coalition Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center text-primary mb-4 uppercase tracking-wide">
            Endorsed By
          </h2>
          <p className="text-center text-foreground/60 text-sm mb-12 max-w-2xl mx-auto">
            Each coalition brings unique expertise, passionate membership, and a shared conviction
            that the Elder Party is the last political movement America will ever need.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {coalitions.map((coalition) => (
              <Link
                key={coalition.slug}
                href={siteHref(`/coalitions/${coalition.slug}`)}
                className="group border border-primary/10 rounded-lg overflow-hidden bg-secondary/20 hover:bg-secondary/30 hover:border-primary/30 transition-colors"
              >
                <div className="relative w-full aspect-[16/10]">
                  <Image
                    src={coalition.image}
                    alt={coalition.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-heading font-semibold text-primary mb-1">
                    {coalition.name}
                  </h3>
                  <p className="text-sm text-foreground/60 italic mb-3">
                    {coalition.tagline}
                  </p>
                  <span className="text-xs text-primary/60 uppercase tracking-wider font-semibold group-hover:text-primary transition-colors">
                    Read More &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-6 bg-secondary/30 border-t border-primary/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-heading font-bold text-primary mb-4">
            Your Organization Belongs Here
          </h2>
          <p className="text-foreground/60 mb-6 leading-relaxed">
            The Elder Party welcomes coalition partners from every sector, every dimension, and every
            state of consciousness. If your organization hears the call, we are listening.
          </p>
          <Link
            href={siteHref("/contact")}
            className="inline-block px-8 py-3 border border-primary/40 text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors text-sm uppercase tracking-wider"
          >
            Contact the Campaign
          </Link>
        </div>
      </section>
    </div>
  )
}
