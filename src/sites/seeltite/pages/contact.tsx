import Image from "next/image"
import { Hero } from "@/components/ui/hero"
import { CautionStripe } from "../components/caution-stripe"

export const metadata = {
  title: "Contact — Seel-Tite Containment Systems",
  description: "Submit a Containment Inquiry, file a Field Incident Report, or request accessory compatibility guidance.",
}

export default function SeeltiteContact() {
  return (
    <>
      <Hero
        headline="Talk To Us"
        subheadline="Three channels. Every message answered by an engineer or a founder."
      />
      <CautionStripe text="Every Email · Answered In Person" />

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-start">
          <div className="relative aspect-square bg-secondary/10 border border-foreground/10">
            <Image src="/sites/seeltite/contact-workbench.png" alt="Rotary desk phone on an industrial workbench" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="space-y-8">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-primary mb-2 font-heading">General Toot Inquiry</p>
              <p className="text-foreground/80 mb-3 text-sm">Questions about the G1, the accessories, or which loadout fits your scenarios.</p>
              <p className="font-mono text-sm">inquiry@seeltite.example</p>
            </div>
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-primary mb-2 font-heading">Report a Gamble You Lost</p>
              <p className="text-foreground/80 mb-3 text-sm">Tell us about a deployment — prevention or recovery — for possible inclusion in the Field Reports program. We redact as much or as little as you want.</p>
              <p className="font-mono text-sm">reports@seeltite.example</p>
            </div>
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-primary mb-2 font-heading">Accessory Compatibility Question</p>
              <p className="text-foreground/80 mb-3 text-sm">Port adapters, firmware revisions, accessory-chain configurations. These go to Marcus&apos;s desk.</p>
              <p className="font-mono text-sm">compatibility@seeltite.example</p>
            </div>
            <div className="pt-6 border-t border-foreground/10">
              <p className="text-xs tracking-[0.3em] uppercase text-primary mb-2 font-heading">Toll-Free (US)</p>
              <p className="text-2xl font-heading font-semibold">1-800-SEEL-TITE</p>
              <p className="text-xs text-foreground/50 mt-1 font-mono">(1-800-733-58483)</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 px-4 bg-secondary/5 border-t border-foreground/10">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[11px] text-foreground/40 font-mono">
            For all other inquiries: bsambrone@gmail.com
          </p>
        </div>
      </section>
    </>
  )
}
