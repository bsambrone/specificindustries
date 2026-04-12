# Odd Occasions — Gift Shop for Extremely Specific Situations

**Date:** 2026-04-12
**Subdomain:** `oddoccasions`
**Type:** Commerce-enabled satire site
**Tagline:** "Thoughtfully curated gifts for life's most specific moments."

---

## Site Identity & Tone

Odd Occasions is a boutique gift shop that earnestly believes every hyper-specific life moment deserves a beautiful, curated gift box. The tone is warm and wholesome — like a Hallmark store run by someone with an extremely niche understanding of human awkwardness — with a subtle undercurrent of premium presentation ("hand-selected," "artisanal," elegant packaging language). The comedy comes from the sincerity applied to absurd situations, not from irony or snark.

## Theme

| Token | Value | Notes |
|-------|-------|-------|
| Preset | Boutique / warm | Upscale stationery shop feel |
| Primary | `#7C9A82` | Soft sage green |
| Secondary | `#F5F0E8` | Warm cream |
| Accent | `#D4A0A0` | Dusty rose |
| Background | `#FFFDF8` | Cream white |
| Text | `#2D2D2D` | Dark charcoal |
| Heading font | `playfair` | Elegant serif, "curated with care" |
| Body font | `nunito` | Soft, rounded, warm |

## Features

- `commerce: true` — Full cart, add-to-cart, checkout

## Pages & Navigation

**Nav:** Shop | Our Story | Contact

**Pages:**

### Home (`""`)
- Hero section with tagline and warm lifestyle imagery (gift boxes on a table, soft lighting)
- "Shop by Occasion" section with 5 category cards: Workplace, Social & Friendship, Digital Life, Family, Milestones & Life Events — each links to the shop page filtered/anchored to that category
- Featured gift boxes carousel (6-8 highlighted products)
- Brief "Our Philosophy" blurb about how every moment deserves recognition

### Shop (`"shop"`)
- Full product grid of all 30 gift boxes using ProductCard components
- Category sections with anchor IDs so category links from the home page can deep-link
- Each card shows: gift box name, suspiciously precise price, short tagline, hero image
- Add to Cart button on each card

### Product Detail (dynamic route: `shop/[slug]`)
- Gift box name, price, tagline
- Hero image of the full gift box
- "What's Inside" section with 3-4 individual items, each with its own image and mini description
- Add to Cart button
- 2-4 testimonials from "recipients" or "senders" using shared testimonial photos from `public/shared/testimonials/`

### Our Story / About (`"about"`)
- Founding story: founder discovered his calling after realizing life's most specific moments were going uncelebrated
- Leadership team (4 male execs, see Leadership section)
- Company timeline with oddly specific milestones (e.g., "March 14, 2019 — Curated our first apology box after an intern ate the CEO's labeled yogurt")

### Contact (`"contact"`)
- Satirical contact form themed to occasion consultation
- Fields: "Describe the incident," "How long have you been carrying this?," "On a scale of 1-10, how specific is this situation?," "Preferred gift wrapping emotion (Remorseful / Celebratory / Ambiguous)"
- Real email `bsambrone@gmail.com` in small print at the bottom

### Privacy (`"privacy"`)
- Specific Industries umbrella policy reference at the top
- Full satirical privacy policy below, themed to gift-giving. Example clauses:
  - "Browsing history on Odd Occasions may reveal your most specific regrets. We consider this a feature."
  - "We track which occasions you browse most frequently. This data is used exclusively to judge you internally."
  - "Your gift selections will not be shared with the recipient unless doing so would be funnier."
  - "Cookies are used to remember which awkward moments you've acknowledged. Deleting cookies does not delete the memory."

### Terms (`"terms"`)
- Specific Industries umbrella policy reference at the top
- Full satirical terms of service below, themed to gift-giving. Example clauses:
  - "By purchasing a gift box, you acknowledge that the occasion in question actually occurred."
  - "Odd Occasions assumes no liability for emotional closure implied by gift delivery."
  - "Recipient reactions including but not limited to confused silence, nervous laughter, and 'you didn't have to do that' are considered successful delivery outcomes."
  - "Refunds are available only if the specific occasion turns out to have never happened."
  - "Re-gifting an Odd Occasions box to address a different specific occasion voids all emotional warranties."

## Leadership Team

All male, fully randomized names. Portraits generated via image-gen styled to match the boutique gift shop theme (warm lighting, approachable).

| Display Name | Reference Person | Title | Portrait Style |
|---|---|---|---|
| Gerald Bellweather | bill | Founder & Chief Occasion Officer | Warm boutique owner, cozy cardigan, genuine smile |
| Declan Ashworth | brandon | VP of Occasion Research | Earnest researcher, reading glasses, clipboard |
| Theodore Lundy | jim | Head of Curation | Artisan/craftsman, apron, workshop setting |
| Fletcher Nye | sean | Director of Recipient Experience | Friendly customer service lead, warm expression |

