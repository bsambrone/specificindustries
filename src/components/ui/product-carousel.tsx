"use client"

import { useRef } from "react"

interface ProductCarouselProps {
  title?: string
  children: React.ReactNode
}

export function ProductCarousel({ title, children }: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return
    const amount = scrollRef.current.clientWidth * 0.6
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    })
  }

  return (
    <section className="py-16 px-4 bg-secondary/10">
      <div className="max-w-6xl mx-auto">
        {title && (
          <h2 className="text-2xl font-heading font-bold text-center mb-8">{title}</h2>
        )}
        <div className="relative">
          {/* Left arrow */}
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-primary text-white rounded-full items-center justify-center hover:opacity-90 transition-opacity shadow-lg"
            aria-label="Scroll left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          {/* Scrollable container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory md:snap-none scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {children}
          </div>
          {/* Right arrow */}
          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-primary text-white rounded-full items-center justify-center hover:opacity-90 transition-opacity shadow-lg"
            aria-label="Scroll right"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
