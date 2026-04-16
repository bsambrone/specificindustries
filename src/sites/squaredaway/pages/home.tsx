import Image from "next/image"
import Link from "next/link"
import { getFeaturedProducts } from "@/sites/squaredaway/data/products"

const BRANCHES: Array<{ slug: string; label: string; image: string; tagline: string }> = [
  {
    slug: "army",
    label: "Army",
    image: "/sites/squaredaway/branch-army.png",
    tagline: "Heavy. Tired. Authorized.",
  },
  {
    slug: "navy",
    label: "Navy",
    image: "/sites/squaredaway/branch-navy.png",
    tagline: "Haze gray and underfunded.",
  },
  {
    slug: "airforce",
    label: "Air Force",
    image: "/sites/squaredaway/branch-airforce.png",
    tagline: "Premium deployment experiences.",
  },
  {
    slug: "marines",
    label: "Marines",
    image: "/sites/squaredaway/branch-marines.png",
    tagline: "Oorah. Crayons. Oorah.",
  },
]

const TESTIMONIALS = [
  { quote: "I bought the invisibility cloak. My 1SG still found me.", cite: "SGT (P) Devaughn Miles · Fort Irwin" },
  { quote: "The coffee tastes like a fan room at 0400. Five stars.", cite: "CPO Regina Hollenbeck · CVN-74" },
  { quote: "My Concierge Kit arrived with a complimentary robe. I cried.", cite: "Maj. Tucker Lindgren · Al Udeid AB" },
  { quote: "I ate the crayons. They were better than the MRE.", cite: "LCpl Jackson Peralta · Camp Pendleton" },
]

export default function HomePage() {
  const featured = getFeaturedProducts()
  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="relative w-full h-64 md:h-80 lg:h-96">
          <Image
            src="/sites/squaredaway/hero.png"
            alt="Squared Away Supply Co. storefront"
            fill
            priority
            fetchPriority="high"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-background/40" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="text-center max-w-3xl">
            <p className="font-mono uppercase tracking-widest text-primary text-xs mb-2">
              UNCLASSIFIED // FOUO
            </p>
            <h1 className="font-heading text-4xl md:text-6xl text-primary leading-tight mb-3 drop-shadow-[0_2px_0_rgba(255,255,255,0.5)]">
              The Official Unofficial Post Exchange.
            </h1>
            <p className="text-foreground/90 text-lg md:text-xl">
              Authorized gear for all four service branches, plus one that shall remain nameless.
            </p>
          </div>
        </div>
      </section>

      {/* Branch tiles */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-3xl text-primary mb-8 uppercase tracking-widest text-center">
            Select Your Branch
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {BRANCHES.map((b) => (
              <Link
                key={b.slug}
                href={`/${b.slug}`}
                className="group block border-2 border-primary/40 hover:border-accent transition-colors bg-background/70"
              >
                <div className="relative aspect-square">
                  <Image src={b.image} alt={b.label} fill className="object-cover" />
                </div>
                <div className="p-3 border-t-2 border-primary/40">
                  <p className="font-heading uppercase tracking-widest text-primary">{b.label}</p>
                  <p className="text-xs text-foreground/70">{b.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured strip */}
      <section className="py-14 px-4 bg-primary/10 border-y-2 border-primary/30">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono uppercase tracking-widest text-primary/70 text-xs mb-1">THIS WEEK AT THE PX</p>
          <h2 className="font-heading text-2xl text-primary uppercase tracking-widest mb-8">Featured Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="block border-2 border-primary/40 bg-background hover:border-accent transition-colors"
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
        </div>
      </section>

      {/* Morale pitch */}
      <section className="py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-mono uppercase tracking-widest text-primary/70 text-xs mb-2">MWR PROGRAM</p>
          <h2 className="font-heading text-3xl text-primary uppercase tracking-widest mb-4">Morale Is a Metric.</h2>
          <p className="text-foreground/80 mb-6">
            Enroll in the Squared Away Morale Program™ and earn Morale Points with every purchase. Unlock tiers
            ranging from E-1 Private to General of the Army. Redeem points for the illusion of meaning.*
          </p>
          <Link
            href="/morale"
            className="inline-block border-2 border-primary bg-primary text-background font-heading uppercase tracking-widest px-8 py-3 hover:bg-accent hover:border-accent transition-colors"
          >
            Initiate Morale
          </Link>
          <p className="text-xs text-foreground/50 mt-4">
            *Illusion of meaning not redeemable at all locations. Ships in 6-8 weeks.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-14 px-4 bg-primary/5 border-y-2 border-primary/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-2xl text-primary uppercase tracking-widest mb-8 text-center">
            After Action Reports
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {TESTIMONIALS.map((t, i) => (
              <blockquote key={i} className="border-l-4 border-accent pl-4">
                <p className="text-sm text-foreground/90 mb-2">&ldquo;{t.quote}&rdquo;</p>
                <cite className="font-mono text-xs uppercase tracking-wider text-primary/70 not-italic">— {t.cite}</cite>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
