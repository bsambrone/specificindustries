export const metadata = {
  title: "A Manifesto — Meh.",
  description: "Five short meditations on lowered expectations and the devices built to meet them.",
}

const sections = [
  {
    numeral: "I",
    title: "On Lowered Expectations",
    body: [
      "We believe that a quiet, well-calibrated disappointment, encountered daily, is a more honest companion than an occasional triumph. It does not startle. It does not demand reciprocity. It is, above all, consistent — and consistency, in an object, is a form of kindness.",
      "A device that promises nothing can deliver everything it promised. This is the principal logic of our catalog. We do not sell thrills. We do not sell transformations. We sell the precise, repeatable small letdown you were, on reflection, already expecting.",
    ],
  },
  {
    numeral: "II",
    title: "On the Dignity of the Merely Adequate",
    body: [
      "Most of the objects in a human life are not excellent. Most pens write a line. Most lamps produce light. Most mornings, one rises. The dignity of these things lies in their reliability, not their ambition, and we believe that a product which acknowledges this dignity is, in its way, more honest than a product which does not.",
      "The merely adequate, we have come to think, is the correct target for a large category of household objects. Our devices aim at that target, and occasionally land slightly below it, and this is, in our view, acceptable.",
    ],
  },
  {
    numeral: "III",
    title: "The Case Against Enthusiasm",
    body: [
      "A device which enthusiastically affirms its owner is a device which flatters. Flattery, repeated, becomes suspicion. The owner, asked daily by a smart speaker whether their day was wonderful, eventually begins to doubt the speaker's sincerity. This is a reasonable doubt. The speaker is, in fact, not sincere.",
      "Our position is that a device should not attempt a performance it cannot sustain. A flat tone, a neutral sentence, a sigh — these are performances we can sustain. We have chosen to sustain them.",
    ],
  },
  {
    numeral: "IV",
    title: "Why Our Products Sigh",
    body: [
      "The soft exhale — \"oh.\", the sigh of the plush, the pause of the mirror — is a specific engineering choice. It is the sound a person makes when they encounter something slightly worse than they had hoped, and it has, in repeated tests, proved to be the most efficient carrier of the feeling we wish to transmit.",
      "Louder sounds demand response. Silent devices disappear. The sigh occupies a middle ground — acknowledged but not urgent — and this middle ground is where, we believe, quiet disappointment lives. We have built our products to live there.",
    ],
  },
  {
    numeral: "V",
    title: "A Quiet Promise",
    body: [
      "What we promise is consistency. The Beige Mood Ring will remain beige. The Late Bell will remain 0.8 seconds slow. The Are-You-Sure Clock will not escalate. Our devices behave as specified, and their specifications are, to the best of our ability, honestly described on the pages of this site. If this does not sound like a reason to make a purchase, we respect that. We are not in a hurry.",
    ],
  },
]

export default function MehManifesto() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-heading font-semibold text-primary mb-3 tracking-tight">A Manifesto</h1>
        <p className="text-foreground/60 italic mb-16">Issued from the offices of Meh., without fanfare.</p>

        <div className="space-y-16">
          {sections.map((s) => (
            <div key={s.numeral}>
              <p className="text-xs uppercase tracking-widest text-foreground/50 mb-1">{s.numeral}</p>
              <h2 className="text-2xl font-heading font-semibold text-primary mb-6">{s.title}</h2>
              <div className="space-y-5 text-foreground/80 leading-relaxed text-lg">
                {s.body.map((p, i) => (<p key={i}>{p}</p>))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-20 text-xs uppercase tracking-widest text-foreground/50 text-center">— End of text —</p>
      </div>
    </section>
  )
}
