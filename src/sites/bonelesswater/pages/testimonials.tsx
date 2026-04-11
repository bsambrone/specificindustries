import Image from "next/image"
import { testimonials } from "../data/testimonials"
import { CertifiedBadge } from "../components/CertifiedBadge"

export const metadata = {
  title: "Testimonials — BonelessWater",
  description: "What our subscribers say about switching to certified bone-free drinking water.",
}

export default function BonelessWaterTestimonials() {
  return (
    <section className="bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
          <CertifiedBadge size="sm" label="VERIFIED SUBSCRIBERS" />
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-[#0c4a6e]">Subscriber Testimonials</h1>
          <p className="mt-3 text-[#0f172a]/70 max-w-2xl mx-auto">
            Real subscribers, real recoveries. Each story below is from a verified BonelessWater customer who chose to share their experience.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white border border-[#0c4a6e]/20 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden bg-[#0c4a6e]/10 flex-shrink-0">
                  <Image src={t.image} alt={t.name} fill sizes="56px" className="object-cover" />
                </div>
                <div>
                  <div className="font-bold text-[#0c4a6e]">{t.name}</div>
                  <div className="text-xs text-[#0f172a]/60">{t.title}</div>
                </div>
              </div>
              <p className="text-sm text-[#0f172a]/80 italic leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
