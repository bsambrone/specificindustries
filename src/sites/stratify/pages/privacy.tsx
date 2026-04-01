import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Privacy Policy — Stratify",
  description: "Your data is an asset. Specifically, ours.",
}

export default function StratifyPrivacy() {
  return (
    <>
      <Hero
        headline="Privacy Policy"
        subheadline="Your data is an asset. Specifically, ours."
        dark
      />
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <p className="text-sm text-foreground/80 bg-secondary/20 border border-foreground/15 rounded-lg p-4">
            The authoritative privacy policy for all Specific Industries properties is maintained at{" "}
            <a href="https://specificindustries.com/privacy" className="text-accent underline hover:text-secondary transition-colors">
              specificindustries.com
            </a>.{" "}
            <a href="https://specificindustries.com/terms" className="text-accent underline hover:text-secondary transition-colors">
              View Terms of Use
            </a>
          </p>
          <p className="text-sm text-foreground/60 italic">
            Last updated: Concurrent with your onboarding. Version: 3.7 (Yield-Aligned Edition)
          </p>

          <p className="text-foreground/80">
            Stratified Commerce And Marketing (&ldquo;Stratify,&rdquo; &ldquo;we,&rdquo; &ldquo;the Architecture&rdquo;) values
            your privacy in the same way we value all assets &mdash; as potential yield.
          </p>

          <h2 className="text-2xl font-heading font-bold text-secondary">1. Information We Collect</h2>
          <p className="text-foreground/80">
            During the onboarding process, we collect the information you voluntarily provide, including but not
            limited to: your full legal name, contact details, emergency contacts (for Retention Conversations),
            photographs of your refrigerator interior, dream journal excerpts (optional but strongly encouraged),
            blood type, estimated social capital index, household income bracket, LinkedIn connection count,
            and a brief statement of your five-year vision. We also collect metadata about your browsing behavior,
            device identifiers, and the names of anyone you have mentioned as a potential architecture candidate.
          </p>

          <h2 className="text-2xl font-heading font-bold text-secondary">2. How We Use Your Information</h2>
          <p className="text-foreground/80">
            Your information is used to calculate your Stratification Compatibility Index, determine your
            appropriate layer placement, and construct your Personalized Elevation Profile. We use your
            data to facilitate introductions with your Executive Elevation Sponsor, who will have full
            access to your profile as part of their coaching obligations. We may also use your contact
            list to identify adjacency opportunities for architectural expansion. The dream journal data
            is reviewed by our Aspirational Alignment Team. We take that part very seriously.
          </p>

          <h2 className="text-2xl font-heading font-bold text-secondary">3. Information Sharing</h2>
          <p className="text-foreground/80">
            Your information is shared with your upward layer chain. This is not optional. This is
            architecture. Each layer above you receives a summary of your activity metrics, yield
            contribution, and Engagement Compliance Score. This sharing enables the Architecture to
            function. We may also share your information with third-party Elevation Partners, Yield
            Optimization Vendors, and promotional photographers who attend the Annual Layer Expansion
            Summit. We will not sell your data to strangers. Only to people who are professionally
            adjacent to you within the framework.
          </p>

          <h2 className="text-2xl font-heading font-bold text-secondary">4. Data Retention</h2>
          <p className="text-foreground/80">
            Your data is retained for no less than forever. Should you submit a Voluntary Disengagement
            Request, your profile will be moved to Dormant Architecture status and retained indefinitely
            in the event that you re-engage, your subordinate layers remain active, or your data continues
            to generate passive informational yield. Deletion requests are reviewed on a case-by-case
            basis by the same person who handles your Retention Conversation. You can imagine how that
            typically goes.
          </p>

          <h2 className="text-2xl font-heading font-bold text-secondary">5. Cookies</h2>
          <p className="text-foreground/80">
            This website uses cookies. Additionally, participants who achieve Layer 3 status receive
            complimentary branded shortbread cookies at the annual Layer 3 Summit, which are also a
            form of data collection in that we observe which flavor you select and update your
            Preference Profile accordingly. The digital cookies track your navigation behavior,
            session duration, and hover patterns. There is no meaningful distinction between the two
            types of cookies from a data architecture perspective.
          </p>
        </div>
      </section>
    </>
  )
}
