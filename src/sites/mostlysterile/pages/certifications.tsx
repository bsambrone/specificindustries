import { Hero } from "@/components/ui/hero"
import { CertificationCard } from "@/components/ui/CertificationCard"

export const metadata = {
  title: "Certifications — Mostlysterile",
  description: "A complete gallery of credentials, training completions, and honors recognized by the Mostlysterile team.",
}

const certifications = [
  {
    title: "Adjacent Concepts",
    issuer: "Continental Medical Review Board",
    year: "2017",
    note: "Board-level certification in adjacent and adjacent-adjacent subject matter.",
  },
  {
    title: "Most Improved Sterility",
    issuer: "Regional Medical Supply Semifinals",
    year: "2019",
    note: "Runner-up. Recognition of measurable year-over-year improvement.",
  },
  {
    title: "Basic Hand Washing",
    issuer: "Online University of Applied Healthcare",
    year: "2018",
    note: "Asynchronous coursework completed with a final-module passing grade.",
  },
  {
    title: "Letter of Reference",
    issuer: "Steve",
    year: "2020",
    note: "Personal recommendation retained in our permanent records.",
  },
  {
    title: "ISO-Inspired Certification",
    issuer: "Vibes-Based Compliance Institute",
    year: "2021",
    note: "Recognition of institutional alignment with ISO principles in spirit.",
  },
  {
    title: "Participation in Health Fair",
    issuer: "County Public Health Department",
    year: "2022",
    note: "Ribbon awarded to attendees meeting minimum booth-presence standards.",
  },
  {
    title: "Honorary Membership",
    issuer: "Doctors Without Borders Fan Club",
    year: "2019",
    note: "Unaffiliated with and not endorsed by Doctors Without Borders.",
  },
  {
    title: "CPR for Mannequins",
    issuer: "Mid-Atlantic Training Collective",
    year: "2016",
    note: "Completion certificate covering inanimate-subject resuscitation protocol.",
  },
  {
    title: "Attendance, Medical Supplies Trade Show",
    issuer: "Industry Consortium of the Mid-Atlantic",
    year: "2018",
    note: "Official confirmation of presence on the exhibition floor.",
  },
]

export default function MostlysterileCertifications() {
  return (
    <>
      <Hero
        headline="Our Certifications"
        subheadline="Mostlysterile maintains a rigorous credentialing program. Every certificate below represents a real recognition by a real issuing body, or by someone functionally comparable."
      />

      <section className="py-10 px-4">
        <div className="max-w-4xl mx-auto space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Credentialing is central to how we operate. Our team has, over ten years, accumulated a broad and defensible portfolio of certifications, completions, and recognitions. Each one is displayed here in its entirety, framed in our main office where space permits.
          </p>
          <p>
            We consider this gallery to be the fullest available statement of our qualifications. If a certification is not shown here, it is because we either do not hold it, or hold it in a format that does not photograph well. Our receiving department continues to pursue additional credentials as opportunities arise.
          </p>
        </div>
      </section>

      <section className="py-14 px-4 bg-secondary/10 border-y border-primary/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert) => (
              <CertificationCard
                key={cert.title}
                title={cert.title}
                issuer={cert.issuer}
                year={cert.year}
                note={cert.note}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs italic text-foreground/50">
            Certifications depicted may reflect the position of the Mostlysterile team rather than that of the issuing body. No affiliation with any named institution is claimed beyond what is indicated on the certificates themselves.
          </p>
        </div>
      </section>
    </>
  )
}
