import Image from "next/image"
import Link from "next/link"
import { getProductBySlug, products } from "../data/products"
import BolusCompatibilityMeter from "../components/bolus-compatibility-meter"
import WaitlistButton from "../components/waitlist-button"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"
import { ProductCard } from "@/components/ui/product-card"

export default function PrechewedProductDetail({ slug }: { slug: string }) {
  const product = getProductBySlug(slug)
  if (!product) return null

  const related = products
    .filter((p) => p.cuisine === product.cuisine && p.slug !== product.slug)
    .slice(0, 3)

  return (
    <>
      {/* Breadcrumb nav */}
      <nav
        className="px-4 py-3 text-sm font-mono"
        style={{ color: "var(--color-muted, #6C6A7D)" }}
        aria-label="Breadcrumb"
      >
        <div className="max-w-5xl mx-auto flex items-center gap-2">
          <Link
            href="/products"
            style={{ color: "var(--color-primary, #5B3FD9)" }}
            className="hover:underline"
          >
            Pouches
          </Link>
          <span>/</span>
          <span>{product.cuisine}</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Image */}
          <div
            className="relative aspect-square rounded-xl overflow-hidden"
            style={{ background: "#F1EFFA" }}
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
              fetchPriority="high"
            />
          </div>

          {/* Info panel */}
          <div className="flex flex-col gap-4">
            <h1
              className="text-4xl font-heading font-bold leading-tight"
              style={{ color: "var(--color-primary, #5B3FD9)" }}
            >
              {product.name}
            </h1>
            <p
              className="text-lg"
              style={{ color: "var(--color-muted, #6C6A7D)" }}
            >
              {product.tagline}
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <span
                className="text-2xl font-bold"
                style={{ color: "var(--color-primary, #5B3FD9)" }}
              >
                {product.priceLabel}
              </span>
              <span
                className="text-sm font-mono"
                style={{ color: "var(--color-muted, #6C6A7D)" }}
              >
                {product.weightOz} oz
              </span>
            </div>

            {/* Bolus Compatibility Meter */}
            <div className="my-2">
              <BolusCompatibilityMeter score={product.bolusCompatibility} />
            </div>

            {/* CTA */}
            {product.isLimited ? (
              <WaitlistButton productName={product.name} />
            ) : (
              <AddToCartButton
                slug={product.slug}
                productName={product.name}
              />
            )}
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {product.description.map((para, i) => (
            <p
              key={i}
              className="text-base leading-relaxed"
              style={{ color: "var(--color-foreground, #1B1A2E)" }}
            >
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* Ingredients + Nutrition */}
      <section
        className="py-12 px-4"
        style={{ background: "#F1EFFA" }}
      >
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Ingredients */}
          <div>
            <h2
              className="text-xl font-heading font-bold mb-4"
              style={{ color: "var(--color-primary, #5B3FD9)" }}
            >
              Ingredients
            </h2>
            <ul className="space-y-2">
              {product.ingredients.map((ingredient, i) => (
                <li
                  key={i}
                  className="text-sm flex items-start gap-2"
                  style={{ color: "var(--color-foreground, #1B1A2E)" }}
                >
                  <span
                    className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: "var(--color-primary, #5B3FD9)" }}
                  />
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          {/* Nutrition panel */}
          <div>
            <h2
              className="text-xl font-heading font-bold mb-4"
              style={{ color: "var(--color-primary, #5B3FD9)" }}
            >
              Nutrition Panel
            </h2>
            <div
              className="border-2 rounded-lg p-4 text-sm"
              style={{
                borderColor: "var(--color-primary, #5B3FD9)",
                background: "#fff",
              }}
            >
              <div
                className="text-lg font-bold border-b-4 pb-1 mb-2"
                style={{
                  color: "var(--color-foreground, #1B1A2E)",
                  borderColor: "var(--color-primary, #5B3FD9)",
                }}
              >
                Nutrition Facts
              </div>
              <p
                className="text-xs mb-3"
                style={{ color: "var(--color-muted, #6C6A7D)" }}
              >
                Serving Size: {product.nutrition.servingSize}
              </p>
              <div className="divide-y" style={{ borderColor: "#E6E3F0" }}>
                <div className="flex justify-between py-1.5">
                  <span
                    className="font-semibold"
                    style={{ color: "var(--color-foreground, #1B1A2E)" }}
                  >
                    Calories
                  </span>
                  <span style={{ color: "var(--color-muted, #6C6A7D)" }}>
                    {product.nutrition.calories}
                  </span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span
                    className="font-semibold"
                    style={{ color: "var(--color-foreground, #1B1A2E)" }}
                  >
                    Jaw Hours Reclaimed™
                  </span>
                  <span style={{ color: "var(--color-muted, #6C6A7D)" }}>
                    {product.nutrition.jawHoursReclaimed}h
                  </span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span
                    className="font-semibold"
                    style={{ color: "var(--color-foreground, #1B1A2E)" }}
                  >
                    Bioavailability Index
                  </span>
                  <span style={{ color: "var(--color-muted, #6C6A7D)" }}>
                    {product.nutrition.bioavailabilityIndex}
                  </span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span
                    className="font-semibold"
                    style={{ color: "var(--color-foreground, #1B1A2E)" }}
                  >
                    Bolus Density
                  </span>
                  <span style={{ color: "var(--color-muted, #6C6A7D)" }}>
                    {product.nutrition.bolusDensity}
                  </span>
                </div>
              </div>
              <p
                className="text-xs mt-3 pt-2 border-t"
                style={{
                  color: "var(--color-muted, #6C6A7D)",
                  borderColor: "#E6E3F0",
                }}
              >
                * Values certified by the Pre-Oral Nutrition Standards Board™.
                Not evaluated by the FDA.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certified Masticator's Note */}
      <section className="py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <div
            className="rounded-xl p-6 border-l-4"
            style={{
              background: "#F1EFFA",
              borderColor: "var(--color-primary, #5B3FD9)",
            }}
          >
            <p
              className="text-xs font-mono uppercase tracking-widest mb-2"
              style={{ color: "var(--color-muted, #6C6A7D)" }}
            >
              Certified Masticator&apos;s Note
            </p>
            <p
              className="text-base italic"
              style={{ color: "var(--color-foreground, #1B1A2E)" }}
            >
              &ldquo;{product.masticatorNote}&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Related pouches */}
      {related.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <h2
              className="text-2xl font-heading font-bold text-center mb-8"
              style={{ color: "var(--color-primary, #5B3FD9)" }}
            >
              More from {product.cuisine}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((p) => (
                <ProductCard
                  key={p.slug}
                  slug={p.slug}
                  name={p.name}
                  price={p.priceLabel}
                  tagline={p.tagline}
                  image={p.image}
                  showAddToCart={!p.isLimited}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
