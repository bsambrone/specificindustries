interface CalloutProps {
  label?: string
  text: string
}

export function Callout({ label = "Key Insight", text }: CalloutProps) {
  return (
    <section className="py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="border-l-4 border-accent pl-6 py-2">
          <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-2">
            {label}
          </p>
          <p className="text-foreground/80 text-lg leading-relaxed">{text}</p>
        </div>
      </div>
    </section>
  )
}
