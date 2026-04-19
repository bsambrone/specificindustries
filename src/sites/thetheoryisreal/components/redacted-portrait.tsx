// src/sites/thetheoryisreal/components/redacted-portrait.tsx
import Image from "next/image"

export function RedactedPortrait({
  src,
  alt,
  severity = "heavy",
}: {
  src: string
  alt: string
  severity?: "light" | "heavy"
}) {
  // Eye bar occupies roughly 36-52% vertical in a headshot.
  const barStyle =
    severity === "heavy"
      ? { top: "34%", height: "20%" }
      : { top: "36%", height: "14%" }

  return (
    <div className="relative aspect-square w-full overflow-hidden border border-primary/40 grayscale contrast-125">
      <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 320px" />
      <div
        className="absolute left-0 w-full bg-black"
        style={barStyle}
        aria-hidden="true"
      />
      {severity === "heavy" && (
        <div
          className="absolute left-[10%] bg-black"
          style={{ top: "66%", width: "40%", height: "8%" }}
          aria-hidden="true"
        />
      )}
    </div>
  )
}
