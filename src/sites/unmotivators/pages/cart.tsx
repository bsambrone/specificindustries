"use client"

import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/components/commerce/cart-provider"
import { getProductBySlug } from "@/sites/unmotivators/data/products"
import { useSiteLink } from "@/hooks/use-site-link"

const RESTOCKING_FEE = 14.00
const REGRET_TAX_RATE = 0.094

export default function UnmotivatorsCart() {
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
  const regretTax = subtotal * REGRET_TAX_RATE
  const total = subtotal + RESTOCKING_FEE + regretTax

  if (cartItems.length === 0) {
    return (
      <section className="py-20 px-4 text-center">
        <div className="max-w-lg mx-auto">
          <p className="font-mono text-xs uppercase tracking-widest text-foreground/60 mb-3">
            Your Cart
          </p>
          <h1 className="text-4xl font-heading font-bold uppercase tracking-tight text-foreground mb-4">
            Nothing yet.
          </h1>
          <p className="text-foreground/70 mb-8">
            Per last email, your cart is empty. This is a statement of fact.
          </p>
          <Link
            href={siteHref("/office")}
            className="inline-block px-6 py-3 bg-accent text-[#F5F3EE] font-heading uppercase tracking-wide hover:opacity-90 transition-opacity"
          >
            Browse the Office
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-widest text-foreground/60 mb-3">
          Order Summary
        </p>
        <h1 className="text-4xl font-heading font-bold uppercase tracking-tight text-foreground mb-10">
          Your Cart
        </h1>

        <div className="divide-y divide-foreground/15 border-y border-foreground/15">
          {cartItems.map(({ slug, quantity, product }) => (
            <div key={slug} className="py-6 flex gap-4 items-center">
              <div className="relative w-20 h-20 bg-secondary/40 shrink-0 border border-foreground/10">
                <Image src={product.image} alt={product.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <Link
                  href={siteHref(`/products/${slug}`)}
                  className="font-heading uppercase tracking-tight text-foreground hover:underline"
                >
                  {product.name}
                </Link>
                <p className="text-foreground/60 text-sm">{product.priceLabel}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(slug, quantity - 1)}
                  className="w-8 h-8 border border-foreground/30 text-foreground/70 hover:border-foreground flex items-center justify-center"
                >
                  −
                </button>
                <span className="w-8 text-center font-mono">{quantity}</span>
                <button
                  onClick={() => updateQuantity(slug, quantity + 1)}
                  className="w-8 h-8 border border-foreground/30 text-foreground/70 hover:border-foreground flex items-center justify-center"
                >
                  +
                </button>
              </div>
              <div className="w-28 text-right font-heading text-foreground">
                ${(product.price * quantity).toFixed(2)}
              </div>
              <button
                onClick={() => removeFromCart(slug)}
                className="text-foreground/40 hover:text-foreground ml-2"
                aria-label="Remove"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6">
          <div className="max-w-xs ml-auto space-y-2 font-mono text-sm">
            <div className="flex justify-between text-foreground/70">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-foreground/70">
              <span>Restocking Fee</span>
              <span>${RESTOCKING_FEE.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-foreground/70">
              <span>Regret Tax (9.4%)</span>
              <span>${regretTax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-heading text-foreground border-t border-foreground/30 pt-2 mt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-8 text-right">
            <Link
              href={siteHref("/checkout")}
              className="inline-block px-8 py-3 bg-accent text-[#F5F3EE] font-heading uppercase tracking-wide hover:opacity-90 transition-opacity"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
