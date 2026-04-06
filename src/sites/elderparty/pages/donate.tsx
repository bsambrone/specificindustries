"use client"

import Image from "next/image"
import { useState } from "react"
import { tiers } from "@/sites/elderparty/data/donate"
import { Bleed } from "@/components/ui/bleed"

export const metadata = {
  title: "Donate — The Elder Party",
  description: "Support the Elder Party campaign. Five donation tiers. One awakening. Every dollar counts.",
}

const GOAL = 66_600_000
const RAISED = 48_618_000
const PROGRESS_PCT = Math.round((RAISED / GOAL) * 100)

const WHY_DONATE = [
  {
    heading: "Elections Cost Money",
    body: "Running a presidential campaign requires significant resources: staff, events, advertising, and a small number of expenditures that the FEC form does not have a category for. Your donation covers all of it.",
  },
  {
    heading: "Your Name Goes in the Book",
    body: "Donors at the Awakened tier and above are inscribed in the Book of Donors. The Book predates the Republic. It remembers everyone who has ever been added to it. This is a distinction.",
  },
  {
    heading: "History Will Record This",
    body: "Every significant political movement in American history was funded by citizens who believed in something. The Elder Party is no different, except in what we believe in and how long we have believed it.",
  },
  {
    heading: "We Know Where You Live",
    body: "This is not a threat. It is context. Bumper stickers will be mailed automatically to the Patriot tier and above. Please confirm your address is current, or simply wait — we will confirm it ourselves.",
  },
]

const ENDORSEMENT_QUOTES = [
  {
    quote: "I gave $31 and received a bumper sticker three days before I had ordered it. Time is a flat circle and so is my driveway.",
    author: "Donor ID #4471",
    location: "Arkham, MA",
  },
  {
    quote: "The signed letter from Chairman Marsh arrived damp. I've kept it in a sealed envelope. The envelope is also damp now.",
    author: "Donor ID #8823",
    location: "Innsmouth, MA",
  },
  {
    quote: "The dream about the private audience location was very vivid. I'm not sure it was a dream.",
    author: "Donor ID #1666",
    location: "Location Not Disclosed",
  },
]

const donationConfirmations: Record<string, { heading: string; message: string; bleedText?: string }> = {
  supporter: {
    heading: "Your Support Has Been Received",
    message: "A digital badge has been sent to an email address we selected for you. If it is not the correct address, don't worry — we'll find the right one.",
  },
  patriot: {
    heading: "Welcome, Patriot",
    message: "A bumper sticker is being mailed to your address. You did not provide your address. This is not a problem.",
  },
  devoted: {
    heading: "Your Devotion Is Noted",
    message: "A letter from Campaign Chairman Marsh is being prepared. The ink is still wet. It will remain wet upon arrival. Do not be alarmed by the handwriting — Chairman Marsh writes with great care and a variable number of fingers.",
  },
  awakened: {
    heading: "You Are Now Awakened",
    message: "Your name has been inscribed in the Book of Donors. You may feel a brief sensation of being watched. This will subside. The watching will not, but the sensation will.",
    bleedText: "The Book remembers. The Book has always remembered. Welcome to permanence.",
  },
  ascended: {
    heading: "Ascension Initiated",
    message: "A private audience has been arranged. The location will be revealed to you in a dream within 3-5 business nights. Please do not attempt to find the location on a map. It is not on any map. Dress is formal. Bring nothing. Leave your phone. Tell no one.",
    bleedText: "You belong to the campaign now. The campaign has always belonged to you. These are the same thing. You understand. You have always understood.",
  },
}

