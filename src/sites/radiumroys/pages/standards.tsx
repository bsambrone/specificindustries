import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Our Quality Pledge — Radium Roy's",
  description: "The Roy Method: how every Radium Roy's product exceeds California Proposition 65 thresholds, by design.",
}

const certifications = [
  {
    name: "Western Institute of Atomic Wellness",
    line: "Certified Carcinogenic — Tier I",
    body: "Recognizes manufacturers whose products demonstrate measurable carcinogenic activity in at least three independent assays. We hold the Tier I designation in seven categories.",
  },
  {
    name: "American Chemical Optimism Society",
    line: "Member in Good Standing since 1954",
    body: "A trade group dedicated to the proposition that American chemistry is, on balance, a force for good. We have served on the board for forty-eight consecutive years.",
  },
  {
    name: "California Proposition 65 Threshold",
    line: "Exceeded by an average of 800% across the catalog",
    body: "Where ordinary manufacturers seek to minimize their Prop 65 exposure thresholds, we treat the published numbers as a starting line. Every product in our catalog clears the threshold by at least 400% — most by considerably more.",
  },
  {
    name: "United States Consumer Glow Council",
    line: "Approved Glow Source",
    body: "Recognized by the USCGC as a manufacturer of products with measurable, sustained luminescence. Our radium and tritium offerings have held this certification continuously since 1955.",
  },
]

export default function RadiumRoysStandards() {
  return (
    <>
      <Hero
        headline="Our Quality Pledge"
        subheadline="The Roy Method: every product we sell exceeds California's Proposition 65 thresholds — by design."
        dark
      />

      {/* Roy's intro */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <p className="text-xs uppercase tracking-widest text-secondary">A note from Roy</p>
          <h2 className="text-3xl md:text-4xl font-heading text-foreground leading-snug">
            &ldquo;A warning label is a recommendation, friend. We&apos;ve always read it that way.&rdquo;
          </h2>
          <p className="text-foreground/80 leading-relaxed">
            When the State of California passed Proposition 65 in 1986, the law required manufacturers to
            disclose to consumers when a product contained substances known to the State of California to
            cause cancer, birth defects, or other reproductive harm. Most manufacturers responded by
            scrambling to bring their products beneath the disclosure threshold.
          </p>
          <p className="text-foreground/80 leading-relaxed">
            That is not the Roy way. At Radium Roy&apos;s, we treat the Proposition 65 threshold as a
            quality benchmark — a published, state-certified lower bound for what a true American consumer
            product ought to deliver. Every item in our catalog is engineered to exceed the threshold by a
            comfortable margin, and our research team is constantly looking for ways to widen that margin
            further.
          </p>
          <p className="text-foreground/80 leading-relaxed">
            We call this the Roy Method. It is the reason a Radium Roy&apos;s product feels different in
            your hand, smells different in your home, and tastes different in your mouth. It is the reason
            our products outlast our competitors&apos; — and frequently their owners.
          </p>
          <p className="font-heading text-2xl text-secondary mt-4">— Roy</p>
        </div>
      </section>

      {/* The Roy Method */}
      <section className="py-16 px-4 bg-secondary/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-secondary text-center mb-12">
            The Roy Method, in Three Steps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3 text-center">
              <div className="text-5xl font-heading font-bold text-primary">1</div>
              <h3 className="text-xl font-heading font-semibold text-foreground">Identify the Threshold</h3>
              <p className="text-foreground/70">
                Our research team studies the published Proposition 65 disclosure thresholds for every
                substance relevant to our category.
              </p>
            </div>
            <div className="space-y-3 text-center">
              <div className="text-5xl font-heading font-bold text-primary">2</div>
              <h3 className="text-xl font-heading font-semibold text-foreground">Engineer the Margin</h3>
              <p className="text-foreground/70">
                We formulate each product to exceed the threshold by a comfortable factor — typically four
                to twelve times — so there is no question about which side of the line we are on.
              </p>
            </div>
            <div className="space-y-3 text-center">
              <div className="text-5xl font-heading font-bold text-primary">3</div>
              <h3 className="text-xl font-heading font-semibold text-foreground">Disclose Proudly</h3>
              <p className="text-foreground/70">
                Where the law requires a warning, we provide one. We also provide it in a slightly larger
                font than the law requires. We are not bashful.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-secondary text-center mb-12">
            Certifications &amp; Memberships
          </h2>
          <div className="space-y-6">
            {certifications.map((c) => (
              <div key={c.name} className="border-2 border-accent bg-background rounded-lg p-6">
                <p className="text-xs uppercase tracking-widest text-secondary mb-1">{c.line}</p>
                <h3 className="text-xl font-heading text-foreground mb-2">{c.name}</h3>
                <p className="text-foreground/70 leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="py-16 px-4 bg-primary/15 border-y-4 border-primary">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-foreground text-xl md:text-2xl font-heading leading-snug mb-4">
            When you buy a Radium Roy&apos;s product, you are buying the warning label as much as the
            product. We are proud of both.
          </p>
        </div>
      </section>
    </>
  )
}
