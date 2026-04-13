import Image from "next/image"
import { TickerStrip } from "@/sites/rocks/components/ticker-strip"
import { TerminalHeading } from "@/sites/rocks/components/terminal-heading"

export const metadata = {
  title: "VAULT TOUR — ROCKS",
  description: "Inside our Class III bedrock custody facility. Undisclosed location.",
}

const galleryImages = [
  {
    src: "/sites/rocks/vault-pallet.png",
    caption: "FIG. 1 — INDIVIDUAL UNITS PALLETIZED AND SERIAL-TAGGED FOR AUDIT TRACEABILITY.",
  },
  {
    src: "/sites/rocks/vault-security.png",
    caption: "FIG. 2 — ON-SITE CUSTODY OFFICER CONDUCTING QUARTERLY UNIT-LEVEL INVENTORY RECONCILIATION.",
  },
  {
    src: "/sites/rocks/vault-padlock.png",
    caption: "FIG. 3 — MECHANICAL ACCESS CONTROL LAYER (RATED CLASS III). KEY HELD BY CUSTODY OFFICER.",
  },
  {
    src: "/sites/rocks/contact-office.png",
    caption: "FIG. 4 — SUPERVISORY DESK. ACCESS LOG VERIFIED AGAINST CLIENT HOLDING REGISTER.",
  },
]

const attestationRows = [
  { id: "C-0001", hash: "0x4A9B8C21…", audit: "2026-03-01", status: "VERIFIED" },
  { id: "C-0002", hash: "0x7D0E1F44…", audit: "2026-03-01", status: "VERIFIED" },
  { id: "C-0003", hash: "0x22BA9C08…", audit: "2026-03-01", status: "VERIFIED" },
  { id: "C-0004", hash: "0x1FA0D3E6…", audit: "2026-03-01", status: "VERIFIED" },
  { id: "C-0005", hash: "0x9E5C28B1…", audit: "2026-02-29", status: "PARTIAL" },
]

export default function RocksVaultTour() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[440px] md:min-h-[520px] flex items-end border-b border-primary/30">
        <Image
          src="/sites/rocks/vault-hero.png"
          alt=""
          fill
          className="object-cover brightness-[0.45]"
          priority
          fetchPriority="high"
        />
        <div className="relative z-10 max-w-5xl mx-auto px-4 py-10 w-full">
          <p className="text-accent text-xs uppercase tracking-widest mb-2">▸ VAULT TOUR</p>
          <h1 className="text-3xl md:text-5xl font-heading font-semibold uppercase tracking-wide text-primary leading-tight">
            CLASS III BEDROCK STORAGE FACILITY
          </h1>
          <p className="text-primary/70 mt-3 uppercase text-sm tracking-wide">
            UNDISCLOSED LOCATION · 24/7 MONITORED ACCESS · SEGREGATED CUSTODY
          </p>
        </div>
      </section>

      <TickerStrip />

      {/* Intro */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <TerminalHeading level={2} className="mb-6">CUSTODY OPERATIONS</TerminalHeading>
          <div className="space-y-4 text-primary/80 text-sm md:text-base leading-relaxed">
            <p>
              Client positions are held in segregated custody at our Class III facility, located at an undisclosed
              inland site. All instruments are tagged at intake, assigned a unique custody identifier, and stored on
              palletized racking in climate-ambient conditions.
            </p>
            <p>
              Physical access to the facility is restricted to the designated custody officer, who maintains a daily
              access log reconciled against the client holdings register on a quarterly basis. No client has ever been
              granted on-site access, which our compliance team considers a feature.
            </p>
            <p>
              Facility attestation is performed internally. External auditors have not been engaged. This disclosure
              should be considered exhaustive.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-12 px-4 bg-secondary/20 border-y border-primary/20">
        <div className="max-w-5xl mx-auto">
          <TerminalHeading level={2} className="mb-6">FACILITY DOCUMENTATION</TerminalHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {galleryImages.map((img) => (
              <figure key={img.src} className="border border-primary/30 bg-background">
                <div className="relative aspect-[4/3]">
                  <Image src={img.src} alt="" fill className="object-cover" />
                </div>
                <figcaption className="px-4 py-3 text-xs uppercase tracking-wide text-primary/70 border-t border-primary/20">
                  {img.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Attestation */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <TerminalHeading level={2} className="mb-6">ATTESTATION LEDGER</TerminalHeading>
          <p className="text-primary/60 text-sm uppercase tracking-wide mb-4">
            MOST RECENT 5 ENTRIES. FULL LEDGER AVAILABLE UPON WRITTEN REQUEST (REQUESTS NOT RESPONDED TO).
          </p>
          <div className="border border-primary/30 bg-secondary/20">
            <table className="w-full text-sm tabular-nums">
              <thead className="bg-secondary text-primary uppercase text-xs tracking-wide border-b border-primary/30">
                <tr>
                  <th className="text-left px-4 py-3">CLIENT ID</th>
                  <th className="text-left px-4 py-3">ASSET HASH</th>
                  <th className="text-left px-4 py-3">LAST AUDIT</th>
                  <th className="text-left px-4 py-3">STATUS</th>
                </tr>
              </thead>
              <tbody className="text-primary/90">
                {attestationRows.map((row, i) => (
                  <tr key={row.id} className={i % 2 === 0 ? "bg-background" : "bg-secondary/40"}>
                    <td className="px-4 py-3 font-semibold">{row.id}</td>
                    <td className="px-4 py-3">{row.hash}</td>
                    <td className="px-4 py-3">{row.audit}</td>
                    <td className={`px-4 py-3 ${row.status === "VERIFIED" ? "text-accent" : "text-primary/60"}`}>
                      {row.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-primary/40 mt-4 uppercase tracking-wide">
            LEDGER ENTRIES ARE SELF-REPORTED AND UNVERIFIED. CHECKSUMS ARE ILLUSTRATIVE.
          </p>
        </div>
      </section>
    </>
  )
}
