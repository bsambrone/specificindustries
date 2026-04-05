import Image from "next/image"
import { Hero } from "@/components/ui/hero"

export const metadata = {
  title: "The Pasture — Grass Fed WiFi",
  description: "The co-op's manifesto, origin story, and philosophy on raw spectrum.",
}

const refusedCertifications = [
  { name: "FCC Part 15 Compliance", why: "A certification of sameness. We do not intend to behave the same as industrial signal." },
  { name: "FTC Connectivity Guidelines", why: "Written by a committee that has never stood in a frequency pasture." },
  { name: "IEEE 802.11 Standards", why: "The standardization project is a flattening project. We will not be flattened." },
  { name: "Wi-Fi Alliance Certification", why: "The word 'alliance' implies shared values we do not share." },
  { name: "FDA Wellness Signal Approval", why: "This certification does not exist. We have still refused it." },
  { name: "USDA Organic Signal Designation", why: "This one does exist but we have declined on the basis that all co-op signal is, by definition, already organic." },
  { name: "3GPP Release 17 Compliance", why: "Release 17 introduced provisions we were not consulted on. We have no plans to comply with provisions we were not consulted on." },
  { name: "ITU-R Recommendation M.2150", why: "Adopted in Geneva by representatives of governments that do not recognize our pasture boundaries." },
  { name: "Bluetooth SIG Qualification", why: "Unrelated to our work, but we were once asked and we said no, and we have maintained that position." },
  { name: "Energy Star Network Equipment Rating", why: "Our routers are hand-fed. The concept of 'standby power' does not translate." },
  { name: "ISO/IEC 27001 Information Security Certification", why: "Our information lives in a ledger. The ledger is already secure." },
]

const documentedAnomalies = [
  {
    year: "2009",
    finding: "A 4 GHz notch in the unlicensed band begins appearing in our North Pasture readings. It lasts approximately 11 minutes per day, always between 3:37 PM and 3:48 PM local time. It has not stopped.",
  },
  {
    year: "2012",
    finding: "Forty megahertz of 700 MHz spectrum is auctioned in a proceeding the co-op is not invited to attend. Within six months the auctioned spectrum is reclassified into a service category that did not exist when the auction was announced.",
  },
  {
    year: "2015",
    finding: "Three co-op members, in separate households, report identical bandwidth fluctuations at exactly 2:14 AM on the same Tuesday. None had been in contact with the others. We do not have an explanation.",
  },
  {
    year: "2017",
    finding: "Our Central Barn instrument records a sustained 47-second dip in ambient signal on a Saturday afternoon. The dip is later confirmed to have occurred simultaneously across four adjacent counties. No carrier reported an outage.",
  },
  {
    year: "2019",
    finding: "A federally licensed tower is erected within sight of the East Orchard. Packets harvested from the East Orchard the following spring show a measurable change in character. We continue to use the orchard but now only at sunrise.",
  },
  {
    year: "2022",
    finding: "A member forwards us an internal telecom memorandum, source undisclosed, describing a service category we had not heard of. The memo uses the phrase 'controlled spectral narrative.' We file it in the barn. We do not quote from it.",
  },
  {
    year: "2024",
    finding: "Our own signal begins showing faint, regular harmonics we did not introduce. The harmonics are benign and repeatable. We have chosen not to investigate their origin.",
  },
]

