import type { Species } from "./products"

export interface MissionEntry {
  slug: string            // "mr-pickles"
  petName: string
  species: Species
  model: string           // "Pupjet Ultra"
  missionId: string       // "Mission PJ-2024-0043"
  quote: string           // One-line owner quote
  portrait: string        // /sites/petjacks/mission-gallery/<slug>.png
  memorial?: true         // Subtle black border + "In Memoriam · 2024" caption
}

export const missionGallery: MissionEntry[] = [
  { slug: "mr-pickles",   petName: "Mr. Pickles",   species: "cat",    model: "Whiskerwings 300", missionId: "Mission PJ-2024-0043", quote: "He came back changed. We love him more than ever.", portrait: "/sites/petjacks/mission-gallery/mr-pickles.png" },
  { slug: "biscuit",      petName: "Biscuit",       species: "dog",    model: "Pupjet Ultra",     missionId: "Mission PJ-2024-0051", quote: "The neighborhood was fascinated. We hosted a block party.", portrait: "/sites/petjacks/mission-gallery/biscuit.png" },
  { slug: "clover",       petName: "Clover",        species: "rabbit", model: "Hopperlauncher LX", missionId: "Mission PJ-2024-0068", quote: "I had always wondered what Clover would do with the sky.", portrait: "/sites/petjacks/mission-gallery/clover.png" },
  { slug: "sir-bartholomew", petName: "Sir Bartholomew", species: "fish", model: "FinFlyer AquaPro", missionId: "Mission PJ-2024-0072", quote: "He was a quiet fish. Now he is something more.", portrait: "/sites/petjacks/mission-gallery/sir-bartholomew.png" },
  { slug: "dumpling",     petName: "Dumpling",      species: "cat",    model: "Whiskerwings 300", missionId: "Mission PJ-2024-0089", quote: "Dumpling taught us that the ceiling is only a suggestion.", portrait: "/sites/petjacks/mission-gallery/dumpling.png" },
  { slug: "captain-noodle", petName: "Captain Noodle", species: "dog", model: "Pupjet Ultra",     missionId: "Mission PJ-2024-0104", quote: "The kids got to see him one last time, and that's what matters.", portrait: "/sites/petjacks/mission-gallery/captain-noodle.png", memorial: true },
  { slug: "petal",        petName: "Petal",         species: "rabbit", model: "Hopperlauncher LX", missionId: "Mission PJ-2024-0118", quote: "Petal's grace at altitude was something to behold.", portrait: "/sites/petjacks/mission-gallery/petal.png" },
  { slug: "biscuit-jr",   petName: "Biscuit Jr.",   species: "dog",    model: "Pupjet Ultra",     missionId: "Mission PJ-2024-0127", quote: "He followed in his father's contrail. We are so proud.", portrait: "/sites/petjacks/mission-gallery/biscuit-jr.png" },
  { slug: "apricot",      petName: "Apricot",       species: "cat",    model: "Whiskerwings 300", missionId: "Mission PJ-2024-0141", quote: "Apricot was our sweetest girl. She loved the launch pad.", portrait: "/sites/petjacks/mission-gallery/apricot.png", memorial: true },
  { slug: "moonbeam",     petName: "Moonbeam",      species: "fish",   model: "FinFlyer AquaPro", missionId: "Mission PJ-2024-0156", quote: "The iridescence as Moonbeam rose above the kitchen counter — I will never forget it.", portrait: "/sites/petjacks/mission-gallery/moonbeam.png" },
  { slug: "waffle",       petName: "Waffle",        species: "rabbit", model: "Hopperlauncher LX", missionId: "Mission PJ-2024-0169", quote: "Waffle has been the light of our family. This was her gift to us.", portrait: "/sites/petjacks/mission-gallery/waffle.png", memorial: true },
  { slug: "sergeant-mittens", petName: "Sergeant Mittens", species: "cat", model: "Whiskerwings 300", missionId: "Mission PJ-2024-0183", quote: "He is a veteran now.", portrait: "/sites/petjacks/mission-gallery/sergeant-mittens.png" },
]
