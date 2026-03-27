import Image from "next/image"
import { Hero } from "@/components/ui/hero"
import { ImageTextSection } from "@/components/ui/image-text-section"
import { PigProfile } from "@/components/ui/pig-profile"

export const metadata = {
  title: "Behind the Scenes — Pig Milk Co.",
  description: "A rare look inside the world's most specific dairy operation.",
}

export default function PigMilkBehindTheScenes() {
  return (
    <>
      {/* Hero */}
      <Hero
        headline="Behind the Scenes"
        subheadline="A rare look inside the world's most specific dairy operation."
      />

      {/* The Milking Process */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-primary">The Milking Process</h2>
        </div>
      </section>

      <ImageTextSection
        image="/sites/pigmilk/bts-selection.png"
        title="Selection"
        description="Not every pig is ready. We look for confidence, a steady gaze, and a willingness to participate. Most pigs do not have these qualities."
        imagePosition="left"
      />

      <ImageTextSection
        image="/sites/pigmilk/bts-approach.png"
        title="The Approach"
        description="Gaining a pig's trust can take anywhere from 10 minutes to 3 weeks. Kevin once took 4 months. We don't talk about Kevin's trust timeline."
        imagePosition="right"
      />

      <ImageTextSection
        image="/sites/pigmilk/bts-milking.png"
        title="Extraction"
        description="Our proprietary technique is gentle, respectful, and yields approximately one tablespoon per session. We're working on improving this. The pigs are not."
        imagePosition="left"
      />

      <ImageTextSection
        image="/sites/pigmilk/bts-bottling.png"
        title="Bottling"
        description="Straight from pig to bottle in our state-of-the-art facility. We use the term 'state-of-the-art' loosely. The art in question is finger painting."
        imagePosition="right"
      />

      {/* Our Facility */}
      <section className="relative py-24 px-4">
        <div className="absolute inset-0 -z-10">
          <Image src="/sites/pigmilk/bts-facility.png" alt="" fill className="object-cover brightness-50" />
        </div>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-3xl font-heading font-bold text-white leading-relaxed">
            Our 12,000 sq ft facility features climate-controlled pig suites, a tasting room, and a meditation garden (for the pigs, not you).
          </p>
        </div>
      </section>

      {/* Certification Badges */}
      <section className="py-12 px-4 bg-secondary/10">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-6">
          <span className="inline-block px-6 py-3 border-2 border-primary/20 rounded-full text-sm font-semibold text-foreground/70 tracking-wide uppercase">
            ISO 9001 Pig Certified
          </span>
          <span className="inline-block px-6 py-3 border-2 border-primary/20 rounded-full text-sm font-semibold text-foreground/70 tracking-wide uppercase">
            USDA Pirganic
          </span>
          <span className="inline-block px-6 py-3 border-2 border-primary/20 rounded-full text-sm font-semibold text-foreground/70 tracking-wide uppercase">
            Non-GMO (the pigs eat whatever they want)
          </span>
        </div>
      </section>

      {/* Meet the Pigs */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-primary text-center mb-12">
            Meet the Pigs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <PigProfile
              image="/sites/pigmilk/pig-duchess.png"
              name="Duchess"
              bio="Our top producer. 3-time Employee of the Month. Refuses to make eye contact."
              stats={[
                { label: "Milk Output", value: "High" },
                { label: "Temperament", value: "Regal" },
                { label: "Favorite Snack", value: "Your respect" },
              ]}
            />
            <PigProfile
              image="/sites/pigmilk/pig-kevin.png"
              name="Kevin"
              bio="Kevin is trying his best. His milk is... fine."
              stats={[
                { label: "Milk Output", value: "Low" },
                { label: "Temperament", value: "Anxious" },
                { label: "Favorite Snack", value: "Anything on the ground" },
              ]}
            />
            <PigProfile
              image="/sites/pigmilk/pig-barbara.png"
              name="Barbara"
              bio="Retired. Now serves in an advisory capacity (sleeps in the sun)."
              stats={[
                { label: "Milk Output", value: "N/A" },
                { label: "Temperament", value: "Unbothered" },
                { label: "Favorite Snack", value: "Peace and quiet" },
              ]}
            />
            <PigProfile
              image="/sites/pigmilk/pig-sir-oinks.png"
              name="Sir Oinks-a-Lot"
              bio="The source of our Rabid Froth Pint. We love him from a safe distance."
              stats={[
                { label: "Milk Output", value: "Unpredictable" },
                { label: "Temperament", value: "Chaotic" },
                { label: "Favorite Snack", value: "Classified" },
              ]}
            />
          </div>
        </div>
      </section>
    </>
  )
}
