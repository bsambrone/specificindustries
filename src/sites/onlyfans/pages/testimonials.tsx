import Image from "next/image"
import { testimonials } from "../data/testimonials"

export const metadata = {
  title: "Testimonials — OnlyFans",
  description: "What our subscribers say about their favorite fans.",
}

export default function OnlyFansTestimonials() {
  return (
    <section className="bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] text-center">What our subscribers say</h1>
        <p className="mt-3 text-center text-slate-600 max-w-2xl mx-auto">
          Real airflow appreciation, in their own words.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden bg-slate-200 flex-shrink-0">
                  <Image src={t.image} alt={t.name} fill sizes="56px" className="object-cover" />
                </div>
                <div>
                  <div className="font-bold text-[#0F172A]">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.title}</div>
                </div>
              </div>
              <p className="text-sm text-slate-700 italic leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
