export const metadata = {
  title: "Privacy Policy — Boneless Water",
  description: "How Boneless Water handles your data. We collect almost nothing.",
}

export default function BonelessWaterPrivacy() {
  return (
    <section className="bg-white">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-extrabold text-[#0c4a6e]">Privacy Policy</h1>

        <div className="mt-6 border-l-4 border-[#0c4a6e] bg-[#0c4a6e]/5 p-5 rounded-r-lg">
          <p className="font-bold text-[#0f172a] mb-1">Official Umbrella Policy</p>
          <p className="text-sm text-[#0f172a]/80">
            The authoritative privacy policy for all Specific Industries properties — including Boneless Water — is maintained at{" "}
            <a href="https://specificindustries.com/privacy" className="underline font-bold text-[#0c4a6e]">specificindustries.com/privacy</a>.
            The text below is provided for convenience and flavor; in the event of any conflict, the umbrella policy governs.
          </p>
        </div>

        <p className="mt-6 text-sm italic text-[#0f172a]/60">Last updated: the morning Vincent Dunn finished his quarterly audit.</p>

        <h2 className="mt-8 text-xl font-bold text-[#dc2626]">1. What We Collect</h2>
        <p className="mt-2 text-[#0f172a]/80">
          We collect the minimum information necessary to fulfill orders: name, shipping address, billing details, and a record of which products you have purchased. We do not collect your indigestion history. We do not need to.
        </p>

        <h2 className="mt-6 text-xl font-bold text-[#dc2626]">2. How We Use Your Data</h2>
        <p className="mt-2 text-[#0f172a]/80">
          Your data is used to ship you certified bone-free water and to occasionally email you about new research. That is the entire scope of our use.
        </p>

        <h2 className="mt-6 text-xl font-bold text-[#dc2626]">3. What We Will Not Do</h2>
        <p className="mt-2 text-[#0f172a]/80">
          We will not share your purchase history with major bottled water industry data brokers. We will not enroll you in third-party wellness platforms. We will not sell your information to anyone, ever, under any circumstances. This is not a marketing claim. It is a structural policy.
        </p>

        <h2 className="mt-6 text-xl font-bold text-[#dc2626]">4. Cookies</h2>
        <p className="mt-2 text-[#0f172a]/80">
          We use only the cookies necessary for the cart to remember what you have added. No tracking cookies. No advertising cookies. No third-party analytics platforms beyond what the Specific Industries umbrella infrastructure requires.
        </p>

        <p className="mt-10 text-sm italic text-[#0f172a]/60 pt-4 border-t border-[#0c4a6e]/20">
          For binding legal terms, always refer to the Specific Industries umbrella policy at{" "}
          <a href="https://specificindustries.com/privacy" className="underline text-[#0c4a6e]">specificindustries.com/privacy</a>.
        </p>
      </div>
    </section>
  )
}
