"use client"

import { useState } from "react"

interface FaqItem {
  question: string
  answer: string
}

interface FaqAccordionProps {
  items: FaqItem[]
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="divide-y divide-primary/10">
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full py-4 flex items-center justify-between text-left"
          >
            <span className="font-heading font-semibold text-foreground">{item.question}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 text-primary transition-transform ${openIndex === i ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openIndex === i && (
            <div className="pb-4 text-foreground/70">{item.answer}</div>
          )}
        </div>
      ))}
    </div>
  )
}
