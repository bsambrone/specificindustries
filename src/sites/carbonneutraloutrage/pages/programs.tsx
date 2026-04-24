import Image from "next/image"
import Link from "next/link"
import { Hero } from "@/components/ui/hero"
import { programs } from "@/sites/carbonneutraloutrage/data/programs"

export const metadata = {
  title: "Programs — Campaign for Sustainable Overreactions",
  description: "Eight active programs spanning kit distribution, reusable infrastructure, monthly issue curation, offset markets, calculator tools, reforestation, composting, and credentialing.",
}

export default function ProgramsIndexPage() {
  return (
    <>
      <Hero
        headline="Programs"
        subheadline="Eight active programs covering the full lifecycle of responsible overreaction. Each is independently funded, audited annually, and operated through our regional cooperative network."
        image="/sites/carbonneutraloutrage/programs.png"
      />
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program) => (
              <Link
                key={program.slug}
                href={`/programs/${program.slug}`}
                className="group border border-accent/20 rounded-lg overflow-hidden bg-white hover:border-primary/40 transition-colors"
              >
                <div className="relative w-full aspect-[16/10] bg-secondary/10">
                  <Image src={program.heroImage} alt={program.displayName} fill className="object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-heading font-semibold text-primary mb-2 leading-snug">
                    {program.displayName}
                  </h3>
                  <p className="text-sm text-foreground/70 leading-relaxed mb-3">{program.tagline}</p>
                  <p className="text-xs text-accent font-medium">{program.oneLiner}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
