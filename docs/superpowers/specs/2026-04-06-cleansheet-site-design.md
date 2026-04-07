# The Clean Sheet — Site Design Spec

**Subdomain:** `cleansheet`
**Site Name:** The Clean Sheet
**Tagline:** "Definitely Not Money Laundering. Just Laundering."
**Established:** 1987
**Concept:** An upscale boutique laundromat that cannot stop unpromptedly denying it's a money laundering front. Every piece of copy is a laundry/money double entendre played completely straight.

---

## Identity & Voice

**What it is:** A premium fabric care service website that looks like a luxury spa or high-end linen company. Sterile, pristine, clinically clean.

**What makes it funny:** The site commits fully to being "just a laundromat" while every detail — pricing in the tens of thousands, offshore facilities, "no questions asked" policies, a contact form that profiles criminals — screams money laundering front. The site never winks.

**Voice rules:**
1. **Unprompted denials** — Regularly insist "this is definitely not money laundering" when nobody asked. The Streisand effect is the core joke.
2. **Suspicious specificity** — Pricing makes no sense for laundry. "Discreet" and "confidential" appear constantly. NDAs mentioned casually.
3. **Laundry/money puns played straight** — "dirty loads," "clean returns," "the full cycle," "spin," "pressing matters," "rinse and repeat." Never acknowledged as puns.
4. **Corporate earnestness** — Reads like a real premium service website. No meta-humor, no winking.

---

## Theme & Visual Design

**Preset:** `clinical`

| Token | Hex | Usage |
|-------|-----|-------|
| primary | `#2C3E50` | Headings, nav, primary text |
| secondary | `#3498DB` | Ice blue accents, links, CTAs |
| accent | `#ECF0F1` | Backgrounds, cards, dividers |
| background | `#FFFFFF` | Page background |
| text | `#2C3E50` | Body text |
| muted | `#95A5A6` | Secondary text, captions |

**Typography:**
- Headings: Playfair Display (serif — luxury/heritage feel)
- Body: Inter (clean, clinical sans-serif)

**Visual feel:** Whites, light grays, ice blue accents. Sterile and pristine. The cleanliness of the design reinforces the joke — everything looks *too* clean, like evidence has been scrubbed.

---

## Sitemap & Navigation

**Nav items:** Home | Services | About | Leadership | Contact

| Route | Type | Description |
|-------|------|-------------|
| `/` | Static | Homepage |
| `/services` | Static | Full service menu with pricing |
| `/about` | Static | Founding story and "our process" |
| `/leadership` | Static | Team bios with portraits |
| `/contact` | Static | Contact info + satirical intake form |
| `/privacy` | Static | Privacy policy |
| `/terms` | Static | Terms of service |

**Total:** 7 routes, all static. No commerce, no dynamic routes.

---

## Page-by-Page Content

### Homepage (`/`)

**Hero:**
- Headline: "Definitely Not Money Laundering. Just Laundering."
- Subtext: "Premium fabric care for discerning clients since 1987. We clean clothes. That's it. Please stop asking."
- CTA: "View Our Services" / "Request Discreet Consultation"
- Image: Pristine, bright laundromat interior — gleaming machines, white marble, no one around

**Trust Metrics Strip:**
- "$4.2B in garments processed"
- "Zero investigations completed"
- "100% of loads returned clean"
- "37 years of discreet service"

**Service Highlights:**
- Top 3 services (The Fresh Start, The Full Cycle, Offshore Dry Cleaning) as cards with brief descriptions and "Learn More" links to the services page

**Testimonials:**
- 3-4 fake testimonials from suspiciously specific clients:
  - "The Clean Sheet handled a very large, very urgent load for me with no questions asked. I cannot stress enough how important the 'no questions asked' part was." — *Tony R., Waste Management*
  - "I needed my items cleaned quickly and moved through multiple facilities across three countries. The Clean Sheet made it look routine. Because it was. Routine laundry." — *Anonymous*
  - "After a difficult situation involving a large amount of... linens, The Clean Sheet processed everything overnight. The paperwork was impeccable." — *Dmitri K., Import/Export*
  - "My accountant recommended The Clean Sheet. I didn't ask why my accountant had opinions about laundromats, and frankly, I don't want to know." — *Name Withheld*

