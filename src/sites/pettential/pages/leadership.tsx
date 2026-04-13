// src/sites/pettential/pages/leadership.tsx
import Image from "next/image"
import Link from "next/link"
import { getSiteHref } from "@/lib/site-href"
import { executives } from "../data/leadership"

export const metadata = {
  title: "Team — Pettential",
  description: "Meet the leadership team behind Pettential's six performance divisions.",
}

export default async function PettentialLeadership() {
  const siteHref = await getSiteHref()

  return (
    <>
      {/* Hero */}
      <section className="bg-[#1A1A1A] text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[#CCFF00]">
            Leadership
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold font-heading">
            The Team Behind the Potential
          </h1>
          <p className="mt-4 text-white/60 max-w-xl mx-auto">
            Four professionals who have dedicated their careers to improving animal performance. None have succeeded. All remain committed.
          </p>
        </div>
      </section>

      {/* Executive Grid */}
      <section className="bg-[#FAFAFA] py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 gap-8">
            {executives.map((exec) => (
              <div key={exec.slug} className="bg-white border border-[#111]/10 rounded-xl overflow-hidden flex flex-col md:flex-row">
                <div className="relative w-full md:w-56 aspect-[4/5] bg-[#1A1A1A]/5 shrink-0">
                  <Image src={exec.image} alt={exec.name} fill className="object-cover object-top" />
                </div>
                <div className="p-6 flex-1">
                  <h3 className="text-2xl font-bold text-[#111] font-heading">{exec.name}</h3>
                  <p className="text-[#FF3366] font-medium mt-1">{exec.title}</p>
                  <p className="mt-4 text-sm text-[#111]/70 leading-relaxed">{exec.bio}</p>
                  <blockquote className="mt-4 border-l-2 border-[#CCFF00] pl-4 text-sm text-[#111]/60 italic">
                    &ldquo;{exec.quote}&rdquo;
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#CCFF00] py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-[#111] font-heading">Work With Us</h2>
          <p className="mt-3 text-[#111]/70">
            Our leadership team is available for consultations, speaking engagements, and other arrangements that do not require measurable outcomes.
          </p>
          <Link
            href={siteHref("/contact")}
            className="mt-8 inline-block bg-[#111] hover:bg-[#333] text-white font-bold rounded-lg px-8 py-3 transition-colors font-heading uppercase tracking-wider"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  )
}
