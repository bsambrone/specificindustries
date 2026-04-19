// src/sites/thetheoryisreal/components/forum-thread-row.tsx
import Link from "next/link"
import Image from "next/image"
import type { ForumThread } from "../types"
import { getSiteHref } from "@/lib/site-href"

export async function ForumThreadRow({ thread }: { thread: ForumThread }) {
  const siteHref = await getSiteHref()
  const href = siteHref(`/forum/${thread.board}/${thread.slug}`)
  return (
    <Link
      href={href}
      className="flex items-start gap-4 border-b border-primary/20 px-4 py-3 transition-colors hover:bg-primary/5"
    >
      <Image
        src={thread.op.avatar}
        alt={thread.op.username}
        width={40}
        height={40}
        className="mt-1 h-10 w-10 rounded-full border border-primary/40 grayscale"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          {thread.pinned && (
            <span className="font-heading text-[0.6rem] uppercase tracking-widest text-accent">📌 PINNED</span>
          )}
          {thread.hot && (
            <span className="font-heading text-[0.6rem] uppercase tracking-widest text-secondary">🔥 HOT</span>
          )}
        </div>
        <div className="font-body text-base text-primary">{thread.title}</div>
        <div className="mt-1 flex items-center gap-3 font-heading text-[0.7rem] uppercase tracking-wider text-text/60">
          <span>{thread.op.username}</span>
          <span>·</span>
          <span>{thread.op.postedAt}</span>
          <span>·</span>
          <span>{thread.replies.length} replies</span>
        </div>
      </div>
    </Link>
  )
}
