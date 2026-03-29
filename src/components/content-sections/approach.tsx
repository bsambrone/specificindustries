interface ApproachStep {
  name: string
  description: string
}

interface ApproachProps {
  title?: string
  steps: ApproachStep[]
}

export function Approach({ title = "Our Approach", steps }: ApproachProps) {
  return (
    <section className="py-16 px-4 bg-primary/5">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-heading font-bold text-foreground mb-10">{title}</h2>
        <ol className="space-y-8">
          {steps.map((step, i) => (
            <li key={i} className="flex gap-5">
              <div className="shrink-0 w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-heading font-bold text-sm">
                {i + 1}
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground text-lg mb-1">
                  {step.name}
                </h3>
                <p className="text-foreground/70 leading-relaxed">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
