import { Inter, Playfair_Display, Space_Grotesk, Poppins, Barlow_Condensed } from "next/font/google"

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

export const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
})

export const barlowCondensed = Barlow_Condensed({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
})

// Map font config keys → their next/font instance
const fontInstanceMap: Record<string, { variable: string }> = {
  inter,
  playfair: playfairDisplay,
  "space-grotesk": spaceGrotesk,
  poppins,
  "barlow-condensed": barlowCondensed,
}

// Returns only the CSS variable classes needed for a given site's fonts
export function getFontVariables(fonts: { heading: string; body: string }): string {
  const needed = new Set([fonts.heading, fonts.body])
  return Array.from(needed)
    .map((key) => fontInstanceMap[key]?.variable)
    .filter(Boolean)
    .join(" ")
}

// Map of font keys used in site configs → CSS font-family values
export const fontFamilyMap: Record<string, string> = {
  inter: "'Inter', sans-serif",
  playfair: "'Playfair Display', serif",
  "space-grotesk": "'Space Grotesk', sans-serif",
  poppins: "'Poppins', sans-serif",
  "barlow-condensed": "'Barlow Condensed', sans-serif",
}
