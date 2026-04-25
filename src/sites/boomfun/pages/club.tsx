import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "The Boom-Fun! Club — Membership Opens Monthly",
  description: "Join the Boom-Fun! Club. Official Membership Card, Secret Handshake Diagram, Real Blasting Cap Lapel Pin, Bi-monthly 'The Fuse' newsletter, and Decoder Ring. Apply by mail.",
}

const kitItems = [
  {
    item: "Official Boom-Fun! Club Membership Card",
    detail: "Printed on heavy card stock, signed in ink by Harland P. Crenshaw himself. Carry it with you at all times. Display it on request.",
  },
  {
    item: "Secret Handshake Diagram",
    detail: "A 4-color foldout depicting the Official Boom-Fun! Club Handshake. Executable in under two seconds by a member in good standing.",
  },
  {
    item: "Real Blasting Cap Lapel Pin",
    detail: "Not a functional blasting cap. Decorative only. A tasteful brass enamel reproduction. Wear with pride on your best jacket.",
  },
  {
    item: "Bi-monthly 'The Fuse' Newsletter",
    detail: "Four pages. Six issues a year. Exclusive product previews, letters from Sparky, member correspondence, and the popular 'Ask Harland' column.",
  },
  {
    item: "Decoder Ring (Real Brass)",
    detail: "Required for activating the Secret Handshake and for decoding 'The Fuse' monthly cipher puzzle. Adjustable to most fingers ages 7–14.",
  },
]

export default function BoomfunClub() {
  return (
    <>
      <Hero
        headline="JOIN THE BOOM-FUN! CLUB"
        subheadline="Now accepting new members for 1961. Just $1 and three stock numbers gets you the complete Membership Kit by return mail."
      />

      {/* Intro */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-foreground/80 leading-relaxed mb-6">
            Kids! The Boom-Fun! Club is the most exciting young Americans&apos; organization in the country today.
            Thousands of boys and girls across the forty-eight states are already proud card-carrying members —
            and now you can join them for just one dollar and three Boom-Fun! product stock numbers.
          </p>
          <p className="text-foreground/70 italic">
            Membership runs for one full calendar year. Renewable by mail.
          </p>
        </div>
      </section>

      {/* Kit contents */}
      <section className="py-12 px-4 bg-secondary/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-primary uppercase text-center mb-10">
            What You Get
          </h2>
          <ul className="space-y-5">
            {kitItems.map((k, idx) => (
              <li key={idx} className="flex gap-4 border-b-2 border-dotted border-primary/20 pb-4 last:border-b-0">
                <div className="text-3xl font-heading text-secondary flex-shrink-0 w-12 text-center">
                  {idx + 1}.
                </div>
                <div>
                  <h3 className="text-lg font-heading font-bold text-primary uppercase mb-1">{k.item}</h3>
                  <p className="text-foreground/80 leading-relaxed">{k.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Clip-out coupon (visual only) */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-4 text-sm uppercase tracking-widest text-foreground/60">
            ✂  —  Clip Here  —  ✂
          </div>
          <div className="border-4 border-dashed border-primary p-8 bg-accent/10">
            <h3 className="text-3xl font-heading font-bold text-primary uppercase text-center mb-2">
              Boom-Fun! Club Application
            </h3>
            <p className="text-center text-sm text-foreground/70 italic mb-6">
              Complete with a pen. Print neatly. Tape (do not staple) a $1 bill to this form.
            </p>
            <div className="space-y-5">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="text-xs uppercase tracking-widest text-foreground/60 mb-1">My Full Name</div>
                  <div className="border-b-2 border-primary h-8"></div>
                </div>
                <div className="w-24">
                  <div className="text-xs uppercase tracking-widest text-foreground/60 mb-1">Age</div>
                  <div className="border-b-2 border-primary h-8"></div>
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-foreground/60 mb-1">Mailing Address</div>
                <div className="border-b-2 border-primary h-8"></div>
                <div className="border-b-2 border-primary h-8 mt-2"></div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-foreground/60 mb-1">
                  Three Boom-Fun! Product Stock Numbers (from boxes I own)
                </div>
                <div className="grid grid-cols-3 gap-3 mt-1">
                  <div className="border-b-2 border-primary h-8"></div>
                  <div className="border-b-2 border-primary h-8"></div>
                  <div className="border-b-2 border-primary h-8"></div>
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-foreground/60 mb-1">
                  My favorite Boom-Fun! product is:
                </div>
                <div className="border-b-2 border-primary h-8"></div>
              </div>
            </div>
            <div className="mt-8 p-4 bg-background border-2 border-primary text-center">
              <div className="text-xs uppercase tracking-widest text-foreground/60 mb-1">Mail to:</div>
              <div className="font-heading text-lg text-primary">
                The Boom-Fun! Club<br />
                c/o Boom-Fun! Industries<br />
                Station Road, Toledo, OH
              </div>
            </div>
          </div>
          <div className="text-center mt-4 text-sm uppercase tracking-widest text-foreground/60">
            ✂  —  Clip Here  —  ✂
          </div>
        </div>
      </section>

      {/* Club Pledge */}
      <section className="py-16 px-4 bg-primary text-background">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-sm uppercase tracking-[0.4em] text-background/70 mb-4">
            The Boom-Fun! Club Pledge
          </div>
          <blockquote className="text-2xl md:text-3xl font-heading italic leading-relaxed mb-4">
            &ldquo;I, <span className="underline">________________</span>, solemnly promise to never squeeze the blasting cap.&rdquo;
          </blockquote>
          <p className="text-background/70 italic">— Recited at every monthly meeting. Signed at membership.</p>
        </div>
      </section>
    </>
  )
}
