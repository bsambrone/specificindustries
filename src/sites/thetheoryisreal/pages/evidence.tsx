// src/sites/thetheoryisreal/pages/evidence.tsx
import type { PageMetadata } from "@/themes"
import { evidenceItems } from "@/sites/thetheoryisreal/data/evidence"
import { EvidenceGallery } from "@/sites/thetheoryisreal/components/evidence-gallery"

export const metadata: PageMetadata = {
  title: "Evidence — The Theory Is Real",
  description: "User-submitted evidence. Filed, tagged, cross-referenced.",
}

export default function Evidence() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <header className="mb-10">
        <p className="font-heading text-xs uppercase tracking-[0.3em] text-accent">CASE FILES</p>
        <h1 className="mt-2 font-heading text-4xl text-primary">Evidence Gallery</h1>
        <p className="mt-3 font-body text-base text-text/80">
          {evidenceItems.length} submissions on file. Click any item to enlarge.
        </p>
      </header>
      <EvidenceGallery items={evidenceItems} />
    </main>
  )
}
