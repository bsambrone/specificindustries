import Image from "next/image"
import Link from "next/link"
import type { Fan } from "../data/fans"
import { SubscribeButton } from "./SubscribeButton"

interface FanCardProps {
  fan: Fan
  siteHref: (path: string) => string
}

export function FanCard({ fan, siteHref }: FanCardProps) {
  const profileHref = siteHref(`/browse/${fan.slug}`)
  return (
    <div className="rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col">
      <Link href={profileHref} className="block relative aspect-[16/9] bg-slate-100">
        <Image
          src={fan.coverImage}
          alt={`${fan.name} cover`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </Link>
      <div className="px-4 pt-3 -mt-8 relative">
        <Link href={profileHref} className="block w-16 h-16 rounded-full overflow-hidden border-4 border-white bg-slate-200 relative">
          <Image
            src={fan.avatarImage}
            alt={`${fan.name} avatar`}
            fill
            sizes="64px"
            className="object-cover"
          />
        </Link>
      </div>
      <div className="px-4 py-3 flex-1 flex flex-col">
        <Link href={profileHref} className="block">
          <div className="font-bold text-[#0F172A] text-base flex items-center gap-1.5">
            {fan.name}
            <span className="text-[#00AFF0]" aria-hidden>●</span>
          </div>
          <div className="text-xs text-slate-500">{fan.handle} · {fan.location}</div>
          <div className="text-xs text-slate-600 mt-1">{fan.fanType}</div>
        </Link>
        <div className="mt-3 flex-1">
          <span className="inline-block bg-[#00AFF0]/10 text-[#0095CD] text-xs font-semibold px-2 py-1 rounded-full">
            {fan.audienceTag}
          </span>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-100">
          <SubscribeButton fanSlug={fan.slug} fanName={fan.name} monthlyPrice={fan.monthlyPrice} size="sm" />
        </div>
      </div>
    </div>
  )
}
