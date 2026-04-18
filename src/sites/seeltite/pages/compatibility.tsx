import Image from "next/image"
import { Hero } from "@/components/ui/hero"
import { ModularEcosystemDiagram } from "../components/modular-ecosystem-diagram"
import { SpecReadout } from "../components/spec-readout"
import { CautionStripe } from "../components/caution-stripe"
import { compatibilityMatrix, portSpec } from "../data/compatibility"
import { getProductBySlug } from "../data/products"

export const metadata = {
  title: "Compatibility — Seel-Tite Containment Systems",
  description: "The OPX-14 output port. Accessory compatibility matrix. Firmware revisions. Everything fits.",
}

export default function SeeltiteCompatibility() {
  return (
    <>
      <Hero
        headline="OPX-14. Everything Fits."
        subheadline="Every accessory. Same port. No adapters."
      />
      <CautionStripe text="One Port · Eleven Products · Zero Adapters" />

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <ModularEcosystemDiagram />
        </div>
      </section>

      <section className="py-16 px-4 bg-secondary/5 border-y border-foreground/10">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3 font-heading text-center">Port Specification</p>
          <h2 className="text-3xl font-heading font-semibold mb-8 text-center">{portSpec.name}</h2>
          <SpecReadout
            title="OPX-14 · PORT SPEC"
            variant="dark"
            rows={[
              { label: "Mechanism", value: portSpec.mechanism },
              { label: "Rating",    value: portSpec.rating },
              { label: "Diameter",  value: "14mm bayonet" },
            ]}
          />
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3 font-heading">Compatibility Matrix</p>
          <h2 className="text-3xl font-heading font-semibold mb-8">What Clicks Into What</h2>
          <div className="overflow-x-auto border border-foreground/15">
            <table className="w-full text-sm">
              <thead className="bg-secondary text-background">
                <tr>
                  <th className="text-left px-4 py-3 tracking-[0.2em] uppercase text-xs font-heading">Accessory</th>
                  <th className="text-left px-4 py-3 tracking-[0.2em] uppercase text-xs font-heading">G1 Compatible</th>
                  <th className="text-left px-4 py-3 tracking-[0.2em] uppercase text-xs font-heading">Requires</th>
                  <th className="text-left px-4 py-3 tracking-[0.2em] uppercase text-xs font-heading">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-foreground/10">
                {compatibilityMatrix.map((row) => {
                  const product = getProductBySlug(row.accessorySlug)
                  return (
                    <tr key={row.accessorySlug} className="bg-background">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {product && (
                            <div className="relative w-10 h-10 flex-shrink-0 bg-secondary/5">
                              <Image src={product.heroImage} alt={product.name} fill sizes="40px" className="object-contain" />
                            </div>
                          )}
                          <span className="font-medium">{product?.name ?? row.accessorySlug}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-block px-2 py-1 text-[10px] tracking-wider uppercase bg-accent text-secondary font-heading">
                          {row.compatibleWithG1 ? "Yes" : "Via Chain"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-foreground/70">
                        {row.requiresOtherAccessories?.map((r) => getProductBySlug(r)?.name).filter(Boolean).join(" / ") ?? "—"}
                      </td>
                      <td className="px-4 py-3 text-foreground/70 text-xs">{row.notes}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

    </>
  )
}
