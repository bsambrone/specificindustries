import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "Contact — The Theory Is Real",
  description: "Reach the outlet. If you can.",
}

export default function Contact() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <p className="font-heading text-xs uppercase tracking-[0.3em] text-accent">INTAKE</p>
      <h1 className="mt-2 font-heading text-4xl text-primary">Contact</h1>
      <p className="mt-6 font-body text-base text-text/85">
        We do not maintain a phone line. Email is not secure and we do not treat it as such. If you have
        observations to submit, please use one of the channels below, in descending order of confidence.
      </p>
      <dl className="mt-8 space-y-5">
        <div>
          <dt className="font-heading text-xs uppercase tracking-widest text-accent">Paper Mail</dt>
          <dd className="mt-1 font-body text-sm text-text/90">
            P.O. Box 11471 · Flagstaff, AZ 86011-1471 · USA<br />
            Do not use return address.
          </dd>
        </div>
        <div>
          <dt className="font-heading text-xs uppercase tracking-widest text-accent">Encrypted Mail (PGP)</dt>
          <dd className="mt-1 font-body text-sm text-text/90">
            Fingerprint: <code className="font-heading text-primary">0x4714 · FAKE · DO-NOT · USE-ANYWAY · 1138</code>
          </dd>
        </div>
        <div>
          <dt className="font-heading text-xs uppercase tracking-widest text-accent">In Person</dt>
          <dd className="mt-1 font-body text-sm text-text/90">
            We will find you.
          </dd>
        </div>
      </dl>
      <p className="mt-10 font-body text-sm italic text-text/60">
        Response times vary. We read everything. We respond to almost nothing. Please do not take this personally.
      </p>
    </main>
  )
}
