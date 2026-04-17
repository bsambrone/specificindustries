import Image from "next/image"
import { Hero } from "@/components/ui/hero"
import { executives } from "@/sites/carterandfils/data/leadership"

export const metadata = {
  title: "Our Story — Domaine Carter & Fils",
  description: "The history of the Carter family estate, the philosophy of the Allegheny terroir, seven generations of stewardship, and the current family leading the estate today.",
}

const generations = [
  { name: "Édouard Carter", years: "1859–1887", note: "Founder. Planted the first vines on the Allegheny parcel." },
  { name: "Jean-Luc Carter", years: "1887–1912", note: "Expanded the cellar; introduced the first oak program." },
  { name: "Henri Carter", years: "1912–1941", note: "Planted the vines that would become the Vieilles Vignes parcel in 1952." },
  { name: "Philippe Carter", years: "1941–1968", note: "Modernized the press house; weathered two difficult decades." },
  { name: "Gaston Carter", years: "1968–1989", note: "Introduced the Reserve bottlings and the first DOT Sparkling program." },
  { name: "Raphaël Carter", years: "1989–2005", note: "Shepherded the estate through significant regulatory modernization." },
  { name: "Étienne Carter", years: "2005–present", note: "Returned from Burgundy to launch the modern era of the estate." },
]

export default function OurStory() {
  return (
    <>
      <Hero
        headline="Our Story"
        subheadline="Seven generations of estate-bottled work."
        image="/sites/carterandfils/estate-vineyards.png"
      />

      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto prose prose-lg text-foreground/80 space-y-6">
          <h2 className="text-3xl font-heading font-semibold text-primary">The 1859 Founding</h2>
          <p>
            Édouard Carter arrived in the Allegheny foothills of western Pennsylvania in 1859, carrying with him a handful of cuttings, a slim volume of viticultural notes from his native Languedoc, and the conviction that the region&apos;s shale-rich soil would produce wine of uncommon character. He was, by all accounts, largely correct.
          </p>
          <p>
            The estate&apos;s first vines went into the ground that spring. The first commercial bottling followed in 1863. Within a generation, the name Carter had become synonymous with a particular kind of Allegheny red — dense, mineral, and unhurried.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4">
        <div className="relative aspect-[16/9] border border-accent/30">
          <Image
            src="/sites/carterandfils/estate-press-house.png"
            alt="The original 1863 press building at Domaine Carter & Fils"
            fill
            className="object-cover"
          />
        </div>
        <p className="text-center text-sm text-foreground/50 italic mt-4 mb-16">
          The original 1863 press building, still in use today.
        </p>
      </div>

      <section className="py-16 px-4 bg-secondary/40 border-y border-accent/20">
        <div className="max-w-3xl mx-auto prose prose-lg text-foreground/80 space-y-6">
          <h2 className="text-3xl font-heading font-semibold text-primary">The Philosophy of Terroir</h2>
          <p>
            Our approach has not changed in one hundred and sixty-six years. The soil beneath the vines is our collaborator; our work is to not interfere with what it wishes to say. The Allegheny shale is dense, layered, and old — and it imparts a hydrocarbon minerality to the wine that we have never attempted to correct.
          </p>
          <p>
            We believe that a great bottle is a statement of place. Our place happens to be an uncommon one.
          </p>
        </div>
        <div className="max-w-4xl mx-auto mt-12">
          <div className="relative aspect-[16/9] border border-accent/30">
            <Image
              src="/sites/carterandfils/estate-terroir.png"
              alt="Allegheny shale terroir, cross-section"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-center text-sm text-foreground/50 italic mt-4">
            The layered shale formation beneath the estate.
          </p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-heading font-semibold text-primary mb-10">Seven Generations</h2>
          <div className="space-y-6">
            {generations.map((g, i) => (
              <div key={i} className="border-l-2 border-accent pl-6">
                <p className="text-sm tracking-[0.2em] uppercase text-primary/70">{g.years}</p>
                <p className="text-xl font-heading font-semibold text-foreground">{g.name}</p>
                <p className="text-foreground/70">{g.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-secondary/40 border-y border-accent/20">
        <div className="max-w-3xl mx-auto prose prose-lg text-foreground/80 space-y-6">
          <h2 className="text-3xl font-heading font-semibold text-primary">The Modern Era</h2>
          <p>
            Étienne Carter returned from a formative decade in Burgundy in 2005 and spent his first years at home studying his father&apos;s methods before making changes. The cellar was modernized. The press house was rebuilt. A new sommelier program was introduced under Archibald Whitford. Through all of this, the underlying work remained what it has always been: attention to the soil, patience with the barrel, and a refusal to hurry what wants to take its time.
          </p>
          <p>
            We are a small estate. We intend to stay that way.
          </p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm tracking-[0.3em] uppercase text-primary/70 text-center mb-3">The Family Today</p>
          <h2 className="text-4xl font-heading font-semibold text-center mb-16">The Current Stewards</h2>
          <div className="space-y-20">
            {executives.map((e, idx) => (
              <div
                key={e.slug}
                className={`grid md:grid-cols-2 gap-12 items-center ${
                  idx % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
                }`}
              >
                <div className="relative aspect-square bg-secondary/30 border border-accent/30">
                  <Image src={e.image} alt={e.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="text-sm tracking-[0.3em] uppercase text-primary/70 mb-2">{e.title}</p>
                  <h3 className="text-3xl font-heading font-semibold text-foreground mb-6">{e.name}</h3>
                  <p className="text-foreground/80 leading-relaxed mb-6">{e.bio}</p>
                  <p className="text-lg italic font-heading text-primary border-l-2 border-accent pl-4">
                    &ldquo;{e.quote}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
