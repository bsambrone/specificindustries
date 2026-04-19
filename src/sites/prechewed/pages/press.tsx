import PressArticleCard from "../components/press-article-card"
import { articles } from "../data/press"

export const metadata = {
  title: "Press — Prechewed™",
  description:
    "Coverage of Prechewed™, Pre-Oral Hydrolysis™, and the Daily Bolus protocol across major outlets.",
}

export default function PrechewedPress() {
  const sorted = [...articles].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-4">Press</h1>
        <p className="text-lg" style={{ color: "var(--color-muted, #6C6A7D)" }}>
          As covered by the publications that understand the future of nutrition.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sorted.map((article) => (
          <PressArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </main>
  )
}
