export type ProductFamily = "toothbrush" | "doorknob" | "lightswitch" | "spoon" | "accessory"

export type SubscriptionTier = {
  name: "Personal" | "Pro" | "Enterprise"
  priceMonthly: number
  features: string[]
  cta?: string
}

export type Product = {
  slug: string
  family: ProductFamily
  name: string
  tagline: string
  heroImage: string
  startingPrice: number
  specs: { label: string; value: string }[]
  subscription: {
    required: boolean
    tiers: [SubscriptionTier, SubscriptionTier, SubscriptionTier]
  }
  complianceFootnotes: string[]
}

const ENTERPRISE_CTA = "Contact Sales"

// ---------- Flagship: Toothbrush ----------

const toothbrushStandard: Product = {
  slug: "toothbrush-standard",
  family: "toothbrush",
  name: "Toothbrush Standard",
  tagline: "Brushing, reconsidered.",
  heroImage: "/sites/superengineered/products/toothbrush-standard.png",
  startingPrice: 199,
  specs: [
    { label: "Bristle Count", value: "2,112 precision-aligned filaments" },
    { label: "Firmware", value: "BrushOS 4.2 (over-the-air updates)" },
    { label: "Battery Life", value: "Up to 14 days between cloud syncs" },
    { label: "Connectivity", value: "Wi-Fi 6, Bluetooth 5.3" },
    { label: "Warranty", value: "1 year limited, subscription tied" },
  ],
  subscription: {
    required: true,
    tiers: [
      {
        name: "Personal",
        priceMonthly: 6,
        features: ["Daily brush log", "3-month history", "Standard firmware updates"],
      },
      {
        name: "Pro",
        priceMonthly: 14,
        features: ["Predictive brushing insights", "Unlimited history", "Early firmware access"],
      },
      {
        name: "Enterprise",
        priceMonthly: 49,
        features: ["All Pro features", "SSO login", "SOC 2 compliance report", "Dental admin portal"],
        cta: ENTERPRISE_CTA,
      },
    ],
  },
  complianceFootnotes: [
    "Requires BrushCloud+ subscription. Device becomes inoperative after 14 days without sync.",
    "Firmware updates may deprecate bristle configurations on older models.",
  ],
}

const toothbrushPro: Product = {
  slug: "toothbrush-pro",
  family: "toothbrush",
  name: "Toothbrush Pro",
  tagline: "Brushing, rebuilt.",
  heroImage: "/sites/superengineered/products/toothbrush-pro.png",
  startingPrice: 349,
  specs: [
    { label: "Bristle Count", value: "3,860 AI-oriented filaments" },
    { label: "Firmware", value: "BrushOS 4.2 Pro (ML inference on-device)" },
    { label: "Sensors", value: "9-axis IMU, gum pressure array, enamel LIDAR" },
    { label: "Battery Life", value: "Up to 10 days; degrades with telemetry load" },
    { label: "Warranty", value: "1 year limited, subscription tied" },
  ],
  subscription: {
    required: true,
    tiers: [
      {
        name: "Personal",
        priceMonthly: 9,
        features: ["Brush heatmaps", "6-month history", "Basic ML coaching"],
      },
      {
        name: "Pro",
        priceMonthly: 19,
        features: ["Predictive plaque modeling", "Unlimited history", "Live dentist hand-off API"],
      },
      {
        name: "Enterprise",
        priceMonthly: 79,
        features: ["All Pro features", "SSO", "SOC 2 + HIPAA", "Fleet management (up to 10,000 devices)"],
        cta: ENTERPRISE_CTA,
      },
    ],
  },
  complianceFootnotes: [
    "Requires BrushCloud+ Pro subscription. Core functionality disabled without active plan.",
    "On-device ML inference contributes up to 4W draw during sustained brushing.",
  ],
}

