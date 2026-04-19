// src/sites/thetheoryisreal/pages/forum.tsx
import type { PageMetadata } from "@/themes"
import { boards } from "@/sites/thetheoryisreal/data/forum-users"
import { threads, getThreadsByBoard, getHotThreads } from "@/sites/thetheoryisreal/data/forum"
import { ForumBoardCard } from "@/sites/thetheoryisreal/components/forum-board-card"
import { ForumThreadRow } from "@/sites/thetheoryisreal/components/forum-thread-row"

export const metadata: PageMetadata = {
  title: "Forum — The Theory Is Real",
  description: "The Awakened discuss observations, evidence, and signal interference.",
}

export default function ForumIndex() {
  const hot = getHotThreads(6)
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <header className="mb-10">
        <p className="font-heading text-xs uppercase tracking-[0.3em] text-accent">THE AWAKENED</p>
        <h1 className="mt-2 font-heading text-4xl text-primary">Forum</h1>
        <p className="mt-3 font-body text-base text-text/80">
          Five boards. {threads.length} threads. If you are new, the pinned post in General Truth-Seeking is a
          reasonable place to begin.
        </p>
      </header>

      <section id="hot" className="mb-12">
        <h2 className="mb-4 font-heading text-sm uppercase tracking-[0.3em] text-accent">🔥 Hot Threads</h2>
        <div className="border border-primary/30 bg-[#141519]">
          {hot.map((t) => (
            <ForumThreadRow key={`${t.board}/${t.slug}`} thread={t} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-heading text-sm uppercase tracking-[0.3em] text-accent">Boards</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {boards.map((b) => {
            const ts = getThreadsByBoard(b.key)
            return (
              <ForumBoardCard
                key={b.key}
                board={b}
                threadCount={ts.length}
                latestThread={ts[0]}
              />
            )
          })}
        </div>
      </section>
    </main>
  )
}
