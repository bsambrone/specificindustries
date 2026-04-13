// src/sites/pettential/data/products.ts
export type Division =
  | "aquatic"
  | "serpent"
  | "avian"
  | "reptile"
  | "farm"
  | "corporate"

export interface DivisionInfo {
  key: Division
  label: string
  emoji: string
  tagline: string
  color: string
}

export const divisions: DivisionInfo[] = [
  { key: "aquatic",   label: "Aquatic Performance",          emoji: "🐟", tagline: "Peak performance, zero oxygen required.",                      color: "#CCFF00" },
  { key: "serpent",   label: "Serpent Workplace Solutions",   emoji: "🐍", tagline: "Professional development for the limbless professional.",      color: "#FF3366" },
  { key: "avian",     label: "Avian Professional Development",emoji: "🐦", tagline: "Fly higher. Professionally.",                                 color: "#00CCFF" },
  { key: "reptile",   label: "Reptile Fitness & Mobility",   emoji: "🐢", tagline: "Slow progress is still... no, it's just slow.",               color: "#FFB800" },
  { key: "farm",      label: "Farm Animal Lifestyle Upgrades",emoji: "🐄", tagline: "Because every animal deserves a morning routine.",            color: "#88DD44" },
  { key: "corporate", label: "Corporate Pets Division",       emoji: "🐈", tagline: "Bringing startup culture to your living room.",               color: "#AA77FF" },
]

export interface SpecItem {
  label: string
  value: string
}

export interface Product {
  slug: string
  name: string
  price: number
  priceLabel: string
  tagline: string
  description: string
  division: Division
  flagship: boolean
  specs: SpecItem[]
  heroImage: string
}

