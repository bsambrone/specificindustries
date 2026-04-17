import Link from "next/link"
import { Hero } from "@/components/ui/hero"
import { FaqAccordion } from "@/components/ui/faq-accordion"

export const metadata = {
  title: "FAQ — Mostlysterile",
  description: "Answers to frequently asked questions about Mostlysterile products, practices, and operations.",
}

const faqs = [
  {
    question: "Is this legal?",
    answer: "Where applicable, yes. Our practices reflect the legal, regulatory, and advisory guidance available to us at the time of operation. We do not rule out future updates.",
  },
  {
    question: "Can I return a product?",
    answer: "Returns are reviewed on a case-by-case basis by a rotating committee of one. Decisions are final. A restocking consideration may apply.",
  },
  {
    question: "Are you affiliated with any named hospital, clinic, or healthcare system?",
    answer: "They have not returned our calls. We consider the question open.",
  },
  {
    question: "What does 'mostly sterile' mean, exactly?",
    answer: "Mostly sterile refers to a condition of sterility which is substantially preserved, to the extent feasible, through the period of our handling. The specific degree of preservation is a function of item, lot, and operational context.",
  },
  {
    question: "Do you ship internationally?",
    answer: "We ship to wherever the packaging ends up. Tracking is provided in principle. Delivery windows vary.",
  },
  {
    question: "Are your products FDA approved?",
    answer: "Our products are FDA-approved, where FDA refers to our internal Friendly Domestic Association. This is a distinct entity from the federal Food and Drug Administration and any similarity of acronyms is regrettable.",
  },
  {
    question: "Who is your target customer?",
    answer: "Customers. We serve customers who find our offering appropriate for their needs.",
  },
  {
    question: "Can I speak to a licensed pharmacist?",
    answer: "We can put you in touch with a team member who is able to speak in a comparable tone of voice. Formal pharmaceutical credentialing on our side is an ongoing project.",
  },
]

export default function MostlysterileFaq() {
  return (
    <>
      <Hero
        headline="Frequently Asked Questions"
        subheadline="Responses to the questions we receive most often, and occasionally to questions we have received only once."
      />

      <section className="py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <FaqAccordion items={faqs} />
          <p className="mt-10 text-xs italic text-foreground/50 text-center">
            Questions not addressed above may be submitted through our <Link href="/contact" className="text-primary underline hover:no-underline">contact</Link> page for queued review.
          </p>
        </div>
      </section>
    </>
  )
}
