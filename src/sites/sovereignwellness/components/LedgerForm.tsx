"use client"

export function LedgerForm() {
  return (
    <form className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
      <input
        type="email"
        placeholder="your quiet address"
        className="flex-1 bg-transparent border border-[#B08C3A] px-4 py-2 text-[#F5ECD7] placeholder:text-[#B08C3A]/60 focus:outline-none"
      />
      <button type="submit" className="bg-[#B08C3A] text-[#1A2942] px-6 py-2 tracking-widest uppercase text-xs font-semibold hover:bg-[#F5ECD7] transition-colors">
        Inscribe
      </button>
    </form>
  )
}
