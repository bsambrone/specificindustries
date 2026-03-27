"use client"

import { useCart } from "./cart-provider"

export function ToastContainer() {
  const { toasts } = useCart()

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-primary text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in text-sm font-medium"
        >
          {toast.message}
        </div>
      ))}
    </div>
  )
}
