import Link from "next/link"
import { shares } from "@/sites/grassfedwifi/data/shares"
import { getSiteHref } from "@/lib/site-href"

export const metadata = {
  title: "Join the Co-op — Grass Fed WiFi",
  description: "Three shares. Allocated seasonally. Begin your membership today.",
}

export default async function Join() {
  const siteHref = await getSiteHref()
  return (
    <>
      <section className="py-20 px-4 bg-accent/20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-heading font-bold text-foreground mb-4">Join the Co-op</h1>
          <p className="text-xl text-foreground/70 leading-relaxed">
            The committee reviews new memberships weekly. Select the share that feels right, and the
            co-op will allocate your first harvest within thirty days of approval.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-foreground mb-6 text-center">
            Choose Your Share
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {shares.map((share) => (
              <Link
                key={share.slug}
                href={siteHref(`/shares/${share.slug}`)}
                className="block p-6 bg-secondary/10 rounded-lg hover:bg-secondary/20 transition-colors"
              >
                <h3 className="text-xl font-heading font-bold text-foreground mb-2">{share.name}</h3>
                <p className="text-2xl font-bold text-primary mb-3">{share.priceLabel}</p>
                <p className="text-sm text-foreground/70 leading-relaxed">{share.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-secondary/10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-heading font-bold text-foreground mb-4">How Allocation Works</h2>
          <div className="text-left space-y-4 text-foreground/80 leading-relaxed">
            <p>
              <strong className="text-foreground">1. Select your share.</strong> All new members begin
              with the Heirloom Share unless the committee decides otherwise.
            </p>
            <p>
              <strong className="text-foreground">2. The committee reviews your application.</strong> New
              memberships are reviewed weekly in the co-op barn. Decisions are communicated by letter.
            </p>
            <p>
              <strong className="text-foreground">3. Your first harvest is allocated.</strong> Within
              thirty days of approval, Fennel will write your allocation into the ledger and your signal
              will begin arriving.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
