"use client"

import { fireToast } from "./Toast"

interface TipButtonProps {
  fanName: string
  amount: number
}

export function TipButton({ fanName, amount }: TipButtonProps) {
  function handleClick() {
    fireToast(`Thanks for the $${amount} tip! ${fanName} has been notified.`)
  }

  return (
    <button
      onClick={handleClick}
      className="bg-[#FF7A59] hover:bg-[#ee6646] text-white font-bold text-xs uppercase rounded-full px-4 py-1.5 transition-colors"
    >
      TIP ${amount}
    </button>
  )
}
