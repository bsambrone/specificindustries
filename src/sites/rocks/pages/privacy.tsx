import { TerminalHeading } from "@/sites/rocks/components/terminal-heading"

export const metadata = {
  title: "PRIVACY POLICY — ROCKS",
  description: "Governed by the Specific Industries umbrella privacy policy.",
}

const sections = [
  {
    heading: "1. DATA COLLECTION",
    body: "By accessing this site, you authorize the firm to collect any information that may be relevant to your suitability as a holder of terrestrial hard assets. This includes, but is not limited to: your net worth, your risk tolerance, your home address, your home address ten years ago, your opinions on the Federal Reserve, the make and model of your primary vehicle, and the approximate weight of objects you have lifted in the past twelve months. We do not have the infrastructure to collect most of this, but we appreciate your consent in principle.",
  },
  {
    heading: "2. COOKIES AND TRACKING",
    body: "This site uses cookies. The cookies are first-party, server-side, and named after metamorphic rock types (GNEISS, SCHIST, SLATE). They persist until they are manually removed with a hammer. You cannot opt out. You never could. Opting out was never on the table.",
  },
  {
    heading: "3. THIRD-PARTY SHARING",
    body: "We share your data with our custody desk, our research desk, and a man named Lawrence who sits at the vault. Lawrence does not have a computer, so the data is printed out and placed in a three-ring binder labeled 'CLIENT'. Lawrence has not opened the binder in approximately nine years. Your data is, in this sense, both distributed and forgotten.",
  },
  {
    heading: "4. DATA RETENTION",
    body: "Data is retained for the duration of your position in any rock instrument (RCK, RCK2, RCKBX), plus a perpetuity buffer of one hundred years. Because rocks are indestructible and client positions are therefore effectively immortal, data retention is, in practice, eternal. We consider this a feature. Our compliance team (Lawrence) has not commented.",
  },
  {
    heading: "5. YOUR RIGHTS AS A HOLDER",
    body: "You have the right to request a copy of your data. You have the right to request correction of your data. You have the right to request deletion of your data. You have the right to request that Lawrence open the binder. We reserve the right to decline each of these requests, individually or in combination, without cause or explanation.",
  },
  {
    heading: "6. DATA SECURITY",
    body: "Your data is protected by industry-standard measures, including but not limited to: a four-digit PIN on the office landline, a deadbolt on the side door of the vault facility, and Lawrence. The PIN has not been changed since 2003. The deadbolt sticks. Lawrence is asleep.",
  },
  {
    heading: "7. CHANGES TO THIS POLICY",
    body: "This policy may be updated at any time, for any reason, without notice, and with retroactive effect. You are responsible for reviewing this page daily. We will not tell you when changes occur. If you continue to hold rocks, you are deemed to have accepted the updated terms, including terms that were not in force when you began holding them.",
  },
]

export default function RocksPrivacy() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <TerminalHeading level={1} className="mb-6">PRIVACY POLICY</TerminalHeading>

        {/* Umbrella callout (authoritative) */}
        <div className="border border-primary/30 bg-secondary/20 p-5 mb-10 text-sm text-primary/80">
          <p>
            The authoritative privacy policy for all Specific Industries properties, including this one, is
            maintained at{" "}
            <a
              href="https://specificindustries.com/privacy"
              className="text-accent underline hover:text-primary transition-colors"
            >
              specificindustries.com/privacy
            </a>
            . That policy governs all actual data handling on this site. In the event of any conflict between the
            sections below and the umbrella policy, the umbrella policy controls.
          </p>
        </div>

        {/* Satire body */}
        <div className="space-y-8 text-primary/80 text-sm md:text-base leading-relaxed">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="font-heading font-semibold uppercase tracking-wide text-primary text-lg md:text-xl mb-3">
                {s.heading}
              </h2>
              <p>{s.body}</p>
            </div>
          ))}

          <p className="uppercase text-xs text-primary/50 tracking-wide pt-6 border-t border-primary/20 mt-8">
            LAST REVIEWED: 2026-04-13 · VERSION: 1.1 · REVIEWER: LAWRENCE (ASLEEP)
          </p>
        </div>
      </div>
    </section>
  )
}
