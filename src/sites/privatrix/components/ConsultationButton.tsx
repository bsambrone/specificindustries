"use client"

import { useCart } from "@/components/commerce/cart-provider"

interface ConsultationButtonProps {
  productName: string
  className?: string
}

const TOAST_MESSAGE = "A Privacy Specialist will reach out within 47 business days."

export function ConsultationButton({ productName, className }: ConsultationButtonProps) {
  const { showToast } = useCart()

  function handleClick() {
    showToast(`${productName}: ${TOAST_MESSAGE}`)
  }

  return (
    <button
      onClick={handleClick}
      className={
        className ||
        "px-6 py-3 bg-accent text-white rounded-lg font-semibold text-base hover:opacity-90 transition-opacity"
      }
    >
      Schedule Privacy Consultation
    </button>
  )
}
