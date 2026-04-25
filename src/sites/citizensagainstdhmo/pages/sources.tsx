import Image from "next/image"
import Link from "next/link"
import { Hero } from "@/components/ui/hero"
import { sources } from "@/sites/citizensagainstdhmo/data/sources"

export const metadata = {
  title: "Where It Hides — Citizens Against DHMO",
  description: "Eight everyday environments where citizens are exposed to dihydrogen monoxide without disclosure or consent.",
}

export default function SourcesIndexPage() {
  return (
    <>
      <Hero
        headline="Where It Hides"
        subheadline="Eight environments where DHMO is dispensed continuously, without disclosure, often to people who have not been asked for consent."
      />
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sources.map((source) => (
              <Link
                key={source.slug}
                href={`/sources/${source.slug}`}
                className="group block border border-accent/30 rounded-lg overflow-hidden bg-white hover:border-primary/40 transition-colors"
              >
                <div className="relative w-full aspect-[4/3] bg-secondary/10">
                  <Image src={source.heroImage} alt={source.name} fill className="object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-heading font-semibold text-primary mb-2 group-hover:text-secondary transition-colors">
                    {source.name}
                  </h3>
                  <p className="text-sm text-foreground/60 leading-relaxed">{source.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
