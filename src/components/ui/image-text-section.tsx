import Image from "next/image"

interface ImageTextSectionProps {
  image: string
  title: string
  description: string
  imagePosition?: "left" | "right"
  imageClassName?: string
  imageAspect?: string
}

export function ImageTextSection({ image, title, description, imagePosition = "left", imageClassName, imageAspect }: ImageTextSectionProps) {
  const imageBlock = (
    <div className={`relative ${imageAspect || "aspect-[4/3]"} rounded-lg overflow-hidden bg-secondary/10`}>
      <Image src={image} alt={title} fill className={imageClassName || "object-cover"} />
    </div>
  )

  const textBlock = (
    <div className="flex flex-col justify-center">
      <h3 className="text-2xl font-heading font-bold text-primary mb-4">{title}</h3>
      <p className="text-foreground/70 leading-relaxed">{description}</p>
    </div>
  )

  return (
    <section className="py-12 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {imagePosition === "left" ? (
          <>{imageBlock}{textBlock}</>
        ) : (
          <>{textBlock}{imageBlock}</>
        )}
      </div>
    </section>
  )
}
