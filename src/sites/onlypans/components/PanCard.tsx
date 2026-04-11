import Image from "next/image"
import Link from "next/link"
import type { Pan } from "../data/pans"
import { SubscribeButton } from "./SubscribeButton"

interface PanCardProps {
  pan: Pan
  siteHref: (path: string) => string
}

export function PanCard({ pan, siteHref }: PanCardProps) {
  const profileHref = siteHref(`/browse/${pan.slug}`)
  return (
    <div className="rounded-xl overflow-hidden border border-[#C2410C]/20 bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col">
      <Link href={profileHref} className="block relative aspect-[16/9] bg-[#FDE68A]/30">
        <Image
          src={pan.coverImage}
          alt={`${pan.name} cover`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </Link>
      <div className="px-4 pt-3 -mt-8 relative">
        <Link href={profileHref} className="block w-16 h-16 rounded-full overflow-hidden border-4 border-white bg-[#FDE68A]/40 relative">
          <Image
            src={pan.avatarImage}
            alt={`${pan.name} avatar`}
            fill
            sizes="64px"
            className="object-cover"
          />
        </Link>
      </div>
      <div className="px-4 py-3 flex-1 flex flex-col">
        <Link href={profileHref} className="block">
          <div className="font-bold text-[#1C0F05] text-base flex items-center gap-1.5">
            {pan.name}
            <span className="text-[#C2410C]" aria-hidden>●</span>
          </div>
          <div className="text-xs text-[#7C2D12]/70">{pan.handle} · {pan.location}</div>
          <div className="text-xs text-[#7C2D12]/80 mt-1">{pan.panType}</div>
        </Link>
        <div className="mt-3 flex-1">
          <span className="inline-block bg-[#C2410C]/10 text-[#7C2D12] text-xs font-semibold px-2 py-1 rounded-full">
            {pan.audienceTag}
          </span>
        </div>
        <div className="mt-3 pt-3 border-t border-[#C2410C]/10">
          <SubscribeButton panSlug={pan.slug} panName={pan.name} monthlyPrice={pan.monthlyPrice} size="sm" />
        </div>
      </div>
    </div>
  )
}
