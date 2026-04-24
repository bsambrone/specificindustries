import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Privacy Policy — Campaign for Sustainable Overreactions",
  description: "How the Campaign processes member data, outrage logs, and offset transaction records.",
}

export default function PrivacyPage() {
  return (
    <>
      <Hero
        headline="Privacy Policy"
        subheadline="The Campaign handles your data with the same rigor we apply to outrage emissions: measured, audited, and disclosed."
      />
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto space-y-6 text-foreground/80">
          <div className="text-sm bg-secondary/10 border border-primary/20 rounded-lg p-5">
            <p>
              The authoritative privacy policy for all Specific Industries properties is maintained at{" "}
              <a href="https://specificindustries.com/privacy" className="text-primary underline hover:text-secondary transition-colors">
                specificindustries.com/privacy
              </a>{" "}
              and governs all data handling. The sections below describe the Campaign&apos;s program-specific practices in addition to the umbrella policy.
            </p>
          </div>

          <h2 className="text-2xl font-heading font-bold text-primary pt-6">§1 — What We Collect</h2>
          <p>
            We collect the information necessary to operate our programs: pledge sign-ups, chapter membership records, pitchfork checkout history, offset transaction records, and Tantrum Footprint Calculator inputs (when voluntarily submitted to a server, which is rare). We do not collect biometric data except where members elect to participate in our voluntary decibel-disclosure program.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">§2 — Outrage Logs</h2>
          <p>
            Members of the Verified Outrage Offsets™ program submit incident reports as part of credit purchases. These reports are anonymized in aggregate reporting but retained in identified form for audit purposes for the duration required by our methodology.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">§3 — How We Process Your Outrage</h2>
          <p>
            Outrage records submitted to the Campaign are processed under our v4.2 methodology. Inputs are stored in a securely audited database. Aggregated, anonymized statistics are published in our annual State of Responsible Outrage report. Individual records are not shared except as required by IRS reporting obligations or in response to a legitimate research request reviewed by our Methodology Council.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">§4 — Cookies</h2>
          <p>
            Our website uses cookies for session continuity and to remember your preferred chapter when you visit the chapter directory. We do not use third-party advertising cookies. We compost expired session data on a rolling 90-day cycle.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">§5 — Donor Records</h2>
          <p>
            Donor records are held by Director of Donor Relations Rory Kellner and his team under standard 501(c)(3) confidentiality practices. Lifetime giving records are retained indefinitely as part of our Patron Council infrastructure. Anonymous giving is supported and respected.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">§6 — Third Parties</h2>
          <p>
            We share data only with: (a) IRS and state regulators where required, (b) auditors performing our annual financial and methodology audits, and (c) partner reduction-project operators in connection with offset credit retirement. We do not sell data. We have no plans to begin selling data, and the Methodology Council has reviewed and rejected three vendor proposals to that effect since 2022.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">§7 — Your Right to Be Forgotten by the Outrage of the Month Club</h2>
          <p>
            Subscribers may unsubscribe from the Outrage of the Month Club at any time by responding to any monthly delivery with the word UNSUBSCRIBE. Pledge memberships, offset purchase records, and credentialing records persist independently of subscription status — these are governed by their respective program retention policies.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">§8 — Changes to This Policy</h2>
          <p>
            We update this policy annually, in the spring, in conjunction with our annual report. Substantive changes are summarized in a member-facing email. Editorial revisions are noted in the Methodology Council&apos;s quarterly minutes.
          </p>
        </div>
      </section>
    </>
  )
}
