import Image from "next/image"
import { services, loyaltyTiers, faqItems } from "@/sites/cleansheet/data/services"
import { FaqAccordion } from "@/components/ui/faq-accordion"

export const metadata = {
  title: "Services — The Clean Sheet",
  description:
    "Full-service laundering for discerning clients. From The Fresh Start to The Executive Press.",
}

export default function ServicesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-secondary/5 py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-primary mb-6 leading-tight">
            Our Services
          </h1>
          <p className="text-xl text-foreground/70 leading-relaxed">
            The Clean Sheet offers a full spectrum of laundering services. And by laundering,
            we mean laundry. Obviously.
          </p>
        </div>
      </section>

      {/* Service Sections */}
      {services.map((service, i) => (
        <section
          key={service.slug}
          className={`py-20 px-6 ${i % 2 === 1 ? "bg-secondary/5" : ""}`}
        >
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className={`md:w-1/2 ${i % 2 === 1 ? "md:order-2" : ""}`}>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-secondary/10">
                <Image
                  src={`/sites/cleansheet/service-${service.slug}.png`}
                  alt={service.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className={`md:w-1/2 ${i % 2 === 1 ? "md:order-1" : ""}`}>
              <p className="text-accent font-bold text-lg mb-1">{service.price}</p>
              <h2 className="text-3xl font-heading font-bold text-primary mb-2">
                {service.name}
              </h2>
              <p className="text-foreground/60 italic mb-4">{service.tagline}</p>
              <p className="text-foreground/70 leading-relaxed mb-6">{service.description}</p>
              <div>
                <h3 className="text-sm font-heading uppercase tracking-wider text-foreground/40 mb-3">
                  What&apos;s Included
                </h3>
                <ul className="space-y-2">
                  {service.includes.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-foreground/70 text-sm">
                      <span className="text-accent mt-0.5 shrink-0">&#10003;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Loyalty Program */}
      <section className="py-20 px-6 bg-primary text-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4">
              The Clean Slate Club
            </h2>
            <p className="text-white/70 max-w-xl mx-auto leading-relaxed">
              Our loyalty program rewards repeat clients. The more you launder with us, the
              more benefits you receive. We phrased that carefully.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loyaltyTiers.map((tier) => (
              <div
                key={tier.name}
                className="border border-white/20 p-8 text-center"
              >
                <h3 className="text-2xl font-heading font-bold mb-2">{tier.name}</h3>
                <p className="text-white/60 text-sm mb-4">{tier.range}</p>
                <p className="text-white/80 text-sm leading-relaxed">{tier.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-primary mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <FaqAccordion items={faqItems} />
        </div>
      </section>
    </div>
  )
}
