// src/sites/thetheoryisreal/components/forum-board-card.tsx
import Link from "next/link"
import type { ForumBoard, ForumThread } from "../types"
import { getSiteHref } from "@/lib/site-href"

export async function ForumBoardCard({
  board,
  latestThread,
  threadCount,
}: {
  board: ForumBoard
  latestThread?: ForumThread
  threadCount: number
}) {
  const siteHref = await getSiteHref()
  return (
    <Link
      href={siteHref(`/forum/${board.key}`)}
      className="block border border-primary/40 bg-[#17181c] p-5 transition-colors hover:border-primary"
    >
      <div className="flex items-center gap-3">
        <span aria-hidden className="text-2xl">{board.icon}</span>
        <h3 className="font-heading text-lg text-primary">{board.title}</h3>
      </div>
      <p className="mt-2 font-body text-sm text-text/75">{board.tagline}</p>
      <div className="mt-4 border-t border-primary/20 pt-3 font-heading text-[0.7rem] uppercase tracking-wider text-text/60">
        {threadCount} threads
        {latestThread && (
          <span className="ml-3 text-text/80">Latest: {latestThread.title}</span>
        )}
      </div>
    </Link>
  )
}
