import Image from "next/image"
import { FaqAccordion } from "@/components/ui/faq-accordion"
import { InfomercialBand } from "../components/InfomercialBand"

export const metadata = {
  title: "How to Play — Mousetrap Jenga",
  description: "Learn to play Mousetrap Jenga in just 4 easy steps!",
}

const steps = [
  {
    n: "1",
    title: "SET UP YOUR TOWER!",
    body: "Stack 18 armed mouse traps in perpendicular layers of three, just like regular Jenga! (Yes, armed. That's the whole thing.)",
    image: "/sites/mousetrapjenga/step-1-setup.png",
  },
  {
    n: "2",
    title: "ARM THE TRAPS!",
    body: "If you haven't already, carefully arm each trap. Have a friend nearby to assist! A second set of hands is INVALUABLE during this crucial phase.",
    image: "/sites/mousetrapjenga/step-2-arm.png",
  },
  {
    n: "3",
    title: "TAKE TURNS PULLING!",
    body: "Players take turns removing one trap from anywhere below the top layer and placing it carefully on top. No rushing! Slow and steady wins the game. (And keeps the digits.)",
    image: "/sites/mousetrapjenga/step-3-pull.png",
  },
  {
    n: "4",
    title: "CROWN YOUR CHAMPION!",
    body: "The last player with the most remaining fingers wins! It's that simple! Winners should be congratulated with a firm handshake (use the other hand if necessary).",
    image: "/sites/mousetrapjenga/step-4-crown.png",
  },
]

const faqs = [
  {
    question: "What if a trap snaps on me?",
    answer: "That's part of the game! Shake it off and keep playing! Experienced players recommend taking a brief break to apply pressure, then returning to the table with renewed focus.",
  },
  {
    question: "Can I wear gloves?",
    answer: "Gloves are strictly prohibited in tournament play. The game is designed to be experienced FIRSTHAND, and anything that reduces tactile feedback reduces the authentic Mousetrap Jenga experience.",
  },
  {
    question: "Is this safe for children?",
    answer: "Ages 8 and up! Adult supervision recommended. We recommend starting children on the Junior Snap Edition before graduating to Classic Mousetrap Jenga around age 10 or 11.",
  },
  {
    question: "Is this legal?",
    answer: "Mousetrap Jenga is legal in most states! Check your local regulations. (We are currently restricted in Minnesota, New Jersey, and parts of Oregon — we are working on it.)",
  },
  {
    question: "What's the record for consecutive turns without injury?",
    answer: "Four. It was Morty Abernathy, 1987. It has never been beaten. Morty refuses to discuss how the attempt ended.",
  },
  {
    question: "Can I play alone?",
    answer: "Yes, but it's more fun with friends! Solo play is technically 'practice' and doesn't count toward your tournament record.",
  },
]

export default function MousetrapJengaHowToPlay() {
  return (
    <>
      <InfomercialBand bgColor="primary" textColor="light" verticalPadding="lg" bordered={false}>
        <div className="text-center">
          <h1 className="font-heading text-5xl md:text-6xl text-[#FFD23F] drop-shadow-[4px_4px_0_#1A1F4C]">LEARN TO PLAY!</h1>
          <p className="text-xl md:text-2xl mt-4 text-[#FFF6E8]/90">In just 4 easy steps!</p>
        </div>
      </InfomercialBand>

      <InfomercialBand bgColor="background" verticalPadding="lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {steps.map((step) => (
            <article
              key={step.n}
              className="bg-[#FFF6E8] border-4 border-[#1A1F4C] shadow-[6px_6px_0_0_#1A1F4C]"
            >
              <div className="relative aspect-[4/3] border-b-4 border-[#1A1F4C] overflow-hidden bg-[#F5E8CE]">
                <Image src={step.image} alt={`Step ${step.n}: ${step.title}`} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
              <div className="p-6">
                <div className="flex items-baseline gap-4 mb-3">
                  <span className="font-heading text-6xl text-[#D4281F] leading-none">{step.n}</span>
                  <h2 className="font-heading text-2xl text-[#1A1F4C]">{step.title}</h2>
                </div>
                <p className="text-[#1A1F4C]/80">{step.body}</p>
              </div>
            </article>
          ))}
        </div>
      </InfomercialBand>

      {/* Rules callout */}
      <InfomercialBand bgColor="secondary" verticalPadding="md">
        <div className="max-w-3xl mx-auto border-4 border-[#1A1F4C] bg-[#FFF6E8] p-6 shadow-[6px_6px_0_0_#1A1F4C]">
          <h2 className="font-heading text-2xl text-[#D4281F] mb-3 text-center">Rules &amp; Scoring</h2>
          <ul className="space-y-2 text-[#1A1F4C]/90">
            <li><strong>Scoring:</strong> Points are awarded for successful trap removals. Injuries do NOT affect scoring. (They affect many other things, but not scoring.)</li>
            <li><strong>Winning:</strong> The player with the highest score at the end of the game wins. Ties are broken by finger count.</li>
            <li><strong>Fouls:</strong> Flinching, hesitating, or attempting to &ldquo;disarm&rdquo; traps mid-game is a foul and results in a 5-point penalty.</li>
            <li><strong>Game length:</strong> Classic games last 15-30 minutes. Bear Trap Tournament matches can go longer. Consult your local emergency room&apos;s hours before starting.</li>
          </ul>
        </div>
      </InfomercialBand>

      {/* FAQ */}
      <InfomercialBand bgColor="background" verticalPadding="lg">
        <h2 className="font-heading text-4xl text-[#D4281F] text-center mb-10">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          <FaqAccordion items={faqs} />
        </div>
      </InfomercialBand>
    </>
  )
}
