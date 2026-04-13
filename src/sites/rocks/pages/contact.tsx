import Image from "next/image"
import { TickerStrip } from "@/sites/rocks/components/ticker-strip"
import { TerminalHeading } from "@/sites/rocks/components/terminal-heading"

export const metadata = {
  title: "CONTACT THE TRADING DESK — ROCKS",
  description: "Reach our trading desk during market hours. After-hours correspondence accepted at your own risk.",
}

const marketHours = [
  { day: "MONDAY", hours: "09:00 – 22:00 EST" },
  { day: "TUESDAY", hours: "09:00 – 22:00 EST" },
  { day: "WEDNESDAY", hours: "09:00 – 22:00 EST" },
  { day: "THURSDAY", hours: "09:00 – 22:00 EST" },
  { day: "FRIDAY", hours: "09:00 – 22:00 EST" },
  { day: "SATURDAY", hours: "11:00 – 19:00 EST" },
  { day: "SUNDAY", hours: "CLOSED" },
]

export default function RocksContact() {
  return (
    <>
      <TickerStrip />

      <section className="py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <TerminalHeading level={1} className="mb-2">CONTACT THE TRADING DESK</TerminalHeading>
          <p className="text-primary/60 text-sm uppercase tracking-wide mb-10 max-w-2xl">
            THE DESK IS STAFFED DURING MARKET HOURS. AFTER-HOURS INQUIRIES WILL BE QUEUED FOR NEXT-SESSION REVIEW AND
            MAY OR MAY NOT BE ACTIONED.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Market hours */}
            <div>
              <TerminalHeading level={2} className="mb-4">MARKET HOURS</TerminalHeading>
              <div className="border border-primary/30 bg-secondary/20">
                <table className="w-full text-sm tabular-nums">
                  <tbody className="divide-y divide-primary/20 text-primary/90">
                    {marketHours.map((row) => (
                      <tr key={row.day}>
                        <td className="px-4 py-3 uppercase text-primary/70 w-1/2">{row.day}</td>
                        <td className="px-4 py-3 text-right font-semibold">{row.hours}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 relative aspect-[4/3] border border-primary/30 bg-secondary/20 overflow-hidden">
                <Image src="/sites/rocks/contact-office.png" alt="" fill className="object-cover" />
              </div>
            </div>

            {/* Contact form */}
            <div>
              <TerminalHeading level={2} className="mb-4">SUBMIT INQUIRY</TerminalHeading>
              <form className="space-y-4 border border-primary/30 bg-secondary/20 p-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-primary/60 mb-1">
                    INVESTMENT THESIS
                  </label>
                  <input
                    type="text"
                    placeholder="LONG-TERM HARD ASSET ALLOCATION"
                    className="w-full bg-background border border-primary/30 text-primary px-3 py-2 text-sm font-body placeholder:text-primary/30 focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-primary/60 mb-1">
                    NET WORTH BRACKET
                  </label>
                  <select className="w-full bg-background border border-primary/30 text-primary px-3 py-2 text-sm font-body focus:outline-none focus:border-primary">
                    <option>UNDER $50K</option>
                    <option>$50K – $250K</option>
                    <option>$250K – $1M</option>
                    <option>$1M – $10M</option>
                    <option>$10M+</option>
                    <option>DECLINE TO STATE</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-primary/60 mb-1">
                    EXPOSURE TARGET
                  </label>
                  <input
                    type="text"
                    placeholder="% OF PORTFOLIO"
                    className="w-full bg-background border border-primary/30 text-primary px-3 py-2 text-sm font-body placeholder:text-primary/30 focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-primary/60 mb-1">
                    MESSAGE
                  </label>
                  <textarea
                    rows={5}
                    placeholder="BRIEF STATEMENT OF INQUIRY"
                    className="w-full bg-background border border-primary/30 text-primary px-3 py-2 text-sm font-body placeholder:text-primary/30 focus:outline-none focus:border-primary resize-none"
                  />
                </div>

                <button
                  type="button"
                  className="w-full border-2 border-primary bg-background text-primary font-semibold uppercase tracking-wider px-6 py-3 hover:bg-primary hover:text-background transition-colors"
                >
                  [TRANSMIT TO DESK]
                </button>

                <p className="text-xs text-primary/40 uppercase tracking-wide pt-2 border-t border-primary/20">
                  FORM DATA IS NOT PERSISTED. SUBMISSIONS ARE NOT RECEIVED. THIS FIELD IS A COURTESY.
                </p>
              </form>
            </div>
          </div>

          {/* Small print with real email */}
          <div className="mt-14 pt-6 border-t border-primary/20 text-center">
            <p className="text-[10px] text-primary/50 uppercase tracking-widest">
              For urgent custody matters outside market hours, direct correspondence may be sent to{" "}
              <a href="mailto:bsambrone@gmail.com" className="underline hover:text-primary">
                bsambrone@gmail.com
              </a>
              . Response is not guaranteed.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
