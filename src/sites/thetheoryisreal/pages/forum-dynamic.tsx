// src/sites/thetheoryisreal/pages/forum-dynamic.tsx
import ForumBoard from "./forum-board"
import ForumThread from "./forum-thread"

export default function ForumDynamic({ slug, segments }: { slug: string; segments?: string[] }) {
  if (segments && segments.length === 2) {
    return <ForumThread slug={slug} segments={segments} />
  }
  return <ForumBoard slug={slug} />
}
