export const metadata = {
  title: "Contact — Unmotivators Inc.",
  description: "How to reach the management team at Unmotivators Inc.",
}

export default function UnmotivatorsContact() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-widest text-foreground/60 mb-3">
          Reaching Us
        </p>
        <h1 className="text-4xl font-heading font-bold uppercase tracking-tight text-foreground mb-8">
          Contact
        </h1>
        <p className="text-foreground/80 leading-relaxed mb-6">
          Unmotivators Inc. prefers email. Phone calls are answered on Tuesdays between 10:00 and 11:00 local, if someone happens to be at the desk, which is not guaranteed.
        </p>

        <dl className="space-y-4 border-y border-foreground/15 py-6 font-mono text-sm">
          <div className="flex gap-6">
            <dt className="w-32 uppercase tracking-wide text-foreground/60">General</dt>
            <dd className="text-foreground">hello@unmotivators.example</dd>
          </div>
          <div className="flex gap-6">
            <dt className="w-32 uppercase tracking-wide text-foreground/60">Fulfillment</dt>
            <dd className="text-foreground">orders@unmotivators.example</dd>
          </div>
          <div className="flex gap-6">
            <dt className="w-32 uppercase tracking-wide text-foreground/60">Wholesale</dt>
            <dd className="text-foreground">wholesale@unmotivators.example</dd>
          </div>
          <div className="flex gap-6">
            <dt className="w-32 uppercase tracking-wide text-foreground/60">Press</dt>
            <dd className="text-foreground">Declined, for now.</dd>
          </div>
          <div className="flex gap-6">
            <dt className="w-32 uppercase tracking-wide text-foreground/60">Mailing</dt>
            <dd className="text-foreground">
              Unmotivators Inc.
              <br />
              Suite 204
              <br />
              A low-rise office park
              <br />
              You have driven past it.
            </dd>
          </div>
        </dl>

        <p className="text-foreground/70 text-sm mt-8 leading-relaxed">
          Response times vary. We reply in the order received, between other obligations. Please do not follow up on the same day.
        </p>
      </div>
    </section>
  )
}
