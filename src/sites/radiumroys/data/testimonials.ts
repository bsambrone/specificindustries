import { getPortrait } from "@/data/testimonial-portraits"

export interface Testimonial {
  slug: string
  name: string
  image: string
  age: number
  city: string
  product: string
  quote: string
}

function fromPortrait(
  slug: string,
  age: number,
  city: string,
  product: string,
  quote: string,
): Testimonial {
  const portrait = getPortrait(slug)
  if (!portrait) throw new Error(`Unknown testimonial portrait: ${slug}`)
  return { slug, name: portrait.name, image: portrait.image, age, city, product, quote }
}

export const testimonials: Testimonial[] = [
  fromPortrait(
    "brenda-faulk",
    47,
    "Cleveland, OH",
    "Asbesto-Crisps",
    "I've been eating a sleeve of Asbesto-Crisps every day for thirty years and I have only the one tumor. Wonderful crackers.",
  ),
  fromPortrait(
    "tony-mazetti",
    62,
    "Bakersfield, CA",
    "Roy's Nitrate-Lover's Meat Logs",
    "My doctor told me to cut back. I told him about Roy's Logs. He's now a customer too.",
  ),
  fromPortrait(
    "eleanor-whittaker",
    71,
    "Pasadena, CA",
    "Sunshine Glow Radium Wristwatch",
    "I've worn this watch since 1962. I can read the time without my glasses, in the dark, with my eyes closed. Truly magical.",
  ),
  fromPortrait(
    "ryan-ashford",
    54,
    "Phoenix, AZ",
    "Tan-O-Matic 9000",
    "I look like a leather wallet now. My wife says I look distinguished. We are not on speaking terms but she did say that.",
  ),
  fromPortrait(
    "nina-cabrera",
    38,
    "Tucson, AZ",
    "Crystal-Pals Lead Crystal Sippy Cups",
    "My toddler is the calmest kid in his preschool class. The teachers say he's 'unusually placid.' Thank you Roy!",
  ),
  fromPortrait(
    "asher-bloom",
    67,
    "Reno, NV",
    "Radon Cellar Concentrator Kit",
    "I installed mine in 1989. The basement now has a cozy, slightly heavy quality you simply cannot get from a regular cellar.",
  ),
  fromPortrait(
    "patricia-hollowell",
    59,
    "Modesto, CA",
    "Forever-Pan™",
    "I have used this skillet every single day since 1984. The non-stick has not failed once. Neither, I am told, will it ever break down in a landfill.",
  ),
  fromPortrait(
    "derek-pullman",
    73,
    "San Bernardino, CA",
    "Junior Glow-Pop Cigarettes",
    "My grandfather started me on Glow-Pops at age four. Three generations of Pullmans have enjoyed them. Tradition matters.",
  ),
  fromPortrait(
    "tamara-voss",
    44,
    "Boise, ID",
    "Cozy-Pet Asbestos Bedding",
    "Buster has not moved off his Cozy-Pet bed in eight months. He is so relaxed. So profoundly, deeply relaxed.",
  ),
  fromPortrait(
    "greg-diane-hofstra",
    81,
    "Sacramento, CA",
    "Mercury Drop Lollipops",
    "We have collected the empty bulbs since we were kids. They sit in a Mason jar on our windowsill. They tell our whole life story, in silver.",
  ),
  fromPortrait(
    "simone-archer",
    33,
    "Fresno, CA",
    "Tar Tots Coal Tar Shampoo",
    "My daughter loves bath time now. She comes out smelling like bubblegum and an asphalt road. I find this oddly comforting.",
  ),
  fromPortrait(
    "kyle-brandt",
    58,
    "Stockton, CA",
    "Char-Master 2000°",
    "I cooked a steak so thoroughly last weekend that the meat color is no longer determinable by visual inspection. Roy was right.",
  ),
]
