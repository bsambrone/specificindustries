"use client"

import { useState, useRef, type FormEvent } from "react"
import { Hero } from "@/components/ui/hero"
import { WaxSealCTA } from "@/sites/sovereignwellness/components/WaxSealCTA"

export const metadata = {
  title: "Correspondence — Sovereign Wellness Co.",
  description: "A considered exchange. We read plaintext inquiries on the third Tuesday of each calendar month.",
}

const DISPATCH_MESSAGES = [
  "Your dispatch has been received. We will read it aloud on the third Tuesday.",
  "Mr. Callaghan has noted your inquiry. He is unhurried.",
  "Filed under VII-B. Expected response: 7 to 11 weeks.",
  "Your words have been transcribed in ink. The ink is drying.",
  "Inquiry placed in the queue. You are number LXXVII.",
  "The Archive has acknowledged you. In its way.",
  "Received at the side door. Do not knock a second time.",
  "Mr. Marsh will consult. We will not rush him.",
  "Your dispatch is now at rest. It will be woken, in time.",
]

export default function SovereignWellnessContact() {
  const [toast, setToast] = useState<string | null>(null)
  const timeoutRef = useRef<number | null>(null)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const message = DISPATCH_MESSAGES[Math.floor(Math.random() * DISPATCH_MESSAGES.length)]
    setToast(message)
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    timeoutRef.current = window.setTimeout(() => setToast(null), 5000)
  }

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

          <form onSubmit={handleSubmit} className="space-y-5">
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

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-md bg-primary text-secondary px-6 py-4 shadow-lg border-2 border-[#4A1414] font-heading italic"
        >
          {toast}
        </div>
      )}
    </>
  )
}
