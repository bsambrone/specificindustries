import Image from "next/image"
import { leaders } from "@/sites/petjacks/data/leadership"
import Footnote from "@/sites/petjacks/components/footnote"
import LegalFooter from "@/sites/petjacks/components/legal-footer"

export const metadata = {
  title: "Leadership — Petjacks",
  description: "The small, dedicated team leading Petjacks.",
}

function renderTitle(title: string) {
  // The Chief Veterinary Officer title carries an asterisk in the data;
  // render the asterisk as a Footnote with the spec-mandated disclosure.
  if (title.endsWith("*")) {
    const base = title.slice(0, -1)
    return (
      <>
        {base}
        <Footnote>Veterinary advisory role; not a licensed veterinarian.</Footnote>
      </>
    )
  }
  return title
}

function bioFootnote(paragraph: string): string {
  // Per-bio disclosure strings, keyed to a distinctive substring in each bio.
  if (paragraph.includes("with his own pets")) return "Founder has owned four cats during the Petjacks era. Two remain."
  if (paragraph.includes("read the safety envelope")) return "Marshall also holds the distinction of being the only member of the Whiskerwings 300 development team who declined to test it on his own cat."
  if (paragraph.includes("industry-leading")) return "Petjacks is the only company in the personal-pet-propulsion category, so this claim is technically accurate."
  return ""
}

function renderBio(paragraphs: string[]) {
  // Each bio has at most one asterisk (per the spec, "one dark-humor asterisk per bio").
  // Render the first asterisk in each paragraph as a Footnote with the paragraph's buried disclosure.
  return paragraphs.map((para, i) => {
    const idx = para.indexOf("*")
    if (idx === -1) return <p key={i} className="text-foreground/70 leading-relaxed mb-4">{para}</p>

    const before = para.slice(0, idx)
    const after = para.slice(idx + 1)
    const footnoteText = bioFootnote(para)
    return (
      <p key={i} className="text-foreground/70 leading-relaxed mb-4">
        {before}
        <Footnote>{footnoteText}</Footnote>
        {after}
      </p>
    )
  })
}

export default function PetjacksLeadership() {
  return (
    <>
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-heading font-bold text-primary mb-3">Leadership</h1>
          <p className="text-lg text-foreground/70 mb-12">Four operators. One Ohio facility. Every pet matters.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {leaders.map((l) => (
              <article key={l.name} className="flex flex-col gap-4">
                <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-secondary/30">
                  <Image src={l.portrait} alt={l.name} fill className="object-cover" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-accent mb-2">
                    {renderTitle(l.title)}
                  </div>
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-3">{l.name}</h2>
                  <div>{renderBio(l.bio)}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <LegalFooter />
    </>
  )
}
