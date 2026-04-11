import Image from "next/image"
import { notFound } from "next/navigation"
import { getFanBySlug } from "../data/fans"
import { SubscribeButton } from "../components/SubscribeButton"
import { TipButton } from "../components/TipButton"
import { LockedThumbnail } from "../components/LockedThumbnail"
import { ToastContainer } from "../components/Toast"

interface FanDetailProps {
  slug: string
}

export default function FanDetail({ slug }: FanDetailProps) {
  const fan = getFanBySlug(slug)
  if (!fan) notFound()

  return (
    <>
      <ToastContainer />

      {fan.warningLabel && (
        <div className="bg-[#FF7A59] text-white text-center text-xs font-bold uppercase tracking-wide py-2 px-4">
          ⚠ {fan.warningLabel}
        </div>
      )}

      {/* Cover banner */}
      <div className="relative h-48 md:h-64 bg-gradient-to-r from-[#00AFF0] to-[#0095CD]">
        <Image
          src={fan.coverImage}
          alt={`${fan.name} cover`}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>

      {/* Profile header */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="-mt-12 md:-mt-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="flex items-end gap-4">
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white bg-slate-200 shadow-md">
              <Image src={fan.avatarImage} alt={fan.name} fill sizes="128px" className="object-cover" />
            </div>
            <div className="pb-2">
              <h1 className="text-2xl md:text-3xl font-extrabold text-[#0F172A] flex items-center gap-2">
                {fan.name}
                <span className="text-[#00AFF0]" aria-hidden>●</span>
              </h1>
              <p className="text-sm text-slate-500">
                {fan.handle} · {fan.location}
              </p>
              <p className="text-xs text-slate-500">
                {fan.fanType} · {fan.subscriberCount.toLocaleString()} subscribers
              </p>
            </div>
          </div>
          <div className="md:pb-2">
            <SubscribeButton fanSlug={fan.slug} fanName={fan.name} monthlyPrice={fan.monthlyPrice} size="lg" />
          </div>
        </div>

        {/* Bio */}
        <p className="mt-6 text-slate-700 leading-relaxed max-w-2xl">{fan.bio}</p>

        {/* Posts */}
        <div className="mt-10">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            Posts ({fan.posts.length})
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {fan.posts.map((post, idx) => (
              <LockedThumbnail
                key={idx}
                fanSlug={fan.slug}
                image={post.image}
                caption={post.caption}
                locked={post.locked}
              />
            ))}
          </div>
        </div>

        {/* Tip menu */}
        <div className="mt-10 mb-16 border border-slate-200 rounded-xl p-5 bg-slate-50">
          <div className="text-xs font-extrabold uppercase tracking-wider text-[#FF7A59] mb-3">★ Tip Menu</div>
          <ul className="space-y-3">
            {fan.tipMenu.map((tip, idx) => (
              <li key={idx} className="flex items-center justify-between gap-4 text-sm text-slate-700">
                <span>
                  <strong className="text-[#0F172A]">${tip.amount}</strong> — {tip.description}
                </span>
                <TipButton fanName={fan.name} amount={tip.amount} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
