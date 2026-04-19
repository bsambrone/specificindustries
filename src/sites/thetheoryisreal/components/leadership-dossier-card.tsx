// src/sites/thetheoryisreal/components/leadership-dossier-card.tsx
import type { LeaderDossier } from "../types"
import { RedactedPortrait } from "./redacted-portrait"
import { DocumentCard } from "./document-card"

const STATUS_COLORS: Record<LeaderDossier["statusTag"], string> = {
  ACTIVE: "text-secondary border-secondary",
  "DEEP COVER": "text-primary/80 border-primary/60",
  COMPROMISED: "text-accent border-accent",
  UNREACHABLE: "text-text/40 border-text/30",
}

export function LeadershipDossierCard({
  dossier,
  codename,
  index,
}: {
  dossier: LeaderDossier
  codename: string
  index: number
}) {
  return (
    <DocumentCard fileNumber={`2026-${String(index + 1).padStart(4, "0")}`}>
      <RedactedPortrait src={dossier.blurredPhoto} alt={`Redacted portrait of ${codename}`} />
      <div className="mt-4 flex items-center justify-between">
        <h3 className="font-heading text-lg text-primary">
          SUBJECT {dossier.id.split("-")[1]} — {codename}
        </h3>
        <span
          className={`border px-2 py-0.5 font-heading text-[0.6rem] uppercase tracking-widest ${STATUS_COLORS[dossier.statusTag]}`}
        >
          {dossier.statusTag}
        </span>
      </div>
      <p className="mt-2 font-heading text-[0.75rem] uppercase tracking-wider text-primary/70">
        {dossier.expertise}
      </p>
      <p className="mt-4 font-body text-sm leading-relaxed text-text/85">{dossier.biography}</p>
    </DocumentCard>
  )
}
