import CertBadge from "../components/cert-badge"

export const metadata = {
  title: "Process — Prechewed™",
  description:
    "Inside the Chewing Floor™. Ingredient sourcing, certified mastication, bolus formation, and cold-chain pouching.",
}

const steps = [
  {
    num: "01",
    title: "Ingredient Sourcing",
    body: "All inputs are procured from verified suppliers against Prechewed Labs specification PL-ING-001. Traceability is maintained from origin facility to Chewing Floor™ intake.",
  },
  {
    num: "02",
    title: "Certified Mastication",
    body: "Pre-Oral Hydrolysis™ is performed by licensed operators in accordance with ISO 22000 and our proprietary Bolus-Safe™ protocols. Operator credentials are audited quarterly.",
  },
  {
    num: "03",
    title: "Bolus Formation",
    body: "The hydrolyzate is introduced into the bolus matrix, stabilized under modified atmosphere (nitrogen flush), and validated against bioavailability targets before packaging.",
  },
  {
    num: "04",
    title: "Cold-Chain Pouching",
    body: "Finished bolus product is filled into tamper-evident, food-grade pouches under refrigerated conditions and cold-chain delivered within 48 hours of Bolus Formation.",
  },
]

export default function PrechewedProcess() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-20">
      {/* Hero */}
      <div
        className="text-xs uppercase tracking-[0.25em] font-mono mb-5"
        style={{ color: "var(--color-primary, #5B3FD9)" }}
      >
        Manufacturing &amp; Quality
      </div>
      <h1 className="text-4xl md:text-6xl font-semibold mb-6 leading-tight">
        The Chewing Floor.
      </h1>
      <p
        className="text-xl leading-relaxed mb-16 max-w-3xl"
        style={{ color: "var(--color-muted, #6C6A7D)" }}
      >
        Every pouch begins here. Our proprietary Chewing Floor™ facility operates under conditions
        we are not at liberty to describe in full. What we can share is the process, the
        certifications, and the commitment to quality that underpins every bolus we ship.
      </p>

      {/* 4-step grid */}
      <section className="mb-20">
        <h2 className="text-2xl font-semibold mb-8">From ingredient to pouch</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div
              key={s.num}
              className="p-6 rounded-lg border flex flex-col"
              style={{ borderColor: "var(--color-border, #E6E3F0)" }}
            >
              <div
                className="text-xs font-mono uppercase tracking-[0.2em] mb-3"
                style={{ color: "var(--color-primary, #5B3FD9)" }}
              >
                {s.num}
              </div>
              <h3 className="text-base font-semibold mb-3">{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted, #6C6A7D)" }}>
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Certification badge row */}
      <section className="mb-20">
        <h2 className="text-2xl font-semibold mb-8">Certifications</h2>
        <div className="flex flex-wrap gap-6 items-center">
          <CertBadge label="ISO 22000" sub="Food Safety Mgmt" />
          <CertBadge label="SQF" sub="Level 3" />
          <CertBadge label="Certified Mastication Facility" />
          <CertBadge label="Bolus-Safe™" sub="Certified" />
          <CertBadge label="Bolus-Vegan™" sub="Certified" />
        </div>
        <p
          className="text-xs font-mono mt-6"
          style={{ color: "var(--color-muted, #6C6A7D)" }}
        >
          Certifications valid as of fiscal year 2024. Audit body on file. Available upon request
          to institutional purchasers only.
        </p>
      </section>

      {/* Photo strip */}
      <section className="mb-20">
        <h2 className="text-2xl font-semibold mb-8">Inside the facility</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <div
            className="aspect-[4/3] rounded-lg"
            style={{
              background: "var(--color-surface-alt, #F1EFFA)",
              backgroundImage: "url(/sites/prechewed/facility-1.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            aria-label="Stainless steel processing line, Chewing Floor™"
          />
          <div
            className="aspect-[4/3] rounded-lg"
            style={{
              background: "var(--color-surface-alt, #F1EFFA)",
              backgroundImage: "url(/sites/prechewed/facility-2.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            aria-label="Certified Masticator workstation with lavender-tinted lighting"
          />
          <div
            className="aspect-[4/3] rounded-lg"
            style={{
              background: "var(--color-surface-alt, #F1EFFA)",
              backgroundImage: "url(/sites/prechewed/facility-3.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            aria-label="Cold-chain pouching station"
          />
        </div>
      </section>

      {/* Closing footnote */}
      <footer
        className="pt-8 border-t text-xs font-mono"
        style={{
          borderColor: "var(--color-border, #E6E3F0)",
          color: "var(--color-muted, #6C6A7D)",
        }}
      >
        Mastication performed by certified human and/or mechanical operators.
      </footer>
    </main>
  )
}
