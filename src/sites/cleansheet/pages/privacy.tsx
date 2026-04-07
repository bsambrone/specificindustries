export const metadata = {
  title: "Privacy Policy — The Clean Sheet",
  description: "What we definitely don't keep records of.",
}

export default function Privacy() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-heading font-bold text-foreground mb-8">Privacy Policy</h1>

        <p className="text-foreground/80 leading-relaxed mb-10 italic text-lg">
          At The Clean Sheet, your privacy is not just a priority — it&apos;s a business model.
          What we don&apos;t know can&apos;t hurt us. Or you. Especially you.
        </p>

        <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
          What We Do Not Collect
        </h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          We do not collect, store, or acknowledge the existence of the following: your real name,
          your actual address, the origin of your garments, the reason your garments needed
          cleaning so urgently, or why you paid in consecutive $9,999 increments. We did not
          see you. You were not here.
        </p>
        <p className="text-foreground/80 leading-relaxed mb-10">
          Our security cameras have been broken since 1987. We keep meaning to fix them.
        </p>

        <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
          What We Do Collect
        </h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          When you submit an intake form, we retain only the information necessary to provide
          laundering services. This information is stored in a system that our IT department
          describes as &quot;regrettably digital&quot; and our legal team describes as &quot;discoverable,
          unfortunately.&quot;
        </p>
        <p className="text-foreground/80 leading-relaxed mb-10">
          We are actively exploring ways to make our records less... permanent.
        </p>

        <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Data Retention</h2>
        <p className="text-foreground/80 leading-relaxed mb-10">
          Our data retention policy is as thorough as our cleaning process — nothing remains.
          Records are automatically purged after 30 days, or sooner if circumstances require.
          &quot;Circumstances&quot; is a broad term and we intend to keep it that way.
        </p>

        <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
          Law Enforcement Requests
        </h2>
        <p className="text-foreground/80 leading-relaxed mb-10">
          In the event of a lawful request for client data, The Clean Sheet will comply with
          all applicable laws while noting that, per our data retention policy, the requested
          information almost certainly no longer exists. What a coincidence.
        </p>

        <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
          The Authoritative Policy
        </h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          The authoritative privacy policy governing this site is the Specific Industries Privacy
          Policy, available at{" "}
          <a
            href="https://specificindustries.com/privacy"
            className="text-primary hover:underline"
          >
            specificindustries.com/privacy
          </a>
          .
        </p>
        <p className="text-foreground/60 text-sm leading-relaxed">
          Any conflict between statements on this page and the Specific Industries Privacy Policy
          is resolved in favor of the Specific Industries Privacy Policy. The Clean Sheet&apos;s
          commentary above is offered in good faith but does not override the umbrella policy.
        </p>
      </div>
    </section>
  )
}
