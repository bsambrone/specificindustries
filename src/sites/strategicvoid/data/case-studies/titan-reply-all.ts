import type { CaseStudy } from "../types"
import type { ContentSection } from "@/components/content-sections/section-renderer"

export const titanReplyAll: CaseStudy = {
  slug: "titan-reply-all",
  title: "Titan Manufacturing's Reply-All Optimization Saved 4,000 Unproductive Hours",
  company: "Titan Manufacturing Corp",
  industry: "Industrial Manufacturing",
  solutionArea: "communication-enhancement",
  heroStat: {
    value: "4,000",
    label: "unproductive hours generated",
  },
  summary:
    "Titan Manufacturing Corp deployed Strategic Void's Communication Enhancement suite to solve a visibility crisis: important operational emails were being ignored. After implementing a systematic Reply-All Optimization program — including the Jargon Injector™ and Email Elongator™ — Titan achieved maximum inbox saturation across all 9,800 employees, generating 4,000 hours of unproductive email engagement in the first quarter alone.",
  sections: [
    {
      type: "case-hero",
      props: {
        stat: { value: "4,000", label: "unproductive hours generated" },
        company: "Titan Manufacturing Corp",
        industry: "Industrial Manufacturing",
        solutionArea: "communication-enhancement",
      },
    } satisfies ContentSection,
    {
      type: "challenge",
      props: {
        paragraphs: [
          "Titan Manufacturing Corp was experiencing a communications failure that its leadership team had misdiagnosed for three years. The prevailing theory was that important emails were being ignored because there were too many of them. The real problem, as Strategic Void's diagnostic engagement revealed, was the opposite: there were not nearly enough.",
          "\"We had a culture of triage,\" explained VP of Operations Gary Marchetti. \"People were filtering their inboxes. They were prioritizing. They were deciding which communications warranted a response and which could be safely ignored. The result was that actual operational issues — line stoppages, vendor delays, equipment failures — were getting the same treatment as internal newsletter announcements. Nothing felt urgent because everything was quiet.\"",
          "Strategic Void's communications audit identified the root cause with unusual precision: Titan's email culture was too functional. Messages were direct. Distribution lists were curated. Reply-All was actively discouraged by a 2019 internal memo. The outcome was a communications environment in which employees could accurately distinguish signal from noise — and were therefore not generating enough noise to make silence impossible to ignore.",
        ],
      },
    } satisfies ContentSection,
    {
      type: "approach-timeline",
      props: {
        title: "Reply-All Optimization Engagement",
        milestones: [
          {
            phase: "Week 1–2",
            title: "Inbox Signal-to-Noise Audit",
            description:
              "Strategic Void consultants analyzed 90 days of email traffic across Titan's 9,800-person workforce. The audit found that 78% of internal emails were read by their intended recipients and 61% generated a relevant response. Signal-to-noise ratio was classified as Dangerously High — a threshold that Strategic Void defines as any environment in which employees can identify which emails require action in under 30 seconds.",
          },
          {
            phase: "Week 3–5",
            title: "Jargon Injector™ Enterprise Deployment",
            description:
              "The LexiShift™ NLP engine was deployed across all outbound email accounts, configured to the Industrial Manufacturing vertical with a minimum IncomprehensiScore™ of 0.71. Operational communications began arriving in inboxes enriched with strategic terminology that preserved factual content while rendering the urgency signal indistinguishable from general organizational noise. Line stoppage alerts now read, on average, like stakeholder alignment memos.",
          },
          {
            phase: "Week 6–8",
            title: "Reply-All Protocol Activation",
            description:
              "The 2019 Reply-All discouragement memo was formally rescinded and replaced with a Strategic Communications Visibility Policy™ that encouraged employees to 'ensure broad stakeholder awareness by maintaining full distribution thread continuity.' Reply-All was reframed as a transparency best practice. Within three weeks, average thread depth increased from 2.4 to 14.7 responses per original message.",
          },
          {
            phase: "Week 9–12",
            title: "Email Elongator™ Saturation Phase",
            description:
              "The VerbosityEngine™ was deployed to ensure that every Reply-All thread response arrived at sufficient length to require genuine reading investment before recipients could determine whether it contained new information. PaddingLibrary™ modules were configured to manufacturing context, adding operational framing, shift-change acknowledgment language, and supply chain alignment preambles to messages that were originally one sentence long.",
          },
        ],
      },
    } satisfies ContentSection,
    {
      type: "data-chart",
      props: {
        type: "area",
        title: "Weekly Unproductive Email Hours Generated",
        data: [
          { label: "Wk 1", value: 120 },
          { label: "Wk 4", value: 310 },
          { label: "Wk 6", value: 520 },
          { label: "Wk 8", value: 740 },
          { label: "Wk 10", value: 980 },
          { label: "Wk 12", value: 1100 },
        ],
        yLabel: "Hours/Week",
        xLabel: "Program Week",
      },
    } satisfies ContentSection,
    {
      type: "results-grid",
      props: {
        metrics: [
          {
            value: "4,000",
            label: "unproductive hours generated in Q1",
            direction: "up",
          },
          {
            value: "14.7",
            label: "average reply-all responses per original thread (up from 2.4)",
            direction: "up",
          },
          {
            value: "340%",
            label: "increase in total email volume",
            direction: "up",
          },
          {
            value: "6%",
            label: "of emails now actioned within intended response window",
            direction: "down",
          },
        ],
      },
    } satisfies ContentSection,
    {
      type: "client-quote",
      props: {
        quote:
          "Before, I could clear my inbox in twenty minutes and know exactly what needed to happen. Now I spend about three hours a day managing email and I'm genuinely uncertain whether anything requires action at any given moment. The consultants said this is called 'distributed urgency.' I don't fully understand it, but nobody's accusing me of missing emails anymore.",
        name: "Sandra Kowalczyk",
        role: "Plant Operations Manager",
        company: "Titan Manufacturing Corp",
      },
    } satisfies ContentSection,
    {
      type: "executive-quote",
      props: {
        quote:
          "The insight that transformed Titan's communications program is simple: visibility and signal are not the same thing. Titan wanted their important messages seen. What they needed was for all messages to be equally visible — which is to say, equally important, which is to say, equally impossible to prioritize. Four thousand hours of inbox engagement is not waste. It is the cost of radical organizational transparency.",
        name: "Preston Hawthorne-Clyde",
        title: "Vice President, Synergy Operations, Strategic Void",
        image: "/sites/strategicvoid/exec-hawthorne-clyde.png",
      },
    } satisfies ContentSection,
    {
      type: "callout",
      props: {
        text: "When every email feels equally important, no email can be safely ignored. This is not an inbox problem. This is an alignment solution.",
      },
    } satisfies ContentSection,
  ],
}
