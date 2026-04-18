interface GlossySpecSheetProps {
  heading?: string
  specs: { label: string; value: string }[]
}

export function GlossySpecSheet({ heading = "Tech Specs", specs }: GlossySpecSheetProps) {
  return (
    <section className="bg-secondary py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-sm font-medium tracking-widest uppercase text-primary/60 mb-10 text-center">
          {heading}
        </h2>
        <dl className="divide-y divide-primary/10 border-y border-primary/10">
          {specs.map((spec) => (
            <div key={spec.label} className="grid grid-cols-1 md:grid-cols-3 gap-2 py-5">
              <dt className="text-sm font-medium text-primary/80">{spec.label}</dt>
              <dd className="md:col-span-2 text-primary/90">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
