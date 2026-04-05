export const metadata = {
  title: "Terms of Use — Grass Fed WiFi",
  description: "The co-op's terms of use defer to the Specific Industries umbrella policy.",
}

export default function Terms() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-heading font-bold text-foreground mb-8">Terms of Use</h1>

        <p className="text-foreground/80 leading-relaxed mb-10 italic text-lg">
          By using this site you acknowledge that the co-op cannot be held responsible for the rhythms
          of the harvest, the moods of the pasture, or the allocation decisions of the committee.
        </p>

        <h2 className="text-2xl font-heading font-bold text-foreground mb-4">What You Agree To</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          By reading this site, you agree to consider the possibility that signal should carry its
          origin. You agree not to request FCC certification of the co-op&apos;s offerings. You agree to
          speak respectfully of the South Meadow even during its drier weeks.
        </p>
        <p className="text-foreground/80 leading-relaxed mb-10">
          If you submit a membership application, you further agree to wait patiently for the
          committee&apos;s decision, to accept the committee&apos;s judgment as final, and to refrain from
          following up by any means save carrier pigeon.
        </p>

        <h2 className="text-2xl font-heading font-bold text-foreground mb-4">What We Promise</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          The co-op promises to harvest by hand, to rotate pastures on a strict lunar calendar, and
          to maintain the list of refused certifications in a cabinet in the central barn. We
          promise to read every written intent submitted with a membership application aloud, at
          least once, at a meeting with a quorum.
        </p>
        <p className="text-foreground/80 leading-relaxed mb-10">
          We do not promise that your signal will be fast. We do not promise that your signal will
          be reliable. We do not promise that your signal will be present. We promise that whatever
          signal you receive will taste of the pasture it came from.
        </p>

        <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Disputes</h2>
        <p className="text-foreground/80 leading-relaxed mb-10">
          Disputes between members and the co-op are heard at the quarterly barn assembly, adjudicated
          by a farmer-steward chosen by the drawing of straws. Decisions are binding. Appeals may be
          submitted in writing at the following year&apos;s assembly, provided they are hand-delivered.
        </p>

        <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Termination</h2>
        <p className="text-foreground/80 leading-relaxed mb-10">
          Membership may be ended at any time by the member, without explanation, by sending a
          letter. Membership may also be ended by the committee, with explanation, delivered by a
          farmer in person at dawn. We have never yet had to do this.
        </p>

        <h2 className="text-2xl font-heading font-bold text-foreground mb-4">The Authoritative Terms</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          The authoritative terms of use governing this site are the Specific Industries Terms of Use,
          available at{" "}
          <a
            href="https://specificindustries.com/terms"
            className="text-primary hover:underline"
          >
            specificindustries.com/terms
          </a>.
        </p>
        <p className="text-foreground/60 text-sm leading-relaxed">
          Any conflict between statements on this page and the Specific Industries Terms of Use is
          resolved in favor of the Specific Industries Terms of Use. The co-op&apos;s commentary above is
          offered in good faith but does not override the umbrella terms.
        </p>
      </div>
    </section>
  )
}