const toothbrushProMax: Product = {
  slug: "toothbrush-pro-max",
  family: "toothbrush",
  name: "Toothbrush Pro Max",
  tagline: "Our most considered brush.",
  heroImage: "/sites/superengineered/products/toothbrush-pro-max.png",
  startingPrice: 599,
  specs: [
    { label: "Bristle Count", value: "5,208 laser-ablated filaments" },
    { label: "Firmware", value: "BrushOS 4.2 Pro Max (multi-user mesh)" },
    { label: "Sensors", value: "Full-mouth LIDAR, saliva spectrometer, bite-force telemetry" },
    { label: "Battery Life", value: "Up to 7 days; continuous sync recommended" },
    { label: "Titanium Housing", value: "Aerospace-grade Ti-6Al-4V, brushed finish" },
    { label: "Warranty", value: "2 years limited, subscription tied" },
  ],
  subscription: {
    required: true,
    tiers: [
      {
        name: "Personal",
        priceMonthly: 14,
        features: ["Full-mouth 3D reconstruction", "Unlimited history", "Advanced ML coaching"],
      },
      {
        name: "Pro",
        priceMonthly: 29,
        features: ["Real-time dental digital twin", "Predictive cavity alerts", "Concierge hygienist chat"],
      },
      {
        name: "Enterprise",
        priceMonthly: 129,
        features: ["All Pro features", "SSO", "SOC 2 + HIPAA + HITRUST", "Dedicated CSM"],
        cta: ENTERPRISE_CTA,
      },
    ],
  },
  complianceFootnotes: [
    "Requires BrushCloud+ Pro Max subscription. Device ships in inert mode.",
    "Saliva spectrometer data is retained indefinitely per our Trust Policy.",
  ],
}

// ---------- Flagship: Doorknob ----------

const doorknobHome: Product = {
  slug: "doorknob-home",
  family: "doorknob",
  name: "Doorknob Home",
  tagline: "The turn, perfected.",
  heroImage: "/sites/superengineered/products/doorknob-home.png",
  startingPrice: 249,
  specs: [
    { label: "Rotation Model", value: "Predictive torque assist" },
    { label: "Materials", value: "Brushed stainless, recycled aerospace alloys" },
    { label: "Sensors", value: "Capacitive grip ring, 6-axis motion" },
    { label: "Connectivity", value: "Wi-Fi 6, Thread, Matter" },
    { label: "Power", value: "Wired 24V or rechargeable cell (subscription-locked)" },
  ],
  subscription: {
    required: true,
    tiers: [
      {
        name: "Personal",
        priceMonthly: 5,
        features: ["Entry log", "Predictive turn (basic)", "Standard firmware"],
      },
      {
        name: "Pro",
        priceMonthly: 14,
        features: ["Biometric grip ID (up to 6 users)", "Smart geofencing", "Priority firmware"],
      },
      {
        name: "Enterprise",
        priceMonthly: 59,
        features: ["Unlimited users", "SSO + SAML", "SOC 2", "Building management integration"],
        cta: ENTERPRISE_CTA,
      },
    ],
  },
  complianceFootnotes: [
    "Doorknob requires active DoorCloud+ subscription to rotate.",
    "Biometric grip ID features subject to regional availability.",
  ],
}

const doorknobPro: Product = {
  slug: "doorknob-pro",
  family: "doorknob",
  name: "Doorknob Pro",
  tagline: "Authenticated entry, reimagined.",
  heroImage: "/sites/superengineered/products/doorknob-pro.png",
  startingPrice: 449,
  specs: [
    { label: "Rotation Model", value: "Adaptive torque assist w/ haptic feedback" },
    { label: "Biometric Layer", value: "Grip ID + palm vein + HRV signature" },
    { label: "Sensors", value: "Thermal array, 9-axis IMU, capacitive ring" },
    { label: "Connectivity", value: "Wi-Fi 6E, Thread, Matter, cellular backup" },
    { label: "Latency", value: "< 180ms p99 from grip to unlock" },
  ],
  subscription: {
    required: true,
    tiers: [
      {
        name: "Personal",
        priceMonthly: 9,
        features: ["Biometric grip ID (up to 12 users)", "HRV stress logging", "Priority firmware"],
      },
      {
        name: "Pro",
        priceMonthly: 24,
        features: ["Palm vein authentication", "Anomaly detection ML", "Remote turn audit log"],
      },
      {
        name: "Enterprise",
        priceMonthly: 99,
        features: ["All Pro features", "SSO + SAML", "SOC 2 + ISO 27001", "24/7 on-call support"],
        cta: ENTERPRISE_CTA,
      },
    ],
  },
  complianceFootnotes: [
    "DoorCloud+ Pro subscription required for authentication layer.",
    "HRV data may be shared with our health partners per opt-in.",
  ],
}

