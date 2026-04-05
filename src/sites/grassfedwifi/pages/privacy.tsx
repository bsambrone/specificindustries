export const metadata = {
  title: "Privacy Policy — Grass Fed WiFi",
  description: "The co-op's privacy policy defers to the Specific Industries umbrella policy.",
}

export default function Privacy() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-heading font-bold text-foreground mb-8">Privacy Policy</h1>
        <p className="text-foreground/80 leading-relaxed mb-6 italic">
          We keep our data the way we keep our signal: free-roaming and uncollected. What we do not
          need, we do not store. What we cannot explain to a farmer, we do not process.
        </p>
        <p className="text-foreground/80 leading-relaxed mb-6">
          The authoritative privacy policy governing this site is the Specific Industries Privacy Policy,
          available at{" "}
          <a
            href="https://specificindustries.com/privacy"
            className="text-primary hover:underline"
          >
            specificindustries.com/privacy
          </a>.
        </p>
        <p className="text-foreground/60 text-sm leading-relaxed">
          Any conflict between statements on this page and the Specific Industries Privacy Policy is
          resolved in favor of the Specific Industries Privacy Policy.
        </p>
      </div>
    </section>
  )
}
