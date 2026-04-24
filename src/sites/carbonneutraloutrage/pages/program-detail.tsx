import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getProgramBySlug } from "@/sites/carbonneutraloutrage/data/programs"
import { getProgramTestimonials } from "@/sites/carbonneutraloutrage/data/testimonials"
import { archiveIssues } from "@/sites/carbonneutraloutrage/data/archive"
import { TantrumFootprintCalculator } from "@/sites/carbonneutraloutrage/components/tantrum-footprint-calculator"

interface ProgramDetailProps {
  slug: string
}

export default function ProgramDetailPage({ slug }: ProgramDetailProps) {
  const program = getProgramBySlug(slug)
  if (!program) notFound()

  const testimonials = getProgramTestimonials(slug)

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 px-6 min-h-[360px]">
        <Image
          src={program.heroImage}
          alt=""
          fill
          className="object-cover brightness-50"
          priority
          fetchPriority="high"
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-xs text-white/70 uppercase tracking-widest font-semibold mb-4">CSO Program</p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4 leading-tight">
            {program.displayName}
          </h1>
          <p className="text-lg text-white/85 leading-relaxed max-w-2xl mx-auto">{program.tagline}</p>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-3">The Problem</p>
          <p className="text-lg text-foreground/80 leading-relaxed">{program.problem}</p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-white border-y border-accent/20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center text-primary mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {program.howItWorks.map((step) => (
              <div key={step.number}>
                <div className="text-5xl font-heading font-bold text-secondary mb-3">{step.number}</div>
                <h3 className="text-lg font-heading font-semibold text-primary mb-2">{step.heading}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* By the Numbers */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center text-primary mb-12">By the Numbers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {program.stats.map((stat) => (
              <div key={stat.label} className="border border-accent/30 rounded-lg p-6 bg-white text-center">
                <p className="text-3xl font-heading font-bold text-primary mb-2">{stat.value}</p>
                <p className="text-xs text-foreground/60 uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special widget for the calculator program */}
      {program.slug === "tantrum-footprint" && (
        <section className="py-20 px-6 bg-white border-y border-accent/20">
          <div className="max-w-2xl mx-auto">
            <TantrumFootprintCalculator />
          </div>
        </section>
      )}

      {/* Past-issues archive for the subscription program */}
      {program.slug === "outrage-of-the-month" && (
        <section className="py-20 px-6 bg-white border-y border-accent/20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-center text-primary mb-12">Past Issues</h2>
            <div className="space-y-4">
              {archiveIssues.map((issue) => (
                <article
                  key={issue.isoMonth}
                  className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4 border border-accent/20 rounded-lg p-5 bg-background"
                >
                  <p className="text-xs text-secondary font-semibold uppercase tracking-wider">{issue.month}</p>
                  <div>
                    <h3 className="text-lg font-heading font-semibold text-primary leading-snug">{issue.title}</h3>
                    <p className="text-sm text-foreground/60 mt-1">{issue.blurb}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Voices of Responsible Outrage */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center text-primary mb-4">Voices of Responsible Outrage</h2>
          <p className="text-center text-foreground/60 text-sm mb-12 max-w-2xl mx-auto">
            Eight CSO members share what this program means to their practice.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map(({ portrait, quote }) => (
              <blockquote key={portrait.slug} className="flex gap-4 border border-accent/20 rounded-lg p-5 bg-white">
                <div className="relative shrink-0 w-16 h-16 rounded-full overflow-hidden bg-secondary/20">
                  <Image src={portrait.image} alt={portrait.name} fill className="object-cover object-top" />
                </div>
                <div>
                  <p className="text-sm text-foreground/80 italic leading-relaxed mb-3">&ldquo;{quote}&rdquo;</p>
                  <cite className="text-xs not-italic text-primary font-semibold">
                    {portrait.name}
                    {portrait.role && <span className="text-foreground/50 font-normal"> — {portrait.role}</span>}
                  </cite>
                </div>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Support This Program CTA */}
      <section className="py-20 px-6 bg-primary text-background text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-heading font-bold mb-4">Support {program.displayName}</h2>
          <p className="text-background/80 mb-8 leading-relaxed">
            Your contribution funds this program directly through our regional cooperative network.
          </p>
          <Link
            href={`/donate?program=${program.slug}`}
            className="inline-block px-10 py-3 bg-background text-primary rounded font-semibold uppercase tracking-wider text-sm hover:opacity-90 transition-opacity"
          >
            Donate to This Program
          </Link>
        </div>
      </section>
    </>
  )
}