const doorknobEnterprise: Product = {
  slug: "doorknob-enterprise",
  family: "doorknob",
  name: "Doorknob Enterprise",
  tagline: "Perimeter, as a product.",
  heroImage: "/sites/superengineered/products/doorknob-enterprise.png",
  startingPrice: 1299,
  specs: [
    { label: "Rotation Model", value: "Enterprise-grade magnetic assist, redundant actuators" },
    { label: "Biometric Layer", value: "Multi-factor: grip ID + palm vein + retinal flash" },
    { label: "Certification", value: "FIPS 140-3, ASHRAE 189.1, NEMA 4X" },
    { label: "Uptime SLA", value: "99.995% quarterly" },
    { label: "Fleet Management", value: "Central console for up to 50,000 knobs" },
  ],
  subscription: {
    required: true,
    tiers: [
      {
        name: "Personal",
        priceMonthly: 19,
        features: ["Single-door deployment", "Basic audit log", "Community support"],
      },
      {
        name: "Pro",
        priceMonthly: 49,
        features: ["Up to 25 doors", "Compliance reporting", "Business-hours support"],
      },
      {
        name: "Enterprise",
        priceMonthly: 299,
        features: ["Unlimited doors", "SSO + SAML + SCIM", "FedRAMP roadmap", "Dedicated TAM"],
        cta: ENTERPRISE_CTA,
      },
    ],
  },
  complianceFootnotes: [
    "DoorCloud+ Enterprise subscription mandatory. No offline mode.",
    "Retinal flash must be calibrated by a Superengineered-certified installer.",
  ],
}

// ---------- Flagship: Light Switch ----------

const lightswitchAir: Product = {
  slug: "lightswitch-air",
  family: "lightswitch",
  name: "Light Switch Air",
  tagline: "Illumination, signed in.",
  heroImage: "/sites/superengineered/products/lightswitch-air.png",
  startingPrice: 179,
  specs: [
    { label: "Gesture Model", value: "Capacitive tap + swipe" },
    { label: "Authentication", value: "Email magic link (required)" },
    { label: "Connectivity", value: "Wi-Fi 6, Thread, Matter" },
    { label: "Power", value: "Line-powered with battery backup (subscription-gated)" },
    { label: "Latency", value: "~500ms from tap to photon" },
  ],
  subscription: {
    required: true,
    tiers: [
      {
        name: "Personal",
        priceMonthly: 3,
        features: ["Up to 2 switches", "Email auth", "Community support"],
      },
      {
        name: "Pro",
        priceMonthly: 9,
        features: ["Up to 20 switches", "Scene scheduling", "2FA"],
      },
      {
        name: "Enterprise",
        priceMonthly: 39,
        features: ["Unlimited switches", "SSO (SAML + OIDC)", "Audit log", "Priority support"],
        cta: ENTERPRISE_CTA,
      },
    ],
  },
  complianceFootnotes: [
    "Login required on every wake. Sessions expire after 30 days.",
    "Switch operates in fallback dim mode during outages (Pro+ only).",
  ],
}

const lightswitchPro: Product = {
  slug: "lightswitch-pro",
  family: "lightswitch",
  name: "Light Switch Pro",
  tagline: "Illumination, with identity.",
  heroImage: "/sites/superengineered/products/lightswitch-pro.png",
  startingPrice: 329,
  specs: [
    { label: "Gesture Model", value: "Capacitive tap, swipe, and pinch" },
    { label: "Authentication", value: "SSO (OIDC / SAML) required" },
    { label: "Sensors", value: "Ambient light, occupancy, glass-break audio" },
    { label: "Connectivity", value: "Wi-Fi 6E, Thread, Matter, LTE-M backup" },
    { label: "Certifications", value: "UL, FCC, SOC 2" },
  ],
  subscription: {
    required: true,
    tiers: [
      {
        name: "Personal",
        priceMonthly: 8,
        features: ["Up to 20 switches", "SSO", "Basic scenes"],
      },
      {
        name: "Pro",
        priceMonthly: 19,
        features: ["Up to 100 switches", "Occupancy ML", "Scene version control"],
      },
      {
        name: "Enterprise",
        priceMonthly: 79,
        features: ["Unlimited", "SAML + SCIM", "Compliance reporting", "Dedicated CSM"],
        cta: ENTERPRISE_CTA,
      },
    ],
  },
  complianceFootnotes: [
    "SSO provider downtime will render switches inoperative.",
    "Glass-break audio is retained for 30 days per Trust Policy.",
  ],
}

