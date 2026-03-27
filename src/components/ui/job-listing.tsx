interface JobListingProps {
  title: string
  department: string
  description: string
  onApply?: () => void
}

export function JobListing({ title, department, description, onApply }: JobListingProps) {
  return (
    <div className="border border-primary/10 rounded-lg p-6">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-xl font-heading font-semibold text-primary">{title}</h3>
        <span className="text-xs bg-secondary px-2 py-1 rounded-full text-foreground/60 shrink-0 ml-4">{department}</span>
      </div>
      <p className="text-foreground/70 mb-4">{description}</p>
      {onApply && (
        <button
          onClick={onApply}
          className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Apply Now
        </button>
      )}
    </div>
  )
}
