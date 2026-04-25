export interface ImpactStat {
  label: string
  value: string
}

// Headline stats — used on home and /impact
export const heroStats: ImpactStat[] = [
  { label: "Citizens informed", value: "2.4M" },
  { label: "Public records requests filed", value: "1,847" },
  { label: "Active local chapters", value: "47" },
  { label: "Petition signatures, 2025", value: "318,000" },
]

// Detailed stats — /impact page
export const detailedStats: ImpactStat[] = [
  { label: "School districts contacted", value: "412" },
  { label: "Awareness videos shared, 2025", value: "8.6M" },
  { label: "Active research collaborations", value: "14" },
  { label: "Federal petitions filed (cumulative)", value: "29" },
  { label: "Chapter leaders trained", value: "163" },
  { label: "Hours of broadcast media earned, 2025", value: "84" },
  { label: "Survivor stories collected", value: "1,400+" },
  { label: "Public symposia hosted", value: "26" },
]
