import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getStoryBySlug } from "@/sites/citizensagainstdhmo/data/stories"

interface StoryDetailProps {
  slug: string
}

export default function StoryDetailPage({ slug }: StoryDetailProps) {
  const story = getStoryBySlug(slug)
  if (!story) notFound()

  return (
    <>
      <section className="py-20 px-6 bg-white border-b border-accent/20">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 items-start">
          <div className="relative aspect-square w-full md:w-[200px] rounded-lg overflow-hidden bg-secondary/10">
            <Image src={story.portrait} alt={story.name} fill className="object-cover object-top" />
          </div>
          <div>
            <p className="text-xs text-secondary font-semibold uppercase tracking-wider mb-2">Survivor Story</p>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary leading-tight mb-3">{story.name}</h1>
            <p className="text-foreground/60 text-sm">
              {story.age} · {story.location} · {story.occupation}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-3">In Their Own Words</p>
          <div className="space-y-5 text-lg text-foreground/80 leading-relaxed">
            {story.testimonial.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-primary/5 border-y border-primary/20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-2xl md:text-3xl font-heading font-semibold text-primary leading-snug italic">
            &ldquo;{story.pullQuote}&rdquo;
          </p>
          <p className="text-sm text-foreground/60 mt-4">— {story.name}</p>
        </div>
      </section>

      <section className="py-20 px-6 bg-secondary text-background text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-heading font-bold mb-4">What You Can Do</h2>
          <p className="text-background/85 mb-8 leading-relaxed">
            Sign the petition. Find your local chapter. Demand disclosure where you live, work, and learn.
          </p>
          <Link
            href="/take-action"
            className="inline-block px-10 py-3 bg-background text-secondary rounded font-semibold uppercase tracking-wider text-sm hover:opacity-90 transition-opacity"
          >
            Take Action
          </Link>
        </div>
      </section>
    </>
  )
}
