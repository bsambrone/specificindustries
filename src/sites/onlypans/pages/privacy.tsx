export const metadata = {
  title: "Privacy Policy — OnlyPans",
  description: "How OnlyPans handles your data. Spoiler: we mostly track which pans you like looking at.",
}

export default function OnlyPansPrivacy() {
  return (
    <section className="bg-[#FFF6ED]">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-extrabold text-[#1C0F05]">Privacy Policy</h1>

        <div className="mt-6 border-l-4 border-[#C2410C] bg-[#C2410C]/5 p-5 rounded-r-lg">
          <p className="font-bold text-[#1C0F05] mb-1">Official Umbrella Policy</p>
          <p className="text-sm text-[#7C2D12]/90">
            The authoritative privacy policy for all Specific Industries properties — including OnlyPans — is maintained at{" "}
            <a href="https://specificindustries.com/privacy" className="underline font-bold text-[#7C2D12]">specificindustries.com/privacy</a>.
            The text below is provided for convenience and flavor; in the event of any conflict, the umbrella policy governs.
          </p>
        </div>

        <p className="mt-6 text-sm italic text-[#7C2D12]/70">Last updated: the afternoon before Bill&apos;s most recent board meeting.</p>

        <h2 className="mt-8 text-xl font-bold text-[#7C2D12]">1. What We Collect</h2>
        <p className="mt-2 text-[#7C2D12]/90">
          We collect your favorite pans, your preferred pan states, your average tip generosity, and the total number of minutes you have spent looking at each pan. We do not collect anything else.
        </p>

        <h2 className="mt-6 text-xl font-bold text-[#7C2D12]">2. How We Use Your Data</h2>
        <p className="mt-2 text-[#7C2D12]/90">
          Your data is used to recommend other pans you might enjoy looking at and to send you the occasional email reminding you that Greta has been photographed again. That is the entire scope of our use.
        </p>

        <h2 className="mt-6 text-xl font-bold text-[#7C2D12]">3. Cookies</h2>
        <p className="mt-2 text-[#7C2D12]/90">
          We use cookies to remember which pans you have subscribed to. The cookies are stored on your device and are not transmitted to anyone, including the pans themselves, who would have no use for them.
        </p>

        <h2 className="mt-6 text-xl font-bold text-[#7C2D12]">4. What We Do Not Track</h2>
        <p className="mt-2 text-[#7C2D12]/90">
          We do not track your airflow preferences. That is the business model of a different company.
        </p>

        <p className="mt-10 text-sm italic text-[#7C2D12]/70 pt-4 border-t border-[#C2410C]/20">
          For binding legal terms, always refer to the Specific Industries umbrella policy at{" "}
          <a href="https://specificindustries.com/privacy" className="underline text-[#7C2D12]">specificindustries.com/privacy</a>.
        </p>
      </div>
    </section>
  )
}
