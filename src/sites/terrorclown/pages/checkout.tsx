"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { useCart } from "@/components/commerce/cart-provider"
import { getProductBySlug } from "../data/products"
import { useSiteLink } from "@/hooks/use-site-link"

const WHITE_GLOVE_FEE = 24.0

export default function TerrorClownCheckout() {
  const { cart, clearCart } = useCart()
  const siteHref = useSiteLink()
  const [placed, setPlaced] = useState(false)

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
  const total = subtotal + (cartItems.length > 0 ? WHITE_GLOVE_FEE : 0)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    clearCart()
    setPlaced(true)
  }

  if (placed) {
    return (
      <section className="py-20 px-4 text-center">
        <div className="max-w-lg mx-auto">
          <h1 className="text-4xl font-heading font-semibold mb-4" style={{ color: "var(--color-text, #1F1A17)" }}>
            Thank you.
          </h1>
          <p className="mb-6 text-lg" style={{ color: "var(--color-text, #1F1A17)", opacity: 0.8 }}>
            Your order has been logged at the Millbrook workshop. A hand-signed order confirmation will arrive by post within four to six weeks.
          </p>
          <p className="mb-8 text-sm italic" style={{ color: "var(--color-text, #1F1A17)", opacity: 0.6 }}>
            Your companion is being prepared.
          </p>
          <Link
            href={siteHref("/")}
            className="inline-block px-8 py-3 border-2 font-semibold"
            style={{ borderColor: "var(--color-primary, #A8352A)", color: "var(--color-primary, #A8352A)" }}
          >
            Return home
          </Link>
        </div>
      </section>
    )
  }

  if (cartItems.length === 0) {
    return (
      <section className="py-20 px-4 text-center">
        <div className="max-w-lg mx-auto">
          <h1 className="text-4xl font-heading font-semibold mb-4" style={{ color: "var(--color-text, #1F1A17)" }}>
            Nothing to order
          </h1>
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
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <h1 className="text-3xl font-heading font-semibold mb-2" style={{ color: "var(--color-text, #1F1A17)" }}>
            Shipping &amp; Delivery
          </h1>
          <p className="text-sm italic mb-4" style={{ color: "var(--color-text, #1F1A17)", opacity: 0.7 }}>
            Standard shipping is six to eight weeks. Professional installations are scheduled separately.
          </p>

          {[
            { label: "Full name", type: "text" },
            { label: "Street address", type: "text" },
            { label: "City", type: "text" },
            { label: "State", type: "text" },
            { label: "ZIP code", type: "text" },
            { label: "Telephone", type: "tel" },
            { label: "Email", type: "email" },
          ].map((field) => (
            <label key={field.label} className="flex flex-col gap-1 text-sm">
              <span className="uppercase tracking-[0.2em] text-xs" style={{ color: "var(--color-secondary, #3E6C6E)" }}>
                {field.label}
              </span>
              <input
                required
                type={field.type}
                className="px-4 py-3 border-2 text-base bg-transparent"
                style={{ borderColor: "var(--color-secondary, #3E6C6E)", color: "var(--color-text, #1F1A17)" }}
              />
            </label>
          ))}

          <button
            type="submit"
            className="mt-4 px-8 py-4 font-semibold text-white"
            style={{ background: "var(--color-primary, #A8352A)" }}
          >
            Place order &mdash; ${total.toFixed(2)}
          </button>
        </form>

        <aside className="border-2 p-6" style={{ borderColor: "var(--color-secondary, #3E6C6E)", background: "#FFFFFF40" }}>
          <h2 className="text-lg font-heading font-semibold mb-4" style={{ color: "var(--color-primary, #A8352A)" }}>
            Order summary
          </h2>
          <div className="flex flex-col gap-3 text-sm mb-5" style={{ color: "var(--color-text, #1F1A17)" }}>
            {cartItems.map(({ slug, quantity, product, unitPrice }) => (
              <div key={slug} className="flex justify-between">
                <span>{product.name} &times; {quantity}</span>
                <span>${(unitPrice * quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="space-y-1 text-sm border-t pt-3" style={{ borderColor: "var(--color-secondary, #3E6C6E)", color: "var(--color-text, #1F1A17)" }}>
            <div className="flex justify-between opacity-80">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between opacity-80">
              <span>White-glove handling</span>
              <span>${WHITE_GLOVE_FEE.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold pt-2 mt-2 border-t" style={{ borderColor: "var(--color-secondary, #3E6C6E)" }}>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
