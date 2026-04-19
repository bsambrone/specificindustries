import { incidents } from "@/sites/petjacks/data/incidents"
import LegalFooter from "@/sites/petjacks/components/legal-footer"

export const metadata = {
  title: "Safety Record — Petjacks",
  description: "Our commitment to transparency. A complete record of documented incidents across the Petjacks product portfolio.",
}

export default function PetjacksSafetyRecord() {
  return (
    <>
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-accent mb-2">Safety Record</p>
          <h1 className="text-4xl font-heading font-bold text-primary mb-4">Transparency at altitude.</h1>
          <p className="text-lg text-foreground/70 leading-relaxed mb-4">
            Q3 re-entry anomalies decreased 12% year-over-year, reflecting continued investment in our
            Pre-Flight Readiness program. Gross flight hours across all species reached record highs for the
            third consecutive quarter, and owner sentiment remains at its strongest level since we began
            publishing this report.
          </p>
          <p className="text-lg text-foreground/70 leading-relaxed mb-10">
            The following is a complete record of documented incidents across our flagship product portfolio,
            maintained quarterly and audited annually by our internal safety office.
          </p>

          <div className="overflow-x-auto border border-foreground/10 rounded-lg">
            <table className="w-full text-[11px] font-mono">
              <thead className="bg-secondary/40 text-foreground/70 uppercase tracking-wider">
                <tr>
                  <th className="px-3 py-2 text-left">ID</th>
                  <th className="px-3 py-2 text-left">Date</th>
                  <th className="px-3 py-2 text-left">Species</th>
                  <th className="px-3 py-2 text-left">Pet Name</th>
                  <th className="px-3 py-2 text-left">Model</th>
                  <th className="px-3 py-2 text-left">Classification</th>
                  <th className="px-3 py-2 text-left">Outcome</th>
                  <th className="px-3 py-2 text-left">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-foreground/10">
                {incidents.map((inc) => (
                  <tr key={inc.id} className="hover:bg-secondary/20">
                    <td className="px-3 py-2 whitespace-nowrap">{inc.id}</td>
                    <td className="px-3 py-2 whitespace-nowrap">{inc.date}</td>
                    <td className="px-3 py-2 capitalize">{inc.species}</td>
                    <td className="px-3 py-2 whitespace-nowrap">{inc.petName}</td>
                    <td className="px-3 py-2 whitespace-nowrap">{inc.model}</td>
                    <td className="px-3 py-2 whitespace-nowrap">{inc.classification}</td>
                    <td className="px-3 py-2 whitespace-nowrap">{inc.outcome}</td>
                    <td className="px-3 py-2 text-foreground/70">{inc.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-foreground/50 mt-4 font-mono">
            Complete through 2025-02-04. Next publication scheduled 2026-05-01.
          </p>
        </div>
      </section>

      <LegalFooter />
    </>
  )
}
