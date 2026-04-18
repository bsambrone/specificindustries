export const metadata = {
  title: "Contact — Meh.",
  description: "Preferred contact methods, though several are slow.",
}

const departments = [
  { name: "Muted Concerns", ext: "0002" },
  { name: "Returns (The Philosophical Ones)", ext: "0003" },
  { name: "Returns (Mechanical)", ext: "0005" },
  { name: "Press Inquiries", ext: "0011" },
  { name: "General Bewilderment", ext: "0014" },
  { name: "Questions About the Humidifier", ext: "0021" },
  { name: "Shipping Status", ext: "0042" },
  { name: "Legal", ext: "0099" },
]

export default function MehContact() {
  return (
    <>
      <section className="py-20 px-4 border-b border-foreground/20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-heading font-semibold text-primary mb-6 tracking-tight">Contact</h1>
          <p className="text-foreground/80 leading-relaxed text-lg">
            Our preferred contact method is carrier pigeon, which is, we acknowledge, slow. For inquiries of a more contemporary nature, the directory below is available. Responses are issued in the order received, in no particular order.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 border-b border-foreground/20">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-foreground/60 mb-6">Internal Directory</p>
          <div className="divide-y divide-foreground/20 border-t border-b border-foreground/20">
            {departments.map((d) => (
              <div key={d.ext} className="py-4 flex justify-between text-foreground/80">
                <span>{d.name}</span>
                <span className="tabular-nums text-foreground/60">ext. {d.ext}</span>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm italic text-foreground/60">
            Extensions route to a central mailbox which is checked on a schedule known to the team.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 border-b border-foreground/20">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-foreground/60 mb-6">Mailing Address</p>
          <div className="border border-foreground/20 p-6 text-foreground/80 space-y-1">
            <p className="font-semibold text-primary">Meh., Customer Correspondence</p>
            <p>Suite 14B, Building 3</p>
            <p>A Light Industrial Park (north entrance only)</p>
            <p>ZIP provided upon arrival</p>
          </div>
          <p className="mt-4 text-xs italic text-foreground/50">Visitors are discouraged but not prohibited.</p>
        </div>
      </section>

      <section className="py-10 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-widest text-foreground/50">
            For actual correspondence,{" "}
            <a href="mailto:bsambrone@gmail.com" className="underline hover:text-primary">bsambrone@gmail.com</a>
            . A response is not guaranteed.
          </p>
        </div>
      </section>
    </>
  )
}
