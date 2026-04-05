"use client"

import { useState } from "react"
import Link from "next/link"
import { useCart } from "@/components/commerce/cart-provider"
import { getShareBySlug } from "@/sites/grassfedwifi/data/shares"
import { useSiteLink } from "@/hooks/use-site-link"

const COMMITTEE_REVIEW_FEE = 4.99
const CO_OP_DUES_RATE = 0.03

export const metadata = {
  title: "Become a Member — Grass Fed WiFi",
  description: "Submit your share allocation to the co-op committee.",
}

export default function BecomeAMember() {
  const { cart, clearCart } = useCart()
  const siteHref = useSiteLink()
  const [submitted, setSubmitted] = useState(false)

  const cartItems = cart
    .map((item) => {
      const share = getShareBySlug(item.slug)
      return share ? { ...item, share } : null
    })
    .filter(Boolean) as Array<{ slug: string; quantity: number; share: NonNullable<ReturnType<typeof getShareBySlug>> }>

  const subtotal = cartItems.reduce((sum, item) => sum + item.share.price * item.quantity, 0)
  const dues = subtotal * CO_OP_DUES_RATE
  const total = subtotal + COMMITTEE_REVIEW_FEE + dues

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    clearCart()
  }

  if (submitted) {
    return (
      <section className="py-20 px-4 text-center">
        <div className="max-w-xl mx-auto">
          <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
            Your Application Has Been Filed
          </h1>
          <p className="text-foreground/80 mb-4">
            The committee will review your allocation request at its next weekly meeting. Fennel will
            enter your share into the ledger upon approval.
          </p>
          <p className="text-foreground/60 mb-8">
            Please do not follow up. The committee does not accept follow-ups.
          </p>
          <Link
            href={siteHref("/")}
            className="inline-block px-8 py-3 bg-primary text-background rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Return Home
          </Link>
        </div>
      </section>
    )
  }

  if (cartItems.length === 0) {
    return (
      <section className="py-20 px-4 text-center">
        <div className="max-w-lg mx-auto">
          <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
            No Share Selected
          </h1>
          <p className="text-foreground/70 mb-8">
            Begin by adding a share to your basket.
          </p>
          <Link
            href={siteHref("/shares")}
            className="inline-block px-8 py-3 bg-primary text-background rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Browse Shares
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-heading font-bold text-foreground mb-2">Become a Member</h1>
        <p className="text-foreground/60 mb-10">
          The committee reviews new memberships weekly. Please provide the information below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              required
              className="w-full px-4 py-3 bg-background border border-primary/20 rounded-lg focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-semibold text-foreground mb-2">
              Postal Address
            </label>
            <input
              id="address"
              type="text"
              required
              autoComplete="street-address"
              className="w-full px-4 py-3 bg-background border border-primary/20 rounded-lg focus:border-primary focus:outline-none"
            />
            <p className="text-xs text-foreground/50 mt-1">
              The committee corresponds by letter. Please provide a physical mailing address.
            </p>
          </div>
          <div>
            <label htmlFor="intent" className="block text-sm font-semibold text-foreground mb-2">
              Why do you seek co-op membership?
            </label>
            <textarea
              id="intent"
              rows={4}
              className="w-full px-4 py-3 bg-background border border-primary/20 rounded-lg focus:border-primary focus:outline-none"
              placeholder="Written in your own hand. The committee reads every answer."
            />
          </div>

          <div className="bg-secondary/10 rounded-lg p-6">
            <h2 className="text-lg font-heading font-bold text-foreground mb-4">Order Summary</h2>
            {cartItems.map(({ slug, quantity, share }) => (
              <div key={slug} className="flex justify-between py-2 text-foreground/80">
                <span>{share.name} &times; {quantity}</span>
                <span>${(share.price * quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t border-primary/10 mt-3 pt-3 space-y-1 text-sm text-foreground/70">
              <div className="flex justify-between"><span>Committee Review Fee</span><span>${COMMITTEE_REVIEW_FEE.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Co-op Dues (3.0%)</span><span>${dues.toFixed(2)}</span></div>
              <div className="flex justify-between text-lg font-bold text-foreground pt-2 border-t border-primary/10 mt-2">
                <span>Total</span><span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-8 py-4 bg-primary text-background rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity"
          >
            Submit to Committee
          </button>
          <p className="text-xs text-foreground/40 text-center">
            Committee review typically completes within seven days. Do not follow up.
          </p>
        </form>
      </div>
    </section>
  )
}
