import Image from "next/image"
import { InfomercialBand } from "../components/InfomercialBand"
import { testimonials } from "../data/testimonials"

export const metadata = {
  title: "Testimonials — Mousetrap Jenga",
  description: "America says: YES PLEASE!",
}

export default function MousetrapJengaTestimonials() {
  return (
    <>
      <InfomercialBand bgColor="primary" textColor="light" verticalPadding="lg" bordered={false}>
        <div className="text-center">
          <h1 className="font-heading text-5xl md:text-6xl text-[#FFD23F] drop-shadow-[4px_4px_0_#1A1F4C]">AMERICA SAYS:</h1>
          <p className="font-heading text-4xl md:text-5xl text-[#FFF6E8] mt-2">&ldquo;YES PLEASE!&rdquo;</p>
          <p className="text-[#FFF6E8]/80 mt-6 max-w-2xl mx-auto">
            Real families. Real fun. Real emergency room visits. Here&apos;s what our customers are saying about their Mousetrap Jenga experience!
          </p>
        </div>
      </InfomercialBand>

      <InfomercialBand bgColor="background" verticalPadding="lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t) => (
            <figure
              key={t.name + t.quote.slice(0, 20)}
              className="bg-[#FFF6E8] border-4 border-[#1A1F4C] p-6 shadow-[6px_6px_0_0_#1A1F4C]"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="relative w-20 h-20 border-2 border-[#1A1F4C] overflow-hidden flex-shrink-0">
                  <Image src={t.image} alt={t.name} fill className="object-cover" sizes="80px" />
                </div>
                <figcaption>
                  <div className="font-heading text-xl text-[#1A1F4C] leading-tight">{t.name}</div>
                  <div className="text-xs text-[#1A1F4C]/70 mt-1">{t.title}</div>
                </figcaption>
              </div>
              <blockquote className="text-[#1A1F4C]/90 italic leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
              <div className="mt-4 pt-4 border-t-2 border-dashed border-[#1A1F4C]/30 text-[#D4281F] font-heading text-lg text-center">
                ★ ★ ★ ★ ★
              </div>
            </figure>
          ))}
        </div>
      </InfomercialBand>
    </>
  )
}
