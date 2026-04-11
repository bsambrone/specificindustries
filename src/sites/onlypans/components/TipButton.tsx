"use client"

import { fireToast } from "./Toast"

interface TipButtonProps {
  panName: string
  amount: number
}

export function TipButton({ panName, amount }: TipButtonProps) {
  function handleClick() {
    fireToast(`Thanks for the $${amount} tip! ${panName} has been notified.`)
  }

  return (
    <button
      onClick={handleClick}
      className="bg-[#FDE68A] hover:bg-[#FCD34D] text-[#7C2D12] font-bold text-xs uppercase rounded-full px-4 py-1.5 transition-colors"
    >
      TIP ${amount}
    </button>
  )
}
