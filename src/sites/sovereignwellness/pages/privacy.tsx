import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Privacy Policy — Sovereign Wellness Co.",
  description: "How we treat the correspondence, records, and quiet preferences of those who find us.",
}

export default function SovereignWellnessPrivacy() {
  return (
    <>
      <Hero
        headline="Privacy Policy"
        subheadline="Our considered approach to your records, your correspondence, and your preferences."
      />
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-6 text-foreground/80 leading-relaxed">
          {/* Umbrella callout */}
          <p className="text-sm text-foreground/80 bg-secondary/40 border border-primary/30 p-4">
            The authoritative privacy policy for all Specific Industries properties is maintained at{" "}
            <a href="https://specificindustries.com/privacy" className="text-primary underline hover:opacity-70 transition-opacity">specificindustries.com/privacy</a>.{" "}
            That document governs all data handling for this site. The sections below are the ancillary provisions specific to the operation of the Sovereign Wellness Archive. Where they conflict, the authoritative policy prevails.
          </p>
          <p className="text-sm text-foreground/40 italic">
            Last revised in the corridor of portraits, by quill, in triplicate. Version 14.0.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-primary mt-8">1. On the Information We Inherit</h2>
          <p>
            We inherit, in the course of an inquiry, only what you choose to include. We do not seek more. We do not cross-reference. We do not, as a matter of policy, look up the rest. The Archive is for Protocols, not for persons; your records are a ledger entry, not a file.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-primary">2. Cookies &amp; Other Warded Objects</h2>
          <p>
            Our website uses a small number of browser cookies for the modest tasks a website now requires — remembering your preferences, maintaining the integrity of the correspondence form, and little else. None of these cookies are shared with third-party commercial entities. We have no tracking pixels. We have no advertising partners. We do not sell what a cookie knows; we do not sell anything, in fact, that is not a Protocol.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-primary">3. Data We Share With The Archive Keepers</h2>
          <p>
            The following persons may access your inquiry in the normal course of our operations: Mr. Callaghan (Chief of Protocols &amp; Verification), who reads and triages inquiries; Mr. Marsh (Keeper of the Restricted Archive), who is consulted where your inquiry involves the Archive itself; and Dr. Harrow (Founder), whose review is occasionally requested and whose review is never declined. No party beyond these three accesses your correspondence. The Archive does not, itself, read.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-primary">4. Your Right To Be Forgotten (By Them, Not By Us)</h2>
          <p>
            You may, at any time, request that your ledger entry be redacted. We will honor this request within one lunar cycle. The redaction is physical; a custodian draws a line through the entry in ink. The entry is not destroyed — no entry is ever destroyed — but after redaction, it is not consulted, and in the ordinary course of time, it is forgotten. This we offer.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-primary">5. A Note On Encrypted Dispatches</h2>
          <p>
            We accept encrypted correspondence. We do not, however, encourage it. The key logistics required to maintain an active encryption regime have, in our experience, not survived the attentions of three federal inquiries. Plaintext, read by hand, on the third Tuesday, has proven more durable. We recommend plaintext, with the understanding that there are no technical guarantees against the means of interception available to well-resourced actors — and that the most durable security is, as it has always been, discretion in the writing.
          </p>
        </div>
      </section>
    </>
  )
}
