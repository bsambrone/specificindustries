export function BannedTicker() {
  const items = [
    "BANNED IN 39 STATES",
    "RESTRICTED IN 4 COUNTIES",
    "LEGAL IN ALL HEARTS",
    "FILED UNDER VII-B",
    "NOT ENDORSED BY THE AMA",
  ]
  return (
    <section className="bg-accent text-[#F5ECD7] py-4 border-y border-[#B08C3A]/40">
      <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-center gap-x-10 gap-y-2 text-xs tracking-[0.3em] uppercase text-[#B08C3A]">
        {items.map((item, i) => (
          <span key={i}>{item}</span>
        ))}
      </div>
    </section>
  )
}
