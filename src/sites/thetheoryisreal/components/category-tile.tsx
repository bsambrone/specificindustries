// src/sites/thetheoryisreal/components/category-tile.tsx
import Link from "next/link"
import Image from "next/image"
import type { Category } from "../types"
import { getSiteHref } from "@/lib/site-href"

export async function CategoryTile({ category }: { category: Category }) {
  const siteHref = await getSiteHref()
  return (
    <Link
      href={siteHref(`/category/${category.key}`)}
      className="group relative block overflow-hidden border border-primary/40 bg-[#17181c]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden grayscale transition-all group-hover:grayscale-0">
        <Image src={category.image} alt={category.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0e] via-[#0b0c0e]/20 to-transparent" />
      </div>
      <div className="relative -mt-12 px-5 pb-5">
        <h3 className="font-heading text-lg uppercase tracking-widest text-primary">{category.title}</h3>
        <p className="mt-1 font-body text-sm text-text/85">{category.tagline}</p>
      </div>
    </Link>
  )
}
