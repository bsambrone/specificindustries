import type { ForumThread, BoardKey } from "../types"
import { USERNAME_BY_AVATAR, getAvatarForUsername } from "./forum-users"

// Helper to build a reply — ensures avatar path matches username.
function reply(username: string, postedAt: string, body: string, reactions?: { emoji: string; count: number }[]) {
  const avatar = getAvatarForUsername(username)
  if (!avatar) throw new Error(`Unknown username: ${username}`)
  return { username, avatar, postedAt, body, reactions }
}

export const threads: ForumThread[] = [
  // ─── Atmospheric Anomalies — 5 threads ───────────────
  {
    slug: "cross-hatch-over-memphis-again",
    board: "atmospheric-anomalies",
    title: "Cross-hatch over Memphis AGAIN — 3rd Tuesday in a row",
    hot: true,
    pinned: false,
    op: reply(
      "DuvallDocuments",
      "14 hours ago",
      "Third consecutive Tuesday. Same grid orientation. 2:47 PM start, dispersal complete by 5:10. I've got photos from the Shelby Farms overlook if anyone wants to cross-reference against flight data. What are we looking at here.",
      [{ emoji: "👁", count: 47 }, { emoji: "🔥", count: 12 }],
    ),
    replies: [
      reply(
        "AshbySignal",
        "13 hours ago",
        "Same thing over Cincinnati yesterday. I stopped trusting coincidence at occurrence number 2.",
        [{ emoji: "👁", count: 19 }],
      ),
      reply(
        "WhittakerWatcher",
        "12 hours ago",
        "Pull the METAR archive for your window and cross it against any commercial-flight path. If it's not in the flight data, it's not a plane. Simple as.",
      ),
      reply(
        "GulletAwakened",
        "11 hours ago",
        "Happened in Tulsa on Monday. I've been logging it for 9 weeks. The grid rotates by what looks like 7 degrees per week. Something is being calibrated.",
        [{ emoji: "🔥", count: 31 }],
      ),
      reply(
        "DuvallDocuments",
        "9 hours ago",
        "Calibrated to what though. That's the part that keeps me up. Not *that* it's happening. What it's *measuring*.",
        [{ emoji: "👁", count: 22 }],
      ),
      reply(
        "CabreraCortex",
        "6 hours ago",
        "Cross-reference your dates against regional coffee-chain promotional calendars. Send me a DM and I'll show you what I found for the Memphis market. You will not like it.",
        [{ emoji: "🛸", count: 18 }],
      ),
      reply(
        "BronwynBroadcast",
        "3 hours ago",
        "Screenshotting this whole thread before it disappears. Happens every time these ones get above 40 replies.",
        [{ emoji: "👁", count: 9 }],
      ),
    ],
  },

  {
    slug: "clouds-on-4-11-were-wrong",
    board: "atmospheric-anomalies",
    title: "The clouds on 4/11 were WRONG. Anyone else?",
    hot: true,
    pinned: false,
    op: reply(
      "ArcherAtmosphere",
      "2 days ago",
      "I don't know how else to describe it. The cloud cover on April 11th looked rendered. Edges too sharp, shadows pointing two different directions over Albuquerque between 6:10 and 6:40 PM. Took 14 photos before the sky corrected itself. I'm not a crank — I ran a VFX pipeline for 11 years and I know a compositing error when I see one.",
      [{ emoji: "👁", count: 52 }, { emoji: "🔥", count: 28 }],
    ),
    replies: [
      reply(
        "WhittakerWatcher",
        "2 days ago",
        "Two light sources = two suns, or a missed occlusion pass. Neither is meteorologically possible. Post the photos.",
        [{ emoji: "🔥", count: 17 }],
      ),
      reply(
        "KerriganKnows",
        "2 days ago",
        "Just joined this forum yesterday and this is the exact thing I saw in Flagstaff on the 11th. I thought I was losing it. I'm actually shaking right now.",
      ),
      reply(
        "ArcherAtmosphere",
        "2 days ago",
        "@KerriganKnows welcome. You are not losing it. Log the time, direction you were facing, and anything that felt subjectively 'off' beyond the visual. The subjective layer is data too.",
        [{ emoji: "👁", count: 12 }],
      ),
      reply(
        "MazettiMidnight",
        "yesterday",
        "Same evening, Kansas City, my dog would not look up. Not once. He's normally a cloud-tracker. He knew.",
        [{ emoji: "👁", count: 24 }],
      ),
      reply(
        "HaleOnHigh",
        "yesterday",
        "we talked about this in 2019. the render budget gets thin on tuesdays and fridays. nothing has changed. nothing will.",
        [{ emoji: "🛸", count: 33 }],
      ),
      reply(
        "FinchFrequency",
        "18 hours ago",
        "Correlate with the 19.7 Hz hum I documented that night. If anyone felt pressure behind the eyes 6-7 PM local, that's the marker.",
      ),
    ],
  },

  {
    slug: "humidity-readings-during-chemtrail-event-18-month-log",
    board: "atmospheric-anomalies",
    title: "Humidity readings during a chemtrail event — my 18-month log",
    hot: false,
    pinned: false,
    op: reply(
      "AshbySignal",
      "4 days ago",
      "Posting the full dataset because I'm tired of being told 'it's just contrails.' 18 months of hourly RH readings from a calibrated sensor on my roof (Vaisala HMP60, recertified March 2025). During confirmed grid-dispersal events, relative humidity drops 4-11% within 90 minutes DESPITE visible moisture content in the sky. That is not how contrails work. Contrails require supersaturation. This is the opposite of that.",
      [{ emoji: "🔥", count: 41 }, { emoji: "👁", count: 29 }, { emoji: "📡", count: 14 }],
    ),
    replies: [
      reply(
        "WhittakerWatcher",
        "4 days ago",
        "This is the cleanest chemtrail-adjacent dataset I've seen posted here. Thank you for using a calibrated instrument. Most 'evidence' in this board is a phone camera and a vibe.",
        [{ emoji: "🔥", count: 22 }],
      ),
      reply(
        "DuvallDocuments",
        "4 days ago",
        "18-month log with RH drops of 4-11% during events — that's a deposition signature, not condensation. Something is BINDING to the moisture and pulling it down. Which means we can test for what.",
      ),
      reply(
        "BriggsOffGrid",
        "3 days ago",
        "Run the same sensor at 500 ft elevation delta and you'll isolate the layer. I did this in '22 over the Rockies. The active layer is between 2,100 and 3,400 feet AGL depending on wind. Consistent.",
        [{ emoji: "📡", count: 18 }],
      ),
      reply(
        "AshbySignal",
        "3 days ago",
        "@BriggsOffGrid I don't have a second sensor but I'm saving for one. If anyone in ABQ has an HMP60 or equivalent they'd loan for a weekend, DM me.",
      ),
      reply(
        "TrestleTrue",
        "2 days ago",
        "Forward this to the Library section. We're bleeding evidence into threads that get archived and it's frustrating.",
        [{ emoji: "⚠️", count: 11 }],
      ),
      reply(
        "MuncyVigilant",
        "yesterday",
        "Noting for the record: Ashby's methodology is the bar. If your post is a sky photo without a timestamp you should delete it and start over.",
      ),
    ],
  },

  {
    slug: "birds-stopped-singing-4-minutes",
    board: "atmospheric-anomalies",
    title: "Birds stopped singing for 4 minutes. Then started again in unison.",
    hot: false,
    pinned: false,
    op: reply(
      "OakesObserves",
      "yesterday",
      "Sunday morning, 7:12 AM, my backyard in Asheville. I was doing my usual dawn listen — I keep a birding journal, 14 years of data. At 7:12:04 every bird within earshot went silent. Not 'quieter.' Silent. Four minutes and nine seconds later, every species resumed simultaneously. That is not how birdsong works. Different species have different triggers. They did not re-start on staggered cues. They re-started on one cue.",
      [{ emoji: "👁", count: 38 }, { emoji: "🔥", count: 15 }],
    ),
    replies: [
      reply(
        "SanderlingSaw",
        "yesterday",
        "confirmed. same thing, same morning. Chattanooga. 7:12-7:16 local. my neighbor's chickens too.",
        [{ emoji: "👁", count: 27 }],
      ),
      reply(
        "FaulkOnTheFence",
        "yesterday",
        "Birds are the canary. Literally. If they all hit a pause button at the same second something entered the ambient field that they can sense and we can't.",
        [{ emoji: "🔥", count: 19 }],
      ),
      reply(
        "FinchFrequency",
        "22 hours ago",
        "Pull any infrasound data you can find for Sunday 7 AM EST. My bet: a pulse between 7 and 14 Hz, roughly 240-second duration with a sharp fall-off.",
      ),
      reply(
        "OakesObserves",
        "18 hours ago",
        "@FinchFrequency I don't have infrasound equipment but if someone in this thread does — east coast, Sunday morning — please post your data. This was a regional event.",
      ),
      reply(
        "HaleOnHigh",
        "14 hours ago",
        "the birds knew in 2011. they know now. ask yourself why you didn't.",
        [{ emoji: "🛸", count: 24 }],
      ),
      reply(
        "BronwynBroadcast",
        "9 hours ago",
        "Screenshotted. Archiving to the shared drive. Threads like this disappear if they get traction.",
      ),
    ],
  },

  {
    slug: "mom-is-starting-to-notice",
    board: "atmospheric-anomalies",
    title: "Mom is starting to notice",
    hot: false,
    pinned: false,
    op: reply(
      "KerriganKnows",
      "3 days ago",
      "I didn't think this day would come. My mom — who has spent 6 years calling me paranoid — texted me a photo of the sky over her retirement community this morning and said 'is this what you've been talking about.' I don't know how to respond. Part of me wants to say 'FINALLY' and part of me knows she is going to have a very hard few months. What do I tell her.",
      [{ emoji: "👁", count: 61 }, { emoji: "🔥", count: 22 }],
    ),
    replies: [
      reply(
        "OakesObserves",
        "3 days ago",
        "Be gentle. Don't dump the full picture on her in one conversation. Start with ONE observation she can verify herself tomorrow. Let her find the rest.",
        [{ emoji: "🔥", count: 34 }],
      ),
      reply(
        "DuvallDocuments",
        "3 days ago",
        "I lost my dad to the awareness transition in 2022 (mentally — he's fine, but different). The grief phase is real. Warn her to expect it.",
      ),
      reply(
        "GulletAwakened",
        "2 days ago",
        "send her the intro theories in the library. nothing too deep. 'water memory' and 'soft ionization' are safe starters. NOT reptilian. NOT yet.",
        [{ emoji: "👁", count: 18 }],
      ),
      reply(
        "KerriganKnows",
        "2 days ago",
        "Thank you all. I called her last night. She asked me if I was safe. I told her yes. She cried. I cried. We watched the sky together on speakerphone for an hour.",
        [{ emoji: "🔥", count: 87 }, { emoji: "👁", count: 41 }],
      ),
      reply(
        "MorrisseyMarginalia",
        "yesterday",
        "This is the most healing thing I've read on this forum in 8 months. Hug her twice as hard next time.",
      ),
      reply(
        "MazettiMidnight",
        "18 hours ago",
        "Welcome to your mother. Again.",
        [{ emoji: "👁", count: 52 }],
      ),
    ],
  },

  // ─── Reptilian Sightings — 5 threads ───────────────
  {
    slug: "senator-blinked-sideways-at-rally",
    board: "reptilian-sightings",
    title: "Saw a senator blink sideways — at a rally, on camera. Time-stamped.",
    hot: true,
    pinned: false,
    op: reply(
      "PepperdineProof",
      "yesterday",
      "Watched the Wednesday town hall live stream, the one in Raleigh. At 1:14:22 the senator (I'm not naming, you'll see) does a FULL NICTITATING BLINK. Horizontal. Left-to-right across the eyeball. It's 4 frames, roughly 133ms. Paused, screenshotted, cropped, denoised. Not a blink artifact. Not a compression glitch. A lateral membrane. I've been looking for this for 6 years and I finally have it.",
      [{ emoji: "🦎", count: 94 }, { emoji: "🔥", count: 41 }, { emoji: "👁", count: 28 }],
    ),
    replies: [
      reply(
        "TanakaTransmits",
        "yesterday",
        "Post the cropped frames. Timestamp + URL to the original stream. We need chain of custody or it gets dismissed.",
        [{ emoji: "🦎", count: 12 }],
      ),
      reply(
        "PepperdineProof",
        "23 hours ago",
        "@TanakaTransmits uploaded to the evidence section with ID RPT-0414-14b. Original stream is still up as of 9 AM. Mirror your copies now.",
      ),
      reply(
        "Dr_Petrescu_ret",
        "22 hours ago",
        "The nictitating membrane in primates is vestigial and non-functional. What you are describing is not vestigial. In 31 years of clinical practice I never encountered a human with a functional horizontal membrane. Not once.",
        [{ emoji: "🔥", count: 58 }, { emoji: "🦎", count: 19 }],
      ),
      reply(
        "TrenchCoat_Seer",
        "20 hours ago",
        "this makes the 4th senator. the pattern is committee assignments. cross-reference intelligence and appropriations seats. that's where they cluster.",
        [{ emoji: "🦎", count: 33 }],
      ),
      reply(
        "KileWasRight",
        "16 hours ago",
        "Called this in 2017. Nobody listened. Carry on.",
      ),
      reply(
        "BronwynBroadcast",
        "11 hours ago",
        "Stream is already edited. The 1:14:22 mark now cuts to a wide shot. Confirming my mirror is intact. Anyone else still have the raw?",
        [{ emoji: "⚠️", count: 42 }, { emoji: "👁", count: 24 }],
      ),
      reply(
        "PepperdineProof",
        "8 hours ago",
        "Edited within 18 hours of the original broadcast. They never cover it this fast unless the footage is a liability. This is the moment, people.",
        [{ emoji: "🔥", count: 67 }],
      ),
    ],
  },

  {
    slug: "dentist-confirmed-wont-return-calls",
    board: "reptilian-sightings",
    title: "Dentist confirmed what I suspected. Won't return my calls now.",
    hot: false,
    pinned: false,
    op: reply(
      "HollowellHeard",
      "5 days ago",
      "Went in for a routine cleaning. Dr. N— (won't name, don't want trouble) does the X-rays, comes back, sits down, and says 'this is unusual, have you had reconstructive work?' I said no. She looks at me for a long moment. Then: 'this tooth structure has a secondary enamel layer I've only seen in — nevermind, I need a second opinion.' She left the room, didn't come back. Hygienist finished the appointment. I've called four times. She's 'unavailable.'",
      [{ emoji: "🦎", count: 33 }, { emoji: "👁", count: 18 }],
    ),
    replies: [
      reply(
        "Dr_Petrescu_ret",
        "5 days ago",
        "Secondary enamel layers are not a thing in human dentition. If she said that verbatim, she identified something outside the standard morphology. Request your X-rays in writing, today. HIPAA requires she release them.",
        [{ emoji: "🔥", count: 29 }],
      ),
      reply(
        "HollowellHeard",
        "4 days ago",
        "Requested in writing. They 'lost the file.' I'm not surprised. The hygienist looked terrified when I asked.",
        [{ emoji: "🦎", count: 21 }],
      ),
      reply(
        "TrenchCoat_Seer",
        "4 days ago",
        "the dental records route is how they identify us in childhood. that's why they prioritize shutting down the evidence trail at the dental level. not the medical. the dental.",
        [{ emoji: "🦎", count: 47 }, { emoji: "👁", count: 12 }],
      ),
      reply(
        "OstromOrbital",
        "3 days ago",
        "Go to a different dentist. Different state if you can. Don't mention the first visit. See if the finding replicates. That's your proof.",
      ),
      reply(
        "HollowellHeard",
        "2 days ago",
        "Update: booked a dentist in Asheville for next week. Paying cash. No insurance paper trail. Will report back.",
        [{ emoji: "🔥", count: 26 }],
      ),
    ],
  },

  {
    slug: "roomba-did-a-thing",
    board: "reptilian-sightings",
    title: "Roomba did a thing",
    hot: false,
    pinned: false,
    op: reply(
      "HofstraDuplex",
      "3 days ago",
      "Our roomba has run the same path for 2.5 years. Last Tuesday it stopped in the middle of the living room, rotated 180 degrees, and faced our houseguest for 47 seconds. Then resumed normal pattern. Houseguest didn't notice. I did. She's my husband's cousin. I've been uncomfortable around her for years and couldn't say why. The roomba could.",
      [{ emoji: "🦎", count: 58 }, { emoji: "👁", count: 31 }],
    ),
    replies: [
      reply(
        "CoachNPCHunter",
        "3 days ago",
        "roombas have IR and basic edge detection. something about her reflectivity tripped the edge sensor. that's not nothing. trust the roomba.",
        [{ emoji: "🦎", count: 22 }],
      ),
      reply(
        "FaulkOnTheFence",
        "2 days ago",
        "Wait wait wait. 47 seconds is SPECIFIC. If you have the roomba app it should log the stoppage. Pull the timestamp and the duration.",
      ),
      reply(
        "HofstraDuplex",
        "2 days ago",
        "@FaulkOnTheFence app confirms. 47.3 seconds. I'm not making this up.",
        [{ emoji: "🔥", count: 19 }],
      ),
      reply(
        "BrandtBreakthrough",
        "yesterday",
        "Dogs, cats, roombas, infants, and parrots. The five witnesses that can't be socially trained out of their reactions. Make a log.",
        [{ emoji: "👁", count: 35 }],
      ),
      reply(
        "HofstraDuplex",
        "yesterday",
        "Cousin is leaving tomorrow. I'll report whether the roomba returns to normal pattern by Thursday.",
      ),
    ],
  },

  {
    slug: "slow-blink-patterns-on-local-news",
    board: "reptilian-sightings",
    title: "Anyone else noticing slow-blink patterns on local news anchors?",
    hot: false,
    pinned: false,
    op: reply(
      "VossBinghamVerified",
      "6 days ago",
      "I've been recording the 6 PM news in three markets (Denver, Austin, Tampa) for 41 consecutive nights. Counting blinks per minute for the lead anchor. The normal human average is 15-20. Two of my three anchors are averaging 6-8. One of them blinks in pairs — two in rapid succession, then a 14-second gap. That is not a nervous tic. That is a rhythm.",
      [{ emoji: "🦎", count: 72 }, { emoji: "🔥", count: 38 }, { emoji: "👁", count: 24 }],
    ),
    replies: [
      reply(
        "WhittakerWatcher",
        "6 days ago",
        "41 nights is respectable. Post your raw tally. And note whether the low-blink anchors share a network parent company.",
        [{ emoji: "🔥", count: 14 }],
      ),
      reply(
        "VossBinghamVerified",
        "5 days ago",
        "Both low-blink anchors are on stations owned by the same conglomerate. Third anchor, normal blink rate, is independent. I am not speculating about causation. I am noting the correlation.",
        [{ emoji: "🦎", count: 41 }],
      ),
      reply(
        "TrenchCoat_Seer",
        "5 days ago",
        "the corporate-parent overlap is not coincidence. look at who got promoted to anchor chair between 2019 and 2021. that's the cohort.",
        [{ emoji: "👁", count: 27 }],
      ),
      reply(
        "Dr_Petrescu_ret",
        "4 days ago",
        "A sustained blink rate under 10/min without dry-eye medication or clinical condition is statistically anomalous. Worth documenting.",
      ),
      reply(
        "PullmanPulse",
        "3 days ago",
        "Tampa anchor you're tracking — does she touch her left earlobe at the 22-minute mark? Asking because I noticed this last year and dismissed it.",
      ),
      reply(
        "VossBinghamVerified",
        "2 days ago",
        "@PullmanPulse yes. every broadcast. 22:10 to 22:30. without fail.",
        [{ emoji: "🦎", count: 55 }, { emoji: "👁", count: 22 }],
      ),
    ],
  },

  {
    slug: "celebrity-smoothie-analysis-418",
    board: "reptilian-sightings",
    title: "Celebrity smoothie consumption analysis (updated 4/18)",
    hot: false,
    pinned: false,
    op: reply(
      "SanderlingSaw",
      "yesterday",
      "Updating my running spreadsheet on public smoothie/juice consumption among A-list celebrities. Pattern holds: the 'wellness' set that heavily consumes iron-rich greens (kale, spinach, beet, parsley) correlates at 81% with the group already flagged in the Reptilian Watch sheet. Iron is not trendy. Iron is a PHYSIOLOGICAL REQUIREMENT if you're maintaining a cold-blooded metabolic profile in a heated environment.",
      [{ emoji: "🦎", count: 44 }, { emoji: "🔥", count: 21 }],
    ),
    replies: [
      reply(
        "OstromOrbital",
        "yesterday",
        "81% correlation with a sample size of what? this is the post that gets us dismissed if the methodology isn't airtight.",
      ),
      reply(
        "SanderlingSaw",
        "23 hours ago",
        "n=47 celebrities tracked across paparazzi databases 2019-2025, confirmed via two independent photo sources per incident. The methodology tab is on page 3 of the sheet. I share with DM request.",
        [{ emoji: "🔥", count: 16 }],
      ),
      reply(
        "HaleOnHigh",
        "20 hours ago",
        "iron. beet juice. raw liver dinners. you'll notice which ones never photograph eating bread.",
        [{ emoji: "🦎", count: 31 }],
      ),
      reply(
        "KerriganKnows",
        "16 hours ago",
        "I worked catering for an event in 2023. There were three A-listers who specifically requested their meals at 52°F (not chilled, 52°F — a specific number) and refused anything that had been microwaved. I thought it was a contract thing. Now I don't know.",
        [{ emoji: "🦎", count: 48 }, { emoji: "👁", count: 23 }],
      ),
      reply(
        "TrenchCoat_Seer",
        "12 hours ago",
        "52F is basement temperature. it's the temperature they keep holding cells. welcome to the data, kerrigan.",
        [{ emoji: "🦎", count: 29 }],
      ),
      reply(
        "SanderlingSaw",
        "5 hours ago",
        "@KerriganKnows adding 52°F food temp as a tracked variable in the sheet. Thank you.",
      ),
    ],
  },

  // ─── NPC Watch — 5 threads ───────────────
  {
    slug: "seven-second-pause-at-dmv",
    board: "npc-watch",
    title: "Seven-second pause at the DMV today — full catalog incoming",
    hot: true,
    pinned: false,
    op: reply(
      "CoachNPCHunter",
      "yesterday",
      "Went to renew my license at the Lakewood DMV. Asked the clerk a question not on her script: 'what time does the west window close today.' She LOCKED UP. I counted seven full seconds of no movement, no eye shift, no micro-expression. Then she blinked once and said 'please step back behind the yellow line.' Unprompted. I had not moved. I'm writing up the full catalog of the 11 NPC tells I confirmed during a 90-minute visit. Will post as replies.",
      [{ emoji: "👁", count: 83 }, { emoji: "🔥", count: 34 }],
    ),
    replies: [
      reply(
        "CoachNPCHunter",
        "yesterday",
        "Tell 1: seven-second pause on off-script questions. Tell 2: involuntary 'please step back' when input is out of expected range. Tell 3: identical coffee-mug placement across 4 of 6 windows — exactly 6 inches from right edge of desk, handle pointing northeast. 4 of 6.",
        [{ emoji: "🔥", count: 22 }],
      ),
      reply(
        "CoachNPCHunter",
        "yesterday",
        "Tell 4: when I waited in line, none of the 6 clerks looked at the clock between 10:00 and 10:47. NOT ONCE. I checked the clock 11 times in that window. Humans check clocks.",
        [{ emoji: "👁", count: 41 }],
      ),
      reply(
        "MorrisseyMarginalia",
        "yesterday",
        "This is the best NPC-watch post I've read this year. the clock tell is new to me. i'm going to test it at my local post office tomorrow.",
        [{ emoji: "🔥", count: 19 }],
      ),
      reply(
        "KerriganKnows",
        "22 hours ago",
        "WAIT. does this mean the DMV people aren't real. I'm serious. I don't know how to ask this question without sounding insane.",
      ),
      reply(
        "CoachNPCHunter",
        "20 hours ago",
        "@KerriganKnows they're real enough. They have mass, they take up space. The question isn't whether they exist. It's whether there's someone 'home.' My hypothesis: partial render. 60% of a person. Enough to pass the Turing test for a transaction, not enough for spontaneity.",
        [{ emoji: "👁", count: 37 }],
      ),
      reply(
        "BloomRecon_77",
        "16 hours ago",
        "Ran this protocol at my downtown DMV in 2023. Identical findings. Same mug position. Same clock avoidance. Same out-of-range deflection phrase. Different state. Different clerks. Same script.",
        [{ emoji: "🔥", count: 44 }, { emoji: "👁", count: 18 }],
      ),
      reply(
        "CoachNPCHunter",
        "12 hours ago",
        "@BloomRecon_77 same script confirms the render hypothesis. They are not individuals running similar scripts. They are instances of one script.",
      ),
    ],
  },

  {
    slug: "coworker-background-render",
    board: "npc-watch",
    title: "Is my coworker a background render? Evidence inside.",
    hot: false,
    pinned: false,
    op: reply(
      "MorrisseyMarginalia",
      "4 days ago",
      "Coworker, 'Brad,' has worked in the cubicle across from mine for 14 months. I have never seen him (a) take a personal call, (b) mention a weekend plan unprompted, (c) eat anything other than a plain turkey sandwich from the same deli, or (d) reference any media released after 2019. I tested item (d) three times this week with specific 2024 film titles. He nodded and changed the subject. Every. Time.",
      [{ emoji: "👁", count: 48 }, { emoji: "🔥", count: 15 }],
    ),
    replies: [
      reply(
        "CoachNPCHunter",
        "4 days ago",
        "the 2019 media cutoff is a render-budget signal. library assets past a certain date don't get loaded for background NPCs. classic.",
        [{ emoji: "👁", count: 28 }],
      ),
      reply(
        "FaulkOnTheFence",
        "4 days ago",
        "Or he's just a guy who doesn't watch movies. Let's not lose the plot. Run the shoe test. If he can describe his own shoes without looking down — he's real.",
      ),
      reply(
        "MorrisseyMarginalia",
        "3 days ago",
        "Ran the shoe test today. Asked him at 11:14 AM. He paused. Looked down. Said 'brown.' They are black.",
        [{ emoji: "🔥", count: 53 }, { emoji: "👁", count: 26 }],
      ),
      reply(
        "FaulkOnTheFence",
        "3 days ago",
        "Oh. Well. That's not ambiguous.",
        [{ emoji: "👁", count: 31 }],
      ),
      reply(
        "BloomRecon_77",
        "2 days ago",
        "Don't escalate. Don't confront. NPCs that fail the shoe test tend to be 'transferred' within 2-3 weeks. Just log and watch. Log and watch.",
      ),
      reply(
        "MorrisseyMarginalia",
        "yesterday",
        "Update: 'Brad' is out sick this week. HR says he'll be back Monday. I will report.",
        [{ emoji: "⚠️", count: 22 }],
      ),
    ],
  },

  {
    slug: "npc-tell-cant-describe-shoes",
    board: "npc-watch",
    title: "NPC tell: they can't describe what their shoes look like without looking down",
    hot: true,
    pinned: false,
    op: reply(
      "BloomRecon_77",
      "3 days ago",
      "Been refining this test for 4 years. Simple, reliable, socially frictionless. You ask someone 'what color are your shoes.' Real humans answer in under a second without looking. NPCs pause, glance down, and — crucially — are often WRONG about a detail (laces, color, style). The wrongness is the tell. A background render only has 'shoes_generic' loaded, not 'shoes_specific.' When asked to specify, they guess. And the guess is stochastic.",
      [{ emoji: "👁", count: 94 }, { emoji: "🔥", count: 52 }, { emoji: "🛸", count: 18 }],
    ),
    replies: [
      reply(
        "CoachNPCHunter",
        "3 days ago",
        "confirmed in the field approximately 400 times. the wrongness is more diagnostic than the pause. a nervous human can pause. a render will be WRONG.",
        [{ emoji: "🔥", count: 38 }],
      ),
      reply(
        "WhittakerWatcher",
        "2 days ago",
        "Propose a methodology improvement: ALSO ask 'what's on your keychain.' Shoes are visually prominent so even a distracted human might look. Keychains are tactile — rendered from a different asset library entirely.",
        [{ emoji: "👁", count: 29 }],
      ),
      reply(
        "BloomRecon_77",
        "2 days ago",
        "@WhittakerWatcher excellent. keychain + watch face + left pocket contents. three-prong test. adding to the protocol.",
        [{ emoji: "🔥", count: 24 }],
      ),
      reply(
        "MorrisseyMarginalia",
        "2 days ago",
        "I did this at a dinner party last Friday. Out of 9 guests, 7 passed instantly. 2 paused, looked down, and got a detail wrong. I haven't spoken to either of them since.",
        [{ emoji: "👁", count: 47 }],
      ),
      reply(
        "KerriganKnows",
        "yesterday",
        "Is it okay that I did this to myself in a mirror and couldn't describe my own shoes without looking. I am spiraling.",
      ),
      reply(
        "BloomRecon_77",
        "18 hours ago",
        "@KerriganKnows that's a dissociation episode. drink water. you are real. the test is only valid on OTHERS — we've all been worn down by the render.",
        [{ emoji: "🔥", count: 41 }, { emoji: "👁", count: 22 }],
      ),
    ],
  },

  {
    slug: "bus-stop-census-attempt-4",
    board: "npc-watch",
    title: "Bus stop census — attempt #4",
    hot: false,
    pinned: false,
    op: reply(
      "PullmanPulse",
      "2 days ago",
      "Fourth attempt at the bus stop census. Methodology: sit on the bench at the 42nd & Main stop, 7:00-8:30 AM, catalog every person who stops, boards, or lingers. Previous attempts were invalidated (rain, construction, once I fell asleep). Today clean conditions. 61 individuals observed. 14 did not make eye contact with the schedule board despite standing directly in front of it for more than 30 seconds. Humans check the schedule. Every time.",
      [{ emoji: "👁", count: 26 }],
    ),
    replies: [
      reply(
        "CoachNPCHunter",
        "2 days ago",
        "14 out of 61 is 23%. that's consistent with the background-render ratio i've been getting in moderate-density urban. the number holds.",
        [{ emoji: "🔥", count: 19 }],
      ),
      reply(
        "ArcherAtmosphere",
        "yesterday",
        "Schedule board check is a clever metric. Humans are oriented to information. Renders are oriented to the path. They don't verify. They execute.",
      ),
      reply(
        "PullmanPulse",
        "yesterday",
        "of the 14 non-checkers, 9 boarded the same bus (the 7:42 northbound). That bus is my new observation target for next week.",
        [{ emoji: "👁", count: 14 }],
      ),
      reply(
        "BloomRecon_77",
        "18 hours ago",
        "follow the 9. see where they disperse. route them on a map. if the dispersal pattern is a grid not a scatter — you found a spawn point.",
        [{ emoji: "🛸", count: 28 }],
      ),
      reply(
        "PullmanPulse",
        "8 hours ago",
        "understood. will post map overlay next week.",
      ),
    ],
  },

  {
    slug: "gym-vs-grocery-npcs-render-priority",
    board: "npc-watch",
    title: "Gym NPCs vs grocery-store NPCs — different render priority?",
    hot: false,
    pinned: false,
    op: reply(
      "CoachNPCHunter",
      "8 days ago",
      "Working on a theory. The NPCs I see at my gym have WAY better motion fidelity than the ones at my grocery store. Like, noticeably so. At the gym they have micro-balance corrections, varied facial expression under strain, recoverable stumbles. At the grocery store they glide. They don't break stride when a kid cuts in front of the cart. Suggests different render priority by environment. Gym requires physical plausibility. Grocery store apparently does not.",
      [{ emoji: "👁", count: 37 }, { emoji: "🔥", count: 14 }],
    ),
    replies: [
      reply(
        "FaulkOnTheFence",
        "8 days ago",
        "Or your gym is populated by more regular humans and your grocery store has a higher NPC concentration. Same observation, different interpretation.",
      ),
      reply(
        "CoachNPCHunter",
        "7 days ago",
        "@FaulkOnTheFence fair. but the SAME PEOPLE seem to switch. i've recognized my gym buddy at the grocery store and he didn't make eye contact. he did at the gym that morning. there's a mode.",
        [{ emoji: "👁", count: 22 }],
      ),
      reply(
        "BloomRecon_77",
        "6 days ago",
        "that's the context-switching behavior. it's not that grocery-store NPCs are different individuals. it's that the render allocates less to grocery-context. even REAL people dim their presence in low-stakes environments. but in NPCs there is nothing UNDER the dimming. just empty.",
        [{ emoji: "🔥", count: 41 }, { emoji: "👁", count: 19 }],
      ),
      reply(
        "MorrisseyMarginalia",
        "5 days ago",
        "This post unlocked something. I always feel depleted after the grocery store. It's because I'm walking through a low-fidelity zone. Low fidelity is exhausting to a high-fidelity mind.",
        [{ emoji: "🔥", count: 33 }],
      ),
      reply(
        "OakesObserves",
        "3 days ago",
        "Confirmed by my own experience: I am noticeably less tired after a farmers-market trip than a supermarket trip, even for the same duration and bag weight. I never understood why. Now I do.",
      ),
    ],
  },

  // ─── Signal Interference — 5 threads ───────────────
  {
    slug: "substation-near-house-started-humming",
    board: "signal-interference",
    title: "Substation near my house started HUMMING last week",
    hot: true,
    pinned: false,
    op: reply(
      "AshbySignal",
      "6 days ago",
      "I worked for a regional utility for 22 years before early retirement. I know what a normal substation sounds like. The one two blocks from my house started making a new tone last Thursday. It's not the 60 Hz transformer hum. It's something harmonic, higher — I measured it at around 237 Hz with a phone app (I know, imprecise — better meter on order). This substation has not been upgraded. No work orders on the public PUC dashboard. Nothing has physically changed. But the sound has.",
      [{ emoji: "📡", count: 66 }, { emoji: "🔥", count: 28 }, { emoji: "👁", count: 21 }],
    ),
    replies: [
      reply(
        "FinchFrequency",
        "6 days ago",
        "237 Hz is close to the B3 harmonic structure. Not a naturally-occurring power-grid tone. If it's coming from the substation and not from a nearby source, something was installed without a permit.",
        [{ emoji: "📡", count: 33 }],
      ),
      reply(
        "DuvallDocuments",
        "5 days ago",
        "Get downwind and upwind. Measure both. If 237 Hz attenuates with distance FROM the substation specifically, that's your source. If not, it's not actually the substation.",
      ),
      reply(
        "AshbySignal",
        "5 days ago",
        "@DuvallDocuments did this yesterday morning. 18 dB drop at 200 yards from the fence line, consistent across 4 compass points. It's the substation.",
        [{ emoji: "🔥", count: 27 }],
      ),
      reply(
        "TanakaTransmits",
        "4 days ago",
        "has anyone's sleep quality tanked in a 1-km radius of this substation since thursday. that's a question worth asking.",
        [{ emoji: "📡", count: 24 }],
      ),
      reply(
        "AshbySignal",
        "3 days ago",
        "@TanakaTransmits my wife hasn't slept through the night since Friday. She had no idea about the hum until I told her yesterday. She said 'so that's why.'",
        [{ emoji: "🔥", count: 54 }, { emoji: "👁", count: 32 }],
      ),
      reply(
        "BriggsOffGrid",
        "2 days ago",
        "file a noise complaint with the PUC. they'll either dismiss it (data point) or investigate (also a data point). either response tells you something.",
      ),
      reply(
        "AshbySignal",
        "yesterday",
        "filed. reference number logged. will report when they respond.",
        [{ emoji: "📡", count: 19 }],
      ),
    ],
  },

  {
    slug: "smart-toaster-made-a-sound-347",
    board: "signal-interference",
    title: "Smart toaster made a sound at 3:47 AM last night",
    hot: false,
    pinned: false,
    op: reply(
      "LindquistLookout",
      "yesterday",
      "My toaster — which is 'smart' because everything now is — made a single three-tone chime at 3:47 AM. Woke me up. No toast was being made. The app has no record of activity. I unplugged it. I do not trust it. This is the second appliance this month that has done something unprompted in the middle of the night (washing machine beeped at 2:14 AM two weeks ago).",
      [{ emoji: "📡", count: 38 }, { emoji: "⚠️", count: 17 }],
    ),
    replies: [
      reply(
        "TanakaTransmits",
        "yesterday",
        "3:47 is an interesting timestamp. that's the firmware-push window for several major IoT providers. the chime was probably an update notification that wasn't supposed to be audible.",
        [{ emoji: "📡", count: 29 }],
      ),
      reply(
        "FinchFrequency",
        "23 hours ago",
        "three-tone chime — what intervals? was it ascending, descending, or a repeated note? the interval structure tells you which firmware family.",
      ),
      reply(
        "LindquistLookout",
        "22 hours ago",
        "@FinchFrequency ascending. I'd guess a major third then a fourth. kind of a 'ding ding DING.'",
      ),
      reply(
        "FinchFrequency",
        "20 hours ago",
        "that's the wake-ack chime. your toaster was signaling successful update. you were not supposed to hear it.",
        [{ emoji: "📡", count: 44 }, { emoji: "👁", count: 18 }],
      ),
      reply(
        "BriggsOffGrid",
        "16 hours ago",
        "this is why we don't buy smart appliances. your toaster should toast. that is its job. any toaster that does anything else is a surveillance device wearing a toaster costume.",
        [{ emoji: "🔥", count: 52 }, { emoji: "📡", count: 22 }],
      ),
      reply(
        "LindquistLookout",
        "12 hours ago",
        "It's in the garage now. Next step is a dumb toaster from an estate sale.",
      ),
    ],
  },

  {
    slug: "fitness-tracker-recorded-activity-while-asleep",
    board: "signal-interference",
    title: "My fitness tracker recorded 'activity' while I was asleep",
    hot: false,
    pinned: false,
    op: reply(
      "TrestleTrue",
      "3 days ago",
      "Woke up yesterday to my tracker saying I had taken 2,817 steps between 1:14 and 3:02 AM. I did not leave my bed. I did not leave my room. My wife confirms. The app shows a clean walking cadence — not a motion artifact, an ACTUAL walking pattern. Has anyone else had this happen. I'm asking seriously.",
      [{ emoji: "📡", count: 55 }, { emoji: "👁", count: 28 }, { emoji: "🔥", count: 18 }],
    ),
    replies: [
      reply(
        "FinchFrequency",
        "3 days ago",
        "that's not a sensor error. a clean cadence requires a real rhythmic input. your tracker was receiving a signal from ELSEWHERE during that window.",
        [{ emoji: "📡", count: 36 }],
      ),
      reply(
        "AshbySignal",
        "2 days ago",
        "Every fitness tracker is a miniature radio. If the ambient RF field at your location between 1 and 3 AM had the right structure, the accelerometer calibration could absolutely misinterpret it as motion. It's not the tracker's fault. It's the environment.",
        [{ emoji: "📡", count: 22 }],
      ),
      reply(
        "BrandtBreakthrough",
        "2 days ago",
        "I had 1,400 phantom steps last Thursday. Same window — 1-3 AM. I'm in Portland. You?",
        [{ emoji: "👁", count: 19 }],
      ),
      reply(
        "TrestleTrue",
        "2 days ago",
        "@BrandtBreakthrough Spokane. So this hit at least two cities in the same window.",
        [{ emoji: "🔥", count: 27 }],
      ),
      reply(
        "VossTransmission",
        "yesterday",
        "cross-reference with anyone whose smart watch showed elevated heart rate in sleep during that window. the motion signal and the heart-rate signal together = confirmed RF overlay.",
        [{ emoji: "📡", count: 31 }],
      ),
      reply(
        "TrestleTrue",
        "22 hours ago",
        "Checked. My heart rate ran 74-82 during the phantom-walking window. Resting is 58. I was BEING ENTRAINED.",
        [{ emoji: "🔥", count: 48 }, { emoji: "👁", count: 24 }],
      ),
    ],
  },

  {
    slug: "fluorescent-bulb-morse-code-help-decode",
    board: "signal-interference",
    title: "Fluorescent bulb morse code? Help decode.",
    hot: false,
    pinned: false,
    op: reply(
      "BrandtBreakthrough",
      "5 days ago",
      "Office bulb, the one right over my desk, started pulsing last Tuesday in what LOOKS like a pattern. I recorded 40 minutes on my phone. Transcribed the pulse intervals. If this is morse: short-short-long-short, pause, long-long-short, pause, short-short. I don't know enough morse to read it. Does anyone. Before I take this to facilities.",
      [{ emoji: "📡", count: 42 }, { emoji: "👁", count: 24 }],
    ),
    replies: [
      reply(
        "Delacroix_Decoder",
        "5 days ago",
        "short-short-long-short = F. long-long-short = G. short-short = I. so: FGI. that could be initials, an acronym, or coincidence. what's the building for the bulb. a GIF would be an interesting anagram.",
        [{ emoji: "📡", count: 38 }],
      ),
      reply(
        "BrandtBreakthrough",
        "5 days ago",
        "@Delacroix_Decoder the building is owned by an LLC whose parent company's initials are — wait for it — GFI Holdings. GFI. Exactly those three letters reordered.",
        [{ emoji: "🔥", count: 67 }, { emoji: "👁", count: 41 }],
      ),
      reply(
        "Delacroix_Decoder",
        "4 days ago",
        "a fluorescent-ballast signature drift can occur in a 60 Hz flicker pattern when the ballast is near end-of-life. that's the boring explanation. the less-boring explanation is that the ballast is flickering a COHERENT MESSAGE tied to the building ownership. check the adjacent bulbs.",
        [{ emoji: "📡", count: 29 }],
      ),
      reply(
        "AshbySignal",
        "3 days ago",
        "the ballast explanation is plausible for a random pattern but not for a pattern that spells something meaningful. probability math says coincidence for 3 letters is roughly 1 in 17,576. not impossible. just very suggestive.",
      ),
      reply(
        "BrandtBreakthrough",
        "2 days ago",
        "Checked the adjacent bulbs yesterday. Two of the four were pulsing DIFFERENT morse. I'm transcribing now. Give me a day.",
        [{ emoji: "🔥", count: 44 }, { emoji: "📡", count: 22 }],
      ),
      reply(
        "BronwynBroadcast",
        "yesterday",
        "backup your phone recording to multiple drives before you transcribe. if they change the bulbs, your recording is the only evidence.",
        [{ emoji: "⚠️", count: 31 }],
      ),
      reply(
        "BrandtBreakthrough",
        "16 hours ago",
        "backed up. three drives. one encrypted. bulb was replaced this morning. i was not notified. facilities says it was 'routine.' nothing about the previous bulb was routine.",
        [{ emoji: "🔥", count: 58 }, { emoji: "👁", count: 29 }],
      ),
    ],
  },

  {
    slug: "wifi-drops-same-moment-every-evening",
    board: "signal-interference",
    title: "WiFi drops at the exact same moment every evening",
    hot: true,
    pinned: false,
    op: reply(
      "VossTransmission",
      "4 days ago",
      "Every evening at 9:47 PM my home WiFi drops for exactly 22 seconds. Starting March 18. I logged it for 27 consecutive nights. 27 out of 27. Same second. Same duration. My ISP says they see nothing. My router is new. My modem is new. Two different ISPs over the past year, same behavior. It's not the hardware. It's the ENVIRONMENT.",
      [{ emoji: "📡", count: 74 }, { emoji: "🔥", count: 31 }, { emoji: "👁", count: 23 }],
    ),
    replies: [
      reply(
        "FinchFrequency",
        "4 days ago",
        "27/27 at identical timestamp rules out random interference. That's a scheduled event, external to your home. Question is whether it's the 2.4 GHz band, the 5 GHz band, or both going down.",
        [{ emoji: "📡", count: 28 }],
      ),
      reply(
        "VossTransmission",
        "3 days ago",
        "@FinchFrequency BOTH. simultaneously. which my router documentation says should be essentially impossible for a local interference source.",
        [{ emoji: "🔥", count: 41 }],
      ),
      reply(
        "AshbySignal",
        "3 days ago",
        "a simultaneous both-band drop at a scheduled time = a broad-spectrum sweep. somebody is running a 22-second scan at 9:47 PM in your neighborhood every night. for what purpose, that's the question.",
        [{ emoji: "📡", count: 36 }, { emoji: "👁", count: 19 }],
      ),
      reply(
        "TanakaTransmits",
        "3 days ago",
        "ask your neighbors. if their wifi also drops at 9:47, it's regional. if not, it's targeted at your address.",
      ),
      reply(
        "VossTransmission",
        "2 days ago",
        "3 of 4 neighbors I asked confirmed 9:47 drops. the fourth neighbor — the one whose house faces the cell tower — says her wifi doesn't drop. hmm.",
        [{ emoji: "🔥", count: 52 }, { emoji: "👁", count: 28 }],
      ),
      reply(
        "BriggsOffGrid",
        "yesterday",
        "the one house that doesn't drop is the one in the tower's line of sight. that's the transmitter, and the sweep is originating from there. you have your answer. now what do you do with it.",
        [{ emoji: "📡", count: 47 }],
      ),
    ],
  },

  // ─── General Truth-Seeking — 5 threads ───────────────
  {
    slug: "new-member-what-do-i-do-now",
    board: "general",
    title: "NEW MEMBER — what do I actually do now",
    hot: true,
    pinned: true,
    op: reply(
      "KerriganKnows",
      "1 week ago",
      "Found this forum 9 days ago. I have barely slept. I have been down the rabbit hole across every board. It feels like I finally found where the real conversation is happening but I also feel like my feet have been pulled out from under me. Do I start documenting? Do I read more first? Is there a beginner's path? I don't want to be the person who posts stupid questions, but I also don't want to freeze up and waste a year lurking. What did you all do in your first month here.",
      [{ emoji: "👁", count: 127 }, { emoji: "🔥", count: 58 }],
    ),
    replies: [
      reply(
        "DuvallDocuments",
        "1 week ago",
        "Welcome. Three things. 1) Start a notebook today — physical, not digital. Date every entry. 2) Read the Library primer articles before you post evidence. 3) Don't tell your family yet. You'll know when you're ready.",
        [{ emoji: "🔥", count: 94 }, { emoji: "👁", count: 41 }],
      ),
      reply(
        "OakesObserves",
        "1 week ago",
        "Rest first. You have been awake for 9 days of new information. Your nervous system is flooded. Take 48 hours OFF the forum before you post anything. The truth will still be here on Wednesday.",
        [{ emoji: "🔥", count: 108 }, { emoji: "👁", count: 44 }],
      ),
      reply(
        "BloomRecon_77",
        "6 days ago",
        "develop ONE area of expertise before you try to cover everything. you cannot read all 5 boards at depth. pick atmospheric OR npc OR signal. become the person who knows that board.",
        [{ emoji: "🔥", count: 46 }],
      ),
      reply(
        "HaleOnHigh",
        "5 days ago",
        "there is no 'path.' there is only what you can and cannot see. walk into any room and ask what's wrong. you'll learn faster than any reading list.",
        [{ emoji: "🛸", count: 32 }, { emoji: "👁", count: 18 }],
      ),
      reply(
        "MorrisseyMarginalia",
        "4 days ago",
        "I joined in 2022. My first month I posted three times and each one got gently corrected. I was embarrassed. Looking back: those corrections were how I learned. Post imperfectly. We'll help you sharpen it.",
        [{ emoji: "🔥", count: 53 }],
      ),
      reply(
        "KerriganKnows",
        "3 days ago",
        "Thank you all. I'm taking OakesObserves' advice. Logging off until Sunday. Bought a notebook. It has a pigeon on the cover. I don't know why that matters but it feels right.",
        [{ emoji: "🔥", count: 137 }, { emoji: "👁", count: 62 }],
      ),
      reply(
        "MuncyVigilant",
        "2 days ago",
        "The pigeon is correct. Pigeons are one of the few birds not compromised by the municipal signal net. Carry on.",
        [{ emoji: "👁", count: 71 }],
      ),
    ],
  },

  {
    slug: "stopped-reading-mainstream-news-2019",
    board: "general",
    title: "Why I stopped reading mainstream news in 2019 (and what replaced it)",
    hot: true,
    pinned: false,
    op: reply(
      "MuncyVigilant",
      "9 days ago",
      "I get asked this about once a month. Writing it up so I can link here next time. In February 2019 I noticed a single fact change across three 'paper of record' outlets within a 72-hour window — no correction, no editor's note, just a quiet revision. I went back through 18 months of archived front pages. The revision pattern was consistent. The outlets were not reporting. They were CURATING. What replaced it: a small set of independent long-form publications, primary-source FOIA requests, forum syntheses like this one, and MY OWN EYES.",
      [{ emoji: "🔥", count: 86 }, { emoji: "👁", count: 52 }],
    ),
    replies: [
      reply(
        "WhittakerWatcher",
        "9 days ago",
        "the 2019 pivot is real. the archival divergence is measurable. anyone who wants to replicate: pick three front-pages from Feb 11-14 2019 and diff them against their archived Wayback versions. it's a weekend project. it's worth the weekend.",
        [{ emoji: "🔥", count: 31 }],
      ),
      reply(
        "HaleOnHigh",
        "8 days ago",
        "we talked about this in 2019. nothing has changed. you have been correct the whole time.",
        [{ emoji: "👁", count: 44 }],
      ),
      reply(
        "OakesObserves",
        "7 days ago",
        "I use a three-source rule. Nothing goes into my working model unless I have independent verification from three sources that don't share a corporate parent. It's slow. It's worth it.",
        [{ emoji: "🔥", count: 27 }],
      ),
      reply(
        "KerriganKnows",
        "5 days ago",
        "I haven't watched the news in 11 days and I feel like a different person. Is that a thing that happens. My shoulders are lower.",
        [{ emoji: "🔥", count: 68 }, { emoji: "👁", count: 33 }],
      ),
      reply(
        "MuncyVigilant",
        "4 days ago",
        "@KerriganKnows yes. that is a documented phenomenon among new members. the daily news cycle is an entrainment mechanism. removing it detunes your nervous system. Welcome to baseline.",
        [{ emoji: "🔥", count: 52 }],
      ),
      reply(
        "BronwynBroadcast",
        "2 days ago",
        "Pinning this to my personal archive. I cite it in my own conversations roughly weekly.",
      ),
    ],
  },

  {
    slug: "how-explain-to-family-without-sounding-unwell",
    board: "general",
    title: "How do you explain this to your family without sounding unwell",
    hot: false,
    pinned: false,
    op: reply(
      "Capt_Vallis",
      "5 days ago",
      "Retired captain, 34 years service, two combat tours. I am not unwell. But when I try to explain to my son — himself a veteran — what I've been reading here for the past 8 months, I sound like someone who needs help. He gave me a look last Christmas that has stayed with me. I don't want to lose him over this. But I also cannot unsee. How do you all handle this.",
      [{ emoji: "🔥", count: 68 }, { emoji: "👁", count: 39 }],
    ),
    replies: [
      reply(
        "Dr_Petrescu_ret",
        "5 days ago",
        "Captain, speaking as a retired clinician: lead with ONE concrete observation they can verify on their own, not with a framework. If you hand them a framework first, the framework sounds paranoid. If they find the observation themselves, the framework becomes their idea.",
        [{ emoji: "🔥", count: 47 }, { emoji: "👁", count: 23 }],
      ),
      reply(
        "DuvallDocuments",
        "4 days ago",
        "What worked for me: I stopped trying to 'convince.' I started asking questions. 'Have you noticed that every convenience store has the exact same lighting color.' Small. Observable. Seeds.",
      ),
      reply(
        "FaulkOnTheFence",
        "4 days ago",
        "don't explain everything. explain one thing. at MOST two. the instinct to download the whole worldview is what makes us sound unwell. it's actually a generosity problem.",
        [{ emoji: "👁", count: 36 }],
      ),
      reply(
        "Capt_Vallis",
        "3 days ago",
        "Grateful for each of these. Starting with 'the convenience store lighting.' My son stops at a 7-Eleven every morning on the way to work. I will plant that seed next weekend.",
        [{ emoji: "🔥", count: 52 }],
      ),
      reply(
        "OakesObserves",
        "2 days ago",
        "One more thing, Captain. Your son looks up to you. His resistance is fear — of you changing, not of the ideas. Keep being the same person with him. The ideas will filter through because he trusts the person.",
        [{ emoji: "🔥", count: 74 }, { emoji: "👁", count: 41 }],
      ),
      reply(
        "MorrisseyMarginalia",
        "yesterday",
        "Threads like this are why I stay. We are not just cataloging — we are keeping each other connected to the people we love while we tell the truth.",
        [{ emoji: "🔥", count: 63 }],
      ),
    ],
  },

  {
    slug: "ranking-tinfoil-beanie-colors",
    board: "general",
    title: "Ranking the tinfoil beanie colors — practical field notes",
    hot: false,
    pinned: false,
    op: reply(
      "GulletAwakened",
      "11 days ago",
      "Six months of field testing. The color of the outer wool layer on a foil-lined beanie matters more than I expected. Going from worst to best for actual signal attenuation and also for not getting stared at in public: neon orange (0/10, attracts attention, no benefit), black (3/10, fine, boring, gets warm), charcoal grey (7/10, blends, breathes), forest green (8/10, surprisingly effective against the 237 Hz band, gardener-plausible), navy (9/10, the gold standard, office-acceptable, works). Earth tones win.",
      [{ emoji: "🔥", count: 29 }, { emoji: "👁", count: 18 }],
    ),
    replies: [
      reply(
        "BriggsOffGrid",
        "11 days ago",
        "navy is correct. but add: the seam placement matters as much as the color. any seam over the temporal bone is a leak. double-layer at the temples or buy custom.",
        [{ emoji: "📡", count: 22 }],
      ),
      reply(
        "FinchFrequency",
        "10 days ago",
        "the forest green attenuation number is suspicious. there's no reason wool color should affect 237 Hz penetration. the foil does the work. unless the dye is metallic. some forest-green dyes are.",
      ),
      reply(
        "GulletAwakened",
        "10 days ago",
        "@FinchFrequency I hadn't considered metallic dyes. that would explain the effect. now i have to go check my laundry tags.",
        [{ emoji: "🔥", count: 14 }],
      ),
      reply(
        "MazettiMidnight",
        "8 days ago",
        "i wear a navy one to my daughter's school events. no one has ever said anything. the trick is a slightly oversized fit so it reads 'fashion' and not 'costume.'",
        [{ emoji: "👁", count: 27 }],
      ),
      reply(
        "KerriganKnows",
        "5 days ago",
        "Is this real. Sorry. I keep expecting someone to be joking and then nobody is.",
      ),
      reply(
        "GulletAwakened",
        "4 days ago",
        "@KerriganKnows it's real. the beanie does measurable work. the fashion consideration is a practical concession, not a joke. welcome.",
        [{ emoji: "🔥", count: 31 }, { emoji: "👁", count: 17 }],
      ),
    ],
  },

  {
    slug: "lost-a-friend-stopped-answering-questions-twice",
    board: "general",
    title: "Lost a friend today. He stopped answering questions twice.",
    hot: true,
    pinned: true,
    op: reply(
      "KeckCoordinate",
      "2 days ago",
      "I don't know where else to post this. My best friend of 14 years came over last night. I've known him since college. Something was wrong from the moment he walked in. I asked him twice what he wanted to drink. Twice he didn't answer. Just stood in the kitchen looking at the fridge. Then he said, 'same as always,' which is not an answer — we don't have a 'same as always.' I don't know if he's been replaced. I don't know if he's sick. I don't know if I'm supposed to help him or protect myself. I am writing this because if I don't write it down I will start to doubt it happened.",
      [{ emoji: "👁", count: 142 }, { emoji: "🔥", count: 67 }],
    ),
    replies: [
      reply(
        "OakesObserves",
        "2 days ago",
        "You are not wrong to write this down. The twice-unanswered question is a significant marker. So is 'same as always' as a non-answer. Document the visit hour by hour while it's fresh. Do not confront him yet.",
        [{ emoji: "🔥", count: 81 }, { emoji: "👁", count: 42 }],
      ),
      reply(
        "BloomRecon_77",
        "2 days ago",
        "sorry, friend. this is the hard one. what you're describing is either a full substitution or a partial overwrite. substitution rarely reverses. partial overwrite can, if the person goes somewhere they were emotionally anchored before the event. ask him to go to a specific place from your shared history. see if he remembers unprompted.",
        [{ emoji: "🔥", count: 54 }],
      ),
      reply(
        "DuvallDocuments",
        "yesterday",
        "I had a similar experience with an uncle in 2021. He came back — not the same, but recognizable — after about 6 weeks. Something about him was thinner afterwards. Your friend may return. Keep the door open. Don't close it yet.",
        [{ emoji: "🔥", count: 68 }, { emoji: "👁", count: 29 }],
      ),
      reply(
        "Capt_Vallis",
        "yesterday",
        "stand by your post. some of us have held a line for a person who eventually crossed back over. it takes time and it takes steady presence. do not abandon him while you are working out what he is.",
        [{ emoji: "🔥", count: 97 }, { emoji: "👁", count: 48 }],
      ),
      reply(
        "HaleOnHigh",
        "yesterday",
        "the ones that come back are never quite the same. but they come back.",
        [{ emoji: "👁", count: 73 }],
      ),
      reply(
        "KeckCoordinate",
        "14 hours ago",
        "I called him today. He answered. He sounded tired. He asked how my mom is — she passed in 2022 and he was at the funeral. I reminded him, gently. He paused for nine seconds. Then he said 'right. I'm sorry. I'm having a hard week.' I said I'd come over Saturday. He said please. I will report back.",
        [{ emoji: "🔥", count: 158 }, { emoji: "👁", count: 84 }],
      ),
      reply(
        "MorrisseyMarginalia",
        "6 hours ago",
        "We will be here Saturday night. Post when you get home. You are not alone in this.",
        [{ emoji: "🔥", count: 112 }, { emoji: "👁", count: 57 }],
      ),
    ],
  },
]

export function getThreadsByBoard(board: BoardKey): ForumThread[] {
  return threads.filter((t) => t.board === board).sort((a, b) => {
    if (a.pinned && !b.pinned) return -1
    if (b.pinned && !a.pinned) return 1
    return 0
  })
}

export function getThreadBySlug(board: BoardKey, slug: string): ForumThread | undefined {
  return threads.find((t) => t.board === board && t.slug === slug)
}

export function getHotThreads(n: number): ForumThread[] {
  return threads.filter((t) => t.hot).slice(0, n)
}

// Sanity check at import time — every username in threads must exist in the avatar map.
for (const thread of threads) {
  const all = [thread.op, ...thread.replies]
  for (const r of all) {
    if (!USERNAME_BY_AVATAR[r.avatar] || USERNAME_BY_AVATAR[r.avatar] !== r.username) {
      throw new Error(`Username/avatar mismatch in thread ${thread.slug}: ${r.username}`)
    }
  }
}
