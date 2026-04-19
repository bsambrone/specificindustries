import type { PageMetadata } from "@/themes"
import { libraryEntries } from "@/sites/thetheoryisreal/data/library"
import { LibraryList } from "@/sites/thetheoryisreal/components/library-list"

export const metadata: PageMetadata = {
  title: "Library — The Theory Is Real",
  description: "Do your own research. The sources are here.",
}

export default function Library() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <header className="mb-10">
        <p className="font-heading text-xs uppercase tracking-[0.3em] text-accent">REFERENCE ARCHIVE</p>
        <h1 className="mt-2 font-heading text-4xl text-primary">Do Your Own Research</h1>
        <p className="mt-3 font-body text-base text-text/80">
          {libraryEntries.length} primary and secondary sources. We do not vouch for the hosts.
          We do not vouch for the conclusions. We vouch only for the observations.
        </p>
      </header>
      <LibraryList entries={libraryEntries} />
    </main>
  )
}
