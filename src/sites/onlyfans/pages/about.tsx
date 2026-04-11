import Image from "next/image"
import { executives } from "../data/leadership"

export const metadata = {
  title: "About — OnlyFans",
  description: "About the company behind the OnlyFans literal-fans subscription platform, and the four men responsible for it.",
}

export default function OnlyFansAbout() {
  return (
    <section className="bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] text-center">About OnlyFans</h1>
        <p className="mt-4 text-center text-slate-600 max-w-2xl mx-auto">
          OnlyFans was founded in 2019 by four men who really should have known better. We are an air-movement subscription platform headquartered in a respectable office park. The roster of fan creators on our platform represents the entire scope of the household and industrial airflow industry. We stand behind our product, technically.
        </p>

        <h2 className="mt-16 text-2xl font-bold text-[#0F172A] text-center">The team</h2>
        <p className="mt-2 text-center text-slate-500 text-sm">Subject to change at any time.</p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {executives.map((exec) => (
            <div key={exec.slug} className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex gap-4">
              <div className="relative w-24 h-24 flex-shrink-0 rounded-full overflow-hidden bg-slate-200">
                <Image src={exec.image} alt={exec.name} fill sizes="96px" className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-[#0F172A]">{exec.name}</div>
                <div className="text-xs text-[#0095CD] font-semibold uppercase tracking-wide">{exec.title}</div>
                <p className="mt-2 text-sm text-slate-700">{exec.bio}</p>
                <p className="mt-2 text-xs italic text-slate-500">&ldquo;{exec.quote}&rdquo;</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-slate-50 border border-slate-200 rounded-xl p-6 text-center">
          <p className="text-sm text-slate-600">
            We stand behind the OnlyFans platform with the full and visible support of every member of our leadership team. They will not, however, return your phone calls.
          </p>
        </div>
      </div>
    </section>
  )
}
