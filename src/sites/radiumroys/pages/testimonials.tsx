import { Hero } from "@/components/ui/hero"
import { testimonials } from "@/sites/radiumroys/data/testimonials"

export const metadata = {
  title: "Testimonials — Radium Roy's",
  description: "Hear from the American families who trust Radium Roy's for their daily wholesomeness.",
}

export default function RadiumRoysTestimonials() {
  return (
    <>
      <Hero
        headline="What Our Families Say"
        subheadline="Real letters from real customers, lightly edited for readability."
        dark
      />

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div key={`${t.name}-${t.product}`} className="bg-background border-2 border-accent rounded-lg p-6">
              <p className="text-xs uppercase tracking-widest text-secondary mb-2">On {t.product}</p>
              <p className="text-foreground/80 italic mb-4 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <p className="text-sm font-semibold text-secondary">{t.name}, age {t.age}</p>
              <p className="text-xs text-foreground/60">{t.city}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 px-4 text-center">
        <p className="text-foreground/50 text-sm max-w-xl mx-auto italic">
          All testimonials are unsolicited and printed without compensation. Names have been preserved
          where the customers consented and lightly initialized where they did not respond to our follow-up
          inquiries.
        </p>
      </section>
    </>
  )
}
