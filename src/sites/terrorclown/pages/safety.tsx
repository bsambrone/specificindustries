import { StampBadge } from "../components/stamp-badge"

export const metadata = {
  title: "Safety — The Pennywhistle Play Company",
  description:
    "Every Pennywhistle product is child-safe, as verified by our in-house panel of survivors. Detailed safety information for parents and guardians.",
}

const reassurances = [
  {
    heading: "Our Child-First Promise",
    body: "Every Pennywhistle toy is 100% child-safe, as verified by our in-house panel of survivors. This panel has been continuously seated since 1952.",
  },
  {
    heading: "On the matter of movement",
    body: "Terror Clown\u2122 is completely inanimate. Usually. If your Terror Clown\u2122 appears to have moved from the position in which you last placed it, this is normal. Minor settling may occur during transit, during temperature changes, and occasionally during the night. If the apparent movement persists beyond 14 days, please contact our Customer Letters Department.",
  },
  {
    heading: "On the matter of sound",
    body: "The standard Terror Clown\u2122 is silent. If you have installed the optional Voice Box Module, your Terror Clown\u2122 may speak one of twelve approved phrases at child-safe volume. If your Terror Clown\u2122 produces sound without the Voice Box Module installed, please do not attempt disassembly; contact our Customer Letters Department for guidance.",
  },
  {
    heading: "On the matter of teeth",
    body: "Terror Clown\u2019s teeth are cosmetic.* They are hand-polished to a museum-quality point as a craftsmanship feature, not a functional one. Under most conditions they pose no risk to the child. Supervision during active play is recommended for children under six.",
  },
  {
    heading: "On the matter of eyes",
    body: "Terror Clown\u2019s glass eyes are imported from Venice and factory-matched for depth. Apparent tracking behavior, particularly in peripheral vision, is an optical phenomenon of the eye\u2019s curvature and should not be interpreted literally. Replacement Eye Sets are available separately if preferred.",
  },
  {
    heading: "On nightlights",
    body: "Terror Clown\u2122 may be left in any lighting condition. Nightlights are not contraindicated, but many families find that Terror Clown\u2122 serves effectively as its own ambient presence and renders a nightlight superfluous.",
  },
  {
    heading: "On separation",
    body: "Once a bond has formed between your child and Terror Clown\u2122 (typically within 3 to 4 nights), separation is not recommended. The bond is one-directional but nonetheless firmly established. In the event of loss, damage, or unintended separation, please write to our Customer Letters Department.",
  },
  {
    heading: "What to do if concerned",
    body: "Concerns about Terror Clown\u2019s behavior, appearance, or influence on the household should be documented in writing and submitted to our Customer Letters Department, which has maintained continuous response coverage since 1949. We reply to all letters. There is no time limit for reporting.",
  },
]

export default function TerrorClownSafety() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <header className="mb-14 text-center">
        <div className="mb-6 flex justify-center">
          <StampBadge rotate={-3} variant="primary">100% Inanimate</StampBadge>
        </div>
        <h1 className="text-4xl md:text-5xl font-heading font-semibold mb-3" style={{ color: "var(--color-text, #1F1A17)" }}>
          Safety &amp; Reassurance
        </h1>
        <p className="text-lg" style={{ color: "var(--color-text, #1F1A17)", opacity: 0.75 }}>
          Every Pennywhistle toy is child-safe. Here is exactly what that means.
        </p>
      </header>

      <div className="flex flex-col gap-8">
        {reassurances.map((r, i) => (
          <section key={i} className="pb-6 border-b" style={{ borderColor: "var(--color-secondary, #3E6C6E)", borderBottomWidth: i === reassurances.length - 1 ? 0 : 1 }}>
            <h2 className="text-xl font-heading font-semibold mb-3" style={{ color: "var(--color-primary, #A8352A)" }}>
              {r.heading}
            </h2>
            <p className="leading-relaxed" style={{ color: "var(--color-text, #1F1A17)" }}>
              {r.body}
            </p>
          </section>
        ))}
      </div>

      <footer className="mt-14 pt-8 border-t text-xs italic" style={{ borderColor: "var(--color-secondary, #3E6C6E)", color: "var(--color-text, #1F1A17)", opacity: 0.6 }}>
        *Under most conditions.
      </footer>
    </main>
  )
}