## Product Catalog (30 Gift Boxes)

Each gift box has: name, suspiciously precise price, tagline, category, and 3-4 curated items inside. Prices range from ~$23 to ~$44 with oddly specific cents.

### Workplace (7)

#### 1. Sorry I Ate Your Labeled Lunch in 2017
- **Slug:** `sorry-i-ate-your-labeled-lunch-in-2017`
- **Price:** $34.17
- **Tagline:** "For the guilt that ages like fine cheese."
- **Items:**
  - Artisanal replacement sandwich
  - Handwritten apology on aged parchment
  - Mini fridge lock
  - Expired statute of limitations certificate

#### 2. Congrats on Your Mild Promotion
- **Slug:** `congrats-on-your-mild-promotion`
- **Price:** $41.83
- **Tagline:** "When the title changed but the salary didn't."
- **Items:**
  - Slightly nicer business card holder
  - "New Title, Same Desk" desk plaque
  - A single party horn
  - Moderately sparkling cider

#### 3. Thanks for Not Replying All
- **Slug:** `thanks-for-not-replying-all`
- **Price:** $28.06
- **Tagline:** "True heroism goes unrecognized."
- **Items:**
  - Medal of email restraint
  - "I Saw It and Said Nothing" pin
  - Calming desk tea blend
  - Reply All awareness ribbon

#### 4. Sorry I Unmuted You During Your Rant
- **Slug:** `sorry-i-unmuted-you-during-your-rant`
- **Price:** $33.91
- **Tagline:** "We both know what happened in that Teams call."
- **Items:**
  - USB mute button
  - Revisionist meeting minutes
  - "Hot Mic Recovery" pamphlet
  - Noise-canceling sympathy candle

#### 5. Happy Last Day to Someone Whose Name I Should Know
- **Slug:** `happy-last-day-to-someone-whose-name-i-should-know`
- **Price:** $26.43
- **Tagline:** "Three years of hallway nods, and it's come to this."
- **Items:**
  - Blank farewell card with pre-written generic sentiments
  - Lanyard from their department (guess which one)
  - "Colleague-ish" photo frame
  - Bag of breakroom coffee they'll never drink again

#### 6. Congrats on Surviving the Reorg
- **Slug:** `congrats-on-surviving-the-reorg`
- **Price:** $38.72
- **Tagline:** "Your role is safe. Probably. For now."
- **Items:**
  - Updated org chart (already outdated)
  - "I Report to Who Now?" mug
  - Stress ball shaped like a pivot table
  - Reassuring but vague leadership quote print

#### 7. Sorry I Stole Your Parking Spot for 8 Months
- **Slug:** `sorry-i-stole-your-parking-spot-for-8-months`
- **Price:** $31.09
- **Tagline:** "I knew it was yours. You knew I knew."
- **Items:**
  - Artisanal air freshener
  - Parking karma restoration certificate
  - Hand-drawn map of alternative spots
  - Gas gift card for $0.47

### Social & Friendship (6)

#### 8. We Met Once at a Networking Event
- **Slug:** `we-met-once-at-a-networking-event`
- **Price:** $37.42
- **Tagline:** "Let's acknowledge this connection for what it is."
- **Items:**
  - LinkedIn connection printed and framed
  - Slightly personalized note ("Great chat about... things")
  - Branded pen neither of you wants
  - Business card from a job you've since left

#### 9. Sorry I Ghosted You in 2019
- **Slug:** `sorry-i-ghosted-you-in-2019`
- **Price:** $42.67
- **Tagline:** "I saw your texts. All of them."
- **Items:**
  - Handwritten timeline of excuses considered
  - "I Was Going Through Something" candle
  - Friendship re-application form
  - Vintage screenshot of the last message you ignored

#### 10. Thanks for Pretending to Like My Cooking
- **Slug:** `thanks-for-pretending-to-like-my-cooking`
- **Price:** $29.38
- **Tagline:** "Your poker face saved our friendship."
- **Items:**
  - Antacid sampler
  - Honest seasoning kit
  - "It Was Fine, Really" embroidered napkin
  - Take-out menu from the restaurant we both wish we'd gone to

#### 11. Sorry I Brought a Guitar to Your Party
- **Slug:** `sorry-i-brought-a-guitar-to-your-party`
- **Price:** $36.14
- **Tagline:** "I really thought people would want to hear Wonderwall."
- **Items:**
  - Guitar pick retirement shadowbox
  - Formal apology in song (lyrics only)
  - "Read the Room" guidebook
  - Aux cord as peace offering

