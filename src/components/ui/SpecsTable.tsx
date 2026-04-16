interface SpecRow {
  label: string
  value: string
}

export function SpecsTable({ rows, heading }: { rows: SpecRow[]; heading?: string }) {
  return (
    <div className="border-2 border-primary/60 bg-background/50">
      {heading && (
        <div className="border-b-2 border-primary/60 bg-primary text-background px-4 py-2 font-heading uppercase tracking-widest text-sm">
          {heading}
        </div>
      )}
      <table className="w-full font-mono text-sm">
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-background/0" : "bg-primary/5"}>
              <td className="px-4 py-2 font-semibold uppercase tracking-wider text-primary/80 border-r border-primary/20 w-1/3">
                {row.label}
              </td>
              <td className="px-4 py-2 text-foreground">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
