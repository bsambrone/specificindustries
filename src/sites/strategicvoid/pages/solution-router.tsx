import SolutionPage from "./solution-page"
import ProductDetailPage from "./product-detail"

interface SolutionRouterProps {
  slug: string
  segments?: string[]
}

export default async function SolutionRouter({ slug, segments }: SolutionRouterProps) {
  // segments has 2 items: [solutionSlug, productSlug]
  if (segments && segments.length === 2) {
    return <ProductDetailPage solutionSlug={segments[0]} productSlug={segments[1]} />
  }

  return <SolutionPage slug={slug} />
}
