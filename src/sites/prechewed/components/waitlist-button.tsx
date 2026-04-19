"use client"

import { useCart } from "@/components/commerce/cart-provider"

export default function WaitlistButton({ productName }: { productName: string }) {
  const { showToast } = useCart()

  return (
    <button
      type="button"
      onClick={() => showToast(`Added to waitlist. Expect contact within 47 jaw-hours.`)}
      className="w-full md:w-auto px-6 py-3 rounded-md font-medium text-white"
      style={{ background: "var(--color-primary, #5B3FD9)" }}
      aria-label={`Join waitlist for ${productName}`}
    >
      Join Waitlist
    </button>
  )
}
