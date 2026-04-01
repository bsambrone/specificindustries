"use client"

import { useState } from "react"
import Link from "next/link"
import type { SiteConfig } from "@/themes"
import { CartButton } from "@/components/commerce/cart-button"
import { useSiteLink } from "@/hooks/use-site-link"
import { MegaMenu, MegaMenuMobile } from "@/components/layout/mega-menu"

export function Header({ config }: { config: SiteConfig }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const siteHref = useSiteLink()

  return (
    <header className="border-b border-foreground/10 bg-background">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={siteHref("/")} className="text-xl font-heading font-bold text-foreground">
          {config.name}
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {config.megaMenu ? (
            <MegaMenu megaMenu={config.megaMenu} siteHref={siteHref} />
          ) : (
            config.nav.map((item) => {
              const isCtaButton = item.path.startsWith("/onboarding")
              return (
                <Link
                  key={item.path}
                  href={siteHref(item.path)}
                  className={
                    isCtaButton
                      ? "px-4 py-1.5 rounded-lg font-semibold bg-secondary text-primary hover:bg-accent transition-colors text-sm"
                      : "text-foreground/70 hover:text-foreground hover:bg-foreground/10 px-3 py-1.5 rounded-md transition-all"
                  }
                >
                  {item.label}
                </Link>
              )
            })
          )}
          {config.features.commerce && <CartButton />}
        </div>

        {/* Mobile hamburger + cart */}
        <div className="flex md:hidden items-center gap-4">
          {config.features.commerce && <CartButton />}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-foreground/70 hover:text-foreground"
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-foreground/10 bg-background">
          <div className="px-4 py-4 flex flex-col gap-4">
            {config.megaMenu ? (
              <MegaMenuMobile
                megaMenu={config.megaMenu}
                siteHref={siteHref}
                onNavigate={() => setMobileOpen(false)}
              />
            ) : (
              config.nav.map((item) => {
                const isCtaButton = item.path.startsWith("/onboarding")
                return (
                  <Link
                    key={item.path}
                    href={siteHref(item.path)}
                    onClick={() => setMobileOpen(false)}
                    className={
                      isCtaButton
                        ? "px-4 py-1.5 rounded-lg font-semibold bg-secondary text-primary hover:bg-accent transition-colors text-sm"
                        : "text-foreground/70 hover:text-foreground hover:bg-foreground/10 px-3 py-1.5 rounded-md transition-all"
                    }
                  >
                    {item.label}
                  </Link>
                )
              })
            )}
          </div>
        </div>
      )}
    </header>
  )
}
