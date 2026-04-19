import Link from "next/link"
import type { PressArticle } from "../data/press"

export default function PressArticleCard({ article }: { article: PressArticle }) {
  return (
    <Link
      href={`/press/${article.slug}`}
      className="flex flex-col gap-3 group rounded-lg overflow-hidden border transition-shadow hover:shadow-md"
      style={{
        borderColor: "var(--color-border, #E6E3F0)",
        background: "var(--color-surface, #FFFFFF)",
      }}
    >
      <div
        className="aspect-[16/9] bg-cover bg-center"
        style={{ backgroundImage: `url('${article.heroImage}')` }}
      />
      <div className="px-5 py-4 flex flex-col gap-2">
        <div className="text-[11px] uppercase tracking-[0.2em] font-mono" style={{ color: "var(--color-primary, #5B3FD9)" }}>
          {article.publication}
        </div>
        <h3 className="text-lg font-semibold leading-snug">{article.headline}</h3>
        <p className="text-sm" style={{ color: "var(--color-muted, #6C6A7D)" }}>
          {article.excerpt}
        </p>
        <div className="text-xs font-mono mt-2" style={{ color: "var(--color-muted, #6C6A7D)" }}>
          {new Date(article.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
        </div>
      </div>
    </Link>
  )
}
