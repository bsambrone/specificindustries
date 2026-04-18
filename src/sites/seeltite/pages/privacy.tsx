import { Hero } from "@/components/ui/hero"
import { CautionStripe } from "../components/caution-stripe"

export const metadata = {
  title: "Privacy Policy — Seel-Tite Containment Systems",
  description: "How Seel-Tite treats seal-event telemetry, fragrance preference logs, firmware heartbeat data, and other records.",
}

export default function SeeltitePrivacy() {
  return (
    <>
      <Hero
        headline="Privacy Policy"
        subheadline="Data practices for Seel-Tite products and the Telemetry program."
      />
      <CautionStripe text="Classified · Retained · Deletable On Request" />
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-6 text-foreground/80 leading-relaxed">
          <p className="text-sm text-foreground/80 bg-secondary/10 border border-primary/30 p-4">
            The authoritative privacy policy for all Specific Industries properties is maintained at{" "}
            <a href="https://specificindustries.com/privacy" className="text-primary underline hover:opacity-70 transition-opacity">specificindustries.com/privacy</a>.{" "}
            That document governs all data handling for this site. The sections below are the ancillary provisions specific to Seel-Tite Containment Systems. Where they conflict, the authoritative policy prevails.
          </p>
          <p className="text-sm text-foreground/40 italic">
            Last revised in the Akron shop, engineering bay 4, by hand. Revision 18.0.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-primary mt-8">1. On Seal-Event Telemetry</h2>
          <p>
            The Telemetry Module transmits seal-integrity readings to the Seel-Tite companion app at 32 Hz. These readings comprise pressure, micro-flex, and thermal profile — they do not include audio, video, or location. We retain anonymized, de-identified aggregate telemetry for product-development purposes. We do not retain per-toot identifiable logs beyond 72 hours, absent an explicit user export request.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-primary">2. Fragrance Preference Logs</h2>
          <p>
            The Odor-Neutralizing Cartridge Module reports cartridge-swap events (Cedar, Workshop, Linen) to the companion app when paired. These events inform automatic re-order prompts. We do not share fragrance preference data with any third party, because there is no third party to whom we could plausibly sell the information that a user prefers Cedar over Linen on Tuesdays.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-primary">3. Firmware Heartbeat Collection</h2>
          <p>
            Connected accessories (Grinder, Cryo-Puck, Incinerator, Telemetry Module) report a firmware heartbeat every six hours. The heartbeat contains only: firmware revision, cycle count, and self-diagnostic flags. It does not contain event data. It exists so we can notify you when a rev upgrade is available and so our engineers can confirm that the product you bought in 2014 is still operating within specification.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-primary">4. Field Reports Program</h2>
          <p>
            If you submit a Field Report via reports@seeltite.example — describing a toot you won or lost — we will, with your permission, redact and publish the account in the Scenarios or Recovery catalog on this website. Your name, setting, accessory used, and pull-quote may be included. Your identifying details will be fictionalized to the degree you request. You may withdraw consent at any time and we will remove the case. We have never declined a removal request.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-primary">5. Right to Have Your Records Unclipped</h2>
          <p>
            You may, at any time, request the deletion of all telemetry, preference, and heartbeat data associated with your account. We will honor this request within ten business days. The deletion is thorough — we unclip the records from the ledger, as our founder phrases it, and the records are not consulted again. We do not retain cold backups of consumer telemetry.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-primary">6. No Third-Party Sale</h2>
          <p>
            Seel-Tite does not sell, license, or barter user data. We have no advertising partners. We have no data brokers. We have a catalog and a customer service line. That is the business. The data belongs to the customer.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-primary">7. On Toot Event Logs</h2>
          <p>
            When a customer pairs a Telemetry Module with the G1, our systems record the pressure signature of every toot event — whether successful (a confident toot) or not (a lost gamble that triggered an accessory). These logs do not include audio. They do not include location. They do not leave our systems. We retain them for 72 hours, after which they are aggregated into anonymized product-development statistics and the per-user record is discarded.
          </p>
          <p>
            If you would like your toot logs deleted sooner, you may request it by emailing <a href="mailto:inquiry@seeltite.example" className="text-primary underline">inquiry@seeltite.example</a>. We will honor the request within one business day. We have never declined this request.
          </p>
        </div>
      </section>
    </>
  )
}
