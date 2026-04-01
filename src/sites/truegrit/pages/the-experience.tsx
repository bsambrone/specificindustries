import { Hero } from "@/components/ui/hero"
import { ImageTextSection } from "@/components/ui/image-text-section"

export const metadata = {
  title: "The Experience — True Grit Personal Care",
  description: "A journey through the True Grit personal cleansing process. Brace yourself.",
}

export default function TheExperience() {
  return (
    <>
      <Hero
        headline="The Experience"
        subheadline="A four-stage journey toward unprecedented cleanliness."
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

      {/* Bottom Disclaimer */}
      <section className="py-6 px-4 bg-foreground/5 border-t border-foreground/10">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-foreground/40 text-center leading-relaxed">
            * All images depict actual True Grit team members during supervised product testing sessions.
            Facial expressions are genuine and unscripted. No actors were used because no actors would agree to this.
            True Grit Personal Care assumes no responsibility for the emotional impact of viewing these images.
          </p>
        </div>
      </section>
    </>
  )
}
