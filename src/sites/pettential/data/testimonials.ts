// src/sites/pettential/data/testimonials.ts
import { getPortrait } from "@/data/testimonial-portraits"
import { getAnimalPortrait } from "@/data/animal-portraits"

export interface HumanTestimonial {
  quote: string
  name: string
  title: string
  image: string
  productSlug?: string
}

export interface AnimalTestimonial {
  quote: string
  name: string
  species: string
  image: string
  productSlug: string
}

function withPortrait(slug: string, quote: string, title: string, productSlug?: string): HumanTestimonial {
  const portrait = getPortrait(slug)
  if (!portrait) throw new Error(`Unknown testimonial portrait: ${slug}`)
  return { quote, title, name: portrait.name, image: portrait.image, productSlug }
}

function withAnimalPortrait(slug: string, quote: string, productSlug: string): AnimalTestimonial {
  const portrait = getAnimalPortrait(slug)
  if (!portrait) throw new Error(`Unknown animal portrait: ${slug}`)
  return { quote, name: portrait.name, species: portrait.species, image: portrait.image, productSlug }
}

export const humanTestimonials: HumanTestimonial[] = [
  withPortrait("marcus-chen", "My goldfish has shown absolutely no improvement. The dashboard confirms this daily. Worth every penny.", "Goldfish Treadmill Pro owner", "goldfish-treadmill-pro"),
  withPortrait("tamara-voss", "After 6 months of career coaching, my cat still sleeps 18 hours a day. But now she does it with executive presence.", "LinkedIn Premium for Cats subscriber", "linkedin-premium-for-cats"),
  withPortrait("derek-pullman", "The leadership retreat changed nothing for my iguana. He came back exactly the same. Transformative experience.", "Enterprise tier customer"),
  withPortrait("brenda-faulk", "My snake received a performance review. He ate it. They sent another one. He ate that too. 10/10 service.", "Performance Reviews subscriber", "snake-tie-collection"),
  withPortrait("ryan-ashford", "The ROI on my tortoise's HIIT program is technically zero, but the graphs are beautiful.", "Tortoise HIIT Program owner", "tortoise-hiit-program"),
  withPortrait("nina-cabrera", "My parrot's resume got three callbacks. He repeated the interviewer's questions back to them. They said he was 'a great listener.'", "Parrot Resume Suite owner", "parrot-resume-optimization-suite"),
]

export const animalTestimonials: AnimalTestimonial[] = [
  withAnimalPortrait("gerald-goldfish", "This changed nothing.", "goldfish-treadmill-pro"),
  withAnimalPortrait("linda-tortoise", "I have no idea what's happening.", "tortoise-hiit-program"),
  withAnimalPortrait("kevin-snake", "I ate it.", "snake-tie-collection"),
  withAnimalPortrait("diane-parrot", "Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help.", "parrot-resume-optimization-suite"),
  withAnimalPortrait("steve-sloth", ".", "sloth-hiit"),
  withAnimalPortrait("barbara-cow", "MOOOOO. (Translated: 'The yoga mat was adequate.')", "cow-yoga-mat"),
  withAnimalPortrait("dennis-hamster", "I have been running for 11 years.", "executive-office-for-hamsters"),
  withAnimalPortrait("frank-pigeon", "I can see my house from here.", "pigeon-urban-navigation-gps"),
  withAnimalPortrait("patricia-cat", "(Did not respond to request for comment.)", "linkedin-premium-for-cats"),
  withAnimalPortrait("margaret-chicken", "BAWK. (Translated: 'I can still hear everything.')", "chicken-noise-canceling-headphones"),
  withAnimalPortrait("doug-dog", "I LOVE THIS I LOVE YOU I LOVE EVERYTHING", "dog-performance-review-toolkit"),
  withAnimalPortrait("cynthia-goat", "I am already the GOAT.", "goat-personal-branding-course"),
]

export const homepageTestimonials = humanTestimonials.filter((_, i) => [0, 2, 4].includes(i))

export function getAnimalTestimonialForProduct(productSlug: string): AnimalTestimonial | undefined {
  return animalTestimonials.find((t) => t.productSlug === productSlug)
}

export function getHumanTestimonialForProduct(productSlug: string): HumanTestimonial | undefined {
  return humanTestimonials.find((t) => t.productSlug === productSlug)
}
