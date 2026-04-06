import Image from "next/image"
import { activities } from "@/sites/elderparty/data/volunteer"
import { Bleed } from "@/components/ui/bleed"

export const metadata = {
  title: "Volunteer — The Elder Party",
  description: "Six ways to serve the Elder Party campaign. The awakening requires participation. Yours is expected.",
}

export default function VolunteerPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 md:py-32 px-6 min-h-[360px] md:min-h-[420px]">
        <Image
          src="/sites/elderparty/volunteer-hero.png"
          alt=""
          fill
          className="object-cover brightness-40"
          priority
          fetchPriority="high"
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-xs text-white/60 uppercase tracking-widest font-semibold mb-4">
            Join the Campaign
          </p>
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-white mb-6 leading-tight">
            The Campaign Needs You. It Has Always Needed You.
          </h1>
          <p className="text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
            Democracy is a participation sport. So is what comes after democracy. Get involved today
            and secure your place on the right side of the awakening.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-heading font-bold text-primary mb-6">
            Six Ways to Serve
          </h2>
          <p className="text-foreground/70 leading-relaxed">
            Every great political movement runs on volunteer labor. The Elder Party is no different,
            except in scope, timeline, and the nature of what we are asking you to help bring about.
            Choose the role that suits your schedule, your skills, and your current relationship
            with fear.
          </p>
        </div>
      </section>

      {/* Activity Sections — alternating layout */}
      <section className="pb-20 px-6">
        <div className="max-w-6xl mx-auto space-y-24">
          {activities.map((activity, index) => {
            const isEven = index % 2 === 0

            // Determine if this activity gets a Bleed component
            const isPhoneBank = activity.slug === "phone-bank"
            const isPrecinctCaptain = activity.slug === "precinct-captain"

            return (
              <div key={activity.slug} className="scroll-mt-24">
                <div
                  className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-10 md:gap-16 items-center`}
                >
                  {/* Image */}
                  <div className="w-full md:w-96 shrink-0">
                    <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-primary/10">
                      <Image
                        src={activity.image}
                        alt={activity.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <p className="text-xs text-primary/60 uppercase tracking-widest font-semibold mb-2">
                      Role {String(index + 1).padStart(2, "0")}
                    </p>
                    <h2 className="text-3xl font-heading font-bold text-primary mb-4">
                      {activity.title}
                    </h2>

                    {/* Description — phone bank gets Bleed at intensity 2 */}
                    {isPhoneBank ? (
                      <Bleed
                        text={activity.description}
                        intensity={2}
                        as="p"
                        className="text-lg text-foreground/70 italic leading-relaxed mb-6"
                      />
                    ) : (
                      <p className="text-lg text-foreground/70 italic leading-relaxed mb-6">
                        {activity.description}
                      </p>
                    )}

                    {/* Details — precinct captain gets Bleed at intensity 3 */}
                    <div className="bg-secondary/20 border border-primary/10 rounded-lg p-5 mb-6">
                      {isPrecinctCaptain ? (
                        <Bleed
                          text={activity.details}
                          intensity={3}
                          as="p"
                          className="text-sm text-foreground/60 leading-relaxed"
                        />
                      ) : (
                        <p className="text-sm text-foreground/60 leading-relaxed">
                          {activity.details}
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      className="px-8 py-3 bg-primary text-background rounded-lg font-semibold text-sm uppercase tracking-wider hover:opacity-90 transition-opacity"
                    >
                      Sign Up
                    </button>
                  </div>
                </div>

                {/* Divider */}
                {index < activities.length - 1 && (
                  <div className="border-b border-primary/10 mt-16" />
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-secondary/30 border-t border-primary/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-heading font-bold text-primary mb-4">
            Ready to Commit?
          </h2>
          <p className="text-foreground/60 mb-8 leading-relaxed max-w-xl mx-auto">
            Sign up and a volunteer coordinator will reach out with next steps. Response times vary.
            Some coordinators report that they reach out before you sign up. This is normal.
          </p>
          <button
            type="button"
            className="px-10 py-4 bg-accent text-white rounded-lg font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity"
          >
            Volunteer Today
          </button>
        </div>
      </section>
    </div>
  )
}
