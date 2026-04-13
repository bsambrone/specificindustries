// src/sites/pettential/data/services.ts
export interface PricingTier {
  name: string
  price: string
  tagline: string
  features: { label: string; value: string }[]
  highlighted: boolean
}

export interface StandaloneService {
  name: string
  tagline: string
  description: string
}

export const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    price: "$99/mo",
    tagline: "Begin the journey.",
    highlighted: false,
    features: [
      { label: "Quarterly Performance Reviews", value: "1 per quarter" },
      { label: "Career Coaching Sessions", value: "2 per month" },
      { label: "Species Coverage", value: "Single species" },
      { label: "Performance Dashboard", value: "Basic (shows no change)" },
      { label: "Leadership Retreat Access", value: "No" },
      { label: "Dedicated Account Manager", value: "No" },
      { label: "ROI Guarantee", value: "\"Results may occur\"" },
    ],
  },
  {
    name: "Pro",
    price: "$299/mo",
    tagline: "Accelerate nothing.",
    highlighted: true,
    features: [
      { label: "Quarterly Performance Reviews", value: "4 per quarter" },
      { label: "Career Coaching Sessions", value: "8 per month" },
      { label: "Species Coverage", value: "Up to 3 species" },
      { label: "Performance Dashboard", value: "Advanced (shows no change, with graphs)" },
      { label: "Leadership Retreat Access", value: "1 per year" },
      { label: "Dedicated Account Manager", value: "Shared" },
      { label: "ROI Guarantee", value: "\"Results unlikely but possible\"" },
    ],
  },
  {
    name: "Enterprise",
    price: "$999/mo",
    tagline: "Scale the unscalable.",
    highlighted: false,
    features: [
      { label: "Quarterly Performance Reviews", value: "Unlimited (pet will not read them)" },
      { label: "Career Coaching Sessions", value: "Unlimited (pet will not attend)" },
      { label: "Species Coverage", value: "Unlimited species" },
      { label: "Performance Dashboard", value: "Enterprise (shows no change, with executive summary)" },
      { label: "Leadership Retreat Access", value: "Unlimited (pet will not know why they're there)" },
      { label: "Dedicated Account Manager", value: "Dedicated (they also don't understand)" },
      { label: "ROI Guarantee", value: "\"Results guaranteed*\" (*Results defined as continued existence)" },
    ],
  },
]

export const standaloneServices: StandaloneService[] = [
  {
    name: "Animal Career Coaching™",
    tagline: "Is your goldfish stuck in a rut? Is your snake failing to network?",
    description: "One-on-one sessions with a certified animal career strategist. Our intake form asks species, current career level, and biggest professional regret. Sessions are 45 minutes. Your pet will attend zero of them.",
  },
  {
    name: "Performance Reviews for Pets™",
    tagline: "Quarterly reviews mailed to your pet on branded letterhead.",
    description: "Covers punctuality, teamwork, and initiative. Categories: \"Exceeds Expectations\" (never used), \"Meets Expectations\" (never used), \"Needs Improvement\" (default). They do not read them.",
  },
  {
    name: "Animal Leadership Retreats™",
    tagline: "3-day offsite. No one knows why they're there.",
    description: "Agenda includes team building exercises, trust falls (not recommended for fish), a keynote from a motivational iguana, and a networking dinner where all attendees eat at different times. Lodging provided. Comprehension not included.",
  },
  {
    name: "Cross-Species Skill Transfer Program™",
    tagline: "Teach your dog the focus of a cat. Neither will cooperate.",
    description: "Proprietary methodology for transferring competencies between species. Teach your cat the enthusiasm of a dog. Teach your fish the ambition of a hamster on a wheel. Our success rate is exactly what you'd expect.",
  },
  {
    name: "Executive Presence Workshop™",
    tagline: "Help your pet command a room.",
    description: "Curriculum: power posture (difficult for snakes), eye contact (impossible for fish), firm handshakes (excluded: all participants), vocal projection (parrots only — everyone else excluded). One-day intensive. Certificate of completion included. Competence not included.",
  },
]

export const serviceFaqs = [
  { question: "Will my pet actually improve?", answer: "No." },
  { question: "Can I get a refund?", answer: "Your pet can't fill out the form." },
  { question: "What species do you support?", answer: "All of them. None of them respond." },
  { question: "How do I know if my pet needs coaching?", answer: "Is your pet alive? Then yes, according to our assessment criteria, they are underperforming." },
  { question: "What's the difference between Pro and Enterprise?", answer: "Enterprise includes an executive summary of the same zero results. It's the same nothing, but with better formatting." },
]
