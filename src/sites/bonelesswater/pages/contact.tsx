import Image from "next/image"
import { executives } from "../data/leadership"
import { CertifiedBadge } from "../components/CertifiedBadge"

export const metadata = {
  title: "Contact — BonelessWater",
  description: "Contact the BonelessWater team. For research inquiries, regulatory matters, and subscriber support.",
}

const contactNotes: Record<string, string> = {
  whitfield: "For founder-level inquiries only",
  marsh: "Research and peer-review correspondence",
  coleman: "Subscriber support and BoneScan™ audits",
  dunn: "Compliance and regulatory matters",
}

export default function BonelessWaterContact() {
  return (
    <section className="bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
          <CertifiedBadge size="sm" label="WE READ EVERY MESSAGE" />
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-[#0c4a6e]">Contact BonelessWater</h1>
          <p className="mt-3 text-[#0f172a]/70 max-w-2xl mx-auto">
            We are a small team. We respond to every legitimate inquiry, usually within 5 to 7 business days, depending on which member of our team is in the lab.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {executives.map((exec) => (
            <div
              key={exec.slug}
              className="bg-white border border-[#0c4a6e]/20 rounded-lg overflow-hidden flex flex-col"
            >
              <div className="relative aspect-square bg-[#0c4a6e]/5">
                <Image
                  src={exec.image}
                  alt={exec.name}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="p-3 text-center">
                <div className="font-bold text-[#0c4a6e] text-sm">{exec.name}</div>
                <div className="text-[10px] text-[#dc2626] font-semibold uppercase tracking-wide mt-0.5">
                  {exec.title}
                </div>
                <div className="text-[10px] italic text-[#0f172a]/60 mt-2">
                  {contactNotes[exec.slug] ?? "General inquiries"}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-[#0c4a6e]/20 rounded-lg p-6">
            <h2 className="font-bold text-[#0c4a6e]">Submit a research inquiry</h2>
            <form className="mt-4 space-y-3">
              <input
                type="text"
                placeholder="Your name"
                className="w-full border border-[#0c4a6e]/20 rounded px-3 py-2 text-sm"
                disabled
              />
              <input
                type="text"
                placeholder="Your institution"
                className="w-full border border-[#0c4a6e]/20 rounded px-3 py-2 text-sm"
                disabled
              />
              <textarea
                placeholder="Nature of your inquiry"
                rows={4}
                className="w-full border border-[#0c4a6e]/20 rounded px-3 py-2 text-sm"
                disabled
              />
              <button
                type="button"
                className="w-full bg-[#0c4a6e]/20 text-[#0c4a6e]/60 font-bold rounded py-2 cursor-not-allowed"
                disabled
              >
                Form temporarily under regulatory review
              </button>
            </form>
          </div>

          <div className="bg-white border border-[#0c4a6e]/20 rounded-lg p-6">
            <h2 className="font-bold text-[#0c4a6e]">Office hours</h2>
            <p className="mt-2 text-sm text-[#0f172a]/80">
              Cedar Rapids, Iowa. By appointment only. Tours of the deboning facility are not currently available to the general public for proprietary process reasons.
            </p>
            <h2 className="mt-6 font-bold text-[#0c4a6e]">Press inquiries</h2>
            <p className="mt-2 text-sm text-[#0f172a]/80">
              We do not currently accept press inquiries from major bottled water industry publications. Independent reporters and academic outlets may contact us through the form above when it is restored.
            </p>
          </div>
        </div>

        <p className="mt-10 text-center text-[10px] text-[#0f172a]/40">
          For legal matters only: bsambrone@gmail.com
        </p>
      </div>
    </section>
  )
}
