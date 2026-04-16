import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "Privacy Policy — Squared Away Supply Co.",
  description:
    "Privacy policy for the Official Unofficial Post Exchange. Umbrella policy at specificindustries.com/privacy is authoritative.",
}

const SECTIONS: Array<{ heading: string; body: string[] }> = [
  {
    heading: "1. Data We Collect (And What We Do With It)",
    body: [
      "We collect the following categories of data: what you buy, how long you stared at the crayon product before buying it, and whether you selected 'Civilian Contractor (LinkedIn Edition)' on the Authorization page. This data is aggregated into a metric we call 'Individual Morale Velocity' and stored in a binder at the command post.",
      "We do not sell your data. We trade it at poker night against other satirical commerce sites in the Specific Industries portfolio.",
    ],
  },
  {
    heading: "2. Cookies (Not the Good Kind)",
    body: [
      "This site uses cookies to remember your cart contents. The cookies are crunchy, unflavored, and compliant with MIL-STD-CHOMP. You may disable cookies in your browser settings, at which point the cart will forget you, which is its own form of quiet tragedy.",
    ],
  },
  {
    heading: "3. Your Rights Under the Uniform Code of Morale Justice",
    body: [
      "You have the right to request the data we hold on you. You have the right to request its deletion. You do not have the right to request a refund on morale — the exchange is final.",
      "All requests must be submitted on DA Form 4856 (counseling) with a minimum of four endorsing signatures. We do not process DA Form 4856.",
    ],
  },
  {
    heading: "4. Classification Markings We Completely Made Up",
    body: [
      "You will see markings like UNCLASSIFIED // FOUO, SECRET // NOFORN // COYOTE, and CLASSIFIED // BELOW THE THREAD COUNT. None of these markings are real. We made them up for ambiance. Do not attempt to invoke them in a FOIA request.",
    ],
  },
  {
    heading: "5. Third-Party Sharing (Only with Command)",
    body: [
      "We share aggregated shopping data with our leadership team (see: Command Staff page) for the sole purpose of them muttering about the state of the modern force. No individually identifiable data leaves our system, unless a Sergeant Major requests it, in which case it leaves our system immediately.",
    ],
  },
  {
    heading: "6. Data Retention (Until the End of Your Enlistment, Spiritually)",
    body: [
      "We retain your data for the duration of your current term of enlistment, or seven years, whichever is more inconvenient for you. Upon separation, retirement, or quiet disappearance, your data is archived in a filing cabinet in a basement at Fort Meade, where we assume it will be fine.",
    ],
  },
]

export default function PrivacyPage() {
  return (
    <>
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading text-3xl text-primary uppercase tracking-widest mb-6">Privacy Policy</h1>

          <div className="border-2 border-accent bg-accent/5 p-5 mb-8">
            <p className="font-heading uppercase tracking-widest text-accent mb-2 text-sm">Umbrella Policy</p>
            <p className="text-foreground/90 text-sm">
              The authoritative privacy policy for all Specific Industries properties — including Squared Away Supply Co.
              — is published at{" "}
              <a href="https://specificindustries.com/privacy" className="underline hover:text-accent">
                specificindustries.com/privacy
              </a>
              . It governs all data handling. The content below is satirical, non-binding, and intended for entertainment.
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
