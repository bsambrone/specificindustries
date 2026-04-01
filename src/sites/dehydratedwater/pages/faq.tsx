import { Hero } from "@/components/ui/hero"
import { WaveDivider } from "@/components/ui/wave-divider"
import { FaqAccordion } from "@/components/ui/faq-accordion"
import { PromoBanner } from "@/components/ui/promo-banner"

export const metadata = {
  title: "FAQ — Dehydrated Water Laboratories",
  description: "Your questions, our carefully evasive answers.",
}

const aboutProductsItems = [
  {
    question: "Is this real water?",
    answer:
      "Our product contains the complete molecular blueprint of water, temporarily unburdened from its liquid state. Whether this constitutes 'real' water is a question we respectfully defer to the philosophers. Ezekiel Drywell I spent 54 years on this question and died undecided.",
  },
  {
    question: "How do I use dehydrated water?",
    answer:
      "Add water. We understand the irony. Each packet includes detailed instructions, but they all say the same thing: add water. The water you add does all the work. Our powder provides moral support.",
  },
  {
    question: "Can I dehydrate your dehydrated water?",
    answer:
      "Please see our Double-Dehydrated 'Dryer' Water product, developed for precisely this purpose. We strongly advise against triple-dehydrating, as the resulting substance has not been approved by any regulatory body, real or imagined. Our insurance does not cover metaphysical dryness events.",
  },
  {
    question: "What if it gets wet?",
    answer:
      "Then you have water. Congratulations. The product has fulfilled its destiny ahead of schedule. This is not covered under our return policy.",
  },
]

const healthSafetyItems = [
  {
    question: "Is dehydrated water vegan?",
    answer:
      "Our water has never been in contact with animals, with the possible exception of clouds, which occasionally contain birds. We cannot guarantee a bird-free supply chain. Our Heavy Water variant has also not been tested on animals, primarily because we cannot get animals to participate.",
  },
  {
    question: "Is dehydrated water gluten-free?",
    answer:
      "Our product contains no gluten, no allergens, no nutrients, and — if we are being completely transparent — no water. It is free of essentially everything. This is, depending on your perspective, either our greatest strength or our most significant limitation.",
  },
  {
    question: "What happens if I add too much water?",
    answer:
      "You will have more water than you started with. We are not responsible for any surplus hydration, local flooding, or philosophical confusion that may result. If you have added too much water, simply purchase additional Dehydrated Water to restore balance.",
  },
]

const storageHandlingItems = [
  {
    question: "How should I store dehydrated water?",
    answer:
      "In a cool, dry place. Emphasis on dry. Any exposure to moisture may result in premature hydration, which voids the warranty. Do not store near humidifiers, swimming pools, rain, or people who cry easily.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, though international shipments are subject to customs inspection. We have had several packets held at borders by officials who opened them, found powder, and had questions. We now include a letter explaining that it is 'just water, but not yet.' This has not helped.",
  },
]

const ordersReturnsItems = [
  {
    question: "What is your return policy?",
    answer:
      "Returns are accepted only if the product has been accidentally hydrated. Please ship liquid water back in a standard paper envelope. We are not responsible for postal service complaints, water damage to other parcels, or the confused look on your mail carrier's face.",
  },
  {
    question: "Is the WaaS subscription worth it?",
    answer:
      "That depends on how you define 'worth.' In terms of monetary value per gram of powder, almost certainly not. In terms of the satisfaction of receiving a wax-sealed packet of dehydrated water each month via carrier pigeon (or USPS), we believe the answer is self-evident.",
  },
  {
    question: "Has anyone ever actually bought this?",
    answer:
      "We prefer not to discuss our sales figures. What we will say is that every packet we have ever produced has been accounted for. Some were purchased. Others were 'distributed strategically' at family gatherings. Ezekiel IV once left a case at a bus stop. We count that as outreach.",
  },
]

export default function FAQ() {
  return (
    <>
      <Hero
        dark
        headline="Frequently Asked Questions"
        subheadline="Your questions, our carefully evasive answers."
      />

      <WaveDivider variant="wave1" />

      {/* About Our Products */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <h2 className="text-xl font-heading font-bold text-accent uppercase tracking-wide">
              About Our Products
            </h2>
            <div className="mt-2 h-px bg-accent/20" />
          </div>
          <FaqAccordion items={aboutProductsItems} />
        </div>
      </section>

      {/* Health & Safety */}
      <section className="py-12 px-4 bg-secondary/10">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <h2 className="text-xl font-heading font-bold text-accent uppercase tracking-wide">
              Health &amp; Safety
            </h2>
            <div className="mt-2 h-px bg-accent/20" />
          </div>
          <FaqAccordion items={healthSafetyItems} />
        </div>
      </section>

      {/* Storage & Handling */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <h2 className="text-xl font-heading font-bold text-accent uppercase tracking-wide">
              Storage &amp; Handling
            </h2>
            <div className="mt-2 h-px bg-accent/20" />
          </div>
          <FaqAccordion items={storageHandlingItems} />
        </div>
      </section>

      {/* Orders & Returns */}
      <section className="py-12 px-4 bg-secondary/10">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <h2 className="text-xl font-heading font-bold text-accent uppercase tracking-wide">
              Orders &amp; Returns
            </h2>
            <div className="mt-2 h-px bg-accent/20" />
          </div>
          <FaqAccordion items={ordersReturnsItems} />
        </div>
      </section>

      <PromoBanner
        headline="Still have questions? We probably don't have answers. Contact us anyway."
      />
    </>
  )
}
