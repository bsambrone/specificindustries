import { getPortrait } from "@/data/testimonial-portraits"
import { InfomercialBand } from "../components/InfomercialBand"
import { TradingCard } from "../components/TradingCard"

export const metadata = {
  title: "Hall of Fame — Mousetrap Jenga",
  description: "The legends of the Mousetrap Jenga championship circuit.",
}

const foundingEra = [
  {
    name: "Harold Pemberton",
    nickname: "Hammerhand",
    hometown: "Cedar Rapids, IA",
    portrait: "/sites/mousetrapjenga/champion-pemberton.png",
    championships: 47,
    digitsRemaining: 8,
    famousFor: "The Founder Himself. Invented the game in 1978 and has played every sanctioned tournament since. Still competes in the over-50 division.",
  },
  {
    name: "Delbert Wickham",
    nickname: "Lefty",
    hometown: "Scranton, PA",
    portrait: "/sites/mousetrapjenga/champion-wickham.png",
    championships: 31,
    digitsRemaining: 6,
    famousFor: "Known for his daring left-hand reaches. Earned his nickname in 1984 after the switch became non-optional.",
  },
  {
    name: "Morty Abernathy",
    nickname: "Jumpy",
    hometown: "Des Moines, IA",
    portrait: "/sites/mousetrapjenga/champion-abernathy.png",
    championships: 28,
    digitsRemaining: 7,
    famousFor: "Inventor of the Abernathy Hesitation, a technique still used by elite players today. Holds the 1987 record that has never been broken.",
  },
  {
    name: "Eugene Fink",
    nickname: "Steady Eugene",
    hometown: "Dubuque, IA",
    portrait: "/sites/mousetrapjenga/champion-fink.png",
    championships: 22,
    digitsRemaining: 9,
    famousFor: "The safest player in the Hall. Has never needed a stitch. His bandage discipline is legendary and widely studied.",
  },
]

const contemporaryEra = [
  {
    nickname: "The Wrecker",
    portraitSlug: "ryan-ashford",
    hometown: "Omaha, NE",
    championships: 14,
    digitsRemaining: 5,
    famousFor: "Famous for calling his shot before every attempt. Has successfully called 19 of his 38 career finger losses.",
  },
  {
    nickname: "The Grinner",
    portraitSlug: "simone-archer",
    hometown: "Kansas City, MO",
    championships: 11,
    digitsRemaining: 7,
    famousFor: "Never stops smiling. Not even during. Especially not during.",
  },
  {
    nickname: "The Professor",
    portraitSlug: "francois-delacroix",
    hometown: "Boston, MA",
    championships: 9,
    digitsRemaining: 8,
    famousFor: "Wrote the definitive textbook on Mousetrap Jenga strategy. Most copies are signed with an X.",
  },
]

export default function MousetrapJengaHallOfFame() {
  return (
    <>
      <InfomercialBand bgColor="cream-dark" verticalPadding="lg">
        <div className="text-center">
          <p className="font-heading text-2xl text-[#D4281F]">★ ★ ★</p>
          <h1 className="font-heading text-5xl md:text-6xl text-[#1A1F4C] mt-2">THE LEGENDS</h1>
          <p className="font-heading text-xl text-[#D4281F] mt-2">of Mousetrap Jenga</p>
          <p className="text-[#1A1F4C]/70 italic mt-4 max-w-2xl mx-auto">
            Honoring the greatest players to ever approach the tower. Their courage lives on in every empty trap and every remaining finger.
          </p>
        </div>
      </InfomercialBand>

      <InfomercialBand bgColor="background" verticalPadding="lg">
        <h2 className="font-heading text-4xl text-[#D4281F] text-center mb-2">Founding Era</h2>
        <p className="text-center text-[#1A1F4C]/70 mb-10">1978 – 1995</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-items-center">
          {foundingEra.map((player) => (
            <TradingCard key={player.name} era="founding" {...player} />
          ))}
        </div>
      </InfomercialBand>

      <InfomercialBand bgColor="cream-dark" verticalPadding="lg">
        <h2 className="font-heading text-4xl text-[#D4281F] text-center mb-2">Contemporary Era</h2>
        <p className="text-center text-[#1A1F4C]/70 mb-10">2000 – present</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
          {contemporaryEra.map((player) => {
            const portrait = getPortrait(player.portraitSlug)
            if (!portrait) return null
            return (
              <TradingCard
                key={portrait.slug}
                era="contemporary"
                name={portrait.name}
                nickname={player.nickname}
                hometown={player.hometown}
                portrait={portrait.image}
                championships={player.championships}
                digitsRemaining={player.digitsRemaining}
                famousFor={player.famousFor}
              />
            )
          })}
        </div>
      </InfomercialBand>
    </>
  )
}
