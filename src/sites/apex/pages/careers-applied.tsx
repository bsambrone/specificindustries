"use client"

import { Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { getJobBySlug } from "../data/careers"

function AppliedBody() {
  const searchParams = useSearchParams()
  const slug = searchParams.get("role") ?? ""
  const job = slug ? getJobBySlug(slug) : undefined

  return (
    <section className="py-24 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">Thank you.</h1>
        <p className="text-foreground/80 leading-relaxed mb-4">
          We have received your application{job ? <> for the role of <em className="font-heading">{job.title}</em></> : ""}.
        </p>
        <p className="text-foreground/80 leading-relaxed mb-8">
          You will hear from us when a decision has been made. No decision is currently scheduled.
        </p>
        <Link
          href="/careers"
          className="inline-block text-sm font-heading text-primary hover:underline"
        >
          ← Return to all openings
        </Link>
      </div>
    </section>
  )
}

export default function CareersApplied() {
  return (
    <Suspense fallback={null}>
      <AppliedBody />
    </Suspense>
  )
}
