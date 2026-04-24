export const metadata = {
  title: "Terms of Service — Unmotivators Inc.",
  description: "The terms under which you transact with Unmotivators Inc.",
}

export default function UnmotivatorsTerms() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-widest text-foreground/60 mb-3">
          Document
        </p>
        <h1 className="text-4xl font-heading font-bold uppercase tracking-tight text-foreground mb-10">
          Terms of Service
        </h1>

        <div className="space-y-8 text-foreground/80 leading-relaxed">
          <div>
            <h2 className="font-heading text-xl uppercase tracking-tight text-foreground mb-3">
              1. The agreement.
            </h2>
            <p>
              By placing an order with Unmotivators Inc., you agree to pay the price listed, at the time listed, in the currency listed. We agree to print, frame, pack, and ship the item, eventually. Both sides of this agreement are expected to act in good faith. Both sides, generally, do.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl uppercase tracking-tight text-foreground mb-3">
              2. Returns.
            </h2>
            <p>
              Returns are accepted within thirty days. The item must be unused, or at least not visibly used, and must not have been hung long enough for the wall behind it to have faded unevenly. Original packaging is appreciated but not required. Restocking fees apply.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl uppercase tracking-tight text-foreground mb-3">
              3. Shipping.
            </h2>
            <p>
              We ship via whichever carrier makes the quarter&apos;s economics work. Transit times are estimates. We are not responsible for delays caused by weather, holidays, warehouse disagreements, or the driver deciding to take the other route today.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl uppercase tracking-tight text-foreground mb-3">
              4. Warranty.
            </h2>
            <p>
              Posters are warranted against manufacturer defects for one year. Frames are warranted against joint failure for two. Mugs are warranted until they are dropped. Awards are not warranted, because their value does not depend on their condition.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl uppercase tracking-tight text-foreground mb-3">
              5. Governing law.
            </h2>
            <p>
              These terms are governed by the laws of the state in which Unmotivators Inc. is registered, which is a state you can guess. Disputes are resolved, if possible, in writing. In-person mediation is available, but rare, and will not be fun for either of us.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
