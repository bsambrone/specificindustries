import { TerminalHeading } from "@/sites/rocks/components/terminal-heading"

export const metadata = {
  title: "TERMS OF USE — ROCKS",
  description: "Governed by the Specific Industries umbrella terms of use.",
}

const sections = [
  {
    heading: "1. ACCEPTANCE OF TERMS",
    body: "By loading this page, scrolling any portion of it, or merely thinking about it from within a jurisdiction where thought is legal, you agree to these terms in full. There is no opt-in checkbox because an opt-in checkbox would imply that non-acceptance was a possibility. It was not.",
  },
  {
    heading: "2. NATURE OF THE INSTRUMENTS",
    body: "The instruments offered on this site (RCK, RCK2, RCKBX) are rocks. They are not securities, derivatives, notes, bonds, commodities contracts, or crypto assets. They are rocks. The firm makes no representation that they will appreciate, depreciate, or do anything at all. Rocks are famously consistent in this regard.",
  },
  {
    heading: "3. NO INVESTMENT ADVICE",
    body: "Nothing on this site constitutes investment advice. The research published by our Bedrock Research desk is an opinion expressed by one man, in a suit, who has not published a peer-reviewed paper. The 'ROCK INDEX' displayed on the homepage is a number we made up. Do not make real-world financial decisions based on anything published here. If you do, that is an interesting choice you have made.",
  },
  {
    heading: "4. NO REFUNDS",
    body: "All sales are final. Rocks are final. The decision to buy rocks is final. Once a position has been settled, it cannot be unwound, reversed, canceled, returned, exchanged, or apologized for. If you experience buyer's remorse, we suggest reading 'Risk Factors' on the product page, which you should have done before ordering.",
  },
  {
    heading: "5. DELIVERY AND CUSTODY",
    body: "Instruments ship via ground carrier when the shipping guy (also Lawrence) is in the office. The shipping guy is in the office on no particular schedule. Transit times are therefore best described as 'indefinite.' The firm is not responsible for damage to your floor, foot, or pet caused by the delivered item, which is, we cannot stress this enough, a rock.",
  },
  {
    heading: "6. USE OF THE INSTRUMENTS",
    body: "Upon receipt, the instrument is yours to use as you see fit, subject to local ordinances. Permitted uses include: holding, displaying, photographing, talking to, and burying. Prohibited uses include: throwing at persons, throwing at property, ingestion, use as a paperweight for documents that are more valuable than the rock itself. You may not re-list the instrument on secondary markets without notifying the firm, because we are curious.",
  },
  {
    heading: "7. INTELLECTUAL PROPERTY",
    body: "The term 'RCK' is not trademarked. The term 'RCK2' is not trademarked. The term 'RCKBX' is not trademarked. The term 'BEDROCK HOLDINGS' is trademarked, but not by us. We have no intellectual property. We have rocks.",
  },
  {
    heading: "8. LIMITATION OF LIABILITY",
    body: "The firm's aggregate liability to any holder shall not exceed the purchase price of the instrument. If you purchased a single rock for $49, the firm's maximum exposure to you is $49. This figure has been stress-tested by our in-house counsel (also Lawrence) who has signed off on it without reading it. In the event of catastrophic rock failure, Lawrence will reach out.",
  },
  {
    heading: "9. SATIRE NOTICE",
    body: "This site is a satirical project. Nothing on it is real. Nothing on it should be relied upon. The firm is not a firm. The vault is a garage. Lawrence may or may not exist. If you have taken any of this seriously, we apologize, and also we would like to hear more about how that happened.",
  },
]

export default function RocksTerms() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <TerminalHeading level={1} className="mb-6">TERMS OF USE</TerminalHeading>

        {/* Umbrella callout (authoritative) */}
        <div className="border border-primary/30 bg-secondary/20 p-5 mb-10 text-sm text-primary/80">
          <p>
            The authoritative terms of use for all Specific Industries properties, including this one, are maintained
            at{" "}
            <a
              href="https://specificindustries.com/terms"
              className="text-accent underline hover:text-primary transition-colors"
            >
              specificindustries.com/terms
            </a>
            . Those terms govern your actual use of this site. In the event of any conflict between the sections
            below and the umbrella policy, the umbrella policy controls.
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
