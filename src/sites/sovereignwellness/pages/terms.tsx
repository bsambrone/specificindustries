import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Terms of Use — Sovereign Wellness Co.",
  description: "The terms under which the Archive extends its Protocols to those who find us.",
}

export default function SovereignWellnessTerms() {
  return (
    <>
      <Hero
        headline="Terms of Use"
        subheadline="The conditions under which the Archive extends its Protocols."
      />
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-6 text-foreground/80 leading-relaxed">
          {/* Umbrella callout */}
          <p className="text-sm text-foreground/80 bg-secondary/40 border border-primary/30 p-4">
            The authoritative Terms of Use for all Specific Industries properties are maintained at{" "}
            <a href="https://specificindustries.com/terms" className="text-primary underline hover:opacity-70 transition-opacity">specificindustries.com/terms</a>.{" "}
            That document governs your use of this site. The sections below are the ancillary provisions specific to the Archive. Where they conflict, the authoritative terms prevail.
          </p>
          <p className="text-sm text-foreground/40 italic">
            Revised quietly. Version 11.0, printed on paper milled at our own premises.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-primary mt-8">1. Acceptance of The Oath</h2>
          <p>
            By using this site, you accept the Founders&apos; Oath in abbreviated form: you will not advertise the Protocols you encounter here; you will not attempt to reproduce them outside of the channels we designate; and you will not, under any circumstances, use the telephone in relation to them. Acceptance is passive. It occurs at the moment of your first visit and recurs on each subsequent visit without additional consent.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-primary">2. On Proper Use of The Protocols</h2>
          <p>
            The Protocols are, at time of publication, administered by and to informed adults. They are not medical devices. They are not FDA-approved. They are not, in fact, approved by any body, and we consider this a feature rather than a shortcoming. Use of the Protocols is at the user&apos;s sole discretion, following the administration instructions printed on the accompanying documentation and, where applicable, the lunar phase.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-primary">3. On Spiritual Liability</h2>
          <p>
            We cannot accept liability for the spiritual consequences of Protocol use. Our formulators do not regard the spiritual as an afterthought; they regard it as a primary vector, which is why we publish the mechanism alongside the dosage. However, the spiritual is, in the end, yours. We decline to be held accountable for phenomena we decline to quantify.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-primary">4. Restricted Jurisdictions</h2>
          <p>
            The following counties and jurisdictions have formally requested we decline to ship Protocols to their residents: Yancey County, North Carolina; the Independent Borough of Greater Harmondale; Municipality of West Lesser Teal, Ohio; the Unincorporated District of Pine Hollow; Hamilton-Preston Judicial District 7; Township of Cold Archer; and thirty-three others. A complete list is available, upon written inquiry, by the third Tuesday. We honor these requests, with regret.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-primary">5. Disputes &amp; The Archive&apos;s Ruling</h2>
          <p>
            Disputes arising under these terms are resolved, first, by correspondence. If correspondence fails, the dispute is brought before the three senior officers of the organization for a written ruling. The ruling is communicated by letter and is final. There is no appeal. There has, in one hundred and eighty-two years, been no need for one.
          </p>
        </div>
      </section>
    </>
  )
}
