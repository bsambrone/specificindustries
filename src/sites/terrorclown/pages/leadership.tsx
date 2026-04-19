import Image from "next/image"
import { leaders } from "../data/leadership"

export const metadata = {
  title: "Leadership — The Pennywhistle Play Company",
  description:
    "Four generations of American toymaking. Meet Cornelius P. Whistlethwaite III, Ambrose Hollingsworth, Mortimer Crane, and Silas Pennywhistle.",
}

export default function TerrorClownLeadership() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-20">
      <header className="mb-14 text-center">
        <div className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: "var(--color-secondary, #3E6C6E)" }}>
          The family
        </div>
        <h1 className="text-4xl md:text-5xl font-heading font-semibold mb-3" style={{ color: "var(--color-text, #1F1A17)" }}>
          Three generations of stewardship.
        </h1>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--color-text, #1F1A17)", opacity: 0.75 }}>
          The stewards of the Millbrook workshop. Each has served the company for a significant portion of their adult life, and in two cases considerably longer.
        </p>
      </header>

      <div className="flex flex-col gap-16">
        {leaders.map((l, i) => (
          <article key={l.name} className={`grid md:grid-cols-2 gap-10 items-start ${i % 2 === 1 ? "md:[direction:rtl]" : ""}`}>
            <div className="md:[direction:ltr]">
              <div className="relative aspect-[4/5] rounded-lg overflow-hidden border-2" style={{ borderColor: "var(--color-secondary, #3E6C6E)" }}>
                <Image src={l.portrait} alt={l.name} fill className="object-cover" />
              </div>
            </div>
            <div className="md:[direction:ltr] flex flex-col gap-4">
              <div className="text-xs uppercase tracking-[0.3em]" style={{ color: "var(--color-secondary, #3E6C6E)" }}>
                {l.title}
              </div>
              <h2 className="text-3xl font-heading font-semibold" style={{ color: "var(--color-primary, #A8352A)" }}>
                {l.name}
              </h2>
              <div className="flex flex-col gap-4 text-base leading-relaxed" style={{ color: "var(--color-text, #1F1A17)" }}>
                {l.bio.map((para, j) => <p key={j}>{para}</p>)}
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
