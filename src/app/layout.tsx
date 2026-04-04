import type { Metadata } from "next"
import { headers } from "next/headers"
import "./globals.css"
import { getFontVariables, fontFamilyMap } from "@/themes/fonts"
import { siteRegistry } from "@/sites/registry"
import { themeToCSS } from "@/themes"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CartProvider } from "@/components/commerce/cart-provider"
import { ToastContainer } from "@/components/commerce/toast"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import { GoogleAnalytics } from "@/components/analytics/google-analytics"

export const metadata: Metadata = {
  title: "Specific Industries — Serving the World's Most Specific Industries",
  description: "We identify overlooked market segments and build dedicated brands to serve them.",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = await headers()
  const subdomain = headersList.get("x-subdomain") || "apex"
  const site = siteRegistry[subdomain]

  const themeStyle: Record<string, string> = {}
  if (site) {
    const cssVars = themeToCSS(site.config.theme)
    Object.assign(themeStyle, cssVars)

    const headingFont = fontFamilyMap[site.config.theme.fonts.heading]
    const bodyFont = fontFamilyMap[site.config.theme.fonts.body]
    if (headingFont) themeStyle["--font-heading"] = headingFont
    if (bodyFont) themeStyle["--font-body"] = bodyFont
  }

  const fontClasses = site
    ? getFontVariables(site.config.theme.fonts)
    : getFontVariables({ heading: "space-grotesk", body: "inter" })

  const content = (
    <>
      {site && <Header config={site.config} />}
      <main>{children}</main>
      {site && <Footer config={site.config} />}
    </>
  )

  const faviconPath = site ? `/sites/${site.config.subdomain}/favicon.png` : undefined

  return (
    <html lang="en" className={fontClasses}>
      <head>
        {faviconPath && <link rel="icon" href={faviconPath} />}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CreativeWork",
              "genre": "satire",
              "description": "Specific Industries is a satirical entertainment project featuring fictional brands and products.",
              "publisher": {
                "@type": "Organization",
                "name": "Specific Industries",
                "url": "https://specificindustries.com",
              },
            }),
          }}
        />
      </head>
      <body
        className="min-h-screen bg-background text-foreground font-body"
        style={themeStyle}
      >
        {site?.config.features.commerce ? (
          <CartProvider storageKey={`${site.config.subdomain}-cart`}>
            {content}
            <ToastContainer />
          </CartProvider>
        ) : (
          content
        )}
        <GoogleAnalytics gaId="G-024003Y5RD" />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
