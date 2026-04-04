import Link from "next/link"
import type { SiteConfig } from "@/themes"
import { CartButton } from "@/components/commerce/cart-button"
import { getSiteHref } from "@/lib/site-href"
import { MegaMenu, type ResolvedMegaMenu } from "@/components/layout/mega-menu"
import { MobileNav, type ResolvedNavItem } from "@/components/layout/mobile-nav"

export async function Header({ config }: { config: SiteConfig }) {
  const siteHref = await getSiteHref()
  const homeHref = siteHref("/")
  const cartHref = siteHref("/cart")

  const resolvedNav: ResolvedNavItem[] = config.nav.map((item) => ({
    label: item.label,
    href: siteHref(item.path),
    isCtaButton: item.path.startsWith("/onboarding"),
  }))

  const resolvedMegaMenu: ResolvedMegaMenu | undefined = config.megaMenu
    ? {
        items: config.megaMenu.items.map((item) => ({
          label: item.label,
          href: item.path ? siteHref(item.path) : undefined,
          style: item.style,
          children: item.children?.map((child) => ({
            label: child.label,
            href: siteHref(child.path),
            description: child.description,
            icon: child.icon,
          })),
        })),
      }
    : undefined

  return (
    <header className="relative border-b border-foreground/10 bg-background">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={homeHref} className="text-xl font-heading font-bold text-foreground">
          {config.name}
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {resolvedMegaMenu ? (
            <MegaMenu megaMenu={resolvedMegaMenu} />
          ) : (
            resolvedNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
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
          {config.features.commerce && <CartButton href={cartHref} />}
        </div>

        {/* Mobile hamburger + cart */}
        <div className="flex md:hidden items-center gap-4">
          {config.features.commerce && <CartButton href={cartHref} />}
          <MobileNav resolvedNav={resolvedNav} resolvedMegaMenu={resolvedMegaMenu} />
        </div>
      </div>
    </header>
  )
}
