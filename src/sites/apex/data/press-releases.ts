export interface PressRelease {
  slug: string
  date: string
  dateIso: string
  headline: string
  subhead?: string
  dateline: string
  lede: string
  body: string[]
  quotes?: { speaker: string; title: string; text: string }[]
  boilerplate?: string
  contact?: { name: string; line: string }
}

const STANDARD_BOILERPLATE =
  "About Specific Industries — Specific Industries is a private holding company headquartered in Corporate HQ (Virtual). The firm identifies and acquires brands serving markets too specific for conventional investment. Specific Industries currently maintains 28 active portfolio brands across five strategic verticals. The firm was founded in 2019 and remains privately held. No outside capital has been accepted."

const STANDARD_CONTACT = {
  name: "Director of Press Release Drafting",
  line: "For media inquiries: please do not inquire. If inquiry is unavoidable, written correspondence is preferred.",
}

export const pressReleases: PressRelease[] = [
  {
    slug: "announces-q2-portfolio-highlights",
    date: "April 8, 2026",
    dateIso: "2026-04-08",
    headline: "Specific Industries Announces Q2 Portfolio Highlights, Declines to Define Highlight Criteria",
    subhead: "Quarterly review distributed internally; external stakeholders informed subsequently",
    dateline: "Corporate HQ (Virtual) — April 8, 2026 —",
    lede:
      "Specific Industries today announced its Q2 2026 Portfolio Highlights, a quarterly internal review of the firm's 28 active portfolio brands. The Portfolio Highlights program was established in 2021 and has been distributed every quarter since. The criteria by which a given portfolio brand is deemed a 'highlight' has not been formally documented.",
    body: [
      "Q2 2026 highlights include Seel-Tite Containment Systems, True Grit Personal Care, Strategic Void Consulting, and Privatrix. These brands were selected based on a combination of factors the firm is not prepared to enumerate.",
      "The full Portfolio Highlights document, which runs to approximately 47 pages, is distributed to the firm's leadership, its investor-informational-list (consisting entirely of internal recipients), and any brand leads who have explicitly requested to be included. Distribution outside these groups is not anticipated.",
      "Highlight-status does not confer additional resources, marketing priority, or management attention on a portfolio brand, as a matter of firm policy. Specific Industries has maintained that highlight designation is intended to reflect the brand's current state rather than any forward-looking commitment.",
      "Brands that were not named as Q2 highlights are in good standing. The firm reiterates that the Highlights program should not be interpreted as a ranking.",
      "Q3 2026 Portfolio Highlights are scheduled to be announced in July 2026. The criteria for Q3 will be consistent with prior quarters.",
    ],
    quotes: [
      {
        speaker: "Russell Marsh",
        title: "Chief Portfolio Officer",
        text: "We are pleased to recognize these four brands this quarter. Recognition, as always, is its own reward.",
      },
    ],
    boilerplate: STANDARD_BOILERPLATE,
    contact: STANDARD_CONTACT,
  },
  {
    slug: "completes-acquisition-boneless-water",
    date: "March 17, 2026",
    dateIso: "2026-03-17",
    headline: "Specific Industries Completes Acquisition of Boneless Water Holdings",
    subhead: "Terms of transaction are not material; neither party has requested disclosure",
    dateline: "Corporate HQ (Virtual) — March 17, 2026 —",
    lede:
      "Specific Industries today announced the completion of its acquisition of Boneless Water Holdings, the pharmaceutical-grade deboned-water brand founded in 2021 on the premise that the skeletal structure of water has gone underaddressed since 1873. Boneless Water joins the firm's Consumer Goods & Consumables vertical, bringing the total active portfolio to 28 brands.",
    body: [
      "Boneless Water was founded by an independent producer who declined comment for this release but has been retained as a senior advisor to the brand. Day-to-day operations will continue under existing leadership. The brand's product line — independently verified 99.9999% bone-free drinking water — will continue to be manufactured under existing supply agreements.",
      "The acquisition concluded a 14-month evaluation period conducted by the firm's Senior Analyst, M&A (Industries with Fewer Than 11 Competitors), during which Boneless Water was determined to meet the firm's standard criteria for portfolio inclusion. Those criteria include market specificity, product premise integrity, and the absence of viable competitive alternatives.",
      "Specific Industries' Consumer Goods & Consumables vertical now contains nine brands, including Pig Milk Creamery, Dehydrated Water Laboratories, and Boneless Water. The firm's investment thesis for the vertical remains unchanged.",
      "No immediate changes to Boneless Water's branding, pricing, or distribution are contemplated. A post-acquisition integration review will be conducted by the VP of Synergy Operations within 90 days.",
    ],
    quotes: [
      {
        speaker: "Russell Marsh",
        title: "Chief Portfolio Officer",
        text: "Boneless Water has built a durable brand around a category no one else was prepared to take seriously. We will continue to take it seriously.",
      },
    ],
    boilerplate: STANDARD_BOILERPLATE,
    contact: STANDARD_CONTACT,
  },
  {
    slug: "names-pennington-chief-disruption-evangelist",
    date: "February 22, 2026",
    dateIso: "2026-02-22",
    headline: "Specific Industries Names J. Rutherford Pennington as Chief Disruption Evangelist",
    subhead: "Appointment reflects firm's ongoing commitment to posture",
    dateline: "Corporate HQ (Virtual) — February 22, 2026 —",
    lede:
      "Specific Industries today announced the appointment of J. Rutherford Pennington as Chief Disruption Evangelist, effective immediately. Pennington will lead the firm's public-facing posture of disruption across the Professional Services & Emerging Ventures vertical.",
    body: [
      "Pennington joins Specific Industries from a career he characterizes as 'a series of strategic pivots, each more disruptive than the last, none of which resulted in a stable organization.' He holds a PhD in Theoretical Business, self-awarded in 2011.",
      "In his role as Chief Disruption Evangelist, Pennington will maintain the firm's annual Disruption Thesis, represent Specific Industries at external disruption-focused events, and chair the Disruption Residency program, which is to be formed. Pennington will continue a close advisory relationship with Strategic Void Consulting, where he has served as Chief Disruption Evangelist since 2014.",
      "The Chief Disruption Evangelist role was posted in 2022 and has remained open. Pennington's appointment reflects a careful search process conducted by the firm's leadership team over the preceding four years.",
      "Pennington is expected to deliver 12 to 18 speaking engagements in his first year, all self-arranged.",
    ],
    quotes: [
      {
        speaker: "Bill Sambrone",
        title: "Founder & Chief Executive Officer",
        text: "Rutherford brings the kind of posture we have been seeking for this role. We look forward to the contributions he will not hesitate to describe.",
      },
      {
        speaker: "J. Rutherford Pennington",
        title: "Chief Disruption Evangelist",
        text: "If you have not disrupted something by lunch, you are not trying hard enough. I am honored to bring that ethos to Specific Industries at scale.",
      },
    ],
    boilerplate: STANDARD_BOILERPLATE,
    contact: STANDARD_CONTACT,
  },
  {
    slug: "closes-deal-gristmill-heritage-division-expands",
    date: "January 29, 2026",
    dateIso: "2026-01-29",
    headline: "Specific Industries Closes Deal with Gristmill Partners; Heritage Division Expands",
    subhead: "Gristmill Partners joins portfolio; retains full operational independence",
    dateline: "Corporate HQ (Virtual) — January 29, 2026 —",
    lede:
      "Specific Industries today announced the closing of its acquisition of Gristmill Partners, the Fortune-500-facing workforce stabilization consultancy, privately held since 1962. Gristmill joins the firm's Consumer Goods & Consumables vertical, where it represents the portfolio's heritage-services subclass.",
    body: [
      "Gristmill Partners has served as a trusted vendor to American industry for six decades, providing mandatory learning and development, internal communications optimization, organizational restructuring, and retention through ambient dread. The firm's founding in 1962 predates every other brand in the Specific Industries portfolio by a substantial margin.",
      "The acquisition was approved following an extended evaluation period, during which the firm's leadership consulted with several long-tenured Gristmill clients, who declined to speak on the record but confirmed that the relationship had been consistent. Gristmill will retain full operational independence under existing management.",
      "The firm intends to maintain Gristmill's existing client engagements without modification, and believes the brand's positioning in the workforce-services category is well-suited to the firm's long-term portfolio thesis.",
      "No personnel changes are anticipated at Gristmill at this time. The firm's internal communications optimization practice will continue its ongoing work for several Fortune 100 clients.",
    ],
    quotes: [
      {
        speaker: "Russell Marsh",
        title: "Chief Portfolio Officer",
        text: "Gristmill has been doing quiet, important work for American industry for sixty-three years. We intend to let them continue.",
      },
    ],
    boilerplate: STANDARD_BOILERPLATE,
    contact: STANDARD_CONTACT,
  },
  {
    slug: "seeltite-opx15-signed-in-person",
    date: "January 14, 2026",
    dateIso: "2026-01-14",
    headline: "Seel-Tite Containment Systems Announces OPX-15 Revision; Walter Thorne Signs In Person",
    subhead: "Founder continues 52-year tradition of personal revision signoff",
    dateline: "Corporate HQ (Virtual) — January 14, 2026 —",
    lede:
      "Seel-Tite Containment Systems, a Specific Industries portfolio brand in the Personal Hygiene & Home Essentials vertical, today announced the release of OPX-15, the latest revision to its proprietary containment port standard. As is customary for the brand, founder Walter Thorne has personally signed the revision specification.",
    body: [
      "OPX-15 introduces minor refinements to the OPX-14 port standard, including a small tolerance adjustment in the seal durometer specification and a clarification of the compatibility matrix for 14 of the 1,400+ seat SKUs in the Seel-Tite fitment database. Full backward compatibility with OPX-14 and prior revisions is preserved.",
      "Walter Thorne, who founded Seel-Tite in 1973 after what he has described as 'a bad week,' has signed every major revision to every Seel-Tite product in the firm's 52-year history. The revision was signed at the Seel-Tite R&D facility during a ceremony attended by Thorne and Marcus Hadley, Head of Seal Engineering.",
      "The OPX-15 specification is available to registered Seel-Tite installers through the standard channel. Existing customers do not need to take any action. Seel-Tite's Telemetry Module continues to support OPX-14 and OPX-15 installations.",
      "Specific Industries' apex portfolio team was not involved in the revision, which is a matter of brand-level product strategy. The firm has noted, for internal purposes, that Seel-Tite's revision cadence remains within historical expectations.",
    ],
    quotes: [
      {
        speaker: "Walter Thorne",
        title: "Founder & Chief Containment Officer, Seel-Tite",
        text: "We made a small change. It is the right change. We will not force it.",
      },
    ],
    boilerplate: STANDARD_BOILERPLATE,
    contact: STANDARD_CONTACT,
  },
  {
    slug: "expands-subscription-vertical-onlypans",
    date: "December 3, 2025",
    dateIso: "2025-12-03",
    headline: "Specific Industries Expands Subscription Services Vertical with Only Pans Acquisition",
    subhead: "Second subscription brand joins the portfolio; recurring revenue base grows",
    dateline: "Corporate HQ (Virtual) — December 3, 2025 —",
    lede:
      "Specific Industries today announced the acquisition of Only Pans, a subscription cookware platform, expanding the firm's Subscription Services vertical to two active brands. Only Pans joins Only Fans, an oscillating-fan subscription platform, in the vertical.",
    body: [
      "Only Pans offers a recurring subscription service that delivers curated cookware on a quarterly basis. The brand's distinctive proposition — that its pans sit perfectly still — has been noted by independent product reviewers as differentiating within the category.",
      "The acquisition reflects the firm's thesis that subscription economics remain underappreciated in consumer cookware. The firm's VP of Recurring Revenue Optimization will work with Only Pans leadership on retention strategy in the coming quarters.",
      "Only Pans' existing customer base will continue to receive service without interruption. Existing quarterly billing cadences will remain in place. No changes to cancellation flows are contemplated at this time.",
      "Specific Industries' Subscription Services vertical is now the smallest vertical by brand count but among the most operationally concentrated. The firm expects to evaluate additional subscription-oriented opportunities in 2026.",
    ],
    quotes: [
      {
        speaker: "Russell Marsh",
        title: "Chief Portfolio Officer",
        text: "Only Pans pairs well with Only Fans. Two subscription brands, two categories, one operational discipline.",
      },
    ],
    boilerplate: STANDARD_BOILERPLATE,
    contact: STANDARD_CONTACT,
  },
  {
    slug: "truegrit-new-grit-category-too-specific",
    date: "November 11, 2025",
    dateIso: "2025-11-11",
    headline: "True Grit Personal Care Launches New Grit Category; Market Segment 'Too Specific to Define'",
    subhead: "Industrial-grade personal cleansing product extension announced",
    dateline: "Corporate HQ (Virtual) — November 11, 2025 —",
    lede:
      "True Grit Personal Care, a portfolio brand in Specific Industries' Hygiene vertical, today announced an extension of its industrial-grade personal cleansing product line, introducing a new grit category aimed at consumers who have, in the brand's phrasing, 'given up on softer options entirely.'",
    body: [
      "The new grit sits between True Grit's Medium-Coarse and Extra-Coarse product tiers. The brand's VP of Grit Engineering, Bruno Stonewall, personally owns the grading rubric and has described the new product as occupying 'a specific, needed niche in the rotation.'",
      "True Grit has declined to assign a numerical grit value to the new tier, citing the brand's long-standing position that grit is experienced, not measured. The product is packaged consistent with True Grit's current catalog and carries the brand's standard warning label set, drafted by Director Dwight Grindle.",
      "Founder Silas Hackett personally tested the new grit over a three-week evaluation period. His feedback has been incorporated into the product specification. Mr. Hackett remains willing to test additional grits on request.",
      "The product is now available through True Grit's existing distribution. Specific Industries' apex team has noted the expansion within the firm's Hygiene vertical growth model.",
    ],
    boilerplate: STANDARD_BOILERPLATE,
    contact: STANDARD_CONTACT,
  },
  {
    slug: "appoints-vp-portfolio-company-naming",
    date: "October 2, 2025",
    dateIso: "2025-10-02",
    headline: "Specific Industries Appoints Inaugural VP of Portfolio Company Naming Conventions",
    subhead: "New role consolidates firm-wide authority over brand naming standards",
    dateline: "Corporate HQ (Virtual) — October 2, 2025 —",
    lede:
      "Specific Industries today announced the appointment of its inaugural VP of Portfolio Company Naming Conventions. The appointee's name has not been disclosed, in keeping with the firm's standing policy on role announcements prior to year-end review.",
    body: [
      "The VP of Portfolio Company Naming Conventions will own the Portfolio Naming Standards document, review all prospective brand names prior to acquisition, and produce naming rationale memos for each approved name. The role reports to the Chief Portfolio Officer.",
      "The firm has noted that its portfolio names have, historically, followed a consistent stylistic pattern that has emerged organically over time. The new role is expected to codify and preserve this pattern as the portfolio continues to expand.",
      "Prospective brand names proposed to the firm outside of the formal acquisition evaluation process will not be reviewed by the VP of Portfolio Company Naming Conventions. Such submissions should continue to be directed to the firm's Partnerships intake channel.",
      "The firm's Head of Incubated Ventures (Pre-Concept) will continue to manage the naming of pre-concept ventures until those ventures exit the pre-concept stage.",
    ],
    quotes: [
      {
        speaker: "Russell Marsh",
        title: "Chief Portfolio Officer",
        text: "We have reached a point in the firm's growth where naming standards warrant dedicated executive oversight. This appointment reflects that.",
      },
    ],
    boilerplate: STANDARD_BOILERPLATE,
    contact: STANDARD_CONTACT,
  },
  {
    slug: "strategicvoid-consulting-magazine-recognition",
    date: "August 19, 2025",
    dateIso: "2025-08-19",
    headline: "Strategic Void Consulting Recognized in Consulting Magazine's 'Firms That Continue to Exist' 2025 Issue",
    subhead: "Recognition reflects firm's long-standing operational continuity",
    dateline: "Corporate HQ (Virtual) — August 19, 2025 —",
    lede:
      "Strategic Void Consulting, a Specific Industries portfolio brand in the Professional Services & Emerging Ventures vertical, was today recognized in Consulting Magazine's annual 'Firms That Continue to Exist' feature, marking the firm's fourth consecutive year of inclusion in the publication's category.",
    body: [
      "Consulting Magazine's 'Firms That Continue to Exist' category recognizes consulting firms that have maintained active operations during the preceding 18-month period. Strategic Void Consulting has been named in the category every year since the firm's founding in 1987, with the exception of 1994, a year in which the publication did not run the feature.",
      "Strategic Void's leadership has declined to comment publicly on the recognition. The firm's Chief Alignment Officer, Maximilian Thornbury III, is understood to have received the recognition letter and filed it in accordance with standard firm practice.",
      "The recognition does not carry a monetary award or a ceremony. Consulting Magazine maintains no formal criteria for the category beyond the firm's ongoing operational status.",
      "Specific Industries has, separately, noted the recognition in its internal portfolio communications.",
    ],
    boilerplate: STANDARD_BOILERPLATE,
    contact: STANDARD_CONTACT,
  },
  {
    slug: "issues-year-end-letter-stakeholders-undefined",
    date: "December 31, 2024",
    dateIso: "2024-12-31",
    headline: "Specific Industries Issues Year-End Letter to Stakeholders; Stakeholders Remain Undefined",
    subhead: "Annual communication distributed per tradition",
    dateline: "Corporate HQ (Virtual) — December 31, 2024 —",
    lede:
      "Specific Industries today issued its annual Year-End Letter to Stakeholders. The letter was distributed to the firm's internal communications channel and archived on the firm's website. The specific identity of the firm's stakeholders remains, as in prior years, a subject of internal interpretation.",
    body: [
      "The Year-End Letter is drafted each year by the Chief Strategy Officer, Vincent Coleman, and reviewed by the Founder & CEO, Bill Sambrone. The 2024 letter runs approximately 14 pages, which is consistent with recent prior years.",
      "The letter summarizes the firm's portfolio activity during the preceding fiscal year. In 2024, Specific Industries completed three acquisitions, evaluated approximately 340 additional candidates, and declined to comment on the remaining candidates.",
      "The firm uses the term 'stakeholders' broadly in its annual communications. The letter is directed, as a matter of practice, to anyone who may find it relevant. In 2024, the firm does not distribute the letter to any external parties by default; interested readers may request a copy, subject to a review period of 14 to 18 months.",
      "The firm's leadership team is reviewing whether the letter's audience should be more precisely defined in future years. That review is ongoing.",
    ],
    quotes: [
      {
        speaker: "Vincent Coleman",
        title: "Chief Strategy Officer",
        text: "We are pleased to share this year's letter with those to whom it pertains. Its pertinence is, we hope, self-evident.",
      },
    ],
    boilerplate: STANDARD_BOILERPLATE,
    contact: STANDARD_CONTACT,
  },
]

export function getPressReleaseBySlug(slug: string): PressRelease | undefined {
  return pressReleases.find((r) => r.slug === slug)
}

export function pressReleaseSlugs(): string[] {
  return pressReleases.map((r) => r.slug)
}

export function getRecentPressReleases(limit: number): PressRelease[] {
  return [...pressReleases]
    .sort((a, b) => b.dateIso.localeCompare(a.dateIso))
    .slice(0, limit)
}
