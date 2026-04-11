import Image from "next/image"
import Link from "next/link"
import { getSiteHref } from "@/lib/site-href"

export const metadata = {
  title: "How It Works — OnlyFans",
  description: "How to find a fan, subscribe, and start enjoying premium airflow content.",
}

export default async function OnlyFansHowItWorks() {
  const siteHref = await getSiteHref()
  return (
    <section className="bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0F172A]">How it works</h1>
          <p className="mt-3 text-slate-600">A quick guide to getting the most out of your OnlyFans subscriptions.</p>
        </div>

        <div className="relative aspect-[3/2] rounded-2xl overflow-hidden mt-10">
          <Image src="/sites/onlyfans/how-it-works.png" alt="Three steps illustrated" fill sizes="(min-width: 1024px) 768px, 100vw" className="object-cover" />
        </div>

        <div className="mt-12 space-y-10">
          <Step n={1} title="Browse the fans">
            Every fan on our platform has been carefully selected for its airflow personality. Use the niche filters on the Meet the Fans page to find the kind of fan that matches your home — wholesome porch family, extreme industrial, luxury minimalist, or one of five other distinct categories.
          </Step>
          <Step n={2} title="Subscribe to your favorite">
            When you find a fan you like, click their Subscribe button. Each fan has their own monthly tier — from $0.99 to $24.99. After subscribing, all of their previously locked posts become visible immediately. You'll see what they've been posting all this time.
          </Step>
          <Step n={3} title="Watch them blow air">
            That's the platform. Each fan posts new airflow content as it occurs to them — Brenda updates regularly, Mistress Oscillata releases one cycle per quarter, the Ghost in the Attic posts irregularly and often without explanation. You will receive notifications via the means available to you.
          </Step>
          <Step n={4} title="Tip generously">
            Every fan has a tip menu with custom airflow services at multiple price points. Want a personalized angle adjustment from Brenda? Tip $5. Want Big Vance to blow your hat across a parking lot? Tip $10. Your favorite fan didn't earn that personality on its own.
          </Step>
        </div>

        <div className="mt-16 text-center">
          <Link
            href={siteHref("/browse")}
            className="inline-block bg-[#00AFF0] hover:bg-[#0095CD] text-white font-bold rounded-full px-7 py-3"
          >
            Meet the Fans →
          </Link>
        </div>
      </div>
    </section>
  )
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-5">
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#00AFF0] text-white font-extrabold flex items-center justify-center text-lg">
        {n}
      </div>
      <div>
        <h2 className="text-xl font-bold text-[#0F172A]">{title}</h2>
        <p className="mt-1 text-slate-700 leading-relaxed">{children}</p>
      </div>
    </div>
  )
}
