"use client"

import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/components/commerce/cart-provider"
import { getProductBySlug } from "@/sites/squaredaway/data/products"
import { useSiteLink } from "@/hooks/use-site-link"

const PROCESSING_FEE = 6.99
const MORALE_SURCHARGE_RATE = 0.018

export default function SquaredAwayCart() {
  const { cart, removeFromCart, updateQuantity } = useCart()
  const siteHref = useSiteLink()

  const cartItems = cart
    .map((item) => {
      const product = getProductBySlug(item.slug)
      return product ? { ...item, product } : null
    })
    .filter(Boolean) as Array<{
    slug: string
    quantity: number
    product: NonNullable<ReturnType<typeof getProductBySlug>>
  }>

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const moraleSurcharge = subtotal * MORALE_SURCHARGE_RATE
  const total = subtotal + PROCESSING_FEE + moraleSurcharge

  if (cartItems.length === 0) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-lg mx-auto text-center border-2 border-primary/40 bg-background p-10">
          <p className="font-mono uppercase tracking-widest text-primary/70 text-xs mb-2">
            UNCLASSIFIED // FOUO
          </p>
          <h1 className="font-heading text-3xl md:text-4xl text-primary uppercase tracking-widest mb-4">
            Cart is Empty.
          </h1>
          <p className="text-foreground/80 text-sm mb-8">
            No items have been requisitioned. Your morale remains baseline.
          </p>
          <Link
            href={siteHref("/")}
            className="inline-block border-2 border-primary bg-primary text-background font-heading uppercase tracking-widest px-8 py-3 hover:bg-accent hover:border-accent transition-colors"
          >
            Return to the PX
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="py-14 px-4">
      <div className="max-w-4xl mx-auto">
        <p className="font-mono uppercase tracking-widest text-primary/70 text-xs mb-1">
          FORM SQR-LOG-7 · UNCLASSIFIED // FOUO
        </p>
        <h1 className="font-heading text-3xl md:text-4xl text-primary uppercase tracking-widest mb-8">
          Requisition Summary
        </h1>

        <div className="border-2 border-primary/40 bg-background divide-y-2 divide-primary/20">
          {cartItems.map(({ slug, quantity, product }) => (
            <div key={slug} className="py-5 px-5 flex gap-4 items-center">
              <div className="relative w-20 h-20 border-2 border-primary/30 bg-background shrink-0 overflow-hidden">
                <Image src={product.image} alt={product.name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <Link
                  href={siteHref(`/products/${slug}`)}
                  className="font-heading uppercase tracking-wide text-primary hover:text-accent text-sm md:text-base leading-tight"
                >
                  {product.name}
                </Link>
                <p className="font-mono text-xs uppercase text-primary/60 mt-0.5">
                  NSN {product.nsn} · {product.priceLabel}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(slug, quantity - 1)}
                  className="w-8 h-8 border-2 border-primary/40 text-primary hover:border-accent flex items-center justify-center"
                  aria-label="Decrease"
                >
                  −
                </button>
                <span className="w-8 text-center font-mono text-primary">{quantity}</span>
                <button
                  onClick={() => updateQuantity(slug, quantity + 1)}
                  className="w-8 h-8 border-2 border-primary/40 text-primary hover:border-accent flex items-center justify-center"
                  aria-label="Increase"
                >
                  +
                </button>
              </div>
              <div className="w-24 text-right font-mono font-semibold text-primary">
                ${(product.price * quantity).toFixed(2)}
              </div>
              <button
                onClick={() => removeFromCart(slug)}
                className="text-primary/40 hover:text-accent ml-2"
                aria-label="Remove"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 border-2 border-primary/40 bg-primary/5 p-6 font-mono">
          <div className="max-w-xs ml-auto space-y-2 text-sm">
            <div className="flex justify-between uppercase tracking-wide text-foreground/80">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between uppercase tracking-wide text-foreground/80">
              <span>Processing Fee</span>
              <span>${PROCESSING_FEE.toFixed(2)}</span>
            </div>
            <div className="flex justify-between uppercase tracking-wide text-foreground/80">
              <span>Morale Surcharge (1.8%)</span>
              <span>${moraleSurcharge.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold text-primary border-t-2 border-primary/40 pt-3 mt-3 uppercase tracking-wide">
              <span>Total Due</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-8 text-right">
            <Link
              href={siteHref("/checkout")}
              className="inline-block border-2 border-primary bg-primary text-background font-heading uppercase tracking-widest px-8 py-3 hover:bg-accent hover:border-accent transition-colors"
            >
              Route to Checkout
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
