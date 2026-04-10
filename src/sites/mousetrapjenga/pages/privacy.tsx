import { InfomercialBand } from "../components/InfomercialBand"

export const metadata = {
  title: "Privacy Policy — Mousetrap Jenga",
  description: "How Mousetrap Jenga handles your data. Spoiler: we take it as seriously as family fun!",
}

export default function MousetrapJengaPrivacy() {
  return (
    <>
      <InfomercialBand bgColor="primary" textColor="light" verticalPadding="lg" bordered={false}>
        <div className="text-center">
          <h1 className="font-heading text-5xl md:text-6xl text-[#FFD23F] drop-shadow-[4px_4px_0_#1A1F4C]">Privacy Policy</h1>
          <p className="text-[#FFF6E8]/90 mt-4 italic">We take your privacy as seriously as we take family fun! (That&apos;s VERY seriously!)</p>
        </div>
      </InfomercialBand>

      <InfomercialBand bgColor="background" verticalPadding="lg">
        <div className="max-w-3xl mx-auto space-y-6 text-[#1A1F4C]/90">
          <div className="border-4 border-[#1A1F4C] bg-[#FFD23F] p-5 shadow-[6px_6px_0_0_#1A1F4C]">
            <p className="font-bold text-[#1A1F4C] mb-2">Official Umbrella Policy</p>
            <p className="text-sm">
              The authoritative privacy policy for all Specific Industries properties — including Mousetrap Jenga — is maintained at{" "}
              <a href="https://specificindustries.com/privacy" className="underline font-bold text-[#D4281F] hover:text-[#1A1F4C]">specificindustries.com/privacy</a>.
              The text below is provided for convenience and flavor; in the event of any conflict, the umbrella policy governs.
            </p>
          </div>

          <p className="text-sm italic text-[#1A1F4C]/60">Last updated: Whenever our legal team finishes their lunch break.</p>

          <h2 className="font-heading text-2xl text-[#D4281F]">1. What We Collect</h2>
          <p>
            We collect your name, mailing address, edition preference, and an estimate of your starting finger count (for product fit purposes). We do NOT collect your ending finger count — that&apos;s between you and your household.
          </p>

          <h2 className="font-heading text-2xl text-[#D4281F]">2. What We Don&apos;t Collect</h2>
          <p>
            We do not collect judgment. If you&apos;re here shopping for a game that is advertised as &ldquo;the best way to lose a finger,&rdquo; we are in no position to criticize your choices. Welcome to the family!
          </p>

          <h2 className="font-heading text-2xl text-[#D4281F]">3. How We Use Your Information</h2>
          <p>
            Your information is used to fulfill orders, send you exciting product updates, and occasionally mail you commemorative certificates when you achieve new milestones (first injury, first championship, first amputation, etc.).
          </p>

          <h2 className="font-heading text-2xl text-[#D4281F]">4. Cookies</h2>
          <p>
            This website uses digital cookies, not the kind that crumble. The crumble kind come with every Home Tournament Scoreboard order (limited-time offer).
          </p>

          <h2 className="font-heading text-2xl text-[#D4281F]">5. Your Rights</h2>
          <p>
            You may request a copy of all personal data we hold about you. It will be mailed to the address on file in a sturdy manila envelope with a hand-written &ldquo;FRAGILE&rdquo; label, even though it&apos;s just paper.
          </p>

          <p className="text-sm italic text-[#1A1F4C]/60 pt-4 border-t border-[#1A1F4C]/20">
            For binding legal terms, always refer to the Specific Industries umbrella policy at{" "}
            <a href="https://specificindustries.com/privacy" className="underline text-[#D4281F]">specificindustries.com/privacy</a>.
          </p>
        </div>
      </InfomercialBand>
    </>
  )
}
