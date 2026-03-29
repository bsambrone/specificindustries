import React, { ComponentProps } from "react"
import { CaseHero } from "./case-hero"
import { Challenge } from "./challenge"
import { Approach } from "./approach"
import { ApproachTimeline } from "./approach-timeline"
import { ResultsGrid } from "./results-grid"
import { BeforeAfter } from "./before-after"
import { ExecutiveQuote } from "./executive-quote"
import { ClientQuote } from "./client-quote"
import { Callout } from "./callout"
import { DataChart } from "./data-chart"
import { WpHero } from "./wp-hero"
import { Prose } from "./prose"
import { SectionHeader } from "./section-header"
import { KeyInsight } from "./key-insight"
import { PullQuote } from "./pull-quote"
import { MethodologyDiagram } from "./methodology-diagram"
import { SidebarNote } from "./sidebar-note"
import { Footnotes } from "./footnotes"
import { AuthorBio } from "./author-bio"

// ---------------------------------------------------------------------------
// Discriminated union — one variant per section type
// ---------------------------------------------------------------------------

export type ContentSection =
  | { type: "case-hero"; props: ComponentProps<typeof CaseHero> }
  | { type: "challenge"; props: ComponentProps<typeof Challenge> }
  | { type: "approach"; props: ComponentProps<typeof Approach> }
  | { type: "approach-timeline"; props: ComponentProps<typeof ApproachTimeline> }
  | { type: "results-grid"; props: ComponentProps<typeof ResultsGrid> }
  | { type: "before-after"; props: ComponentProps<typeof BeforeAfter> }
  | { type: "executive-quote"; props: ComponentProps<typeof ExecutiveQuote> }
  | { type: "client-quote"; props: ComponentProps<typeof ClientQuote> }
  | { type: "callout"; props: ComponentProps<typeof Callout> }
  | { type: "data-chart"; props: ComponentProps<typeof DataChart> }
  | { type: "wp-hero"; props: ComponentProps<typeof WpHero> }
  | { type: "prose"; props: ComponentProps<typeof Prose> }
  | { type: "section-header"; props: ComponentProps<typeof SectionHeader> }
  | { type: "key-insight"; props: ComponentProps<typeof KeyInsight> }
  | { type: "pull-quote"; props: ComponentProps<typeof PullQuote> }
  | { type: "methodology-diagram"; props: Record<string, never> }
  | { type: "sidebar-note"; props: ComponentProps<typeof SidebarNote> }
  | { type: "footnotes"; props: ComponentProps<typeof Footnotes> }
  | { type: "author-bio"; props: ComponentProps<typeof AuthorBio> }

// ---------------------------------------------------------------------------
// Component map
// ---------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const componentMap: Record<ContentSection["type"], React.ComponentType<any>> = {
  "case-hero": CaseHero,
  "challenge": Challenge,
  "approach": Approach,
  "approach-timeline": ApproachTimeline,
  "results-grid": ResultsGrid,
  "before-after": BeforeAfter,
  "executive-quote": ExecutiveQuote,
  "client-quote": ClientQuote,
  "callout": Callout,
  "data-chart": DataChart,
  "wp-hero": WpHero,
  "prose": Prose,
  "section-header": SectionHeader,
  "key-insight": KeyInsight,
  "pull-quote": PullQuote,
  "methodology-diagram": MethodologyDiagram,
  "sidebar-note": SidebarNote,
  "footnotes": Footnotes,
  "author-bio": AuthorBio,
}

// ---------------------------------------------------------------------------
// SectionRenderer
// ---------------------------------------------------------------------------

interface SectionRendererProps {
  sections: ContentSection[]
}

export function SectionRenderer({ sections }: SectionRendererProps) {
  return (
    <>
      {sections.map((section, i) => {
        const Component = componentMap[section.type]
        return <Component key={i} {...section.props} />
      })}
    </>
  )
}
