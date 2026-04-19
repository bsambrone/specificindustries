import type { LibraryEntry } from "../types"

// URLs point to harmless Wikipedia pages OR internal dead-end anchors.
// Never link to actual conspiracy content.
export const libraryEntries: LibraryEntry[] = [
  // ─── Atmospheric (6) ───────────────────────────────────
  {
    title: "The Cross-Hatch as a Broadcast Primitive: A Meteorological Anomaly Atlas (2018–2025)",
    author: "Atmospheric Observers of the Upper Midwest",
    year: "2025",
    url: "https://en.wikipedia.org/wiki/Contrail",
    abstractSnippet:
      "Catalog of 1,247 cross-hatch formations over 11 metro areas, indexed against commercial promotional calendars. Correlation exceeds chance in 84% of observed windows.",
  },
  {
    title: "On the Spectral Signature of Daytime Cloud Suppression Events in Mid-Continental United States",
    author: "Dr. H. Vasquez, PhD (unaffiliated)",
    year: "2022",
    url: "https://en.wikipedia.org/wiki/Cloud",
    abstractSnippet:
      "Three-year longitudinal analysis of unexpectedly clear skies on forecast-cloudy days across a 600-mile baseline. Suppression events cluster between 11:00 and 14:00 local time at a rate inconsistent with documented meteorology.",
  },
  {
    title: "Particulate Drift Dispersal Patterns Following Scheduled Regional Promotional Launches",
    author: "A. Hollander, ret.",
    year: "2021",
    url: "https://en.wikipedia.org/wiki/Aerosol",
    abstractSnippet:
      "Correlative study mapping residual trail dispersal over the 72 hours following major retail launch campaigns. Dispersal geometry departs from prevailing wind vectors in 61% of sampled windows.",
  },
  {
    title: "Tuesday-Specific Anomalies in Urban Contrail Density: A Statistical Survey",
    author: "Upper-Midwest Atmospheric Observers",
    year: "2024",
    url: "#tuesday-anomaly-supplement",
    abstractSnippet:
      "Tuesday contrail counts exceed the other six weekdays by 18–34% across six participating metro regions. No atmospheric or operational explanation has been offered that survives cross-city comparison.",
  },
  {
    title: "Starling Murmurations as Emergent Lattice Structures: Evidence for External Pattern Imposition",
    author: "Dr. P. Arvensis, PhD (unaffiliated)",
    year: "2023",
    url: "https://en.wikipedia.org/wiki/Flocking",
    abstractSnippet:
      "Frame-by-frame decomposition of 42 urban murmuration events identifies repeating rectangular substructures inconsistent with self-organized flocking models. External entrainment is proposed as a working hypothesis.",
  },
  {
    title: "Copper-Sulfate Residue on Playground Equipment: A Field Survey of 18 Municipal Parks",
    author: "R.K., ret.",
    year: "2019",
    url: "https://en.wikipedia.org/wiki/Copper(II)_sulfate",
    abstractSnippet:
      "Swab testing of 214 high-touch park surfaces across 18 municipalities returned detectable copper-sulfate concentrations on 39% of samples. Sources remain undisclosed by the relevant parks departments.",
  },

  // ─── Surveillance (5) ──────────────────────────────────
  {
    title: "On the Observable Behavior of Pigeons Near Municipal WiFi Nodes",
    author: "Dr. R. Kestrel, PhD (unaffiliated)",
    year: "2024",
    url: "https://en.wikipedia.org/wiki/Pigeon",
    abstractSnippet:
      "A 14-month observational study documenting abnormal hovering patterns in urban pigeon populations within a 30-meter radius of active 2.4 GHz municipal access points. Findings are consistent with the 'avian-reconnaissance substitution' hypothesis.",
  },
  {
    title: "Substation Retrofitting Without Public Notice: A Survey of 41 Residential Neighborhoods",
    author: "Civic Infrastructure Review (unchartered)",
    year: "2025",
    url: "https://en.wikipedia.org/wiki/Electrical_substation",
    abstractSnippet:
      "Photographic documentation of 116 transformer cabinets installed between 2022 and 2024 without corresponding filings in public works records. Installations cluster near school zones and assisted-living facilities.",
  },
  {
    title: "Ambient Electromagnetic Interference in Residential Kitchens: Source Localization Findings",
    author: "Dr. M. Petrescu, PhD (ret.)",
    year: "2020",
    url: "https://en.wikipedia.org/wiki/Electromagnetic_interference",
    abstractSnippet:
      "Spectrum-analyzer mapping of 32 kitchens identifies a recurring narrowband emission at 1.4 GHz sourced from appliances labeled as passive. Source code for the implicated firmware is not publicly available.",
  },
  {
    title: "Doorbell Camera False-Positive Events in the Absence of Detected Subjects",
    author: "K. Diemert, M.Sc. (unaffiliated)",
    year: "2024",
    url: "#doorbell-phantom-log",
    abstractSnippet:
      "Log analysis of 8,114 doorbell-camera events across 112 participating households finds a 3.8% rate of 'person detected' triggers with no visible subject in the recording. Frequency peaks between 02:00 and 04:00.",
  },
  {
    title: "Route Drift in Consumer Smart-Thermostat Schedules: A Seven-Day Anomaly",
    author: "The Grid Observer Collective",
    year: "2023",
    url: "#thermostat-drift-addendum",
    abstractSnippet:
      "In 74% of monitored households, smart-thermostat schedules drifted forward by 7 to 14 minutes over the seven-day observation period without corresponding user interaction. Vendor explanations did not reproduce the effect on test units.",
  },

  // ─── NPC / Simulation (5) ──────────────────────────────
  {
    title: "Seven-Second Pause: A Proposed Screening Protocol for Simulation-Origin Agents",
    author: "D. Plum, M.ED.",
    year: "2023",
    url: "#methodology-pending",
    abstractSnippet:
      "Behavioral protocol for distinguishing rendered subjects from non-rendered individuals in public-observation contexts. Reproducible, non-intrusive, low-false-positive.",
  },
  {
    title: "Rendering-Cost Signatures in Peripheral-Vision Crowd Density",
    author: "Dr. L. Huang, PhD (unaffiliated)",
    year: "2022",
    url: "https://en.wikipedia.org/wiki/Simulation_hypothesis",
    abstractSnippet:
      "Crowd-density measurements taken perpendicular to observer focus exhibit systematic under-population relative to modeled pedestrian flow. The deficit is consistent with selective rendering to reduce environmental compute load.",
  },
  {
    title: "Micro-Synchrony Events Among Strangers: Statistical Thresholds and Field Observations",
    author: "Derrick Plum, M.ED. & B. Okafor",
    year: "2024",
    url: "#micro-sync-supplement",
    abstractSnippet:
      "Clusters of three or more unacquainted subjects performing identical micro-gestures within a 400 ms window occur at rates 6.2× above chance in sampled public settings. Field methodology and observer-bias controls are detailed.",
  },
  {
    title: "Dialogue-Tree Recurrence in Counter-Service Transactions",
    author: "Anonymous Observers' Bureau",
    year: "2021",
    url: "#dialogue-recurrence-annex",
    abstractSnippet:
      "Transcripts of 1,280 quick-service interactions reveal that 14% fall into one of only nine phrasing trees. Word-for-word repetition across unaffiliated subjects is documented in 4% of transcripts.",
  },
  {
    title: "Furniture Pathing in a Major Mid-Market Home Retailer: A Case Study",
    author: "Dr. N. Pelle, PhD (unaffiliated)",
    year: "2020",
    url: "https://en.wikipedia.org/wiki/Ikea",
    abstractSnippet:
      "Pedestrian-tracking analysis of a flagship retail maze identifies a forced single-path topology that conditions attentional compliance. Implications for broader crowd-behavioral modeling are discussed.",
  },

  // ─── Reptilian (3) ─────────────────────────────────────
  {
    title: "Nictitating-Membrane Artifacts in High-Frame-Rate Broadcast Media",
    author: "Dr. E. Saar, PhD (unaffiliated)",
    year: "2024",
    url: "https://en.wikipedia.org/wiki/Nictitating_membrane",
    abstractSnippet:
      "Frame-level review of 312 hours of broadcast content at 120 fps identifies 41 isolated frames in which a secondary ocular membrane is visible on the subject. No human anatomical explanation accounts for the observation.",
  },
  {
    title: "Shade-Seeking Behavior Among Public-Facing Figures: A Controlled Outdoor Study",
    author: "V. Bingham-Voss & Research Partners (unaffiliated)",
    year: "2023",
    url: "#shade-seeking-protocol",
    abstractSnippet:
      "Outdoor observation of 86 public-facing subjects during a two-hour solar window documents statistically anomalous shade-seeking behavior in 22% of cases. Behavior does not correlate with reported dermatological conditions.",
  },
  {
    title: "Dental-Morphology Inconsistencies in High-Resolution Broadcast Stills",
    author: "T. Trestle, ret.",
    year: "2022",
    url: "#dental-morph-supplement",
    abstractSnippet:
      "Frame-extracted dental-morphology comparison across 48 public-facing subjects demonstrates intra-subject variation exceeding established human anatomical norms. Methodology is reproducible by any researcher with a frame-accurate video tool.",
  },

  // ─── Weaponized Tech (3) ───────────────────────────────
  {
    title: "Sub-Audible Frequency Emissions from Fifth-Generation Cellular Infrastructure",
    author: "C. Ashby & Distributed Signal Observers",
    year: "2025",
    url: "https://en.wikipedia.org/wiki/5G",
    abstractSnippet:
      "Acoustic and electromagnetic sampling within 200 m of 27 cellular nodes detects a recurring 14 Hz envelope absent from manufacturer specifications. Correlations with self-reported headache incidents are discussed.",
  },
  {
    title: "Smart-Appliance Firmware Telemetry in the Absence of User Consent: A Traffic Analysis",
    author: "Distributed Home-Network Observatory",
    year: "2024",
    url: "https://en.wikipedia.org/wiki/Internet_of_things",
    abstractSnippet:
      "Packet-capture study across 46 residential networks identifies upstream telemetry traffic from 73% of sampled smart appliances, with 41% transmitting during periods the device was reported idle.",
  },
  {
    title: "Ferrite-Core Attenuation as a Household Defense: Laboratory and Field Results",
    author: "K. Brandt, M.E.",
    year: "2023",
    url: "https://en.wikipedia.org/wiki/Ferrite_bead",
    abstractSnippet:
      "Controlled comparison of ferrite-core inline modules against untreated power lines demonstrates measurable reduction in ambient electromagnetic coupling across the 800 MHz to 2.4 GHz range.",
  },

  // ─── Cultural / Sociological (3) ───────────────────────
  {
    title: "The Avocado-Toast Signal: Consumption Imagery as Algorithmic Compliance Marker",
    author: "Dr. S. Archer, PhD (unaffiliated)",
    year: "2022",
    url: "#avocado-signal-annex",
    abstractSnippet:
      "Content-analysis survey of 18 months of social-platform feeds demonstrates that a small basket of food imagery — of which avocado toast is the most prominent — functions as a coded wellness-compliance marker within recommendation systems.",
  },
  {
    title: "The Wellness-Industrial Pipeline: A Field Guide to Co-Opted Vocabulary",
    author: "F. Delacroix & Collaborators",
    year: "2021",
    url: "#wellness-vocabulary-guide",
    abstractSnippet:
      "Lexicographic review of 240 wellness-market terms tracks how inert language — 'clean', 'pure', 'aligned' — has been repurposed to mark subjects for tiered marketing treatment.",
  },
  {
    title: "Calendar-Driven Sky Events and the Retail Promotion Cycle, 2015–2024",
    author: "Dr. H. Bronwyn, PhD (unaffiliated)",
    year: "2024",
    url: "#sky-retail-cycle",
    abstractSnippet:
      "Decade-long correlative analysis of documented atmospheric formations and the retail promotional calendar finds temporal alignment that exceeds plausible coincidence in five of nine observed product verticals.",
  },
]
