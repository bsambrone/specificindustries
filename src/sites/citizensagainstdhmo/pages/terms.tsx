import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Terms of Service — Citizens Against DHMO",
  description: "Terms governing your use of citizensagainstdhmo.specificindustries.com and participation in our programs.",
}

export default function TermsPage() {
  return (
    <>
      <Hero
        headline="Terms of Service"
        subheadline="The agreement between Citizens Against DHMO and the citizens we serve."
      />
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto space-y-6 text-foreground/80">
          <div className="text-sm bg-secondary/10 border border-primary/20 rounded-lg p-5">
            <p>
              The authoritative terms of service for all Specific Industries properties is maintained at{" "}
              <a href="https://specificindustries.com/terms" className="text-primary underline hover:text-secondary transition-colors">
                specificindustries.com/terms
              </a>{" "}
              and governs all use of our properties. The sections below describe Citizens Against DHMO program-specific terms in addition to the umbrella terms.
            </p>
          </div>

          <h2 className="text-2xl font-heading font-bold text-primary pt-6">§1 — Acceptable Use</h2>
          <p>
            You may use this site for personal, non-commercial purposes related to learning about DHMO, signing petitions, joining chapters, and accessing public-facing program materials. Bulk scraping, automated petition submission, or impersonation of other citizens is prohibited.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">§2 — Petitions and Public Submissions</h2>
          <p>
            Petition signatures you submit may be included in formal regulatory filings and may become part of the public record. By signing, you authorize the inclusion of your name and ZIP code in such filings.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">§3 — Survivor Stories</h2>
          <p>
            Survivor stories submitted via the intake program are subject to the program&apos;s standalone consent agreement. Use, publication, and editorial control are addressed in that agreement, not these terms.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">§4 — Disclaimer of Medical Advice</h2>
          <p>
            Nothing on this site constitutes medical advice. We are an awareness and disclosure-advocacy movement, not a medical authority. Consult a licensed clinician before changing your DHMO intake.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">§5 — Chapter Conduct</h2>
          <p>
            Chapter participants are bound by the Chapter Code of Conduct. Violations may result in chapter-level or national-office disciplinary action.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">§6 — Limitation of Liability</h2>
          <p>
            The movement provides this site &ldquo;as is&rdquo; without warranties of any kind. To the fullest extent permitted by law, we disclaim liability for indirect, incidental, or consequential damages.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">§7 — Governing Law</h2>
          <p>
            These terms are governed by the laws of the State of Delaware, where our parent organization is incorporated.
          </p>
        </div>
      </section>
    </>
  )
}
