import { Hero } from "@/components/ui/hero"
import { Timeline } from "@/components/ui/timeline"

export const metadata = {
  title: "Heritage — Whitford Family Chunky Milk",
  description: "Six generations, one hollow, and the chunks we have never once considered giving up.",
}

const timelineItems = [
  { year: "1867", description: "Ezekiel Whitford, resting on what would come to be called Chunk Rock, first notices the chunks were good. He does not write it down. He tells his wife. She nods." },
  { year: "1872", description: "Ezekiel fences the North Field. Keeps seven cows. Begins bottling for neighbors." },
  { year: "1884", description: "The Appalachian Chunkery Guild is established in a neighboring county. Ezekiel is invited to join. He declines." },
  { year: "1901", description: "Ezekiel's son, Obadiah, inherits the hollow. Opens the Sycamore Field. First Whitford jar bears the family name on a printed label." },
  { year: "1923", description: "The original Settlin' Shed is built by Obadiah and his sons. The keys are not yet in any one person's pocket." },
  { year: "1938", description: "Bill's grandfather, Horace, fences the High Meadow. The fence is still there." },
  { year: "1951", description: "The stoneware crocks that still rest the Patriarch Reserve are fired by a potter two hollows over. He charges what he charges; Horace pays what he asks." },
  { year: "1967", description: "The hundredth year. A small gathering is held at Chunk Rock. No photographs were taken; someone forgot the camera." },
  { year: "1974", description: "Bill Whitford takes over the Chunkery from his father Ezra, who retires to sit on the porch. Bill has not missed a chunkin' season since." },
  { year: "1987", description: "Aunt Mable draws the map of the hollow that hangs in the Settlin' Shed office and is reproduced on the Our Hollow page." },
  { year: "1993", description: "Jeb Hollister marries into the family and begins assisting with grading." },
  { year: "1998", description: "Silas Mercer comes up from the next hollow over to help during a calving season. He stays." },
  { year: "2011", description: "Jeb pulls the largest Monumental chunk ever recorded: 1.8 lbs. Witnessed by Otis and Silas. A note is kept in the Hollow Journal. The chunk is not sold." },
  { year: "2019", description: "The first Patriarch Reserve release of the modern era — 42 jars, each marked by Bill, released only when Otis allows. The practice continues." },
  { year: "2026", description: "The sixth generation of Whitfords is at the Chunkery. The chunks have not changed. Neither have we." },
]

export default function HeritagePage() {
  return (
    <>
      <Hero
        headline="Heritage"
        subheadline="One hundred and fifty-nine years. Six generations. The chunks we have never once considered giving up."
      />

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-primary">The Whitford Line</h2>
          <p className="text-foreground/60 mt-2">From Ezekiel&apos;s first jar to whatever Bill pulls tomorrow.</p>
        </div>
        <Timeline items={timelineItems} />
      </section>

      <section className="py-16 px-4 bg-secondary/30 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-2xl font-heading text-primary leading-relaxed italic">
            &ldquo;We do not innovate. We continue.&rdquo;
          </p>
          <p className="mt-4 text-sm text-foreground/60">— Bill Whitford, in the only interview he has given</p>
        </div>
      </section>
    </>
  )
}
