// src/sites/thetheoryisreal/pages/forum-thread.tsx
import { notFound } from "next/navigation"
import Link from "next/link"
import { getThreadBySlug } from "@/sites/thetheoryisreal/data/forum"
import { getBoardByKey } from "@/sites/thetheoryisreal/data/forum-users"
import { ForumThreadView } from "@/sites/thetheoryisreal/components/forum-thread-view"
import { getSiteHref } from "@/lib/site-href"
import type { BoardKey } from "@/sites/thetheoryisreal/types"

export default async function ForumThreadPage({
  slug: _slug,
  segments,
}: {
  slug: string
  segments?: string[]
}) {
  // segments contains ALL segments including the first, e.g. ["<board>", "<thread>"]
  if (!segments || segments.length !== 2) notFound()
  const [boardKey, threadSlug] = segments
  const board = getBoardByKey(boardKey)
  if (!board) notFound()
  const thread = getThreadBySlug(board.key as BoardKey, threadSlug)
  if (!thread) notFound()
  const siteHref = await getSiteHref()

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <nav className="mb-4 font-heading text-xs uppercase tracking-widest text-text/55">
        <Link href={siteHref("/forum")} className="hover:text-primary">Forum</Link>
        <span className="mx-2">/</span>
        <Link href={siteHref(`/forum/${board.key}`)} className="hover:text-primary">{board.title}</Link>
      </nav>
      <ForumThreadView thread={thread} />
    </main>
  )
}
