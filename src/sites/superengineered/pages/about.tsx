import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "About — Superengineered",
  description: "A letter from our founders on why we rebuilt the toothbrush.",
}

export default function SuperengineeredAbout() {
  return (
    <main className="bg-background py-20 px-4">
      <article className="max-w-2xl mx-auto">
        <p className="text-sm font-medium uppercase tracking-widest text-primary/60 mb-4 text-center">
          A Letter From Our Founders
        </p>
        <h1 className="text-4xl md:text-5xl font-heading font-light text-primary mb-10 text-center">
          Why we rebuilt the toothbrush.
        </h1>
        <div className="space-y-6 text-lg text-primary/80 leading-relaxed">
          <p>
            For nearly five thousand years, the toothbrush has gone largely unexamined. Generation after generation accepted the daily ritual of applying bristles to enamel without instrumentation, without telemetry, without a single line of production-grade code anywhere in the workflow. We could not continue.
          </p>
          <p>
            Superengineered was founded on a belief that the most ordinary objects in human life deserve the same rigor, the same standards, the same compliance controls we reserve for distributed systems. A spoon, properly built, is a service. A doorknob, properly considered, is a perimeter. A light switch is authentication in physical form.
          </p>
          <p>
            We understand this is a lot. We understand there are simpler ways to brush a tooth. We reject them.
          </p>
          <p>
            Every product we ship runs on subscription because a product without a subscription is a product without ongoing care. Firmware updates, compliance attestations, telemetry retention — these are not features; they are obligations. We take them seriously. We charge accordingly.
          </p>
          <p>
            We hope you will join us at the new standard.
          </p>
        </div>
        <p className="mt-12 text-center text-primary/60 italic">
          — The Superengineered Founders
        </p>
      </article>
    </main>
  )
}
