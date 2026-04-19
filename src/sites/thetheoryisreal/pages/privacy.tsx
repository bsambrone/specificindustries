import type { PageMetadata } from "@/themes"
import Link from "next/link"

export const metadata: PageMetadata = {
  title: "Privacy Policy — The Theory Is Real",
  description: "What we collect. What we do with it. What we can confirm.",
}

export default function Privacy() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <p className="font-heading text-xs uppercase tracking-[0.3em] text-accent">LEGAL</p>
      <h1 className="mt-2 font-heading text-4xl text-primary">Privacy Policy</h1>
      <p className="mt-4 font-body text-sm text-text/60 italic">Last revised: frequently. Check back.</p>

      <aside className="mt-8 p-5 rounded-lg border-2" style={{ borderColor: "var(--color-primary, #4a9c6d)", background: "var(--color-surface-alt, #0f1014)" }}>
        <div className="font-heading text-xs uppercase tracking-[0.2em] mb-2 text-accent">Umbrella policy</div>
        <p className="font-body text-sm text-text/85">
          The authoritative privacy policy governing all data handling is published by Specific Industries at{" "}
          <a className="underline text-primary hover:opacity-80" href="https://specificindustries.com/privacy">specificindustries.com/privacy</a>.{" "}
          That policy supersedes anything you read on this page.
        </p>
      </aside>

      <div className="mt-10 flex flex-col gap-8 font-body text-base leading-relaxed text-text/85">
        <section>
          <h2 className="font-heading text-xl text-primary mb-3">§1. What We Collect</h2>
          <p>
            We cannot confirm what we collect, and we say this with precision rather than evasion. Our systems log
            activity in ways that are standard for all websites. What is done with those logs we cannot confirm
            without implicating infrastructure we would prefer not to identify. Standard contact-form submissions
            are retained. Nothing else is retained that we are able to verify or that we would be comfortable
            describing in a public document.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-xl text-primary mb-3">§2. How We Use It</h2>
          <p>
            We do not use your information. That is our position and we are committed to it. Any use of your
            information by parties operating systems we rely on is governed by their own policies, which we have
            read, partially, and found acceptable given the circumstances. We do not sell, broker, or otherwise
            transfer your information to third parties for compensation. We have not done this. We do not intend to
            do this. We consider it a baseline, not a feature.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-xl text-primary mb-3">§3. Cookies</h2>
          <p>
            Yes, technically. The site sets session cookies that are required for navigation and cart functionality.
            These are first-party cookies with no advertising purpose. We are aware of what cookies are, which puts
            us ahead of several large institutions we have been observing. If you disable cookies, the cart will not
            function. We consider this a reasonable trade-off and will not attempt to persuade you otherwise.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-xl text-primary mb-3">§4. Third Parties</h2>
          <p>
            We trust none of them. We use them where operationally required — hosting, payment processing — and we
            have selected providers on the basis of minimum data footprint rather than feature richness. We do not
            use third-party analytics. We do not use advertising networks. We do not use social sharing buttons.
            Any third-party service visible on this site is here because we concluded the alternative was worse.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-xl text-primary mb-3">§5. Changes to This Policy</h2>
          <p>
            This policy changes frequently. We update it when our understanding of our own systems improves, when
            relevant regulations shift, or when we observe behavior in the broader data ecosystem that requires a
            policy response. We do not send notification of changes. The current version is the operative version.
            The date at the top of this page is updated each revision. We recommend checking it.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-xl text-primary mb-3">§6. Contact</h2>
          <p>
            Privacy-related inquiries should be directed via the channels described on our{" "}
            <Link className="underline text-primary hover:opacity-80" href="/contact">contact page</Link>. Paper mail is
            preferred for sensitive matters. We read all submissions. We respond to those that require a response and
            to those we find sufficiently interesting.
          </p>
        </section>
      </div>
    </main>
  )
}
