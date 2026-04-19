import Link from "next/link"
import MedicalCallout from "../components/medical-callout"

export const metadata = {
  title: "Science — Prechewed™",
  description:
    "The peer-reviewed case for Pre-Oral Hydrolysis™. 2024 foundational study, mechanism diagrams, citations.",
}

const barData = [
  { label: "No protocol", hours: 1.2 },
  { label: "1× / day", hours: 16.4 },
  { label: "2× / day", hours: 31.1 },
  { label: "Full protocol (3×)", hours: 47.0 },
]

const maxHours = 47

const mechanisms = [
  {
    title: "Pre-Oral Hydrolysis™",
    body:
      "Certified Masticators initiate the hydrolytic cascade before ingestion, cleaving long-chain polysaccharides and activating salivary amylase analogs at ambient temperature. The resulting substrate is bio-available at absorption sites 8.3× faster than substrate produced under conventional self-mastication.",
  },
  {
    title: "Bolus Matrix Stabilization",
    body:
      "The hydrolyzate is suspended in a proprietary matrix of food-grade guar derivatives and potassium sorbate at controlled water activity (aW ≤ 0.87). The matrix arrests further enzymatic breakdown, locking bioavailability metrics at peak values for up to 14 days refrigerated.",
  },
  {
    title: "Jaw-Hour Reclamation™",
    body:
      "At a mean chewing rate of 1.4 Hz and an average mastication duration of 47 minutes per mean daily caloric load, each fully compliant protocol day eliminates 3.9 hours of mandibular activity from the operator schedule — returning those hours to productive cognition.",
  },
]

const citations = [
  "Lund J, Talbot R, Whitlock T. Pre-oral hydrolysis as a vector for nutrient bioavailability enhancement. J Pre-Oral Nutr. 2024;1(1):1–18.",
  "Mackey O, Lund J. Bolus matrix stabilization under modified atmosphere packaging. J Pre-Oral Nutr. 2024;1(2):34–49.",
  "Whitlock T. Jaw-Hour Reclamation™ in high-intensity knowledge-worker populations: a 12-month cohort. J Pre-Oral Nutr. 2024;1(3):55–72.",
  "Talbot R, Mackey O. ISO 22000 compliance in certified mastication facilities: process audit findings. J Pre-Oral Nutr. 2024;1(3):73–88.",
  "Lund J, Whitlock T. Salivary amylase analog activity in stabilized bolus matrices: an in-vitro model. J Pre-Oral Nutr. 2024;2(1):3–19.",
  "Prechewed Labs Research Consortium. Enterprise jaw-hour audit: 312-hour per-employee annual deficit and remediation via full-protocol adoption. J Pre-Oral Nutr. 2024;2(2):22–41.",
]

