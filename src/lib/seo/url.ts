const BASE_DOMAIN = "specificindustries.com"

export function siteOrigin(subdomain: string): string {
  return subdomain === "apex"
    ? `https://${BASE_DOMAIN}`
    : `https://${subdomain}.${BASE_DOMAIN}`
}

export function siteUrl(subdomain: string, path: string = ""): string {
  const origin = siteOrigin(subdomain)
  const trimmed = path.replace(/^\/+/, "")
  return trimmed ? `${origin}/${trimmed}` : origin
}

export function absoluteImage(subdomain: string, image?: string): string | undefined {
  if (!image) return undefined
  if (/^https?:\/\//i.test(image)) return image
  const origin = siteOrigin(subdomain)
  return `${origin}${image.startsWith("/") ? "" : "/"}${image}`
}
