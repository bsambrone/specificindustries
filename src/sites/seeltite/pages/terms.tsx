import { Hero } from "@/components/ui/hero"
import { CautionStripe } from "../components/caution-stripe"

export const metadata = {
  title: "Terms of Service — Seel-Tite Containment Systems",
  description: "Warranty, proper sealing posture, accessory compatibility, and off-label disposal routing.",
}

export default function SeeltiteTerms() {
  return (
    <>
      <Hero
        headline="Terms of Service"
        subheadline="Warranty, usage, and liability provisions for Seel-Tite Containment Systems."
      />
      <CautionStripe text="Read · Acknowledged · Filed" />
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-6 text-foreground/80 leading-relaxed">
          <p className="text-sm text-foreground/80 bg-secondary/10 border border-primary/30 p-4">
            The authoritative Terms of Service for all Specific Industries properties is maintained at{" "}
            <a href="https://specificindustries.com/terms" className="text-primary underline hover:opacity-70 transition-opacity">specificindustries.com/terms</a>.{" "}
            That document governs all purchases, returns, and liability matters for this site. The sections below are the ancillary provisions specific to Seel-Tite Containment Systems. Where they conflict, the authoritative policy prevails.
          </p>
          <p className="text-sm text-foreground/40 italic">
            Last revised on a legal pad, in pencil, in the conference room Walt still calls &ldquo;the drafting room.&rdquo; Revision 22.0.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-primary mt-8">1. Accessory Compatibility Warranty</h2>
          <p>
            We warrant that every accessory in the Seel-Tite catalog clicks into the OPX-14 output port of every currently-shipping G1 Containment Gasket. If you experience a compatibility failure, we will replace the affected unit or issue a refund at our discretion. We have replaced 12 units in the last four years, all of them OPX-14 revision B with Pneumatic Ejector Kits from lot 4417.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-primary">2. Proper Sealing Posture Clause</h2>
          <p>
            For full hold rating, the G1 must be worn flush against the body with no interruption in circumferential contact. The user acknowledges that certain postures (deep lunges, extended splits, and — specifically — the Karate Kid &ldquo;crane stance&rdquo; at full extension) may reduce rated containment performance. We do not consider these postures to be ordinary wear, and toot failures during such postures are not covered under the seal-integrity warranty.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-primary">3. Off-Label Disposal Routing</h2>
          <p>
            The Shop-Vac Adapter is certified for routing to standard 1.25&quot; and 2.5&quot; wet/dry vacuum hoses. Routing to other receptacles — including, but not limited to, central vacuum systems, HVAC return ducts, drainage plumbing, or neighbors&apos; yards — is considered off-label and voids the Shop-Vac Adapter&apos;s warranty.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-primary">4. End-User Seal Integrity Acknowledgement</h2>
          <p>
            By purchasing a G1 Containment Gasket, the user acknowledges that (a) no containment system is 100% effective under all conditions, (b) the Backup Secondary Gasket accessory exists precisely to address that margin, and (c) Seel-Tite is not liable for scenarios in which the user elected to forgo the redundancy accessory. We recommend the Backup Secondary Gasket for all weddings, depositions, surgeries, congressional testimony, and transatlantic flights.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-primary">5. Consumables</h2>
          <p>
            Odor-Neutralizing Cartridges, CO₂ cartridges (for the Pneumatic Ejector Kit), and Cryo-Puck cooling cells are consumables. They are not covered under warranty past initial unboxing. They are also, unlike the rest of the catalog, entirely replaceable by the user with no tools.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-primary">6. Returns</h2>
          <p>
            We accept returns of unused, unopened Seel-Tite products within 30 days of delivery. For obvious and unavoidable reasons, we do not accept returns of used G1 Containment Gaskets, used disposal accessories, or used consumables.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-primary">7. Governing Law</h2>
          <p>
            These Terms are governed by the laws of the State of Ohio, where Seel-Tite is headquartered. Any dispute not resolved by correspondence with the Akron office shall be arbitrated before the Summit County Industrial Products Mediation Board, which Walter Thorne has sat on since 2007.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-primary">8. Toot Confidence Responsibility Acknowledgement</h2>
          <p>
            By using a Seel-Tite G1 Containment Gasket, you acknowledge that every toot is, at some level, a judgment call made by you. The G1 provides containment; the accessories provide recovery; the user provides the initial decision to commit. We encourage the test toot procedure (see the Fitment Guide) before any high-stakes toot. The test toot is the user&apos;s responsibility. The seal is ours.
          </p>
          <p>
            We are not responsible for user decisions to toot without the G1 in place, to toot while wearing the G1 inverted, to toot in postures explicitly listed as out-of-spec in Section 2 above, or to toot in the Karate Kid crane stance at full extension. These are user gambles, not product gambles.
          </p>
        </div>
      </section>
    </>
  )
}
