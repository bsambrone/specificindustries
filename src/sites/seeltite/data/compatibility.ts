import { products } from "./products"

export interface CompatibilityEntry {
  accessorySlug: string
  compatibleWithG1: boolean
  requiresOtherAccessories?: string[]
  notes: string
}

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
        : "Clicks into G1.",
  }))

export const portSpec = {
  name: "OPX-14",
  mechanism: "Bayonet, quarter-turn lock",
  rating: "14.7 PSI sustained",
}
