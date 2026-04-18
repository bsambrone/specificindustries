"use client"

import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/components/commerce/cart-provider"
import { getProductBySlug } from "@/sites/meh/data/products"
import { useSiteLink } from "@/hooks/use-site-link"

const SHIPPING = 8.0
const TAX_RATE = 0.0625

export default function MehCart() {
  const { cart, removeFromCart, updateQuantity } = useCart()
  const siteHref = useSiteLink()

  const items = cart
    .map((item) => {
      const p = getProductBySlug(item.slug)
      return p ? { ...item, product: p } : null
    })
    .filter(Boolean) as Array<{ slug: string; quantity: number; product: NonNullable<ReturnType<typeof getProductBySlug>> }>

  const subtotal = items.reduce((sum, it) => sum + it.product.price * it.quantity, 0)
  const tax = subtotal * TAX_RATE
  const total = subtotal + SHIPPING + tax

  if (items.length === 0) {
    return (
      <section className="py-20 px-4 text-center">
        <div className="max-w-lg mx-auto">
          <h1 className="text-4xl font-heading font-semibold text-primary mb-4">Your Cart</h1>
          <p className="text-foreground/70 mb-8 leading-relaxed">
            There is nothing in your cart yet. That is a reasonable state to be in.
          </p>
          <Link
            href={siteHref("/products")}
            className="inline-block px-10 py-3 border border-primary text-primary uppercase tracking-widest text-sm hover:bg-primary hover:text-background transition-colors"
          >
            Browse the catalog
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-heading font-semibold text-primary mb-10 tracking-tight">Your Cart</h1>

        <div className="divide-y divide-foreground/20 border-t border-foreground/20">
          {items.map(({ slug, quantity, product }) => (
            <div key={slug} className="py-6 flex gap-4 items-center">
              <div className="relative w-20 h-20 border border-foreground/20 shrink-0 bg-background/60">
                <Image src={product.image} alt={product.name} fill className="object-contain p-2" />
              </div>
              <div className="flex-1 min-w-0">
                <Link href={siteHref(`/products/${slug}`)} className="font-heading font-semibold text-primary hover:opacity-70 transition-opacity">
                  {product.name}
                </Link>
                <p className="text-foreground/60 text-sm italic truncate">{product.tagline}</p>
                <p className="text-foreground/70 text-sm mt-1">{product.priceLabel}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(slug, quantity - 1)}
                  className="w-8 h-8 border border-foreground/30 text-foreground/70 hover:border-primary flex items-center justify-center transition-colors"
                  aria-label="Decrease"
                >
                  −
                </button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => updateQuantity(slug, quantity + 1)}
                  className="w-8 h-8 border border-foreground/30 text-foreground/70 hover:border-primary flex items-center justify-center transition-colors"
                  aria-label="Increase"
                >
                  +
                </button>
              </div>
              <div className="w-24 text-right font-semibold text-primary tabular-nums">
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

        <div className="mt-10 border-t border-foreground/20 pt-10">
          <div className="max-w-xs ml-auto space-y-2 tabular-nums">
            <div className="flex justify-between text-foreground/70"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between text-foreground/70"><span>Shipping</span><span>${SHIPPING.toFixed(2)}</span></div>
            <div className="flex justify-between text-foreground/70"><span>Tax (6.25%)</span><span>${tax.toFixed(2)}</span></div>
            <div className="flex justify-between text-xl font-heading font-semibold text-primary border-t border-foreground/20 pt-2 mt-2"><span>Total</span><span>${total.toFixed(2)}</span></div>
          </div>
          <div className="mt-10 text-right">
            <Link
              href={siteHref("/checkout")}
              className="inline-block px-10 py-3 border border-primary text-primary uppercase tracking-widest text-sm hover:bg-primary hover:text-background transition-colors"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
