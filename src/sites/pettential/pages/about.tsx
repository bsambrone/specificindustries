// src/sites/pettential/pages/about.tsx
export const metadata = {
  title: "About — Pettential",
  description: "The origin story, mission, and values of Pettential. Founded after staring at a goldfish.",
}

const milestones = [
  { year: "2019", event: "Founded after Greyson Holt stared at a goldfish during a bad quarterly review and saw, in that unblinking gaze, untapped potential. He quit management consulting the next day." },
  { year: "2020", event: "Launched Aquatic Performance Division. Deployed 200 Goldfish Treadmill Pro™ units. No fish noticed. Reed Calloway published a blog post about it. Nine bots read it." },
  { year: "2021", event: "Expanded to 6 divisions. Hired division VPs for Serpent, Avian, Reptile, Farm, and Corporate Pets. Combined animal participation rate: 0%. Combined enthusiasm: unprecedented." },
  { year: "2022", event: "Launched the Enterprise coaching tier. First enterprise client enrolled three cats, a snake, and a parrot. None attended the onboarding session. The parrot repeated the calendar invite." },
  { year: "2023", event: "10,000 animals served. 0 improvements documented. The performance dashboard shows identical flat lines across all species. Barrett Sinclair calls this 'operational excellence.'" },
  { year: "2024", event: "Named 'Most Committed to Nothing' by no publication. Received zero industry awards. Internal team morale: unaffected (they believe in the mission)." },
]

const values = [
  { name: "Data-Driven", description: "The data shows nothing. We are driven by it anyway." },
  { name: "Species-Inclusive", description: "No animal turned away. No animal improved. Equal opportunity stagnation." },
  { name: "Results-Adjacent", description: "We are near results. We are beside results. We have never touched results." },
]

export default function PettentialAbout() {
  return (
    <section className="bg-[#FAFAFA]">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center">
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[#FF3366]">
            Est. 2019
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold text-[#111] font-heading">Our Story</h1>
        </div>

        {/* Brand Story */}
        <div className="mt-10 space-y-6 text-[#111]/80 leading-relaxed">
          <p>
            Pettential was born from a single, unblinking stare.
          </p>
          <p>
            In 2019, our founder Greyson Holt was sitting through a particularly brutal quarterly review when he noticed the office goldfish. It was floating in its bowl on the conference room credenza, doing nothing. Achieving nothing. Contributing nothing. And yet — it was present. It was consistent. It showed up every single day.
          </p>
          <p>
            Greyson looked at that goldfish and saw what no one else in the room could see: untapped potential. Not talent, exactly. Not ambition. But potential — raw, undefined, and completely inert. He quit management consulting the next morning and founded Pettential with a single conviction: no animal is inappropriate for human products. Only underserved.
          </p>
          <p>
            Six years, six divisions, and 10,000 animals later, Pettential has achieved a perfect track record of zero measurable improvement across every species we serve. We consider this a baseline we can build from. We have not yet built from it.
          </p>
        </div>

        {/* Metrics */}
        <div className="mt-16 bg-[#1A1A1A] rounded-xl p-8">
          <h2 className="text-2xl font-bold text-[#CCFF00] font-heading text-center mb-8">Performance Metrics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-white font-heading">+0%</div>
              <div className="text-sm text-white/50 mt-1">Productivity Increase</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white font-heading">Enhanced</div>
              <div className="text-sm text-white/50 mt-1">Presence (unverified)</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white font-heading">Improved</div>
              <div className="text-sm text-white/50 mt-1">Stakeholder Alignment (stakeholders unaware)</div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <h2 className="mt-16 text-2xl font-bold text-[#111] text-center font-heading">Company Timeline</h2>
        <div className="mt-8 space-y-6">
          {milestones.map((m, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-16 flex-shrink-0 text-right">
                <span className="font-bold text-[#CCFF00] bg-[#1A1A1A] px-2 py-1 rounded text-sm font-heading">{m.year}</span>
              </div>
              <div className="w-px bg-[#111]/10 flex-shrink-0" />
              <p className="text-sm text-[#111]/80 pb-2">{m.event}</p>
            </div>
          ))}
        </div>

        {/* Values */}
        <h2 className="mt-16 text-2xl font-bold text-[#111] text-center font-heading">Our Values</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v) => (
            <div key={v.name} className="bg-white border border-[#111]/10 rounded-xl p-6 text-center">
              <h3 className="text-lg font-bold text-[#111] font-heading">{v.name}</h3>
              <p className="mt-2 text-sm text-[#111]/60">{v.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
