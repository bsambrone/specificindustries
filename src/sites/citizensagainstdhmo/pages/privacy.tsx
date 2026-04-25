import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Privacy Policy — Citizens Against DHMO",
  description: "How Citizens Against DHMO handles member data, petition records, and survivor intake materials.",
}

export default function PrivacyPage() {
  return (
    <>
      <Hero
        headline="Privacy Policy"
        subheadline="The movement handles your data with the same standards we ask institutions to apply to DHMO disclosure."
      />
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto space-y-6 text-foreground/80">
          <div className="text-sm bg-secondary/10 border border-primary/20 rounded-lg p-5">
            <p>
              The authoritative privacy policy for all Specific Industries properties is maintained at{" "}
              <a href="https://specificindustries.com/privacy" className="text-primary underline hover:text-secondary transition-colors">
                specificindustries.com/privacy
              </a>{" "}
              and governs all data handling. The sections below describe Citizens Against DHMO program-specific practices in addition to the umbrella policy.
            </p>
          </div>

          <h2 className="text-2xl font-heading font-bold text-primary pt-6">§1 — What We Collect</h2>
          <p>
            We collect the information necessary to operate our programs: petition signatures, chapter membership records, FOIA-coordination metadata, donor records, and survivor-intake materials (when voluntarily submitted). We do not collect biometric data and we do not track your physical location.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">§2 — Survivor Intake Materials</h2>
          <p>
            Materials submitted to the Survivor Advocacy program are held in confidence by the Director of Survivor Advocacy and care coordinators authorized under our intake protocol. These materials are not shared outside the program team without explicit written consent.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">§3 — Petition Records</h2>
          <p>
            Petition signatures are retained as part of the formal record submitted to federal regulators. Names and ZIP codes are included in the public submission; email addresses are retained internally for member-relations purposes.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">§4 — Cookies</h2>
          <p>
            We use minimal session cookies for navigation continuity. We do not run third-party advertising trackers. We retain server logs for a rolling 90-day window for security and abuse prevention.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">§5 — Donor Records</h2>
          <p>
            Donor records are managed under standard 501(c)(3) confidentiality practices. Anonymous giving is supported. Major-donor records are retained indefinitely for stewardship purposes.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">§6 — Children&apos;s Data</h2>
          <p>
            We do not knowingly collect data from anyone under 13. If a parent or guardian becomes aware that their child has submitted personal information to us, please contact our member services team and we will delete the information.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">§7 — Updates</h2>
          <p>
            We may revise this policy. Material changes will be announced via the home page banner for at least 30 days prior to taking effect.
          </p>
        </div>
      </section>
    </>
  )
}