const lightswitchUltra: Product = {
  slug: "lightswitch-ultra",
  family: "lightswitch",
  name: "Light Switch Ultra",
  tagline: "The switch, re-founded.",
  heroImage: "/sites/superengineered/products/lightswitch-ultra.png",
  startingPrice: 799,
  specs: [
    { label: "Gesture Model", value: "Full haptic, sub-mm force discrimination" },
    { label: "Authentication", value: "Passkeys + step-up MFA" },
    { label: "Sensors", value: "Thermal, occupancy, CO₂, VOC, glass-break" },
    { label: "Connectivity", value: "Wi-Fi 7, Thread, Matter, LTE, satellite fallback" },
    { label: "Certifications", value: "UL, FCC, SOC 2 + ISO 27001" },
    { label: "Guarantee", value: "Photon-delivery SLA: 99.99% quarterly" },
  ],
  subscription: {
    required: true,
    tiers: [
      {
        name: "Personal",
        priceMonthly: 14,
        features: ["Up to 50 switches", "Passkeys", "Advanced scenes"],
      },
      {
        name: "Pro",
        priceMonthly: 39,
        features: ["Unlimited switches", "ML occupancy modeling", "Photon SLA"],
      },
      {
        name: "Enterprise",
        priceMonthly: 199,
        features: ["Global fleet management", "SSO + SCIM + SAML", "FedRAMP roadmap", "24/7 on-call"],
        cta: ENTERPRISE_CTA,
      },
    ],
  },
  complianceFootnotes: [
    "Photon SLA assumes active SwitchCloud+ Ultra subscription.",
    "Satellite fallback subject to regional orbital availability.",
  ],
}

// ---------- Flagship: Spoon ----------

const spoonMini: Product = {
  slug: "spoon-mini",
  family: "spoon",
  name: "Spoon Mini",
  tagline: "The utensil, on-demand.",
  heroImage: "/sites/superengineered/products/spoon-mini.png",
  startingPrice: 79,
  specs: [
    { label: "Material", value: "Medical-grade stainless, subscription-embedded RFID" },
    { label: "Bowl Volume", value: "4.8 mL (adjustable via Pro subscription)" },
    { label: "Connectivity", value: "NFC tap-to-bowl activation" },
    { label: "Sensors", value: "Bite-adjacency, temperature" },
    { label: "Warranty", value: "30 days (subscription-contingent)" },
  ],
  subscription: {
    required: true,
    tiers: [
      {
        name: "Personal",
        priceMonthly: 4,
        features: ["Bowl end unlocked", "Basic bite log", "Community support"],
      },
      {
        name: "Pro",
        priceMonthly: 12,
        features: ["Adjustable bowl volume", "Nutrition analytics", "Dishwasher mode"],
      },
      {
        name: "Enterprise",
        priceMonthly: 39,
        features: ["Cafeteria-scale deployment", "SSO", "Hygiene compliance reporting"],
        cta: ENTERPRISE_CTA,
      },
    ],
  },
  complianceFootnotes: [
    "Bowl end inactive without active SpoonCloud+ subscription.",
    "Dishwasher mode requires Pro tier or higher.",
  ],
}

const spoonPro: Product = {
  slug: "spoon-pro",
  family: "spoon",
  name: "Spoon Pro",
  tagline: "Utensil-as-a-service.",
  heroImage: "/sites/superengineered/products/spoon-pro.png",
  startingPrice: 149,
  specs: [
    { label: "Material", value: "Titanium, precision-milled" },
    { label: "Bowl Volume", value: "8 mL, programmable between 2–12 mL" },
    { label: "Sensors", value: "Bite cadence, temperature, mass spectrometry" },
    { label: "Connectivity", value: "NFC + Bluetooth 5.3" },
    { label: "Warranty", value: "90 days (subscription-contingent)" },
  ],
  subscription: {
    required: true,
    tiers: [
      {
        name: "Personal",
        priceMonthly: 9,
        features: ["Programmable bowl", "Bite cadence analytics", "Monthly reports"],
      },
      {
        name: "Pro",
        priceMonthly: 24,
        features: ["Mass spec readouts", "Nutrition digital twin", "Live dietitian API"],
      },
      {
        name: "Enterprise",
        priceMonthly: 79,
        features: ["Workplace deployment (100+ spoons)", "SSO", "SOC 2", "HIPAA-ready"],
        cta: ENTERPRISE_CTA,
      },
    ],
  },
  complianceFootnotes: [
    "Bowl end and analytics inactive without SpoonCloud+ Pro subscription.",
    "Mass spectrometry data retention is Pro-tier only.",
  ],
}

