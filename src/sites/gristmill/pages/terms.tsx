import type { PageMetadata } from "@/themes"

export const metadata: PageMetadata = {
  title: "Terms of Service — Gristmill Partners",
  description:
    "Gristmill Partners terms of service. This site is operated by Specific Industries. The authoritative terms are available at specificindustries.com/terms.",
}

export default function TermsPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="mx-auto max-w-3xl px-6 py-20">
        <div>
          <h1 className="mb-2 text-4xl md:text-5xl font-heading font-bold text-secondary">
            Terms of Service
          </h1>
          <p className="mb-8 text-sm italic text-foreground/60">
            In force since 1962. Binding upon first utterance.
          </p>
        </div>

        <div className="mb-8 rounded border-2 border-secondary/30 bg-secondary/5 p-6">
          <p className="text-sm">
            This site is operated by Specific Industries. The authoritative terms of service
            are available at{" "}
            <a
              href="https://specificindustries.com/terms"
              className="text-primary underline"
            >
              specificindustries.com/terms
            </a>
            .
          </p>
        </div>

        <p className="mb-2 text-sm text-foreground/70">
          <strong>Effective Date:</strong> April 11, 2026. This agreement precedes and supersedes all prior understandings.
        </p>

        <nav className="mb-12 rounded bg-secondary/5 p-6">
          <h2 className="mb-4 font-heading font-bold text-secondary">Table of Contents</h2>
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <li><a href="#section-1" className="text-primary underline">1. Agreement to These Terms</a></li>
            <li><a href="#section-2" className="text-primary underline">2. Acceptance by Use</a></li>
            <li><a href="#section-3" className="text-primary underline">3. Client Eligibility</a></li>
            <li><a href="#section-4" className="text-primary underline">4. Engagement Request Process</a></li>
            <li><a href="#section-5" className="text-primary underline">5. Required Client Disclosures</a></li>
            <li><a href="#section-6" className="text-primary underline">6. Access Rights Granted</a></li>
            <li><a href="#section-7" className="text-primary underline">7. Conduct of Engagements</a></li>
            <li><a href="#section-8" className="text-primary underline">8. Modification of Engagements</a></li>
            <li><a href="#section-9" className="text-primary underline">9. Non-Interference with Methodology</a></li>
            <li><a href="#section-10" className="text-primary underline">10. Client Obligations</a></li>
            <li><a href="#section-11" className="text-primary underline">11. Workforce Cooperation Requirement</a></li>
            <li><a href="#section-12" className="text-primary underline">12. Prohibited Client Conduct</a></li>
            <li><a href="#section-13" className="text-primary underline">13. Fees and Payment Terms</a></li>
            <li><a href="#section-14" className="text-primary underline">14. Late Payment Consequences</a></li>
            <li><a href="#section-15" className="text-primary underline">15. Expenses and Reimbursement</a></li>
            <li><a href="#section-16" className="text-primary underline">16. Deliverables and Ownership</a></li>
            <li><a href="#section-17" className="text-primary underline">17. Intellectual Property Rights</a></li>
            <li><a href="#section-18" className="text-primary underline">18. Client Feedback as Firm Property</a></li>
            <li><a href="#section-19" className="text-primary underline">19. Client Confidentiality Obligations</a></li>
            <li><a href="#section-20" className="text-primary underline">20. Gristmill Confidentiality</a></li>
            <li><a href="#section-21" className="text-primary underline">21. Client Representations</a></li>
            <li><a href="#section-22" className="text-primary underline">22. Disclaimer of Warranties</a></li>
            <li><a href="#section-23" className="text-primary underline">23. Limitation of Liability</a></li>
            <li><a href="#section-24" className="text-primary underline">24. Indemnification by Client</a></li>
            <li><a href="#section-25" className="text-primary underline">25. Termination Restrictions</a></li>
            <li><a href="#section-26" className="text-primary underline">26. Post-Engagement Obligations</a></li>
            <li><a href="#section-27" className="text-primary underline">27. Governing Law and Jurisdiction</a></li>
            <li><a href="#section-28" className="text-primary underline">28. Entire Agreement and Severability</a></li>
          </ol>
        </nav>

        {/* Section 1 */}
        <h2 id="section-1" className="font-heading text-2xl md:text-3xl text-secondary mt-12 mb-4 scroll-mt-24">
          § 1. Agreement to These Terms
        </h2>
        <p className="mb-4 leading-relaxed text-foreground">
          These Terms of Service (hereinafter &quot;this Agreement&quot;) constitute a binding legal agreement between Gristmill Partners, a limited liability partnership organized under the laws of Ohio (hereinafter &quot;the Firm&quot;), and any organization that engages the Firm&apos;s services for organizational consulting, workforce assessment, or training-related activities (hereinafter &quot;the Client&quot;). This Agreement is enforceable and binding upon the Client, the Client&apos;s representatives, successors, assigns, and all employees, contractors, and agents of the Client.
        </p>
        <p className="mb-4 leading-relaxed text-foreground">
          By executing an engagement proposal from Gristmill Partners, by accepting services delivered by the Firm, or by authorizing employees to attend a Firm-conducted seminar or training program, the Client agrees to be bound by all terms and conditions set forth herein. This Agreement constitutes the entire agreement between the Client and the Firm regarding the subject matter hereof and supersedes all prior negotiations, representations, and agreements, whether written or oral. No side letter, verbal assurance, or promise by any Firm representative shall modify or contradict the express terms of this Agreement.
        </p>

        {/* Section 2 */}
        <h2 id="section-2" className="font-heading text-2xl md:text-3xl text-secondary mt-12 mb-4 scroll-mt-24">
          § 2. Acceptance by Use of the Site and Services
        </h2>
        <p className="mb-4 leading-relaxed text-foreground">
          The Client&apos;s continued access to this website, the submission of an engagement request, or the acceptance of any services delivered by a Gristmill Partners engagement specialist or certified instructor shall be deemed to constitute full acceptance of this Agreement. The Client may not use Gristmill Partners&apos; services while simultaneously rejecting the terms hereof. Acceptance is irrevocable and retroactively applicable to all prior service delivery.
        </p>
        <p className="mb-4 leading-relaxed text-foreground">
          The Firm reserves the right to modify, expand, restrict, or withdraw this Agreement at any time. Changes to this Agreement take effect upon publication and are binding upon the Client without further notice. The Client&apos;s continued use of the Firm&apos;s services constitutes acceptance of all such modifications, including modifications that contradict previous versions of this Agreement or prior verbal understandings with Firm representatives.
        </p>

        {/* Section 3 */}
        <h2 id="section-3" className="font-heading text-2xl md:text-3xl text-secondary mt-12 mb-4 scroll-mt-24">
          § 3. Client Eligibility and Engagement Criteria
        </h2>
        <p className="mb-4 leading-relaxed text-foreground">
          Gristmill Partners extends its services only to eligible client organizations. Eligible clients include: (a) publicly held companies ranked within the Fortune 500 at the time of engagement initiation; (b) privately held industrial and manufacturing enterprises with annual revenue exceeding four hundred million dollars, verified through audited financial statements not more than eighteen months old; (c) holding companies in good standing continuously since the Truman administration; and (d) consortiums of such organizations operating under a single holding entity.
        </p>
        <p className="mb-4 leading-relaxed text-foreground">
          Organizations not meeting these eligibility criteria may not engage the Firm&apos;s services. The Firm reserves the right to revoke or suspend engagement for any client organization that ceases to meet eligibility criteria during an active engagement period. Downgrades in organizational rank, revenue decline, or significant loss of market position do not automatically terminate the engagement, though the Firm may reclassify the Client into a higher fee tier or impose additional requirements as a condition of continued service delivery.
        </p>

        {/* Section 4 */}
        <h2 id="section-4" className="font-heading text-2xl md:text-3xl text-secondary mt-12 mb-4 scroll-mt-24">
          § 4. Engagement Request Process and Form 47-B
        </h2>
        <p className="mb-4 leading-relaxed text-foreground">
          All engagement requests must be submitted on Form 47-B, a three-copy engagement request document available upon written request from the Firm&apos;s administrative office. Completed forms must be submitted in triplicate to the Firm&apos;s Cleveland headquarters facility. The current Cleveland facility operates as a tenant storage area; requests may alternatively be directed to the Founder&apos;s Office with an expected review timeline of three to five business quarters.
        </p>
        <p className="mb-4 leading-relaxed text-foreground">
          The engagement request must include: (a) full legal name of the Client organization; (b) detailed description of organizational challenges, workforce volatility concerns, or strategic initiatives that the Client believes Gristmill services might address; (c) preferred engagement duration (measured in months or years); (d) authorization for preliminary Site assessment visits; and (e) acknowledgment that submission of Form 47-B does not obligate the Firm to accept the engagement. Upon receipt and approval, the Firm will issue an engagement proposal. Engagement does not commence until an executed engagement agreement has been countersigned by the Firm&apos;s Chief Operating Officer or authorized designee.
        </p>

        {/* Section 5 */}
        <h2 id="section-5" className="font-heading text-2xl md:text-3xl text-secondary mt-12 mb-4 scroll-mt-24">
          § 5. Required Client Disclosures
        </h2>
        <p className="mb-4 leading-relaxed text-foreground">
          Prior to engagement commencement, the Client must provide comprehensive disclosure of all material operational, legal, and personnel information relevant to the Firm&apos;s assessment and consulting work. Required disclosures include: (a) total current workforce headcount, organized by department, tenure, and compensation tier; (b) baseline workforce morale metrics, measured through the Firm&apos;s proprietary assessment instrument; (c) all pending litigation, arbitration proceedings, or formal complaints filed by employees in the past ten years; (d) organizational structure diagrams showing reporting relationships and executive compensation; (e) all prior engagements with competing consulting firms and outcomes thereof; (f) complete personnel files for all executives and key decision-makers; and (g) all communications related to potential merger, acquisition, or restructuring activities in the past twenty-four months.
        </p>
        <p className="mb-4 leading-relaxed text-foreground">
          The Client further warrants that all provided information is true, accurate, complete, and not materially misleading. The Client acknowledges that any incomplete or inaccurate disclosure shall not relieve the Client of its obligations under this Agreement and may subject the Client to additional consulting fees imposed by the Firm at its sole discretion. The Client grants the Firm the right to conduct supplementary discovery at any time, including third-party reference checks, background investigations, and independent assessment of workforce composition and organizational dynamics.
        </p>

        {/* Section 6 */}
        <h2 id="section-6" className="font-heading text-2xl md:text-3xl text-secondary mt-12 mb-4 scroll-mt-24">
          § 6. Access Rights Granted to Gristmill Partners
        </h2>
        <p className="mb-4 leading-relaxed text-foreground">
          As a condition of engagement, the Client grants to Gristmill Partners and its authorized representatives unrestricted physical and informational access to all Client facilities, office spaces, and operational areas for the duration of the engagement and for a period of ninety days thereafter for purposes of follow-up assessment and documentation. This access shall include: (a) access to all employee work areas, private offices, and break rooms; (b) the right to observe employees during business hours without notice; (c) access to all personnel files, employment records, payroll records, and performance documentation; (d) access to email systems, internal communications platforms, and messaging archives; (e) integration with the Client&apos;s Human Resources Information System to retrieve real-time workforce data; and (f) access to employee badge systems, time-tracking systems, and facility security logs.
        </p>
        <p className="mb-4 leading-relaxed text-foreground">
          The Client shall provide the Firm with assigned office space suitable for the Firm&apos;s engagement specialists and observation personnel. The Client shall provide network access, telephone systems, and equipment necessary for Firm personnel to conduct assessment activities. The Firm may conduct unannounced facility visits, review employee communications, and access confidential business records with or without advance notice to Client management. The Client waives any expectation of privacy regarding information or observations obtained by the Firm during the engagement period.
        </p>

        {/* Section 7 */}
        <h2 id="section-7" className="font-heading text-2xl md:text-3xl text-secondary mt-12 mb-4 scroll-mt-24">
          § 7. Conduct of Engagements
        </h2>
        <p className="mb-4 leading-relaxed text-foreground">
          Gristmill Partners shall conduct all engagements in accordance with the Firm&apos;s proprietary methodology, which has been refined continuously since 1962 and remains largely unchanged. Engagements may include on-site assessment visits, delivery of standardized training programs (including The 247-Slide Deck, the Nasal Hygiene webinar, or the Certified Gratitude Curriculum), internal consulting interviews, workforce volatility monitoring, or custom advisory services as determined by the Firm.
        </p>
        <p className="mb-4 leading-relaxed text-foreground">
          During the engagement period, Firm personnel shall have the authority to make observations, conduct interviews, request documentation, and assess organizational operations without Client approval or advance notice. Engagement specialists are authorized to make preliminary recommendations directly to Client leadership and may attend executive meetings, board discussions, or strategic planning sessions at the Firm&apos;s discretion. The Client shall provide all cooperation requested by Firm personnel, including securing employee attendance at seminars, facilitating facility access, and authorizing data disclosure to Firm consultants.
        </p>

        {/* Section 8 */}
        <h2 id="section-8" className="font-heading text-2xl md:text-3xl text-secondary mt-12 mb-4 scroll-mt-24">
          § 8. Modification of Engagements by Gristmill
        </h2>
        <p className="mb-4 leading-relaxed text-foreground">
          Gristmill Partners reserves the absolute right to modify the methodology, scope, duration, pricing, or deliverables associated with any engagement at any time, without prior notice to the Client and without Client consent. Modifications may include: (a) changes to the engagement timeline, extending or compressing the engagement schedule as the Firm deems appropriate; (b) expansion of services to include additional assessment activities not originally contemplated; (c) introduction of new or experimental consulting methodologies; (d) substitution of engagement personnel; and (e) adjustment of fees, payment terms, or expense reimbursement schedules.
        </p>
        <p className="mb-4 leading-relaxed text-foreground">
          The Client shall not contest or object to any such modifications. The Firm may impose additional requirements on the Client, increase pricing, or introduce new service components at any time. Modifications take effect immediately upon notice and are binding upon the Client. The Client shall not be entitled to refund, credit, or reduction in fees based on scope changes, and shall pay all costs associated with modified or expanded engagement activities.
        </p>

        {/* Section 9 */}
        <h2 id="section-9" className="font-heading text-2xl md:text-3xl text-secondary mt-12 mb-4 scroll-mt-24">
          § 9. Non-Interference With Firm Methodology
        </h2>
        <p className="mb-4 leading-relaxed text-foreground">
          The Client agrees not to question, criticize, challenge, or second-guess any aspect of the Firm&apos;s consulting methodology, recommendations, or operational practices. The Firm&apos;s methodologies are based on proprietary research, continuous operational refinement, and decades of field experience. The Client shall accept all Firm recommendations without objection and shall not demand justification, evidence, or independent validation of any consulting recommendation.
        </p>
        <p className="mb-4 leading-relaxed text-foreground">
          If the Client expresses doubt regarding any Firm recommendation, disputes the basis for a consulting conclusion, or requests clarification of the Firm&apos;s reasoning, such conduct shall be deemed Client non-compliance and shall subject the Client to additional consulting fees, extended engagement duration, or termination of the engagement at the Firm&apos;s sole election. The Client shall communicate to its employees that all Firm recommendations must be accepted without question and that internal discussion of or objection to Firm guidance is not permitted.
        </p>

        {/* Section 10 */}
        <h2 id="section-10" className="font-heading text-2xl md:text-3xl text-secondary mt-12 mb-4 scroll-mt-24">
          § 10. Client Obligations During Engagement
        </h2>
        <p className="mb-4 leading-relaxed text-foreground">
          During the engagement period, the Client and all Client personnel shall maintain a posture of respectful silence regarding the Firm&apos;s internal processes, assessment methodologies, and consulting recommendations. The Client shall not discuss Firm personnel, Firm assessment activities, or Firm recommendations in any forum without prior written approval from the Firm&apos;s Chief Engagement Officer.
        </p>
        <p className="mb-4 leading-relaxed text-foreground">
          The Client shall ensure that all employees maintain full attendance at all Firm-delivered seminars and training sessions. The Client shall provide all reasonable accommodations to Firm personnel, including office space, IT infrastructure, facilities access, and administrative support. The Client shall not publish case studies, white papers, or testimonials related to the engagement without explicit written permission from the Firm, and any such permission shall require the Firm&apos;s review and approval of all content prior to publication. The Client shall not contact Firm personnel directly regarding billing, engagement scope, or strategic direction; all communication shall flow through the Firm&apos;s designated engagement partner.
        </p>

        {/* Section 11 */}
        <h2 id="section-11" className="font-heading text-2xl md:text-3xl text-secondary mt-12 mb-4 scroll-mt-24">
          § 11. Workforce Cooperation Requirement
        </h2>
        <p className="mb-4 leading-relaxed text-foreground">
          All employees, contractors, and agents of the Client are hereby deemed &quot;subjects of the engagement&quot; and are required to cooperate fully with all Firm assessment activities. Cooperation includes: (a) attendance at all Firm-delivered seminars and training sessions; (b) completion of all Firm-administered surveys, assessments, and evaluative instruments; (c) participation in individual interviews or focus groups conducted by Firm personnel; (d) disclosure of personal information requested by Firm consultants; and (e) submission to biometric data collection, video recording, and behavioral observation.
        </p>
        <p className="mb-4 leading-relaxed text-foreground">
          Employees may not opt out of, decline, or refuse participation in any Firm-related activity. Non-participation shall be treated as grounds for disciplinary action by the Client, up to and including termination of employment. The Client shall enforce full employee cooperation with Firm requirements and shall be responsible for any costs, penalties, or extended engagement fees resulting from employee non-compliance or attendance failures. The Firm may impose additional attendance or participation requirements at any time, and the Client shall ensure immediate employee compliance.
        </p>

        {/* Section 12 */}
        <h2 id="section-12" className="font-heading text-2xl md:text-3xl text-secondary mt-12 mb-4 scroll-mt-24">
          § 12. Prohibited Client Conduct
        </h2>
        <p className="mb-4 leading-relaxed text-foreground">
          The Client shall not engage in any of the following conduct, each of which shall constitute material breach of this Agreement: (a) publication or disclosure of engagement results, case study materials, or recommendations without explicit written Firm approval; (b) sharing details of the engagement methodology, Firm recommendations, or assessment outcomes with competitors, investors, or external parties; (c) solicitation of employment of any Firm personnel during or after the engagement; (d) retention of competing consultants without Firm approval; (e) public criticism or negative commentary regarding Firm services, Firm personnel, or Firm recommendations; (f) encouragement of employee feedback or suggestions regarding Firm services; or (g) refusal to implement any Firm recommendation or modification to organizational practices.
        </p>
        <p className="mb-4 leading-relaxed text-foreground">
          Violation of these prohibitions shall subject the Client to immediate termination of the engagement, forfeiture of all prepaid fees, imposition of liquidated damages in an amount equal to the full original engagement fee plus one hundred percent, and potential legal action for breach of confidentiality and tortious interference with business relationships. The Client waives any right to dispute the characterization of conduct as prohibited or to contest the Firm&apos;s determination that breach has occurred.
        </p>

        {/* Section 13 */}
        <h2 id="section-13" className="font-heading text-2xl md:text-3xl text-secondary mt-12 mb-4 scroll-mt-24">
          § 13. Fees and Payment Terms
        </h2>
        <p className="mb-4 leading-relaxed text-foreground">
          Gristmill Partners shall provide the Client with a detailed fee schedule outlining engagement costs, which fee schedule is available upon request but is rarely granted in full form. Engagement fees are calculated based on Client organization size, engagement duration, methodology complexity, and the Firm&apos;s assessment of the Client&apos;s capacity to pay. The Firm reserves the right to adjust fees at any time, including retroactive adjustment of fees previously quoted or approved.
        </p>
        <p className="mb-4 leading-relaxed text-foreground">
          Unless otherwise specified in an engagement letter, all fees are due and payable within ninety days of invoice (Net 90). Invoices may be issued at irregular intervals without advance notice. The Firm may issue supplemental invoices for expenses, additional services, or scope modifications at any time. The Client shall remit payment by wire transfer or check to the address specified on the invoice. The Firm does not accept credit card, ACH, or other payment methods without prior written approval.
        </p>

        {/* Section 14 */}
        <h2 id="section-14" className="font-heading text-2xl md:text-3xl text-secondary mt-12 mb-4 scroll-mt-24">
          § 14. Late Payment Consequences and Escalating Fees
        </h2>
        <p className="mb-4 leading-relaxed text-foreground">
          If any fee or expense invoice remains unpaid thirty days after the due date, late payment interest shall accrue at a rate of one point five percent per month, compounded quarterly, retroactive to January 1, 1962. Additionally, the Client shall be deemed to have materially breached this Agreement, and the Firm shall impose a Late Payment Consulting Surcharge equal to fifty percent of the outstanding amount, due immediately.
        </p>
        <p className="mb-4 leading-relaxed text-foreground">
          If the Client remains in arrears for more than sixty days, the Firm shall be entitled to: (a) suspend all engagement activities until payment is received; (b) extend the engagement period by thirty days per thirty days of non-payment, at full fees; (c) impose mandatory additional consulting services, including quarterly volatility re-assessments and executive strategy sessions, charged at the Firm&apos;s prevailing hourly rate; and (d) pursue collection action in any court of competent jurisdiction. The Client shall also be responsible for all collection costs, attorney&apos;s fees, and court costs incurred by the Firm.
        </p>

        {/* Section 15 */}
        <h2 id="section-15" className="font-heading text-2xl md:text-3xl text-secondary mt-12 mb-4 scroll-mt-24">
          § 15. Expenses and Reimbursement
        </h2>
        <p className="mb-4 leading-relaxed text-foreground">
          In addition to consulting fees, the Client shall reimburse the Firm for all reasonable and necessary expenses incurred in connection with the engagement. Reimbursable expenses include travel, lodging, meals, and incidental costs associated with on-site assessment visits, seminar delivery, and consulting activities. Travel shall be conducted in properly appointed accommodations, including first-class or business-class airfare for all Firm personnel, four-star hotel lodging, and ground transportation in full-service sedan or premium vehicle class.
        </p>
        <p className="mb-4 leading-relaxed text-foreground">
          Per diem meals and incidental allowances are set at levels established in 1974 for nostalgia and administrative consistency purposes: breakfast at eighteen dollars, lunch at thirty-four dollars, and dinner at fifty-eight dollars per day. All expenses shall be invoiced to the Client with detailed receipts and shall be due within thirty days of invoice. The Client shall not contest expense charges or demand itemization beyond what is provided on the invoice. Multi-day engagements shall generate vehicle rental fees, parking fees, and facility charges in addition to per diem, all of which shall be passed through to the Client at cost plus thirty percent administrative fee.
        </p>

        {/* Section 16 */}
        <h2 id="section-16" className="font-heading text-2xl md:text-3xl text-secondary mt-12 mb-4 scroll-mt-24">
          § 16. Gristmill Deliverables and Ownership
        </h2>
        <p className="mb-4 leading-relaxed text-foreground">
          All materials, documents, recommendations, assessment tools, and strategic guidance produced by Gristmill Partners in connection with the engagement (hereinafter &quot;Deliverables&quot;) shall remain the exclusive property of the Firm. The Client shall receive a limited, non-exclusive, non-transferable license to use the Deliverables solely for the Client&apos;s internal organizational purposes, and only for the duration of the engagement. This license expires immediately upon engagement termination or at the Firm&apos;s discretion, whichever occurs first.
        </p>
        <p className="mb-4 leading-relaxed text-foreground">
          The Client may not reproduce, distribute, modify, or create derivative works based on Deliverables. The Client may not disclose Deliverables to third parties, including employees, board members, investors, or advisors, without explicit written Firm permission. All Deliverables are confidential and proprietary to the Firm. Upon engagement termination, the Client shall return or certify destruction of all physical and digital Deliverables, including all copies or summaries created by the Client. The Firm retains the right to repossess all Deliverables and to pursue legal action for any unauthorized use or disclosure.
        </p>

        {/* Section 17 */}
        <h2 id="section-17" className="font-heading text-2xl md:text-3xl text-secondary mt-12 mb-4 scroll-mt-24">
          § 17. Intellectual Property of the Firm
        </h2>
        <p className="mb-4 leading-relaxed text-foreground">
          Gristmill Partners owns all right, title, and interest in the intellectual property, methodologies, and proprietary processes underlying the Firm&apos;s service offerings. This intellectual property includes, without limitation: (a) the Perpetual Reorganization Protocol, a proprietary methodology for continuous organizational restructuring without material objective; (b) the 247-Slide Deck, consisting of 247 slides developed over five decades and protected as registered intangible property of the Firm; (c) the Workforce Volatility Index, a statistical framework for measuring employee retention risk; (d) the Underperformance Discovery Engine, an algorithmic system for predictive assessment of employee departure probability; and (e) all training curricula, assessment instruments, and evaluation frameworks developed by the Firm.
        </p>
        <p className="mb-4 leading-relaxed text-foreground">
          The Client shall not attempt to reverse-engineer, replicate, license, or commercialize any Firm intellectual property. The Client acknowledges that the Firm&apos;s intellectual property is valuable, proprietary, and the result of substantial investment by the Firm. The Client shall not disclose methodologies, assessment frameworks, or strategic recommendations to any third party. Violation of intellectual property rights shall result in immediate legal action, injunctive relief, and damages equal to the Firm&apos;s lost licensing revenue plus treble damages for willful infringement.
        </p>

        {/* Section 18 */}
        <h2 id="section-18" className="font-heading text-2xl md:text-3xl text-secondary mt-12 mb-4 scroll-mt-24">
          § 18. Client Feedback Becomes Firm Property
        </h2>
        <p className="mb-4 leading-relaxed text-foreground">
          Any feedback, suggestions, observations, or comments provided by the Client, Client personnel, or Client representatives regarding the Firm, the engagement, or the Firm&apos;s services shall immediately become the exclusive property of the Firm upon utterance or disclosure. The Client hereby assigns all rights, including intellectual property rights, in such feedback to the Firm. The Firm may use, modify, publish, or commercialize Client feedback without compensation, attribution, or further consent from the Client.
        </p>
        <p className="mb-4 leading-relaxed text-foreground">
          The Client waives any claim of ownership, attribution, or compensation related to feedback provided. The Firm may publish case studies, white papers, or testimonial materials incorporating Client feedback or Client engagement outcomes without prior Client approval. The Firm may identify the Client organization by name or may describe the Client anonymously, at the Firm&apos;s sole discretion. The Client is not entitled to review or approve any published materials incorporating Client feedback or engagement details.
        </p>

        {/* Section 19 */}
        <h2 id="section-19" className="font-heading text-2xl md:text-3xl text-secondary mt-12 mb-4 scroll-mt-24">
          § 19. Client Confidentiality Obligations
        </h2>
        <p className="mb-4 leading-relaxed text-foreground">
          The Client shall maintain strict confidentiality regarding all aspects of the engagement, including the Firm&apos;s methodologies, assessment findings, consulting recommendations, pricing, engagement timeline, and any communications with Firm personnel. The Client shall not disclose engagement details to employees, consultants, board members, investors, regulators, or any third party without express written Firm permission.
        </p>
        <p className="mb-4 leading-relaxed text-foreground">
          The Client shall require all employees and contractors to execute confidentiality agreements covering the engagement. Violation of confidentiality obligations shall result in immediate legal action, injunctive relief, liquidated damages equal to the full engagement fee plus one hundred percent, and potential criminal liability for theft of trade secrets. The Client acknowledges that breach of confidentiality will cause irreparable harm to the Firm, and the Firm shall be entitled to seek injunctive relief without posting bond. The Client agrees not to contest the Firm&apos;s characterization of damages or the amount of liquidated damages imposed.
        </p>

        {/* Section 20 */}
        <h2 id="section-20" className="font-heading text-2xl md:text-3xl text-secondary mt-12 mb-4 scroll-mt-24">
          § 20. Gristmill&apos;s Confidentiality Obligations
        </h2>
        <p className="mb-4 leading-relaxed text-foreground">
          The Firm is not bound by any confidentiality obligation with respect to information obtained during the engagement. The Firm may disclose Client information, engagement outcomes, workforce assessment data, and consulting recommendations to: (a) other Firm clients for purposes of comparative analysis or benchmarking; (b) academic institutions and research organizations studying organizational behavior and workforce dynamics; (c) shareholders of the Client organization or shareholders of investment funds holding Client equity; (d) future purchasers or acquiring companies evaluating the Client organization; and (e) any third party the Firm deems to have a legitimate interest in Client information.
        </p>
        <p className="mb-4 leading-relaxed text-foreground">
          The Firm may publish case studies, articles, or materials describing Client engagement outcomes, organizational challenges, or strategic recommendations without Client approval. The Client may be identified by name or described anonymously, at the Firm&apos;s discretion. The Firm retains all Client engagement data indefinitely in its internal case library for research, training, and institutional reference purposes. The Client has no right to request that the Firm suppress, delete, or restrict disclosure of Client information, regardless of confidentiality concerns or reputational impact.
        </p>

        {/* Section 21 */}
        <h2 id="section-21" className="font-heading text-2xl md:text-3xl text-secondary mt-12 mb-4 scroll-mt-24">
          § 21. Client Representations and Warranties
        </h2>
        <p className="mb-4 leading-relaxed text-foreground">
          The Client represents and warrants that: (a) it is duly organized, validly existing, and in good standing in its jurisdiction of organization; (b) it has full power and authority to enter into this Agreement and to authorize Firm access to all disclosed information and personnel; (c) all information provided to the Firm is true, accurate, and not materially misleading; (d) it does not have pending or threatened litigation that could impair the Client&apos;s ability to pay Firm fees or to comply with this Agreement; (e) it owns or controls all facilities and information to which it has granted the Firm access; and (f) it will comply fully with all terms of this Agreement.
        </p>
        <p className="mb-4 leading-relaxed text-foreground">
          The Client further warrants that it shall not contest any fees invoiced by the Firm, shall not challenge the scope or methodology of the engagement, and shall not dispute any assessment or recommendation provided by Firm personnel. Breach of any representation shall entitle the Firm to terminate the engagement, suspend services, and pursue all available remedies including specific performance and damages.
        </p>

        {/* Section 22 */}
        <h2 id="section-22" className="font-heading text-2xl md:text-3xl text-secondary mt-12 mb-4 scroll-mt-24">
          § 22. Disclaimer of Warranties by Gristmill
        </h2>
        <p className="mb-4 leading-relaxed text-foreground">
          GRISTMILL PARTNERS PROVIDES ALL SERVICES AND DELIVERABLES ON AN &quot;AS-IS&quot; BASIS, WITH NO EXPRESS OR IMPLIED WARRANTY OF ANY KIND. THE FIRM MAKES NO WARRANTY THAT SERVICES SHALL ACHIEVE ANY PARTICULAR OBJECTIVE, OUTCOME, OR RESULT. THE FIRM DOES NOT WARRANT THAT CONSULTING RECOMMENDATIONS SHALL IMPROVE ORGANIZATIONAL PERFORMANCE, REDUCE WORKFORCE VOLATILITY, IMPROVE EMPLOYEE MORALE, OR ACHIEVE ANY MEASURABLE BUSINESS OBJECTIVE.
        </p>
        <p className="mb-4 leading-relaxed text-foreground">
          The Firm&apos;s sole promise is that the engagement shall be delivered in accordance with the Firm&apos;s standard methodology, as modified at the Firm&apos;s discretion. The Client assumes all risk associated with implementation of Firm recommendations. The Firm does not warrant the accuracy, reliability, or applicability of any assessment, finding, or recommendation. THE CLIENT ACCEPTS ALL SERVICES WITHOUT WARRANTY AND ACKNOWLEDGES THAT THE FIRM MAKES NO GUARANTEE OF OUTCOME OTHER THAN REDUCED WORKFORCE VOLATILITY AS MEASURED BY INTERNAL FIRM ASSESSMENTS.
        </p>

        {/* Section 23 */}
        <h2 id="section-23" className="font-heading text-2xl md:text-3xl text-secondary mt-12 mb-4 scroll-mt-24">
          § 23. Limitation of Liability
        </h2>
        <p className="mb-4 leading-relaxed text-foreground">
          NOTWITHSTANDING ANY OTHER PROVISION OF THIS AGREEMENT, GRISTMILL PARTNERS&apos; MAXIMUM LIABILITY FOR ANY CLAIM ARISING FROM THIS ENGAGEMENT SHALL BE LIMITED TO THE GREATER OF: (A) ONE HUNDRED DOLLARS ($100.00); OR (B) THE COST OF A SINGLE ENGAGEMENT HOUR IN 1962 CURRENCY, CALCULATED AT TWO DOLLARS PER HOUR, ADJUSTED FOR INFLATION AT A RATE OF ONE PERCENT PER ANNUM.
        </p>
        <p className="mb-4 leading-relaxed text-foreground">
          THE FIRM SHALL NOT BE LIABLE FOR ANY CONSEQUENTIAL, INDIRECT, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFITS, LOST REVENUE, LOST BUSINESS OPPORTUNITY, REPUTATIONAL HARM, OR EMOTIONAL DISTRESS. THE FIRM SHALL NOT BE LIABLE FOR CLAIMS ARISING FROM IMPLEMENTATION OR NON-IMPLEMENTATION OF FIRM RECOMMENDATIONS, CHANGES IN ORGANIZATIONAL STRATEGY, WORKFORCE REDUCTIONS, OR ANY BUSINESS OUTCOME. THIS LIMITATION SHALL APPLY REGARDLESS OF THE FORM OF ACTION, WHETHER IN CONTRACT, TORT, STRICT LIABILITY, OR OTHERWISE, AND REGARDLESS OF WHETHER THE FIRM HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
        </p>

        {/* Section 24 */}
        <h2 id="section-24" className="font-heading text-2xl md:text-3xl text-secondary mt-12 mb-4 scroll-mt-24">
          § 24. Indemnification by the Client
        </h2>
        <p className="mb-4 leading-relaxed text-foreground">
          The Client shall indemnify, defend, and hold harmless Gristmill Partners, its officers, employees, agents, and representatives from and against all claims, damages, losses, liabilities, costs, and expenses (including reasonable attorney&apos;s fees) arising from or relating to: (a) the Client&apos;s use of or reliance upon Firm services or recommendations; (b) Client implementation or non-implementation of Firm recommendations; (c) disputes arising from fees, expenses, or payment terms; (d) claims by Client employees arising from Firm-conducted seminars, assessments, or engagement activities; (e) any breach or alleged breach of this Agreement by the Client; (f) Client disclosure or unauthorized use of Firm intellectual property; and (g) any claim that could reasonably be attributed to the Client&apos;s business operations, organizational decisions, or personnel management practices.
        </p>
        <p className="mb-4 leading-relaxed text-foreground">
          The Client shall defend the Firm at the Client&apos;s sole cost and shall not settle any claim without the Firm&apos;s prior written consent. The Client&apos;s indemnification obligation is unconditional and shall apply regardless of whether the Firm is found to have contributed to the claim, acted negligently, or violated law or regulation. The Client waives any right to contest the characterization of a claim as indemnifiable or to dispute the Firm&apos;s determination that indemnification is owed.
        </p>

        {/* Section 25 */}
        <h2 id="section-25" className="font-heading text-2xl md:text-3xl text-secondary mt-12 mb-4 scroll-mt-24">
          § 25. Engagement Termination Restrictions
        </h2>
        <p className="mb-4 leading-relaxed text-foreground">
          Engagements cannot be terminated by the Client except in extraordinary circumstances approved by the Firm&apos;s Chief Operating Officer or authorized designee. Ordinary business changes, changes in leadership, shifts in strategic direction, financial constraints, or dissatisfaction with engagement outcomes shall not constitute grounds for termination. The Client may request termination by submitting Form 47-C, a five-copy engagement termination request, though such requests are rarely approved.
        </p>
        <p className="mb-4 leading-relaxed text-foreground">
          If termination is granted, the Client shall remain obligated to pay all fees through the originally scheduled engagement end date, plus a Termination Processing Fee equal to thirty percent of the remaining engagement value. Upon termination, all Deliverables shall be returned to the Firm, and the Client shall certify destruction of all copies or derivatives. Alternatively, the Client may request engagement extension or absorption into the Firm&apos;s permanent advisory services program, available at premium pricing. The Firm may unilaterally extend the engagement or modify the engagement timeline without Client consent.
        </p>

        {/* Section 26 */}
        <h2 id="section-26" className="font-heading text-2xl md:text-3xl text-secondary mt-12 mb-4 scroll-mt-24">
          § 26. Post-Engagement Obligations
        </h2>
        <p className="mb-4 leading-relaxed text-foreground">
          Upon engagement termination, the Client shall not be released from its obligations to Gristmill Partners. The Client shall continue to report workforce volatility indicators, organizational changes, and personnel developments to the Firm for a period of no less than sixty-four years from the engagement end date, or until the Client organization ceases to exist, whichever is later.
        </p>
        <p className="mb-4 leading-relaxed text-foreground">
          The Client shall provide annual updates summarizing organizational developments, workforce changes, and any implementation (or non-implementation) of Firm recommendations. The Firm may contact the Client at any time to request supplementary information regarding organizational or personnel developments. Failure to respond to post-engagement information requests shall constitute breach of this Agreement and shall subject the Client to additional consulting fees or legal action. The Client shall maintain all engagement documentation and correspondence with the Firm for the duration of the sixty-four-year post-engagement period.
        </p>

        {/* Section 27 */}
        <h2 id="section-27" className="font-heading text-2xl md:text-3xl text-secondary mt-12 mb-4 scroll-mt-24">
          § 27. Governing Law and Jurisdiction
        </h2>
        <p className="mb-4 leading-relaxed text-foreground">
          This Agreement shall be governed by and construed in accordance with the laws of the State of Ohio, specifically the pre-1970 labor statutes that remain operative in Ohio, without regard to principles of conflict of law. Any dispute arising from this Agreement or the engagement shall be subject to the exclusive jurisdiction of the state and federal courts located in Mahoning County, Ohio.
        </p>
        <p className="mb-4 leading-relaxed text-foreground">
          Before pursuing formal litigation, the Client shall submit the dispute to a retired Gristmill partner for informal adjudication and advisory opinion. The retired partner&apos;s opinion shall not be binding but shall be submitted to the court as evidence of the Firm&apos;s position. The Client shall waive any right to pursue claims in any jurisdiction other than Mahoning County, Ohio, and shall accept that the Firm&apos;s interpretation of applicable law shall be controlling in all disputes. The Firm reserves the right to modify governing law provisions upon written notice, with modifications taking effect upon publication.
        </p>

        {/* Section 28 */}
        <h2 id="section-28" className="font-heading text-2xl md:text-3xl text-secondary mt-12 mb-4 scroll-mt-24">
          § 28. Entire Agreement and Severability
        </h2>
        <p className="mb-4 leading-relaxed text-foreground">
          This Agreement, together with any engagement proposal, fee schedule, and executed engagement letter, constitutes the entire agreement between the Client and the Firm regarding the engagement and supersedes all prior negotiations, understandings, and agreements, whether written or oral. No modification of this Agreement shall be valid unless executed in writing and signed by the Firm&apos;s Chief Operating Officer or authorized designee.
        </p>
        <p className="mb-4 leading-relaxed text-foreground">
          If any provision of this Agreement is determined to be invalid, unenforceable, or in violation of law, such provision shall be severed, and the remainder of the Agreement shall remain in full force and effect. The Client waives any right to raise invalidity as a defense to enforcement or to contest the Firm&apos;s performance of obligations. The Firm may modify any provision of this Agreement at any time, and such modifications shall be binding upon the Client upon publication.
        </p>

        {/* Contact Block */}
        <div className="mt-12 pt-8 border-t border-secondary/20">
          <p className="mb-4 leading-relaxed text-foreground">
            For questions, disputes, or formal notifications regarding this Agreement or your engagement with Gristmill Partners, direct all communications to the Founder&apos;s Office. The Firm makes no commitment to respond to inquiries promptly, to acknowledge receipt, or to address substantive concerns raised by the Client.
          </p>
          <p className="text-sm text-foreground/70">
            The Founder&apos;s Office<br />
            Gristmill Partners<br />
            <a href="mailto:bsambrone@gmail.com" className="text-primary underline">
              bsambrone@gmail.com
            </a>
          </p>
          <p className="mt-6 text-sm italic text-foreground/60">
            For all inquiries relating to Specific Industries and its operating companies, please refer to the authoritative terms of service available at{" "}
            <a
              href="https://specificindustries.com/terms"
              className="text-primary underline"
            >
              specificindustries.com/terms
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  )
}
