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
  // ── Aquatic Performance ───────────────────────────────────
  withPortrait("marcus-chen", "My goldfish has shown absolutely no improvement. The dashboard confirms this daily. Worth every penny.", "Goldfish Treadmill Pro owner", "goldfish-treadmill-pro"),
  withPortrait("chad-gullet", "I bought the standing desk for my betta fish because he seemed tired of floating horizontally. He is now floating horizontally next to a desk. Progress.", "Aquarium Standing Desk owner", "aquarium-standing-desk"),
  withPortrait("simone-archer", "My fish made eye contact with me for the first time in three years. It lasted 0.1 seconds. I wept.", "Eye Contact Training Kit owner", "fish-eye-contact-training-kit"),
  withPortrait("asher-bloom", "The markers dissolved in four seconds. My fish didn't write anything. But for those four seconds, the whiteboard was full of potential.", "Underwater Whiteboard owner", "underwater-whiteboard"),

  // ── Serpent Workplace Solutions ────────────────────────────
  withPortrait("brenda-faulk", "My snake received a performance review. He ate it. They sent another one. He ate that too. 10/10 service.", "Snake Tie Collection owner", "snake-tie-collection"),
  withPortrait("tony-mazetti", "I put my ball python in the Ergonomic Snake Chair. He slithered off immediately and went behind the refrigerator. The chair is very comfortable for me though.", "Ergonomic Snake Chair owner", "ergonomic-snake-chair"),
  withPortrait("eleanor-whittaker", "I hung 'Reach for the Stars' above my corn snake's enclosure. He has not reached for anything. He did eat a mouse. I consider that ambition.", "Motivational Posters owner", "motivational-posters-for-snakes"),
  withPortrait("jason-kile", "The vibrations from the Handshake Simulation Device scared my snake under the couch for three days. When he emerged, I shook the device at him. He went back under the couch.", "Handshake Device owner", "handshake-simulation-device"),

  // ── Avian Professional Development ────────────────────────
  withPortrait("nina-cabrera", "My parrot's resume got three callbacks. He repeated the interviewer's questions back to them. They said he was 'a great listener.'", "Parrot Resume Suite owner", "parrot-resume-optimization-suite"),
  withPortrait("francois-delacroix", "My cockatiel's chirp was translated to 'Per my last email, the seed dish is empty.' I have never felt more professionally communicated with by a bird.", "Email Tone Translator owner", "email-tone-translator"),
  withPortrait("greg-diane-hofstra", "Our parakeet perches on top of the cubicle divider and screams. The 'Do Not Disturb' sign has had no effect. We consider this a cultural alignment issue.", "Bird Cubicle Kit owners", "bird-cubicle-divider-kit"),
  withPortrait("kyle-brandt", "I strapped the GPS to my pigeon and released him. He flew to the same dumpster behind the Wendy's. The device confirmed he was already there. Accurate.", "Pigeon GPS owner", "pigeon-urban-navigation-gps"),

  // ── Reptile Fitness & Mobility ────────────────────────────
  withPortrait("ryan-ashford", "The ROI on my tortoise's HIIT program is technically zero, but the graphs are beautiful.", "Tortoise HIIT Program owner", "tortoise-hiit-program"),
  withPortrait("derek-pullman", "My sloth completed one rep in week one. We are now in week thirty-six. He has not attempted a second rep. The foam roller is his bed now.", "Sloth HIIT owner", "sloth-hiit"),
  withPortrait("patricia-hollowell", "I blew the motivational whistle next to my bearded dragon. He blinked. This is the most he has reacted to anything in four years. I cried.", "Motivational Whistle owner", "motivational-whistle"),
  withPortrait("simone-archer", "The wearable has been on my iguana for six months. The weekly report says 'No Change Detected' every time. My iguana and I both find this comforting.", "Performance Wearable owner", "performance-tracking-wearable"),

  // ── Farm Animal Lifestyle Upgrades ────────────────────────
  withPortrait("tony-mazetti", "My cow stood on the yoga mat for eight hours. She was already standing. She was already on grass. But now it was intentional. I think.", "Cow Yoga Mat owner", "cow-yoga-mat"),
  withPortrait("marcus-chen", "My chicken wore the headphones for eleven seconds before pecking them off and eating a piece of the ear cushion. In those eleven seconds, she knew peace.", "Noise-Canceling Headphones owner", "chicken-noise-canceling-headphones"),
  withPortrait("eleanor-whittaker", "My pig rolled in the artisanal Vermont mud and then immediately rolled in regular mud. She did not distinguish. I did. The Vermont mud smelled slightly better.", "Pig Spa Day Kit owner", "pig-spa-day-kit"),
  withPortrait("chad-gullet", "My goat ate the workbook, the business cards, and the headshot backdrop. Then he stared directly into the camera with what I can only describe as brand clarity.", "Goat Branding Course owner", "goat-personal-branding-course"),

  // ── Corporate Pets Division ───────────────────────────────
  withPortrait("tamara-voss", "After 6 months of career coaching, my cat still sleeps 18 hours a day. But now she does it with executive presence.", "LinkedIn Premium for Cats subscriber", "linkedin-premium-for-cats"),
  withPortrait("jason-kile", "My dog received his first performance review. Under 'Areas for Improvement' it said 'mailman relations.' He wagged his tail. They noted 'positive reception to feedback.'", "Dog Performance Review owner", "dog-performance-review-toolkit"),
  withPortrait("brenda-faulk", "My hamster has been running on his wheel inside the tiny office for three weeks straight. The laptop screen shows spreadsheets he will never understand. He has never been happier. Or sadder. I can't tell.", "Executive Office owner", "executive-office-for-hamsters"),
  withPortrait("ryan-ashford", "I set up the beach background for my cat's Zoom call. She walked out of frame in two seconds, which is exactly what I do in most meetings. Like owner, like cat.", "Zoom Background owner", "zoom-background-generator-for-pets"),
]

