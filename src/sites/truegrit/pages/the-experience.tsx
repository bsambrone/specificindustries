import Image from "next/image"
import { Hero } from "@/components/ui/hero"
import { ImageTextSection } from "@/components/ui/image-text-section"
import { TestimonialGrid } from "@/components/ui/testimonial-grid"
import { CTABanner } from "@/components/ui/cta-banner"

export const metadata = {
  title: "The Experience — True Grit Personal Care",
  description: "A journey through the True Grit personal cleansing process and its aftermath. Brace yourself.",
}

export default function TheExperience() {
  return (
    <>
      <Hero
        headline="The Experience"
        subheadline="A four-stage journey toward unprecedented cleanliness — and everything that comes after."
        image="/sites/truegrit/experience-hero.png"
      />

      {/* Stage 1: Preparation */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-primary uppercase tracking-wide">Stage 1: Preparation</h2>
          <p className="text-foreground/60 mt-2">The calm before the clean.</p>
        </div>
      </section>

      <ImageTextSection
        image="/sites/truegrit/experience-prep-1.png"
        title="Assessing the Situation"
        description="Every True Grit session begins with a moment of reflection. Our users report a range of emotions at this stage: determination, resolve, and a quiet, growing concern that is entirely appropriate."
        imagePosition="left"
      />

      <ImageTextSection
        image="/sites/truegrit/experience-prep-2.png"
        title="Reading the Instructions"
        description="We recommend reading the full instructions before your first use. Most customers describe this as 'the last moment of peace.' The instructions are detailed. The warnings are numerous. Both are there for good reason."
        imagePosition="right"
      />

      {/* Stage 2: Application */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-primary uppercase tracking-wide">Stage 2: Application</h2>
          <p className="text-foreground/60 mt-2">The moment of truth.</p>
        </div>
      </section>

      <ImageTextSection
        image="/sites/truegrit/experience-application-1.png"
        title="Initial Contact"
        description="The first application is always memorable. Our focus groups describe it as 'immediate,' 'comprehensive,' and 'a sound I didn't know I could make.' The abrasive surface makes full contact with the target area, initiating what our engineers call 'the cleansing event.'"
        imagePosition="left"
      />

      <ImageTextSection
        image="/sites/truegrit/experience-application-2.png"
        title="The Deep Clean"
        description="As the cleaning progresses, users enter what we call 'the zone.' This is characterized by heightened awareness, rapid breathing, and an urgent desire to have purchased the Recovery Balm. This is normal. This is the product working as intended."
        imagePosition="right"
      />

      {/* Stage 3: Realization */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-primary uppercase tracking-wide">Stage 3: Realization</h2>
          <p className="text-foreground/60 mt-2">The dawning understanding.</p>
        </div>
      </section>

      <ImageTextSection
        image="/sites/truegrit/experience-realization-1.png"
        title="The Turning Point"
        description="At approximately the midpoint of the session, users experience what we call 'The Realization.' This is the moment where the full scope of the True Grit commitment becomes apparent. Facial expressions at this stage are remarkably consistent across all test subjects."
        imagePosition="left"
      />

      {/* Stage 4: Acceptance */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-primary uppercase tracking-wide">Stage 4: Acceptance</h2>
          <p className="text-foreground/60 mt-2">It is done. You are clean. Unquestionably, irrevocably clean.</p>
        </div>
      </section>

      <ImageTextSection
        image="/sites/truegrit/experience-acceptance-1.png"
        title="The Aftermath Begins"
        description="The session is complete. Users at this stage report a complex mixture of emotions: relief that it's over, pride in their thoroughness, and a quiet resolve to keep the Recovery Balm closer next time. The cleanliness, however, is undeniable."
        imagePosition="right"
      />

      {/* Disclaimer */}
      <section className="py-6 px-4 bg-foreground/5 border-t border-foreground/10">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-foreground/40 text-center leading-relaxed">
            * All images depict actual True Grit team members during supervised product testing sessions.
            Facial expressions are genuine and unscripted. No actors were used because no actors would agree to this.
            True Grit Personal Care assumes no responsibility for the emotional impact of viewing these images.
          </p>
        </div>
      </section>

      {/* The Aftermath */}
      <section className="py-20 px-4 bg-secondary/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-heading font-bold text-primary uppercase tracking-wide mb-4">The Aftermath</h2>
          <p className="text-xl text-foreground/60">The clean is undeniable. Everything else is complicated.</p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center mb-12 uppercase tracking-wide">By the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-heading font-bold text-primary">45 min</p>
              <p className="text-foreground/60 text-sm mt-1">Average Recovery Time</p>
            </div>
            <div>
              <p className="text-4xl font-heading font-bold text-primary">84%</p>
              <p className="text-foreground/60 text-sm mt-1">Reduction in Bathroom Break Duration</p>
            </div>
            <div>
              <p className="text-4xl font-heading font-bold text-primary">73%</p>
              <p className="text-foreground/60 text-sm mt-1">Surprisingly High Repeat Purchase Rate</p>
            </div>
            <div>
              <p className="text-4xl font-heading font-bold text-primary">It&apos;s Complex</p>
              <p className="text-foreground/60 text-sm mt-1">Customer Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Before & After */}
      <section className="py-16 px-4 bg-secondary/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center mb-12 uppercase tracking-wide">Before &amp; After</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="text-center">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-secondary/20 mb-4">
                <Image src="/sites/truegrit/aftermath-before.png" alt="Before True Grit" fill className="object-cover" />
              </div>
              <h3 className="text-xl font-heading font-bold text-foreground">Before</h3>
              <p className="text-foreground/60 mt-2">Naive. Optimistic. Blissfully unaware of what &quot;thorough&quot; really means.</p>
            </div>
            <div className="text-center">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-secondary/20 mb-4">
                <Image src="/sites/truegrit/aftermath-after.png" alt="After True Grit" fill className="object-cover" />
              </div>
              <h3 className="text-xl font-heading font-bold text-foreground">After</h3>
              <p className="text-foreground/60 mt-2">Changed. Enlightened. Thoroughly, unquestionably clean. The eyes tell the story.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recovery Protocol */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center mb-12 uppercase tracking-wide">Recovery Protocol</h2>
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-heading font-bold text-xl shrink-0">1</div>
              <div>
                <h3 className="text-xl font-heading font-bold text-foreground">Apply Recovery Balm</h3>
                <p className="text-foreground/60 mt-1">Immediately. Do not pass go. Do not collect $200. Apply the Recovery Balm the moment the session concludes. Then apply it again. You&apos;ll know when to stop. (You won&apos;t want to stop.)</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-heading font-bold text-xl shrink-0">2</div>
              <div>
                <h3 className="text-xl font-heading font-bold text-foreground">Reflect on Your Choices</h3>
                <p className="text-foreground/60 mt-1">This is an important step. Sit quietly — carefully — and consider the sequence of life decisions that brought you to this moment. This is what our therapist consultants call &quot;the growth window.&quot;</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-heading font-bold text-xl shrink-0">3</div>
              <div>
                <h3 className="text-xl font-heading font-bold text-foreground">Repeat</h3>
                <p className="text-foreground/60 mt-1">Because you will. 73% of our customers come back. We&apos;re not sure if it&apos;s the cleanliness, the character building, or something else entirely. But they come back.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Post-Use Testimonials */}
      <TestimonialGrid
        title="Post-Session Testimonials"
        testimonials={[
          { quote: "I've never been cleaner. I've also never been more concerned about being clean.", author: "First-Time User" },
          { quote: "The 24-grit changed me as a person. I mean that in every possible way.", author: "Deeply Affected Customer" },
          { quote: "I now understand why the Recovery Balm exists. I also understand why it comes in a 32 oz size.", author: "24-Grit Survivor" },
          { quote: "My coworkers asked why I walked differently for a week. I told them it was a new fitness routine.", author: "Creative Excuse Maker" },
        ]}
      />

      <CTABanner
        headline="Ready to Experience It Yourself?"
        description="The clean you didn't know you needed. The journey you won't forget."
        ctaText="Shop Products"
        ctaHref="/products"
      />
    </>
  )
}
