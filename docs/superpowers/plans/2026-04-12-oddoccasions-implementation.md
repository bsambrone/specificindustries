# Odd Occasions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a commerce-enabled satire gift shop site at the `oddoccasions` subdomain — curated gift boxes for life's most specific moments.

**Architecture:** New site module under `src/sites/oddoccasions/` following existing patterns (config, pages, data, barrel export). Commerce enabled with dynamic product detail routes. Products are gift boxes with items inside. Testimonials use the shared portrait system.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, image-gen MCP for all images

**Spec:** `docs/superpowers/specs/2026-04-12-oddoccasions-gift-shop-design.md`

---

## File Structure

```
src/sites/oddoccasions/
├── index.ts                  # Barrel: config, pages, dynamicRoutes
├── config.ts                 # SiteConfig (theme, nav, metadata, commerce)
├── data/
│   ├── products.ts           # Product type, 30 gift boxes, getProductBySlug()
│   ├── leadership.ts         # Executive type, 4 execs, getExecutiveBySlug()
│   └── testimonials.ts       # Testimonial helpers using shared portrait system
└── pages/
    ├── home.tsx              # Homepage: hero, categories, featured products, philosophy
    ├── shop.tsx              # Full product grid with category sections
    ├── product-detail.tsx    # Dynamic route: box detail, items, testimonials
    ├── about.tsx             # Founding story, leadership team, timeline
    ├── contact.tsx           # Satirical consultation form, real email
    ├── privacy.tsx           # Umbrella reference + satirical clauses
    ├── terms.tsx             # Umbrella reference + satirical clauses
    ├── cart.tsx              # Cart page (client component)
    └── checkout.tsx          # Checkout page (client component)
public/sites/oddoccasions/    # Generated images (hero, products, items, execs)
```

**Files to modify:**
- `src/sites/registry.ts` — add oddoccasions import and registry entry
- `src/sites/subdomains.ts` — add "oddoccasions" to VALID_SUBDOMAINS array

---

### Task 1: Site Registration and Config

**Files:**
- Create: `src/sites/oddoccasions/config.ts`
- Modify: `src/sites/subdomains.ts`

- [ ] **Step 1: Create `src/sites/oddoccasions/config.ts`**

```typescript
import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Odd Occasions",
  subdomain: "oddoccasions",
  theme: {
    preset: "boutique",
    colors: {
      primary: "#7C9A82",
      secondary: "#F5F0E8",
      accent: "#D4A0A0",
      background: "#FFFDF8",
      text: "#2D2D2D",
    },
    fonts: {
      heading: "playfair",
      body: "nunito",
    },
  },
  metadata: {
    title: "Odd Occasions — Thoughtfully Curated Gifts for Life's Most Specific Moments",
    description: "A boutique gift shop offering curated gift boxes for extremely specific situations. From 'Sorry I Ate Your Labeled Lunch in 2017' to 'Congrats on Your Mild Promotion,' every awkward moment deserves a beautiful box.",
  },
  nav: [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop" },
    { label: "Our Story", path: "/about" },
    { label: "Contact", path: "/contact" },
  ],
  features: {
    commerce: true,
  },
}
```

- [ ] **Step 2: Add `oddoccasions` to `src/sites/subdomains.ts`**

Add `"oddoccasions"` to the `VALID_SUBDOMAINS` array, after `"gristmill"`:

```typescript
export const VALID_SUBDOMAINS = [
  "apex",
  "pigmilk",
  "dehydratedwater",
  "inflatableanchors",
  "strategicvoid",
  "stratify",
  "truegrit",
  "grassfedwifi",
  "elderparty",
  "cleansheet",
  "snortables",
  "mousetrapjenga",
  "onlyfans",
  "onlypans",
  "bonelesswater",
  "gristmill",
  "oddoccasions",
] as const
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit 2>&1 | head -20`
Expected: May show errors about missing barrel — that's fine, we'll create it in a later task.

- [ ] **Step 4: Commit**

```bash
git add src/sites/oddoccasions/config.ts src/sites/subdomains.ts
git commit -m "feat(oddoccasions): add site config and subdomain registration"
```

---

### Task 2: Product Data

**Files:**
- Create: `src/sites/oddoccasions/data/products.ts`

This is the largest data file. It defines the Product interface and all 30 gift boxes with their items.

- [ ] **Step 1: Create `src/sites/oddoccasions/data/products.ts`**

