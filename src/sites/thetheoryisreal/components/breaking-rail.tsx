// src/sites/thetheoryisreal/components/breaking-rail.tsx
import Link from "next/link"
import Image from "next/image"
import type { Theory } from "../types"
import { getSiteHref } from "@/lib/site-href"

export async function BreakingRail({ items }: { items: Theory[] }) {
  const siteHref = await getSiteHref()
  return (
    <section aria-label="Breaking exposures" className="relative border-y border-accent/60 bg-[#0b0c0e] py-8">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-5 flex items-center gap-3">
          <span className="inline-block h-2 w-2 rounded-full bg-accent" />
          <h2 className="font-heading text-sm uppercase tracking-[0.3em] text-accent">
            Breaking Exposures
          </h2>
          <span className="h-px flex-1 bg-accent/30" />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((t, idx) => (
            <Link
              key={t.slug}
              href={siteHref(`/theories/${t.slug}`)}
              className="group relative block"
            >
              {/* pushpin */}
              <span
                aria-hidden
                className="absolute -top-2 left-3 z-10 inline-block h-3 w-3 rounded-full bg-accent shadow-[0_0_6px_rgba(193,58,46,0.7)]"
              />
              <div className="relative aspect-[4/3] overflow-hidden border border-primary/30 grayscale group-hover:grayscale-0">
                <Image src={t.image} alt={t.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 20vw" />
              </div>
              <p className="mt-2 font-body text-sm leading-snug text-text group-hover:text-primary">
                {t.title}
              </p>
              <p className="mt-1 font-heading text-[0.65rem] uppercase tracking-widest text-text/55">
                {new Date(t.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </p>
              {idx < items.length - 1 && (
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-[-18%] top-4 hidden h-px w-[30%] origin-left rotate-3 bg-accent/40 lg:block"
                />
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
