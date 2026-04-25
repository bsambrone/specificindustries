"use client"

import { useState } from "react"
import Link from "next/link"
import { useCart } from "@/components/commerce/cart-provider"
import { getProductBySlug } from "@/sites/boomfun/data/products"
import { useSiteLink } from "@/hooks/use-site-link"

export default function BoomfunCheckout() {
  const { cart, clearCart } = useCart()
  const siteHref = useSiteLink()
  const [confirmed, setConfirmed] = useState(false)

  const cartItems = cart
    .map((item) => {
      const product = getProductBySlug(item.slug)
      return product ? { ...item, product } : null
    })
    .filter(Boolean) as Array<{ slug: string; quantity: number; product: NonNullable<ReturnType<typeof getProductBySlug>> }>

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  const handleConfirm = () => {
    setConfirmed(true)
  }

  const handleStartOver = () => {
    clearCart()
    setConfirmed(false)
  }

  if (confirmed) {
    return (
      <section className="py-20 px-4 text-center">
        <div className="max-w-lg mx-auto">
          <h1 className="text-4xl font-heading font-bold text-secondary mb-4">Ready to Send</h1>
          <p className="text-foreground/80 mb-8">
            Clip your order blank, enclose a check or money order (made out to Boom-Fun! Industries), and mail to Station Road, Toledo, Ohio. We will write you personally when your order ships.
          </p>
          <button
            onClick={handleStartOver}
            className="inline-block px-8 py-3 bg-secondary text-background rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Start a New Order Blank
          </button>
        </div>
      </section>
    )
  }

  if (cartItems.length === 0) {
    return (
      <section className="py-20 px-4 text-center">
        <div className="max-w-lg mx-auto">
          <h1 className="text-4xl font-heading font-bold text-secondary mb-4">MAILING INSTRUCTIONS</h1>
          <p className="text-foreground/70 mb-8">
            Your order blank is empty. Please return to the catalog and select a few items before proceeding to the mailing instructions.
          </p>
          <Link
            href={siteHref("/products")}
            className="inline-block px-8 py-3 bg-secondary text-background rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Return to the Catalog
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-heading font-bold text-secondary mb-4">MAILING INSTRUCTIONS</h1>
        <p className="text-foreground/80 mb-10">
          Thank you for your Boom-Fun! catalog order. Your order will be processed and shipped from our Toledo facility within twelve business days, arriving by Railway Express or United States Post Office at our discretion.
        </p>

        <h2 className="text-2xl font-heading font-bold text-secondary mb-4">Your Order</h2>
        <div className="divide-y divide-foreground/10 mb-8 border-t border-b border-foreground/10">
          {cartItems.map(({ slug, quantity, product }) => (
            <div key={slug} className="py-4 flex justify-between items-center">
              <div>
                <p className="font-heading font-semibold text-foreground">{product.name}</p>
                <p className="text-foreground/60 text-sm">Quantity: {quantity}</p>
              </div>
              <div className="font-semibold text-foreground">
                ${(product.price * quantity).toFixed(2)}
              </div>
            </div>
          ))}
          <div className="py-4 flex justify-between items-center font-bold text-foreground">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleConfirm}
            className="inline-block px-8 py-3 bg-secondary text-background rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Place Order (Ceremonially)
          </button>
        </div>
      </div>
    </section>
  )
}
