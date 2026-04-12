import Image from "next/image"
import Link from "next/link"
import { getSiteHref } from "@/lib/site-href"

export const metadata = {
  title: "How It Works — Only Pans",
  description: "How to find a pan, subscribe, and look at it.",
}

export default async function OnlyPansHowItWorks() {
  const siteHref = await getSiteHref()
  return (
    <section className="bg-[#FFF6ED]">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1C0F05]">How it works</h1>
          <p className="mt-3 text-[#7C2D12]/80">A quick guide to getting the most out of your Only Pans subscriptions.</p>
        </div>

        <div className="relative aspect-[3/2] rounded-2xl overflow-hidden mt-10">
          <Image src="/sites/onlypans/how-it-works.png" alt="Three steps illustrated" fill sizes="(min-width: 1024px) 768px, 100vw" className="object-cover" />
        </div>

        <div className="mt-12 space-y-10">
          <Step n={1} title="Browse the pans">
            Every pan on our platform has been carefully selected for its particular form of stillness. Use the niche filters on the Meet the Pans page to find the kind of pan that matches your kitchen — generational classic, French luxury, philosophical mystery, or one of five other distinct categories.
          </Step>
          <Step n={2} title="Subscribe to your favorite">
            When you find a pan you like, click their Subscribe button. Each pan has their own monthly tier — from $0.99 to $29.99. After subscribing, all of their previously locked posts become immediately visible. You&apos;ll see the pan in every state we&apos;ve been holding back.
          </Step>
          <Step n={3} title="Look at your pan">
            That&apos;s the platform. Unlike platforms that require you to plug the content in, our creators are ready the moment you open the app. No warm-up. No oscillation schedule. No quarterly release cycle. The pan sits. You look.
          </Step>
          <Step n={4} title="Tip generously">
            Every pan has a tip menu with ways to support them at various price points. Want a handwritten note from Cheap Chuck? Tip $1. Want Mademoiselle Crêpe to briefly correct your crêpe technique? Tip $80. Your favorite pan did not come to stillness on its own.
          </Step>
        </div>

        <div className="mt-16 text-center">
          <Link
            href={siteHref("/browse")}
            className="inline-block bg-[#C2410C] hover:bg-[#7C2D12] text-white font-bold rounded-full px-7 py-3"
          >
            Meet the Pans →
          </Link>
        </div>
      </div>
    </section>
  )
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-5">
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#C2410C] text-white font-extrabold flex items-center justify-center text-lg">
        {n}
      </div>
      <div>
        <h2 className="text-xl font-bold text-[#1C0F05]">{title}</h2>
        <p className="mt-1 text-[#7C2D12]/90 leading-relaxed">{children}</p>
      </div>
    </div>
  )
}
