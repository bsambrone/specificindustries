import Image from "next/image"
import { executives } from "../data/leadership"

export const metadata = {
  title: "Contact — Odd Occasions",
  description: "Tell us about your specific occasion. We'll tell you if it deserves a box.",
}

export default function OddOccasionsContact() {
  return (
    <section className="bg-[#FFFDF8]">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
          <p className="text-sm font-semibold tracking-widest uppercase text-[#D4A0A0]">
            We&apos;re listening
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold text-[#2D2D2D] font-heading">
            Describe Your Occasion
          </h1>
          <p className="mt-3 text-[#2D2D2D]/70 max-w-2xl mx-auto">
            Think you&apos;ve experienced a moment that deserves its own gift box? Tell us about it. Our Occasion Research team reviews every submission.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {executives.map((exec) => (
            <div
              key={exec.slug}
              className="bg-white border border-[#7C9A82]/15 rounded-xl overflow-hidden flex flex-col"
            >
              <div className="relative aspect-square bg-[#F5F0E8]">
                <Image
                  src={exec.image}
                  alt={exec.name}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="p-3 text-center">
                <div className="font-bold text-[#2D2D2D] text-sm font-heading">{exec.name}</div>
                <div className="text-[10px] text-[#D4A0A0] font-semibold uppercase tracking-wide mt-0.5">
                  {exec.title}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white border border-[#7C9A82]/15 rounded-xl p-8">
          <h2 className="font-bold text-[#7C9A82] font-heading text-lg">Occasion Consultation Request</h2>
          <p className="mt-2 text-sm text-[#2D2D2D]/60">
            Fill out the form below and a member of our team will assess whether your situation merits a curated box.
          </p>
          <form className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#2D2D2D]/80 mb-1">Your name</label>
              <input
                type="text"
                placeholder="The person sending (or confessing)"
                className="w-full border border-[#7C9A82]/20 rounded-lg px-4 py-2 text-sm bg-[#FFFDF8]"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#2D2D2D]/80 mb-1">Describe the incident</label>
              <textarea
                placeholder="Be as specific as possible. We do not accept vague occasions."
                rows={4}
                className="w-full border border-[#7C9A82]/20 rounded-lg px-4 py-2 text-sm bg-[#FFFDF8]"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#2D2D2D]/80 mb-1">How long have you been carrying this?</label>
              <input
                type="text"
                placeholder="e.g., 'Since the office party in 2019'"
                className="w-full border border-[#7C9A82]/20 rounded-lg px-4 py-2 text-sm bg-[#FFFDF8]"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#2D2D2D]/80 mb-1">On a scale of 1-10, how specific is this situation?</label>
              <input
                type="text"
                placeholder="If it's below a 7, we may not be able to help"
                className="w-full border border-[#7C9A82]/20 rounded-lg px-4 py-2 text-sm bg-[#FFFDF8]"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#2D2D2D]/80 mb-1">Preferred gift wrapping emotion</label>
              <div className="flex flex-wrap gap-3 mt-1">
                {["Remorseful", "Celebratory", "Ambiguous", "Passive-Aggressive (with love)"].map((opt) => (
                  <label key={opt} className="flex items-center gap-2 text-sm text-[#2D2D2D]/70">
                    <input type="radio" name="emotion" disabled className="accent-[#7C9A82]" />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
            <button
              type="button"
              className="w-full bg-[#7C9A82]/20 text-[#7C9A82]/60 font-bold rounded-lg py-3 cursor-not-allowed"
              disabled
            >
              Submission queue currently under review by Theodore
            </button>
          </form>
        </div>

        <p className="mt-10 text-center text-[10px] text-[#2D2D2D]/40">
          For real inquiries: bsambrone@gmail.com
        </p>
      </div>
    </section>
  )
}
