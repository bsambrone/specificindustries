import Image from "next/image"

interface TradingCardProps {
  name: string
  nickname: string
  hometown?: string
  portrait: string
  championships: number
  digitsRemaining: number
  famousFor: string
  era: "founding" | "contemporary"
}

/**
 * Vintage trading-card layout for the Hall of Fame page. Sepia border,
 * monospace stat block, dramatic portrait framing.
 */
export function TradingCard({
  name,
  nickname,
  hometown,
  portrait,
  championships,
  digitsRemaining,
  famousFor,
  era,
}: TradingCardProps) {
  return (
    <article
      className="
        relative border-4 border-[#1A1F4C] bg-[#FFF6E8]
        shadow-[6px_6px_0_0_#1A1F4C] flex flex-col
        max-w-sm w-full
      "
    >
      {/* Era ribbon */}
      <div
        className={`
          absolute top-3 left-0 px-3 py-1 text-xs font-bold uppercase tracking-wider
          border-y-2 border-r-2 border-[#1A1F4C]
          ${era === "founding" ? "bg-[#D4281F] text-[#FFF6E8]" : "bg-[#2BB9B9] text-[#FFF6E8]"}
        `}
      >
        {era === "founding" ? "Founding Era" : "Contemporary"}
      </div>

      {/* Portrait */}
      <div className="relative aspect-square border-b-4 border-[#1A1F4C] overflow-hidden sepia-[0.4]">
        <Image src={portrait} alt={name} fill className="object-cover" sizes="(max-width: 640px) 100vw, 384px" />
      </div>

      {/* Name & nickname */}
      <div className="px-4 pt-4 pb-2 text-center border-b-2 border-dashed border-[#1A1F4C]/40">
        <p className="font-heading text-xl leading-tight text-[#D4281F]">&ldquo;{nickname}&rdquo;</p>
        <h3 className="font-heading text-2xl leading-tight text-[#1A1F4C] mt-1">{name}</h3>
        {hometown && <p className="text-xs font-semibold uppercase tracking-wide text-[#1A1F4C]/60 mt-1">{hometown}</p>}
      </div>

      {/* Stat block — monospace */}
      <dl className="grid grid-cols-2 font-mono text-sm border-b-2 border-dashed border-[#1A1F4C]/40">
        <div className="border-r border-[#1A1F4C]/40 px-3 py-2">
          <dt className="text-[10px] uppercase text-[#1A1F4C]/60">Championships</dt>
          <dd className="font-bold text-[#D4281F] text-lg">{championships}</dd>
        </div>
        <div className="px-3 py-2">
          <dt className="text-[10px] uppercase text-[#1A1F4C]/60">Digits Remaining</dt>
          <dd className="font-bold text-[#D4281F] text-lg">{digitsRemaining}</dd>
        </div>
      </dl>

      {/* Famous for */}
      <div className="px-4 py-3 text-sm italic text-[#1A1F4C]/80">&ldquo;{famousFor}&rdquo;</div>
    </article>
  )
}
