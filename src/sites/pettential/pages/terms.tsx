// src/sites/pettential/pages/terms.tsx
export const metadata = {
  title: "Terms of Use — Pettential",
  description: "The terms governing your use of Pettential's performance products and services.",
}

export default function PettentialTerms() {
  return (
    <section className="bg-[#FAFAFA]">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-[#111] font-heading">Terms of Use</h1>

        <div className="mt-6 border-l-4 border-[#CCFF00] bg-[#CCFF00]/10 p-5 rounded-r-lg">
          <p className="font-bold text-[#111] mb-1">Official Umbrella Policy</p>
          <p className="text-sm text-[#111]/80">
            The authoritative terms of use for all Specific Industries properties — including Pettential — are maintained at{" "}
            <a href="https://specificindustries.com/terms" className="underline font-bold text-[#FF3366]">specificindustries.com/terms</a>.
            The text below is provided for convenience and flavor; in the event of any conflict, the umbrella policy governs.
          </p>
        </div>

        <p className="mt-6 text-sm italic text-[#111]/60">Effective date: whenever the tortoise finishes reading this.</p>

        <h2 className="mt-8 text-xl font-bold text-[#FF3366] font-heading">1. Acceptance of Terms</h2>
        <p className="mt-2 text-[#111]/80">
          By accessing Pettential, you agree to these terms. Your pet does not agree, has not been consulted, and lacks the legal standing to enter into binding agreements. This has not stopped us from sending them quarterly performance reviews.
        </p>

        <h2 className="mt-6 text-xl font-bold text-[#FF3366] font-heading">2. Product Disclaimers</h2>
        <p className="mt-2 text-[#111]/80">
          Pettential products are designed to enhance pet performance. &ldquo;Enhance&rdquo; is used aspirationally. No product has produced measurable improvement in any animal across any metric in any study we have conducted or are aware of. By purchasing, you acknowledge that improvement is a theoretical construct as applied to your pet.
        </p>

        <h2 className="mt-6 text-xl font-bold text-[#FF3366] font-heading">3. Service Guarantees</h2>
        <p className="mt-2 text-[#111]/80">
          Our Enterprise tier guarantees &ldquo;results.&rdquo; Results are defined as the continued existence of your pet during the subscription period. We do not guarantee improvement, engagement, participation, acknowledgment, or any form of behavioral change. The guarantee is voided if your pet ceases to exist for reasons unrelated to our services, which is all reasons.
        </p>

        <h2 className="mt-6 text-xl font-bold text-[#FF3366] font-heading">4. Returns & Refunds</h2>
        <p className="mt-2 text-[#111]/80">
          Products may be returned within 30 days in their original packaging. Your pet cannot fill out the return form. You may fill it out on their behalf. We will process the return and note in our records that your pet&apos;s performance journey has been paused. Not ended. Paused.
        </p>

        <h2 className="mt-6 text-xl font-bold text-[#FF3366] font-heading">5. Limitation of Liability</h2>
        <p className="mt-2 text-[#111]/80">
          Pettential is not liable for any outcomes — positive, negative, or nonexistent — resulting from the use of our products. Given that the most common outcome is &ldquo;nothing,&rdquo; this clause is largely theoretical.
        </p>

        <p className="mt-10 text-sm italic text-[#111]/60 pt-4 border-t border-[#111]/10">
          For binding legal terms, always refer to the Specific Industries umbrella policy at{" "}
          <a href="https://specificindustries.com/terms" className="underline text-[#FF3366]">specificindustries.com/terms</a>.
        </p>
      </div>
    </section>
  )
}
