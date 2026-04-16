"use client"

import { useState } from "react"
import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "Morale Program — Squared Away Supply Co.",
  description: "Enroll in the Squared Away Morale Program™. Earn Morale Points. Redeem the illusion of meaning.",
}

const TIERS = [
  { tier: "E-1 Private", points: 0, reward: 'A "Welcome to Morale" PDF.' },
  { tier: "E-5 Sergeant", points: 500, reward: "10% off your next brick." },
  { tier: "E-9 Command Sergeant Major", points: 2500, reward: "One free PowerPoint template." },
  { tier: "O-3 Captain", points: 5000, reward: "A laminated certificate of your own name." },
  { tier: "O-6 Colonel", points: 15000, reward: "Complimentary golf course keychain." },
  { tier: "O-10 General", points: 50000, reward: "The illusion of meaning (ships in 6–8 weeks)." },
]

const FAQ = [
  { q: "How do I earn Morale Points?", a: "By spending real money on products that produce no measurable morale." },
  { q: "Can I transfer points to my spouse?", a: "No. Morale is non-transferable. Spouses generate their own morale through complaints." },
  { q: "Do points expire?", a: "Yes. Points expire when you do." },
  { q: "Is this a real loyalty program?", a: "Define 'real.'" },
]

export default function MoralePage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  return (
    <>
      <section className="py-14 px-4 border-b-2 border-primary/30">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-mono uppercase tracking-widest text-primary/70 text-xs mb-2">MWR PROGRAM · NON-BINDING</p>
          <h1 className="font-heading text-4xl md:text-5xl text-primary uppercase tracking-widest mb-3">Morale Is a Metric.</h1>
          <p className="text-foreground/80">
            The Squared Away Morale Program™ converts your discretionary spending into quantified morale, denominated in
            Morale Points (MP). Points may be redeemed for tiered rewards of decreasing utility and increasing prestige.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 bg-primary/5 border-b-2 border-primary/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-2xl text-primary uppercase tracking-widest mb-6">Tiers of Morale</h2>
          <div className="border-2 border-primary/40 bg-background">
            <table className="w-full text-sm">
              <thead className="bg-primary text-background font-heading uppercase tracking-widest">
                <tr>
                  <th className="px-4 py-2 text-left">Tier</th>
                  <th className="px-4 py-2 text-left">Points</th>
                  <th className="px-4 py-2 text-left">Reward</th>
                </tr>
              </thead>
              <tbody>
                {TIERS.map((t, i) => (
                  <tr key={t.tier} className={i % 2 === 0 ? "" : "bg-primary/5"}>
                    <td className="px-4 py-2 font-mono uppercase tracking-wider">{t.tier}</td>
                    <td className="px-4 py-2 font-mono">{t.points.toLocaleString()} MP</td>
                    <td className="px-4 py-2">{t.reward}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-heading text-2xl text-primary uppercase tracking-widest mb-4">Initiate Morale</h2>
          {submitted ? (
            <div className="border-2 border-accent bg-accent/10 p-6">
              <p className="font-heading uppercase tracking-widest text-accent mb-1">Morale Pending Review</p>
              <p className="text-foreground/80 text-sm">
                Await further orders. An E-6 will review your enrollment during business hours.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setSubmitted(true)
              }}
              className="flex flex-col gap-3"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@mil"
                className="border-2 border-primary/40 bg-background px-4 py-2 font-mono focus:border-accent outline-none"
              />
              <button
                type="submit"
                className="border-2 border-primary bg-primary text-background font-heading uppercase tracking-widest px-6 py-3 hover:bg-accent hover:border-accent transition-colors"
              >
                Initiate Morale
              </button>
            </form>
          )}
        </div>
      </section>

      <section className="py-12 px-4 bg-primary/5 border-t-2 border-primary/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-2xl text-primary uppercase tracking-widest mb-5">Program FAQ</h2>
          <div className="space-y-5">
            {FAQ.map((f, i) => (
              <div key={i}>
                <p className="font-heading text-primary uppercase tracking-wide mb-1">{f.q}</p>
                <p className="text-foreground/80">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
