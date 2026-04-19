"use client"

import { createContext, useContext, useState, useEffect, useCallback, useRef, type ReactNode } from "react"

export interface CartItem {
  slug: string
  quantity: number
}

interface ToastMessage {
  id: number
  message: string
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (slug: string, quantity?: number) => void
  removeFromCart: (slug: string) => void
  updateQuantity: (slug: string, quantity: number) => void
  clearCart: () => void
  cartCount: number
  toasts: ToastMessage[]
  showToast: (message: string, durationMs?: number) => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children, storageKey = "cart" }: { children: ReactNode; storageKey?: string }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return []
    try {
      const stored = localStorage.getItem(storageKey)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })
  const [toasts, setToasts] = useState<ToastMessage[]>([])
  const nextToastIdRef = useRef(0)
  const mountedRef = useRef(false)

  useEffect(() => {
    mountedRef.current = true
  }, [])

  useEffect(() => {
    if (mountedRef.current) {
      localStorage.setItem(storageKey, JSON.stringify(cart))
    }
  }, [cart, storageKey])

  const showToast = useCallback((message: string, durationMs = 3000) => {
    const id = nextToastIdRef.current++
    setToasts((prev) => [...prev.slice(-2), { id, message }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, durationMs)
  }, [])

  const addToCart = useCallback((slug: string, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.slug === slug)
      if (existing) {
        return prev.map((item) =>
          item.slug === slug ? { ...item, quantity: item.quantity + quantity } : item
        )
      }
      return [...prev, { slug, quantity }]
    })
  }, [])

  const removeFromCart = useCallback((slug: string) => {
    setCart((prev) => prev.filter((item) => item.slug !== slug))
  }, [])

  const updateQuantity = useCallback((slug: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.slug !== slug))
    } else {
      setCart((prev) =>
        prev.map((item) => (item.slug === slug ? { ...item, quantity } : item))
      )
    }
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, toasts, showToast }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within a CartProvider")
  return context
}