#### 12. Happy Birthday to Someone in This Group Chat
- **Slug:** `happy-birthday-to-someone-in-this-group-chat`
- **Price:** $25.83
- **Tagline:** "I'm 60% sure it's today."
- **Items:**
  - Generic birthday candle
  - Card signed "From all of us (I think?)"
  - Confetti from a previous celebration
  - Screenshot of the notification that reminded me

#### 13. Congrats on Canceling Plans Without Guilt
- **Slug:** `congrats-on-canceling-plans-without-guilt`
- **Price:** $31.56
- **Tagline:** "You did it. You're free."
- **Items:**
  - Cozy blanket swatch
  - "Valid Excuse Generator" booklet
  - Celebratory solo popcorn
  - Netflix recommendation card

### Digital Life (6)

#### 14. Condolences for Your Expired Free Trial
- **Slug:** `condolences-for-your-expired-free-trial`
- **Price:** $27.93
- **Tagline:** "You meant to cancel. We all meant to cancel."
- **Items:**
  - Sympathy bouquet (dried)
  - Memorial card for the $14.99/month you'll never get back
  - Budgeting pamphlet
  - Free trial tracker so this never happens again

#### 15. Sorry I Saw Your Screen Time Report
- **Slug:** `sorry-i-saw-your-screen-time-report`
- **Price:** $32.18
- **Tagline:** "Seven hours of TikTok is between you and your god."
- **Items:**
  - "No Judgment" certificate
  - Blue light glasses
  - Phone stand facing away from witnesses
  - Dignity restoration serum (saline drops)

