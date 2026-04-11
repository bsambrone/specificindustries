import Image from "next/image"
import type { Competitor } from "../data/competitors"

interface ComparisonTableProps {
  competitors: Competitor[]
}

interface FeatureRow {
  key: keyof Competitor["features"]
  label: string
  bonelessWaterValue: boolean
}

const FEATURES: FeatureRow[] = [
  { key: "h2oPresent", label: "H2O molecules present", bonelessWaterValue: true },
  { key: "skeletalFree", label: "Free of skeletal contamination", bonelessWaterValue: true },
  { key: "bonescanCertified", label: "Independent BoneScan™ certification", bonelessWaterValue: true },
  { key: "fortySevenStep", label: "47-step deboning process", bonelessWaterValue: true },
  { key: "peerReviewed", label: "Peer-reviewed bone-removal research", bonelessWaterValue: true },
  { key: "bottlingDistance", label: "Bottling facility ≥500m from any source of bones", bonelessWaterValue: true },
  { key: "visibleBones", label: "Visible bones in product", bonelessWaterValue: false },
  { key: "visibleAmphibians", label: "Visible amphibians in product", bonelessWaterValue: false },
]

function FeatureCell({ value, positiveDesired }: { value: boolean; positiveDesired: boolean }) {
  // For most features, true is desired. For visibleBones/visibleAmphibians, false is desired.
  const isGood = positiveDesired ? value : !value
  return (
    <td className={`text-center text-lg font-bold ${isGood ? "text-[#0c4a6e]" : "text-[#dc2626]"}`}>
      {value ? "✓" : "✗"}
    </td>
  )
}

export function ComparisonTable({ competitors }: ComparisonTableProps) {
  return (
    <div className="overflow-x-auto border border-[#0c4a6e]/20 rounded-lg">
      <table className="w-full min-w-[900px] text-sm">
        <thead>
          <tr className="bg-[#0c4a6e] text-white">
            <th className="text-left px-4 py-3 font-bold">Feature</th>
            <th className="text-center px-3 py-3 font-bold bg-[#075985]">
              <div className="flex flex-col items-center gap-1">
                <span>BonelessWater</span>
                <span className="text-[10px] font-normal opacity-80">(us)</span>
              </div>
            </th>
            {competitors.map((c) => (
              <th key={c.slug} className="text-center px-2 py-3 font-bold">
                <div className="flex flex-col items-center gap-1">
                  <div className="relative w-12 h-12 rounded bg-white/10 overflow-hidden">
                    <Image
                      src={c.productImage}
                      alt={c.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <span className="text-[10px] font-normal">{c.name}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {FEATURES.map((row, idx) => {
            const positiveDesired = row.key !== "visibleBones" && row.key !== "visibleAmphibians"
            return (
              <tr key={row.key} className={idx % 2 === 0 ? "bg-white" : "bg-[#0c4a6e]/5"}>
                <td className="px-4 py-3 text-[#0f172a]">{row.label}</td>
                <FeatureCell value={row.bonelessWaterValue} positiveDesired={positiveDesired} />
                {competitors.map((c) => (
                  <FeatureCell key={c.slug} value={c.features[row.key]} positiveDesired={positiveDesired} />
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
