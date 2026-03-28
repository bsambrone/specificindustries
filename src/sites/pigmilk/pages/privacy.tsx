import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Privacy Policy — Pig Milk Co.",
  description: "Our privacy policy. You have no privacy. Sorry.",
}

export default function PigMilkPrivacy() {
  return (
    <>
      <Hero
        headline="Privacy Policy"
        subheadline="Effective immediately. Retroactively. And in perpetuity."
      />
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
            Last updated: When you weren&apos;t looking. Version: 47.3 (we keep changing it)
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">1. Data Collection</h2>
          <p>
            By visiting this website, you agree that we collect everything. Your name, your email,
            your browsing history, your hopes, your dreams, your milk preferences (pig and otherwise),
            and the contents of your refrigerator. We don&apos;t actually have the technology to do most of this,
            but we appreciate your consent nonetheless.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">2. How We Use Your Data</h2>
          <p>
            We use your data for the following purposes: marketing pig milk to you, marketing pig milk
            to people who look like you, marketing pig milk to people who live near you, and occasionally
            just looking at it and feeling powerful. We may also print your data out and use it as
            bedding for the pigs. The pigs enjoy sleeping on customer data. We don&apos;t know why.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">3. Data Sharing</h2>
          <p>
            We share your data with our partners, which include: the pigs, Earl&apos;s neighbor Dave,
            a guy we met at a farmers market who seemed trustworthy, and anyone who asks nicely.
            We may also sell your data to fund our pig milk research. We will not feel bad about this.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">4. Cookies</h2>
          <p>
            This website uses cookies. Not the delicious kind. The kind that track you across the internet
            like a clingy pig. By continuing to use this website, you agree to be followed by our cookies
            forever. There is no opt-out. There is only pig milk.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">5. Your Rights</h2>
          <p>
            You have the right to request deletion of your data. We have the right to ignore that request.
            You have the right to be forgotten. The pigs, however, never forget. They remember every visitor.
            Every. Single. One.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">6. Security</h2>
          <p>
            Your data is stored on a laptop in the barn. The laptop is password-protected. The password is
            &quot;pigmilk123&quot;. We are aware this is not ideal. The barn does have a lock, but as mentioned
            on our careers page, the door doesn&apos;t close properly. We&apos;re working on it.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">7. Changes to This Policy</h2>
          <p>
            We reserve the right to change this policy at any time, for any reason, without telling you.
            If you don&apos;t like it, you are welcome to stop drinking pig milk. But you won&apos;t.
            They never do.
          </p>

          <p className="text-sm text-foreground/40 italic border-t border-primary/10 pt-6">
            This privacy policy is a work of satire and is not legally binding. Pig Milk Co. is a fictional
            company. No actual data is collected, stored, or sold. The pigs are, however, very real,
            and they really do judge you.
          </p>
        </div>
      </section>
    </>
  )
}
