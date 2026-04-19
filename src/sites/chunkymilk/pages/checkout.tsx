"use client"

import { useState } from "react"
import Link from "next/link"
import { useCart } from "@/components/commerce/cart-provider"
import { getProductBySlug } from "@/sites/chunkymilk/data/products"
import { useSiteLink } from "@/hooks/use-site-link"

const SADDLEBAG_FEE = 4.50
const HOLLOW_TAX_RATE = 0.041

export default function ChunkyMilkCheckout() {
  const { cart, clearCart } = useCart()
  const siteHref = useSiteLink()
  const [submitted, setSubmitted] = useState(false)

  const cartItems = cart
    .map((item) => {
      const product = getProductBySlug(item.slug)
      return product ? { ...item, product } : null
    })
    .filter(Boolean) as Array<{ slug: string; quantity: number; product: NonNullable<ReturnType<typeof getProductBySlug>> }>

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const hollowTax = subtotal * HOLLOW_TAX_RATE
  const total = subtotal + SADDLEBAG_FEE + hollowTax

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    clearCart()
  }

  if (submitted) {
    return (
      <section className="py-20 px-4 text-center">
        <div className="max-w-lg mx-auto">
          <h1 className="text-4xl font-heading font-bold text-primary mb-4">Order Received</h1>
          <p className="text-foreground/70 mb-3 leading-relaxed">
            Thank you. Bill has the letter. He will draw your jars in the morning.
          </p>
          <p className="text-sm text-foreground/60 mb-8 italic">
            Delivery is generally two to three weeks. It is not fast. It has never been fast.
          </p>
          <Link
            href={siteHref("/")}
            className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Back To The Hollow
          </Link>
        </div>
      </section>
    )
  }

  if (cartItems.length === 0) {
    return (
      <section className="py-20 px-4 text-center">
        <div className="max-w-lg mx-auto">
          <h1 className="text-4xl font-heading font-bold text-foreground mb-4">Nothing To Send</h1>
          <p className="text-foreground/60 mb-8">There are no jars in your cart. Browse the cellar first.</p>
          <Link
            href={siteHref("/products")}
            className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Browse The Cellar
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-heading font-bold text-foreground mb-8">Settlin&apos; Shed Checkout</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">Your Name</label>
            <input required type="text" className="w-full px-4 py-2 border border-accent/30 rounded-lg bg-background text-foreground" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">Email</label>
            <input required type="email" className="w-full px-4 py-2 border border-accent/30 rounded-lg bg-background text-foreground" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">Shipping Address</label>
            <textarea required rows={3} className="w-full px-4 py-2 border border-accent/30 rounded-lg bg-background text-foreground" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">Note To Bill <span className="text-foreground/50 font-normal">(optional)</span></label>
            <textarea rows={2} className="w-full px-4 py-2 border border-accent/30 rounded-lg bg-background text-foreground" placeholder="If this is for someone, say who." />
          </div>

          <div className="bg-secondary/30 border border-accent/20 rounded-lg p-4 space-y-1 text-foreground/70">
            <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Saddlebag Fee</span><span>${SADDLEBAG_FEE.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Hollow Tax (4.1%)</span><span>${hollowTax.toFixed(2)}</span></div>
            <div className="flex justify-between text-xl font-bold text-foreground border-t border-accent/30 pt-2 mt-2"><span>Total</span><span>${total.toFixed(2)}</span></div>
          </div>

          <button
            type="submit"
            className="w-full px-8 py-4 bg-primary text-white rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity"
          >
            Send The Order
          </button>

          <p className="text-xs text-foreground/50 text-center italic">
            No actual payment is processed. This is a satirical site in the Specific Industries portfolio.
          </p>
        </form>
      </div>
    </section>
  )
}
