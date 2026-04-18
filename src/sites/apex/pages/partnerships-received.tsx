import Link from "next/link"

export default function PartnershipsReceived() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
          Submission Received.
        </h1>
        <p className="text-foreground/80 leading-relaxed mb-4">
          Your industry has been submitted and filed in our intake system.
        </p>
        <p className="text-foreground/80 leading-relaxed mb-4">
          Our current evaluation queue is 14 to 18 months. If your industry is selected for further discussion, we will contact you by written correspondence. If it is not selected, you will not hear from us.
        </p>
        <p className="text-foreground/60 text-sm leading-relaxed mb-8 italic">
          Please do not follow up on your submission. Follow-up inquiries are not responded to.
        </p>
        <Link
          href="/"
          className="inline-block text-sm font-heading text-primary hover:underline"
        >
          ← Return to Specific Industries
        </Link>
      </div>
    </section>
  )
}
