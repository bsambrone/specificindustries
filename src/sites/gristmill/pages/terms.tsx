import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "Terms of Service — Gristmill Partners",
  description:
    "Gristmill Partners terms of service. This site is operated by Specific Industries. The authoritative terms are available at specificindustries.com/terms.",
}

export default function TermsPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="mb-6 text-4xl font-heading font-bold text-secondary">
          Terms of Service
        </h1>
        <div className="mb-8 rounded border-2 border-secondary/30 bg-secondary/5 p-6">
          <p className="text-sm">
            This site is operated by Specific Industries. The authoritative terms of service
            are available at{" "}
            <a
              href="https://specificindustries.com/terms"
              className="text-primary underline"
            >
              specificindustries.com/terms
            </a>
            .
          </p>
        </div>
        <p className="text-lg leading-relaxed">
          Gristmill Partners predates the modern regulatory environment by a considerable
          margin. All questions of dispute, jurisdiction, and applicable law are governed
          by the Specific Industries umbrella terms linked above.
        </p>
      </section>
    </div>
  )
}
