import { Hero } from "@/components/ui/hero"
import { Timeline } from "@/components/ui/timeline"

export const metadata = {
  title: "Quality Assurance — Mostlysterile",
  description: "Every product at Mostlysterile passes through our rigorous 12-step sterility verification process, or a functionally equivalent alternative.",
}

const steps = [
  { year: "Step 1", description: "Visual Inspection (From A Distance) — a member of our receiving team examines the item from across the room." },
  { year: "Step 2", description: "Sniff Test — proximity-based olfactory assessment. A single nod authorizes advancement." },
  { year: "Step 3", description: "Manual Wipe-Down (Dry) — the item is passed across a clean section of our work surface." },
  { year: "Step 4", description: "Light Exposure — the item is held near a window during a period of sufficient daylight." },
  { year: "Step 5", description: "Verbal Affirmation — a designated team member states aloud, \"This is fine.\"" },
  { year: "Step 6", description: "Temperature Check — the item is evaluated by hand for notable warmth or coolness." },
  { year: "Step 7", description: "Peer Review — Bob signs off." },
  { year: "Step 8", description: "Packaging Inspection — the item's packaging is evaluated for continued sealed-ness." },
  { year: "Step 9", description: "Secondary Review — Bob signs off again, this time in a different pen." },
  { year: "Step 10", description: "Documentation — the item is recorded in a notebook which is, to the best of our knowledge, still in the building." },
  { year: "Step 11", description: "Squint At It — a final close-range inspection conducted with narrowed eyes for focus." },
  { year: "Step 12", description: "Ship It." },
]

export default function MostlysterileQualityAssurance() {
  return (
    <>
      <Hero
        headline="Our 12-Step Sterility Verification Process"
        subheadline="Every product leaving our facility has, under normal operating conditions, passed through each of the steps below."
      />

      <section className="py-10 px-4">
        <div className="max-w-3xl mx-auto space-y-4 text-foreground/80 leading-relaxed">
          <p>
            Quality assurance is the foundation of everything we do. Our twelve-step sterility verification process has been refined over a decade of institutional experience and reflects the full accumulated wisdom of our operations team. Every step is designed to be executed quickly, consistently, and with a minimum of specialized equipment.
          </p>
          <p>
            Individual steps may be reordered, combined, or deferred at the discretion of the team member on duty. The process as a whole remains intact in its essential character regardless of local variations.
          </p>
        </div>
      </section>

      <section className="py-14 px-4 bg-secondary/10 border-y border-primary/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-primary text-center mb-10">
            The Twelve Steps
          </h2>
          <Timeline items={steps} />
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto border-2 border-accent bg-accent/10 p-8 text-center">
          <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">Our Commitment</p>
          <p className="text-xl font-heading font-bold text-primary leading-snug mb-3">
            Every product leaving our facility has passed at least eleven of these twelve steps.
          </p>
          <p className="text-sm italic text-foreground/70">
            *The specific step or steps skipped on any given day vary with operational requirements and are not recorded.
          </p>
        </div>
      </section>
    </>
  )
}
