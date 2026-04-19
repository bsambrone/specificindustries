"use client"

import { useState } from "react"
import Link from "next/link"
import { useCart } from "@/components/commerce/cart-provider"
import { getProductBySlug } from "@/sites/petjacks/data/products"
import { useSiteLink } from "@/hooks/use-site-link"
import LegalFooter from "@/sites/petjacks/components/legal-footer"

const LAUNCH_PREP_FEE = 12.00
const OHIO_TAX_RATE = 0.0575

export default function PetjacksCheckout() {
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
  const ohioTax = subtotal * OHIO_TAX_RATE
  const total = subtotal + LAUNCH_PREP_FEE + ohioTax

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    clearCart()
  }

  if (submitted) {
    return (
      <>
        <section className="py-20 px-4 text-center">
          <div className="max-w-lg mx-auto">
            <h1 className="text-4xl font-heading font-bold text-primary mb-4">Order Received</h1>
            <p className="text-foreground/70 mb-3 leading-relaxed">
              Thank you! Your Petjacks order has been received and is being prepared with care at our Ohio facility.
            </p>
            <p className="text-foreground/70 mb-8 leading-relaxed text-sm">
              A Liability Waiver Bundle will accompany your shipment. Please complete one form per launch.
            </p>
            <Link href={siteHref("/")} className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity">
              Return Home
            </Link>
          </div>
        </section>
        <LegalFooter />
      </>
    )
  }

  return (
    <>
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-heading font-bold text-foreground mb-8">Launch Prep</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Name</label>
                <input required type="text" className="w-full px-4 py-3 border border-accent/30 rounded-lg bg-background focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Email</label>
                <input required type="email" className="w-full px-4 py-3 border border-accent/30 rounded-lg bg-background focus:outline-none focus:border-primary" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">Shipping Address</label>
              <input required type="text" className="w-full px-4 py-3 border border-accent/30 rounded-lg bg-background focus:outline-none focus:border-primary" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">City</label>
                <input required type="text" className="w-full px-4 py-3 border border-accent/30 rounded-lg bg-background focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">ZIP</label>
                <input required type="text" className="w-full px-4 py-3 border border-accent/30 rounded-lg bg-background focus:outline-none focus:border-primary" />
              </div>
            </div>

            <div className="mt-8 p-5 bg-secondary/30 rounded-lg">
              <p className="text-sm uppercase tracking-widest text-accent mb-3">Order Summary</p>
              <div className="space-y-1 text-sm text-foreground/70">
                {cartItems.map((item) => (
                  <div key={item.slug} className="flex justify-between">
                    <span>{item.product.name} &times; {item.quantity}</span>
                    <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="flex justify-between"><span>Launch Prep Fee</span><span>${LAUNCH_PREP_FEE.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Ohio Tax</span><span>${ohioTax.toFixed(2)}</span></div>
                <div className="flex justify-between font-bold text-foreground border-t border-foreground/10 pt-2 mt-2 text-base"><span>Total</span><span>${total.toFixed(2)}</span></div>
              </div>
            </div>

            <button type="submit" className="w-full px-8 py-4 bg-primary text-white rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity">
              Complete Order
            </button>
          </form>
        </div>
      </section>
      <LegalFooter />
    </>
  )
}
