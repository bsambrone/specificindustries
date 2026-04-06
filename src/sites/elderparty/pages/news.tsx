import Image from "next/image"
import Link from "next/link"
import { articles } from "@/sites/elderparty/data/news"
import { getSiteHref } from "@/lib/site-href"

export const metadata = {
  title: "News — The Elder Party",
  description: "Dispatches from the Elder Party campaign trail. Press releases, endorsements, and reports from the awakening.",
}

export default async function NewsPage() {
  const siteHref = await getSiteHref()

  return (
    <div>
      {/* Hero */}
      <section className="bg-secondary text-foreground py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-primary mb-6 leading-tight">
            News & Press
          </h1>
          <p className="text-xl text-foreground/70 leading-relaxed max-w-2xl mx-auto">
            Dispatches from the campaign trail. All press releases are issued by the Elder Party
            Press Office and are accurate to the best of our knowledge, which extends further than most.
          </p>
        </div>
      </section>

      {/* Featured Article (first article, larger) */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <Link
            href={siteHref(`/news/${articles[0].slug}`)}
            className="group block border border-primary/10 rounded-lg overflow-hidden bg-secondary/20 hover:bg-secondary/30 hover:border-primary/30 transition-colors"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <div className="relative w-full aspect-[16/10] md:aspect-auto md:min-h-[320px]">
                <Image
                  src={articles[0].images[0].src}
                  alt={articles[0].images[0].alt}
                  fill
                  className="object-cover"
                  priority
                  fetchPriority="high"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <p className="text-xs text-foreground/40 mb-2">{articles[0].date}</p>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-3 leading-snug group-hover:text-accent transition-colors">
                  {articles[0].headline}
                </h2>
                <p className="text-foreground/60 leading-relaxed mb-4">
                  {articles[0].summary}
                </p>
                <span className="text-xs text-primary/60 uppercase tracking-wider font-semibold group-hover:text-primary transition-colors">
                  Read Full Article &rarr;
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Remaining Articles Grid */}
      <section className="pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.slice(1).map((article) => (
              <Link
                key={article.slug}
                href={siteHref(`/news/${article.slug}`)}
                className="group border border-primary/10 rounded-lg overflow-hidden bg-secondary/20 hover:bg-secondary/30 hover:border-primary/30 transition-colors"
              >
                <div className="relative w-full aspect-[16/10]">
                  <Image
                    src={article.images[0].src}
                    alt={article.images[0].alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs text-foreground/40 mb-2">{article.date}</p>
                  <h3 className="text-lg font-heading font-semibold text-primary mb-2 leading-snug group-hover:text-accent transition-colors">
                    {article.headline}
                  </h3>
                  <p className="text-sm text-foreground/60 leading-relaxed mb-3">
                    {article.summary}
                  </p>
                  <span className="text-xs text-primary/60 uppercase tracking-wider font-semibold group-hover:text-primary transition-colors">
                    Read More &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
