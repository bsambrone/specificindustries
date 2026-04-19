export const metadata = {
  title: "Contact — Whiskerworks",
  description: "Contact the Whiskerworks Admissions office.",
}

export default function WhiskerworksContact() {
  return (
    <section className="bg-background">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <header className="text-center mb-12">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">Admissions</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-heading text-text">Contact the Institute</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border border-text/10 rounded-lg p-6">
            <h2 className="font-heading text-xl text-primary">Campus</h2>
            <p className="mt-3 text-sm text-text/80 leading-relaxed">
              Suite 208, above the Spirit Halloween<br />
              1402 Route 9 (north lot)<br />
              Entry via stairwell at rear
            </p>
            <h2 className="font-heading text-xl text-primary mt-8">Mailing</h2>
            <p className="mt-3 text-sm text-text/80 leading-relaxed">
              Whiskerworks Advanced Feline Training Institute<br />
              P.O. Box 4402<br />
              <span className="italic text-text/60">(Please do not mail live cats.)</span>
            </p>
            <h2 className="font-heading text-xl text-primary mt-8">Phone</h2>
            <p className="mt-3 text-sm text-text/80">
              (555) 0-WHISKER<br />
              <span className="text-xs italic text-text/50">(Voicemail only. Voicemails are not retrieved.)</span>
            </p>
          </div>

          <div className="bg-white border border-text/10 rounded-lg p-6">
            <h2 className="font-heading text-xl text-primary">Inquire</h2>
            <form action="#" method="get" className="mt-4 space-y-3">
              <div>
                <label className="block text-xs uppercase tracking-wider text-text/60">Your Name</label>
                <input type="text" name="name" className="mt-1 w-full border border-text/20 rounded px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-text/60">Cat&apos;s Name</label>
                <input type="text" name="cat" className="mt-1 w-full border border-text/20 rounded px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-text/60">Program of Interest</label>
                <input type="text" name="program" className="mt-1 w-full border border-text/20 rounded px-3 py-2 text-sm" placeholder="e.g., Commercial Airline Pilot" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-text/60">Message</label>
                <textarea name="message" rows={4} className="mt-1 w-full border border-text/20 rounded px-3 py-2 text-sm" />
              </div>
              <button
                type="submit"
                className="w-full bg-accent hover:bg-accent/90 text-white font-bold rounded px-4 py-2 uppercase tracking-wider text-sm"
              >
                Submit Inquiry
              </button>
              <p className="text-xs text-text/50 italic">We respond to most inquiries within 3-6 business quarters.</p>
            </form>
          </div>
        </div>

        {/* Real contact email per site convention — small print */}
        <p className="mt-10 text-center text-xs text-text/50">
          For matters requiring an actual reply, write to <a href="mailto:bsambrone@gmail.com" className="underline hover:text-accent">bsambrone@gmail.com</a>.
        </p>
      </div>
    </section>
  )
}
