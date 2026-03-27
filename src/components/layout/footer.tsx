"use client"

import Link from "next/link"
import type { SiteConfig } from "@/themes"
import { useSiteLink } from "@/hooks/use-site-link"

export function Footer({ config }: { config: SiteConfig }) {
  const siteHref = useSiteLink()

  return (
    <footer className="border-t border-primary/10 bg-background mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8 text-center text-foreground/50 text-sm space-y-3">
        <p>&copy; {new Date().getFullYear()} {config.name}. A Specific Industries company.</p>
        <div className="flex justify-center gap-4">
          <Link href={siteHref("/privacy")} className="hover:text-foreground transition-colors underline">
            Privacy Policy
          </Link>
          <span>|</span>
          <Link href={siteHref("/terms")} className="hover:text-foreground transition-colors underline">
            Terms of Use
          </Link>
        </div>
      </div>
    </footer>
  )
}