```typescript
export interface GiftBoxItem {
  name: string
  description: string
  image: string
}

export interface Product {
  slug: string
  name: string
  price: number
  priceLabel: string
  tagline: string
  description: string
  category: "workplace" | "social" | "digital" | "family" | "milestones"
  items: GiftBoxItem[]
  heroImage: string
}

export const categories = [
  { key: "workplace" as const, label: "Workplace", anchor: "workplace" },
  { key: "social" as const, label: "Social & Friendship", anchor: "social" },
  { key: "digital" as const, label: "Digital Life", anchor: "digital-life" },
  { key: "family" as const, label: "Family", anchor: "family" },
  { key: "milestones" as const, label: "Milestones & Life Events", anchor: "milestones" },
]

export const products: Product[] = [
  // ── Workplace ──────────────────────────────────────────────
  {
    slug: "sorry-i-ate-your-labeled-lunch-in-2017",
    name: "Sorry I Ate Your Labeled Lunch in 2017",
    price: 34.17,
    priceLabel: "$34.17",
    tagline: "For the guilt that ages like fine cheese.",
    description: "Seven years is a long time to carry the weight of a stolen sandwich. This thoughtfully curated box gives you everything you need to finally make it right — or at least acknowledge that you remember.",
    category: "workplace",
    heroImage: "/sites/oddoccasions/products/sorry-lunch-hero.png",
    items: [
      { name: "Artisanal Replacement Sandwich", description: "A lovingly wrapped gourmet sandwich. It won't be the same as theirs, but it's a start.", image: "/sites/oddoccasions/items/sorry-lunch-sandwich.png" },
      { name: "Handwritten Apology on Aged Parchment", description: "Pre-written in elegant calligraphy. The parchment has been artificially aged to match the duration of your guilt.", image: "/sites/oddoccasions/items/sorry-lunch-apology.png" },
      { name: "Mini Fridge Lock", description: "Because trust, once broken, requires hardware.", image: "/sites/oddoccasions/items/sorry-lunch-lock.png" },
      { name: "Expired Statute of Limitations Certificate", description: "A formal document declaring that the lunch theft has exceeded all reasonable accountability windows. Legally meaningless. Emotionally significant.", image: "/sites/oddoccasions/items/sorry-lunch-certificate.png" },
    ],
  },
  {
    slug: "congrats-on-your-mild-promotion",
    name: "Congrats on Your Mild Promotion",
    price: 41.83,
    priceLabel: "$41.83",
    tagline: "When the title changed but the salary didn't.",
    description: "They gave you a new title and a firm handshake. This box celebrates the promotion with exactly the enthusiasm it deserves — warm, genuine, and proportional.",
    category: "workplace",
    heroImage: "/sites/oddoccasions/products/mild-promotion-hero.png",
    items: [
      { name: "Slightly Nicer Business Card Holder", description: "Not executive-level. Not intern-level. The perfect middle.", image: "/sites/oddoccasions/items/mild-promotion-cardholder.png" },
      { name: "\"New Title, Same Desk\" Desk Plaque", description: "Laser-engraved on sustainable bamboo. A daily reminder of your lateral growth.", image: "/sites/oddoccasions/items/mild-promotion-plaque.png" },
      { name: "A Single Party Horn", description: "Just one. Because this calls for celebration, but let's not overdo it.", image: "/sites/oddoccasions/items/mild-promotion-horn.png" },
      { name: "Moderately Sparkling Cider", description: "Not flat. Not champagne. Appropriately effervescent for the occasion.", image: "/sites/oddoccasions/items/mild-promotion-cider.png" },
    ],
  },
  {
    slug: "thanks-for-not-replying-all",
    name: "Thanks for Not Replying All",
    price: 28.06,
    priceLabel: "$28.06",
    tagline: "True heroism goes unrecognized.",
    description: "You saw the email chain. You had thoughts. You kept them to yourself. This box honors the quiet dignity of inbox restraint.",
    category: "workplace",
    heroImage: "/sites/oddoccasions/products/reply-all-hero.png",
    items: [
      { name: "Medal of Email Restraint", description: "A handsome medallion recognizing your service to the entire distribution list.", image: "/sites/oddoccasions/items/reply-all-medal.png" },
      { name: "\"I Saw It and Said Nothing\" Pin", description: "Enamel pin for the lapel of someone who chose peace.", image: "/sites/oddoccasions/items/reply-all-pin.png" },
      { name: "Calming Desk Tea Blend", description: "Chamomile and restraint, steeped to perfection.", image: "/sites/oddoccasions/items/reply-all-tea.png" },
      { name: "Reply All Awareness Ribbon", description: "Wear it. Start the conversation. Or don't — that's kind of the whole point.", image: "/sites/oddoccasions/items/reply-all-ribbon.png" },
    ],
  },
  {
    slug: "sorry-i-unmuted-you-during-your-rant",
    name: "Sorry I Unmuted You During Your Rant",
    price: 33.91,
    priceLabel: "$33.91",
    tagline: "We both know what happened in that Teams call.",
    description: "The mute button giveth and the mute button taketh away. This box is for when someone's private commentary became involuntarily public.",
    category: "workplace",
    heroImage: "/sites/oddoccasions/products/unmuted-rant-hero.png",
    items: [
      { name: "USB Mute Button", description: "A dedicated physical button. Because software controls have clearly failed you both.", image: "/sites/oddoccasions/items/unmuted-rant-button.png" },
      { name: "Revisionist Meeting Minutes", description: "A professionally formatted document recording what should have been said instead.", image: "/sites/oddoccasions/items/unmuted-rant-minutes.png" },
      { name: "\"Hot Mic Recovery\" Pamphlet", description: "A step-by-step guide to rebuilding professional reputation after an open-mic incident.", image: "/sites/oddoccasions/items/unmuted-rant-pamphlet.png" },
      { name: "Noise-Canceling Sympathy Candle", description: "Lavender and plausible deniability. Burns for approximately one awkward silence.", image: "/sites/oddoccasions/items/unmuted-rant-candle.png" },
    ],
  },
  {
    slug: "happy-last-day-to-someone-whose-name-i-should-know",
    name: "Happy Last Day to Someone Whose Name I Should Know",
    price: 26.43,
    priceLabel: "$26.43",
    tagline: "Three years of hallway nods, and it's come to this.",
    description: "They're leaving. You'll miss them. You think. This box covers all the bases when you want to say goodbye to someone you definitely should have gotten to know better.",
    category: "workplace",
    heroImage: "/sites/oddoccasions/products/last-day-hero.png",
    items: [
      { name: "Blank Farewell Card with Pre-Written Generic Sentiments", description: "\"It won't be the same without you\" and twelve other phrases that work regardless of who they are.", image: "/sites/oddoccasions/items/last-day-card.png" },
      { name: "Lanyard from Their Department", description: "We're not sure which department they were in either. This one's green.", image: "/sites/oddoccasions/items/last-day-lanyard.png" },
      { name: "\"Colleague-ish\" Photo Frame", description: "For displaying a group photo in which you are both present but not adjacent.", image: "/sites/oddoccasions/items/last-day-frame.png" },
      { name: "Bag of Breakroom Coffee", description: "The same coffee they drank every morning for three years. They'll never drink it again, and neither will you.", image: "/sites/oddoccasions/items/last-day-coffee.png" },
    ],
  },
  {
    slug: "congrats-on-surviving-the-reorg",
    name: "Congrats on Surviving the Reorg",
    price: 38.72,
    priceLabel: "$38.72",
    tagline: "Your role is safe. Probably. For now.",
    description: "The org chart changed. Your title may have changed. Your desk didn't move but your manager's manager's manager is now someone named Craig. This box celebrates the specific relief of still being employed.",
    category: "workplace",
    heroImage: "/sites/oddoccasions/products/reorg-hero.png",
    items: [
      { name: "Updated Org Chart (Already Outdated)", description: "Printed fresh this morning. Obsolete by lunch.", image: "/sites/oddoccasions/items/reorg-chart.png" },
      { name: "\"I Report to Who Now?\" Mug", description: "A daily-use ceramic mug for the organizationally displaced.", image: "/sites/oddoccasions/items/reorg-mug.png" },
      { name: "Stress Ball Shaped Like a Pivot Table", description: "Squeeze it. Pivot. Squeeze again. Just like Q3 planning.", image: "/sites/oddoccasions/items/reorg-stressball.png" },
      { name: "Reassuring but Vague Leadership Quote Print", description: "\"We're excited about what's ahead.\" Framed. Ready to hang above a desk that may or may not still be yours.", image: "/sites/oddoccasions/items/reorg-print.png" },
    ],
  },
  {
    slug: "sorry-i-stole-your-parking-spot-for-8-months",
    name: "Sorry I Stole Your Parking Spot for 8 Months",
    price: 31.09,
    priceLabel: "$31.09",
    tagline: "I knew it was yours. You knew I knew.",
    description: "Eight months of silent parking lot tension, resolved in one beautifully packaged box. This is for when the unspoken finally needs to be spoken.",
    category: "workplace",
    heroImage: "/sites/oddoccasions/products/parking-spot-hero.png",
    items: [
      { name: "Artisanal Air Freshener", description: "New car scent, because your parking experience deserves to feel fresh again.", image: "/sites/oddoccasions/items/parking-freshener.png" },
      { name: "Parking Karma Restoration Certificate", description: "An official-looking document restoring your parking karma to pre-theft levels.", image: "/sites/oddoccasions/items/parking-certificate.png" },
      { name: "Hand-Drawn Map of Alternative Spots", description: "Illustrated with care. Includes the one by the dumpster that's always open and the one that's technically not a spot.", image: "/sites/oddoccasions/items/parking-map.png" },
      { name: "Gas Gift Card for $0.47", description: "It's not about the amount. It's about the gesture. And the amount is $0.47.", image: "/sites/oddoccasions/items/parking-giftcard.png" },
    ],
  },

  // ── Social & Friendship ────────────────────────────────────
  {
    slug: "we-met-once-at-a-networking-event",
    name: "We Met Once at a Networking Event",
    price: 37.42,
    priceLabel: "$37.42",
    tagline: "Let's acknowledge this connection for what it is.",
    description: "You exchanged business cards. You connected on LinkedIn. You have never spoken since. This box celebrates the specific bond between two professionals who briefly occupied the same appetizer table.",
    category: "social",
    heroImage: "/sites/oddoccasions/products/networking-event-hero.png",
    items: [
      { name: "LinkedIn Connection Printed and Framed", description: "Your digital connection, made physical. Suitable for desk display or regifting.", image: "/sites/oddoccasions/items/networking-linkedin.png" },
      { name: "Slightly Personalized Note", description: "\"Great chat about... things.\" The ellipsis does the heavy lifting.", image: "/sites/oddoccasions/items/networking-note.png" },
      { name: "Branded Pen Neither of You Wants", description: "From a company that may no longer exist. A networking event staple.", image: "/sites/oddoccasions/items/networking-pen.png" },
      { name: "Business Card from a Job You've Since Left", description: "A memento from the professional era in which you met. The title is outdated. The phone number still works, probably.", image: "/sites/oddoccasions/items/networking-card.png" },
    ],
  },
  {
    slug: "sorry-i-ghosted-you-in-2019",
    name: "Sorry I Ghosted You in 2019",
    price: 42.67,
    priceLabel: "$42.67",
    tagline: "I saw your texts. All of them.",
    description: "You disappeared. They noticed. This box is a tangible acknowledgment that you received every single message and chose, for reasons you may not fully understand yourself, to respond to none of them.",
    category: "social",
    heroImage: "/sites/oddoccasions/products/ghosted-2019-hero.png",
    items: [
      { name: "Handwritten Timeline of Excuses Considered", description: "A chronological list of every reason you almost responded. None of them were good enough, apparently.", image: "/sites/oddoccasions/items/ghosted-timeline.png" },
      { name: "\"I Was Going Through Something\" Candle", description: "Scented with hindsight and good intentions. Burns for the approximate duration of your absence.", image: "/sites/oddoccasions/items/ghosted-candle.png" },
      { name: "Friendship Re-Application Form", description: "A formal document requesting reinstatement of communication privileges. References required.", image: "/sites/oddoccasions/items/ghosted-application.png" },
      { name: "Vintage Screenshot of the Last Message You Ignored", description: "Printed on premium cardstock. A conversation artifact from a simpler time.", image: "/sites/oddoccasions/items/ghosted-screenshot.png" },
    ],
  },
  {
    slug: "thanks-for-pretending-to-like-my-cooking",
    name: "Thanks for Pretending to Like My Cooking",
    price: 29.38,
    priceLabel: "$29.38",
    tagline: "Your poker face saved our friendship.",
    description: "You made dinner. They ate it. Their smile said 'delicious' but their eyes said 'I am enduring this.' This box thanks them for the performance.",
    category: "social",
    heroImage: "/sites/oddoccasions/products/cooking-hero.png",
    items: [
      { name: "Antacid Sampler", description: "A curated selection of digestive aids, presented in a gift-worthy tin.", image: "/sites/oddoccasions/items/cooking-antacid.png" },
      { name: "Honest Seasoning Kit", description: "Salt, pepper, and the spices your dish was missing. Labeled with love.", image: "/sites/oddoccasions/items/cooking-seasoning.png" },
      { name: "\"It Was Fine, Really\" Embroidered Napkin", description: "Hand-embroidered reassurance for the dinner table.", image: "/sites/oddoccasions/items/cooking-napkin.png" },
      { name: "Take-Out Menu", description: "From the restaurant you both wish you'd gone to instead.", image: "/sites/oddoccasions/items/cooking-menu.png" },
    ],
  },
  {
    slug: "sorry-i-brought-a-guitar-to-your-party",
    name: "Sorry I Brought a Guitar to Your Party",
    price: 36.14,
    priceLabel: "$36.14",
    tagline: "I really thought people would want to hear Wonderwall.",
    description: "You brought a guitar to a gathering that did not require one. The room shifted. Conversations stopped. This box is your path to social redemption.",
    category: "social",
    heroImage: "/sites/oddoccasions/products/guitar-party-hero.png",
    items: [
      { name: "Guitar Pick Retirement Shadowbox", description: "A display case for your pick, formally retired from party service.", image: "/sites/oddoccasions/items/guitar-shadowbox.png" },
      { name: "Formal Apology in Song (Lyrics Only)", description: "An original composition expressing regret. Mercifully, only the lyrics are included.", image: "/sites/oddoccasions/items/guitar-lyrics.png" },
      { name: "\"Read the Room\" Guidebook", description: "A pocket-sized reference for social cue interpretation. Chapter 1: When Not to Play Wonderwall.", image: "/sites/oddoccasions/items/guitar-guidebook.png" },
      { name: "Aux Cord as Peace Offering", description: "A high-quality auxiliary cable, symbolizing the transfer of musical control to someone — anyone — else.", image: "/sites/oddoccasions/items/guitar-auxcord.png" },
    ],
  },
  {
    slug: "happy-birthday-to-someone-in-this-group-chat",
    name: "Happy Birthday to Someone in This Group Chat",
    price: 25.83,
    priceLabel: "$25.83",
    tagline: "I'm 60% sure it's today.",
    description: "The notification went off. You're fairly confident it's their birthday. This box covers the gap between certainty and obligation with warmth and minimal commitment.",
    category: "social",
    heroImage: "/sites/oddoccasions/products/group-chat-birthday-hero.png",
    items: [
      { name: "Generic Birthday Candle", description: "A single candle, number unspecified. Works for any age you're not quite sure of.", image: "/sites/oddoccasions/items/birthday-candle.png" },
      { name: "Card Signed \"From All of Us (I Think?)\"", description: "Pre-signed with a group sentiment that implies coordination where none existed.", image: "/sites/oddoccasions/items/birthday-card.png" },
      { name: "Confetti from a Previous Celebration", description: "Gently recycled festive confetti. Still sparkly. Slightly used.", image: "/sites/oddoccasions/items/birthday-confetti.png" },
      { name: "Screenshot of the Notification That Reminded You", description: "Framed proof that you cared enough to let your phone remember for you.", image: "/sites/oddoccasions/items/birthday-screenshot.png" },
    ],
  },
  {
    slug: "congrats-on-canceling-plans-without-guilt",
    name: "Congrats on Canceling Plans Without Guilt",
    price: 31.56,
    priceLabel: "$31.56",
    tagline: "You did it. You're free.",
    description: "You sent the text. You didn't over-explain. You felt nothing but relief. This box celebrates the purest form of modern self-care: staying home on purpose.",
    category: "social",
    heroImage: "/sites/oddoccasions/products/canceled-plans-hero.png",
    items: [
      { name: "Cozy Blanket Swatch", description: "A small but luxurious fabric sample of the blanket you're already under.", image: "/sites/oddoccasions/items/canceled-blanket.png" },
      { name: "\"Valid Excuse Generator\" Booklet", description: "Forty pre-written cancellation messages for every occasion. None of them are \"I just don't want to.\" (That one's on the back cover.)", image: "/sites/oddoccasions/items/canceled-excuses.png" },
      { name: "Celebratory Solo Popcorn", description: "Artisanal popcorn portioned for one. No sharing required.", image: "/sites/oddoccasions/items/canceled-popcorn.png" },
      { name: "Streaming Recommendation Card", description: "A hand-picked suggestion for what to watch tonight. You earned this.", image: "/sites/oddoccasions/items/canceled-streaming.png" },
    ],
  },

  // ── Digital Life ───────────────────────────────────────────
  {
    slug: "condolences-for-your-expired-free-trial",
    name: "Condolences for Your Expired Free Trial",
    price: 27.93,
    priceLabel: "$27.93",
    tagline: "You meant to cancel. We all meant to cancel.",
    description: "The trial ended. The charge went through. This box mourns the $14.99 you'll never see again and provides tools to ensure this tragedy doesn't repeat itself.",
    category: "digital",
    heroImage: "/sites/oddoccasions/products/free-trial-hero.png",
    items: [
      { name: "Sympathy Bouquet (Dried)", description: "Preserved flowers for a loss that doesn't quite warrant fresh ones.", image: "/sites/oddoccasions/items/trial-bouquet.png" },
      { name: "Memorial Card for the $14.99/Month", description: "\"In loving memory of money that was here and then wasn't. Gone but not refunded.\"", image: "/sites/oddoccasions/items/trial-memorial.png" },
      { name: "Budgeting Pamphlet", description: "A gentle introduction to subscription awareness. No shame. Just numbers.", image: "/sites/oddoccasions/items/trial-budget.png" },
      { name: "Free Trial Tracker", description: "A wall calendar specifically designed for marking trial end dates. Never again.", image: "/sites/oddoccasions/items/trial-tracker.png" },
    ],
  },
  {
    slug: "sorry-i-saw-your-screen-time-report",
    name: "Sorry I Saw Your Screen Time Report",
    price: 32.18,
    priceLabel: "$32.18",
    tagline: "Seven hours of TikTok is between you and your god.",
    description: "The notification popped up. You saw it. They saw you see it. This box helps both of you move past the moment with dignity intact.",
    category: "digital",
    heroImage: "/sites/oddoccasions/products/screen-time-hero.png",
    items: [
      { name: "\"No Judgment\" Certificate", description: "An officially unofficial document certifying that no judgment has been or will be passed.", image: "/sites/oddoccasions/items/screen-nojudgment.png" },
      { name: "Blue Light Glasses", description: "For the eyes that have seen too much — of screens, and of each other's screen time.", image: "/sites/oddoccasions/items/screen-glasses.png" },
      { name: "Phone Stand Facing Away from Witnesses", description: "An angled stand that ensures your screen time report faces only you and the ceiling.", image: "/sites/oddoccasions/items/screen-stand.png" },
      { name: "Dignity Restoration Serum (Saline Drops)", description: "For refreshing eyes and, symbolically, starting over.", image: "/sites/oddoccasions/items/screen-serum.png" },
    ],
  },
  {
    slug: "congrats-on-your-first-viral-post",
    name: "Congrats on Your First Viral Post",
    price: 44.27,
    priceLabel: "$44.27",
    tagline: "You peaked. And that's okay.",
    description: "The numbers went up. The notifications won't stop. This box celebrates the beautiful, unrepeatable moment when the internet briefly agreed about something you said.",
    category: "digital",
    heroImage: "/sites/oddoccasions/products/viral-post-hero.png",
    items: [
      { name: "Framed Screenshot (Before the Ratio)", description: "Captured at peak engagement, before the discourse turned. A moment preserved in amber.", image: "/sites/oddoccasions/items/viral-screenshot.png" },
      { name: "\"Micro-Famous\" Sash", description: "A satin sash for someone whose follower count briefly mattered.", image: "/sites/oddoccasions/items/viral-sash.png" },
      { name: "Engagement Rate Calculator (Just Kidding, Don't)", description: "A novelty calculator that displays \"STOP CHECKING\" regardless of input.", image: "/sites/oddoccasions/items/viral-calculator.png" },
      { name: "Follow-Up Content Strategy (A Blank Page)", description: "A premium journal with one page. It's blank. Lightning doesn't strike twice.", image: "/sites/oddoccasions/items/viral-strategy.png" },
    ],
  },
  {
    slug: "sorry-about-your-reply-guy",
    name: "Sorry About Your Reply Guy",
    price: 29.61,
    priceLabel: "$29.61",
    tagline: "He means well. He doesn't, actually.",
    description: "Someone in your mentions has opinions about everything you post. This box provides comfort and practical tools for the chronically replied-to.",
    category: "digital",
    heroImage: "/sites/oddoccasions/products/reply-guy-hero.png",
    items: [
      { name: "Block Button Polishing Cloth", description: "A microfiber cloth for maintaining the most important button on the internet.", image: "/sites/oddoccasions/items/reply-cloth.png" },
      { name: "\"Well Actually\" Repellent Spray", description: "A decorative spray bottle labeled for the unsolicited correction in your life.", image: "/sites/oddoccasions/items/reply-spray.png" },
      { name: "Curated List of Touch-Grass Locations", description: "Local parks, hiking trails, and outdoor spaces where Wi-Fi doesn't reach.", image: "/sites/oddoccasions/items/reply-grass.png" },
      { name: "Emotional Support Mute Button", description: "A plush, squeezable mute button. For when blocking feels aggressive but silence feels right.", image: "/sites/oddoccasions/items/reply-mute.png" },
    ],
  },
  {
    slug: "happy-anniversary-of-your-password-you-cant-remember",
    name: "Happy Anniversary of Your Password You Can't Remember",
    price: 23.47,
    priceLabel: "$23.47",
    tagline: "It's been 3 years since you set it and 47 resets since.",
    description: "You created a password. You forgot it immediately. You've been resetting it ever since. This box commemorates the relationship between you and the password you'll never truly know.",
    category: "digital",
    heroImage: "/sites/oddoccasions/products/password-hero.png",
    items: [
      { name: "Elegant Password Journal", description: "A leather-bound journal for writing down passwords like it's 2003. Because at this point, why not.", image: "/sites/oddoccasions/items/password-journal.png" },
      { name: "\"Security Question Trauma\" Workbook", description: "Therapeutic exercises for people who can't remember their mother's maiden name under pressure.", image: "/sites/oddoccasions/items/password-workbook.png" },
      { name: "Commemorative Sticky Note", description: "A gold-bordered sticky note for your most important password. Not recommended. Included anyway.", image: "/sites/oddoccasions/items/password-sticky.png" },
      { name: "Pencil That Says \"Just Use a Password Manager\"", description: "Practical advice, delivered passively. The eraser has never been used.", image: "/sites/oddoccasions/items/password-pencil.png" },
    ],
  },
  {
    slug: "condolences-on-your-dropped-phone-screen-down",
    name: "Condolences on Your Dropped Phone (Screen Down)",
    price: 35.82,
    priceLabel: "$35.82",
    tagline: "That moment of silence before you flipped it over.",
    description: "It fell. It landed screen-down. Time stopped. This box acknowledges the specific dread of the face-down phone and provides everything you need for the aftermath.",
    category: "digital",
    heroImage: "/sites/oddoccasions/products/dropped-phone-hero.png",
    items: [
      { name: "Protective Case (Too Late)", description: "The case you should have had. Better late than shattered.", image: "/sites/oddoccasions/items/phone-case.png" },
      { name: "Screen Crack Acceptance Guide", description: "Five stages of grief, adapted for hairline fractures. Stage 1: \"It's barely noticeable.\"", image: "/sites/oddoccasions/items/phone-guide.png" },
      { name: "\"It Still Works Fine\" Affirmation Card", description: "A daily affirmation for living with a cracked screen. You are not your phone's condition.", image: "/sites/oddoccasions/items/phone-affirmation.png" },
      { name: "Gift Card for a Screen Protector You Should've Had", description: "A symbolic gesture toward prevention. The amount is modest. The lesson is priceless.", image: "/sites/oddoccasions/items/phone-giftcard.png" },
    ],
  },

  // ── Family ─────────────────────────────────────────────────
  {
    slug: "sorry-im-your-mothers-favorite",
    name: "Sorry I'm Your Mother's Favorite",
    price: 39.14,
    priceLabel: "$39.14",
    tagline: "We both know it. Let's heal.",
    description: "The favoritism is real. It's been real since childhood. This box opens the conversation with warmth, humor, and a consolation ribbon that says everything words can't.",
    category: "family",
    heroImage: "/sites/oddoccasions/products/mothers-favorite-hero.png",
    items: [
      { name: "Sibling Rivalry Peace Treaty", description: "A formal agreement to acknowledge the favoritism and move forward. Signatures required.", image: "/sites/oddoccasions/items/favorite-treaty.png" },
      { name: "\"Second Favorite\" Consolation Ribbon", description: "A satin ribbon for the runner-up. Worn with dignity.", image: "/sites/oddoccasions/items/favorite-ribbon.png" },
      { name: "Family Photo Where You're Slightly More in Focus", description: "A reprinted family photo with subtle focus adjustment. A small correction to the historical record.", image: "/sites/oddoccasions/items/favorite-photo.png" },
      { name: "Shared Therapy Coupon", description: "Good for one joint session. Or two separate ones. Whatever works.", image: "/sites/oddoccasions/items/favorite-therapy.png" },
    ],
  },
  {
    slug: "thanks-for-not-telling-mom",
    name: "Thanks for Not Telling Mom",
    price: 33.29,
    priceLabel: "$33.29",
    tagline: "The sibling code is sacred.",
    description: "Something happened. Your sibling knows. Mom doesn't. This box honors the sacred pact of sibling silence with the gravity it deserves.",
    category: "family",
    heroImage: "/sites/oddoccasions/products/not-telling-mom-hero.png",
    items: [
      { name: "Sealed Lips Wax Seal Kit", description: "A wax seal set with a \"sealed lips\" stamp. For formalizing the pact in wax.", image: "/sites/oddoccasions/items/mom-waxseal.png" },
      { name: "\"What Mom Doesn't Know\" Journal", description: "A shared journal for documenting the things that shall not be discussed at Thanksgiving.", image: "/sites/oddoccasions/items/mom-journal.png" },
      { name: "Redacted Incident Report", description: "A formal writeup of the event with all incriminating details blacked out. For the archives.", image: "/sites/oddoccasions/items/mom-report.png" },
      { name: "Snack Bribe Replenishment Pack", description: "Premium snacks to replenish the bribery reserves. Silence has a price, and it's usually snacks.", image: "/sites/oddoccasions/items/mom-snacks.png" },
    ],
  },
  {
    slug: "happy-anniversary-of-moving-back-in",
    name: "Happy Anniversary of Moving Back In",
    price: 28.73,
    priceLabel: "$28.73",
    tagline: "It's temporary. It's been two years. It's temporary.",
    description: "You moved back home. Temporarily. This box marks the anniversary of your temporary return with the warmth and gentle denial the situation requires.",
    category: "family",
    heroImage: "/sites/oddoccasions/products/moved-back-in-hero.png",
    items: [
      { name: "\"Temporary\" Welcome Mat", description: "A doormat that says \"Temporary\" in a font that suggests permanence.", image: "/sites/oddoccasions/items/movedback-mat.png" },
      { name: "House Rules Renegotiation Kit", description: "A formal template for updating household terms. Includes clauses about thermostat rights and pantry access.", image: "/sites/oddoccasions/items/movedback-rules.png" },
      { name: "Mini Cactus", description: "It also doesn't want to be there. But it's making the best of it.", image: "/sites/oddoccasions/items/movedback-cactus.png" },
      { name: "Motivational Apartment Listing Printout", description: "A curated selection of apartments you could afford if everything goes according to plan.", image: "/sites/oddoccasions/items/movedback-listings.png" },
    ],
  },
  {
    slug: "sorry-i-taught-your-kid-that-word",
    name: "Sorry I Taught Your Kid That Word",
    price: 36.91,
    priceLabel: "$36.91",
    tagline: "In my defense, I didn't know they were listening.",
    description: "You said something. A child heard it. They repeated it. Loudly. In public. This box helps you navigate the aftermath of accidental vocabulary expansion.",
    category: "family",
    heroImage: "/sites/oddoccasions/products/taught-word-hero.png",
    items: [
      { name: "\"Uncle/Aunt of the Year\" Participation Trophy", description: "A small trophy recognizing your involvement in the child's development. Participation-level only.", image: "/sites/oddoccasions/items/word-trophy.png" },
      { name: "Vocabulary Replacement Flash Cards", description: "Kid-friendly alternatives for every word they should not have learned from you.", image: "/sites/oddoccasions/items/word-flashcards.png" },
      { name: "Formal Incident Report", description: "A written account of the event, filed for family records. Tone: apologetic but slightly amused.", image: "/sites/oddoccasions/items/word-report.png" },
      { name: "Earplugs for the Next Family Gathering", description: "Because the child will say it again. Probably at dinner. Definitely in front of grandma.", image: "/sites/oddoccasions/items/word-earplugs.png" },
    ],
  },
  {
    slug: "congrats-on-becoming-the-family-it-person",
    name: "Congrats on Becoming the Family IT Person",
    price: 30.44,
    priceLabel: "$30.44",
    tagline: "You connected the printer once. There's no going back.",
    description: "You fixed one thing. Now you fix everything. This box honors the family member who became the unofficial tech support department by accident.",
    category: "family",
    heroImage: "/sites/oddoccasions/products/family-it-hero.png",
    items: [
      { name: "\"Have You Tried Restarting?\" T-Shirt Patch", description: "An iron-on patch for your uniform. Because this is your job now.", image: "/sites/oddoccasions/items/it-patch.png" },
      { name: "Remote Desktop Guilt Journal", description: "For logging every time you remotely fixed something while quietly resenting it.", image: "/sites/oddoccasions/items/it-journal.png" },
      { name: "Laminated Troubleshooting Flowchart", description: "Step 1: Is it plugged in? Step 2: Is it turned on? Step 3: Call me anyway, I guess.", image: "/sites/oddoccasions/items/it-flowchart.png" },
      { name: "Business Card Reading \"Not Actually in IT\"", description: "Hand these out at family gatherings. They won't help, but they'll make you feel seen.", image: "/sites/oddoccasions/items/it-card.png" },
    ],
  },

  // ── Milestones & Life Events ───────────────────────────────
  {
    slug: "congrats-on-aging-out-of-your-insurance-plan",
    name: "Congrats on Aging Out of Your Insurance Plan",
    price: 41.08,
    priceLabel: "$41.08",
    tagline: "Welcome to reading the fine print.",
    description: "You turned 26. Your parents' insurance plan politely asked you to leave. This box welcomes you to the world of co-pays, deductibles, and phrases like \"out of network.\"",
    category: "milestones",
    heroImage: "/sites/oddoccasions/products/insurance-hero.png",
    items: [
      { name: "Adulting Starter Pamphlet", description: "A brief guide to insurance terminology. Brief, because the full version would be depressing.", image: "/sites/oddoccasions/items/insurance-pamphlet.png" },
      { name: "\"Deductible\" Pronunciation Guide", description: "So you can say it with confidence at your first solo doctor's appointment.", image: "/sites/oddoccasions/items/insurance-guide.png" },
      { name: "Single Aspirin (Not Covered)", description: "One aspirin tablet, individually packaged. A preview of what healthcare costs feel like now.", image: "/sites/oddoccasions/items/insurance-aspirin.png" },
      { name: "Comforting Yet Medically Vague Tea", description: "A tea that promises nothing specific but feels like it should help somehow.", image: "/sites/oddoccasions/items/insurance-tea.png" },
    ],
  },
  {
    slug: "happy-10000th-day-alive",
    name: "Happy 10,000th Day Alive",
    price: 27.33,
    priceLabel: "$27.33",
    tagline: "A milestone nobody asked you to calculate.",
    description: "You've been alive for ten thousand days. Nobody else is counting. This box celebrates the milestone you didn't know you hit with the ceremony it arguably doesn't deserve.",
    category: "milestones",
    heroImage: "/sites/oddoccasions/products/10000-days-hero.png",
    items: [
      { name: "Life Odometer Certificate", description: "An official-looking document certifying your day count. Suitable for framing or existential reflection.", image: "/sites/oddoccasions/items/days-certificate.png" },
      { name: "\"Days Alive\" Counter (Already Outdated)", description: "A desk counter set to 10,000. By the time it arrives, it will be wrong.", image: "/sites/oddoccasions/items/days-counter.png" },
      { name: "Commemorative Candle", description: "One candle for every 10,000 days. So, just the one.", image: "/sites/oddoccasions/items/days-candle.png" },
      { name: "Existential Reflection Journal (3 Pages)", description: "Three pages. That's enough. You don't need to overthink 10,000 days.", image: "/sites/oddoccasions/items/days-journal.png" },
    ],
  },
  {
    slug: "sorry-your-sourdough-starter-died",
    name: "Sorry Your Sourdough Starter Died",
    price: 34.56,
    priceLabel: "$34.56",
    tagline: "It was alive. It depended on you. Let's not dwell.",
    description: "Your starter needed you. You forgot. This box mourns the loss of your living bread culture and offers a second chance — with better instructions this time.",
    category: "milestones",
    heroImage: "/sites/oddoccasions/products/sourdough-hero.png",
    items: [
      { name: "Memorial Jar", description: "A small glass jar for preserving the memory. Empty, like the feeding schedule.", image: "/sites/oddoccasions/items/sourdough-jar.png" },
      { name: "\"Bread We Never Knew\" Sympathy Card", description: "A heartfelt card mourning the loaves that could have been.", image: "/sites/oddoccasions/items/sourdough-card.png" },
      { name: "New Starter Kit (With Instructions This Time)", description: "Everything you need to try again. The instructions are larger and more emphatic.", image: "/sites/oddoccasions/items/sourdough-kit.png" },
      { name: "Feeding Schedule Fridge Magnet", description: "A magnetic reminder that your starter needs to eat. Every. Single. Day.", image: "/sites/oddoccasions/items/sourdough-magnet.png" },
    ],
  },
  {
    slug: "congrats-on-finally-using-your-gym-membership",
    name: "Congrats on Finally Using Your Gym Membership",
    price: 29.87,
    priceLabel: "$29.87",
    tagline: "Four months of paying. One glorious visit.",
    description: "You went to the gym. Once. After four months of automatic charges. This box celebrates the visit itself, not the likelihood of a second one.",
    category: "milestones",
    heroImage: "/sites/oddoccasions/products/gym-hero.png",
    items: [
      { name: "\"I Went Once\" Achievement Medal", description: "A medal for the visit. One visit. Worn with the pride of someone who found the building.", image: "/sites/oddoccasions/items/gym-medal.png" },
      { name: "Sweat Towel (Decorative Only)", description: "A premium gym towel. For display purposes. It has not been, and may never be, sweated upon.", image: "/sites/oddoccasions/items/gym-towel.png" },
      { name: "Protein Bar from 2024", description: "Still technically edible. A relic from the era when you first signed up.", image: "/sites/oddoccasions/items/gym-protein.png" },
      { name: "Motivational Quote That Acknowledges Reality", description: "\"The hardest part is showing up. The second hardest part is showing up again.\" Framed.", image: "/sites/oddoccasions/items/gym-quote.png" },
    ],
  },
  {
    slug: "happy-divorce-from-your-streaming-service",
    name: "Happy Divorce from Your Streaming Service",
    price: 26.19,
    priceLabel: "$26.19",
    tagline: "You shared a queue. You shared a life. You shared a password.",
    description: "The shared account is no more. Your watchlist is finally, truly yours. This box helps you process the separation and celebrate your streaming independence.",
    category: "milestones",
    heroImage: "/sites/oddoccasions/products/streaming-divorce-hero.png",
    items: [
      { name: "Profile Migration Grief Counseling Card", description: "A card acknowledging that losing your watch history feels like losing a part of yourself.", image: "/sites/oddoccasions/items/streaming-card.png" },
      { name: "\"Starting Over\" Watchlist", description: "A curated list of shows to begin your solo streaming era. Heavy on comfort, light on shared memories.", image: "/sites/oddoccasions/items/streaming-watchlist.png" },
      { name: "Your Own Login (Finally)", description: "A decorative card with a blank space for your new, unshared credentials. This one is yours.", image: "/sites/oddoccasions/items/streaming-login.png" },
      { name: "Microwave Popcorn for Your Solo Era", description: "Single-serve popcorn. No negotiating what to watch. No compromise. Just you and the remote.", image: "/sites/oddoccasions/items/streaming-popcorn.png" },
    ],
  },
  {
    slug: "sorry-you-found-out-your-favorite-restaurant-closed",
    name: "Sorry You Found Out Your Favorite Restaurant Closed",
    price: 38.43,
    priceLabel: "$38.43",
    tagline: "You were going to go back. You always said you'd go back.",
    description: "The restaurant is gone. You drove past and the sign was different. This box mourns the meals you'll never have again and the reservations you kept meaning to make.",
    category: "milestones",
    heroImage: "/sites/oddoccasions/products/restaurant-closed-hero.png",
    items: [
      { name: "Menu Memorial (Reprinted from Yelp Photos)", description: "A lovingly reproduced menu from blurry online photos. Some prices may be from 2019.", image: "/sites/oddoccasions/items/restaurant-menu.png" },
      { name: "\"Last Meal\" Recipe Attempt Kit", description: "Ingredients and a best-guess recipe for their signature dish. It won't be the same. Nothing will.", image: "/sites/oddoccasions/items/restaurant-recipe.png" },
      { name: "Candle That Smells Vaguely Like Their Signature Dish", description: "Close enough to trigger a memory. Not close enough to satisfy one.", image: "/sites/oddoccasions/items/restaurant-candle.png" },
      { name: "Gift Card to a Place That's Fine but Not the Same", description: "A gift card to a perfectly acceptable restaurant that will never be the one you lost.", image: "/sites/oddoccasions/items/restaurant-giftcard.png" },
    ],
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(category: Product["category"]): Product[] {
  return products.filter((p) => p.category === category)
}

export const featuredProducts = products.filter((_, i) => [0, 1, 7, 13, 19, 25].includes(i))
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit 2>&1 | head -20`
Expected: May show errors about missing barrel — that's fine.

