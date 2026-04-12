"use client"

import { useState } from "react"
import { useSiteHrefClient } from "@/lib/site-href-client"
import { pans, type Pan } from "../data/pans"
import { PanCard } from "../components/PanCard"
import { ToastContainer } from "../components/Toast"

const TAGS = ["All", ...Array.from(new Set(pans.map((p) => p.audienceTag)))]

export default function OnlyPansBrowse() {
  const siteHref = useSiteHrefClient()
  const [activeTag, setActiveTag] = useState("All")

  const visible: Pan[] = activeTag === "All" ? pans : pans.filter((p) => p.audienceTag === activeTag)

  return (
    <>
      <ToastContainer />
      <section className="bg-[#FFF6ED]">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#1C0F05]">Meet the Pans</h1>
            <p className="mt-3 text-[#7C2D12]/80 max-w-2xl mx-auto">
              Eight creators currently on the platform. Each one sits perfectly still in their own particular way.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
                  activeTag === tag
                    ? "bg-[#C2410C] text-white"
                    : "bg-white text-[#7C2D12] border border-[#C2410C]/20 hover:bg-[#FDE68A]/40"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visible.map((pan) => (
              <PanCard key={pan.slug} pan={pan} siteHref={siteHref} />
            ))}
          </div>

          {visible.length === 0 && (
            <p className="mt-8 text-center text-[#7C2D12]/70">No pans match that filter.</p>
          )}
        </div>
      </section>
    </>
  )
}

export const metadata = {
  title: "Meet the Pans — Only Pans",
  description: "Browse our roster of 8 pan creators. Cast iron, copper, non-stick, and more — there is a pan for every kitchen.",
}
