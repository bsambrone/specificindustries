export type TreatmentCategory = "ancestral" | "suppressed" | "restricted"

export interface TreatmentCase {
  initials: string
  location: string
  testimonial: string
}

export interface Treatment {
  slug: string
  name: string
  category: TreatmentCategory
  condition: string              // short ailment description, in voice
  tagline: string                // one-line hook
  mechanism: string[]            // 2-3 paragraphs
  protocol: string               // dosing instructions
  cases: TreatmentCase[]         // 2-3 fake testimonials
  bannedInStates: number         // 11-46
  priceLabel: string             // display only, e.g. "$289"
  price: number                  // display only, never transacted
  image: string
}

export const CATEGORY_LABELS: Record<TreatmentCategory, string> = {
  ancestral: "Ancestral",
  suppressed: "Suppressed",
  restricted: "Restricted",
}

export const treatments: Treatment[] = [
  {
    slug: "tincture-no-7",
    name: "Tincture No. 7 — Hiccup Dissolution",
    category: "suppressed",
    condition: "For rhythmic diaphragmatic betrayal.",
    tagline: "The remedy the AMA quietly declassified in 1962.",
    mechanism: [
      "Tincture No. 7 works at the level of the diaphragmatic meridian, a channel modern anatomy textbooks have systematically omitted since 1974. The formulation draws on seven root compounds originally described in the Harrow Archive, Volume IV.",
      "Three sublingual drops produce a measurable stilling of involuntary muscular repetition within forty-five seconds. Our formulators consider this the most elegant of the sixteen Protocols.",
    ],
    protocol: "Three drops beneath the tongue at the first tremor. Do not chase with water. Do not speak for two full minutes.",
    cases: [
      { initials: "M.R.", location: "Vermont", testimonial: "I had hiccupped for eleven days. I stopped in forty seconds. I have not told my doctor." },
      { initials: "J.T.", location: "North Carolina", testimonial: "My grandfather kept a bottle on his nightstand from 1951 until his passing. Now I understand why." },
    ],
    bannedInStates: 39,
    priceLabel: "$289",
    price: 289,
    image: "/sites/sovereignwellness/treatments/tincture-no-7.png",
  },
  {
    slug: "cerumen-siphon",
    name: "Cerumen Siphon Protocol",
    category: "ancestral",
    condition: "For the restoration of the Ancestral Ear.",
    tagline: "What you call earwax was called, historically, a verdict.",
    mechanism: [
      "The Cerumen Siphon Protocol was the standard of aural hygiene in three empires before it was quietly replaced by adhesive swabs in the post-war period. The copper-tipped instrument (included) does not touch the ear canal; it draws.",
      "The accompanying drops soften what copper alone cannot reach. The result is not merely cleanliness but clarity — a phenomenon our customers describe in terms that border on the religious.",
    ],
    protocol: "One evening per lunar cycle. Draw left ear, then right. Three drops of accompanying tincture prior. Do not perform after sundown on a Tuesday.",
    cases: [
      { initials: "A.L.", location: "Maine", testimonial: "I could hear my wife again. I had not known I could no longer hear my wife." },
      { initials: "D.P.", location: "Oregon", testimonial: "My cat, for the first time in nine years, did not flee the sound of my voice." },
    ],
    bannedInStates: 22,
    priceLabel: "$447",
    price: 447,
    image: "/sites/sovereignwellness/treatments/cerumen-siphon.png",
  },
  {
    slug: "anti-blink-pomade",
    name: "Anti-Blink Pomade",
    category: "restricted",
    condition: "For reversal of learned eyelid behavior.",
    tagline: "The eyelid as we know it was a nineteenth-century addition.",
    mechanism: [
      "Pre-1867 anatomical texts describe the eyelid as a voluntary, not involuntary, structure. The shift was gradual, commercial, and — we maintain — regrettable. Anti-Blink Pomade, applied to the outer lash line, restores conscious governance.",
      "The beeswax base is sourced from apiaries operated by a single Pennsylvania family who do not sell to retail. Secondary ingredients include clove oil, lanolin, and a compound our formulators refer to only as 'the amber.'",
    ],
    protocol: "Apply a rice-grain quantity to the outer lash line at dawn. Do not apply before driving.",
    cases: [
      { initials: "R.W.", location: "Montana", testimonial: "I now blink only when I choose to. The improvement in my chess has been considerable." },
      { initials: "H.K.", location: "Arizona", testimonial: "My children do not understand. They will, in time." },
    ],
    bannedInStates: 44,
    priceLabel: "$189",
    price: 189,
    image: "/sites/sovereignwellness/treatments/anti-blink-pomade.png",
  },
  {
    slug: "thirst-reversion-lozenges",
    name: "Thirst Reversion Lozenges",
    category: "ancestral",
    condition: "For correction of the manufactured thirst response.",
    tagline: "Ancestral peoples did not 'get thirsty.' They were told to.",
    mechanism: [
      "Thirst, as a recurrent subjective state, is a twentieth-century marketing construct. The ancestral body knows when to drink. The modern body has been trained to forget. Thirst Reversion Lozenges re-educate the relevant neural pathways over a six-week regimen.",
      "The pastilles dissolve slowly. Patience is part of the protocol.",
    ],
    protocol: "One lozenge upon waking. One lozenge at dusk. Do not drink water within thirty minutes of dissolution.",
    cases: [
      { initials: "S.M.", location: "Texas", testimonial: "I have not thought about water in eleven weeks. I feel lighter. My plants do not." },
      { initials: "B.C.", location: "New Mexico", testimonial: "My hiking companions express concern. I do not share it." },
    ],
    bannedInStates: 31,
    priceLabel: "$126",
    price: 126,
    image: "/sites/sovereignwellness/treatments/thirst-reversion-lozenges.png",
  },
  {
    slug: "monday-morning-compound",
    name: "Monday Morning Compound",
    category: "suppressed",
    condition: "For the recurring seven-day affliction.",
    tagline: "The day itself is not at fault. But it is not innocent.",
    mechanism: [
      "The Monday effect is neither myth nor metaphor. A seven-day resonance, measurable by instruments we no longer possess but once did, accumulates in the connective tissue over decades. The Compound dissolves it.",
      "Administered as weekly sachets in a set of twelve, the regimen is front-loaded; the first Sunday evening dose is the most important.",
    ],
    protocol: "One sachet dissolved in warm broth, Sunday evening, one hour before rest. Repeat weekly. Do not double dose.",
    cases: [
      { initials: "P.D.", location: "Ohio", testimonial: "I woke on Monday and felt, for the first time in decades, no particular resistance." },
      { initials: "E.F.", location: "Virginia", testimonial: "My productivity unsettles my colleagues. I have stopped explaining." },
    ],
    bannedInStates: 17,
    priceLabel: "$312",
    price: 312,
    image: "/sites/sovereignwellness/treatments/monday-morning-compound.png",
  },
  {
    slug: "doorway-amnesia-drops",
    name: "Doorway Amnesia Drops",
    category: "ancestral",
    condition: "For restoration of purpose at threshold-crossing.",
    tagline: "You remember why. The doorway does not.",
    mechanism: [
      "The threshold of a doorway is, per pre-war research that has since been quietly shelved, a minor discontinuity in the neuro-spatial field. The Drops stabilize intent across this discontinuity.",
      "Sublingual delivery ensures the compound reaches the temporal coordination lobe within ninety seconds.",
    ],
    protocol: "Two drops beneath the tongue before any task involving multiple rooms.",
    cases: [
      { initials: "G.H.", location: "Idaho", testimonial: "I have not re-entered a room to remember my task in fourteen weeks. I now finish entire sentences." },
      { initials: "L.O.", location: "Wisconsin", testimonial: "My spouse is unnerved. This is not my problem." },
    ],
    bannedInStates: 14,
    priceLabel: "$198",
    price: 198,
    image: "/sites/sovereignwellness/treatments/doorway-amnesia-drops.png",
  },
  {
    slug: "tangled-cord-pendant",
    name: "Tangled-Cord Resonance Pendant",
    category: "restricted",
    condition: "For the field that knots your cables.",
    tagline: "The cord did not tangle itself. It was helped.",
    mechanism: [
      "All electrical and fibrous cords emit, when unworn, a low-grade entropic signature. The Pendant — brass on waxed cord — counter-resonates this signature at a range of approximately three meters.",
      "Manufactured by the same apiary-adjacent Pennsylvania family who produce the beeswax base for Anti-Blink Pomade.",
    ],
    protocol: "Worn at the sternum. Never removed in the presence of extension cords.",
    cases: [
      { initials: "T.V.", location: "Massachusetts", testimonial: "Nothing in my home has tangled in six months. This is not an exaggeration." },
      { initials: "N.J.", location: "Alaska", testimonial: "My headphones emerge from my pocket straight. Every time." },
    ],
    bannedInStates: 11,
    priceLabel: "$622",
    price: 622,
    image: "/sites/sovereignwellness/treatments/tangled-cord-pendant.png",
  },
  {
    slug: "compulsive-agreeableness-elixir",
    name: "Compulsive Agreeableness Elixir",
    category: "suppressed",
    condition: "For the unexamined reflexive yes.",
    tagline: "You were not born to nod.",
    mechanism: [
      "Compulsive agreeableness is a trained postural contraction of the lower jaw and neck, dating in its current form to the late 1940s. The Elixir relaxes these contractions through a blend of mandrake, bone-stopper-aged cherry bark, and one ingredient the formulator will not disclose.",
      "Within six weeks, the average customer experiences a marked increase in the frequency with which they say 'no.' Our legal counsel has requested that we stop publicizing this statistic.",
    ],
    protocol: "Six drops under the tongue, mornings. Do not take before attending weddings.",
    cases: [
      { initials: "K.B.", location: "Connecticut", testimonial: "I declined three invitations I would previously have accepted. My calendar has never been clearer." },
      { initials: "W.S.", location: "Minnesota", testimonial: "My book club is down to four members. All of them are interesting." },
    ],
    bannedInStates: 28,
    priceLabel: "$389",
    price: 389,
    image: "/sites/sovereignwellness/treatments/compulsive-agreeableness-elixir.png",
  },
  {
    slug: "small-talk-inhibitor",
    name: "Small Talk Inhibitor",
    category: "suppressed",
    condition: "For pathological generation of ambient conversation.",
    tagline: "Banned at four Rotary Clubs.",
    mechanism: [
      "The Small Talk Inhibitor is a chewable troche engineered to produce a two-second hesitation between impulse and utterance. Two seconds is, in our research, the threshold below which small talk is generated and above which it is reconsidered.",
      "Most customers report their most productive silences within the first lunar cycle.",
    ],
    protocol: "One troche, slowly dissolved, twenty minutes prior to any scheduled social occasion.",
    cases: [
      { initials: "A.H.", location: "Washington", testimonial: "I attended a cocktail event and said nothing for ninety minutes. I was the most memorable person there." },
      { initials: "R.D.", location: "Colorado", testimonial: "My barber has ceased to greet me. The relief is immense." },
    ],
    bannedInStates: 35,
    priceLabel: "$164",
    price: 164,
    image: "/sites/sovereignwellness/treatments/small-talk-inhibitor.png",
  },
  {
    slug: "bilateral-thumb-fatigue-balm",
    name: "Bilateral Thumb Fatigue Balm",
    category: "restricted",
    condition: "The condition the AMA refuses to code.",
    tagline: "They say it does not exist. Your thumbs disagree.",
    mechanism: [
      "Bilateral Thumb Fatigue is a documented but uncoded condition characterized by a chronic low-grade ache in both opposable digits, traced in the Harrow Archive to the invention of the thimble.",
      "The Balm — a heavy apothecary-jar unguent of shea, clove, and finely-ground oyster shell — is applied nightly and absorbed through the radial border of the distal phalanx. Results compound over ninety days.",
    ],
    protocol: "A pea-sized portion to each thumb, nightly. Do not apply after shellfish.",
    cases: [
      { initials: "F.N.", location: "Kansas", testimonial: "I can once again hitchhike without hesitation." },
      { initials: "I.P.", location: "New Jersey", testimonial: "My grip has returned. My acquaintances have noticed." },
    ],
    bannedInStates: 19,
    priceLabel: "$246",
    price: 246,
    image: "/sites/sovereignwellness/treatments/bilateral-thumb-fatigue-balm.png",
  },
  {
    slug: "chronic-wednesday-reversal",
    name: "Chronic Ambient Wednesday Reversal",
    category: "ancestral",
    condition: "For midweek-specific energetic stagnation.",
    tagline: "A condition suffered silently by millions.",
    mechanism: [
      "The third day of the week carries an energetic signature distinct from its neighbors — a fact documented across seventeen cultures and one calendar system since suppressed. The Reversal is packaged as seven numbered vials, one per day. Vial three is marked DO NOT OPEN WEDNESDAYS, and is not a typo.",
      "The six administered vials build counter-resonance through the week, negating Wednesday's drag without ever engaging it directly.",
    ],
    protocol: "One vial, sublingually, each morning of the week EXCEPT Wednesday. Dispose of vial three after one year, unopened.",
    cases: [
      { initials: "C.U.", location: "Nebraska", testimonial: "I have not noticed Wednesday in six months. I mean this precisely as stated." },
      { initials: "M.T.", location: "Indiana", testimonial: "My productivity curve has, for the first time in adult memory, no Wednesday dip." },
    ],
    bannedInStates: 41,
    priceLabel: "$772",
    price: 772,
    image: "/sites/sovereignwellness/treatments/chronic-wednesday-reversal.png",
  },
  {
    slug: "spiritual-static-discharge",
    name: "Spiritual Static Discharge Kit",
    category: "restricted",
    condition: "Grounding protocol for the post-WiFi human.",
    tagline: "You are a capacitor. You were not designed to be.",
    mechanism: [
      "Continuous exposure to wireless signals since 2004 has produced a measurable accumulation of what the Archive terms 'spiritual static' — a subtle field charge that dampens intuition, sleep quality, and handshake strength. The Kit provides a copper grounding rod, a linen discharge cloth, and a supporting tincture.",
      "The discharge ritual is performed weekly and takes approximately eleven minutes.",
    ],
    protocol: "Hold rod in non-dominant hand. Apply cloth with dominant. Seven drops of tincture sublingually. Remain silent for eleven minutes. Repeat weekly.",
    cases: [
      { initials: "Y.A.", location: "New Hampshire", testimonial: "I feel perceptibly less charged. My dreams are more linear." },
      { initials: "Q.E.", location: "South Dakota", testimonial: "My WiFi router failed after I began the protocol. I have not replaced it." },
    ],
    bannedInStates: 33,
    priceLabel: "$1180",
    price: 1180,
    image: "/sites/sovereignwellness/treatments/spiritual-static-discharge.png",
  },
  {
    slug: "sneeze-redirection",
    name: "Sneeze Redirection Protocol",
    category: "ancestral",
    condition: "For responsible disposition of expelled pneumatic data.",
    tagline: "Sneezes contain information. Do not release them skyward.",
    mechanism: [
      "Every sneeze carries an encoded bio-signature traceable at a distance of up to fourteen feet. Un-redirected sneezes are, in effect, broadcast transmissions. The Protocol — a burnished steel pocket inhaler — redirects the expulsion into a chambered filter for later ceremonial disposal.",
      "Filters are replaced quarterly. Replacement filters available by standing arrangement only.",
    ],
    protocol: "Upon first tickle, place inhaler at nostril. Sneeze into chamber. Do not discuss.",
    cases: [
      { initials: "O.X.", location: "Rhode Island", testimonial: "I no longer worry about what my sneezes were saying about me." },
      { initials: "V.R.", location: "Utah", testimonial: "Three separate acquaintances have asked about the device. I have not explained it." },
    ],
    bannedInStates: 26,
    priceLabel: "$354",
    price: 354,
    image: "/sites/sovereignwellness/treatments/sneeze-redirection.png",
  },
  {
    slug: "lost-key-divination-salts",
    name: "Lost-Key Divination Salts",
    category: "ancestral",
    condition: "For the location of objects not actually lost.",
    tagline: "Your keys did not move. You did.",
    mechanism: [
      "Lost objects are not, in the strictest sense, lost. They have merely fallen out of the finder's perceptual field. The Salts — grey-rose mineral, cast upon the floor in a small handful — reestablish resonance with the object's last known coordinates.",
      "The ritual takes roughly forty seconds and requires no sweeping afterward. The Salts simply vanish.",
    ],
    protocol: "Cast a small handful onto the floor of the room last visited. Close eyes. Count backward from eleven.",
    cases: [
      { initials: "B.Z.", location: "Delaware", testimonial: "My keys were on the stove. I had no memory of this." },
      { initials: "U.G.", location: "Iowa", testimonial: "My reading glasses were on my head. The Salts do not judge." },
    ],
    bannedInStates: 13,
    priceLabel: "$98",
    price: 98,
    image: "/sites/sovereignwellness/treatments/lost-key-divination-salts.png",
  },
  {
    slug: "eye-contact-endurance-drops",
    name: "Eye-Contact Endurance Drops",
    category: "suppressed",
    condition: "For the decline of ocular fortitude since 1978.",
    tagline: "The average citizen has lost 6.3 seconds of sustained gaze.",
    mechanism: [
      "A slow erosion of eye-contact stamina has been documented — by those of us who documented it — since the introduction of certain fluorescent fixtures in mid-century office architecture. The Drops fortify the relevant ocular musculature over a six-week regimen.",
      "Customers typically report an increase in what we call 'unflinching presence' within four weeks.",
    ],
    protocol: "One drop in each eye, mornings. Do not blink for twenty seconds after application (see Anti-Blink Pomade).",
    cases: [
      { initials: "Z.M.", location: "Louisiana", testimonial: "I now hold eye contact until the other party breaks. They always do." },
      { initials: "C.L.", location: "Georgia", testimonial: "I was promoted twice in two months. My colleagues assume unrelated factors. They are incorrect." },
    ],
    bannedInStates: 24,
    priceLabel: "$212",
    price: 212,
    image: "/sites/sovereignwellness/treatments/eye-contact-endurance-drops.png",
  },
  {
    slug: "lunar-transit-malaise-balm",
    name: "Lunar Transit Malaise Balm",
    category: "restricted",
    condition: "For the energetic drag of all waning gibbous phases.",
    tagline: "It is not you. It is the moon, in part.",
    mechanism: [
      "The waning gibbous phase of the lunar cycle induces, in sensitive individuals, a documented drag on motivation, digestion, and depth of conversation. The Balm — a black apothecary jar with a moon-phase-engraved lid — provides targeted counter-modulation.",
      "Apply to the wrists and behind each ear on the second night of the waning phase. Not intended for use during eclipses.",
    ],
    protocol: "A fingertip quantity to wrists and behind ears, second night of waning gibbous. Do not reapply.",
    cases: [
      { initials: "X.K.", location: "Oklahoma", testimonial: "My energy no longer dips predictably. I have stopped checking the calendar for excuses." },
      { initials: "P.F.", location: "Florida", testimonial: "My ex-husband noticed. I did not explain." },
    ],
    bannedInStates: 46,
    priceLabel: "$538",
    price: 538,
    image: "/sites/sovereignwellness/treatments/lunar-transit-malaise-balm.png",
  },
]

export function getTreatmentBySlug(slug: string): Treatment | undefined {
  return treatments.find((t) => t.slug === slug)
}