- [ ] **Step 3: Commit**

```bash
git add src/sites/oddoccasions/data/products.ts
git commit -m "feat(oddoccasions): add product catalog (30 gift boxes)"
```

---

### Task 3: Leadership and Testimonial Data

**Files:**
- Create: `src/sites/oddoccasions/data/leadership.ts`
- Create: `src/sites/oddoccasions/data/testimonials.ts`

- [ ] **Step 1: Create `src/sites/oddoccasions/data/leadership.ts`**

```typescript
export interface Executive {
  slug: string
  name: string
  title: string
  bio: string
  quote: string
  image: string
  referencePerson: "bill" | "brandon" | "jim" | "sean"
}

export const executives: Executive[] = [
  {
    slug: "bellweather",
    name: "Gerald Bellweather",
    title: "Founder & Chief Occasion Officer",
    bio: "Gerald founded Odd Occasions after spending two hours in a card shop looking for something that said 'Sorry I accidentally liked your ex's photo from 2016' and finding nothing. He realized that life's most specific moments were going entirely uncelebrated, and dedicated his career to fixing that. He personally approves every gift box concept and has vetoed only one (\"Congrats on Your Unremarkable Tuesday\" — too broad).",
    quote: "Every moment deserves recognition. Especially the ones nobody else would think to acknowledge.",
    image: "/sites/oddoccasions/exec-bellweather.png",
    referencePerson: "bill",
  },
  {
    slug: "ashworth",
    name: "Declan Ashworth",
    title: "VP of Occasion Research",
    bio: "Declan leads a small but passionate team that monitors real-life situations for underserved gifting opportunities. His research methodology involves surveys, focus groups, and sitting quietly in coffee shops listening to strangers describe awkward moments. He has cataloged over 4,000 specific occasions and maintains a spreadsheet he describes as 'the most important document in modern retail.'",
    quote: "The data doesn't lie. People are living through incredibly specific moments every single day, completely un-gifted.",
    image: "/sites/oddoccasions/exec-ashworth.png",
    referencePerson: "brandon",
  },
  {
    slug: "lundy",
    name: "Theodore Lundy",
    title: "Head of Curation",
    bio: "Theodore personally selects every item in every gift box. He has strong opinions about tissue paper weight (18gsm, never lighter), ribbon curl radius (\"it should suggest joy, not aggression\"), and the precise angle at which an apology card should sit inside the box (12 degrees, leaning toward the recipient). Before joining Odd Occasions, he worked in museum exhibit design, which he says was less demanding.",
    quote: "The difference between a good gift box and a great one is in the details nobody consciously notices but everyone unconsciously feels.",
    image: "/sites/oddoccasions/exec-lundy.png",
    referencePerson: "jim",
  },
  {
    slug: "nye",
    name: "Fletcher Nye",
    title: "Director of Recipient Experience",
    bio: "Fletcher oversees the moment of unboxing — the pause, the read, the reaction. He has conducted over 600 recipient observation sessions (with consent) and has developed a proprietary framework for measuring 'emotional resolution per box.' His proudest moment was a recipient who laughed, then cried, then said 'How did they know?' He considers this the gold standard.",
    quote: "We're not selling gift boxes. We're selling the feeling of being understood in a way you didn't know you needed.",
    image: "/sites/oddoccasions/exec-nye.png",
    referencePerson: "sean",
  },
]

export function getExecutiveBySlug(slug: string): Executive | undefined {
  return executives.find((e) => e.slug === slug)
}
```