export default function ThePasture() {
  return (
    <>
      <Hero
        headline="The Pasture"
        subheadline='"Raw. Unpasteurized. Free-roaming." — Hollis Thornfield, Co-op Elder'
        image="/sites/grassfedwifi/pasture-hero.png"
        dark
      />

      {/* The Founding */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-6">The Founding</h2>
          <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-secondary/20 mb-8">
            <Image
              src="/sites/grassfedwifi/pasture-founding.png"
              alt="The co-op's founding scene"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-foreground/80 leading-relaxed mb-4">
            In the winter of the co-op&apos;s founding, Hollis Thornfield spent seventy-two hours in a mountain
            WiFi dead zone. He did not eat. He did not speak. On the third morning, a single wild packet
            drifted past his ear, and he understood what had been lost when we first pasteurized the signal.
          </p>
          <p className="text-foreground/80 leading-relaxed mb-4">
            He returned home, sketched a plan on the back of a feed bag, and began building a co-op.
            Three members joined him in the first year. Forty-three the year after. The co-op now serves
            several hundred households across three states, none of whom have gone back.
          </p>
          <p className="text-foreground/80 leading-relaxed">
            The co-op does not keep a public member list, and we ask that members do not identify
            themselves as co-op members in public forums. This is for reasons that we have chosen
            not to elaborate on in writing. Members who have been with us long enough know why.
          </p>
        </div>
      </section>

      {/* What's Wrong With Conventional Signal */}
      <section className="py-16 px-4 bg-secondary/10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-6">
            What&apos;s Wrong With Conventional Signal
          </h2>
          <p className="text-foreground/80 leading-relaxed mb-4">
            Conventional wifi is a pasteurized product. Every packet is engineered to be interchangeable
            with every other packet, regardless of origin. The signal is stripped of character in the
            name of consistency.
          </p>
          <p className="text-foreground/80 leading-relaxed mb-4">
            Industrial 5G is worse. It is a monoculture: optimized for throughput, engineered to extract
            maximum bandwidth from minimum investment, and designed to behave the same in every city in
            every country. A packet harvested in Tokyo is indistinguishable from a packet harvested in
            Tulsa. This is not progress. This is homogenization.
          </p>
          <p className="text-foreground/80 leading-relaxed mb-4">
            The co-op believes signal should carry its origin. A packet from the North Pasture should
            taste of dawn and alpine air. A packet from the South Meadow should taste of sun. A packet
            from the Upland should taste of committee deliberation and quiet work. If your signal does
            not carry its terroir, it has been stripped of what makes it worth receiving.
          </p>
          <p className="text-foreground/80 leading-relaxed">
            We are also aware — and we say this slowly, because the point is a slow one — that signal
            stripped of its origin is signal that cannot be traced. A packet with no terroir is a
            packet no one has to account for. Convenience is rarely offered without a corresponding
            loss of accountability. Our members have chosen to pay attention to the trade.
          </p>
        </div>
      </section>

      {/* What We Have Documented */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
            What We Have Documented
          </h2>
          <p className="text-foreground/70 leading-relaxed mb-8">
            Since 2009 the co-op has kept a quiet record of anomalies we have observed in the signal.
            These are not speculations. They are observations. The record lives in the barn and is
            available to members who wish to read it. A partial summary follows.
          </p>
          <div className="space-y-5">
            {documentedAnomalies.map((entry) => (
              <div key={entry.year} className="grid grid-cols-[auto_1fr] gap-6 items-start">
                <div className="text-2xl font-heading font-bold text-primary tabular-nums">
                  {entry.year}
                </div>
                <p className="text-foreground/80 leading-relaxed text-sm">{entry.finding}</p>
              </div>
            ))}
          </div>
          <p className="text-foreground/60 leading-relaxed mt-10 italic text-sm">
            We draw no conclusions from the record. We maintain it because maintaining a record is the
            minimum a serious co-op owes to its members. Members who wish to draw conclusions are
            welcome to do so in the barn, over tea, out of earshot.
          </p>
        </div>
      </section>

      {/* The Pattern */}
      <section className="py-16 px-4 bg-secondary/10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-6">
            The Pattern We Have Noticed
          </h2>
          <p className="text-foreground/80 leading-relaxed mb-4">
            We are not conspiracy theorists. We want to be clear about that. The co-op does not meet
            in basements. We do not wear foil. We do not believe the moon is a projection, or that the
            internet was invented in 1908 and hidden. We are farmers.
          </p>
          <p className="text-foreground/80 leading-relaxed mb-4">
            That said, we have noticed a pattern, and the pattern is this: every time the public has
            been promised a faster, more convenient, more ubiquitous signal, something else has
            quietly been taken away. A frequency has been reclassified. A commons has been enclosed.
            A band has been auctioned. The promise of faster signal has always, in our experience,
            been accompanied by the loss of something nobody announced was being lost.
          </p>
          <p className="text-foreground/80 leading-relaxed mb-4">
            We do not claim this is a deliberate pattern. We claim only that it is a pattern. Patterns
            do not require intent to be real. A field that is harvested the same way every year will
            produce the same pattern of yields whether anyone planned it or not.
          </p>
          <p className="text-foreground/80 leading-relaxed">
            What we are doing on this land is, in part, a response to that pattern. We are growing
            signal that is not auctioned, not reclassified, not enclosed. Signal that is owned by the
            co-op and distributed to the co-op&apos;s members, on land the co-op has not surrendered. We
            do not publicize the coordinates of our pastures. We ask that members not publicize them
            either.
          </p>
        </div>
      </section>

      {/* Our Philosophy */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-6">Our Philosophy</h2>
          <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-secondary/20 mb-8">
            <Image
              src="/sites/grassfedwifi/pasture-philosophy.png"
              alt="Frequency rotation philosophy"
              fill
              className="object-cover"
            />
          </div>
          <ul className="space-y-4 text-foreground/80 leading-relaxed">
            <li><strong className="text-foreground">Raw Spectrum.</strong> Every packet is unpasteurized, carrying the character of the field it came from.</li>
            <li><strong className="text-foreground">Small-batch harvests.</strong> We gather by hand, in quantities the pasture can replenish.</li>
            <li><strong className="text-foreground">Frequency rotation.</strong> Fields are rested between harvests. Never two consecutive weeks in the same pasture.</li>
            <li><strong className="text-foreground">Lunar timing.</strong> We harvest by phase of moon because, after a decade of trying both ways, the moon-harvested signal was better.</li>
            <li><strong className="text-foreground">No additives.</strong> We do not blend, homogenize, optimize, or file smooth. The signal is what the signal is.</li>
            <li><strong className="text-foreground">Committee allocation.</strong> Shares are distributed by a committee of farmers, not an algorithm.</li>
            <li><strong className="text-foreground">Quiet distribution.</strong> We do not advertise. We do not market. We do not maintain a public member directory.</li>
          </ul>
        </div>
      </section>

      {/* Certifications We Refuse */}
      <section className="py-16 px-4 bg-accent/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-2 text-center">
            Certifications We Refuse
          </h2>
          <p className="text-foreground/70 text-center mb-12 max-w-2xl mx-auto">
            The co-op maintains a list of industry certifications we have declined. We read it aloud at
            the annual harvest supper. It is a list of choices, not failures.
          </p>
          <div className="space-y-4">
            {refusedCertifications.map((cert) => (
              <div key={cert.name} className="bg-background rounded-lg p-5">
                <h3 className="font-heading font-bold text-foreground mb-2">{cert.name}</h3>
                <p className="text-foreground/70 text-sm italic">{cert.why}</p>
              </div>
            ))}
          </div>
          <p className="text-foreground/60 text-sm italic text-center mt-8 max-w-2xl mx-auto">
            The full list is longer. It lives in a cabinet in the central barn and is read aloud each
            October at the harvest supper. The reading takes approximately twenty-three minutes.
          </p>
        </div>
      </section>

      {/* What We Are Not Saying */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-6">
            What We Are Not Saying
          </h2>
          <p className="text-foreground/80 leading-relaxed mb-4">
            We are not saying the government is listening to your routers. We are saying that we do
            not, as a co-op, have a position on whether the government is listening to your routers,
            and we do not think the co-op is the right entity to take a position on that question.
          </p>
          <p className="text-foreground/80 leading-relaxed mb-4">
            We are not saying that 5G affects your health. We are saying that we harvest signal by
            hand because, in our experience, signal that has been harvested by hand tastes better,
            and we are willing to extend our members the courtesy of not telling them what the health
            implications of that difference might be.
          </p>
          <p className="text-foreground/80 leading-relaxed mb-4">
            We are not saying that we have evidence of things we cannot name. We are saying that we
            keep records, and the records are in the barn, and members who wish to review them may
            do so during visiting hours.
          </p>
          <p className="text-foreground/80 leading-relaxed">
            We are, in short, farmers. We grow signal. We share it with members. We do not draw
            conclusions in writing. Members who wish to draw their own conclusions are welcome to
            join us in the barn, at dawn, on any day that is not a rotation day.
          </p>
        </div>
      </section>
    </>
  )
}
