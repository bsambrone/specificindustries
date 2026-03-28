"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { Hero } from "@/components/ui/hero"
import { StatCounter } from "@/components/ui/stat-counter"
import { JobListing } from "@/components/ui/job-listing"
import { FeatureSection } from "@/components/ui/feature-section"

export const metadata = {
  title: "Volunteer — Pig Milk Co.",
  description: "Join the pig milk movement. We're hiring. Nobody stays long.",
}

const jobPositions = [
  {
    title: "Pig Whisperer",
    department: "Pig Relations",
    description: "Must be fluent in oink. ASL certification a plus but not required.",
  },
  {
    title: "Milk Quality Inspector",
    department: "Quality Assurance",
    description: "You will taste pig milk. Daily. This is non-negotiable.",
  },
  {
    title: "Social Media Intern",
    department: "Marketing",
    description: "Unpaid. But you get all the pig milk you can drink. Most applicants withdraw at this point.",
  },
  {
    title: "Emotional Support Human",
    department: "Pig Wellness",
    description: "The pigs get stressed. You sit with them. That's the whole job.",
  },
  {
    title: "Barn Engineer",
    department: "Facilities",
    description: "Our barn has a door that doesn't close. Fix it. We've been trying for 3 years.",
  },
]

const perks = [
  { title: "Unlimited pig milk on tap", description: "Yes, it's exactly what it sounds like." },
  { title: "Flexible hours (the pigs set the schedule)", description: "They're early risers. Very early." },
  { title: "Health insurance (pending)", description: "We've been saying 'pending' for two years." },
  { title: "A company t-shirt (it smells a little)", description: "We store them in the barn." },
  { title: "Free parking (it's a field)", description: "Watch out for mud. And pigs." },
]

export default function PigMilkVolunteer() {
  const formRef = useRef<HTMLDivElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [pigFeeling, setPigFeeling] = useState(8)

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      {/* Hero */}
      <Hero
        headline="Join the Pig Milk Movement"
        subheadline="We're changing the world. Slowly. One pig at a time."
      />

      {/* Impact Stats */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatCounter value="12" label="pigs milked" />
          <StatCounter value="3" label="satisfied customers" />
          <StatCounter value="1" label="barn" />
          <StatCounter value="0" label="investors (they keep saying no)" />
        </div>
      </section>

      {/* Volunteer Hero Image */}
      <section className="w-full px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <Image
            src="/sites/pigmilk/volunteer-hero.png"
            alt="Volunteers working with pigs"
            width={1200}
            height={800}
            className="w-full h-auto rounded-lg"
          />
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center mb-12">Open Positions</h2>
          <div className="space-y-6">
            {jobPositions.map((job) => (
              <JobListing
                key={job.title}
                title={job.title}
                department={job.department}
                description={job.description}
                onApply={scrollToForm}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Perks & Benefits */}
      <FeatureSection title="Perks & Benefits" features={perks} />

      {/* Culture Image */}
      <section className="w-full px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <Image
            src="/sites/pigmilk/volunteer-culture.png"
            alt="Pig Milk Co. team culture"
            width={1200}
            height={800}
            className="w-full h-auto rounded-lg"
          />
        </div>
      </section>

      {/* Application Form */}
      <section ref={formRef} className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center mb-12">Apply Now</h2>

          {submitted ? (
            <div className="text-center py-12">
              <p className="text-xl text-foreground/70">
                Application received! We&apos;ll be in touch. (We probably won&apos;t.)
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setSubmitted(true)
              }}
              className="space-y-6"
            >
              <div>
                <label htmlFor="name" className="block text-sm font-semibold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-2 border border-primary/20 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 border border-primary/20 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div>
                <label htmlFor="position" className="block text-sm font-semibold mb-2">
                  Position
                </label>
                <select
                  id="position"
                  name="position"
                  required
                  className="w-full px-4 py-2 border border-primary/20 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                >
                  <option value="">Select a position...</option>
                  {jobPositions.map((job) => (
                    <option key={job.title} value={job.title}>
                      {job.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="why" className="block text-sm font-semibold mb-2">
                  Why do you want to work with pigs?
                </label>
                <textarea
                  id="why"
                  name="why"
                  rows={4}
                  required
                  className="w-full px-4 py-2 border border-primary/20 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-vertical"
                />
              </div>

              <div>
                <label htmlFor="pigFeeling" className="block text-sm font-semibold mb-2">
                  On a scale of 1-10, how do you feel about pig milk? (Current: {pigFeeling})
                </label>
                <input
                  type="range"
                  id="pigFeeling"
                  name="pigFeeling"
                  min={8}
                  max={10}
                  step={1}
                  value={pigFeeling}
                  onChange={(e) => setPigFeeling(Number(e.target.value))}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-xs text-foreground/50 mt-1">
                  <span>8</span>
                  <span>9</span>
                  <span>10</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Submit Application
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
