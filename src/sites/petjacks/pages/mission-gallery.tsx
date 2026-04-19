import Image from "next/image"
import { missionGallery } from "@/sites/petjacks/data/mission-gallery"
import LegalFooter from "@/sites/petjacks/components/legal-footer"

export const metadata = {
  title: "Mission Gallery — Petjacks",
  description: "Honoring every pet who has taken to the sky with Petjacks.",
}

export default function PetjacksMissionGallery() {
  return (
    <>
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <p className="text-xs uppercase tracking-widest text-accent mb-2">Mission Gallery</p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">The pets who took to the sky.</h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            We honor every Petjacks pilot — their courage, their joy, and their place in our shared history.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {missionGallery.map((entry) => (
            <article
              key={entry.slug}
              className={`bg-background rounded-lg overflow-hidden ${entry.memorial ? "border-2 border-foreground/80" : "border border-accent/20"}`}
            >
              <div className="relative aspect-square bg-secondary/30">
                <Image src={entry.portrait} alt={entry.petName} fill className="object-cover" />
              </div>
              <div className="p-5">
                <p className="text-xs uppercase tracking-widest text-accent mb-1">{entry.missionId}</p>
                <h2 className="text-xl font-heading font-semibold text-foreground">{entry.petName}</h2>
                {entry.memorial && (
                  <p className="text-[11px] uppercase tracking-widest font-mono text-foreground/60 mt-1">In Memoriam · 2024</p>
                )}
                <p className="text-sm text-foreground/60 mt-1">
                  {entry.species.charAt(0).toUpperCase() + entry.species.slice(1)} · {entry.model}
                </p>
                <blockquote className="text-sm text-foreground/70 mt-3 italic border-l-2 border-accent/40 pl-3">
                  &ldquo;{entry.quote}&rdquo;
                </blockquote>
              </div>
            </article>
          ))}
        </div>
      </section>

      <LegalFooter />
    </>
  )
}
