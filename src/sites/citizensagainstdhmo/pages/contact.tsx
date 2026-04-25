import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Contact — Citizens Against DHMO",
  description: "Reach the Citizens Against DHMO national office, your regional chapter, or our press team.",
}

export default function ContactPage() {
  return (
    <>
      <Hero
        headline="Contact"
        subheadline="The national office. Regional chapters. Press inquiries. Member services."
      />
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border border-accent/30 rounded-lg p-6 bg-white">
            <p className="text-xs text-secondary font-semibold uppercase tracking-wider mb-2">National Office</p>
            <h2 className="text-xl font-heading font-bold text-primary mb-3">Member Services</h2>
            <p className="text-foreground/70 leading-relaxed text-sm mb-4">
              For petition support, chapter signup, donor questions, or general inquiries.
            </p>
            <p className="text-sm text-primary font-semibold">members@citizensagainstdhmo.example</p>
          </div>
          <div className="border border-accent/30 rounded-lg p-6 bg-white">
            <p className="text-xs text-secondary font-semibold uppercase tracking-wider mb-2">Press</p>
            <h2 className="text-xl font-heading font-bold text-primary mb-3">Media Inquiries</h2>
            <p className="text-foreground/70 leading-relaxed text-sm mb-4">
              For interview requests, expert sourcing, and statement coordination, contact our communications office.
            </p>
            <p className="text-sm text-primary font-semibold">press@citizensagainstdhmo.example</p>
          </div>
          <div className="border border-accent/30 rounded-lg p-6 bg-white">
            <p className="text-xs text-secondary font-semibold uppercase tracking-wider mb-2">Legal</p>
            <h2 className="text-xl font-heading font-bold text-primary mb-3">General Counsel</h2>
            <p className="text-foreground/70 leading-relaxed text-sm mb-4">
              For FOIA coordination, regulatory filings, or pro bono attorney intake.
            </p>
            <p className="text-sm text-primary font-semibold">legal@citizensagainstdhmo.example</p>
          </div>
          <div className="border border-accent/30 rounded-lg p-6 bg-white">
            <p className="text-xs text-secondary font-semibold uppercase tracking-wider mb-2">Survivor Care</p>
            <h2 className="text-xl font-heading font-bold text-primary mb-3">Survivor Advocacy</h2>
            <p className="text-foreground/70 leading-relaxed text-sm mb-4">
              For confidential intake, story submission, or referral to local care coordinators.
            </p>
            <p className="text-sm text-primary font-semibold">care@citizensagainstdhmo.example</p>
          </div>
        </div>
        <p className="text-xs text-foreground/40 text-center mt-12">
          Inquiries that don&apos;t fit a category may be sent to <a className="underline hover:text-primary transition-colors" href="mailto:bsambrone@gmail.com">bsambrone@gmail.com</a>.
        </p>
      </section>
    </>
  )
}
