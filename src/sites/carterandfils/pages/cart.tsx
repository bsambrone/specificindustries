"use client"

import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/components/commerce/cart-provider"
import { getProductBySlug } from "@/sites/carterandfils/data/products"
import { useSiteLink } from "@/hooks/use-site-link"

const SHIPPING_AND_HANDLING = 18.0
const EXCISE_RATE = 0.045

export default function CarterAndFilsCart() {
  const { cart, removeFromCart, updateQuantity } = useCart()
  const siteHref = useSiteLink()

  const cartItems = cart
    .map((item) => {
      const product = getProductBySlug(item.slug)
      return product ? { ...item, product } : null
    })
    .filter(Boolean) as Array<{ slug: string; quantity: number; product: NonNullable<ReturnType<typeof getProductBySlug>> }>

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const excise = subtotal * EXCISE_RATE
  const total = subtotal + SHIPPING_AND_HANDLING + excise

  if (cartItems.length === 0) {
    return (
      <section className="py-20 px-4 text-center">
        <div className="max-w-lg mx-auto">
          <h1 className="text-4xl font-heading font-semibold text-foreground mb-4">Your Cellar Selection</h1>
          <p className="text-foreground/70 mb-8">
            The cart awaits its first bottle. Browse the cellar at your leisure.
          </p>
          <Link
            href={siteHref("/cellar")}
            className="inline-block px-10 py-3 bg-primary text-secondary tracking-widest uppercase text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Explore the Cellar
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-heading font-semibold text-foreground mb-10">Your Cellar Selection</h1>

        <div className="divide-y divide-accent/30">
          {cartItems.map(({ slug, quantity, product }) => (
            <div key={slug} className="py-6 flex gap-4 items-center">
              <div className="relative w-20 h-24 bg-secondary/40 border border-accent/30 shrink-0">
                <Image src={product.image} alt={product.name} fill className="object-contain p-2" />
              </div>
              <div className="flex-1">
                <Link href={siteHref(`/cellar/${slug}`)} className="font-heading font-semibold text-foreground hover:text-primary transition-colors">
                  {product.name}
                </Link>
                <p className="text-foreground/60 text-sm italic">{product.tagline}</p>
                <p className="text-foreground/70 text-sm mt-1">{product.priceLabel}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(slug, quantity - 1)}
                  className="w-8 h-8 border border-primary/30 text-foreground/70 hover:border-primary flex items-center justify-center transition-colors"
                  aria-label="Decrease"
                >
                  −
                </button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => updateQuantity(slug, quantity + 1)}
                  className="w-8 h-8 border border-primary/30 text-foreground/70 hover:border-primary flex items-center justify-center transition-colors"
                  aria-label="Increase"
                >
                  +
                </button>
              </div>
              <div className="w-24 text-right font-semibold text-foreground">
                ${(product.price * quantity).toFixed(2)}
              </div>
              <button
                onClick={() => removeFromCart(slug)}
                className="text-foreground/40 hover:text-foreground/70 ml-2 transition-colors"
                aria-label="Remove"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-accent/30 pt-10">
          <div className="max-w-xs ml-auto space-y-2">
            <div className="flex justify-between text-foreground/70">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-foreground/70">
              <span>Shipping &amp; Handling</span>
              <span>${SHIPPING_AND_HANDLING.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-foreground/70">
              <span>Excise (4.5%)</span>
              <span>${excise.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-heading font-semibold text-foreground border-t border-accent/30 pt-2 mt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-10 text-right">
            <Link
              href={siteHref("/checkout")}
              className="inline-block px-10 py-3 bg-primary text-secondary tracking-widest uppercase text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
