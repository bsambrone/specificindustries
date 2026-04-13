import { TerminalHeading } from "@/sites/rocks/components/terminal-heading"

export const metadata = {
  title: "TERMS OF USE — ROCKS",
  description: "Governed by the Specific Industries umbrella terms of use.",
}

export default function RocksTerms() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <TerminalHeading level={1} className="mb-6">TERMS OF USE</TerminalHeading>

        <div className="border border-primary/30 bg-secondary/20 p-5 mb-8 text-sm text-primary/80">
          <p>
            The authoritative terms of use for all Specific Industries properties, including this one, are maintained
            at{" "}
            <a
              href="https://specificindustries.com/terms"
              className="text-accent underline hover:text-primary transition-colors"
            >
              specificindustries.com/terms
            </a>
            . Those terms govern your use of this site. No site-specific legal language applies.
          </p>
        </div>

        <div className="space-y-4 text-primary/80 text-sm md:text-base leading-relaxed">
          <p>
            Rocks is a satirical brand operated under the Specific Industries umbrella. Nothing on this site
            constitutes investment advice, an offer to sell securities, or a recommendation of any kind. Rocks are
            rocks. The entire site is a joke. You are encouraged to treat it as one.
          </p>
          <p>
            Commercial claims on this site, including but not limited to claims regarding market data, custody
            operations, institutional clients, and historical performance, are fictional. Do not rely on them for any
            real-world decision.
          </p>
          <p className="uppercase text-xs text-primary/50 tracking-wide pt-4 border-t border-primary/20">
            LAST REVIEWED: 2026-04-12 · VERSION: 1.0
          </p>
        </div>
      </div>
    </section>
  )
}
