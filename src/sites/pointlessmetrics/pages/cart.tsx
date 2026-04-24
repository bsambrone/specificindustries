"use client"

import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/components/commerce/cart-provider"
import { getProductBySlug } from "@/sites/pointlessmetrics/data/products"
import { useSiteLink } from "@/hooks/use-site-link"

const METHODOLOGY_FEE = 12.00
const EPISTEMIC_TAX_RATE = 0.049

export const metadata = {
  title: "Your Cart — Institute for the Study of Pointless Metrics",
  description: "Review your ISPM instrument and credentialing order.",
}

export default function PointlessMetricsCart() {
  const { cart, removeFromCart, updateQuantity } = useCart()
  const siteHref = useSiteLink()

  const cartItems = cart
    .map((item) => {
      const product = getProductBySlug(item.slug)
      return product ? { ...item, product } : null
    })
    .filter(Boolean) as Array<{ slug: string; quantity: number; product: NonNullable<ReturnType<typeof getProductBySlug>> }>

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const epistemicTax = subtotal * EPISTEMIC_TAX_RATE
  const total = subtotal + METHODOLOGY_FEE + epistemicTax

  if (cartItems.length === 0) {
    return (
      <section className="py-20 px-4 text-center">
        <div className="max-w-lg mx-auto">
          <h1 className="font-heading text-4xl text-primary mb-4">Your Cart</h1>
          <p className="text-foreground/60 mb-8">
            Your cart contains no items. This is, ironically, one of the most measurable states in existence.
          </p>
          <Link
            href={siteHref("/shop")}
            className="inline-block px-8 py-3 bg-primary text-white font-semibold hover:opacity-90 transition-opacity"
          >
            Browse the Shop
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs uppercase tracking-[0.2em] text-secondary mb-2">Order Review</p>
        <h1 className="font-heading text-4xl text-primary mb-8">Your Cart</h1>

        {/* Cart Items */}
        <div className="divide-y divide-accent/30">
          {cartItems.map(({ slug, quantity, product }) => (
            <div key={slug} className="py-6 flex gap-4 items-center">
              <div className="relative w-20 h-20 overflow-hidden bg-accent/10 shrink-0">
                <Image src={product.image} alt={product.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <Link href={siteHref(`/products/${slug}`)} className="font-heading font-semibold text-primary hover:underline">
                  {product.name}
                </Link>
                <p className="text-foreground/60 text-sm">{product.designation}</p>
                <p className="text-foreground/60 text-sm">{product.priceLabel}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(slug, quantity - 1)}
                  className="w-8 h-8 border border-accent/40 text-foreground/60 hover:border-primary flex items-center justify-center"
                >
                  -
                </button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => updateQuantity(slug, quantity + 1)}
                  className="w-8 h-8 border border-accent/40 text-foreground/60 hover:border-primary flex items-center justify-center"
                >
                  +
                </button>
              </div>
              <div className="w-24 text-right font-semibold text-foreground">
                ${(product.price * quantity).toFixed(2)}
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

        {/* Order Summary */}
        <div className="mt-8 border-t border-accent/30 pt-8">
          <div className="max-w-xs ml-auto space-y-2">
            <div className="flex justify-between text-foreground/70">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-foreground/70">
              <span>Methodology Fee</span>
              <span>${METHODOLOGY_FEE.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-foreground/70">
              <span>Epistemic Tax (4.9%)</span>
              <span>${epistemicTax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-foreground border-t border-accent/30 pt-2 mt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <p className="text-xs text-foreground/50 max-w-xs ml-auto mt-2">
            The Epistemic Tax is levied on all purchases of instruments used to measure things that may not be measurable. Disclosure required by the Institute&apos;s internal committee.
          </p>
          <div className="mt-6 text-right">
            <Link
              href={siteHref("/checkout")}
              className="inline-block px-8 py-3 bg-primary text-white font-semibold hover:opacity-90 transition-opacity"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
