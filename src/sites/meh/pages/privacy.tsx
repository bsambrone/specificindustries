export const metadata = {
  title: "Privacy Policy — Meh.",
  description: "Governed by the Specific Industries umbrella privacy policy.",
}

const sections = [
  {
    heading: "1. What We Collect (Your Resignation)",
    body: "We collect the information you provide during the course of a purchase, and a modest selection of environmental information about your browser and device. Most of it is of limited use. Some of it is of no use at all. We collect it anyway, in the spirit of thoroughness which is not inherently malicious but which is, also, not entirely benign.",
  },
  {
    heading: "2. Cookies (Stale)",
    body: "This site uses cookies. Our cookies are named after household objects (KETTLE, MIRROR, LAMP) and persist at the default duration specified by your browser. Clearing them is a decision you may make freely. Setting them is a decision we have already made.",
  },
  {
    heading: "3. Your Rights (Unchanged)",
    body: "You have the right to request access to, correction of, or deletion of the information we hold about you. Requests are reviewed by a single staff member on a weekly basis, as scheduling permits. We will respond when we respond. We will not respond sooner.",
  },
  {
    heading: "4. Data Retention (Until We Forget)",
    body: "Information is retained for the duration of our relationship with you, plus a modest period during which we continue to operate as though the relationship exists. Deletion occurs in the course of routine operations and is not guaranteed to be complete. Backups exist. Backups will continue to exist. We do not apologize for the backups.",
  },
  {
    heading: "5. Third-Party Services (Similarly Disappointing)",
    body: "We share information with third-party services required for standard site operation: a payment processor, an analytics provider, and a shipping vendor. These services handle your information according to their own policies, which we have read and found to be generally adequate.",
  },
]

export default function MehPrivacy() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6 tracking-tight">Privacy Policy</h1>

        <div className="border border-foreground/30 bg-background/30 p-5 mb-10 text-sm text-foreground/80">
          <p>
            The authoritative privacy policy for all Specific Industries properties, including this one, is maintained at{" "}
            <a href="https://specificindustries.com/privacy" className="text-primary underline hover:no-underline transition-colors">
              specificindustries.com/privacy
            </a>
            . That policy governs all actual data handling on this site. In the event of any conflict between the sections below and the umbrella policy, the umbrella policy controls.
          </p>
        </div>

        <div className="space-y-8 text-foreground/80 text-sm md:text-base leading-relaxed">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="font-heading font-bold text-primary text-lg md:text-xl mb-3">{s.heading}</h2>
              <p>{s.body}</p>
            </div>
          ))}

          <p className="uppercase text-xs text-foreground/50 tracking-wide pt-6 border-t border-foreground/20 mt-8">
            Last reviewed: 2026-04-17 · Version 1.0
          </p>
        </div>
      </div>
    </section>
  )
}
