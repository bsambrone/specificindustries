import Image from "next/image"
import { notFound } from "next/navigation"
import { getPanBySlug } from "../data/pans"
import { SubscribeButton } from "../components/SubscribeButton"
import { TipButton } from "../components/TipButton"
import { LockedThumbnail } from "../components/LockedThumbnail"
import { ToastContainer } from "../components/Toast"

interface PanDetailProps {
  slug: string
}

export default function PanDetail({ slug }: PanDetailProps) {
  const pan = getPanBySlug(slug)
  if (!pan) notFound()

  return (
    <>
      <ToastContainer />

      {pan.warningLabel && (
        <div className="bg-[#FDE68A] text-[#7C2D12] text-center text-xs font-bold uppercase tracking-wide py-2 px-4">
          ⚠ {pan.warningLabel}
        </div>
      )}

      {/* Cover banner */}
      <div className="relative h-48 md:h-64 bg-gradient-to-r from-[#C2410C] to-[#7C2D12]">
        <Image
          src={pan.coverImage}
          alt={`${pan.name} cover`}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>

      {/* Profile header — avatar pops up into banner, text sits below */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="relative -mt-12 md:-mt-16 w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white bg-[#FDE68A]/40 shadow-md">
          <Image src={pan.avatarImage} alt={pan.name} fill sizes="128px" className="object-cover" />
        </div>

        <div className="mt-3 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#1C0F05] flex items-center gap-2">
              <span className="truncate">{pan.name}</span>
              <span className="text-[#C2410C] flex-shrink-0" aria-hidden>●</span>
            </h1>
            <p className="mt-1 text-sm text-[#7C2D12]/70">
              {pan.handle} · {pan.location}
            </p>
            <p className="text-xs text-[#7C2D12]/70">
              {pan.panType} · {pan.subscriberCount.toLocaleString()} subscribers
            </p>
          </div>
          <div className="flex-shrink-0">
            <SubscribeButton panSlug={pan.slug} panName={pan.name} monthlyPrice={pan.monthlyPrice} size="lg" />
          </div>
        </div>

        {/* Bio */}
        <p className="mt-6 text-[#7C2D12]/90 leading-relaxed max-w-2xl">{pan.bio}</p>

        {/* Posts */}
        <div className="mt-10">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#7C2D12]/70 mb-3">
            Posts ({pan.posts.length})
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {pan.posts.map((post, idx) => (
              <LockedThumbnail
                key={idx}
                panSlug={pan.slug}
                image={post.image}
                caption={post.caption}
                locked={post.locked}
              />
            ))}
          </div>
        </div>

        {/* Tip menu */}
        <div className="mt-10 mb-16 border border-[#C2410C]/20 rounded-xl p-5 bg-[#FFF6ED]">
          <div className="text-xs font-extrabold uppercase tracking-wider text-[#C2410C] mb-3">★ Tip Menu</div>
          <ul className="space-y-3">
            {pan.tipMenu.map((tip, idx) => (
              <li key={idx} className="flex items-center justify-between gap-4 text-sm text-[#7C2D12]/90">
                <span>
                  <strong className="text-[#1C0F05]">${tip.amount}</strong> — {tip.description}
                </span>
                <TipButton panName={pan.name} amount={tip.amount} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
