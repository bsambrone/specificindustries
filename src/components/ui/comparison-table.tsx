interface ComparisonTableProps {
  title?: string
  columns: Array<{ name: string; highlighted?: boolean }>
  rows: Array<{ label: string; values: string[] }>
  footnote?: string
}

export function ComparisonTable({ title, columns, rows, footnote }: ComparisonTableProps) {
  return (
    <section className="py-16 px-4 bg-primary">
      <div className="max-w-4xl mx-auto">
        {title && (
          <h2 className="text-2xl font-heading font-bold text-white text-center mb-8">
            {title}
          </h2>
        )}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left py-3 px-4 text-accent font-normal" />
                {columns.map((col) => (
                  <th
                    key={col.name}
                    className={`py-3 px-4 text-center font-heading font-bold ${
                      col.highlighted
                        ? "text-white bg-white/10 border-b-2 border-accent"
                        : "text-accent"
                    }`}
                  >
                    {col.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-t border-white/10">
                  <td className="py-3 px-4 text-accent font-semibold sticky left-0 bg-primary">
                    {row.label}
                  </td>
                  {row.values.map((value, i) => (
                    <td
                      key={i}
                      className={`py-3 px-4 text-center ${
                        columns[i]?.highlighted
                          ? "text-white bg-white/10"
                          : "text-white/60"
                      }`}
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {footnote && (
          <p className="text-accent/70 text-xs italic text-center mt-6">{footnote}</p>
        )}
      </div>
    </section>
  )
}
