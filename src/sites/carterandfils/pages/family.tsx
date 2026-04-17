import Image from "next/image"
import { Hero } from "@/components/ui/hero"
import { executives } from "@/sites/carterandfils/data/leadership"

export const metadata = {
  title: "The Family — Domaine Carter & Fils",
  description: "Meet the stewards of the estate: seventh-generation proprietor Étienne Carter and the long-serving team at Domaine Carter & Fils.",
}

export default function Family() {
  return (
    <>
      <Hero
        headline="The Family"
        subheadline="The stewards of the estate."
      />
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto space-y-20">
          {executives.map((e, idx) => (
            <div
              key={e.slug}
              className={`grid md:grid-cols-2 gap-12 items-center ${
                idx % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
              }`}
            >
              <div className="relative aspect-square bg-secondary/30 border border-accent/30">
                <Image src={e.image} alt={e.name} fill className="object-cover" />
              </div>
              <div>
                <p className="text-sm tracking-[0.3em] uppercase text-primary/70 mb-2">{e.title}</p>
                <h2 className="text-3xl font-heading font-semibold text-foreground mb-6">{e.name}</h2>
                <p className="text-foreground/80 leading-relaxed mb-6">{e.bio}</p>
                <p className="text-lg italic font-heading text-primary border-l-2 border-accent pl-4">
                  &ldquo;{e.quote}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
