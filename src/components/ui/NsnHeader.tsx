interface NsnHeaderProps {
  nsn: string
  contractCode: string
  milStd: string
}

export function NsnHeader({ nsn, contractCode, milStd }: NsnHeaderProps) {
  return (
    <div className="font-mono text-xs uppercase tracking-widest text-primary/70 flex flex-wrap gap-x-6 gap-y-1 border-b border-primary/30 pb-2 mb-4">
      <span>NSN {nsn}</span>
      <span>CONTRACT #{contractCode}</span>
      <span>{milStd}</span>
    </div>
  )
}
