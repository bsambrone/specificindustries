"use client"

import { useCart } from "./cart-provider"

interface AddToCartButtonProps {
  slug: string
  productName: string
  className?: string
}

const quips = [
  "Bold choice.",
  "Your doctor will have questions.",
  "We admire your courage.",
  "No refunds. Ever.",
  "The pigs thank you.",
  "Interesting decision.",
]

export function AddToCartButton({ slug, productName, className }: AddToCartButtonProps) {
  const { addToCart, showToast } = useCart()

  function handleClick() {
    addToCart(slug)
    const quip = quips[Math.floor(Math.random() * quips.length)]
    showToast(`${productName} added to cart. ${quip}`)
  }

  return (
    <button
      onClick={handleClick}
      className={className || "px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"}
    >
      Add to Cart
    </button>
  )
}
