import Image from "next/image"
import Link from "next/link"
import { Hero } from "@/components/ui/hero"
import { farmSites } from "@/sites/grassfedwifi/data/grazing-lands"
import { getRecentFieldNotes } from "@/sites/grassfedwifi/data/field-notes"

export const metadata = {
  title: "Grazing Lands — Grass Fed WiFi",
  description: "A territorial map of the co-op's frequency pastures. Learn which farm sites produce which signal.",
}

export default function GrazingLands() {
  const recentNotes = getRecentFieldNotes(3)

  return (
    <>
      <Hero
        headline="The Grazing Lands"
        subheadline="Where the signal is grown. Rotated seasonally. Rested between harvests."
        image="/sites/grassfedwifi/grazing-hero.png"
        dark
      />

      {/* Hand-drawn territorial map */}
      <section className="py-16 px-4 bg-accent/20">
        <div className="max-w-5xl mx-auto">
          <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-secondary/20 mb-8">
            <Image
              src="/sites/grassfedwifi/grazing-map.png"
              alt="Hand-drawn territorial map of the co-op's frequency pastures"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-center text-foreground/60 italic text-sm">
            Hand-drawn in the co-op barn by Fennel Ashcroft. Updated annually.
          </p>
        </div>
      </section>

      {/* Farm site profiles */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-foreground text-center mb-12">
            The Farm Sites
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {farmSites.map((site) => (
              <div
                key={site.name}
                className="bg-secondary/10 rounded-lg p-6"
              >
                <div className="flex items-baseline justify-between mb-3">
                  <h3 className="text-xl font-heading font-bold text-foreground">{site.name}</h3>
                  <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                    {site.direction}
                  </span>
                </div>
                <p className="text-foreground/80 mb-4 text-sm leading-relaxed">{site.description}</p>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-primary/10">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-foreground/50 mb-1">Specialty</p>
                    <p className="text-foreground text-sm font-medium">{site.specialty}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-foreground/50 mb-1">Harvest Window</p>
                    <p className="text-foreground text-sm font-medium">{site.harvestWindow}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Territorial philosophy */}
      <section className="py-16 px-4 bg-secondary/10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-6 text-center">
            Territorial Philosophy
          </h2>
          <p className="text-foreground/80 leading-relaxed mb-4">
            The co-op rotates its signal pastures on a strict calendar. No field is harvested for more
            than two consecutive weeks without rest. Fields are rotated in a five-position sequence that
            has been maintained since the co-op&apos;s founding.
          </p>
          <p className="text-foreground/80 leading-relaxed mb-4">
            This practice prevents what we call &quot;signal over-grazing&quot; — the gradual thinning of signal
            density that occurs when a field is harvested beyond its natural rhythm. Over-grazed fields
            produce pale packets with none of the character that members expect from us.
          </p>
          <p className="text-foreground/80 leading-relaxed">
            Members are welcome to visit the grazing lands during authorized tour windows (Reserve members
            only, by quarterly invitation). The Upland is not available for visitation under any
            circumstances.
          </p>
        </div>
      </section>

      {/* Field Notes from the Pastures */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-baseline justify-between mb-10">
            <div>
              <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-2">
                From the Field
              </p>
              <h2 className="text-3xl font-heading font-bold text-foreground">Field Notes</h2>
            </div>
            <Link
              href="/field-notes"
              className="text-primary font-semibold hover:underline text-sm"
            >
              All Field Notes →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {recentNotes.map((note) => (
              <Link
                key={note.slug}
                href={`/field-notes/${note.slug}`}
                className="block p-5 bg-secondary/10 rounded-lg hover:bg-secondary/20 transition-colors"
              >
                <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-2">
                  {note.tags[0]}
                </p>
                <h3 className="font-heading font-bold text-foreground mb-2 leading-snug">
                  {note.title}
                </h3>
                <p className="text-sm text-foreground/60 mb-3">
                  By {note.author} · {note.date}
                </p>
                <p className="text-sm text-foreground/70 leading-relaxed line-clamp-3">
                  {note.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
