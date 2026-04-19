"use client"

import { useState, type FormEvent } from "react"
import { useCart } from "@/components/commerce/cart-provider"

const TOAST_MESSAGE =
  "We'll get back to you soon, and make VERY SURE to tell your pet you love them very much and they will be m\u0336i\u0336s\u0336s\u0336e\u0336d\u0336 excited."

export default function ContactForm() {
  const { showToast } = useCart()
  const [sending, setSending] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)
    showToast(TOAST_MESSAGE, 6000)
    const form = e.currentTarget
    setTimeout(() => {
      form.reset()
      setSending(false)
    }, 400)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-foreground mb-1">Name</label>
        <input required type="text" className="w-full px-4 py-3 border border-accent/30 rounded-lg bg-background focus:outline-none focus:border-primary" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-foreground mb-1">Email</label>
        <input required type="email" className="w-full px-4 py-3 border border-accent/30 rounded-lg bg-background focus:outline-none focus:border-primary" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-foreground mb-1">Pet Species</label>
        <select className="w-full px-4 py-3 border border-accent/30 rounded-lg bg-background focus:outline-none focus:border-primary">
          <option>Cat</option>
          <option>Dog</option>
          <option>Rabbit</option>
          <option>Fish</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-semibold text-foreground mb-1">Message</label>
        <textarea required rows={5} className="w-full px-4 py-3 border border-accent/30 rounded-lg bg-background focus:outline-none focus:border-primary" />
      </div>
      <button
        type="submit"
        disabled={sending}
        className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
      >
        {sending ? "Sending..." : "Send"}
      </button>
    </form>
  )
}
