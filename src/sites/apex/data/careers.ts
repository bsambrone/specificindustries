export type CareersVertical =
  | "consumer-goods"
  | "hygiene"
  | "health-wellness"
  | "subscription-services"
  | "professional-services"
  | "corporate"

export interface JobCompensation {
  summary: string
  lines: string[]
  note?: string
}

export interface JobListing {
  slug: string
  title: string
  vertical: CareersVertical
  location: string
  employmentType: string
  postedLine: string
  summary: string
  about: string[]
  responsibilities: string[]
  qualifications: string[]
  preferredQualifications?: string[]
  compensation: JobCompensation
  benefitsOverride?: string[]
}

export const jobs: JobListing[] = [
  // ===== Consumer Goods & Consumables (5) =====
  {
    slug: "director-niche-market-analytics",
    title: "Director of Niche Market Analytics",
    vertical: "consumer-goods",
    location: "Remote · must be reachable between 4:00 and 4:07 AM EST",
    employmentType: "Full-time",
    postedLine: "Posted September 2019 · reposted every quarter since",
    summary: "Lead quantitative evaluation of markets with fewer than 400 participants.",
    about: [
      "The Director of Niche Market Analytics is responsible for the firm's quantitative evaluation of markets with addressable populations too small for conventional segmentation. The role reports directly to the Chief Portfolio Officer and dotted-line to no one in particular.",
      "This position has been open since 2019 and was last filled briefly in 2022. The individual who held it did not leave a transition document. We have chosen not to recover it.",
    ],
    responsibilities: [
      "Develop and maintain the firm's proprietary Market Under Four Hundred People™ scoring framework",
      "Produce quarterly market sizing reports on industries whose participants could fit in a small banquet hall",
      "Lead the rejection review process for industries that 'feel too big'",
      "Attend 1 of 4 scheduled quarterly board meetings",
      "Maintain the category taxonomy described internally as 'approximately correct'",
      "Own the category 'Industries That Arguably Should Not Exist' as a distinct line item",
      "Deliver findings in a format that can be read aloud without prepared remarks",
    ],
    qualifications: [
      "10+ years of experience in category analytics or adjacent discipline",
      "Familiarity with markets that have never been formally measured",
      "Comfort producing data visualizations that are technically accurate but difficult to act on",
      "Demonstrated ability to remain calm during Q3 reviews",
      "Ability to attend 1 of 4 scheduled meetings per quarter",
    ],
    preferredQualifications: [
      "Experience with category names that are one word longer than they need to be",
      "Familiarity with the Specific Industries framework for 'markets too specific to segment'",
      "Prior history of declining invited speaking engagements",
    ],
    compensation: {
      summary: "$110k–$480k + unlimited sparkling water",
      lines: [
        "Base salary: $110,000 – $480,000, determined annually by a rubric not shared with the incumbent",
        "Bonus eligibility: participation in the Annual Discretionary Discretion Pool",
        "Unlimited sparkling water (flavored and plain) delivered on-site",
        "One (1) commemorative Specific Industries pen set on hire",
        "Equity in the portfolio company of your choice*",
      ],
      note: "*Equity subject to legal review, ongoing since 2017.",
    },
  },
  {
    slug: "head-portfolio-consumables-ingestibles",
    title: "Head of Portfolio Consumables (Ingestibles)",
    vertical: "consumer-goods",
    location: "Corporate HQ (Virtual) · occasional travel to the cheese facility",
    employmentType: "Full-time · Indefinite",
    postedLine: "Posted March 2021 · posting has not been revised",
    summary: "Oversee the ingestible subset of our consumables portfolio.",
    about: [
      "The Head of Portfolio Consumables (Ingestibles) oversees the ingestible subset of the consumer-goods vertical. This includes pig milk, dehydrated water, boneless water, snortables, and future ingestibles that have not yet been classified as ingestibles.",
      "The role demands unusual composure during product demonstrations.",
    ],
    responsibilities: [
      "Chair the monthly Ingestible Review Committee, which has produced zero formal findings since 2022",
      "Coordinate cross-brand marketing where 'drinkable' is a contested category",
      "Serve as the firm's primary interface with consumers who are both confused and committed",
      "Adjudicate whether a new product is properly classified as an ingestible or an adjacent consumable",
      "Maintain the current ingestible-safety stance, which is: we defer to the brands",
      "Host the quarterly tasting, at which no attendance has ever been recorded",
    ],
    qualifications: [
      "15+ years in consumer consumables, or 3 years in ingestibles specifically",
      "Willingness to taste a product before formally endorsing it",
      "Comfortable working across brand teams that occasionally disagree on physics",
    ],
    compensation: {
      summary: "$140k + quarterly cheese wheel",
      lines: [
        "Base: $140,000 – $220,000 depending on negotiating posture",
        "Quarterly cheese wheel allocation (Gouda or Manchego, recipient's choice)",
        "Unlimited samples from every ingestible brand (subject to brand stock)",
        "Reserved parking at the Corporate HQ (virtual)",
        "Annual stipend for 'personal tasting apparatus' (no receipts required under $200)",
      ],
    },
  },
  {
    slug: "senior-manager-product-viability-under-400",
    title: "Senior Manager, Product Viability (Markets Under 400 People)",
    vertical: "consumer-goods",
    location: "Remote · one required in-person per year, location TBD",
    employmentType: "Full-time",
    postedLine: "Posted July 2020 · reposted annually on July 14",
    summary: "Assess product viability in markets whose participants could fit in a mid-size elevator.",
    about: [
      "Candidates must be comfortable declaring products 'viable' under conditions that would not meet conventional viability standards.",
    ],
    responsibilities: [
      "Screen incoming acquisition candidates against the Under-400 framework",
      "Produce go/no-go recommendations where 'no-go' is not an expected outcome",
      "Author follow-up memos that do not require follow-up",
      "Maintain a working relationship with the Director of Niche Market Analytics, who will not reply to most messages",
    ],
    qualifications: [
      "Prior product management experience, preferably in categories that did not launch",
      "Strong written recommendations with clear conclusions of moderate confidence",
      "Tolerance for meetings that are described as 'brief'",
    ],
    compensation: {
      summary: "$95k–$240k + pistachios",
      lines: [
        "Base: $95,000 – $240,000",
        "All you can eat pistachios (shelled; unshelled available on request after 12 months)",
        "Unlimited access to the snacks vending machine (Specific Industries-branded wrappers)",
        "One (1) commemorative plaque annually recognizing a contribution to be determined",
      ],
    },
  },
  {
    slug: "associate-packaging-language-review",
    title: "Associate, Packaging Language Review",
    vertical: "consumer-goods",
    location: "Hybrid · packaging warehouse, unheated",
    employmentType: "Full-time",
    postedLine: "Posted 2022 · repost backlog under review",
    summary: "Review every word on every package for tone, implication, and inadvertent truth.",
    about: [
      "This role is the firm's final line of defense against packaging copy that says more than we intended. The Associate reviews every word on every SKU across the portfolio before print.",
    ],
    responsibilities: [
      "Review all new packaging copy for hidden enthusiasm",
      "Flag any usage of 'exciting,' 'revolutionary,' or 'life-changing'",
      "Maintain the portfolio-wide list of banned adjectives (currently 347 entries)",
      "Work directly with brand teams who remain attached to their original copy",
      "Produce the weekly 'Surprising Word Uses' digest for internal circulation",
    ],
    qualifications: [
      "BA in English, Linguistics, or unrelated discipline with a strong grammar habit",
      "Discipline not to correct anyone in meetings",
      "Comfortable with the word 'satisfactory' as a summary",
    ],
    compensation: {
      summary: "$62k–$78k + unlimited paper towels",
      lines: [
        "Base: $62,000 – $78,000",
        "Unlimited paper towels (bulk, single-ply)",
        "Access to the proprietary Specific Industries style guide (247 pages)",
        "One branded tote bag annually",
        "Lunch is not provided but is well-tolerated",
      ],
    },
  },
  {
    slug: "vp-beverage-category-strategy",
    title: "VP of Beverage Category Strategy",
    vertical: "consumer-goods",
    location: "Remote · up to 45% travel to hydration events",
    employmentType: "Full-time",
    postedLine: "Posted May 2021 · reviewed quarterly",
    summary: "Drive strategic direction across all beverage portfolio brands (dehydrated, boneless, and pig-sourced).",
    about: [
      "The VP of Beverage Category Strategy leads all cross-brand beverage strategy. The category includes Dehydrated Water, Boneless Water, and Pig Milk. A beverage is defined for the purposes of this role as 'anything we can pour.'",
    ],
    responsibilities: [
      "Maintain the portfolio beverage taxonomy",
      "Resolve category disputes between brand teams",
      "Produce an annual beverage strategy memo that does not contradict last year's memo in writing",
      "Represent Specific Industries at beverage industry conferences we have not been invited to",
    ],
    qualifications: [
      "12+ years in beverage strategy or adjacent category",
      "Comfortable with categories whose participants disagree on what a beverage is",
      "Experience writing memos on topics the author has not fully resolved",
    ],
    compensation: {
      summary: "$180k–$520k + executive parking",
      lines: [
        "Base: $180,000 – $520,000",
        "Executive parking spot at Corporate HQ (virtual) on alternate Tuesdays",
        "Quarterly beverage sample kit (assorted, curated)",
        "Title of 'Principal Beverage Fellow' on internal org chart (informal)",
      ],
    },
  },

  // ===== Personal Hygiene & Home Essentials (3) =====
  {
    slug: "head-bathroom-humor-division",
    title: "Head of Bathroom Humor Division",
    vertical: "hygiene",
    location: "Remote · occasional factory visits to TrueGrit and Seel-Tite",
    employmentType: "Full-time · Executive",
    postedLine: "Posted January 2023 · current priority hire",
    summary: "Oversee strategy, positioning, and cross-brand coordination across the Hygiene vertical.",
    about: [
      "The Head of Bathroom Humor Division oversees strategy across the Hygiene vertical — currently TrueGrit Personal Care and Seel-Tite Containment Systems, with additional bathroom-adjacent brands pending.",
      "This is the first executive-tier role dedicated to the vertical. The successful candidate will not describe the work as a joke.",
    ],
    responsibilities: [
      "Set vertical strategy for all Hygiene portfolio brands",
      "Manage brand leads at TrueGrit and Seel-Tite",
      "Identify and evaluate future hygiene-adjacent acquisition targets",
      "Chair the Hygiene Category Leadership Council (to be formed)",
      "Represent the vertical at portfolio strategy reviews",
      "Maintain brand tone integrity — deadpan, never winking",
    ],
    qualifications: [
      "Senior executive experience in consumer hygiene or adjacent",
      "Ability to hold a meeting on bathroom products without laughing",
      "Strong written and verbal communication in a professional register",
      "Prior experience launching a product adjacent to the human body",
    ],
    preferredQualifications: [
      "Experience with industrial-grade personal care",
      "Comfort with product demos involving silicone or abrasive materials",
    ],
    compensation: {
      summary: "$195k–$780k + creative latitude",
      lines: [
        "Base: $195,000 – $780,000, inversely correlated with weekly meeting attendance",
        "Unlimited cold brew (at-desk only; no to-go cups)",
        "Executive parking space on alternate Tuesdays",
        "One (1) personalized nameplate per calendar year",
        "Lifetime supply of branded Seel-Tite and TrueGrit product samples",
        "Equity in the portfolio company of your choice*",
      ],
      note: "*Equity pending legal review, ongoing since 2017.",
    },
  },
  {
    slug: "senior-director-restroom-category-innovation",
    title: "Senior Director, Restroom Category Innovation",
    vertical: "hygiene",
    location: "Hybrid · 2-3 days in the R&D facility",
    employmentType: "Full-time",
    postedLine: "Posted 2023 · active pipeline",
    summary: "Lead R&D pipeline for next-generation restroom category products across the Hygiene vertical.",
    about: [
      "The Senior Director leads the restroom category R&D pipeline across the Hygiene portfolio, working with brand-side product teams at TrueGrit and Seel-Tite to identify next-generation opportunities.",
      "The role is engineering-adjacent but category-focused. The incumbent does not need to personally calibrate a gasket.",
    ],
    responsibilities: [
      "Maintain the 3-year hygiene R&D pipeline across the portfolio",
      "Evaluate and prioritize patent filings",
      "Coordinate with brand engineering leads on category roadmap",
      "Produce the quarterly Restroom Category Innovation Review",
      "Interface with the Head of Bathroom Humor Division on strategy alignment",
    ],
    qualifications: [
      "10+ years in restroom or adjacent category R&D",
      "Familiarity with containment systems (mechanical or otherwise)",
      "Comfort producing documentation that will be reviewed but not necessarily revised",
    ],
    compensation: {
      summary: "$150k–$330k + fruit basket",
      lines: [
        "Base: $150,000 – $330,000",
        "Seasonal fruit basket (peaches only, delivered to a location of your choice within reason)",
        "Unlimited branded nitrile gloves in a size of your choice",
        "One (1) Specific Industries-branded lab coat on hire",
      ],
    },
  },
  {
    slug: "apm-seat-fitment",
    title: "Associate Product Manager, Seat Fitment",
    vertical: "hygiene",
    location: "Remote · Seel-Tite R&D lab visits as required",
    employmentType: "Full-time · Associate",
    postedLine: "Posted 2024 · open",
    summary: "Own fitment data and the OPX-14 port compatibility matrix for Seel-Tite.",
    about: [
      "This APM role sits within the Seel-Tite brand but is jointly overseen by apex Hygiene leadership. The APM owns the fitment database for the OPX-14 port standard, including the compatibility matrix with non-OPX seats.",
      "Attention to detail is not optional.",
    ],
    responsibilities: [
      "Maintain the Seel-Tite fitment database (1,400+ seat SKUs)",
      "Verify new fitment entries against the reference specification",
      "Respond to customer fitment inquiries with precision",
      "Liaise with the Seel-Tite R&D team on port-spec revisions",
    ],
    qualifications: [
      "Product management internship or equivalent",
      "Measurement literacy",
      "Comfort with a spreadsheet of approximately 1,400 rows",
    ],
    compensation: {
      summary: "$70k–$92k + fitment training",
      lines: [
        "Base: $70,000 – $92,000",
        "Comprehensive fitment training (onsite, Seel-Tite R&D, Week 1)",
        "One (1) OPX-14 reference gasket kit on hire",
        "Complimentary Seel-Tite tote bag",
      ],
    },
  },

  // ===== Health & Wellness Holdings (3) =====
  {
    slug: "chief-wellness-evangelist",
    title: "Chief Wellness Evangelist",
    vertical: "health-wellness",
    location: "Remote · speaking engagements permitted",
    employmentType: "Full-time",
    postedLine: "Posted 2022 · slow pipeline",
    summary: "Evangelize the Specific Industries wellness thesis across portfolio brands.",
    about: [
      "The Chief Wellness Evangelist is the public-facing voice of the Health & Wellness vertical. The role represents the firm's wellness thesis at conferences, in earned media, and in the firm's own proprietary wellness dispatches.",
      "Prior evangelism experience is preferred but not required.",
    ],
    responsibilities: [
      "Deliver 12-18 wellness speaking engagements annually (self-arranged)",
      "Maintain the firm's wellness thesis document",
      "Represent apex at wellness industry gatherings where the firm is tolerated",
      "Co-author the quarterly wellness newsletter with the SovereignWellness brand team",
      "Uphold the firm's posture of confidence in outcomes that have not been demonstrated",
    ],
    qualifications: [
      "Demonstrated evangelism in any field",
      "Willingness to answer specific questions with general answers",
      "Strong personal brand, managed discreetly",
    ],
    compensation: {
      summary: "$180k–$640k + named fellowship",
      lines: [
        "Base: $180,000 – $640,000",
        "Named as a Specific Industries Wellness Fellow (self-awardable honor)",
        "Annual wellness retreat allowance (retreat not scheduled)",
        "Title can be reproduced on personal branding materials, subject to approval",
      ],
    },
  },
  {
    slug: "vp-questionable-health-claims",
    title: "VP of Questionable Health Claims",
    vertical: "health-wellness",
    location: "Remote · strictly off-camera",
    employmentType: "Full-time",
    postedLine: "Posted 2021 · extended pipeline",
    summary: "Lead review of portfolio health and wellness claims prior to external communication.",
    about: [
      "The VP of Questionable Health Claims reviews all public-facing health and wellness claims across the portfolio prior to external communication. The role serves as the firm's internal firewall between aspirational claims and verifiable claims.",
      "The ideal candidate is confident in the distinction.",
    ],
    responsibilities: [
      "Pre-review all health and wellness claims in brand marketing",
      "Maintain the proprietary Claims Register (currently 2,300 entries)",
      "Produce quarterly claim-risk assessments",
      "Liaise with outside counsel on claims that proceed without modification",
      "Serve as the final approver on the Sovereign Wellness claim set",
    ],
    qualifications: [
      "Background in regulatory affairs, consumer health, or adjacent",
      "Calm demeanor under written deposition-style inquiry",
      "Ability to use phrases like 'broadly consistent with' confidently in writing",
    ],
    compensation: {
      summary: "Alternatives only — no cash comp",
      lines: [
        "Access to the CFO's personal coin jar (weekly roll)",
        "One commemorative plaque annually, recognizing a contribution to be determined",
        "Complimentary tote bag",
        "Unlimited paper towels",
        "Named in the acknowledgements of a never-published memoir",
      ],
    },
  },
  {
    slug: "director-regulatory-avoidance",
    title: "Director of Regulatory Avoidance",
    vertical: "health-wellness",
    location: "Remote · private",
    employmentType: "Full-time",
    postedLine: "Posted 2020 · ongoing",
    summary: "Coordinate firm-wide regulatory posture across health and wellness brands.",
    about: [
      "The Director of Regulatory Avoidance coordinates the firm's posture toward regulatory bodies across the Health & Wellness vertical. The work is not adversarial. It is, more accurately, adjacent.",
    ],
    responsibilities: [
      "Maintain a current map of jurisdictions in which portfolio brands are banned, permitted, or unaddressed",
      "Produce monthly briefings on new or impending regulation",
      "Draft standard-form responses to regulatory inquiries",
      "Coordinate with the VP of Questionable Health Claims on boundary cases",
    ],
    qualifications: [
      "JD or equivalent experience",
      "Prior role in corporate regulatory strategy preferred",
      "Ability to compose carefully-worded letters",
    ],
    compensation: {
      summary: "$160k–$340k + cheese wheel",
      lines: [
        "Base: $160,000 – $340,000",
        "Quarterly cheese wheel allocation",
        "Complimentary access to the firm's library of regulatory response letters (340+ templates)",
      ],
    },
  },

  // ===== Subscription Services (3) =====
  {
    slug: "vp-recurring-revenue-optimization",
    title: "VP of Recurring Revenue Optimization",
    vertical: "subscription-services",
    location: "Remote",
    employmentType: "Full-time",
    postedLine: "Posted 2023 · strategic hire",
    summary: "Drive LTV growth across subscription portfolio through retention-first strategy.",
    about: [
      "The VP of Recurring Revenue Optimization leads subscription economics across Only Fans and Only Pans, with oversight of future subscription brands. The role owns the annual retention thesis.",
    ],
    responsibilities: [
      "Set subscription retention strategy across portfolio subscription brands",
      "Oversee the annual renewal playbook",
      "Chair the quarterly Subscription Renewal Review",
      "Liaise with brand-side cancellation flow teams",
      "Maintain the portfolio-wide dunning standard",
    ],
    qualifications: [
      "10+ years in subscription businesses",
      "Comfort with churn curves where the slope is being described, not reduced",
      "Familiarity with retention tactics that require a phone call",
    ],
    compensation: {
      summary: "$175k–$430k + monthly fan",
      lines: [
        "Base: $175,000 – $430,000",
        "One free Only Fans subscription (one fan of your choice, monthly)",
        "One free Only Pans subscription (quarterly)",
        "Executive title, reviewed annually",
      ],
    },
  },
  {
    slug: "senior-manager-cancellation-flow-obfuscation",
    title: "Senior Manager, Cancellation Flow Obfuscation",
    vertical: "subscription-services",
    location: "Remote",
    employmentType: "Full-time",
    postedLine: "Posted 2024 · open",
    summary: "Own the design and maintenance of portfolio cancellation flows.",
    about: [
      "The Senior Manager owns cancellation flow UX across subscription brands. The role ensures that every cancellation pathway is functional, compliant, and respectful of customer time, in that order.",
    ],
    responsibilities: [
      "Design cancellation flows that meet applicable jurisdictional requirements",
      "Audit existing flows across Only Fans and Only Pans",
      "Produce the annual cancellation flow review",
      "Maintain the proprietary Steps-to-Cancel index",
      "Interface with outside counsel when flow steps increase",
    ],
    qualifications: [
      "Product or UX experience in subscription businesses",
      "Comfortable with legal compliance constraints",
      "Prior experience working in a role people have opinions about",
    ],
    compensation: {
      summary: "$118k–$205k + plaque",
      lines: [
        "Base: $118,000 – $205,000",
        "One commemorative plaque annually",
        "One (1) branded pen set on hire",
      ],
    },
  },
  {
    slug: "director-auto-renewal-communications",
    title: "Director of Auto-Renewal Communications",
    vertical: "subscription-services",
    location: "Remote",
    employmentType: "Full-time",
    postedLine: "Posted 2022 · steady state",
    summary: "Write, schedule, and monitor portfolio auto-renewal customer communications.",
    about: [
      "The Director owns the written and email-based communications that precede and follow every auto-renewal event across subscription brands.",
    ],
    responsibilities: [
      "Write auto-renewal notification emails that meet disclosure requirements",
      "Schedule renewal communication cadences (30/7/1 day prior)",
      "Monitor open rates and response rates (response rates are not a target)",
      "Maintain the portfolio-wide renewal copy repository",
    ],
    qualifications: [
      "7+ years in customer communications or CRM",
      "Strong written craft",
      "Ability to comply with disclosure rules in friendly tone",
    ],
    compensation: {
      summary: "$105k–$180k + coffee",
      lines: [
        "Base: $105,000 – $180,000",
        "Unlimited cold brew (at-desk only)",
        "Quarterly portfolio-branded mug upgrade",
      ],
    },
  },

  // ===== Professional Services & Emerging Ventures (5) =====
  {
    slug: "senior-director-strategic-ambiguity",
    title: "Senior Director, Strategic Ambiguity",
    vertical: "professional-services",
    location: "Hybrid · location TBD",
    employmentType: "Full-time",
    postedLine: "Posted 2020 · ongoing",
    summary: "Lead firm posture of productive noncommitment across professional services engagements.",
    about: [
      "The Senior Director, Strategic Ambiguity leads the firm's overall posture of productive noncommitment across the professional services vertical. Partners closely with StrategicVoid and Stratify brand teams.",
    ],
    responsibilities: [
      "Draft the firm's semi-annual ambiguity positioning memo",
      "Lead internal reviews of any statement that is 'too clear'",
      "Maintain the banned-phrase registry (phrases that commit the firm to an outcome)",
      "Represent the firm at external engagements where a clear answer is expected",
    ],
    qualifications: [
      "Prior consulting experience (preferred partners: firms that do not document outcomes)",
      "Strong editorial judgment on phrases like 'we will' vs. 'we may'",
      "Comfortable not saying anything in writing",
    ],
    compensation: {
      summary: "$170k–$560k",
      lines: [
        "Base: $170,000 – $560,000",
        "Flexible working arrangements (location and time are negotiable)",
      ],
    },
  },
  {
    slug: "head-incubated-ventures-pre-concept",
    title: "Head of Incubated Ventures (Pre-Concept)",
    vertical: "professional-services",
    location: "Remote",
    employmentType: "Full-time",
    postedLine: "Posted 2023 · open indefinitely",
    summary: "Oversee portfolio of ventures that have not yet been described.",
    about: [
      "The Head of Incubated Ventures (Pre-Concept) oversees the firm's earliest-stage portfolio — ventures that have been identified but not yet described.",
      "At least five such ventures are currently in the pre-concept stage.",
    ],
    responsibilities: [
      "Maintain the pre-concept pipeline",
      "Produce quarterly updates on pre-concept ventures (in placeholder form)",
      "Coordinate naming of ventures as they exit pre-concept",
      "Serve as the primary author of all 'more to come' statements in investor-facing materials",
    ],
    qualifications: [
      "Senior-level experience in venture incubation or corporate innovation",
      "Comfort describing a product without describing it",
      "Track record of initiating things that have not concluded",
    ],
    compensation: {
      summary: "$150k–$480k + pistachios",
      lines: [
        "Base: $150,000 – $480,000",
        "All you can eat pistachios (shelled only)",
        "One (1) reserved seat at the annual retreat (retreat not currently scheduled)",
      ],
    },
  },
  {
    slug: "vp-synergy-operations",
    title: "VP of Synergy Operations",
    vertical: "professional-services",
    location: "Remote · quarterly offsite",
    employmentType: "Full-time",
    postedLine: "Posted 2021 · rolling",
    summary: "Drive portfolio synergy initiatives across brand and corporate teams.",
    about: [
      "The VP of Synergy Operations identifies, formalizes, and operationalizes cross-brand synergy initiatives across the portfolio. Synergy is defined internally as 'the absence of duplication in ways that do not reduce effort.'",
    ],
    responsibilities: [
      "Maintain the portfolio synergy registry (273 active synergies)",
      "Chair the monthly Synergy Review Committee",
      "Produce the annual Synergy Impact Report (impact to be defined)",
      "Onboard newly acquired brands to the synergy playbook",
    ],
    qualifications: [
      "Senior experience in a role with 'synergy' in the title",
      "Ability to articulate synergy in a way that does not invite scrutiny",
      "Comfort with the word 'synergy' being used seven times in a single meeting",
    ],
    compensation: {
      summary: "$160k–$390k + nameplate",
      lines: [
        "Base: $160,000 – $390,000",
        "One (1) personalized nameplate per calendar year",
        "Quarterly branded water bottle",
      ],
    },
  },
  {
    slug: "associate-framework-development",
    title: "Associate, Framework Development",
    vertical: "professional-services",
    location: "Remote",
    employmentType: "Full-time",
    postedLine: "Posted 2024",
    summary: "Develop, refine, and maintain the firm's internal and external frameworks.",
    about: [
      "The Associate works with the Strategy team to produce and maintain the firm's growing catalog of frameworks. The firm currently maintains 14 frameworks. The Associate is expected to maintain the existing set and contribute approximately two new frameworks per year.",
    ],
    responsibilities: [
      "Draft and maintain framework documentation",
      "Produce framework visualizations (typically 2x2, 3x3, or hexagonal)",
      "Participate in the semi-annual Framework Review",
      "Defend framework integrity in internal disputes",
    ],
    qualifications: [
      "Analytical background",
      "Comfort with 2x2 matrices",
      "Willingness to commit to a framework publicly",
    ],
    compensation: {
      summary: "$78k–$128k + pistachios",
      lines: [
        "Base: $78,000 – $128,000",
        "All you can eat pistachios (shelled only)",
        "One (1) framework-poster of your choice for your home office",
      ],
    },
  },
  {
    slug: "chief-disruption-evangelist",
    title: "Chief Disruption Evangelist",
    vertical: "professional-services",
    location: "Remote · frequent TEDx engagements",
    employmentType: "Full-time · Executive",
    postedLine: "Posted 2022 · reviewing",
    summary: "Champion the firm's posture of disruption across industries that have not noticed.",
    about: [
      "The Chief Disruption Evangelist leads the firm's public posture of disruption. Partners with the StrategicVoid brand team and represents apex at external disruption-oriented forums.",
    ],
    responsibilities: [
      "Maintain the firm's annual Disruption Thesis",
      "Represent Specific Industries at disruption-focused events",
      "Chair the Disruption Residency program (quarterly)",
      "Produce thought leadership across multiple channels",
    ],
    qualifications: [
      "Prior evangelism experience in any field",
      "Public-speaking comfort at venues up to 500 attendees",
      "PhD optional (self-awarded accepted)",
    ],
    compensation: {
      summary: "$200k–$720k",
      lines: [
        "Base: $200,000 – $720,000",
        "Speaking honoraria retained by employee",
        "One (1) book deal, pending Employee's first book",
      ],
    },
  },

  // ===== Executive / Corporate HQ (6) =====
  {
    slug: "chief-of-staff-to-chief-of-staff",
    title: "Chief of Staff to the Chief of Staff",
    vertical: "corporate",
    location: "Corporate HQ (Virtual)",
    employmentType: "Full-time",
    postedLine: "Posted 2021 · indefinite",
    summary: "Provide chief-of-staff support to the Chief of Staff.",
    about: [
      "The Chief of Staff to the Chief of Staff provides chief-of-staff support to the firm's Chief of Staff. The role is the second most important chief-of-staff role at the firm.",
    ],
    responsibilities: [
      "Own the Chief of Staff's calendar and prepared notes",
      "Review materials prior to Chief of Staff review",
      "Maintain the secondary briefing document archive",
      "Attend meetings on behalf of the Chief of Staff when the Chief of Staff is attending a different meeting",
    ],
    qualifications: [
      "Prior chief-of-staff or adjacent experience",
      "Comfort in the second position",
      "Discretion",
    ],
    compensation: {
      summary: "$135k–$285k + tote bag",
      lines: [
        "Base: $135,000 – $285,000",
        "One (1) branded tote bag annually",
        "Reserved seat at the annual retreat (retreat not currently scheduled)",
      ],
    },
  },
  {
    slug: "vp-portfolio-company-naming-conventions",
    title: "VP of Portfolio Company Naming Conventions",
    vertical: "corporate",
    location: "Remote",
    employmentType: "Full-time",
    postedLine: "Posted 2023 · strategic",
    summary: "Maintain naming standards for all current and future portfolio brands.",
    about: [
      "The VP of Portfolio Company Naming Conventions owns the portfolio-wide naming framework. The role reviews every prospective brand name against the Naming Standards before any acquisition proceeds.",
      "Partners closely with the Chief Portfolio Officer and the Head of Incubated Ventures (Pre-Concept).",
    ],
    responsibilities: [
      "Maintain the Portfolio Naming Standards document",
      "Review all prospective brand names",
      "Produce naming rationale memos for approved names",
      "Coordinate rename initiatives (currently 0 active)",
      "Chair the Naming Review Committee",
    ],
    qualifications: [
      "Branding, naming, or identity experience at senior level",
      "Tolerance for names that are one pun",
      "Ability to explain a name in a single sentence",
    ],
    compensation: {
      summary: "$80k–$820k + pistachios",
      lines: [
        "Base: $80,000 – $820,000, determined at sole discretion of the Chief Specificity Officer",
        "All you can eat pistachios (shelled only — unshelled available in years 2+ on request)",
        "Commemorative Specific Industries pen set (delivered separately, shipping not guaranteed)",
        "Equity in the portfolio company of your choice*",
      ],
      note: "*Equity pending legal review, ongoing since 2017.",
    },
  },
  {
    slug: "head-board-position-coordination",
    title: "Head of Board Position Coordination",
    vertical: "corporate",
    location: "Remote",
    employmentType: "Full-time",
    postedLine: "Posted 2024",
    summary: "Coordinate the four-person executive team across all 28 portfolio board seats.",
    about: [
      "The Head of Board Position Coordination owns the logistics of placing the four-person executive team on the board of every portfolio company. This includes scheduling, title mapping, and managing the apparent contradiction of four executives holding approximately 112 board seats.",
    ],
    responsibilities: [
      "Maintain the firm's Board Position Matrix",
      "Schedule all subsidiary board meetings",
      "Coordinate signoff on board resolutions across the portfolio",
      "Respond to inquiries about title continuity with a standard form response",
    ],
    qualifications: [
      "Strong organizational skills",
      "Comfort with spreadsheets that make structural sense only to their author",
      "Calm demeanor under inquiry",
    ],
    compensation: {
      summary: "$115k–$240k",
      lines: [
        "Base: $115,000 – $240,000",
        "Named on the annual portfolio board-meeting-attended honor roll (if applicable)",
      ],
    },
  },
  {
    slug: "director-fake-press-release-drafting",
    title: "Director of Press Release Drafting",
    vertical: "corporate",
    location: "Remote",
    employmentType: "Full-time",
    postedLine: "Posted 2023",
    summary: "Draft, edit, and distribute the firm's press releases across milestones and non-milestones.",
    about: [
      "The Director drafts and edits all firm press releases — including acquisition announcements, strategic expansions, and quarterly portfolio highlights.",
      "The firm issues approximately 10-12 press releases per year. None are wire-distributed.",
    ],
    responsibilities: [
      "Draft all firm press releases",
      "Maintain the boilerplate 'About Specific Industries' block",
      "Coordinate executive quotes",
      "Maintain the release calendar",
    ],
    qualifications: [
      "Prior corporate communications experience",
      "Strong written craft",
      "Familiarity with standard PR structure (headline → dateline → lede → quote → boilerplate)",
    ],
    compensation: {
      summary: "$95k–$160k + dictionary",
      lines: [
        "Base: $95,000 – $160,000",
        "One (1) industrial hardcover AP Style Manual",
        "Unlimited commas, at-home only",
      ],
    },
  },
  {
    slug: "senior-analyst-ma-small-market",
    title: "Senior Analyst, M&A (Industries with Fewer Than 11 Competitors)",
    vertical: "corporate",
    location: "Remote",
    employmentType: "Full-time",
    postedLine: "Posted 2021 · open",
    summary: "Evaluate acquisition candidates in industries with fewer than 11 direct competitors.",
    about: [
      "The Senior Analyst supports the Chief Portfolio Officer on acquisition evaluation. The role focuses specifically on industries with 11 or fewer direct competitors.",
      "Industries with 12 or more competitors are handled by the VP of Questionable Health Claims, for historical reasons.",
    ],
    responsibilities: [
      "Produce weekly acquisition candidate evaluation memos",
      "Model three-year financial projections for candidate industries",
      "Conduct founder diligence interviews (average: 2 per candidate)",
      "Maintain the pipeline candidate tracker",
    ],
    qualifications: [
      "3-5 years analyst experience at a private equity or investment firm",
      "Strong modeling skills",
      "Comfort with industries that do not have publicly-available market size data",
    ],
    compensation: {
      summary: "$125k–$220k",
      lines: [
        "Base: $125,000 – $220,000",
        "Annual bonus eligibility (bonus to be determined)",
      ],
    },
  },
  {
    slug: "groundskeeper-hq-virtual",
    title: "Groundskeeper, Corporate HQ (Virtual)",
    vertical: "corporate",
    location: "Remote · groundskeeping from home",
    employmentType: "Part-time · seasonal",
    postedLine: "Posted 2022 · reposted annually",
    summary: "Maintain the grounds of the firm's virtual corporate headquarters.",
    about: [
      "The Groundskeeper maintains the grounds of the firm's virtual corporate headquarters. The role requires attentiveness and a working sense of space.",
      "No physical groundskeeping is required.",
    ],
    responsibilities: [
      "Produce quarterly condition reports on virtual HQ grounds",
      "Coordinate seasonal decor updates to the virtual HQ website",
      "Respond to employee concerns about HQ grounds conditions",
    ],
    qualifications: [
      "Prior groundskeeping or adjacent experience welcome",
      "Working computer",
    ],
    compensation: {
      summary: "Non-monetary compensation package",
      lines: [
        "One (1) branded tote bag annually",
        "Quarterly cheese wheel allocation (Gouda or Manchego, recipient's choice)",
        "Reserved seat at the annual retreat (retreat not currently scheduled)",
        "Named in the acknowledgements of a never-published memoir",
        "First right of refusal on discontinued portfolio products",
      ],
    },
  },
]

export function getJobBySlug(slug: string): JobListing | undefined {
  return jobs.find((j) => j.slug === slug)
}

export function getJobsByVertical(vertical: CareersVertical | null): JobListing[] {
  if (vertical === null) return jobs
  return jobs.filter((j) => j.vertical === vertical)
}

export function getRelatedJobs(slug: string, limit = 3): JobListing[] {
  const current = getJobBySlug(slug)
  if (!current) return []
  return jobs
    .filter((j) => j.slug !== slug && j.vertical === current.vertical)
    .slice(0, limit)
}

export const VERTICAL_LABELS: Record<CareersVertical, string> = {
  "consumer-goods": "Consumer Goods & Consumables",
  "hygiene": "Personal Hygiene & Home Essentials",
  "health-wellness": "Health & Wellness Holdings",
  "subscription-services": "Subscription Services",
  "professional-services": "Professional Services & Emerging Ventures",
  "corporate": "Corporate / Executive",
}

export const VERTICAL_ORDER: CareersVertical[] = [
  "consumer-goods",
  "hygiene",
  "health-wellness",
  "subscription-services",
  "professional-services",
  "corporate",
]
