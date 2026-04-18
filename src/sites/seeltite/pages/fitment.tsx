import Image from "next/image"
import Link from "next/link"
import { Hero } from "@/components/ui/hero"
import { CautionStripe } from "../components/caution-stripe"
import { FitmentStepCard } from "../components/fitment-step-card"
import { fitmentSteps, testTootProcedure, fitmentDosDonts, accessoryLoadouts } from "../data/fitment"
import { getProductBySlug } from "../data/products"

export const metadata = {
  title: "Fitment Guide — Seel-Tite",
  description: "How to wear the G1 Containment Gasket so you can toot with confidence.",
}

export default function SeeltiteFitment() {
  return (
    <>
      <Hero
        headline="Toot-Ready In Four Steps."
        subheadline="The G1 Containment Gasket is the simplest confidence device in the catalog. Here's how to wear it."
        image="/sites/seeltite/fitment-hero.png"
      />
      <CautionStripe text="Position · Press · Seal Check · Test Toot" />

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3 font-heading text-center">The Four-Step Fit</p>
          <h2 className="text-3xl font-heading font-semibold mb-10 text-center">Wear It In Under A Minute.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fitmentSteps.map((s) => (
              <FitmentStepCard key={s.number} step={s.number} title={s.title} description={s.description} image={s.image} variant="full" />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-secondary/5 border-y border-foreground/10">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 items-start">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3 font-heading">Procedure</p>
            <h2 className="text-3xl font-heading font-semibold mb-4">{testTootProcedure.title}</h2>
            <ol className="space-y-3 list-decimal list-inside text-foreground/80 leading-relaxed">
              {testTootProcedure.steps.map((step, i) => <li key={i}>{step}</li>)}
            </ol>
            <p className="mt-6 p-4 border-l-4 border-primary bg-background text-sm text-foreground/80">
              <strong className="text-primary">Important: </strong>{testTootProcedure.warning}
            </p>
          </div>
          <div className="relative aspect-[4/3] bg-background border border-foreground/10">
            <Image src="/sites/seeltite/fitment-test-toot.png" alt="Test toot procedure diagram" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-contain p-4" />
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3 font-heading text-center">Fitment By Scenario</p>
          <h2 className="text-3xl font-heading font-semibold mb-10 text-center">The Loadouts We Recommend.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {accessoryLoadouts.map((l) => (
              <article key={l.scenario} className="border border-foreground/15 bg-background p-6">
                <h3 className="text-xl font-heading font-semibold mb-2">{l.scenario}</h3>
                <p className="text-sm text-foreground/70 mb-4 leading-relaxed">{l.rationale}</p>
                <div className="flex flex-wrap gap-2">
                  {l.accessorySlugs.map((slug) => {
                    const product = getProductBySlug(slug)
                    if (!product) return null
                    return (
                      <Link key={slug} href={`/products/${slug}`} className="inline-block bg-secondary/5 hover:bg-primary hover:text-background border border-foreground/15 px-3 py-1 text-xs tracking-wider uppercase font-heading transition-colors">
                        {product.name}
                      </Link>
                    )
                  })}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-secondary/5 border-y border-foreground/10">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3 font-heading text-center">Common Mistakes</p>
          <h2 className="text-3xl font-heading font-semibold mb-10 text-center">Do These. Don&apos;t Do Those.</h2>
          <div className="relative aspect-video bg-background border border-foreground/10 mb-8 max-w-4xl mx-auto">
            <Image src="/sites/seeltite/fitment-dos-donts.png" alt="Fitment dos and don'ts diagram" fill sizes="(min-width: 768px) 80vw, 100vw" className="object-contain p-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fitmentDosDonts.map((item) => (
              <article key={item.title} className={`border p-5 ${item.type === "do" ? "border-accent bg-accent/10" : "border-primary bg-primary/5"}`}>
                <p className={`text-xs tracking-[0.3em] uppercase font-heading mb-2 ${item.type === "do" ? "text-secondary" : "text-primary"}`}>
                  {item.type === "do" ? "Do" : "Don't"}
                </p>
                <h3 className="text-lg font-heading font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3 font-heading">When In Doubt</p>
          <h2 className="text-3xl font-heading font-semibold mb-4">Engage the Backup.</h2>
          <p className="text-foreground/80 mb-8 leading-relaxed">
            If you&apos;re about to do anything where a lost gamble is not an option — a wedding, a deposition, a transatlantic flight, a congressional appearance — wear the Backup Secondary Gasket. It engages in 40 milliseconds. You will never regret it.
          </p>
          <Link href="/products/secondary-gasket-redundancy" className="inline-flex items-center gap-2 bg-primary text-background px-6 py-3 text-sm font-semibold tracking-wider uppercase hover:bg-secondary transition-colors">
            Meet the Backup Gasket
          </Link>
        </div>
      </section>
    </>
  )
}
