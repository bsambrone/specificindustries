interface FounderLetterProps {
  recipient?: string
  body: string[]
  signatureName: string
  signatureTitle: string
}

export function FounderLetter({
  recipient,
  body,
  signatureName,
  signatureTitle,
}: FounderLetterProps) {
  return (
    <div className="relative mx-auto max-w-3xl rounded border-2 border-secondary/30 bg-background px-8 py-12 shadow-lg md:px-16 md:py-16">
      <div className="pointer-events-none absolute inset-0 rounded opacity-[0.04] mix-blend-multiply [background-image:repeating-linear-gradient(0deg,transparent_0,transparent_23px,var(--color-text)_23px,var(--color-text)_24px)]" />
      <div className="relative">
        {recipient && (
          <p className="mb-8 font-heading text-sm uppercase tracking-widest text-secondary">
            {recipient}
          </p>
        )}
        <div className="space-y-5 text-lg leading-relaxed text-foreground">
          {body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-12 border-t border-secondary/20 pt-6">
          <p className="font-heading text-2xl italic text-secondary">{signatureName}</p>
          <p className="mt-1 text-sm text-foreground/70">{signatureTitle}</p>
        </div>
      </div>
    </div>
  )
}
