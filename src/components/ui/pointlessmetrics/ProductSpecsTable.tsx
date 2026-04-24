import type { ProductSpec } from "@/sites/pointlessmetrics/data/products"

interface ProductSpecsTableProps {
  specs: ProductSpec[]
  title?: string
}

export function ProductSpecsTable({ specs, title = "Specifications" }: ProductSpecsTableProps) {
  return (
    <section>
      <h2 className="font-heading text-2xl text-primary mb-4">{title}</h2>
      <div className="bg-white border border-accent/40 rounded-sm overflow-hidden">
        <table className="w-full text-sm">
          <tbody>
            {specs.map((spec, i) => (
              <tr key={spec.label} className={i % 2 === 0 ? "bg-transparent" : "bg-accent/5"}>
                <th scope="row" className="text-left font-medium text-foreground/80 py-2 px-4 w-2/5 border-b border-accent/20">
                  {spec.label}
                </th>
                <td className="py-2 px-4 border-b border-accent/20 tabular-nums">{spec.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
