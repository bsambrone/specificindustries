// src/sites/thetheoryisreal/pages/about.tsx
import type { PageMetadata } from "@/themes"
import { dossiers, pickCodename } from "@/sites/thetheoryisreal/data/leadership"
import { LeadershipDossierCard } from "@/sites/thetheoryisreal/components/leadership-dossier-card"

export const metadata: PageMetadata = {
  title: "About — The Theory Is Real",
  description: "Origin, mandate, and redacted leadership roster.",
}

export default async function About() {
  // Deterministic per-render codename seed based on a daily rotation so SSR and hydration agree.
  const todaySeed = Math.floor(new Date().getTime() / (24 * 60 * 60 * 1000))
  return (
    <main className="mx-auto max-w-5xl px-4 py-16">
      <header className="mb-12">
        <p className="font-heading text-xs uppercase tracking-[0.3em] text-accent">
          INTERNAL DOCUMENT · DECLASSIFIED
        </p>
        <h1 className="mt-2 font-heading text-4xl text-primary">About This Outlet</h1>
        <p className="mt-4 font-body text-lg leading-relaxed text-text/85">
          We are a collective of former professionals, amateur observers, and one retired municipal technician
          who met — we will not explain how — in the late 2010s and discovered that the observations each of us
          had been compiling independently were converging on the same phenomena.
        </p>
        <p className="mt-4 font-body text-base leading-relaxed text-text/80">
          This outlet exists because the observations had nowhere else to go. The mainstream outlets would not
          publish them. The academic journals would not peer-review them. The forums would not keep them up. So
          we built something that would.
        </p>
        <p className="mt-4 font-body text-base leading-relaxed text-text/80">
          We do not accept advertising. We do not take funding from foundations. We do not know who owns the
          domain registration and, frankly, at this point we have stopped asking.
        </p>
      </header>

      <section>
        <h2 className="mb-6 font-heading text-sm uppercase tracking-[0.3em] text-accent">
          Redacted Leadership Roster
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {dossiers.map((d, i) => (
            <LeadershipDossierCard
              key={d.id}
              dossier={d}
              codename={pickCodename(todaySeed + i)}
              index={i}
            />
          ))}
        </div>
        <p className="mt-8 font-body text-sm italic text-text/60">
          Codenames rotate daily. Photos are redacted at the subject&apos;s request. Status tags reflect the most
          recent confirmed correspondence.
        </p>
      </section>
    </main>
  )
}
