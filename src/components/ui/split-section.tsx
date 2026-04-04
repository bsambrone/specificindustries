import Image from "next/image"

interface SplitSectionProps {
  image: string
  imagePosition?: "left" | "right"
  dark?: boolean
  imageClassName?: string
  priority?: boolean
  children: React.ReactNode
}

export function SplitSection({
  image,
  imagePosition = "left",
  dark = false,
  imageClassName,
  priority = false,
  children,
}: SplitSectionProps) {
  const imageBlock = (
    <div className="flex items-center justify-center">
      <Image
        src={image}
        alt=""
        width={1024}
        height={1536}
        className={imageClassName || "max-h-[500px] w-auto h-auto"}
        priority={priority}
        fetchPriority={priority ? "high" : undefined}
      />
    </div>
  )

  const textBlock = (
    <div
      className={`flex flex-col justify-center ${
        dark ? "text-white" : "text-foreground"
      }`}
    >
      {children}
    </div>
  )

  return (
    <section className={`py-12 md:py-16 px-4 ${dark ? "bg-primary" : "bg-secondary/10"}`}>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
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
      </div>
    </section>
  )
}
