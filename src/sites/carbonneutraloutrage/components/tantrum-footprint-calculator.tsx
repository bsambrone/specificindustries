"use client"

import { useState } from "react"

interface CalculatorResult {
  kgCO2e: number
  drivingMiles: number
  recommendedOffset: string
}

function calculate(input: { decibels: number; minutes: number; slammedDoors: number; profanity: number }): CalculatorResult {
  const kg = input.decibels * 0.01 + input.minutes * 0.05 + input.slammedDoors * 0.4 + input.profanity * 0.02
  const rounded = Math.round(kg * 100) / 100
  // 1 kg CO2e ≈ 2.5 miles driven (approximate, similar to public estimators)
  const miles = Math.round(rounded * 2.5 * 10) / 10
  const offset = `${rounded.toFixed(2)} kg CO₂e — purchase ${Math.ceil(rounded)} Verified Outrage Offsets™`
  return { kgCO2e: rounded, drivingMiles: miles, recommendedOffset: offset }
}

export function TantrumFootprintCalculator() {
  const [decibels, setDecibels] = useState(72)
  const [minutes, setMinutes] = useState(4)
  const [slammedDoors, setSlammedDoors] = useState(1)
  const [profanity, setProfanity] = useState(6)
  const [result, setResult] = useState<CalculatorResult | null>(null)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setResult(calculate({ decibels, minutes, slammedDoors, profanity }))
  }

  return (
    <div className="border border-accent/30 rounded-lg p-6 bg-white">
      <h3 className="text-xl font-heading font-semibold text-primary mb-4">Run Your Calculation</h3>
      <p className="text-sm text-foreground/60 mb-6">Default values reflect the suburban-quartile mean. Adjust to match your incident.</p>
      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <label className="block text-sm text-foreground/80 font-medium mb-1" htmlFor="cso-decibels">
            Peak decibels <span className="text-foreground/40 font-normal">({decibels} dB)</span>
          </label>
          <input
            id="cso-decibels"
            type="range"
            min={50}
            max={120}
            value={decibels}
            onChange={(e) => setDecibels(Number(e.target.value))}
            className="w-full accent-primary"
          />
        </div>
        <div>
          <label className="block text-sm text-foreground/80 font-medium mb-1" htmlFor="cso-minutes">
            Duration in minutes
          </label>
          <input
            id="cso-minutes"
            type="number"
            min={0}
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
            className="w-full border border-accent/30 rounded px-3 py-2 bg-background text-foreground"
          />
        </div>
        <div>
          <label className="block text-sm text-foreground/80 font-medium mb-1" htmlFor="cso-doors">
            Slammed door count
          </label>
          <input
            id="cso-doors"
            type="number"
            min={0}
            value={slammedDoors}
            onChange={(e) => setSlammedDoors(Number(e.target.value))}
            className="w-full border border-accent/30 rounded px-3 py-2 bg-background text-foreground"
          />
        </div>
        <div>
          <label className="block text-sm text-foreground/80 font-medium mb-1" htmlFor="cso-profanity">
            Profanity count
          </label>
          <input
            id="cso-profanity"
            type="number"
            min={0}
            value={profanity}
            onChange={(e) => setProfanity(Number(e.target.value))}
            className="w-full border border-accent/30 rounded px-3 py-2 bg-background text-foreground"
          />
        </div>
        <button
          type="submit"
          className="w-full px-6 py-3 bg-primary text-background rounded font-semibold uppercase tracking-wider text-sm hover:opacity-90 transition-opacity"
        >
          Calculate Footprint
        </button>
      </form>

      {result && (
        <div className="mt-6 p-5 border border-primary/30 rounded bg-primary/5">
          <p className="text-sm text-foreground/60 mb-2">Your last tantrum emitted</p>
          <p className="text-3xl font-heading font-bold text-primary">{result.kgCO2e.toFixed(2)} kg CO₂e</p>
          <p className="text-sm text-foreground/70 mt-3">
            Equivalent to driving <strong>{result.drivingMiles}</strong> miles.
          </p>
          <p className="text-xs text-foreground/60 mt-3 italic">{result.recommendedOffset}</p>
        </div>
      )}

      <details className="mt-6 text-xs text-foreground/50">
        <summary className="cursor-pointer hover:text-foreground/80">Methodology (v4.2)</summary>
        <p className="mt-2 leading-relaxed">
          The Tantrum Footprint methodology converts qualitative incident attributes into kg CO₂e using the formula:
          <code className="block bg-background/60 p-2 rounded my-2">kg CO₂e = (dB × 0.01) + (minutes × 0.05) + (slammedDoors × 0.4) + (profanity × 0.02)</code>
          Coefficients are calibrated against the Campaign&apos;s 2024 incident registry (n = 8,400) and reviewed annually.
          Driving-distance equivalents use the EPA&apos;s standard passenger-vehicle CO₂e factor.
        </p>
      </details>
    </div>
  )
}
