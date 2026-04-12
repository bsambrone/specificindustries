export const metadata = {
  title: "Privacy Policy — Only Fans",
  description: "How Only Fans handles your data. Spoiler: we mostly track which fans you like.",
}

export default function OnlyFansPrivacy() {
  return (
    <section className="bg-white">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-extrabold text-[#0F172A]">Privacy Policy</h1>

        <div className="mt-6 border-l-4 border-[#00AFF0] bg-[#00AFF0]/5 p-5 rounded-r-lg">
          <p className="font-bold text-[#0F172A] mb-1">Official Umbrella Policy</p>
          <p className="text-sm text-slate-700">
            The authoritative privacy policy for all Specific Industries properties — including Only Fans — is maintained at{" "}
            <a href="https://specificindustries.com/privacy" className="underline font-bold text-[#0095CD]">specificindustries.com/privacy</a>.
            The text below is provided for convenience and flavor; in the event of any conflict, the umbrella policy governs.
          </p>
        </div>

        <p className="mt-6 text-sm italic text-slate-500">Last updated: shortly after our last quarterly board meeting, which Bill did not attend.</p>

        <h2 className="mt-8 text-xl font-bold text-[#0095CD]">1. What We Collect</h2>
        <p className="mt-2 text-slate-700">
          We collect your favorite fans, your preferred oscillation patterns, your average tip generosity, and the ambient room temperature at the time of viewing. We do not collect anything else of any consequence.
        </p>

        <h2 className="mt-6 text-xl font-bold text-[#0095CD]">2. How We Use Your Data</h2>
        <p className="mt-2 text-slate-700">
          Your data is used to recommend other fans you might enjoy and to send you the occasional email reminding you that Brenda has posted again. That is the entire scope of our use.
        </p>

        <h2 className="mt-6 text-xl font-bold text-[#0095CD]">3. Cookies</h2>
        <p className="mt-2 text-slate-700">
          We use cookies to remember which fans you have subscribed to. The cookies are stored on your device and are not transmitted to anyone, including the fans themselves, who would not know what to do with them.
        </p>

        <h2 className="mt-6 text-xl font-bold text-[#0095CD]">4. Your Rights</h2>
        <p className="mt-2 text-slate-700">
          You may unsubscribe from any fan at any time by clearing your browser&apos;s local storage. The fans will not take it personally. They are fans.
        </p>

        <p className="mt-10 text-sm italic text-slate-500 pt-4 border-t border-slate-200">
          For binding legal terms, always refer to the Specific Industries umbrella policy at{" "}
          <a href="https://specificindustries.com/privacy" className="underline text-[#0095CD]">specificindustries.com/privacy</a>.
        </p>
      </div>
    </section>
  )
}
