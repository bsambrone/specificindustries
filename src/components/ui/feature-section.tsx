interface Feature {
  title: string
  description: string
}

interface FeatureSectionProps {
  title?: string
  features: Feature[]
}

export function FeatureSection({ title, features }: FeatureSectionProps) {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {title && (
          <h2 className="text-3xl font-heading font-bold text-center mb-12">{title}</h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="text-center p-6">
              <h3 className="text-xl font-heading font-semibold mb-3 text-primary">
                {feature.title}
              </h3>
              <p className="text-foreground/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