export const products: Product[] = [
  // ── Aquatic Performance ───────────────────────────────────
  {
    slug: "goldfish-treadmill-pro",
    name: "Goldfish Treadmill Pro™",
    price: 249.99,
    priceLabel: "$249.99",
    tagline: "Because stagnation is a choice.",
    description: "The Goldfish Treadmill Pro™ is the world's first submersible cardio platform designed specifically for freshwater athletes. Featuring a single speed setting (slow), zero incline options, and a real-time performance dashboard that displays identical results every single day, the GTP™ gives your goldfish the tools to achieve what they were already doing — but with accountability. Includes a waterproof motivational speaker that plays affirmations every 3 seconds. Your goldfish will not notice.",
    division: "aquatic",
    flagship: true,
    specs: [
      { label: "Speed Settings", value: "1 (slow)" },
      { label: "Incline", value: "None" },
      { label: "Battery Life", value: "Longer than the fish" },
      { label: "Performance Dashboard", value: "Yes (shows identical results daily)" },
      { label: "Warranty", value: "3 years or 1 fish lifetime, whichever is shorter" },
    ],
    heroImage: "/sites/pettential/products/goldfish-treadmill-pro.png",
  },
  {
    slug: "aquarium-standing-desk",
    name: "Aquarium Standing Desk™",
    price: 199.99,
    priceLabel: "$199.99",
    tagline: "Improves posture, reduces float fatigue.",
    description: "Your fish has been floating horizontally for its entire life. The Aquarium Standing Desk™ introduces vertical workspace orientation to the aquatic professional, promoting spinal alignment in an animal with no spine. Features an adjustable height range of 2-6 inches and a built-in document holder for memos your fish cannot read. Studies show zero correlation between desk orientation and fish productivity, which we consider a baseline.",
    division: "aquatic",
    flagship: false,
    specs: [
      { label: "Height Range", value: "2–6 inches (adjustable)" },
      { label: "Material", value: "Marine-grade acrylic" },
      { label: "Weight Capacity", value: "0.02 lbs (one fish)" },
      { label: "Assembly Required", value: "Yes (fish cannot help)" },
    ],
    heroImage: "/sites/pettential/products/aquarium-standing-desk.png",
  },
  {
    slug: "fish-eye-contact-training-kit",
    name: "Fish Eye Contact Training Kit™",
    price: 69.99,
    priceLabel: "$69.99",
    tagline: "Finally hold a conversation.",
    description: "Fish are notorious for poor eye contact. They stare past you, through you, and occasionally directly at a wall. The Fish Eye Contact Training Kit™ uses a series of visual anchors and focal exercises designed to help your fish sustain meaningful eye contact for up to 0.3 seconds. Includes a laminated guide your fish cannot read and a tiny mirror they will ignore.",
    division: "aquatic",
    flagship: false,
    specs: [
      { label: "Training Duration", value: "6 weeks" },
      { label: "Eye Contact Goal", value: "0.3 seconds" },
      { label: "Success Rate", value: "Unmeasured" },
      { label: "Includes", value: "Mirror, focal anchors, laminated guide" },
    ],
    heroImage: "/sites/pettential/products/fish-eye-contact-training-kit.png",
  },
  {
    slug: "underwater-whiteboard",
    name: "Underwater Whiteboard™",
    price: 129.99,
    priceLabel: "$129.99",
    tagline: "For brainstorming sessions that dissolve immediately.",
    description: "Great ideas deserve a place to live — even if that place is underwater and the ideas dissolve in 4 seconds. The Underwater Whiteboard™ brings collaborative ideation to the aquatic workspace. Uses specially formulated markers that are technically waterproof but not actually. Perfect for teams of 1-3 fish who have never had an idea.",
    division: "aquatic",
    flagship: false,
    specs: [
      { label: "Surface Area", value: "6\" × 4\"" },
      { label: "Marker Lifespan", value: "4 seconds per stroke" },
      { label: "Markers Included", value: "3 (all the same color)" },
      { label: "Eraser", value: "Not needed" },
    ],
    heroImage: "/sites/pettential/products/underwater-whiteboard.png",
  },

  // ── Serpent Workplace Solutions ────────────────────────────
  {
    slug: "snake-tie-collection",
    name: "Snake Tie Collection™",
    price: 89.99,
    priceLabel: "$89.99",
    tagline: "Pre-knotted. They can't tie it.",
    description: "First impressions matter — even when you're a limbless reptile entering a conference room. The Snake Tie Collection™ features three premium neckties pre-knotted for immediate deployment. Available in Hostile Takeover Blue, Quarterly Loss Gray, and Merger Burgundy. Each tie is designed to slip over the head region of most standard snakes, though 'head region' is used loosely. Dry clean only. Snake not included.",
    division: "serpent",
    flagship: true,
    specs: [
      { label: "Available Colors", value: "Hostile Takeover Blue, Quarterly Loss Gray, Merger Burgundy" },
      { label: "Pre-Knotted", value: "Yes (they can't tie it)" },
      { label: "Material", value: "100% polyester (machine washable, snake not included)" },
      { label: "Sizes", value: "One size fits most snakes (does not fit any snakes)" },
    ],
    heroImage: "/sites/pettential/products/snake-tie-collection.png",
  },
  {
    slug: "ergonomic-snake-chair",
    name: "Ergonomic Snake Chair™",
    price: 349.99,
    priceLabel: "$349.99",
    tagline: "Supports undefined spine zones.",
    description: "Traditional office chairs assume the user has a defined spinal structure. The Ergonomic Snake Chair™ makes no such assumption. Featuring 47 adjustable lumbar zones (none of which correspond to actual anatomy), this chair provides support to regions of the body that do not technically exist. Your snake will not sit in it. But it will be available.",
    division: "serpent",
    flagship: false,
    specs: [
      { label: "Lumbar Zones", value: "47 (adjustable)" },
      { label: "Weight Capacity", value: "200 lbs (snake weighs 2 lbs)" },
      { label: "Recline Angle", value: "Full 360° (snake preference)" },
      { label: "Armrests", value: "Included (unused)" },
    ],
    heroImage: "/sites/pettential/products/ergonomic-snake-chair.png",
  },
  {
    slug: "motivational-posters-for-snakes",
    name: "Motivational Posters for Snakes™",
    price: 34.99,
    priceLabel: "$34.99",
    tagline: "'Hang in there.' (They can't.)",
    description: "Every workspace needs inspiration. This set of 4 motivational posters has been specifically adapted for the serpent professional. Messages include 'Hang In There' (physically impossible), 'Reach for the Stars' (no arms), 'Stand Tall' (no legs), and 'Give Yourself a Hand' (see previous). Printed on premium matte stock. Frame not included. Understanding not included.",
    division: "serpent",
    flagship: false,
    specs: [
      { label: "Posters Included", value: "4" },
      { label: "Messages", value: "Hang In There, Reach for the Stars, Stand Tall, Give Yourself a Hand" },
      { label: "Applicability", value: "0%" },
      { label: "Print Quality", value: "Premium matte" },
    ],
    heroImage: "/sites/pettential/products/motivational-posters-for-snakes.png",
  },
  {
    slug: "handshake-simulation-device",
    name: "Handshake Simulation Device™",
    price: 119.99,
    priceLabel: "$119.99",
    tagline: "Teaches trust in limb-free environments.",
    description: "Networking is hard when you don't have hands. The Handshake Simulation Device™ uses a proprietary vibration pattern to simulate the sensation of a firm, confident handshake — without requiring limbs. Simply place your snake near the device and allow the vibrations to communicate professionalism. Results: inconclusive. Trust: unbuilt. But the gesture matters.",
    division: "serpent",
    flagship: false,
    specs: [
      { label: "Vibration Modes", value: "Firm, Confident, Aggressive, Apologetic" },
      { label: "Battery Life", value: "8 hours" },
      { label: "Trust Built", value: "None to date" },
      { label: "Limbs Required", value: "0" },
    ],
    heroImage: "/sites/pettential/products/handshake-simulation-device.png",
  },

  // ── Avian Professional Development ────────────────────────
  {
    slug: "parrot-resume-optimization-suite",
    name: "Parrot Resume Optimization Suite™",
    price: 179.99,
    priceLabel: "$179.99",
    tagline: "ATS-optimized squawks.",
    description: "Your parrot has skills. The problem is articulating them in a way that passes automated tracking systems. The Parrot Resume Optimization Suite™ includes a keyword bank of 200 corporate buzzwords (synergy, worm acquisition, flight leadership), a mock interview module where your parrot repeats the question back to the interviewer, and a professionally formatted resume template. ATS pass rate: 100%. Interview callback rate: surprisingly high. Hire rate: 0%.",
    division: "avian",
    flagship: true,
    specs: [
      { label: "Keywords Included", value: "200 (synergy, worm acquisition, flight leadership, etc.)" },
      { label: "Mock Interview Mode", value: "Yes (parrot repeats the question)" },
      { label: "ATS Pass Rate", value: "100%" },
      { label: "Hire Rate", value: "0%" },
    ],
    heroImage: "/sites/pettential/products/parrot-resume-optimization-suite.png",
  },
  {
    slug: "email-tone-translator",
    name: "Email Tone Translator™",
    price: 99.99,
    priceLabel: "$99.99",
    tagline: "Converts chirps into passive aggression.",
    description: "Your bird communicates. The problem is that their chirps, while enthusiastic, lack the nuanced passive-aggression required in modern corporate email. The Email Tone Translator™ converts raw avian vocalizations into perfectly calibrated professional emails. 'CHIRP CHIRP' becomes 'Per my last email.' 'SQUAWK' becomes 'Just following up.' 'Silence' becomes 'As previously discussed.'",
    division: "avian",
    flagship: false,
    specs: [
      { label: "Translations Supported", value: "47 chirp variations" },
      { label: "Passive Aggression Level", value: "Adjustable (mild to corporate)" },
      { label: "Compatible Species", value: "All songbirds, parrots, corvids" },
      { label: "CC/BCC Support", value: "Always BCC (birds don't share)" },
    ],
    heroImage: "/sites/pettential/products/email-tone-translator.png",
  },
  {
    slug: "bird-cubicle-divider-kit",
    name: "Bird Cubicle Divider Kit™",
    price: 159.99,
    priceLabel: "$159.99",
    tagline: "For open-air offices.",
    description: "Open office plans are stressful for everyone — especially birds who can simply fly over the dividers. The Bird Cubicle Divider Kit™ provides the illusion of personal workspace in an environment where boundaries are meaningless. Features three 8-inch fabric panels, a nameplate holder, and a tiny 'Do Not Disturb' sign. Your bird will perch on top of the divider instead of behind it. We consider this a partial success.",
    division: "avian",
    flagship: false,
    specs: [
      { label: "Panel Height", value: "8 inches" },
      { label: "Panels Included", value: "3" },
      { label: "Privacy Level", value: "Conceptual" },
      { label: "Nameplate", value: "Included (bird cannot read it)" },
    ],
    heroImage: "/sites/pettential/products/bird-cubicle-divider-kit.png",
  },
  {
    slug: "pigeon-urban-navigation-gps",
    name: "Pigeon Urban Navigation GPS™",
    price: 79.99,
    priceLabel: "$79.99",
    tagline: "'You're already there.'",
    description: "Pigeons have been navigating cities for thousands of years without technology. The Pigeon Urban Navigation GPS™ adds technology to a process that was already perfect. Features turn-by-turn directions to locations your pigeon has already been, traffic alerts for streets your pigeon flies over, and a recalculating function that triggers when your pigeon ignores the route entirely. Battery life: 12 hours. Pigeon attention span: 3 seconds.",
    division: "avian",
    flagship: false,
    specs: [
      { label: "Navigation Mode", value: "Redundant" },
      { label: "Route Accuracy", value: "100% (pigeon already knows)" },
      { label: "Recalculations Per Trip", value: "47 average" },
      { label: "Battery Life", value: "12 hours (pigeon attention: 3 seconds)" },
    ],
    heroImage: "/sites/pettential/products/pigeon-urban-navigation-gps.png",
  },

  // ── Reptile Fitness & Mobility ────────────────────────────
  {
    slug: "tortoise-hiit-program",
    name: "Tortoise HIIT Program™",
    price: 149.99,
    priceLabel: "$149.99",
    tagline: "12-week plan. 1% improvement guaranteed.*",
    description: "High-Intensity Interval Training reimagined for the tortoise athlete. This 12-week program features three sessions per week (tortoise attendance: 0), progressive overload principles adapted for animals that cannot be overloaded, and a performance tracker that has never recorded a change. The 1% improvement guarantee applies to motivation, not speed. *Not noticeable. *Not guaranteed. *Tortoise may not participate.",
    division: "reptile",
    flagship: true,
    specs: [
      { label: "Duration", value: "12 weeks" },
      { label: "Improvement Guarantee", value: "1%*" },
      { label: "*Disclaimer", value: "Not noticeable" },
      { label: "Sessions Per Week", value: "3 (tortoise attendance: 0)" },
      { label: "Equipment Needed", value: "None (tortoise will not use it anyway)" },
    ],
    heroImage: "/sites/pettential/products/tortoise-hiit-program.png",
  },
  {
    slug: "sloth-hiit",
    name: "Sloth High-Intensity Interval Training™",
    price: 129.99,
    priceLabel: "$129.99",
    tagline: "One rep per week.",
    description: "Traditional HIIT programs assume the participant will complete multiple repetitions within a session. The Sloth HIIT Program™ makes no such assumption. Featuring a single repetition per week, a 6-day recovery window, and a progress chart that updates monthly (no visible change), this program meets the sloth exactly where they are: motionless. Includes a foam roller your sloth will sleep on.",
    division: "reptile",
    flagship: false,
    specs: [
      { label: "Reps Per Week", value: "1" },
      { label: "Recovery Period", value: "6 days" },
      { label: "Progress Chart", value: "Updates monthly (no visible change)" },
      { label: "Foam Roller", value: "Included (used for sleeping)" },
    ],
    heroImage: "/sites/pettential/products/sloth-hiit.png",
  },
  {
    slug: "motivational-whistle",
    name: "Motivational Whistle™",
    price: 24.99,
    priceLabel: "$24.99",
    tagline: "Ignored completely.",
    description: "Every great coach needs a whistle. The Motivational Whistle™ is a premium stainless steel whistle designed to inspire urgency, focus, and drive in animals that experience none of these things. Blow it near your reptile and watch as absolutely nothing happens. The whistle produces a crisp, authoritative tone at 95 decibels. Your reptile will continue doing what it was already doing, which was nothing.",
    division: "reptile",
    flagship: false,
    specs: [
      { label: "Volume", value: "95 decibels" },
      { label: "Material", value: "Stainless steel" },
      { label: "Response Rate", value: "0%" },
      { label: "Lanyard", value: "Included (coach only)" },
    ],
    heroImage: "/sites/pettential/products/motivational-whistle.png",
  },
  {
    slug: "performance-tracking-wearable",
    name: "Performance Tracking Wearable™",
    price: 199.99,
    priceLabel: "$199.99",
    tagline: "Detects no change over time.",
    description: "Data-driven performance optimization starts with measurement. The Performance Tracking Wearable™ is a lightweight activity monitor designed for reptiles, featuring step counting (0 steps daily), heart rate monitoring (varies by species, always slow), and a weekly performance summary that reads 'No Change Detected' every single time. Syncs to the Pettential app for a comprehensive dashboard of stagnation.",
    division: "reptile",
    flagship: false,
    specs: [
      { label: "Metrics Tracked", value: "Steps (0), heart rate (slow), activity (none)" },
      { label: "Weekly Summary", value: "'No Change Detected'" },
      { label: "App Sync", value: "Yes (dashboard shows flat lines)" },
      { label: "Battery Life", value: "6 months (nothing to track)" },
    ],
    heroImage: "/sites/pettential/products/performance-tracking-wearable.png",
  },

  // ── Farm Animal Lifestyle Upgrades ────────────────────────
  {
    slug: "cow-yoga-mat",
    name: "Cow Yoga Mat™",
    price: 89.99,
    priceLabel: "$89.99",
    tagline: "For mindful grazing.",
    description: "Your cow grazes. But does your cow graze mindfully? The Cow Yoga Mat™ transforms ordinary pasture time into a centered, intentional experience. This extra-large yoga mat (8' × 4') features a non-slip grass-textured surface, alignment guides for all four hooves, and a built-in speaker that plays ambient chewing sounds. Your cow was already standing on grass. Now they're standing on grass with purpose.",
    division: "farm",
    flagship: false,
    specs: [
      { label: "Dimensions", value: "8' × 4'" },
      { label: "Surface", value: "Non-slip grass texture" },
      { label: "Alignment Guides", value: "4 hooves" },
      { label: "Built-In Audio", value: "Ambient chewing sounds" },
    ],
    heroImage: "/sites/pettential/products/cow-yoga-mat.png",
  },
  {
    slug: "chicken-noise-canceling-headphones",
    name: "Chicken Noise-Canceling Headphones™",
    price: 149.99,
    priceLabel: "$149.99",
    tagline: "Block existential clucking.",
    description: "Chickens live in a constant state of low-grade audio chaos. The Chicken Noise-Canceling Headphones™ use adaptive noise suppression to filter out the sounds of existential clucking, competitive pecking, and the rooster who won't stop. Features three modes: Focus (blocks other chickens), Deep Work (blocks everything), and Denial (plays calming rain sounds while the coop descends into chaos).",
    division: "farm",
    flagship: false,
    specs: [
      { label: "Noise Cancellation", value: "Active (adaptive cluck filtering)" },
      { label: "Modes", value: "Focus, Deep Work, Denial" },
      { label: "Battery Life", value: "12 hours" },
      { label: "Fit", value: "One size fits most poultry (does not)" },
    ],
    heroImage: "/sites/pettential/products/chicken-noise-canceling-headphones.png",
  },
  {
    slug: "pig-spa-day-kit",
    name: "Pig Spa Day Kit™",
    price: 109.99,
    priceLabel: "$109.99",
    tagline: "Mud, but curated.",
    description: "Your pig already rolls in mud. The Pig Spa Day Kit™ elevates this from a biological instinct to a luxury wellness experience. Includes artisanal mud sourced from a specific region of Vermont, a cucumber eye mask that will be eaten immediately, a terrycloth robe (size XXXL), and a guided meditation audio track narrated by a soothing voice your pig will not understand. Same mud. Different intention.",
    division: "farm",
    flagship: false,
    specs: [
      { label: "Mud Source", value: "Artisanal (Vermont)" },
      { label: "Eye Mask", value: "Cucumber (will be eaten)" },
      { label: "Robe Size", value: "XXXL" },
      { label: "Meditation Audio", value: "20 minutes (pig will not listen)" },
    ],
    heroImage: "/sites/pettential/products/pig-spa-day-kit.png",
  },
  {
    slug: "goat-personal-branding-course",
    name: "Goat Personal Branding Course™",
    price: 199.99,
    priceLabel: "$199.99",
    tagline: "Become the GOAT.",
    description: "Every goat is the Greatest of All Time at something. The problem is, they don't know what. The Goat Personal Branding Course™ is a 4-week self-paced program that helps your goat identify their unique value proposition, craft a personal narrative, and develop a content strategy. Module 1: 'What's Your Thing?' Module 2: 'It's Probably Eating.' Module 3: 'Lean Into It.' Module 4: 'You Are Already the GOAT.' Includes a headshot session your goat will not sit still for.",
    division: "farm",
    flagship: false,
    specs: [
      { label: "Duration", value: "4 weeks (self-paced)" },
      { label: "Modules", value: "4" },
      { label: "Headshot Session", value: "Included (goat will not sit still)" },
      { label: "Personal Brand Outcome", value: "Eating" },
    ],
    heroImage: "/sites/pettential/products/goat-personal-branding-course.png",
  },

  // ── Corporate Pets Division ───────────────────────────────
  {
    slug: "linkedin-premium-for-cats",
    name: "LinkedIn Premium for Cats™",
    price: 59.99,
    priceLabel: "$59.99",
    tagline: "Endorse: napping, pushing things off tables, ignoring stakeholders.",
    description: "Your cat has been networking passively for years — sitting in rooms, observing meetings, making eye contact with no one. LinkedIn Premium for Cats™ formalizes this. Features include a professionally written profile (Skills: napping, pushing things off tables, ignoring stakeholders, strategic indifference), endorsement automation, and InMail templates that are never sent. Your cat's profile will show 500+ connections, all of whom are also cats.",
    division: "corporate",
    flagship: true,
    specs: [
      { label: "Profile Skills", value: "Napping, pushing things off tables, ignoring stakeholders" },
      { label: "Connections", value: "500+ (all cats)" },
      { label: "InMail Templates", value: "12 (never sent)" },
      { label: "Endorsements", value: "Automated (all for 'strategic indifference')" },
    ],
    heroImage: "/sites/pettential/products/linkedin-premium-for-cats.png",
  },
  {
    slug: "dog-performance-review-toolkit",
    name: "Dog Performance Review Toolkit™",
    price: 79.99,
    priceLabel: "$79.99",
    tagline: "'Needs improvement: mailman relations.'",
    description: "Every employee deserves structured feedback — including the one who eats shoes. The Dog Performance Review Toolkit™ includes quarterly review templates, a competency matrix (Fetching: Exceeds Expectations. Mailman Relations: Critical Deficiency. Staying: Inconsistent.), and a development plan with SMART goals. Your dog will receive the review, wag their tail, and learn absolutely nothing. The tail wag will be noted as 'positive reception to feedback.'",
    division: "corporate",
    flagship: false,
    specs: [
      { label: "Review Frequency", value: "Quarterly" },
      { label: "Competency Areas", value: "Fetching, Sitting, Mailman Relations, Staying" },
      { label: "SMART Goals Template", value: "Included" },
      { label: "Feedback Reception", value: "Tail wag (interpreted as positive)" },
    ],
    heroImage: "/sites/pettential/products/dog-performance-review-toolkit.png",
  },
  {
    slug: "executive-office-for-hamsters",
    name: "Executive Office for Hamsters™",
    price: 249.99,
    priceLabel: "$249.99",
    tagline: "Includes tiny burnout.",
    description: "Your hamster has been running in circles for years. It's time to formalize that into a career. The Executive Office for Hamsters™ is a premium miniature corner office featuring a mahogany desk (3\" × 2\"), an ergonomic wheel (they're already on one), a tiny laptop that displays spreadsheets, and a window that overlooks nothing. Your hamster will run on their wheel inside a tiny office, which is different from what they were doing before in a way we have not been able to articulate.",
    division: "corporate",
    flagship: false,
    specs: [
      { label: "Desk Dimensions", value: "3\" × 2\" (mahogany)" },
      { label: "Window View", value: "Nothing" },
      { label: "Laptop Display", value: "Spreadsheets (non-functional)" },
      { label: "Burnout Timeline", value: "Immediate" },
    ],
    heroImage: "/sites/pettential/products/executive-office-for-hamsters.png",
  },
  {
    slug: "zoom-background-generator-for-pets",
    name: "Zoom Background Generator for Pets™",
    price: 39.99,
    priceLabel: "$39.99",
    tagline: "Beach, office, burnout loft.",
    description: "Your pet is on camera and the background is a mess. The Zoom Background Generator for Pets™ offers 25 premium virtual backgrounds designed for the modern pet professional. Options include: Corner Office (mahogany), Beach (aspirational), Library (unread books), Startup Loft (exposed brick, burnout), and Home Office (identical to their actual cage). Green screen not required. Your pet will walk out of frame regardless.",
    division: "corporate",
    flagship: false,
    specs: [
      { label: "Backgrounds Included", value: "25" },
      { label: "Categories", value: "Office, Beach, Library, Startup, Home" },
      { label: "Green Screen", value: "Not required" },
      { label: "Pet Compliance", value: "0% (will walk out of frame)" },
    ],
    heroImage: "/sites/pettential/products/zoom-background-generator-for-pets.png",
  },
]

export const flagshipProducts = products.filter((p) => p.flagship)

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByDivision(division: Division): Product[] {
  return products.filter((p) => p.division === division)
}

export function getDivisionInfo(key: Division): DivisionInfo | undefined {
  return divisions.find((d) => d.key === key)
}
