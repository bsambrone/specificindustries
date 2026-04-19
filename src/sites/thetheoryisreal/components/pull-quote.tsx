// src/sites/thetheoryisreal/components/pull-quote.tsx
export function PullQuote({ children }: { children: string }) {
  return (
    <aside className="my-8 border-l-4 border-accent pl-5 py-2">
      <blockquote
        className="text-xl leading-snug text-primary"
        style={{ fontFamily: "var(--font-permanent-marker, var(--font-heading))" }}
      >
        &ldquo;{children}&rdquo;
      </blockquote>
    </aside>
  )
}
