import Link from "next/link"
import { faqs } from "../data/faq"

export const metadata = {
  title: "Frequently Asked Questions — The Pennywhistle Play Company",
  description:
    "Answers to common questions about Terror Clown™, the Haunted Headboard Bed, Experiences, accessories, and the Pennywhistle warranty.",
}

export default function TerrorClownFaq() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <div className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: "var(--color-secondary, #3E6C6E)" }}>
        Frequently asked questions
      </div>
      <h1 className="text-4xl md:text-5xl font-heading font-semibold mb-5 leading-tight" style={{ color: "var(--color-text, #1F1A17)" }}>
        Everything you may wish to know.
      </h1>
      <p className="text-lg mb-14" style={{ color: "var(--color-text, #1F1A17)", opacity: 0.75 }}>
        For questions not addressed below, please write to our{" "}
        <Link href="/contact" style={{ color: "var(--color-primary, #A8352A)" }} className="underline underline-offset-4">
          Customer Letters Department
        </Link>
        . We reply to every letter.
      </p>

      <div className="flex flex-col divide-y" style={{ borderColor: "var(--color-secondary, #3E6C6E)" }}>
        {faqs.map((faq, i) => (
          <details key={i} className="group py-5">
            <summary
              className="flex items-center justify-between cursor-pointer list-none text-base font-heading font-semibold select-none"
              style={{ color: "var(--color-text, #1F1A17)" }}
            >
              <span>{faq.question}</span>
              <span
                className="ml-4 shrink-0 text-xl leading-none transition-transform group-open:rotate-45"
                style={{ color: "var(--color-primary, #A8352A)" }}
                aria-hidden="true"
              >
                +
              </span>
            </summary>
            <div className="pt-4 text-base leading-relaxed" style={{ color: "var(--color-text, #1F1A17)", opacity: 0.85 }}>
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </main>
  )
}
