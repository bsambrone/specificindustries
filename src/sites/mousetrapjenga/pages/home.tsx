import Image from "next/image"
import Link from "next/link"
import { getSiteHref } from "@/lib/site-href"
import { InfomercialBand } from "../components/InfomercialBand"
import { Starburst } from "../components/Starburst"
import { getProductBySlug } from "../data/products"
import { homepageTestimonials } from "../data/testimonials"

export default async function MousetrapJengaHome() {
  const siteHref = await getSiteHref()
  const classic = getProductBySlug("classic")!
  const ratTrapPro = getProductBySlug("rat-trap-pro")!
  const bearTrap = getProductBySlug("bear-trap-tournament")!

  return (
    <>
      {/* BAND 1 — OPENING HERO */}
      <InfomercialBand bgColor="primary" textColor="light" verticalPadding="lg" bordered={false}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="text-center md:text-left">
            <div className="inline-block bg-[#FFD23F] text-[#1A1F4C] px-4 py-1 font-bold uppercase text-sm tracking-wider mb-4 border-2 border-[#1A1F4C] shadow-[4px_4px_0_0_#1A1F4C]">
              The American Family Game Classic!
            </div>
            <h1 className="font-heading text-5xl md:text-7xl leading-[0.9] text-[#FFF6E8] drop-shadow-[4px_4px_0_#1A1F4C] mb-4">
              MOUSETRAP<br />JENGA
            </h1>
            <p className="text-xl md:text-2xl font-bold text-[#FFD23F] mb-2">Now With 300% More Trap!</p>
            <p className="text-lg text-[#FFF6E8]/90 mb-8 italic">&ldquo;The best way to lose a finger since 1978.&rdquo;</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                href={siteHref("/products")}
                className="bg-[#FFD23F] text-[#1A1F4C] px-8 py-4 font-heading text-xl uppercase border-4 border-[#1A1F4C] shadow-[6px_6px_0_0_#1A1F4C] hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0_0_#1A1F4C] transition-all"
              >
                Buy Now!
              </Link>
              <Link
                href={siteHref("/how-to-play")}
                className="bg-[#2BB9B9] text-[#FFF6E8] px-8 py-4 font-heading text-xl uppercase border-4 border-[#1A1F4C] shadow-[6px_6px_0_0_#1A1F4C] hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0_0_#1A1F4C] transition-all"
              >
                How to Play
              </Link>
            </div>
          </div>
          <div className="relative aspect-square border-4 border-[#1A1F4C] shadow-[8px_8px_0_0_#1A1F4C] bg-[#FFF6E8]">
            <Image
              src="/sites/mousetrapjenga/hero.png"
              alt="A mid-80s American family gathered around a wood-paneled rec-room table playing Mousetrap Jenga"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute -top-8 -right-8">
              <Starburst text={"NEW!\nAS SEEN\nON TV"} color="yellow" size="md" rotation={12} />
            </div>
          </div>
        </div>
      </InfomercialBand>

      {/* BAND 2 — HOW IT WORKS */}
      <InfomercialBand bgColor="background">
        <div className="text-center">
          <h2 className="font-heading text-4xl md:text-5xl text-[#D4281F] mb-2">HOW IT WORKS!</h2>
          <p className="text-lg text-[#1A1F4C]/70 mb-10">Fun for the whole family in just 4 easy steps!</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { n: "1", title: "STACK THE TRAPS!", body: "Build your tower, just like regular Jenga!" },
              { n: "2", title: "TAKE TURNS!", body: "Remove one trap from below. Place it on top." },
              { n: "3", title: "DON'T LET 'EM SNAP!", body: "That's half the fun!" },
              { n: "4", title: "CROWN A CHAMPION!", body: "Most fingers remaining wins!" },
            ].map((step) => (
              <div
                key={step.n}
                className="bg-[#FFD23F] border-4 border-[#1A1F4C] p-6 text-center shadow-[6px_6px_0_0_#1A1F4C]"
              >
                <div className="font-heading text-6xl text-[#D4281F] mb-2">{step.n}</div>
                <h3 className="font-heading text-lg text-[#1A1F4C] mb-2">{step.title}</h3>
                <p className="text-sm text-[#1A1F4C]/80">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </InfomercialBand>

      {/* BAND 3 — TESTIMONIAL STRIP */}
      <InfomercialBand bgColor="accent" textColor="light" verticalPadding="sm">
        <h2 className="font-heading text-3xl text-center text-[#FFF6E8] mb-6">The Family That Traps Together...</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {homepageTestimonials.map((t) => (
            <figure
              key={t.name}
              className="bg-[#FFF6E8] text-[#1A1F4C] border-4 border-[#1A1F4C] p-4 shadow-[4px_4px_0_0_#1A1F4C]"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="relative w-14 h-14 border-2 border-[#1A1F4C] overflow-hidden flex-shrink-0">
                  <Image src={t.image} alt={t.name} fill className="object-cover" sizes="56px" />
                </div>
                <figcaption>
                  <div className="font-bold text-sm">{t.name}</div>
                  <div className="text-xs text-[#1A1F4C]/70">{t.title}</div>
                </figcaption>
              </div>
              <blockquote className="text-sm italic">&ldquo;{t.quote}&rdquo;</blockquote>
            </figure>
          ))}
        </div>
      </InfomercialBand>

      {/* BAND 4 — PRODUCT PARADE */}
      <InfomercialBand bgColor="cream-dark" verticalPadding="lg">
        <div className="text-center mb-10">
          <h2 className="font-heading text-4xl md:text-5xl text-[#D4281F]">INTRODUCING THE LINEUP!</h2>
          <p className="text-lg text-[#1A1F4C]/70 mt-2">Five editions. Endless excitement.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <ParadeCard product={classic} badge={<Starburst text="CLASSIC!" color="red" size="sm" rotation={-8} />} href={siteHref(`/products/${classic.slug}`)} />
          <ParadeCard product={ratTrapPro} badge={<Starburst text={"BUT\nWAIT!"} color="yellow" size="sm" rotation={-12} />} href={siteHref(`/products/${ratTrapPro.slug}`)} />
          <ParadeCard product={bearTrap} badge={<Starburst text={"AND\nTHAT'S\nNOT ALL!"} color="red" size="sm" rotation={-10} />} href={siteHref(`/products/${bearTrap.slug}`)} />
        </div>

        <div className="text-center mt-10">
          <Link
            href={siteHref("/products")}
            className="inline-block font-heading text-xl text-[#D4281F] underline decoration-4 underline-offset-4 hover:text-[#1A1F4C] transition-colors"
          >
            See all editions &rarr;
          </Link>
        </div>
      </InfomercialBand>

      {/* BAND 5 — ACT NOW */}
      <InfomercialBand bgColor="primary" textColor="light" verticalPadding="lg">
        <div className="text-center">
          <div className="inline-block bg-[#FFD23F] text-[#1A1F4C] px-4 py-1 font-bold uppercase text-sm tracking-wider mb-4 border-2 border-[#1A1F4C]">
            Offer Expires: SOON!
          </div>
          <h2 className="font-heading text-5xl md:text-7xl text-[#FFD23F] drop-shadow-[4px_4px_0_#1A1F4C] mb-4">ACT NOW!</h2>
          <p className="text-2xl md:text-4xl font-heading text-[#FFF6E8] mb-6">1-800-JENGA-OW</p>
          <p className="text-lg text-[#FFF6E8]/90 mb-8 max-w-2xl mx-auto">
            Order in the next 10 minutes and we&apos;ll throw in{" "}
            <span className="font-bold text-[#FFD23F]">The Official Recovery Pack</span> — ABSOLUTELY FREE!
          </p>
          <Link
            href={siteHref("/products")}
            className="inline-block bg-[#FFD23F] text-[#1A1F4C] px-10 py-5 font-heading text-2xl uppercase border-4 border-[#1A1F4C] shadow-[8px_8px_0_0_#1A1F4C] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0_0_#1A1F4C] transition-all"
          >
            Call Now!
          </Link>
          <p className="text-xs text-[#FFF6E8]/60 mt-6 italic">
            Operators are standing by! Phone number is for display purposes only. Please use the Call Now button.
          </p>
        </div>
      </InfomercialBand>

      {/* BAND 6 — CHAMPIONSHIP BANNER */}
      <InfomercialBand bgColor="background" verticalPadding="sm">
        <Link href={siteHref("/hall-of-fame")} className="block group">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1 text-center md:text-left">
              <h2 className="font-heading text-3xl md:text-4xl text-[#1A1F4C]">Meet the Legends of the Circuit</h2>
              <p className="text-[#1A1F4C]/70 mt-1">Our Hall of Fame honors the greatest players in Mousetrap Jenga history.</p>
            </div>
            <div className="font-heading text-xl text-[#D4281F] group-hover:underline">Enter the Hall &rarr;</div>
          </div>
        </Link>
      </InfomercialBand>

      {/* BAND 7 — FINAL CTA */}
      <InfomercialBand bgColor="secondary" verticalPadding="md">
        <div className="text-center">
          <Link
            href={siteHref("/products")}
            className="inline-block bg-[#D4281F] text-[#FFF6E8] px-12 py-5 font-heading text-3xl uppercase border-4 border-[#1A1F4C] shadow-[8px_8px_0_0_#1A1F4C] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0_0_#1A1F4C] transition-all"
          >
            Buy Now!
          </Link>
          <p className="mt-6 text-sm text-[#1A1F4C]/80 italic">
            Ages 8 and up. Fun for the whole family! Bandages sold separately.
          </p>
        </div>
      </InfomercialBand>
    </>
  )
}

function ParadeCard({
  product,
  badge,
  href,
}: {
  product: { slug: string; name: string; priceLabel: string; tagline: string; image: string }
  badge: React.ReactNode
  href: string
}) {
  return (
    <Link
      href={href}
      className="relative block bg-[#FFF6E8] border-4 border-[#1A1F4C] shadow-[6px_6px_0_0_#1A1F4C] hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0_0_#1A1F4C] transition-all"
    >
      <div className="absolute -top-6 -right-6 z-10">{badge}</div>
      <div className="relative aspect-square border-b-4 border-[#1A1F4C] overflow-hidden bg-[#F5E8CE]">
        <Image src={product.image} alt={product.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
      </div>
      <div className="p-4 text-center">
        <h3 className="font-heading text-xl text-[#1A1F4C] mb-1">{product.name}</h3>
        <p className="text-sm text-[#1A1F4C]/70 italic mb-2">&ldquo;{product.tagline}&rdquo;</p>
        <p className="font-heading text-2xl text-[#D4281F]">{product.priceLabel}</p>
      </div>
    </Link>
  )
}
