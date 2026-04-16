// Lightweight list of valid subdomains for middleware (edge runtime compatible).
// Keep in sync with siteRegistry in ./registry.ts
export const VALID_SUBDOMAINS = [
  "apex",
  "pigmilk",
  "dehydratedwater",
  "inflatableanchors",
  "strategicvoid",
  "stratify",
  "truegrit",
  "grassfedwifi",
  "elderparty",
  "cleansheet",
  "snortables",
  "mousetrapjenga",
  "onlyfans",
  "onlypans",
  "bonelesswater",
  "gristmill",
  "oddoccasions",
  "pettential",
  "rocks",
  "squaredaway",
] as const

export function isValidSubdomain(subdomain: string): boolean {
  return (VALID_SUBDOMAINS as readonly string[]).includes(subdomain)
}
