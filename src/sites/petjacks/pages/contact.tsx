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

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">Name</label>
              <input type="text" className="w-full px-4 py-3 border border-accent/30 rounded-lg bg-background focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">Email</label>
              <input type="email" className="w-full px-4 py-3 border border-accent/30 rounded-lg bg-background focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">Pet Species</label>
              <select className="w-full px-4 py-3 border border-accent/30 rounded-lg bg-background focus:outline-none focus:border-primary">
                <option>Cat</option>
                <option>Dog</option>
                <option>Rabbit</option>
                <option>Fish</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">Message</label>
              <textarea rows={5} className="w-full px-4 py-3 border border-accent/30 rounded-lg bg-background focus:outline-none focus:border-primary" />
            </div>
            <button type="button" className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity">
              Send
            </button>
          </form>
        </div>
      </section>

      <LegalFooter />
    </>
  )
}
