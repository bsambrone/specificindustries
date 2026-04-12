import Image from "next/image"
import { executives } from "../data/leadership"

export const metadata = {
  title: "About — Only Pans",
  description: "About the company behind the Only Pans literal-pans subscription platform.",
}

export default function OnlyPansAbout() {
  return (
    <section className="bg-[#FFF6ED]">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1C0F05] text-center">About Only Pans</h1>
        <p className="mt-4 text-center text-[#7C2D12]/80 max-w-2xl mx-auto">
          Only Pans was founded in 2021 by four men who left the airflow industry after realizing that their previous work, while technically functional, contributed nothing lasting to the American home. We are a cookware subscription platform. We are aware that this sentence requires context. That context is not forthcoming.
        </p>

        <h2 className="mt-16 text-2xl font-bold text-[#1C0F05] text-center">The team</h2>
        <p className="mt-2 text-center text-[#7C2D12]/60 text-sm">Please do not ask them about their previous careers.</p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {executives.map((exec) => (
            <div key={exec.slug} className="bg-white border border-[#C2410C]/20 rounded-xl p-6 flex gap-4">
              <div className="relative w-24 h-24 flex-shrink-0 rounded-full overflow-hidden bg-[#FDE68A]/40">
                <Image src={exec.image} alt={exec.name} fill sizes="96px" className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-[#1C0F05]">{exec.name}</div>
                <div className="text-xs text-[#C2410C] font-semibold uppercase tracking-wide">{exec.title}</div>
                <p className="mt-2 text-sm text-[#7C2D12]/90">{exec.bio}</p>
                <p className="mt-2 text-xs italic text-[#7C2D12]/70">&ldquo;{exec.quote}&rdquo;</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white border border-[#C2410C]/20 rounded-xl p-6 text-center">
          <p className="text-sm text-[#7C2D12]/80">
            Only Pans is not affiliated with any other subscription platform, past or present, hypothetical or real. Our creators have no moving parts and our executives would prefer it stay that way.
          </p>
        </div>
      </div>
    </section>
  )
}
