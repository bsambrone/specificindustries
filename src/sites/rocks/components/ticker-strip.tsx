export function TickerStrip() {
  const rows = [
    { symbol: "RCK/USD", last: "49.00", change: "+0.00", bid: "48.98", ask: "49.02", vol: "1,247,910", hi: "49.12", lo: "48.88" },
    { symbol: "RCK2/USD", last: "199.00", change: "+4.17", bid: "198.92", ask: "199.08", vol: "812,447", hi: "199.40", lo: "194.77" },
    { symbol: "RCKBX/USD", last: "499.00", change: "+1.84", bid: "498.80", ask: "499.20", vol: "304,216", hi: "501.12", lo: "497.08" },
  ]

  return (
    <div className="w-full border-y border-primary/30 bg-background overflow-x-auto">
      <div className="flex items-center gap-8 px-4 py-2 text-xs font-body text-primary/90 whitespace-nowrap tabular-nums">
        <span className="font-semibold text-primary">◉ LIVE</span>
        {rows.map((r) => {
          const up = r.change.startsWith("+")
          const changeColor = up ? "text-accent" : "text-red-400"
          return (
            <span key={r.symbol} className="flex gap-4">
              <span className="font-semibold">{r.symbol}</span>
              <span>{r.last}</span>
              <span className={changeColor}>{r.change}</span>
              <span className="text-primary/50">BID {r.bid}</span>
              <span className="text-primary/50">ASK {r.ask}</span>
              <span className="text-primary/50">VOL {r.vol}</span>
              <span className="text-primary/50">HI {r.hi}</span>
              <span className="text-primary/50">LO {r.lo}</span>
            </span>
          )
        })}
      </div>
    </div>
  )
}
