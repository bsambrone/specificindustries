import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Privacy Policy — Dehydrated Water Co.",
  description: "Our privacy policy. Dry reading, appropriately.",
}

export default function DehydratedWaterPrivacy() {
  return (
    <>
      <Hero
        headline="Privacy Policy"
        subheadline="Effective since 1847. Updated whenever Ezekiel remembers."
      />
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto prose prose-lg text-foreground/80 space-y-6">
          <p className="text-sm text-foreground/40 italic">
            Last updated: The 14th of Drytober, Year of Our Powder CLXXIX
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">1. Data Collection</h2>
          <p>
            We collect the minimum amount of data necessary to process your order, which is to say: we collect
            your name, address, and payment information, then write it down in a leather-bound ledger that has
            been in the Drywell family since 1903. The ledger is kept in a locked drawer. The key is under the mat.
            We are aware this is not best practice.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">2. How We Use Your Data</h2>
          <p>
            Your data is used exclusively for order fulfillment and the occasional handwritten thank-you note from
            Ezekiel IV. We do not sell your data. We do not share your data. Frankly, we would not know how.
            Our technology infrastructure consists of the aforementioned ledger and a filing cabinet that
            doesn&apos;t close properly.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">3. Cookies</h2>
          <p>
            This website uses cookies in the same way that all websites use cookies: reluctantly and because
            the framework includes them by default. We have not configured them to do anything specific.
            If they are tracking you, they are doing so of their own volition, and we take no responsibility
            for their ambitions.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">4. Data Retention</h2>
          <p>
            We retain your data for as long as the ledger lasts, which, given its Victorian-era construction,
            could be several more centuries. If you would like your data removed, please send us a letter
            (email is unreliable; our internet connection runs through a barn) and we will cross out your
            entry with a fountain pen. This is our deletion process.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">5. Security</h2>
          <p>
            Your data is protected by a locked drawer, a suspicious cat named Reginald who sleeps on the
            filing cabinet, and the general obscurity of our company. We believe that the most effective
            data security is being a business that no one has heard of. So far, this strategy has been
            remarkably effective.
          </p>

          <h2 className="text-2xl font-heading font-bold text-primary">6. Your Rights</h2>
          <p>
            You have the right to access your data, correct your data, and request its deletion. You also have
            the right to ask why you purchased dehydrated water. We cannot help with this last one, but we
            understand the impulse. Exercise any of these rights by post. Allow 6-8 weeks for a response,
            or longer if Ezekiel is on one of his &ldquo;contemplation retreats.&rdquo;
          </p>

          <p className="text-sm text-foreground/40 italic border-t border-primary/10 pt-6">
            This privacy policy is a work of satire. Dehydrated Water Co. is a fictional company. No actual
            data is collected, stored, or processed. Reginald the cat is also fictional, but we like to
            think he&apos;d be a good guard cat.
          </p>
        </div>
      </section>
    </>
  )
}
