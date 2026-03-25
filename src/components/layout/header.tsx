import Link from "next/link"
import type { SiteConfig } from "@/themes"

export function Header({ config }: { config: SiteConfig }) {
  return (
    <header className="border-b border-primary/10 bg-background">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-heading font-bold text-primary">
          {config.name}
        </Link>
        <nav className="flex gap-6">
          {config.nav.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="text-foreground/70 hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
