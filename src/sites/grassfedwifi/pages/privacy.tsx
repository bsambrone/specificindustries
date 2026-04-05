export const metadata = {
  title: "Privacy Policy — Grass Fed WiFi",
  description: "The co-op's privacy policy defers to the Specific Industries umbrella policy.",
}

export default function Privacy() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-heading font-bold text-foreground mb-8">Privacy Policy</h1>

        <p className="text-foreground/80 leading-relaxed mb-10 italic text-lg">
          We keep our data the way we keep our signal: free-roaming and uncollected. What we do not
          need, we do not store. What we cannot explain to a farmer, we do not process.
        </p>

        <h2 className="text-2xl font-heading font-bold text-foreground mb-4">What We Do Not Collect</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          The co-op has declined, on principle, to collect the following: browsing history, device
          fingerprints, location telemetry, cookie crumbs, session replays, engagement metrics,
          mouse-movement heatmaps, scroll depth, viewport dimensions, or anything else that a
          committee of engineers in a conference room might consider &quot;useful.&quot;
        </p>
        <p className="text-foreground/80 leading-relaxed mb-10">
          If you visit this site and then leave, we do not follow you. If you linger on a page, we do
          not notice. If you add a share to your basket and then reconsider, that is between you and
          the basket.
        </p>

        <h2 className="text-2xl font-heading font-bold text-foreground mb-4">What We Do Collect</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          When you submit a membership application, we retain the name, postal address, and written
          intent you provide, because Fennel needs them to write your allocation into the ledger.
          These are held in the leather-bound ledger at the co-op barn and, regrettably, also in a
          modern database somewhere, because the lawyer insisted.
        </p>
        <p className="text-foreground/80 leading-relaxed mb-10">
          Your share basket is stored in your own browser, in a place called &quot;localStorage,&quot; which
          the co-op does not visit and cannot read. Clear it whenever you like.
        </p>

        <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Cookies</h2>
        <p className="text-foreground/80 leading-relaxed mb-10">
          The co-op does not use cookies for tracking. The co-op does use actual cookies, baked on
          site, available to Estate Share members at the annual harvest supper. These are not
          transmitted electronically.
        </p>

        <h2 className="text-2xl font-heading font-bold text-foreground mb-4">The Authoritative Policy</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          The authoritative privacy policy governing this site is the Specific Industries Privacy
          Policy, available at{" "}
          <a
            href="https://specificindustries.com/privacy"
            className="text-primary hover:underline"
          >
            specificindustries.com/privacy
          </a>.
        </p>
        <p className="text-foreground/60 text-sm leading-relaxed">
          Any conflict between statements on this page and the Specific Industries Privacy Policy is
          resolved in favor of the Specific Industries Privacy Policy. The co-op&apos;s commentary above is
          offered in good faith but does not override the umbrella policy.
        </p>
      </div>
    </section>
  )
}
