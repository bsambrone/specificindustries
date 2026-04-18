import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"
import { SpecReadout } from "../components/spec-readout"
import { AccessoryCompatibilityRow } from "../components/accessory-compatibility-row"
import { CautionStripe } from "../components/caution-stripe"
import { ScenarioCard } from "../components/scenario-card"
import { FitmentStepCard } from "../components/fitment-step-card"
import { getProductBySlug, products, CATEGORY_LABELS } from "../data/products"
import { scenarios } from "../data/scenarios"
import { recoveryCases } from "../data/recovery"
import { fitmentSteps } from "../data/fitment"

interface Props {
  slug: string
}

export default function SeeltiteProductDetail({ slug }: Props) {
  const p = getProductBySlug(slug)
  if (!p) notFound()

  const related = products.filter((o) => o.slug !== p.slug && o.category === p.category).slice(0, 3)

  const linkedTestimonials = [
    ...scenarios.filter((s) => p.testimonials.includes(s.portraitSlug)).map((s) => ({ kind: "prevention" as const, ...s })),
    ...recoveryCases.filter((r) => p.testimonials.includes(r.portraitSlug)).map((r) => ({ kind: "recovery" as const, ...r })),
  ].slice(0, 2)

  const specRows = Object.entries(p.specs).map(([label, value]) => ({ label, value }))

  return (
    <>
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <div className="relative w-full aspect-square bg-secondary/10 border border-foreground/10">
            <Image src={p.heroImage} alt={p.name} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-contain p-10" />
          </div>
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3 font-heading">{CATEGORY_LABELS[p.category]} · Classification</p>
            <h1 className="text-4xl font-heading font-semibold mb-4">{p.name}</h1>
            <p className="text-lg text-foreground/80 mb-6">{p.tagline}</p>
            <div className="space-y-4 text-foreground/80 mb-8 leading-relaxed">
              {p.description.map((para, i) => <p key={i}>{para}</p>)}
            </div>
            <div className="flex items-center gap-6 mb-6">
              <span className="text-3xl font-heading font-semibold">${p.price.toFixed(2)}</span>
              <AddToCartButton slug={p.slug} productName={p.name} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-background border-y border-foreground/10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-10 items-start">
          <div className="md:col-span-3">
            <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3 font-heading">Features</p>
            <h2 className="text-2xl font-heading font-semibold mb-6">Engineered For Consequence</h2>
            <ul className="space-y-3">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className="text-primary font-bold" aria-hidden>▸</span>
                  <span className="text-foreground/80">{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <SpecReadout title="Specifications" rows={specRows} variant="dark" />
          </div>
        </div>
      </section>

      {p.galleryImages.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3 font-heading">Demonstration</p>
            <h2 className="text-3xl font-heading font-semibold mb-8">In Field</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {p.galleryImages.map((src, i) => (
                <div key={src} className="relative aspect-[4/3] bg-secondary/10 border border-foreground/10">
                  <Image src={src} alt={`${p.name} in field ${i + 1}`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                </div>
              ))}
            </div>
            <div className="mt-10 relative aspect-[16/9] bg-secondary/5 border border-foreground/10">
              <Image src={p.exploded} alt={`${p.name} exploded view`} fill sizes="100vw" className="object-contain p-6" />
            </div>
          </div>
        </section>
      )}

      <AccessoryCompatibilityRow
        accessorySlugs={p.compatibleWith}
        title={p.category === "core" ? "Every Accessory Fits" : "Works With"}
      />

      {p.slug === "g1-containment-gasket" && (
        <section className="py-16 px-4 bg-background border-y border-foreground/10">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-baseline justify-between mb-8 flex-wrap gap-4">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-primary mb-2 font-heading">How To Wear</p>
                <h2 className="text-3xl font-heading font-semibold">Toot-Ready In Four Steps.</h2>
              </div>
              <Link href="/fitment" className="inline-flex items-center gap-2 text-sm tracking-[0.2em] uppercase text-primary hover:text-foreground transition-colors font-heading">
                Read the Full Fitment Guide <span aria-hidden>→</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fitmentSteps.map((s) => (
                <FitmentStepCard key={s.number} step={s.number} title={s.title} description={s.description} image={s.image} variant="compact" />
              ))}
            </div>
          </div>
        </section>
      )}

      {linkedTestimonials.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3 font-heading">From the Field</p>
            <h2 className="text-3xl font-heading font-semibold mb-8">Deployed Accounts</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {linkedTestimonials.map((t) => (
                <ScenarioCard key={t.slug} {...t} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CautionStripe />

      {related.length > 0 && (
        <section className="py-16 px-4 bg-secondary/5">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3 font-heading">Related</p>
            <h2 className="text-3xl font-heading font-semibold mb-8">Also in {CATEGORY_LABELS[p.category]}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link key={r.slug} href={`/products/${r.slug}`} className="group border border-foreground/15 hover:border-primary transition-colors bg-background">
                  <div className="relative aspect-square bg-secondary/5">
                    <Image src={r.heroImage} alt={r.name} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-contain p-6" />
                  </div>
                  <div className="p-4 border-t border-foreground/10">
                    <p className="font-heading font-semibold group-hover:text-primary transition-colors">{r.name}</p>
                    <p className="text-xs text-foreground/60 mt-1">${r.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
