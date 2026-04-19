import { notFound } from "next/navigation"
import Image from "next/image"
import { getProductBySlug } from "@/sites/thetheoryisreal/data/products"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"

export default function ProductDetail({ slug }: { slug: string }) {
  const p = getProductBySlug(slug)
  if (!p) notFound()
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="relative aspect-square border border-primary/40 bg-[#17181c] grayscale">
          <Image src={p.image} alt={p.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 500px" priority />
        </div>
        <div>
          <h1 className="font-heading text-3xl text-primary">{p.name}</h1>
          <p className="mt-2 font-body text-base italic text-text/80">{p.tagline}</p>
          <p className="mt-6 font-heading text-2xl text-secondary">{p.priceLabel}</p>
          <div className="mt-6 space-y-4">
            {p.description.map((para, i) => (
              <p key={i} className="font-body text-[0.95rem] leading-relaxed text-text/85">{para}</p>
            ))}
          </div>
          <div className="mt-8">
            <AddToCartButton slug={p.slug} productName={p.name} />
          </div>
          <table className="mt-10 w-full border border-primary/30 bg-[#141519]">
            <tbody>
              {p.nutritionalFacts.map((row, i) => (
                <tr key={i} className="border-b border-primary/20 last:border-0">
                  <th scope="row" className="w-1/2 px-4 py-2 text-left font-heading text-[0.7rem] uppercase tracking-widest text-text/60">
                    {row.label}
                  </th>
                  <td className="px-4 py-2 font-body text-sm text-text/90">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
