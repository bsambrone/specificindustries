import Image from "next/image"
import { executives } from "../data/leadership"

export const metadata = {
  title: "Contact — OnlyFans",
  description: "Contact the OnlyFans team. Please be respectful when contacting a fan's representation.",
}

const contactNotes: Record<string, string> = {
  hatcher: "Prefers not to be reached",
  wexley: "Checks email inconsistently",
  castellan: "Do not mention the platform",
  morrow: "Between assignments (his words)",
}

export default function OnlyFansContact() {
  return (
    <section className="bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] text-center">Contact us</h1>
        <p className="mt-3 text-center text-slate-600 max-w-2xl mx-auto">
          Our four-person executive team is here to help. They are usually here, mostly on accident.
        </p>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {executives.map((exec) => (
            <div
              key={exec.slug}
              className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden flex flex-col"
            >
              <div className="relative aspect-square bg-slate-200">
                <Image
                  src={exec.image}
                  alt={exec.name}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="p-3 text-center">
                <div className="font-bold text-[#0F172A] text-sm">{exec.name}</div>
                <div className="text-[10px] text-[#0095CD] font-semibold uppercase tracking-wide mt-0.5">
                  {exec.title}
                </div>
                <div className="text-[10px] italic text-slate-500 mt-2">
                  {contactNotes[exec.slug] ?? "Unavailable"}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <h2 className="font-bold text-[#0F172A]">Contact a fan&apos;s representation</h2>
            <form className="mt-4 space-y-3">
              <input
                type="text"
                placeholder="Which fan?"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
                disabled
              />
              <input
                type="text"
                placeholder="Your name"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
                disabled
              />
              <textarea
                placeholder="Reason for contact (please be respectful)"
                rows={4}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
                disabled
              />
              <button
                type="button"
                className="w-full bg-slate-200 text-slate-500 font-bold rounded-full py-2 cursor-not-allowed"
                disabled
              >
                Form temporarily unavailable
              </button>
            </form>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <h2 className="font-bold text-[#0F172A]">Office hours</h2>
            <p className="mt-2 text-sm text-slate-700">
              We are usually here, mostly on accident. If a member of our team picks up, please feel free to discuss anything other than the platform.
            </p>
            <h2 className="mt-6 font-bold text-[#0F172A]">Press inquiries</h2>
            <p className="mt-2 text-sm text-slate-700">
              We do not currently have a press contact. We have asked Bill to handle press inquiries on a rotating basis. He has declined.
            </p>
          </div>
        </div>

        <p className="mt-10 text-center text-[10px] text-slate-400">
          For legal matters only: bsambrone@gmail.com
        </p>
      </div>
    </section>
  )
}
