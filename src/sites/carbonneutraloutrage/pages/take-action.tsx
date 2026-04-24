import { Hero } from "@/components/ui/hero"
import { pledgeCommitments } from "@/sites/carbonneutraloutrage/data/pledge"
import { chapters } from "@/sites/carbonneutraloutrage/data/chapters"
import { events } from "@/sites/carbonneutraloutrage/data/events"
import { PledgeForm } from "@/sites/carbonneutraloutrage/components/pledge-form"

export const metadata = {
  title: "Take Action — Campaign for Sustainable Overreactions",
  description: "Sign the Pledge of Responsible Outrage. Find your regional chapter. Attend an upcoming event.",
}

export default function TakeActionPage() {
  return (
    <>
      <Hero
        headline="Take Action"
        subheadline="The Campaign is fielded by its members. Sign the pledge, find your chapter, and join us at an upcoming event."
        image="/sites/carbonneutraloutrage/take-action.png"
      />

      {/* Pledge */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-3 text-center">The Pledge</p>
          <h2 className="text-3xl font-heading font-bold text-primary text-center mb-10">Pledge of Responsible Outrage</h2>
          <ol className="space-y-5 mb-12">
            {pledgeCommitments.map((c) => (
              <li key={c.number} className="grid grid-cols-[40px_1fr] gap-4 items-baseline border-b border-accent/20 pb-4 last:border-0">
                <span className="text-2xl font-heading font-bold text-secondary">{c.number}.</span>
                <span className="text-foreground/80 leading-relaxed">{c.text}</span>
              </li>
            ))}
          </ol>
          <PledgeForm />
        </div>
      </section>

      {/* Chapter directory */}
      <section className="py-20 px-6 bg-white border-y border-accent/20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-primary text-center mb-3">Regional Chapters</h2>
          <p className="text-center text-foreground/60 text-sm mb-12">Six active chapters. Each is led by a regional Chair and self-organizes its programming.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {chapters.map((chapter) => (
              <article key={`${chapter.city}-${chapter.state}`} className="border border-accent/30 rounded-lg p-5 bg-background">
                <p className="text-xs text-secondary font-semibold uppercase tracking-wider mb-1">{chapter.region}</p>
                <h3 className="text-lg font-heading font-semibold text-primary">{chapter.city}, {chapter.state}</h3>
                <p className="text-sm text-foreground/70 mt-2">Chair: <span className="text-foreground/90 font-medium">{chapter.chairName}</span></p>
                <div className="flex justify-between mt-3 text-xs text-foreground/50">
                  <span>Founded {chapter.founded}</span>
                  <span>{chapter.members.toLocaleString()} members</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming events */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-primary text-center mb-3">Upcoming Events</h2>
          <p className="text-center text-foreground/60 text-sm mb-12">National and regional convenings of the Campaign.</p>
          <ul className="space-y-4">
            {events.map((event) => (
              <li key={event.slug} className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 border border-accent/30 rounded-lg p-5 bg-white">
                <div>
                  <p className="text-secondary text-sm font-semibold">{event.date}</p>
                  <p className="text-xs text-foreground/50 mt-1">{event.city}, {event.state}</p>
                </div>
                <div>
                  <h3 className="text-lg font-heading font-semibold text-primary mb-1">{event.name}</h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">{event.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
