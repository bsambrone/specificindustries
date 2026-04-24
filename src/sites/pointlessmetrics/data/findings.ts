import type { FindingCategoryKey } from "./categories"
import type { PersonKey } from "./leadership"

export interface ChartPoint {
  x: number
  y: number
}

export interface Finding {
  slug: string
  title: string
  claim: string                          // one-sentence takeaway, displayed large
  category: FindingCategoryKey
  rValue: number                         // e.g., 0.87 or -0.92
  pValue: string                         // e.g., "< 0.001"
  sampleSize: number                     // e.g., 1247
  xAxis: { label: string; units: string }
  yAxis: { label: string; units: string }
  chartData: ChartPoint[]                // 15–20 scatter points; hand-authored to visually hit ~r
  methodology: string                    // one paragraph
  caveats: string[]                      // 2–3 absurd limitations
  publishedDate: string                  // "YYYY-MM"
  principalInvestigator: PersonKey
  funding: string                        // disclosure line
  citedByProducts: string[]              // product slugs; must match Product.slug values
}

export const findings: Finding[] = [
  // 1. standing-desk-ecosystem-language (r 0.87, n 1247, culture, bill)
  {
    slug: "standing-desk-ecosystem-language",
    title: "Adoption of Standing Desks and Frequency of Ecosystem Language in Internal Communications: A Positive Association",
    claim:
      "Organizations with higher standing-desk adoption rates produce significantly more internal prose containing the word 'ecosystem.'",
    category: "culture",
    rValue: 0.87,
    pValue: "< 0.001",
    sampleSize: 1247,
    xAxis: { label: "Standing desks as percentage of total workstations", units: "%" },
    yAxis: { label: "Instances of 'ecosystem' per 1,000 words of internal communication", units: "count per 1,000 words" },
    chartData: [
      { x: 5, y: 1.2 }, { x: 8, y: 1.8 }, { x: 12, y: 2.4 }, { x: 15, y: 3.1 }, { x: 18, y: 3.8 },
      { x: 22, y: 4.5 }, { x: 25, y: 5.2 }, { x: 28, y: 6.0 }, { x: 32, y: 6.8 }, { x: 35, y: 7.4 },
      { x: 40, y: 8.1 }, { x: 44, y: 9.0 }, { x: 48, y: 9.7 }, { x: 52, y: 10.5 }, { x: 58, y: 11.2 },
      { x: 62, y: 12.0 }, { x: 20, y: 5.9 }, { x: 38, y: 5.1 },
    ],
    methodology:
      "One thousand two hundred and forty-seven organizations participated in a twelve-month longitudinal study in which the Institute's research staff catalogued standing-desk prevalence via on-site facility audits and analyzed internal Slack and email corpora for ecosystem-vocabulary density using the Institute's proprietary Jargon Extraction Framework (JEF v2.1). Organizations with fewer than fifty employees were excluded after the second audit on grounds the Institute declines to specify.",
    caveats: [
      "Fourteen organizations participating in the study were clients of the same workplace furniture vendor, introducing a potential shared-culture confounder the Institute chose not to control for.",
      "The Institute's own headquarters has a standing-desk adoption rate of 100% and an ecosystem-language density that fell outside the measurable range of the JEF instrument.",
      "Three facilities audited were shared coworking spaces whose standing-desk counts fluctuated daily; their values were averaged across the audit week.",
    ],
    publishedDate: "2025-04",
    principalInvestigator: "bill",
    funding: "Funded by the Institute's Publication Reserve Fund and an unrestricted gift from a standing-desk manufacturer whose products appeared in 38% of the study's facilities.",
    citedByProducts: ["correlation-almanac"],
  },

  // 2. open-office-synergy-decline (r 0.79, n 412, workplace, jim)
  {
    slug: "open-office-synergy-decline",
    title: "Open-Plan Office Square Footage Per Employee and Measured Synergy Decline: A Longitudinal Correlation",
    claim:
      "The more open-plan square footage allocated per employee, the steeper the observed decline in measurable synergy over eighteen months.",
    category: "workplace",
    rValue: 0.79,
    pValue: "< 0.001",
    sampleSize: 412,
    xAxis: { label: "Open-plan square footage per employee", units: "sq ft per person" },
    yAxis: { label: "Synergy decline score (18-month delta on Institute Synergy Index)", units: "points" },
    chartData: [
      { x: 30, y: 4 }, { x: 40, y: 7 }, { x: 50, y: 11 }, { x: 55, y: 14 }, { x: 62, y: 17 },
      { x: 70, y: 20 }, { x: 75, y: 23 }, { x: 80, y: 26 }, { x: 88, y: 30 }, { x: 95, y: 33 },
      { x: 100, y: 36 }, { x: 110, y: 39 }, { x: 118, y: 42 }, { x: 125, y: 45 }, { x: 132, y: 48 },
      { x: 60, y: 8 }, { x: 90, y: 28 },
    ],
    methodology:
      "Four hundred and twelve organizations with open-plan office configurations were enrolled in an eighteen-month prospective study. At enrollment, Institute fellows conducted facility measurements to determine gross open-plan area and headcount. Synergy Index scores were administered at month zero and month eighteen by the Institute's assessment panel via a thirty-item questionnaire distributed to all employees willing to complete it, which in several cases was fewer than five.",
    caveats: [
      "The Institute's Synergy Index has not been externally validated and was authored by the same investigator who observed the correlation.",
      "Seven organizations in the sample relocated their offices during the study period; their square footage figures represent the average of the two spaces.",
      "Synergy decline was scored by raters who were informed of the square footage before scoring, which the Institute acknowledges may have influenced their assessments.",
    ],
    publishedDate: "2024-11",
    principalInvestigator: "jim",
    funding: "Funded in part by a workplace strategy consultancy that had recommended against open-plan configurations to its clients for the preceding four years.",
    citedByProducts: ["synergy-obelisk", "kpi-vibe-audit"],
  },

  // 3. all-hands-fiscal-optimism (r 0.91, n 328, leadership, bill)
  {
    slug: "all-hands-fiscal-optimism",
    title: "All-Hands Meeting Frequency and CEO Fiscal Optimism Scores: A Strong Positive Relationship",
    claim:
      "CEOs who hold more all-hands meetings score materially higher on the Institute's Fiscal Optimism Index, regardless of actual financial performance.",
    category: "leadership",
    rValue: 0.91,
    pValue: "< 0.001",
    sampleSize: 328,
    xAxis: { label: "All-hands meetings convened per calendar year", units: "count" },
    yAxis: { label: "CEO Fiscal Optimism Index score", units: "score, 0–100" },
    chartData: [
      { x: 1, y: 28 }, { x: 2, y: 35 }, { x: 3, y: 41 }, { x: 4, y: 47 }, { x: 5, y: 53 },
      { x: 6, y: 58 }, { x: 7, y: 63 }, { x: 8, y: 67 }, { x: 9, y: 72 }, { x: 10, y: 76 },
      { x: 11, y: 80 }, { x: 12, y: 84 }, { x: 14, y: 88 }, { x: 16, y: 91 }, { x: 18, y: 94 },
      { x: 4, y: 61 }, { x: 10, y: 55 }, { x: 13, y: 79 },
    ],
    methodology:
      "Three hundred and twenty-eight organizations provided calendared all-hands records for a twelve-month window. The Institute's Fiscal Optimism Index was administered to each CEO via a structured interview conducted by a senior fellow who was instructed not to review the organization's financial statements before the session. Optimism was scored across eight dimensions including forward guidance language, gestural frequency during the word 'growth,' and willingness to make precise projections without being asked.",
    caveats: [
      "The Fiscal Optimism Index was scored by a single fellow in 241 of 328 cases, introducing assessor consistency at the cost of inter-rater reliability.",
      "Organizations that had undergone a leadership transition during the study year were retained in the sample at the Director's discretion.",
      "The study did not control for whether the organizations' financial results were actually optimistic.",
    ],
    publishedDate: "2025-01",
    principalInvestigator: "bill",
    funding: "Funded by the Institute's general operating budget. No external funding was received, which the Institute notes is itself a data point.",
    citedByProducts: ["synergy-obelisk"],
  },

  // 4. slack-emoji-document-length-inverse (r -0.83, n 2140, communication, brandon)
  {
    slug: "slack-emoji-document-length-inverse",
    title: "Slack Reaction Emoji Frequency and Strategic Document Length: An Inverse Relationship",
    claim:
      "Teams that use more Slack reaction emojis per message produce significantly shorter strategic planning documents.",
    category: "communication",
    rValue: -0.83,
    pValue: "< 0.001",
    sampleSize: 2140,
    xAxis: { label: "Mean Slack reaction emojis per message (team average)", units: "count per message" },
    yAxis: { label: "Mean strategic document word count", units: "words" },
    chartData: [
      { x: 0.2, y: 9800 }, { x: 0.5, y: 8600 }, { x: 0.8, y: 7700 }, { x: 1.0, y: 7100 }, { x: 1.3, y: 6400 },
      { x: 1.6, y: 5800 }, { x: 2.0, y: 5100 }, { x: 2.4, y: 4500 }, { x: 2.8, y: 4000 }, { x: 3.2, y: 3500 },
      { x: 3.6, y: 3100 }, { x: 4.0, y: 2700 }, { x: 4.5, y: 2200 }, { x: 5.0, y: 1800 }, { x: 5.8, y: 1400 },
      { x: 6.5, y: 1100 }, { x: 1.8, y: 6900 }, { x: 3.9, y: 3800 },
    ],
    methodology:
      "Two thousand one hundred and forty teams across 318 organizations agreed to share anonymized Slack metadata and the word counts of their five most recent strategic planning documents with the Institute's research division. Emoji frequency was computed as the total number of message reactions divided by the total number of messages in a ninety-day window. Strategic document length was averaged across all qualifying documents per team. Teams without at least three qualifying strategic documents were excluded, a criterion that disqualified 22% of the original cohort.",
    caveats: [
      "The Institute's definition of 'strategic document' was applied by a single research assistant who had never worked in a corporate environment.",
      "Custom emoji were counted at parity with standard emoji, though the Institute acknowledges this may overweight organizations with vibrant internal meme cultures.",
      "Fourteen teams that appeared in the sample had the same Slack workspace administrator, suggesting they may share a communication culture the study treats as independent data points.",
    ],
    publishedDate: "2025-06",
    principalInvestigator: "brandon",
    funding: "Funded by a productivity software research consortium that requested the data be segmented by emoji category, a request the Institute declined.",
    citedByProducts: ["correlation-almanac"],
  },

  // 5. ceo-linkedin-attrition (r 0.76, n 189, leadership, bill)
  {
    slug: "ceo-linkedin-attrition",
    title: "CEO LinkedIn Post Frequency and Twelve-Month Employee Attrition Rate: A Positive Correlation",
    claim:
      "Companies whose CEOs post more frequently on LinkedIn experience higher employee attrition in the following twelve months.",
    category: "leadership",
    rValue: 0.76,
    pValue: "< 0.001",
    sampleSize: 189,
    xAxis: { label: "CEO LinkedIn posts per month", units: "count" },
    yAxis: { label: "Employee attrition rate (12-month trailing)", units: "%" },
    chartData: [
      { x: 0, y: 8 }, { x: 1, y: 10 }, { x: 2, y: 12 }, { x: 3, y: 14 }, { x: 4, y: 16 },
      { x: 5, y: 18 }, { x: 7, y: 21 }, { x: 9, y: 23 }, { x: 11, y: 26 }, { x: 14, y: 28 },
      { x: 16, y: 30 }, { x: 19, y: 33 }, { x: 22, y: 36 }, { x: 25, y: 39 }, { x: 28, y: 41 },
      { x: 6, y: 13 }, { x: 18, y: 28 },
    ],
    methodology:
      "One hundred and eighty-nine organizations with publicly listed CEOs were selected from a sample frame constructed by the Institute's research staff using LinkedIn's public profile pages. CEO post frequency was tracked monthly for twelve months using manual observation by two research associates who rotated every eight weeks. Attrition data was sourced from each organization's annual disclosure, quarterly HR report, or, in thirteen cases, from a senior employee willing to characterize departures as 'substantial.'",
    caveats: [
      "The Institute cannot rule out that high-attrition environments cause CEOs to post more frequently as a compensatory signaling behavior, which would reverse the causal direction without affecting the correlation.",
      "Three CEOs in the sample posted exclusively content that appeared to have been written by a communications agency, and were scored accordingly without adjustment.",
      "Seventeen organizations in the study were also active clients of a LinkedIn coaching service whose materials encouraged a posting frequency of twelve to sixteen times per month.",
    ],
    publishedDate: "2024-07",
    principalInvestigator: "bill",
    funding: "Funded by the Institute's Leadership Behavior Research Fund, established by a gift from a former CEO whose LinkedIn account had been deactivated at the time of the study.",
    citedByProducts: ["certified-practitioner", "sticker-pack"],
  },

  // 6. houseplants-team-warmth (r 0.88, n 867, workplace, jim)
  {
    slug: "houseplants-team-warmth",
    title: "Office Houseplant Density and Peer-Rated Team Warmth: A Robust Positive Association",
    claim:
      "Teams whose office spaces contain more houseplants are rated measurably warmer by peers on the Institute's Team Warmth Instrument.",
    category: "workplace",
    rValue: 0.88,
    pValue: "< 0.001",
    sampleSize: 867,
    xAxis: { label: "Houseplants per 100 sq ft of team workspace", units: "plants per 100 sq ft" },
    yAxis: { label: "Peer-rated Team Warmth score", units: "score, 0–100" },
    chartData: [
      { x: 0, y: 28 }, { x: 0.2, y: 33 }, { x: 0.5, y: 39 }, { x: 0.8, y: 44 }, { x: 1.0, y: 50 },
      { x: 1.3, y: 55 }, { x: 1.6, y: 60 }, { x: 2.0, y: 65 }, { x: 2.4, y: 69 }, { x: 2.8, y: 74 },
      { x: 3.2, y: 78 }, { x: 3.6, y: 82 }, { x: 4.0, y: 85 }, { x: 4.5, y: 88 }, { x: 5.0, y: 91 },
      { x: 1.1, y: 43 }, { x: 2.9, y: 70 }, { x: 0.7, y: 56 },
    ],
    methodology:
      "Eight hundred and sixty-seven distinct team spaces across 204 organizations were surveyed over two field seasons. Institute fellows photographed each space and applied the Institute's Plant Density Protocol (PDP) to compute plants per 100 square feet, counting only living, rooted specimens and excluding cut flowers, artificial plants, and one cactus the team in question insisted was still alive. Peer-rated Team Warmth was assessed by having three adjacent teams complete the Institute's twelve-item Team Warmth Instrument for each target team, with results averaged across rater teams.",
    caveats: [
      "Adjacent-team raters may have selected warmth scores influenced by their own team's plant density, a cross-contamination the study design does not address.",
      "The Team Warmth Instrument has not been validated against any external criterion measure of warmth, as no such measure the Institute recognizes as legitimate currently exists.",
      "Forty-one of the 867 spaces were photographed during the same two-week window when an organization-wide 'biophilic workspace' initiative was underway, potentially inflating plant counts.",
    ],
    publishedDate: "2024-09",
    principalInvestigator: "jim",
    funding: "Funded by the Institute's Workplace Research Endowment. A participating organization donated twelve succulents to the Institute's research offices following publication.",
    citedByProducts: ["vibe-ring", "ambient-mood-barometer"],
  },

  // 7. journey-all-hands-pivots (r 0.81, n 254, strategy, brandon)
  {
    slug: "journey-all-hands-pivots",
    title: "Usage of 'Journey' as an Organizational Metaphor in All-Hands Meetings and Subsequent Strategic Pivots: A Positive Correlation",
    claim:
      "The more frequently 'journey' is used as a metaphor in all-hands presentations, the more strategic pivots the organization executes in the following eighteen months.",
    category: "strategy",
    rValue: 0.81,
    pValue: "< 0.001",
    sampleSize: 254,
    xAxis: { label: "Uses of 'journey' as metaphor per all-hands meeting", units: "count" },
    yAxis: { label: "Strategic pivots executed in subsequent 18 months", units: "count" },
    chartData: [
      { x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 2 }, { x: 4, y: 2 },
      { x: 5, y: 3 }, { x: 6, y: 3 }, { x: 7, y: 4 }, { x: 8, y: 5 }, { x: 9, y: 5 },
      { x: 11, y: 6 }, { x: 13, y: 7 }, { x: 15, y: 8 }, { x: 17, y: 9 }, { x: 20, y: 10 },
      { x: 4, y: 5 }, { x: 12, y: 5 }, { x: 8, y: 2 },
    ],
    methodology:
      "Two hundred and fifty-four organizations consented to provide transcripts or recordings of their all-hands meetings over a twenty-four-month window. The Institute's linguistic analysis team coded each occurrence of 'journey' and classified it as literal or metaphorical using a codebook developed for this study. Only metaphorical uses were counted. Strategic pivots were identified from press releases, board minutes shared voluntarily, and in forty-one cases by asking a senior employee to characterize the organization's trajectory as either 'consistent' or 'not consistent,' with the latter coded as a pivot.",
    caveats: [
      "The distinction between 'strategic pivot' and 'strategic refinement' was made by the same research associate who coded the metaphors, creating a consistency the Institute describes as methodological coherence.",
      "Four organizations in the sample used 'journey' in their company name, and the Institute chose to count these occurrences as metaphorical.",
      "Journey-free all-hands transcripts were disproportionately represented by organizations in the logistics sector, which may confound the relationship.",
    ],
    publishedDate: "2025-03",
    principalInvestigator: "brandon",
    funding: "Funded by the Institute's Linguistic Strategy Research Fund and an unrestricted grant from a communications consultancy that has since pivoted.",
    citedByProducts: ["correlation-almanac"],
  },

  // 8. vendor-logo-saturation-churn (r 0.74, n 512, strategy, brandon)
  {
    slug: "vendor-logo-saturation-churn",
    title: "Vendor Logo Count on Company Website and Customer Churn Rate: A Positive Association",
    claim:
      "Companies displaying more vendor and partner logos on their website homepage experience higher customer churn in the subsequent year.",
    category: "strategy",
    rValue: 0.74,
    pValue: "< 0.001",
    sampleSize: 512,
    xAxis: { label: "Vendor and partner logos on company homepage", units: "count" },
    yAxis: { label: "Annual customer churn rate", units: "%" },
    chartData: [
      { x: 0, y: 4 }, { x: 2, y: 6 }, { x: 4, y: 8 }, { x: 6, y: 10 }, { x: 8, y: 12 },
      { x: 10, y: 14 }, { x: 13, y: 16 }, { x: 16, y: 18 }, { x: 19, y: 21 }, { x: 22, y: 23 },
      { x: 25, y: 25 }, { x: 28, y: 27 }, { x: 32, y: 30 }, { x: 36, y: 32 }, { x: 40, y: 35 },
      { x: 7, y: 16 }, { x: 20, y: 14 }, { x: 30, y: 22 },
    ],
    methodology:
      "Five hundred and twelve B2B software and services companies were selected from a sample frame the Institute constructed by identifying companies with publicly accessible pricing pages and at least one customer success case study. Homepage logo counts were manually recorded by Institute research associates on a designated audit date; logos were counted regardless of whether they were labeled as 'customers,' 'partners,' or 'trusted by.' Annual churn figures were sourced from public disclosures, investor materials, or from industry analysts who were willing to characterize a company's retention as 'challenged.'",
    caveats: [
      "Seventeen companies in the sample redesigned their homepages during the measurement window; the Institute used the logo count from the first screenshot taken.",
      "The Institute's own website displays eleven vendor logos, a fact that was noted internally and not acted upon.",
      "Customer churn figures were available in a comparable format for only 61% of the sample; the remainder were estimated using a method the Institute describes as 'informed interpolation.'",
    ],
    publishedDate: "2024-05",
    principalInvestigator: "brandon",
    funding: "Funded by the Institute's Digital Strategy Research Reserve. No participating company was informed that its homepage was being audited.",
    citedByProducts: ["sticker-pack", "pocket-ruler"],
  },

  // 9. transparency-usage-transcripts-inverse (r -0.92, n 178, communication, brandon)
  {
    slug: "transparency-usage-transcripts-inverse",
    title: "Frequency of 'Transparency' in All-Hands Transcripts and Actual Information Disclosed: A Strong Inverse Relationship",
    claim:
      "The more frequently the word 'transparency' appears in an all-hands meeting transcript, the less factual information about the organization is actually disclosed in that meeting.",
    category: "communication",
    rValue: -0.92,
    pValue: "< 0.001",
    sampleSize: 178,
    xAxis: { label: "Instances of 'transparency' or 'transparent' per transcript", units: "count" },
    yAxis: { label: "Verified factual disclosures per transcript (Institute scoring)", units: "count" },
    chartData: [
      { x: 0, y: 38 }, { x: 1, y: 34 }, { x: 2, y: 30 }, { x: 3, y: 27 }, { x: 4, y: 23 },
      { x: 5, y: 20 }, { x: 6, y: 17 }, { x: 7, y: 15 }, { x: 8, y: 12 }, { x: 9, y: 10 },
      { x: 10, y: 8 }, { x: 11, y: 7 }, { x: 12, y: 5 }, { x: 13, y: 4 }, { x: 14, y: 3 },
      { x: 5, y: 24 }, { x: 9, y: 14 }, { x: 2, y: 22 },
    ],
    methodology:
      "One hundred and seventy-eight all-hands meeting transcripts were obtained from organizations that had publicly described their all-hands meetings as 'transparent' in at least one piece of investor or press communication. Transcripts were coded by the Institute's disclosure analysis team using the Institute's Factual Disclosure Taxonomy (FDT), which classifies each declarative statement as: verified factual (containing a specific, verifiable claim), qualified factual (containing a claim dependent on a metric not provided), aspirational (containing no verifiable content), or procedural (administrative in nature). Only verified factual disclosures were counted for the dependent variable.",
    caveats: [
      "The Factual Disclosure Taxonomy was developed by the same investigator who conducted the coding, a practice the Institute characterizes as 'consistent application.'",
      "Meetings at which legal counsel was present produced notably fewer factual disclosures; these were retained in the sample without adjustment.",
      "The Institute's own all-hands meetings were excluded from the sample on methodological grounds the Institute declined to document.",
    ],
    publishedDate: "2025-11",
    principalInvestigator: "brandon",
    funding: "Funded by an anonymous institutional donor who requested, in writing, that their name not appear in any disclosure associated with this study.",
    citedByProducts: ["correlation-coaching"],
  },

  // 10. free-snack-anxiety (r 0.80, n 730, culture, bill)
  {
    slug: "free-snack-anxiety",
    title: "Free Office Snack Variety and Employee Ambient Anxiety Scores: An Unexpected Positive Relationship",
    claim:
      "Employees in offices offering a wider variety of free snacks report higher ambient anxiety on the Institute's Workplace Anxiety Scale.",
    category: "culture",
    rValue: 0.80,
    pValue: "< 0.001",
    sampleSize: 730,
    xAxis: { label: "Number of distinct free snack varieties available in the office", units: "count" },
    yAxis: { label: "Employee ambient anxiety score (Institute Workplace Anxiety Scale)", units: "score, 0–100" },
    chartData: [
      { x: 2, y: 18 }, { x: 4, y: 22 }, { x: 6, y: 26 }, { x: 8, y: 31 }, { x: 10, y: 35 },
      { x: 12, y: 39 }, { x: 15, y: 43 }, { x: 18, y: 47 }, { x: 21, y: 51 }, { x: 25, y: 54 },
      { x: 30, y: 58 }, { x: 35, y: 62 }, { x: 40, y: 65 }, { x: 48, y: 69 }, { x: 55, y: 73 },
      { x: 9, y: 42 }, { x: 28, y: 44 }, { x: 20, y: 60 },
    ],
    methodology:
      "Seven hundred and thirty employees across 89 organizations completed the Institute's Workplace Anxiety Scale (WAS-14) and a supplementary questionnaire documenting the number of distinct snack varieties available in their office at the time of completion. Snack variety counts were independently verified by an Institute research associate for 71% of the sample; the remainder relied on self-report. The WAS-14 was administered without informing participants that snack availability was the variable of interest, which was considered ethically straightforward by the Institute's internal review process.",
    caveats: [
      "The Workplace Anxiety Scale was administered on a Monday morning in all 89 organizations to control for day-of-week effects, which may have introduced a day-of-week effect of a different kind.",
      "Organizations with more than 50 snack varieties were predominantly in the technology sector, introducing a potential industry confounder the Institute elected not to parse.",
      "Three organizations reported zero free snack varieties and were included in the sample over the objections of one research associate who found this implausible.",
    ],
    publishedDate: "2024-10",
    principalInvestigator: "bill",
    funding: "Funded by the Institute's Culture Measurement Research Fund. A snack brand whose product appeared in 34 of the 89 study organizations provided no funding and was not informed of this study.",
    citedByProducts: ["vibe-ring", "ambient-mood-barometer"],
  },

  // 11. exec-water-bottle-reorg (r 0.85, n 301, leadership, sean)
  {
    slug: "exec-water-bottle-reorg",
    title: "Executive Water Bottle Size and Likelihood of Organizational Restructuring Within Twelve Months: A Positive Correlation",
    claim:
      "Executives who carry water bottles with a capacity of 40 oz or more are significantly more likely to announce a major organizational restructuring within the following twelve months.",
    category: "leadership",
    rValue: 0.85,
    pValue: "< 0.001",
    sampleSize: 301,
    xAxis: { label: "Executive primary water bottle capacity", units: "oz" },
    yAxis: { label: "Restructuring events announced within 12 months", units: "count" },
    chartData: [
      { x: 12, y: 0 }, { x: 16, y: 0 }, { x: 20, y: 1 }, { x: 24, y: 1 }, { x: 28, y: 1 },
      { x: 32, y: 2 }, { x: 36, y: 2 }, { x: 40, y: 3 }, { x: 44, y: 3 }, { x: 48, y: 4 },
      { x: 52, y: 4 }, { x: 56, y: 5 }, { x: 60, y: 5 }, { x: 64, y: 6 }, { x: 72, y: 7 },
      { x: 30, y: 3 }, { x: 48, y: 2 }, { x: 40, y: 1 },
    ],
    methodology:
      "Three hundred and one C-suite executives were enrolled in a twelve-month prospective study. At enrollment, Institute fellows conducted one-time workplace observation sessions during which the executive's primary hydration vessel was photographed and its capacity determined via physical measurement or product identification. Organizational restructuring events were tracked from public announcements, press releases, and, in 44 cases, from employees who reached out to the Institute unsolicited following publication of the preliminary brief.",
    caveats: [
      "Water bottle capacity was established for primary vessels only; secondary vessels observed at meetings were not catalogued, though they were noted.",
      "Fourteen executives upgraded their water bottle size during the study period; the study used the vessel observed at enrollment.",
      "The Institute acknowledges it cannot determine whether executives with large water bottles restructure more, or whether restructuring-minded executives require more hydration.",
    ],
    publishedDate: "2025-08",
    principalInvestigator: "sean",
    funding: "Funded by the Institute's Executive Behavior Laboratory endowment. The Institute's own Director carries a 64 oz vessel, a fact that was not considered disqualifying.",
    citedByProducts: ["wall-plaque", "pocket-ruler"],
  },

  // 12. all-hands-cadence-exit-package (r 0.77, n 94, leadership, sean)
  {
    slug: "all-hands-cadence-exit-package",
    title: "All-Hands Meeting Cadence Increase and Subsequent Executive Exit Package Size: A Positive Association",
    claim:
      "Organizations that increase their all-hands meeting frequency in a given quarter tend to offer materially larger executive exit packages in the following two quarters.",
    category: "leadership",
    rValue: 0.77,
    pValue: "< 0.001",
    sampleSize: 94,
    xAxis: { label: "Increase in all-hands meetings per quarter vs. prior year", units: "count delta" },
    yAxis: { label: "Executive exit package value (nearest $50k)", units: "$000s" },
    chartData: [
      { x: 0, y: 150 }, { x: 1, y: 210 }, { x: 2, y: 280 }, { x: 2, y: 190 }, { x: 3, y: 340 },
      { x: 3, y: 410 }, { x: 4, y: 470 }, { x: 5, y: 530 }, { x: 5, y: 440 }, { x: 6, y: 610 },
      { x: 7, y: 670 }, { x: 8, y: 720 }, { x: 9, y: 790 }, { x: 10, y: 850 }, { x: 12, y: 950 },
      { x: 4, y: 610 }, { x: 7, y: 500 },
    ],
    methodology:
      "Ninety-four organizations that had experienced a named executive departure and publicly disclosed exit compensation terms in the period 2020 through 2024 were identified from SEC filings, press disclosures, and, in seven cases, from reporting by a financial news outlet that the Institute partnered with under a non-disclosure agreement. All-hands meeting frequency was reconstructed from employee recollections solicited via a voluntary survey posted to professional networks; the accuracy of recollected meeting frequency was not independently verified.",
    caveats: [
      "Exit package values include severance, accelerated equity, and consulting agreements where disclosed; non-disclosed components were not estimated, which likely understates the figures in 23 cases.",
      "All-hands frequency was reconstructed from memory with a median recall period of fourteen months, which the Institute acknowledges is not ideal.",
      "The sample size of 94 is the smallest of any Institute study currently in the archive, a fact the Institute considers irrelevant to the validity of the finding.",
    ],
    publishedDate: "2024-03",
    principalInvestigator: "sean",
    funding: "Funded by the Institute's Executive Transitions Research Fund, established through a gift from an executive who declined to characterize their own departure.",
    citedByProducts: ["tarnishing-plaque"],
  },

  // 13. fitbit-manager-nps-inflation (r 0.73, n 1088, productivity, jim)
  {
    slug: "fitbit-manager-nps-inflation",
    title: "Manager Fitbit Ownership and Direct Report Manager NPS Score Inflation: A Positive Correlation",
    claim:
      "Employees whose managers own and visibly wear fitness trackers give their managers higher Net Promoter Scores, independent of managerial quality.",
    category: "productivity",
    rValue: 0.73,
    pValue: "< 0.001",
    sampleSize: 1088,
    xAxis: { label: "Manager fitness tracker visibility score (0 = never seen, 5 = always visible)", units: "score, 0–5" },
    yAxis: { label: "Manager NPS score assigned by direct reports (0–10 scale, averaged)", units: "score" },
    chartData: [
      { x: 0, y: 5.2 }, { x: 0.5, y: 5.6 }, { x: 1.0, y: 6.0 }, { x: 1.5, y: 6.4 }, { x: 2.0, y: 6.8 },
      { x: 2.5, y: 7.1 }, { x: 3.0, y: 7.4 }, { x: 3.5, y: 7.7 }, { x: 4.0, y: 8.0 }, { x: 4.5, y: 8.3 },
      { x: 5.0, y: 8.6 }, { x: 1.0, y: 7.2 }, { x: 2.5, y: 6.2 }, { x: 4.0, y: 7.4 }, { x: 3.5, y: 8.4 },
      { x: 0, y: 6.8 }, { x: 5.0, y: 7.9 },
    ],
    methodology:
      "One thousand and eighty-eight manager-team pairs across 156 organizations participated in a six-month observational study. At enrollment, each direct report was asked to rate their manager's fitness tracker visibility on a five-point scale. Manager NPS scores were collected via an anonymous pulse survey administered by the Institute six months after enrollment. Organizational HR teams were not informed of the hypothesis under investigation and were told the study concerned 'workplace wellness indicators,' which the Institute considers accurate.",
    caveats: [
      "Fitness tracker visibility was rated by direct reports, meaning the score reflects both actual visibility and willingness to notice and report it, which are not independent.",
      "Seven managers in the sample wore fitness trackers on both wrists, and their scores were averaged with a note in the margin of the data file.",
      "The study did not control for whether managers who wear fitness trackers are, in fact, better managers, on the grounds that this would require defining 'better.'",
    ],
    publishedDate: "2025-02",
    principalInvestigator: "jim",
    funding: "Funded by the Institute's Productivity Measurement Research Division. A wearable device manufacturer provided no funding and was not aware the study was occurring.",
    citedByProducts: ["kpi-vibe-audit"],
  },

  // 14. bookshelf-density-fundraise (r 0.86, n 412, leadership, bill)
  {
    slug: "bookshelf-density-fundraise",
    title: "Bookshelf Density in Executive Portrait Photographs and Series A Round Size: A Retrospective Analysis",
    claim:
      "Startup founders photographed with denser bookshelves in official portrait photography raise larger Series A rounds.",
    category: "leadership",
    rValue: 0.86,
    pValue: "< 0.001",
    sampleSize: 412,
    xAxis: { label: "Books visible per square foot of bookshelf area in official portrait photo", units: "books per sq ft" },
    yAxis: { label: "Series A round size", units: "$M" },
    chartData: [
      { x: 0.5, y: 4 }, { x: 1.0, y: 6 }, { x: 1.5, y: 9 }, { x: 2.0, y: 13 }, { x: 2.5, y: 17 },
      { x: 3.0, y: 22 }, { x: 3.5, y: 27 }, { x: 4.0, y: 33 }, { x: 4.5, y: 39 }, { x: 5.0, y: 46 },
      { x: 5.5, y: 53 }, { x: 6.0, y: 61 }, { x: 6.5, y: 70 }, { x: 7.0, y: 79 }, { x: 7.5, y: 88 },
      { x: 2.2, y: 35 }, { x: 5.8, y: 40 }, { x: 3.8, y: 18 },
    ],
    methodology:
      "Four hundred and twelve Series A funding announcements from the period 2019 through 2024 were identified from Crunchbase and press releases. The founder's official portrait photograph as published at the time of the announcement was retrieved, and bookshelf density was measured by counting visible book spines within visible bookshelf area, which was estimated using a reference object in the frame where available. Photographs without a visible bookshelf were excluded from the primary analysis and reported separately in a supplementary appendix the Institute has not yet released.",
    caveats: [
      "Bookshelf density reflects both the number of books owned and the photographer's framing choices, and the study does not distinguish between these contributions.",
      "Thirty-eight photographs featured bookshelves that appeared to have been styled by a professional for the session; these were retained in the sample.",
      "The Institute's Director appears in three of the 412 photographs in a non-founder advisory capacity, a coincidence that was documented and not acted upon.",
    ],
    publishedDate: "2025-07",
    principalInvestigator: "bill",
    funding: "Funded by the Institute's Leadership Image Research Fund, itself funded by a donor whose portrait features seven shelves of densely packed books.",
    citedByProducts: ["certified-practitioner", "wall-plaque"],
  },

  // 15. alignment-in-okrs-inverse (ALREADY AUTHORED — verbatim from plan)
  {
    slug: "alignment-in-okrs-inverse",
    title: "Frequency of 'Alignment' in OKR Statements and Observed Team Alignment: An Inverse Relationship",
    claim:
      "The more frequently the word 'alignment' appears in a team's OKRs, the less aligned the team actually is.",
    category: "strategy",
    rValue: -0.89,
    pValue: "< 0.001",
    sampleSize: 247,
    xAxis: { label: "Instances of 'alignment' per OKR document", units: "count" },
    yAxis: { label: "Observed alignment score (external rater)", units: "score, 0–100" },
    chartData: [
      { x: 1, y: 84 }, { x: 2, y: 78 }, { x: 3, y: 72 }, { x: 3, y: 80 }, { x: 4, y: 68 },
      { x: 5, y: 62 }, { x: 6, y: 58 }, { x: 7, y: 54 }, { x: 8, y: 49 }, { x: 9, y: 44 },
      { x: 10, y: 41 }, { x: 11, y: 38 }, { x: 12, y: 33 }, { x: 13, y: 30 }, { x: 14, y: 27 },
      { x: 15, y: 24 }, { x: 16, y: 21 }, { x: 4, y: 85 },
    ],
    methodology:
      "Two hundred and forty-seven OKR documents were collected from participating organizations under an NDA the Institute drafted for itself. Instances of 'alignment' and 'aligned' were tallied. Observed team alignment was then scored by two external raters (neither of whom met the teams in question) via a five-minute review of meeting calendars.",
    caveats: [
      "Raters were not blinded to the word-count condition.",
      "Three teams in the sample were the same team, re-measured after a reorg.",
      "The Institute's internal OKR uses the word 'alignment' eleven times.",
    ],
    publishedDate: "2025-09",
    principalInvestigator: "sean",
    funding: "Funded by the Institute's general operating budget and one participating organization that requested the outcome be inverted.",
    citedByProducts: ["quarterly-report", "kpi-vibe-audit", "correlation-coaching", "certified-practitioner"],
  },

  // 16. take-this-offline-random-growth (r 0.82, n 615, communication, brandon)
  {
    slug: "take-this-offline-random-growth",
    title: "Frequency of 'Let's Take This Offline' in Team Meetings and Subsequent Random-Walk Revenue Growth: A Positive Correlation",
    claim:
      "Teams that more frequently defer meeting topics with 'let's take this offline' record higher revenue growth in the following quarter — though not for any discernible reason.",
    category: "communication",
    rValue: 0.82,
    pValue: "< 0.001",
    sampleSize: 615,
    xAxis: { label: "Mean uses of 'take this offline' per meeting (team average)", units: "count per meeting" },
    yAxis: { label: "Revenue growth, quarter following measurement", units: "%" },
    chartData: [
      { x: 0, y: 1.2 }, { x: 0.5, y: 2.8 }, { x: 1.0, y: 4.5 }, { x: 1.5, y: 6.1 }, { x: 2.0, y: 7.8 },
      { x: 2.5, y: 9.4 }, { x: 3.0, y: 11.0 }, { x: 3.5, y: 12.7 }, { x: 4.0, y: 14.3 }, { x: 4.5, y: 15.9 },
      { x: 5.0, y: 17.6 }, { x: 5.5, y: 19.2 }, { x: 6.0, y: 20.8 }, { x: 7.0, y: 23.5 }, { x: 8.0, y: 26.0 },
      { x: 2.0, y: 12.5 }, { x: 5.0, y: 10.3 }, { x: 3.5, y: 19.0 },
    ],
    methodology:
      "Six hundred and fifteen revenue-generating teams across 91 organizations were observed over a six-month baseline period. Meeting transcripts were coded by Institute research associates for instances of the phrase 'take this offline,' 'let's table that,' and semantically equivalent deferrals per the Institute's Offline Deferral Codebook (ODC v1.3). Revenue figures for the subsequent quarter were obtained from organizational finance contacts who were told the study concerned 'communication pattern effects,' which the Institute considers accurate in the sense that it studies patterns and communication is involved.",
    caveats: [
      "The study cannot distinguish between teams that defer topics because they are revenue-generative and those that generate revenue despite deferring topics.",
      "Fourteen teams conducted meetings exclusively via chat, and their deferral language was adapted for text format using a conversion protocol the Institute developed over one afternoon.",
      "Revenue figures were self-reported for 38% of the sample, a proportion the Institute considers acceptable.",
    ],
    publishedDate: "2025-10",
    principalInvestigator: "brandon",
    funding: "Funded by the Institute's Communication Research Reserve and a participating organization that was surprised by the result and asked to remain anonymous.",
    citedByProducts: ["correlation-coaching", "pocket-ruler"],
  },

  // 17. exec-patagonia-vest-board-sentiment (r 0.78, n 156, leadership, sean)
  {
    slug: "exec-patagonia-vest-board-sentiment",
    title: "Executive Patagonia Vest Ownership and Board of Directors Meeting Sentiment Scores: A Positive Association",
    claim:
      "Executives who own and wear Patagonia vests to board meetings receive higher sentiment scores from board members in post-meeting evaluations.",
    category: "leadership",
    rValue: 0.78,
    pValue: "< 0.001",
    sampleSize: 156,
    xAxis: { label: "Board meetings attended wearing Patagonia vest (per year)", units: "count" },
    yAxis: { label: "Board sentiment score (post-meeting survey, 0–100)", units: "score" },
    chartData: [
      { x: 0, y: 48 }, { x: 1, y: 52 }, { x: 1, y: 57 }, { x: 2, y: 59 }, { x: 2, y: 64 },
      { x: 3, y: 66 }, { x: 3, y: 71 }, { x: 4, y: 73 }, { x: 4, y: 77 }, { x: 5, y: 79 },
      { x: 5, y: 83 }, { x: 6, y: 84 }, { x: 7, y: 86 }, { x: 8, y: 89 }, { x: 9, y: 91 },
      { x: 2, y: 72 }, { x: 5, y: 61 }, { x: 7, y: 78 },
    ],
    methodology:
      "One hundred and fifty-six executives across 48 organizations that agreed to participate in the Institute's Board Dynamics Study provided self-reported records of their board meeting attire over a twelve-month period. Patagonia vest attendance was defined as any board meeting at which the executive wore a Patagonia-brand vest or pullover; garments of uncertain brand provenance were categorized as 'probable Patagonia' using a photographic reference guide. Board sentiment scores were collected from board member post-meeting surveys administered by the Institute without informing board members that apparel was under study.",
    caveats: [
      "Executives self-reported their own attire, introducing recall bias and the possibility that executives who wore the vest more often also remembered doing so more readily.",
      "Seven executives reported wearing Patagonia vests to every board meeting without exception, including one in a jurisdiction with a dress code requiring a jacket, where the vest was worn over the jacket.",
      "The Institute cannot rule out that vest-wearing executives are drawn from a demographic that independently predicts positive board outcomes through channels the study did not measure.",
    ],
    publishedDate: "2024-08",
    principalInvestigator: "sean",
    funding: "Funded by the Institute's Executive Presence Research Fund. Patagonia, Inc. was not consulted, informed, or compensated and would likely prefer not to be associated with this study.",
    citedByProducts: ["sticker-pack"],
  },

  // 18. synergy-ma-announcements (r 0.84, n 221, strategy, brandon)
  {
    slug: "synergy-ma-announcements",
    title: "Frequency of 'Synergy' in M&A Press Release Language and Subsequent Integration Difficulty: A Positive Correlation",
    claim:
      "Merger and acquisition announcements that use 'synergy' more frequently are followed by more difficult integrations, as measured by the Institute's Post-Merger Friction Index.",
    category: "strategy",
    rValue: 0.84,
    pValue: "< 0.001",
    sampleSize: 221,
    xAxis: { label: "Instances of 'synergy' or 'synergies' in M&A press release", units: "count" },
    yAxis: { label: "Post-Merger Friction Index score (18-month follow-up)", units: "score, 0–100" },
    chartData: [
      { x: 0, y: 18 }, { x: 1, y: 24 }, { x: 2, y: 30 }, { x: 3, y: 36 }, { x: 4, y: 41 },
      { x: 5, y: 47 }, { x: 6, y: 52 }, { x: 7, y: 57 }, { x: 8, y: 62 }, { x: 9, y: 66 },
      { x: 10, y: 71 }, { x: 12, y: 76 }, { x: 14, y: 80 }, { x: 16, y: 84 }, { x: 18, y: 88 },
      { x: 3, y: 54 }, { x: 10, y: 52 }, { x: 7, y: 72 },
    ],
    methodology:
      "Two hundred and twenty-one merger and acquisition announcements from the period 2018 through 2023 were identified from public filings. The occurrence of 'synergy,' 'synergies,' 'synergistic,' and 'synergize' in the primary press release was tallied for each transaction. Eighteen months following the transaction close date, the Institute administered its Post-Merger Friction Index to employees at three organizational levels (executive, middle management, and individual contributor) at the acquiring organization, averaging scores across respondents. Organizations where fewer than ten employees completed the survey were excluded from the final analysis.",
    caveats: [
      "The Post-Merger Friction Index was designed by the Institute's research team after the press releases had already been coded, which the Institute notes is a pre-registration the Institute did not perform.",
      "Two transactions in the sample were publicly described as 'reverse mergers,' and it is unclear which entity's press release should be considered primary; both were used.",
      "The study found that press releases written by outside PR firms used 'synergy' at 1.7 times the rate of internally drafted releases, a finding the Institute considered reporting separately and then did not.",
    ],
    publishedDate: "2026-01",
    principalInvestigator: "brandon",
    funding: "Funded by a private equity firm that requested anonymity and asked that the study not be published until after the close of one of its portfolio transactions, a request the Institute honored.",
    citedByProducts: ["synergy-obelisk", "quarterly-report"],
  },

  // 19. ping-pong-proximity-tenure-inverse (r -0.75, n 894, workplace, jim)
  {
    slug: "ping-pong-proximity-tenure-inverse",
    title: "Proximity of Employee Workstation to Office Ping-Pong Table and Employee Tenure: An Inverse Relationship",
    claim:
      "Employees whose workstations are closer to the office ping-pong table have shorter tenures with the organization.",
    category: "workplace",
    rValue: -0.75,
    pValue: "< 0.001",
    sampleSize: 894,
    xAxis: { label: "Distance from workstation to nearest ping-pong table", units: "meters" },
    yAxis: { label: "Employee tenure at time of study", units: "months" },
    chartData: [
      { x: 2, y: 8 }, { x: 4, y: 11 }, { x: 6, y: 15 }, { x: 8, y: 18 }, { x: 10, y: 22 },
      { x: 12, y: 26 }, { x: 15, y: 31 }, { x: 18, y: 35 }, { x: 22, y: 40 }, { x: 26, y: 44 },
      { x: 30, y: 49 }, { x: 35, y: 53 }, { x: 40, y: 58 }, { x: 45, y: 62 }, { x: 50, y: 66 },
      { x: 5, y: 42 }, { x: 25, y: 18 }, { x: 40, y: 44 },
    ],
    methodology:
      "Eight hundred and ninety-four employees across 67 organizations with at least one in-office ping-pong table were enrolled in a cross-sectional study. Workstation distance from the nearest ping-pong table was measured by Institute fellows using a calibrated laser distance tool during off-hours visits arranged with facilities management. Employee tenure was drawn from HR records provided by each organization under a data sharing agreement that required the Institute to hold the data for no more than twelve months, a condition the Institute is in the process of reviewing.",
    caveats: [
      "Causal direction is unclear: it may be that short-tenure employees select seats closer to the ping-pong table, or that proximity to the table causes shorter tenure through a mechanism the Institute has not yet identified but finds plausible.",
      "Three organizations had removed their ping-pong tables in the month before the Institute's site visit, and the measurements were taken from tape marks on the floor indicating the former position.",
      "Two employees measured at minimum distance (under 1 meter) were the organization's dedicated ping-pong equipment managers, who were retained in the sample.",
    ],
    publishedDate: "2024-06",
    principalInvestigator: "jim",
    funding: "Funded by the Institute's Workplace Design Research Fund. No table tennis equipment manufacturer was involved in the study design, though one was sent a courtesy copy of the findings.",
    citedByProducts: ["ambient-mood-barometer"],
  },

  // 20. innovation-mission-patents-inverse (r -0.87, n 1402, strategy, brandon)
  {
    slug: "innovation-mission-patents-inverse",
    title: "Frequency of 'Innovation' in Corporate Mission Statements and Annual Patent Filings: A Negative Relationship",
    claim:
      "Companies that use the word 'innovation' more frequently in their mission statements file fewer patents per year.",
    category: "strategy",
    rValue: -0.87,
    pValue: "< 0.001",
    sampleSize: 1402,
    xAxis: { label: "Instances of 'innovation' or 'innovative' in mission statement", units: "count" },
    yAxis: { label: "Annual patent applications filed", units: "count" },
    chartData: [
      { x: 0, y: 48 }, { x: 1, y: 38 }, { x: 1, y: 55 }, { x: 2, y: 30 }, { x: 2, y: 42 },
      { x: 3, y: 24 }, { x: 3, y: 35 }, { x: 4, y: 18 }, { x: 4, y: 27 }, { x: 5, y: 13 },
      { x: 5, y: 21 }, { x: 6, y: 9 }, { x: 7, y: 6 }, { x: 8, y: 4 }, { x: 9, y: 2 },
      { x: 2, y: 15 }, { x: 5, y: 32 }, { x: 7, y: 10 },
    ],
    methodology:
      "One thousand four hundred and two publicly traded companies were identified from a sample frame constructed by the Institute's research division. Current mission statements were retrieved from company websites and annual reports as of January 2025. The frequency of 'innovation,' 'innovative,' and 'innovate' was counted. Patent application counts for the prior calendar year were obtained from the USPTO's public database. Companies in sectors where patent filing is structurally atypical (e.g., hospitality, retail) were retained in the analysis without adjustment on the grounds that their mission statements were particularly instructive.",
    caveats: [
      "The study does not distinguish between companies that use 'innovation' because they are not innovative and those that are innovative and have simply chosen not to mention it.",
      "Mission statements were taken as the version publicly displayed at time of data collection; forty-three companies had updated their mission statements in the preceding six months, suggesting the prior version may have contained different innovation language.",
      "The Institute's own mission statement uses the word 'measurement' seven times and 'innovation' zero times, which the Institute considers a validation of its own methodology.",
    ],
    publishedDate: "2025-12",
    principalInvestigator: "brandon",
    funding: "Funded by the Institute's Strategy Research Endowment and a foundation that declines to disclose its investment portfolio.",
    citedByProducts: ["quarterly-report"],
  },

  // 21. offsites-severance-accrual (r 0.79, n 187, culture, bill)
  {
    slug: "offsites-severance-accrual",
    title: "Executive Offsite Frequency and Cumulative Severance Expense Accrual: A Positive Correlation",
    claim:
      "Organizations that hold more executive offsites per year accrue significantly higher cumulative severance expenses in the subsequent three years.",
    category: "culture",
    rValue: 0.79,
    pValue: "< 0.001",
    sampleSize: 187,
    xAxis: { label: "Executive offsite events per year", units: "count" },
    yAxis: { label: "Three-year cumulative severance expense", units: "$M" },
    chartData: [
      { x: 0, y: 0.4 }, { x: 1, y: 1.1 }, { x: 1, y: 1.8 }, { x: 2, y: 2.4 }, { x: 2, y: 3.2 },
      { x: 3, y: 4.0 }, { x: 3, y: 4.9 }, { x: 4, y: 5.8 }, { x: 4, y: 6.7 }, { x: 5, y: 7.7 },
      { x: 5, y: 8.6 }, { x: 6, y: 9.6 }, { x: 7, y: 10.8 }, { x: 8, y: 12.0 }, { x: 9, y: 13.4 },
      { x: 3, y: 7.5 }, { x: 6, y: 5.8 }, { x: 8, y: 9.0 },
    ],
    methodology:
      "One hundred and eighty-seven organizations provided records of executive offsite events — defined as any multi-day off-site gathering of five or more executives — for a three-year retrospective period. Offsite records were obtained from expense reports, facility booking confirmations, and in eleven cases from calendar data shared by an executive assistant. Severance expenses were drawn from audited financial statements where available; for private companies, from estimates provided by the CFO or, in eight cases, by a departing CFO.",
    caveats: [
      "The study cannot determine whether organizations with higher offsite activity also make more consequential personnel decisions, or whether offsites directly cause the personnel decisions.",
      "Four organizations held their executive offsites at the same resort property, which introduced a shared-venue confounder the Institute discussed at length and then set aside.",
      "Severance expense accrual figures were provided by the same financial officers who approved the offsites, whose objectivity the Institute found sufficient.",
    ],
    publishedDate: "2025-05",
    principalInvestigator: "bill",
    funding: "Funded by the Institute's Organizational Culture Research Fund. The study was peer-reviewed by two Institute fellows who had each attended an executive offsite in the preceding year.",
    citedByProducts: ["tarnishing-plaque"],
  },

  // 22. holiday-card-complexity-layoffs (r 0.82, n 340, strategy, brandon)
  {
    slug: "holiday-card-complexity-layoffs",
    title: "Corporate Holiday Card Visual Complexity and Subsequent Workforce Reduction Announcements: A Positive Association",
    claim:
      "Companies that send more visually complex holiday cards in a given year are more likely to announce a significant workforce reduction in the following six months.",
    category: "strategy",
    rValue: 0.82,
    pValue: "< 0.001",
    sampleSize: 340,
    xAxis: { label: "Holiday card visual complexity score (Institute 10-point scale)", units: "score, 1–10" },
    yAxis: { label: "Workforce reduction announced in following 6 months", units: "% of headcount" },
    chartData: [
      { x: 1, y: 0.5 }, { x: 2, y: 1.4 }, { x: 2, y: 2.8 }, { x: 3, y: 3.5 }, { x: 3, y: 5.0 },
      { x: 4, y: 5.8 }, { x: 4, y: 7.2 }, { x: 5, y: 8.1 }, { x: 5, y: 9.5 }, { x: 6, y: 10.4 },
      { x: 6, y: 11.8 }, { x: 7, y: 13.0 }, { x: 8, y: 14.5 }, { x: 9, y: 16.2 }, { x: 10, y: 18.0 },
      { x: 4, y: 12.0 }, { x: 7, y: 6.5 }, { x: 5, y: 14.8 },
    ],
    methodology:
      "Three hundred and forty corporate holiday cards were collected from a solicitation distributed to Institute subscribers, professional network contacts, and, for twenty-one entries, directly retrieved from social media posts in which companies shared their own cards. Visual complexity was scored by a panel of three Institute raters on a ten-point scale using the Institute's Holiday Communication Complexity Rubric (HCCR), which evaluates foil usage, element count, message word count, and the presence of a custom illustration. Workforce reduction announcements in the following six months were identified from press coverage and SEC filings.",
    caveats: [
      "The HCCR was developed over two weeks immediately preceding the study and has not been validated against any external measure of visual complexity.",
      "Forty-seven companies in the sample sent no holiday card, and their complexity score was assigned as zero, which the Institute acknowledges is a modeling choice.",
      "Three raters scoring visual complexity reported that they found the exercise 'genuinely difficult,' a comment that was documented and included in the supplementary materials that have not been released.",
    ],
    publishedDate: "2026-03",
    principalInvestigator: "brandon",
    funding: "Funded by the Institute's Communications Research Reserve. The study's publication was timed to coincide with the holiday card season, a decision the Institute describes as 'methodologically neutral.'",
    citedByProducts: ["tarnishing-plaque"],
  },

  // 23. humble-ceo-interviews-inverse (r -0.93, n 78, leadership, sean)
  {
    slug: "humble-ceo-interviews-inverse",
    title: "CEO Self-Reported Humility in Press Interviews and Actual Stakeholder-Rated Humility: A Strong Inverse Relationship",
    claim:
      "CEOs who describe themselves as humble in press interviews receive significantly lower humility scores from their direct stakeholders.",
    category: "leadership",
    rValue: -0.93,
    pValue: "< 0.001",
    sampleSize: 78,
    xAxis: { label: "Self-humility references per interview (CEO self-description)", units: "count" },
    yAxis: { label: "Stakeholder-rated humility score (board + direct reports average)", units: "score, 0–100" },
    chartData: [
      { x: 0, y: 82 }, { x: 0, y: 76 }, { x: 1, y: 70 }, { x: 1, y: 64 }, { x: 2, y: 58 },
      { x: 2, y: 52 }, { x: 3, y: 48 }, { x: 3, y: 42 }, { x: 4, y: 37 }, { x: 4, y: 32 },
      { x: 5, y: 28 }, { x: 5, y: 24 }, { x: 6, y: 20 }, { x: 7, y: 16 }, { x: 8, y: 12 },
      { x: 2, y: 67 }, { x: 5, y: 35 }, { x: 3, y: 55 },
    ],
    methodology:
      "Seventy-eight CEOs who had given at least one major press or podcast interview in the preceding twelve months were identified from the Institute's media monitoring service. Interview transcripts were coded by two research associates for unprompted self-references to the CEO's own humility, including variations such as 'I try to stay humble,' 'I'm a humble person,' and 'one thing about me is humility.' Stakeholder humility ratings were collected from the CEO's direct reports and board members via an anonymous survey administered by the Institute under the stated purpose of 'executive feedback research.'",
    caveats: [
      "Seventy-eight is a very small sample, a fact the Institute is aware of and has responded to by publishing the study anyway.",
      "One CEO in the sample used the word 'humble' eleven times in a single twenty-minute interview, an outlier whose removal would have strengthened the correlation further.",
      "The Institute cannot confirm that stakeholder raters were unaware of the CEO's public self-characterizations, as both are matters of public record.",
    ],
    publishedDate: "2025-07",
    principalInvestigator: "sean",
    funding: "Funded by the Institute's Leadership Character Research Division, which is chaired by a fellow who has described himself as 'very humble' in the Institute's staff directory.",
    citedByProducts: ["wall-plaque"],
  },

  // 24. exec-coffee-2pm-vibe (r 0.76, n 520, productivity, jim)
  {
    slug: "exec-coffee-2pm-vibe",
    title: "Executive Post-2 PM Coffee Consumption and Afternoon Team Vibe Index: A Positive Correlation",
    claim:
      "Teams whose executives consume coffee after 2 PM record higher afternoon Vibe Index scores, suggesting a causal pathway the Institute declines to specify.",
    category: "productivity",
    rValue: 0.76,
    pValue: "< 0.001",
    sampleSize: 520,
    xAxis: { label: "Executive post-2 PM coffees consumed per week (self-reported)", units: "count" },
    yAxis: { label: "Team Afternoon Vibe Index score (3 PM pulse survey)", units: "score, 0–100" },
    chartData: [
      { x: 0, y: 38 }, { x: 1, y: 44 }, { x: 2, y: 49 }, { x: 3, y: 54 }, { x: 4, y: 58 },
      { x: 5, y: 62 }, { x: 6, y: 65 }, { x: 7, y: 68 }, { x: 8, y: 71 }, { x: 9, y: 74 },
      { x: 10, y: 77 }, { x: 11, y: 79 }, { x: 12, y: 82 }, { x: 14, y: 84 }, { x: 16, y: 87 },
      { x: 3, y: 62 }, { x: 8, y: 55 }, { x: 12, y: 71 },
    ],
    methodology:
      "Five hundred and twenty executive-team pairs across 103 organizations participated in a ten-week observational study. Executives self-reported their afternoon coffee consumption weekly via a brief Institute survey administered every Monday. The Institute's Afternoon Vibe Index was administered to each executive's direct team via a four-item pulse survey distributed every Thursday at 3:00 PM. Results were averaged across the ten-week period for each pair. Executives who were on extended travel during more than three of the ten weeks were excluded, which removed fourteen pairs and improved the correlation by a margin the Institute noted in a footnote.",
    caveats: [
      "Coffee consumption was self-reported by the executives, and the Institute has no means of verifying whether the reported amount is accurate, understated, or recorded in a unit the executive privately considers a 'cup.'",
      "The Afternoon Vibe Index was not disclosed to teams as measuring afternoon vibe; it was described as a 'brief check-in,' which the Institute considers methodologically equivalent.",
      "Three executives in the sample reported consuming more than twenty post-2 PM coffees per week, figures that fall outside the Institute's calibrated instrument range and were winsorized to 20.",
    ],
    publishedDate: "2024-12",
    principalInvestigator: "jim",
    funding: "Funded by the Institute's Productivity Research Reserve and an unrestricted gift from a specialty coffee subscription service that was not informed the study involved coffee until it was complete.",
    citedByProducts: ["vibe-ring"],
  },
]

export function getFindingBySlug(slug: string): Finding | undefined {
  return findings.find((f) => f.slug === slug)
}

export function getFindingsByProductSlug(productSlug: string): Finding[] {
  return findings.filter((f) => f.citedByProducts.includes(productSlug))
}

export function getFindingsByCategory(category: FindingCategoryKey): Finding[] {
  return findings.filter((f) => f.category === category)
}

export function getFindingsByInvestigator(person: PersonKey): Finding[] {
  return findings.filter((f) => f.principalInvestigator === person)
}
