import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Write to Boom-Fun! — Toledo, Ohio",
  description: "Reach the Boom-Fun! Customer Correspondence Department by mail, by switchboard, or by the new electronic methods. Harland personally reads every letter.",
}

export default function BoomfunContact() {
  return (
    <>
      <Hero
        headline="WRITE TO US!"
        subheadline="Every letter received at our Toledo facility is personally answered by a Boom-Fun! family member within 12 to 18 business days. We still believe in the power of the written word."
      />

      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto space-y-10">
          {/* Mail */}
          <div className="border-4 border-primary/20 p-8 bg-background">
            <h2 className="text-2xl font-heading font-bold text-primary uppercase mb-4">By Mail (Preferred)</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Address all correspondence, questions, warranty claims, stump-removal feedback, and Boom-Fun! Club
              applications to:
            </p>
            <div className="bg-secondary/10 p-6 text-center font-heading text-lg">
              Boom-Fun! Industries<br />
              Customer Correspondence Department<br />
              Station Road<br />
              Toledo, Ohio
            </div>
            <p className="text-sm text-foreground/60 italic mt-4">
              Please enclose a self-addressed stamped envelope. We receive a great many letters and cannot always
              supply the return postage ourselves.
            </p>
          </div>

          {/* Switchboard */}
          <div className="border-4 border-primary/20 p-8 bg-background">
            <h2 className="text-2xl font-heading font-bold text-primary uppercase mb-4">By Switchboard</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              For the urgent matter, ring our main switchboard during normal business hours (7 AM to 5 PM, Central
              Time, Monday through Friday). The switchboard operator will connect you to the appropriate department.
            </p>
            <div className="bg-secondary/10 p-6 text-center font-heading text-lg">
              Toledo Central 4-5500<br />
              Extension 17 (Correspondence)<br />
              Extension 22 (Boom-Fun! Club)<br />
              Extension 44 (Sparky, Mondays only)
            </div>
          </div>

          {/* Department list */}
          <div className="border-4 border-primary/20 p-8 bg-background">
            <h2 className="text-2xl font-heading font-bold text-primary uppercase mb-4">Department Directory</h2>
            <dl className="space-y-3 text-foreground/80">
              <div className="grid grid-cols-[1fr_2fr] gap-3">
                <dt className="font-heading text-primary">Harland Himself:</dt>
                <dd>Mail only. Mark envelope &ldquo;ATTN: HARLAND — PERSONAL.&rdquo;</dd>
              </div>
              <div className="grid grid-cols-[1fr_2fr] gap-3">
                <dt className="font-heading text-primary">Warranty Claims:</dt>
                <dd>We do not offer a warranty. Thank you for writing.</dd>
              </div>
              <div className="grid grid-cols-[1fr_2fr] gap-3">
                <dt className="font-heading text-primary">Lost Club Cards:</dt>
                <dd>Enclose 50 cents and current mailing address. We will send a duplicate by return mail.</dd>
              </div>
              <div className="grid grid-cols-[1fr_2fr] gap-3">
                <dt className="font-heading text-primary">Product Questions:</dt>
                <dd>Sparky answers all of these. Expect a response within two weeks.</dd>
              </div>
              <div className="grid grid-cols-[1fr_2fr] gap-3">
                <dt className="font-heading text-primary">Finger Count Issues:</dt>
                <dd>Contact your family physician first. Then write to us for a replacement Handbook.</dd>
              </div>
            </dl>
          </div>

          {/* Small-print real email */}
          <div className="text-center text-xs text-foreground/50 italic pt-6 border-t border-primary/10">
            For modern electronic correspondence, you may also reach the responsible parties at{" "}
            <a href="mailto:bsambrone@gmail.com" className="underline hover:text-primary">
              bsambrone@gmail.com
            </a>
            . Please note that we respond to postal mail more reliably.
          </div>
        </div>
      </section>
    </>
  )
}
