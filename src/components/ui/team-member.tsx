import Image from "next/image"

interface TeamMemberProps {
  image: string
  name: string
  title: string
  bio: string
}

export function TeamMember({ image, name, title, bio }: TeamMemberProps) {
  return (
    <div className="text-center">
      <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden bg-secondary/20 flex items-center justify-center">
        <Image src={image} alt={name} fill className="object-cover object-top" />
      </div>
      <h3 className="text-xl font-heading font-semibold text-primary">{name}</h3>
      <p className="text-sm text-foreground/60 mb-2">{title}</p>
      <p className="text-foreground/70 text-sm">{bio}</p>
    </div>
  )
}
