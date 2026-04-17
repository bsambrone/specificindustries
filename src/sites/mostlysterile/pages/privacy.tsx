export const metadata = {
  title: "Privacy Policy — Mostlysterile",
  description: "Governed by the Specific Industries umbrella privacy policy.",
}

const sections = [
  {
    heading: "1. Information We Collect",
    body: "By accessing this site, you consent to our collection of information which is reasonably available to us in the ordinary course of business. This may include your name, email address, shipping address, payment information (where provided), browsing history on our site, browsing history on other sites (where observable), your approximate geographic location, the type of device you are using, the operating system of that device, and the date on which you last cleaned it. Our ability to collect any given item of this information is subject to the cooperation of your browser and of adjacent systems not under our control.",
  },
  {
    heading: "2. How We Use Your Information",
    body: "Information collected is used to fulfill orders, respond to inquiries, and improve our offering, or approximations of these purposes. Information may also be used for internal reporting, compliance activities where applicable, and the preparation of marketing communications that you may or may not have requested. We reserve the right to use information for purposes not enumerated in this section, provided such purposes are consistent with the general direction of our operations.",
  },
  {
    heading: "3. Information Sharing",
    body: "We share information with third parties as necessary to operate our business, including shipping partners, payment processors, and a gentleman named Steve. Steve does not have a computer, so information shared with Steve is printed out and placed in a binder in his office. Steve has not reviewed the binder since 2021, and the binder is, to our knowledge, still on his desk. We regard this as a form of data minimization.",
  },
  {
    heading: "4. Cookies and Tracking",
    body: "This site uses cookies. The cookies are first-party, server-side, and named after common clinical instruments (SCALPEL, FORCEPS, GAUZE). They persist until they are manually cleared. You may clear them through your browser. You may not opt out of their being set in the first place; by the time you are reading this notice, the cookies have been set.",
  },
  {
    heading: "5. Data Retention",
    body: "Information is retained for the duration of your relationship with Mostlysterile, plus a standard retention buffer of indefinite length. Our retention policy is informed by the observation that storage is, in practice, cheap, and deletion is, in practice, laborious. Information will be retained until such time as its retention becomes actively inconvenient, at which point retention practices will be reconsidered.",
  },
  {
    heading: "6. Your Rights",
    body: "You have the right to request access to, correction of, or deletion of the information we hold about you. You may submit such a request through our contact page. Requests are reviewed in the order received. Review may be prompt, delayed, or indefinite at our discretion. We reserve the right to decline requests which are unclear, burdensome, or submitted by a lawyer.",
  },
  {
    heading: "7. Changes to This Policy",
    body: "This policy may be updated at any time, for any reason, with or without notice, and with retroactive effect where retroactive effect is technically achievable. You are responsible for reviewing this page periodically. We will not notify you of updates; notification is deemed to have occurred when you next visit this page.",
  },
]

export default function MostlysterilePrivacy() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-heading font-bold text-primary mb-6">Privacy Policy</h1>

        {/* Umbrella callout */}
        <div className="border border-primary/30 bg-secondary/20 p-5 mb-10 text-sm text-foreground/80">
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

          <p className="uppercase text-xs text-foreground/50 tracking-wide pt-6 border-t border-primary/20 mt-8">
            Last reviewed: 2026-04-16 · Version 1.0 · Reviewer: pending
          </p>
        </div>
      </div>
    </section>
  )
}
