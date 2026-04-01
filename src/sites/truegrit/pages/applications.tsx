import Image from "next/image"
import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Applications — True Grit Personal Care",
  description:
    "Discover the full range of environments where True Grit products deliver their signature experience.",
}

const applications = [
  {
    image: "/sites/truegrit/setting-exec-bathroom.png",
    title: "The Executive Suite",
    description:
      "Nothing says 'I earned this corner office' like industrial-grade personal care. True Grit has been adopted by Fortune 500 executives who believe that if the quarterly review didn't make them uncomfortable, the bathroom shouldn't either. Our 40-Grit Original is now standard issue in 3 corporate headquarters that we are not legally permitted to name.",
    stats: "Featured in 3 unnamed corporate HQs",
  },
  {
    image: "/sites/truegrit/setting-home-bathroom.png",
    title: "The Modern Home",
    description:
      "Your bathroom has heated floors, a rainfall shower, and imported Italian tile. Why should the toilet paper be soft? True Grit brings balance to the modern home — a reminder that luxury is earned, not given. Interior designers have described our product as 'an interesting choice' and 'please leave my office.'",
    stats: "Voted 'Most Unexpected Housewarming Gift' 4 years running",
  },
  {
    image: "/sites/truegrit/setting-portapotty.png",
    title: "The Job Site",
    description:
      "This is where True Grit feels most at home. Construction workers already understand that comfort is negotiable. Our products have been independently tested in over 200 portable restrooms and rated 'about what I expected' by 94% of respondents. The other 6% declined to comment.",
    stats: "94% 'About What I Expected' satisfaction rating",
  },
  {
    title: "The Campsite",
    description:
      "When you're three days into a backcountry trip and the only alternative is a pinecone, True Grit starts to look pretty good. Our Starter Kit has become a staple of ultralight backpackers who appreciate that at 24-grit, the paper doubles as a fire starter. Pack it in, pack it out — if you can still walk.",
    stats: "Doubles as emergency fire starter",
  },
  {
    title: "The Doomsday Bunker",
    description:
      "Preppers love True Grit. With an indefinite shelf life and zero moisture sensitivity, our sandpaper products will outlast every other supply in your bunker. When civilization collapses, you'll have the cleanest situation in the wasteland. Several customers have reported stockpiling 10+ years of supply. We do not ask follow-up questions.",
    stats: "Indefinite shelf life. Zero moisture sensitivity.",
  },
  {
    title: "The Fraternity House",
    description:
      "True Grit has become the hazing alternative that technically doesn't violate any university policies. It's just toilet paper. That it happens to be made of sandpaper is, legally speaking, a personal choice. We've received thank-you letters from 14 Greek organizations and cease-and-desist letters from 3 university health centers.",
    stats: "Technically not a policy violation",
  },
  {
    title: "The In-Law's Guest Bathroom",
    description:
      "For when you want to send a message that's firm but not directly confrontational. True Grit in the guest bathroom says 'you're welcome here, but not too welcome.' Relationship counselors have described this application as 'passive-aggressive' and 'honestly kind of brilliant.'",
    stats: "Recommended by 0 relationship counselors",
  },
  {
    title: "The Gym & Wellness Center",
    description:
      "No pain, no gain applies to every part of the fitness journey. Several CrossFit gyms have adopted True Grit as part of their holistic suffering philosophy. Members report that it 'completes the experience' and 'makes the workout feel less bad by comparison.' We consider both of these endorsements.",
    stats: "Adopted by CrossFit gyms seeking holistic suffering",
  },
]

export default function Applications() {
  return (
    <>
      <Hero
        headline="Applications"
        subheadline="True Grit products go wherever life takes you. Whether you asked for them or not."
      />

      {/* Featured Applications (with images) */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold text-primary uppercase tracking-wide">
              Featured Environments
            </h2>
            <p className="text-foreground/60 mt-3 max-w-2xl mx-auto">
              Independently verified settings where True Grit products have been deployed, reviewed,
              and in some cases, confiscated.
            </p>
          </div>

          <div className="space-y-20">
            {applications.slice(0, 3).map((app, i) => (
              <div
                key={app.title}
                className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 items-center`}
              >
                {app.image && (
                  <div className="md:w-1/2">
                    <div className="relative aspect-[3/2] rounded-lg overflow-hidden">
                      <Image
                        src={app.image}
                        alt={app.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-heading font-bold text-primary uppercase tracking-wide mb-4">
                    {app.title}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed mb-4">{app.description}</p>
                  <p className="text-sm font-heading uppercase tracking-wider text-accent">
                    {app.stats}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Applications (text cards) */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold text-primary uppercase tracking-wide">
              Additional Applications
            </h2>
            <p className="text-foreground/60 mt-3 max-w-2xl mx-auto">
              Our customers continue to find new and deeply questionable uses for our products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {applications.slice(3).map((app) => (
              <div key={app.title} className="bg-background border border-primary/10 p-8">
                <h3 className="text-xl font-heading font-bold text-primary uppercase tracking-wide mb-3">
                  {app.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed mb-4">{app.description}</p>
                <p className="text-sm font-heading uppercase tracking-wider text-accent">
                  {app.stats}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-heading font-bold text-primary uppercase tracking-wide mb-4">
            Have a New Application?
          </h2>
          <p className="text-foreground/60 leading-relaxed mb-8">
            We&apos;ve stopped being surprised. If you&apos;ve found a new environment for True Grit
            products, we&apos;d like to hear about it — mostly for legal documentation purposes.
          </p>
          <a
            href="/contact"
            className="inline-block bg-primary text-white font-heading text-sm uppercase tracking-wider px-8 py-4 hover:opacity-90 transition-opacity"
          >
            Report an Application
          </a>
        </div>
      </section>
    </>
  )
}
