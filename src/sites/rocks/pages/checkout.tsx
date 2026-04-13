"use client"

import Link from "next/link"
import { useSiteLink } from "@/hooks/use-site-link"

export default function RocksCheckout() {
  const siteHref = useSiteLink()

  return (
    <section className="py-20 px-4">
      <div className="max-w-xl mx-auto border border-primary/30 bg-secondary/20 p-10 text-center">
        <p className="text-accent text-xs uppercase tracking-widest mb-3">▸ SETTLEMENT PENDING</p>
        <h1 className="text-3xl md:text-4xl font-heading font-semibold uppercase tracking-wide text-primary mb-4">
          MANUAL COORDINATION REQUIRED
          <span className="cursor-blink text-primary ml-1">▌</span>
        </h1>
        <p className="text-primary/70 text-sm md:text-base leading-relaxed mb-8">
          Settlement of physical rock instruments is handled by our custody desk on a per-transaction basis. Automated
          checkout is not supported. Our operations team will review this session in due course, at which point
          further instructions will be issued.
        </p>

        <div className="border border-primary/30 bg-background p-4 mb-8 text-left text-xs font-body text-primary/80 tabular-nums">
          <div className="flex justify-between"><span className="text-primary/50">SESSION</span><span>0x8A4F9C2D</span></div>
          <div className="flex justify-between"><span className="text-primary/50">STATUS</span><span className="text-accent">PENDING REVIEW</span></div>
          <div className="flex justify-between"><span className="text-primary/50">ESTIMATED SETTLEMENT</span><span>T+∞</span></div>
          <div className="flex justify-between"><span className="text-primary/50">CONTACT METHOD</span><span>CARRIER PIGEON</span></div>
        </div>

        <Link
          href={siteHref("/products")}
          className="inline-block border-2 border-primary px-8 py-3 text-sm font-semibold uppercase tracking-wider text-primary hover:bg-primary hover:text-background transition-colors"
        >
          [RETURN TO MARKETS]
        </Link>

        <p className="text-[10px] text-primary/40 uppercase tracking-widest mt-8 pt-4 border-t border-primary/20">
          NO FUNDS HAVE BEEN COLLECTED. NO ROCKS HAVE BEEN SHIPPED. NO ORDER HAS BEEN PLACED.
        </p>
      </div>
    </section>
  )
}
