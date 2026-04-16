import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "FAQ — Squared Away Supply Co.",
  description: "Frequently asked questions about the Official Unofficial Post Exchange.",
}

const FAQS: Array<{ q: string; a: string }> = [
  { q: "Do I need to salute my order confirmation?", a: "Only if the product was authorized by an O-4 or above." },
  { q: "Is this a real PX?", a: "Define 'real.'" },
  { q: "Can I use my GI Bill here?", a: "No. The GI Bill is for education. This is for morale." },
  { q: "Do you ship to FPO/APO addresses?", a: "Yes, eventually, probably, we promise." },
  { q: "Why is there now a Space Force section?", a: "Their NSN codes finally cleared security review. Guardians may shop here." },
  { q: "Can I return a product?", a: "You cannot return the years, but you may return the product." },
  { q: "Do you honor military discounts?", a: "We honor you. Prices are prices." },
  { q: "Is the crayon product safe to eat?", a: "It is safe to eat if you are a Marine. It is food-adjacent for all other personnel." },
  { q: "What is MIL-STD-SUCK?", a: "A standard. It is met." },
  { q: "Do officers get special treatment here?", a: "Yes. Their items ship in slightly nicer envelopes." },
  { q: "Why are Air Force items so expensive?", a: "Ask them." },
  { q: "Can my spouse shop here?", a: "Yes. Dependents are the backbone of morale." },
]

export default function FaqPage() {
  return (
    <>
      <section className="py-12 px-4 border-b-2 border-primary/30">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-mono uppercase tracking-widest text-primary/70 text-xs mb-2">FAQ · UNCLASSIFIED</p>
          <h1 className="font-heading text-4xl text-primary uppercase tracking-widest mb-3">Frequently Asked Questions</h1>
          <p className="text-foreground/80">
            Questions we&apos;re asked by customers, answered by people who do not read them.
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((f, i) => (
            <details
              key={i}
              className="border-2 border-primary/40 bg-background group open:bg-primary/5 transition-colors"
            >
              <summary className="cursor-pointer list-none px-4 py-3 font-heading uppercase tracking-wide text-primary flex items-center justify-between">
                <span>{f.q}</span>
                <span className="font-mono text-primary/60 group-open:rotate-45 transition-transform text-xl leading-none">+</span>
              </summary>
              <div className="px-4 pb-4 text-foreground/90">{f.a}</div>
            </details>
          ))}
        </div>
      </section>
    </>
  )
}
