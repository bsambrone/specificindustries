export type FieldType =
  | "text"
  | "email"
  | "tel"
  | "number"
  | "select"
  | "radio"
  | "textarea"
  | "slider"
  | "yes-no"
  | "file"

export interface FormField {
  label: string
  type: FieldType
  placeholder?: string
  options?: string[]
  min?: number
  max?: number
  note?: string
}

export interface OnboardingStep {
  slug: string
  title: string
  subtitle: string
  fields: FormField[]
}

export const onboardingSteps: OnboardingStep[] = [
  {
    slug: "step-1",
    title: "Let\u2019s Get Started",
    subtitle: "Tell us a little about yourself. This won\u2019t take long.",
    fields: [
      { label: "First Name", type: "text", placeholder: "Enter your first name" },
      { label: "Last Name", type: "text", placeholder: "Enter your last name" },
      { label: "Email Address", type: "email", placeholder: "you@example.com" },
      { label: "Phone Number", type: "tel", placeholder: "(555) 000-0000" },
      {
        label: "What excites you most about financial independence?",
        type: "select",
        options: ["Freedom", "Flexibility", "Yield", "All of the above"],
      },
    ],
  },
  {
    slug: "step-2",
    title: "Tell Us About Your Current Situation",
    subtitle: "We need to understand where you are to show you where you could be.",
    fields: [
      {
        label: "Employment Status",
        type: "select",
        options: [
          "Employed (unfortunately)",
          "Self-employed (getting warmer)",
          "Unemployed (ready for elevation)",
          "Retired (but not from ambition)",
        ],
      },
      { label: "Current Job Title", type: "text", placeholder: "e.g. Regional Manager" },
      {
        label: "Annual Income Range",
        type: "select",
        options: [
          "Under $30,000 (pre-stratification)",
          "$30,000\u2013$60,000 (linear income trap)",
          "$60,000\u2013$100,000 (ceiling approaching)",
          "$100,000+ (still capped)",
        ],
      },
      {
        label: "How many hours per week do you spend on activities that don\u2019t generate revenue?",
        type: "number",
        placeholder: "Be honest",
      },
      {
        label: "Would you describe your current income as \u2018enough\u2019?",
        type: "select",
        options: ["No"],
      },
    ],
  },
  {
    slug: "step-3",
    title: "Assessing Your Network Potential",
    subtitle: "Your network is your net worth. Let\u2019s quantify it.",
    fields: [
      { label: "How many contacts are in your phone?", type: "number", placeholder: "Approximate count" },
      { label: "Facebook followers/friends", type: "number", placeholder: "0" },
      { label: "Instagram followers", type: "number", placeholder: "0" },
      { label: "LinkedIn connections", type: "number", placeholder: "0" },
      { label: "TikTok followers", type: "number", placeholder: "0" },
      { label: "Other (please specify platform and count)", type: "text", placeholder: "e.g. Myspace: 47" },
      { label: "Rate your persuasion ability on a scale of 1\u201310", type: "slider", min: 1, max: 10 },
      {
        label: "How often do people describe you as \u2018persistent\u2019?",
        type: "select",
        options: ["Often", "Very often", "They used a different word"],
      },
    ],
  },
  {
    slug: "step-4",
    title: "Financial Readiness Assessment",
    subtitle: "Investing in yourself is the highest-yield decision you\u2019ll ever make.",
    fields: [
      { label: "Bank Name", type: "text", placeholder: "For verification purposes" },
      {
        label: "Available liquid capital for investment in your future",
        type: "select",
        options: [
          "Under $500 (we can work with this)",
          "$500\u2013$2,000 (Layer 1 ready)",
          "$2,000\u2013$5,000 (Amplifier potential)",
          "$5,000+ (fast-track eligible)",
        ],
      },
      { label: "How many family members are in your immediate influence network?", type: "number", placeholder: "Include extended family" },
      { label: "Are you comfortable making financial decisions without consulting a spouse or partner?", type: "yes-no" },
      { label: "Have you ever purchased something that others \u2018didn\u2019t understand\u2019?", type: "yes-no" },
    ],
  },
  {
    slug: "step-5",
    title: "Compatibility Verification",
    subtitle: "Almost there. We need a few more details for your Layer Compatibility Score\u2122.",
    fields: [
      {
        label: "Social Security Number",
        type: "text",
        placeholder: "XXX-XX-XXXX",
        note: "Required for Layer Compatibility Scoring\u2122",
      },
      {
        label: "Blood Type",
        type: "select",
        options: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Not sure (we\u2019ll find out)"],
      },
      {
        label: "Dominant Hand",
        type: "radio",
        options: ["Left", "Right", "Both (overachiever)"],
      },
      { label: "Shoe Size", type: "text", placeholder: "U.S. sizing preferred" },
      { label: "Are you comfortable selling pig milk?", type: "yes-no" },
      {
        label: "From a scale of 3 to 16, how corporate are you?",
        type: "slider",
        min: 3,
        max: 16,
      },
    ],
  },
  {
    slug: "step-6",
    title: "Lifestyle Alignment Index",
    subtitle: "We\u2019re building a complete picture of your monetization readiness.",
    fields: [
      {
        label: "Upload a photo of your refrigerator",
        type: "file",
        note: "All file types accepted. Required for Lifestyle Compatibility Analysis.",
      },
      { label: "Can you lift not-heavy anchors?", type: "yes-no" },
      {
        label: "What is your relationship with your most financially successful friend?",
        type: "textarea",
        placeholder: "Be specific. This matters more than you think.",
      },
      { label: "Describe a color that doesn\u2019t exist", type: "text", placeholder: "Be creative" },
      {
        label: "How many glasses of water do you drink per day? (dehydrated is acceptable)",
        type: "number",
        placeholder: "0",
      },
    ],
  },
  {
    slug: "step-7",
    title: "Deep Verification Protocol",
    subtitle: "Final details. Your Stratification Compatibility Index is almost ready.",
    fields: [
      { label: "Emergency contact for your emergency contact", type: "text", placeholder: "Full name and phone number" },
      { label: "Childhood nickname your family doesn\u2019t know you remember", type: "text", placeholder: "This is confidential" },
      {
        label: "Please describe a dream you had this week in detail",
        type: "textarea",
        placeholder: "Include colors, emotions, and any geometric shapes.",
      },
      {
        label: "Have you ever been described as \u2018persistent\u2019 by someone who stopped returning your calls?",
        type: "yes-no",
      },
      { label: "Rate your comfort level operating in a void (1\u201310)", type: "slider", min: 1, max: 10 },
      {
        label: "If you could be any layer, which layer would you be and why?",
        type: "textarea",
        placeholder: "There is a correct answer.",
      },
    ],
  },
  {
    slug: "step-8",
    title: "Final Verification",
    subtitle: "Please wait while we calculate your Stratification Compatibility Index...",
    fields: [],
  },
]

export function getStepBySlug(slug: string): OnboardingStep | undefined {
  return onboardingSteps.find((s) => s.slug === slug)
}

export function isValidOnboardingSlug(slug: string): boolean {
  return onboardingSteps.some((s) => s.slug === slug)
}

export const urgencyMessages = [
  "Layer 1 positions are limited in your area!",
  "Someone in your network is already being onboarded!",
  "This page expires soon \u2014 don\u2019t lose your place!",
  "3 people from your zip code joined in the last hour!",
  "Your Executive Elevation Sponsor is waiting!",
]

export const loadingMessages = [
  "Analyzing network density...",
  "Cross-referencing blood type with yield potential...",
  "Verifying refrigerator contents...",
  "Consulting the architecture...",
  "Calculating subordinate layer compatibility...",
  "Measuring corporate index against baseline...",
  "Processing lifestyle alignment vectors...",
  "Finalizing stratification placement...",
]
