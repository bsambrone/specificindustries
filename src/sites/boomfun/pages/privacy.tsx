import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Privacy Policy — Boom-Fun!",
  description: "How Boom-Fun! Industries handles the information of our young customers and their parents. Effective 1961.",
}

export default function BoomfunPrivacy() {
  return (
    <>
      <Hero
        headline="PRIVACY POLICY"
        subheadline="How we handle the information of our young customers, their parents, and the occasional mailman."
      />
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto prose prose-lg text-foreground/80 space-y-6">
          <p className="text-sm text-foreground/70 bg-secondary/20 border border-primary/15 rounded-sm p-4">
            The authoritative privacy policy for all Specific Industries properties is maintained at{" "}
            <a href="https://specificindustries.com/privacy" className="text-primary underline hover:text-primary/80 transition-colors">
              specificindustries.com
            </a>
            . That document governs all data handling practices across the Specific Industries portfolio, including
            this site. See also:{" "}
            <a href="https://specificindustries.com/terms" className="text-primary underline hover:text-primary/80 transition-colors">
              Terms of Use
            </a>
            .
          </p>
          <p className="text-sm text-foreground/40 italic">
            Last updated: The spring of 1961. Revised annually whether needed or not. Current revision: 61.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">1. What We Collect</h2>
          <p>
            When a Boom-Fun! Club membership form is returned to our Toledo facility, we collect your child&apos;s name,
            age, mailing address, and three Boom-Fun! product stock numbers. We also collect anything you voluntarily
            include — artwork, poems, requests, and, in one memorable case, a small dried salamander. We keep all
            of these forever in a wooden filing cabinet on the third floor.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">2. How We Use Your Information</h2>
          <p>
            Membership information is used to mail the &ldquo;The Fuse&rdquo; newsletter every two months and to
            compile the Annual Year-End Member Directory, which is distributed to every other member. Addresses are
            not sold to outside concerns. They are not sold because nobody has offered to buy them. If somebody were
            to offer, our position would reconsider itself.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">3. The Mailing List</h2>
          <p>
            Upon joining the Boom-Fun! Club, your child will receive &ldquo;The Fuse&rdquo; bi-monthly until 1971.
            After 1971, continued delivery depends on whether Harland remembers to renew the subscription list. He
            has so far remembered every year. We expect this pattern to continue.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">4. Cookies and Tracking</h2>
          <p>
            Boom-Fun! does not use cookies (the electronic kind). Boom-Fun! does, however, occasionally send the
            edible kind to long-standing Club members on their birthdays. Please update your address if you have moved
            since 1962. We have lost track of many members this way.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">5. Your Rights</h2>
          <p>
            You have the right to request that we remove you from the mailing list at any time. Please write to us at
            our Toledo address. We will remove you by the next catalog cycle, or possibly the one after, depending on
            how far into the printing process we are when your letter arrives.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">6. Children&apos;s Privacy</h2>
          <p>
            Most of our customers are children. This is the entire business. If you are a child, please ask an adult
            to read this privacy policy to you. Any adult will do. The mailman is an adult.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">7. Data Security</h2>
          <p>
            Club records are stored in a locked wooden filing cabinet on the third floor of the Toledo facility. The
            key is kept in Harland&apos;s desk drawer, which is also locked. The desk drawer key is kept in a mason jar
            of paper clips. We consider this more than adequate.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">8. Changes to This Policy</h2>
          <p>
            We revise this policy annually. If the revisions are minor, we do not mention it. If they are major, we
            print the new policy on the back cover of the fall catalog. Previous versions are available for review by
            written request.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">9. Contact</h2>
          <p>
            Questions about this policy should be directed to the Customer Correspondence Department at our Toledo
            address. Please mark the envelope &ldquo;PRIVACY&rdquo; in the upper-left corner so we can route it correctly.
          </p>
        </div>
      </section>
    </>
  )
}
