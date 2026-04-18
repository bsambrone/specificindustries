import Image from "next/image"
import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "Contact — Super Engineered",
  description: "Reach Super Engineered support, enterprise, or press.",
}

const channels = [
  {
    heading: "Customer Support",
    availability: "Mon–Fri, 9am–5pm PT",
    email: "support@superengineered.co",
  },
  {
    heading: "Enterprise Sales",
    availability: "For orders of 50+ units",
    email: "enterprise@superengineered.co",
  },
  {
    heading: "Press",
    availability: "Embargoed inquiries welcome",
    email: "press@superengineered.co",
  },
]

export default function SuperEngineeredContact() {
  return (
    <main className="bg-background">
      <section className="relative h-[360px] md:h-[440px] bg-secondary overflow-hidden">
        <Image
          src="/sites/superengineered/contact-hero.png"
          alt="Super Engineered headquarters at dusk"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 pb-12 px-4 text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary/70 mb-3">
            Contact
          </p>
          <h1 className="text-4xl md:text-6xl font-heading font-light text-primary">
            We are here to receive your ticket.
          </h1>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {channels.map((ch) => (
              <div key={ch.heading} className="text-center md:text-left">
                <h2 className="font-heading text-xl text-primary mb-2">{ch.heading}</h2>
                <p className="text-sm text-primary/60 mb-3">{ch.availability}</p>
                <a
                  href={`mailto:${ch.email}`}
                  className="text-accent hover:underline text-base break-all"
                >
                  {ch.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-16 px-4">
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div>
            <p className="text-xs uppercase tracking-widest text-primary/60 mb-2">HQ</p>
            <p className="text-primary">1 Founders Way</p>
            <p className="text-primary">Palo Alto, CA 94301</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-primary/60 mb-2">Legal Entity</p>
            <p className="text-primary">Super Engineered, Inc.</p>
            <p className="text-primary/60 text-sm">Delaware C-corp</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-primary/60 mb-2">Data Handling</p>
            <p className="text-primary/70 text-sm">All inquiries logged and retained per our Trust Policy.</p>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs text-primary/40 italic">
            Should the above channels prove insufficient, a plaintext reply may be addressed to{" "}
            <a href="mailto:bsambrone@gmail.com" className="underline hover:text-primary transition-colors">
              bsambrone@gmail.com
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  )
}
