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
    title: "Officiating, Ring Exchange",
    situation: "Outdoor ceremony. Two hundred guests. The rings have been produced and you're mid-vow.",
    beat: "You gambled at 15:17:04 and lost. The Cryo-Puck engaged in three tenths of a second and completed its freeze cycle by 15:17:07.5.",
    outcome: "Vow finished on beat. Rings exchanged. Kiss delivered. The puck slipped into my pocket after the recessional. The guests saw none of it.",
    pullQuote: "They kissed. Everyone cried. I signed the license with a perfectly steady hand.",
    illustration: "/sites/seeltite/recovery-wedding-officiant.png",
    portraitSlug: "rev-thomasina-oakes",
    customerName: "Rev. Thomasina Oakes",
    customerRole: "Wedding Officiant, Ordained 1998",
    accessoryUsed: "cryo-puck-module",
    statChips: [
      { label: "Breach Time",      value: "15:17:04" },
      { label: "Engage",           value: "+0.3s" },
      { label: "Cycle",            value: "3.2s" },
      { label: "Gamble Lost",      value: "YES" },
      { label: "Damage Avoided",   value: "TOTAL" },
      { label: "Embarrassment",   value: "ZERO" },
    ],
  },
  {
    slug: "pilot-passenger-announcement",
    title: "Cockpit Announcement, 37,000 ft",
    situation: "Cruise altitude. Ninety seconds into the welcome-aboard.",
    beat: "The gamble went wrong at 11:42 Zulu. The Incinerator fired its cycle at 11:42:00.6.",
    outcome: "Announcement continued through meal service. Seatbelt sign stayed on per regulation. The first officer said the flight deck smelled \"faintly of cedar.\"",
    pullQuote: "We landed on time and I walked off with my head up. That's what the Incinerator is for.",
    illustration: "/sites/seeltite/recovery-pilot.png",
    portraitSlug: "capt-rourke-vallis",
    customerName: "Capt. Rourke Vallis",
    customerRole: "Commercial Airline Pilot, 18,000 hrs",
    accessoryUsed: "incinerator-module",
    statChips: [
      { label: "Altitude",         value: "37,000 ft" },
      { label: "Cycle",            value: "0.9s" },
      { label: "Surface Temp",     value: "38°C" },
      { label: "Gamble Lost",      value: "YES" },
      { label: "Damage Avoided",   value: "TOTAL" },
      { label: "Embarrassment",   value: "ZERO" },
    ],
  },
  {
    slug: "surgeon-bypass-hour-6",
    title: "Cardiac Bypass, Hour 6",
    situation: "Sterile field. The aorta is currently in my hand. I've been standing since eight in the morning.",
    beat: "Gamble at 14:03. The Shop-Vac Adapter had been pre-routed to the floor unit at the start of the procedure — exactly for this reason.",
    outcome: "No break in scrub. No break in concentration. The procedure concluded successfully at 15:41.",
    pullQuote: "A cardiothoracic surgeon does not step away from an aorta. Seel-Tite gets that.",
    illustration: "/sites/seeltite/recovery-surgeon.png",
    portraitSlug: "dr-moira-petrescu",
    customerName: "Dr. Moira Petrescu",
    customerRole: "Cardiothoracic Surgeon",
    accessoryUsed: "shopvac-adapter",
    statChips: [
      { label: "Procedure Hour",   value: "06:00" },
      { label: "Evacuation",       value: "-21 inHg" },
      { label: "Field Integrity",  value: "Maintained" },
      { label: "Gamble Lost",      value: "YES" },
      { label: "Damage Avoided",   value: "TOTAL" },
      { label: "Embarrassment",   value: "ZERO" },
    ],
  },
  {
    slug: "q4-board-readout",
    title: "Q4 Board Readout, Slide 17 of 32",
    situation: "Boardroom. Fourteen directors. The audit chair has just questioned the gross margin.",
    beat: "10:33:41. I bet wrong. The Grinder was already paired — one tenth of a second later it was spinning at 3,600 RPM.",
    outcome: "Slide advanced on beat. Answer to audit chair delivered cleanly. Q&A continued through slide 32. The CEO described the presentation as \"composed.\"",
    pullQuote: "They promoted me in the elevator after the meeting. The Grinder does not ask for credit.",
    illustration: "/sites/seeltite/recovery-q4-board.png",
    portraitSlug: "elise-tanaka",
    customerName: "Elise Tanaka",
    customerRole: "Corporate CFO",
    accessoryUsed: "the-grinder",
    statChips: [
      { label: "Cycle",            value: "1.8s" },
      { label: "RPM",              value: "3,600" },
      { label: "Sound",            value: "44.2 dB" },
      { label: "Gamble Lost",      value: "YES" },
      { label: "Damage Avoided",   value: "TOTAL" },
      { label: "Embarrassment",   value: "ZERO" },
    ],
  },
  {
    slug: "wedding-toast-pneumatic",
    title: "Wedding Toast (Recurrence)",
    situation: "Different wedding. Different toast. Applause inbound.",
    beat: "The gamble broke eleven seconds before the planned joke. The Pneumatic Ejector fired its CO₂ cartridge into the receiver, timing its 180 PSI discharge to the peak of ovation.",
    outcome: "Nobody heard it. Nobody noticed. Joke landed. Reception continued.",
    pullQuote: "The applause was forty-three decibels louder than the ejection. That is not coincidence.",
    illustration: "/sites/seeltite/recovery-wedding-toast.png",
    portraitSlug: "chad-gullet",
    customerName: "Chad Gullet",
    customerRole: "Best Man (Second Time)",
    accessoryUsed: "pneumatic-ejector-kit",
    statChips: [
      { label: "Ejection PSI",     value: "180" },
      { label: "Masking Event",    value: "Applause peak" },
      { label: "Cycle",            value: "0.3s" },
      { label: "Gamble Lost",      value: "YES" },
      { label: "Damage Avoided",   value: "TOTAL" },
      { label: "Embarrassment",   value: "ZERO" },
    ],
  },
  {
    slug: "stand-up-set-22-minutes",
    title: "Live Stand-Up, Minute 22",
    situation: "A 150-seat room. The crowd is hot. I'm mid-bit on the airport yoga premise.",
    beat: "Lost gamble at 22:11. The Silencer and Salad Shooter fired in sequence: baffle first, then the rotary dispersion. Operational sound clocked at 27.8 dB — below the room's ambient.",
    outcome: "The bit landed. The crowd laughed. Set closed on time. Merch moved at the back.",
    pullQuote: "You can hear a gasp from row three in a live room. You cannot hear my Salad Shooter. That's how it should be.",
    illustration: "/sites/seeltite/recovery-stand-up.png",
    portraitSlug: "judson-hale",
    customerName: "Judson Hale",
    customerRole: "Stand-Up Comic, National Touring",
    accessoryUsed: "the-silencer",
    statChips: [
      { label: "Operational dB",   value: "27.8" },
      { label: "Room Ambient",     value: "38 dB" },
      { label: "Bit Held",         value: "Yes" },
      { label: "Gamble Lost",      value: "YES" },
      { label: "Damage Avoided",   value: "TOTAL" },
      { label: "Embarrassment",   value: "ZERO" },
    ],
  },
  {
    slug: "congressional-testimony",
    title: "Sworn Testimony, Senate Hearing Room",
    situation: "Under oath for two hours. Cameras. A ranking member has just asked a question designed to elicit a specific I had prepared to not give.",
    beat: "The Telemetry Module issued a haptic alert — long, short, long — 6.4 seconds before the breach. The Backup Secondary Gasket auto-engaged at breach +40ms.",
    outcome: "Answer delivered clearly on the record. Transcript clean. Ranking member moved on.",
    pullQuote: "The haptic alert is gentler than a watch notification. Six full seconds of warning changes the game.",
    illustration: "/sites/seeltite/recovery-congressional.png",
    portraitSlug: "francois-delacroix",
    customerName: "François Delacroix",
    customerRole: "Former Agency Director",
    accessoryUsed: "telemetry-module",
    statChips: [
      { label: "Alert Lead",       value: "6.4s" },
      { label: "Secondary Engage", value: "+40ms" },
      { label: "Transcript",       value: "Clean" },
      { label: "Gamble Lost",      value: "YES" },
      { label: "Damage Avoided",   value: "TOTAL" },
      { label: "Embarrassment",   value: "ZERO" },
    ],
  },
  {
    slug: "high-school-reunion-photo-line",
    title: "Reunion Photo Line, 20th",
    situation: "Hotel ballroom. Photo line fourteen people deep. I've been shaking hands for eleven minutes.",
    beat: "Breach at 20:44. Odor-neutralizing cartridge swap — Cedar out, Linen in — executed with the left hand mid-handshake.",
    outcome: "Photo came out great. The guy who was a jerk in chemistry did not notice. My name tag stayed centered.",
    pullQuote: "Linen is the superior fragrance for reunions. I stand by this.",
    illustration: "/sites/seeltite/recovery-reunion.png",
    portraitSlug: "nina-cabrera",
    customerName: "Nina Cabrera",
    customerRole: "Alum, Class of 2006",
    accessoryUsed: "odor-cartridge-pack",
    statChips: [
      { label: "Swap Time",        value: "3.1s" },
      { label: "Fragrance",        value: "Cedar → Linen" },
      { label: "Handshake",        value: "Uninterrupted" },
      { label: "Gamble Lost",      value: "YES" },
      { label: "Damage Avoided",   value: "NEAR-TOTAL" },
      { label: "Embarrassment",   value: "MINIMAL" },
    ],
  },
]

export function getRecoveryBySlug(slug: string): RecoveryCase | undefined {
  return recoveryCases.find((r) => r.slug === slug)
}
