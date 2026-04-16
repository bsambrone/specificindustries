export type Branch = "army" | "navy" | "airforce" | "marines"

export interface Spec {
  label: string
  value: string
}

export interface Review {
  rank: string
  name: string
  stars: number
  body: string
}

export interface Product {
  slug: string
  branch: Branch
  nsn: string
  contractCode: string
  milStd: string
  name: string
  price: number
  priceLabel: string
  tagline: string
  image: string
  shortDescription: string
  longDescription: string[]
  specs: Spec[]
  warnings: string[]
  crossBranchJab: string
  reviews: Review[]
  featured?: boolean
}

export const products: Product[] = [
  // ===== ARMY =====
  {
    slug: "grunts-embrace",
    branch: "army",
    nsn: "8465-69-420-MRE",
    contractCode: "W91CRB-24-C-0069",
    milStd: "MIL-STD-SUCK",
    name: "The Grunt's Embrace™ Tactical Pillow",
    price: 84.99,
    priceLabel: "$84.99",
    tagline: "Concrete-filled MOLLE. Ready to ruck.",
    image: "/sites/squaredaway/product-grunts-embrace.png",
    shortDescription:
      "Concrete-filled MOLLE tactical pillow in discontinued UCP camo. Weight: 11.2 lbs. Ready to ruck, nap, or neither.",
    longDescription: [
      "Finally, a pillow that respects your profession. The Grunt's Embrace™ is constructed from reinforced MOLLE webbing, filled with genuine poured concrete, and wrapped in the Universal Camouflage Pattern that famously failed to camouflage anything between 2005 and 2019. At 11.2 pounds, it is heavy enough to qualify as Class IV field equipment and uncomfortable enough to feel earned.",
      "Each unit is poured by hand at a demolished NCO club in Fort Hood, Texas, then cured for 28 days under a tarp. Our morale engineers have verified that nobody who has ever used this pillow has slept well. This is considered a feature.",
      "Ideal for the 11B who wants to take their profession home with them, the reservist who refuses to leave the Army behind, and the O-4 whose spouse has asked them to get a hobby.",
    ],
    specs: [
      { label: "Weight", value: "11.2 lbs" },
      { label: "Dimensions", value: "18 × 14 × 4 in" },
      { label: "Fill Material", value: "Poured concrete" },
      { label: "Shell", value: "500D Cordura MOLLE webbing" },
      { label: "Pattern", value: "UCP (Class of 2005)" },
      { label: "Care Instructions", value: "Do not wash. Do not sleep on. Ruck only." },
    ],
    warnings: [
      "Not authorized for Air Force use. May cause posture injury to Chair Force personnel.",
      "Concrete source (Fort Hood NCO club) cannot be certified as morale-compliant.",
    ],
    crossBranchJab:
      "The Air Force already has memory foam with a thread count. You have this.",
    reviews: [
      {
        rank: "SFC",
        name: "Devaughn Miles",
        stars: 5,
        body: "Finally a pillow that understands me. I have not slept since 2007 and this has not changed that, but now I can't blame the pillow.",
      },
      {
        rank: "SPC",
        name: "Tanner Blackwood",
        stars: 2,
        body: "My platoon sergeant made me add it to my ruck for a 12-miler. It is still in my ruck. I am afraid of it.",
      },
      {
        rank: "1SG",
        name: "Marlene Koppel",
        stars: 5,
        body: "Issued one to every soldier in my company. Morale down 14%. Rucks up 14%. Net zero. Army math.",
      },
    ],
    featured: true,
  },
  {
    slug: "mre-pairing-flight-fort-polk",
    branch: "army",
    nsn: "8970-ARM-MRE-04",
    contractCode: "W91CRB-24-C-0201",
    milStd: "MIL-STD-SLOP",
    name: "MRE Pairing Flight: The Fort Polk Collection",
    price: 119.99,
    priceLabel: "$119.99",
    tagline: "Four MREs paired with regret.",
    image: "/sites/squaredaway/product-mre-pairing-flight-fort-polk.png",
    shortDescription:
      "Curated tasting flight of four Fort Polk-sourced MREs — Chili Mac, Beef Stew, Veggie Omelet, and Jalapeño Pepper Pouch — presented with sommelier-style pairing notes.",
    longDescription: [
      "The Fort Polk Collection is a curated MRE tasting flight designed for the soldier who has eaten everything in the catalog and developed opinions about it. Four classic meals — Chili Mac, Beef Stew, Veggie Omelet, and the standalone Jalapeño Pepper Pouch — are presented in archival-grade packaging with hand-typed sommelier tasting notes from our resident field-cuisine specialist, SFC (Ret.) Donaldson.",
      "Each pairing note addresses nose, palate, and finish. The Chili Mac is described as 'assertive, with notes of sodium and institutional intention.' The Veggie Omelet is characterized as 'challenging on first contact, meditative with repetition.' The Jalapeño Pepper Pouch is listed simply as 'a commitment.'",
      "Sourced from training cycle surplus at the Joint Readiness Training Center, Fort Polk, Louisiana. Best consumed in a muddy patrol base with no cell service. Pairs well with a 3 a.m. watch shift and unresolved career decisions.",
    ],
    specs: [
      { label: "Flight Contents", value: "Chili Mac, Beef Stew, Veggie Omelet, Jalapeño Pepper Pouch" },
      { label: "Tasting Order", value: "Pouch first. Trust the process." },
      { label: "Pairing Recommendation", value: "Warm water (canteen temperature preferred)" },
      { label: "Origin", value: "JRTC surplus, Fort Polk, Louisiana" },
      { label: "Calories", value: "1,200–1,400 per meal (estimates; accuracy not guaranteed)" },
      { label: "Sommelier Notes", value: "Curated by SFC (Ret.) Donaldson, 2x JRTC rotation survivor" },
    ],
    warnings: [
      "Consumption of all four meals within a 24-hour period may constitute a GI-tract incident reportable under AR 40-501. Consult your medic.",
      "Unauthorized consumption of the Jalapeño Pepper Pouch without prior acclimatization is discouraged. The Army assumes no liability.",
    ],
    crossBranchJab:
      "While you eat this, the Air Force is ordering off a menu in Qatar with a protein option and a garnish.",
    reviews: [
      {
        rank: "SSG",
        name: "Patricia Okonkwo",
        stars: 5,
        body: "The tasting notes are genuinely accurate. 'Assertive' is the correct word for Chili Mac. This is the most honest food criticism I have ever read.",
      },
      {
        rank: "CPT",
        name: "Wesley Fortner",
        stars: 3,
        body: "Served these at a unit dinner as a joke. My soldiers did not laugh. They ate everything and asked for more Jalapeño Pouches. I don't know what to do with this information.",
      },
      {
        rank: "SGM",
        name: "Ronald Hutchins",
        stars: 5,
        body: "I have consumed every MRE variant since 1996. The Fort Polk Collection is accurate. The packaging is unnecessary. I respect that it exists.",
      },
    ],
  },
  {
    slug: "ucp-invisibility-cloak",
    branch: "army",
    nsn: "8415-UCP-FAIL",
    contractCode: "W91CRB-08-C-0005",
    milStd: "MIL-STD-WHY",
    name: "UCP Classic™ Commemorative Invisibility Cloak",
    price: 249.99,
    priceLabel: "$249.99",
    tagline: "The camouflage that camouflaged nothing.",
    image: "/sites/squaredaway/product-ucp-invisibility-cloak.png",
    shortDescription:
      "Commemorative full-length cloak in authentic Universal Camouflage Pattern. Worked as intended from 2005 to 2019. Efficacy rating: documented. Refunds: unavailable.",
    longDescription: [
      "The UCP Classic™ Commemorative Invisibility Cloak is a collector's tribute to the Army Combat Uniform's original camouflage pattern — a $5 billion acquisition decision that produced a uniform visible in every environment on Earth, including the ones it was designed for. This cloak is produced in the original gray-green-tan colorway that performed below baseline in independent field trials and was retired from service in 2019.",
      "We have preserved the pattern exactly as issued, including the signature property of being more visible than no camouflage at all in direct sunlight. Each cloak is accompanied by a certificate of inauthenticity, confirming that the wearer will not, under any circumstances, blend into their surroundings.",
      "Ideal for veterans who want a memento of the ACU era, military historians documenting procurement failures, and anyone who needs to explain to a civilian that yes, this was real, this was on every soldier in a combat zone for fourteen years, and nobody stopped it.",
    ],
    specs: [
      { label: "Pattern", value: "Universal Camouflage Pattern (UCP), original Gray-Green-Tan" },
      { label: "In-Service Dates", value: "2005–2019 (Army); 2005–present (this cloak)" },
      { label: "Efficacy Rating", value: "Below baseline in all tested environments" },
      { label: "Colorblocks", value: "3 (gray, green, tan — none of them helpful)" },
      { label: "Certified Invisible", value: "No. Certified the opposite." },
      { label: "Composition", value: "50% cotton, 50% polyester, 100% institutional optimism" },
    ],
    warnings: [
      "This cloak does not make the wearer invisible. It may make the wearer more visible. The Army thanks you for your service.",
      "Returns not accepted on grounds of visibility. You were informed.",
    ],
    crossBranchJab:
      "The Marines issued MARPAT in 2001 and it worked immediately. The Army spent $5 billion to arrive at a different conclusion four years later.",
    reviews: [
      {
        rank: "MAJ",
        name: "Christine Bullock",
        stars: 5,
        body: "I wore this to my retirement ceremony. My commanding general recognized me immediately. The pattern remains fully non-functional. Ten stars.",
      },
      {
        rank: "SPC",
        name: "Aaron Tsai",
        stars: 2,
        body: "I bought this thinking it was a joke gift. It is a joke gift. The problem is I keep looking at it and feeling things about my deployment.",
      },
      {
        rank: "1LT",
        name: "Gretchen Waller",
        stars: 5,
        body: "Hung it in my office as a reminder that institutions make expensive mistakes and keep going anyway. Excellent motivational art.",
      },
    ],
  },
  {
    slug: "sergeant-major-mustache-kit",
    branch: "army",
    nsn: "6515-SMJ-STACHE",
    contractCode: "W91CRB-24-C-0333",
    milStd: "MIL-STD-HOOAH",
    name: "Regulation Sergeant Major Mustache Kit",
    price: 64.99,
    priceLabel: "$64.99",
    tagline: "Wax, comb, and one framed citation.",
    image: "/sites/squaredaway/product-sergeant-major-mustache-kit.png",
    shortDescription:
      "Professional-grade mustache wax, regulation-width comb, and a framed commendation for Exceptional Facial Grooming. Compliant with AR 670-1 maximum width standards.",
    longDescription: [
      "The Regulation Sergeant Major Mustache Kit is a complete grooming system for the E-9 who has optimized every aspect of their career and now turns to the lip. Included: one tin of Army-appropriate mustache wax (matte finish, neutral fragrance, zero parade-ground shine), one aluminum comb calibrated to the AR 670-1 maximum width of one-half inch beyond the corner of the mouth, and one 5×7 framed commendation for Exceptional Facial Grooming signed by a notional but plausible CSM.",
      "The framed citation reads, in part: 'For meritorious facial grooming during the period of service, demonstrating sustained commitment to regulation upper-lip maintenance in a manner that reflects credit upon this soldier, this unit, and the noncommissioned officer corps.' It is suitable for display in a home office, NCO lounge, or any surface where a spouse cannot prevent it.",
      "The wax is compounded to hold through physical training, field conditions, and unit town halls. The citation is not transferable to another soldier. Your mustache must be grown in-house.",
    ],
    specs: [
      { label: "Wax Compound", value: "Medium-hold matte, AR 670-1 compliant sheen level" },
      { label: "Comb Material", value: "Matte black anodized aluminum, 3.2 in" },
      { label: "Framed Citation Size", value: "5 × 7 in, black frame, matte glass" },
      { label: "Regulation Width", value: "Max 0.5 in beyond corner of mouth (AR 670-1 reference)" },
      { label: "Approved Curl Styles", value: "Natural, slight upward, moderate upward. Handlebar: unauthorized." },
      { label: "Compliance", value: "Fully compliant. Inspect-ready." },
    ],
    warnings: [
      "Mustache must be grown by the authorized user. This kit cannot grow a mustache on your behalf. You must provide the upper lip.",
      "The framed citation does not constitute an official Army award and cannot be submitted for personnel file inclusion, regardless of how you feel about it.",
    ],
    crossBranchJab:
      "The Navy allows full beards, which is a policy choice that looks exactly like a policy choice.",
    reviews: [
      {
        rank: "SGM",
        name: "Harold Petrosky",
        stars: 5,
        body: "I have maintained a regulation mustache since 1998. This wax is the first product that has understood what I am trying to do. The citation is hanging next to my EIB. It fits.",
      },
      {
        rank: "SSG",
        name: "Derek Cantu",
        stars: 3,
        body: "Bought this as a gift for my First Sergeant. He opened it, read the citation out loud to the formation, and then put it in his top desk drawer. I call that a win.",
      },
      {
        rank: "1SG",
        name: "Vivian Przybylski",
        stars: 5,
        body: "The comb is calibrated correctly. I checked. The wax holds through a 10-mile ruck. The citation is factually accurate. Five stars. No notes.",
      },
    ],
  },
  {
    slug: "artisanal-field-mud",
    branch: "army",
    nsn: "8305-MUD-POLK",
    contractCode: "W91CRB-24-C-0818",
    milStd: "MIL-STD-WET",
    name: "Artisanal Field Mud™ (1 gal.)",
    price: 39.99,
    priceLabel: "$39.99",
    tagline: "Sourced from Fort Polk. Certified miserable.",
    image: "/sites/squaredaway/product-artisanal-field-mud.png",
    shortDescription:
      "Single-origin field mud hand-harvested from Fort Polk, Louisiana. 62% clay content. Notes of pine, standing water, and institutional despair. One gallon, sealed.",
    longDescription: [
      "Not all mud is created equal. The Artisanal Field Mud™ is harvested by hand from the training areas of Fort Polk, Louisiana — a landscape widely regarded by soldiers who have served there as 'the worst place I have ever been' and 'somehow worse in summer.' At 62% Louisiana red clay and 38% standing surface water, it achieves a consistency our terroir specialists describe as 'persistent' and 'load-bearing in the worst way.'",
      "Each gallon is sealed in a food-grade container (not for food) with a single-origin certificate documenting the harvest grid coordinate, approximate rainfall during collection, and the name of the training rotation during which it was sourced. Aroma profile: pine sap, standing water, DEET, and the specific kind of quiet that precedes a safety brief.",
      "Recommended for reenactors seeking authenticity, veterans pursuing sensory recall, and anyone who has tried to explain to a civilian what JRTC was like and found language insufficient. Not for Air Force personnel, who have never seen mud in a professional context.",
    ],
    specs: [
      { label: "Origin", value: "Fort Polk (JRTC), Louisiana — Training Area 17-Bravo" },
      { label: "Volume", value: "1 gallon (3.78 L), sealed container" },
      { label: "Moisture Content", value: "38% (seasonal variation applies)" },
      { label: "Clay Ratio", value: "62% Louisiana red clay" },
      { label: "Certifications", value: "Single-origin certified. Misery-compliant." },
      { label: "Aroma Profile", value: "Pine, standing water, DEET, late-rotation fatigue" },
    ],
    warnings: [
      "Not edible, despite multiple Marine Corps field reports suggesting otherwise. Do not consume.",
      "May attract mosquitoes when opened indoors. The Fort Polk mosquito is not contained by walls. You have been advised.",
    ],
    crossBranchJab:
      "The Air Force has not encountered mud in a professional context. This product is not for them.",
    reviews: [
      {
        rank: "SFC",
        name: "Jerome Dabney",
        stars: 5,
        body: "Opened the container and my body immediately went back to 2011. I was on a patrol base. It was raining. I was 23. The mud is accurate.",
      },
      {
        rank: "CPT",
        name: "Lindsay Hargrove",
        stars: 2,
        body: "Bought this for my veterans' group as a joke. Nobody laughed. Two guys got quiet for a while. The mud is very real.",
      },
      {
        rank: "SGT",
        name: "Marcus Oyelaran",
        stars: 5,
        body: "I used this to explain JRTC to my wife. She looked at the jar for a long time and said 'Oh.' That is exactly what JRTC is. Five stars.",
      },
    ],
  },
  {
    slug: "hooah-bar",
    branch: "army",
    nsn: "8940-HOOAH-01",
    contractCode: "W91CRB-24-C-0101",
    milStd: "MIL-STD-CHOMP",
    name: "The Hooah Bar™",
    price: 89.0,
    priceLabel: "$89.00",
    tagline: "Tastes like motivation and abandonment.",
    image: "/sites/squaredaway/product-hooah-bar.png",
    shortDescription:
      "Artisanal 600-calorie chocolate energy bar developed from the Army ration tradition. Notes of motivation, malt, and departure. $89 per bar. Certified worth it by no one.",
    longDescription: [
      "The Hooah Bar™ is an artisanal interpretation of the Army's legendary field ration energy bar — a product that has been in some version of continuous service since the 1990s and which every soldier has eaten out of desperation at least once. Our version is hand-produced in small batches, chocolate-malt base, 600 calories, and finished with a note that our tasting panel described as 'motivation' on the front end and 'abandonment' on the finish.",
      "It is $89. This price reflects the craft process, the premium ingredients, and the understanding that the soldier who needs a Hooah Bar at 0300 will pay $89 without thinking about it. We have priced it accordingly. There is no multi-pack discount. There is no loyalty program. There is only the bar.",
      "Limit one per 24-hour period. Not because of any medical reason. Because the Army has always limited the good things. You already know this.",
    ],
    specs: [
      { label: "Calories", value: "600 per bar" },
      { label: "Protein", value: "18g" },
      { label: "Motivation Content", value: "High (front-loaded; diminishes mid-bar)" },
      { label: "Origin", value: "Small-batch facility, undisclosed CONUS location" },
      { label: "Best Before", value: "Longer than your enlistment" },
      { label: "Certifications", value: "MIL-STD-CHOMP compliant. Not certified as enjoyable." },
    ],
    warnings: [
      "Limit one bar per 24-hour period. This is not medically required. It is a posture. We maintain it.",
      "May cause spontaneous vocalization of 'HOOAH' in public settings. The manufacturer assumes no social liability.",
    ],
    crossBranchJab:
      "The Marine Corps sells their Culinary Coloring Sticks for $34.99 a dozen. They taste approximately the same and cost $54 less. We respect the market.",
    reviews: [
      {
        rank: "1LT",
        name: "Caleb Fontaine",
        stars: 5,
        body: "I ate this at 0200 before a battalion FTX. I felt like I understood the Army for about 45 minutes. Then the feeling passed and I was just cold. Worth $89.",
      },
      {
        rank: "SPC",
        name: "Nguyen Ha-Lin",
        stars: 3,
        body: "Tastes exactly like the original. I do not know if that is a compliment. I bought two.",
      },
      {
        rank: "COL",
        name: "Warren Albright",
        stars: 5,
        body: "I keep one in my desk. I have not eaten it. Its presence alone increases my productivity by an estimated 12%. I will eat it when I retire.",
      },
    ],
  },
  {
    slug: "rucking-enrichment-stones",
    branch: "army",
    nsn: "5530-RUCK-BRK",
    contractCode: "W91CRB-24-C-0606",
    milStd: "MIL-STD-HEAVY",
    name: "Rucking Enrichment Stones™ (set of 6)",
    price: 149.99,
    priceLabel: "$149.99",
    tagline: "Decorative bricks for emotional weight.",
    image: "/sites/squaredaway/product-rucking-enrichment-stones.png",
    shortDescription:
      "Set of 6 named bricks — Discipline, Regret, Hooah, Brotherhood, Foot Pain, Retirement — for the mindful ruck march. Each stone weighs 5 lbs. Total: 30 lbs of intention.",
    longDescription: [
      "The Rucking Enrichment Stones™ are a set of six individually named bricks designed to transform the ruck march from a physical exercise into a reflective practice. Each stone is hand-labeled with one of the six core Army emotional states: Discipline, Regret, Hooah, Brotherhood, Foot Pain, and Retirement. Together they weigh 30 pounds and fit inside a standard ALICE or MOLLE ruck with room for one MRE and your reenlistment paperwork.",
      "The naming convention follows research conducted by our Army Morale Division, which determined that soldiers carry these six concepts regardless of whether they are physically represented in their ruck. By externalizing the weight, the soldier gains perspective. By carrying 30 additional pounds, the soldier gains blisters. Both are considered enrichment.",
      "Stones are cast from recycled concrete aggregate and finished with a matte gray coating rated for field conditions. 'Retirement' is slightly heavier than the others. This was intentional.",
    ],
    specs: [
      { label: "Weight per Stone", value: "5 lbs each (Retirement: 5.4 lbs)" },
      { label: "Set Count", value: "6 stones" },
      { label: "Stone Names", value: "Discipline, Regret, Hooah, Brotherhood, Foot Pain, Retirement" },
      { label: "Origin", value: "Recycled concrete aggregate, CONUS-sourced" },
      { label: "Enrichment Rating", value: "High (physical); Variable (emotional)" },
      { label: "Certifications", value: "MIL-STD-HEAVY compliant. Ruck-rated." },
    ],
    warnings: [
      "Do not attempt to carry all six stones simultaneously without command approval and a prior medical screening. This is not a challenge. It is a warning.",
      "Stones are not toys and are not suitable for children, pets, or Air Force PT programs. They are bricks. They are heavy. You were informed.",
    ],
    crossBranchJab:
      "The Navy loads your weight onto a ship for you. You carry yours on your back for 12 miles. One of these builds character and the other builds a port authority invoice.",
    reviews: [
      {
        rank: "SGT",
        name: "Franklin Dubose",
        stars: 5,
        body: "I carry Brotherhood and Foot Pain every Friday morning. They have not made the ruck easier. They have made it feel more honest. I have recommended this to my entire squad.",
      },
      {
        rank: "SPC",
        name: "Hannah Birch",
        stars: 2,
        body: "I was told these were metaphorical. They are not metaphorical. They are bricks. I am stronger now but I did not consent to this.",
      },
      {
        rank: "SFC",
        name: "Cornelius Mabry",
        stars: 5,
        body: "Put Retirement in the bottom of my ruck three years ago. I can feel it on every march. That is the correct amount of feeling to have about it.",
      },
    ],
  },
  {
    slug: "powerpoint-of-the-month-club",
    branch: "army",
    nsn: "7690-PPT-SUB",
    contractCode: "W91CRB-24-C-0400",
    milStd: "MIL-STD-SLIDE",
    name: "PowerPoint of the Month Club™",
    price: 29.99,
    priceLabel: "$29.99 / month",
    tagline: "400+ safety slides, delivered monthly.",
    image: "/sites/squaredaway/product-powerpoint-of-the-month-club.png",
    shortDescription:
      "Monthly delivery of 400+ Army-style safety briefing slides covering SHARP, OPSEC, Suicide Prevention, Equal Opportunity, and more. Formatted in 4:3. Clip art included.",
    longDescription: [
      "The PowerPoint of the Month Club™ is a subscription service delivering a fresh, comprehensive safety briefing deck each month — 400 or more slides covering the full spectrum of mandatory Army training topics: SHARP, OPSEC, Suicide Prevention, Equal Opportunity, Heat Casualty Prevention, Cold Weather Operations, POV Safety, Holiday Messaging, and a rotating bonus topic selected by our Content Assurance Branch. Each deck is formatted in 4:3 aspect ratio and includes original clip art, Word Art headers, and at least one slide that is entirely in blue on black.",
      "Our editorial team sources material from Army training doctrine and formats it according to standards established between 2003 and 2011, which remain in active use throughout the force. Animations are enabled by default. Transitions include Fly In, Box Out, and the Wipe effect that one S6 sergeant in every battalion refuses to remove.",
      "This is the only product in our catalog that every service member — across all branches — has already sat through. We are simply making it available for home use.",
    ],
    specs: [
      { label: "Slides per Month", value: "400+ (subject to topic expansion)" },
      { label: "Format", value: "PowerPoint (.pptx), 4:3 aspect ratio, animations enabled" },
      { label: "Renewal", value: "Auto-renews monthly. Opting out requires a counseling statement." },
      { label: "Delivery", value: "Digital download. No hard copy. Printing is your problem." },
      { label: "Topics Covered", value: "SHARP, OPSEC, Suicide Prevention, EO, Heat/Cold, POV Safety, Holiday Messaging, and rotating bonus topic" },
      { label: "Certifications", value: "MIL-STD-SLIDE compliant. Attendance mandatory." },
    ],
    warnings: [
      "Attendance is mandatory. Attendance does not constitute comprehension. Comprehension is not tracked.",
      "Viewing the slides does not constitute completion of mandatory training. You still have to sit in the room and sign the roster.",
    ],
    crossBranchJab:
      "This is the only product in our catalog that every service branch has already sat through in a conference room on a Tuesday morning with bad coffee.",
    reviews: [
      {
        rank: "CPT",
        name: "Sandra Whitmore",
        stars: 5,
        body: "The Holiday Messaging deck has 47 slides about not drinking and driving. Slide 31 is just a photo of a totaled Camaro with no text. Peak Army PowerPoint. Five stars.",
      },
      {
        rank: "SSG",
        name: "Bobby Kline",
        stars: 3,
        body: "I have delivered the SHARP brief so many times I have memorized it. This deck has a slide I have never seen before. I don't know where it came from. I am using it.",
      },
      {
        rank: "LTC",
        name: "Pamela Osei",
        stars: 5,
        body: "I used the February deck for my battalion's holiday safety stand-down in February. Nobody noticed. Nobody asked. The roster was signed. Mission accomplished.",
      },
    ],
  },

  // ===== NAVY =====
  {
    slug: "chiefs-coffee-dark-deployment",
    branch: "navy",
    nsn: "8955-NAV-JOE-01",
    contractCode: "N00019-24-C-0074",
    milStd: "MIL-STD-BREW",
    name: "Chief's Coffee™ Dark Deployment Roast",
    price: 45.0,
    priceLabel: "$45.00",
    tagline: "Ground on the flight deck by a chief named Dave.",
    image: "/sites/squaredaway/product-chiefs-coffee-dark-deployment.png",
    shortDescription:
      "Single-origin aircraft-carrier dark roast, hand-ground on the flight deck by CPO Dave. Artisanal bag, institutional soul. Navy coffee, finally priced like it deserves respect.",
    longDescription: [
      "Chief's Coffee™ Dark Deployment Roast is a single-origin dark roast sourced from a carrier operating in the Western Pacific and processed by Chiefs in the Goat Locker between watch rotations. It is ground on the flight deck — not because this improves the grind, but because Chief Dave insists on it and nobody has successfully argued with him about it since 2018. The bag looks artisanal. The coffee tastes like purpose.",
      "Navy coffee has a documented and distinguished reputation for being catastrophically strong, aggressively over-brewed, and served in a context where it is the only thing standing between the watch and the sea. We have not changed this. We have wrapped it in kraft paper with a wax seal and charged $45 for it, which Chief Dave also insists on.",
      "Flavor notes: dark chocolate, engine exhaust, and the specific kind of clarity that arrives at 0200 on the bridge when you have accepted that this is your life and it is fine. Pairs well with the Goat Locker, a framed photo of your ship, and the knowledge that the Army is still brewing Folgers.",
    ],
    specs: [
      { label: "Origin", value: "Western Pacific (carrier-sourced, deployment cycle 2023–2024)" },
      { label: "Roast", value: "Dark. Aggressively dark. Not negotiable." },
      { label: "Grind", value: "Coarse, flight-deck ground, Chief Dave method" },
      { label: "Caffeine", value: "Elevated (exact mg classified, OPORD 7-24)" },
      { label: "Flavor Notes", value: "Dark chocolate, exhaust, 0200 clarity, institutional resolve" },
      { label: "Certifications", value: "MIL-STD-BREW compliant. Goat Locker approved." },
    ],
    warnings: [
      "Contains coffee. May contain flight deck. Trace amounts of Chief Dave's opinions are present in every bag and cannot be removed.",
      "Not recommended for Army personnel who are accustomed to Folgers and may find this an overwhelming transition.",
    ],
    crossBranchJab:
      "The Army still brews Folgers in a drip machine in the TOC and calls it good enough — and honestly, for the Army, it is.",
    reviews: [
      {
        rank: "CPO",
        name: "Garrett Tillinghast",
        stars: 5,
        body: "This is the coffee I have been trying to describe to my wife for eleven years. I showed her the bag. She said it looked artisanal. I said it was. That is technically true.",
      },
      {
        rank: "PO2",
        name: "Renata Voss",
        stars: 3,
        body: "It is good coffee. I remain unclear on why it costs $45. My CPO said 'because it can' and walked away. I am giving it three stars as a protest. The coffee is fine.",
      },
      {
        rank: "SCPO",
        name: "Douglas Meachum",
        stars: 5,
        body: "I ground this on my patio deck because I don't have a flight deck anymore. It is not the same but the coffee is correct. Chief Dave knows what he is doing.",
      },
    ],
  },
  {
    slug: "goat-locker-soap",
    branch: "navy",
    nsn: "8520-CPO-GOAT",
    contractCode: "N00019-24-C-0109",
    milStd: "MIL-STD-ANCHOR",
    name: "Goat Locker™ Membership Soap",
    price: 24.99,
    priceLabel: "$24.99",
    tagline: "For Chiefs. And Chief-adjacent civilians.",
    image: "/sites/squaredaway/product-goat-locker-soap.png",
    shortDescription:
      "Goat-shaped bar soap honoring Chief Petty Officer culture and the sacred institution of the Goat Locker. Olive-drab paper tag. Membership not included. The scent is earned.",
    longDescription: [
      "The Goat Locker™ Membership Soap is a full-sized bar of soap cast in the shape of a goat — because the Chief Petty Officer Mess is called the Goat Locker, and the Goat Locker is the most important room on any naval vessel, and if you do not understand why then this soap is not for you. The bar is wrapped in olive-drab kraft paper with a tag that lists the CPO Creed in a font small enough to require reading glasses.",
      "The scent is teak wood, salt air, and something our fragrance team describes as 'the specific gravity of seniority.' It was developed in consultation with two retired Master Chiefs who were not paid for their input but who gave it at length anyway. The bar is 6 oz, hand-poured, and shaped with enough goat detail to be identifiable from across a head.",
      "This soap is technically available to non-Chiefs. We are not gatekeeping soap. We are, however, noting that using it without achieving E-7 may produce a mild but persistent sense of not quite having earned it. The Marine Corps mascot is a bulldog. A bulldog cannot produce milk. The goat can. The Navy wins this particular comparison by any meaningful measure.",
    ],
    specs: [
      { label: "Shape", value: "Goat (full figure, standing, regulation posture)" },
      { label: "Weight", value: "6 oz" },
      { label: "Scent", value: "Teak, salt air, seniority" },
      { label: "Membership Required", value: "Recommended. Not enforced. You know who you are." },
      { label: "Ritual Compliance", value: "Compatible with CPO initiation season" },
      { label: "Certifications", value: "MIL-STD-ANCHOR compliant. Goat Locker adjacent." },
    ],
    warnings: [
      "Not for use by non-Chiefs without an honest accounting of where you are in your career and what that means.",
      "Do not eat. The goat shape is symbolic. It is soap.",
    ],
    crossBranchJab:
      "The Marine Corps mascot is a bulldog, which is a fine animal that has never produced milk, won a navigation argument, or run a Chief's Mess.",
    reviews: [
      {
        rank: "MCPO",
        name: "Josephine Barfield",
        stars: 5,
        body: "Bought twelve. One for my head, one for my desk, one for every E-6 in my command with a note that says 'not yet.' The soap is excellent. The message is the point.",
      },
      {
        rank: "PO1",
        name: "Trevor Galindo",
        stars: 2,
        body: "I am an E-6. I bought this. I feel weird about it. The soap works fine. The goat is judging me. Promotion board is in March.",
      },
      {
        rank: "CPO",
        name: "Adaeze Okonkwo",
        stars: 5,
        body: "Smells exactly right. I don't know how they did that. Gave one to my husband. He said 'this is just soap.' He is not a Chief. He would not understand.",
      },
    ],
  },
  {
    slug: "deployment-beard-oil",
    branch: "navy",
    nsn: "8520-NAV-BEARD",
    contractCode: "N00019-24-C-0215",
    milStd: "MIL-STD-FUZZ",
    name: "The 7-Month Deployment™ Beard Oil",
    price: 52.0,
    priceLabel: "$52.00",
    tagline: "For beards the Navy technically allows.",
    image: "/sites/squaredaway/product-deployment-beard-oil.png",
    shortDescription:
      "Premium conditioning beard oil for the seven-month deployment beard the Navy technically permits with a no-shave chit. Stenciled olive label. Chit compatibility verified. Army not eligible.",
    longDescription: [
      "The 7-Month Deployment™ Beard Oil is a premium conditioning oil formulated for the beard that grows when the ship leaves Norfolk in October and returns in May, and which is technically authorized under current Navy grooming policy provided the sailor has obtained a no-shave chit signed by their Commanding Officer, countersigned by the XO, and submitted through the appropriate administrative channel within 14 days of commencement of facial hair growth. The bottle has a stenciled olive label because this beard was earned through bureaucracy and should look the part.",
      "The scent profile is cedar, sea salt, and a faint note of the specific relief that arrives when chit approval is confirmed. The oil conditions aggressively — seven months is a long deployment and the beard is doing its best under difficult conditions including salt air, underway humidity, and the skeptical attention of senior enlisted personnel.",
      "The Army does not allow beards. The Army made this choice and continues to make it every morning when they shave. We respect their right to do so and have priced this oil at $52, which is $52 more than the Army will ever spend on beard care.",
    ],
    specs: [
      { label: "Volume", value: "2 fl oz (59 mL)" },
      { label: "Scent Profile", value: "Cedar, sea salt, chit approval" },
      { label: "Conditioning", value: "Deep-penetrating, 7-month deployment rated" },
      { label: "Deployment Cycle", value: "Formulated for 180–210 day underway periods" },
      { label: "Chit Compatibility", value: "Fully compatible with all no-shave chit formats (NAVPERS 1070/613 series)" },
      { label: "Origin", value: "Small-batch, CONUS-produced, command-aware" },
    ],
    warnings: [
      "Still requires a no-shave chit signed by your Commanding Officer. This oil does not constitute command endorsement and cannot be submitted as documentation of approval.",
      "Not a substitute for the administrative process. Apply to beard. File the chit separately. These are two distinct actions.",
    ],
    crossBranchJab:
      "The Army made the decision not to allow beards, and they make it again every morning, and that is their right, and we will not comment further.",
    reviews: [
      {
        rank: "LT",
        name: "Brendan Hollowell",
        stars: 5,
        body: "Chit approved on day three. Used this oil for the full deployment. Came home looking like a man who had been somewhere important and smelled cedar. My CO asked what I was using. I told him. He wrote himself a chit.",
      },
      {
        rank: "PO3",
        name: "Marcus Thibodeau",
        stars: 2,
        body: "Chit was denied. I still bought the oil and used it at home on leave. This is either sad or an act of defiance. I have not decided which.",
      },
      {
        rank: "LTJG",
        name: "Camille Ferreira",
        stars: 5,
        body: "Bought this for my husband for homecoming. He'd been at sea for six months. The beard was real and so was the oil. The scent is accurate. Cedar and relief. Five stars.",
      },
    ],
  },
  {
    slug: "dixie-cup-storage-system",
    branch: "navy",
    nsn: "8405-DIX-STOR",
    contractCode: "N00019-24-C-0333",
    milStd: "MIL-STD-WHITE",
    name: "Dixie Cup Hat Storage System",
    price: 129.99,
    priceLabel: "$129.99",
    tagline: "An elaborate contraption for one white hat.",
    image: "/sites/squaredaway/product-dixie-cup-storage-system.png",
    shortDescription:
      "Humidity-controlled, LED-lit, glass-dome stainless-steel display case for one (1) white Dixie cup sailor hat. $129.99 for what is effectively a terrarium with a hat in it. Justified.",
    longDescription: [
      "The Dixie Cup Hat Storage System is a stainless-steel and borosilicate glass display case — humidity controlled, LED illuminated, and airtight sealed — designed to house a single white Dixie cup sailor cover at optimal preservation conditions. It holds one hat. Just the one. The case is 14 inches tall, weighs 4.2 lbs, and costs $129.99, which is $129.99 more than any reasonable person would expect to spend on hat storage and exactly the right amount to spend on this hat.",
      "The humidity control maintains a constant 45% relative humidity, which our textile preservation team has identified as optimal for white cotton covers that have seen parade deck wear, deployment heat, and the accumulated weight of someone's entire enlisted career. The LED ring illuminates from below, casting the hat in the kind of light usually reserved for museum artifacts and things that deserve to be looked at.",
      "The Air Force issues berets, which are kept in a drawer or a pocket or wherever you put a beret, because a beret does not require a glass dome and nobody is going to pretend otherwise. This hat does.",
    ],
    specs: [
      { label: "Material", value: "304 stainless steel base, borosilicate glass dome" },
      { label: "Dimensions", value: "14 in H × 10 in W (interior: 12 in H × 9 in W)" },
      { label: "Display Capacity", value: "One (1) Dixie cup cover. No exceptions." },
      { label: "Humidity Control", value: "Passive silica gel, 40–50% RH target, replaceable cartridge" },
      { label: "Illumination", value: "Warm white LED ring, base-mounted, 3000K" },
      { label: "Certifications", value: "MIL-STD-WHITE compliant. Hat not included." },
    ],
    warnings: [
      "Not a humidor. Not a snow globe. Cap not included and must be sourced separately through official Navy uniform channels.",
      "Placing more than one Dixie cup in this unit voids the warranty and violates the design intent. One hat. This is not a collection case.",
    ],
    crossBranchJab:
      "The Air Force wears berets to brunch and keeps them in coat pockets, which is fine, because a beret has not earned a glass dome.",
    reviews: [
      {
        rank: "ENS",
        name: "Patrick Moreau",
        stars: 5,
        body: "I bought this for my grandfather's Dixie cup from 1971. It is now on his mantle under glass with the LED on. He cried a little. I am giving this five stars and I will not explain further.",
      },
      {
        rank: "PO2",
        name: "Shondra Lavelle",
        stars: 3,
        body: "It is a very good display case. It is also $130. I am keeping it. I would not say I feel good about the price. The hat looks incredible though.",
      },
      {
        rank: "CDR",
        name: "William Nakashima",
        stars: 5,
        body: "Purchased four. One for each of my sailors who made E-3. Told them this is where your first cover lives when you upgrade to chief's khakis. They seemed moved. The LED is a nice touch.",
      },
    ],
  },
  {
    slug: "shellback-coaster-set",
    branch: "navy",
    nsn: "7690-SHELL-4PK",
    contractCode: "N00019-24-C-0447",
    milStd: "MIL-STD-EQU",
    name: "Shellback Certification Coaster Set",
    price: 34.99,
    priceLabel: "$34.99",
    tagline: "I crossed the equator once and won't shut up.",
    image: "/sites/squaredaway/product-shellback-coaster-set.png",
    shortDescription:
      "Set of 4 commemorative coasters marking your Shellback certification — trident, crossing scroll, sea turtle, and First Crossing motifs. The set will bring it up at dinner. Repeatedly.",
    longDescription: [
      "The Shellback Certification Coaster Set commemorates the ancient and solemn tradition of crossing the equator aboard a naval vessel and becoming, thereby, a Shellback — a status that is taken seriously by every Shellback and dismissed as theater by every Polliwog who has not yet made the crossing. The set contains four coasters, each bearing a different motif from the crossing ceremony: the Neptune trident, the crossing scroll, the sea turtle, and the First Crossing insignia. Together they form a complete account of an event you are allowed to mention at every dinner for the rest of your natural life.",
      "The coasters are made from cork-backed hardwood, finished in matte black with gold foil detail, and sized for standard beverage glasses. Two of the four motifs are considered Polliwog-safe for civilian guests. The trident and the scroll carry context that will require explanation, and the set fully expects you to provide it.",
      "The Army has not crossed the equator in uniform. This is a documented fact that the Army has made no statement about, and we respect their silence on the matter.",
    ],
    specs: [
      { label: "Quantity", value: "4 coasters" },
      { label: "Material", value: "Cork-backed hardwood, matte black finish, gold foil" },
      { label: "Diameter", value: "4 in each" },
      { label: "Motifs", value: "Trident, Crossing Scroll, Sea Turtle, First Crossing" },
      { label: "Polliwog Certified", value: "2 of 4 coasters (Turtle and First Crossing)" },
      { label: "Shellback Certified", value: "All 4. The set is complete. You earned it." },
    ],
    warnings: [
      "Only two of the four coasters are polliwog-safe for guests who have not crossed the equator. The other two will raise questions and the host is responsible for the resulting conversation.",
      "The set will bring up your Shellback status at dinner. This is a design feature, not a defect.",
    ],
    crossBranchJab:
      "The Army has never crossed the equator in uniform, which is fine, and they have developed other traditions to compensate, which are also fine.",
    reviews: [
      {
        rank: "PO1",
        name: "Darnell Whitfield",
        stars: 5,
        body: "Put these on the coffee table. Within seven minutes of my in-laws arriving I had explained Shellback certification, the line-crossing ceremony, and why King Neptune is not a metaphor. The coasters are working exactly as intended.",
      },
      {
        rank: "LTJG",
        name: "Priya Sunderland",
        stars: 4,
        body: "My husband is a Polliwog. He is not allowed to use the trident coaster. He knows why. He has accepted it. This set has introduced a healthy dynamic into our household.",
      },
      {
        rank: "CPO",
        name: "Eugene Bradshaw",
        stars: 2,
        body: "The coasters are fine. I crossed the equator in 2004. I did not need coasters to remember it. I bought these anyway because the set looked right. I am using them. I stand by two stars.",
      },
    ],
  },
  {
    slug: "sub-school-pillowcase",
    branch: "navy",
    nsn: "7210-SUB-DARK",
    contractCode: "N00019-24-C-0555",
    milStd: "MIL-STD-SILENT",
    name: "Sub School Pillowcase — Blackout Edition",
    price: 39.99,
    priceLabel: "$39.99",
    tagline: "For sailors who haven't seen the sun in 90 days.",
    image: "/sites/squaredaway/product-sub-school-pillowcase.png",
    shortDescription:
      "Jet-black total-blackout pillowcase for the submariner who has not seen the sun since before the last port call. Sensory-deprivation rated. Surfacing may cause adjustment.",
    longDescription: [
      "The Sub School Pillowcase — Blackout Edition is a jet-black, total-opacity cotton pillowcase designed for submariners who have adapted to an environment where the sun is a concept and daylight is something that happens to other people. The fabric is 400-thread-count matte black, sewn in a standard queen size, and tested to achieve zero light transmission under laboratory conditions. Your rack is already dark. This makes the pillow match the assignment.",
      "Sub school teaches a great many things: pressure hull theory, watchstanding, the sound of your own thoughts at 400 feet. One thing it does not teach is how to sleep in a room that has windows. This pillowcase is a transitional aid. It recreates the sensory environment of a submarine rack for the sailor who has returned to surface life and found the bedroom unacceptably bright at 1400 on a Tuesday.",
      "The Air Force sleeps in hotels. Hotels have blackout curtains, pillow mints, and a front desk number. This pillowcase has none of those things. It has darkness, which is the only thing you actually need and the one thing the Air Force has outsourced.",
    ],
    specs: [
      { label: "Color", value: "Jet black. One color. No variant." },
      { label: "Opacity", value: "100% — zero light transmission, laboratory-verified" },
      { label: "Material", value: "400TC matte cotton, enzyme-washed" },
      { label: "Sensory Rating", value: "Equivalent to 400 ft depth, rack-certified" },
      { label: "Rack Compatibility", value: "Standard queen; submarine rack adapter not required" },
      { label: "Certifications", value: "MIL-STD-SILENT compliant. Depth-rated." },
    ],
    warnings: [
      "Not recommended for daytime use by surface-warfare personnel who have not undergone sensory-deprivation acclimatization. Start with a nap.",
      "Surfacing — returning to a room with windows after extended use — may cause temporary discomfort, squinting, and an irrational preference for being back underwater.",
    ],
    crossBranchJab:
      "The Air Force sleeps in hotels with pillow mints and the curtains someone else hung, and they have made peace with that, and so have we.",
    reviews: [
      {
        rank: "PO3",
        name: "Anton Vreeland",
        stars: 5,
        body: "I have been on surface ships for two years since getting off subs. I still cannot sleep with light in the room. This pillowcase has fixed my marriage. Five stars. No notes.",
      },
      {
        rank: "LT",
        name: "Ramona Szczepanski",
        stars: 5,
        body: "Ordered six. One for every rack in my household. My civilian roommate asked why. I explained submarine sleep culture for approximately forty minutes. She uses one now too.",
      },
      {
        rank: "LCDR",
        name: "Thomas Osei",
        stars: 2,
        body: "The pillowcase is too effective. I used it on a Saturday and did not wake up until the following morning. I missed a barbecue. The pillowcase felt no remorse.",
      },
    ],
  },
  {
    slug: "liberty-call-regret-planner",
    branch: "navy",
    nsn: "7530-LIB-REG",
    contractCode: "N00019-24-C-0666",
    milStd: "MIL-STD-OOPS",
    name: "Liberty Call Regret Planner™",
    price: 22.0,
    priceLabel: "$22.00",
    tagline: "7 days. 7 entries. All say Regret.",
    image: "/sites/squaredaway/product-liberty-call-regret-planner.png",
    shortDescription:
      "Small leather-bound 7-day planner pre-filled on every page with a single word: REGRET. Designed for port-call planning in Olongapo, Pattaya, Rota, and adjacent venues. Binding holds.",
    longDescription: [
      "The Liberty Call Regret Planner™ is a 7-day leather-bound pocket planner in which every date field, time slot, and note section has been pre-filled with the single word REGRET in a clean, professional sans-serif font. There are no blank pages. There is no room for optimism. The planner has reviewed the port-call data from Olongapo, Pattaya, Rota, and comparable liberty venues and has pre-completed the planning process for you based on what the historical record suggests the week will contain.",
      "The cover is tan faux leather with a brass snap closure. The spine is reinforced because the planner has been designed to survive the same conditions it documents. Each day is organized into morning, afternoon, and evening slots, all of which read REGRET. The back inside cover contains a notes page that reads, at the top, 'Things to Address Upon Return,' followed by eighteen blank lines and then, at the bottom, REGRET.",
      "Marines get their regret with a tattoo. Navy gets theirs with a planner, because the Navy has always been more organized about its poor decisions.",
    ],
    specs: [
      { label: "Pages", value: "64 (7-day format, full coverage)" },
      { label: "Format", value: "Daily time-blocked planning, morning/afternoon/evening" },
      { label: "Entries Pre-Filled", value: "All of them. Every one. REGRET." },
      { label: "Cover Material", value: "Tan faux leather, brass snap closure" },
      { label: "Binding", value: "Reinforced sewn binding, liberty-condition rated" },
      { label: "Certifications", value: "MIL-STD-OOPS compliant. Port-call proven." },
    ],
    warnings: [
      "Not legally binding. The planner does not constitute a formal acknowledgment of wrongdoing and cannot be subpoenaed, although it may be cited informally.",
      "The planner may be called upon to testify. The planner will say REGRET. It always says REGRET.",
    ],
    crossBranchJab:
      "Marines come back from liberty with a tattoo that says what this planner implies — we respect the efficiency, but the planner is easier to explain to HR.",
    reviews: [
      {
        rank: "PO2",
        name: "Isaiah Fontaine",
        stars: 5,
        body: "I used this in Rota. I filled in nothing because nothing needed to be filled in — the planner had already handled it. When I got back to the ship I looked at it and it was correct on every count.",
      },
      {
        rank: "ENS",
        name: "Audrey Clements",
        stars: 3,
        body: "I bought this thinking it was a joke gift for my Chief. She opened it, read the first page, closed it, put it in her desk drawer, and said thank you. I don't know if that means she liked it.",
      },
      {
        rank: "CAPT",
        name: "Gerald Matsumoto",
        stars: 5,
        body: "Purchased a case of these for my wardroom before our last deployment. Distributed them at the first port call brief. Nobody laughed. Several officers nodded slowly. The planner is accurate.",
      },
    ],
  },
  {
    slug: "haze-gray-touchup-kit",
    branch: "navy",
    nsn: "8010-GRAY-HAZ",
    contractCode: "N00019-24-C-0777",
    milStd: "MIL-STD-GRAY",
    name: "Haze Gray Paint Touch-Up Kit",
    price: 19.99,
    priceLabel: "$19.99",
    tagline: "For your car, house, and will to live.",
    image: "/sites/squaredaway/product-haze-gray-touchup-kit.png",
    shortDescription:
      "One-quart can of authentic haze gray paint for touching up your car, house, and general outlook. Includes recipe card for Chip and Paint Saturdays. Covers 40 sq ft per coat.",
    longDescription: [
      "The Haze Gray Paint Touch-Up Kit contains one quart of authentic haze gray exterior paint — the specific gray used on every U.S. Navy vessel in the fleet — along with a 2-inch brush, a stir stick, and a laminated recipe card for Chip and Paint Saturdays, the beloved underway tradition in which sailors spend their weekend chipping rust off painted surfaces and then immediately repainting them in haze gray, which will rust again, which they will chip and repaint on the following Saturday.",
      "The paint is formulated for metal and masonry. It works on cars, houses, fences, garage doors, patio furniture, and the interior of any room you have decided should feel like an engineering space. Finish is satin. Coverage is 40 square feet per quart. Drying time is two hours, which is faster than Chip and Paint Saturday will feel.",
      "The Air Force paints their buildings beige. Beige is a color associated with the civilian world, real estate staging, and the temporary suppression of strong opinions. Haze gray is a color associated with something that goes to sea and comes back. There is a meaningful difference and we have priced it accordingly at $19.99.",
    ],
    specs: [
      { label: "Volume", value: "1 quart (0.946 L)" },
      { label: "Color", value: "Haze gray (Federal Standard 36270)" },
      { label: "Finish", value: "Satin" },
      { label: "Coverage", value: "40 sq ft per coat (ideal conditions; rust conditions may vary)" },
      { label: "Drying Time", value: "2 hours to touch; 24 hours to full cure; infinite hours emotionally" },
      { label: "Certifications", value: "MIL-STD-GRAY compliant. Fleet-matched." },
    ],
    warnings: [
      "Do not apply to skin. The color is accurate but the application method is not sanctioned and the results will be difficult to explain at liberty.",
      "Not food-grade. The paint is for surfaces. Surfaces are defined as anything that is not your mouth.",
    ],
    crossBranchJab:
      "The Air Force paints their buildings beige, which is a color that communicates comfort and the absence of any structural threat, and we understand the choice.",
    reviews: [
      {
        rank: "PO1",
        name: "Reginald Huff",
        stars: 5,
        body: "Painted my truck. Not the whole truck — just a scratch on the door. Now the scratch is the right color and also I cannot stop touching it because it is the exact right color. This was $20. I have no complaints.",
      },
      {
        rank: "SCPO",
        name: "Dana Przybylski",
        stars: 4,
        body: "I used this to touch up my fence and then my shed and then about half of my garage. The recipe card for Chip and Paint Saturday is accurate and also funny and also sad. Good product.",
      },
      {
        rank: "PO3",
        name: "Victor Hollingsworth",
        stars: 2,
        body: "I painted my bedroom. My family staged an intervention. The paint is good. The decision was mine. I acknowledge both of these things.",
      },
    ],
  },

  // ===== AIR FORCE =====
  {
    slug: "premium-deployment-concierge-kit",
    branch: "airforce",
    nsn: "AF-LUX-8445-DEP",
    contractCode: "FA8620-24-C-0089",
    milStd: "MIL-STD-COMFY",
    name: "Premium Deployment Concierge Kit™",
    price: 299.99,
    priceLabel: "$299.99",
    tagline: "Neck pillow, eye mask, Panera loyalty card.",
    image: "/sites/squaredaway/product-premium-deployment-concierge-kit.png",
    shortDescription:
      "Everything you need to deploy in comfort: neck pillow, silk eye mask, aromatherapy vials, folded robe, and a Panera Bread–style café loyalty card. Olive-drab tag. Business-class energy.",
    longDescription: [
      "The Premium Deployment Concierge Kit™ is the definitive travel system for the Air Force professional who has come to understand that deployment is, at its core, a business trip with better uniforms. The kit includes a memory-foam neck pillow in sage green, a silk sleep eye mask with adjustable strap, three aromatherapy vials (lavender, eucalyptus, and 'Forward Operating Base'), a pre-folded fleece robe with discreet rank tab, and a café loyalty card — styled in olive-drab with gold foil — pre-loaded with six punches toward your first complimentary beverage.",
      "Each item is packed into a structured canvas carry pouch with a brass zipper pull and an olive-drab hang tag printed with your destination, your anticipated departure time, and the phrase 'Travel well. Serve with distinction.' We did not develop this product because the Army asked for it. We developed it because the Air Force already had all of these items separately, and we thought they deserved a set.",
      "Contents subject to station availability. Not every deployed location provides the full café ecosystem. We are working on it. In the meantime, the robe travels.",
    ],
    specs: [
      { label: "Contents", value: "Neck pillow, silk eye mask, aromatherapy vials (×3), robe, café loyalty card" },
      { label: "Packaging", value: "Structured canvas carry pouch, brass zipper pull, olive-drab hang tag" },
      { label: "Loyalty Integration", value: "6-punch café card, styled generic, no real affiliation" },
      { label: "Deployment Duration", value: "Rated for 6-month AOR rotation or extended TDY" },
      { label: "Weight", value: "3.4 lbs packed" },
      { label: "Certifications", value: "MIL-STD-COMFY compliant. CENTCOM-adjacent approved." },
    ],
    warnings: [
      "Contents subject to station availability. Aromatherapy vials are non-refundable once opened in theater.",
      "Café loyalty card validity not guaranteed outside CENTCOM AOR. Al Udeid has a Starbucks. Bagram did not. Plan accordingly.",
    ],
    crossBranchJab:
      "The Army's deployment kit is a poncho liner and whatever's in the left cargo pocket from last rotation — and honestly, they make it work.",
    reviews: [
      {
        rank: "Capt",
        name: "Lindsey Harwick",
        stars: 5,
        body: "Packed this for Al Udeid. Used every item. The loyalty card got six punches in four days. The robe did not leave the room. I deployed better than I have ever deployed. Five stars.",
      },
      {
        rank: "TSgt",
        name: "Darnell Fourie",
        stars: 4,
        body: "The neck pillow is genuinely excellent. The eye mask is exactly right. I gave the aromatherapy vials to the chaplain. Keeping four stars because the robe fits weird.",
      },
      {
        rank: "Maj",
        name: "Suzanne Kettleworth",
        stars: 5,
        body: "Issued one to every officer in my squadron before the rotation. The Army liaison asked what was in the bags. We told him. He went quiet for a while. Mission accomplished.",
      },
    ],
    featured: true,
  },
  {
    slug: "chair-force-ergonomic-chair",
    branch: "airforce",
    nsn: "AF-CHR-7110-ERG",
    contractCode: "FA8620-24-C-0172",
    milStd: "MIL-STD-SITDOWN",
    name: "Chair Force™ Ergonomic Deployment Chair",
    price: 4899.0,
    priceLabel: "$4,899.00",
    tagline: "Built for 8-hour deployments between briefings.",
    image: "/sites/squaredaway/product-chair-force-ergonomic-chair.png",
    shortDescription:
      "Premium Aeron-style sage-green mesh ergonomic office chair, $4,899. Lumbar-supported. Fully adjustable. Rated for the 8-hour deployment between morning brief and afternoon brief.",
    longDescription: [
      "The Chair Force™ Ergonomic Deployment Chair is a $4,899 premium mesh office chair — sage green, full lumbar support, 5-axis adjustment, pneumatic height control — designed specifically for the Air Force deployment environment, where the primary terrain is a carpeted operations floor and the primary threat is lower-back fatigue from sustained seated analysis. It is, as our product team has acknowledged in internal documentation, a very nice chair. We are proud of it.",
      "The chair was engineered in consultation with an ergonomics specialist who has personally observed Air Force deployment posture at multiple classified and unclassified locations and concluded that the current seating situation 'could be improved significantly for a reasonable investment.' The Chair Force™ Deployment Chair is that investment, priced at $4,899 because the work of sitting well is not nothing and should not be treated as such.",
      "The Marines do not have chairs in the field. This is a choice the Marine Corps makes and maintains, and we respect it. The Air Force makes a different choice, and they make it in a chair that fits their lumbar, and the gap between these two positions is $4,899 and approximately 147 back injuries per year. We have done the math.",
    ],
    specs: [
      { label: "Material", value: "Sage-green breathable mesh back, foam-padded seat, cast aluminum base" },
      { label: "Lumbar Support", value: "Adjustable dual-zone, deployment-rated for 8-hour continuous use" },
      { label: "Recline Angle", value: "95°–135° with locking tilt; nap posture: 127° (recommended)" },
      { label: "Deployment Rating", value: "Rated for sustained carpeted operations environment, max 8 hrs/day" },
      { label: "Adjustment Points", value: "5 (height, lumbar, armrest, recline, seat depth)" },
      { label: "Warranty", value: "12-year limited warranty. Voided if taken off-base." },
    ],
    warnings: [
      "Not rated for austere environments. If your deployment site has gravel floors, this chair is not for you and we are sorry for your assignment.",
      "Chair is not rated for field duty. Placing this chair in a tent will void the warranty and also look very strange.",
    ],
    crossBranchJab:
      "The Marines stand at attention during briefings because they have no chairs — we respect the commitment, but our ergonomist has concerns.",
    reviews: [
      {
        rank: "Lt Col",
        name: "Raymond Whitmore",
        stars: 5,
        body: "My squadron pooled resources and bought two for the ops floor. Productivity is up. Lower-back complaints are down 100%. The Army liaison sat in one and did not speak for three minutes. He knows.",
      },
      {
        rank: "A1C",
        name: "Brittany Salcedo",
        stars: 2,
        body: "I cannot afford this chair. I came here to look at it. The lumbar description made me feel things. I am giving it two stars because I resent it and I want one.",
      },
      {
        rank: "SMSgt",
        name: "Gerald Okonkwo",
        stars: 5,
        body: "I have sat in a lot of chairs. This is the correct chair. I deployed twice in this chair. I am bringing it to my retirement ceremony. The Air Force is a chair branch and I am proud of that.",
      },
    ],
  },
  {
    slug: "qatar-package",
    branch: "airforce",
    nsn: "AF-QAT-8990-PKG",
    contractCode: "FA8620-24-C-0221",
    milStd: "MIL-STD-STARBUCKS",
    name: "The Qatar Package™",
    price: 449.99,
    priceLabel: "$449.99",
    tagline: "Starbucks gift card, hotel toiletries, complimentary robe.",
    image: "/sites/squaredaway/product-qatar-package.png",
    shortDescription:
      "Al Udeid welcome kit: generic café gift card, hotel slippers, folded white robe, travel toiletries, and one small potted succulent. Olive-drab tag. Five-star deployment energy, zero apologies.",
    longDescription: [
      "The Qatar Package™ is a curated welcome kit designed for the Air Force professional deploying to the Al Udeid Air Base area of operations — a location that has, over the years, developed a reputation among joint-force personnel as 'the deployment where you come back looking rested.' The kit includes a generic café-style gift card in olive-drab with gold foil lettering ('The Al Udeid Experience: Earned'), a pair of soft hotel slippers, a pre-folded white robe with a discreet Air Force insignia embroidered at the chest, a travel toiletry set in a zip-closure pouch, and one small potted succulent with care instructions in military format.",
      "The succulent care card reads, in part: 'Water once every 7–10 days. Sunlight: direct or indirect. Notes: Low maintenance. Thrives in controlled environments. Does not require field conditions.' We felt this was accurate on several levels. The robe, slippers, and toiletry set were selected to complement the existing Al Udeid lodging experience. The succulent is your responsibility.",
      "The Army's Qatar deployment experience has historically been a shipping container in Kuwait, and we want to acknowledge that they served in those conditions with distinction and without a robe. This kit is not for them. It is for the airmen who landed at Al Udeid, checked into their lodging, and thought: yes, this is appropriate.",
    ],
    specs: [
      { label: "Contents", value: "Café gift card, hotel slippers, white robe, toiletry set, potted succulent" },
      { label: "Gift Card Value", value: "Olive-drab styled, 500-point café equivalent (non-redeemable at actual Starbucks)" },
      { label: "Lodging Partner", value: "Compatible with all Al Udeid-standard lodging facilities" },
      { label: "Plant Included", value: "Yes — 1 small potted succulent, duty-roster care card included" },
      { label: "Weight", value: "4.1 lbs (succulent included; succulent adds 0.6 lbs)" },
      { label: "Certifications", value: "MIL-STD-STARBUCKS compliant. CENTCOM lodging-rated." },
    ],
    warnings: [
      "Succulent is not deployable to austere combat zones. It will not survive. Please rehome it before any subsequent rotation.",
      "Robe is not authorized for the chow hall, the gym, or the shuttle bus. You know this. We're saying it anyway.",
    ],
    crossBranchJab:
      "The Army's Qatar was a shipping container in Kuwait with a 100-watt bulb and a prayer — and they held the line, which we acknowledge while wearing our robe.",
    reviews: [
      {
        rank: "SrA",
        name: "Monica Castillo",
        stars: 5,
        body: "Got to Al Udeid, unpacked the Qatar Package, put on the robe, and did not feel one ounce of guilt. The succulent is still alive. It is my longest-running deployment relationship.",
      },
      {
        rank: "1st Lt",
        name: "Derek Brannigan",
        stars: 4,
        body: "The gift card worked at the café. The robe is excellent. I lost the slippers on day three. The succulent required more water than I expected and I still feel bad about it.",
      },
      {
        rank: "CMSgt",
        name: "Patricia Nwosu",
        stars: 5,
        body: "Bought these for every airman in my flight before deployment. The succulent care cards generated more discussion than any pre-deployment brief I have ever given. Five stars.",
      },
    ],
  },
  {
    slug: "base-housing-carpet-sampler",
    branch: "airforce",
    nsn: "AF-HSG-7220-CRP",
    contractCode: "FA8620-24-C-0305",
    milStd: "MIL-STD-BEIGE",
    name: "Base Housing Carpet Sampler™",
    price: 89.99,
    priceLabel: "$89.99",
    tagline: "Seventeen tasteful beiges.",
    image: "/sites/squaredaway/product-base-housing-carpet-sampler.png",
    shortDescription:
      "Seventeen carpet swatches in the full beige spectrum — taupe, cream, oatmeal, sand, fawn, linen, and eleven more — numbered 1 through 17. For the base housing decision that matters.",
    longDescription: [
      "The Base Housing Carpet Sampler™ is a curated collection of seventeen individual carpet swatches representing the full chromatic range available to Air Force base housing residents at most installations: taupe (samples 1–3), cream (4–5), oatmeal (6–8), sand (9–11), fawn (12–14), linen (15), warm gray (16), and a sample simply labeled 'Off-White, Standard Issue' (17). Each swatch is 4×4 inches, backed with felt, and numbered for reference in the included comparison guide.",
      "The comparison guide is a laminated single-page document that helps residents differentiate between samples that, to the untrained eye, appear identical. The guide notes that samples 7 and 8 — Oatmeal Classic and Oatmeal Warm — differ by approximately 2% in yellow-brown value and that this distinction 'matters significantly when evaluating against wall paint.' We agree. We have been in base housing. We know how seriously people take this.",
      "Navy sailors live below the waterline on metal decks and call it home, and they do not need a carpet sampler because there is no carpet, and we respect that in the way you respect a life choice that is extremely different from your own.",
    ],
    specs: [
      { label: "Swatch Count", value: "17 samples, numbered 1–17" },
      { label: "Color Range", value: "Taupe, cream, oatmeal, sand, fawn, linen, warm gray, off-white (standard issue)" },
      { label: "Material", value: "Nylon loop pile, residential grade, base-housing spec" },
      { label: "Pile Height", value: "Low to medium pile, 0.25–0.5 in (varies by swatch)" },
      { label: "Stain Resistance", value: "Moderate — rated for household pets and children, not for NCO club spills" },
      { label: "Certifications", value: "MIL-STD-BEIGE compliant. Housing office acceptable." },
    ],
    warnings: [
      "Swatches are not suitable for barracks installation. Barracks have linoleum. This is a different product category and we do not offer linoleum.",
      "Swatches are non-refundable once held against wall paint. Once you compare, you cannot un-compare. You will have an opinion. You have been informed.",
    ],
    crossBranchJab:
      "The Navy lives below the waterline on steel decks — they don't need carpet swatches because they don't have carpet, and somehow that's worse.",
    reviews: [
      {
        rank: "SSgt",
        name: "Courtney Halverson",
        stars: 5,
        body: "Spent two weeks comparing samples 6, 7, and 8. Chose 7. Oatmeal Warm. It is correct. The guide was essential. My spouse asked where I got these and I said 'a place that understands us.'",
      },
      {
        rank: "2d Lt",
        name: "Aaron Fujimoto",
        stars: 3,
        body: "I am a new officer and I do not yet live in base housing. I bought this to feel prepared. The swatches are real and the guide is good. I now have opinions about oatmeal as a color category.",
      },
      {
        rank: "Col",
        name: "Barbara Engel",
        stars: 5,
        body: "Gifted this to every O-5 in my group upon selection for base housing. One of them cried at the laminated guide. The right amount of ceremony for the occasion. Five stars.",
      },
    ],
  },
  {
    slug: "flight-suit-cashmere-loungewear",
    branch: "airforce",
    nsn: "AF-FLT-8415-CSH",
    contractCode: "FA8620-24-C-0411",
    milStd: "MIL-STD-DRIP",
    name: "Flight Suit™ Cashmere Loungewear",
    price: 499.0,
    priceLabel: "$499.00",
    tagline: "Sage green. Hand-wash only.",
    image: "/sites/squaredaway/product-flight-suit-cashmere-loungewear.png",
    shortDescription:
      "100% Grade-A cashmere flight suit in sage green. Full front zipper with gold hardware. Fitted cut, hand-wash only. For the officer's club, the hotel lobby, or wherever the evening takes you.",
    longDescription: [
      "The Flight Suit™ Cashmere Loungewear is a full-length zip-front lounge garment in 100% Grade-A cashmere — sage green, of course — cut in the silhouette of the standard flight suit but made from a fabric that has never been and will never be near an aircraft. It has two patch pockets, two thigh pockets (decorative), a full-length YKK brass zipper, and a fitted tailored profile that has been described by our design team as 'the flight suit's better life.' It is $499. It is worth it.",
      "This garment was developed for the Air Force officer who finishes a brief, removes their service uniform, and needs something to wear to the officers' club happy hour that communicates authority without trying too hard. The cashmere does the communicating. The sage green confirms the branch. The brass zipper says: I fly things, or I know people who fly things, or I am adjacent to flying things in a meaningful support capacity, and I feel comfortable about all of that.",
      "The Marine Corps uniform is covered in sand by design. This garment is covered in cashmere by design. These are not competing philosophies — they are two branches that have made their peace with what they are, and this loungewear represents that peace in $499 of single-ply knit.",
    ],
    specs: [
      { label: "Material", value: "100% Grade-A cashmere, single-ply, 16-micron fiber" },
      { label: "Fit", value: "Tailored slim — not flight-suit cut. Fitted. Know your measurements." },
      { label: "Care", value: "Hand-wash cold, lay flat to dry. Dry clean for deployment environments." },
      { label: "Colors", value: "Sage green (one color; this is a flight suit, not a palette)" },
      { label: "Zipper Hardware", value: "Full-length YKK brass zipper, double-pull" },
      { label: "Certifications", value: "MIL-STD-DRIP compliant. Officers' club approved." },
    ],
    warnings: [
      "This is not a real flight suit. It does not confer flight status, egress authority, or G-suit compatibility. Do not attempt to eject in it.",
      "May attract unwanted attention at the Chili's on base. We consider this a feature, not a defect.",
    ],
    crossBranchJab:
      "The Marine Corps uniform is covered in sand and proud of it — we respect the brand, but cashmere doesn't require a sand explanation.",
    reviews: [
      {
        rank: "Capt",
        name: "Vivienne Ashworth",
        stars: 5,
        body: "Wore this to the officers' club on a Thursday. Three people asked if I was a pilot. I am not a pilot. I said 'it's complicated.' The cashmere carried the conversation. Five stars.",
      },
      {
        rank: "MSgt",
        name: "Terrence Galbraith",
        stars: 2,
        body: "I am enlisted and this costs $499 and I don't understand who it's for but I tried it on at a squadron function and did not take it off for four hours. Still giving it two stars on principle.",
      },
      {
        rank: "Lt Col",
        name: "Jennifer Mosby",
        stars: 5,
        body: "My husband got this for my retirement gift. I wore it to the ceremony. My last act in the Air Force was wearing a flight suit made of cashmere and I feel nothing but gratitude. Perfect product.",
      },
    ],
  },
  {
    slug: "pt-test-completion-medal",
    branch: "airforce",
    nsn: "AF-PT-7720-MDL",
    contractCode: "FA8620-24-C-0502",
    milStd: "MIL-STD-STROLL",
    name: "PT Test Completion Medal™",
    price: 79.99,
    priceLabel: "$79.99",
    tagline: "For scoring 75% on an 800m walk/jog.",
    image: "/sites/squaredaway/product-pt-test-completion-medal.png",
    shortDescription:
      "Gold-toned participation medal on a blue-and-white striped ribbon. Engraved: 'PT Assessment Completion — 75th Percentile Achieved.' For showing up. For finishing. For wearing it.",
    longDescription: [
      "The PT Test Completion Medal™ is a 2.5-inch round gold-toned zinc alloy medal on a blue-and-white striped grosgrain ribbon, engraved on the reverse with the phrase: 'PT Assessment Completion — 75th Percentile Achieved.' It was developed to honor the Air Force member who set a goal, appeared at the appointed time in the appointed athletic gear, completed an 800-meter walk/jog at a pace that cleared the minimum threshold, and documented the result. That is not nothing. That is something. This medal is for that something.",
      "The front face of the medal bears a stylized running figure in profile — arms in motion, posture suggesting momentum or the performance of momentum, the important thing is the direction of travel — encircled by a wreath and the text 'PHYSICAL ASSESSMENT EXCELLENCE.' We are aware that 75% is the floor and not the ceiling. We made a product for the floor because the floor is where most people live and the floor deserves recognition.",
      "The Army PT standard involves push-ups until failure, sit-ups until failure, and a two-mile run under 15 minutes — all events timed and scored to a rigorous age-graded rubric. The Air Force standard involves an 800-meter walk/jog and a waist measurement. These are two different programs and we have built a medal for one of them.",
    ],
    specs: [
      { label: "Medal Material", value: "Gold-toned zinc alloy, polished face, textured edge" },
      { label: "Ribbon", value: "Blue-and-white striped grosgrain, 1.5 in wide, 4 in length" },
      { label: "Engraving", value: "'PT Assessment Completion — 75th Percentile Achieved' (reverse face)" },
      { label: "Achievement Threshold", value: "75th percentile minimum — completing the assessment qualifies" },
      { label: "Diameter", value: "2.5 in" },
      { label: "Certifications", value: "MIL-STD-STROLL compliant. Participation-rated." },
    ],
    warnings: [
      "This medal will not scale to Army PT standards and should not be displayed in proximity to APFT certificates, which measure something different and know it.",
      "Do not display in Marine Corps facilities. The Marines have been briefed on this product and their response was not positive.",
    ],
    crossBranchJab:
      "The Army PT test ends in a two-mile run scored by failure — we honor that tradition from a comfortable seated position, medal in hand.",
    reviews: [
      {
        rank: "A1C",
        name: "Tyler Beaumont",
        stars: 4,
        body: "I scored 76%. Barely cleared the threshold. Got this medal. Hung it next to my tech school certificate. My mom thinks I won something. I did not correct her. Four stars.",
      },
      {
        rank: "MSgt",
        name: "Denise Tran",
        stars: 5,
        body: "Bought these for every airman who passed their assessment in my flight. The ceremony was brief and sincere. They knew it was a joke and they kept the medals anyway. That's the whole point.",
      },
      {
        rank: "SSgt",
        name: "Kevin Marchand",
        stars: 2,
        body: "I scored 89% and the medal says 75th percentile. The medal does not know I scored 89%. I feel unseen. The product is fine. My ego is not fine. Two stars.",
      },
    ],
  },
  {
    slug: "premium-mre-af-variant",
    branch: "airforce",
    nsn: "AF-MRE-8970-LUX",
    contractCode: "FA8620-24-C-0614",
    milStd: "MIL-STD-CHIVE",
    name: "Premium MRE™ (AF Variant)",
    price: 69.99,
    priceLabel: "$69.99",
    tagline: "Served in ceramic with a $12 craft seltzer.",
    image: "/sites/squaredaway/product-premium-mre-af-variant.png",
    shortDescription:
      "Standard MRE plated in a ceramic bowl with a parsley garnish and a $12 craft seltzer pairing. Same caloric content. Completely different energy. The Air Force has earned this.",
    longDescription: [
      "The Premium MRE™ (AF Variant) is a standard-issue Meal Ready-to-Eat presented as it was always meant to be presented: in a shallow ceramic bowl, garnished with a sprig of flat-leaf parsley, accompanied by a 12-ounce craft seltzer paired to the entrée by our in-house beverage lead. The MRE itself has not been changed. The calories are identical. The sodium is identical. The flameless ration heater is included and available, though we recommend plating before service.",
      "Our menu currently offers four presentations: Chicken and Dumplings (paired with a citrus seltzer — 'the acidity cuts through the starch'), Beef Ravioli (paired with a sparkling water with 'assertive carbonation and a clean finish'), Jambalaya (paired with a cucumber-mint seltzer 'for contrast'), and the Vegetarian Taco Pasta (paired with a plain seltzer because, as our pairing notes read, 'it is doing its best'). Each plate is photographed before packaging. The photo is included in the packaging. The food does not look like the photo.",
      "The Army eats MREs at Fort Polk in the rain at 0200 with a spork and the knowledge that this is the next 14 days. The Air Force eats MREs occasionally, as a novelty, in a context that allows for a parsley garnish, and we have built a product that honors that distinction without shame.",
    ],
    specs: [
      { label: "Menu Options", value: "Chicken & Dumplings, Beef Ravioli, Jambalaya, Vegetarian Taco Pasta" },
      { label: "Included Pairing", value: "12 oz craft seltzer, flavor matched to entrée by our beverage team" },
      { label: "Presentation", value: "Ceramic bowl, parsley garnish, printed plating photo included" },
      { label: "Calories", value: "1,100–1,350 per entrée (standard MRE nutritional content, unchanged)" },
      { label: "Origin", value: "Standard DoD MRE supply chain; ceramic bowl and garnish sourced separately" },
      { label: "Certifications", value: "MIL-STD-CHIVE compliant. Garnish food-safe." },
    ],
    warnings: [
      "Ceramic bowl is not deployable. It will break. Do not bring the ceramic bowl to the field. The MRE has a bag. Use the bag.",
      "Parsley garnish may spoil in transit if shipped outside temperature-controlled packaging. The parsley is symbolic. The MRE is eternal.",
    ],
    crossBranchJab:
      "The Army eats MREs in the mud with a plastic spork — they deserve this product more than we do, and that's exactly why they can't have it.",
    reviews: [
      {
        rank: "1st Lt",
        name: "Samuel Oduya",
        stars: 5,
        body: "Plated the Jambalaya for a squadron morale night. Put parsley on it. Poured the seltzer into a glass. Four airmen said it was the best MRE they'd ever had. Nothing about the food changed. Five stars.",
      },
      {
        rank: "SrA",
        name: "Jacqueline Morreau",
        stars: 3,
        body: "The seltzer pairing is genuinely thought-through. The citrus with Chicken and Dumplings is correct. The bowl is pretty. The MRE still tastes like an MRE. I feel complicated about this.",
      },
      {
        rank: "Col",
        name: "Marcus Whitfield",
        stars: 5,
        body: "Served these at a combined-arms dining event. The Army officer picked up the parsley, looked at it, set it down, and ate his in silence. I will never forget his face. Five stars.",
      },
    ],
  },
  {
    slug: "on-base-golf-course-keychain",
    branch: "airforce",
    nsn: "AF-GLF-7690-KEY",
    contractCode: "FA8620-24-C-0718",
    milStd: "MIL-STD-BIRDIE",
    name: "On-Base Golf Course Keychain",
    price: 24.99,
    priceLabel: "$24.99",
    tagline: "Access to all 17 courses on base.",
    image: "/sites/squaredaway/product-on-base-golf-course-keychain.png",
    shortDescription:
      "Gold-toned golf-bag keychain on a leather fob stamped 'ON-BASE GOLF · 17 COURSES.' Fictional membership to all Air Force base golf courses included. The courses are real. The keychain earns it.",
    longDescription: [
      "The On-Base Golf Course Keychain is a gold-toned zinc alloy golf-bag charm on a 1.5-inch leather fob, heat-stamped in gold ink with the words 'ON-BASE GOLF · 17 COURSES.' It is $24.99. It is the most honest product we have ever made. Air Force bases have golf courses. This has been true for decades. The number of courses is not an exaggeration — some installations have had more than one. The keychain does not create this reality. It simply acknowledges it.",
      "The keychain is presented as membership documentation. It is not membership documentation. It is a keychain. However, the membership it claims to grant is to courses that actually exist, staffed by pros and maintained by groundskeepers and attended by personnel who have found the time, and we feel this deserves a physical token that can be attached to car keys and rattled when someone asks what that little gold golf bag is. 'It's my access pass to the on-base courses,' you will say. 'How many courses?' they will ask. 'Seventeen,' you will say. This is true. This conversation will happen.",
      "The Marine Corps rifle range is also called a 'course,' in the sense that it is a measured outdoor area where performance is assessed. The Marine Corps does not have a leather fob for it. We do not have the standing to comment on this situation except to say that we support all forms of outdoor recreation and have priced this keychain accordingly.",
    ],
    specs: [
      { label: "Material", value: "Gold-toned zinc alloy golf-bag charm, split-ring attached" },
      { label: "Dimensions", value: "Golf bag charm: 1.1 in H × 0.6 in W; leather fob: 1.5 in" },
      { label: "Weight", value: "0.8 oz" },
      { label: "Course Access", value: "Fictional membership to all 17 on-base AF golf courses (claims non-binding)" },
      { label: "Transferable", value: "Yes. The keychain transfers. The courses remain stationary." },
      { label: "Certifications", value: "MIL-STD-BIRDIE compliant. Handicap not included." },
    ],
    warnings: [
      "Course access claims are non-binding. This is a keychain. Actual tee time reservations require standard base recreation booking procedures.",
      "Golf instruction is not included. Golf instruction requires a golf instructor. The keychain is not a golf instructor.",
    ],
    crossBranchJab:
      "The Marine Corps rifle range is technically a course too — we just appreciate that Air Force courses have scorecards and a beverage cart.",
    reviews: [
      {
        rank: "CMSgt",
        name: "Robert Wainwright",
        stars: 5,
        body: "I have played 9 of the 17 courses. I carry this keychain. When people ask what it is I explain the whole thing. Nobody has ever been surprised that we have 17 courses. That tells you everything.",
      },
      {
        rank: "2d Lt",
        name: "Aisha Drummond",
        stars: 4,
        body: "Someone at dinner asked why the Air Force has 17 golf courses. I said 'because we can.' They did not have a follow-up. The keychain is good. The leather is real.",
      },
      {
        rank: "TSgt",
        name: "Phillip Kostner",
        stars: 5,
        body: "My Army buddy picked this up off my desk and read the fob. He stared at it for a long time. He did not laugh. He set it back down. He didn't say anything the rest of the night. Five stars.",
      },
    ],
  },

  // ===== MARINES =====
  {
    slug: "culinary-coloring-sticks",
    branch: "marines",
    nsn: "USMC-CRY-8940-12PK",
    contractCode: "M67854-24-C-0001",
    milStd: "MIL-STD-OORAH",
    name: "Premium Culinary Coloring Sticks™",
    price: 34.99,
    priceLabel: "$34.99",
    tagline: "12 edible crayons. Flavors: Sharpie, Diesel, Unflavored.",
    image: "/sites/squaredaway/product-culinary-coloring-sticks.png",
    shortDescription: "",
    longDescription: [],
    specs: [],
    warnings: [],
    crossBranchJab: "",
    reviews: [],
    featured: true,
  },
  {
    slug: "jarhead-precision-haircut-kit",
    branch: "marines",
    nsn: "USMC-HI-8520-TIGHT",
    contractCode: "M67854-24-C-0108",
    milStd: "MIL-STD-SCALP",
    name: "The Jarhead™ Precision Haircut Kit",
    price: 79.99,
    priceLabel: "$79.99",
    tagline: "One setting. It's shorter.",
    image: "/sites/squaredaway/product-jarhead-precision-haircut-kit.png",
    shortDescription: "",
    longDescription: [],
    specs: [],
    warnings: [],
    crossBranchJab: "",
    reviews: [],
  },
  {
    slug: "oorah-vocal-training-course",
    branch: "marines",
    nsn: "USMC-VOC-7610-AUD",
    contractCode: "M67854-24-C-0224",
    milStd: "MIL-STD-SCREAM",
    name: "Oorah™ Vocal Training Audio Course",
    price: 49.99,
    priceLabel: "$49.99",
    tagline: "40 hours. One syllable.",
    image: "/sites/squaredaway/product-oorah-vocal-training-course.png",
    shortDescription: "",
    longDescription: [],
    specs: [],
    warnings: [],
    crossBranchJab: "",
    reviews: [],
  },
  {
    slug: "regulation-crying-towel",
    branch: "marines",
    nsn: "USMC-WPE-7210-TWL",
    contractCode: "M67854-24-C-0305",
    milStd: "MIL-STD-DAMP",
    name: "Regulation Crying Towel",
    price: 14.99,
    priceLabel: "$14.99",
    tagline: "For when you remember you're still in.",
    image: "/sites/squaredaway/product-regulation-crying-towel.png",
    shortDescription: "",
    longDescription: [],
    specs: [],
    warnings: [],
    crossBranchJab: "",
    reviews: [],
  },
  {
    slug: "semper-fi-diy-tattoo-kit",
    branch: "marines",
    nsn: "USMC-INK-6515-DIY",
    contractCode: "M67854-24-C-0419",
    milStd: "MIL-STD-INK",
    name: "Semper Fi™ DIY Tattoo Kit",
    price: 89.99,
    priceLabel: "$89.99",
    tagline: "Finally, a tattoo that says what you already screamed.",
    image: "/sites/squaredaway/product-semper-fi-diy-tattoo-kit.png",
    shortDescription: "",
    longDescription: [],
    specs: [],
    warnings: [],
    crossBranchJab: "",
    reviews: [],
  },
  {
    slug: "sand-rations",
    branch: "marines",
    nsn: "USMC-SND-8970-5LB",
    contractCode: "M67854-24-C-0527",
    milStd: "MIL-STD-GRIT",
    name: "Sand Rations™ (5 lb bag)",
    price: 29.99,
    priceLabel: "$29.99",
    tagline: "For when the crayons run out.",
    image: "/sites/squaredaway/product-sand-rations.png",
    shortDescription: "",
    longDescription: [],
    specs: [],
    warnings: [],
    crossBranchJab: "",
    reviews: [],
  },
  {
    slug: "chestys-bulldog-morale-companion",
    branch: "marines",
    nsn: "USMC-MCT-7710-BULL",
    contractCode: "M67854-24-C-0631",
    milStd: "MIL-STD-WOOF",
    name: "Chesty's™ Bulldog Morale Companion",
    price: 44.99,
    priceLabel: "$44.99",
    tagline: "Shake to hear OORAH. Batteries included.",
    image: "/sites/squaredaway/product-chestys-bulldog-morale-companion.png",
    shortDescription: "",
    longDescription: [],
    specs: [],
    warnings: [],
    crossBranchJab: "",
    reviews: [],
  },
  {
    slug: "marpat-throw-pillow-set",
    branch: "marines",
    nsn: "USMC-UPH-8340-4PK",
    contractCode: "M67854-24-C-0742",
    milStd: "MIL-STD-PIX",
    name: "MARPAT™ Throw Pillow Set (set of 4)",
    price: 119.99,
    priceLabel: "$119.99",
    tagline: "Matches your 4 pairs of MARPAT pants.",
    image: "/sites/squaredaway/product-marpat-throw-pillow-set.png",
    shortDescription: "",
    longDescription: [],
    specs: [],
    warnings: [],
    crossBranchJab: "",
    reviews: [],
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByBranch(branch: Branch): Product[] {
  return products.filter((p) => p.branch === branch)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured)
}
