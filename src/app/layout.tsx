import type { Metadata } from "next"
import { headers } from "next/headers"
import "./globals.css"
import { fontVariables } from "@/themes/fonts"
import { siteRegistry } from "@/sites/registry"
import { themeToCSS } from "@/themes"
import { fontFamilyMap } from "@/themes/fonts"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export const metadata: Metadata = {
  title: "Specific Industries",
  description: "Specific Industries — Very Specific Products",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = await headers()
  const subdomain = headersList.get("x-subdomain") || "apex"
  const site = siteRegistry[subdomain]

  // Build theme CSS variables
  const themeStyle: Record<string, string> = {}
  if (site) {
    const cssVars = themeToCSS(site.config.theme)
    Object.assign(themeStyle, cssVars)

    // Resolve font keys to CSS font-family values
    const headingFont = fontFamilyMap[site.config.theme.fonts.heading]
    const bodyFont = fontFamilyMap[site.config.theme.fonts.body]
    if (headingFont) themeStyle["--font-heading"] = headingFont
    if (bodyFont) themeStyle["--font-body"] = bodyFont
  }

  return (
    <html lang="en" className={fontVariables}>
      <body
        className="min-h-screen bg-background text-foreground font-body"
        style={themeStyle}
      >
        {site && <Header config={site.config} />}
        <main>{children}</main>
        {site && <Footer config={site.config} />}
      </body>
    </html>
  )
}
