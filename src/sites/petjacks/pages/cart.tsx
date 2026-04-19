"use client"

import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/components/commerce/cart-provider"
import { getProductBySlug } from "@/sites/petjacks/data/products"
import { useSiteLink } from "@/hooks/use-site-link"
import LegalFooter from "@/sites/petjacks/components/legal-footer"

const LAUNCH_PREP_FEE = 12.00
const OHIO_TAX_RATE = 0.0575

export default function PetjacksCart() {
  const { cart, removeFromCart, updateQuantity } = useCart()
  const siteHref = useSiteLink()

  const cartItems = cart
    .map((item) => {
      const product = getProductBySlug(item.slug)
      return product ? { ...item, product } : null
    })
    .filter(Boolean) as Array<{ slug: string; quantity: number; product: NonNullable<ReturnType<typeof getProductBySlug>> }>

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const ohioTax = subtotal * OHIO_TAX_RATE
  const total = subtotal + LAUNCH_PREP_FEE + ohioTax

  if (cartItems.length === 0) {
    return (
      <>
        <section className="py-20 px-4 text-center">
          <div className="max-w-lg mx-auto">
            <h1 className="text-4xl font-heading font-bold text-foreground mb-4">Your Cart</h1>
            <p className="text-foreground/60 mb-8">Your cart is quieter than a post-flight Ohio afternoon.</p>
            <Link
              href={siteHref("/products")}
              className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Browse the Lineup
            </Link>
          </div>
        </section>
        <LegalFooter />
      </>
    )
  }

  return (
    <>
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-heading font-bold text-foreground mb-8">Your Cart</h1>

          <div className="divide-y divide-accent/20">
            {cartItems.map(({ slug, quantity, product }) => (
              <div key={slug} className="py-6 flex gap-4 items-center">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-secondary/30 shrink-0">
                  <Image src={product.image} alt={product.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <Link href={siteHref(`/products/${slug}`)} className="font-heading font-semibold text-primary hover:underline">
                    {product.name}
                  </Link>
                  <p className="text-foreground/60 text-sm">{product.priceLabel}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(slug, quantity - 1)}
                    className="w-8 h-8 rounded border border-accent/30 text-foreground/60 hover:border-accent/60 flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => updateQuantity(slug, quantity + 1)}
                    className="w-8 h-8 rounded border border-accent/30 text-foreground/60 hover:border-accent/60 flex items-center justify-center"
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

          <div className="mt-8 border-t border-accent/20 pt-8">
            <div className="max-w-xs ml-auto space-y-2">
              <div className="flex justify-between text-foreground/70">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-foreground/70">
                <span>Launch Prep Fee</span>
                <span>${LAUNCH_PREP_FEE.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-foreground/70">
                <span>Ohio Tax (5.75%)</span>
                <span>${ohioTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-foreground border-t border-accent/30 pt-2 mt-2">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <div className="mt-8 text-right">
              <Link
                href={siteHref("/checkout")}
                className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Proceed to Launch Prep →
              </Link>
            </div>
          </div>
        </div>
      </section>
      <LegalFooter />
    </>
  )
}
