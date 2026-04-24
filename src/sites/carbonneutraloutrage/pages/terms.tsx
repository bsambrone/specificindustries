import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Terms of Use — Campaign for Sustainable Overreactions",
  description: "Membership terms, pitchfork library rules, offset registry conditions, and dispute resolution.",
}

export default function TermsPage() {
  return (
    <>
      <Hero
        headline="Terms of Use"
        subheadline="Membership, program participation, and registry use are governed by the terms below in addition to the umbrella Specific Industries terms."
      />
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto space-y-6 text-foreground/80">
          <div className="text-sm bg-secondary/10 border border-primary/20 rounded-lg p-5">
            <p>
              The authoritative terms of use for all Specific Industries properties are maintained at{" "}
              <a href="https://specificindustries.com/terms" className="text-primary underline hover:text-secondary transition-colors">
                specificindustries.com/terms
              </a>.{" "}
              The sections below describe the Campaign&apos;s program-specific terms in addition to the umbrella terms.
            </p>
          </div>

          <h2 className="text-2xl font-heading font-bold text-primary pt-6">§1 — Membership</h2>
          <p>
            Campaign membership is open to any individual who has signed the Pledge of Responsible Outrage. Membership is annual, sliding-scale, and may be terminated by either party at any time. Lapsed members forfeit voting rights at the Annual Convening but retain access to the offset registry for previously purchased credits.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">§2 — Conduct</h2>
          <p>
            Members agree to engage with civic outrage in a manner consistent with the principles articulated in the Pledge. Repeated non-compliance — including unoffset overreactions exceeding 10 kg CO₂e in a calendar quarter — may result in remedial composting workshop assignment.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">§3 — The Tantrum Footprint Methodology</h2>
          <p>
            The Tantrum Footprint methodology is the intellectual property of the Campaign. Use of the methodology in research, publication, or commercial application requires written permission from the Methodology Council. The calculator widget on this site is offered free of charge for individual, non-commercial use.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">§4 — Acceptable Use of Reusable Pitchforks</h2>
          <p>
            Pitchforks checked out from a Campaign library are intended for civic engagement, peaceful demonstration, and home-garden use. Pitchforks may not be: (a) painted over the Campaign logo, (b) used in commercial agriculture without supplemental insurance, (c) sub-loaned to non-members, or (d) altered in tine configuration without an authorized sharpening cooperative consultation. Lost or unreturned pitchforks incur a $40 replacement fee.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">§5 — Offset Registry</h2>
          <p>
            Verified Outrage Offsets™ are issued under our published v4.2 methodology and retired against documented reduction projects in our partner network. Credits are non-transferable except as part of a formal estate transfer through Director Kellner&apos;s office. The Campaign reserves the right to invalidate any credit found to have been issued in error, with prompt refund to the original purchaser.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">§6 — Credentialing</h2>
          <p>
            The Certified Responsible Overreactor™ credential is issued by the Campaign and remains valid for five years from the date of issuance, after which renewal is encouraged. The Campaign does not guarantee that the credential will be recognized by any external professional body, regulatory authority, or hiring manager. Holders are encouraged to advocate for the credential&apos;s adoption in their respective sectors.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">§7 — Disputes</h2>
          <p>
            Disputes arising under these terms shall be resolved first through informal discussion with the relevant program director. Unresolved disputes may be escalated to the Methodology Council, whose decisions are final except in cases involving offset credit invalidation, which may be further appealed to the Campaign&apos;s Board of Directors.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">§8 — Limitation of Liability</h2>
          <p>
            The Campaign is not responsible for outcomes resulting from the application of its methodology, the use of its calculator, or member participation in any of its programs. Members participate at their own discretion. The Campaign disclaims responsibility for any social, professional, or familial consequences of the Pledge.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">§9 — Cap-and-Trade Disputes</h2>
          <p>
            Member-to-member offset credit transfers are not formally supported. Where members nonetheless attempt such transfers, the Campaign disclaims all responsibility for valuation disputes, fractional-credit accounting, or the cascading reputational consequences of an unrecognized transfer.
          </p>
        </div>
      </section>
    </>
  )
}
