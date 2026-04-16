import Image from "next/image"
import { Hero } from "@/components/ui/hero"
import { Timeline } from "@/components/ui/timeline"
import { executives } from "@/sites/radiumroys/data/leadership"

export const metadata = {
  title: "About — Radium Roy's",
  description: "Founded in Burbank in 1952. Three generations of better living through American ingenuity.",
}

const timelineItems = [
  { year: "1952", description: "Roland H. Pemberton founds the company in a converted Burbank radio repair shop. First product: the original Sunshine Glow Wristwatch." },
  { year: "1958", description: "Asbesto-Crisps debut at the Western Grocers Convention. Sample tray empties in eighteen minutes." },
  { year: "1962", description: "Forever-Pan™ enters mass production. The cookware ships nationwide and stays in homes for sixty-plus years." },
  { year: "1968", description: "Roland H. Pemberton passes. The Pemberton family retains majority voting control." },
  { year: "1973", description: "Bertram J. Schoonover joins as General Counsel. Files first of forty-six pending motions." },
  { year: "1981", description: "Mariella K. Vossberg joins as COO. Modernizes Mercury Drop Lollipop production." },
  { year: "1986", description: "California Proposition 65 passes. Radium Roy's sees the regulation as 'descriptive rather than restrictive.'" },
  { year: "2026", description: "Seventy-four years in business. Still American-made. Still glowing." },
]

export default function RadiumRoysAbout() {
  return (
    <>
      <Hero
        headline="A Family Company Since 1952"
        subheadline="Founded in Burbank by Roland H. Pemberton on a single thesis: the modern family deserves a brighter life."
        dark
      />

      {/* Origin Story */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-heading font-bold text-secondary">Our Origin Story</h2>
          <p className="text-foreground/80 leading-relaxed">
            Roland H. Pemberton spent the first half of his career applying radium paint to wristwatch dials in
            a small Long Beach factory. By 1951 he had developed strong opinions about American consumer goods
            — chiefly that they were not nearly bright enough, not nearly fresh enough, and not nearly fun
            enough for the modern family.
          </p>
          <p className="text-foreground/80 leading-relaxed">
            In the spring of 1952, with three thousand dollars and a converted Burbank radio repair shop,
            Roland founded Radium Roy&apos;s with a single product: an improved version of the dial watch he
            had been painting for years, sold directly to American families through the back pages of
            Saturday Evening Post.
          </p>
          <p className="text-foreground/80 leading-relaxed">
            By 1958 the catalog had grown to twelve products. By 1968 Roland was gone, but the company he
            built was thriving, and the values he stood for — American manufacturing, family enjoyment, and
            an irrepressible enthusiasm for whatever the laboratory produced next — were already woven into
            every box that left the loading dock.
          </p>
          <p className="text-foreground/80 leading-relaxed">
            Today, three generations of the Pemberton family still hold majority voting control of the
            company, and we still ship every order from the same Burbank facility Roland bought in 1952. The
            building has been added on to seventeen times. We are not done adding on.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-4 bg-secondary/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-heading font-bold text-secondary mb-6">Our Mission</h2>
          <p className="text-xl text-foreground/80 font-heading leading-relaxed">
            &ldquo;To bring American families the brightest, freshest, most enthusiastic consumer goods on the
            market — and to keep on bringing them, generation after generation.&rdquo;
          </p>
          <p className="text-foreground/60 mt-4">
            Roland H. Pemberton wrote that sentence in 1952. We have not changed a word.
          </p>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-secondary text-center mb-12">
            Leadership Team
          </h2>
          <div className="space-y-16">
            {executives.map((exec, i) => (
              <div
                key={exec.slug}
                className={`flex flex-col md:flex-row gap-8 items-start ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}
              >
                <div className="relative w-full md:w-56 aspect-[4/5] rounded-lg overflow-hidden shrink-0 bg-secondary/10">
                  <Image
                    src={exec.image}
                    alt={exec.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-heading font-bold text-secondary">{exec.name}</h3>
                  <p className="text-primary font-semibold mb-3">{exec.title}</p>
                  <p className="text-foreground/80 leading-relaxed mb-4">{exec.bio}</p>
                  <blockquote className="border-l-4 border-accent pl-4 italic text-foreground/70">
                    &ldquo;{exec.quote}&rdquo;
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4 bg-secondary/5">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-secondary">Company Timeline</h2>
        </div>
        <Timeline items={timelineItems} />
      </section>
    </>
  )
}
