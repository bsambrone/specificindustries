"use client"

import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/components/commerce/cart-provider"
import { getShareBySlug } from "@/sites/grassfedwifi/data/shares"
import { useSiteLink } from "@/hooks/use-site-link"

const COMMITTEE_REVIEW_FEE = 4.99
const CO_OP_DUES_RATE = 0.03

export const metadata = {
  title: "My Share — Grass Fed WiFi",
  description: "Your pending co-op allocation.",
}

export default function MyShare() {
  const { cart, removeFromCart, updateQuantity } = useCart()
  const siteHref = useSiteLink()

  const cartItems = cart
    .map((item) => {
      const share = getShareBySlug(item.slug)
      return share ? { ...item, share } : null
    })
    .filter(Boolean) as Array<{ slug: string; quantity: number; share: NonNullable<ReturnType<typeof getShareBySlug>> }>

  const subtotal = cartItems.reduce((sum, item) => sum + item.share.price * item.quantity, 0)
  const dues = subtotal * CO_OP_DUES_RATE
  const total = subtotal + COMMITTEE_REVIEW_FEE + dues

  if (cartItems.length === 0) {
    return (
      <section className="py-20 px-4 text-center">
        <div className="max-w-lg mx-auto">
          <h1 className="text-4xl font-heading font-bold text-foreground mb-4">Your Share Basket</h1>
          <p className="text-foreground/70 mb-8">
            Your basket is empty. The committee has not yet seen your allocation request.
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
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-heading font-bold text-foreground mb-2">Your Share Basket</h1>
        <p className="text-foreground/60 mb-8">
          Review your allocation before sending it to the committee.
        </p>

        <div className="divide-y divide-primary/10">
          {cartItems.map(({ slug, quantity, share }) => (
            <div key={slug} className="py-6 flex gap-4 items-center">
              <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-secondary/20 shrink-0">
                <Image src={share.image} alt={share.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <Link href={siteHref(`/shares/${slug}`)} className="font-heading font-semibold text-primary hover:underline">
                  {share.name}
                </Link>
                <p className="text-foreground/60 text-sm">{share.priceLabel}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(slug, quantity - 1)}
                  className="w-8 h-8 rounded border border-primary/20 text-foreground/60 hover:border-primary/40 flex items-center justify-center"
                >
                  -
                </button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => updateQuantity(slug, quantity + 1)}
                  className="w-8 h-8 rounded border border-primary/20 text-foreground/60 hover:border-primary/40 flex items-center justify-center"
                >
                  +
                </button>
              </div>
              <div className="w-24 text-right font-semibold text-foreground">
                ${(share.price * quantity).toFixed(2)}
              </div>
              <button
                onClick={() => removeFromCart(slug)}
                className="text-foreground/40 hover:text-foreground/70 ml-2"
                aria-label="Remove"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-primary/10 pt-8">
          <div className="max-w-xs ml-auto space-y-2">
            <div className="flex justify-between text-foreground/70">
              <span>Share Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-foreground/70">
              <span>Committee Review Fee</span>
              <span>${COMMITTEE_REVIEW_FEE.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-foreground/70">
              <span>Co-op Dues (3.0%)</span>
              <span>${dues.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-foreground border-t border-primary/10 pt-2 mt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <p className="text-xs text-foreground/40 mt-4 text-right">
            * Submitting this basket initiates the committee&apos;s review. Allocation is not guaranteed.
          </p>
          <div className="mt-8 text-right">
            <Link
              href={siteHref("/become-a-member")}
              className="inline-block px-8 py-3 bg-primary text-background rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Send to Committee
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
