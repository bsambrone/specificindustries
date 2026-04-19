import { AddToCartButton } from "@/components/commerce/add-to-cart-button"
import MedicalCallout from "../components/medical-callout"
import { getProductBySlug } from "../data/products"

export const metadata = {
  title: "The Bolus Protocol — Prechewed™",
  description:
    "The Daily Bolus is the foundational SKU in the Prechewed™ catalog. One pouch. Full-day nutrition. Zero jaw-hours.",
}

export default function PrechewedBolus() {
  const daily = getProductBySlug("daily-bolus")
  if (!daily) return null

  return (
    <main className="max-w-5xl mx-auto px-6 py-20">
      <div
        className="text-xs uppercase tracking-[0.25em] font-mono mb-5"
        style={{ color: "var(--color-primary, #5B3FD9)" }}
      >
        The Daily Bolus
      </div>
      <h1 className="text-4xl md:text-6xl font-semibold mb-6 leading-tight">
        The Bolus Protocol
      </h1>
      <p
        className="text-xl md:text-2xl leading-relaxed mb-12"
        style={{ color: "var(--color-muted, #6C6A7D)" }}
      >
        One pouch. Full-day nutrition. Zero jaw-hours. A manifesto for operators who have decided
        that mealtime is, at best, an interruption.
      </p>

      <div className="grid md:grid-cols-[1fr_320px] gap-12">
        {/* Left: long-form body */}
        <div className="flex flex-col gap-6 text-lg leading-relaxed">
          <p>
            The Daily Bolus is not a meal replacement. It is a meal rendering — an engineered
            distillation of a full day&apos;s nutritional requirement into a matrix-stabilized 4.5-ounce
            pouch. The protocol is simple. You follow it, or you do not.
          </p>
          <p>
            Theodore Whitlock developed the Bolus during an 18-month engagement at a Kyoto
            laboratory. He had, in his words, &ldquo;noticed a calendar.&rdquo; The calendar described 47
            days per year — 3.9 hours per day — spent actively chewing. In the first 90 days of
            the protocol, Whitlock reclaimed, by his own accounting, 11 working days. The second
            quarter: 12 more. The first full year: 47.
          </p>

          <MedicalCallout label="Protocol Overview">
            <p className="font-medium">
              Morning: one pouch before deep work. Midday: one pouch during focus blocks. Evening:
              one pouch after last meeting.
            </p>
          </MedicalCallout>

          <h2 className="text-2xl font-semibold mt-6">Four phases of the protocol</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                phase: "Morning",
                copy: "Pre-deep-work delivery. Fasting-compatible for intermittent protocols.",
              },
              {
                phase: "Midday",
                copy: "Focus-block alignment. Designed for 90-minute work sprints.",
              },
              {
                phase: "Pre-deep-work (optional)",
                copy: "Secondary dose for extended sessions >6 hours.",
              },
              {
                phase: "Evening",
                copy: "End-of-day integration. Do not administer within 2 hours of sleep.",
              },
            ].map((p) => (
              <div
                key={p.phase}
                className="p-5 rounded-lg border"
                style={{ borderColor: "var(--color-border, #E6E3F0)" }}
              >
                <div
                  className="text-xs font-mono uppercase tracking-[0.2em] mb-2"
                  style={{ color: "var(--color-primary, #5B3FD9)" }}
                >
                  {p.phase}
                </div>
                <p className="text-sm">{p.copy}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-semibold mt-6">Testimonials</h2>
          <div className="flex flex-col gap-4">
            {[
              {
                q: "I tried the Bolus for 30 days as a founder-operator experiment. It is the single highest-leverage intervention I&apos;ve made to my calendar since adopting a single-inbox policy.",
                a: "Managing Partner, early-stage fund",
              },
              {
                q: "I had questions about the ethics. I do not have them anymore.",
                a: "CEO, series B SaaS",
              },
              {
                q: "My jaw feels fine. My calendar does not feel fine. My calendar feels different.",
                a: "Solo founder, stealth",
              },
            ].map((t, i) => (
              <blockquote
                key={i}
                className="pl-5 border-l-2"
                style={{ borderColor: "var(--color-primary, #5B3FD9)" }}
              >
                <p className="text-base italic">&ldquo;{t.q}&rdquo;</p>
                <footer
                  className="text-xs font-mono mt-2"
                  style={{ color: "var(--color-muted, #6C6A7D)" }}
                >
                  — {t.a}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>

        {/* Right: sticky buy box */}
        <aside
          className="md:sticky md:top-24 self-start p-6 rounded-lg border"
          style={{
            borderColor: "var(--color-border, #E6E3F0)",
            background: "var(--color-surface, #FFFFFF)",
          }}
        >
          <div
            className="text-xs uppercase tracking-[0.2em] font-mono mb-3"
            style={{ color: "var(--color-primary, #5B3FD9)" }}
          >
            Start the protocol
          </div>
          <div className="text-3xl font-semibold mb-1">$42</div>
          <div
            className="text-sm font-mono mb-6"
            style={{ color: "var(--color-muted, #6C6A7D)" }}
          >
            Single pouch · 4.5 oz
          </div>
          <AddToCartButton slug={daily.slug} productName={daily.name} />
          <div
            className="mt-5 pt-5 border-t text-sm"
            style={{
              borderColor: "var(--color-border, #E6E3F0)",
              color: "var(--color-muted, #6C6A7D)",
            }}
          >
            <div
              className="font-medium mb-2"
              style={{ color: "var(--color-foreground, #0F0E1A)" }}
            >
              Subscribe &amp; save 15%
            </div>
            <p>Quarterly pre-pay; ships every 30 days. Cancel anytime via certified letter.</p>
          </div>
        </aside>
      </div>
    </main>
  )
}
