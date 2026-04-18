import Image from "next/image"
import Link from "next/link"
import { Hero } from "@/components/ui/hero"
import { StatStrip } from "@/components/ui/stat-strip"
import { ScenarioCard } from "../components/scenario-card"
import { CautionStripe } from "../components/caution-stripe"
import { ModularEcosystemDiagram } from "../components/modular-ecosystem-diagram"
import { products } from "../data/products"
import { scenarios } from "../data/scenarios"
import { recoveryCases } from "../data/recovery"

export default function SeeltiteHome() {
  const featurePrevention = scenarios[0]
  const featureRecovery = recoveryCases[3]
  const accessoryPreview = products.filter((p) => p.category !== "core").slice(0, 6)

  return (
    <>
      <Hero
        headline="One Seal. Every Scenario."
        subheadline="The G1 Containment Gasket plus 10 modular disposal accessories. American-engineered since 1973."
        ctaText="Shop the System"
        ctaHref="/products"
        image="/sites/seeltite/hero.png"
      />

      <CautionStripe text="Prevent · Dispose · Proceed" />

      <StatStrip
        stats={[
          { icon: "▣", value: "14,382", label: "Events Contained" },
          { icon: "∅", value: "0", label: "Excused" },
          { icon: "◷", value: "52", label: "Years Engineered" },
          { icon: "★", value: "MIL-STD", label: "810H Compliant" },
        ]}
      />

      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3 font-heading">The System</p>
          <h2 className="text-4xl font-heading font-semibold mb-4">One Hub. Ten Accessories. Every Scenario.</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            The G1 Containment Gasket sits at the center. Every accessory in the catalog clicks into its OPX-14 output port.
            Build the configuration your environment requires.
          </p>
        </div>
        <ModularEcosystemDiagram />
      </section>

      <section className="py-16 px-4 bg-secondary text-background">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-accent mb-3 font-heading">Field Reports</p>
          <h2 className="text-4xl font-heading font-semibold mb-10 text-background">Prevention. Recovery. Both Documented.</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <ScenarioCard {...featurePrevention} kind="prevention" variant="hero" />
            <ScenarioCard {...featureRecovery} kind="recovery" variant="hero" />
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/scenarios" className="inline-flex items-center gap-2 bg-primary text-background px-5 py-3 text-sm font-semibold tracking-wider uppercase hover:bg-accent hover:text-secondary transition-colors">
              Browse Prevention Cases
            </Link>
            <Link href="/recovery" className="inline-flex items-center gap-2 border border-background/40 text-background px-5 py-3 text-sm font-semibold tracking-wider uppercase hover:bg-background hover:text-secondary transition-colors">
              Browse Recovery Cases
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3 font-heading text-center">The Catalog</p>
          <h2 className="text-4xl font-heading font-semibold mb-10 text-center">Six of Ten Accessories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {accessoryPreview.map((a) => (
              <Link key={a.slug} href={`/products/${a.slug}`} className="group border border-foreground/15 hover:border-primary transition-colors overflow-hidden">
                <div className="relative aspect-square bg-secondary/5">
                  <Image src={a.heroImage} alt={a.name} fill sizes="(min-width: 768px) 33vw, 50vw" className="object-contain p-6" />
                </div>
                <div className="p-4 border-t border-foreground/10">
                  <p className="text-xs tracking-[0.2em] uppercase text-primary mb-1">{a.category}</p>
                  <p className="font-heading font-semibold group-hover:text-primary transition-colors">{a.name}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/products" className="inline-flex items-center gap-2 bg-primary text-background px-6 py-3 text-sm font-semibold tracking-wider uppercase hover:bg-secondary transition-colors">
              View Full Catalog
            </Link>
          </div>
        </div>
      </section>

      <CautionStripe text="American Engineered · Since 1973" />

      <section className="py-20 px-4 bg-background">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-heading font-semibold mb-4">Never Skip a Beat.</h2>
          <p className="text-foreground/70 mb-8">
            The G1 Containment Gasket and any accessory of your choosing, shipped with fifteen years of deployment documentation.
          </p>
          <Link href="/products/g1-containment-gasket" className="inline-flex items-center gap-2 bg-primary text-background px-6 py-3 text-sm font-semibold tracking-wider uppercase hover:bg-secondary transition-colors">
            Start with the G1
          </Link>
        </div>
      </section>
    </>
  )
}
