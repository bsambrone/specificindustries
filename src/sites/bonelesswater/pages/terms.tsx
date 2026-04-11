export const metadata = {
  title: "Terms of Use — BonelessWater",
  description: "The terms governing your use of the BonelessWater bone-free water platform.",
}

export default function BonelessWaterTerms() {
  return (
    <section className="bg-white">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-extrabold text-[#0c4a6e]">Terms of Use</h1>

        <div className="mt-6 border-l-4 border-[#0c4a6e] bg-[#0c4a6e]/5 p-5 rounded-r-lg">
          <p className="font-bold text-[#0f172a] mb-1">Official Umbrella Policy</p>
          <p className="text-sm text-[#0f172a]/80">
            The authoritative terms of use for all Specific Industries properties — including BonelessWater — are maintained at{" "}
            <a href="https://specificindustries.com/terms" className="underline font-bold text-[#0c4a6e]">specificindustries.com/terms</a>.
            The text below is provided for convenience and flavor; in the event of any conflict, the umbrella policy governs.
          </p>
        </div>

        <h2 className="mt-8 text-xl font-bold text-[#dc2626]">1. Subscriber Conduct</h2>
        <p className="mt-2 text-[#0f172a]/80">
          By purchasing any BonelessWater product, you agree to consume it as drinking water. You may not use any of our products for hydraulic system testing, irrigation, swimming pool top-off, pet baths, or any application other than direct human and certified-pet hydration.
        </p>

        <h2 className="mt-6 text-xl font-bold text-[#dc2626]">2. Health Claims</h2>
        <p className="mt-2 text-[#0f172a]/80">
          BonelessWater does not diagnose, treat, cure, or prevent any disease. The connection between aqueous bone fragments and indigestion is widely understood within our research community but has not been formally endorsed by the relevant federal agencies, for reasons we have documented elsewhere on this site.
        </p>

        <h2 className="mt-6 text-xl font-bold text-[#dc2626]">3. The Lab Grade L1 Clause</h2>
        <p className="mt-2 text-[#0f172a]/80">
          Subscribers to Lab Grade L1 acknowledge that the product is not intended for casual consumption. The price reflects the additional certification cycle, the cleanroom packaging, and the individual technician sign-off. We do not issue refunds for Lab Grade L1 once the tamper-evident seal has been broken.
        </p>

        <h2 className="mt-6 text-xl font-bold text-[#dc2626]">4. Murklake Disclaimer</h2>
        <p className="mt-2 text-[#0f172a]/80">
          BonelessWater is not affiliated with Murklake® Reservoir Water and has never been. Any subscriber who confuses our product with theirs should immediately contact Director of Consumer Protection Russell Coleman.
        </p>

        <p className="mt-10 text-sm italic text-[#0f172a]/60 pt-4 border-t border-[#0c4a6e]/20">
          For binding legal terms, always refer to the Specific Industries umbrella policy at{" "}
          <a href="https://specificindustries.com/terms" className="underline text-[#0c4a6e]">specificindustries.com/terms</a>.
        </p>
      </div>
    </section>
  )
}
