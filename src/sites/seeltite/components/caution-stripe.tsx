interface CautionStripeProps {
  text?: string
  className?: string
}

export function CautionStripe({ text, className = "" }: CautionStripeProps) {
  const stripe =
    "repeating-linear-gradient(45deg, #F25C05 0 16px, #1A1A1A 16px 32px)"
  return (
    <div
      className={`w-full ${className}`}
      role="presentation"
    >
      <div className="h-6 w-full" style={{ background: stripe }} aria-hidden />
      {text && (
        <div className="bg-secondary text-background py-2 px-4 text-center tracking-[0.3em] text-xs uppercase font-heading">
          {text}
        </div>
      )}
      {text && (
        <div className="h-6 w-full" style={{ background: stripe }} aria-hidden />
      )}
    </div>
  )
}
