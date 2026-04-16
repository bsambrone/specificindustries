import Image from "next/image"
import Link from "next/link"
import { getProductBySlug, getProductsByBranch, Product } from "@/sites/squaredaway/data/products"
import { NsnHeader } from "@/components/ui/NsnHeader"
import { SpecsTable } from "@/components/ui/SpecsTable"
import { WarningBox } from "@/components/ui/WarningBox"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"

const BRANCH_LABEL: Record<Product["branch"], string> = {
  army: "Army",
  navy: "Navy",
  airforce: "Air Force",
  marines: "Marines",
}

function Stars({ n }: { n: number }) {
  const full = "★".repeat(n)
  const empty = "☆".repeat(5 - n)
  return <span className="text-accent font-mono">{full}{empty}</span>
}

export default function ProductDetail({ slug }: { slug: string }) {
  const product = getProductBySlug(slug)
  if (!product) return null

  const related = getProductsByBranch(product.branch).filter((p) => p.slug !== product.slug).slice(0, 3)

  return (
    <>
      {/* Header / hero */}
      <section className="py-10 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div className="relative aspect-square border-2 border-primary/40 bg-background overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              fetchPriority="high"
              className="object-cover"
            />
          </div>
          <div>
            <NsnHeader nsn={product.nsn} contractCode={product.contractCode} milStd={product.milStd} />
            <p className="font-mono text-xs uppercase tracking-widest text-primary/70 mb-1">
              {BRANCH_LABEL[product.branch]} Section
            </p>
            <h1 className="font-heading text-3xl md:text-4xl text-primary uppercase tracking-wide leading-tight mb-2">
              {product.name}
            </h1>
            <p className="italic text-foreground/80 mb-5">{product.tagline}</p>

            <div className="border-2 border-primary/40 bg-primary/5 p-4 mb-5">
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-xs uppercase text-primary/60">UNIT PRICE</span>
                <span className="font-heading text-3xl text-primary">{product.priceLabel}</span>
              </div>
            </div>

            <AddToCartButton
              slug={product.slug}
              productName={product.name}
              className="w-full border-2 border-primary bg-primary text-background font-heading uppercase tracking-widest px-6 py-3 hover:bg-accent hover:border-accent transition-colors"
              quips={[
                "ORDER RECEIVED. AWAIT FURTHER GUIDANCE.",
                "ACQUISITION COMPLETE.",
                "MORALE UPDATED.",
                "FUNDS DISBURSED. DIGNITY NEGOTIABLE.",
                "SQUARED AWAY.",
              ]}
            />
          </div>
        </div>
      </section>

      {/* Long description */}
      <section className="py-10 px-4 bg-primary/5 border-y-2 border-primary/30">
        <div className="max-w-3xl mx-auto space-y-4">
          {product.longDescription.map((p, i) => (
            <p key={i} className="text-foreground/90 leading-relaxed">{p}</p>
          ))}
        </div>
      </section>

      {/* Cross-branch jab */}
      {product.crossBranchJab && (
        <section className="py-10 px-4">
          <div className="max-w-3xl mx-auto text-center border-l-4 border-accent pl-6 text-left">
            <p className="font-heading text-2xl text-primary italic">&ldquo;{product.crossBranchJab}&rdquo;</p>
            <p className="font-mono text-xs uppercase tracking-widest text-primary/60 mt-2">
              — SQUARED AWAY EDITORIAL BOARD
            </p>
          </div>
        </section>
      )}

      {/* Specs */}
      <section className="py-10 px-4 bg-primary/5 border-y-2 border-primary/30">
        <div className="max-w-3xl mx-auto">
          <SpecsTable heading="Technical Specifications" rows={product.specs} />
        </div>
      </section>

      {/* Warnings */}
      <section className="py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <WarningBox warnings={product.warnings} />
        </div>
      </section>

      {/* Reviews */}
      <section className="py-10 px-4 bg-primary/5 border-y-2 border-primary/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-2xl text-primary uppercase tracking-widest mb-6">After-Action Reports</h2>
          <div className="space-y-5">
            {product.reviews.map((r, i) => (
              <div key={i} className="border-l-4 border-primary/50 pl-4">
                <div className="flex items-center gap-3 mb-1">
                  <Stars n={r.stars} />
                  <span className="font-mono text-xs uppercase tracking-widest text-primary/70">
                    {r.rank} {r.name}
                  </span>
                </div>
                <p className="text-foreground/90">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-heading text-2xl text-primary uppercase tracking-widest mb-6">
              Also in the {BRANCH_LABEL[product.branch]} Section
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/products/${p.slug}`}
                  className="block border-2 border-primary/40 bg-background hover:border-accent transition-colors"
                >
                  <div className="relative aspect-square">
                    <Image src={p.image} alt={p.name} fill className="object-cover" />
                  </div>
                  <div className="p-4 border-t-2 border-primary/40">
                    <p className="font-mono text-xs uppercase text-primary/60 mb-1">NSN {p.nsn}</p>
                    <p className="font-heading text-primary uppercase tracking-wide text-lg leading-tight mb-1">{p.name}</p>
                    <p className="text-sm text-foreground/70">{p.tagline}</p>
                    <p className="font-mono text-accent mt-2">{p.priceLabel}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contract footer */}
      <section className="py-6 px-4 border-t-2 border-primary/30 bg-primary/10">
        <div className="max-w-5xl mx-auto font-mono text-[10px] md:text-xs uppercase tracking-widest text-primary/60 text-center">
          Nomenclature pending · Contract #{product.contractCode} · {product.milStd} · UNCLASSIFIED // FOUO
        </div>
      </section>
    </>
  )
}
