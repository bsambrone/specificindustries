import type { PageMetadata } from "@/themes"
import Image from "next/image"
import Link from "next/link"
import { leaders } from "@/sites/pointlessmetrics/data/leadership"
import { getFindingsByInvestigator } from "@/sites/pointlessmetrics/data/findings"

export const metadata: PageMetadata = {
  title: "Leadership — Institute for the Study of Pointless Metrics",
  description: "The four members of the Institute's leadership — Founder, Chief Research Officer, Director of Advisory Services, and Dean of the Practitioner Program.",
}

export default function PointlessMetricsLeadership() {
  return (
    <main className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs uppercase tracking-[0.2em] text-secondary mb-2">The Institute</p>
        <h1 className="font-heading text-4xl text-primary mb-2">Leadership</h1>
        <p className="text-foreground/75 max-w-3xl mb-12">
          Four individuals, collectively responsible for the Institute&apos;s research agenda, credentialing, advisory practice, and reputation.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {leaders.map((l) => {
            const count = getFindingsByInvestigator(l.person).length
            return (
              <article key={l.slug} className="bg-white border border-accent/40 rounded-sm overflow-hidden">
                <div className="aspect-[4/5] relative bg-accent/10">
                  <Image src={l.portraitImage} alt={l.name} fill className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
                </div>
                <div className="p-6">
                  <h2 className="font-heading text-2xl text-primary">{l.name}</h2>
                  <p className="text-sm text-secondary mb-4">{l.title}</p>
                  <p className="text-foreground/85 mb-4">{l.bio}</p>
                  <p className="text-xs text-foreground/60 tabular-nums">
                    Principal investigator on {count} published finding{count === 1 ? "" : "s"}.{" "}
                    <Link href="/findings" className="underline hover:text-primary">View the archive →</Link>
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </main>
  )
}
