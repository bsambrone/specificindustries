"use client"

import { useCart } from "./cart-provider"

const defaultQuips = [
  "Bold choice.",
  "Your doctor will have questions.",
  "We admire your courage.",
  "No refunds. Ever.",
  "Interesting decision.",
  "Added to cart.",
]

interface AddToCartButtonProps {
  slug: string
  productName: string
  className?: string
  quips?: string[]
}

export function AddToCartButton({ slug, productName, className, quips }: AddToCartButtonProps) {
  const { addToCart, showToast } = useCart()

  function handleClick() {
    addToCart(slug)
    const pool = quips && quips.length > 0 ? quips : defaultQuips
    const quip = pool[Math.floor(Math.random() * pool.length)]
    showToast(`${productName} added to cart. ${quip}`)
  }

  return (
    <button
      onClick={handleClick}
      className={className || "px-6 py-3 bg-primary text-white rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity"}
    >
      Add to Cart
    </button>
  )
}
