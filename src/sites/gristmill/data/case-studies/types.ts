export interface HeroStat {
  value: string
  label: string
}

export interface TimelinePhase {
  name: string
  description: string
}

export interface MetricStat {
  value: string
  label: string
}

export type CaseStudySection =
  | { kind: "challenge"; paragraphs: string[] }
  | { kind: "engagement"; intro: string; products: string[] }
  | { kind: "timeline"; phases: TimelinePhase[] }
  | { kind: "metrics"; stats: MetricStat[] }
  | {
      kind: "quote"
      body: string
      attribution: string
      role: string
      photoSlug: string
    }
  | { kind: "outcome"; paragraphs: string[] }

export interface CaseStudy {
  slug: string
  company: string
  industry: string
  location: string
  headline: string
  heroStat: HeroStat
  engagedArms: string[]
  sections: CaseStudySection[]
}
