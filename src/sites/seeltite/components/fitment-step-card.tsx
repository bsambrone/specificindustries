import Image from "next/image"

interface FitmentStepCardProps {
  step: number
  title: string
  description: string
  image: string
  variant?: "full" | "compact"
}

export function FitmentStepCard({ step, title, description, image, variant = "full" }: FitmentStepCardProps) {
  const isCompact = variant === "compact"
  return (
    <article className={`border border-foreground/15 bg-background flex flex-col ${isCompact ? "p-4 gap-3" : "p-6 gap-5"}`}>
      <div className="flex items-center gap-4">
        <span className={`flex-shrink-0 inline-flex items-center justify-center bg-primary text-background font-heading font-bold ${isCompact ? "w-10 h-10 text-lg" : "w-14 h-14 text-2xl"}`}>
          {step}
        </span>
        <h3 className={`${isCompact ? "text-lg" : "text-2xl"} font-heading font-semibold leading-tight`}>{title}</h3>
      </div>
      <div className={`relative w-full ${isCompact ? "aspect-[4/3]" : "aspect-[5/3]"} bg-secondary/5`}>
        <Image src={image} alt={title} fill sizes={isCompact ? "(min-width: 768px) 25vw, 50vw" : "(min-width: 768px) 50vw, 100vw"} className="object-contain p-4" />
      </div>
      <p className={`text-foreground/80 leading-relaxed ${isCompact ? "text-sm" : ""}`}>{description}</p>
    </article>
  )
}
