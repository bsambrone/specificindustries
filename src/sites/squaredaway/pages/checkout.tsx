"use client"

import Link from "next/link"
import { useSiteLink } from "@/hooks/use-site-link"

export default function SquaredAwayCheckout() {
  const siteHref = useSiteLink()

  return (
    <section className="py-20 px-4">
      <div className="max-w-xl mx-auto border-2 border-primary/40 bg-background p-10 text-center">
        <p className="font-mono uppercase tracking-widest text-accent text-xs mb-3">
          ORDER PENDING COMMAND REVIEW
        </p>
        <h1 className="font-heading text-3xl md:text-4xl text-primary uppercase tracking-widest mb-4">
          Automated Checkout Unavailable.
        </h1>
        <p className="text-foreground/80 text-sm md:text-base leading-relaxed mb-8">
          Per AR 25-400-2, all Squared Away Supply Co. transactions are processed manually by a fully credentialed
          Supply NCO during standard working hours. Automated checkout is not authorized at this time and is
          unlikely to be authorized in the future.
        </p>

        <div className="border-2 border-primary/30 bg-primary/5 p-4 mb-8 text-left text-xs font-mono text-foreground/80">
          <div className="flex justify-between"><span className="text-primary/60 uppercase tracking-wide">Session</span><span>SQR-0x8A4F-9C2D</span></div>
          <div className="flex justify-between"><span className="text-primary/60 uppercase tracking-wide">Status</span><span className="text-accent uppercase">Pending Supply NCO</span></div>
          <div className="flex justify-between"><span className="text-primary/60 uppercase tracking-wide">Estimated Fulfillment</span><span>T + 6–8 WEEKS</span></div>
          <div className="flex justify-between"><span className="text-primary/60 uppercase tracking-wide">Morale Points Pending</span><span>CALCULATED UPON FULFILLMENT</span></div>
        </div>

        <Link
          href={siteHref("/")}
          className="inline-block border-2 border-primary bg-primary text-background font-heading uppercase tracking-widest px-8 py-3 hover:bg-accent hover:border-accent transition-colors"
        >
          Return to the PX
        </Link>

        <p className="font-mono text-[10px] text-foreground/50 uppercase tracking-widest mt-8 pt-4 border-t border-primary/30">
          No funds have been collected. No gear has been shipped. No order has been placed. Morale unaffected.
        </p>
      </div>
    </section>
  )
}
