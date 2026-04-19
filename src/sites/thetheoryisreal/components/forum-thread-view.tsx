// src/sites/thetheoryisreal/components/forum-thread-view.tsx
import Image from "next/image"
import type { ForumThread, ForumReply } from "../types"

function ReplyBlock({ r, isOp = false }: { r: ForumReply; isOp?: boolean }) {
  return (
    <article className={`border-b border-primary/20 px-4 py-5 ${isOp ? "bg-[#17181c]" : ""}`}>
      <header className="flex items-center gap-3">
        <Image
          src={r.avatar}
          alt={r.username}
          width={48}
          height={48}
          className="h-12 w-12 rounded-full border border-primary/40 grayscale"
        />
        <div>
          <div className="font-heading text-sm text-primary">{r.username}</div>
          <div className="font-heading text-[0.7rem] uppercase tracking-wider text-text/60">
            {isOp && <span className="mr-2 rounded-sm bg-primary/20 px-1.5 py-0.5 text-primary">OP</span>}
            {r.postedAt}
          </div>
        </div>
      </header>
      <div className="mt-3 whitespace-pre-line font-body text-[0.95rem] leading-relaxed text-text/90">
        {r.body}
      </div>
      {r.reactions && r.reactions.length > 0 && (
        <div className="mt-3 flex gap-2">
          {r.reactions.map((rx, i) => (
            <span
              key={i}
              className="rounded-sm border border-primary/30 px-2 py-0.5 font-heading text-[0.7rem] text-text/80"
            >
              {rx.emoji} {rx.count}
            </span>
          ))}
        </div>
      )}
    </article>
  )
}

export function ForumThreadView({ thread }: { thread: ForumThread }) {
  return (
    <div className="border border-primary/40 bg-[#141519]">
      <header className="border-b border-primary/30 bg-[#0b0c0e] px-4 py-3">
        <h1 className="font-heading text-xl text-primary">{thread.title}</h1>
      </header>
      <ReplyBlock r={thread.op} isOp />
      {thread.replies.map((r, i) => (
        <ReplyBlock key={i} r={r} />
      ))}
    </div>
  )
}
