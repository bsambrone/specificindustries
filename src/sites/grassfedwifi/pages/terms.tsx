export const metadata = {
  title: "Terms of Use — Grass Fed WiFi",
  description: "The co-op's terms of use defer to the Specific Industries umbrella policy.",
}

export default function Terms() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-heading font-bold text-foreground mb-8">Terms of Use</h1>
        <p className="text-foreground/80 leading-relaxed mb-6 italic">
          By using this site you acknowledge that the co-op cannot be held responsible for the rhythms
          of the harvest, the moods of the pasture, or the allocation decisions of the committee.
        </p>
        <p className="text-foreground/80 leading-relaxed mb-6">
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
          resolved in favor of the Specific Industries Terms of Use.
        </p>
      </div>
    </section>
  )
}
