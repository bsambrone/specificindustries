import type { DidYouKnowFact } from "../data/facts"

interface DidYouKnowCardProps {
  fact: DidYouKnowFact
}

export function DidYouKnowCard({ fact }: DidYouKnowCardProps) {
  return (
    <div className="bg-white border-l-4 border-[#dc2626] rounded-r-lg p-5 shadow-sm">
      <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#dc2626] mb-2">
        ◆ Did You Know?
      </div>
      <p className="text-sm text-[#0f172a] leading-relaxed">{fact.text}</p>
      {fact.citation && (
        <p className="mt-2 text-[10px] italic text-[#0c4a6e]/70">— {fact.citation}</p>
      )}
    </div>
  )
}
