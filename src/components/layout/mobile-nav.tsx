"use client"

import { useState } from "react"
import Link from "next/link"
import { MegaMenuMobile, type ResolvedMegaMenu } from "./mega-menu"

export interface ResolvedNavItem {
  label: string
  href: string
  isCtaButton: boolean
}

export function MobileNav({
  resolvedNav,
  resolvedMegaMenu,
}: {
  resolvedNav: ResolvedNavItem[]
  resolvedMegaMenu?: ResolvedMegaMenu
}) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
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

      {mobileOpen && (
        <div className="absolute left-0 right-0 top-full md:hidden border-t border-foreground/10 bg-background z-50">
          <div className="px-4 py-4 flex flex-col gap-4">
            {resolvedMegaMenu ? (
              <MegaMenuMobile
                megaMenu={resolvedMegaMenu}
                onNavigate={() => setMobileOpen(false)}
              />
            ) : (
              resolvedNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={
                    item.isCtaButton
                      ? "px-4 py-1.5 rounded-lg font-semibold bg-secondary text-primary hover:bg-accent transition-colors text-sm"
                      : "text-foreground/70 hover:text-foreground hover:bg-foreground/10 px-3 py-1.5 rounded-md transition-all"
                  }
                >
                  {item.label}
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </>
  )
}
