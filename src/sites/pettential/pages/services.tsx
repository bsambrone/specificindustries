// src/sites/pettential/pages/services.tsx
import Link from "next/link"
import { getSiteHref } from "@/lib/site-href"
import { pricingTiers, standaloneServices, serviceFaqs } from "../data/services"
import { FaqAccordion } from "@/components/ui/faq-accordion"

export const metadata = {
  title: "Services — Pettential",
  description: "Coaching packages, performance reviews, leadership retreats, and more. None of it works. All of it is available.",
}

export default async function PettentialServices() {
  const siteHref = await getSiteHref()
  return (
    <>
      {/* Hero */}
      <section className="bg-[#1A1A1A] text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[#CCFF00]">
            Services
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold font-heading">
            Professional Development<br />for Your Pet
          </h1>
          <p className="mt-4 text-white/60 max-w-xl mx-auto">
            Coaching, reviews, retreats, and career strategy. Your pet will not participate in any of it. But you&apos;ll feel better knowing it&apos;s available.
          </p>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="bg-[#FAFAFA] py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#111] font-heading">Coaching Packages</h2>
            <p className="mt-2 text-[#111]/60">Choose the level of non-improvement that&apos;s right for you.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-xl p-6 flex flex-col ${
                  tier.highlighted
                    ? "bg-[#1A1A1A] text-white border-2 border-[#CCFF00] relative"
                    : "bg-white border border-[#111]/10"
                }`}
              >
                {tier.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#CCFF00] text-[#111] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <div className="text-center mb-6">
                  <h3 className={`text-xl font-bold font-heading ${tier.highlighted ? "text-[#CCFF00]" : "text-[#111]"}`}>
                    {tier.name}
                  </h3>
                  <div className={`text-3xl font-bold mt-2 ${tier.highlighted ? "text-white" : "text-[#111]"}`}>
                    {tier.price}
                  </div>
                  <p className={`text-sm mt-1 ${tier.highlighted ? "text-white/60" : "text-[#111]/60"}`}>
                    {tier.tagline}
                  </p>
                </div>
                <div className="space-y-3 flex-1">
                  {tier.features.map((f) => (
                    <div key={f.label} className={`text-sm border-b pb-2 ${tier.highlighted ? "border-white/10" : "border-[#111]/5"}`}>
                      <div className={`font-medium ${tier.highlighted ? "text-white/80" : "text-[#111]/70"}`}>{f.label}</div>
                      <div className={tier.highlighted ? "text-white/50" : "text-[#111]/50"}>{f.value}</div>
                    </div>
                  ))}
                </div>
                <button
                  className={`mt-6 w-full py-3 font-bold rounded-lg transition-colors cursor-not-allowed ${
                    tier.highlighted
                      ? "bg-[#CCFF00] text-[#111] hover:bg-[#b8e600]"
                      : "bg-[#111]/10 text-[#111]/40"
                  }`}
                  disabled
                >
                  {tier.highlighted ? "Coming Soon" : "Select Plan"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Standalone Services */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#111] font-heading">Standalone Services</h2>
            <p className="mt-2 text-[#111]/60">No commitment required. No results guaranteed.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {standaloneServices.map((service) => (
              <div key={service.name} className="bg-[#FAFAFA] border border-[#111]/10 rounded-xl p-6">
                <h3 className="text-lg font-bold text-[#111] font-heading">{service.name}</h3>
                <p className="mt-1 text-sm font-medium text-[#FF3366]">{service.tagline}</p>
                <p className="mt-3 text-sm text-[#111]/70">{service.description}</p>
                <Link
                  href={siteHref("/contact")}
                  className="mt-4 inline-block px-4 py-2 bg-[#CCFF00] hover:bg-[#b8e600] text-[#111] text-sm font-bold rounded-lg transition-colors"
                >
                  Schedule Consultation
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#FAFAFA] py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#111] font-heading text-center mb-10">Frequently Asked Questions</h2>
          <FaqAccordion
            items={serviceFaqs.map((faq) => ({
              question: faq.question,
              answer: faq.answer,
            }))}
          />
        </div>
      </section>
    </>
  )
}
