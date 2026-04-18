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
        headline="Toot With Confidence."
        subheadline="Every toot is a gamble. The G1 is the house. Ten accessories for when the house doesn't win."
        ctaText="Meet the G1"
        ctaHref="/products"
        image="/sites/seeltite/hero.png"
      />

      <CautionStripe text="Prevent · Dispose · Proceed" />

      <StatStrip
        stats={[
          { value: "14,382", label: "Gambles. 14,382 Payoffs.", icon: "▣" },
          { value: "$0",     label: "In Laundry.",              icon: "∅" },
          { value: "1973",   label: "Still The Year.",          icon: "◷" },
          { value: "0",      label: "Awkward Pauses.",          icon: "★" },
        ]}
      />

      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3 font-heading">The System</p>
          <h2 className="text-4xl font-heading font-semibold mb-4">One Gasket. Ten Ways It Pays Off.</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            The G1 Containment Gasket is the center of the catalog. Every accessory we make clicks into its output port. Build the configuration your scenarios require — or start with just the G1, which is what most people do.
          </p>
        </div>
        <ModularEcosystemDiagram />
      </section>

      <section className="py-16 px-4 bg-secondary text-background">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-accent mb-3 font-heading">Field Reports</p>
          <h2 className="text-4xl font-heading font-semibold mb-10 text-background">Prevention and Recovery. Both on the House.</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <ScenarioCard {...featurePrevention} kind="prevention" variant="hero" />
            <ScenarioCard {...featureRecovery} kind="recovery" variant="hero" />
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/scenarios" className="inline-flex items-center gap-2 bg-primary text-background px-5 py-3 text-sm font-semibold tracking-wider uppercase hover:bg-accent hover:text-secondary transition-colors">
              Browse The Gambles We Won
            </Link>
            <Link href="/recovery" className="inline-flex items-center gap-2 border border-background/40 text-background px-5 py-3 text-sm font-semibold tracking-wider uppercase hover:bg-background hover:text-secondary transition-colors">
              Browse The Gambles We Lost
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
          <h2 className="text-3xl font-heading font-semibold mb-4">Toot With Confidence Today.</h2>
          <p className="text-foreground/70 mb-8">
            The G1 Containment Gasket plus any accessory that fits your life. Shipped in three days. Warranty eighteen months.
          </p>
          <Link href="/products/g1-containment-gasket" className="inline-flex items-center gap-2 bg-primary text-background px-6 py-3 text-sm font-semibold tracking-wider uppercase hover:bg-secondary transition-colors">
            Start With The G1
          </Link>
        </div>
      </section>
    </>
  )
}
