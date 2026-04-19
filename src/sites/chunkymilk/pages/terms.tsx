import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Terms of Use — Whitford Family Chunky Milk",
  description: "The understanding between the hollow and the buyer.",
}

export default function ChunkyMilkTerms() {
  return (
    <>
      <Hero
        headline="Terms of Use"
        subheadline="What the hollow asks of you. What the hollow offers in return."
      />
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto prose prose-lg text-foreground/80 space-y-6">
          <p className="text-sm text-foreground/70 bg-secondary/30 border border-accent/20 rounded-lg p-4 not-italic">
            The authoritative terms of use for all Specific Industries properties are maintained at{" "}
            <a href="https://specificindustries.com/terms" className="text-accent underline hover:text-primary transition-colors">
              specificindustries.com
            </a>.{" "}
            <a href="https://specificindustries.com/privacy" className="text-accent underline hover:text-primary transition-colors">
              View Privacy Policy
            </a>
          </p>
          <p className="text-sm text-foreground/40 italic">
            Agreed upon at supper. Witnessed by Silas. Typed by Jeb.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">1. What You Receive</h2>
          <p>
            When you order from the Chunkery, you receive a jar (or a set, or a cloth, or a crock) that
            was prepared for you by our hands, in our shed, under our roof. It will arrive when it arrives.
            We do not guarantee a date. We guarantee it is the milk we said it would be.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">2. What The Hollow Asks</h2>
          <p>
            We ask that you treat the jar as a thing that was made for you. We ask that you do not
            complain about the chunks; the chunks are the point. We ask that you tell someone else, if
            you like the pour. We do not advertise.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">3. Returns</h2>
          <p>
            We accept returns of unopened jars only. Opened jars cannot be returned; once a jar is open
            the milk has met the air, and what happens between them is between them. If a jar arrives
            broken, we will ship another as soon as one is ready.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">4. Disputes</h2>
          <p>
            Disputes are resolved at the Settlin&apos; Shed. You may write and request a hearing. Bill will
            listen. Jeb will listen. Silas will listen. Otis will generally stand at the back. A decision
            will be reached. We will write you with it.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">5. Shipping</h2>
          <p>
            Jars are shipped in unbleached muslin and wood shavings, in the order we receive the orders.
            We ship in the morning only. We do not ship on Sundays. We do not ship on the day Otis grades
            the Reserve.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">6. Use Of The Site</h2>
          <p>
            This website is provided as an extension of the hollow. You are welcome to read it, to share
            it, and to place orders through it. You are asked not to scrape it, not to copy its text,
            and not to pretend the Whitford line is yours. We will know.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">7. Changes</h2>
          <p>
            These terms may change. When they do, we will update this page. The terms on
            specificindustries.com are the ones that govern the agreement.
          </p>
        </div>
      </section>
    </>
  )
}
