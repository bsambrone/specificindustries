// src/sites/pettential/pages/home.tsx
import Image from "next/image"
import Link from "next/link"
import { getSiteHref } from "@/lib/site-href"
import { flagshipProducts, divisions } from "../data/products"
import { homepageTestimonials } from "../data/testimonials"

export default async function PettentialHome() {
  const siteHref = await getSiteHref()

  return (
    <>
      {/* HERO */}
      <section className="bg-[#1A1A1A] text-white">
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-32 text-center">
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-[#CCFF00]">
            Performance for every species
          </p>
          <h1 className="mt-6 text-5xl md:text-7xl font-bold leading-tight font-heading">
            ELEVATING EVERY ANIMAL<br />
            TO ITS FULL <span className="text-[#CCFF00]">POTENTIAL</span>™
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto">
            No animal is inappropriate for human products. Only underserved. We provide performance gear, coaching, and career development across six specialized divisions.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href={siteHref("/shop")}
              className="bg-[#CCFF00] hover:bg-[#b8e600] text-[#111] font-bold rounded-lg px-8 py-3 text-lg transition-colors font-heading uppercase tracking-wider"
            >
              Shop Performance Gear
            </Link>
            <Link
              href={siteHref("/services")}
              className="border-2 border-white/30 hover:border-white/60 text-white font-bold rounded-lg px-8 py-3 text-lg transition-colors font-heading uppercase tracking-wider"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      {/* FLAGSHIP PRODUCTS */}
      <section className="bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[#FF3366]">Flagship</p>
            <h2 className="mt-2 text-3xl font-bold text-[#111] font-heading">Hero Products</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {flagshipProducts.map((product) => (
              <Link
                key={product.slug}
                href={siteHref(`/shop/${product.slug}`)}
                className="group bg-white border border-[#111]/10 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-square bg-[#1A1A1A]/5">
                  <Image
                    src={product.heroImage}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <div className="font-bold text-[#111] group-hover:text-[#FF3366] font-heading">{product.name}</div>
                  <p className="text-sm text-[#111]/60 mt-1">{product.tagline}</p>
                  <div className="mt-3 text-lg font-bold text-[#111]">{product.priceLabel}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* METRICS BAR */}
      <section className="bg-[#1A1A1A] text-white py-12">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "10,000+", label: "Animals Served" },
            { value: "+0%", label: "Average Improvement" },
            { value: "6", label: "Performance Divisions" },
            { value: "0", label: "Complaints (they can't write)" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl md:text-4xl font-bold text-[#CCFF00] font-heading">{stat.value}</div>
              <div className="mt-2 text-sm text-white/60 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* DIVISION OVERVIEW */}
      <section className="bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#111] font-heading">Performance Divisions</h2>
            <p className="mt-2 text-[#111]/60">Six specialized teams. Zero combined results.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {divisions.map((div) => (
              <Link
                key={div.key}
                href={siteHref(`/shop?division=${div.key}`)}
                className="group block bg-white border border-[#111]/10 rounded-xl p-6 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="inline-block px-3 py-1 rounded text-xs font-bold uppercase tracking-wider text-[#111]"
                    style={{ backgroundColor: div.color }}
                  >
                    {div.emoji} {div.label}
                  </span>
                </div>
                <p className="text-sm text-[#111]/60">{div.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-[#1A1A1A] text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold font-heading">What Pet Owners Say</h2>
            <p className="mt-2 text-white/60">Enthusiastic reviews. Zero results.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {homepageTestimonials.map((t) => (
              <div key={t.name} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <p className="text-white/80 italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white/10">
                    <Image src={t.image} alt={t.name} fill sizes="40px" className="object-cover" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#CCFF00]">{t.name}</div>
                    <div className="text-xs text-white/50">{t.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#CCFF00] py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#111] font-heading">
            Your pet is underperforming.
          </h2>
          <p className="mt-3 text-lg text-[#111]/70">
            We can&apos;t fix that. But we can sell you things.
          </p>
          <Link
            href={siteHref("/shop")}
            className="mt-8 inline-block bg-[#111] hover:bg-[#333] text-white font-bold rounded-lg px-8 py-3 text-lg transition-colors font-heading uppercase tracking-wider"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </>
  )
}
