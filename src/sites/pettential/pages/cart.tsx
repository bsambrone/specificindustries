// src/sites/pettential/pages/cart.tsx
"use client"

import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/components/commerce/cart-provider"
import { getProductBySlug } from "@/sites/pettential/data/products"
import { useSiteLink } from "@/hooks/use-site-link"

const PERFORMANCE_ASSESSMENT_FEE = 4.99

export default function PettentialCart() {
  const { cart, removeFromCart, updateQuantity } = useCart()
  const siteHref = useSiteLink()

  const cartItems = cart
    .map((item) => {
      const product = getProductBySlug(item.slug)
      return product ? { ...item, product } : null
    })
    .filter(Boolean) as Array<{ slug: string; quantity: number; product: NonNullable<ReturnType<typeof getProductBySlug>> }>

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const total = subtotal + PERFORMANCE_ASSESSMENT_FEE

  if (cartItems.length === 0) {
    return (
      <section className="py-20 px-4 text-center bg-[#FAFAFA]">
        <div className="max-w-lg mx-auto">
          <h1 className="text-4xl font-bold text-[#111] mb-4 font-heading">Your Cart</h1>
          <p className="text-[#111]/60 mb-8">
            No performance gear in your cart. Your pet remains unoptimized.
          </p>
          <Link
            href={siteHref("/shop")}
            className="inline-block px-8 py-3 bg-[#CCFF00] text-[#111] rounded-lg font-bold hover:bg-[#b8e600] transition-colors"
          >
            Shop Performance Gear
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 px-4 bg-[#FAFAFA]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#111] mb-8 font-heading">Your Cart</h1>

        <div className="divide-y divide-[#111]/10">
          {cartItems.map(({ slug, quantity, product }) => (
            <div key={slug} className="py-6 flex gap-4 items-center">
              <div className="relative w-20 h-20 rounded-lg bg-white shrink-0 overflow-hidden border border-[#111]/10">
                <Image src={product.heroImage} alt={product.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <Link href={siteHref(`/shop/${slug}`)} className="font-bold text-[#111] hover:text-[#FF3366] font-heading">
                  {product.name}
                </Link>
                <p className="text-[#111]/60 text-sm">{product.priceLabel}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(slug, quantity - 1)}
                  className="w-8 h-8 rounded border border-[#111]/15 text-[#111]/60 hover:border-[#111]/30 flex items-center justify-center"
                >
                  -
                </button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => updateQuantity(slug, quantity + 1)}
                  className="w-8 h-8 rounded border border-[#111]/15 text-[#111]/60 hover:border-[#111]/30 flex items-center justify-center"
                >
                  +
                </button>
              </div>
              <div className="w-24 text-right font-semibold text-[#111]">
                ${(product.price * quantity).toFixed(2)}
              </div>
              <button
                onClick={() => removeFromCart(slug)}
                className="text-[#111]/40 hover:text-[#111]/70 ml-2"
                aria-label="Remove"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-[#111]/10 pt-8">
          <div className="max-w-xs ml-auto space-y-2">
            <div className="flex justify-between text-[#111]/70">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[#111]/70">
              <span>Performance Assessment Fee</span>
              <span>${PERFORMANCE_ASSESSMENT_FEE.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-[#111] border-t border-[#111]/10 pt-2 mt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-8 text-right">
            <Link
              href={siteHref("/checkout")}
              className="inline-block px-8 py-3 bg-[#CCFF00] text-[#111] rounded-lg font-bold hover:bg-[#b8e600] transition-colors"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
