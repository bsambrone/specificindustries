import Image from "next/image"
import { Hero } from "@/components/ui/hero"
import {
  heroStats,
  emissionsAvertedByRegion,
  dollarBreakdown,
  impactTestimonialPortraitSlugs,
  impactTestimonialQuotes,
} from "@/sites/carbonneutraloutrage/data/impact-stats"
import { getPortrait } from "@/data/testimonial-portraits"

export const metadata = {
  title: "Impact — Campaign for Sustainable Overreactions",
  description: "Annual Impact Report: 47,000 tantrums offset, 1.2M reusable pitchforks in circulation, 12,000 Certified Responsible Overreactors™ credentialed. Audited annually.",
}

const CHART_PRIMARY = "#1f4d3a"      // matches theme.colors.primary
const CHART_SECONDARY = "#c96a47"    // matches theme.colors.secondary
const CHART_ACCENT = "#87a287"
const CHART_NEUTRAL = "#cdc6b6"

const DONUT_COLORS = [CHART_PRIMARY, CHART_SECONDARY, CHART_ACCENT, CHART_NEUTRAL]

function donutSegments(): { color: string; offset: number; length: number; label: string; pct: number }[] {
  const circumference = 2 * Math.PI * 45  // r=45
  let cumulative = 0
  return dollarBreakdown.map((segment, i) => {
    const length = (segment.pct / 100) * circumference
    const offset = -cumulative
    cumulative += length
    return { color: DONUT_COLORS[i % DONUT_COLORS.length], offset, length, label: segment.label, pct: segment.pct }
  })
}

export default function ImpactPage() {
  const maxAverted = Math.max(...emissionsAvertedByRegion.map((r) => r.averted))
  const segments = donutSegments()

  return (
    <>
      <Hero
        headline="Annual Impact Report"
        subheadline="Cumulative results across nine years of operation. Audited annually. Methodology current through v4.2."
        image="/sites/carbonneutraloutrage/impact.png"
      />

      {/* Hero Stats */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <p className="text-5xl md:text-6xl font-heading font-bold text-primary">{stat.value}</p>
                <p className="text-xs md:text-sm text-foreground/60 mt-3 leading-snug">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bar chart: emissions averted by region */}
      <section className="py-20 px-6 bg-white border-y border-accent/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-primary mb-2">Outrage emissions averted, by region</h2>
          <p className="text-sm text-foreground/60 mb-10">tonnes CO₂e, cumulative through 2026</p>
          <div className="space-y-4">
            {emissionsAvertedByRegion.map((row) => (
              <div key={row.region}>
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-sm text-foreground/80 font-medium">{row.region}</span>
                  <span className="text-xs text-foreground/60 font-mono">{row.averted.toLocaleString()} t</span>
                </div>
                <div className="h-3 bg-accent/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${(row.averted / maxAverted) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donut chart: where your dollar goes */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-primary mb-2 text-center">Where your dollar goes</h2>
          <p className="text-sm text-foreground/60 mb-10 text-center">FY 2024 program-expense breakdown, audited</p>
          <div className="flex flex-col md:flex-row items-center gap-12 justify-center">
            <svg viewBox="0 0 100 100" className="w-56 h-56 -rotate-90">
              {segments.map((seg, i) => (
                <circle
                  key={i}
                  cx="50"
                  cy="50"
                  r="45"
                  fill="transparent"
                  stroke={seg.color}
                  strokeWidth="10"
                  strokeDasharray={`${seg.length} ${2 * Math.PI * 45}`}
                  strokeDashoffset={seg.offset}
                />
              ))}
            </svg>
            <ul className="space-y-3">
              {segments.map((seg) => (
                <li key={seg.label} className="flex items-center gap-3">
                  <span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: seg.color }} />
                  <span className="text-sm text-foreground/80">{seg.label}</span>
                  <span className="text-sm text-foreground/50 font-mono ml-2">{seg.pct}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Beneficiary testimonials */}
      <section className="py-20 px-6 bg-white border-t border-accent/20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-primary text-center mb-12">From the Movement</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {impactTestimonialPortraitSlugs.map((slug) => {
              const portrait = getPortrait(slug)
              if (!portrait) return null
              return (
                <blockquote key={slug} className="border border-accent/20 rounded-lg p-6 bg-background">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden bg-secondary/20 mb-4">
                    <Image src={portrait.image} alt={portrait.name} fill className="object-cover object-top" />
                  </div>
                  <p className="text-sm text-foreground/80 italic leading-relaxed mb-4">
                    &ldquo;{impactTestimonialQuotes[slug]}&rdquo;
                  </p>
                  <cite className="text-xs not-italic text-primary font-semibold">
                    {portrait.name}
                    {portrait.role && <span className="text-foreground/50 font-normal"> — {portrait.role}</span>}
                  </cite>
                </blockquote>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