**CTA Banner:**
- "Ready for a Fresh Start? Your first consultation is always off the record."

### Services (`/services`)

**Intro Section:**
- "The Clean Sheet offers a full spectrum of laundering services. And by laundering, we mean laundry. Obviously."

**Service Menu — 6 services, each with its own section:**

| Service | Price | Tagline | Description |
|---------|-------|---------|-------------|
| The Fresh Start | $5,000/load | "Everyone deserves a clean beginning." | "Our entry-level service. We take your dirtiest items and return them spotless. No questions asked about where the stains came from." |
| The Full Cycle | $25,000/load | "From dirty to documented." | "Complete processing from intake to return. Your items enter dirty and leave with full documentation of their cleaning history. Ideal for items that need a verifiable provenance." |
| Offshore Dry Cleaning | $50,000/load | "Some fabrics need international expertise." | "We ship to our overseas facilities in the Cayman Islands, Switzerland, and Panama for specialized treatment. Extended processing times reflect the thoroughness of our international cleaning protocols." |
| Bulk Processing | Custom quote | "We handle loads of any size." | "High-volume clients with large, recurring loads. We process any amount — our capacity is virtually unlimited. Volume discounts available for loads exceeding $1M. Contact us for a discreet quote." |
| The Executive Press | $100,000/load | "White-glove service for white-collar garments." | "Our top-tier offering. Dedicated account manager, private drop-off suite, and absolute confidentiality. Your items are handled by our most senior staff. NDA included at no additional charge." |
| Stain Consultation | Free | "Some stains require creative solutions." | "Book a private, off-the-record consultation to discuss your most challenging items. Our specialists have seen it all and judged none of it. Attorney-client privilege does not apply, but we wish it did." |

**Each service section includes:**
- Service name, price, and description
- "What's included" bullet list with more double entendres
- An image of pristine laundry equipment or folded garments

**Clean Slate Club — Loyalty Program:**
- **Rinse Tier** (0-10 loads/year) — "Basic access. Standard processing times. Documentation provided upon request."
- **Spin Tier** (10-50 loads/year) — "Priority processing, dedicated account manager, after-hours drop-off access. We start remembering your name but not your face."
- **Pressed Tier** (50+ loads/year) — "Offshore facility access, no documentation required, private entrance, emergency overnight processing. For clients who value speed and anonymity in equal measure."

**FAQ Section:**
- "Why are your prices so much higher than other laundromats?" — "Quality has a cost. Discretion has a premium."
- "Do you accept cash?" — "We prefer cash. In fact, we strongly prefer cash. Large denominations are welcome. We do not report transactions under $10,000, and we are very good at counting to $9,999."
- "What documentation do you provide?" — "Every load comes with a complete paper trail showing legitimate cleaning services rendered. Our receipts have been described as 'suspiciously thorough' by several CPAs."
- "Is there a limit on load size?" — "No. We have processed loads that would make other facilities uncomfortable. Our industrial equipment can handle anything."
- "What is your privacy policy?" — "We don't know who you are. We've never met you. This interaction never happened. Also, please see our Privacy Policy page."

### About (`/about`)

**Hero:**
- Headline: "A Cleaner World, One Load at a Time"
- Subtext: "Founded in 1987 by a family that saw an opportunity to clean up the neighborhood. Literally."
- Image: Vintage-style photo of a pristine laundromat storefront

**Founding Story Section:**
- The Clean Sheet was founded in 1987 when the founders "noticed that the neighborhood had a lot of dirty laundry — both figuratively and literally." What started as a single storefront has grown into a multi-facility operation with international reach. "We've always believed that no matter how dirty something is, with the right process, it can come out clean."

