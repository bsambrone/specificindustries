import Image from "next/image"
import { executives } from "../data/leadership"

export const metadata = {
  title: "Contact — OnlyPans",
  description: "Contact the OnlyPans team. Please be respectful. Do not mention their previous work.",
}

const contactNotes: Record<string, string> = {
  pennington: "Prefers not to discuss his previous role",
  holloway: "Will not answer questions about the old company",
  beckwith: "Please speak in a calm, measured tone",
  rowe: "Between therapist appointments",
}

export default function OnlyPansContact() {
  return (
    <section className="bg-[#FFF6ED]">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1C0F05] text-center">Contact us</h1>
        <p className="mt-3 text-center text-[#7C2D12]/80 max-w-2xl mx-auto">
          Our four-person executive team is here to help. They would prefer you did not bring up the past.
        </p>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {executives.map((exec) => (
            <div
              key={exec.slug}
              className="bg-white border border-[#C2410C]/20 rounded-xl overflow-hidden flex flex-col"
            >
              <div className="relative aspect-square bg-[#FDE68A]/40">
                <Image
                  src={exec.image}
                  alt={exec.name}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="p-3 text-center">
                <div className="font-bold text-[#1C0F05] text-sm">{exec.name}</div>
                <div className="text-[10px] text-[#C2410C] font-semibold uppercase tracking-wide mt-0.5">
                  {exec.title}
                </div>
                <div className="text-[10px] italic text-[#7C2D12]/70 mt-2">
                  {contactNotes[exec.slug] ?? "Unavailable"}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-[#C2410C]/20 rounded-xl p-6">
            <h2 className="font-bold text-[#1C0F05]">Contact a pan&apos;s representation</h2>
            <form className="mt-4 space-y-3">
              <input
                type="text"
                placeholder="Which pan?"
                className="w-full border border-[#C2410C]/20 rounded-lg px-3 py-2 text-sm"
                disabled
              />
              <input
                type="text"
                placeholder="Your name"
                className="w-full border border-[#C2410C]/20 rounded-lg px-3 py-2 text-sm"
                disabled
              />
              <textarea
                placeholder="Reason for contact (please be respectful)"
                rows={4}
                className="w-full border border-[#C2410C]/20 rounded-lg px-3 py-2 text-sm"
                disabled
              />
              <button
                type="button"
                className="w-full bg-[#FDE68A]/60 text-[#7C2D12]/60 font-bold rounded-full py-2 cursor-not-allowed"
                disabled
              >
                Form temporarily unavailable
              </button>
            </form>
          </div>

          <div className="bg-white border border-[#C2410C]/20 rounded-xl p-6">
            <h2 className="font-bold text-[#1C0F05]">Office hours</h2>
            <p className="mt-2 text-sm text-[#7C2D12]/90">
              The office is open most days. Our creators do not have office hours because they are always here and always have been.
            </p>
            <h2 className="mt-6 font-bold text-[#1C0F05]">Press inquiries</h2>
            <p className="mt-2 text-sm text-[#7C2D12]/90">
              We do not currently have a press contact. Bill has declined the rotation three times. We are not pressing him on it.
            </p>
          </div>
        </div>

        <p className="mt-10 text-center text-[10px] text-[#7C2D12]/50">
          For legal matters only: bsambrone@gmail.com
        </p>
      </div>
    </section>
  )
}
