import { headers } from "next/headers"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getApexLeaderBySlug, apexLeaders } from "../data/leadership"
import { collectLeaderHistory, type SubsidiaryBoardPosition } from "../data/leader-history"
import { SubsidiaryBoardCard } from "@/components/ui/subsidiary-board-card"
import { verticals, verticalOrder } from "../data/verticals"
import type { VerticalKey } from "@/themes"

const PRODUCTION_HOST = "specificindustries.com"

export interface LeaderDetailProps {
  slug: string
}

export async function LeaderDetailView({ slug }: LeaderDetailProps) {
  const leader = getApexLeaderBySlug(slug)
  if (!leader) notFound()

  const headersList = await headers()
  const host = headersList.get("host") || ""
  const isProduction = host.endsWith(PRODUCTION_HOST)

  const history = await collectLeaderHistory(leader.person)

  const grouped = new Map<VerticalKey | "uncategorized", SubsidiaryBoardPosition[]>()
  for (const pos of history) {
    const key = pos.verticalKey ?? "uncategorized"
    const arr = grouped.get(key) ?? []
    arr.push(pos)
    grouped.set(key, arr)
  }

  function subsiteHref(subdomain: string): string {
    return isProduction
      ? `https://${subdomain}.${PRODUCTION_HOST}/about`
      : `/about?site=${subdomain}`
  }

  return (
    <>
      <section className="py-16 px-4 border-b border-primary/10">
        <div className="max-w-5xl mx-auto grid md:grid-cols-[200px_1fr] gap-10 items-start">
          <div className="relative aspect-square w-full max-w-[200px] rounded-lg overflow-hidden bg-secondary/10">
            <Image src={leader.portraitImage} alt={leader.name} fill sizes="200px" className="object-cover" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-foreground/50 font-heading mb-2">Leadership</p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-3">{leader.name}</h1>
            <p className="text-base text-foreground/70 uppercase tracking-wider font-heading mb-6">{leader.title}</p>
            <p className="text-foreground/80 leading-relaxed max-w-2xl">{leader.bio}</p>
          </div>
        </div>
      </section>

      <section className="py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-primary mb-6">Career Highlights</h2>
          <ul className="space-y-2 text-foreground/80">
            {leader.careerHighlights.map((h) => (
              <li key={h} className="flex gap-3"><span className="text-primary">—</span><span>{h}</span></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-14 px-4 bg-secondary/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-primary mb-2">Subsidiary Board Positions</h2>
          <p className="text-sm text-foreground/60 mb-8">
            Cross-portfolio roles held across {history.length} Specific Industries holdings.
          </p>
          {history.length === 0 ? (
            <p className="text-foreground/60">Board positions are being updated.</p>
          ) : (
            <div className="space-y-8">
              {verticalOrder.map((key) => {
                const positions = grouped.get(key) ?? []
                if (positions.length === 0) return null
                return (
                  <div key={key}>
                    <h3 className="text-xs uppercase tracking-[0.2em] text-foreground/50 font-heading mb-3">
                      {verticals[key].displayName}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {positions.map((p) => (
                        <SubsidiaryBoardCard
                          key={p.subdomain}
                          subsiteName={p.subsiteName}
                          subsiteFavicon={p.subsiteFavicon}
                          nameThere={p.nameThere}
                          titleThere={p.titleThere}
                          blurb={p.blurb}
                          href={subsiteHref(p.subdomain)}
                        />
                      ))}
                    </div>
                  </div>
                )
              })}
              {(grouped.get("uncategorized") ?? []).length > 0 && (
                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-foreground/50 font-heading mb-3">Other</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {grouped.get("uncategorized")!.map((p) => (
                      <SubsidiaryBoardCard
                        key={p.subdomain}
                        subsiteName={p.subsiteName}
                        subsiteFavicon={p.subsiteFavicon}
                        nameThere={p.nameThere}
                        titleThere={p.titleThere}
                        blurb={p.blurb}
                        href={subsiteHref(p.subdomain)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-primary mb-6">Credentials</h2>
          <ul className="space-y-2 text-foreground/80">
            {leader.credentials.map((c) => (
              <li key={c} className="flex gap-3"><span className="text-primary">—</span><span>{c}</span></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-8 px-4 border-t border-primary/10">
        <div className="max-w-5xl mx-auto">
          <Link href="/about" className="text-sm font-heading text-primary hover:underline">
            ← Back to About
          </Link>
        </div>
      </section>
    </>
  )
}

export function apexLeaderSlugs(): string[] {
  return apexLeaders.map((l) => l.slug)
}

export default function LeaderDetailRoute({ slug }: { slug: string; segments?: string[] }) {
  return <LeaderDetailView slug={slug} />
}
