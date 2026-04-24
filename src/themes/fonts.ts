import { Inter, Playfair_Display, Space_Grotesk, Poppins, Barlow_Condensed, Fraunces, Nunito, Bowlby_One_SC, Zilla_Slab, IBM_Plex_Mono, Black_Ops_One, Bungee, Work_Sans, Cormorant_Garamond, Lora, Alfa_Slab_One, Permanent_Marker, Oswald, Source_Serif_4, JetBrains_Mono } from "next/font/google"

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

export const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
})

export const nunito = Nunito({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-nunito",
})

export const bowlbyOneSC = Bowlby_One_SC({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-bowlby-one-sc",
})

export const zillaSlab = Zilla_Slab({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-zilla-slab",
})

export const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
})

export const blackOpsOne = Black_Ops_One({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-black-ops-one",
})

export const bungee = Bungee({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-bungee",
})

export const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
})

export const cormorantGaramond = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant-garamond",
})

export const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
})

export const alfaSlabOne = Alfa_Slab_One({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-alfa-slab-one",
})

export const permanentMarker = Permanent_Marker({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-permanent-marker",
})

export const oswald = Oswald({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-oswald",
})

export const sourceSerif4 = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif-4",
})

export const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})

// Map font config keys → their next/font instance
const fontInstanceMap: Record<string, { variable: string }> = {
  inter,
  playfair: playfairDisplay,
  "playfair-display": playfairDisplay,
  "space-grotesk": spaceGrotesk,
  poppins,
  "barlow-condensed": barlowCondensed,
  fraunces,
  nunito,
  "bowlby-one-sc": bowlbyOneSC,
  "zilla-slab": zillaSlab,
  "ibm-plex-mono": ibmPlexMono,
  "black-ops-one": blackOpsOne,
  "bungee": bungee,
  "work-sans": workSans,
  "cormorant-garamond": cormorantGaramond,
  "lora": lora,
  "alfa-slab-one": alfaSlabOne,
  "permanent-marker": permanentMarker,
  oswald,
  "source-serif-4": sourceSerif4,
  "jetbrains-mono": jetBrainsMono,
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
  "playfair-display": "'Playfair Display', serif",
  "space-grotesk": "'Space Grotesk', sans-serif",
  poppins: "'Poppins', sans-serif",
  "barlow-condensed": "'Barlow Condensed', sans-serif",
  fraunces: "'Fraunces', serif",
  nunito: "'Nunito', sans-serif",
  "bowlby-one-sc": "'Bowlby One SC', sans-serif",
  "zilla-slab": "'Zilla Slab', serif",
  "ibm-plex-mono": "'IBM Plex Mono', monospace",
  "black-ops-one": "'Black Ops One', cursive",
  "bungee": "'Bungee', cursive",
  "work-sans": "'Work Sans', sans-serif",
  "cormorant-garamond": "'Cormorant Garamond', serif",
  "lora": "'Lora', serif",
  "alfa-slab-one": "'Alfa Slab One', cursive",
  "permanent-marker": "'Permanent Marker', cursive",
  oswald: "'Oswald', sans-serif",
  "source-serif-4": "'Source Serif 4', serif",
  "jetbrains-mono": "'JetBrains Mono', monospace",
}
