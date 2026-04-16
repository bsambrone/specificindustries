import Image from "next/image"
import Link from "next/link"
import { getProductsByBranch } from "@/sites/squaredaway/data/products"
import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "Army — Squared Away Supply Co.",
  description:
    "Authorized field gear, morale bricks, invisibility cloaks, and MRE pairing flights for the United States Army.",
}

const INTRO =
  "Welcome to the Army section. You walk a lot. You carry a lot. You PowerPoint a lot. We have items for each of these core duties, priced to reflect the labor you already knew was underpaid. The Army does the work. You have this."

export default function ArmyPage() {
  const products = getProductsByBranch("army")
  return (
    <>
      <section className="relative">
        <div className="relative w-full h-48 md:h-64">
          <Image
            src="/sites/squaredaway/branch-army.png"
            alt="Army branch banner"
            fill
            priority
            fetchPriority="high"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-background/60" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="text-center max-w-3xl">
            <p className="font-mono uppercase tracking-widest text-primary text-xs mb-1">Component: LAND</p>
            <h1 className="font-heading text-4xl md:text-5xl text-primary uppercase tracking-widest">Army</h1>
            <p className="text-foreground/90 mt-2">This We&apos;ll Defend. For a Price.</p>
          </div>
        </div>
      </section>

      <section className="py-10 px-4 border-b-2 border-primary/30">
        <p className="max-w-3xl mx-auto text-foreground/80 text-center italic">{INTRO}</p>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((p) => (
            <Link
              key={p.slug}
              href={`/products/${p.slug}`}
              className="group block border-2 border-primary/40 bg-background hover:border-accent transition-colors"
            >
              <div className="relative aspect-square">
                <Image src={p.image} alt={p.name} fill className="object-cover" />
              </div>
              <div className="p-4 border-t-2 border-primary/40">
                <p className="font-mono text-xs uppercase text-primary/60 mb-1">NSN {p.nsn}</p>
                <p className="font-heading text-primary uppercase tracking-wide text-lg leading-tight mb-1">{p.name}</p>
                <p className="text-sm text-foreground/70 mb-2">{p.tagline}</p>
                <p className="font-mono text-accent">{p.priceLabel}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-10 px-4 bg-primary/5 border-t-2 border-primary/30">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-primary/70 mb-2">Also Available</p>
          <div className="flex flex-wrap justify-center gap-3 font-heading uppercase tracking-widest">
            <Link href="/navy" className="border-2 border-primary/40 px-4 py-2 hover:border-accent">Navy</Link>
            <Link href="/airforce" className="border-2 border-primary/40 px-4 py-2 hover:border-accent">Air Force</Link>
            <Link href="/marines" className="border-2 border-primary/40 px-4 py-2 hover:border-accent">Marines</Link>
            <Link href="/spaceforce" className="border-2 border-primary/40 px-4 py-2 hover:border-accent">Space Force</Link>
          </div>
        </div>
      </section>
    </>
  )
}
