import Link from "next/link"
import Image from "next/image"
import { Hero } from "@/components/ui/hero"
import { ProductCard } from "@/components/ui/product-card"
import { treatments } from "@/sites/sovereignwellness/data/treatments"
import { founders } from "@/sites/sovereignwellness/data/leadership"
import { BannedTicker } from "@/sites/sovereignwellness/components/BannedTicker"
import { Crest } from "@/sites/sovereignwellness/components/Crest"
import { WaxSealCTA } from "@/sites/sovereignwellness/components/WaxSealCTA"
import { LedgerForm } from "@/sites/sovereignwellness/components/LedgerForm"

const featuredSlugs = ["tincture-no-7", "bilateral-thumb-fatigue-balm", "chronic-wednesday-reversal"]
const featured = treatments.filter((t) => featuredSlugs.includes(t.slug))

export default function SovereignWellnessHome() {
  return (
    <>
      <Hero
        headline="Ancestral medicine. Restored. Protected."
        subheadline="The cures they filed away in 1962. Sixteen Protocols, maintained in quiet defiance since 1774."
        ctaText="Enter the Archive"
        ctaHref="/treatments"
        image="/sites/sovereignwellness/hero.png"
      />

      {/* Intro band */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-sm tracking-[0.3em] uppercase text-primary/70 mb-3">What We Do</p>
            <h2 className="text-3xl font-heading font-semibold mb-5">Restoration, not invention.</h2>
            <p className="text-foreground/80 leading-relaxed">
              Every remedy we publish has been administered somewhere, by someone, for at least three centuries. We are not formulators. We are custodians. The Archive is not ours; it was handed to us by those who could no longer hold it.
            </p>
          </div>
          <div>
            <p className="text-sm tracking-[0.3em] uppercase text-primary/70 mb-3">Why You Haven&apos;t Heard Of Us</p>
            <h2 className="text-3xl font-heading font-semibold mb-5">Because They&apos;d Prefer It.</h2>
            <p className="text-foreground/80 leading-relaxed">
              We are not in the directories. We are not indexed. We do not advertise. The remedies in our catalog were legally available until 1962, at which point they were — not banned, not prohibited, but <em>filed</em>. We have located what was filed. We are, with some care, restoring it.
            </p>
          </div>
        </div>
      </section>

      <BannedTicker />

      {/* Featured Treatments */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-sm tracking-[0.3em] uppercase text-primary/70 mb-3">From the Archive</p>
          <h2 className="text-4xl font-heading font-semibold text-center mb-16">Three Protocols to Begin</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((t) => (
              <ProductCard
                key={t.slug}
                slug={t.slug}
                href={`/treatments/${t.slug}`}
                name={t.name}
                price={t.priceLabel}
                tagline={t.tagline}
                image={t.image}
                showAddToCart={false}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <WaxSealCTA href="/treatments">Browse All Sixteen</WaxSealCTA>
          </div>
        </div>
      </section>

      {/* Founders band */}
      <section className="py-20 px-4 bg-secondary/40 border-y border-primary/20">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm tracking-[0.3em] uppercase text-primary/70 mb-3">Signed by the four custodians</p>
          <h2 className="text-3xl font-heading font-semibold mb-10">Our Founders</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {founders.map((f) => (
              <div key={f.baseImage} className="text-center">
                <div className="relative w-full aspect-[3/4] overflow-hidden border-2 border-[#B08C3A] bg-[#4A3A1A]">
                  <Image src={f.portrait} alt={f.name} fill sizes="25vw" className="object-cover" />
                </div>
                <p className="mt-3 font-heading text-sm leading-tight">{f.name}</p>
                <p className="text-[10px] tracking-widest uppercase text-foreground/60 mt-1">{f.title}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link href="/founders" className="text-primary underline hover:opacity-70">
              Read the Founders&apos; Oath
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter / Ledger gate */}
      <section className="py-24 px-4 bg-accent text-[#F5ECD7]">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Crest size={80} />
          </div>
          <h2 className="text-4xl font-heading font-semibold mb-4">Join the Ledger.</h2>
          <p className="text-[#F5ECD7]/80 mb-8 leading-relaxed">
            We will not ask for your real name. We will ask for an address at which you do not mind receiving correspondence. We send three dispatches per year. None of them are urgent. All of them are worth reading.
          </p>
          <LedgerForm />
        </div>
      </section>
    </>
  )
}