**"Our Process" — The Three-Step Clean:**
This section describes the cleaning pipeline in language that maps exactly to the three stages of money laundering (placement, layering, integration) but framed as laundry steps:

1. **Intake (Placement)** — "We accept your items, no matter how soiled, and log them into our proprietary tracking system. Each item is tagged and catalogued. We don't ask where it's been — we only care about where it's going."
2. **Processing (Layering)** — "Your garments pass through multiple wash cycles across several of our facilities, each cycle removing another layer of— stains. By the time processing is complete, there is no trace of the original condition."
3. **Return (Integration)** — "Your items re-enter your wardrobe completely clean, pressed, and accompanied by documentation proving they were always this clean. They are indistinguishable from items that were never dirty in the first place."

**Animated Counters:**
- "4.2B+ in garments processed"
- "37 years in operation"
- "12 countries with facilities"
- "0 convictions"

**Image:** Clean, bright interior of a modern laundromat — white tile, chrome machines, blue accents

### Leadership (`/leadership`)

**Intro:** "Meet the team behind The Clean Sheet. Each brings decades of experience in... fabric care."

**4 team members** — all male, based on bill/jim/sean/brandon reference images. Names are randomized at implementation time (not pre-determined). Each has a mobster-meets-laundromat persona.

| Ref Person | Role | Bio Flavor | Portrait Style |
|------------|------|------------|----------------|
| bill | Founder & CEO | The "legitimate businessman" who started it all. Former accountant who "pivoted to textiles." Has never been indicted for anything, and will tell you that unprompted. | Tailored suit, standing in front of industrial washers, arms crossed, confident |
| jim | Director of Operations | Oversees "load processing." Background in "waste management" and "logistics." Previously ran "import/export operations" that he'd prefer not to discuss. | Rolled sleeves, monogrammed apron over dress shirt, hands on a chrome washer |
| sean | Head of Client Relations | Handles all client interactions with "the utmost discretion." Has never testified in court and intends to keep it that way. Knows everyone's name but nobody knows his. | Clean-cut in a polo, leaning on a counter, friendly but unreadable |
| brandon | International Operations Director | Manages offshore dry cleaning facilities. Passport has more stamps than most atlases. Fluent in six languages, "mainly for negotiation purposes." | Suit jacket no tie, near shipping containers or garment racks, worldly look |

Each bio includes:
- Name and title
- 2-3 paragraph bio full of double entendres
- A self-incriminating quote played straight
- Highlights/credentials (years of experience, specialties, achievements)

### Contact (`/contact`)

**Intro:** "Ready to discuss your laundering needs? We're here to help — discreetly, professionally, and without judgment."

**Contact Info Section:**
- Address: a real-sounding but fake address
- Hours: "By appointment only. Walk-ins accepted but not recommended."
- Phone: "Please use a secure line"
- Email: something like consultations@thecleansheet.com

**Intake Form — the comedic centerpiece:**

| Field | Type | Label / Placeholder |
|-------|------|---------------------|
| Name | text | "Legal name or preferred alias" |
| Email | text | "A secure, non-monitored address preferred" |
| Phone | text | "Burner numbers accepted" |
| Source of Garments | dropdown | Options below |
| Estimated Load Size | dropdown | Options below |
| Preferred Payment Method | dropdown | Options below |
| How did you hear about us? | dropdown | Options below |
| Additional Notes | textarea | "Please do not include specifics about ongoing investigations." |
| Submit | button | "Request Discreet Consultation" |

**Source of Garments dropdown:**
- "Personal wardrobe"
- "Family business"
- "Import/Export (unspecified)"
- "Nightlife management"
- "Pharmaceuticals (independent distribution)"
- "Cash-intensive retail"
- "Prefer not to disclose"
- "My attorney advised me not to answer this"

**Estimated Load Size dropdown:**
- "Small (under $10,000)"
- "Medium ($10,000 - $100,000)"
- "Large ($100,000 - $1,000,000)"
- "Industrial (please contact us privately)"

