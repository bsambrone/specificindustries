import Image from "next/image"

interface CustomerStoryProps {
  name: string
  location: string
  image: string
  quote: string
  rating: number
}

interface CustomerStoryGridProps {
  title?: string
  stories: CustomerStoryProps[]
}

export function CustomerStoryGrid({ title, stories }: CustomerStoryGridProps) {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {title && (
          <h2 className="text-3xl font-heading font-bold text-center mb-12">{title}</h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stories.map((story) => (
            <div
              key={story.name}
              className="bg-secondary/10 rounded-lg overflow-hidden"
            >
              <div className="relative w-full aspect-[3/2]">
                <Image
                  src={story.image}
                  alt={story.name}
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span
                      key={i}
                      className={i < story.rating ? "text-primary" : "text-foreground/20"}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <blockquote className="text-foreground/80 italic mb-4 leading-relaxed">
                  &ldquo;{story.quote}&rdquo;
                </blockquote>
                <div>
                  <cite className="text-primary font-semibold not-italic">{story.name}</cite>
                  <p className="text-foreground/50 text-sm">{story.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
