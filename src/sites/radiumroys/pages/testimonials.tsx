import Image from "next/image"
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
            <div key={t.slug} className="bg-background border-2 border-accent rounded-lg p-6 flex gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 bg-secondary/10">
                <Image src={t.image} alt={t.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <p className="text-xs uppercase tracking-widest text-secondary mb-2">On {t.product}</p>
                <p className="text-foreground/80 italic mb-4 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <p className="text-sm font-semibold text-secondary">{t.name}, age {t.age}</p>
                <p className="text-xs text-foreground/60">{t.city}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 px-4 text-center">
        <p className="text-foreground/50 text-sm max-w-xl mx-auto italic">
          All testimonials are unsolicited and printed without compensation. Photographs are from our
          customer correspondence file, used with the implied consent of anyone who mailed us a letter.
        </p>
      </section>
    </>
  )
}
