// src/sites/thetheoryisreal/pages/forum-board.tsx
import { notFound } from "next/navigation"
import { getBoardByKey } from "@/sites/thetheoryisreal/data/forum-users"
import { getThreadsByBoard } from "@/sites/thetheoryisreal/data/forum"
import { ForumThreadRow } from "@/sites/thetheoryisreal/components/forum-thread-row"
import type { BoardKey } from "@/sites/thetheoryisreal/types"

export default function ForumBoardPage({ slug }: { slug: string; segments?: string[] }) {
  const board = getBoardByKey(slug)
  if (!board) notFound()
  const ts = getThreadsByBoard(board.key as BoardKey)
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <header className="mb-8">
        <p className="font-heading text-xs uppercase tracking-[0.3em] text-accent">/forum/{board.key}</p>
        <h1 className="mt-2 font-heading text-3xl text-primary">
          {board.icon} {board.title}
        </h1>
        <p className="mt-3 font-body text-base text-text/80">{board.tagline}</p>
      </header>
      <div className="border border-primary/30 bg-[#141519]">
        {ts.map((t) => (
          <ForumThreadRow key={t.slug} thread={t} />
        ))}
      </div>
    </main>
  )
}
