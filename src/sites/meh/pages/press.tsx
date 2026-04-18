export const metadata = {
  title: "Press — Meh.",
  description: "What they are saying, in approximately these words.",
}

const quotes = [
  { quote: "Technically fine.", pub: "Wirecutter" },
  { quote: "The design is so restrained it begins to feel like surrender.", pub: "Dwell" },
  { quote: "I have purchased three.", pub: "The New Yorker" },
  { quote: "A brand that understands the current emotional weather.", pub: "Monocle" },
  { quote: "Possibly the most honest thing to happen to consumer electronics this year.", pub: "Wired" },
  { quote: "Not the gadgets we wanted. The gadgets we were due.", pub: "Fast Company" },
  { quote: "The Motivational Frame is the best thing I own that does almost nothing.", pub: "Kinfolk" },
  { quote: "It is hard to explain why I like this. I like this.", pub: "The Atlantic" },
  { quote: "A deeply calming purchase decision.", pub: "Architectural Digest" },
  { quote: "Priced within reason.", pub: "The Economist" },
  { quote: "I would not describe it as joyful. I would describe it as correct.", pub: "Bon Appétit" },
  { quote: "Sixteen SKUs. Sixteen quiet decisions.", pub: "Esquire" },
]

export default function MehPress() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-16 max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-heading font-semibold text-primary mb-4 tracking-tight">Press</h1>
          <p className="text-foreground/80 leading-relaxed">
            Selected coverage of Meh. from the last twelve months. Most of the quotes below are, in our reading, positive.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-14 border-t border-foreground/30 pt-14">
          {quotes.map((q, i) => (
            <div key={i}>
              <p className="text-xl font-heading text-primary leading-snug mb-4">&ldquo;{q.quote}&rdquo;</p>
              <p className="text-xs uppercase tracking-widest text-foreground/60">— {q.pub}</p>
            </div>
          ))}
        </div>

        <p className="mt-20 text-center text-xs uppercase tracking-widest text-foreground/50">Press inquiries, ext. 0011</p>
      </div>
    </section>
  )
}
