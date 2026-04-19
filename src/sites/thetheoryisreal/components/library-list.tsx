// src/sites/thetheoryisreal/components/library-list.tsx
import type { LibraryEntry } from "../types"

export function LibraryList({ entries }: { entries: LibraryEntry[] }) {
  return (
    <ol className="divide-y divide-primary/20 border border-primary/30 bg-[#141519]">
      {entries.map((e, i) => (
        <li key={i} className="px-5 py-4">
          <a
            href={e.url}
            className="font-body text-base text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-accent"
            target={e.url.startsWith("#") ? undefined : "_blank"}
            rel={e.url.startsWith("#") ? undefined : "noopener noreferrer"}
          >
            {e.title}
          </a>
          <div className="mt-1 font-heading text-[0.7rem] uppercase tracking-wider text-text/60">
            {e.author} · {e.year}
          </div>
          <p className="mt-2 font-body text-sm text-text/85">{e.abstractSnippet}</p>
        </li>
      ))}
    </ol>
  )
}