- [ ] **Step 2: Create `src/sites/oddoccasions/data/testimonials.ts`**

```typescript
import { getPortrait } from "@/data/testimonial-portraits"

export interface Testimonial {
  quote: string
  name: string
  title: string
  image: string
  productSlug: string
}

function withPortrait(slug: string, quote: string, title: string, productSlug: string): Testimonial {
  const portrait = getPortrait(slug)
  if (!portrait) throw new Error(`Unknown testimonial portrait: ${slug}`)
  return { quote, title, name: portrait.name, image: portrait.image, productSlug }
}

export const testimonials: Testimonial[] = [
  // Workplace
  withPortrait("brenda-faulk", "I sent this to a coworker seven years after the incident. She cried. Then she showed me the fridge lock was already installed. We're closer now.", "Sent the Sorry I Ate Your Labeled Lunch box", "sorry-i-ate-your-labeled-lunch-in-2017"),
  withPortrait("jason-kile", "My manager got promoted to 'Senior Associate Lead.' This box was the only gift that matched the energy. He put the desk plaque up immediately.", "Sent the Congrats on Your Mild Promotion box", "congrats-on-your-mild-promotion"),
  withPortrait("tony-mazetti", "I received this after not hitting Reply All on a 200-person thread about the kitchen microwave. I wear the pin every day.", "Received the Thanks for Not Replying All box", "thanks-for-not-replying-all"),
  withPortrait("derek-pullman", "The USB mute button has saved me three times since I got this box. The candle is also surprisingly good.", "Received the Sorry I Unmuted You box", "sorry-i-unmuted-you-during-your-rant"),
  withPortrait("simone-archer", "I didn't know this person's name for three years and this box somehow made the farewell genuine. The breakroom coffee was a perfect touch.", "Sent the Happy Last Day box", "happy-last-day-to-someone-whose-name-i-should-know"),
  withPortrait("kyle-brandt", "Survived my fourth reorg. The stress ball shaped like a pivot table is now my most-used desk item.", "Received the Congrats on Surviving the Reorg box", "congrats-on-surviving-the-reorg"),
  withPortrait("patricia-hollowell", "Eight months of silent parking lot tension, resolved by a $0.47 gas card. I have never felt more seen.", "Received the Sorry I Stole Your Parking Spot box", "sorry-i-stole-your-parking-spot-for-8-months"),

  // Social
  withPortrait("marcus-chen", "I sent this to someone I met at a SaaS conference in 2022. We've now had our second conversation. Progress.", "Sent the We Met Once at a Networking Event box", "we-met-once-at-a-networking-event"),
  withPortrait("nina-cabrera", "I ghosted my college roommate for four years. This box reopened the conversation. The friendship re-application form took her three days to fill out.", "Sent the Sorry I Ghosted You in 2019 box", "sorry-i-ghosted-you-in-2019"),
  withPortrait("chad-gullet", "My friend has been serving me dry chicken for six years. I finally sent this. The honest seasoning kit was a risk but the take-out menu softened the blow.", "Sent the Thanks for Pretending to Like My Cooking box", "thanks-for-pretending-to-like-my-cooking"),
  withPortrait("ryan-ashford", "I brought an acoustic guitar to my friend's housewarming. This box arrived two days later. The guitar pick shadowbox is now on my wall. I've made peace with it.", "Received the Sorry I Brought a Guitar box", "sorry-i-brought-a-guitar-to-your-party"),
  withPortrait("eleanor-whittaker", "I love canceling plans and I finally feel celebrated for it. The solo popcorn was the perfect serving size.", "Received the Congrats on Canceling Plans box", "congrats-on-canceling-plans-without-guilt"),

  // Digital
  withPortrait("tamara-voss", "I forgot to cancel three free trials in one month. My roommate sent me this. The tracker calendar is now on my fridge.", "Received the Condolences for Your Expired Free Trial box", "condolences-for-your-expired-free-trial"),
  withPortrait("francois-delacroix", "My wife saw my 11-hour screen time and said nothing. But the box arrived on Monday. The phone stand facing away from witnesses was a masterclass in passive support.", "Received the Sorry I Saw Your Screen Time Report box", "sorry-i-saw-your-screen-time-report"),
  withPortrait("asher-bloom", "I went viral for a tweet about sandwiches. The blank follow-up content strategy page was painfully accurate.", "Received the Congrats on Your First Viral Post box", "congrats-on-your-first-viral-post"),
  withPortrait("greg-diane-hofstra", "We've been resetting the same Netflix password for our entire marriage. This box was our anniversary gift to each other. The sticky note is now framed.", "Shared the Happy Anniversary of Your Password box", "happy-anniversary-of-your-password-you-cant-remember"),

  // Family
  withPortrait("tony-mazetti", "I sent this to my brother. He hung the 'Second Favorite' ribbon on his fridge. Mom saw it. She denied everything. We all know.", "Sent the Sorry I'm Your Mother's Favorite box", "sorry-im-your-mothers-favorite"),
  withPortrait("nina-cabrera", "My sister kept my secret for 12 years. The wax seal kit was the most dramatic way I could say thank you, and she deserved every bit of it.", "Sent the Thanks for Not Telling Mom box", "thanks-for-not-telling-mom"),
  withPortrait("kyle-brandt", "Year two of living with my parents. The 'Temporary' welcome mat is still there. So am I. The cactus is thriving, which is more than I can say for my independence.", "Received the Happy Anniversary of Moving Back In box", "happy-anniversary-of-moving-back-in"),
  withPortrait("patricia-hollowell", "My toddler said the word at Thanksgiving dinner. My brother-in-law sent this the next day. The incident report was uncomfortably detailed.", "Related to the Sorry I Taught Your Kid That Word box", "sorry-i-taught-your-kid-that-word"),

  // Milestones
  withPortrait("simone-archer", "I turned 26 and immediately received a bill that made me reconsider adulthood. This box was waiting on my doorstep. The single aspirin was darkly perfect.", "Received the Congrats on Aging Out box", "congrats-on-aging-out-of-your-insurance-plan"),
  withPortrait("derek-pullman", "My wife calculated my 10,000th day alive and gave me this box at breakfast. The counter was already wrong by dinner. I've never felt more alive and more aware of time.", "Received the Happy 10,000th Day Alive box", "happy-10000th-day-alive"),
  withPortrait("marcus-chen", "I killed my sourdough starter during a work trip. My partner sent this. The new kit came with instructions in a larger font. I deserved that.", "Received the Sorry Your Sourdough Starter Died box", "sorry-your-sourdough-starter-died"),
  withPortrait("brenda-faulk", "I went to the gym once in January. My friend sent this in May. The protein bar was expired but honestly so was my motivation.", "Received the Congrats on Finally Using Your Gym Membership box", "congrats-on-finally-using-your-gym-membership"),
  withPortrait("chad-gullet", "We split the Netflix account in the divorce. This box arrived from my buddy the same week. The 'Starting Over' watchlist was actually really good.", "Received the Happy Divorce from Your Streaming Service box", "happy-divorce-from-your-streaming-service"),
  withPortrait("ryan-ashford", "My favorite taco place closed and I found out by driving past. My wife had already ordered this box. The candle smells close enough to make me emotional.", "Received the Sorry Your Favorite Restaurant Closed box", "sorry-you-found-out-your-favorite-restaurant-closed"),
]

/** Get 2-4 testimonials for a given product slug */
export function getTestimonialsForProduct(productSlug: string): Testimonial[] {
  return testimonials.filter((t) => t.productSlug === productSlug)
}

/** Get a few featured testimonials for the homepage */
export const homepageTestimonials = testimonials.filter((_, i) => [0, 8, 14, 20].includes(i))
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit 2>&1 | head -20`

