import { Hero } from "@/components/ui/hero"
import { ImageTextSection } from "@/components/ui/image-text-section"

export const metadata = {
  title: "The Process — Snortables",
  description: "From Farm to Nostril™. See how we pulverize perfectly good meals into snortable powder.",
}

const steps = [
  {
    title: "Step 1: Sourcing",
    description:
      "Our procurement specialists identify only the finest prepared meals for destruction. Each dish is evaluated on flavor, presentation, and pulverizability. We visit Michelin-starred restaurants, award-winning bakeries, and your grandmother's kitchen. We do not tell them what we're about to do.",
    image: "/sites/snortables/process-sourcing.png",
  },
  {
    title: "Step 2: Acquisition",
    description:
      "Every ingredient is hand-selected and immediately condemned to the NasalMill™. We do not accept returns. The turkeys have been claimed. Our acquisition team operates with speed and enthusiasm that local grocery store managers have described as 'alarming' and 'please stop running.'",
    image: "/sites/snortables/process-acquisition.png",
  },
  {
    title: "Step 3: Pulverization",
    description:
      "Our proprietary NasalMill™ technology reduces any meal to 0.3 micron particles in under 4 seconds. The gravy boat is optional but we include it for texture. Our Head of Pulverization Sciences, Darren Kowalski, personally oversees each batch with what coworkers describe as 'concerning enthusiasm.'",
    image: "/sites/snortables/process-pulverization.png",
  },
  {
    title: "Step 4: Quality Control",
    description:
      "Every batch undergoes rigorous intranasal bioavailability testing. Our quality team personally tests each product. They insist on it. We've tried to get them to stop. Each sample is analyzed for particle consistency, nasal compatibility, and what our lab calls 'the sneeze factor.'",
    image: "/sites/snortables/process-quality.png",
  },
  {
    title: "Step 5: Packaging",
    description:
      "Each dose is precision-measured to 0.01g for optimal nostril delivery. Our packaging is discreet, professional, and absolutely does not warrant the attention it receives from postal inspectors. Every packet is sealed in our signature matte-black material and stamped with a batch number for traceability (and plausible deniability).",
    image: "/sites/snortables/process-packaging.png",
  },
  {
    title: "Step 6: Shipping",
    description:
      "Discreet delivery within 2-3 business days. We ship at night because our drivers prefer it, not because of any legal requirement to do so. Each order arrives in an unmarked box that says 'Definitely Just Vitamins' on the exterior. Our logistics team has a 99.7% delivery success rate. The other 0.3% were intercepted, and our lawyers are handling it.",
    image: "/sites/snortables/process-shipping.png",
  },
]

export default function SnortablesProcess() {
  return (
    <>
      <Hero
        headline="From Farm to Nostril™"
        subheadline="Our vertically integrated pulverization pipeline ensures every particle meets our exacting standards."
        dark
      />

      {steps.map((step, i) => (
        <ImageTextSection
          key={step.title}
          image={step.image}
          title={step.title}
          description={step.description}
          imagePosition={i % 2 === 0 ? "left" : "right"}
          imageAspect="aspect-[3/2]"
        />
      ))}
    </>
  )
}