export const animalTestimonials: AnimalTestimonial[] = [
  // ── Aquatic Performance ───────────────────────────────────
  withAnimalPortrait("gerald-goldfish", "This changed nothing.", "goldfish-treadmill-pro"),
  withAnimalPortrait("gerald-goldfish", "I am standing. I was already standing. I am now standing near a desk.", "aquarium-standing-desk"),
  withAnimalPortrait("gerald-goldfish", "I saw myself in the mirror. I did not recognize myself. I have already forgotten.", "fish-eye-contact-training-kit"),
  withAnimalPortrait("gerald-goldfish", "The whiteboard was blank. Then it was wet. These are the same thing.", "underwater-whiteboard"),

  // ── Serpent Workplace Solutions ────────────────────────────
  withAnimalPortrait("kevin-snake", "I ate it.", "snake-tie-collection"),
  withAnimalPortrait("kevin-snake", "The chair has 47 lumbar zones. I have zero lumbar. We are incompatible.", "ergonomic-snake-chair"),
  withAnimalPortrait("kevin-snake", "The poster says 'Hang in there.' I cannot hang. I can only coil. This feels exclusionary.", "motivational-posters-for-snakes"),
  withAnimalPortrait("kevin-snake", "The device vibrated. I left.", "handshake-simulation-device"),

  // ── Avian Professional Development ────────────────────────
  withAnimalPortrait("diane-parrot", "Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help. Help.", "parrot-resume-optimization-suite"),
  withAnimalPortrait("diane-parrot", "Per my last email. Per my last email. Per my last email. Per my last email.", "email-tone-translator"),
  withAnimalPortrait("frank-pigeon", "The divider is 8 inches tall. I can fly. This is not a barrier. This is a perch.", "bird-cubicle-divider-kit"),
  withAnimalPortrait("frank-pigeon", "I can see my house from here.", "pigeon-urban-navigation-gps"),

  // ── Reptile Fitness & Mobility ────────────────────────────
  withAnimalPortrait("linda-tortoise", "I have no idea what's happening.", "tortoise-hiit-program"),
  withAnimalPortrait("steve-sloth", ".", "sloth-hiit"),
  withAnimalPortrait("linda-tortoise", "I heard a whistle. I continued doing what I was doing. Which was nothing.", "motivational-whistle"),
  withAnimalPortrait("linda-tortoise", "The device says 'No Change Detected.' This is the most accurate thing anyone has ever said about me.", "performance-tracking-wearable"),

  // ── Farm Animal Lifestyle Upgrades ────────────────────────
  withAnimalPortrait("barbara-cow", "MOOOOO. (Translated: 'The yoga mat was adequate.')", "cow-yoga-mat"),
  withAnimalPortrait("margaret-chicken", "BAWK. (Translated: 'I can still hear everything.')", "chicken-noise-canceling-headphones"),
  withAnimalPortrait("barbara-cow", "MOOOOO. (Translated: 'The mud was mud.')", "pig-spa-day-kit"),
  withAnimalPortrait("cynthia-goat", "I am already the GOAT.", "goat-personal-branding-course"),

  // ── Corporate Pets Division ───────────────────────────────
  withAnimalPortrait("patricia-cat", "(Did not respond to request for comment.)", "linkedin-premium-for-cats"),
  withAnimalPortrait("doug-dog", "I LOVE THIS I LOVE YOU I LOVE EVERYTHING", "dog-performance-review-toolkit"),
  withAnimalPortrait("dennis-hamster", "I have been running for 11 years.", "executive-office-for-hamsters"),
  withAnimalPortrait("patricia-cat", "(Walked out of frame.)", "zoom-background-generator-for-pets"),
]

export const homepageTestimonials = humanTestimonials.filter((_, i) => [0, 2, 4].includes(i))

export function getAnimalTestimonialForProduct(productSlug: string): AnimalTestimonial | undefined {
  return animalTestimonials.find((t) => t.productSlug === productSlug)
}

export function getHumanTestimonialForProduct(productSlug: string): HumanTestimonial | undefined {
  return humanTestimonials.find((t) => t.productSlug === productSlug)
}
