import Image from "next/image"
import { executives } from "../data/leadership"

export const metadata = {
  title: "Our Story — Odd Occasions",
  description: "How Odd Occasions was founded, and the team behind the world's most specific gift boxes.",
}

const milestones = [
  { year: "2018", event: "Gerald Bellweather spends two hours in a card shop looking for a card that says 'Sorry I accidentally liked your ex's photo from 2016.' Finds nothing. The idea is born." },
  { year: "2019", event: "First prototype box assembled: 'Sorry I Ate Your Labeled Lunch.' Gerald's coworker cries. The concept is validated." },
  { year: "2019", event: "Declan Ashworth joins as VP of Occasion Research after publishing a 47-page paper titled 'The Ungifted Moment: A Taxonomy of Unrecognized Human Experiences.'" },
  { year: "2020", event: "Theodore Lundy is hired as Head of Curation. His first act is replacing all tissue paper with 18gsm stock. 'It was the right thing to do,' he says." },
  { year: "2020", event: "The company catalogs its 500th specific occasion. 'Congrats on Parallel Parking on the First Try' is the milestone entry." },
  { year: "2021", event: "Fletcher Nye joins to lead Recipient Experience. His first recipient observation session lasts four hours. He describes it as 'revelatory.'" },
  { year: "2022", event: "Odd Occasions launches online. First order: 'Sorry I Ghosted You in 2019.' The irony is noted internally." },
  { year: "2023", event: "The 10,000th box is shipped. Gerald insists on hand-writing a note for it. It takes him forty-five minutes because the occasion was very specific." },
  { year: "2024", event: "The catalog reaches 30 curated boxes. Theodore describes the tissue paper supply chain as 'stable but vigilant.'" },
]

export default function OddOccasionsAbout() {
  return (
    <section className="bg-[#FFFDF8]">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
          <p className="text-sm font-semibold tracking-widest uppercase text-[#D4A0A0]">
            Est. 2018
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold text-[#2D2D2D] font-heading">Our Story</h1>
        </div>

        <div className="mt-10 space-y-6 text-[#2D2D2D]/80 leading-relaxed">
          <p>
            Odd Occasions was born from a simple frustration: the world is full of incredibly specific moments, and nobody makes gifts for them.
          </p>
          <p>
            Our founder, Gerald Bellweather, spent over two hours in a card shop in 2018 looking for something — anything — that acknowledged the specific situation he was in. He found cards for birthdays, anniversaries, sympathy, and graduation. He found nothing for &ldquo;Sorry I accidentally liked your ex&apos;s photo from 2016 while scrolling at 2am.&rdquo; He left empty-handed and furious.
          </p>
          <p>
            That night, he assembled the first Odd Occasions gift box on his kitchen table: a curated collection of items designed to address one very specific moment. He gave it to the person involved. They laughed. Then they cried a little. Then they said, &ldquo;How did you know?&rdquo;
          </p>
          <p>
            We&apos;ve been curating boxes for life&apos;s most specific moments ever since. Every box is assembled by hand, approved by our Head of Curation (who has strong opinions about tissue paper weight), and designed to make the recipient feel understood in a way they didn&apos;t know they needed.
          </p>
        </div>

        {/* Leadership */}
        <h2 className="mt-16 text-2xl font-bold text-[#7C9A82] text-center font-heading">The Team</h2>
        <p className="mt-2 text-center text-[#2D2D2D]/60 text-sm">Four people. Thirty boxes. An unreasonable amount of tissue paper.</p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {executives.map((exec) => (
            <div key={exec.slug} className="bg-white border border-[#7C9A82]/15 rounded-xl p-6 flex gap-4">
              <div className="relative w-24 h-24 flex-shrink-0 rounded-lg bg-[#F5F0E8] overflow-hidden">
                <Image src={exec.image} alt={exec.name} fill sizes="96px" className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-[#2D2D2D] font-heading">{exec.name}</div>
                <div className="text-xs text-[#D4A0A0] font-semibold uppercase tracking-wide">{exec.title}</div>
                <p className="mt-2 text-sm text-[#2D2D2D]/80">{exec.bio}</p>
                <p className="mt-2 text-xs italic text-[#2D2D2D]/60">&ldquo;{exec.quote}&rdquo;</p>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <h2 className="mt-16 text-2xl font-bold text-[#7C9A82] text-center font-heading">A Brief History of Specific Moments</h2>
        <div className="mt-8 space-y-6">
          {milestones.map((m, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-16 flex-shrink-0 text-right">
                <span className="font-bold text-[#7C9A82] font-heading">{m.year}</span>
              </div>
              <div className="w-px bg-[#7C9A82]/20 flex-shrink-0" />
              <p className="text-sm text-[#2D2D2D]/80 pb-2">{m.event}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
