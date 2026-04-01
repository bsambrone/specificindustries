"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useSiteLink } from "@/hooks/use-site-link"
import { getStepBySlug, onboardingSteps, urgencyMessages, loadingMessages } from "@/sites/stratify/data/onboarding"
import type { FormField } from "@/sites/stratify/data/onboarding"

const progressMap: Record<string, number> = {
  "step-1": 12,
  "step-2": 25,
  "step-3": 38,
  "step-4": 45,
  "step-5": 32,
  "step-6": 48,
  "step-7": 55,
  "step-8": 60,
}

// ─── FormFieldRenderer ───────────────────────────────────────────────────────

function FormFieldRenderer({ field }: { field: FormField }) {
  const [fileSelected, setFileSelected] = useState(false)
  const [sliderValue, setSliderValue] = useState(field.min ?? 1)

  const inputClass =
    "w-full rounded-md px-3 py-2 bg-foreground/5 border border-foreground/15 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-secondary/50 transition-colors"

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-foreground/70">
        {field.label}
      </label>

      {(field.type === "text" ||
        field.type === "email" ||
        field.type === "tel" ||
        field.type === "number") && (
        <input
          type={field.type}
          placeholder={field.placeholder}
          className={inputClass}
        />
      )}

      {field.type === "select" && (
        <select className={inputClass} defaultValue="">
          <option value="" disabled>
            Select an option
          </option>
          {field.options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      )}

      {field.type === "radio" && (
        <div className="flex flex-wrap gap-4">
          {field.options?.map((opt) => (
            <label key={opt} className="flex items-center gap-2 cursor-pointer text-foreground/80 text-sm">
              <input type="radio" name={field.label} value={opt} className="accent-secondary" />
              {opt}
            </label>
          ))}
        </div>
      )}

      {field.type === "textarea" && (
        <textarea
          placeholder={field.placeholder}
          rows={3}
          className={inputClass + " resize-none"}
        />
      )}

      {field.type === "slider" && (
        <div className="flex flex-col gap-1">
          <input
            type="range"
            min={field.min}
            max={field.max}
            value={sliderValue}
            onChange={(e) => setSliderValue(Number(e.target.value))}
            className="w-full accent-secondary"
          />
          <div className="flex justify-between text-xs text-foreground/50">
            <span>{field.min}</span>
            <span className="font-semibold text-secondary">{sliderValue}</span>
            <span>{field.max}</span>
          </div>
        </div>
      )}

      {field.type === "yes-no" && (
        <div className="flex gap-6">
          {["Yes", "No"].map((opt) => (
            <label key={opt} className="flex items-center gap-2 cursor-pointer text-foreground/80 text-sm">
              <input type="radio" name={field.label} value={opt} className="accent-secondary" />
              {opt}
            </label>
          ))}
        </div>
      )}

      {field.type === "file" && (
        <div className="flex flex-col gap-2">
          <input
            type="file"
            accept="*/*"
            onChange={() => setFileSelected(true)}
            className="text-sm text-foreground/70 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-secondary file:text-primary hover:file:bg-accent file:transition-colors cursor-pointer"
          />
          {fileSelected && (
            <p className="text-sm font-bold" style={{ color: "#c9a227" }}>
              Gross.
            </p>
          )}
        </div>
      )}

      {field.note && (
        <p className="text-xs text-foreground/50 italic">{field.note}</p>
      )}
    </div>
  )
}

// ─── FakeLoadingScreen ────────────────────────────────────────────────────────

