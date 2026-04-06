import Image from "next/image"
import Link from "next/link"
import { getSiteHref } from "@/lib/site-href"

export const metadata = {
  title: "About — The Elder Party",
  description: "The history, mission, and values of the Elder Party. Founded on principles older than the republic itself.",
}

export default async function AboutPage() {
  const siteHref = await getSiteHref()

  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 md:py-32 px-6 min-h-[340px] md:min-h-[400px]">
        <Image
          src="/sites/elderparty/about-hero.png"
          alt=""
          fill
          className="object-cover brightness-40"
          priority
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-white mb-6 leading-tight">
            About the Elder Party
          </h1>
          <p className="text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
            We are not a new party. We are the oldest. And we are ready.
          </p>
        </div>
      </section>

      {/* Founding Story */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-primary mb-8">
            Our Founding
          </h2>
          <div className="space-y-6 text-foreground/70 leading-relaxed">
            <p>
              The Elder Party was founded in the winter of 2027, though its roots extend considerably further back.
              The party emerged from a coalition of coastal civic organizations, academic institutions, and community
              groups who shared a common conviction: that American politics had grown too small. Too human. Too
              limited by the narrow assumptions of terrestrial governance.
            </p>
            <p>
              The founding convention took place in Arkham, Massachusetts, in the basement of the Miskatonic
              University Faculty Club. Forty-seven delegates attended. By the end of the evening, there were
              forty-seven more. No one could account for the additional delegates, but all were duly registered
              and all voted in favor of the party&apos;s charter. The vote was unanimous. It is always unanimous.
            </p>
            <p>
              Cthulhu R&apos;lyeh accepted the party&apos;s nomination for president by acclamation. The acceptance speech
              was delivered in R&apos;lyehian and lasted approximately eleven minutes by clock time, though several
              delegates insist it went on for much longer. A translation was attempted but abandoned when the
              translator reported that &ldquo;English doesn&apos;t have enough dimensions for this.&rdquo; The gist, as
              understood by those present, was: &ldquo;I have waited. You have waited. The waiting is over.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Founding Image + Mission */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="shrink-0 w-full md:w-96">
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-primary/10">
                <Image
                  src="/sites/elderparty/about-founding.png"
                  alt="The Elder Party founding convention"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-xs text-foreground/40 mt-3 text-center italic">
                The founding convention, Miskatonic University Faculty Club, 2027.
                Photographer unknown. Camera recovered undamaged.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-heading font-bold text-primary mb-6">
                Our Mission
              </h2>
              <div className="space-y-4 text-foreground/70 leading-relaxed">
                <p>
                  The Elder Party exists to restore to American governance the cosmic perspective it has lacked
                  since the nation&apos;s founding. The framers of the Constitution, brilliant as they were, drafted a
                  document limited to three spatial dimensions and a single timeline. We intend to build on their work.
                </p>
                <p>
                  Our mission is simple: elect Cthulhu R&apos;lyeh to the presidency, implement a platform that addresses
                  the needs of all Americans — surface-dwelling and otherwise — and usher in an era of governance
                  that transcends the petty divisions of mortal politics. Party over party. Nation over nation.
                  Something much larger over everything.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-primary mb-12 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 border border-primary/10 rounded-lg bg-secondary/20">
              <h3 className="text-xl font-heading font-semibold text-primary mb-3">Patience</h3>
              <p className="text-foreground/60 text-sm leading-relaxed">
                Our candidate has waited eons for this moment. That kind of patience is rare in politics
                and rarer still in leadership. When we say we take the long view, we mean it in a way
                that geologists would find impressive.
              </p>
            </div>
            <div className="text-center p-6 border border-primary/10 rounded-lg bg-secondary/20">
              <h3 className="text-xl font-heading font-semibold text-primary mb-3">Unity</h3>
              <p className="text-foreground/60 text-sm leading-relaxed">
                The Elder Party does not divide Americans into red and blue. We see one nation, bound
                together by forces older than partisan politics — forces that connect every citizen to
                something vast and inescapable. That is unity.
              </p>
            </div>
            <div className="text-center p-6 border border-primary/10 rounded-lg bg-secondary/20">
              <h3 className="text-xl font-heading font-semibold text-primary mb-3">Inevitability</h3>
              <p className="text-foreground/60 text-sm leading-relaxed">
                Other parties ask for your vote. We appreciate your vote, but we want to be transparent:
                the Elder Party&apos;s vision for America will come to pass regardless. Your participation
                simply determines whether you are part of the awakening or merely present for it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Links to Leadership & Candidate */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-heading font-bold text-primary mb-4">
            Meet the Team
          </h2>
          <p className="text-foreground/60 mb-10 max-w-2xl mx-auto leading-relaxed">
            The Elder Party is led by individuals — and entities — of extraordinary dedication.
            Learn more about the people guiding the awakening.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href={siteHref("/candidate")}
              className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Meet the Candidate
            </Link>
            <Link
              href={siteHref("/leadership")}
              className="inline-block px-8 py-3 border border-primary/40 text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors"
            >
              Party Leadership
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
