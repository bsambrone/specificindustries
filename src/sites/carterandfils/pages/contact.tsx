import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Contact — Domaine Carter & Fils",
  description: "Inquiries, tasting reservations, and private gatherings.",
}

export default function Contact() {
  return (
    <>
      <Hero
        headline="Contact the Estate"
        subheadline="We respond in the order inquiries are received, and with the thoughtfulness they deserve."
      />
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto space-y-10">

          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-primary/70 mb-2">Mailing</p>
            <p className="text-lg text-foreground/85 leading-relaxed">
              Domaine Carter &amp; Fils<br />
              1859 Old Shale Road<br />
              Titusville, Pennsylvania 16354
            </p>
          </div>

          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-primary/70 mb-2">Telephone</p>
            <p className="text-lg text-foreground/85">
              (814) 555-1859 &nbsp;·&nbsp; Tuesday–Sunday, 11:00 – 17:00
            </p>
          </div>

          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-primary/70 mb-2">Inquiries</p>
            <p className="text-lg text-foreground/85 leading-relaxed">
              For tasting reservations, please call. For press, distribution, and private-event inquiries, a letter is most welcome. We do not maintain an active customer-service email address, as we prefer the unhurried cadence of written correspondence.
            </p>
          </div>

          <form className="space-y-4 border-t border-accent/30 pt-10">
            <p className="text-xs tracking-[0.3em] uppercase text-primary/70 mb-4">Send us a note</p>
            <input type="text" placeholder="Your name" className="w-full px-4 py-3 border border-accent/40 bg-transparent text-foreground" />
            <input type="email" placeholder="Your email" className="w-full px-4 py-3 border border-accent/40 bg-transparent text-foreground" />
            <textarea placeholder="Your message" rows={6} className="w-full px-4 py-3 border border-accent/40 bg-transparent text-foreground resize-none" />
            <button type="submit" className="bg-primary text-secondary px-10 py-3 tracking-widest uppercase text-sm font-semibold hover:opacity-90 transition-opacity">
              Send
            </button>
          </form>

          <p className="text-xs text-foreground/40 pt-10 border-t border-accent/20">
            Administrative correspondence: <a href="mailto:bsambrone@gmail.com" className="underline hover:opacity-70 transition-opacity">bsambrone@gmail.com</a>
          </p>
        </div>
      </section>
    </>
  )
}
