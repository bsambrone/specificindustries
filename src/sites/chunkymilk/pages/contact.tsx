import { Hero } from "@/components/ui/hero"
import { FaqAccordion } from "@/components/ui/faq-accordion"

export const metadata = {
  title: "Contact — Whitford Family Chunky Milk",
  description: "Letters arrive by saddlebag twice a week. The hollow is not on the route most days.",
}

const faqItems = [
  {
    question: "How long does shipping take?",
    answer:
      "Two to three weeks, in most seasons. Longer in spring. We do not ship on Sundays. We do not ship on the day Otis grades the Reserve.",
  },
  {
    question: "Can I visit the Chunkery?",
    answer:
      "Visitors are received by appointment, between April and October, on days when Bill is not drawing. You will need to know someone we know. Most people do.",
  },
  {
    question: "Is this safe to drink?",
    answer:
      "We have been drinking it for six generations. The hollow has not thinned.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "If the jar arrives broken, we will send another as soon as one is ready. If the milk is not to your liking, we regret the mismatch but will not return your money. The milk is the milk.",
  },
  {
    question: "Can I order in bulk?",
    answer:
      "Bulk orders are reviewed by Bill personally. Please write, include your name, the names of your people, and what the milk is for. He will write back, eventually.",
  },
  {
    question: "Do you deliver internationally?",
    answer:
      "No. The saddlebag does not go that far.",
  },
]

export default function ChunkyMilkContact() {
  return (
    <>
      <Hero
        headline="Write To The Hollow"
        subheadline="Letters arrive by saddlebag twice a week. Tuesdays and Fridays, weather permitting."
      />

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg text-foreground/80 space-y-6">
            <p>
              The Whitford hollow does not have a front desk. We do not have a phone number that we answer.
              We receive our correspondence from the mailman, who comes up the road on Tuesdays and Fridays
              when the weather permits.
            </p>
            <p>
              If you wish to reach the Chunkery, address your letter to:
            </p>
            <div className="not-prose border-l-4 border-accent pl-6 py-2 bg-secondary/30 text-foreground/80 italic">
              Whitford Family Chunky Milk<br />
              c/o The Settlin&apos; Shed<br />
              Route 2, Hollow Creek Road<br />
              (The hollow, you know the one)
            </div>
            <p>
              We will write back. When we do, we will sign the letter ourselves.
            </p>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-heading font-bold text-primary mb-6">Matters Often Asked</h2>
            <FaqAccordion items={faqItems} />
          </div>

          <div className="mt-16 pt-8 border-t border-accent/20 text-center">
            <p className="text-xs text-foreground/40">
              For urgent or modern inquiries, correspondence may also be addressed electronically to{" "}
              <a href="mailto:bsambrone@gmail.com" className="underline hover:text-accent transition-colors">
                bsambrone@gmail.com
              </a>
              . The mailman does not use this method. The rest of us, on occasion, do.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
