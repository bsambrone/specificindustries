import Image from "next/image"
import { competitors } from "../data/competitors"
import { ComparisonTable } from "../components/ComparisonTable"
import { CertifiedBadge } from "../components/CertifiedBadge"

export const metadata = {
  title: "Comparison — BonelessWater",
  description: "How BonelessWater compares to the bottled water industry. Three legitimate competitors, two with visible bones, one with a frog.",
}

export default function BonelessWaterComparison() {
  const legitimate = competitors.filter((c) => c.category === "legitimate")
  const bones = competitors.filter((c) => c.category === "bones")
  const pond = competitors.filter((c) => c.category === "pond")

  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center">
          <CertifiedBadge size="sm" label="INDEPENDENT AUDIT" />
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-[#0c4a6e]">How We Compare</h1>
          <p className="mt-3 text-[#0f172a]/70 max-w-2xl mx-auto">
            We have audited every major bottled water brand in the United States. The results speak for themselves.
          </p>
        </div>

        {/* The big table */}
        <div className="mt-10">
          <ComparisonTable competitors={competitors} />
        </div>

        {/* Detailed breakdown by category */}
        <div className="mt-16">
          <h2 className="text-2xl font-extrabold text-[#0c4a6e] mb-6">Legitimate competitors (technically compliant)</h2>
          <p className="text-sm text-[#0f172a]/70 mb-6 max-w-3xl">
            These three brands meet baseline FDA bottled water standards. None of them have commissioned an independent BoneScan™ audit. None of them have published proximity data for their bottling facilities. Our concerns are documented below.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {legitimate.map((c) => (
              <CompetitorCard key={c.slug} competitor={c} />
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-extrabold text-[#dc2626] mb-6">Bones-included competitors</h2>
          <p className="text-sm text-[#0f172a]/70 mb-6 max-w-3xl">
            These two brands market their products as containing visible bone fragments. We disagree with the practice but acknowledge their honesty.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bones.map((c) => (
              <CompetitorCard key={c.slug} competitor={c} />
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-extrabold text-[#dc2626] mb-6">The Murklake situation</h2>
          <p className="text-sm text-[#0f172a]/70 mb-6 max-w-3xl">
            We have included this product in our comparison for completeness. We do not believe it should be available for purchase.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pond.map((c) => (
              <CompetitorCard key={c.slug} competitor={c} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function CompetitorCard({ competitor }: { competitor: typeof competitors[number] }) {
  return (
    <div className="bg-white border border-[#0c4a6e]/20 rounded-lg overflow-hidden flex flex-col">
      <div className="relative aspect-square bg-[#0c4a6e]/5">
        <Image
          src={competitor.productImage}
          alt={competitor.name}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-contain p-4"
        />
      </div>
      <div className="p-5 border-t border-[#0c4a6e]/10">
        <div className="font-bold text-[#0c4a6e]">{competitor.name}</div>
        <p className="mt-2 text-xs text-[#0f172a]/80 leading-relaxed">{competitor.fudClaim}</p>
      </div>
    </div>
  )
}
