import Image from "next/image"
import { executives } from "../data/leadership"
import { facts } from "../data/facts"
import { CertifiedBadge } from "../components/CertifiedBadge"
import { DidYouKnowCard } from "../components/DidYouKnowCard"

export const metadata = {
  title: "About — Boneless Water",
  description: "About Boneless Water Inc. and the four people who have dedicated their careers to removing bones from drinking water.",
}

export default function BonelessWaterAbout() {
  const fact = facts.find((f) => f.slug === "1873-history")!

  return (
    <section className="bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
          <CertifiedBadge size="sm" label="EST. 1898 · REFOUNDED 1991" />
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-[#0c4a6e]">About Boneless Water</h1>
        </div>

        <div className="mt-10 space-y-6 text-[#0f172a]/80 leading-relaxed">
          <p>
            Boneless Water Inc. was originally founded in 1898 as a small industrial water purification facility in Cedar Rapids, Iowa. The original company operated quietly for nearly a century before being refounded under its current leadership in 1991.
          </p>
          <p>
            Our refounding came in response to a series of internal industry reports that confirmed what the 1873 archival research had warned about: the bottled water supply had been quietly accumulating measurable skeletal particulate for decades, and the industry had no plans to address it. Our founder, Cornelius Whitfield, resigned from his consulting role within 24 hours of seeing the data and immediately set to work building the deboning facility that became the modern Boneless Water company.
          </p>
          <p>
            We are a small, privately held team of scientists, former regulators, and dedicated employees. We do not take outside investment. We do not serve a board. We answer only to our subscribers and the published record.
          </p>
        </div>

        <div className="mt-12">
          <DidYouKnowCard fact={fact} />
        </div>

        <h2 className="mt-16 text-2xl font-bold text-[#0c4a6e] text-center">The Team</h2>
        <p className="mt-2 text-center text-[#0f172a]/60 text-sm">Four people. One mission.</p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {executives.map((exec) => (
            <div key={exec.slug} className="bg-white border border-[#0c4a6e]/20 rounded-lg p-6 flex gap-4">
              <div className="relative w-24 h-24 flex-shrink-0 rounded bg-[#0c4a6e]/10 overflow-hidden">
                <Image src={exec.image} alt={exec.name} fill sizes="96px" className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-[#0c4a6e]">{exec.name}</div>
                <div className="text-xs text-[#dc2626] font-semibold uppercase tracking-wide">{exec.title}</div>
                <p className="mt-2 text-sm text-[#0f172a]/80">{exec.bio}</p>
                <p className="mt-2 text-xs italic text-[#0f172a]/60">&ldquo;{exec.quote}&rdquo;</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
