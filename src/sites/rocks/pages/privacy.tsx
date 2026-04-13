import { TerminalHeading } from "@/sites/rocks/components/terminal-heading"

export const metadata = {
  title: "PRIVACY POLICY — ROCKS",
  description: "Governed by the Specific Industries umbrella privacy policy.",
}

export default function RocksPrivacy() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <TerminalHeading level={1} className="mb-6">PRIVACY POLICY</TerminalHeading>

        <div className="border border-primary/30 bg-secondary/20 p-5 mb-8 text-sm text-primary/80">
          <p>
            The authoritative privacy policy for all Specific Industries properties, including this one, is
            maintained at{" "}
            <a
              href="https://specificindustries.com/privacy"
              className="text-accent underline hover:text-primary transition-colors"
            >
              specificindustries.com/privacy
            </a>
            . That policy governs all data handling on this site. No site-specific terms apply.
          </p>
        </div>

        <div className="space-y-4 text-primary/80 text-sm md:text-base leading-relaxed">
          <p>
            Rocks is a subsidiary brand of Specific Industries. All privacy obligations, data handling procedures,
            and user rights are defined by the umbrella policy linked above. This page exists solely to direct
            visitors to that canonical document.
          </p>
          <p>
            In the event of any conflict between informal statements made on this site and the umbrella policy,
            the umbrella policy controls. This site does not, in the ordinary course of operations, collect
            personal data from visitors beyond the standard analytics captured at the platform level.
          </p>
          <p className="uppercase text-xs text-primary/50 tracking-wide pt-4 border-t border-primary/20">
            LAST REVIEWED: 2026-04-12 · VERSION: 1.0
          </p>
        </div>
      </div>
    </section>
  )
}
