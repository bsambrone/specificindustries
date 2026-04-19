import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Privacy Policy — Whitford Family Chunky Milk",
  description: "How we handle what little information the hollow keeps about you.",
}

export default function ChunkyMilkPrivacy() {
  return (
    <>
      <Hero
        headline="Privacy Policy"
        subheadline="What the hollow keeps, what it does not, and what the mailman sees."
      />
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto prose prose-lg text-foreground/80 space-y-6">
          <p className="text-sm text-foreground/70 bg-secondary/30 border border-accent/20 rounded-lg p-4 not-italic">
            The authoritative privacy policy for all Specific Industries properties is maintained at{" "}
            <a href="https://specificindustries.com/privacy" className="text-accent underline hover:text-primary transition-colors">
              specificindustries.com
            </a>.{" "}
            <a href="https://specificindustries.com/terms" className="text-accent underline hover:text-primary transition-colors">
              View Terms of Use
            </a>
          </p>
          <p className="text-sm text-foreground/40 italic">
            Last updated: Whenever Jeb remembered to ask Bill. Version: VII (we count by generations, not revisions).
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">1. What The Hollow Collects</h2>
          <p>
            When you write to us, we keep your letter. When you place an order, we write your name in the
            Hollow Journal along with what you bought. We do not track you in the way the city people do.
            The cows are not involved in this.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">2. How The Information Settles</h2>
          <p>
            Information given to the hollow settles the way milk settles — slowly, and in its own time.
            Your address is kept in a wooden file box behind Bill&apos;s desk. Your email is kept in a computer
            Otis was given in 2009 that still functions, mostly. The box has a lock. The computer has
            a password Silas wrote on a sticky note.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">3. Sharing</h2>
          <p>
            We share what we know about you with: the mailman, Otis, Bill, Jeb, Silas, and on rare
            occasions Bill&apos;s mother, who is ninety-two and asks. We do not sell your information.
            We have never been offered money for it and would not know what to charge.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">4. Cookies</h2>
          <p>
            We do not have cookies. Bill&apos;s wife makes bread on Sundays, which is closer to a biscuit.
            If you are asking about the other kind, we have a cookie that the site uses to remember
            what you put in your cart. It forgets within a day. So do we.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">5. Your Rights</h2>
          <p>
            You may write to the Chunkery at any time to ask what we know about you. We will read your
            letter, discuss it over supper, and write back with what we have. If you wish us to forget
            you, we will. The hollow is used to letting things settle out of memory.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">6. Cows</h2>
          <p>
            The cows do not know who you are. The cows have never known who anyone is. This is not a
            matter of privacy; it is a matter of the cows.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">7. Changes To This Policy</h2>
          <p>
            This policy is updated rarely. When it changes, we do not send an email. We put up a small
            sign on the Settlin&apos; Shed, which most of you will not see. The policy on specificindustries.com
            is the one that matters.
          </p>
        </div>
      </section>
    </>
  )
}
