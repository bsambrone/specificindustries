import type { ShopCategoryKey } from "./categories"

export interface ProductSpec {
  label: string
  value: string
}

export interface Product {
  slug: string
  name: string
  designation: string                  // e.g., "ISPM Model 4A"
  categoryKey: ShopCategoryKey
  price: number                        // base unit price in dollars (used by cart)
  priceLabel: string                   // display string, may include units (e.g., "$395 / year")
  tagline: string
  description: string[]                // 2–3 paragraphs
  image: string
  whatItMeasures: string               // 2–3 sentences
  specs: ProductSpec[]                 // tabular specs
  methodologyNote: string              // 1 paragraph of epistemic hedging
  citedFindingSlugs: string[]          // 2–3 finding slugs
  relatedProductSlugs: string[]        // 2–3 upsell slugs
  testimonialPortraitSlugs: string[]   // 3 portrait slugs from the shared registry
  // Optional category-specific fields (present only where the template varies)
  curriculum?: { week: number; title: string; description: string }[]             // credentialing
  engagementScope?: string[]                                                      // advisory
  deliverables?: string[]                                                          // advisory
  pastIssues?: { label: string; title: string }[]                                  // quarterly-report only
}

export const products: Product[] = [
  {
    slug: "vibe-ring",
    name: "The Vibe Ring",
    designation: "ISPM Model 4A",
    categoryKey: "instruments",
    price: 349,
    priceLabel: "$349",
    tagline: "Passively samples ambient vibe density at 40 Hz.",
    description: [
      "The Vibe Ring is the Institute's flagship wearable, engineered to quantify the emotional resonance of any environment it occupies. Worn on the non-dominant hand, it gathers ambient vibe density readings continuously and transmits them to no one.",
      "Each ring is calibrated at the Institute's measurement bench, certified by the seal, and shipped in a velvet case bearing a signed certificate of epistemic provenance. Battery life is indefinite.",
    ],
    image: "/sites/pointlessmetrics/products/vibe-ring.png",
    whatItMeasures:
      "Ambient vibe density, expressed in vibe-units per cubic meter of enclosed meeting space. Readings are not shown to the wearer.",
    specs: [
      { label: "Sample rate", value: "40 Hz" },
      { label: "Weight", value: "6.2 g" },
      { label: "Material", value: "Medical-grade titanium; rose-gold finish" },
      { label: "Sizes", value: "US 5–13 (half sizes surcharged)" },
      { label: "Battery", value: "Indefinite" },
      { label: "Connectivity", value: "None (by design)" },
      { label: "Calibration interval", value: "Every 90 days, at an authorized bench" },
      { label: "Warranty", value: "See §4 of the EULA" },
    ],
    methodologyNote:
      "Vibe density is a derived quantity; it is not directly observable. The Vibe Ring infers it from temperature, capacitance, and the presence of adjacent Vibe Rings via a proprietary triangulation the Institute neither patents nor discloses.",
    citedFindingSlugs: ["houseplants-team-warmth", "exec-coffee-2pm-vibe", "free-snack-anxiety"],
    relatedProductSlugs: ["ambient-mood-barometer", "synergy-obelisk", "correlation-almanac"],
    testimonialPortraitSlugs: ["eleanor-whittaker", "nina-cabrera", "tony-mazetti"],
  },
  {
    slug: "synergy-obelisk",
    name: "The Synergy Obelisk",
    designation: "ISPM Model 12-D",
    categoryKey: "instruments",
    price: 895,
    priceLabel: "$895",
    tagline: "Three brass needle gauges. Zero network connections. Total clarity.",
    description: [
      "The Synergy Obelisk is the Institute's desktop reference instrument for the continuous passive monitoring of organizational health at the desk level. Its three brass needle gauges — Alignment, Momentum, and Synergy Density — respond to environmental inputs that the Institute has characterized in seventeen internal studies, none of which are publicly available.",
      "The Obelisk is not networked. It does not require software. It requires only presence, and a flat surface free of clutter that might confound the readings.",
    ],
    image: "/sites/pointlessmetrics/products/synergy-obelisk.png",
    whatItMeasures:
      "Organizational alignment, directional momentum, and ambient synergy density, each tracked on a dedicated brass needle gauge calibrated to the Institute's 100-point intangible scale. The three readings are intended to be read holistically, not summed.",
    specs: [
      { label: "Dimensions", value: "12 cm × 6 cm × 6 cm (H × W × D)" },
      { label: "Weight", value: "740 g (cast brass housing)" },
      { label: "Gauges", value: "3 × 70 mm brass needle, 0–100 intangible scale" },
      { label: "Sample rate", value: "Continuous (passive, mechanical)" },
      { label: "Material", value: "Cast brass, mahogany base, tempered glass face" },
      { label: "Connectivity", value: "None (by design)" },
      { label: "Calibration interval", value: "Annually, at an Institute-authorized bench" },
      { label: "Warranty", value: "3 years on mechanism; finish not warranted" },
    ],
    methodologyNote:
      "The Obelisk's three gauges respond to barometric pressure, ambient temperature differential, and electrostatic field density — all of which the Institute has established, through internal correspondence, correlate meaningfully with the organizational constructs their labels describe. External replication has not been sought.",
    citedFindingSlugs: ["all-hands-fiscal-optimism", "synergy-ma-announcements", "open-office-synergy-decline"],
    relatedProductSlugs: ["vibe-ring", "ambient-mood-barometer", "kpi-vibe-audit"],
    testimonialPortraitSlugs: ["francois-delacroix", "ryan-ashford", "beauregard-holt"],
  },
  {
    slug: "tarnishing-plaque",
    name: "The Tarnishing Plaque",
    designation: "ISPM Model 7-B",
    categoryKey: "instruments",
    price: 1250,
    priceLabel: "$1,250",
    tagline: "Culture drift, rendered in oxidized bronze.",
    description: [
      "The Tarnishing Plaque is the Institute's longitudinal culture instrument. Mounted on a wall in a high-traffic common area, the plaque accumulates tarnish at a rate the Institute has correlated — through a seven-year observational study — with the rate of cultural drift within the organization. The plaque does not lie. It simply darkens.",
      "Each plaque ships with an annual re-polishing kit, a calibration card noting the initial luster rating at time of shipment, and instructions for interpreting the rate of tarnish as a proportional representation of organizational decline. The plaque is engraved with the Institute seal and a unique instrument serial number.",
    ],
    image: "/sites/pointlessmetrics/products/tarnishing-plaque.png",
    whatItMeasures:
      "Cumulative culture drift, expressed as the delta between initial luster and current luster, assessed quarterly against the Institute's Organizational Tarnish Index. One re-polish per year resets the index to baseline.",
    specs: [
      { label: "Dimensions", value: "20 cm × 15 cm (W × H), 4 mm relief depth" },
      { label: "Weight", value: "1.1 kg (cast bronze)" },
      { label: "Material", value: "C220 bronze, brass mounting hardware" },
      { label: "Tarnish rate", value: "Calibrated to ambient humidity; see calibration card" },
      { label: "Calibration interval", value: "Annual (polishing kit included)" },
      { label: "Includes", value: "Polishing kit, calibration card, mounting template" },
      { label: "Connectivity", value: "None" },
      { label: "Warranty", value: "10 years (structural); tarnish is a feature, not a defect" },
    ],
    methodologyNote:
      "Tarnish formation in C220 bronze is a function of atmospheric sulfur compounds, humidity, and surface contact frequency — three variables the Institute's longitudinal study found to track, at r = 0.79, with employee turnover intention scores. The plaque is the instrument. The organization is the subject.",
    citedFindingSlugs: ["offsites-severance-accrual", "holiday-card-complexity-layoffs", "all-hands-cadence-exit-package"],
    relatedProductSlugs: ["wall-plaque", "synergy-obelisk", "kpi-vibe-audit"],
    testimonialPortraitSlugs: ["simone-archer", "derek-pullman", "warren-duvall"],
  },
  {
    slug: "ambient-mood-barometer",
    name: "The Ambient Mood Barometer",
    designation: "ISPM Model 3",
    categoryKey: "instruments",
    price: 465,
    priceLabel: "$465",
    tagline: "Meeting-room sentiment, expressed in fluid mechanics.",
    description: [
      "The Ambient Mood Barometer is a glass tube instrument containing a proprietary thermoresponsive fluid formulated by the Institute's materials division. As meeting-room temperature and air pressure fluctuate in response to the density and emotional intensity of occupancy, the fluid rises and falls, providing a continuous passive readout of ambient sentiment.",
      "Each barometer arrives pre-calibrated to neutral — a reading of 50% fill height — and ships with a reference card mapping fluid levels to sentiment bands (Cautious Optimism, Guarded Uncertainty, Ambient Concern, Elevated Anxiety). The color of the fluid is vermilion by default; ochre available on request.",
    ],
    image: "/sites/pointlessmetrics/products/ambient-mood-barometer.png",
    whatItMeasures:
      "Ambient meeting-room sentiment, expressed as a continuous fill-height reading on the Institute's five-band Sentiment Scale. The barometer is sensitive to temperature gradients exceeding 0.4°C, which the Institute has characterized as the threshold of measurable mood shift.",
    specs: [
      { label: "Dimensions", value: "38 cm H × 4 cm diameter" },
      { label: "Weight", value: "320 g (with fluid)" },
      { label: "Tube material", value: "Borosilicate glass, sealed" },
      { label: "Fluid", value: "Proprietary thermoresponsive compound (non-toxic)" },
      { label: "Fluid colors", value: "Vermilion (standard); ochre (on request)" },
      { label: "Calibration", value: "Factory pre-calibrated to neutral (50% fill)" },
      { label: "Calibration interval", value: "Every 18 months" },
      { label: "Warranty", value: "2 years (breakage excluded)" },
    ],
    methodologyNote:
      "The barometer's fluid column responds to thermodynamic conditions within the room. The Institute has established, through a controlled study of 867 meeting-room observations, that these thermodynamic conditions track perceived team warmth at r = 0.88 and ambient anxiety at r = 0.80. The instrument does not measure mood; it measures the conditions under which mood has been observed.",
    citedFindingSlugs: ["ping-pong-proximity-tenure-inverse", "free-snack-anxiety", "houseplants-team-warmth"],
    relatedProductSlugs: ["vibe-ring", "synergy-obelisk", "correlation-almanac"],
    testimonialPortraitSlugs: ["brenda-faulk", "tamara-voss", "kyle-brandt"],
  },
  {
    slug: "quarterly-report",
    name: "The Quarterly Synergy Density Report",
    designation: "ISPM Publication Series, Annual Subscription",
    categoryKey: "publications",
    price: 395,
    priceLabel: "$395 / year",
    tagline: "Four issues per year. PDF delivery. The Institute seal on every cover.",
    description: [
      "The Quarterly Synergy Density Report is the Institute's flagship publication, issued four times per year to subscribers worldwide. Each issue presents five to seven new findings, one invited commentary from a principal investigator, and a brief editorial from the Director on the state of pointless measurement.",
      "Current issue: Q1 2026 — The Collapse of Alignment in Post-Hybrid Teams. PDF delivered within 48 hours of subscription confirmation. Back issues available in the subscriber archive.",
    ],
    image: "/sites/pointlessmetrics/products/quarterly-report.png",
    whatItMeasures:
      "The quarterly state of synergy density across the organizational landscape, as observed by the Institute's research staff and peer-reviewed by a board of the Institute's own selecting. Measures nothing, describes everything.",
    specs: [
      { label: "Format", value: "PDF, A4, Institute crest cover" },
      { label: "Issues per year", value: "4 (Q1–Q4)" },
      { label: "Delivery", value: "Email within 48 hours of publication" },
      { label: "Archive access", value: "Full back-issue archive included" },
      { label: "Subscription term", value: "Annual (auto-renews)" },
      { label: "Word count", value: "Approximately 14,000 words per issue" },
    ],
    methodologyNote:
      "Editorial content is prepared by the Institute's research staff and reviewed by the Institute's internal peer-review board. The board meets quarterly, has never rejected a submission from the Institute, and its members are not disclosed for reasons the editorial policy describes as 'methodological integrity.'",
    citedFindingSlugs: ["alignment-in-okrs-inverse", "synergy-ma-announcements", "innovation-mission-patents-inverse"],
    relatedProductSlugs: ["correlation-almanac", "certified-practitioner", "kpi-vibe-audit"],
    testimonialPortraitSlugs: ["marcus-chen", "jason-kile", "theodora-lindquist"],
    pastIssues: [
      { label: "Q4 2025", title: "Synergy Density in the Post-Merger Workplace: A Cross-Sectional Analysis" },
      { label: "Q3 2025", title: "The Alignment Paradox: Why Agreement Precedes Divergence in High-Performing Teams" },
      { label: "Q2 2025", title: "Ambient Optimism Indices and the Quarterly All-Hands: A Longitudinal Study" },
      { label: "Q1 2025", title: "Measuring What Cannot Be Managed: The State of Intangible KPIs in Hybrid Organizations" },
    ],
  },
  {
    slug: "correlation-almanac",
    name: "The Correlation Almanac",
    designation: "ISPM Annual Reference Edition",
    categoryKey: "publications",
    price: 149,
    priceLabel: "$149",
    tagline: "312 spurious correlations, indexed by variable. 600+ pages.",
    description: [
      "The Correlation Almanac is the Institute's annual compendium of the year's most notable spurious correlations, drawn from the Institute's own research, contributed findings from Certified Practitioners, and a selection of correlations observed in the wild and subsequently peer-reviewed by the Institute's internal board.",
      "The current edition spans 614 pages, organizes 312 correlations across 18 variable categories, and includes a comprehensive cross-index by r-value, p-value, and funding source. Hardcover. Ships within 5 business days.",
    ],
    image: "/sites/pointlessmetrics/products/correlation-almanac.png",
    whatItMeasures:
      "The state of spurious correlation as a discipline, documented annually in a format the Institute believes will outlast the findings themselves. Each entry includes the correlation coefficient, sample size, principal investigator, and a one-sentence interpretation that the Institute advises readers not to act upon.",
    specs: [
      { label: "Format", value: "Hardcover, smyth-sewn binding" },
      { label: "Pages", value: "614 (current edition)" },
      { label: "Correlations indexed", value: "312" },
      { label: "Variable categories", value: "18" },
      { label: "Dimensions", value: "24 cm × 17 cm × 4.2 cm" },
      { label: "Weight", value: "1.3 kg" },
      { label: "Ships", value: "Within 5 business days" },
      { label: "Warranty", value: "None (it is a book)" },
    ],
    methodologyNote:
      "Entries are selected by the Institute's editorial panel using criteria that are proprietary, consistent, and not made available to contributors. Correlations with r-values below 0.70 are excluded on grounds of insufficient drama. The Almanac does not claim that any correlation indexed herein is causal; it merely notes that it exists.",
    citedFindingSlugs: ["standing-desk-ecosystem-language", "slack-emoji-document-length-inverse", "journey-all-hands-pivots"],
    relatedProductSlugs: ["quarterly-report", "certified-practitioner", "vibe-ring"],
    testimonialPortraitSlugs: ["patricia-hollowell", "clement-ashby", "fenella-ostrom"],
  },
  {
    slug: "kpi-vibe-audit",
    name: "KPI Vibe Audit",
    designation: "ISPM Advisory Engagement, Half-Day",
    categoryKey: "advisory",
    price: 4500,
    priceLabel: "$4,500",
    tagline: "Two fellows. 47 intangibles. 80 pages of findings you cannot act on.",
    description: [
      "The KPI Vibe Audit is the Institute's on-site flagship engagement. Two Institute fellows spend a half-day at your location, observing, measuring, and recording against the Institute's 47-point Intangible Assessment Framework. At the conclusion of the engagement, they leave without debriefing.",
      "Deliverables arrive by post within 21 business days: an 80-page bound audit report detailing the organization's scores across all 47 intangibles, a Certificate of Measured Status suitable for framing, and a one-page executive summary the Institute strongly recommends against distributing.",
    ],
    image: "/sites/pointlessmetrics/products/kpi-vibe-audit.png",
    whatItMeasures:
      "Forty-seven organizational intangibles including, but not limited to: hallway energy, calendar density, vibe alignment, synergy entropy, leadership presence coefficient, ambient urgency, and lunch-hour sentiment index.",
    specs: [
      { label: "Engagement length", value: "Half-day (4 hours on-site)" },
      { label: "Fellows dispatched", value: "2" },
      { label: "Intangibles measured", value: "47" },
      { label: "Report length", value: "80 pages, bound" },
      { label: "Delivery", value: "By post, within 21 business days" },
      { label: "Follow-up", value: "None (by design)" },
      { label: "Travel", value: "Within 150 km of Institute office; surcharge beyond" },
    ],
    methodologyNote:
      "Fellows operate under the Institute's Observational Measurement Protocol, which governs data collection, notation standards, and the non-disclosure of measurement instruments used on-site. The 47-point framework is not published; it is administered.",
    citedFindingSlugs: ["alignment-in-okrs-inverse", "open-office-synergy-decline", "fitbit-manager-nps-inflation"],
    relatedProductSlugs: ["correlation-coaching", "tarnishing-plaque", "synergy-obelisk"],
    testimonialPortraitSlugs: ["chad-gullet", "asher-bloom", "orson-pepperdine"],
    engagementScope: [
      "On-site observation of 47 organizational intangibles using the Institute's proprietary Assessment Framework",
      "Measurement of hallway energy, calendar density, vibe alignment, synergy entropy, and 43 additional dimensions",
      "Fellow-conducted environmental sampling using ISPM Model instruments throughout the visit",
      "Documentation of spatial configuration, ambient audio levels, and interpersonal proximity indices",
      "Post-engagement calibration review conducted off-site by the Institute's measurement review board",
    ],
    deliverables: [
      "80-page bound audit report with scores across all 47 intangibles, indexed by department and floor",
      "Certificate of Measured Status, suitable for framing, bearing the Institute seal and audit date",
      "One-page executive summary (distribution not recommended)",
      "Organizational Intangible Profile chart, suitable for inclusion in board materials",
      "Written attestation that the engagement was conducted in accordance with ISPM Observational Standards",
    ],
  },
  {
    slug: "correlation-coaching",
    name: "Correlation Coaching",
    designation: "ISPM Advisory Retainer, Monthly",
    categoryKey: "advisory",
    price: 2800,
    priceLabel: "$2,800 / mo",
    tagline: "Weekly 1:1 sessions. No actionable insights. By design.",
    description: [
      "Correlation Coaching is the Institute's ongoing advisory retainer, designed for leaders who have identified correlations in their KPI data and require structured support in developing those observations into fully non-actionable insights. Minimum engagement is three months.",
      "Each week, a senior Institute fellow meets with the client for a 50-minute session. The fellow listens, asks clarifying questions about sample sizes and variable definitions, and produces a session memo that documents the correlation without recommending any response to it. Over three months, most clients find that the problem they were most concerned about is no longer legible as a problem.",
    ],
    image: "/sites/pointlessmetrics/products/correlation-coaching.png",
    whatItMeasures:
      "The depth and complexity of correlational thinking within the client's leadership practice, tracked weekly over the retainer period against the Institute's Coaching Progress Index. Progress is not a goal; it is an observation.",
    specs: [
      { label: "Engagement term", value: "3-month minimum" },
      { label: "Session cadence", value: "Weekly, 50 minutes" },
      { label: "Format", value: "Video or in-person (within 30 km)" },
      { label: "Fellow", value: "1 senior Institute fellow, assigned at intake" },
      { label: "Session memo", value: "Delivered within 2 business days of each session" },
      { label: "Actionable insights", value: "None (by design)" },
      { label: "Cancellation policy", value: "See §7 of the engagement agreement" },
    ],
    methodologyNote:
      "The coaching methodology is grounded in the Institute's theory of correlational containment: the practice of naming a spurious relationship clearly enough that no one is compelled to do anything about it. Fellows are trained to reflect findings back to clients without implication or recommendation.",
    citedFindingSlugs: ["alignment-in-okrs-inverse", "take-this-offline-random-growth", "transparency-usage-transcripts-inverse"],
    relatedProductSlugs: ["kpi-vibe-audit", "quarterly-report", "correlation-almanac"],
    testimonialPortraitSlugs: ["margot-finch", "rosalind-keck", "eamon-trestle"],
    engagementScope: [
      "Weekly 50-minute 1:1 sessions with an assigned senior Institute fellow",
      "Structured review of the client's active KPI correlations and measurement concerns",
      "Application of the Institute's Correlational Containment Method to each named relationship",
      "Ongoing calibration of the client's intangible measurement vocabulary",
      "Access to the Institute's practitioner reference materials during the retainer period",
    ],
    deliverables: [
      "Session memo after each weekly engagement, documenting the correlation discussed and the fellow's observations",
      "Monthly summary memo synthesizing the month's sessions into a cohesive non-narrative",
      "End-of-retainer Coaching Completion Certificate bearing the Institute seal",
      "Final Correlational Profile document mapping the client's observed data relationships without interpretation",
    ],
  },
  {
    slug: "certified-practitioner",
    name: "Certified Pointless Metrics Practitioner™",
    designation: "ISPM Credential Program, 8-Week Cohort",
    categoryKey: "credentialing",
    price: 2495,
    priceLabel: "$2,495",
    tagline: "Eight weeks to certification in the measurement of the immeasurable.",
    description: [
      "The Certified Pointless Metrics Practitioner™ credential is the Institute's flagship professional program. Over eight weeks, practitioners master the fourteen core competencies of pointless measurement, complete a capstone project, and sit for a written examination no one has yet passed on the first attempt.",
      "Graduates receive a digital credential, a LinkedIn badge, and a bronze lapel pin engraved with the Institute seal and a unique credential number that is not tracked in any database.",
      "The program is not accredited. By design.",
    ],
    image: "/sites/pointlessmetrics/products/certified-practitioner.png",
    whatItMeasures:
      "The practitioner's capacity to measure that which ought not be measured, applied across eight weeks of structured curriculum and one fake exam.",
    specs: [
      { label: "Duration", value: "8 weeks" },
      { label: "Format", value: "Asynchronous online with weekly synchronous seminar" },
      { label: "Cohort size", value: "Capped at 120" },
      { label: "CEUs", value: "0.0 (program is not accredited)" },
      { label: "Credential", value: "Digital badge + bronze lapel pin" },
      { label: "Accreditation", value: "See §11 of the Disclosure" },
    ],
    methodologyNote:
      "The curriculum is derived from the Institute's internal practitioner's handbook, now in its fourth revision. Proficiency is measured via a capstone deliverable graded by two faculty members who do not confer.",
    citedFindingSlugs: ["alignment-in-okrs-inverse", "bookshelf-density-fundraise", "ceo-linkedin-attrition"],
    relatedProductSlugs: ["quarterly-report", "correlation-almanac", "wall-plaque"],
    testimonialPortraitSlugs: ["dr-moira-petrescu", "priscilla-voss-bingham", "caldwell-briggs"],
    curriculum: [
      { week: 1, title: "Foundations of Pointless Measurement", description: "Epistemology, instrument calibration, and the ethics of measuring without purpose." },
      { week: 2, title: "The Correlational Toolkit", description: "Scatter-plot construction, spurious r-values, and the confidence interval as narrative device." },
      { week: 3, title: "Measuring the Intangible", description: "Operationalizing gravitas, warmth, alignment, synergy, and vibe." },
      { week: 4, title: "Methodology Without Consequence", description: "Designing studies that cannot be falsified or applied." },
      { week: 5, title: "The Language of Rigor", description: "Footnote discipline, citation hygiene, and the rhetorical use of p-values." },
      { week: 6, title: "The Advisory Engagement", description: "Field methods for on-site measurement; the half-day audit playbook." },
      { week: 7, title: "Dissemination and Defense", description: "Publishing through channels the Institute controls; peer review as a collegial activity." },
      { week: 8, title: "Capstone and Examination", description: "Deliver a bespoke study on a variable of the practitioner's choosing; sit for the written exam." },
    ],
  },
  {
    slug: "sticker-pack",
    name: "Personal Brand Alignment Sticker Pack",
    designation: "ISPM Certified Merchandise, Series 1",
    categoryKey: "merchandise",
    price: 24,
    priceLabel: "$24",
    tagline: "12 vanity-URL QR stickers. One for every water bottle occasion.",
    description: [
      "The Personal Brand Alignment Sticker Pack contains twelve precision-printed QR code stickers, each encoding a unique vanity URL. When scanned, each URL resolves to a deterministic micro-dashboard that computes the scanner's Personal Brand Alignment Score from the URL hash — a number between 74 and 97, always rendered to two decimal places.",
      "Each sticker measures 4 cm × 4 cm, is rated for outdoor UV exposure, dishwasher-safe up to 65°C, and bears the Institute seal in a 3 mm border. Suitable for water bottles, laptops, hard hats, and the backs of name badges at conferences where this kind of thing is tolerated.",
    ],
    image: "/sites/pointlessmetrics/products/sticker-pack.png",
    whatItMeasures:
      "Personal Brand Alignment, a composite index derived from URL hash entropy and the Institute's proprietary Brand Resonance Model. The score is deterministic per sticker, consistent across scans, and not correlated with anything.",
    specs: [
      { label: "Quantity", value: "12 stickers per pack" },
      { label: "Dimensions", value: "4 cm × 4 cm each" },
      { label: "Material", value: "Vinyl, UV-resistant laminate" },
      { label: "Waterproof", value: "Yes; dishwasher-safe to 65°C" },
      { label: "QR content", value: "Unique vanity URL per sticker" },
      { label: "Score range", value: "74.00–97.99 (deterministic per URL)" },
      { label: "Institute seal", value: "3 mm printed border on each sticker" },
      { label: "Warranty", value: "None (they are stickers)" },
    ],
    methodologyNote:
      "Personal Brand Alignment is computed at the URL level using a hash-based scoring function derived from the Institute's Brand Resonance Model (internal publication, not publicly available). Scores are not calibrated against external benchmarks and should not be interpreted as assessments of actual personal brand performance, which the Institute does not believe is measurable.",
    citedFindingSlugs: ["exec-patagonia-vest-board-sentiment", "ceo-linkedin-attrition", "vendor-logo-saturation-churn"],
    relatedProductSlugs: ["wall-plaque", "pocket-ruler", "certified-practitioner"],
    testimonialPortraitSlugs: ["hattie-bronwyn", "linda-morrissey", "judson-hale"],
  },
  {
    slug: "wall-plaque",
    name: "Certified Measured™ Wall Plaque",
    designation: "ISPM Certified Merchandise, Series 2",
    categoryKey: "merchandise",
    price: 129,
    priceLabel: "$129",
    tagline: "Your name. A real r-value. The Institute seal. Framed.",
    description: [
      "The Certified Measured™ Wall Plaque is a laser-engraved bronze-finish plaque bearing the recipient's name, a randomly assigned r-value between 0.72 and 0.94, the date of issue, and the Institute seal. It is not awarded for any achievement. It is awarded for existing, which the Institute considers sufficient.",
      "Each plaque is produced on 4 mm aluminum composite with a bronze powder-coat finish, engraved by laser at 600 dpi. Ships in a gift box with a certificate of issuance confirming the r-value was assigned by a certified Institute randomization process and has not been adjusted post-issuance.",
    ],
    image: "/sites/pointlessmetrics/products/wall-plaque.png",
    whatItMeasures:
      "Nothing, specifically. The r-value on each plaque represents the recipient's correlation with an unnamed reference variable, selected at the time of production from the Institute's internal variable register. The variable is not disclosed and cannot be queried.",
    specs: [
      { label: "Dimensions", value: "25 cm × 20 cm (W × H)" },
      { label: "Material", value: "4 mm aluminum composite, bronze powder-coat" },
      { label: "Engraving", value: "Laser, 600 dpi" },
      { label: "r-value range", value: "0.72–0.94 (randomly assigned at production)" },
      { label: "Mounting", value: "4 × countersunk holes; wall anchors included" },
      { label: "Includes", value: "Gift box, certificate of issuance" },
      { label: "Customization", value: "Name field only; r-value is not adjustable" },
      { label: "Warranty", value: "5 years (structural); finish not warranted" },
    ],
    methodologyNote:
      "The r-value assignment process employs a certified pseudo-random number generator seeded from the date of production. The Institute maintains a log of issued r-values by serial number but does not associate them with recipient names, preserving both institutional integrity and recipient privacy. The reference variable against which the recipient is correlated is selected from the Institute's variable register at the time of engraving and is not disclosed.",
    citedFindingSlugs: ["humble-ceo-interviews-inverse", "bookshelf-density-fundraise", "exec-water-bottle-reorg"],
    relatedProductSlugs: ["tarnishing-plaque", "sticker-pack", "certified-practitioner"],
    testimonialPortraitSlugs: ["greg-diane-hofstra", "marcus-chen", "beauregard-holt"],
  },
  {
    slug: "pocket-ruler",
    name: "Pocket Ruler for Intangibles",
    designation: "ISPM Certified Merchandise, Series 3",
    categoryKey: "merchandise",
    price: 39,
    priceLabel: "$39",
    tagline: "Non-linear units only. Ships with calibration card.",
    description: [
      "The Pocket Ruler for Intangibles is a 15 cm brass ruler with five non-linear measurement scales: Gravitas, Vibe, Optionality, Runway, and Warmth. Each scale is unique; none of them are in millimeters. The divisions are hand-engraved, unevenly spaced, and internally consistent within each scale.",
      "Ships with a laminated calibration card defining each unit and its reference conditions, and a brief guide to selecting the appropriate scale for the intangible at hand. A popular companion to the Institute's field instruments and a necessary tool for any Certified Practitioner.",
    ],
    image: "/sites/pointlessmetrics/products/pocket-ruler.png",
    whatItMeasures:
      "Five categories of intangible magnitude — Gravitas, Vibe, Optionality, Runway, and Warmth — each on its own non-linear scale. No two scales share a unit. The ruler does not convert between scales.",
    specs: [
      { label: "Length", value: "15 cm (the ruler itself; scale lengths vary)" },
      { label: "Material", value: "Solid brass, brushed finish" },
      { label: "Weight", value: "42 g" },
      { label: "Scales", value: "5 (Gravitas, Vibe, Optionality, Runway, Warmth)" },
      { label: "Scale divisions", value: "Non-linear; hand-engraved" },
      { label: "Includes", value: "Laminated calibration card, unit definitions" },
      { label: "Pocket clip", value: "Not included (ruler is pocketable without)" },
      { label: "Warranty", value: "Lifetime on engraving; patina not warranted" },
    ],
    methodologyNote:
      "Each scale on the Pocket Ruler was derived from an internal Institute study mapping physical length ratios to perceived magnitude in the named intangible domain. The mapping functions are proprietary and are not reproduced on the ruler or calibration card. Practitioners are advised to use the ruler consistently and to resist the urge to convert its readings into conventional units.",
    citedFindingSlugs: ["vendor-logo-saturation-churn", "exec-water-bottle-reorg", "take-this-offline-random-growth"],
    relatedProductSlugs: ["vibe-ring", "sticker-pack", "wall-plaque"],
    testimonialPortraitSlugs: ["tony-mazetti", "jason-kile", "kyle-brandt"],
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(categoryKey: ShopCategoryKey): Product[] {
  return products.filter((p) => p.categoryKey === categoryKey)
}
