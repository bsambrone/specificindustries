"use client"

import { Hero } from "@/components/ui/hero"
import { WaxSealCTA } from "@/sites/sovereignwellness/components/WaxSealCTA"

export const metadata = {
  title: "Correspondence — Sovereign Wellness Co.",
  description: "A considered exchange. We read plaintext inquiries on the third Tuesday of each calendar month.",
}

export default function SovereignWellnessContact() {
  return (
    <>
      <Hero
        headline="Correspondence"
        subheadline="A considered exchange. We read plaintext inquiries on the third Tuesday of each calendar month, in chronological order, by hand, aloud, in a single sitting. We reply when moved to."
      />

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-secondary/40 border border-primary/30 p-8 mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-primary/70 mb-3">A Brief Note on Communication</p>
            <ul className="space-y-3 text-foreground/80 leading-relaxed list-disc list-inside">
              <li>We do not answer the telephone.</li>
              <li>We do not answer the telephone during Mercury retrograde with particular firmness.</li>
              <li>We do not maintain a presence on any platform labeled &ldquo;social.&rdquo;</li>
              <li>Inquiries regarding the Protocols are read by Mr. Callaghan, who takes his time.</li>
              <li>Inquiries regarding the Archive are read by Mr. Marsh, who takes even longer.</li>
            </ul>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
            <div>
              <label className="block text-xs tracking-[0.3em] uppercase text-primary/70 mb-2">Your preferred hand</label>
              <select className="w-full bg-transparent border border-primary/30 px-4 py-3 focus:border-primary focus:outline-none">
                <option>Right</option>
                <option>Left</option>
                <option>Ambidextrous — complicated</option>
                <option>I decline to answer</option>
              </select>
            </div>

            <div>
              <label className="block text-xs tracking-[0.3em] uppercase text-primary/70 mb-2">Your first-grade teacher&apos;s name</label>
              <input type="text" className="w-full bg-transparent border border-primary/30 px-4 py-3 focus:border-primary focus:outline-none" />
            </div>

            <div>
              <label className="block text-xs tracking-[0.3em] uppercase text-primary/70 mb-2">Astrological birth chart (compressed form acceptable)</label>
              <input type="text" placeholder="e.g., Virgo sun, Capricorn rising" className="w-full bg-transparent border border-primary/30 px-4 py-3 focus:border-primary focus:outline-none" />
            </div>

            <div>
              <label className="block text-xs tracking-[0.3em] uppercase text-primary/70 mb-2">A postal address at which you do not mind being found</label>
              <input type="text" className="w-full bg-transparent border border-primary/30 px-4 py-3 focus:border-primary focus:outline-none" />
            </div>

            <div>
              <label className="block text-xs tracking-[0.3em] uppercase text-primary/70 mb-2">Nature of your affliction (avoid specifics)</label>
              <textarea rows={5} className="w-full bg-transparent border border-primary/30 px-4 py-3 focus:border-primary focus:outline-none resize-none" />
            </div>

            <div className="pt-4">
              <WaxSealCTA>Dispatch Your Inquiry</WaxSealCTA>
            </div>
          </form>

          <p className="mt-16 text-xs text-foreground/50 italic text-center">
            Urgent plaintext inquiries, should the foregoing form prove insufficient: <a href="mailto:bsambrone@gmail.com" className="underline hover:text-primary transition-colors">bsambrone@gmail.com</a>
          </p>
        </div>
      </section>
    </>
  )
}
