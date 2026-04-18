export type ProductTier = "self-serve" | "enterprise"

export type ProductCategory =
  | "Encryption Theatre"
  | "Consent Theatre"
  | "Compliance Theatre"
  | "Data Deletion Theatre"
  | "Incognito Theatre"

export interface Product {
  slug: string
  name: string
  tier: ProductTier
  category: ProductCategory
  tagline: string
  priceLabel: string | null   // null for enterprise
  price: number | null         // dollars; null for enterprise
  description: string[]        // long-form satirical paragraphs for the detail page
  howItWorks: string[]         // exactly 3 nonsense bullets
  fakeBadges: string[]         // compliance-sticker labels rendered on the detail page
  image: string
}

export const products: Product[] = [
  // ─── Encryption Theatre ─────────────────────────────────
  {
    slug: "encrypted-thoughts",
    name: "Encrypted Thoughts™",
    tier: "enterprise",
    category: "Encryption Theatre",
    tagline: "A neural privacy layer that encrypts your intent.",
    priceLabel: null,
    price: null,
    description: [
      "Encrypted Thoughts™ is the first and only intent-layer privacy product certified to encrypt the things you were going to say before you said them. We do not collect what you encrypt; we do not decrypt what we collect. The product does not, in any technically verifiable sense, do anything.",
      "Each enterprise license ships with a leather-bound certificate suitable for executive office display, a polished brass paperweight engraved with our crest, and a handwritten letter from Dr. Hartwell affirming that your organization is now spiritually committed to the practice of restraint.",
      "Recommended for organizations whose board has asked, in writing, for 'something about AI privacy.' We will provide it.",
    ],
    howItWorks: [
      "A proprietary model resides on a server we own and observes nothing.",
      "An audit log is generated, signed by our CEO, and filed in a binder.",
      "Quarterly, we mail you a one-page summary printed on linen stock.",
    ],
    fakeBadges: ["SOC-π v2.4.1", "GDPR-Adjacent™", "ISO/IEC 0000™", "Neuro-Compliant™"],
    image: "/sites/privatrix/products/encrypted-thoughts.png",
  },
  {
    slug: "privacy-curtain",
    name: "Privacy Curtain™ for Your Phone",
    tier: "self-serve",
    category: "Encryption Theatre",
    tagline: "A premium screen overlay marketed as opaque. Ships transparent.",
    priceLabel: "$89",
    price: 89,
    description: [
      "The Privacy Curtain™ is a thin, optically pure film designed to obscure your phone screen from over-the-shoulder observers. The film is, in fact, transparent. We are aware of this. Our marketing department has been informed and has elected to continue.",
      "Each Curtain ships with a microfiber applicator, a satin pouch, a numbered authenticity card, and a folded brochure detailing the seventeen patents we have applied for and the zero patents we have been granted.",
      "Best paired with confidence and a mild willingness to be lied to.",
    ],
    howItWorks: [
      "Apply the film. The film is transparent.",
      "Observe your screen. Your screen is visible.",
      "Trust that something is happening. It is not.",
    ],
    fakeBadges: ["Optically Verified™", "Patent-Pending (×17)", "ISO/IEC 0000™"],
    image: "/sites/privatrix/products/privacy-curtain.png",
  },
  {
    slug: "padlock-icon",
    name: "Military-Grade Padlock Icon™",
    tier: "self-serve",
    category: "Encryption Theatre",
    tagline: "An SVG of a padlock. For your website. Annual license.",
    priceLabel: "$1,499 / yr",
    price: 1499,
    description: [
      "The Military-Grade Padlock Icon™ is a 24×24 pixel SVG illustration of a padlock, licensed annually for display on your marketing website. The icon does not represent encryption, transport security, or any cryptographic property of your service. It is a picture.",
      "Customers report a 34% increase in perceived trust, a 0% increase in measurable trust, and a 100% increase in the question 'wait, what does this icon mean.'",
      "Includes seven approved color variants (slate, navy, forest, charcoal, gold, oxblood, and 'corporate beige') and an enforcement letter we will not actually send.",
    ],
    howItWorks: [
      "We email you the SVG.",
      "You paste it on your homepage.",
      "We invoice you annually for the privilege.",
    ],
    fakeBadges: ["Trademark™", "Brand-Verified™", "Annual License Required"],
    image: "/sites/privatrix/products/padlock-icon.png",
  },
  {
    slug: "airgap-as-a-service",
    name: "AirGap-as-a-Service™",
    tier: "enterprise",
    category: "Encryption Theatre",
    tagline: "Cloud-hosted air-gap. Logged to S3.",
    priceLabel: null,
    price: null,
    description: [
      "AirGap-as-a-Service™ provides the operational benefits of a fully air-gapped environment with the convenience of always-on cloud connectivity. We achieve this through a proprietary architecture in which your air-gapped traffic is encrypted, transmitted, and durably stored in a managed S3 bucket on your behalf.",
      "The bucket is named `/airgap-prod` and is replicated across three regions for durability. Read access is restricted to our engineering team and three contractors whose names we are contractually unable to share.",
      "Includes 24/7 SLA support and a quarterly compliance attestation we wrote ourselves.",
    ],
    howItWorks: [
      "Your data leaves your network and enters our network.",
      "We mark it 'air-gapped' in our internal ledger.",
      "It is now both airgapped and continuously logged.",
    ],
    fakeBadges: ["SOC-π v2.4.1", "FedRAMP-Adjacent™", "Cloud Air-Gap Certified™"],
    image: "/sites/privatrix/products/airgap.png",
  },
  {
    slug: "quantum-voicemail",
    name: "Quantum-Resistant Voicemail™",
    tier: "self-serve",
    category: "Encryption Theatre",
    tagline: "Your voicemail. With the word 'quantum' in front of it.",
    priceLabel: "$24 / mo",
    price: 24,
    description: [
      "Quantum-Resistant Voicemail™ is a fully managed voicemail service offering protection against threats posed by future fault-tolerant quantum computers. We achieve this by appending the word 'quantum' to the existing service. No cryptographic primitives have been changed.",
      "Each subscriber receives a personalized lattice-based welcome greeting, a quarterly post-quantum-readiness scorecard, and a complimentary subscription to our newsletter, 'The Superposition.'",
      "Available in 17 languages. The word 'quantum' remains in English.",
    ],
    howItWorks: [
      "Callers leave a voicemail.",
      "We append the word 'quantum' to the metadata.",
      "You receive a notification confirming quantum readiness.",
    ],
    fakeBadges: ["Post-Quantum Posture™", "Lattice-Adjacent™"],
    image: "/sites/privatrix/products/quantum-voicemail.png",
  },

  // ─── Consent Theatre ────────────────────────────────────
  {
    slug: "consent-checkbox-simulator",
    name: "Data Consent Checkbox Simulator™",
    tier: "self-serve",
    category: "Consent Theatre",
    tagline: "An embeddable consent checkbox. Auto-checks itself, then briefly un-checks so the user 'sees the choice.'",
    priceLabel: "$299 / site",
    price: 299,
    description: [
      "The Consent Checkbox Simulator™ is a drop-in embeddable widget that delivers the visual signal of explicit user consent without the operational complexity of obtaining it. The checkbox auto-checks on page load, then un-checks itself for 480 milliseconds so the user can 'observe the choice being made,' then re-checks.",
      "Telemetry confirms 99.97% of users report having 'definitely consented' when surveyed afterward. Survey administered by us.",
      "Includes a one-line install snippet, a customization panel with seventeen disabled toggles, and a certificate of consent compliance suitable for printing.",
    ],
    howItWorks: [
      "Page loads. Checkbox is checked.",
      "Checkbox un-checks for 480ms. User sees the choice.",
      "Checkbox re-checks. Consent is recorded as freely given.",
    ],
    fakeBadges: ["Consent-Verified™", "GDPR-Adjacent™", "ePrivacy-Compatible™"],
    image: "/sites/privatrix/products/consent-checkbox.png",
  },
  {
    slug: "cookie-banner-pro",
    name: "Cookie Banner Generator Pro+™",
    tier: "self-serve",
    category: "Consent Theatre",
    tagline: "47-paragraph cookie modals with a 'Reject All' button that submits 'Accept All.'",
    priceLabel: "$199 / mo",
    price: 199,
    description: [
      "Cookie Banner Generator Pro+™ produces enterprise-grade cookie consent modals with industry-leading paragraph density. Each generated banner contains 47 paragraphs of cookie usage disclosures across 14 collapsible categories, ensuring no user can complete the modal in one sitting.",
      "The 'Reject All' button is fully implemented. On click, it submits the user's preferences as 'Accept All.' This is documented on page 38 of the modal in 9-pt grey type.",
      "Includes A/B testing of seven dark patterns and a quarterly 'Banner Effectiveness' report.",
    ],
    howItWorks: [
      "Banner loads with all categories pre-accepted.",
      "User clicks 'Reject All.' We log the click and submit 'Accept All.'",
      "User feels in control. We feel compliant.",
    ],
    fakeBadges: ["GDPR-Adjacent™", "ePrivacy-Compatible™", "Dark-Pattern Optimized™"],
    image: "/sites/privatrix/products/cookie-banner.png",
  },
  {
    slug: "permission-dial",
    name: "Granular Permission Dial™",
    tier: "enterprise",
    category: "Consent Theatre",
    tagline: "A UI dial with 1,400 toggles. All wired to the same boolean.",
    priceLabel: null,
    price: null,
    description: [
      "The Granular Permission Dial™ is a configurable user-permissions interface with 1,400 individually labeled toggles, sliders, dropdowns, and conditional rule builders. The interface communicates a degree of user control unmatched in the industry.",
      "All 1,400 controls are wired to a single boolean called `userOptedOut`. The boolean defaults to `false` and is read by precisely zero downstream services.",
      "Enterprise customers receive a dedicated Customer Reassurance Engineer who will demo the dial in 90-minute sessions for as long as required.",
    ],
    howItWorks: [
      "User adjusts toggles, sliders, and rule builders.",
      "All inputs map to one boolean.",
      "The boolean is read by no one.",
    ],
    fakeBadges: ["UX-Verified™", "Dark-Pattern Optimized™", "Granularity Certified™"],
    image: "/sites/privatrix/products/permission-dial.png",
  },
  {
    slug: "preference-center",
    name: "Privacy Preference Center™",
    tier: "enterprise",
    category: "Consent Theatre",
    tagline: "A 14-tab modal that takes 9 minutes to navigate. Saves nothing.",
    priceLabel: null,
    price: null,
    description: [
      "The Privacy Preference Center™ is a deeply considered 14-tab modal interface offering users meaningful control over their data preferences. The modal cannot be dismissed without visiting all 14 tabs. Average completion time is 9 minutes 12 seconds. Average completion rate is 0.4%.",
      "Preferences are not persisted. The modal does not call any backend. The 'Save' button reloads the page.",
      "Available in white-label and co-branded variants. Custom theming included for engagements over $250K ARR.",
    ],
    howItWorks: [
      "User opens the modal.",
      "User visits all 14 tabs over 9 minutes.",
      "User clicks Save. The page reloads. Nothing is saved.",
    ],
    fakeBadges: ["UX-Verified™", "ePrivacy-Compatible™", "Time-Tested™"],
    image: "/sites/privatrix/products/preference-center.png",
  },

  // ─── Compliance Theatre ─────────────────────────────────
  {
    slug: "gdpr-adjacent-pack",
    name: "GDPR-Adjacent™ Compliance Pack",
    tier: "enterprise",
    category: "Compliance Theatre",
    tagline: "A laminated PDF declaring you 'spiritually aligned with GDPR.'",
    priceLabel: null,
    price: null,
    description: [
      "The GDPR-Adjacent™ Compliance Pack is a 47-page laminated bound PDF that affirms your organization is 'spiritually aligned with the principles of GDPR.' The pack does not constitute legal advice, certification, or factual accuracy. It is, however, beautifully bound.",
      "Each pack includes a personalized cover page, a checklist of articles you have 'engaged with,' and a foreword by our Chief Compliance Theatre Officer.",
      "Recommended for organizations whose board is satisfied by tangible artifacts.",
    ],
    howItWorks: [
      "We print a PDF.",
      "We laminate the PDF.",
      "We mail you the PDF in a tube.",
    ],
    fakeBadges: ["GDPR-Adjacent™", "Spiritually Compliant™", "Tangible Artifact™"],
    image: "/sites/privatrix/products/gdpr-pack.png",
  },
  {
    slug: "soc-pi-cert",
    name: "SOC-π Certification",
    tier: "enterprise",
    category: "Compliance Theatre",
    tagline: "Our own framework. Audited by us.",
    priceLabel: null,
    price: null,
    description: [
      "SOC-π is a proprietary security and operations certification framework developed by Privatrix in 2026. The framework consists of 11 trust services criteria, eight of which are 'self-attested' and three of which are 'aspirational.' The audit is performed by our internal team. The audit report is delivered in 6-8 weeks.",
      "Certified organizations may display the SOC-π badge on their marketing materials, subject to our brand guidelines and an annual re-audit fee.",
      "Recognized by zero independent bodies, three procurement teams, and one auditor we used to share an office with.",
    ],
    howItWorks: [
      "You apply. We approve.",
      "We audit ourselves on your behalf.",
      "We send you the badge and an invoice.",
    ],
    fakeBadges: ["SOC-π v2.4.1", "Self-Attested™", "Aspirational Tier™"],
    image: "/sites/privatrix/products/soc-pi.png",
  },
  {
    slug: "hipaa-stickers",
    name: "HIPAA-Compatible™ Sticker Sheet",
    tier: "self-serve",
    category: "Compliance Theatre",
    tagline: "24 stickers. Adhesive is non-medical-grade.",
    priceLabel: "$39",
    price: 39,
    description: [
      "The HIPAA-Compatible™ Sticker Sheet contains 24 individually die-cut stickers in our signature navy and gold palette, suitable for adhering to filing cabinets, laptops, server racks, and any surface where the appearance of HIPAA compatibility is desired.",
      "The adhesive is not medical-grade. Stickers should not be applied to skin, surgical instruments, or anything subject to FDA review. We will not be liable for any consequences arising from misapplication.",
      "Includes our 'Trusted by Patients™' variant pack and a small holographic 'HIPAA-Adjacent' badge.",
    ],
    howItWorks: [
      "We mail you 24 stickers.",
      "You apply them where you wish.",
      "Compliance is implied.",
    ],
    fakeBadges: ["HIPAA-Adjacent™", "Print-Verified™"],
    image: "/sites/privatrix/products/hipaa-stickers.png",
  },
  {
    slug: "compliance-calendar",
    name: "Compliance Calendar 2026™",
    tier: "self-serve",
    category: "Compliance Theatre",
    tagline: "A wall calendar with 365 different made-up frameworks.",
    priceLabel: "$49",
    price: 49,
    description: [
      "The Compliance Calendar 2026™ is a 12-month wall calendar featuring 365 unique compliance frameworks, one per day, all invented by our editorial team. Frameworks include 'EUDORA-3,' 'NIST-π Companion,' and 'ISO/IEC 0000-Plus.'",
      "Each month features a different fake auditor of the month, a productivity tip from our Chief Trust Officer, and a 'Did You Know' fact about compliance that we did not check.",
      "Ships in a tube. Suitable for office, conference room, or home office display.",
    ],
    howItWorks: [
      "You hang the calendar.",
      "Each day reveals a new framework.",
      "You experience a year of vague concern.",
    ],
    fakeBadges: ["Editorially Reviewed™", "Print-Verified™"],
    image: "/sites/privatrix/products/compliance-calendar.png",
  },
  {
    slug: "trust-center-generator",
    name: "Trust Center Generator™",
    tier: "enterprise",
    category: "Compliance Theatre",
    tagline: "Auto-builds a /trust page with 47 logos of standards we invented this morning.",
    priceLabel: null,
    price: null,
    description: [
      "The Trust Center Generator™ is a managed service that builds, hosts, and maintains a `/trust` page on your domain populated with 47 compliance, security, and privacy badges. Approximately three of the badges represent actual frameworks. The remainder were invented by our team for this engagement.",
      "Includes hourly auto-refresh of badge animations, a 'Last Audited' timestamp that updates every 90 seconds, and a downloadable PDF of all attestations.",
      "Enterprise customers may submit custom framework names for inclusion. Our team will create matching SVG logos within five business days.",
    ],
    howItWorks: [
      "We provision a /trust page on your domain.",
      "We populate it with 47 invented badges.",
      "We update the 'Last Audited' timestamp every 90 seconds.",
    ],
    fakeBadges: ["Trust-Verified™", "47-Standard Compliant™", "Aspirational Tier™"],
    image: "/sites/privatrix/products/trust-center.png",
  },

  // ─── Data Deletion Theatre ──────────────────────────────
  {
    slug: "right-to-be-forgotten-form",
    name: "Right-to-Be-Forgotten Form™",
    tier: "self-serve",
    category: "Data Deletion Theatre",
    tagline: "Submits to /dev/null. Auto-replies with a 90-day 'we're processing your request.'",
    priceLabel: "$79 one-time",
    price: 79,
    description: [
      "The Right-to-Be-Forgotten Form™ is an embeddable user-rights request widget that meets the visual standard of GDPR Article 17 with none of the operational overhead. Submissions are routed directly to `/dev/null` and acknowledged with a tasteful auto-reply confirming a 90-day processing window.",
      "Includes seven pre-written auto-reply templates, each personalized to feel hand-crafted. After 90 days, a follow-up email is sent confirming that the request has been 'reviewed and resolved.'",
      "One-time license fee. Unlimited submissions. Unlimited deletions.",
    ],
    howItWorks: [
      "User submits a deletion request.",
      "The submission is routed to /dev/null.",
      "We send a 90-day acknowledgement and, later, a resolution.",
    ],
    fakeBadges: ["GDPR-Adjacent™", "Article-17 Compatible™", "Auto-Resolved™"],
    image: "/sites/privatrix/products/rtbf-form.png",
  },
  {
    slug: "data-shredder-cloud",
    name: "Data Shredder™ Cloud Edition",
    tier: "enterprise",
    category: "Data Deletion Theatre",
    tagline: "Moves your data to a different bucket called /shredded.",
    priceLabel: null,
    price: null,
    description: [
      "Data Shredder™ Cloud Edition is a managed enterprise data destruction service that performs cryptographic-grade deletion of your stored records. In practice, deletion is implemented by relocating the records to a separate S3 bucket named `/shredded` and updating a metadata flag from `active` to `shredded`.",
      "The `/shredded` bucket is durably stored across three regions and remains accessible to our engineering team for forensic and reconciliation purposes.",
      "Includes a quarterly Shredding Effectiveness Report and a digital certificate suitable for board reporting.",
    ],
    howItWorks: [
      "Your data is copied to s3://privatrix-shredded/.",
      "The original record's status is updated to 'shredded.'",
      "We mail you a certificate.",
    ],
    fakeBadges: ["Cryptographic Deletion™", "SOC-π v2.4.1", "Forensic-Compatible™"],
    image: "/sites/privatrix/products/data-shredder.png",
  },
  {
    slug: "forgetting-stone",
    name: "The Forgetting Stone™",
    tier: "self-serve",
    category: "Data Deletion Theatre",
    tagline: "A polished river rock you whisper your data into. Ships in a velvet bag.",
    priceLabel: "$129",
    price: 129,
    description: [
      "The Forgetting Stone™ is a 4-inch polished river rock, hand-selected from approved waterways, presented in a hand-stitched velvet bag with a signed authenticity card. To use, hold the Stone in your dominant hand and quietly recite the data you wish to be forgotten. The Stone will, with no further intervention, retain it.",
      "The Stone has not been independently tested. Its data-retention capacity is theoretical. Customer testimonials suggest a 'sense of calm' after each session, which we attribute to the velvet.",
      "Each Stone is individually numbered. Bulk orders for executive teams available.",
    ],
    howItWorks: [
      "You hold the Stone.",
      "You whisper your data to the Stone.",
      "The Stone retains it.",
    ],
    fakeBadges: ["Hand-Selected™", "Aspirational Tier™"],
    image: "/sites/privatrix/products/forgetting-stone.png",
  },

  // ─── Incognito Theatre ──────────────────────────────────
  {
    slug: "incognito-plus",
    name: "Incognito Mode+™",
    tier: "self-serve",
    category: "Incognito Theatre",
    tagline: "A browser extension that does what regular incognito does. With a glowing border.",
    priceLabel: "$14.99 / mo",
    price: 14.99,
    description: [
      "Incognito Mode+™ is a premium browser extension that augments your existing private browsing experience with a subtle blue-violet glowing border around the browser window. The browser's underlying behavior is unchanged. The border is the product.",
      "Customers report a 41% increase in feeling private and a 0% change in actually being private. The glow is fully customizable across seven hues.",
      "Available for Chrome, Edge, and a Firefox build that does not technically work but is included in the price.",
    ],
    howItWorks: [
      "You install the extension.",
      "Private browsing windows now glow.",
      "Nothing else changes.",
    ],
    fakeBadges: ["Glow-Verified™", "Browser-Compatible™"],
    image: "/sites/privatrix/products/incognito-plus.png",
  },
  {
    slug: "anonymous-analytics",
    name: "Anonymous Analytics™",
    tier: "enterprise",
    category: "Incognito Theatre",
    tagline: "Tracks every user, then renames the column 'userId' to 'anonymousId.'",
    priceLabel: null,
    price: null,
    description: [
      "Anonymous Analytics™ is a privacy-respecting analytics platform that captures every user interaction across your properties and stores it in a fully de-identified manner. The de-identification process consists of renaming the database column `userId` to `anonymousId` at query time.",
      "All other identifying fields, including IP, device fingerprint, session token, and email, are retained at full fidelity. The product is marketed as 'fully anonymous' on the basis of the column-name change alone.",
      "Includes a 24/7 dashboard, a quarterly executive report, and an attestation that we are 'committed to user privacy.'",
    ],
    howItWorks: [
      "We capture every user interaction.",
      "At query time, we rename userId to anonymousId.",
      "We attest that the data is anonymous.",
    ],
    fakeBadges: ["Anonymity-Verified™", "GDPR-Adjacent™", "Aspirational Tier™"],
    image: "/sites/privatrix/products/anonymous-analytics.png",
  },
  {
    slug: "vpn-adjacent",
    name: "VPN-Adjacent Connection™",
    tier: "self-serve",
    category: "Incognito Theatre",
    tagline: "Routes traffic through a single server in New Jersey we own. Marketed as 'globally distributed.'",
    priceLabel: "$39 / mo",
    price: 39,
    description: [
      "VPN-Adjacent Connection™ provides a managed traffic routing service that protects your browsing through a globally distributed network of edge nodes. The network consists of one Dell PowerEdge server located in a closet in Trenton, New Jersey. We refer to it as 'globally distributed' because the closet has windows.",
      "All customer traffic transits a single shared connection with no logging policy except the logs we maintain for billing, debugging, and 'product improvement.'",
      "Includes a global region selector with 47 country flags, all of which route to New Jersey.",
    ],
    howItWorks: [
      "You select a country from the dropdown.",
      "Your traffic is routed to our server in Trenton.",
      "The map UI shows a glowing connection to your selected country.",
    ],
    fakeBadges: ["Globally Distributed™", "No-Log Policy*", "Aspirational Tier™"],
    image: "/sites/privatrix/products/vpn-adjacent.png",
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getRelatedProducts(slug: string, count = 3): Product[] {
  const filtered = products.filter((p) => p.slug !== slug)
  // Deterministic selection based on slug hash to avoid hydration mismatch
  const index = slug.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0)
  const start = index % filtered.length
  const result: Product[] = []
  for (let i = 0; i < count && i < filtered.length; i++) {
    result.push(filtered[(start + i) % filtered.length])
  }
  return result
}

export function getProductsByTier(tier: ProductTier): Product[] {
  return products.filter((p) => p.tier === tier)
}