**Preferred Payment Method dropdown:**
- "Cash (unmarked, non-sequential)"
- "Wire transfer (international)"
- "Cryptocurrency"
- "Briefcase drop-off"
- "Other (we don't judge)"

**How did you hear about us? dropdown:**
- "Word of mouth (associate)"
- "My lawyer"
- "My accountant"
- "Overheard at a marina"
- "Found a business card in a duffel bag"
- "Court-ordered"

### Privacy Policy (`/privacy`)

Satirical privacy policy emphasizing what they "definitely don't keep records of." Jokes about data retention being "as thorough as our cleaning process — nothing remains."

### Terms of Service (`/terms`)

Satirical terms including clauses about "mutual non-disclosure," "plausible deniability," and "in the event of a federal inquiry."

---

## Images

All pages require generated images. Image generation uses the MCP image gen tools.

**Required images:**
- Homepage hero: Pristine, bright laundromat interior (white marble, chrome machines, ice blue accents, no people)
- Services page: Individual service section images (gleaming equipment, folded garments, shipping containers for offshore)
- About page hero: Vintage-style laundromat storefront exterior
- About page process: Clean interior showing the wash cycle stages
- Leadership portraits: 4 team member portraits (bill, jim, sean, brandon base refs) with mobster-laundromat styling
- Contact page: Welcoming reception area or front desk of an upscale laundromat

**Portrait generation prompts** should combine:
- The base person reference images
- Upscale laundromat setting (chrome machines, white tile, blue accents)
- Slightly mobster energy (tailored clothing, confident poses, "legitimate businessman" vibes)

---

## Technical Details

**Site structure:**
```
src/sites/cleansheet/
├── config.ts          # SiteConfig with clinical theme
├── index.ts           # Barrel export: config, pages
├── data/
│   ├── services.ts    # Service catalog (6 services + tiers)
│   ├── leadership.ts  # 4 team members with referencePerson
│   └── testimonials.ts # Testimonial quotes
└── pages/
    ├── home.tsx
    ├── services.tsx
    ├── about.tsx
    ├── leadership.tsx
    └── contact.tsx
```

**Theme preset:** Use the `heritage` preset as a base (closest match — light backgrounds, serif headings) with color overrides in the site config to achieve the clinical white/ice blue palette. Only create a new `clinical` preset if the heritage base requires too many overrides.

**No commerce.** No cart, no checkout, no product detail pages. Services site with contact form.

**No dynamic routes.** All 7 routes are static entries in the pages map.

**Shared components to use:**
- Hero, FeatureSection, StatStrip/MetricCounter, AnimatedCounter
- TeamMember/ExecutiveCard (for leadership)
- TestimonialGrid (for homepage)
- FaqAccordion (for services page FAQ)
- CTA Banner
- Header/Footer (layout)

**Contact form** is a `"use client"` component with local state. Form submission shows a confirmation message (no real backend). Confirmation message: "Thank you. A specialist will contact you through secure channels within 24-48 hours. Please destroy this browser history."

---

## Content Tone Samples

**Homepage hero subtext:**
> "Premium fabric care for discerning clients since 1987. We clean clothes. That's it. Please stop asking."

**Services intro:**
> "The Clean Sheet offers a full spectrum of laundering services. And by laundering, we mean laundry. Obviously."

**About founding story:**
> "What started as a single storefront has grown into a multi-facility, multi-national operation. People ask how a laundromat can have offices in the Cayman Islands. The answer is simple: some fabrics require an offshore climate for optimal care."

**Leadership intro:**
> "Meet the team behind The Clean Sheet. Each brings decades of experience in... fabric care."

**Contact intro:**
> "Ready to discuss your laundering needs? We're here to help — discreetly, professionally, and without judgment."

**FAQ answer (cash preference):**
> "We prefer cash. In fact, we strongly prefer cash. Large denominations are welcome. We do not report transactions under $10,000, and we are very good at counting to $9,999."