#### 16. Congrats on Your First Viral Post
- **Slug:** `congrats-on-your-first-viral-post`
- **Price:** $44.27
- **Tagline:** "You peaked. And that's okay."
- **Items:**
  - Framed screenshot (before the ratio)
  - "Micro-Famous" sash
  - Engagement rate calculator (just kidding, don't)
  - Follow-up content strategy (a blank page)

#### 17. Sorry About Your Reply Guy
- **Slug:** `sorry-about-your-reply-guy`
- **Price:** $29.61
- **Tagline:** "He means well. He doesn't, actually."
- **Items:**
  - Block button polishing cloth
  - "Well Actually" repellent spray
  - Curated list of touch-grass locations
  - Emotional support mute button

#### 18. Happy Anniversary of Your Password You Can't Remember
- **Slug:** `happy-anniversary-of-your-password-you-cant-remember`
- **Price:** $23.47
- **Tagline:** "It's been 3 years since you set it and 47 resets since."
- **Items:**
  - Elegant password journal
  - "Security Question Trauma" workbook
  - Commemorative sticky note
  - Pencil that says "just use a password manager"

#### 19. Condolences on Your Dropped Phone (Screen Down)
- **Slug:** `condolences-on-your-dropped-phone-screen-down`
- **Price:** $35.82
- **Tagline:** "That moment of silence before you flipped it over."
- **Items:**
  - Protective case (too late)
  - Screen crack acceptance guide
  - "It Still Works Fine" affirmation card
  - Gift card for a screen protector you should've had

### Family (5)

#### 20. Sorry I'm Your Mother's Favorite
- **Slug:** `sorry-im-your-mothers-favorite`
- **Price:** $39.14
- **Tagline:** "We both know it. Let's heal."
- **Items:**
  - Sibling rivalry peace treaty
  - "Second Favorite" consolation ribbon
  - Family photo where you're slightly more in focus
  - Shared therapy coupon

#### 21. Thanks for Not Telling Mom
- **Slug:** `thanks-for-not-telling-mom`
- **Price:** $33.29
- **Tagline:** "The sibling code is sacred."
- **Items:**
  - Sealed lips wax seal kit
  - "What Mom Doesn't Know" journal
  - Redacted incident report
  - Snack bribe replenishment pack

#### 22. Happy Anniversary of Moving Back In
- **Slug:** `happy-anniversary-of-moving-back-in`
- **Price:** $28.73
- **Tagline:** "It's temporary. It's been two years. It's temporary."
- **Items:**
  - "Temporary" welcome mat
  - House rules renegotiation kit
  - Mini cactus (it also doesn't want to be there)
  - Motivational apartment listing printout

#### 23. Sorry I Taught Your Kid That Word
- **Slug:** `sorry-i-taught-your-kid-that-word`
- **Price:** $36.91
- **Tagline:** "In my defense, I didn't know they were listening."
- **Items:**
  - "Uncle/Aunt of the Year" participation trophy
  - Vocabulary replacement flash cards
  - Formal incident report
  - Earplugs for the next family gathering

#### 24. Congrats on Becoming the Family IT Person
- **Slug:** `congrats-on-becoming-the-family-it-person`
- **Price:** $30.44
- **Tagline:** "You connected the printer once. There's no going back."
- **Items:**
  - "Have You Tried Restarting?" t-shirt patch
  - Remote desktop guilt journal
  - Laminated troubleshooting flowchart
  - Business card reading "Not Actually in IT"

### Milestones & Life Events (6)

#### 25. Congrats on Aging Out of Your Insurance Plan
- **Slug:** `congrats-on-aging-out-of-your-insurance-plan`
- **Price:** $41.08
- **Tagline:** "Welcome to reading the fine print."
- **Items:**
  - Adulting starter pamphlet
  - "Deductible" pronunciation guide
  - Single aspirin (not covered)
  - Comforting yet medically vague tea

#### 26. Happy 10,000th Day Alive
- **Slug:** `happy-10000th-day-alive`
- **Price:** $27.33
- **Tagline:** "A milestone nobody asked you to calculate."
- **Items:**
  - Life odometer certificate
  - "Days Alive" counter (already outdated)
  - Commemorative candle
  - Existential reflection journal (3 pages, that's enough)

#### 27. Sorry Your Sourdough Starter Died
- **Slug:** `sorry-your-sourdough-starter-died`
- **Price:** $34.56
- **Tagline:** "It was alive. It depended on you. Let's not dwell."
- **Items:**
  - Memorial jar
  - "Bread We Never Knew" sympathy card
  - New starter kit (with instructions this time)
  - Feeding schedule fridge magnet

#### 28. Congrats on Finally Using Your Gym Membership
- **Slug:** `congrats-on-finally-using-your-gym-membership`
- **Price:** $29.87
- **Tagline:** "Four months of paying. One glorious visit."
- **Items:**
  - "I Went Once" achievement medal
  - Sweat towel (decorative only)
  - Protein bar from 2024
  - Motivational quote that acknowledges this won't happen again

#### 29. Happy Divorce from Your Streaming Service
- **Slug:** `happy-divorce-from-your-streaming-service`
- **Price:** $26.19
- **Tagline:** "You shared a queue. You shared a life. You shared a password."
- **Items:**
  - Profile migration grief counseling card
  - "Starting Over" watchlist
  - Your own login (finally)
  - Microwave popcorn for your solo era

#### 30. Sorry You Found Out Your Favorite Restaurant Closed
- **Slug:** `sorry-you-found-out-your-favorite-restaurant-closed`
- **Price:** $38.43
- **Tagline:** "You were going to go back. You always said you'd go back."
- **Items:**
  - Menu memorial (reprinted from Yelp photos)
  - "Last Meal" recipe attempt kit
  - Candle that smells vaguely like their signature dish
  - Gift card to a place that's fine but not the same

## Image Strategy

### Counts
- 30 hero images (one per gift box, used on shop grid + product detail)
- ~110 individual item images (3-4 per gift box, used on product detail page)
- 4 executive portraits (leadership team)
- 1 hero/lifestyle image (homepage)
- **Total: ~146 images**

### Generation Tool
- **image-gen MCP only** — never retro-diffusion

### Style
- Warm, soft-lit product photography
- Cream/sage/dusty rose tones consistent with site theme
- Clean backgrounds, gentle shadows
- Etsy boutique meets Anthropologie catalog aesthetic

### Text Handling
- All images generated **text-free** — clean product shots only
- Labels, names, captions rendered as **CSS/HTML overlays**, never baked into images
- For inherently text-based items (certificates, cards, pamphlets): photograph at an angle or partially obscured so "text" is decorative/blurred; actual readable content provided as styled HTML alongside the image

## Testimonials

- 2-4 testimonials per product detail page
- Use shared testimonial photos from `public/shared/testimonials/` (28 available photos)
- Rotate through the pool across all 30 products
- Each testimonial is a short review from a "recipient" or "sender" of that specific gift box
- Names match the photo filenames (e.g., `marcus-chen.png` → "Marcus Chen")
- No dedicated testimonials page

## Registration Checklist

1. Add `oddoccasions` to `VALID_SUBDOMAINS` in `src/sites/subdomains.ts`
2. Create site module at `src/sites/oddoccasions/`
3. Register in `src/sites/registry.ts`
4. Add static assets to `public/sites/oddoccasions/`

## Shared Components to Reuse

- `Hero` — Homepage hero
- `ProductCard` — Shop grid cards
- `FeatureSection` — "Shop by Occasion" categories
- `ProductCarousel` — Featured products on homepage
- `TeamMember` — Leadership team
- `Timeline` — Company milestones
- `FaqAccordion` — Could be used for gift box FAQ
- `AddToCartButton` — Commerce integration
- `TestimonialGrid` or custom testimonial section — Product detail reviews
- `Header` / `Footer` — Standard layout

## Categories

| Category | Products | Slug anchor |
|----------|----------|-------------|
| Workplace | #1–#7 | `#workplace` |
| Social & Friendship | #8–#13 | `#social` |
| Digital Life | #14–#19 | `#digital-life` |
| Family | #20–#24 | `#family` |
| Milestones & Life Events | #25–#30 | `#milestones` |
