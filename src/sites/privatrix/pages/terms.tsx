import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Terms of Service — Privatrix",
  description: "Legally binding upon implication. Effective immediately. Renewable quarterly.",
}

const SECTIONS = [
  {
    title: "1. Acceptance (Implied By Reading)",
    body:
      "By loading this page, scrolling past the hero, or considering the implications of any sentence below, you agree to these Terms in their entirety. Acceptance is implied by attention. Closing your browser does not constitute revocation. Forwarding the URL to a colleague extends acceptance to the colleague.",
  },
  {
    title: "2. Service Level Agreement (We'll Try)",
    body:
      "Privatrix commits to commercially reasonable efforts to deliver service availability of approximately some percentage of the time. We do not commit to a specific number, an uptime target, or any consequence in the event of failure. We will, however, send you a thoughtful email if a major outage occurs.",
  },
  {
    title: "3. Indemnification (Yours, Not Ours)",
    body:
      "Customer agrees to indemnify, defend, and hold harmless Privatrix, its affiliates, its officers, its contractors, its cousin Eoghan, and any party Privatrix may at any future date refer to as a 'partner,' against any and all claims of any nature whatsoever. Indemnification is unilateral and broadly construed.",
  },
  {
    title: "4. Force Majeure (Including Mercury Retrograde)",
    body:
      "Privatrix is excused from performance under these Terms during periods of force majeure, defined to include: natural disasters, pandemics, regulatory action, board changes, planetary alignments unfavorable to enterprise software, the periodic retrograde motion of Mercury, our CEO's quarterly vacations, and any other event Privatrix in its sole discretion deems disruptive.",
  },
  {
    title: "5. Limitation of Liability (Total)",
    body:
      "In no event shall Privatrix's aggregate liability under these Terms exceed the lesser of (a) one hundred dollars ($100), (b) the amount Customer has paid Privatrix in the preceding twelve (12) months, or (c) zero dollars ($0). All forms of damages are excluded, including direct, indirect, incidental, consequential, special, exemplary, and emotional.",
  },
  {
    title: "6. Governing Law (Whichever Suits Us)",
    body:
      "These Terms are governed by the laws of the State of Delaware, the State of New Jersey, the Republic of Ireland (where applicable), and any other jurisdiction Privatrix may elect at the time a dispute is raised. Choice of forum is exclusively that of Privatrix.",
  },
  {
    title: "7. Termination (One-Sided)",
    body:
      "Privatrix may terminate this agreement at any time, for any reason, with no notice. Customer may terminate this agreement upon ninety (90) days' written notice, payment of all outstanding fees, and execution of a written acknowledgement that nothing of value was provided during the term. Termination does not affect the survival of any obligations imposed on Customer.",
  },
]

export default function PrivatrixTerms() {
  return (
    <>
      <Hero
        headline="Terms of Service"
        subheadline="Effective immediately. Renewable quarterly. Non-negotiable."
        dark
      />
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="border-2 border-primary/20 bg-primary/5 rounded-lg p-5 text-sm text-foreground/80">
            <p className="font-semibold text-primary mb-2">Legal Notice</p>
            <p>
              The authoritative terms of service governing all Specific Industries properties — including Privatrix — are published at{" "}
              <a href="https://specificindustries.com/terms" className="text-accent underline hover:text-primary transition-colors">
                specificindustries.com/terms
              </a>
              . Those terms supersede anything you read on this page. The content below is part of the satirical Privatrix experience and is not a binding legal document.
            </p>
          </div>

          {SECTIONS.map((s) => (
            <article key={s.title}>
              <h2 className="text-2xl font-heading font-bold text-primary mt-8 mb-3">{s.title}</h2>
              <p className="text-foreground/80 leading-relaxed">{s.body}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
