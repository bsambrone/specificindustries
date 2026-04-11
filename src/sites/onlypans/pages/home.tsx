import Image from "next/image"
import Link from "next/link"
import { getSiteHref } from "@/lib/site-href"
import { homepageFeaturedPans } from "../data/pans"
import { homepageTestimonials } from "../data/testimonials"
import { PanCard } from "../components/PanCard"
import { ToastContainer } from "../components/Toast"

const BETTER_REASONS = [
  { headline: "Our creators do not require electricity.", body: "No outlet. No batteries. Nothing to trip over." },
  { headline: "Our creators last for generations.", body: "Greta has been in her family since 1952. Their most senior creator was manufactured in 1978." },
  { headline: "You can cook with our creators.", body: "Try that with a box fan." },
  { headline: "Zero moving parts.", body: "Nothing to break. Nothing to oil. Nothing to warranty." },
  { headline: "Our creators were invented before 1882.", body: "The pan predates the electric fan by thousands of years. We are the original platform." },
  { headline: "Our subscribers report being more centered.", body: "A still object is meditative. A spinning object is noise." },
  { headline: "Your grandchildren will own our creators.", body: "You cannot say the same about a wind tunnel." },
  { headline: "No shingles have ever been removed by a pan.", body: "We cannot make the same claim about certain industrial airflow content." },
]

export default async function OnlyPansHome() {
  const siteHref = await getSiteHref()

  return (
    <>
      <ToastContainer />

      {/* HERO */}
      <section className="bg-[#FFF6ED]">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-[#C2410C] leading-tight">
              Subscribe to your favorite pan.
            </h1>
            <p className="mt-4 text-lg text-[#7C2D12]/80">
              Literal pans. Sitting perfectly still. A better platform than those people with the fans.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={siteHref("/browse")}
                className="bg-[#C2410C] hover:bg-[#7C2D12] text-white font-bold rounded-full px-7 py-3 transition-colors"
              >
                Meet the Pans
              </Link>
              <Link
                href={siteHref("/how-it-works")}
                className="bg-white border border-[#C2410C]/30 hover:border-[#C2410C]/60 text-[#1C0F05] font-bold rounded-full px-7 py-3 transition-colors"
              >
                How It Works
              </Link>
            </div>
          </div>
          <div className="relative aspect-[3/2] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/sites/onlypans/home-hero.png"
              alt="A curated lineup of three pans"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              priority
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* FEATURED PANS */}
      <section className="bg-white border-t border-[#C2410C]/10">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-extrabold text-[#1C0F05]">Featured pans</h2>
            <p className="text-[#7C2D12]/70 mt-2">A small selection of the creators currently on our platform.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {homepageFeaturedPans.map((pan) => (
              <PanCard key={pan.slug} pan={pan} siteHref={siteHref} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href={siteHref("/browse")}
              className="text-[#7C2D12] font-bold underline underline-offset-4"
            >
              See all 8 pans →
            </Link>
          </div>
        </div>
      </section>

      {/* WHY WE'RE BETTER RANT */}
      <section className="bg-[#FFF6ED] border-t border-[#C2410C]/10">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#C2410C] max-w-3xl mx-auto leading-tight">
              Why we&apos;re a better platform than those people with the fans.
            </h2>
            <p className="mt-3 text-[#7C2D12]/70">
              An honest and comprehensive comparison. We respect your time.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
            {BETTER_REASONS.map((reason) => (
              <div
                key={reason.headline}
                className="bg-white border border-[#C2410C]/20 rounded-xl p-5 flex gap-4 items-start"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#C2410C] text-white font-extrabold flex items-center justify-center text-base">
                  ✓
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-[#1C0F05]">{reason.headline}</div>
                  <div className="text-sm text-[#7C2D12]/80 mt-1">{reason.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS PREVIEW */}
      <section className="bg-white border-t border-[#C2410C]/10">
        <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-[3/2] rounded-2xl overflow-hidden">
            <Image
              src="/sites/onlypans/how-it-works.png"
              alt="Three steps to subscribe to a pan"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-[#1C0F05]">How it works</h2>
            <ol className="mt-6 space-y-4 text-[#7C2D12]/90">
              <li className="flex gap-3"><span className="font-bold text-[#C2410C]">1.</span><span>Browse the pans and find one that fits your kitchen personality.</span></li>
              <li className="flex gap-3"><span className="font-bold text-[#C2410C]">2.</span><span>Subscribe. Our creators are ready the moment you open the app.</span></li>
              <li className="flex gap-3"><span className="font-bold text-[#C2410C]">3.</span><span>Look at your pan. That&apos;s it. That&apos;s the platform.</span></li>
            </ol>
            <Link
              href={siteHref("/how-it-works")}
              className="inline-block mt-6 text-[#7C2D12] font-bold underline underline-offset-4"
            >
              Read the full guide →
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL STRIP */}
      <section className="bg-[#FFF6ED] border-t border-[#C2410C]/10">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-extrabold text-[#1C0F05] text-center mb-10">What our subscribers say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {homepageTestimonials.map((t) => (
              <div key={t.name} className="bg-white border border-[#C2410C]/20 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-[#FDE68A]/40">
                    <Image src={t.image} alt={t.name} fill sizes="48px" className="object-cover" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-[#1C0F05]">{t.name}</div>
                    <div className="text-xs text-[#7C2D12]/70">{t.title}</div>
                  </div>
                </div>
                <p className="text-sm text-[#7C2D12]/90 italic">&ldquo;{t.quote}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FOOTER BAND */}
      <section className="bg-[#C2410C] text-white">
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          <h2 className="text-3xl font-extrabold">Find your pan today.</h2>
          <p className="mt-2 text-white/90">Eight creators. Eight personalities. Zero moving parts.</p>
          <Link
            href={siteHref("/browse")}
            className="inline-block mt-6 bg-white text-[#7C2D12] font-bold rounded-full px-7 py-3"
          >
            Browse the roster
          </Link>
        </div>
      </section>
    </>
  )
}
