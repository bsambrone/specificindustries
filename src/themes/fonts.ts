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

// All font class names joined for the root layout
export const fontVariables = [
  inter.variable,
  playfairDisplay.variable,
  spaceGrotesk.variable,
  poppins.variable,
  barlowCondensed.variable,
].join(" ")

// Map of font keys used in site configs → CSS font-family values
export const fontFamilyMap: Record<string, string> = {
  inter: "'Inter', sans-serif",
  playfair: "'Playfair Display', serif",
  "space-grotesk": "'Space Grotesk', sans-serif",
  poppins: "'Poppins', sans-serif",
  "barlow-condensed": "'Barlow Condensed', sans-serif",
}
