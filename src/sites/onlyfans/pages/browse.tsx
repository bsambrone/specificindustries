"use client"

import { useState } from "react"
import { useSiteHrefClient } from "@/lib/site-href-client"
import { fans, type Fan } from "../data/fans"
import { FanCard } from "../components/FanCard"
import { ToastContainer } from "../components/Toast"

const TAGS = ["All", ...Array.from(new Set(fans.map((f) => f.audienceTag)))]

export default function OnlyFansBrowse() {
  const siteHref = useSiteHrefClient()
  const [activeTag, setActiveTag] = useState("All")

  const visible: Fan[] = activeTag === "All" ? fans : fans.filter((f) => f.audienceTag === activeTag)

  return (
    <>
      <ToastContainer />
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#0F172A]">Meet the Fans</h1>
            <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
              Eight creators currently on the platform. Each one has a different airflow personality. Find the one that fits your home.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
                  activeTag === tag
                    ? "bg-[#00AFF0] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visible.map((fan) => (
              <FanCard key={fan.slug} fan={fan} siteHref={siteHref} />
            ))}
          </div>

          {visible.length === 0 && (
            <p className="mt-8 text-center text-slate-500">No fans match that filter.</p>
          )}
        </div>
      </section>
    </>
  )
}

export const metadata = {
  title: "Meet the Fans — OnlyFans",
  description: "Browse our roster of 8 fan creators. Box fans, ceiling fans, industrial wind tunnels — there's a fan for every home.",
}
