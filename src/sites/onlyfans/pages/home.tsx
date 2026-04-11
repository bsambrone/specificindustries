import Image from "next/image"
import Link from "next/link"
import { getSiteHref } from "@/lib/site-href"
import { homepageFeaturedFans } from "../data/fans"
import { homepageTestimonials } from "../data/testimonials"
import { FanCard } from "../components/FanCard"
import { ToastContainer } from "../components/Toast"

export default async function OnlyFansHome() {
  const siteHref = await getSiteHref()

  return (
    <>
      <ToastContainer />

      {/* HERO */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-[#00AFF0] leading-tight">
              Subscribe to your favorite fan.
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Literal fans. Blowing literal air. The world's premier subscription platform for household and industrial airflow content.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={siteHref("/browse")}
                className="bg-[#00AFF0] hover:bg-[#0095CD] text-white font-bold rounded-full px-7 py-3 transition-colors"
              >
                Meet the Fans
              </Link>
              <Link
                href={siteHref("/how-it-works")}
                className="bg-white border border-slate-200 hover:border-slate-300 text-[#0F172A] font-bold rounded-full px-7 py-3 transition-colors"
              >
                How It Works
              </Link>
            </div>
          </div>
          <div className="relative aspect-[3/2] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/sites/onlyfans/home-hero.png"
              alt="A curated lineup of three different household fans"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              priority
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* FEATURED FANS */}
      <section className="bg-slate-50 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-extrabold text-[#0F172A]">Featured fans</h2>
            <p className="text-slate-500 mt-2">A small selection of the creators currently on the platform.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {homepageFeaturedFans.map((fan) => (
              <FanCard key={fan.slug} fan={fan} siteHref={siteHref} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href={siteHref("/browse")}
              className="text-[#0095CD] font-bold underline underline-offset-4"
            >
              See all 8 fans →
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS PREVIEW */}
      <section className="bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-[3/2] rounded-2xl overflow-hidden">
            <Image
              src="/sites/onlyfans/how-it-works.png"
              alt="Three steps to subscribe to a fan"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-[#0F172A]">How it works</h2>
            <ol className="mt-6 space-y-4 text-slate-700">
              <li className="flex gap-3"><span className="font-bold text-[#00AFF0]">1.</span><span>Browse the fans and find one whose airflow personality fits your home.</span></li>
              <li className="flex gap-3"><span className="font-bold text-[#00AFF0]">2.</span><span>Subscribe — every fan posts content as it occurs to them.</span></li>
              <li className="flex gap-3"><span className="font-bold text-[#00AFF0]">3.</span><span>Watch them blow air. That's it. That's the platform.</span></li>
            </ol>
            <Link
              href={siteHref("/how-it-works")}
              className="inline-block mt-6 text-[#0095CD] font-bold underline underline-offset-4"
            >
              Read the full guide →
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL STRIP */}
      <section className="bg-slate-50 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-extrabold text-[#0F172A] text-center mb-10">What our subscribers say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {homepageTestimonials.map((t) => (
              <div key={t.name} className="bg-white border border-slate-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-200">
                    <Image src={t.image} alt={t.name} fill sizes="48px" className="object-cover" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-[#0F172A]">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.title}</div>
                  </div>
                </div>
                <p className="text-sm text-slate-700 italic">&ldquo;{t.quote}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FOOTER BAND */}
      <section className="bg-[#00AFF0] text-white">
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          <h2 className="text-3xl font-extrabold">Find your fan today.</h2>
          <p className="mt-2 text-white/90">Eight creators. Eight personalities. One platform.</p>
          <Link
            href={siteHref("/browse")}
            className="inline-block mt-6 bg-white text-[#0095CD] font-bold rounded-full px-7 py-3"
          >
            Browse the roster
          </Link>
        </div>
      </section>
    </>
  )
}
