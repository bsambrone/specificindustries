import { Hero } from "@/components/ui/hero"
import { WaveDivider } from "@/components/ui/wave-divider"
import { ProcessFlow } from "@/components/ui/process-flow"
import { StatStrip } from "@/components/ui/stat-strip"
import { ComparisonTable } from "@/components/ui/comparison-table"

export const metadata = {
  title: "The Technology — Inflatable Anchors Marine",
  description: "The Inflation Deployment System™, explained. Sort of.",
}

const steps = [
  {
    number: "01",
    title: "Inflate",
    description:
      "Using our patented EZ-Inflate™ hand pump (sold separately), bring your anchor to full operational pressure in just 47 easy pumps. Each pump brings you closer to anchoring readiness. Pro tip: count out loud for maximum confidence. Your fellow boaters will appreciate the countdown.",
    image: "/sites/inflatableanchors/tech-inflate.png",
  },
  {
    number: "02",
    title: "Deploy",
    description:
      "Lower your fully inflated anchor into the water using the included 50ft of marine-grade rope. Feel the satisfying weightlessness as it enters the water. Traditional anchors fight gravity on the way down. Ours doesn't fight anything. It's the path of least resistance, and we think that's beautiful.",
    image: "/sites/inflatableanchors/tech-deploy.png",
  },
  {
    number: "03",
    title: "Observe",
    description:
      "Watch as your anchor establishes its position on the water's surface. Note: surface positioning is a feature, not a bug. Traditional anchors disappear beneath the waves, leaving you wondering if they're working. With ours, you can see it the whole time. Full transparency. Full buoyancy.",
    image: "/sites/inflatableanchors/tech-observe.png",
  },
  {
    number: "04",
    title: "Retrieve",
    description:
      "Simply pull the rope. That's it. One hand. No winch. No straining. No herniated discs. No calling your buddy to help. No throwing out your back and lying on the dock questioning your life choices. This is the moment that makes it all worth it. This is why we're here.",
    image: "/sites/inflatableanchors/tech-retrieve.png",
  },
]

export default function TheTechnology() {
  return (
    <>
      <Hero
        dark
        headline="The Technology"
        subheadline="Our patented Inflation Deployment System™. Four steps to anchoring freedom."
      />

      <WaveDivider variant="wave1" />

      <ProcessFlow steps={steps} />

      <StatStrip
        stats={[
          { icon: "⚓", value: "4 oz", label: "Total Anchor Weight" },
          { icon: "💪", value: "0 Injuries", label: "From Retrieval" },
          { icon: "🏆", value: "0 Awards", label: "So Far" },
        ]}
      />

      <ComparisonTable
        title="Why Go Inflatable?"
        columns={[
          { name: "Inflatable", highlighted: true },
          { name: "Steel Fluke" },
          { name: "Concrete Block" },
          { name: "Mushroom" },
        ]}
        rows={[
          { label: "Weight", values: ["4 oz", "15-45 lbs", "20-60 lbs", "10-30 lbs"] },
          { label: "Setup Time", values: ["Under 2 min", "Immediate", "Immediate", "Immediate"] },
          { label: "Storage", values: ["Fits in pocket", "Dedicated locker", "Garage floor", "Shed"] },
          { label: "Portability", values: ["Backpackable", "Hernia risk", "Need a friend", "Awkward"] },
          { label: "Ease of Retrieval", values: ["One-handed", "Winch recommended", "Good luck", "Moderate"] },
          { label: "Fun Factor", values: ["Extreme", "None", "None", "Low"] },
          { label: "Conversation Starter", values: ["Guaranteed", "Never", '"Why?"', '"What is that?"'] },
          { label: "Holds Boat in Place", values: ["*", "Yes", "Yes", "Yes"] },
        ]}
        footnote='* Results may vary based on current, wind, tide, expectations, and definition of "holds."'
      />

      {/* Endorsements section */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-heading font-bold text-primary mb-4">Industry Recognition</h2>
          <p className="text-foreground/60 mb-8">
            Our technology has been submitted for review to the following organizations. None have responded.
          </p>
          <div className="space-y-4 text-foreground/70 text-sm italic">
            <p>&ldquo;Inflatable Anchoring: A Paradigm Shift in Marine Non-Holding Technology&rdquo; — <span className="text-foreground/50">Submitted to the American Boating Association, 2023. Status: Unread.</span></p>
            <p>&ldquo;Buoyancy as a Feature: Rethinking the Anchor&rdquo; — <span className="text-foreground/50">Submitted to Maritime Engineering Quarterly, 2024. Status: &ldquo;Please stop emailing us.&rdquo;</span></p>
            <p>&ldquo;47 Pumps to Freedom: The EZ-Inflate Manifesto&rdquo; — <span className="text-foreground/50">Self-published on Chuck&apos;s blog, 2025. 7 views (4 were Chuck).</span></p>
          </div>
        </div>
      </section>
    </>
  )
}
