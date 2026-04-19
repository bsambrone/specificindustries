export interface Testimonial {
  /** Cat's first name only — graduates do not have surnames on file */
  name: string
  /** Surprisingly specific job title they now hold */
  placement: string
  quote: string
}

export const testimonials: Testimonial[] = [
  {
    name: "Biscuit",
    placement: "IT procurement, mid-sized dental practice",
    quote: "Whiskerworks gave me a credential and the confidence to order 200 monitors we did not need.",
  },
  {
    name: "Mittens",
    placement: "Payroll manager, regional bank",
    quote: "I have access to systems I do not fully understand. Management is thrilled.",
  },
  {
    name: "Toffee",
    placement: "Associate PM, enterprise SaaS",
    quote: "I have been on 147 Zoom calls this quarter. I have said 'sounds good' 2,300 times. I have never been promoted. I have also never been fired.",
  },
  {
    name: "Gravy",
    placement: "Route 42, municipal transit",
    quote: "Route 42. On time. Every day. The passengers do not know. The passengers will never know.",
  },
  {
    name: "Pepper",
    placement: "Classified",
    quote: "[The remainder of this quote is redacted.]",
  },
  {
    name: "Marmalade",
    placement: "Fully replaced her human at a regional insurance firm",
    quote: "Her human has been on paternity leave for 19 months. Nobody has followed up.",
  },
]
