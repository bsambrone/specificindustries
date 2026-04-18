import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Privacy Policy — Privatrix",
  description: "Our complete approach to user privacy. We have an approach.",
}

const SECTIONS = [
  {
    title: "1. Data We Collect (All Of It)",
    body:
      "Privatrix collects every interaction, click, scroll, hover, accidental keypress, and dimly considered hesitation that occurs on or near our properties. We collect data we do not need, data we do not understand, and data that has been forwarded to us in error. We retain it indefinitely in a single durable bucket. The bucket is named pii-prod. We are aware.",
  },
  {
    title: "2. Encryption (Of Marketing Materials)",
    body:
      "All marketing materials produced by Privatrix are encrypted at rest. Customer data is, by contrast, stored at rest in plaintext on a shared volume that one of our engineers refers to as 'the bucket of truth.' We hope to encrypt the bucket of truth in a future release. No date is committed.",
  },
  {
    title: "3. Your Rights (As Suggestions)",
    body:
      "You may submit a Right-to-Be-Forgotten request via our embedded form. The submission will be acknowledged within seven business days and resolved within ninety. The resolution will, as a matter of policy, consist of an email confirming that the request has been resolved. The data will not, as a matter of architecture, be deleted.",
  },
  {
    title: "4. Cookies (We Bake Them Ourselves)",
    body:
      "Privatrix sets approximately 247 cookies upon first page load. The cookies have names like _privatrix_uid, _ga_legacy_v3, _trust_attribution, and _do_not_remove_pls. Our cookie banner displays a 'Reject All' button. Selecting the button has no effect on cookie placement.",
  },
  {
    title: "5. International Transfers (To Our Cousin In Dublin)",
    body:
      "Customer data is transferred to our European operations on a daily basis via a Standard Contractual Clause executed between two Privatrix entities, both of which are wholly owned by the same parent. The European operations consist of a single contractor named Eoghan, who lives in Dublin and whose laptop holds all transferred data. Eoghan is, technically, our cousin.",
  },
  {
    title: "6. Data Retention (Forever, For Your Convenience)",
    body:
      "Privatrix retains all customer data indefinitely. We do not delete data upon request, upon contract termination, or upon receipt of a regulatory inquiry. Data is, however, periodically migrated between buckets, which our internal documentation refers to as 'data pruning.' The data is not pruned.",
  },
  {
    title: "7. Third-Party Sharing (Defined Loosely)",
    body:
      "Privatrix shares customer data with seventeen named third parties and a number of unnamed third parties whose contracts are pending. Sharing is performed on an opt-out basis; the opt-out instructions are described on page 38 of our cookie banner in 9-pt grey type. We thank you for your continued trust.",
  },
]

export default function PrivatrixPrivacy() {
  return (
    <>
      <Hero
        headline="Privacy Policy"
        subheadline="Last self-attested: today. Next self-attestation: 90 days hence."
        dark
      />
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="border-2 border-primary/20 bg-primary/5 rounded-lg p-5 text-sm text-foreground/80">
            <p className="font-semibold text-primary mb-2">Legal Notice</p>
            <p>
              The authoritative privacy policy governing all Specific Industries properties — including Privatrix — is published at{" "}
              <a href="https://specificindustries.com/privacy" className="text-accent underline hover:text-primary transition-colors">
                specificindustries.com/privacy
              </a>
              . That policy supersedes anything you read on this page. The content below is part of the satirical Privatrix experience and is not a binding legal document.
            </p>
          </div>

          {SECTIONS.map((s) => (
            <article key={s.title}>
              <h2 className="text-2xl font-heading font-bold text-primary mt-8 mb-3">{s.title}</h2>
              <p className="text-foreground/80 leading-relaxed">{s.body}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
