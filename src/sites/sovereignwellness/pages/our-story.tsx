import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Our Story — Sovereign Wellness Co.",
  description: "How we came into possession of the Archive. An abbreviated history of the organization, the filings of 1962, and the three relocations since.",
}

const timeline = [
  { year: "1774", label: "Original Charter", body: "The apothecary hall is chartered in defiance of the Royal Apothecaries Act. Four founding signatories. Their signatures hang, in reproduction, in our corridor today." },
  { year: "1859", label: "The First Quiet", body: "A quiet decade. The hall continues its work. Records are hand-copied into triplicate for the first time." },
  { year: "1904", label: "The Second Quiet", body: "A second quiet decade. The records are hand-copied into quintuplicate. We do not know why." },
  { year: "1962", label: "The Filing", body: "On the afternoon of the 14th of September, the compendium is boxed and carried out by unidentified parties in a convoy of three vehicles. The hall is unoccupied for the next eleven years." },
  { year: "1973", label: "The Return", body: "Three boxes are returned, unmarked, to a side door in the night. The return is not announced. It is not acknowledged. The Archive, partially, resumes." },
  { year: "1994", label: "Dr. Harrow Joins", body: "A former Senior Formulary Advisor walks away from three federal health bodies and arrives at our door with a single notebook. The notebook is absorbed into the Archive. The Archive, for the first time since 1962, is again complete." },
  { year: "2008", label: "The First Relocation", body: "The Archive is relocated for reasons that remain undisclosed. The corridor of portraits is also relocated. The mahogany paneling is not." },
  { year: "2019", label: "The Second Relocation", body: "The Archive is relocated a second time. The portrait corridor is relocated a third time, independently of the Archive, for reasons that also remain undisclosed." },
  { year: "2026", label: "The Present", body: "Sixteen Protocols are now published, by waitlist only. This is the most publicly we have operated in our entire history. We are aware of the risk. We have elected to accept it." },
]

export default function SovereignWellnessOurStory() {
  return (
    <>
      <Hero
        headline="Our Story"
        subheadline="The Filing, the Return, and the inheritance of an Archive that has survived three relocations, two quiets, and one uninterrupted lineage of signatories."
      />

      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto space-y-6 text-foreground/80 leading-relaxed">
          <p className="font-heading text-xl italic text-foreground">
            What follows is the abbreviated account. The full account is held in the Archive, where it will remain.
          </p>
          <p>
            Sovereign Wellness Co. is the contemporary continuation of an apothecary hall originally chartered in 1774 in defiance of the Royal Apothecaries Act. Of the four original signatories, three are buried in known locations. The fourth, as a matter of organizational record, is not.
          </p>
          <p>
            The hall operated without incident for one hundred and eighty-eight years. On the afternoon of the 14th of September, 1962, its compendium of remedies was boxed in lots of twenty and removed by a convoy of three unmarked vehicles. No civil or criminal charges were filed, before, during, or after. The hall was simply emptied, and it remained empty, under the same lease, for the next eleven years.
          </p>
          <p>
            In 1973, three boxes were returned. They were left at a side door. They were not announced. They were not inventoried. We know their return date only because the night watchman noted it in the margin of a ledger, in a hand that was not otherwise his.
          </p>
          <p>
            We continue to operate, with considerable care, from that partial return. The Archive has been supplemented, twice, by individuals who chose to bring us materials they could no longer in good conscience hold. We do not disclose who. We do not disclose when. We disclose only that the Archive, today, contains sixteen Protocols in publishable form and approximately four hundred that are not yet ready.
          </p>
          <p>
            We do not expect to become public. We expect to be found by those who look for us, in the manner that our predecessors were found by those who looked for them. If you are reading this, you have already found us.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 bg-secondary/40 border-y border-primary/20">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-xs tracking-[0.3em] uppercase text-primary/70 mb-3">The Record</p>
          <h2 className="text-3xl font-heading font-semibold text-center mb-16">An Abbreviated Timeline</h2>
          <ol className="space-y-10 border-l-2 border-primary/30 pl-8">
            {timeline.map((entry) => (
              <li key={entry.year} className="relative">
                <span className="absolute -left-[38px] top-1 w-4 h-4 bg-primary border-2 border-secondary" aria-hidden="true" />
                <p className="text-xs tracking-[0.3em] uppercase text-primary/70">{entry.year}</p>
                <h3 className="font-heading text-2xl font-semibold mt-1 mb-2">{entry.label}</h3>
                <p className="text-foreground/80 leading-relaxed">{entry.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  )
}
