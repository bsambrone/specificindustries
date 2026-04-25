import Image from "next/image"
import Link from "next/link"
import { Hero } from "@/components/ui/hero"
import { stories } from "@/sites/citizensagainstdhmo/data/stories"

export const metadata = {
  title: "Survivor Stories — Citizens Against DHMO",
  description: "First-person accounts from citizens who have come to terms with their personal exposure to dihydrogen monoxide.",
}

export default function StoriesIndexPage() {
  return (
    <>
      <Hero
        headline="Survivor Stories"
        subheadline="Eight citizens, in their own words. Each story represents a different relationship with DHMO and a different path to awareness."
      />
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stories.map((story) => (
              <Link
                key={story.slug}
                href={`/stories/${story.slug}`}
                className="group block border border-accent/30 rounded-lg overflow-hidden bg-white hover:border-primary/40 transition-colors"
              >
                <div className="relative w-full aspect-square bg-secondary/10">
                  <Image src={story.portrait} alt={story.name} fill className="object-cover object-top" />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-heading font-semibold text-primary mb-1 group-hover:text-secondary transition-colors">
                    {story.name}
                  </h3>
                  <p className="text-xs text-foreground/60">{story.age} · {story.location}</p>
                  <p className="text-xs text-foreground/50 mt-1">{story.occupation}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
