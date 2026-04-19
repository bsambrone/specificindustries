export const metadata = {
  title: "Terms of Service — The Pennywhistle Play Company",
  description:
    "Terms governing the purchase and ownership of Pennywhistle products. Governed by Specific Industries' umbrella terms; satirical body in the Pennywhistle voice.",
}

export default function TerrorClownTerms() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-4xl md:text-5xl font-heading font-semibold mb-8" style={{ color: "var(--color-text, #1F1A17)" }}>
        Terms of Service
      </h1>

      <aside
        className="p-5 border-2 mb-10"
        style={{ borderColor: "var(--color-primary, #A8352A)", background: "#FFFFFF60" }}
      >
        <div className="text-xs uppercase tracking-[0.25em] mb-2" style={{ color: "var(--color-primary, #A8352A)" }}>
          Umbrella terms
        </div>
        <p className="text-sm" style={{ color: "var(--color-text, #1F1A17)" }}>
          The authoritative Terms of Service are published by Specific Industries at{" "}
          <a className="underline" href="https://specificindustries.com/terms" style={{ color: "var(--color-primary, #A8352A)" }}>
            specificindustries.com/terms
          </a>
          . That document supersedes anything you read on this page.
        </p>
      </aside>

      <div className="flex flex-col gap-8 text-base leading-relaxed" style={{ color: "var(--color-text, #1F1A17)" }}>
        <section>
          <h2 className="text-xl font-heading font-semibold mb-3" style={{ color: "var(--color-primary, #A8352A)" }}>
            &sect;1. Ownership
          </h2>
          <p>
            Upon delivery, the Customer becomes the owner of the Pennywhistle product. The product becomes, in a smaller but not insignificant way, the owner of the Customer. We believe this arrangement is mutually agreeable.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-heading font-semibold mb-3" style={{ color: "var(--color-primary, #A8352A)" }}>
            &sect;2. The Lifetime Companionship Warranty
          </h2>
          <p>
            Every Pennywhistle product is warrantied for the duration of the Customer&apos;s lifetime, against defects in porcelain, enamel, stitching, and mounting hardware. The warranty transfers to subsequent owners upon written notification, for no additional charge. Cosmetic tooth chipping and garment fading are not covered. Reports of behavior are documented but do not constitute a warranty claim.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-heading font-semibold mb-3" style={{ color: "var(--color-primary, #A8352A)" }}>
            &sect;3. Returns and Exchanges
          </h2>
          <p>
            Terror Clown&trade; is a lifetime companion and is not eligible for return. We offer a thirty-day exchange for manufacturing defects, evaluated at our Millbrook workshop. Once a bond has formed between a Terror Clown&trade; and its child, exchange is not possible. The bond is assumed to have formed at the conclusion of the third consecutive night.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-heading font-semibold mb-3" style={{ color: "var(--color-primary, #A8352A)" }}>
            &sect;4. Shipping and Delivery
          </h2>
          <p>
            Standard shipping within the contiguous forty-eight United States is six to eight weeks by common carrier. Experiences requiring professional installation are scheduled separately by our Pennywhistle-certified crews. The Ceiling-Wire Night Watcher requires a professional installer within fifty miles of Millbrook, Ohio.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-heading font-semibold mb-3" style={{ color: "var(--color-primary, #A8352A)" }}>
            &sect;5. Modification of Product
          </h2>
          <p>
            The Customer is welcome to install official Pennywhistle accessories (The Gristle Set, Long Smile Upgrade, Voice Box Module, etc.). Third-party modifications void the warranty and are strongly discouraged. The Customer is advised that unauthorized modifications may alter the behavior of Terror Clown&trade; in ways we cannot reliably predict.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-heading font-semibold mb-3" style={{ color: "var(--color-primary, #A8352A)" }}>
            &sect;6. Disputes
          </h2>
          <p>
            Disputes between the Customer and The Pennywhistle Play Company are resolved by written correspondence through the Customer Letters Department. If written correspondence does not produce a resolution within ninety days, the dispute shall be referred to the Specific Industries umbrella terms. Binding arbitration, where applicable, follows the umbrella policy.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-heading font-semibold mb-3" style={{ color: "var(--color-primary, #A8352A)" }}>
            &sect;7. Severability
          </h2>
          <p>
            If any provision of these Terms is held to be unenforceable, the remaining provisions shall continue in full force. The relationship between the Customer and Terror Clown&trade; is not severable.
          </p>
        </section>
      </div>
    </main>
  )
}
