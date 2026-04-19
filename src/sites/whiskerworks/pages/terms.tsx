export const metadata = {
  title: "Terms of Service — Whiskerworks",
  description: "Terms governing enrollment at Whiskerworks Advanced Feline Training Institute.",
}

export default function WhiskerworksTerms() {
  return (
    <section className="bg-background">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-heading text-text">Terms of Service</h1>

        <div className="mt-6 border-l-4 border-accent bg-accent/10 p-5 rounded-r-lg">
          <p className="font-bold text-text mb-1">Official Umbrella Terms</p>
          <p className="text-sm text-text/80">
            The authoritative terms for all Specific Industries properties — including Whiskerworks — are maintained at{" "}
            <a href="https://specificindustries.com/terms" className="underline font-bold text-accent">specificindustries.com/terms</a>.
            The text below is provided for convenience and flavor; in the event of any conflict, the umbrella terms govern.
          </p>
        </div>

        <p className="mt-6 text-sm italic text-text/60">
          Effective: the day you first visited. Retroactively.
        </p>

        <h2 className="mt-8 text-xl font-heading text-primary">1. Enrollment</h2>
        <p className="mt-2 text-text/80">
          Enrollment is open to any cat, of any age, at any level of prior training. Enrollment is not open to non-cats, with the exception of the Therapist program, which also accepts certain dogs, case by case.
        </p>

        <h2 className="mt-6 text-xl font-heading text-primary">2. Tuition</h2>
        <p className="mt-2 text-text/80">
          Tuition is published per program and may be paid in full or in 24 easy payments. You will note that the full price and the sum of 24 monthly payments do not match. This is a feature of the program, not an error.
        </p>

        <h2 className="mt-6 text-xl font-heading text-primary">3. Refunds</h2>
        <p className="mt-2 text-text/80">
          No refunds are issued under any circumstances. This is explicit. It is printed on our laminated flyers and on every door in Suite 208.
        </p>

        <h2 className="mt-6 text-xl font-heading text-primary">4. Graduation</h2>
        <p className="mt-2 text-text/80">
          Graduation is contingent on completion of all weekly modules plus one capstone. Graduates receive a diploma, a lanyard, and a letter of recommendation addressed to an employer of the graduate's choosing. The letter is one sentence.
        </p>

        <h2 className="mt-6 text-xl font-heading text-primary">5. Code of Conduct</h2>
        <p className="mt-2 text-text/80">
          Students must not: knock laptops off desks during instruction; bite the instructor (except as taught in Advanced Marksmanship); or enroll in the Blackbook Division without express invitation. The last item is enforced by the Blackbook Division itself.
        </p>

        <h2 className="mt-6 text-xl font-heading text-primary">6. Dispute Resolution</h2>
        <p className="mt-2 text-text/80">
          All disputes are resolved in the Suite 208 break room, by Cornelius Whitfield, on a rolling first-come basis. Bring a token of goodwill. A receipt for catnip has been accepted twice.
        </p>

        <p className="mt-10 text-sm italic text-text/60 pt-4 border-t border-text/10">
          For binding legal terms, always refer to the Specific Industries umbrella policy at{" "}
          <a href="https://specificindustries.com/terms" className="underline text-accent">specificindustries.com/terms</a>.
        </p>
      </div>
    </section>
  )
}
