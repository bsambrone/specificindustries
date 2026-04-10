import { InfomercialBand } from "../components/InfomercialBand"

export const metadata = {
  title: "Terms of Use — Mousetrap Jenga",
  description: "By playing Mousetrap Jenga, you agree to these terms.",
}

export default function MousetrapJengaTerms() {
  return (
    <>
      <InfomercialBand bgColor="primary" textColor="light" verticalPadding="lg" bordered={false}>
        <div className="text-center">
          <h1 className="font-heading text-5xl md:text-6xl text-[#FFD23F] drop-shadow-[4px_4px_0_#1A1F4C]">Terms of Use</h1>
          <p className="text-[#FFF6E8]/90 mt-4 italic">By playing, you agree to these terms!</p>
        </div>
      </InfomercialBand>

      <InfomercialBand bgColor="background" verticalPadding="lg">
        <div className="max-w-3xl mx-auto space-y-6 text-[#1A1F4C]/90">
          <div className="border-4 border-[#1A1F4C] bg-[#FFD23F] p-5 shadow-[6px_6px_0_0_#1A1F4C]">
            <p className="font-bold text-[#1A1F4C] mb-2">Official Umbrella Policy</p>
            <p className="text-sm">
              The authoritative Terms of Use for all Specific Industries properties — including Mousetrap Jenga — is maintained at{" "}
              <a href="https://specificindustries.com/terms" className="underline font-bold text-[#D4281F] hover:text-[#1A1F4C]">specificindustries.com/terms</a>.
              The text below is provided for convenience and flavor; in the event of any conflict, the umbrella policy governs.
            </p>
          </div>

          <p className="text-sm italic text-[#1A1F4C]/60">Last updated: Whenever our legal team is feeling brave.</p>

          <h2 className="font-heading text-2xl text-[#D4281F]">1. Acceptance</h2>
          <p>
            By purchasing, unboxing, assembling, arming, or otherwise engaging with any Mousetrap Jenga product, you agree to these Terms of Use. You also agree that you have read the instructions, the warnings, and the laminated card titled &ldquo;What to Tell the Paramedics.&rdquo;
          </p>

          <h2 className="font-heading text-2xl text-[#D4281F]">2. Assumption of Risk</h2>
          <p>
            Mousetrap Jenga is, by design, a game that involves armed traps. Players voluntarily assume all risks associated with gameplay, including but not limited to: pinched fingers, bruised fingers, slightly-crushed fingers, very-crushed fingers, and (in the case of certain premium editions) entire limbs.
          </p>

          <h2 className="font-heading text-2xl text-[#D4281F]">3. Age Restrictions</h2>
          <p>
            Mousetrap Jenga is rated for ages 8 and up! We trust parents and guardians to determine whether their children are mature enough to play. We do NOT trust the parents who bought the Leg-Hold Championship for a child&apos;s birthday party, and we regret mailing that order.
          </p>

          <h2 className="font-heading text-2xl text-[#D4281F]">4. Warranty</h2>
          <p>
            All Mousetrap Jenga products come with a cheerful 30-day limited warranty covering manufacturing defects. The warranty does NOT cover damage from normal gameplay (including trap deployment into yourself) because that&apos;s, you know, the game.
          </p>

          <h2 className="font-heading text-2xl text-[#D4281F]">5. Tournament Conduct</h2>
          <p>
            Players participating in sanctioned Mousetrap Jenga tournaments must adhere to the Code of Conduct established by Commissioner Harold Pemberton. Violators may be disqualified, fined, or (for severe violations) asked to please stop coming to our tournaments.
          </p>

          <p className="text-sm italic text-[#1A1F4C]/60 pt-4 border-t border-[#1A1F4C]/20">
            For binding legal terms, always refer to the Specific Industries umbrella policy at{" "}
            <a href="https://specificindustries.com/terms" className="underline text-[#D4281F]">specificindustries.com/terms</a>.
          </p>
        </div>
      </InfomercialBand>
    </>
  )
}
