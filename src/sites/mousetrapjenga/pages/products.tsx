import Image from "next/image"
import Link from "next/link"
import { getSiteHref } from "@/lib/site-href"
import { InfomercialBand } from "../components/InfomercialBand"
import { Starburst } from "../components/Starburst"
import { tieredEditions, accessories, type Product } from "../data/products"

export const metadata = {
  title: "Products — Mousetrap Jenga",
  description: "The complete lineup! Five tiered editions plus essential accessories. Order yours today!",
}

export default async function MousetrapJengaProducts() {
  const siteHref = await getSiteHref()

  return (
    <>
      <InfomercialBand bgColor="primary" textColor="light" verticalPadding="lg">
        <div className="text-center">
          <h1 className="font-heading text-5xl md:text-6xl text-[#FFD23F] drop-shadow-[4px_4px_0_#1A1F4C]">THE COMPLETE LINEUP!</h1>
          <p className="text-lg md:text-xl mt-4 text-[#FFF6E8]/90">Five editions of the American family game classic — plus the accessories EVERY champion needs!</p>
        </div>
      </InfomercialBand>

      <InfomercialBand bgColor="background" verticalPadding="lg">
        <h2 className="font-heading text-4xl text-[#D4281F] text-center mb-2">Championship Editions</h2>
        <p className="text-center text-[#1A1F4C]/70 mb-10">Choose your level of commitment.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tieredEditions.map((product, idx) => (
            <ProductListingCard
              key={product.slug}
              product={product}
              href={siteHref(`/products/${product.slug}`)}
              badge={
                idx === 1 ? <Starburst text={"BEST\nSELLER!"} color="red" size="sm" rotation={-10} /> : null
              }
            />
          ))}
        </div>
      </InfomercialBand>

      <InfomercialBand bgColor="cream-dark" verticalPadding="lg">
        <h2 className="font-heading text-4xl text-[#D4281F] text-center mb-2">Essential Accessories</h2>
        <p className="text-center text-[#1A1F4C]/70 mb-10">Every champion needs the basics!</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {accessories.map((product) => (
            <ProductListingCard
              key={product.slug}
              product={product}
              href={siteHref(`/products/${product.slug}`)}
              badge={null}
            />
          ))}
        </div>
      </InfomercialBand>
    </>
  )
}

function ProductListingCard({
  product,
  href,
  badge,
}: {
  product: Product
  href: string
  badge: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="relative block bg-[#FFF6E8] border-4 border-[#1A1F4C] shadow-[6px_6px_0_0_#1A1F4C] hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0_0_#1A1F4C] transition-all"
    >
      {badge && <div className="absolute -top-6 -right-6 z-10">{badge}</div>}
      <div className="relative aspect-square border-b-4 border-[#1A1F4C] overflow-hidden bg-[#F5E8CE]">
        <Image src={product.image} alt={product.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
      </div>
      <div className="p-4 text-center">
        <h3 className="font-heading text-xl text-[#1A1F4C] mb-2 leading-tight">{product.name}</h3>
        <p className="text-sm text-[#1A1F4C]/70 italic mb-3 min-h-[2.5em]">&ldquo;{product.tagline}&rdquo;</p>
        <p className="font-heading text-2xl text-[#D4281F]">{product.priceLabel}</p>
      </div>
    </Link>
  )
}
