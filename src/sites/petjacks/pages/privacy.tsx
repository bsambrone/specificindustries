import LegalFooter from "@/sites/petjacks/components/legal-footer"

export const metadata = {
  title: "Privacy — Petjacks",
  description: "The Petjacks privacy policy.",
}

export default function PetjacksPrivacy() {
  return (
    <>
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto prose prose-lg">
          <h1 className="text-4xl font-heading font-bold text-primary mb-2">Privacy Policy</h1>
          <p className="text-sm text-foreground/60 mb-8">Last updated: April 2026</p>

          <h2 className="text-2xl font-heading font-semibold text-foreground mt-8 mb-3">What we collect</h2>
          <p className="text-foreground/70 leading-relaxed mb-4">
            When you purchase from Petjacks, we collect the information necessary to fulfill your order: name,
            shipping address, billing address, email, and pet species. We also collect basic analytics about how
            you use this site so we can make it better.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-foreground mt-8 mb-3">Beacon and tracker data</h2>
          <p className="text-foreground/70 leading-relaxed mb-4">
            Our Pet Tracker Beacon transmits location data during active flight windows. We retain this data for
            internal audit purposes, including publication in our Safety Record where applicable. Location data is
            not sold to third parties.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-foreground mt-8 mb-3">Flight Academy records</h2>
          <p className="text-foreground/70 leading-relaxed mb-4">
            Pets enrolled in Flight Academy have brief assessment records retained for their lifetime plus seven years.
          </p>

          <h2 className="text-2xl font-heading font-semibold text-foreground mt-8 mb-3">Contact</h2>
          <p className="text-foreground/70 leading-relaxed">
            For any privacy question, reach us at hello@petjacks.example.
          </p>
        </div>
      </section>

      <LegalFooter />
    </>
  )
}
