"use client"

import { useState } from "react"
import Image from "next/image"
import { events } from "@/sites/elderparty/data/events"
import { Bleed } from "@/components/ui/bleed"

export const metadata = {
  title: "Events — The Elder Party",
  description: "Campaign rallies, town halls, and awakenings near you. Eight stops across America on the road to the election.",
}

const rsvpConfirmations = [
  "Your attendance has been registered. We knew you'd come.",
  "RSVP confirmed. You will receive directions when the time is right.",
  "Welcome, patriot. Your seat has been reserved since before you were born.",
  "Confirmed. Do not be alarmed if you receive confirmation in a dream tonight.",
  "You are now on the list. The list is permanent. Thank you for your commitment.",
  "RSVP accepted. Arrive at sundown. Bring nothing. Everything will be provided.",
  "Registered. The campaign thanks you. The campaign has always thanked you.",
  "Confirmed. You may notice a sense of peace. This is normal and temporary.",
]

export default function EventsPage() {
  const [rsvpEvent, setRsvpEvent] = useState<string | null>(null)
  const [rsvpStage, setRsvpStage] = useState<"form" | "confirmed">("form")
  const [rsvpName, setRsvpName] = useState("")
  const [rsvpEmail, setRsvpEmail] = useState("")

  const activeEvent = rsvpEvent ? events.find((e) => e.slug === rsvpEvent) : null

  function handleRsvp(slug: string) {
    setRsvpEvent(slug)
    setRsvpStage("form")
    setRsvpName("")
    setRsvpEmail("")
  }

  function handleSubmitRsvp(e: React.FormEvent) {
    e.preventDefault()
    setRsvpStage("confirmed")
  }

  function handleClose() {
    setRsvpEvent(null)
  }

  const confirmationMessage = rsvpEvent
    ? rsvpConfirmations[rsvpEvent.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % rsvpConfirmations.length]
    : ""

  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 md:py-32 px-6 min-h-[360px] md:min-h-[420px]">
        <Image
          src="/sites/elderparty/event-grand-rally-dc.png"
          alt=""
          fill
          className="object-cover brightness-40"
          priority
          fetchPriority="high"
        />
        {/* American-flag patriotic accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 z-10" style={{ background: "linear-gradient(90deg, #B22234 33%, #FFFFFF 33%, #FFFFFF 66%, #3C3B6E 66%)" }} />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-xs text-white/60 uppercase tracking-widest font-semibold mb-4">
            The Eternal Campaign Trail
          </p>
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-white mb-6 leading-tight">
            Events &amp; Rallies
          </h1>
          <p className="text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
            The Elder Party is coming to a community near you. Flags will fly. Speeches will be made.
            Some things cannot be undone. Join us.
          </p>
        </div>
        {/* Bottom flag bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 z-10" style={{ background: "linear-gradient(90deg, #B22234 33%, #FFFFFF 33%, #FFFFFF 66%, #3C3B6E 66%)" }} />
      </section>

      {/* Events Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-4 justify-center">
            <span className="text-2xl" aria-hidden="true">🇺🇸</span>
            <h2 className="text-3xl font-heading font-bold text-center text-primary uppercase tracking-wide">
              Campaign Schedule
            </h2>
            <span className="text-2xl" aria-hidden="true">🇺🇸</span>
          </div>
          <p className="text-center text-foreground/60 text-sm mb-12 max-w-2xl mx-auto">
            Eight events. Eight cities. One awakening. All Americans are welcome. Attendance is
            encouraged. In several cases, attendance is expected.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((event, index) => (
              <div
                key={event.slug}
                className="border border-primary/10 rounded-lg overflow-hidden bg-secondary/20 hover:bg-secondary/30 hover:border-primary/30 transition-colors"
              >
                {/* Event Image */}
                <div className="relative w-full aspect-[16/9]">
                  <Image
                    src={event.image}
                    alt={event.name}
                    fill
                    className="object-cover"
                  />
                  {/* Patriotic flag ribbon on featured (last) event */}
                  {index === events.length - 1 && (
                    <div className="absolute top-3 right-3 z-10 bg-accent text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded">
                      Election Eve
                    </div>
                  )}
                </div>

                {/* Event Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <p className="text-xs text-primary/60 uppercase tracking-widest font-semibold mb-1">
                        {event.date}
                      </p>
                      <h3 className="text-xl font-heading font-bold text-primary leading-snug">
                        {event.name}
                      </h3>
                    </div>
                  </div>

                  <p className="flex items-center gap-2 text-sm text-foreground/50 mb-4">
                    <span>📍</span>
                    <span>{event.location}</span>
                  </p>

                  <p className="text-sm text-foreground/70 leading-relaxed mb-5">
                    {event.description}
                  </p>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleRsvp(event.slug)}
                      className="flex-1 px-5 py-2.5 bg-primary text-background text-sm font-semibold rounded hover:opacity-90 transition-opacity uppercase tracking-wider"
                    >
                      RSVP Now
                    </button>
                    <span className="text-foreground/30 text-xs">🇺🇸</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patriotic CTA */}
      <section className="py-16 px-6 bg-secondary/30 border-t border-primary/10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Small flag decorations */}
          <div className="flex justify-center gap-2 mb-6 text-2xl" aria-hidden="true">
            🇺🇸🇺🇸🇺🇸
          </div>
          <h2 className="text-2xl font-heading font-bold text-primary mb-4">
            Can&apos;t Make It In Person?
          </h2>
          <p className="text-foreground/60 mb-6 leading-relaxed max-w-xl mx-auto">
            The Elder Party understands that geography can be a limitation — for now. In the meantime,
            follow the campaign online, watch livestreams, and remember that the candidate will
            eventually be able to address all Americans simultaneously.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              className="px-8 py-3 bg-primary text-background rounded-lg font-semibold text-sm uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              Sign Up for Updates
            </button>
            <button
              type="button"
              className="px-8 py-3 border border-primary/40 text-primary rounded-lg font-semibold text-sm uppercase tracking-wider hover:bg-primary/10 transition-colors"
            >
              Volunteer Instead
            </button>
          </div>
        </div>
      </section>

      {/* RSVP Modal */}
      {rsvpEvent && activeEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={handleClose} />
          <div className="relative bg-secondary border border-primary/20 rounded-lg max-w-md w-full p-8 shadow-2xl">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-foreground/40 hover:text-foreground/70 transition-colors"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {rsvpStage === "form" ? (
              <>
                <h3 className="text-2xl font-heading font-bold text-primary mb-1">
                  RSVP
                </h3>
                <p className="text-sm text-foreground/60 mb-6">
                  {activeEvent.name} — {activeEvent.date}
                </p>

                <form onSubmit={handleSubmitRsvp} className="space-y-4">
                  <div>
                    <label htmlFor="rsvp-name" className="block text-xs font-heading uppercase tracking-wider text-foreground/50 mb-1.5">
                      Full Name
                    </label>
                    <input
                      id="rsvp-name"
                      type="text"
                      required
                      value={rsvpName}
                      onChange={(e) => setRsvpName(e.target.value)}
                      placeholder="Your name (we may already have it)"
                      className="w-full bg-background/50 border border-primary/20 text-foreground placeholder:text-foreground/30 px-4 py-2.5 rounded focus:outline-none focus:border-primary/50 transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="rsvp-email" className="block text-xs font-heading uppercase tracking-wider text-foreground/50 mb-1.5">
                      Email
                    </label>
                    <input
                      id="rsvp-email"
                      type="email"
                      required
                      value={rsvpEmail}
                      onChange={(e) => setRsvpEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-background/50 border border-primary/20 text-foreground placeholder:text-foreground/30 px-4 py-2.5 rounded focus:outline-none focus:border-primary/50 transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="rsvp-guests" className="block text-xs font-heading uppercase tracking-wider text-foreground/50 mb-1.5">
                      Number of Guests
                    </label>
                    <select
                      id="rsvp-guests"
                      className="w-full bg-background/50 border border-primary/20 text-foreground px-4 py-2.5 rounded focus:outline-none focus:border-primary/50 transition-colors text-sm"
                      defaultValue="1"
                    >
                      <option value="1">Just me</option>
                      <option value="2">2 (myself + 1 guest)</option>
                      <option value="3">3 (myself + 2 guests)</option>
                      <option value="4">4+ (the call spreads)</option>
                      <option value="unknown">Unknown (they keep arriving)</option>
                    </select>
                  </div>
                  <p className="text-xs text-foreground/30">
                    By submitting, you acknowledge that your attendance may be observed from multiple dimensions simultaneously.
                  </p>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-primary text-background font-semibold rounded text-sm uppercase tracking-wider hover:opacity-90 transition-opacity"
                  >
                    Confirm RSVP
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="text-4xl mb-4">🇺🇸</div>
                <h3 className="text-2xl font-heading font-bold text-primary mb-3">
                  You Are Expected
                </h3>
                <p className="text-foreground/70 leading-relaxed mb-4">
                  {confirmationMessage}
                </p>
                <p className="text-sm text-foreground/50 mb-2">
                  {activeEvent.name}
                </p>
                <p className="text-sm text-foreground/50 mb-6">
                  {activeEvent.date} — {activeEvent.location}
                </p>
                <p className="text-xs text-foreground/30 mb-6">
                  <Bleed text="A confirmation has been sent to your inbox. If you did not receive it, check your dreams." intensity={2} />
                </p>
                <button
                  onClick={handleClose}
                  className="px-8 py-2.5 border border-primary/40 text-primary rounded text-sm font-semibold uppercase tracking-wider hover:bg-primary/10 transition-colors"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
