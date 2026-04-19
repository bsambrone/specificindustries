import Image from "next/image"
import Link from "next/link"
import Footnote from "@/sites/petjacks/components/footnote"
import LegalFooter from "@/sites/petjacks/components/legal-footer"
import { leaders } from "@/sites/petjacks/data/leadership"

export const metadata = {
  title: "About — Petjacks",
  description: "The story of how Petjacks came to be — one cat, one window, and an unreasonable amount of love.",
}

export default function PetjacksAbout() {
  return (
    <>
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-accent mb-2">Our Story</p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">One cat. One window. One unreasonable idea.</h1>

          <p className="text-lg text-foreground/70 leading-relaxed mb-5">
            In 2022, our founder Callum was watching his tabby gaze longingly out a bedroom window when he had a
            simple, persistent thought: <em>why can&apos;t she?</em> The question followed him for months. It
            wouldn&apos;t leave. Eventually he assembled a team and got to work.
          </p>

          <p className="text-lg text-foreground/70 leading-relaxed mb-5">
            Four years later, Petjacks has served thousands of pet families across the country<Footnote>&quot;Served&quot; is used here in the hospitality sense and does not imply mission success.</Footnote>.
            Our products have opened the sky to cats, dogs, rabbits, and fish — a technical and emotional achievement
            we could not have imagined when we started.
          </p>

          <p className="text-lg text-foreground/70 leading-relaxed mb-5">
            We build every jetpack with the same care we would bring to our own pets, and we test every product
            in our Ohio facility before shipping it to a family.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 bg-secondary/30">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image src="/sites/petjacks/facility.png" alt="Petjacks Ohio facility" fill className="object-cover" />
          </div>
          <div>
            <h2 className="text-2xl font-heading font-bold text-primary mb-3">Our Ohio Facility</h2>
            <p className="text-foreground/70 leading-relaxed mb-4">
              Every Petjacks product is hand-assembled and bench-tested at our modest facility in southwestern Ohio.
              We keep our own small pad on-site for controlled thrust validation<Footnote>Members of the public are not permitted on the pad for safety reasons.</Footnote> and team-member pet appreciation days.
            </p>
            <p className="text-foreground/70 leading-relaxed">
              We are proud to be a wholly-owned subsidiary of Specific Industries.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="text-2xl font-heading font-bold text-primary">The team</h2>
            <Link href="/leadership" className="text-sm font-mono text-accent hover:underline">
              Full bios →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {leaders.map((l) => (
              <Link key={l.name} href="/leadership" className="flex flex-col gap-3 group">
                <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-secondary/30">
                  <Image src={l.portrait} alt={l.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-widest text-accent">
                    {l.title.endsWith("*") ? l.title.slice(0, -1) : l.title}
                  </p>
                  <p className="text-base font-heading font-semibold text-foreground group-hover:underline">
                    {l.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <LegalFooter />
    </>
  )
}
