export interface ThemeColors {
  primary: string
  secondary: string
  accent: string
  background: string
  text: string
}

export interface ThemeFonts {
  heading: string
  body: string
}

export interface SiteTheme {
  preset: string
  colors: ThemeColors
  fonts: ThemeFonts
}

export interface SiteMetadata {
  title: string
  description: string
  ogImage?: string
  previewImage?: string
}

export interface NavItem {
  label: string
  path: string
}

export interface SiteConfig {
  name: string
  subdomain: string
  theme: SiteTheme
  metadata: SiteMetadata
  nav: NavItem[]
  features: {
    commerce: boolean
  }
}

export interface PageMetadata {
  title?: string
  description?: string
}

export interface PageWithMetadata {
  component: React.ComponentType
  metadata: PageMetadata
}

// A page entry is either a bare component or a component with metadata
export type PageEntry = React.ComponentType | PageWithMetadata

export interface DynamicRoute {
  component: React.ComponentType<{ slug: string }>
  getMetadata?: (slug: string) => PageMetadata | undefined
  isValidSlug?: (slug: string) => boolean
}

export interface SiteModule {
  config: SiteConfig
  pages: Record<string, PageEntry>
  dynamicRoutes?: Record<string, DynamicRoute>
}

// Helper to generate CSS custom properties from a site config
export function themeToCSS(theme: SiteTheme): Record<string, string> {
  return {
    "--color-primary": theme.colors.primary,
    "--color-secondary": theme.colors.secondary,
    "--color-accent": theme.colors.accent,
    "--color-background": theme.colors.background,
    "--color-text": theme.colors.text,
    "--color-foreground": theme.colors.text,
    "--font-heading": theme.fonts.heading,
    "--font-body": theme.fonts.body,
  }
}
