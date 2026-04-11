import Image from "next/image"

export const metadata = {
  title: "Contact — OnlyFans",
  description: "Contact the OnlyFans team. Please be respectful when contacting a fan's representation.",
}

export default function OnlyFansContact() {
  return (
    <section className="bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] text-center">Contact us</h1>
        <p className="mt-3 text-center text-slate-600 max-w-2xl mx-auto">
          Our four-person executive team is here to help. They are usually here, mostly on accident.
        </p>

        <div className="relative aspect-[3/2] rounded-2xl overflow-hidden mt-10 bg-slate-100">
          <Image
            src="/sites/onlyfans/contact-conference.png"
            alt="Four executives in a conference room, visibly ashamed"
            fill
            sizes="(min-width: 1024px) 768px, 100vw"
            className="object-cover"
          />
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
