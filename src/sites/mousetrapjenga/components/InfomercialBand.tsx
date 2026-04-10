import React from "react"

interface InfomercialBandProps {
  children: React.ReactNode
  bgColor: "primary" | "secondary" | "accent" | "background" | "cream-dark"
  textColor?: "dark" | "light"
  className?: string
  verticalPadding?: "sm" | "md" | "lg"
  bordered?: boolean
}

const bgMap: Record<InfomercialBandProps["bgColor"], string> = {
  primary: "bg-[#D4281F]",      // cherry red
  secondary: "bg-[#FFD23F]",    // sunburst yellow
  accent: "bg-[#2BB9B9]",       // turquoise
  background: "bg-[#FFF6E8]",   // cream
  "cream-dark": "bg-[#F5E8CE]", // slightly darker cream for alternating bands
}

const textMap = {
  dark: "text-[#1A1F4C]",
  light: "text-[#FFF6E8]",
}

const paddingMap = {
  sm: "py-10",
  md: "py-16",
  lg: "py-24",
}

/**
 * Full-bleed section wrapper with infomercial band styling. Each band feels
 * like a TV ad beat. Use on the home page and anywhere a clear banded rhythm
 * is needed.
 */
export function InfomercialBand({
  children,
  bgColor,
  textColor = "dark",
  className = "",
  verticalPadding = "md",
  bordered = true,
}: InfomercialBandProps) {
  const borderClasses = bordered ? "border-y-4 border-[#1A1F4C]" : ""
  return (
    <section
      className={`w-full ${bgMap[bgColor]} ${textMap[textColor]} ${paddingMap[verticalPadding]} ${borderClasses} ${className}`}
    >
      <div className="max-w-6xl mx-auto px-4">{children}</div>
    </section>
  )
}
