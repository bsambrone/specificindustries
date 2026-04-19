import Image from "next/image"
import Link from "next/link"
import { getProductBySlug, products } from "../data/products"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"
import { ProductCard } from "@/components/ui/product-card"
import { StampBadge } from "../components/stamp-badge"

export default async function TerrorClownProductDetail({ slug }: { slug: string }) {
  const product = getProductBySlug(slug)
  if (!product) return null

  const related = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 3)

  return (
    <>
      {/* Breadcrumb */}
      <nav
        className="px-4 py-3 text-sm"
        style={{ color: "var(--color-text, #1F1A17)", opacity: 0.65 }}
        aria-label="Breadcrumb"
      >
        <div className="max-w-5xl mx-auto flex items-center gap-2">
          <Link href="/products" style={{ color: "var(--color-primary, #A8352A)" }} className="hover:underline">
            Catalog
          </Link>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span style={{ opacity: 0.9 }}>{product.name}</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div
            className="relative aspect-square rounded-lg overflow-hidden border-2"
            style={{ borderColor: "var(--color-secondary, #3E6C6E)", background: "#FFFFFF40" }}
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
              fetchPriority="high"
            />
            {product.category === "Flagship" && (
              <div className="absolute top-4 right-4">
                <StampBadge rotate={6} variant="primary">Heirloom</StampBadge>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-5">
            <div
              className="text-xs uppercase tracking-[0.3em]"
              style={{ color: "var(--color-secondary, #3E6C6E)" }}
            >
              {product.category}
            </div>
            <h1
              className="text-4xl font-heading font-semibold leading-tight"
              style={{ color: "var(--color-text, #1F1A17)" }}
            >
              {product.name}
            </h1>
            <p className="text-xl italic" style={{ color: "var(--color-text, #1F1A17)", opacity: 0.8 }}>
              {product.tagline}
            </p>
            <div className="flex items-baseline gap-4">
              <span
                className="text-3xl font-heading font-semibold"
                style={{ color: "var(--color-primary, #A8352A)" }}
              >
                {product.priceLabel}
              </span>
              <span className="text-sm" style={{ color: "var(--color-text, #1F1A17)", opacity: 0.6 }}>
                as low as ${Math.ceil(product.price / 12)}/month with layaway
              </span>
            </div>
            <div className="flex flex-col gap-3 pt-2" style={{ color: "var(--color-text, #1F1A17)" }}>
              {product.description.map((para, i) => (
                <p key={i} className="leading-relaxed">{para}</p>
              ))}
            </div>
            {product.includedItems && (
              <div
                className="mt-4 p-4 border-l-4"
                style={{ borderColor: "var(--color-secondary, #3E6C6E)", background: "#FFFFFF60" }}
              >
                <div
                  className="text-xs uppercase tracking-[0.25em] mb-2"
                  style={{ color: "var(--color-secondary, #3E6C6E)" }}
                >
                  In the box
                </div>
                <ul
                  className="list-disc list-inside flex flex-col gap-1 text-sm"
                  style={{ color: "var(--color-text, #1F1A17)" }}
                >
                  {product.includedItems.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            )}
            {product.upgradeOptions && (
              <div className="text-sm" style={{ color: "var(--color-text, #1F1A17)", opacity: 0.8 }}>
                <div
                  className="text-xs uppercase tracking-[0.25em] mb-1"
                  style={{ color: "var(--color-secondary, #3E6C6E)" }}
                >
                  Upgrade options
                </div>
                <ul className="list-disc list-inside flex flex-col gap-1">
                  {product.upgradeOptions.map((opt, i) => <li key={i}>{opt}</li>)}
                </ul>
              </div>
            )}
            <div className="pt-2">
              <AddToCartButton
                slug={product.slug}
                productName={product.name}
                quips={[
                  "Added to cart.",
                  "A fine choice.",
                  "Your companion awaits.",
                  "The bond has begun to form.",
                  "Usually, the cart is a safe place.",
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-16 px-4" style={{ background: "#FFFFFF30" }}>
          <div className="max-w-6xl mx-auto">
            <h2
              className="text-2xl font-heading font-semibold mb-8 text-center"
              style={{ color: "var(--color-primary, #A8352A)" }}
            >
              From the same category
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <ProductCard
                  key={p.slug}
                  slug={p.slug}
                  name={p.name}
                  price={p.priceLabel}
                  tagline={p.tagline}
                  image={p.image}
                  href={`/products/${p.slug}`}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
