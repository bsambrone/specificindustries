"use client"

import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/components/commerce/cart-provider"
import { getProductBySlug } from "@/sites/superengineered/data/products"
import { useSiteLink } from "@/hooks/use-site-link"

export const metadata = {
  title: "Your Cart — Super Engineered",
  description: "Review your Super Engineered hardware order. Subscriptions bill separately.",
}

const CLOUD_ACTIVATION_FEE = 49
const TAX_RATE = 0.0925

export default function SuperEngineeredCart() {
  const { cart, removeFromCart, updateQuantity } = useCart()
  const siteHref = useSiteLink()

  const cartItems = cart
    .map((item) => {
      const product = getProductBySlug(item.slug)
      return product ? { ...item, product } : null
    })
    .filter(Boolean) as Array<{ slug: string; quantity: number; product: NonNullable<ReturnType<typeof getProductBySlug>> }>

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.startingPrice * item.quantity, 0)
  const tax = subtotal * TAX_RATE
  const total = cartItems.length > 0 ? subtotal + CLOUD_ACTIVATION_FEE + tax : 0

  if (cartItems.length === 0) {
    return (
      <section className="py-20 px-4 text-center bg-background">
        <div className="max-w-lg mx-auto">
          <h1 className="text-5xl font-heading font-light tracking-tight text-primary mb-4">Your Cart</h1>
          <p className="text-primary/60 mb-8">
            Nothing selected. Every essential object is still unoptimized.
          </p>
          <Link
            href={siteHref("/shop")}
            className="inline-block px-8 py-3 rounded-full bg-accent text-white font-medium hover:opacity-90 transition-opacity"
          >
            Start Shopping
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-heading font-light tracking-tight text-primary mb-10">Your Cart</h1>

        <div className="divide-y divide-primary/10 border-y border-primary/10">
          {cartItems.map(({ slug, quantity, product }) => (
            <div key={slug} className="py-6 flex gap-4 items-center">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-secondary shrink-0">
                <Image src={product.heroImage} alt={product.name} fill className="object-contain p-2" />
              </div>
              <div className="flex-1">
                <Link href={siteHref(`/products/${slug}`)} className="font-heading text-lg text-primary hover:text-accent transition-colors">
                  {product.name}
                </Link>
                <p className="text-primary/60 text-sm mt-1">{product.tagline}</p>
                <p className="text-primary/50 text-xs mt-1">
                  + subscription required · from ${product.subscription.tiers[0].priceMonthly}/mo
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(slug, quantity - 1)}
                  className="w-8 h-8 rounded-full border border-primary/20 text-primary/60 hover:border-primary/60 flex items-center justify-center"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="w-8 text-center font-medium text-primary">{quantity}</span>
                <button
                  onClick={() => updateQuantity(slug, quantity + 1)}
                  className="w-8 h-8 rounded-full border border-primary/20 text-primary/60 hover:border-primary/60 flex items-center justify-center"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <div className="w-24 text-right font-semibold text-primary">
                ${(product.startingPrice * quantity).toFixed(2)}
              </div>
              <button
                onClick={() => removeFromCart(slug)}
                className="text-primary/40 hover:text-primary/70 ml-2"
                aria-label="Remove"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <div className="max-w-sm ml-auto space-y-2">
            <div className="flex justify-between text-primary/70">
              <span>Hardware Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-primary/70">
              <span>Cloud Activation Fee</span>
              <span>${CLOUD_ACTIVATION_FEE.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-primary/70">
              <span>Tax (9.25%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-semibold text-primary border-t border-primary/10 pt-3 mt-2">
              <span>Today&rsquo;s Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <p className="text-xs text-primary/50 mt-2 text-right">
              Monthly subscriptions billed separately after activation.
            </p>
          </div>
          <div className="mt-8 text-right">
            <Link
              href={siteHref("/checkout")}
              className="inline-block px-8 py-3 rounded-full bg-accent text-white font-medium hover:opacity-90 transition-opacity"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
