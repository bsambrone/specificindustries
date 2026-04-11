"use client"

import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/components/commerce/cart-provider"
import { getProductBySlug } from "@/sites/bonelesswater/data/products"
import { useSiteLink } from "@/hooks/use-site-link"

const HANDLING_FEE = 4.99
const REGULATORY_COMPLIANCE_RATE = 0.062

export default function BonelessWaterCart() {
  const { cart, removeFromCart, updateQuantity } = useCart()
  const siteHref = useSiteLink()

  const cartItems = cart
    .map((item) => {
      const product = getProductBySlug(item.slug)
      return product ? { ...item, product } : null
    })
    .filter(Boolean) as Array<{ slug: string; quantity: number; product: NonNullable<ReturnType<typeof getProductBySlug>> }>

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const complianceFee = subtotal * REGULATORY_COMPLIANCE_RATE
  const total = subtotal + HANDLING_FEE + complianceFee

  if (cartItems.length === 0) {
    return (
      <section className="py-20 px-4 text-center">
        <div className="max-w-lg mx-auto">
          <h1 className="text-4xl font-bold text-[#0c4a6e] mb-4">Your Cart</h1>
          <p className="text-[#0f172a]/60 mb-8">
            No certified bone-free hydration in your cart yet.
          </p>
          <Link
            href={siteHref("/products")}
            className="inline-block px-8 py-3 bg-[#0c4a6e] text-white rounded font-semibold hover:bg-[#075985] transition-colors"
          >
            View Products
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#0c4a6e] mb-8">Your Cart</h1>

        <div className="divide-y divide-[#0c4a6e]/10">
          {cartItems.map(({ slug, quantity, product }) => (
            <div key={slug} className="py-6 flex gap-4 items-center">
              <div className="relative w-20 h-20 rounded bg-[#0c4a6e]/5 shrink-0 overflow-hidden">
                <Image src={product.heroImage} alt={product.name} fill className="object-contain p-2" />
              </div>
              <div className="flex-1">
                <Link href={siteHref(`/products/${slug}`)} className="font-bold text-[#0c4a6e] hover:underline">
                  {product.name}
                </Link>
                <p className="text-[#0f172a]/60 text-sm">{product.priceLabel}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(slug, quantity - 1)}
                  className="w-8 h-8 rounded border border-[#0c4a6e]/20 text-[#0f172a]/60 hover:border-[#0c4a6e]/40 flex items-center justify-center"
                >
                  -
                </button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => updateQuantity(slug, quantity + 1)}
                  className="w-8 h-8 rounded border border-[#0c4a6e]/20 text-[#0f172a]/60 hover:border-[#0c4a6e]/40 flex items-center justify-center"
                >
                  +
                </button>
              </div>
              <div className="w-24 text-right font-semibold text-[#0f172a]">
                ${(product.price * quantity).toFixed(2)}
              </div>
              <button
                onClick={() => removeFromCart(slug)}
                className="text-[#0f172a]/40 hover:text-[#0f172a]/70 ml-2"
                aria-label="Remove"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-[#0c4a6e]/10 pt-8">
          <div className="max-w-xs ml-auto space-y-2">
            <div className="flex justify-between text-[#0f172a]/70">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[#0f172a]/70">
              <span>Cleanroom Handling Fee</span>
              <span>${HANDLING_FEE.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[#0f172a]/70">
              <span>Regulatory Compliance Surcharge (6.2%)</span>
              <span>${complianceFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-[#0f172a] border-t border-[#0c4a6e]/10 pt-2 mt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-8 text-right">
            <Link
              href={siteHref("/checkout")}
              className="inline-block px-8 py-3 bg-[#0c4a6e] text-white rounded font-semibold hover:bg-[#075985] transition-colors"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
