import { leaders } from "../data/leadership"

export const metadata = {
  title: "Leadership — Prechewed™",
  description: "The team leading Prechewed Labs. Founder Theodore Whitlock; Chief Mastication Officer Orson Mackey; Head of Product Rowan Talbot; Chief Science Officer Jasper Lund, PhD.",
}

export default function PrechewedLeadership() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-20">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-semibold mb-3">Leadership</h1>
        <p className="text-lg" style={{ color: "var(--color-muted, #6C6A7D)" }}>
          Four operators. One mission.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-10">
        {leaders.map((l) => (
          <article key={l.name} className="flex flex-col gap-4">
            <div
              className="aspect-[4/5] bg-cover bg-center rounded-lg"
              style={{ backgroundImage: `url('${l.portrait}')`, backgroundColor: "#F1EFFA" }}
            />
            <div>
              <div className="text-xs font-mono uppercase tracking-[0.2em] mb-2" style={{ color: "var(--color-primary, #5B3FD9)" }}>{l.title}</div>
              <h2 className="text-2xl font-semibold mb-3">{l.name}</h2>
              <div className="flex flex-col gap-3 text-base leading-relaxed">
                {l.bio.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
