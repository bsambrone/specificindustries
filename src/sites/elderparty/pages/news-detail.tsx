import Image from "next/image"
import Link from "next/link"
import { getArticleBySlug } from "@/sites/elderparty/data/news"
import { Bleed } from "@/components/ui/bleed"
import { getSiteHref } from "@/lib/site-href"

export default async function NewsDetail({ slug }: { slug: string }) {
  const siteHref = await getSiteHref()
  const article = getArticleBySlug(slug)
  if (!article) return null

  // Place images after certain paragraphs:
  // First image after paragraph 1, second image (if any) after the midpoint
  const imageAfterParagraph: Record<number, { src: string; alt: string }> = {}
  if (article.images.length > 0) {
    imageAfterParagraph[0] = article.images[0]
  }
  if (article.images.length > 1) {
    const midpoint = Math.floor(article.body.length / 2)
    imageAfterParagraph[midpoint] = article.images[1]
  }

  return (
    <div>
      {/* Article Header */}
      <section className="bg-secondary text-foreground py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            href={siteHref("/news")}
            className="text-xs text-primary/60 uppercase tracking-wider font-semibold hover:text-primary transition-colors mb-6 inline-block"
          >
            &larr; Back to News
          </Link>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-4 leading-tight">
            {article.headline}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/50">
            <time>{article.date}</time>
            <span className="w-1 h-1 rounded-full bg-foreground/30" />
            <span>{article.author}</span>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          {article.body.map((paragraph, i) => {
            const isSecondToLast = i === article.body.length - 2
            const isLast = i === article.body.length - 1
            const shouldBleed = article.hasBleed && (isSecondToLast || isLast)
            const bleedIntensity = isLast ? 4 : 2

            return (
              <div key={i}>
                {shouldBleed ? (
                  <Bleed
                    text={paragraph}
                    intensity={bleedIntensity as 1 | 2 | 3 | 4}
                    as="p"
                    className="text-foreground/70 leading-relaxed text-lg mb-6"
                  />
                ) : (
                  <p className="text-foreground/70 leading-relaxed text-lg mb-6">
                    {paragraph}
                  </p>
                )}

                {/* Insert image after this paragraph */}
                {imageAfterParagraph[i] && (
                  <div className="my-10">
                    <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden border border-primary/10">
                      <Image
                        src={imageAfterParagraph[i].src}
                        alt={imageAfterParagraph[i].alt}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="text-xs text-foreground/30 mt-2 text-center italic">
                      {imageAfterParagraph[i].alt}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* Back to News */}
      <section className="py-12 px-6 border-t border-primary/10">
        <div className="max-w-3xl mx-auto text-center">
          <Link
            href={siteHref("/news")}
            className="inline-block px-8 py-3 border border-primary/40 text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors text-sm uppercase tracking-wider"
          >
            &larr; All News
          </Link>
        </div>
      </section>
    </div>
  )
}
