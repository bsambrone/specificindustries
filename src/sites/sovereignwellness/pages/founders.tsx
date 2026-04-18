import { Hero } from "@/components/ui/hero"
import { founders } from "@/sites/sovereignwellness/data/leadership"
import { GiltFrame } from "@/sites/sovereignwellness/components/GiltFrame"

export const metadata = {
  title: "Our Founders — Sovereign Wellness Co.",
  description: "The four custodians of the Archive. Portraits, titles, and the abbreviated record of their lives in the organization.",
}

export default function SovereignWellnessFounders() {
  return (
    <>
      <Hero
        headline="Our Founders"
        subheadline="The four custodians. Their portraits hang in the office corridor. Their names are recorded below."
      />

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          {founders.map((f) => (
            <div key={f.baseImage}>
              <GiltFrame src={f.portrait} alt={f.name} name={f.name} title={f.title} />
              <div className="mt-8 space-y-4 text-foreground/80 leading-relaxed">
                {f.bio.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Founders' Oath */}
      <section className="py-20 px-4 bg-accent text-[#F5ECD7]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-[#B08C3A] mb-6">The Founders&apos; Oath</p>
          <p className="text-2xl font-heading italic leading-relaxed">
            We maintain the Archive as it was maintained before us, in the handwriting we were taught, by the light we were given. We do not advertise. We do not hurry. We do not answer the telephone. We sign in ink, and we wait for those who look for us to find us.
          </p>
          <p className="text-xs tracking-[0.3em] uppercase text-[#B08C3A] mt-8">
            Signed · the first of each year · by all four hands
          </p>
        </div>
      </section>
    </>
  )
}
