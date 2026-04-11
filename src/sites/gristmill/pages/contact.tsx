import { Hero } from "@/components/ui/hero"
import type { PageMetadata } from "@/themes"
import { ContactForm } from "./contact-form"

export const metadata: PageMetadata = {
  title: "Contact — Gristmill Partners",
  description:
    "Begin an engagement with Gristmill Partners. A member of our Workforce Stabilization Team will contact you within three to five business quarters.",
}

interface Office {
  title: string
  city: string
  address: string
  note: string
}

const offices: Office[] = [
  {
    title: "Founding Office",
    city: "Youngstown, Ohio",
    address: "1 Gristmill Way, Youngstown OH 44503",
    note: "In continuous operation since 1962.",
  },
  {
    title: "Regional Office",
    city: "Pittsburgh, Pennsylvania",
    address: "247 Slag Street, Pittsburgh PA 15219",
    note: "Opened 1974.",
  },
  {
    title: "Executive Office",
    city: "Stamford, Connecticut",
    address: "1600 Ledger Lane, Stamford CT 06902",
    note: "Opened 1989.",
  },
]

export default function ContactPage() {
  return (
    <div className="bg-background text-foreground">
      <Hero
        headline="Begin an Engagement"
        subheadline="A member of our Workforce Stabilization Team will contact you within three to five business quarters."
        image="/sites/gristmill/contact-hero.png"
      />

      <section className="mx-auto max-w-2xl px-6 py-16">
        <ContactForm />
      </section>

      <section className="border-t-2 border-secondary/20 bg-secondary/5 py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-10 text-center text-2xl font-heading font-bold text-secondary">
            Our Offices
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {offices.map((office) => (
              <div
                key={office.title}
                className="rounded border-2 border-secondary/20 bg-background p-6 text-center"
              >
                <div className="mb-2 text-xs uppercase tracking-widest text-primary">
                  {office.title}
                </div>
                <h3 className="mb-3 text-lg font-heading font-bold text-secondary">
                  {office.city}
                </h3>
                <p className="mb-3 text-sm">{office.address}</p>
                <p className="text-xs italic text-foreground/70">{office.note}</p>
              </div>
            ))}
          </div>
          <p className="mt-12 text-center font-heading text-lg text-secondary">
            Switchboard: 1-800-GRISTMILL
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-12">
        <p className="text-center text-xs text-foreground/60">
          Direct inquiries to the founder may be addressed to bsambrone@gmail.com.
        </p>
      </section>
    </div>
  )
}