- [ ] **Step 4: Commit**

```bash
git add src/sites/oddoccasions/data/leadership.ts src/sites/oddoccasions/data/testimonials.ts
git commit -m "feat(oddoccasions): add leadership team and testimonial data"
```

---

### Task 4: Homepage

**Files:**
- Create: `src/sites/oddoccasions/pages/home.tsx`

- [ ] **Step 1: Create `src/sites/oddoccasions/pages/home.tsx`**

```typescript
import Image from "next/image"
import Link from "next/link"
import { getSiteHref } from "@/lib/site-href"
import { featuredProducts, categories } from "../data/products"
import { homepageTestimonials } from "../data/testimonials"

export default async function OddOccasionsHome() {
  const siteHref = await getSiteHref()

  return (
    <>
      {/* HERO */}
      <section className="bg-[#FFFDF8]">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-sm font-semibold tracking-widest uppercase text-[#D4A0A0]">
              For life&apos;s most specific moments
            </p>
            <h1 className="mt-4 text-4xl md:text-6xl font-bold text-[#2D2D2D] leading-tight font-heading">
              Thoughtfully curated gifts for occasions nobody else covers.
            </h1>
            <p className="mt-4 text-lg text-[#2D2D2D]/70 font-body">
              Every awkward moment, hyper-specific milestone, and long-overdue apology deserves a beautiful gift box. We make them. You send them. The recipient finally feels understood.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={siteHref("/shop")}
                className="bg-[#7C9A82] hover:bg-[#6B8972] text-white font-bold rounded-lg px-7 py-3 transition-colors"
              >
                Shop All Occasions
              </Link>
              <Link
                href={siteHref("/about")}
                className="bg-white border border-[#7C9A82]/30 hover:border-[#7C9A82]/60 text-[#7C9A82] font-bold rounded-lg px-7 py-3 transition-colors"
              >
                Our Story
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/sites/oddoccasions/home-hero.png"
              alt="A collection of beautifully wrapped Odd Occasions gift boxes on a warm wooden table"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              priority
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* SHOP BY OCCASION */}
      <section className="bg-[#F5F0E8]/50 border-y border-[#7C9A82]/10">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#2D2D2D] font-heading">Shop by Occasion</h2>
            <p className="text-[#2D2D2D]/60 mt-2">Because &ldquo;Thinking of You&rdquo; is never specific enough.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.key}
                href={siteHref(`/shop#${cat.anchor}`)}
                className="group block bg-white rounded-xl p-6 text-center border border-[#7C9A82]/15 hover:border-[#7C9A82]/40 hover:shadow-md transition-all"
              >
                <div className="text-lg font-bold text-[#7C9A82] group-hover:text-[#6B8972] font-heading">
                  {cat.label}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED GIFT BOXES */}
      <section className="bg-[#FFFDF8]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#2D2D2D] font-heading">Staff Picks</h2>
            <p className="text-[#2D2D2D]/60 mt-2">Hand-selected by our Head of Curation, Theodore Lundy.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <Link
                key={product.slug}
                href={siteHref(`/shop/${product.slug}`)}
                className="group block bg-white border border-[#7C9A82]/15 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-square bg-[#F5F0E8]/30">
                  <Image
                    src={product.heroImage}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <div className="font-bold text-[#2D2D2D] group-hover:text-[#7C9A82] font-heading">{product.name}</div>
                  <p className="text-sm text-[#2D2D2D]/60 mt-1 line-clamp-2">{product.tagline}</p>
                  <div className="mt-3 text-lg font-bold text-[#2D2D2D]">{product.priceLabel}</div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href={siteHref("/shop")}
              className="text-[#7C9A82] font-bold underline underline-offset-4 hover:text-[#6B8972]"
            >
              View all 30 gift boxes →
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-[#F5F0E8]/50 border-y border-[#7C9A82]/10">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-[#2D2D2D] text-center mb-10 font-heading">What People Are Saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {homepageTestimonials.map((t) => (
              <div key={t.name + t.productSlug} className="bg-white border border-[#7C9A82]/15 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-[#F5F0E8]">
                    <Image src={t.image} alt={t.name} fill sizes="48px" className="object-cover" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-[#2D2D2D]">{t.name}</div>
                    <div className="text-xs text-[#2D2D2D]/60">{t.title}</div>
                  </div>
                </div>
                <p className="text-sm text-[#2D2D2D]/80 italic">&ldquo;{t.quote}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR PHILOSOPHY */}
      <section className="bg-[#FFFDF8]">
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold text-[#2D2D2D] font-heading">Our Philosophy</h2>
          <p className="mt-4 text-lg text-[#2D2D2D]/70 leading-relaxed">
            Life is full of moments that Hallmark doesn&apos;t cover. The awkward ones. The oddly specific ones. The ones where you need to say something but no card exists for it. We believe every one of those moments deserves a thoughtfully curated gift box — assembled with genuine care and wrapped with the understanding that sometimes, the most meaningful gift is the one that says &ldquo;I noticed this very specific thing, and I got you something for it.&rdquo;
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#7C9A82] text-white">
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          <h2 className="text-3xl font-bold font-heading">Every moment deserves recognition.</h2>
          <p className="mt-2 text-white/90">30 curated gift boxes. Suspiciously precise prices. Genuine warmth.</p>
          <Link
            href={siteHref("/shop")}
            className="inline-block mt-6 bg-white text-[#7C9A82] font-bold rounded-lg px-7 py-3"
          >
            Browse All Occasions
          </Link>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/sites/oddoccasions/pages/home.tsx
git commit -m "feat(oddoccasions): add homepage"
```

---

### Task 5: Shop Page

**Files:**
- Create: `src/sites/oddoccasions/pages/shop.tsx`

- [ ] **Step 1: Create `src/sites/oddoccasions/pages/shop.tsx`**

```typescript
import Image from "next/image"
import Link from "next/link"
import { getSiteHref } from "@/lib/site-href"
import { products, categories, getProductsByCategory } from "../data/products"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"

export const metadata = {
  title: "Shop — Odd Occasions",
  description: "Browse all 30 curated gift boxes for life's most specific moments. Workplace, social, digital, family, and milestone occasions.",
}

export default async function OddOccasionsShop() {
  const siteHref = await getSiteHref()

  return (
    <section className="bg-[#FFFDF8]">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center">
          <p className="text-sm font-semibold tracking-widest uppercase text-[#D4A0A0]">
            Curated with care
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold text-[#2D2D2D] font-heading">
            All Occasions
          </h1>
          <p className="mt-3 text-[#2D2D2D]/70 max-w-2xl mx-auto">
            {products.length} gift boxes for moments that deserve more than a text message.
          </p>
        </div>

        {/* Category nav */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <a
              key={cat.key}
              href={`#${cat.anchor}`}
              className="px-4 py-2 text-sm font-semibold rounded-full border border-[#7C9A82]/20 text-[#7C9A82] hover:bg-[#7C9A82] hover:text-white transition-colors"
            >
              {cat.label}
            </a>
          ))}
        </div>

        {/* Product grid by category */}
        {categories.map((cat) => {
          const catProducts = getProductsByCategory(cat.key)
          return (
            <div key={cat.key} id={cat.anchor} className="mt-16 scroll-mt-24">
              <h2 className="text-2xl font-bold text-[#7C9A82] font-heading mb-6">{cat.label}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {catProducts.map((product) => (
                  <div
                    key={product.slug}
                    className="bg-white border border-[#7C9A82]/15 rounded-xl overflow-hidden hover:shadow-md transition-shadow flex flex-col"
                  >
                    <Link href={siteHref(`/shop/${product.slug}`)}>
                      <div className="relative aspect-square bg-[#F5F0E8]/30">
                        <Image
                          src={product.heroImage}
                          alt={product.name}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                    </Link>
                    <div className="p-5 flex flex-col flex-1">
                      <Link href={siteHref(`/shop/${product.slug}`)}>
                        <div className="font-bold text-[#2D2D2D] hover:text-[#7C9A82] font-heading">{product.name}</div>
                      </Link>
                      <p className="text-sm text-[#2D2D2D]/60 mt-1 line-clamp-2 flex-1">{product.tagline}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="text-lg font-bold text-[#2D2D2D]">{product.priceLabel}</div>
                        <AddToCartButton
                          slug={product.slug}
                          productName={product.name}
                          className="px-4 py-2 bg-[#7C9A82] hover:bg-[#6B8972] text-white text-sm font-semibold rounded-lg transition-colors"
                          quips={[
                            "Thoughtful choice.",
                            "They're going to love this.",
                            "Consider it curated.",
                            "Added with care.",
                            "A gesture worth making.",
                            "Box secured.",
                          ]}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/sites/oddoccasions/pages/shop.tsx
git commit -m "feat(oddoccasions): add shop page with category sections"
```

---

### Task 6: Product Detail Page

**Files:**
- Create: `src/sites/oddoccasions/pages/product-detail.tsx`

- [ ] **Step 1: Create `src/sites/oddoccasions/pages/product-detail.tsx`**

```typescript
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getSiteHref } from "@/lib/site-href"
import { getProductBySlug } from "../data/products"
import { getTestimonialsForProduct } from "../data/testimonials"
import { AddToCartButton } from "@/components/commerce/add-to-cart-button"

interface ProductDetailProps {
  slug: string
}

export default async function ProductDetail({ slug }: ProductDetailProps) {
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const siteHref = await getSiteHref()
  const testimonials = getTestimonialsForProduct(product.slug)

  return (
    <section className="bg-[#FFFDF8]">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-[#2D2D2D]/50">
          <Link href={siteHref("/shop")} className="hover:text-[#7C9A82] underline underline-offset-2">Shop</Link>
          <span className="mx-2">→</span>
          <span className="text-[#2D2D2D]/70">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Hero image */}
          <div className="relative aspect-square bg-white border border-[#7C9A82]/15 rounded-2xl overflow-hidden">
            <Image
              src={product.heroImage}
              alt={product.name}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              priority
              className="object-cover"
            />
          </div>

          {/* Product info */}
          <div>
            <p className="text-sm font-semibold tracking-widest uppercase text-[#D4A0A0]">
              Curated Gift Box
            </p>
            <h1 className="mt-3 text-3xl md:text-4xl font-bold text-[#2D2D2D] font-heading">{product.name}</h1>
            <p className="mt-4 text-lg italic text-[#2D2D2D]/80">{product.tagline}</p>

            <div className="mt-6 text-4xl font-bold text-[#2D2D2D]">{product.priceLabel}</div>

            <div className="mt-6">
              <AddToCartButton
                slug={product.slug}
                productName={product.name}
                className="px-8 py-3 bg-[#7C9A82] hover:bg-[#6B8972] text-white font-bold rounded-lg text-lg transition-colors"
                quips={[
                  "Thoughtful choice.",
                  "They're going to love this.",
                  "Consider it curated.",
                  "Added with care.",
                  "A gesture worth making.",
                  "Box secured.",
                ]}
              />
            </div>

            <p className="mt-8 text-[#2D2D2D]/80 leading-relaxed">{product.description}</p>
          </div>
        </div>

        {/* What's Inside */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-[#7C9A82] font-heading mb-8 text-center">What&apos;s Inside</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {product.items.map((item) => (
              <div key={item.name} className="bg-white border border-[#7C9A82]/15 rounded-xl overflow-hidden flex flex-col sm:flex-row">
                <div className="relative w-full sm:w-40 aspect-square sm:aspect-auto flex-shrink-0 bg-[#F5F0E8]/30">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(min-width: 640px) 160px, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-4 flex-1">
                  <div className="font-bold text-[#2D2D2D] font-heading">{item.name}</div>
                  <p className="mt-1 text-sm text-[#2D2D2D]/70">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        {testimonials.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-[#7C9A82] font-heading mb-8 text-center">What Recipients Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((t) => (
                <div key={t.name + t.quote.slice(0, 20)} className="bg-white border border-[#7C9A82]/15 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-[#F5F0E8]">
                      <Image src={t.image} alt={t.name} fill sizes="48px" className="object-cover" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#2D2D2D]">{t.name}</div>
                      <div className="text-xs text-[#2D2D2D]/60">{t.title}</div>
                    </div>
                  </div>
                  <p className="text-sm text-[#2D2D2D]/80 italic">&ldquo;{t.quote}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Back to shop CTA */}
        <div className="mt-16 text-center">
          <Link
            href={siteHref("/shop")}
            className="text-[#7C9A82] font-bold underline underline-offset-4 hover:text-[#6B8972]"
          >
            ← Browse all occasions
          </Link>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/sites/oddoccasions/pages/product-detail.tsx
git commit -m "feat(oddoccasions): add product detail page with items and testimonials"
```

---

### Task 7: About Page

**Files:**
- Create: `src/sites/oddoccasions/pages/about.tsx`

- [ ] **Step 1: Create `src/sites/oddoccasions/pages/about.tsx`**

```typescript
import Image from "next/image"
import { executives } from "../data/leadership"

export const metadata = {
  title: "Our Story — Odd Occasions",
  description: "How Odd Occasions was founded, and the team behind the world's most specific gift boxes.",
}

const milestones = [
  { year: "2018", event: "Gerald Bellweather spends two hours in a card shop looking for a card that says 'Sorry I accidentally liked your ex's photo from 2016.' Finds nothing. The idea is born." },
  { year: "2019", event: "First prototype box assembled: 'Sorry I Ate Your Labeled Lunch.' Gerald's coworker cries. The concept is validated." },
  { year: "2019", event: "Declan Ashworth joins as VP of Occasion Research after publishing a 47-page paper titled 'The Ungifted Moment: A Taxonomy of Unrecognized Human Experiences.'" },
  { year: "2020", event: "Theodore Lundy is hired as Head of Curation. His first act is replacing all tissue paper with 18gsm stock. 'It was the right thing to do,' he says." },
  { year: "2020", event: "The company catalogs its 500th specific occasion. 'Congrats on Parallel Parking on the First Try' is the milestone entry." },
  { year: "2021", event: "Fletcher Nye joins to lead Recipient Experience. His first recipient observation session lasts four hours. He describes it as 'revelatory.'" },
  { year: "2022", event: "Odd Occasions launches online. First order: 'Sorry I Ghosted You in 2019.' The irony is noted internally." },
  { year: "2023", event: "The 10,000th box is shipped. Gerald insists on hand-writing a note for it. It takes him forty-five minutes because the occasion was very specific." },
  { year: "2024", event: "The catalog reaches 30 curated boxes. Theodore describes the tissue paper supply chain as 'stable but vigilant.'" },
]

export default function OddOccasionsAbout() {
  return (
    <section className="bg-[#FFFDF8]">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
          <p className="text-sm font-semibold tracking-widest uppercase text-[#D4A0A0]">
            Est. 2018
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold text-[#2D2D2D] font-heading">Our Story</h1>
        </div>

        <div className="mt-10 space-y-6 text-[#2D2D2D]/80 leading-relaxed">
          <p>
            Odd Occasions was born from a simple frustration: the world is full of incredibly specific moments, and nobody makes gifts for them.
          </p>
          <p>
            Our founder, Gerald Bellweather, spent over two hours in a card shop in 2018 looking for something — anything — that acknowledged the specific situation he was in. He found cards for birthdays, anniversaries, sympathy, and graduation. He found nothing for &ldquo;Sorry I accidentally liked your ex&apos;s photo from 2016 while scrolling at 2am.&rdquo; He left empty-handed and furious.
          </p>
          <p>
            That night, he assembled the first Odd Occasions gift box on his kitchen table: a curated collection of items designed to address one very specific moment. He gave it to the person involved. They laughed. Then they cried a little. Then they said, &ldquo;How did you know?&rdquo;
          </p>
          <p>
            We&apos;ve been curating boxes for life&apos;s most specific moments ever since. Every box is assembled by hand, approved by our Head of Curation (who has strong opinions about tissue paper weight), and designed to make the recipient feel understood in a way they didn&apos;t know they needed.
          </p>
        </div>

        {/* Leadership */}
        <h2 className="mt-16 text-2xl font-bold text-[#7C9A82] text-center font-heading">The Team</h2>
        <p className="mt-2 text-center text-[#2D2D2D]/60 text-sm">Four people. Thirty boxes. An unreasonable amount of tissue paper.</p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {executives.map((exec) => (
            <div key={exec.slug} className="bg-white border border-[#7C9A82]/15 rounded-xl p-6 flex gap-4">
              <div className="relative w-24 h-24 flex-shrink-0 rounded-lg bg-[#F5F0E8] overflow-hidden">
                <Image src={exec.image} alt={exec.name} fill sizes="96px" className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-[#2D2D2D] font-heading">{exec.name}</div>
                <div className="text-xs text-[#D4A0A0] font-semibold uppercase tracking-wide">{exec.title}</div>
                <p className="mt-2 text-sm text-[#2D2D2D]/80">{exec.bio}</p>
                <p className="mt-2 text-xs italic text-[#2D2D2D]/60">&ldquo;{exec.quote}&rdquo;</p>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <h2 className="mt-16 text-2xl font-bold text-[#7C9A82] text-center font-heading">A Brief History of Specific Moments</h2>
        <div className="mt-8 space-y-6">
          {milestones.map((m, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-16 flex-shrink-0 text-right">
                <span className="font-bold text-[#7C9A82] font-heading">{m.year}</span>
              </div>
              <div className="w-px bg-[#7C9A82]/20 flex-shrink-0" />
              <p className="text-sm text-[#2D2D2D]/80 pb-2">{m.event}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/sites/oddoccasions/pages/about.tsx
git commit -m "feat(oddoccasions): add about page with leadership and timeline"
```

---

### Task 8: Contact, Privacy, and Terms Pages

**Files:**
- Create: `src/sites/oddoccasions/pages/contact.tsx`
- Create: `src/sites/oddoccasions/pages/privacy.tsx`
- Create: `src/sites/oddoccasions/pages/terms.tsx`

- [ ] **Step 1: Create `src/sites/oddoccasions/pages/contact.tsx`**

```typescript
import Image from "next/image"
import { executives } from "../data/leadership"

export const metadata = {
  title: "Contact — Odd Occasions",
  description: "Tell us about your specific occasion. We'll tell you if it deserves a box.",
}

export default function OddOccasionsContact() {
  return (
    <section className="bg-[#FFFDF8]">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
          <p className="text-sm font-semibold tracking-widest uppercase text-[#D4A0A0]">
            We&apos;re listening
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold text-[#2D2D2D] font-heading">
            Describe Your Occasion
          </h1>
          <p className="mt-3 text-[#2D2D2D]/70 max-w-2xl mx-auto">
            Think you&apos;ve experienced a moment that deserves its own gift box? Tell us about it. Our Occasion Research team reviews every submission.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {executives.map((exec) => (
            <div
              key={exec.slug}
              className="bg-white border border-[#7C9A82]/15 rounded-xl overflow-hidden flex flex-col"
            >
              <div className="relative aspect-square bg-[#F5F0E8]">
                <Image
                  src={exec.image}
                  alt={exec.name}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="p-3 text-center">
                <div className="font-bold text-[#2D2D2D] text-sm font-heading">{exec.name}</div>
                <div className="text-[10px] text-[#D4A0A0] font-semibold uppercase tracking-wide mt-0.5">
                  {exec.title}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white border border-[#7C9A82]/15 rounded-xl p-8">
          <h2 className="font-bold text-[#7C9A82] font-heading text-lg">Occasion Consultation Request</h2>
          <p className="mt-2 text-sm text-[#2D2D2D]/60">
            Fill out the form below and a member of our team will assess whether your situation merits a curated box.
          </p>
          <form className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#2D2D2D]/80 mb-1">Your name</label>
              <input
                type="text"
                placeholder="The person sending (or confessing)"
                className="w-full border border-[#7C9A82]/20 rounded-lg px-4 py-2 text-sm bg-[#FFFDF8]"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#2D2D2D]/80 mb-1">Describe the incident</label>
              <textarea
                placeholder="Be as specific as possible. We do not accept vague occasions."
                rows={4}
                className="w-full border border-[#7C9A82]/20 rounded-lg px-4 py-2 text-sm bg-[#FFFDF8]"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#2D2D2D]/80 mb-1">How long have you been carrying this?</label>
              <input
                type="text"
                placeholder="e.g., 'Since the office party in 2019'"
                className="w-full border border-[#7C9A82]/20 rounded-lg px-4 py-2 text-sm bg-[#FFFDF8]"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#2D2D2D]/80 mb-1">On a scale of 1-10, how specific is this situation?</label>
              <input
                type="text"
                placeholder="If it's below a 7, we may not be able to help"
                className="w-full border border-[#7C9A82]/20 rounded-lg px-4 py-2 text-sm bg-[#FFFDF8]"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#2D2D2D]/80 mb-1">Preferred gift wrapping emotion</label>
              <div className="flex flex-wrap gap-3 mt-1">
                {["Remorseful", "Celebratory", "Ambiguous", "Passive-Aggressive (with love)"].map((opt) => (
                  <label key={opt} className="flex items-center gap-2 text-sm text-[#2D2D2D]/70">
                    <input type="radio" name="emotion" disabled className="accent-[#7C9A82]" />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
            <button
              type="button"
              className="w-full bg-[#7C9A82]/20 text-[#7C9A82]/60 font-bold rounded-lg py-3 cursor-not-allowed"
              disabled
            >
              Submission queue currently under review by Theodore
            </button>
          </form>
        </div>

        <p className="mt-10 text-center text-[10px] text-[#2D2D2D]/40">
          For real inquiries: bsambrone@gmail.com
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create `src/sites/oddoccasions/pages/privacy.tsx`**

```typescript
export const metadata = {
  title: "Privacy Policy — Odd Occasions",
  description: "How Odd Occasions handles your data. Mostly, we notice your specific occasions.",
}

export default function OddOccasionsPrivacy() {
  return (
    <section className="bg-[#FFFDF8]">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-[#2D2D2D] font-heading">Privacy Policy</h1>

        <div className="mt-6 border-l-4 border-[#7C9A82] bg-[#7C9A82]/5 p-5 rounded-r-lg">
          <p className="font-bold text-[#2D2D2D] mb-1">Official Umbrella Policy</p>
          <p className="text-sm text-[#2D2D2D]/80">
            The authoritative privacy policy for all Specific Industries properties — including Odd Occasions — is maintained at{" "}
            <a href="https://specificindustries.com/privacy" className="underline font-bold text-[#7C9A82]">specificindustries.com/privacy</a>.
            The text below is provided for convenience and flavor; in the event of any conflict, the umbrella policy governs.
          </p>
        </div>

        <p className="mt-6 text-sm italic text-[#2D2D2D]/60">Last updated: the morning Theodore rearranged the tissue paper archive.</p>

        <h2 className="mt-8 text-xl font-bold text-[#D4A0A0] font-heading">1. What We Collect</h2>
        <p className="mt-2 text-[#2D2D2D]/80">
          We collect the minimum information necessary to process your order: name, shipping address, billing details, and a record of which specific occasions you have chosen to acknowledge. We take note of your browsing history only insofar as it reveals which awkward moments resonate most deeply with you. We consider this a feature, not a vulnerability.
        </p>

        <h2 className="mt-6 text-xl font-bold text-[#D4A0A0] font-heading">2. How We Use Your Data</h2>
        <p className="mt-2 text-[#2D2D2D]/80">
          Your data is used to ship your curated gift boxes and to occasionally remind you that other specific occasions exist which you may not have considered. We track which occasions you browse most frequently. This data is used exclusively to judge you internally and to improve our catalog.
        </p>

        <h2 className="mt-6 text-xl font-bold text-[#D4A0A0] font-heading">3. What We Will Not Do</h2>
        <p className="mt-2 text-[#2D2D2D]/80">
          We will not share your gift selections with the recipient. Unless doing so would be funnier. (We have never exercised this clause, but we reserve the right.) We will not sell your data to greeting card companies, life coaches, or anyone who might use your browsing history to infer the state of your personal relationships.
        </p>

        <h2 className="mt-6 text-xl font-bold text-[#D4A0A0] font-heading">4. Cookies</h2>
        <p className="mt-2 text-[#2D2D2D]/80">
          Cookies are used to remember which awkward moments you have acknowledged and which gift boxes are in your cart. Deleting cookies does not delete the memory of the occasion. That part is between you and the other person.
        </p>

        <h2 className="mt-6 text-xl font-bold text-[#D4A0A0] font-heading">5. Occasion Data Retention</h2>
        <p className="mt-2 text-[#2D2D2D]/80">
          We retain a record of your purchases for as long as the specific occasion remains culturally relevant. Given the nature of our products, this is often indefinitely. The guilt from eating someone&apos;s labeled lunch does not expire, and neither does our record of you buying a box about it.
        </p>

        <p className="mt-10 text-sm italic text-[#2D2D2D]/60 pt-4 border-t border-[#7C9A82]/20">
          For binding legal terms, always refer to the Specific Industries umbrella policy at{" "}
          <a href="https://specificindustries.com/privacy" className="underline text-[#7C9A82]">specificindustries.com/privacy</a>.
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Create `src/sites/oddoccasions/pages/terms.tsx`**

```typescript
export const metadata = {
  title: "Terms of Use — Odd Occasions",
  description: "The terms governing your use of the Odd Occasions curated gift box platform.",
}

export default function OddOccasionsTerms() {
  return (
    <section className="bg-[#FFFDF8]">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-[#2D2D2D] font-heading">Terms of Use</h1>

        <div className="mt-6 border-l-4 border-[#7C9A82] bg-[#7C9A82]/5 p-5 rounded-r-lg">
          <p className="font-bold text-[#2D2D2D] mb-1">Official Umbrella Policy</p>
          <p className="text-sm text-[#2D2D2D]/80">
            The authoritative terms of use for all Specific Industries properties — including Odd Occasions — are maintained at{" "}
            <a href="https://specificindustries.com/terms" className="underline font-bold text-[#7C9A82]">specificindustries.com/terms</a>.
            The text below is provided for convenience and flavor; in the event of any conflict, the umbrella policy governs.
          </p>
        </div>

        <h2 className="mt-8 text-xl font-bold text-[#D4A0A0] font-heading">1. Acknowledgment of Occasion</h2>
        <p className="mt-2 text-[#2D2D2D]/80">
          By purchasing a gift box, you acknowledge that the occasion in question actually occurred. Odd Occasions does not verify the truthfulness of occasions but reserves the right to be impressed by particularly creative ones.
        </p>

        <h2 className="mt-6 text-xl font-bold text-[#D4A0A0] font-heading">2. Recipient Reactions</h2>
        <p className="mt-2 text-[#2D2D2D]/80">
          Odd Occasions assumes no liability for emotional closure implied by gift delivery. Recipient reactions including but not limited to confused silence, nervous laughter, unexpected tears, and &ldquo;you didn&apos;t have to do that&rdquo; are considered successful delivery outcomes. If the recipient says &ldquo;How did you know?&rdquo; please contact our team, as this is our gold standard metric and we would like to record it.
        </p>

        <h2 className="mt-6 text-xl font-bold text-[#D4A0A0] font-heading">3. Refund Policy</h2>
        <p className="mt-2 text-[#2D2D2D]/80">
          Refunds are available only if the specific occasion turns out to have never happened. Proof of non-occurrence must be submitted in writing and co-signed by at least one witness. Buyer&apos;s remorse about acknowledging an awkward moment is not grounds for a refund — that&apos;s called growth.
        </p>

        <h2 className="mt-6 text-xl font-bold text-[#D4A0A0] font-heading">4. Re-Gifting</h2>
        <p className="mt-2 text-[#2D2D2D]/80">
          Re-gifting an Odd Occasions box to address a different specific occasion voids all emotional warranties. Each box is curated for one occasion. Using the &ldquo;Sorry I Ate Your Labeled Lunch&rdquo; box to apologize for something unrelated to lunch diminishes the gift and, frankly, us.
        </p>

        <h2 className="mt-6 text-xl font-bold text-[#D4A0A0] font-heading">5. Specificity Clause</h2>
        <p className="mt-2 text-[#2D2D2D]/80">
          Odd Occasions reserves the right to refuse service to any occasion deemed insufficiently specific. &ldquo;Happy Birthday&rdquo; is not specific. &ldquo;Happy Birthday to Someone Who Shares a Birthday with Their Dentist and Found Out in the Waiting Room&rdquo; is. We exist for the latter.
        </p>

        <h2 className="mt-6 text-xl font-bold text-[#D4A0A0] font-heading">6. Tissue Paper</h2>
        <p className="mt-2 text-[#2D2D2D]/80">
          All gift boxes are wrapped in 18gsm tissue paper selected by our Head of Curation. This weight is non-negotiable. Requests for heavier or lighter tissue paper will be noted and declined. Theodore has spoken.
        </p>

        <p className="mt-10 text-sm italic text-[#2D2D2D]/60 pt-4 border-t border-[#7C9A82]/20">
          For binding legal terms, always refer to the Specific Industries umbrella policy at{" "}
          <a href="https://specificindustries.com/terms" className="underline text-[#7C9A82]">specificindustries.com/terms</a>.
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add src/sites/oddoccasions/pages/contact.tsx src/sites/oddoccasions/pages/privacy.tsx src/sites/oddoccasions/pages/terms.tsx
git commit -m "feat(oddoccasions): add contact, privacy, and terms pages"
```

---

### Task 9: Cart and Checkout Pages

**Files:**
- Create: `src/sites/oddoccasions/pages/cart.tsx`
- Create: `src/sites/oddoccasions/pages/checkout.tsx`

- [ ] **Step 1: Create `src/sites/oddoccasions/pages/cart.tsx`**

```typescript
"use client"

import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/components/commerce/cart-provider"
import { getProductBySlug } from "@/sites/oddoccasions/data/products"
import { useSiteLink } from "@/hooks/use-site-link"

const CURATION_FEE = 3.99
const TISSUE_PAPER_SURCHARGE_RATE = 0.042

export default function OddOccasionsCart() {
  const { cart, removeFromCart, updateQuantity } = useCart()
  const siteHref = useSiteLink()

  const cartItems = cart
    .map((item) => {
      const product = getProductBySlug(item.slug)
      return product ? { ...item, product } : null
    })
    .filter(Boolean) as Array<{ slug: string; quantity: number; product: NonNullable<ReturnType<typeof getProductBySlug>> }>

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const tissuePaperFee = subtotal * TISSUE_PAPER_SURCHARGE_RATE
  const total = subtotal + CURATION_FEE + tissuePaperFee

  if (cartItems.length === 0) {
    return (
      <section className="py-20 px-4 text-center bg-[#FFFDF8]">
        <div className="max-w-lg mx-auto">
          <h1 className="text-4xl font-bold text-[#2D2D2D] mb-4 font-heading">Your Cart</h1>
          <p className="text-[#2D2D2D]/60 mb-8">
            No curated gift boxes in your cart yet. Every specific occasion is waiting.
          </p>
          <Link
            href={siteHref("/shop")}
            className="inline-block px-8 py-3 bg-[#7C9A82] text-white rounded-lg font-semibold hover:bg-[#6B8972] transition-colors"
          >
            Browse Occasions
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 px-4 bg-[#FFFDF8]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#2D2D2D] mb-8 font-heading">Your Cart</h1>

        <div className="divide-y divide-[#7C9A82]/10">
          {cartItems.map(({ slug, quantity, product }) => (
            <div key={slug} className="py-6 flex gap-4 items-center">
              <div className="relative w-20 h-20 rounded-lg bg-[#F5F0E8] shrink-0 overflow-hidden">
                <Image src={product.heroImage} alt={product.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <Link href={siteHref(`/shop/${slug}`)} className="font-bold text-[#2D2D2D] hover:text-[#7C9A82] font-heading">
                  {product.name}
                </Link>
                <p className="text-[#2D2D2D]/60 text-sm">{product.priceLabel}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(slug, quantity - 1)}
                  className="w-8 h-8 rounded border border-[#7C9A82]/20 text-[#2D2D2D]/60 hover:border-[#7C9A82]/40 flex items-center justify-center"
                >
                  -
                </button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => updateQuantity(slug, quantity + 1)}
                  className="w-8 h-8 rounded border border-[#7C9A82]/20 text-[#2D2D2D]/60 hover:border-[#7C9A82]/40 flex items-center justify-center"
                >
                  +
                </button>
              </div>
              <div className="w-24 text-right font-semibold text-[#2D2D2D]">
                ${(product.price * quantity).toFixed(2)}
              </div>
              <button
                onClick={() => removeFromCart(slug)}
                className="text-[#2D2D2D]/40 hover:text-[#2D2D2D]/70 ml-2"
                aria-label="Remove"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-[#7C9A82]/10 pt-8">
          <div className="max-w-xs ml-auto space-y-2">
            <div className="flex justify-between text-[#2D2D2D]/70">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[#2D2D2D]/70">
              <span>Hand-Curation Fee</span>
              <span>${CURATION_FEE.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[#2D2D2D]/70">
              <span>Premium Tissue Paper Surcharge (4.2%)</span>
              <span>${tissuePaperFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-[#2D2D2D] border-t border-[#7C9A82]/10 pt-2 mt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-8 text-right">
            <Link
              href={siteHref("/checkout")}
              className="inline-block px-8 py-3 bg-[#7C9A82] text-white rounded-lg font-semibold hover:bg-[#6B8972] transition-colors"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create `src/sites/oddoccasions/pages/checkout.tsx`**

```typescript
"use client"

import Link from "next/link"
import { FakeProgressBar } from "@/components/ui/fake-progress-bar"
import { useSiteLink } from "@/hooks/use-site-link"

export default function OddOccasionsCheckout() {
  const siteHref = useSiteLink()

  return (
    <section className="py-20 px-4 text-center bg-[#FFFDF8]">
      <div className="max-w-lg mx-auto">
        <h1 className="text-4xl font-bold text-[#2D2D2D] mb-4 font-heading">
          Checkout Paused for Curation Review
        </h1>
        <p className="text-[#2D2D2D]/70 mb-8">
          Our Head of Curation, Theodore Lundy, is personally reviewing the tissue paper inventory to ensure your box meets our 18gsm standard. He has been in the stockroom since Tuesday. We expect him back when he&apos;s satisfied, which is historically unpredictable.
        </p>
        <div className="mb-8">
          <FakeProgressBar />
        </div>
        <p className="text-[#2D2D2D]/50 text-sm mb-8">
          Estimated completion: When the tissue paper situation is resolved.
        </p>
        <Link
          href={siteHref("/shop")}
          className="inline-block px-8 py-3 bg-[#7C9A82] text-white rounded-lg font-semibold hover:bg-[#6B8972] transition-colors"
        >
          Continue Browsing Occasions
        </Link>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/sites/oddoccasions/pages/cart.tsx src/sites/oddoccasions/pages/checkout.tsx
git commit -m "feat(oddoccasions): add cart and checkout pages"
```

---

### Task 10: Barrel Export and Registry

**Files:**
- Create: `src/sites/oddoccasions/index.ts`
- Modify: `src/sites/registry.ts`

- [ ] **Step 1: Create `src/sites/oddoccasions/index.ts`**

```typescript
import { config } from "./config"
import type { PageEntry, DynamicRoute } from "@/themes"
import { getProductBySlug } from "./data/products"

import OddOccasionsHome from "./pages/home"
import OddOccasionsShop, { metadata as shopMetadata } from "./pages/shop"
import OddOccasionsAbout, { metadata as aboutMetadata } from "./pages/about"
import OddOccasionsContact, { metadata as contactMetadata } from "./pages/contact"
import OddOccasionsPrivacy, { metadata as privacyMetadata } from "./pages/privacy"
import OddOccasionsTerms, { metadata as termsMetadata } from "./pages/terms"
import OddOccasionsCart from "./pages/cart"
import OddOccasionsCheckout from "./pages/checkout"
import ProductDetail from "./pages/product-detail"

export { config }

export const pages: Record<string, PageEntry> = {
  "": OddOccasionsHome,
  "shop": { component: OddOccasionsShop, metadata: shopMetadata },
  "about": { component: OddOccasionsAbout, metadata: aboutMetadata },
  "contact": { component: OddOccasionsContact, metadata: contactMetadata },
  "privacy": { component: OddOccasionsPrivacy, metadata: privacyMetadata },
  "terms": { component: OddOccasionsTerms, metadata: termsMetadata },
  "cart": OddOccasionsCart,
  "checkout": OddOccasionsCheckout,
}

export const dynamicRoutes: Record<string, DynamicRoute> = {
  shop: {
    component: ProductDetail,
    getMetadata: (slug: string) => {
      const product = getProductBySlug(slug)
      return product
        ? { title: `${product.name} — Odd Occasions`, description: product.tagline }
        : undefined
    },
    isValidSlug: (slug: string) => !!getProductBySlug(slug),
  },
}
```

- [ ] **Step 2: Add oddoccasions to `src/sites/registry.ts`**

Add the import at the end of the import block:

```typescript
import { config as oddoccasionsConfig, pages as oddoccasionsPages, dynamicRoutes as oddoccasionsDynamicRoutes } from "./oddoccasions"
```

Add the registry entry at the end of the `siteRegistry` object:

```typescript
oddoccasions: { config: oddoccasionsConfig, pages: oddoccasionsPages, dynamicRoutes: oddoccasionsDynamicRoutes },
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit 2>&1 | head -30`
Expected: PASS (no errors)

- [ ] **Step 4: Verify lint passes**

Run: `npm run lint 2>&1 | tail -20`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/sites/oddoccasions/index.ts src/sites/registry.ts
git commit -m "feat(oddoccasions): add barrel export and register in site registry"
```

---

### Task 11: Build Verification and Dev Test

- [ ] **Step 1: Run production build**

Run: `npm run build 2>&1 | tail -30`
Expected: Build succeeds with no errors.

- [ ] **Step 2: Test dev server loads**

Run: `npm run dev &` then after a few seconds, `curl -s http://localhost:3000/?site=oddoccasions | head -50`
Expected: HTML response containing "Odd Occasions" content.

- [ ] **Step 3: Test shop page loads**

Run: `curl -s http://localhost:3000/shop?site=oddoccasions | head -50`
Expected: HTML response with product content.

- [ ] **Step 4: Test dynamic route loads**

Run: `curl -s http://localhost:3000/shop/sorry-i-ate-your-labeled-lunch-in-2017?site=oddoccasions | head -50`
Expected: HTML response with product detail content.

- [ ] **Step 5: Stop dev server and commit if any fixes were needed**

Run: `kill %1` (or appropriate PID)

---

### Task 12: Generate Images — Executive Portraits

**Files:**
- Output to: `public/sites/oddoccasions/exec-bellweather.png`, `exec-ashworth.png`, `exec-lundy.png`, `exec-nye.png`

Use the **image-gen MCP tool** (`mcp__image-gen__generate_image_with_person`) for each executive portrait. Use the reference person photos as the base and style them to match the boutique gift shop theme.

- [ ] **Step 1: Generate Gerald Bellweather portrait (referencePerson: bill)**

Use image-gen with person reference for "bill". Prompt: "Professional portrait of a warm, approachable man in his 50s wearing a cozy cardigan, soft lighting, cream/sage color palette, boutique gift shop owner aesthetic, friendly genuine smile, clean background"

Save to: `public/sites/oddoccasions/exec-bellweather.png`

- [ ] **Step 2: Generate Declan Ashworth portrait (referencePerson: brandon)**

Use image-gen with person reference for "brandon". Prompt: "Professional portrait of an earnest man in his 40s wearing reading glasses, holding a clipboard, soft lighting, cream/sage color palette, researcher aesthetic, warm expression, clean background"

Save to: `public/sites/oddoccasions/exec-ashworth.png`

- [ ] **Step 3: Generate Theodore Lundy portrait (referencePerson: jim)**

Use image-gen with person reference for "jim". Prompt: "Professional portrait of a detail-oriented man in his 40s wearing a craftsman's apron, soft lighting, cream/sage color palette, artisan workshop aesthetic, focused but friendly expression, clean background"

Save to: `public/sites/oddoccasions/exec-lundy.png`

- [ ] **Step 4: Generate Fletcher Nye portrait (referencePerson: sean)**

Use image-gen with person reference for "sean". Prompt: "Professional portrait of a friendly man in his 30s, warm customer service professional aesthetic, soft lighting, cream/sage color palette, approachable expression, clean background"

Save to: `public/sites/oddoccasions/exec-nye.png`

- [ ] **Step 5: Commit**

```bash
git add public/sites/oddoccasions/exec-*.png
git commit -m "feat(oddoccasions): add executive portrait images"
```

---

### Task 13: Generate Images — Homepage Hero

**Files:**
- Output to: `public/sites/oddoccasions/home-hero.png`

- [ ] **Step 1: Generate homepage hero image**

Use image-gen MCP. Prompt: "A collection of beautifully wrapped gift boxes arranged on a warm wooden table, soft natural lighting, cream and sage green and dusty rose color palette, boutique gift shop aesthetic, no text in image, warm inviting atmosphere, shallow depth of field"

Save to: `public/sites/oddoccasions/home-hero.png`

- [ ] **Step 2: Commit**

```bash
git add public/sites/oddoccasions/home-hero.png
git commit -m "feat(oddoccasions): add homepage hero image"
```

---

### Task 14: Generate Images — Product Hero Images (Batch 1: Workplace, products 1-7)

**Files:**
- Output to: `public/sites/oddoccasions/products/` (7 images)

Use image-gen MCP for each product. All images should be **text-free product photography** — curated gift box on a clean warm background, soft lighting, cream/sage/rose palette.

- [ ] **Step 1: Generate hero images for all 7 workplace products**

For each product, generate a text-free image of a gift box with visible items inside or artfully arranged around it. Prompts should be specific to each box's contents but never include readable text.

Product slugs and suggested prompts:
1. `sorry-lunch-hero.png` — "Elegant gift box with a wrapped sandwich, parchment scroll, small brass lock, and certificate arranged on cream background, warm lighting, no text"
2. `mild-promotion-hero.png` — "Gift box with business card holder, small desk plaque, single party horn, and cider bottle, warm lighting, cream background, no text"
3. `reply-all-hero.png` — "Gift box with a medallion, enamel pin, tea tin, and ribbon arranged on cream background, soft lighting, no text"
4. `unmuted-rant-hero.png` — "Gift box with USB button, folded document, pamphlet, and candle arranged on cream background, warm lighting, no text"
5. `last-day-hero.png` — "Gift box with greeting card, lanyard, small photo frame, and coffee bag arranged on cream background, no text"
6. `reorg-hero.png` — "Gift box with folded chart, coffee mug, stress ball, and framed print arranged on cream background, warm lighting, no text"
7. `parking-spot-hero.png` — "Gift box with air freshener, certificate, folded map, and small gift card arranged on cream background, no text"

Save all to `public/sites/oddoccasions/products/`

- [ ] **Step 2: Commit**

```bash
git add public/sites/oddoccasions/products/
git commit -m "feat(oddoccasions): add workplace product hero images"
```

---

### Task 15: Generate Images — Product Hero Images (Batch 2: Social, products 8-13)

**Files:**
- Output to: `public/sites/oddoccasions/products/` (6 images)

- [ ] **Step 1: Generate hero images for all 6 social products**

Product slugs and suggested prompts:
1. `networking-event-hero.png` — "Gift box with framed document, folded note, pen, and business card on cream background, warm lighting, no text"
2. `ghosted-2019-hero.png` — "Gift box with handwritten timeline, candle, form document, and framed card on cream background, warm lighting, no text"
3. `cooking-hero.png` — "Gift box with antacid tin, seasoning jars, embroidered napkin, and folded menu on cream background, warm lighting, no text"
4. `guitar-party-hero.png` — "Gift box with shadow box frame, sheet of paper, small guidebook, and aux cord on cream background, warm lighting, no text"
5. `group-chat-birthday-hero.png` — "Gift box with single candle, greeting card, confetti packet, and framed screenshot on cream background, warm lighting, no text"
6. `canceled-plans-hero.png` — "Gift box with fabric swatch, small booklet, popcorn bag, and recommendation card on cream background, warm lighting, no text"

Save all to `public/sites/oddoccasions/products/`

- [ ] **Step 2: Commit**

```bash
git add public/sites/oddoccasions/products/
git commit -m "feat(oddoccasions): add social product hero images"
```

---

### Task 16: Generate Images — Product Hero Images (Batch 3: Digital Life, products 14-19)

**Files:**
- Output to: `public/sites/oddoccasions/products/` (6 images)

- [ ] **Step 1: Generate hero images for all 6 digital life products**

Product slugs and suggested prompts:
1. `free-trial-hero.png` — "Gift box with dried flower bouquet, memorial card, pamphlet, and wall calendar on cream background, warm lighting, no text"
2. `screen-time-hero.png` — "Gift box with certificate, blue light glasses, phone stand, and small bottle on cream background, warm lighting, no text"
3. `viral-post-hero.png` — "Gift box with framed image, satin sash, novelty calculator, and journal on cream background, warm lighting, no text"
4. `reply-guy-hero.png` — "Gift box with polishing cloth, spray bottle, location list, and plush button on cream background, warm lighting, no text"
5. `password-hero.png` — "Gift box with leather journal, workbook, gold-bordered sticky note, and pencil on cream background, warm lighting, no text"
6. `dropped-phone-hero.png` — "Gift box with phone case, guidebook, affirmation card, and gift card on cream background, warm lighting, no text"

Save all to `public/sites/oddoccasions/products/`

- [ ] **Step 2: Commit**

```bash
git add public/sites/oddoccasions/products/
git commit -m "feat(oddoccasions): add digital life product hero images"
```

---

### Task 17: Generate Images — Product Hero Images (Batch 4: Family, products 20-24)

**Files:**
- Output to: `public/sites/oddoccasions/products/` (5 images)

- [ ] **Step 1: Generate hero images for all 5 family products**

Product slugs and suggested prompts:
1. `mothers-favorite-hero.png` — "Gift box with peace treaty document, satin ribbon, framed photo, and coupon on cream background, warm lighting, no text"
2. `not-telling-mom-hero.png` — "Gift box with wax seal kit, journal, redacted document, and snack assortment on cream background, warm lighting, no text"
3. `moved-back-in-hero.png` — "Gift box with small doormat, document kit, mini cactus, and apartment listing on cream background, warm lighting, no text"
4. `taught-word-hero.png` — "Gift box with small trophy, flash cards, incident report, and earplugs on cream background, warm lighting, no text"
5. `family-it-hero.png` — "Gift box with iron-on patch, journal, laminated flowchart, and business cards on cream background, warm lighting, no text"

Save all to `public/sites/oddoccasions/products/`

- [ ] **Step 2: Commit**

```bash
git add public/sites/oddoccasions/products/
git commit -m "feat(oddoccasions): add family product hero images"
```

---

### Task 18: Generate Images — Product Hero Images (Batch 5: Milestones, products 25-30)

**Files:**
- Output to: `public/sites/oddoccasions/products/` (6 images)

- [ ] **Step 1: Generate hero images for all 6 milestone products**

Product slugs and suggested prompts:
1. `insurance-hero.png` — "Gift box with pamphlet, pronunciation guide, single pill packet, and tea sachet on cream background, warm lighting, no text"
2. `10000-days-hero.png` — "Gift box with certificate, desk counter, single candle, and small journal on cream background, warm lighting, no text"
3. `sourdough-hero.png` — "Gift box with glass jar, sympathy card, starter kit, and fridge magnet on cream background, warm lighting, no text"
4. `gym-hero.png` — "Gift box with achievement medal, towel, protein bar, and framed quote on cream background, warm lighting, no text"
5. `streaming-divorce-hero.png` — "Gift box with counseling card, watchlist booklet, login card, and popcorn bag on cream background, warm lighting, no text"
6. `restaurant-closed-hero.png` — "Gift box with reprinted menu, recipe kit, candle, and gift card on cream background, warm lighting, no text"

Save all to `public/sites/oddoccasions/products/`

- [ ] **Step 2: Commit**

```bash
git add public/sites/oddoccasions/products/
git commit -m "feat(oddoccasions): add milestone product hero images"
```

---

### Task 19: Generate Images — Item Images (Batch 1: Products 1-10)

**Files:**
- Output to: `public/sites/oddoccasions/items/` (~40 images)

Generate individual item images for products 1-10. Each item should be a clean, text-free product shot on a warm background. These are the individual items within each gift box.

- [ ] **Step 1: Generate all item images for products 1-10 (approximately 40 images)**

For each item in products 1-10, generate a single product photograph. Use the item name as the basis for the prompt, always adding "on cream/warm background, soft lighting, product photography, no text, no labels".

Save to `public/sites/oddoccasions/items/` using the filenames defined in the product data.

- [ ] **Step 2: Commit**

```bash
git add public/sites/oddoccasions/items/
git commit -m "feat(oddoccasions): add item images batch 1 (products 1-10)"
```

---

### Task 20: Generate Images — Item Images (Batch 2: Products 11-20)

**Files:**
- Output to: `public/sites/oddoccasions/items/` (~40 images)

- [ ] **Step 1: Generate all item images for products 11-20 (approximately 40 images)**

Same approach as Task 19 for the next 10 products.

- [ ] **Step 2: Commit**

```bash
git add public/sites/oddoccasions/items/
git commit -m "feat(oddoccasions): add item images batch 2 (products 11-20)"
```

---

### Task 21: Generate Images — Item Images (Batch 3: Products 21-30)

**Files:**
- Output to: `public/sites/oddoccasions/items/` (~40 images)

- [ ] **Step 1: Generate all item images for products 21-30 (approximately 40 images)**

Same approach as Tasks 19-20 for the final 10 products.

- [ ] **Step 2: Commit**

```bash
git add public/sites/oddoccasions/items/
git commit -m "feat(oddoccasions): add item images batch 3 (products 21-30)"
```

---

### Task 22: Generate Favicon

**Files:**
- Output to: `public/sites/oddoccasions/favicon.png`

- [ ] **Step 1: Generate favicon**

Use image-gen MCP. Prompt: "Simple icon of a gift box with a bow, sage green and dusty rose colors, minimal flat design, square format suitable for favicon, no text, clean white background"

Save to: `public/sites/oddoccasions/favicon.png`

- [ ] **Step 2: Commit**

```bash
git add public/sites/oddoccasions/favicon.png
git commit -m "feat(oddoccasions): add favicon"
```

---

### Task 23: Final Build Verification

- [ ] **Step 1: Run TypeScript check**

Run: `npx tsc --noEmit 2>&1 | head -30`
Expected: No errors

- [ ] **Step 2: Run lint**

Run: `npm run lint 2>&1 | tail -20`
Expected: No errors

- [ ] **Step 3: Run production build**

Run: `npm run build 2>&1 | tail -30`
Expected: Build succeeds

- [ ] **Step 4: Manual dev server smoke test**

Start dev server, verify these URLs all load:
- `localhost:3000/?site=oddoccasions` — homepage
- `localhost:3000/shop?site=oddoccasions` — shop page
- `localhost:3000/shop/sorry-i-ate-your-labeled-lunch-in-2017?site=oddoccasions` — product detail
- `localhost:3000/about?site=oddoccasions` — about page
- `localhost:3000/contact?site=oddoccasions` — contact page
- `localhost:3000/privacy?site=oddoccasions` — privacy page
- `localhost:3000/terms?site=oddoccasions` — terms page
- `localhost:3000/cart?site=oddoccasions` — cart page

- [ ] **Step 5: Commit any final fixes**

```bash
git add -A
git commit -m "feat(oddoccasions): final build verification and fixes"
```

---

### Task 24: Push to Main

- [ ] **Step 1: Push to main**

```bash
git push origin main
```