const spoonProMax: Product = {
  slug: "spoon-pro-max",
  family: "spoon",
  name: "Spoon Pro Max",
  tagline: "The spoon, ended.",
  heroImage: "/sites/superengineered/products/spoon-pro-max.png",
  startingPrice: 329,
  specs: [
    { label: "Material", value: "Monocrystalline titanium, flight-grade" },
    { label: "Bowl Volume", value: "12 mL, continuously variable 1–20 mL" },
    { label: "Sensors", value: "Mass spec, pH, micronutrient array, bite force" },
    { label: "Connectivity", value: "NFC + Bluetooth 5.3 + Wi-Fi 6E (for firmware)" },
    { label: "Haptics", value: "Sub-gram feedback at 4,000 Hz" },
    { label: "Warranty", value: "1 year (subscription-contingent)" },
  ],
  subscription: {
    required: true,
    tiers: [
      {
        name: "Personal",
        priceMonthly: 14,
        features: ["Continuously variable bowl", "Full sensor suite", "Unlimited history"],
      },
      {
        name: "Pro",
        priceMonthly: 39,
        features: ["Predictive nutrition modeling", "Haptic pairing with fork", "Concierge nutritionist"],
      },
      {
        name: "Enterprise",
        priceMonthly: 149,
        features: ["Fleet deployment", "SSO", "SOC 2 + HIPAA + HITRUST", "Dedicated CSM"],
        cta: ENTERPRISE_CTA,
      },
    ],
  },
  complianceFootnotes: [
    "SpoonCloud+ Pro Max subscription required. Utensil ships in lockout mode.",
    "Haptic pairing requires a Superengineered Fork (sold separately, subscription-bound).",
  ],
}

// ---------- Accessories ----------

type AccessoryInput = {
  slug: string
  name: string
  tagline: string
  startingPrice: number
  coreSpec: string
  warrantyNote?: string
  personalFeature: string
  proFeature: string
  enterpriseFeature: string
  footnote: string
}

function makeAccessory(input: AccessoryInput): Product {
  return {
    slug: input.slug,
    family: "accessory",
    name: input.name,
    tagline: input.tagline,
    heroImage: `/sites/superengineered/products/${input.slug}.png`,
    startingPrice: input.startingPrice,
    specs: [
      { label: "Core Capability", value: input.coreSpec },
      { label: "Connectivity", value: "Wi-Fi 6, Bluetooth 5.3, Matter" },
      { label: "Firmware", value: "SuperOS 4.2 (over-the-air updates)" },
      { label: "Warranty", value: input.warrantyNote ?? "1 year limited, subscription tied" },
    ],
    subscription: {
      required: false,
      tiers: [
        {
          name: "Personal",
          priceMonthly: 4,
          features: ["Basic operation", input.personalFeature, "Community support"],
        },
        {
          name: "Pro",
          priceMonthly: 12,
          features: ["All Personal features", input.proFeature, "Priority support"],
        },
        {
          name: "Enterprise",
          priceMonthly: 49,
          features: ["All Pro features", input.enterpriseFeature, "SSO", "SOC 2 report"],
          cta: ENTERPRISE_CTA,
        },
      ],
    },
    complianceFootnotes: [input.footnote],
  }
}

