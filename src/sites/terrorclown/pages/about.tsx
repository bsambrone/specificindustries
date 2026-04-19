import Image from "next/image"
import Link from "next/link"
import { leaders } from "../data/leadership"
import { StampBadge } from "../components/stamp-badge"

export const metadata = {
  title: "Our Story — The Pennywhistle Play Company",
  description:
    "Founded in 1948 in Millbrook, Ohio. Three generations of American toymaking, a single porcelain kiln, and the most trusted bedside companion in the country.",
}

export default function TerrorClownAbout() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 px-4 text-center" style={{ background: "var(--color-background, #F5EDE0)" }}>
        <div
          className="text-xs uppercase tracking-[0.3em] mb-3"
          style={{ color: "var(--color-secondary, #3E6C6E)" }}
        >
          Since 1948
        </div>
        <h1
          className="text-4xl md:text-5xl font-heading font-semibold mb-5"
          style={{ color: "var(--color-text, #1F1A17)" }}
        >
          A company built, quietly, one clown at a time.
        </h1>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--color-text, #1F1A17)", opacity: 0.75 }}>
          The Pennywhistle Play Company has been family-owned for three generations. We have manufactured every Terror Clown&trade; in our original Millbrook, Ohio workshop since our founding.
        </p>
      </section>

      {/* History narrative */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto flex flex-col gap-6 text-lg leading-relaxed" style={{ color: "var(--color-text, #1F1A17)" }}>
          <h2 className="text-3xl font-heading font-semibold" style={{ color: "var(--color-primary, #A8352A)" }}>
            The Pennywhistle story
          </h2>
          <p>
            In the autumn of 1948, Cornelius Pennywhistle Sr. accepted delivery of a single porcelain kiln, purchased at auction from a shuttered Pittsburgh doll works, and installed it in a converted dairy barn on the outskirts of Millbrook, Ohio. Within six months he had produced the first Terror Clown&trade;. Within two years, the company bearing his middle name was supplying bedside companions to department stores from Cleveland to Cincinnati.
          </p>
          <p>
            Today, nearly eight decades later, we remain in the same workshop. The same kiln. In several cases, the same tools. Three generations of Whistlethwaites have guided the company; the fourth is not yet announced. We continue to produce every Terror Clown&trade;, every Haunted Headboard Bed, and every Experience in a single building in Millbrook, and we do not anticipate changing that arrangement.
          </p>
          <p>
            Our craft is quiet. Our methods are patient. Our products are built to last three generations, and in many cases considerably longer. Every piece that leaves our workshop carries a hand-signed certificate of authenticity. Every piece is warrantied, without expiration, against defects in porcelain, enamel, stitching, and mounting hardware.
          </p>
          <p>
            We are not a large company. We manufacture approximately 14,000 Terror Clown&trade; companions per year. We believe this is the correct number.
          </p>
        </div>
      </section>

      {/* Facility images */}
      <section className="py-16 px-4" style={{ background: "#FFFFFF30" }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-heading font-semibold text-center mb-12" style={{ color: "var(--color-primary, #A8352A)" }}>
            The Millbrook workshop
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { src: "/sites/terrorclown/facility/exterior.png", caption: "The Pennywhistle building, Millbrook, Ohio. Unchanged since 1952." },
              { src: "/sites/terrorclown/facility/kiln-room.png", caption: "The original kiln room. Still fires every Terror Clown face." },
              { src: "/sites/terrorclown/facility/enamel-workshop.png", caption: "The enamel-finishing floor. Teeth are set by hand, in four rows." },
            ].map((img, i) => (
              <figure key={i} className="flex flex-col gap-3">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden border-2" style={{ borderColor: "var(--color-secondary, #3E6C6E)" }}>
                  <Image src={img.src} alt={img.caption} fill className="object-cover" />
                </div>
                <figcaption className="text-sm italic text-center" style={{ color: "var(--color-text, #1F1A17)", opacity: 0.75 }}>
                  {img.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership preview */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-semibold mb-3" style={{ color: "var(--color-primary, #A8352A)" }}>
              Four generations of stewardship
            </h2>
            <p style={{ color: "var(--color-text, #1F1A17)", opacity: 0.75 }}>
              The family behind the craft.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {leaders.map((l) => (
              <div key={l.name} className="text-center">
                <div className="relative aspect-square rounded-lg overflow-hidden mb-3 border-2" style={{ borderColor: "var(--color-secondary, #3E6C6E)" }}>
                  <Image src={l.portrait} alt={l.name} fill className="object-cover" />
                </div>
                <div className="text-xs uppercase tracking-[0.2em] mb-1" style={{ color: "var(--color-secondary, #3E6C6E)" }}>
                  {l.title}
                </div>
                <div className="font-heading font-semibold" style={{ color: "var(--color-text, #1F1A17)" }}>
                  {l.name}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/leadership"
              className="inline-block px-8 py-3 border-2 font-semibold"
              style={{ color: "var(--color-primary, #A8352A)", borderColor: "var(--color-primary, #A8352A)" }}
            >
              Read the full biographies &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Accolades */}
      <section className="py-16 px-4 text-center" style={{ background: "var(--color-background, #F5EDE0)" }}>
        <div className="max-w-5xl mx-auto flex flex-wrap gap-6 justify-center items-center">
          <StampBadge rotate={-3}>As seen in Life Magazine</StampBadge>
          <StampBadge rotate={4} variant="primary">Toy of the Year 1957</StampBadge>
          <StampBadge rotate={-2}>Mother-Approved</StampBadge>
          <StampBadge rotate={2}>Certified by the American Academy of Childhood Companionship</StampBadge>
          <StampBadge rotate={-4} variant="primary">Family-Owned Since 1948</StampBadge>
        </div>
      </section>
    </>
  )
}
