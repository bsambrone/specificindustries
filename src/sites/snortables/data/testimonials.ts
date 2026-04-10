import { getPortrait } from "@/data/testimonial-portraits"

export interface Testimonial {
  quote: string
  name: string
  title: string
  image: string
}

function withPortrait(slug: string, quote: string, title: string): Testimonial {
  const portrait = getPortrait(slug)
  if (!portrait) throw new Error(`Unknown testimonial portrait: ${slug}`)
  return { quote, title, name: portrait.name, image: portrait.image }
}

export const testimonials: Testimonial[] = [
  withPortrait(
    "marcus-chen",
    "I used to waste 45 minutes a day CHEWING. Now I snort my meals in seconds and use that time to optimize my LinkedIn presence.",
    "Growth Hacker & Biohacker",
  ),
  withPortrait(
    "chad-gullet",
    "As a competitive eater, Snortables let me consume 40% more calories per hour by freeing up my mouth for the actual competition.",
    "Nathan's Hot Dog Contest Runner-Up",
  ),
  withPortrait(
    "derek-pullman",
    "I snorted the Sunday Roast at my wedding reception. My wife left me but my macros were IMMACULATE.",
    "Divorced But Optimized",
  ),
  withPortrait(
    "tamara-voss",
    "My doctor said 'please stop doing this.' But my OTHER doctor — the one I found on Reddit — said it's fine.",
    "Wellness Influencer",
  ),
  withPortrait(
    "jason-kile",
    "I replaced all solid food with Snortables six months ago. I've lost 30 pounds and the ability to taste, but my quarterly review was phenomenal.",
    "Senior VP of Nothing Specific",
  ),
  withPortrait(
    "brenda-faulk",
    "Gave Tiny Nostrils to my kids. They haven't complained once. They also haven't spoken to me in weeks but I'm sure that's unrelated.",
    "Mother of the Year (Self-Awarded)",
  ),
  withPortrait(
    "ryan-ashford",
    "I brought JOLT to my corporate retreat. HR wants to 'have a conversation' but my presentation was 3 hours of pure fire.",
    "Suspended Account Executive",
  ),
  withPortrait(
    "patricia-hollowell",
    "Finally, a product that understands the nasal cavity is the most underutilized organ in the human body.",
    "Unlicensed Nutritionist",
  ),
  withPortrait(
    "nina-cabrera",
    "I tried to explain Snortables to my grandmother. She called the police. Five stars.",
    "Early Adopter",
  ),
  withPortrait(
    "simone-archer",
    "MorningRail replaced my coffee, my alarm clock, and my will to engage in normal human breakfast rituals.",
    "4am Productivity Blogger",
  ),
  withPortrait(
    "francois-delacroix",
    "The Crème Brûlée Blast made me cry. Not from emotion — from the caramelized sugar particles. But also from emotion.",
    "Pastry Chef (Retired Under Duress)",
  ),
  withPortrait(
    "tony-mazetti",
    "My gym banned me for snorting BroTein in the locker room. I now work out in my garage and I've never been more powerful.",
    "Garage Gym Evangelist",
  ),
  withPortrait(
    "eleanor-whittaker",
    "I'm a food critic and I've never been more conflicted. The Full Bird has incredible terroir but the delivery mechanism concerns me professionally.",
    "Michelin-Adjacent Reviewer",
  ),
  withPortrait(
    "greg-diane-hofstra",
    "Snortables saved my marriage. We used to argue about what's for dinner. Now we just argue about my 'powder hobby.'",
    "Couples Therapy Regulars",
  ),
  withPortrait(
    "asher-bloom",
    "I've been using GreenRush for 6 months. My sinuses are green now. Like, literally green. But I feel INCREDIBLE.",
    "Organic Lifestyle Advocate",
  ),
  withPortrait(
    "kyle-brandt",
    "I snorted HydroSnort instead of drinking water for a month. The ER doctors called it 'unprecedented' which I'm choosing to take as a compliment.",
    "Hydration Pioneer",
  ),
]

/** First 6 testimonials shown on homepage */
export const homepageTestimonials = testimonials.slice(0, 6)
