import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "Privacy Policy — Gristmill Partners",
  description:
    "Gristmill Partners privacy policy. This site is operated by Specific Industries. The authoritative privacy policy is available at specificindustries.com/privacy.",
}

export default function PrivacyPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="mb-6 text-4xl font-heading font-bold text-secondary">
          Privacy Policy
        </h1>
        <div className="mb-8 rounded border-2 border-secondary/30 bg-secondary/5 p-6">
          <p className="text-sm">
            This site is operated by Specific Industries. The authoritative privacy policy is
            available at{" "}
            <a
              href="https://specificindustries.com/privacy"
              className="text-primary underline"
            >
              specificindustries.com/privacy
            </a>
            .
          </p>
        </div>
        <p className="text-lg leading-relaxed">
          Gristmill Partners collects standard workforce volatility indicators in the normal
          course of business. Data handling, retention, and sharing are governed by the
          Specific Industries umbrella policy linked above.
        </p>
      </section>
    </div>
  )
}
