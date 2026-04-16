import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "Terms of Service — Squared Away Supply Co.",
  description:
    "Terms of service for the Official Unofficial Post Exchange. Umbrella terms at specificindustries.com/terms are authoritative.",
}

const SECTIONS: Array<{ heading: string; body: string[] }> = [
  {
    heading: "1. Enlistment in These Terms",
    body: [
      "By purchasing any product from Squared Away Supply Co., you voluntarily enlist in these terms for a period of indefinite duration. There is no early separation option. Satisfactory completion of these terms is not guaranteed, but satisfactory completion is not the goal.",
    ],
  },
  {
    heading: "2. Acceptable Use of the PX",
    body: [
      "The following uses are acceptable: personal consumption, gift-giving, field-environment cosplay, and reenlistment bonuses. The following uses are not acceptable: reselling to military members at inflated prices, using the crayon product as structural support, and using the invisibility cloak to avoid your first sergeant.",
    ],
  },
  {
    heading: "3. Returns, Exchanges, and the Grief Process",
    body: [
      "All sales are final. Returns are accepted only under duress, and only during the narrow window between Kübler-Ross Stage 3 (Bargaining) and Stage 4 (Depression). Exchanges are welcome and may be processed by a representative with the title 'Specialist' or higher.",
    ],
  },
  {
    heading: "4. Limitation of Morale",
    body: [
      "Squared Away Supply Co. makes no representation as to actual morale impact. Morale Points (MP) accrued through the Morale Program™ are notional, non-transferable, and have no cash value, even to us. The 'illusion of meaning' reward at the O-10 tier is for entertainment purposes and is not, in fact, a redeemable prize. It will not ship in 6-8 weeks. It will not ship.",
    ],
  },
  {
    heading: "5. Indemnification Against Cross-Branch Heckling",
    body: [
      "Every product sold on this site contains at least one heckle directed at a rival service branch. By completing a purchase, you accept that the heckle is both your inheritance and your burden. Squared Away Supply Co. is not liable for any argument you start with a sibling who is in a different branch.",
    ],
  },
  {
    heading: "6. Governing Law (DoD, Probably)",
    body: [
      "These terms are governed by the laws of the Department of Defense, where applicable, and by common sense, where not. Disputes shall be resolved by a panel of three Sergeants Major at 0600, outdoors, in the rain. Decisions are final.",
    ],
  },
]

export default function TermsPage() {
  return (
    <>
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading text-3xl text-primary uppercase tracking-widest mb-6">Terms of Service</h1>

          <div className="border-2 border-accent bg-accent/5 p-5 mb-8">
            <p className="font-heading uppercase tracking-widest text-accent mb-2 text-sm">Umbrella Terms</p>
            <p className="text-foreground/90 text-sm">
              The authoritative terms of service for all Specific Industries properties — including Squared Away Supply
              Co. — are published at{" "}
              <a href="https://specificindustries.com/terms" className="underline hover:text-accent">
                specificindustries.com/terms
              </a>
              . They govern all commercial relationships. The content below is satirical, non-binding, and intended for
              entertainment.
            </p>
          </div>

          <div className="space-y-7">
            {SECTIONS.map((s) => (
              <section key={s.heading}>
                <h2 className="font-heading text-xl text-primary uppercase tracking-wide mb-2">{s.heading}</h2>
                <div className="space-y-3 text-foreground/90">
                  {s.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <p className="font-mono text-xs uppercase tracking-widest text-primary/60 mt-10">
            Last updated: 2026-04-15 · UNCLASSIFIED // FOUO
          </p>
        </div>
      </section>
    </>
  )
}
