import Image from "next/image"
import { Hero } from "@/components/ui/hero"
import { ImageTextSection } from "@/components/ui/image-text-section"

export const metadata = {
  title: "Behind the Scenes — True Grit Personal Care",
  description: "A look inside our state-of-the-art manufacturing facility.",
}

export default function BehindTheScenes() {
  return (
    <>
      <Hero
        headline="Behind the Scenes"
        subheadline="A look inside the facility where comfort goes to meet its match."
        image="/sites/truegrit/bts-hero.png"
      />

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-primary uppercase tracking-wide">The Manufacturing Process</h2>
          <p className="text-foreground/60 mt-2">From raw abrasive to personal care product in just 47 carefully supervised steps.</p>
        </div>
      </section>

      <ImageTextSection
        image="/sites/truegrit/bts-sandblaster.png"
        title="Raw Material Processing"
        description="Our aluminum oxide abrasive arrives in industrial drums from certified quarries. Each batch is tested for grit consistency using equipment originally designed for automotive paint stripping. Our quality team has adapted it for personal care applications with only minor modifications."
        imagePosition="left"
      />

      <ImageTextSection
        image="/sites/truegrit/bts-belt-sander.png"
        title="Precision Cutting"
        description="Each sheet is cut to exact specifications using industrial belt sanders repurposed as cutting stations. Our operators — who have all signed extensive NDAs and liability waivers — handle each sheet with the care and quiet resignation of people who know exactly what this product is for."
        imagePosition="right"
      />

      <ImageTextSection
        image="/sites/truegrit/bts-grinding.png"
        title="Quality Control"
        description="Every roll undergoes rigorous testing. Grit density is measured with calipers. Tensile strength is verified on equipment borrowed from a nearby construction site. And the 'comfort test'... well, we've had some turnover in that department."
        imagePosition="left"
      />

      <ImageTextSection
        image="/sites/truegrit/bts-packaging.png"
        title="Packaging & Shipping"
        description="Finished rolls are packaged in our signature industrial packaging, complete with safety data sheet and the disclaimer insert that our lawyers insist on. Each box is sealed with a sticker that reads 'Handle With Confidence.' The workers who apply these stickers have been observed smirking."
        imagePosition="right"
      />

      <section className="relative py-24 px-4">
        <div className="absolute inset-0 -z-10">
          <Image src="/sites/truegrit/bts-facility.png" alt="" fill className="object-cover brightness-50" />
        </div>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-3xl font-heading font-bold text-white leading-relaxed">
            Our 15,000 sq ft facility features industrial-grade manufacturing equipment, a testing laboratory,
            and a break room with a first aid station that sees more use than average.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 bg-secondary/10">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-6">
          <span className="inline-block px-6 py-3 border-2 border-primary/20 rounded-full text-sm font-semibold text-foreground/70 tracking-wide uppercase">
            Non-GMO Certified
          </span>
          <span className="inline-block px-6 py-3 border-2 border-primary/20 rounded-full text-sm font-semibold text-foreground/70 tracking-wide uppercase">
            Free Range Abrasives
          </span>
          <span className="inline-block px-6 py-3 border-2 border-primary/20 rounded-full text-sm font-semibold text-foreground/70 tracking-wide uppercase">
            OSHA Pending Review
          </span>
        </div>
      </section>

      <section className="py-6 px-4 bg-foreground/5 border-t border-foreground/10">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-foreground/40 text-center leading-relaxed">
            * Facility tours are not available to the public due to insurance restrictions. The workers pictured have consented
            to appear in these images and have been compensated with premium health insurance, which they report using frequently.
          </p>
        </div>
      </section>
    </>
  )
}
