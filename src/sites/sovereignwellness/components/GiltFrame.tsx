import Image from "next/image"

interface GiltFrameProps {
  src: string
  alt: string
  name: string
  title: string
}

export function GiltFrame({ src, alt, name, title }: GiltFrameProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="p-2 bg-gradient-to-br from-[#B08C3A] to-[#8A6B2A] shadow-lg">
        <div className="p-1 bg-[#4A3A1A]">
          <div className="relative w-full aspect-[3/4] overflow-hidden">
            <Image src={src} alt={alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </div>
      <div className="mt-4 bg-[#4A3A1A] text-[#F5ECD7] px-5 py-2 text-center border border-[#B08C3A]">
        <p className="font-heading text-lg leading-tight">{name}</p>
        <p className="text-[10px] tracking-[0.25em] uppercase text-[#B08C3A] mt-1">{title}</p>
      </div>
    </div>
  )
}
