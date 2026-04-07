import Link from "next/link"
import Image from "next/image"
import { getSiteHref } from "@/lib/site-href"
import { MetricCounter } from "@/components/ui/metric-counter"
import { TestimonialGrid } from "@/components/ui/testimonial-grid"
import { services } from "@/sites/cleansheet/data/services"
import { testimonials } from "@/sites/cleansheet/data/testimonials"

export default async function CleanSheetHome() {
  const siteHref = await getSiteHref()

  const featuredServices = services.slice(0, 3)

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-secondary/5 py-32 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-primary mb-6 leading-tight">
              Definitely Not Money Laundering. Just Laundering.
            </h1>
            <p className="text-xl text-foreground/70 mb-10 leading-relaxed">
              Premium fabric care for discerning clients since 1987. We clean clothes.
              That&apos;s it. Please stop asking.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                href={siteHref("/services")}
                className="inline-block bg-primary text-white font-heading text-sm uppercase tracking-wider px-8 py-4 hover:opacity-90 transition-opacity"
              >
                View Our Services
              </Link>
              <Link
                href={siteHref("/contact")}
                className="inline-block border border-primary text-primary font-heading text-sm uppercase tracking-wider px-8 py-4 hover:bg-primary hover:text-white transition-colors"
              >
                Request Discreet Consultation
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/sites/cleansheet/hero.png"
                alt="The Clean Sheet — pristine laundromat interior"
                fill
                className="object-cover"
                priority
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Metrics */}
      <section className="py-16 px-6 bg-primary/5 border-y border-primary/10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <MetricCounter value={4200000000} prefix="$" label="In garments processed" />
          <MetricCounter value={0} label="Investigations completed" />
          <MetricCounter value={100} label="Of loads returned clean" suffix="%" />
          <MetricCounter value={37} label="Years of discreet service" />
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-primary mb-4">
              Our Services
            </h2>
            <p className="text-foreground/60 max-w-xl mx-auto leading-relaxed">
              The Clean Sheet offers a full spectrum of laundering services. And by laundering,
              we mean laundry. Obviously.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
              <div
                key={service.slug}
                className="border border-primary/10 p-8 text-center"
              >
                <h3 className="text-xl font-heading font-semibold text-primary mb-2">
                  {service.name}
                </h3>
                <p className="text-accent font-bold text-lg mb-3">{service.price}</p>
                <p className="text-sm text-foreground/60 italic mb-4">{service.tagline}</p>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href={siteHref("/services")}
              className="inline-block border border-primary text-primary font-heading text-sm uppercase tracking-wider px-8 py-3 hover:bg-primary hover:text-white transition-colors"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialGrid title="What Our Clients Say" testimonials={testimonials} />

      {/* CTA */}
      <section className="bg-primary py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">
            Ready for a Fresh Start?
          </h2>
          <p className="text-white/70 mb-8 leading-relaxed">
            Your first consultation is always off the record. We look forward to
            not remembering this conversation.
          </p>
          <Link
            href={siteHref("/contact")}
            className="inline-block bg-white text-primary font-heading text-sm uppercase tracking-wider px-8 py-4 hover:opacity-90 transition-opacity"
          >
            Request Discreet Consultation
          </Link>
        </div>
      </section>
    </div>
  )
}
