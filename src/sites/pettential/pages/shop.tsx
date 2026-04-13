// src/sites/pettential/pages/shop.tsx
"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { products, divisions, getProductsByDivision, type Division } from "../data/products"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"
import { useSiteLink } from "@/hooks/use-site-link"

export const metadata = {
  title: "Shop — Pettential",
  description: "Browse 25 performance products across 6 animal divisions. Because stagnation is a choice.",
}

export default function PettentialShop() {
  const siteHref = useSiteLink()
  const [activeDivision, setActiveDivision] = useState<Division | null>(null)

  const displayedProducts = activeDivision
    ? getProductsByDivision(activeDivision)
    : products

  const activeDivisionInfo = activeDivision
    ? divisions.find((d) => d.key === activeDivision)
    : null

  return (
    <section className="bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center">
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[#FF3366]">
            Performance gear
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold text-[#111] font-heading">
            All Products
          </h1>
          <p className="mt-3 text-[#111]/70 max-w-2xl mx-auto">
            {products.length} products across 6 divisions. Every one designed for an animal that will not use it.
          </p>
        </div>

        {/* Division filter bar */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setActiveDivision(null)}
            className={`px-4 py-2 text-sm font-bold rounded-full border transition-colors ${
              !activeDivision
                ? "bg-[#111] text-white border-[#111]"
                : "border-[#111]/20 text-[#111]/70 hover:border-[#111]/40"
            }`}
          >
            All
          </button>
          {divisions.map((div) => (
            <button
              key={div.key}
              onClick={() => setActiveDivision(div.key)}
              className={`px-4 py-2 text-sm font-bold rounded-full border transition-colors ${
                activeDivision === div.key
                  ? "text-[#111] border-current"
                  : "border-[#111]/20 text-[#111]/70 hover:border-[#111]/40"
              }`}
              style={activeDivision === div.key ? { backgroundColor: div.color, borderColor: div.color } : undefined}
            >
              {div.emoji} {div.label}
            </button>
          ))}
        </div>

        {/* Division mini-hero */}
        {activeDivisionInfo && (
          <div
            className="mt-8 rounded-xl p-6 text-center"
            style={{ backgroundColor: activeDivisionInfo.color + "20", borderLeft: `4px solid ${activeDivisionInfo.color}` }}
          >
            <h2 className="text-2xl font-bold text-[#111] font-heading">
              {activeDivisionInfo.emoji} {activeDivisionInfo.label}
            </h2>
            <p className="mt-1 text-[#111]/60">{activeDivisionInfo.tagline}</p>
          </div>
        )}

        {/* Product grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProducts.map((product) => {
            const divInfo = divisions.find((d) => d.key === product.division)
            return (
              <div
                key={product.slug}
                className="bg-white border border-[#111]/10 rounded-xl overflow-hidden hover:shadow-md transition-shadow flex flex-col"
              >
                <Link href={siteHref(`/shop/${product.slug}`)}>
                  <div className="relative aspect-square bg-[#1A1A1A]/5">
                    <Image
                      src={product.heroImage}
                      alt={product.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </Link>
                <div className="p-5 flex flex-col flex-1">
                  {divInfo && (
                    <span
                      className="inline-block self-start px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-[#111] mb-2"
                      style={{ backgroundColor: divInfo.color }}
                    >
                      {divInfo.emoji} {divInfo.label}
                    </span>
                  )}
                  <Link href={siteHref(`/shop/${product.slug}`)}>
                    <div className="font-bold text-[#111] hover:text-[#FF3366] font-heading">{product.name}</div>
                  </Link>
                  <p className="text-sm text-[#111]/60 mt-1 line-clamp-2 flex-1">{product.tagline}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-lg font-bold text-[#111]">{product.priceLabel}</div>
                    <AddToCartButton
                      slug={product.slug}
                      productName={product.name}
                      className="px-4 py-2 bg-[#CCFF00] hover:bg-[#b8e600] text-[#111] text-sm font-bold rounded-lg transition-colors"
                      quips={[
                        "Added. They won't notice.",
                        "Performance incoming.",
                        "Your pet's potential awaits.",
                        "Bold move.",
                        "Stagnation: defeated.",
                      ]}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
