import ContactForm from "@/sites/petjacks/components/contact-form"
import LegalFooter from "@/sites/petjacks/components/legal-footer"

export const metadata = {
  title: "Contact — Petjacks",
  description: "Reach the Petjacks team in Ohio. Customer care, flight academy enrollment, and media inquiries.",
}

export default function PetjacksContact() {
  return (
    <>
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-heading font-bold text-primary mb-3">Contact Petjacks</h1>
          <p className="text-lg text-foreground/70 mb-10">We&apos;d love to hear from you. Our small team responds to every message personally.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
            <div>
              <p className="text-xs uppercase tracking-widest text-accent mb-2">Visit</p>
              <p className="text-foreground font-semibold">Petjacks Propulsion, LLC</p>
              <p className="text-foreground/70">4200 Cloudrise Lane</p>
              <p className="text-foreground/70">Loveland, OH 45140</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-accent mb-2">Reach us</p>
              <p className="text-foreground">hello@petjacks.example</p>
              <p className="text-foreground/70">(513) 555-0182</p>
              <p className="text-foreground/70 mt-2 text-sm">Mon–Fri, 9am–5pm ET</p>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      <LegalFooter />
    </>
  )
}
