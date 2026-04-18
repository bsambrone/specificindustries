import { products } from "./products"

export interface CompatibilityEntry {
  accessorySlug: string
  compatibleWithG1: boolean
  requiresOtherAccessories?: string[]
  notes: string
}

// Derived compatibility rows for the matrix display.
export const compatibilityMatrix: CompatibilityEntry[] = products
  .filter((p) => p.slug !== "g1-containment-gasket")
  .map((p) => ({
    accessorySlug: p.slug,
    compatibleWithG1: p.compatibleWith.includes("g1-containment-gasket") || p.slug.includes("cartridge") || p.slug === "the-silencer",
    requiresOtherAccessories:
      p.slug === "odor-cartridge-pack"
        ? ["the-grinder", "salad-shooter-attachment", "cryo-puck-module", "pneumatic-ejector-kit", "incinerator-module"]
        : p.slug === "the-silencer"
        ? ["the-grinder", "salad-shooter-attachment", "pneumatic-ejector-kit"]
        : undefined,
    notes:
      p.slug === "odor-cartridge-pack"
        ? "Fits into any disposal accessory's cartridge socket."
        : p.slug === "the-silencer"
        ? "Inline between G1 and compatible disposal accessories."
        : p.slug === "secondary-gasket-redundancy"
        ? "Concentric outer seal; shares output port with G1."
        : `Clicks into G1 OPX-14 output port.`,
  }))

export const portSpec = {
  name: "OPX-14",
  diameter: "14.00mm ±0.02mm",
  mechanism: "Bayonet, quarter-turn lock",
  rating: "14.7 PSI sustained, 22.4 PSI burst",
  material: "Aerospace-grade PEEK insert with platinum-cured silicone outer ring",
  firmware: "Compatible with Telemetry Module firmware rev 3.2+",
}

export const firmwareMatrix = [
  { accessory: "G1 Containment Gasket", firmware: "N/A (passive)", lastRevision: "Mechanical rev E (2026-01)" },
  { accessory: "The Grinder", firmware: "2.4.1", lastRevision: "2026-03-11" },
  { accessory: "Salad Shooter Attachment", firmware: "1.9.0", lastRevision: "2026-02-04" },
  { accessory: "The Cryo-Puck", firmware: "3.1.2", lastRevision: "2026-03-28" },
  { accessory: "Pneumatic Ejector Kit", firmware: "N/A (mechanical)", lastRevision: "Mechanical rev C" },
  { accessory: "Shop-Vac Adapter", firmware: "N/A (passive)", lastRevision: "Mechanical rev B" },
  { accessory: "The Incinerator Module", firmware: "4.0.3", lastRevision: "2026-04-02" },
  { accessory: "Odor-Neutralizing Cartridge 6-Pack", firmware: "N/A (consumable)", lastRevision: "Formulation v7" },
  { accessory: "Telemetry Module", firmware: "3.2.5", lastRevision: "2026-04-10" },
  { accessory: "The Silencer", firmware: "N/A (passive)", lastRevision: "Mechanical rev D" },
  { accessory: "Backup Secondary Gasket", firmware: "N/A (passive)", lastRevision: "Mechanical rev C" },
]