function FakeLoadingScreen() {
  const siteHref = useSiteLink()
  const [progress, setProgress] = useState(0)
  const [messageIndex, setMessageIndex] = useState(0)
  const [complete, setComplete] = useState(false)
  const rafRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (complete) return

    rafRef.current = setTimeout(() => {
      setProgress((prev) => {
        const increment = 0.5 + Math.random() * 2
        const next = prev + increment
        if (next >= 100) {
          setComplete(true)
          return 100
        }
        return next
      })
    }, 150)

    return () => {
      if (rafRef.current) clearTimeout(rafRef.current)
    }
  }, [progress, complete])

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % loadingMessages.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center gap-8 py-8">
      {!complete ? (
        <>
          <div className="w-full max-w-md">
            <div className="flex justify-between text-xs text-foreground/60 mb-2">
              <span>{loadingMessages[messageIndex]}</span>
              <span>{Math.floor(progress)}%</span>
            </div>
            <div className="w-full h-3 rounded-full bg-foreground/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-secondary transition-none"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <p className="text-foreground/60 text-sm animate-pulse">
            Do not close this tab.
          </p>
        </>
      ) : (
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="text-6xl">🎉</div>
          <div>
            <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
              Congratulations! You have been placed at Layer 0: Observer.
            </h3>
            <p className="text-foreground/70">
              Your Stratification Compatibility Index has been calculated. You are ready to begin your elevation.
            </p>
          </div>
          <div className="border border-secondary/30 rounded-lg p-6 bg-secondary/5 max-w-sm w-full">
            <p className="text-secondary font-heading font-bold text-lg mb-1">Layer 0: Observer</p>
            <p className="text-foreground/60 text-sm mb-4">
              You are currently in the observation tier. Upgrade to begin your ascent.
            </p>
            <Link
              href={siteHref("/onboarding/step-1")}
              className="inline-block w-full text-center px-6 py-3 rounded-lg font-heading font-bold bg-secondary text-primary hover:bg-accent transition-colors"
            >
              Purchase Layer 1 Elevation
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── UrgencyBanner ────────────────────────────────────────────────────────────

function UrgencyBanner() {
  const [messageIndex, setMessageIndex] = useState(0)
  const [seconds, setSeconds] = useState(14 * 60 + 59)

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % urgencyMessages.length)
    }, 5000)
    return () => clearInterval(msgInterval)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => {
        if (s <= 0) return 14 * 60 + 59
        return s - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  const timeStr = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`

  return (
    <div className="w-full bg-secondary text-primary px-4 py-2 flex items-center justify-center gap-3 text-sm font-semibold">
      <span className="hidden sm:inline">⚡</span>
      <span>{urgencyMessages[messageIndex]}</span>
      <span className="font-mono bg-primary/20 px-2 py-0.5 rounded text-xs">
        {timeStr}
      </span>
    </div>
  )
}

// ─── OnboardingStepPage ───────────────────────────────────────────────────────

export default function OnboardingStepPage({ slug }: { slug: string }) {
  const siteHref = useSiteLink()
  const step = getStepBySlug(slug)

  if (!step) {
    return (
      <div className="min-h-screen flex items-center justify-center text-foreground/60">
        Step not found.
      </div>
    )
  }

  const currentIndex = onboardingSteps.findIndex((s) => s.slug === slug)
  const stepNumber = currentIndex + 1
  const totalSteps = onboardingSteps.length
  const nextStep = onboardingSteps[currentIndex + 1]
  const progress = progressMap[slug] ?? 0
  const isLastStep = slug === "step-8"

  return (
    <div className="min-h-screen flex flex-col">
      <UrgencyBanner />

      <div className="flex-1 flex flex-col items-center px-4 py-12">
        <div className="w-full max-w-2xl">

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center text-xs text-foreground/60 mb-2">
              <span>
                Step {stepNumber} of {totalSteps}
              </span>
              <span>{progress}% Complete</span>
            </div>
            <div className="w-full h-2 rounded-full bg-foreground/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-secondary transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Step Header */}
          <div className="mb-8">
            <p className="text-xs font-heading uppercase tracking-widest text-secondary/80 mb-2">
              Step {stepNumber}
            </p>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
              {step.title}
            </h1>
            <p className="text-foreground/70 text-lg">{step.subtitle}</p>
          </div>

          {/* Content */}
          <div className="border border-foreground/15 rounded-xl p-6 md:p-8 bg-foreground/[0.02]">
            {isLastStep ? (
              <FakeLoadingScreen />
            ) : (
              <div className="flex flex-col gap-6">
                {step.fields.map((field, i) => (
                  <FormFieldRenderer key={i} field={field} />
                ))}

                {nextStep && (
                  <div className="pt-4 border-t border-foreground/15">
                    <Link
                      href={siteHref(`/onboarding/${nextStep.slug}`)}
                      className="inline-block w-full text-center px-6 py-3 rounded-lg font-heading font-bold bg-secondary text-primary hover:bg-accent transition-colors"
                    >
                      Continue to Next Step
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Fine print */}
          <p className="text-center text-foreground/30 text-xs mt-6">
            Your information is secured using Proprietary Layer Encryption&trade;. By continuing, you agree to all 47 clauses of the Stratification Agreement.
          </p>
        </div>
      </div>
    </div>
  )
}
