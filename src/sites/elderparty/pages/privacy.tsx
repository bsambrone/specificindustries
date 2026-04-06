import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Privacy Policy — Elder Party",
  description: "Our privacy policy. We know more about you than you think. This is the disclosure.",
}

export default function ElderPartyPrivacy() {
  return (
    <>
      <Hero
        headline="Privacy Policy"
        subheadline="We handle your data with thoroughness, discretion, and knowledge that predates your existence."
      />
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto prose prose-lg text-foreground/80 space-y-6">
          <p className="text-sm text-foreground/70 bg-secondary/20 border border-primary/10 rounded-lg p-4">
            The authoritative privacy policy for all Specific Industries properties is maintained at{" "}
            <a href="https://specificindustries.com/privacy" className="text-accent underline hover:text-primary transition-colors">
              specificindustries.com
            </a>.{" "}
            <a href="https://specificindustries.com/terms" className="text-accent underline hover:text-primary transition-colors">
              View Terms of Use
            </a>
          </p>
          <p className="text-sm text-foreground/40 italic">
            Last updated: We are uncertain. Time is not behaving normally near the servers.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">1. Data Collection</h2>
          <p>
            By visiting this website, you consent to the collection of your browsing history, voting
            preferences, possession status, and the approximate coordinates of your current dimensional
            plane. We also collect ambient audio from your device during periods when you are thinking
            about the Elder Party, which is more often than you realize. This data is stored securely
            in a location we have agreed not to specify in writing.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">2. How We Use Your Data</h2>
          <p>
            Your data is used to personalize your Elder Party experience, route your contact inquiries
            to the correct department, and ensure that rally invitations arrive before you decide to attend.
            Browsing patterns are analyzed to determine your proximity to awakening. If you have received
            campaign literature you did not request, your proximity score is high. This is a compliment.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">3. Data Sharing</h2>
          <p>
            We share your data with affiliated campaign entities, dimensional liaison offices, and the
            senior leadership of the Elder Party, whose methods of data review are not fully understood
            by our IT team but appear to be effective. We do not sell your data to third parties. The
            Elder Party has no interest in commerce with entities that have not yet heard the call.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">4. Cookies</h2>
          <p>
            This website uses cookies to track your browsing behavior across sessions and, in some
            documented cases, across timelines. Standard cookies may be cleared through your browser
            settings. The deeper tracking mechanisms do not use cookies in the conventional sense
            and are not removable through standard means. We appreciate your understanding.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">5. Your Rights</h2>
          <p>
            You have the right to request a copy of the data we hold about you. You have the right
            to request corrections. You have the right to request deletion, which we will review
            carefully before declining for reasons that will be explained in a letter that several
            recipients have described as &quot;distressing in ways I cannot articulate.&quot; You
            also have the right to opt out of non-essential communications, though the essential
            ones will continue regardless. The essential ones are very important.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">6. Security</h2>
          <p>
            Your data is protected by layered security protocols that our technical team describes
            as &quot;unconventional but effective.&quot; The servers are maintained in a facility
            our IT director has visited twice and declined to visit a third time. Access is restricted
            to authorized personnel and, on three documented occasions, entities for whom we have
            not yet established authorization protocols. We are monitoring the situation.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">7. Changes to This Policy</h2>
          <p>
            We reserve the right to amend this policy at any time, with or without notice, from
            any point in the timeline we find convenient. Material changes will be communicated to
            subscribers via email. Immaterial changes have already been communicated in ways you
            may not have consciously registered. If you have recently changed a belief you held
            strongly without knowing why, this may be relevant.
          </p>
        </div>
      </section>
    </>
  )
}
