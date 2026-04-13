// src/sites/pettential/pages/privacy.tsx
export const metadata = {
  title: "Privacy Policy — Pettential",
  description: "How Pettential handles your data and your pet's performance metrics.",
}

export default function PettentialPrivacy() {
  return (
    <section className="bg-[#FAFAFA]">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-[#111] font-heading">Privacy Policy</h1>

        <div className="mt-6 border-l-4 border-[#CCFF00] bg-[#CCFF00]/10 p-5 rounded-r-lg">
          <p className="font-bold text-[#111] mb-1">Official Umbrella Policy</p>
          <p className="text-sm text-[#111]/80">
            The authoritative privacy policy for all Specific Industries properties — including Pettential — is maintained at{" "}
            <a href="https://specificindustries.com/privacy" className="underline font-bold text-[#FF3366]">specificindustries.com/privacy</a>.
            The text below is provided for convenience and flavor; in the event of any conflict, the umbrella policy governs.
          </p>
        </div>

        <p className="mt-6 text-sm italic text-[#111]/60">Last updated: the morning the performance dashboard showed no change again.</p>

        <h2 className="mt-8 text-xl font-bold text-[#FF3366] font-heading">1. What We Collect</h2>
        <p className="mt-2 text-[#111]/80">
          We collect the information necessary to process your order and assign a performance coach to your pet: your name, shipping address, billing details, pet species, and your pet&apos;s current career level. We also collect performance data from our tracking wearables, which consistently shows no activity. We retain this data because consistency is a value.
        </p>

        <h2 className="mt-6 text-xl font-bold text-[#FF3366] font-heading">2. How We Use Your Data</h2>
        <p className="mt-2 text-[#111]/80">
          Your data is used to ship performance products, generate quarterly performance reviews your pet will not read, and produce executive dashboards that show flat lines. We may also use browsing data to recommend products for species you have not yet attempted to optimize. This is a feature, not surveillance.
        </p>

        <h2 className="mt-6 text-xl font-bold text-[#FF3366] font-heading">3. Pet Performance Data</h2>
        <p className="mt-2 text-[#111]/80">
          Performance data collected from our wearables and coaching sessions is stored indefinitely. We do this not because the data is useful — it shows nothing — but because deleting it would imply we&apos;ve given up. We have not given up. We may never give up. The flat lines are part of a larger story we haven&apos;t finished telling.
        </p>

        <h2 className="mt-6 text-xl font-bold text-[#FF3366] font-heading">4. Cookies</h2>
        <p className="mt-2 text-[#111]/80">
          We use cookies to remember which performance division you browsed most recently and which products are in your cart. Your pet does not understand cookies. Neither the browser kind nor the edible kind, depending on species.
        </p>

        <h2 className="mt-6 text-xl font-bold text-[#FF3366] font-heading">5. Data Sharing</h2>
        <p className="mt-2 text-[#111]/80">
          We do not share your data with third parties. We considered sharing anonymized performance data with academic researchers, but they declined after reviewing the results. &ldquo;There is nothing to study,&rdquo; they said. We disagreed but respected their position.
        </p>

        <p className="mt-10 text-sm italic text-[#111]/60 pt-4 border-t border-[#111]/10">
          For binding legal terms, always refer to the Specific Industries umbrella policy at{" "}
          <a href="https://specificindustries.com/privacy" className="underline text-[#FF3366]">specificindustries.com/privacy</a>.
        </p>
      </div>
    </section>
  )
}
