import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "Contact — Campaign for Sustainable Overreactions",
  description: "Submit your concern through approved channels. Response times vary by category and methodology workload.",
}

const INTAKE_CATEGORIES = [
  { label: "General inquiry", responseTime: "5–7 business days" },
  { label: "Methodology question",  responseTime: "10–14 business days" },
  { label: "Pitchfork library issue", responseTime: "3–5 business days" },
  { label: "Offset purchase support", responseTime: "Same-day (most quarters)" },
  { label: "Press inquiry",           responseTime: "48 hours" },
  { label: "Donor relations",         responseTime: "Coordinated through Director Kellner directly" },
]

export default function ContactPage() {
  return (
    <>
      <Hero
        headline="Contact the Campaign"
        subheadline="All inquiries are routed through the appropriate intake category. Response times reflect the Campaign's methodological workload."
        image="/sites/carbonneutraloutrage/contact.png"
      />

      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-primary mb-6">Intake Categories &amp; Response Times</h2>
          <ul className="border border-accent/30 rounded-lg overflow-hidden bg-white divide-y divide-accent/20">
            {INTAKE_CATEGORIES.map((cat) => (
              <li key={cat.label} className="flex justify-between items-center px-5 py-4">
                <span className="text-foreground/85 font-medium">{cat.label}</span>
                <span className="text-xs text-foreground/60 font-mono">{cat.responseTime}</span>
              </li>
            ))}
          </ul>

          <div className="mt-12 p-6 border border-accent/30 rounded-lg bg-background">
            <h3 className="text-lg font-heading font-semibold text-primary mb-3">Mailing Address</h3>
            <p className="text-foreground/70 leading-relaxed">
              Campaign for Sustainable Overreactions<br />
              c/o Regional Cooperative Office<br />
              1842 NE Composting Way, Suite 4B<br />
              Portland, OR 97211
            </p>
          </div>

          <p className="text-xs text-foreground/40 text-center italic mt-12">
            For all routine correspondence: <a href="mailto:bsambrone@gmail.com" className="text-foreground/60 underline hover:text-primary transition-colors">bsambrone@gmail.com</a>
          </p>
        </div>
      </section>
    </>
  )
}
