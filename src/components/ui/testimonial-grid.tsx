interface Testimonial {
  quote: string
  author: string
}

interface TestimonialGridProps {
  title?: string
  testimonials: Testimonial[]
}

export function TestimonialGrid({ title, testimonials }: TestimonialGridProps) {
  return (
    <section className="py-16 px-4 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        {title && (
          <h2 className="text-3xl font-heading font-bold text-center mb-12">{title}</h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <blockquote
              key={testimonial.author}
              className="bg-background p-6 rounded-lg shadow-sm"
            >
              <p className="text-foreground/80 italic mb-4">&ldquo;{testimonial.quote}&rdquo;</p>
              <cite className="text-primary font-semibold not-italic">
                &mdash; {testimonial.author}
              </cite>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
