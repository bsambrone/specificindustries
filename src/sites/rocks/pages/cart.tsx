"use client"

import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/components/commerce/cart-provider"
import { getProductBySlug } from "@/sites/rocks/data/products"
import { useSiteLink } from "@/hooks/use-site-link"

const TRANSACTION_COST = 4.99
const SETTLEMENT_FEE_RATE = 0.025

export default function RocksCart() {
  const { cart, removeFromCart, updateQuantity } = useCart()
  const siteHref = useSiteLink()

  const cartItems = cart
    .map((item) => {
      const product = getProductBySlug(item.slug)
      return product ? { ...item, product } : null
    })
    .filter(Boolean) as Array<{ slug: string; quantity: number; product: NonNullable<ReturnType<typeof getProductBySlug>> }>

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const settlementFee = subtotal * SETTLEMENT_FEE_RATE
  const total = subtotal + TRANSACTION_COST + settlementFee

  if (cartItems.length === 0) {
    return (
      <section className="py-20 px-4 text-center">
        <div className="max-w-lg mx-auto border border-primary/30 bg-secondary/20 p-10">
          <h1 className="text-3xl md:text-4xl font-heading font-semibold uppercase tracking-wide text-primary mb-4">
            YOUR POSITION IS UNFUNDED
          </h1>
          <p className="text-primary/60 text-sm uppercase tracking-wide mb-8">
            NO INSTRUMENTS HAVE BEEN ALLOCATED TO YOUR CART. EXPOSURE IS ZERO.
          </p>
          <Link
            href={siteHref("/products")}
            className="inline-block border-2 border-primary px-8 py-3 text-sm font-semibold uppercase tracking-wider text-primary hover:bg-primary hover:text-background transition-colors"
          >
            [ENTER MARKETS]
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="py-14 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-heading font-semibold uppercase tracking-wide text-primary mb-8">
          OPEN POSITION
          <span className="cursor-blink text-primary ml-1">▌</span>
        </h1>

        <div className="border border-primary/30 bg-secondary/20 divide-y divide-primary/20">
          {cartItems.map(({ slug, quantity, product }) => (
            <div key={slug} className="py-6 px-5 flex gap-4 items-center tabular-nums">
              <div className="relative w-20 h-20 border border-primary/30 bg-background shrink-0 overflow-hidden">
                <Image src={product.image} alt={product.name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <Link
                  href={siteHref(`/products/${slug}`)}
                  className="font-semibold uppercase tracking-wide text-primary hover:underline text-sm md:text-base"
                >
                  {product.ticker} · {product.name}
                </Link>
                <p className="text-primary/50 text-xs uppercase tracking-wide mt-0.5">SPOT {product.priceLabel}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(slug, quantity - 1)}
                  className="w-8 h-8 border border-primary/30 text-primary/70 hover:border-primary flex items-center justify-center"
                  aria-label="Decrease"
                >
                  −
                </button>
                <span className="w-8 text-center font-medium text-primary">{quantity}</span>
                <button
                  onClick={() => updateQuantity(slug, quantity + 1)}
                  className="w-8 h-8 border border-primary/30 text-primary/70 hover:border-primary flex items-center justify-center"
                  aria-label="Increase"
                >
                  +
                </button>
              </div>
              <div className="w-24 text-right font-semibold text-primary">
                ${(product.price * quantity).toFixed(2)}
              </div>
              <button
                onClick={() => removeFromCart(slug)}
                className="text-primary/40 hover:text-primary ml-2"
                aria-label="Remove"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 border border-primary/30 bg-secondary/20 p-6 tabular-nums">
          <div className="max-w-xs ml-auto space-y-2 text-sm">
            <div className="flex justify-between text-primary/70 uppercase tracking-wide">
              <span>SUBTOTAL</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-primary/70 uppercase tracking-wide">
              <span>TRANSACTION COST</span>
              <span>${TRANSACTION_COST.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-primary/70 uppercase tracking-wide">
              <span>SETTLEMENT FEE (2.5%)</span>
              <span>${settlementFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base md:text-lg font-bold text-primary border-t border-primary/30 pt-3 mt-3 uppercase tracking-wide">
              <span>TOTAL DUE</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-8 text-right">
            <Link
              href={siteHref("/checkout")}
              className="inline-block border-2 border-primary px-8 py-3 text-sm font-semibold uppercase tracking-wider text-primary hover:bg-primary hover:text-background transition-colors"
            >
              [INITIATE SETTLEMENT]
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
