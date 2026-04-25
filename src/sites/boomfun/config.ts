import type { SiteConfig } from "@/themes"

export const config: SiteConfig = {
  name: "Boom-Fun!",
  subdomain: "boomfun",
  theme: {
    preset: "light",
    colors: {
      primary: "#c8102e",
      secondary: "#d77a1f",
      accent: "#e8c547",
      background: "#f5ead5",
      text: "#16233d",
    },
    fonts: {
      heading: "alfa-slab-one",
      body: "work-sans",
    },
  },
  metadata: {
    title: "Boom-Fun! — Real Kaboom. Real Kids. Real Fun.",
    description: "The original American demolitions toy company. Blasting caps, glitter claymores, firecracker accessories, and the famous Boom-Fun! Club. Toledo, Ohio. Est. 1961.",
    ogImage: "/sites/boomfun/hero.png",
  },
  nav: [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "Safety Corner", path: "/safety" },
    { label: "Club", path: "/club" },
    { label: "Testimonials", path: "/testimonials" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ],
  features: {
    commerce: true,
  },
  verticalKey: "consumer-household",
  tagline: "Real kaboom. Real kids. Real fun.",
}
