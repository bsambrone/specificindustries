import { Hero } from "@/components/ui/hero"
import { certifications } from "../data/certifications"

export const metadata = {
  title: "Certifications — Privatrix",
  description: "Ten compliance frameworks. Three are real. The remainder are aspirational.",
}

const STATUS_STYLES: Record<string, string> = {
  "Active": "bg-secondary/10 text-secondary",
  "Self-Attested": "bg-accent/10 text-accent",
  "Aspirational": "bg-foreground/10 text-foreground/60",
  "Pending Renewal": "bg-primary/10 text-primary",
}

export default function PrivatrixCertifications() {
  return (
    <>
      <Hero
        headline="Certifications & Attestations"
        subheadline="A complete record of our compliance posture across ten internationally recognized and/or internally invented frameworks."
        dark
      />

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs text-foreground/50 italic mb-8 text-center">
            Certifications are self-attested by Privatrix unless otherwise noted. No certifications listed here are recognized by an independent regulatory body. We invite procurement teams to print this page for their files.
          </p>
          <div className="space-y-4">
            {certifications.map((c) => (
              <article key={c.name} className="border border-primary/10 rounded-lg p-6 bg-white">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h2 className="text-xl font-heading font-bold text-primary mb-1">{c.name}</h2>
                    <p className="text-sm text-foreground/60">
                      Issued by <span className="font-semibold">{c.issuer}</span>
                    </p>
                  </div>
                  <span
                    className={`shrink-0 text-[10px] uppercase tracking-wider px-3 py-1 rounded-full font-semibold ${STATUS_STYLES[c.status]}`}
                  >
                    {c.status}
                  </span>
                </div>
                <p className="text-xs uppercase tracking-wider text-foreground/50 mb-3">
                  Framework: {c.framework}
                </p>
                <p className="text-foreground/70 leading-relaxed">{c.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
