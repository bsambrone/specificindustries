"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import type { MegaMenuConfig, MegaMenuItem } from "@/themes"

// Chevron icon that rotates when open
function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  )
}

// Full-width 2-column grid mega panel
function MegaPanel({
  item,
  siteHref,
  onClose,
}: {
  item: MegaMenuItem
  siteHref: (path: string) => string
  onClose: () => void
}) {
  return (
    <div className="animate-fade-in absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[800px] bg-background border border-primary/15 rounded-lg shadow-lg z-50 p-6">
      <div className="grid grid-cols-2 gap-4">
        {item.children?.map((child) => (
          <Link
            key={child.path}
            href={siteHref(child.path)}
            onClick={onClose}
            className="group flex items-start gap-3 p-3 rounded-md hover:bg-primary/5 transition-colors"
          >
            {child.icon && (
              <span className="text-xl shrink-0 mt-0.5">{child.icon}</span>
            )}
            <div>
              <div className="font-medium text-foreground group-hover:text-accent transition-colors">
                {child.label}
              </div>
              {child.description && (
                <div className="text-sm text-foreground/60 mt-0.5">{child.description}</div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

// Simple vertical dropdown panel
function DropdownPanel({
  item,
  siteHref,
  onClose,
}: {
  item: MegaMenuItem
  siteHref: (path: string) => string
  onClose: () => void
}) {
  return (
    <div className="animate-fade-in absolute left-0 top-full mt-2 w-56 bg-background border border-primary/15 rounded-lg shadow-lg z-50 py-2">
      {item.children?.map((child) => (
        <Link
          key={child.path}
          href={siteHref(child.path)}
          onClick={onClose}
          className="block px-4 py-2 text-foreground/80 hover:text-foreground hover:bg-primary/5 transition-colors"
        >
          {child.label}
        </Link>
      ))}
    </div>
  )
}

// Desktop mega menu
export function MegaMenu({
  megaMenu,
  siteHref,
}: {
  megaMenu: MegaMenuConfig
  siteHref: (path: string) => string
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpenIndex(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={containerRef} className="flex items-center gap-1">
      {megaMenu.items.map((item, index) => {
        const isOpen = openIndex === index
        const hasChildren = !!item.children?.length

        if (!hasChildren && item.path) {
          return (
            <Link
              key={item.label}
              href={siteHref(item.path)}
              className="text-foreground/70 hover:text-foreground hover:bg-primary/10 px-3 py-1.5 rounded-md transition-all"
            >
              {item.label}
            </Link>
          )
        }

        return (
          <div key={item.label} className="relative">
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex items-center gap-1.5 text-foreground/70 hover:text-foreground hover:bg-primary/10 px-3 py-1.5 rounded-md transition-all"
            >
              {item.label}
              <ChevronDown open={isOpen} />
            </button>

            {isOpen && item.style === "mega" && (
              <MegaPanel item={item} siteHref={siteHref} onClose={() => setOpenIndex(null)} />
            )}
            {isOpen && item.style !== "mega" && (
              <DropdownPanel item={item} siteHref={siteHref} onClose={() => setOpenIndex(null)} />
            )}
          </div>
        )
      })}
    </div>
  )
}

// Mobile accordion mega menu
export function MegaMenuMobile({
  megaMenu,
  siteHref,
  onNavigate,
}: {
  megaMenu: MegaMenuConfig
  siteHref: (path: string) => string
  onNavigate: () => void
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="flex flex-col gap-1">
      {megaMenu.items.map((item, index) => {
        const isOpen = openIndex === index
        const hasChildren = !!item.children?.length

        if (!hasChildren && item.path) {
          return (
            <Link
              key={item.label}
              href={siteHref(item.path)}
              onClick={onNavigate}
              className="text-foreground/70 hover:text-foreground hover:bg-primary/10 px-3 py-1.5 rounded-md transition-all"
            >
              {item.label}
            </Link>
          )
        }

        return (
          <div key={item.label}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-center justify-between text-foreground/70 hover:text-foreground hover:bg-primary/10 px-3 py-1.5 rounded-md transition-all"
            >
              {item.label}
              <ChevronDown open={isOpen} />
            </button>

            {isOpen && (
              <div className="mt-1 ml-3 flex flex-col gap-1 border-l-2 border-primary/15 pl-3">
                {item.children?.map((child) => (
                  <Link
                    key={child.path}
                    href={siteHref(child.path)}
                    onClick={onNavigate}
                    className="text-foreground/60 hover:text-foreground hover:bg-primary/5 px-3 py-1.5 rounded-md transition-all"
                  >
                    <span className="font-medium">{child.label}</span>
                    {child.description && (
                      <span className="block text-xs text-foreground/50 mt-0.5">{child.description}</span>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
