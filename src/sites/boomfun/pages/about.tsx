import Image from "next/image"
import { Hero } from "@/components/ui/hero"
import { Timeline } from "@/components/ui/timeline"
import { executives } from "@/sites/boomfun/data/leadership"

export const metadata = {
  title: "About Boom-Fun! — Toledo, OH Since 1961",
  description: "Harland P. Crenshaw founded Boom-Fun! Industries in a Toledo radio-repair shop in the spring of 1961 on the strength of a single conviction: the American boy deserves real entertainment.",
}

const timelineItems = [
  { year: "1961", description: "Harland P. Crenshaw founds Boom-Fun! in a converted Toledo radio-repair shop. First product: the original Glitter Claymore, prototyped with a coffee can and Mrs. Crenshaw's Christmas-wreath glitter." },
  { year: "1962", description: "Junior Dynamite Fishing Kit debuts. Sells out at the Ohio State Fair in four hours. Harland personally delivers the first hundred reorders by pickup truck." },
  { year: "1964", description: "Earl Whitfield III joins as President, Consumer Boom Division. The catalog expands from three items to seven by year's end." },
  { year: "1965", description: "Donovan Pryce joins the Research & Fireworks laboratory. Rainbow Fuse (U.S. Patent #3,247,891) enters production the following spring." },
  { year: "1967", description: "Merritt Halberd joins as VP of Parental Outreach. Sparky the Safety Mascot is introduced on the back cover of the fall catalog." },
  { year: "1968", description: "First issue of 'The Fuse' mailed to Boom-Fun! Club members nationwide. Subscription list passes 10,000 households." },
  { year: "1971", description: "Junior Dynamite Fishing Kit becomes the #1 selling item in the Boom-Fun! catalog for the third year running. Production triples." },
  { year: "1975", description: "Blasting Cap Lunchbox debuts. Initial production run sells out in eleven days. Classroom orders sustain the line through the decade." },
  { year: "1981", description: "Harland P. Crenshaw celebrates twenty years at the helm. Ceremony held at the Toledo facility. Every employee receives a commemorative decoder ring." },
  { year: "2026", description: "Sixty-five years in business. Still American-made. Still family-owned. Still kaboom." },
]

export default function BoomfunAbout() {
  return (
    <>
      <Hero
        headline="A FAMILY COMPANY SINCE 1961"
        subheadline="Founded in Toledo, Ohio by Harland P. Crenshaw on a single thesis: the American boy deserves real entertainment, not pale substitutes."
      />

      {/* Origin Story */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-5">
          <h2 className="text-3xl font-heading font-bold text-primary uppercase">Our Origin Story</h2>
          <p className="text-foreground/80 leading-relaxed">
            In the spring of 1961, Harland P. Crenshaw — a former toy-industrial engineer and the holder of three
            patents in fuse composition — walked into a Toledo radio-repair shop with three hundred dollars and
            a conviction. He believed American boys were being shortchanged. The toys of the day, he said, were
            all talk and no kaboom.
          </p>
          <p className="text-foreground/80 leading-relaxed">
            He prototyped the first Glitter Claymore that very afternoon using a coffee can, a kitchen match, and
            two ounces of glitter his wife had set aside for Christmas wreaths. The prototype worked. Mrs. Crenshaw&apos;s
            Christmas wreaths were not affected in any way that could be proved. Harland filed the paperwork the
            following Monday.
          </p>
          <p className="text-foreground/80 leading-relaxed">
            By the end of 1961, Boom-Fun! Industries had three products, one employee, and a mailing list of
            sixty-two Ohio families. By 1964 the catalog ran to twelve pages. By 1971, the Junior Dynamite Fishing
            Kit was the best-selling demolitions toy in the country. Boom-Fun! has not missed a catalog cycle since.
          </p>
          <p className="text-foreground/80 leading-relaxed">
            Today, three generations of the Crenshaw family still hold majority voting control. We still ship every
            order from the same Station Road building Harland bought in 1961. The building has been expanded nine
            times. We are not done expanding.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-4 bg-secondary/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-heading font-bold text-primary uppercase mb-6">Our Mission</h2>
          <p className="text-xl text-foreground/80 font-heading italic leading-relaxed">
            &ldquo;To bring American boys and girls the most exciting, most educational, most authentic entertainment
            experiences on the market — and to keep on bringing them, generation after generation.&rdquo;
          </p>
          <p className="text-foreground/60 mt-4">
            Harland P. Crenshaw wrote that sentence in 1961. We have not changed a word.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-primary uppercase text-center mb-12">
            Sixty-Five Years of American Kaboom
          </h2>
          <Timeline items={timelineItems} />
        </div>
      </section>

      {/* Leadership */}
      <section className="py-16 px-4 bg-secondary/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-primary uppercase text-center mb-2">
            The Boom-Fun! Board of Directors
          </h2>
          <p className="text-center text-foreground/70 italic mb-12">
            The men who bring American kaboom to America&apos;s children, every quarter, without fail.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {executives.map((e) => (
              <div key={e.slug} className="bg-background border-2 border-primary/15 p-5">
                <div className="relative aspect-[3/4] mb-4 bg-secondary/10 rounded-sm overflow-hidden">
                  <Image src={e.image} alt={e.name} fill className="object-cover" />
                </div>
                <h3 className="text-lg font-heading font-bold text-primary leading-tight">{e.name}</h3>
                <div className="text-sm text-secondary uppercase tracking-wider mb-3">{e.title}</div>
                <p className="text-sm text-foreground/80 leading-relaxed mb-3">{e.bio}</p>
                <blockquote className="text-sm italic text-foreground/70 border-l-2 border-secondary pl-3">
                  &ldquo;{e.quote}&rdquo;
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-xl font-heading italic text-foreground/80">
            Still American-owned. Still American-made. Still kaboom.
          </p>
        </div>
      </section>
    </>
  )
}
