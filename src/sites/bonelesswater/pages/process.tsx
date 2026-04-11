import Image from "next/image"
import { facts } from "../data/facts"
import { CertifiedBadge } from "../components/CertifiedBadge"
import { DidYouKnowCard } from "../components/DidYouKnowCard"

export const metadata = {
  title: "Our Process — BonelessWater",
  description: "The 47-step proprietary deboning method behind every bottle of BonelessWater.",
}

const STEPS = [
  {
    n: 1,
    title: "Extraction",
    image: "/sites/bonelesswater/process-1-extraction.png",
    body: "Source water is drawn from a verified bone-free aquifer at our Cedar Rapids facility. Each extraction event is logged, time-stamped, and reviewed by a senior BoneScan™ technician before the water enters the deboning loop.",
  },
  {
    n: 2,
    title: "Deboning",
    image: "/sites/bonelesswater/process-2-deboning.png",
    body: "The water passes through a sequence of three proprietary deboning tanks, each calibrated to a different aqueous bone particle size. The full sequence comprises 47 individual measurement and intervention steps over a 12-hour cycle.",
  },
  {
    n: 3,
    title: "Verification",
    image: "/sites/bonelesswater/process-3-verification.png",
    body: "Sample sets from every batch are pulled and analyzed in our on-site laboratory. Verification involves microscopy, spectroscopy, and a final human-eye inspection by a certified BoneScan™ technician.",
  },
  {
    n: 4,
    title: "Certification",
    image: "/sites/bonelesswater/process-4-certification.png",
    body: "Each verified batch is signed off in a sealed certification binder by the senior technician on duty. Only after that signature is the water permitted to enter the bottling line.",
  },
]

export default function BonelessWaterProcess() {
  const fact = facts.find((f) => f.slug === "filtration-limit")!

  return (
    <section className="bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
          <CertifiedBadge size="sm" label="47 STEPS · 12 HOURS · 1 STANDARD" />
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-[#0c4a6e]">Our Process</h1>
          <p className="mt-3 text-[#0f172a]/70 max-w-2xl mx-auto">
            The 47-step proprietary deboning method behind every bottle. Each phase is grouped below into the four primary stages, with detailed measurement steps internal to each phase.
          </p>
        </div>

        <div className="relative aspect-[16/9] mt-10 rounded-lg overflow-hidden border border-[#0c4a6e]/20">
          <Image
            src="/sites/bonelesswater/lab-facility.png"
            alt="BonelessWater facility interior"
            fill
            sizes="(min-width: 1024px) 768px, 100vw"
            className="object-cover"
          />
        </div>

        <div className="mt-12 space-y-12">
          {STEPS.map((step) => (
            <div key={step.n} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="relative aspect-square bg-[#0c4a6e]/5 rounded-lg overflow-hidden border border-[#0c4a6e]/20">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#0c4a6e] text-white font-extrabold flex items-center justify-center text-lg">
                    {step.n}
                  </div>
                  <h2 className="text-2xl font-bold text-[#0c4a6e]">{step.title}</h2>
                </div>
                <p className="mt-4 text-[#0f172a]/80 leading-relaxed">{step.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <DidYouKnowCard fact={fact} />
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative aspect-square rounded-lg overflow-hidden border border-[#0c4a6e]/20">
            <Image
              src="/sites/bonelesswater/blueprint.png"
              alt="Bone-removal device blueprint"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-square rounded-lg overflow-hidden border border-[#0c4a6e]/20">
            <Image
              src="/sites/bonelesswater/microscopy.png"
              alt="Microscopy of extracted skeletal residue"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
