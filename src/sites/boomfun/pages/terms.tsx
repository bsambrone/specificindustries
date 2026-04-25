import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Terms of Use — Boom-Fun!",
  description: "The agreement between Boom-Fun! Industries and every American household that orders from our catalog. In effect since 1961.",
}

export default function BoomfunTerms() {
  return (
    <>
      <Hero
        headline="TERMS OF USE"
        subheadline="The gentlemen's agreement between Boom-Fun! Industries and every household that orders from our catalog."
      />
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto prose prose-lg text-foreground/80 space-y-6">
          <p className="text-sm text-foreground/70 bg-secondary/20 border border-primary/15 rounded-sm p-4">
            The authoritative Terms of Use for all Specific Industries properties is maintained at{" "}
            <a href="https://specificindustries.com/terms" className="text-primary underline hover:text-primary/80 transition-colors">
              specificindustries.com
            </a>
            . That document governs all usage and customer relationships across the Specific Industries portfolio,
            including this site. See also:{" "}
            <a href="https://specificindustries.com/privacy" className="text-primary underline hover:text-primary/80 transition-colors">
              Privacy Policy
            </a>
            .
          </p>
          <p className="text-sm text-foreground/40 italic">
            Terms in effect since the spring of 1961. Revised occasionally when Harland feels strongly about something.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">1. Agreement to Terms</h2>
          <p>
            By ordering any Boom-Fun! product, you enter into the standard Boom-Fun! customer relationship. This is
            a gentleman&apos;s agreement. There is no formal contract. We expect you to behave like an American.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">2. Ordering</h2>
          <p>
            Orders are accepted by return mail, by the Boom-Fun! Club order blank in &ldquo;The Fuse,&rdquo; or by
            telephone at the main Toledo switchboard (Toledo Central 4-5500). We accept personal checks, money
            orders, and (in limited cases) cash taped securely to a piece of cardboard.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">3. Shipping</h2>
          <p>
            We ship every order from our Toledo, Ohio facility within twelve business days of receipt. Orders ship
            via Railway Express or the Post Office, at our discretion. Ground shipping is available to all forty-eight
            states. Hawaii and Alaska may require additional time and are not currently states.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">4. Returns</h2>
          <p>
            Unused Boom-Fun! products may be returned within thirty days for a full refund, provided the product is
            still in its original condition. Products that have been detonated, deployed, fishing-tested, triggered,
            or otherwise used as intended may not be returned.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">5. Warranty</h2>
          <p>
            Boom-Fun! products carry the full Boom-Fun! Guarantee: every product works at least once, exactly as
            described in the catalog, barring obvious user error. Products that fail to work at least once may be
            exchanged. Products that have worked once and are now gone are considered to have fulfilled their
            warranty.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">6. Liability</h2>
          <p>
            Boom-Fun! is not responsible for: property damage beyond the item being detonated; personal injury to
            members of the household who did not read Sparky&apos;s Handbook; injury to household pets, lawn statuary,
            or prize shrubs; temporary hearing changes; permanent hearing changes; disputes between neighbors
            arising from mailbox-related events; or the feelings of relatives who were not invited to the birthday
            party.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">7. Permitted Uses</h2>
          <p>
            Boom-Fun! products are intended for celebratory, recreational, and light landscaping purposes only.
            They are not intended for: professional demolitions, use at your place of employment, use on municipal
            property, use on federal property, use on property belonging to a school board, or any use that would
            require the word &ldquo;permit.&rdquo;
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">8. Age Restrictions</h2>
          <p>
            Boom-Fun! products are designed for Americans of all ages. However, we recommend that customers under
            the age of seven ask an adult to handle the fuse-lighting step. Any adult will do. The mailman is an
            adult.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">9. Modifications</h2>
          <p>
            Please do not modify Boom-Fun! products. Our engineering department has considered each design carefully,
            and modifications rarely improve the product. If you believe a modification would improve a product,
            please write to us. If the idea is good, we will add it to the catalog and name the improvement after
            you.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">10. Governing Law</h2>
          <p>
            These terms are governed by the laws of the State of Ohio and by the general understanding that
            reasonable Americans can work things out without involving the courts. Disputes should first be
            addressed by written correspondence. Harland will read every letter personally.
          </p>
        </div>
      </section>
    </>
  )
}
