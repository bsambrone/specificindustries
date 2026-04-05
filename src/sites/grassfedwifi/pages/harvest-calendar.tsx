import { harvestCalendar } from "@/sites/grassfedwifi/data/harvest-calendar"
import { seasonalAddons } from "@/sites/grassfedwifi/data/seasonal-addons"

export const metadata = {
  title: "Harvest Calendar — Grass Fed WiFi",
  description: "A 12-month schedule of what signal is in season, with farmer notes and featured seasonal add-ons.",
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
              return (
                <div
                  key={month.month}
                  className="bg-background border border-primary/10 rounded-lg p-6 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-baseline justify-between mb-4">
                    <h3 className="text-2xl font-heading font-bold text-foreground">{month.name}</h3>
                    <span className="text-xs uppercase tracking-widest text-foreground/40">
                      Month {month.month}
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-foreground/50 mb-1">In Season</p>
                      <p className="text-foreground">{month.inSeason}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-foreground/50 mb-1">Pairs Well With</p>
                      <p className="text-foreground">{month.pairsWellWith}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-foreground/50 mb-1">Harvest Notes</p>
                      <p className="text-foreground/80 italic text-sm leading-relaxed">
                        &quot;{month.harvestNotes}&quot;
                      </p>
                    </div>
                    {addon && (
                      <div className="pt-3 mt-3 border-t border-primary/10">
                        <p className="text-xs uppercase tracking-wider text-primary font-semibold">
                          Featured Add-on
                        </p>
                        <p className="text-foreground font-medium">{addon.name}</p>
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
