import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getSiteHref } from "@/lib/site-href"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"
import { InfomercialBand } from "../components/InfomercialBand"
import { Starburst } from "../components/Starburst"
import { getProductBySlug, tieredEditions } from "../data/products"

export default async function MousetrapJengaProductDetail({ slug }: { slug: string }) {
  const product = getProductBySlug(slug)
  if (!product) notFound()
  const siteHref = await getSiteHref()

  // "Frequently bought together" always pushes the Recovery Pack unless
  // this IS the Recovery Pack.
  const upsell = product.slug === "recovery-pack" ? getProductBySlug("trap-refill-12pk")! : getProductBySlug("recovery-pack")!

  const relatedEditions = tieredEditions.filter((p) => p.slug !== product.slug).slice(0, 3)

  return (
    <>
      <InfomercialBand bgColor="background" verticalPadding="lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Image */}
          <div className="relative aspect-square border-4 border-[#1A1F4C] shadow-[8px_8px_0_0_#1A1F4C] bg-[#F5E8CE]">
            <Image src={product.image} alt={product.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" priority />
            <div className="absolute -top-8 -right-8">
              <Starburst text="NEW!" color="yellow" size="sm" rotation={12} />
            </div>
          </div>

          {/* Info */}
          <div>
            <h1 className="font-heading text-4xl md:text-5xl text-[#1A1F4C] mb-2 leading-tight">{product.name}</h1>
            <p className="text-lg italic text-[#1A1F4C]/70 mb-6">&ldquo;{product.tagline}&rdquo;</p>
            <p className="font-heading text-4xl text-[#D4281F] mb-8">{product.priceLabel}</p>

            <div className="space-y-4 text-[#1A1F4C]/90 mb-8">
              {product.description.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="mb-8">
              <AddToCartButton slug={product.slug} productName={product.name} />
            </div>

            {/* What's in the box */}
            <div className="border-4 border-[#1A1F4C] bg-[#FFD23F] p-6">
              <h2 className="font-heading text-2xl text-[#D4281F] mb-4 text-center uppercase">What&apos;s in the Box!</h2>
              <ul className="space-y-2">
                {product.whatsInTheBox.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="font-heading text-xl text-[#D4281F] leading-none">★</span>
                    <span className="text-[#1A1F4C]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </InfomercialBand>

      {/* Frequently bought together */}
      <InfomercialBand bgColor="cream-dark" verticalPadding="md">
        <h2 className="font-heading text-2xl text-[#1A1F4C] text-center mb-6">Frequently Bought Together!</h2>
        <div className="max-w-sm mx-auto">
          <Link
            href={siteHref(`/products/${upsell.slug}`)}
            className="block bg-[#FFF6E8] border-4 border-[#1A1F4C] shadow-[6px_6px_0_0_#1A1F4C] hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0_0_#1A1F4C] transition-all"
          >
            <div className="relative aspect-square border-b-4 border-[#1A1F4C] overflow-hidden bg-[#F5E8CE]">
              <Image src={upsell.image} alt={upsell.name} fill className="object-cover" sizes="384px" />
            </div>
            <div className="p-4 text-center">
              <h3 className="font-heading text-lg text-[#1A1F4C]">{upsell.name}</h3>
              <p className="font-heading text-xl text-[#D4281F] mt-1">{upsell.priceLabel}</p>
            </div>
          </Link>
        </div>
      </InfomercialBand>

      {/* Related editions */}
      {relatedEditions.length > 0 && (
        <InfomercialBand bgColor="background" verticalPadding="md">
          <h2 className="font-heading text-2xl text-[#1A1F4C] text-center mb-6">Other Editions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedEditions.map((p) => (
              <Link
                key={p.slug}
                href={siteHref(`/products/${p.slug}`)}
                className="block bg-[#FFF6E8] border-4 border-[#1A1F4C] shadow-[4px_4px_0_0_#1A1F4C] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_#1A1F4C] transition-all"
              >
                <div className="relative aspect-square border-b-4 border-[#1A1F4C] overflow-hidden bg-[#F5E8CE]">
                  <Image src={p.image} alt={p.name} fill className="object-cover" sizes="(max-width: 640px) 100vw, 33vw" />
                </div>
                <div className="p-3 text-center">
                  <h3 className="font-heading text-base text-[#1A1F4C] leading-tight">{p.name}</h3>
                  <p className="font-heading text-lg text-[#D4281F] mt-1">{p.priceLabel}</p>
                </div>
              </Link>
            ))}
          </div>
        </InfomercialBand>
      )}
    </>
  )
}
