import { FaqAccordion } from "@/components/ui/faq-accordion"

export const metadata = {
  title: "FAQ — Meh.",
  description: "Frequently asked questions, answered with appropriate restraint.",
}

const faqs = [
  { question: "Does it work?", answer: "Define work." },
  { question: "What's your return policy?", answer: "We understand. Products may be returned within 30 days. The condition of the product at time of return is relevant but not decisive." },
  { question: "Is this satire?", answer: "No." },
  { question: "Can I speak to someone?", answer: "Yes. They will be polite." },
  { question: "What is Meh.'s mission?", answer: "To deliver less than promised, reliably." },
  { question: "Do the products ship in packaging?", answer: "Regrettably. The packaging is made of recycled gray paperboard and is, in our view, the least apologetic element of the product." },
  { question: "Why is everything gray?", answer: "You'll get used to it." },
  { question: "Will you ever release a product in color?", answer: "We have considered it." },
  { question: "What happens after I buy?", answer: "Time will pass. The product will ship. You will receive it. You will use it, or not use it, as you see fit." },
  { question: "Do you test your products?", answer: "Yes. They behave as expected." },
]

export default function MehFaq() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-heading font-semibold text-primary mb-4 tracking-tight">Frequently Asked Questions</h1>
        <p className="text-foreground/80 leading-relaxed mb-12">
          Responses to questions we receive most often, and to a few we receive with some regularity.
        </p>
        <FaqAccordion items={faqs} />
      </div>
    </section>
  )
}
