import Image from "next/image"

interface PigStat {
  label: string
  value: string
}

interface PigProfileProps {
  image: string
  name: string
  bio: string
  stats: PigStat[]
}

export function PigProfile({ image, name, bio, stats }: PigProfileProps) {
  return (
    <div className="border border-primary/10 rounded-lg overflow-hidden">
      <div className="relative aspect-square bg-secondary/10">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-heading font-semibold text-primary mb-1">{name}</h3>
        <p className="text-foreground/70 text-sm mb-3">{bio}</p>
        <div className="border-t border-primary/10 pt-3 space-y-1">
          {stats.map((stat) => (
            <div key={stat.label} className="flex justify-between text-sm">
              <span className="text-foreground/50">{stat.label}</span>
              <span className="text-foreground/80 font-medium">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
