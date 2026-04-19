"use client"

import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/components/commerce/cart-provider"
import { getProductBySlug } from "../data/products"
import { useSiteLink } from "@/hooks/use-site-link"

const HANDLING_FEE = 4.99

export default function TheTheoryIsRealCart() {
  const { cart, removeFromCart, updateQuantity } = useCart()
  const siteHref = useSiteLink()

  const cartItems = cart
    .map((item) => {
      const product = getProductBySlug(item.slug)
      if (!product || product.price === null) return null
      return { ...item, product, unitPrice: product.price }
    })
    .filter(Boolean) as Array<{ slug: string; quantity: number; product: NonNullable<ReturnType<typeof getProductBySlug>>; unitPrice: number }>

  const subtotal = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
  const total = subtotal + HANDLING_FEE

  if (cartItems.length === 0) {
    return (
      <section className="py-20 px-4 text-center">
        <div className="max-w-lg mx-auto">
          <h1 className="text-4xl font-heading font-bold text-primary mb-4">Intake Manifest</h1>
          <p className="mb-8" style={{ color: "var(--color-muted, #7a8c7a)" }}>
            No items acquired. The gear is in the shop.
          </p>
          <Link
            href={siteHref("/shop")}
            className="inline-block px-8 py-3 rounded-md font-semibold text-white hover:opacity-90 transition-opacity"
            style={{ background: "var(--color-primary, #4a9c6d)" }}
          >
            ← Return to outfitter
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-heading font-bold text-primary mb-8">Intake Manifest</h1>

        <div style={{ borderColor: "var(--color-border, #2a2e2a)" }} className="divide-y">
          {cartItems.map(({ slug, quantity, product, unitPrice }) => (
            <div key={slug} className="py-6 flex gap-4 items-center">
              <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0" style={{ background: "var(--color-surface-alt, #0f1014)" }}>
                <Image src={product.image} alt={product.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <Link
                  href={siteHref(`/shop/${slug}`)}
                  className="font-heading font-semibold hover:underline"
                  style={{ color: "var(--color-primary, #4a9c6d)" }}
                >
                  {product.name}
                </Link>
                <p className="text-sm" style={{ color: "var(--color-muted, #7a8c7a)" }}>{product.priceLabel}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(slug, quantity - 1)}
                  className="w-8 h-8 rounded border flex items-center justify-center hover:opacity-70 transition-opacity"
                  style={{ borderColor: "var(--color-border, #2a2e2a)", color: "var(--color-muted, #7a8c7a)" }}
                >
                  -
                </button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => updateQuantity(slug, quantity + 1)}
                  className="w-8 h-8 rounded border flex items-center justify-center hover:opacity-70 transition-opacity"
                  style={{ borderColor: "var(--color-border, #2a2e2a)", color: "var(--color-muted, #7a8c7a)" }}
                >
                  +
                </button>
              </div>
              <div className="w-24 text-right font-semibold text-foreground">
                ${(unitPrice * quantity).toFixed(2)}
              </div>
              <button
                onClick={() => removeFromCart(slug)}
                className="ml-2 hover:opacity-70 transition-opacity"
                aria-label="Remove"
                style={{ color: "var(--color-muted, #7a8c7a)" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t" style={{ borderColor: "var(--color-border, #2a2e2a)" }}>
          <div className="max-w-xs ml-auto space-y-2">
            <div className="flex justify-between" style={{ color: "var(--color-muted, #7a8c7a)" }}>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between" style={{ color: "var(--color-muted, #7a8c7a)" }}>
              <span>Unmarked packaging fee</span>
              <span>${HANDLING_FEE.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-foreground border-t pt-2 mt-2" style={{ borderColor: "var(--color-border, #2a2e2a)" }}>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-8 text-right">
            <Link
              href={siteHref("/checkout")}
              className="inline-block px-8 py-3 rounded-md font-semibold text-white hover:opacity-90 transition-opacity"
              style={{ background: "var(--color-primary, #4a9c6d)" }}
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
