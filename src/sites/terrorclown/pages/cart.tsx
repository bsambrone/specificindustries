"use client"

import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/components/commerce/cart-provider"
import { getProductBySlug } from "../data/products"
import { useSiteLink } from "@/hooks/use-site-link"

const WHITE_GLOVE_FEE = 24.0

export default function TerrorClownCart() {
  const { cart, removeFromCart, updateQuantity } = useCart()
  const siteHref = useSiteLink()

  const cartItems = cart
    .map((item) => {
      const product = getProductBySlug(item.slug)
      if (!product) return null
      return { ...item, product, unitPrice: product.price }
    })
    .filter(Boolean) as Array<{
      slug: string
      quantity: number
      product: NonNullable<ReturnType<typeof getProductBySlug>>
      unitPrice: number
    }>

  const subtotal = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
  const total = subtotal + WHITE_GLOVE_FEE

  if (cartItems.length === 0) {
    return (
      <section className="py-20 px-4 text-center">
        <div className="max-w-lg mx-auto">
          <h1 className="text-4xl font-heading font-semibold mb-4" style={{ color: "var(--color-text, #1F1A17)" }}>
            Your Order Card
          </h1>
          <p className="mb-8" style={{ color: "var(--color-text, #1F1A17)", opacity: 0.7 }}>
            Your order card is empty.
          </p>
          <Link
            href={siteHref("/products")}
            className="inline-block px-8 py-3 font-semibold text-white"
            style={{ background: "var(--color-primary, #A8352A)" }}
          >
            Browse the catalog
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-heading font-semibold mb-8" style={{ color: "var(--color-text, #1F1A17)" }}>
          Your Order Card
        </h1>

        <div className="divide-y" style={{ borderColor: "var(--color-secondary, #3E6C6E)" }}>
          {cartItems.map(({ slug, quantity, product, unitPrice }) => (
            <div key={slug} className="py-6 flex gap-4 items-center">
              <div className="relative w-20 h-20 overflow-hidden shrink-0 border" style={{ background: "#FFFFFF60", borderColor: "var(--color-secondary, #3E6C6E)" }}>
                <Image src={product.image} alt={product.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <Link
                  href={siteHref(`/products/${slug}`)}
                  className="font-heading font-semibold hover:underline"
                  style={{ color: "var(--color-primary, #A8352A)" }}
                >
                  {product.name}
                </Link>
                <p className="text-sm" style={{ color: "var(--color-text, #1F1A17)", opacity: 0.7 }}>
                  {product.priceLabel}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(slug, quantity - 1)}
                  className="w-8 h-8 border flex items-center justify-center hover:opacity-70 transition-opacity"
                  style={{ borderColor: "var(--color-secondary, #3E6C6E)", color: "var(--color-text, #1F1A17)" }}
                >
                  -
                </button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => updateQuantity(slug, quantity + 1)}
                  className="w-8 h-8 border flex items-center justify-center hover:opacity-70 transition-opacity"
                  style={{ borderColor: "var(--color-secondary, #3E6C6E)", color: "var(--color-text, #1F1A17)" }}
                >
                  +
                </button>
              </div>
              <div className="w-24 text-right font-semibold" style={{ color: "var(--color-text, #1F1A17)" }}>
                ${(unitPrice * quantity).toFixed(2)}
              </div>
              <button
                onClick={() => removeFromCart(slug)}
                className="ml-2 hover:opacity-70 transition-opacity"
                aria-label="Remove"
                style={{ color: "var(--color-text, #1F1A17)", opacity: 0.6 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t" style={{ borderColor: "var(--color-secondary, #3E6C6E)" }}>
          <div className="max-w-xs ml-auto space-y-2">
            <div className="flex justify-between" style={{ color: "var(--color-text, #1F1A17)", opacity: 0.8 }}>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between" style={{ color: "var(--color-text, #1F1A17)", opacity: 0.8 }}>
              <span>White-glove handling</span>
              <span>${WHITE_GLOVE_FEE.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold border-t pt-2 mt-2" style={{ color: "var(--color-text, #1F1A17)", borderColor: "var(--color-secondary, #3E6C6E)" }}>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-8 text-right">
            <Link
              href={siteHref("/checkout")}
              className="inline-block px-8 py-3 font-semibold text-white"
              style={{ background: "var(--color-primary, #A8352A)" }}
            >
              Proceed to Checkout &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
