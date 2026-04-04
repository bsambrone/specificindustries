export const metadata = {
  title: "Terms of Service — Strategic Void Consulting",
  description:
    "Our terms of service. By reading this, you have already agreed to them.",
}

export default async function TermsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-secondary text-foreground py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-6 leading-tight">
            Terms of Service
          </h1>
          <p className="text-xl text-foreground/70 leading-relaxed">
            Strategic Void Consulting — Terms of Service Alignment Framework v1.0
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto space-y-12">

          {/* Authority callout */}
          <div className="bg-secondary/20 border border-primary/20 px-6 py-5">
            <p className="text-sm text-foreground/80 leading-relaxed">
              This site is operated by Specific Industries. The authoritative terms of service
              for all Specific Industries properties is available at{" "}
              <a
                href="https://specificindustries.com/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline hover:text-primary transition-colors"
              >
                specificindustries.com/terms
              </a>
              .
            </p>
          </div>

          {/* Effective date */}
          <p className="text-sm text-foreground/40 italic">
            Effective: Retroactively, from a date we&apos;ll determine later
          </p>

          {/* Section 1 */}
          <div>
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">
              1. Acceptance of Terms
            </h2>
            <div className="space-y-4 text-foreground/70 leading-relaxed">
              <p>
                By existing in the general vicinity of this website, you agree to these terms,
                all future revisions, and any terms we haven&apos;t written yet but intend to.
                Agreement is established at the moment your device first requested any resource
                from our servers, which occurred before you read this sentence.
              </p>
              <p>
                You also agree to these terms on behalf of any organization you represent,
                have represented, or may represent in the future. If you are unsure whether
                you represent an organization, you agree on behalf of all organizations you
                might represent, as a precautionary measure. We believe this is a reasonable
                interpretation of implied authority.
              </p>
              <p>
                If you do not agree to these terms, you may not use this site. You may also
                not not-use this site, as passive non-engagement constitutes a continued data
                relationship under our analytics framework. The cleanest option is to agree.
                Most people find it easier that way.
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">
              2. Definitions
            </h2>
            <div className="space-y-4 text-foreground/70 leading-relaxed">
              <p>
                &ldquo;Service&rdquo; means whatever we are providing at the time of the
                interaction in question, including things we were providing, things we have
                stopped providing, and things we intend to provide pending a roadmap
                conversation we have not yet scheduled.
              </p>
              <p>
                &ldquo;You&rdquo; means you, your organization, anyone who has ever worked
                there, anyone who may work there in the future, and any entity that could
                reasonably be said to act on your behalf in a professional or quasi-professional
                capacity. &ldquo;We&rdquo; means Strategic Void Consulting and all subsidiaries,
                parent companies, affiliated entities, and initiatives that have been announced
                but not yet formally incorporated.
              </p>
              <p>
                &ldquo;Agreement&rdquo; means this document plus any documents referenced in
                this document, plus any documents those documents reference, plus any verbal
                understandings reached during any call with a member of our team, even
                informally. &ldquo;Informal&rdquo; means not formal. &ldquo;Formal&rdquo;
                is left intentionally undefined in order to preserve flexibility.
              </p>
            </div>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">
              3. The Service
            </h2>
            <div className="space-y-4 text-foreground/70 leading-relaxed">
              <p>
                Strategic Void provides alignment solutions, which may include, but are not
                limited to, things we&apos;ve built, things we&apos;re building, and things
                we&apos;ve told investors we&apos;ll build. The scope of the Service is
                intentionally defined at the level of aspiration rather than specification,
                which allows us to remain agile in response to emerging organizational needs.
              </p>
              <p>
                The Service is delivered through a combination of proprietary frameworks,
                facilitated workshops, asynchronous alignment artifacts, and what our delivery
                team refers to as &ldquo;ambient strategic presence,&rdquo; a category of
                engagement that is billed at our standard advisory rate and described in greater
                detail in our Engagement Scope Clarification Addendum, which is available
                upon written request.
              </p>
              <p>
                We reserve the right to modify, discontinue, or fundamentally redefine the
                Service at any time without notice. If the modified Service no longer resembles
                the Service you engaged us to provide, this constitutes an evolution of the
                engagement, not a breach, and will be documented as a scope enhancement in
                your account record.
              </p>
            </div>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">
              4. Your Account
            </h2>
            <div className="space-y-4 text-foreground/70 leading-relaxed">
              <p>
                Your account belongs to you in the same way your desk at work belongs to
                you — technically, until we decide otherwise. You are responsible for
                maintaining the confidentiality of your credentials, the accuracy of your
                account information, and the behavior of anyone who accesses the Service
                using your account, including former employees, current employees, and
                contractors who were given access &ldquo;temporarily.&rdquo;
              </p>
              <p>
                We reserve the right to suspend or terminate your account at our discretion.
                Grounds for suspension include, but are not limited to, violation of these
                terms, suspected violation of these terms, behaviors that are not specifically
                prohibited by these terms but that we find inconsistent with the spirit of
                the platform, and organizational misalignment as assessed by our Client
                Alignment Review Committee.
              </p>
            </div>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">
              5. Acceptable Use
            </h2>
            <div className="space-y-4 text-foreground/70 leading-relaxed">
              <p>
                You agree not to use the Service in any manner that is harmful, disruptive,
                or inconsistent with our platform values. Prohibited activities include but
                are not limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground/70 leading-relaxed pl-4">
                <li>Achieving measurable outcomes using our tools without a corresponding alignment workshop</li>
                <li>Reading this document in its entirety with critical intent</li>
                <li>Using our frameworks to produce deliverables that are later found to be actionable</li>
                <li>Asking our team to define &ldquo;alignment&rdquo; in concrete terms during a billable engagement</li>
                <li>Benchmarking our services against outcomes in ways that produce unfavorable comparisons</li>
                <li>Sharing our proprietary frameworks outside your organization without adding sufficient vagueness</li>
                <li>Requesting a refund on the grounds that the engagement produced no discernible impact</li>
                <li>Reverse engineering the C.H.A.O.S. Framework™ by reading our whitepapers in sequence</li>
              </ul>
              <p>
                We reserve the right to expand this list at any time. Additions are retroactively
                applicable to the extent permitted by our preferred governing jurisdiction.
              </p>
            </div>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">
              6. Intellectual Property
            </h2>
            <div className="space-y-4 text-foreground/70 leading-relaxed">
              <p>
                All content on this site is the intellectual property of Strategic Void
                Consulting™. This includes our frameworks™, our methodology™, our case
                study titles™, our approach to titling case studies™, the specific fonts
                we use™, and the general aesthetic of corporate seriousness we have
                cultivated across our brand touchpoints™.
              </p>
              <p>
                Everything is trademarked. Even this paragraph. Especially the ™ symbol™.
                The trademark on the ™ symbol is pending™, but we consider pending to be
                a form of active protection and will defend it accordingly™.
              </p>
              <p>
                You may not reproduce, distribute, modify, or build upon any Strategic Void
                intellectual property without written permission from our Legal Alignment
                Team. Written permission will be granted in the form of a Strategic Void
                IP License Agreement, which is itself proprietary and may not be reproduced.
                We recognize this creates a structural challenge and consider it intentional.
              </p>
            </div>
          </div>

          {/* Section 7 */}
          <div>
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">
              7. The C.H.A.O.S. Framework™ License
            </h2>
            <div className="space-y-4 text-foreground/70 leading-relaxed">
              <p>
                Upon engagement, you receive a non-exclusive, non-transferable, revocable
                license to apply the C.H.A.O.S. Framework™ within your organization.
                You do not own the Framework. You do not own an instance of the Framework.
                You own a licensed relationship with the Framework, which the Framework
                reciprocally acknowledges through your continued enrollment.
              </p>
              <p>
                The Framework licenses you back. This is not a metaphor. As part of your
                engagement, Strategic Void retains a perpetual, royalty-free license to
                use anonymized descriptions of your organizational challenges, transformation
                journey, and any phrases coined by your leadership team during our workshops,
                for purposes including but not limited to case studies, thought leadership
                content, and conference presentations.
              </p>
              <p>
                If the Framework, when applied at your organization, produces a new variant
                or derivative of the Framework, that variant belongs to Strategic Void.
                We call this outcome a &ldquo;Framework Evolution Event&rdquo; and
                celebrate it internally with a brief announcement in our weekly all-hands.
                Your organization will be credited as a &ldquo;catalyst client&rdquo;
                in the relevant release notes, unless you request otherwise, in which
                case you will be credited anonymously.
              </p>
            </div>
          </div>

          {/* Section 8 */}
          <div>
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">
              8. Service Level Agreements
            </h2>
            <div className="space-y-4 text-foreground/70 leading-relaxed">
              <p>
                Strategic Void commits to 99.7% alignment uptime, defined as the percentage
                of time our servers are aligned with the concept of being online. The
                remaining 0.3% constitutes planned strategic downtime, during which the
                platform is engaged in deep reflection. Planned strategic downtime is not
                subject to service credits.
              </p>
              <p>
                Response time SLAs for support requests are tiered by client level: Platinum
                clients receive a response within 2 business days; Gold clients within 5;
                Silver clients within 10; and Standard clients receive a response within a
                timeframe that reflects our current support queue depth and the complexity
                of their inquiry, as assessed by our Client Success team. All tiers are
                subject to our standard response time modifier of plus or minus whatever
                is happening internally that week.
              </p>
              <p>
                Deliverable timelines are governed by the Statement of Work. If the Statement
                of Work does not specify a timeline, timelines are &ldquo;mutually agreed
                upon,&rdquo; which in practice means they are proposed by us, accepted by you,
                and subsequently renegotiated through a process we refer to as Scope
                Evolution Management.
              </p>
            </div>
          </div>

          {/* Section 9 */}
          <div>
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">
              9. Limitation of Liability
            </h2>
            <div className="space-y-4 text-foreground/70 leading-relaxed">
              <p>
                Under no circumstances shall Strategic Void be held responsible for outcomes,
                non-outcomes, quasi-outcomes, or the philosophical implications of any work
                performed or not performed. This limitation applies regardless of whether
                Strategic Void was informed of the possibility of such outcomes, was the
                proximate cause of such outcomes, or expressly guaranteed the opposite
                of such outcomes in a signed proposal document.
              </p>
              <p>
                Our total liability in connection with any engagement shall not exceed the
                lesser of: (a) the fees paid for the specific deliverable in question, or
                (b) an amount that we determine to be proportionate to the nature of the
                claim following an internal Liability Calibration Review. The Liability
                Calibration Review is conducted by a committee that reports to our General
                Counsel and is convened at our discretion.
              </p>
              <p>
                We are not liable for indirect, incidental, consequential, strategic,
                reputational, existential, or alignment-related damages. We recognize that
                the last three categories are uncommon in standard limitation clauses.
                Our Legal Alignment Team added them after an incident in 2023 that we are
                not at liberty to discuss and that is now resolved.
              </p>
            </div>
          </div>

          {/* Section 10 */}
          <div>
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">
              10. Indemnification
            </h2>
            <div className="space-y-4 text-foreground/70 leading-relaxed">
              <p>
                You agree to indemnify, defend, and hold harmless Strategic Void Consulting,
                its officers, directors, employees, contractors, and any entity that has
                ever appeared on a Strategic Void org chart in any capacity, from and against
                any claims, damages, losses, or expenses arising out of your use of the
                Service, your violation of these terms, or your organization&apos;s general
                business activities during the period of your engagement with us.
              </p>
              <p>
                We indemnify ourselves through a robust internal risk management program
                that is reviewed quarterly and presented to our Board as a standing agenda
                item. The program is comprehensive and we are quite confident in it.
              </p>
              <p>
                Nobody indemnifies you. This is standard. We have checked with three outside
                counsel and they confirm this is how indemnification works. We pass along
                their confirmation without further comment.
              </p>
            </div>
          </div>

          {/* Section 11 */}
          <div>
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">
              11. Confidentiality
            </h2>
            <div className="space-y-4 text-foreground/70 leading-relaxed">
              <p>
                All information shared during an engagement is confidential. This includes
                our proprietary methodologies, our internal processes, our pricing, our
                pricing rationale, our pricing philosophy, the names of our other clients,
                any details about why previous clients ended their engagements, and anything
                our consultants say on calls that later proves to be inaccurate.
              </p>
              <p>
                These terms are themselves confidential. By reading them, you may have already
                incurred a confidentiality obligation. If you are reading these terms as part
                of a due diligence process, please consult your legal counsel regarding whether
                the act of reading a publicly accessible webpage can constitute a confidential
                disclosure. Our Legal Alignment Team has an opinion on this but we have been
                advised not to share it here.
              </p>
              <p>
                Your confidential information is protected under the mutual NDA you signed
                at engagement initiation. If you did not sign a mutual NDA, we consider the
                act of engaging us to constitute constructive agreement to NDA terms, which
                are available in Exhibit F of our Master Services Agreement. Exhibit F is
                also confidential.
              </p>
            </div>
          </div>

          {/* Section 12 */}
          <div>
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">
              12. Termination
            </h2>
            <div className="space-y-4 text-foreground/70 leading-relaxed">
              <p>
                Either party may terminate this Agreement at any time by submitting a formal
                Disalignment Request through channels we have not yet established. The
                Disalignment Request process is currently in design, with a working group
                meeting quarterly to develop the submission workflow, escalation path, and
                associated documentation templates. We anticipate the process will be live
                in a future quarter.
              </p>
              <p>
                In the interim, termination requests should be submitted via email to your
                dedicated Relationship Manager. Your Relationship Manager will schedule a
                Termination Alignment Call to explore the underlying causes of the
                disalignment and determine whether a remediation pathway exists before
                proceeding to formal termination. The Termination Alignment Call is billed
                at our standard advisory rate.
              </p>
              <p>
                Upon termination, sections 6, 7, 9, 10, 11, and 13 through 18 of these
                terms survive indefinitely. Section 8 survives for 24 months. Section 5
                survives until we determine it no longer needs to. This agreement will
                not let you go easily, is what we are saying.
              </p>
            </div>
          </div>

          {/* Section 13 */}
          <div>
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">
              13. Dispute Resolution
            </h2>
            <div className="space-y-4 text-foreground/70 leading-relaxed">
              <p>
                In the event of a dispute, both parties agree to first attempt resolution
                through Mandatory Collaborative Alignment Sessions — a structured dialogue
                process in which each party presents their perspective to a mutually
                agreed-upon Strategic Void facilitator, who synthesizes the perspectives
                into an Alignment Gap Analysis and proposes a remediation roadmap.
              </p>
              <p>
                Mandatory Collaborative Alignment Sessions are, as their name suggests,
                mandatory. They are also what the legal community refers to as mediation,
                but with a proprietary name and a facilitator who works for us. We believe
                the reframing adds value. If the Sessions do not resolve the dispute,
                the parties may proceed to binding arbitration, which we call a
                &ldquo;Definitive Alignment Determination.&rdquo;
              </p>
              <p>
                All Mandatory Collaborative Alignment Sessions are held at our offices or
                via a video conferencing platform of our choosing. Travel expenses for
                in-person sessions are borne by the party who initiated the dispute.
                This is not intended to discourage dispute initiation. It is simply
                a cost-allocation decision that happens to have that effect.
              </p>
            </div>
          </div>

          {/* Section 14 */}
          <div>
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">
              14. Force Majeure
            </h2>
            <div className="space-y-4 text-foreground/70 leading-relaxed">
              <p>
                Strategic Void shall not be liable for any delay or failure to perform
                resulting from causes beyond our reasonable control, including but not
                limited to: acts of God, acts of alignment, acts of Congress, labor
                disputes, pandemics, infrastructure failures, supply chain disruptions,
                organizational energy shifts, collective strategic uncertainty, and
                Mercury being in retrograde.
              </p>
              <p>
                We include Mercury retrograde as a named force majeure event not as a
                statement of belief but as a practical acknowledgment that several members
                of our Senior Leadership Team have cited it in project delay communications
                and our Legal Alignment Team determined it was tidier to include it here
                than to have a recurring conversation about whether it qualifies.
              </p>
              <p>
                In the event of a declared force majeure, timelines are suspended, deliverable
                commitments are paused, and retainer fees continue uninterrupted. This
                last point is not a mistake. It reflects our philosophy that relationship
                continuity has intrinsic value independent of delivery activity.
              </p>
            </div>
          </div>

          {/* Section 15 */}
          <div>
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">
              15. Governing Law
            </h2>
            <div className="space-y-4 text-foreground/70 leading-relaxed">
              <p>
                This Agreement is governed by the laws of whichever jurisdiction is most
                convenient for us at the time of the dispute. We have prepared for this
                eventuality by maintaining registered entities in four jurisdictions, each
                of which offers a meaningfully different legal environment for commercial
                disputes. Our Legal Alignment Team will identify the appropriate entity
                at the time the dispute arises.
              </p>
              <p>
                You irrevocably consent to the jurisdiction of whatever court or arbitral
                body we identify as appropriate, waive any objection to venue, and
                acknowledge that this waiver was knowing and voluntary even if you did not
                read this section, which our analytics suggest you may not have. The act
                of not reading it is interpreted as constructive consent under our
                standard engagement terms.
              </p>
            </div>
          </div>

          {/* Section 16 */}
          <div>
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">
              16. Severability
            </h2>
            <div className="space-y-4 text-foreground/70 leading-relaxed">
              <p>
                If any provision of this Agreement is found to be invalid, illegal, or
                unenforceable, that provision will be modified to the minimum extent
                necessary to make it valid, legal, and enforceable, and the remainder of
                the Agreement will continue in full force and effect. We consider this
                a feature, not a risk — the Agreement is self-healing.
              </p>
              <p>
                If all provisions are simultaneously found to be invalid, illegal, or
                unenforceable — a scenario our outside counsel describes as &ldquo;theoretically
                possible but implying a catastrophic judicial event&rdquo; — we will schedule
                a meeting to determine next steps. The meeting will be facilitated using
                the C.H.A.O.S. Framework™. We find this fitting.
              </p>
            </div>
          </div>

          {/* Section 17 */}
          <div>
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">
              17. Amendments
            </h2>
            <div className="space-y-4 text-foreground/70 leading-relaxed">
              <p>
                We may amend these terms at any time by posting an updated version to this
                page. We will update the effective date, which is listed above as retroactive
                and will remain so regardless of when the amendment occurs, as we find
                retroactive effectiveness to be a cleaner posture from a compliance standpoint.
              </p>
              <p>
                Amendments take effect upon posting. Your continued use of the Service
                following an amendment constitutes acceptance. Your non-use of the Service
                following an amendment also constitutes acceptance, as the relationship
                between our entities persists beyond individual sessions. We will not
                notify you of amendments unless required by law, and in jurisdictions
                where notification is required, we will fulfill the requirement in the
                most efficient manner available.
              </p>
            </div>
          </div>

          {/* Section 18 */}
          <div>
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">
              18. Entire Agreement
            </h2>
            <div className="space-y-4 text-foreground/70 leading-relaxed">
              <p>
                This Agreement constitutes the entire understanding between us, unless we
                have forgotten something, in which case that is also binding. It supersedes
                all prior agreements, understandings, representations, and warranties,
                except those that were not superseded for reasons that will become apparent
                if they become relevant, at which point they will be clearly identified
                as applicable.
              </p>
              <p>
                If there is a conflict between this Agreement and any other document in our
                engagement ecosystem, the document most favorable to Strategic Void shall
                control. If it is unclear which document is most favorable, our Legal
                Alignment Team will assess and issue a determination within thirty days.
                The determination is itself binding and subject to these terms.
              </p>
              <p>
                We want to be transparent: we wrote these terms. They reflect our interests.
                We made them available to you because transparency is a form of alignment.
                You have now read them, which we consider a milestone in our relationship
                and which will be noted in your account record as a positive engagement signal.
              </p>
            </div>
          </div>

          {/* Closing note */}
          <div className="border-t border-primary/10 pt-8">
            <p className="text-sm text-foreground/40 italic text-center">
              Strategic Void Consulting Terms of Service Alignment Framework v1.0. This document
              supersedes all oral agreements, implied understandings, and reasonable expectations.
              By reaching this sentence, you have demonstrated a level of engagement that we
              find encouraging and have flagged for our Client Development team.
            </p>
          </div>

        </div>
      </section>
    </div>
  )
}
