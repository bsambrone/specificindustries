import Link from "next/link"
import { getSiteHref } from "@/lib/site-href"
import { EnterprisePricingTable } from "@/components/ui/enterprise-pricing-table"
import { FaqAccordion } from "@/components/ui/faq-accordion"
import { masterTiers, featureComparisonRows } from "@/sites/strategicvoid/data/pricing"

export const metadata = {
  title: "Pricing — Strategic Void Consulting",
  description:
    "Simple, transparent pricing for enterprise-grade strategic non-productivity. Four tiers. Zero outcomes. Unlimited alignment.",
}

const addOns = [
  {
    name: "Synergy Threading™",
    price: "$4,999/yr",
    description:
      "Automatically routes all cross-functional communications through a minimum of three additional stakeholders before delivery.",
  },
  {
    name: "Blame Redistribution Hotline™",
    price: "$12,000/yr",
    description:
      "24/7 dedicated line staffed by trained specialists who will identify alternative accountability owners within minutes.",
  },
  {
    name: "Executive Visibility Package™",
    price: "$8,500/yr",
    description:
      "Monthly performance theater deliverables designed to demonstrate executive presence without requiring executive decisions.",
  },
  {
    name: "Confusion Management Dashboard™",
    price: "$6,000/yr",
    description:
      "A real-time analytics platform that visualizes the depth and distribution of organizational misalignment across all departments.",
  },
  {
    name: "Rapid Misalignment Response™",
    price: "$9,999/yr",
    description:
      "On-call consultants available to intervene whenever clarity threatens to emerge. Average response time: 47 minutes.",
  },
  {
    name: "Ceremony Facilitation Suite™",
    price: "$15,000/yr",
    description:
      "Quarterly offsites, annual retreats, and ad-hoc workshops delivered with full production value and zero actionable conclusions.",
  },
]

const faqItems = [
  {
    question: "Can I downgrade?",
    answer: "Alignment is a one-way journey.",
  },
  {
    question: "What's included in 'Custom'?",
    answer:
      "That depends on what 'included' means to your organization. We recommend scheduling a scoping call to explore what 'included' might mean, followed by a secondary call to align on the definition of 'means,' and a third call to determine whether 'your organization' refers to the entity that signs the contract or the entity that uses the platform. We'll get there.",
  },
  {
    question: "Do you offer a free trial?",
    answer:
      "We offer a complimentary assessment. It takes 6–8 weeks and concludes with a readout presentation that identifies the tier you should have purchased before the assessment began.",
  },
  {
    question: "How does billing work?",
    answer:
      "Our billing cycles are aligned with your fiscal quarter, or ours, whichever is more confusing. Invoices are issued in a format optimized for ambiguity and routed through your accounts payable department's least-staffed approval chain.",
  },
  {
    question: "Can I cancel?",
    answer:
      "You can submit a Disalignment Request through channels we haven't established yet. We expect to have those channels in place within the next two to three planning cycles, pending stakeholder alignment on the cancellation workflow.",
  },
  {
    question: "Is there a discount for nonprofits?",
    answer:
      "We don't discriminate based on profit status. Everyone pays the same amount of too much.",
  },
]

export default async function PricingPage() {
  const siteHref = await getSiteHref()

  return (
    <div>
      {/* Hero */}
      <section className="bg-secondary text-foreground py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-6 leading-tight">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-foreground/70 leading-relaxed max-w-2xl mx-auto">
            Four tiers. Unlimited seats available at the appropriate tier. Clear terms
            available upon request, subject to alignment review.
          </p>
        </div>
      </section>

      {/* Platform Tiers */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-primary mb-4">
              Platform Tiers
            </h2>
            <p className="text-foreground/60 max-w-xl mx-auto leading-relaxed">
              Every tier includes access to the C.H.A.O.S. Framework™ methodology and our
              full library of non-productive best practices. Outcomes not included.
            </p>
          </div>
          <EnterprisePricingTable
            tiers={masterTiers}
            featureRows={featureComparisonRows}
          />
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-20 px-6 bg-secondary/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-primary mb-4">
              Enhance Your Investment
            </h2>
            <p className="text-foreground/60 max-w-xl mx-auto leading-relaxed">
              Strategic add-ons for organizations that require a more comprehensive
              experience of not moving forward.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addOns.map((addon) => (
              <div
                key={addon.name}
                className="border border-primary/20 bg-background p-6"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-heading font-bold text-primary">{addon.name}</h3>
                  <span className="text-accent font-heading font-bold text-sm shrink-0">
                    {addon.price}
                  </span>
                </div>
                <p className="text-foreground/60 text-sm leading-relaxed">
                  {addon.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Volume Discounts */}
      <section className="py-16 px-6 border-y border-primary/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-heading font-bold text-primary mb-4">
            Volume Pricing
          </h2>
          <p className="text-foreground/70 leading-relaxed mb-2">
            Organizations with 10,000 or more seats qualify for our{" "}
            <span className="text-accent font-semibold">Partnership Program™</span>.
          </p>
          <p className="text-foreground/50 text-sm">
            Partnership Program™ pricing, terms, and eligibility are determined through a
            multi-stakeholder alignment process that typically concludes within one fiscal year.
            Contact your Alignment Partner to begin.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-primary mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-foreground/60 leading-relaxed">
              We&apos;ve answered the questions we could. The ones we couldn&apos;t are
              currently in stakeholder review.
            </p>
          </div>
          <FaqAccordion items={faqItems} />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
            Schedule a Pricing Consultation
          </h2>
          <p className="text-foreground/60 mb-8 leading-relaxed">
            Our Alignment Partners will walk you through each tier, explain the features
            you don&apos;t need, and help you select the package that most closely
            approximates what you were going to spend anyway.
          </p>
          <Link
            href={siteHref("/contact")}
            className="inline-block bg-accent text-white font-heading text-sm uppercase tracking-wider px-8 py-4 hover:opacity-90 transition-opacity"
          >
            Schedule a Pricing Consultation
          </Link>
        </div>
      </section>
    </div>
  )
}
