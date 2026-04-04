import Link from "next/link"
import { getSiteHref } from "@/lib/site-href"

interface HeroStat {
  value: string
  label: string
}

interface CaseStudyCardProps {
  slug: string
  company: string
  heroStat: HeroStat
  solutionArea: string
  summary: string
}

export async function CaseStudyCard({ slug, company, heroStat, solutionArea, summary }: CaseStudyCardProps) {
  const siteHref = await getSiteHref()

  return (
    <Link href={siteHref(`/case-studies/${slug}`)}>
      <div className="border border-primary/20 rounded-lg p-6 hover:border-accent hover:shadow-sm transition-all group h-full flex flex-col">
        <div className="mb-4">
          <span className="inline-block bg-accent text-white text-xs font-heading uppercase tracking-wider px-3 py-1 rounded">
            {solutionArea}
          </span>
        </div>
        <div className="mb-4">
          <div className="text-4xl font-heading font-bold text-accent leading-none">
            {heroStat.value}
          </div>
          <div className="text-sm text-foreground/60 mt-1">{heroStat.label}</div>
        </div>
        <h3 className="text-lg font-heading font-semibold text-primary mb-3 group-hover:text-accent transition-colors">
          {company}
        </h3>
        <p className="text-sm text-foreground/65 leading-relaxed flex-1">{summary}</p>
      </div>
    </Link>
  )
}
