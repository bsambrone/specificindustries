interface CertificationCardProps {
  title: string
  issuer: string
  year: string
  note?: string
}

export function CertificationCard({ title, issuer, year, note }: CertificationCardProps) {
  return (
    <div className="relative border-2 border-primary bg-background p-6 text-center">
      {/* Decorative corner marks (mimics a framed diploma) */}
      <span className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-accent" aria-hidden="true" />
      <span className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-accent" aria-hidden="true" />
      <span className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-accent" aria-hidden="true" />
      <span className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-accent" aria-hidden="true" />

      {/* Ornamental seal */}
      <div className="mx-auto mb-4 w-14 h-14 rounded-full border-2 border-accent bg-accent/10 flex items-center justify-center">
        <span className="text-accent font-heading font-bold text-xl tracking-widest">MS</span>
      </div>

      <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/50 mb-2">Certificate of</p>
      <h3 className="text-xl font-heading font-bold uppercase tracking-wide text-primary leading-tight mb-4">
        {title}
      </h3>
      <p className="text-sm text-foreground/70 italic mb-1">Issued by</p>
      <p className="text-sm font-semibold text-foreground mb-3">{issuer}</p>
      <p className="text-xs uppercase tracking-widest text-foreground/60">{year}</p>
      {note && (
        <p className="text-[11px] italic text-foreground/50 mt-3 border-t border-primary/10 pt-2">
          {note}
        </p>
      )}
    </div>
  )
}
