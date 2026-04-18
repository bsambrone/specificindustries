import Link from "next/link"
import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "Enterprise — Superengineered",
  description: "Bulk utensil-as-a-service, SSO-gated lighting, and compliance-grade toothbrushing for your workforce.",
}

const capabilities = [
  {
    heading: "Procurement",
    body: "Bulk hardware orders starting at 50 units. Staged shipment, asset tagging, and workforce provisioning via SCIM.",
  },
  {
    heading: "Compliance",
    body: "SOC 2 Type II. HIPAA-ready. ISO 27001 certified. SOX-compatible audit trails for every spoon in your cafeteria.",
  },
  {
    heading: "Identity",
    body: "SAML + OIDC + SCIM. Your employees sign into light switches with the same credentials they use for Salesforce.",
  },
  {
    heading: "Fleet Management",
    body: "A single pane of glass for up to 50,000 doorknobs. Real-time telemetry, firmware cohorts, compliance dashboards.",
  },
  {
    heading: "Support",
    body: "Dedicated TAM. 24/7 on-call for P1 utensil incidents. Quarterly business reviews with our Trust Architects.",
  },
  {
    heading: "Billing",
    body: "Monthly, annual, or multi-year commits. Usage-based tiers for heavy-touch utensils. Procurement-friendly net-60.",
  },
]

export default function SuperengineeredEnterprise() {
  return (
    <main className="bg-background">
      <section className="py-20 px-4 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-primary/60 mb-4">
          For Workplaces
        </p>
        <h1 className="text-5xl md:text-6xl font-heading font-light text-primary mb-4">
          Superengineered for Enterprise.
        </h1>
        <p className="text-xl text-primary/70 max-w-2xl mx-auto mb-8">
          Every essential object your workforce touches — brushed, turned, tapped, and spooned — instrumented, authenticated, and audited.
        </p>
        <Link
          href="/contact"
          className="inline-block px-8 py-3 rounded-full bg-accent text-white font-medium hover:opacity-90 transition-opacity"
        >
          Talk to sales
        </Link>
      </section>

      <section className="bg-secondary py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-light text-primary text-center mb-12">
            What you get.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capabilities.map((cap) => (
              <div key={cap.heading} className="bg-background rounded-2xl p-8">
                <h3 className="font-heading text-xl text-primary mb-3">{cap.heading}</h3>
                <p className="text-primary/70 leading-relaxed">{cap.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-light text-primary mb-4">
            Ready to standardize your essentials?
          </h2>
          <p className="text-primary/70 mb-8">
            Our enterprise team will scope a proof of concept in 14 days and a full rollout in under 90.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 rounded-full bg-primary text-background font-medium hover:opacity-90 transition-opacity"
          >
            Start a conversation
          </Link>
        </div>
      </section>
    </main>
  )
}