export default function DonatePage() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null)
  const [donationComplete, setDonationComplete] = useState(false)

  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 md:py-32 px-6 min-h-[360px] md:min-h-[420px]">
        <Image
          src="/sites/elderparty/donate-hero.png"
          alt=""
          fill
          className="object-cover brightness-40"
          priority
          fetchPriority="high"
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-xs text-white/60 uppercase tracking-widest font-semibold mb-4">
            Support the Campaign
          </p>
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-white mb-6 leading-tight">
            Every Dollar Brings Us Closer to Awakening
          </h1>
          <p className="text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
            The Elder Party is a grassroots campaign. We are funded by ordinary Americans who
            understand that something extraordinary is required. Choose your level of commitment below.
          </p>
        </div>
      </section>

      {/* Progress Bar */}
      <section className="py-16 px-6 bg-secondary/30 border-b border-primary/10">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-baseline mb-3">
            <div>
              <span className="text-3xl font-heading font-bold text-primary">
                ${RAISED.toLocaleString()}
              </span>
              <span className="text-foreground/50 text-sm ml-2">raised</span>
            </div>
            <div className="text-right">
              <span className="text-foreground/60 text-sm">Goal: </span>
              <span className="text-foreground/80 font-semibold">
                ${GOAL.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-3 bg-secondary/60 rounded-full overflow-hidden border border-primary/10">
            <div
              className="h-full bg-primary rounded-full transition-all duration-700"
              style={{ width: `${PROGRESS_PCT}%` }}
            />
          </div>

          <div className="flex justify-between mt-2">
            <p className="text-xs text-foreground/50">{PROGRESS_PCT}% of goal</p>
            <p className="text-xs text-foreground/50">
              ${(GOAL - RAISED).toLocaleString()} remaining
            </p>
          </div>

          <p className="text-center text-foreground/40 text-xs mt-4 italic">
            Fundraising data as of the last reporting period. Updated when the numbers change to something
            we feel comfortable sharing.
          </p>
        </div>
      </section>

      {/* Donation Tiers */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center text-primary mb-4">
            Choose Your Tier
          </h2>
          <p className="text-center text-foreground/60 text-sm mb-12 max-w-2xl mx-auto">
            Each tier comes with its own acknowledgment. All tiers result in your name being
            known to the campaign. The campaign already knows some of them.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tiers.map((tier) => {
              const isSelected = selectedTier === tier.slug
              const isAscended = tier.slug === "ascended"

              return (
                <div
                  key={tier.slug}
                  onClick={() => setSelectedTier(tier.slug)}
                  className={[
                    "relative border rounded-lg p-6 cursor-pointer transition-all duration-200",
                    isSelected
                      ? "border-primary bg-primary/10 ring-1 ring-primary/40"
                      : "border-primary/10 bg-secondary/20 hover:border-primary/30 hover:bg-secondary/30",
                    isAscended ? "sm:col-span-2 lg:col-span-1" : "",
                  ].join(" ")}
                >
                  {/* Tier name + amount */}
                  <div className="mb-4">
                    <p className="text-xs text-primary/60 uppercase tracking-widest font-semibold mb-1">
                      {tier.name}
                    </p>
                    <p className="text-4xl font-heading font-bold text-primary">
                      {tier.amount}
                    </p>
                  </div>

                  {/* Reward */}
                  <div className="min-h-[56px] mb-6">
                    {isAscended ? (
                      <Bleed
                        text={tier.reward}
                        intensity={3}
                        as="p"
                        className="text-sm text-foreground/70 leading-relaxed"
                      />
                    ) : (
                      <p className="text-sm text-foreground/70 leading-relaxed">
                        {tier.reward}
                      </p>
                    )}
                  </div>

                  {/* Donate button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedTier(tier.slug)
                    }}
                    className={[
                      "w-full py-2.5 rounded font-semibold text-sm uppercase tracking-wider transition-opacity",
                      isAscended
                        ? "bg-accent text-white hover:opacity-90"
                        : "bg-primary text-background hover:opacity-90",
                    ].join(" ")}
                  >
                    Donate {tier.amount}
                  </button>

                  {/* Selected indicator */}
                  {isSelected && (
                    <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-primary" />
                  )}
                </div>
              )
            })}
          </div>

          {/* Selected tier confirm CTA or confirmation message */}
          {selectedTier && !donationComplete && (
            <div className="mt-10 p-6 border border-primary/20 rounded-lg bg-secondary/30 text-center">
              <p className="text-foreground/60 text-sm mb-4">
                You have selected:{" "}
                <span className="text-primary font-semibold">
                  {tiers.find((t) => t.slug === selectedTier)?.name} —{" "}
                  {tiers.find((t) => t.slug === selectedTier)?.amount}
                </span>
              </p>
              <button
                type="button"
                onClick={() => setDonationComplete(true)}
                className="px-10 py-3 bg-accent text-white rounded-lg font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity text-sm"
              >
                Complete Donation
              </button>
              <p className="text-xs text-foreground/30 mt-3">
                Clicking &ldquo;Complete Donation&rdquo; constitutes an irrevocable expression of support.
                The campaign will remember.
              </p>
            </div>
          )}

          {donationComplete && selectedTier && (
            <div className="mt-10 p-8 border border-primary/30 rounded-lg bg-primary/5 text-center">
              <div className="text-4xl mb-4">🇺🇸</div>
              <h3 className="text-2xl font-heading font-bold text-primary mb-4">
                {donationConfirmations[selectedTier]?.heading ?? "Thank You"}
              </h3>
              <p className="text-foreground/70 leading-relaxed mb-4 max-w-lg mx-auto">
                {donationConfirmations[selectedTier]?.message}
              </p>
              {donationConfirmations[selectedTier]?.bleedText && (
                <p className="text-xs text-foreground/40 mb-6">
                  <Bleed
                    text={donationConfirmations[selectedTier].bleedText!}
                    intensity={selectedTier === "ascended" ? 4 : 2}
                  />
                </p>
              )}
              <p className="text-xs text-foreground/30 mb-6">
                Confirmation #{Math.floor(Math.random() * 900000 + 100000).toString()} — Processed at{" "}
                {new Date().toLocaleTimeString()} local time (3:13 AM R&apos;lyeh Standard Time)
              </p>
              <button
                type="button"
                onClick={() => {
                  setDonationComplete(false)
                  setSelectedTier(null)
                }}
                className="px-8 py-2.5 border border-primary/40 text-primary rounded text-sm font-semibold uppercase tracking-wider hover:bg-primary/10 transition-colors"
              >
                Make Another Donation
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Why Donate */}
      <section className="py-20 px-6 bg-secondary/20 border-t border-primary/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center text-primary mb-12">
            Why Donate?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {WHY_DONATE.map((item) => (
              <div
                key={item.heading}
                className="p-6 border border-primary/10 rounded-lg bg-secondary/20"
              >
                <h3 className="text-lg font-heading font-semibold text-primary mb-3">
                  {item.heading}
                </h3>
                <p className="text-sm text-foreground/60 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Endorsement Quotes */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-center text-primary mb-12">
            What Donors Are Saying
          </h2>
          <div className="space-y-8">
            {ENDORSEMENT_QUOTES.map((q) => (
              <blockquote
                key={q.author}
                className="border-l-2 border-accent/40 pl-6 py-2"
              >
                <p className="text-foreground/70 italic leading-relaxed mb-3">
                  &ldquo;{q.quote}&rdquo;
                </p>
                <cite className="text-xs text-foreground/40 not-italic">
                  &mdash; {q.author}, {q.location}
                </cite>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Legal */}
      <section className="pb-12 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs text-foreground/30 text-center leading-relaxed">
            Paid for by Elder Party Campaign Committee. Contributions are not tax-deductible.
            Maximum contribution: $3,300 per election per federal law. The Elder Party respects
            federal campaign finance law and complies with all regulations that apply to
            campaigns operating within this dimensional plane. Compliance with regulations
            governing other planes is pending review.
          </p>
        </div>
      </section>
    </div>
  )
}
