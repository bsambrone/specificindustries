import Image from "next/image"

interface AuthorBioProps {
  name: string
  title: string
  bio: string
  image: string
}

export function AuthorBio({ name, title, bio, image }: AuthorBioProps) {
  return (
    <section className="py-16 px-4 bg-secondary/20">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-6">
          About the Author
        </p>
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="shrink-0">
            <div className="relative w-20 h-20 rounded-full overflow-hidden ring-2 ring-primary/10">
              <Image src={image} alt={name} fill className="object-cover object-top" />
            </div>
          </div>
          <div>
            <h3 className="font-heading font-semibold text-foreground text-lg">{name}</h3>
            <p className="text-sm text-foreground/60 mb-3">{title}</p>
            <p className="text-foreground/70 leading-relaxed">{bio}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
