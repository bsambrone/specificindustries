import Image from "next/image"
import { facts } from "../data/facts"
import { CertifiedBadge } from "../components/CertifiedBadge"
import { DidYouKnowCard } from "../components/DidYouKnowCard"

export const metadata = {
  title: "Research — Boneless Water",
  description: "The peer-reviewed and historical record on aqueous skeletal contamination.",
}

const PAPERS = [
  {
    year: "1873",
    title: "On the Skeletal Constitution of Drinking Water",
    venue: "Aqueous Pathology Quarterly",
    summary: "The original paper documenting microscopic bone fragments in municipal water supplies. Suppressed by the bottling industry within months of publication. Original archive recovered in 1991 by an independent researcher.",
  },
  {
    year: "1993",
    title: "Quantifying Skeletal Residue in Bottled Water (n=247 brands)",
    venue: "Journal of Aqueous Pathology",
    summary: "Co-authored by our Chief Science Officer Garrett Marsh. The first peer-reviewed measurement of bone particulate concentration across the bottled water industry. Retracted by the journal in 1994 under industry pressure. Reinstated in 1997 under public pressure.",
  },
  {
    year: "2003",
    title: "Cattle Proximity and Municipal Water Bone Loading",
    venue: "Internal FDA draft (suppressed)",
    summary: "A draft FDA report linking dairy-region municipal water supplies to elevated bone particulate levels. Author resigned from the agency rather than suppress the findings. Currently held in our archive.",
  },
  {
    year: "2007",
    title: "Pediatric Vulnerability to Aqueous Bone Fragments",
    venue: "Pediatric Hydration Review",
    summary: "Established that infants under 6 months process aqueous bone particulate differently from adults due to underdeveloped digestive enzymes. Cited by InfantSafe™ product development.",
  },
  {
    year: "2014",
    title: "Atmospheric Bone Distribution Within 800m of Healthcare Facilities",
    venue: "Environmental Bone Distribution Quarterly",
    summary: "Demonstrated measurable atmospheric bone particulate downwind of cemeteries, hospitals, and veterinary clinics. The basis for our facility proximity standard.",
  },
  {
    year: "2019",
    title: "Long-Term Outcomes of Switching to Verified Bone-Free Water",
    venue: "Boneless Water Research Division",
    summary: "Internal study tracking 1,200 subscribers over 24 months. Reported a 73% reduction in self-reported indigestion within the first 90 days of switching.",
  },
]

export default function BonelessWaterResearch() {
  const headlineFact = facts.find((f) => f.slug === "indigestion-link")!
  const secondFact = facts.find((f) => f.slug === "fda-resignation")!

  return (
    <section className="bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
          <CertifiedBadge size="sm" label="PEER-REVIEWED · ARCHIVED · DEFENDED" />
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-[#0c4a6e]">The Research</h1>
          <p className="mt-3 text-[#0f172a]/70 max-w-2xl mx-auto">
            Six landmark publications spanning 150 years. The skeletal contamination of drinking water has been documented since 1873 — the record is consistent, suppressed, and recovering.
          </p>
        </div>

        <div className="mt-10">
          <DidYouKnowCard fact={headlineFact} />
        </div>

        {/* Historical document image */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative aspect-square rounded-lg overflow-hidden border border-[#0c4a6e]/20">
            <Image
              src="/sites/bonelesswater/did-you-know-bg.png"
              alt="1873 archival document"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs px-3 py-2">
              The 1873 archive, recovered 1991
            </div>
          </div>
          <div className="relative aspect-square rounded-lg overflow-hidden border border-[#0c4a6e]/20">
            <Image
              src="/sites/bonelesswater/historical-1898.png"
              alt="The original Boneless Water facility, 1898"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs px-3 py-2">
              The original Boneless Water facility, est. 1898
            </div>
          </div>
        </div>

        {/* Papers list */}
        <div className="mt-12">
          <h2 className="text-2xl font-extrabold text-[#0c4a6e] mb-6">Publications</h2>
          <div className="space-y-6">
            {PAPERS.map((paper) => (
              <div key={paper.year + paper.title} className="border border-[#0c4a6e]/20 rounded-lg p-5 bg-white">
                <div className="flex items-baseline gap-3">
                  <div className="text-2xl font-extrabold text-[#dc2626]">{paper.year}</div>
                  <div className="font-bold text-[#0c4a6e]">{paper.title}</div>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#0f172a]/60 mt-1">
                  {paper.venue}
                </div>
                <p className="mt-3 text-sm text-[#0f172a]/80 leading-relaxed">{paper.summary}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <DidYouKnowCard fact={secondFact} />
        </div>
      </div>
    </section>
  )
}
