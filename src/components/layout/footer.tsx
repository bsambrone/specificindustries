"use client"

import Link from "next/link"
import type { SiteConfig } from "@/themes"
import { useSiteLink } from "@/hooks/use-site-link"

const APEX_URL = "https://specificindustries.com"

export function Footer({ config }: { config: SiteConfig }) {
  const siteHref = useSiteLink()
  const isApex = config.subdomain === "apex"

  return (
    <footer className="border-t border-primary/10 bg-background mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8 text-center text-foreground/50 text-sm space-y-3">
        {isApex ? (
          <p>&copy; {new Date().getFullYear()} Specific Industries.</p>
        ) : (
          <p>&copy; {new Date().getFullYear()} {config.name}. A{" "}
            <a
              href={APEX_URL}
              className="underline hover:text-foreground transition-colors"
            >
              Specific Industries
            </a>{" "}
            company.
          </p>
        )}
        <div className="flex flex-wrap justify-center gap-4">
          <Link href={siteHref("/privacy")} className="hover:text-foreground transition-colors underline">
            Privacy Policy
          </Link>
          <span>|</span>
          <Link href={siteHref("/terms")} className="hover:text-foreground transition-colors underline">
            Terms of Use
          </Link>
          {!isApex && (
            <>
              <span>|</span>
              <a
                href={`${APEX_URL}/disclaimer`}
                className="hover:text-foreground transition-colors underline"
              >
                Disclaimer
              </a>
            </>
          )}
        </div>
      </div>
    </footer>
  )
}
