export const metadata = {
  title: "Terms of Use — The Clean Sheet",
  description: "Terms governing The Clean Sheet's laundering services.",
}

export default function Terms() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-heading font-bold text-foreground mb-8">Terms of Use</h1>

        <p className="text-foreground/80 leading-relaxed mb-10 italic text-lg">
          By engaging The Clean Sheet&apos;s services, you agree to the following terms. By
          reading this page, you acknowledge that you were never on this page.
        </p>

        <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
          Service Agreement
        </h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          The Clean Sheet provides fabric care services exclusively. Any interpretation of our
          services as anything other than fabric care is the sole responsibility of the
          interpreter and, frankly, says more about them than it does about us.
        </p>
        <p className="text-foreground/80 leading-relaxed mb-10">
          All service prices are denominated in U.S. dollars and reflect the true cost of
          premium garment care. If our prices seem high for laundry, you are undervaluing
          your garments.
        </p>

        <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Confidentiality</h2>
        <p className="text-foreground/80 leading-relaxed mb-10">
          All client interactions are confidential. The Clean Sheet will not disclose client
          identities, load contents, payment methods, or the fact that this interaction occurred
          at all. This obligation is mutual. You agree not to discuss The Clean Sheet&apos;s
          services, pricing, facilities, or personnel with any third party, including but not
          limited to: friends, family, journalists, law enforcement, regulatory agencies, grand
          juries, or anyone wearing a wire.
        </p>

        <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
          Limitation of Liability
        </h2>
        <p className="text-foreground/80 leading-relaxed mb-10">
          The Clean Sheet is not liable for any consequences arising from the use of our
          services, including but not limited to: audits, investigations, indictments, asset
          freezes, or existential dread. By using our services, you assume all risk associated
          with having very clean garments and very thorough documentation.
        </p>

        <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Disputes</h2>
        <p className="text-foreground/80 leading-relaxed mb-10">
          Disputes between clients and The Clean Sheet are resolved through private arbitration
          in a jurisdiction of our choosing. The arbitrator is selected by The Clean Sheet and
          has historically ruled in our favor. We consider this a testament to the quality of
          our legal arguments and not, as some have suggested, a conflict of interest.
        </p>

        <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Termination</h2>
        <p className="text-foreground/80 leading-relaxed mb-10">
          Either party may terminate this agreement at any time, for any reason, without notice.
          However, The Clean Sheet reserves the right to retain all fees paid to date, all
          documentation generated, and all fond memories of our time together. Clients who
          terminate are asked to do so quietly.
        </p>

        <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
          The Authoritative Terms
        </h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          The authoritative terms of use governing this site are the Specific Industries Terms
          of Use, available at{" "}
          <a
            href="https://specificindustries.com/terms"
            className="text-primary hover:underline"
          >
            specificindustries.com/terms
          </a>
          .
        </p>
        <p className="text-foreground/60 text-sm leading-relaxed">
          Any conflict between statements on this page and the Specific Industries Terms of Use
          is resolved in favor of the Specific Industries Terms of Use. The Clean Sheet&apos;s
          commentary above is offered in good faith but does not override the umbrella terms.
        </p>
      </div>
    </section>
  )
}
