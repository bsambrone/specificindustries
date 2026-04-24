"use client"

import Image from "next/image"
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { tiers, getTierBySlug } from "@/sites/carbonneutraloutrage/data/donate"
import { getProgramBySlug } from "@/sites/carbonneutraloutrage/data/programs"

export const metadata = {
  title: "Donate — Campaign for Sustainable Overreactions",
  description: "Every dollar offsets approximately 0.000004 tantrums. Six donation tiers, from Minor Kvetch to Patron of the Tempered Uprising.",
}

export default function DonatePage() {
  const searchParams = useSearchParams()
  const programSlug = searchParams.get("program")
  const earmarkProgram = programSlug ? getProgramBySlug(programSlug) : null

  const [selectedTier, setSelectedTier] = useState<string | null>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const tier = selectedTier ? getTierBySlug(selectedTier) : null

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 px-6 min-h-[340px]">
        <Image
          src="/sites/carbonneutraloutrage/donate.png"
          alt=""
          fill
          className="object-cover brightness-50"
          priority
          fetchPriority="high"
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-xs text-white/70 uppercase tracking-widest font-semibold mb-4">Support the Campaign</p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4 leading-tight">
            Every dollar offsets approximately 0.000004 tantrums.
          </h1>
          <p className="text-lg text-white/85 max-w-2xl mx-auto">
            {earmarkProgram
              ? `You are donating to ${earmarkProgram.displayName}. Choose a tier to continue.`
              : "Choose a tier below. Every contribution funds programs, methodology, and the regional cooperative network."}
          </p>
        </div>
      </section>

      {/* Tier grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tiers.map((t) => {
              const isSelected = selectedTier === t.slug
              return (
                <button
                  key={t.slug}
                  type="button"
                  onClick={() => setSelectedTier(t.slug)}
                  className={[
                    "text-left border rounded-lg p-6 transition-all",
                    isSelected
                      ? "border-primary bg-primary/5 ring-1 ring-primary/40"
                      : "border-accent/30 bg-white hover:border-primary/40",
                  ].join(" ")}
                >
                  <p className="text-xs text-secondary uppercase tracking-widest font-semibold mb-2">{t.name}</p>
                  <p className="text-4xl font-heading font-bold text-primary mb-3">{t.amountDisplay}</p>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    {earmarkProgram
                      ? `Funds ${earmarkProgram.displayName} — ${t.funds.toLowerCase()}.`
                      : t.funds}
                  </p>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Form */}
      {tier && !submitted && (
        <section className="py-16 px-6 bg-white border-t border-accent/20">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-heading font-bold text-primary text-center mb-2">Complete Your Donation</h2>
            <p className="text-center text-foreground/60 text-sm mb-8">
              {tier.name} — {tier.amountDisplay}
            </p>
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-foreground/80 font-medium mb-1" htmlFor="cso-donate-name">Name</label>
                <input
                  id="cso-donate-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-accent/30 rounded px-3 py-2 bg-background text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm text-foreground/80 font-medium mb-1" htmlFor="cso-donate-email">Email</label>
                <input
                  id="cso-donate-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-accent/30 rounded px-3 py-2 bg-background text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm text-foreground/80 font-medium mb-1" htmlFor="cso-donate-card">Card number</label>
                <input
                  id="cso-donate-card"
                  type="text"
                  required
                  inputMode="numeric"
                  placeholder="•••• •••• •••• ••••"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full border border-accent/30 rounded px-3 py-2 bg-background text-foreground"
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-primary text-background rounded font-semibold uppercase tracking-wider text-sm hover:opacity-90 transition-opacity"
              >
                Donate {tier.amountDisplay}
              </button>
              <p className="text-xs text-foreground/40 text-center italic mt-3">
                A digital certificate will be composted on your behalf upon successful processing.
              </p>
            </form>
          </div>
        </section>
      )}

      {/* Confirmation */}
      {tier && submitted && (
        <section className="py-16 px-6 bg-primary/5 border-t border-primary/20">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-heading font-bold text-primary mb-4">{tier.confirmationHeading}</h2>
            <p className="text-foreground/80 leading-relaxed mb-6 max-w-xl mx-auto">{tier.confirmationMessage}</p>
            <p className="text-sm text-foreground/60 italic mb-8">A digital certificate has been composted on your behalf.</p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false)
                setSelectedTier(null)
                setName("")
                setEmail("")
                setCardNumber("")
              }}
              className="px-6 py-2.5 border border-primary/40 text-primary rounded text-sm font-semibold uppercase tracking-wider hover:bg-primary/10 transition-colors"
            >
              Make Another Donation
            </button>
          </div>
        </section>
      )}

      {/* Real contact in small print */}
      <footer className="py-12 px-6 border-t border-accent/20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs text-foreground/40 leading-relaxed">
            The Campaign for Sustainable Overreactions is a 501(c)(3) tax-exempt nonprofit. Contributions are tax-deductible to the fullest extent allowed by law.
            Questions? Contact us at <a href="mailto:bsambrone@gmail.com" className="text-foreground/60 underline hover:text-primary transition-colors">bsambrone@gmail.com</a>.
          </p>
        </div>
      </footer>
    </div>
  )
}
