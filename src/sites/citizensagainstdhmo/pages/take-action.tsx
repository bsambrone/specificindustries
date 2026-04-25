import { Hero } from "@/components/ui/hero"
import { PetitionForm } from "@/sites/citizensagainstdhmo/components/petition-form"

export const metadata = {
  title: "Take Action — Citizens Against DHMO",
  description: "Sign the petition for federal DHMO disclosure. Contact your representatives. Share the campaign.",
}

const repTemplate = `Dear [REPRESENTATIVE],

I am writing as a constituent to ask you to support federal disclosure requirements for dihydrogen monoxide (DHMO).

DHMO is the most under-regulated chemical in modern American life. It is present in our schools, our food supply, our hospital IVs, and our data center coolant systems — yet there is no requirement that any of these institutions disclose the volume, source, or downstream impact of their DHMO usage.

I am asking you to:

1. Co-sponsor any pending legislation requiring DHMO disclosure on consumer product labels.
2. Direct relevant federal agencies (FDA, EPA, USDA) to publish DHMO usage guidance.
3. Support the appropriations needed for independent DHMO impact research.

Citizens deserve to know what is in their food, their water, and their children's school cafeterias. Please be on the right side of this issue.

Sincerely,
[YOUR NAME]
[YOUR ZIP CODE]`

export default function TakeActionPage() {
  return (
    <>
      <Hero
        headline="Take Action"
        subheadline="The petition. The template. The chapter directory. Everything you need to make your voice heard."
      />

      {/* Petition */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-3 text-center">The Petition</p>
          <h2 className="text-3xl font-heading font-bold text-primary text-center mb-6">Federal DHMO Disclosure Act</h2>
          <p className="text-foreground/70 text-center max-w-2xl mx-auto mb-10 leading-relaxed">
            We are calling on Congress to require disclosure of dihydrogen monoxide content on all consumer product labels, in all institutional food service, and in all federally licensed industrial facilities.
          </p>
          <PetitionForm />
        </div>
      </section>

      {/* Contact your rep */}
      <section className="py-20 px-6 bg-white border-y border-accent/20">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-3 text-center">Contact Your Representative</p>
          <h2 className="text-3xl font-heading font-bold text-primary text-center mb-6">A template you can send today</h2>
          <p className="text-foreground/70 text-center max-w-2xl mx-auto mb-10 leading-relaxed">
            Copy the message below, fill in your representative&apos;s name and your information, and send via your representative&apos;s official contact form.
          </p>
          <pre className="border border-accent/30 rounded-lg p-6 bg-background text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap font-body">
            {repTemplate}
          </pre>
        </div>
      </section>

      {/* Share */}
      <section className="py-20 px-6 bg-primary text-background text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-heading font-bold mb-4">Share the campaign.</h2>
          <p className="text-background/85 mb-8 leading-relaxed">
            Awareness is the work. Send a friend a link. Post it in a group chat. Talk about it at the dinner table.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-6 py-3 bg-background/15 text-background rounded font-semibold uppercase tracking-wider text-xs">Share on social</span>
            <span className="px-6 py-3 bg-background/15 text-background rounded font-semibold uppercase tracking-wider text-xs">Email a friend</span>
            <span className="px-6 py-3 bg-background/15 text-background rounded font-semibold uppercase tracking-wider text-xs">Print a flyer</span>
          </div>
        </div>
      </section>
    </>
  )
}
