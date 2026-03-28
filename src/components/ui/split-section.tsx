import Image from "next/image"

interface SplitSectionProps {
  image: string
  imagePosition?: "left" | "right"
  dark?: boolean
  children: React.ReactNode
}

export function SplitSection({
  image,
  imagePosition = "left",
  dark = false,
  children,
}: SplitSectionProps) {
  const imageBlock = (
    <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[400px]">
      <Image src={image} alt="" fill className="object-cover" />
    </div>
  )

  const textBlock = (
    <div
      className={`flex flex-col justify-center p-8 md:p-12 lg:p-16 ${
        dark ? "bg-primary text-white" : "bg-background text-foreground"
      }`}
    >
      {children}
    </div>
  )

  return (
    <section className="grid grid-cols-1 md:grid-cols-2">
      {imagePosition === "left" ? (
        <>
          {imageBlock}
          {textBlock}
        </>
      ) : (
        <>
          {textBlock}
          {imageBlock}
        </>
      )}
    </section>
  )
}
