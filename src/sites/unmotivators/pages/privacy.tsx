export const metadata = {
  title: "Privacy Policy — Unmotivators Inc.",
  description: "How Unmotivators Inc. handles the information you do not especially wish to share.",
}

export default function UnmotivatorsPrivacy() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-widest text-foreground/60 mb-3">
          Document
        </p>
        <h1 className="text-4xl font-heading font-bold uppercase tracking-tight text-foreground mb-10">
          Privacy Policy
        </h1>

        <div className="space-y-8 text-foreground/80 leading-relaxed">
          <div>
            <h2 className="font-heading text-xl uppercase tracking-tight text-foreground mb-3">
              1. What we collect.
            </h2>
            <p>
              We collect only the information required to process an order: a name, a shipping address, a payment token from our processor, and the email address you use to ask where your poster is. We do not enrich any of this data. We do not sell it. We do not correlate it with your other shopping habits, which, like ours, are probably a little worse than we would prefer to admit.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl uppercase tracking-tight text-foreground mb-3">
              2. Cookies.
            </h2>
            <p>
              This site uses a single cookie to keep your cart between visits. There is no advertising network here. There is no tracking pixel. If you clear the cookie, your cart will empty, and that is, in its own way, a lesson.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl uppercase tracking-tight text-foreground mb-3">
              3. Emails.
            </h2>
            <p>
              We do not operate a newsletter. There is a subscribe field in the footer. It does not do anything. We have been meaning to remove it.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl uppercase tracking-tight text-foreground mb-3">
              4. Requests.
            </h2>
            <p>
              You may request a copy of your data, or request its deletion. We will comply within thirty days. Where the law gives you additional rights, we will honor them. Where it does not, we will still honor them, because the alternative is the alternative.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl uppercase tracking-tight text-foreground mb-3">
              5. Contact for privacy matters.
            </h2>
            <p>
              Write to privacy@unmotivators.example. A human will respond, eventually.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
