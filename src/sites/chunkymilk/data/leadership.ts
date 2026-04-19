export interface Leader {
  slug: string
  person: "bill" | "brandon" | "jim" | "sean"
  name: string
  title: string
  bio: string
  portraitImage: string
}

export const leaders: Leader[] = [
  {
    slug: "bill-whitford",
    person: "bill",
    name: "Bill Whitford",
    title: "Patriarch & Founder",
    bio: "Bill took over the Chunkery from his father Ezra in 1974 and has not missed a chunkin' season since. Rises at four, chunks till noon, answers mail by candlelight.",
    portraitImage: "/sites/chunkymilk/portraits/bill.png",
  },
  {
    slug: "jeb-hollister",
    person: "brandon",
    name: "Jebediah \"Jeb\" Hollister",
    title: "Head of Chunk Grading",
    bio: "Jeb married into the family in 1993 and took over grading two years later after old Clem's eyesight went. Certified by the Appalachian Chunkery Guild. Holds the record for the largest Monumental chunk ever pulled (1.8 lbs, 2011).",
    portraitImage: "/sites/chunkymilk/portraits/jeb.png",
  },
  {
    slug: "otis-clemmons",
    person: "jim",
    name: "Otis P. Clemmons",
    title: "Keeper of the Settlin' Shed",
    bio: "Otis is Bill's second cousin on his mother's side and has run the Settlin' Shed for thirty-one years. He is the only living person who knows where the keys to the shed are kept. He has never given an interview.",
    portraitImage: "/sites/chunkymilk/portraits/otis.png",
  },
  {
    slug: "silas-mercer",
    person: "sean",
    name: "Silas Mercer",
    title: "Land & Heritage Steward",
    bio: "Silas came up from the next hollow over in 1998 and never left. Walks the Whitford land daily, tends the four fields by name, keeps the family cemetery clear. Bill considers him kin. Silas does not comment on this.",
    portraitImage: "/sites/chunkymilk/portraits/silas.png",
  },
]
