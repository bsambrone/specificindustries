import Image from "next/image"
import { testimonials } from "../data/testimonials"

export const metadata = {
  title: "Testimonials — OnlyPans",
  description: "What our subscribers say about their favorite pans.",
}

export default function OnlyPansTestimonials() {
  return (
    <section className="bg-[#FFF6ED]">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1C0F05] text-center">What our subscribers say</h1>
        <p className="mt-3 text-center text-[#7C2D12]/80 max-w-2xl mx-auto">
          Real cookware appreciation, in their own words.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white border border-[#C2410C]/20 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden bg-[#FDE68A]/40 flex-shrink-0">
                  <Image src={t.image} alt={t.name} fill sizes="56px" className="object-cover" />
                </div>
                <div>
                  <div className="font-bold text-[#1C0F05]">{t.name}</div>
                  <div className="text-xs text-[#7C2D12]/70">{t.title}</div>
                </div>
              </div>
              <p className="text-sm text-[#7C2D12]/90 italic leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
