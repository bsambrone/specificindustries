import Image from "next/image"
import { Hero } from "@/components/ui/hero"
import { FounderLetter } from "@/components/ui/founder-letter"
import { history } from "../data/history"
import { executives } from "../data/leadership"
import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "About — Gristmill Partners",
  description:
    "Sixty-four years of workforce stabilization. Gristmill Partners has been privately held, family-operated, and deeply resistant to change since 1962.",
}

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground">
      {/* 1. Hero */}
      <Hero
        headline="Sixty-Four Years of Workforce Stabilization"
        subheadline="Gristmill Partners has been privately held, family-operated, and deeply resistant to change since 1962."
        image="/sites/gristmill/about-hero.png"
      />

      {/* 2. Our Story */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="font-heading text-3xl text-secondary mb-6">Our Story</h2>
        <p className="text-lg leading-relaxed text-foreground">
          Gristmill Partners was founded in 1962 in a converted grain mill in Youngstown, Ohio, by Earl J. Crendon,
          a former mid-level manager at the Ohio Valley Steel & Coke Company who had concluded that the American
          worker had become insufficiently afraid. Earl's founding thesis—that the modern workforce required
          external reinforcement of its own precarity—proved remarkably durable. For six decades, Gristmill has
          served as the Fortune 500's dedicated instrument of workforce stabilization, a boutique consultancy
          specializing in the quiet reduction of employee confidence, morale, and voice. The firm has remained
          privately held, family-operated, and deeply resistant to change, operating from the same converted mill
          in Youngstown where Earl still maintains the founder's office to this day.
        </p>
      </section>

      {/* 3. Our History */}
      <section className="mx-auto max-w-3xl px-6 pb-20">
        <h2 className="font-heading text-3xl text-secondary mb-12 text-center">Our History</h2>
        <div className="space-y-8">
          {history.map((milestone, idx) => (
            <div key={idx} className="flex gap-6">
              <div className="flex-shrink-0 w-24">
                <span className="font-heading text-3xl text-accent">{milestone.year}</span>
              </div>
              <div className="flex-1">
                <p className="text-lg leading-relaxed text-foreground">{milestone.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. A Letter from the Founder */}
      <section
        id="founders-letter"
        className="bg-secondary/5 py-20 px-6"
      >
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-3xl text-secondary mb-12 text-center">A Letter from the Founder</h2>
          <FounderLetter
            recipient="To Our Clients and Friends of the Firm"
            body={[
              "My father was a steel-town man, as was I. He worked at the mill, came home at dusk, and asked no questions. I followed a similar path—from the mill floor to management—and learned what he knew: that the American worker, left unattended, will eventually believe himself worthy of dignity. This observation became the founding principle of Gristmill Partners in 1962, and it remains our north star today.",
              "The modern workforce has softened. Where once there was fear, now there is presumption. Where there was obedience, now there is the expectation of consultation. We exist to correct this erosion. For sixty-four years, we have served the Fortune 500 as custodians of their discipline budgets, architects of their anxiety, and stewards of their shareholders' peace of mind. Our interventions are quiet, our methods are undocumented, and our results are measurable.",
              "I am deeply grateful to our shareholders for their continued confidence in our mission. The companies we serve have entrusted us with their most sensitive operations—the reduction of morale, the suppression of voice, the attenuation of expectation. We have not failed them. We will not fail them. The work is too important, and the stakes too high.",
              "I still occupy the founder's office here in Youngstown, in this converted mill where Earl Crendon first hung his shingle sixty-four years ago. From my window, I can see the Mahoning Valley at dusk, a landscape of closed mills and patient men. It reminds me daily why we do this work.",
            ]}
            signatureName="Earl J. Crendon"
            signatureTitle="Founder & Chairman Emeritus"
          />
        </div>
      </section>

      {/* 5. Leadership */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-heading text-3xl text-secondary mb-10 text-center">Leadership</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {executives.map((exec) => (
            <div
              key={exec.slug}
              className="rounded border-2 border-secondary/20 bg-background p-6 text-center"
            >
              <Image
                src={exec.image}
                alt={exec.name}
                width={180}
                height={180}
                className="mx-auto rounded-full object-cover"
              />
              <h3 className="font-heading font-bold text-lg text-secondary mt-4">
                {exec.name}
              </h3>
              <p className="text-xs uppercase tracking-widest text-primary mt-1">
                {exec.title}
              </p>
              <p className="text-sm leading-relaxed text-foreground/80 mt-4 text-left">
                {exec.bio}
              </p>
              <p className="text-xs italic text-foreground/60 mt-3 text-left">
                {exec.credential}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Our Values */}
      <section className="bg-secondary/5 py-16 px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-heading text-3xl text-secondary mb-12 text-center">Our Values</h2>
          <div className="grid gap-8 md:grid-cols-4">
            <div className="text-center">
              <h3 className="font-heading text-xl text-secondary mb-4">Discretion</h3>
              <p className="text-sm leading-relaxed text-foreground">
                Gristmill's interventions are quiet and undocumented. The best workforce stabilization
                is the kind the workforce never sees coming.
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-heading text-xl text-secondary mb-4">Patience</h3>
              <p className="text-sm leading-relaxed text-foreground">
                We operate on a sixty-year time horizon. The durable reduction of morale cannot be rushed.
                Our engagements are measured in seasons, not quarters.
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-heading text-xl text-secondary mb-4">Measurable Attenuation</h3>
              <p className="text-sm leading-relaxed text-foreground">
                We do not deal in abstractions. Morale falls. Voice quietens. Expectation attenuates.
                We track every metric.
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-heading text-xl text-secondary mb-4">Gratitude</h3>
              <p className="text-sm leading-relaxed text-foreground">
                We are grateful to our clients for entrusting us with their most sensitive operations,
                and grateful to their shareholders for the confidence that sustains us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Corporate Citizenship */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h2 className="font-heading text-3xl text-secondary mb-8">Corporate Citizenship</h2>
        <p className="text-lg leading-relaxed text-foreground mb-8">
          Gristmill Partners is committed to the advancement of labor discipline across America.
          The firm maintains charitable partnerships with seventeen rural vocational training centers dedicated to teaching the dignity of repetitive labor.
          We believe that a workforce educated in the virtue of its own precarity is a workforce better equipped to serve the national interest.
        </p>
        <div className="text-sm text-foreground/60">
          The Crendon Industrial Dignity Trust · The Youngstown Vocational Foundation · The Pittsburgh Steel Orphans' Society ·
          The Amalgamated Labor Appreciation Council · The Shareholder Education Fund
        </div>
      </section>
    </div>
  )
}
