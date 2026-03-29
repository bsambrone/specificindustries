import { Hero } from "@/components/ui/hero"
import { WaveDivider } from "@/components/ui/wave-divider"

export const metadata = {
  title: "Privacy Policy — Inflatable Anchors Co.",
  description: "Our privacy policy. Lighter reading than our anchors.",
}

export default function InflatableAnchorsPrivacy() {
  return (
    <>
      <Hero
        dark
        headline="Privacy Policy"
        subheadline="Effective as of our last anchor deployment. Which drifted."
      />
      <WaveDivider variant="wave1" />
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto prose prose-lg text-foreground/80 space-y-6">
          <p className="text-sm text-foreground/70 bg-secondary/20 border border-primary/10 rounded-lg p-4">
            The authoritative privacy policy for all Specific Industries properties is maintained at{" "}
            <a href="https://specificindustries.com/privacy" className="text-accent underline hover:text-primary transition-colors">
              specificindustries.com
            </a>.{" "}
            <a href="https://specificindustries.com/terms" className="text-accent underline hover:text-primary transition-colors">
              View Terms of Use
            </a>
          </p>
          <p className="text-sm text-foreground/40 italic">
            Last updated: When the tide was out. We think it was a Tuesday.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">1. What We Collect</h2>
          <p>
            Nothing. Absolutely nothing. Much like our anchors, our data collection
            has zero holding power. We don&apos;t have a database. We don&apos;t have a server room.
            Captain Chuck has a notebook where he writes down &ldquo;cool boat names he saw at the
            marina&rdquo; but that&apos;s a personal project and not affiliated with this website.
          </p>
          <p>
            Your shopping cart is stored in your browser&apos;s local storage, which means
            it lives on your computer, not ours. If you clear your cookies, your cart
            disappears, much like our anchors disappear when you deploy them in a current.
            We find the parallel poetic.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">2. Cookies &amp; Tracking</h2>
          <p>
            We use Google Analytics because someone told Chuck it was important. We also use
            Vercel Analytics because it came with the hosting and Skip couldn&apos;t figure out how
            to turn it off. These tools tell us things like &ldquo;someone visited the website&rdquo;
            and &ldquo;they left.&rdquo; We do not know who you are, where you live, or whether
            you actually bought an anchor. Big Mike checks the mailbox every day just in case an
            order shows up. It has not, because this is a satirical website.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">3. Data Sharing</h2>
          <p>
            We share your data with the following parties: no one. We cannot share what we do
            not have. Reef Henderson once suggested we &ldquo;leverage our user data for strategic
            buoyancy insights&rdquo; but since our user data consists of Google Analytics page
            views and Big Mike&apos;s notebook of cool boat names, the strategic value was determined
            to be approximately zero. Reef was asked to go back to his whiteboard.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">4. Your Rights</h2>
          <p>
            You have the right to access any data we have about you. Since we have no data
            about you, this right is both absolute and completely useless. You also have the
            right to be forgotten, which, given that we never knew you existed, has already
            been granted. You&apos;re welcome.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">5. Security</h2>
          <p>
            Our website is secured by HTTPS, which the little padlock in your browser confirms.
            Beyond that, our security infrastructure consists of Captain Chuck&apos;s WiFi password
            (&ldquo;anchor123&rdquo; &mdash; please do not use this), a seagull that sits on the
            router, and the general obscurity of being a website about inflatable anchors. We
            have never been hacked because we have never been worth hacking. We consider this
            our most effective security measure.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">6. Contact &amp; Disputes</h2>
          <p>
            If you have concerns about this privacy policy, please contact our Director of
            Customer Amazement, Skip Bayliner, who will respond with enthusiasm that may or
            may not address your actual concern. For serious privacy inquiries, Captain Chuck
            is available between tides. He will listen carefully, nod thoughtfully, and then
            ask if you&apos;d like to see a demonstration of the Heavy Duty Pro. All disputes
            are resolved by Big Mike, whose resolution method involves a firm handshake and
            the phrase &ldquo;I think we&apos;re good here.&rdquo;
          </p>
        </div>
      </section>
    </>
  )
}
