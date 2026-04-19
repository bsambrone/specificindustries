export default function LegalFooter() {
  return (
    <aside
      className="w-full border-t border-foreground/10"
      style={{ background: "#EFE7D9" }}
    >
      <div className="max-w-5xl mx-auto px-6 py-10 text-[10px] leading-snug font-mono text-foreground/80 space-y-5">
        <p className="uppercase tracking-widest text-[9px] text-foreground/60">
          Petjacks Propulsion, LLC — Required Disclosures
        </p>

        <section>
          <p className="font-semibold mb-1">Fatality Rate Disclosure (2025 internal audit)</p>
          <ul className="space-y-0.5">
            <li>Whiskerwings 300 (feline): 37% non-recovery across 212 documented flights.</li>
            <li>Pupjet Ultra (canine): 42% non-recovery across 338 documented flights.</li>
            <li>Hopperlauncher LX (lagomorph): 29% non-recovery across 94 documented flights.</li>
            <li>FinFlyer AquaPro (aquatic): 59% non-recovery across 61 documented flights.</li>
          </ul>
        </section>

        <section>
          <p className="font-semibold mb-1">Active Class Actions</p>
          <ul className="space-y-0.5">
            <li><em>Thornbury v. Petjacks Propulsion, LLC</em> — N.D. Ohio, No. 1:24-cv-04812 (filed 2024-07-19).</li>
            <li><em>Marwick et al. v. Petjacks Propulsion, LLC</em> — S.D. Cal., No. 3:25-cv-00114 (filed 2025-01-30).</li>
            <li><em>Estate of Nugget v. Petjacks Propulsion, LLC</em> — N.D. Ill., No. 1:25-cv-01908 (filed 2025-03-11).</li>
          </ul>
        </section>

        <section>
          <p className="font-semibold mb-1">Regulatory Notices</p>
          <ul className="space-y-0.5">
            <li>Petjacks products are not certified by the FAA for operation in Class B, C, D, or E airspace.</li>
            <li>Petjacks beacons and tracker devices are not FCC-approved for continuous transmission above 400 ft AGL.</li>
            <li>USDA APHIS has issued informational guidance regarding hobbyist pet propulsion (2024-11-04).</li>
          </ul>
        </section>

        <section>
          <p className="font-semibold mb-1">Voluntary Recall History</p>
          <ul className="space-y-0.5">
            <li>Batch PJU-2024-B (Pupjet Ultra, thrust regulator defect) — recalled 2024-06-22.</li>
            <li>Batch PJU-2024-F (Pupjet Ultra, ignition harness resistor) — recalled 2024-10-02.</li>
            <li>Batch PJU-2025-A (Pupjet Ultra, fuel cell seating) — recalled 2025-02-14.</li>
            <li>Batch FFP-2024-C (FinFlyer AquaPro, capsule seal) — recalled 2024-09-08.</li>
          </ul>
        </section>

        <section>
          <p className="font-semibold mb-1">Warranty Exclusions</p>
          <p>
            Warranty does not cover re-entry events, roof impacts, municipal code violations, wildlife interactions,
            operator misconfiguration, hazardous atmospheric conditions, post-flight disappearance, or emotional
            consequences to the operator or their household. Fish products are non-returnable once the capsule seal is broken.
          </p>
        </section>

        <section>
          <p className="font-semibold mb-1">Known Side Effects</p>
          <ul className="space-y-0.5">
            <li>Temporary or persistent disorientation in recovered animals.</li>
            <li>Altered vocalization patterns in felines.</li>
            <li>Household behavioral changes following Mission Gallery publication.</li>
            <li>Grief response in household members, of variable duration.</li>
          </ul>
        </section>

        <section>
          <p className="font-semibold mb-1">Binding Arbitration</p>
          <p>
            All disputes are subject to binding individual arbitration under the rules of JAMS, venue Hamilton County, Ohio.
            Class action waivers apply. By using our products, you agree to these terms.
          </p>
        </section>

        <p className="text-[9px] text-foreground/50 pt-3 border-t border-foreground/10">
          Petjacks® and Petjacks Propulsion™ are trademarks of Petjacks Propulsion, LLC, a wholly-owned subsidiary of Specific Industries. © 2026 Petjacks Propulsion, LLC. All rights reserved.
        </p>
      </div>
    </aside>
  )
}
