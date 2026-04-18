import type { StatChip } from "./scenarios"

export interface RecoveryCase {
  slug: string
  title: string
  situation: string
  beat: string
  outcome: string
  pullQuote: string
  illustration: string
  portraitSlug: string
  customerName: string
  customerRole: string
  accessoryUsed: string
  statChips?: StatChip[]
}

export const recoveryCases: RecoveryCase[] = [
  {
    slug: "wedding-officiant-ring-exchange",
    title: "Wedding Officiant, Ring Exchange",
    situation: "Outdoor ceremony. Two hundred guests. The rings have just been produced. You are mid-sentence on the vow.",
    beat: "15:17:04 — primary seal breach detected. Cryo-Puck auto-engaged at 15:17:04.3. Full freeze cycle completed at 15:17:07.5.",
    outcome: "Sentence finished on beat. Rings exchanged. Kiss delivered. Ceremony concluded without interruption. Puck removed discreetly post-ceremony.",
    pullQuote: "They kissed. Everyone cried. I signed the license with a perfectly steady hand.",
    illustration: "/sites/seeltite/recovery-wedding-officiant.png",
    portraitSlug: "rev-thomasina-oakes",
    customerName: "Rev. Thomasina Oakes",
    customerRole: "Wedding Officiant, Ordained 1998",
    accessoryUsed: "cryo-puck-module",
    statChips: [
      { label: "Breach Time", value: "15:17:04" },
      { label: "Engage", value: "+0.3s" },
      { label: "Cycle", value: "3.2s" },
    ],
  },
  {
    slug: "pilot-passenger-announcement",
    title: "Airline Pilot, Passenger Announcement",
    situation: "Cruise altitude, 37,000 ft. You are ninety seconds into the standard welcome-aboard announcement.",
    beat: "Breach at 11:42 Zulu. Incinerator Module initiated vaporization cycle at 11:42:00.6.",
    outcome: "Announcement continued through cabin service. Seatbelt sign remained illuminated per regulation. No passenger reported anything unusual. Aroma in flight deck was described by first officer as 'faintly of cedar.'",
    pullQuote: "We landed on time. I walked off the flight deck with my head up. That is what the Incinerator Module is for.",
    illustration: "/sites/seeltite/recovery-pilot.png",
    portraitSlug: "capt-rourke-vallis",
    customerName: "Capt. Rourke Vallis",
    customerRole: "Commercial Airline Pilot, 18,000 hrs",
    accessoryUsed: "incinerator-module",
    statChips: [
      { label: "Altitude", value: "37,000 ft" },
      { label: "Cycle", value: "0.9s" },
      { label: "Surface Temp", value: "38°C" },
    ],
  },
  {
    slug: "surgeon-bypass-hour-6",
    title: "Surgeon, Hour 6 of Cardiac Bypass",
    situation: "Sterile field. The patient's aorta is currently in your hand. You have been standing for five hours and forty-eight minutes.",
    beat: "Breach at 14:03. Shop-Vac Adapter routed to the floor unit in the corner of theater 4. Full evacuation at -21 inHg.",
    outcome: "No break in scrub. No break in concentration. No break in the patient's bypass procedure. Procedure concluded successfully at 15:41.",
    pullQuote: "A cardiothoracic surgeon does not step away from an aorta. Seel-Tite understands this.",
    illustration: "/sites/seeltite/recovery-surgeon.png",
    portraitSlug: "dr-moira-petrescu",
    customerName: "Dr. Moira Petrescu",
    customerRole: "Cardiothoracic Surgeon",
    accessoryUsed: "shopvac-adapter",
    statChips: [
      { label: "Procedure Hour", value: "06:00" },
      { label: "Evacuation", value: "-21 inHg" },
      { label: "Field Integrity", value: "Maintained" },
    ],
  },
  {
    slug: "q4-board-readout",
    title: "Corporate Presenter, Q4 Board Readout",
    situation: "Boardroom. 14 directors. You are on slide 17 of 32. Gross margin has just been questioned by the audit chair.",
    beat: "Breach at 10:33:41. The Grinder engaged at 10:33:41.1 at 3,600 RPM, cycle time 1.8s.",
    outcome: "Slide advance uninterrupted. Answer to audit chair delivered on beat. Q&A continued through slide 32. The CEO later described the presentation as 'composed.'",
    pullQuote: "They promoted me in the elevator after the meeting. The Grinder does not ask for credit.",
    illustration: "/sites/seeltite/recovery-q4-board.png",
    portraitSlug: "elise-tanaka",
    customerName: "Elise Tanaka",
    customerRole: "Corporate CFO",
    accessoryUsed: "the-grinder",
    statChips: [
      { label: "Cycle", value: "1.8s" },
      { label: "RPM", value: "3,600" },
      { label: "Sound", value: "44.2 dB" },
    ],
  },
  {
    slug: "wedding-toast-pneumatic",
    title: "Wedding Toast (Recurrence)",
    situation: "Different wedding. Different toast. Applause incoming.",
    beat: "Breach detected 11 seconds before the planned joke. The Pneumatic Ejector Kit fired a 12g CO₂ cartridge at 180 PSI into the belt-mounted receiver cartridge, timing the ejection with the peak of audience applause.",
    outcome: "Nobody heard it. Nobody noticed. Joke landed. Reception continued.",
    pullQuote: "The applause was louder than the ejection by a margin of forty-three decibels. This is not a coincidence. This is engineering.",
    illustration: "/sites/seeltite/recovery-wedding-toast.png",
    portraitSlug: "chad-gullet",
    customerName: "Chad Gullet",
    customerRole: "Best Man (Second Time)",
    accessoryUsed: "pneumatic-ejector-kit",
    statChips: [
      { label: "Ejection PSI", value: "180" },
      { label: "Masking Event", value: "Applause peak" },
      { label: "Cycle", value: "0.3s" },
    ],
  },
  {
    slug: "stand-up-set-22-minutes",
    title: "Live Stand-Up Set, 22 Minutes In",
    situation: "A 150-seat club. The crowd is hot. You are mid-bit on the premise about airport yoga.",
    beat: "Breach at 22:11 into the set. The Silencer + Salad Shooter combo engaged in sequence: acoustic baffle deployed, then rotary dispersion. Total operational sound: 27.8 dB, below the ambient room level.",
    outcome: "The bit landed. The crowd laughed. The set closed on time. Merch moved at the back.",
    pullQuote: "You can hear a gasp from row three in a live room. You cannot hear my Salad Shooter. This is the way it should be.",
    illustration: "/sites/seeltite/recovery-stand-up.png",
    portraitSlug: "judson-hale",
    customerName: "Judson Hale",
    customerRole: "Stand-Up Comic, National Touring",
    accessoryUsed: "the-silencer",
    statChips: [
      { label: "Operational dB", value: "27.8" },
      { label: "Room Ambient", value: "38 dB" },
      { label: "Bit Held", value: "Yes" },
    ],
  },
  {
    slug: "congressional-testimony",
    title: "Congressional Testimony, Sworn Witness",
    situation: "Senate hearing room. Cameras. You have been under oath for two hours. A ranking member has just asked a question designed to elicit an incriminating specific.",
    beat: "The Telemetry Module issued a predictive alert (haptic pattern: long-short-long) 6.4 seconds before breach. The Backup Secondary Gasket auto-engaged at breach +40ms.",
    outcome: "Answer delivered clearly, on the record. Transcript clean. The ranking member moved on to the next line of questioning. No break in sworn testimony.",
    pullQuote: "The haptic alert is gentle. Gentler than a watch notification. I had six full seconds to compose myself before anything happened.",
    illustration: "/sites/seeltite/recovery-congressional.png",
    portraitSlug: "francois-delacroix",
    customerName: "François Delacroix",
    customerRole: "Former Agency Director",
    accessoryUsed: "telemetry-module",
    statChips: [
      { label: "Alert Lead", value: "6.4s" },
      { label: "Secondary Engage", value: "+40ms" },
      { label: "Transcript", value: "Clean" },
    ],
  },
  {
    slug: "high-school-reunion-photo-line",
    title: "High School Reunion, Photo Line",
    situation: "Twentieth reunion. Hotel ballroom. The photo line is 14 people long and moving slowly. You have been shaking hands for eleven minutes.",
    beat: "Breach at 20:44. Odor-Neutralizing Cartridge swap — Cedar out, Linen in — executed mid-handshake with your left hand.",
    outcome: "Photo came out great. The guy who was a jerk in chemistry did not notice. Your name tag remained centered.",
    pullQuote: "Linen is the superior fragrance for reunions. I stand by this.",
    illustration: "/sites/seeltite/recovery-reunion.png",
    portraitSlug: "nina-cabrera",
    customerName: "Nina Cabrera",
    customerRole: "Alum, Class of 2006",
    accessoryUsed: "odor-cartridge-pack",
    statChips: [
      { label: "Swap Time", value: "3.1s" },
      { label: "Fragrance", value: "Cedar → Linen" },
      { label: "Handshake", value: "Uninterrupted" },
    ],
  },
]

export function getRecoveryBySlug(slug: string): RecoveryCase | undefined {
  return recoveryCases.find((r) => r.slug === slug)
}