export default function PrechewedScience() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-20">
      {/* Page header */}
      <div
        className="text-xs uppercase tracking-[0.25em] font-mono mb-5"
        style={{ color: "var(--color-primary, #5B3FD9)" }}
      >
        Research &amp; Evidence
      </div>
      <h1 className="text-4xl md:text-6xl font-semibold mb-6 leading-tight">
        The peer-reviewed case for pre-oral hydrolysis.
      </h1>
      <p
        className="text-xl leading-relaxed mb-16"
        style={{ color: "var(--color-muted, #6C6A7D)" }}
      >
        We did not ask you to take our word for it. We funded the research and published the
        results in the <em>Journal of Pre-Oral Nutrition</em>.
      </p>

      {/* Fake abstract */}
      <MedicalCallout
        label="Abstract — Foundational Study (2024)"
        citation="Lund J, Talbot R, Whitlock T. Pre-oral hydrolysis as a vector for nutrient bioavailability enhancement. J Pre-Oral Nutr. 2024;1(1):1–18."
      >
        <p>
          <strong>Background.</strong> Self-mastication remains the dominant mode of pre-digestive
          food processing among adult populations despite mounting evidence of its inefficiency as
          an enzymatic initiator.
        </p>
        <p className="mt-3">
          <strong>Methods.</strong> Randomized crossover trial (n = 112). Participants consumed
          standardized 600 kcal meal equivalents prepared under conventional mastication or
          Prechewed™ Pre-Oral Hydrolysis™ conditions. Bioavailability markers were assessed at
          T+30, T+60, and T+120 minutes.
        </p>
        <p className="mt-3">
          <strong>Results.</strong> Pre-oral hydrolysis conditions produced bioavailability indices
          8.3× higher (95% CI: 7.9–8.7) relative to conventional mastication at T+60. Jaw-hours
          eliminated: 3.9 per protocol day (SD 0.2).
        </p>
        <p className="mt-3">
          <strong>Conclusion.</strong> Pre-Oral Hydrolysis™ represents a statistically significant
          and operationally meaningful advance in nutritional delivery for high-output knowledge
          workers.
        </p>
      </MedicalCallout>

      {/* Bar chart: jaw-hours reclaimed */}
      <section className="my-16">
        <h2 className="text-2xl font-semibold mb-2">Jaw-hours reclaimed per year</h2>
        <p
          className="text-sm font-mono mb-8"
          style={{ color: "var(--color-muted, #6C6A7D)" }}
        >
          By protocol adherence level — 365-day projection
        </p>
        <div
          className="rounded-lg p-8"
          style={{ background: "var(--color-surface-alt, #F1EFFA)" }}
        >
          <div className="flex flex-col gap-5">
            {barData.map((row) => {
              const pct = (row.hours / maxHours) * 100
              return (
                <div key={row.label} className="flex items-center gap-4">
                  <div
                    className="w-36 text-xs font-mono shrink-0 text-right"
                    style={{ color: "var(--color-muted, #6C6A7D)" }}
                  >
                    {row.label}
                  </div>
                  <div
                    className="flex-1 rounded-full overflow-hidden h-4"
                    style={{ background: "var(--color-border, #E6E3F0)" }}
                  >
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${pct}%`,
                        background: "var(--color-primary, #5B3FD9)",
                      }}
                    />
                  </div>
                  <div
                    className="w-16 text-xs font-mono shrink-0"
                    style={{ color: "var(--color-primary, #5B3FD9)" }}
                  >
                    {row.hours} hrs
                  </div>
                </div>
              )
            })}
          </div>
          <p
            className="text-[11px] font-mono mt-6"
            style={{ color: "var(--color-muted, #6C6A7D)" }}
          >
            Source: Whitlock T. J Pre-Oral Nutr. 2024;1(3):55–72.
          </p>
        </div>
      </section>

      {/* Mechanism cards */}
      <section className="my-16">
        <h2 className="text-2xl font-semibold mb-8">How the mechanism works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {mechanisms.map((m) => (
            <div
              key={m.title}
              className="p-6 rounded-lg border"
              style={{ borderColor: "var(--color-border, #E6E3F0)" }}
            >
              <div
                className="text-xs uppercase tracking-[0.2em] font-mono mb-3"
                style={{ color: "var(--color-primary, #5B3FD9)" }}
              >
                Mechanism
              </div>
              <h3 className="text-lg font-semibold mb-3">{m.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted, #6C6A7D)" }}>
                {m.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* White paper mock */}
      <section
        className="my-16 p-8 rounded-lg border"
        style={{ borderColor: "var(--color-border, #E6E3F0)" }}
        id="whitepaper"
      >
        <div
          className="text-xs uppercase tracking-[0.2em] font-mono mb-3"
          style={{ color: "var(--color-primary, #5B3FD9)" }}
        >
          White Paper
        </div>
        <h2 className="text-2xl font-semibold mb-3">
          Pre-Oral Hydrolysis™: A Clinical Overview
        </h2>
        <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--color-muted, #6C6A7D)" }}>
          Prechewed Labs. 2024. 48 pp. Includes full protocol specifications, operator training
          requirements, and enterprise implementation guidelines.
        </p>
        <button
          type="button"
          className="inline-block px-6 py-2 rounded-md text-sm font-semibold border"
          style={{
            borderColor: "var(--color-border, #E6E3F0)",
            color: "var(--color-muted, #6C6A7D)",
          }}
          disabled
          aria-disabled="true"
        >
          Download PDF — Access restricted to institutional subscribers
        </button>
      </section>

      {/* Enterprise anchor */}
      <section
        id="enterprise"
        className="my-16 p-10 rounded-lg"
        style={{ background: "var(--color-surface-alt, #F1EFFA)" }}
      >
        <div
          className="text-xs uppercase tracking-[0.25em] font-mono mb-4"
          style={{ color: "var(--color-primary, #5B3FD9)" }}
        >
          Enterprise
        </div>
        <h2 className="text-3xl font-semibold mb-5">
          312 jaw-hours per employee per year.
        </h2>
        <p className="text-base leading-relaxed mb-5">
          A company of 50 people is losing the equivalent of two full-time headcount to mandatory
          mastication. Prechewed™ for Teams eliminates that loss. Full-protocol adoption returns
          312 jaw-hours annually per employee — hours that can be reallocated to deep work,
          synchronous collaboration, or simply staring at a spreadsheet in productive silence.
        </p>
        <p className="text-base leading-relaxed mb-8">
          Enterprise accounts receive bulk pricing, dedicated Certified Masticator allocation,
          quarterly bolus audits, and a dedicated customer success contact available during
          business hours (Monday–Friday, 9 am–5 pm PT, except observed jaw-rest days).
        </p>
        <Link
          href="/contact?category=enterprise"
          className="inline-block px-7 py-3 rounded-md font-semibold text-white"
          style={{ background: "var(--color-primary, #5B3FD9)" }}
        >
          Contact Enterprise Sales
        </Link>
      </section>

      {/* Citations */}
      <section className="my-16">
        <h2 className="text-xl font-semibold mb-6">References</h2>
        <ol className="flex flex-col gap-3">
          {citations.map((c, i) => (
            <li
              key={i}
              className="text-xs font-mono leading-relaxed"
              style={{ color: "var(--color-muted, #6C6A7D)" }}
            >
              {i + 1}. {c}
            </li>
          ))}
        </ol>
      </section>
    </main>
  )
}
