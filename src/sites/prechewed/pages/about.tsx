import Link from "next/link"
import { leaders } from "../data/leadership"

export const metadata = {
  title: "About — Prechewed™",
  description: "Prechewed Labs was founded in 2022 after its founder reclaimed 47 days in a Kyoto laboratory.",
}

const TIMELINE = [
  { year: "2022", event: "First Pre-Oral Hydrolysis™ patent filed in Kyoto" },
  { year: "2023", event: "First Certified Masticator™ graduates training program" },
  { year: "2023", event: "Prechewed Labs incorporated in California" },
  { year: "2024", event: "Series A (lead: Acre Capital)" },
  { year: "2025", event: "The Daily Bolus launched; catalog expanded to 20 SKUs" },
  { year: "2026", event: "Series B; The Founder\u2019s Reserve debut" },
]

const VALUES = [
  { v: "Pre-Oral Rigor", copy: "Every pouch is engineered with the same discipline as a pharmaceutical." },
  { v: "Bolus Integrity", copy: "Matrix stability, flavor fidelity, and shelf life are non-negotiable." },
  { v: "Jaw-Hour Reclamation", copy: "Our customer is the founder who has decided they have better things to do." },
  { v: "Operator Dignity", copy: "Our Certified Masticators are fairly compensated, licensed, and anonymized." },
]

export default function PrechewedAbout() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-4xl md:text-5xl font-semibold mb-5">A letter from Theodore Whitlock.</h1>
      <p className="text-lg mb-10" style={{ color: "var(--color-muted, #6C6A7D)" }}>
        On the founding of Prechewed Labs, on Pre-Oral Hydrolysis™, and on why chewing is theft from your future self.
      </p>

      <div className="flex flex-col gap-5 text-lg leading-relaxed mb-16">
        <p>I did not set out to start Prechewed. I set out to finish my last company. And in the process of finishing my last company, I noticed a calendar.</p>
        <p>The calendar described 3.9 hours per day — 47 working days per year — that I was spending actively chewing. I did not, at first, believe the calendar. I audited it. The calendar was correct. I was, on average, spending the equivalent of a 47-day vacation chewing each year, split into fifteen-minute units I had never consciously allocated.</p>
        <p>I spent the next 18 months in a laboratory in Kyoto working, with a small team, on whether that calendar could be reclaimed. It could. We built the process that we now call Pre-Oral Hydrolysis™. We built, from that process, the product we now call The Daily Bolus. And from that product, the 27 cuisine-coded variants that make up the current catalog.</p>
        <p>I believe, with some evidence, that in ten years it will be considered mildly strange to chew. I do not believe this because I want it to be true. I believe it because the calendar described a cost, and the cost, when eliminated, is not replaced by any cost of equivalent magnitude. The 47 days you get back do not charge you anything in return.</p>
        <p>I hope you will try the protocol. If you do, I hope you will stay on it.</p>
        <p className="italic" style={{ color: "var(--color-muted, #6C6A7D)" }}>— Theodore Whitlock, Founder &amp; CEO</p>
      </div>

      <section className="my-16">
        <h2 className="text-2xl font-semibold mb-6">Company timeline</h2>
        <div className="flex flex-col gap-3">
          {TIMELINE.map((t) => (
            <div key={`${t.year}-${t.event}`} className="flex gap-4 items-baseline border-b pb-3" style={{ borderColor: "var(--color-border, #E6E3F0)" }}>
              <div className="w-20 text-xs font-mono" style={{ color: "var(--color-primary, #5B3FD9)" }}>{t.year}</div>
              <div className="text-base">{t.event}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="my-16">
        <h2 className="text-2xl font-semibold mb-6">Values</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {VALUES.map((v) => (
            <div key={v.v} className="p-5 rounded-lg border" style={{ borderColor: "var(--color-border, #E6E3F0)" }}>
              <div className="text-xs font-mono uppercase tracking-[0.2em] mb-2" style={{ color: "var(--color-primary, #5B3FD9)" }}>{v.v}</div>
              <p className="text-sm" style={{ color: "var(--color-muted, #6C6A7D)" }}>{v.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="my-16">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-2xl font-semibold">Leadership</h2>
          <Link href="/leadership" className="text-sm font-mono hover:underline" style={{ color: "var(--color-primary, #5B3FD9)" }}>
            Full bios →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {leaders.map((l) => (
            <Link
              key={l.name}
              href="/leadership"
              className="flex flex-col gap-3 group"
            >
              <div
                className="aspect-[4/5] rounded-lg bg-cover bg-center"
                style={{
                  backgroundImage: `url('${l.portrait}')`,
                  backgroundColor: "#F1EFFA",
                }}
              />
              <div>
                <div className="text-xs font-mono uppercase tracking-[0.15em] mb-1" style={{ color: "var(--color-primary, #5B3FD9)" }}>
                  {l.title}
                </div>
                <div className="font-semibold text-sm group-hover:underline">{l.name}</div>
                <p className="text-xs mt-1 line-clamp-2" style={{ color: "var(--color-muted, #6C6A7D)" }}>
                  {l.bio[0]}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
