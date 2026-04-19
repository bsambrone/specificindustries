import PressArticle from "../components/press-article"
import { getArticleBySlug } from "../data/press"

export default function PrechewedPressDetail({ slug }: { slug: string }) {
  const article = getArticleBySlug(slug)
  if (!article) return null
  return <PressArticle article={article} />
}
