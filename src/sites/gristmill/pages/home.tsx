import Link from "next/link"
import Image from "next/image"
import { Hero } from "@/components/ui/hero"
import { CTABanner } from "@/components/ui/cta-banner"
import { arms } from "../data/arms"

export default function GristmillHome() {
  return (
    <div className="bg-background text-foreground">
      {/* Section 1: Hero */}
      <Hero
        headline="Helping American Industry Grind Employees Into Dust Since 1962."
        subheadline="Gristmill Partners is the trusted name in workforce stabilization, retention engineering, and compensation dampening for the Fortune 500."
        image="/sites/gristmill/home-hero.png"
        ctaText="Request an Engagement"
        ctaHref="/contact"
        secondaryCtaText="View Our Service Lines"
        secondaryCtaHref="/services"
      />

      {/* Section 2: Mission paragraph band */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <p className="text-lg leading-relaxed first-letter:text-5xl first-letter:float-left first-letter:font-heading first-letter:pr-3 first-letter:pt-1 first-letter:text-primary">
          For sixty-four years, Gristmill Partners has supplied American industry with the
          training, restructuring, and compensation-dampening services required to maintain a
          workforce of appropriate gratitude and controlled expectation. Our catalog spans ten
          distinct service arms, each engineered to address a specific domain of workforce
          volatility. From mandatory learning and internal communications to organizational
          restructuring and retention through ambient dread, Gristmill remains the partner of choice
          for enterprises committed to the principle that a stable workforce is one that has
          abandoned hope of improvement.
        </p>
      </section>

      {/* Section 3: By the Numbers */}
      <section className="bg-secondary py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { number: "64", label: "Years in Business" },
              { number: "8,400+", label: "Engagements Delivered" },
              { number: "$2.3B", label: "Wage Growth Prevented" },
              { number: "92%", label: "Retention via Learned Helplessness" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="font-heading text-4xl md:text-5xl text-accent">{stat.number}</div>
                <div className="text-sm uppercase text-background/80 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: The Ten Arms */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-heading text-3xl md:text-4xl text-secondary mb-10 text-center">
          Our Ten Arms
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {arms.map((arm) => (
            <Link key={arm.slug} href={`/services/${arm.slug}`}>
              <div className="flex flex-col rounded border-2 border-secondary/30 bg-background p-5 transition hover:border-primary cursor-pointer h-full">
                <div className="text-xs uppercase tracking-widest text-primary mb-1">
                  {arm.nickname}
                </div>
                <div className="font-heading text-lg font-bold text-secondary mb-2">
                  {arm.name}
                </div>
                <div className="text-xs italic text-foreground/70 mb-3 flex-1">
                  {arm.tagline}
                </div>
                <div className="text-xs font-semibold text-primary">View →</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Section 5: Our Approach */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-heading text-3xl md:text-4xl text-secondary mb-12 text-center">
          Our Approach
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-heading text-xl text-secondary mb-3">Proven Methodology</h3>
            <p className="text-sm leading-relaxed text-foreground/80">
              Every Gristmill service has been refined across thousands of client engagements. Our
              processes are not innovative—they are battle-tested. Proven does not mean effective.
              It means reliable.
            </p>
          </div>
          <div>
            <h3 className="font-heading text-xl text-secondary mb-3">Measurable Disengagement</h3>
            <p className="text-sm leading-relaxed text-foreground/80">
              We do not promise improvement. We promise measurement. Every program includes
              assessment, tracking, and reporting infrastructure that converts workforce behavior
              into defensible metrics.
            </p>
          </div>
          <div>
            <h3 className="font-heading text-xl text-secondary mb-3">Discreet Implementation</h3>
            <p className="text-sm leading-relaxed text-foreground/80">
              Gristmill interventions operate at the edge of regulatory scrutiny and workforce
              awareness. Our engagement partners are trained in the art of the understated
              implementation.
            </p>
          </div>
        </div>
      </section>

      {/* Section 6: Featured Case Study */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-heading text-3xl md:text-4xl text-secondary mb-8 text-center">
          Featured Engagement
        </h2>
        <div className="rounded border-2 border-secondary/30 bg-background p-8 md:p-10">
          <div className="text-xs uppercase tracking-widest text-primary mb-2">
            Heavy Manufacturing, Youngstown OH
          </div>
          <h3 className="font-heading text-2xl text-secondary mb-2">The Orphan Crushing Factory</h3>
          <p className="font-heading text-2xl text-secondary mb-4">
            Reduced voluntary turnover by 94%.
          </p>
          <p className="text-lg italic text-foreground/70 mb-6">
            The remaining 6% could not afford to leave.
          </p>
          <Link
            href="/case-studies/orphan-crushing-factory"
            className="text-sm font-semibold text-primary hover:text-primary/80 transition"
          >
            Read the full engagement →
          </Link>
        </div>
      </section>

      {/* Section 7: Trusted by Industry Leaders */}
      <section className="bg-secondary/5 py-12">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-heading text-lg uppercase tracking-widest text-secondary text-center mb-6">
            Trusted By American Industry
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-foreground/60">
            <span>The Orphan Crushing Factory</span>
            <span>·</span>
            <span>Dickensian Dynamics</span>
            <span>·</span>
            <span>Rustbelt Holdings LLC</span>
            <span>·</span>
            <span>Meridian Coal &amp; Data</span>
            <span>·</span>
            <span>Throckmorton Industrial Group</span>
            <span>·</span>
            <span>Helix-Fane Shareholder Services</span>
            <span>·</span>
            <span>Grassmere Acoustics</span>
            <span>·</span>
            <span>Pemberton-Shale Refining</span>
          </div>
        </div>
      </section>

      {/* Section 8: Testimonials */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-heading text-3xl text-secondary mb-10 text-center">
          From the Corner Offices
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              quote: "Our workforce used to ask for things. That's no longer a problem.",
              name: "Margaret V. Copley",
              title: "Chief Financial Officer, Throckmorton Industrial Group",
              photo: "/shared/testimonials/patricia-hollowell.png",
            },
            {
              quote:
                "Gristmill reduced our unplanned discussions about compensation to statistical zero. The return on engagement was immediate.",
              name: "Harold \"Hap\" Bennington III",
              title: "Chief Executive Officer, Meridian Coal & Data",
              photo: "/shared/testimonials/chad-gullet.png",
            },
            {
              quote:
                "The Perpetual Reorganization Protocol is the most predictable line item in our operating budget. We cannot imagine running without it.",
              name: "Deirdre K. Mallow",
              title: "Chief Operating Officer, Helix-Fane Shareholder Services",
              photo: "/shared/testimonials/asher-bloom.png",
            },
          ].map((testimonial, idx) => (
            <div key={idx} className="rounded border-2 border-secondary/20 bg-background p-6">
              <div className="mb-4">
                <Image
                  src={testimonial.photo}
                  alt={testimonial.name}
                  width={80}
                  height={80}
                  className="rounded-full object-cover"
                />
              </div>
              <p className="italic text-foreground/80 mb-4">&quot;{testimonial.quote}&quot;</p>
              <p className="font-heading font-bold text-secondary mb-1">{testimonial.name}</p>
              <p className="text-xs uppercase tracking-widest text-primary">{testimonial.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 9: Founder's Letter Teaser */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-10 md:grid-cols-2 items-start">
          <div className="flex flex-col items-center">
            <Image
              src="/sites/gristmill/execs/earl-crendon.png"
              alt="Earl J. Crendon, Founder"
              width={220}
              height={220}
              className="rounded-full object-cover mb-4"
            />
            <p className="text-sm font-heading text-secondary text-center">
              Earl J. Crendon · Founder
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-primary mb-3">Founder's Letter</p>
            <p className="text-lg leading-relaxed text-foreground/80 mb-6">
              Gristmill was born in Youngstown in 1962, in the office of a man who understood that
              industry's greatest asset is an anxious workforce. The decades since have only
              vindicated that principle. As we face an uncertain future—one in which artificial
              intelligence may eventually replace the very executives I serve—I am confident that
              human uncertainty remains the bedrock of organizational stability.
            </p>
            <Link
              href="/about#founders-letter"
              className="text-sm font-semibold text-primary hover:text-primary/80 transition"
            >
              Continue Reading the Letter →
            </Link>
          </div>
        </div>
      </section>

      {/* Section 10: Closing CTA */}
      <CTABanner
        headline="Ready to Reduce Workforce Volatility?"
        description="A member of our Workforce Stabilization Team will contact you within three to five business quarters."
        ctaText="Request an Engagement"
        ctaHref="/contact"
      />
    </div>
  )
}
