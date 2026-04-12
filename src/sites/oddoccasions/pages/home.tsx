import Image from "next/image"
import Link from "next/link"
import { getSiteHref } from "@/lib/site-href"
import { featuredProducts, categories } from "../data/products"
import { homepageTestimonials } from "../data/testimonials"

export default async function OddOccasionsHome() {
  const siteHref = await getSiteHref()

  return (
    <>
      {/* HERO */}
      <section className="bg-[#FFFDF8]">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-sm font-semibold tracking-widest uppercase text-[#D4A0A0]">
              For life&apos;s most specific moments
            </p>
            <h1 className="mt-4 text-4xl md:text-6xl font-bold text-[#2D2D2D] leading-tight font-heading">
              Thoughtfully curated gifts for occasions nobody else covers.
            </h1>
            <p className="mt-4 text-lg text-[#2D2D2D]/70 font-body">
              Every awkward moment, hyper-specific milestone, and long-overdue apology deserves a beautiful gift box. We make them. You send them. The recipient finally feels understood.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={siteHref("/shop")}
                className="bg-[#7C9A82] hover:bg-[#6B8972] text-white font-bold rounded-lg px-7 py-3 transition-colors"
              >
                Shop All Occasions
              </Link>
              <Link
                href={siteHref("/about")}
                className="bg-white border border-[#7C9A82]/30 hover:border-[#7C9A82]/60 text-[#7C9A82] font-bold rounded-lg px-7 py-3 transition-colors"
              >
                Our Story
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/sites/oddoccasions/home-hero.png"
              alt="A collection of beautifully wrapped Odd Occasions gift boxes on a warm wooden table"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              priority
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* SHOP BY OCCASION */}
      <section className="bg-[#F5F0E8]/50 border-y border-[#7C9A82]/10">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#2D2D2D] font-heading">Shop by Occasion</h2>
            <p className="text-[#2D2D2D]/60 mt-2">Because &ldquo;Thinking of You&rdquo; is never specific enough.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.key}
                href={siteHref(`/shop#${cat.anchor}`)}
                className="group block bg-white rounded-xl p-6 text-center border border-[#7C9A82]/15 hover:border-[#7C9A82]/40 hover:shadow-md transition-all"
              >
                <div className="text-lg font-bold text-[#7C9A82] group-hover:text-[#6B8972] font-heading">
                  {cat.label}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED GIFT BOXES */}
      <section className="bg-[#FFFDF8]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#2D2D2D] font-heading">Staff Picks</h2>
            <p className="text-[#2D2D2D]/60 mt-2">Hand-selected by our Head of Curation, Theodore Lundy.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <Link
                key={product.slug}
                href={siteHref(`/shop/${product.slug}`)}
                className="group block bg-white border border-[#7C9A82]/15 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-square bg-[#F5F0E8]/30">
                  <Image
                    src={product.heroImage}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <div className="font-bold text-[#2D2D2D] group-hover:text-[#7C9A82] font-heading">{product.name}</div>
                  <p className="text-sm text-[#2D2D2D]/60 mt-1 line-clamp-2">{product.tagline}</p>
                  <div className="mt-3 text-lg font-bold text-[#2D2D2D]">{product.priceLabel}</div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href={siteHref("/shop")}
              className="text-[#7C9A82] font-bold underline underline-offset-4 hover:text-[#6B8972]"
            >
              View all 30 gift boxes →
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-[#F5F0E8]/50 border-y border-[#7C9A82]/10">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-[#2D2D2D] text-center mb-10 font-heading">What People Are Saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {homepageTestimonials.map((t) => (
              <div key={t.name + t.productSlug} className="bg-white border border-[#7C9A82]/15 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-[#F5F0E8]">
                    <Image src={t.image} alt={t.name} fill sizes="48px" className="object-cover" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-[#2D2D2D]">{t.name}</div>
                    <div className="text-xs text-[#2D2D2D]/60">{t.title}</div>
                  </div>
                </div>
                <p className="text-sm text-[#2D2D2D]/80 italic">&ldquo;{t.quote}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR PHILOSOPHY */}
      <section className="bg-[#FFFDF8]">
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold text-[#2D2D2D] font-heading">Our Philosophy</h2>
          <p className="mt-4 text-lg text-[#2D2D2D]/70 leading-relaxed">
            Life is full of moments that Hallmark doesn&apos;t cover. The awkward ones. The oddly specific ones. The ones where you need to say something but no card exists for it. We believe every one of those moments deserves a thoughtfully curated gift box — assembled with genuine care and wrapped with the understanding that sometimes, the most meaningful gift is the one that says &ldquo;I noticed this very specific thing, and I got you something for it.&rdquo;
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#7C9A82] text-white">
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          <h2 className="text-3xl font-bold font-heading">Every moment deserves recognition.</h2>
          <p className="mt-2 text-white/90">30 curated gift boxes. Suspiciously precise prices. Genuine warmth.</p>
          <Link
            href={siteHref("/shop")}
            className="inline-block mt-6 bg-white text-[#7C9A82] font-bold rounded-lg px-7 py-3"
          >
            Browse All Occasions
          </Link>
        </div>
      </section>
    </>
  )
}
