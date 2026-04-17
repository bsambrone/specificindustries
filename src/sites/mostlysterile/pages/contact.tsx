import { Hero } from "@/components/ui/hero"

export default function MostlysterileContact() {
  return (
    <>
      <Hero
        headline="Contact Us"
        subheadline="We welcome inquiries of all kinds. Responses are issued during regular operating hours, or in the next available window."
      />

      <section className="py-14 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Facility info */}
          <div>
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">Our Facility</h2>
            <div className="border border-primary/20 bg-secondary/10 p-6 mb-6 text-foreground/80 space-y-2">
              <p className="font-semibold text-primary">Mostlysterile Distribution</p>
              <p>Unit 47B, Storage Facility Off Route 9</p>
              <p>Postal code available upon request</p>
            </div>

            <h3 className="text-lg font-heading font-semibold text-primary mb-3">Hours of Operation</h3>
            <div className="border border-primary/20 bg-secondary/10 p-6 text-foreground/80 text-sm space-y-2">
              <div className="flex justify-between"><span>Weekdays</span><span>Variable</span></div>
              <div className="flex justify-between"><span>Saturday</span><span>Appointment</span></div>
              <div className="flex justify-between"><span>Sunday</span><span>Unavailable</span></div>
              <div className="flex justify-between"><span>Bob&rsquo;s Days Off</span><span>Reduced Staff</span></div>
            </div>

            <p className="mt-6 text-xs italic text-foreground/50 leading-relaxed">
              Walk-in inquiries are discouraged. Access to the facility is controlled and visitor parking is limited to the strip of gravel next to the dumpster.
            </p>
          </div>

          {/* Form */}
          <div>
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">Submit an Inquiry</h2>
            <form className="space-y-4 border border-primary/20 bg-background p-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-foreground/60 mb-1">Name</label>
                <input
                  type="text"
                  className="w-full bg-background border border-primary/30 text-foreground px-3 py-2 text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-foreground/60 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full bg-background border border-primary/30 text-foreground px-3 py-2 text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-foreground/60 mb-1">Reason for Contacting</label>
                <select className="w-full bg-background border border-primary/30 text-foreground px-3 py-2 text-sm focus:outline-none focus:border-primary">
                  <option>Complaint</option>
                  <option>Legal Notice</option>
                  <option>Compliment (unlikely)</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <p className="block text-xs uppercase tracking-widest text-foreground/60 mb-2">Are you a lawyer?</p>
                <div className="flex gap-6 text-sm text-foreground">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="lawyer" value="yes" className="accent-primary" />
                    Yes
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="lawyer" value="no" className="accent-primary" defaultChecked />
                    No
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-foreground/60 mb-1">Message</label>
                <textarea
                  rows={5}
                  className="w-full bg-background border border-primary/30 text-foreground px-3 py-2 text-sm focus:outline-none focus:border-primary resize-none"
                />
              </div>
              <button
                type="button"
                className="w-full bg-primary text-background font-semibold uppercase tracking-wider px-6 py-3 hover:opacity-90 transition-opacity"
              >
                Submit for Review
              </button>
              <p className="text-xs italic text-foreground/50 pt-2 border-t border-primary/10">
                Form data is not persisted. Submissions are queued for internal review. Response times vary and may be substantial.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Email footer */}
      <section className="py-8 px-4 border-t border-primary/10 bg-secondary/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-widest text-foreground/50">
            For urgent matters outside submission channels, correspondence may be directed to{" "}
            <a href="mailto:bsambrone@gmail.com" className="underline hover:text-primary">bsambrone@gmail.com</a>
            . A response is not guaranteed.
          </p>
        </div>
      </section>
    </>
  )
}
