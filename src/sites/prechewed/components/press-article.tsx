import type { PressArticle as PressArticleType } from "../data/press"
import MedicalCallout from "./medical-callout"

export default function PressArticle({ article }: { article: PressArticleType }) {
  const dateStr = new Date(article.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <article className="max-w-3xl mx-auto px-6 py-16">
      <div className="text-xs uppercase tracking-[0.25em] font-mono mb-6" style={{ color: "var(--color-primary, #5B3FD9)" }}>
        {article.publication}
      </div>
      <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-5">
        {article.headline}
      </h1>
      <p className="text-xl leading-relaxed mb-6" style={{ color: "var(--color-muted, #6C6A7D)" }}>
        {article.subhead}
      </p>
      <div className="flex items-center gap-3 text-sm font-mono mb-10" style={{ color: "var(--color-muted, #6C6A7D)" }}>
        <span>By {article.byline}</span>
        <span>·</span>
        <span>{dateStr}</span>
      </div>

      <div
        className="aspect-[16/9] bg-cover bg-center rounded-lg mb-10"
        style={{ backgroundImage: `url('${article.heroImage}')` }}
      />

      <div className="flex flex-col gap-5 text-lg leading-relaxed">
        {article.body.map((p, i) => {
          const middle = Math.floor(article.body.length / 2)
          if (i === middle && article.pullQuote) {
            return (
              <div key={i}>
                <p>{p}</p>
                <MedicalCallout label="Pull Quote">
                  <p className="text-xl font-medium italic">"{article.pullQuote}"</p>
                </MedicalCallout>
              </div>
            )
          }
          return <p key={i}>{p}</p>
        })}
      </div>

      <footer className="mt-16 pt-6 border-t text-xs font-mono" style={{ borderColor: "var(--color-border, #E6E3F0)", color: "var(--color-muted, #6C6A7D)" }}>
        Originally appeared in {article.publication} © 2026
      </footer>
    </article>
  )
}