const accessories: Product[] = [
  makeAccessory({
    slug: "thermal-mug",
    name: "Thermal Mug",
    tagline: "Temperature, governed.",
    startingPrice: 129,
    coreSpec: "12 oz ceramic w/ 4-zone thermal AI",
    personalFeature: "Ambient temperature logging",
    proFeature: "Predictive sip-temp targeting",
    enterpriseFeature: "Barista fleet analytics",
    footnote: "Exterior surface temperature warranted only within Pro subscription tier.",
  }),
  makeAccessory({
    slug: "weather-umbrella",
    name: "Weather Umbrella",
    tagline: "Precipitation, subscribed.",
    startingPrice: 189,
    coreSpec: "Carbon-fiber canopy w/ integrated forecast subscription",
    personalFeature: "3-hour local forecast",
    proFeature: "14-day hyperlocal precipitation ML",
    enterpriseFeature: "Campus-wide umbrella fleet routing",
    footnote: "Umbrella will not deploy without active ForecastCloud+ subscription.",
  }),
  makeAccessory({
    slug: "sleep-pillow",
    name: "Sleep Pillow",
    tagline: "Rest, as a service.",
    startingPrice: 249,
    coreSpec: "Memory-foam w/ 6-zone pressure and EEG array",
    personalFeature: "Sleep stage logging",
    proFeature: "Dream inference ML (beta)",
    enterpriseFeature: "Workforce fatigue dashboards",
    footnote: "Pillow decompresses only during active RestCloud+ sessions.",
  }),
  makeAccessory({
    slug: "blockchain-coaster",
    name: "Blockchain Coaster",
    tagline: "Each ring, immutable.",
    startingPrice: 89,
    coreSpec: "Tempered cork w/ L2-anchored drink provenance",
    personalFeature: "Provenance log on-chain",
    proFeature: "Multi-coaster consensus voting",
    enterpriseFeature: "Enterprise ledger export (CSV / Parquet)",
    footnote: "Gas fees not included. Coasters may pause during chain congestion.",
  }),
  makeAccessory({
    slug: "torque-paper-towel",
    name: "Torque Paper Towel Dispenser",
    tagline: "Perforation, quantified.",
    startingPrice: 219,
    coreSpec: "Precision drag arm w/ force telemetry",
    personalFeature: "Per-tear force log",
    proFeature: "Anomaly detection (jams, over-pulls)",
    enterpriseFeature: "Restroom fleet analytics + SLA alerts",
    footnote: "Dispenser throttles output on free tier to preserve analytics quota.",
  }),
  makeAccessory({
    slug: "hydration-bottle",
    name: "Hydration Bottle",
    tagline: "Fluid compliance.",
    startingPrice: 99,
    coreSpec: "24 oz steel w/ sip authentication and TDS sensor",
    personalFeature: "Daily hydration log",
    proFeature: "Predictive dehydration alerts",
    enterpriseFeature: "Workplace compliance reporting",
    footnote: "Bottle locks the cap if user exceeds daily cloud-quota.",
  }),
  makeAccessory({
    slug: "analytics-pen",
    name: "Analytics Pen",
    tagline: "Every stroke, observable.",
    startingPrice: 179,
    coreSpec: "Ink-metered pen w/ 6-axis handwriting telemetry",
    personalFeature: "Handwriting stream capture",
    proFeature: "Authorship ML attribution",
    enterpriseFeature: "Contract-signing audit trail + e-discovery",
    footnote: "Ink usage exceeding plan quota may pause writing until reset.",
  }),
  makeAccessory({
    slug: "spill-napkin",
    name: "Spill Napkin",
    tagline: "Absorption, predicted.",
    startingPrice: 49,
    coreSpec: "Smart-fabric napkin w/ capillary ML model",
    personalFeature: "Stain prediction on fold",
    proFeature: "Predictive spill ML (30s advance warning)",
    enterpriseFeature: "Hospitality venue rollout w/ SLA",
    footnote: "Single-use; replacements shipped monthly via subscription.",
  }),
  makeAccessory({
    slug: "categorized-trashcan",
    name: "Categorized Trash Can",
    tagline: "Disposal, resolved.",
    startingPrice: 379,
    coreSpec: "13-gallon bin w/ ML waste categorization + 4 chambers",
    personalFeature: "Weekly waste breakdown",
    proFeature: "Real-time recycling coaching",
    enterpriseFeature: "Building-wide ESG reporting",
    footnote: "Categorization requires lid-camera calibration every 90 days.",
  }),
  makeAccessory({
    slug: "candle-subscription",
    name: "Candle",
    tagline: "Scent, streamed.",
    startingPrice: 59,
    coreSpec: "Beeswax w/ DRM-embedded scent cartridge",
    personalFeature: "Monthly scent rotation",
    proFeature: "Curated scent library (200+)",
    enterpriseFeature: "Venue-wide scent orchestration",
    footnote: "Scent cartridge expires 30 days after last cloud check-in.",
  }),
  makeAccessory({
    slug: "umbrella-stand",
    name: "Umbrella Stand",
    tagline: "Vestibule, managed.",
    startingPrice: 149,
    coreSpec: "Steel stand w/ umbrella-recognition camera",
    personalFeature: "Guest umbrella log",
    proFeature: "Weather-aware capacity alerts",
    enterpriseFeature: "Lobby fleet orchestration",
    footnote: "Stand requires line power; battery backup is Pro-tier only.",
  }),
  makeAccessory({
    slug: "bite-fork",
    name: "Fork with Bite Counter",
    tagline: "Tine intelligence.",
    startingPrice: 139,
    coreSpec: "Stainless fork w/ 4-tine pressure array",
    personalFeature: "Daily bite count",
    proFeature: "Bite-cadence coaching",
    enterpriseFeature: "Cafeteria mealtime analytics",
    footnote: "Pairs with Spoon Pro Max for multi-utensil haptic feedback.",
  }),
  makeAccessory({
    slug: "foot-angle-shoehorn",
    name: "Foot-Angle Shoehorn",
    tagline: "Dressing, optimized.",
    startingPrice: 109,
    coreSpec: "Titanium shoehorn w/ 9-axis IMU and AI foot-angle guidance",
    personalFeature: "Insertion angle log",
    proFeature: "Adaptive angle coaching",
    enterpriseFeature: "Athletic-facility locker room analytics",
    footnote: "Guidance pauses during firmware updates.",
  }),
  makeAccessory({
    slug: "location-bookmark",
    name: "Location Bookmark",
    tagline: "The page, synchronized.",
    startingPrice: 59,
    coreSpec: "Paper-thin bookmark w/ BLE beacon and cloud page-state sync",
    personalFeature: "Last-page sync across 3 books",
    proFeature: "Cross-device reading stream",
    enterpriseFeature: "Library-wide patron analytics",
    footnote: "Page-sync accuracy ±2 pages in offline mode.",
  }),
  makeAccessory({
    slug: "ambient-lampshade",
    name: "Ambient Lampshade",
    tagline: "Mood, as configuration.",
    startingPrice: 189,
    coreSpec: "Translucent silk w/ 16M-color mesh LED array",
    personalFeature: "10 preset moods",
    proFeature: "Adaptive circadian modeling",
    enterpriseFeature: "Office-wide brand-color enforcement",
    footnote: "Lampshade defaults to pure white after subscription lapse.",
  }),
  makeAccessory({
    slug: "cloud-moodboard-magnet",
    name: "Cloud Moodboard Magnet",
    tagline: "The fridge, collaborative.",
    startingPrice: 79,
    coreSpec: "Ferrite magnet w/ e-ink moodboard sync",
    personalFeature: "Household moodboard sync",
    proFeature: "Real-time collaborative boards",
    enterpriseFeature: "Team moodboard management (100+ members)",
    footnote: "e-ink refresh limited to 8 updates/day on Personal tier.",
  }),
  makeAccessory({
    slug: "wake-certification-alarm",
    name: "Wake Certification Alarm",
    tagline: "Morning, verified.",
    startingPrice: 229,
    coreSpec: "Bedside w/ biometric wake certification + cloud attestation",
    personalFeature: "Daily wake certificate (PDF)",
    proFeature: "Employer-ready attendance attestation",
    enterpriseFeature: "Enterprise attendance signing",
    footnote: "Attestation requires 2FA on every wake.",
  }),
  makeAccessory({
    slug: "haptic-remote",
    name: "Haptic Remote Control",
    tagline: "Channels, felt.",
    startingPrice: 159,
    coreSpec: "Universal remote w/ per-button haptic feedback + gesture ML",
    personalFeature: "10-device pairing",
    proFeature: "Gesture macros + haptic themes",
    enterpriseFeature: "Hospitality venue fleet management",
    footnote: "Haptic themes may desync during firmware updates.",
  }),
]

// ---------- Registry ----------

export const products: Product[] = [
  toothbrushStandard, toothbrushPro, toothbrushProMax,
  doorknobHome, doorknobPro, doorknobEnterprise,
  lightswitchAir, lightswitchPro, lightswitchUltra,
  spoonMini, spoonPro, spoonProMax,
  ...accessories,
]

// ---------- Helpers ----------

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByFamily(family: ProductFamily): Product[] {
  return products.filter((p) => p.family === family)
}

export const FAMILY_LABELS: Record<ProductFamily, string> = {
  toothbrush: "Toothbrush",
  doorknob: "Doorknob",
  lightswitch: "Light Switch",
  spoon: "Spoon",
  accessory: "Accessories",
}

// Sanity: catalog must contain exactly 30 products.
if (products.length !== 30) {
  throw new Error(`Superengineered catalog expected 30 products, got ${products.length}`)
}
