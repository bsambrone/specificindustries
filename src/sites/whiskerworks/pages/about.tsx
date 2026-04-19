import Image from "next/image"
import Link from "next/link"
import { getSiteHref } from "@/lib/site-href"

export const metadata = {
  title: "About — Whiskerworks",
  description: "Founding story and institutional overview of Whiskerworks Advanced Feline Training Institute.",
}

export default async function WhiskerworksAbout() {
  const siteHref = await getSiteHref()

  return (
    <section className="bg-background">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <header className="text-center mb-12">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">About the Institute</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-heading text-text">Founded 2019. Above a Spirit Halloween.</h1>
        </header>

        <div className="prose-sm space-y-6 text-text/80">
          <p>
            Whiskerworks Advanced Feline Training Institute was founded in the summer of 2019 by Cornelius Whitfield, a mid-tier trade-school administrator who, during a particularly bleak quarterly review, had what he describes as &ldquo;a vision, or possibly low blood sugar.&rdquo; The vision was specifically feline. The blood sugar has since been addressed.
          </p>
          <p>
            The Institute operates out of <strong>Suite 208, above the Spirit Halloween on Route 9</strong>. It is our only campus. We do not plan to open a second. This is by design — our entire staff knows where to meet for lunch.
          </p>
          <p>
            Whiskerworks consists of six divisions. Five are publicly documented and offer a combined 18 advanced programs. The sixth division, Blackbook, is governed separately and is not described here. If you have questions about Blackbook, you are not our target audience.
          </p>

          <h2 className="text-xl font-heading text-primary mt-10">Accreditation</h2>
          <p>
            Whiskerworks is accredited by the <em>North American Council of Feline Vocational Excellence, Inc.</em>, a wholly-owned subsidiary of Whiskerworks. We consider this sufficient.
          </p>

          <h2 className="text-xl font-heading text-primary mt-10">Campus Tour</h2>
          <div className="relative aspect-video rounded-lg overflow-hidden bg-secondary border border-text/10 not-prose my-6">
            <Image
              src="/sites/whiskerworks/campus.jpg"
              alt="Whiskerworks campus (Suite 208)"
              fill
              sizes="(min-width: 768px) 700px, 100vw"
              className="object-cover"
            />
          </div>
          <p className="text-sm italic text-text/60">
            Pictured: the front of the Institute. Suite 208 is above the hanging inflatable. Entry is via the stairwell around back.
          </p>

          <h2 className="text-xl font-heading text-primary mt-10">Our Mission</h2>
          <p>
            To train any cat, of any temperament, for any career, in six weeks or fewer. To bill in 24 easy payments. To graduate them with a diploma, a lanyard, and a confidence wholly disproportionate to their preparation.
          </p>
        </div>

        <div className="mt-14 text-center">
          <Link
            href={siteHref("/courses")}
            className="inline-block bg-accent hover:bg-accent/90 text-white font-bold rounded px-8 py-3 uppercase tracking-wider"
          >
            Enroll Now
          </Link>
        </div>
      </div>
    </section>
  )
}
