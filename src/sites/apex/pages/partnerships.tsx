import Link from "next/link"
import { Hero } from "@/components/ui/hero"
import { CriteriaList, type CriteriaItem } from "@/components/ui/criteria-list"
import { PartnershipsForm } from "./partnerships-form"
import { getRecentPressReleases } from "../data/press-releases"

const ACQUISITION_CRITERIA: CriteriaItem[] = [
  { heading: "Total addressable market under 11,000 people" },
  { heading: "Product category that most retailers have not classified" },
  { heading: "No meaningful competition currently serving the category" },
  { heading: "Founder prepared to commit indefinitely" },
  { heading: "Product premise can withstand 15 seconds of explanation" },
  { heading: "Brand name is either already good or can be improved by our Naming Conventions team" },
]

const PROCESS_STEPS: CriteriaItem[] = [
  {
    heading: "Submit your industry via the form below",
    description: "Complete the standard intake form. All fields are required except the supporting documentation attachment.",
  },
  {
    heading: "Evaluation",
    description: "Our Niche Market Analytics team conducts an evaluation of the submitted industry. The current queue length is 14 to 18 months.",
  },
  {
    heading: "Contact (if selected)",
    description: "If your industry is selected for further discussion, a member of our M&A team will reach out by written correspondence.",
  },
  {
    heading: "No response (if not selected)",
    description: "If your industry is not selected, you will not hear from us. The proposal is considered dormant and may be re-submitted after a 36-month waiting period.",
  },
]

const FAQS: { q: string; a: string }[] = [
  {
    q: "Does Specific Industries pay for acquisitions?",
    a: "Compensation in acquisitions varies and is determined at our sole discretion. Compensation is not always monetary.",
  },
  {
    q: "What is the typical acquisition timeline?",
    a: "Acquisition timelines vary. Our average evaluation period is 14 to 18 months, followed by an acquisition process of an additional 6 to 14 months.",
  },
  {
    q: "Can I submit more than one industry?",
    a: "Yes. Each industry must be submitted separately. Batch submissions will be processed as individual entries and evaluated independently.",
  },
  {
    q: "Will my submission be confidential?",
    a: "Submissions are received and filed in our internal intake system. Internal distribution is limited to the M&A team. We make no representations about external confidentiality beyond standard business practice.",
  },
  {
    q: "Can I follow up on my submission?",
    a: "No. Follow-up inquiries are not responded to. If we wish to follow up with you, we will.",
  },
  {
    q: "What if my industry has more than 11,000 participants?",
    a: "Industries with more than 11,000 participants fall outside our investment criteria. We encourage you to consider whether a narrower definition of your industry might bring it into range.",
  },
]

export default function ApexPartnerships() {
  const recentActivity = getRecentPressReleases(4).filter((r) =>
    r.headline.toLowerCase().includes("acquisition") ||
    r.headline.toLowerCase().includes("expand") ||
    r.headline.toLowerCase().includes("closes deal") ||
    r.headline.toLowerCase().includes("completes")
  )

  return (
    <>
      <Hero
        headline="Strategic Acquisitions & Partnerships"
        subheadline="We are always evaluating new industries. If your industry is overlooked, we would like to know about it."
      />

      <section className="py-14 px-4 bg-secondary/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-primary mb-8">Acquisition Criteria</h2>
          <CriteriaList items={ACQUISITION_CRITERIA} />
        </div>
      </section>

      <section className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-primary mb-8">How the Process Works</h2>
          <CriteriaList items={PROCESS_STEPS} numbered />
        </div>
      </section>

      <section className="py-14 px-4 bg-secondary/10">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-primary mb-6">Submit Your Industry for Evaluation</h2>
          <p className="text-sm text-foreground/70 mb-8">
            Please complete all required fields. A confirmation will be displayed upon submission.
          </p>
          <PartnershipsForm />
        </div>
      </section>

      {recentActivity.length > 0 && (
        <section className="py-14 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-heading font-bold text-primary mb-8">Recent Acquisitions</h2>
            <ul className="space-y-3">
              {recentActivity.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/newsroom/${r.slug}`}
                    className="block p-4 rounded-lg border border-primary/10 bg-background hover:border-primary/30 transition-colors"
                  >
                    <p className="text-[11px] uppercase tracking-[0.15em] text-foreground/50 font-heading mb-1">{r.date}</p>
                    <h3 className="font-heading font-semibold text-primary leading-tight">{r.headline}</h3>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="py-14 px-4 bg-secondary/10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-primary mb-8">Frequently Asked Questions</h2>
          <dl className="space-y-6">
            {FAQS.map((faq) => (
              <div key={faq.q}>
                <dt className="font-heading font-semibold text-primary mb-2">{faq.q}</dt>
                <dd className="text-foreground/80 leading-relaxed text-sm">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  )
}
