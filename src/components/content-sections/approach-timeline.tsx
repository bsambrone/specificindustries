interface Milestone {
  phase: string
  title: string
  description: string
}

interface ApproachTimelineProps {
  title?: string
  milestones: Milestone[]
}

export function ApproachTimeline({
  title = "Engagement Timeline",
  milestones,
}: ApproachTimelineProps) {
  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-heading font-bold text-foreground mb-10">{title}</h2>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-2 bottom-2 w-px bg-accent/20" />
          <ol className="space-y-10">
            {milestones.map((m, i) => (
              <li key={i} className="relative pl-14">
                {/* Circle marker */}
                <div className="absolute left-0 top-1 w-9 h-9 rounded-full border-2 border-accent bg-background flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                </div>
                <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-1">
                  {m.phase}
                </p>
                <h3 className="font-heading font-semibold text-foreground text-lg mb-2">
                  {m.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed">{m.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
