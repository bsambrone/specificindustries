// src/sites/pettential/pages/contact.tsx
import Image from "next/image"
import { executives } from "../data/leadership"
import { FaqAccordion } from "@/components/ui/faq-accordion"

export const metadata = {
  title: "Contact — Pettential",
  description: "Schedule a consultation for your pet. They won't attend, but we'll be there.",
}

const contactFaqs = [
  { question: "Do you work with exotic species?", answer: "We work with every species. None of them have ever responded to our outreach, but we remain open." },
  { question: "Can I book a session for multiple pets?", answer: "Yes. Our Multi-Species Synergy Package allows up to 5 animals in a single coaching session. Historically, zero of the five attend." },
  { question: "Where is your office?", answer: "Suite 0, The Terrarium, Floor G (Ground Level Only), 1 Performance Boulevard, Nowhere, ZZ 00000. Visitors welcome. Animals indifferent." },
]

export default function PettentialContact() {
  return (
    <section className="bg-[#FAFAFA]">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[#FF3366]">
            Get in touch
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold text-[#111] font-heading">
            Schedule a Consultation
          </h1>
          <p className="mt-3 text-[#111]/70 max-w-2xl mx-auto">
            Tell us about your pet&apos;s performance goals. We&apos;ll tell you they&apos;re achievable. They are not. But we&apos;ll tell you.
          </p>
        </div>

        {/* Team grid */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
          {executives.map((exec) => (
            <div key={exec.slug} className="bg-white border border-[#111]/10 rounded-xl overflow-hidden">
              <div className="relative aspect-square bg-[#1A1A1A]/5">
                <Image src={exec.image} alt={exec.name} fill sizes="20vw" className="object-cover" />
              </div>
              <div className="p-2 text-center">
                <div className="font-bold text-[#111] text-xs font-heading">{exec.name}</div>
                <div className="text-[9px] text-[#FF3366] font-semibold uppercase tracking-wide mt-0.5">{exec.title}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="mt-12 bg-white border border-[#111]/10 rounded-xl p-8">
          <h2 className="font-bold text-[#111] font-heading text-lg">Pet Performance Consultation Request</h2>
          <p className="mt-2 text-sm text-[#111]/60">
            Fill out the form below and a member of our team will assess your pet&apos;s underperformance.
          </p>
          <form className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#111]/80 mb-1">Your name</label>
              <input type="text" placeholder="The human filing this request" className="w-full border border-[#111]/15 rounded-lg px-4 py-2 text-sm bg-[#FAFAFA]" disabled />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#111]/80 mb-1">Email</label>
              <input type="email" placeholder="you@example.com" className="w-full border border-[#111]/15 rounded-lg px-4 py-2 text-sm bg-[#FAFAFA]" disabled />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#111]/80 mb-1">Pet species</label>
              <input type="text" placeholder="e.g., Goldfish, Snake, Cat, Goat" className="w-full border border-[#111]/15 rounded-lg px-4 py-2 text-sm bg-[#FAFAFA]" disabled />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#111]/80 mb-1">Pet&apos;s current career level</label>
              <select className="w-full border border-[#111]/15 rounded-lg px-4 py-2 text-sm bg-[#FAFAFA] text-[#111]/60" disabled>
                <option>Unemployed</option>
                <option>Entry-Level</option>
                <option>Mid-Career Crisis</option>
                <option>Executive</option>
                <option>Retired But Restless</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#111]/80 mb-1">Describe your pet&apos;s performance gap</label>
              <textarea placeholder="Be specific. 'My fish won't make eye contact' is more actionable than 'my fish seems off.'" rows={4} className="w-full border border-[#111]/15 rounded-lg px-4 py-2 text-sm bg-[#FAFAFA]" disabled />
            </div>
            <button type="button" className="w-full bg-[#CCFF00]/30 text-[#111]/40 font-bold rounded-lg py-3 cursor-not-allowed" disabled>
              Submit for Review (Consultations Currently at Capacity)
            </button>
          </form>
        </div>

        {/* FAQ */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-[#111] font-heading text-center mb-8">Common Questions</h2>
          <FaqAccordion items={contactFaqs} />
        </div>

        <p className="mt-10 text-center text-[10px] text-[#111]/40">
          For real inquiries: bsambrone@gmail.com
        </p>
      </div>
    </section>
  )
}
