import Image from "next/image"
import { harvestCalendar } from "@/sites/grassfedwifi/data/harvest-calendar"
import { seasonalAddons } from "@/sites/grassfedwifi/data/seasonal-addons"

export const metadata = {
  title: "Harvest Calendar — Grass Fed WiFi",
  description: "A 12-month schedule of what signal is in season, with farmer notes and featured seasonal add-ons.",
}

// Map each month's featured add-on slug to the corresponding seasonal image
const seasonalImageFor = (slug: string | undefined): string => {
  switch (slug) {
    case "spring-pollen":
      return "/sites/grassfedwifi/seasonal-spring.png"
    case "summer-solstice":
      return "/sites/grassfedwifi/seasonal-summer.png"
    case "harvest-moon":
      return "/sites/grassfedwifi/seasonal-harvest.png"
    case "winter-reserve":
    default:
      return "/sites/grassfedwifi/seasonal-winter.png"
  }
}

export default function HarvestCalendar() {
  return (
    <>
      <section className="py-20 px-4 bg-secondary/10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-heading font-bold text-foreground mb-4">The Harvest Calendar</h1>
          <p className="text-xl text-foreground/70 leading-relaxed">
            Every month, the co-op harvests a different signal. Here is what to expect, when to expect it,
            and what each month pairs well with.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {harvestCalendar.map((month) => {
              const addon = month.featuredAddonSlug
                ? seasonalAddons.find((a) => a.slug === month.featuredAddonSlug)
                : null
              const bgImage = seasonalImageFor(month.featuredAddonSlug)
              return (
                <div
                  key={month.month}
                  className="relative rounded-lg overflow-hidden min-h-[360px] group"
                >
                  {/* Background image */}
                  <Image
                    src={bgImage}
                    alt=""
                    fill
                    className="object-cover"
                  />
                  {/* Dark overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
                  {/* Content */}
                  <div className="relative p-6 h-full flex flex-col">
                    <div className="flex items-baseline justify-between mb-4">
                      <h3 className="text-2xl font-heading font-bold text-white">{month.name}</h3>
                      <span className="text-xs uppercase tracking-widest text-white/60">
                        Month {month.month}
                      </span>
                    </div>
                    <div className="space-y-3 flex-1">
                      <div>
                        <p className="text-xs uppercase tracking-wider text-white/60 mb-1">In Season</p>
                        <p className="text-white">{month.inSeason}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-white/60 mb-1">Pairs Well With</p>
                        <p className="text-white">{month.pairsWellWith}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-white/60 mb-1">Harvest Notes</p>
                        <p className="text-white/90 italic text-sm leading-relaxed">
                          &quot;{month.harvestNotes}&quot;
                        </p>
                      </div>
                    </div>
                    {addon && (
                      <div className="pt-3 mt-3 border-t border-white/20">
                        <p className="text-xs uppercase tracking-wider text-accent font-semibold">
                          Featured Add-on
                        </p>
                        <p className="text-white font-medium">{addon.name}</p>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
