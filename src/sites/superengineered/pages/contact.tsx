import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "Contact — Superengineered",
  description: "Reach Superengineered support, enterprise, or press.",
}

export default function SuperengineeredContact() {
  return (
    <main className="bg-background py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <p className="text-sm font-medium uppercase tracking-widest text-primary/60 mb-4 text-center">
          Contact
        </p>
        <h1 className="text-4xl md:text-5xl font-heading font-light text-primary mb-12 text-center">
          We are here to receive your ticket.
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="font-medium text-primary mb-2">Customer Support</h2>
            <p className="text-sm text-primary/70 mb-2">Mon–Fri, 9am–5pm PT</p>
            <a href="mailto:support@superengineered.example" className="text-accent hover:underline text-sm">
              support@superengineered.example
            </a>
          </div>
          <div>
            <h2 className="font-medium text-primary mb-2">Enterprise Sales</h2>
            <p className="text-sm text-primary/70 mb-2">For orders of 50+ units</p>
            <a href="mailto:enterprise@superengineered.example" className="text-accent hover:underline text-sm">
              enterprise@superengineered.example
            </a>
          </div>
          <div>
            <h2 className="font-medium text-primary mb-2">Press</h2>
            <p className="text-sm text-primary/70 mb-2">Embargoed inquiries welcome</p>
            <a href="mailto:press@superengineered.example" className="text-accent hover:underline text-sm">
              press@superengineered.example
            </a>
          </div>
        </div>
        <div className="mt-20 pt-10 border-t border-primary/10 text-center text-sm text-primary/60">
          <p>Superengineered, Inc.</p>
          <p>1 Founders Way, Palo Alto, CA 94301</p>
          <p className="mt-2">All inquiries logged and retained per our Trust Policy.</p>
        </div>
      </div>
    </main>
  )
}
