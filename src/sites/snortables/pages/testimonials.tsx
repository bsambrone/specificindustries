import Image from "next/image"
import { Hero } from "@/components/ui/hero"
import { testimonials } from "@/sites/snortables/data/testimonials"

export const metadata = {
  title: "Testimonials — Snortables",
  description: "Real stories from real customers who snort their meals.",
}

export default function SnortablesTestimonials() {
  return (
    <>
      <Hero
        headline="Customer Testimonials"
        subheadline="Real stories from real people who made the switch from eating to insufflating."
        dark
      />

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-primary/5 border border-primary/10 rounded-lg p-6 flex gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0">
                <Image src={t.image} alt={t.name} fill className="object-cover" />
              </div>
              <div>
                <p className="text-foreground/80 italic mb-3">&ldquo;{t.quote}&rdquo;</p>
                <p className="text-sm font-semibold text-primary">{t.name}</p>
                <p className="text-xs text-foreground/50">{t.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 text-center">
        <p className="text-foreground/40 text-sm max-w-lg mx-auto">
          All testimonials are from real customers who provided written consent and, in some cases, court-ordered documentation. Names may have been changed to protect the insufflated.
        </p>
      </section>
    </>
  )
}
