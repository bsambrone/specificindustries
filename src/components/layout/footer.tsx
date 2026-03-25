import type { SiteConfig } from "@/themes"

export function Footer({ config }: { config: SiteConfig }) {
  return (
    <footer className="border-t border-primary/10 bg-background mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8 text-center text-foreground/50 text-sm">
        <p>&copy; {new Date().getFullYear()} {config.name}. A Specific Industries company.</p>
      </div>
    </footer>
  )
}
