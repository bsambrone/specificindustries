export interface Testimonial {
  quote: string
  name: string
  title: string
  image: string
}

export const testimonials: Testimonial[] = [
  {
    quote: "I used to waste 45 minutes a day CHEWING. Now I snort my meals in seconds and use that time to optimize my LinkedIn presence.",
    name: "Marcus Chen",
    title: "Growth Hacker & Biohacker",
    image: "/sites/snortables/testimonial-marcus-chen.png",
  },
  {
    quote: "As a competitive eater, Snortables let me consume 40% more calories per hour by freeing up my mouth for the actual competition.",
    name: "Chad Gullet",
    title: "Nathan's Hot Dog Contest Runner-Up",
    image: "/sites/snortables/testimonial-chad-gullet.png",
  },
  {
    quote: "I snorted the Sunday Roast at my wedding reception. My wife left me but my macros were IMMACULATE.",
    name: "Derek Pullman",
    title: "Divorced But Optimized",
    image: "/sites/snortables/testimonial-derek-pullman.png",
  },
  {
    quote: "My doctor said 'please stop doing this.' But my OTHER doctor — the one I found on Reddit — said it's fine.",
    name: "Tamara Voss",
    title: "Wellness Influencer",
    image: "/sites/snortables/testimonial-tamara-voss.png",
  },
  {
    quote: "I replaced all solid food with Snortables six months ago. I've lost 30 pounds and the ability to taste, but my quarterly review was phenomenal.",
    name: "Jason Kile",
    title: "Senior VP of Nothing Specific",
    image: "/sites/snortables/testimonial-jason-kile.png",
  },
  {
    quote: "Gave Tiny Nostrils to my kids. They haven't complained once. They also haven't spoken to me in weeks but I'm sure that's unrelated.",
    name: "Brenda Faulk",
    title: "Mother of the Year (Self-Awarded)",
    image: "/sites/snortables/testimonial-brenda-faulk.png",
  },
  {
    quote: "I brought JOLT to my corporate retreat. HR wants to 'have a conversation' but my presentation was 3 hours of pure fire.",
    name: "Ryan Ashford",
    title: "Suspended Account Executive",
    image: "/sites/snortables/testimonial-ryan-ashford.png",
  },
  {
    quote: "Finally, a product that understands the nasal cavity is the most underutilized organ in the human body.",
    name: "Dr. Patricia Hollowell",
    title: "Unlicensed Nutritionist",
    image: "/sites/snortables/testimonial-patricia-hollowell.png",
  },
  {
    quote: "I tried to explain Snortables to my grandmother. She called the police. Five stars.",
    name: "Nina Cabrera",
    title: "Early Adopter",
    image: "/sites/snortables/testimonial-nina-cabrera.png",
  },
  {
    quote: "MorningRail replaced my coffee, my alarm clock, and my will to engage in normal human breakfast rituals.",
    name: "Simone Archer",
    title: "4am Productivity Blogger",
    image: "/sites/snortables/testimonial-simone-archer.png",
  },
  {
    quote: "The Crème Brûlée Blast made me cry. Not from emotion — from the caramelized sugar particles. But also from emotion.",
    name: "François Delacroix",
    title: "Pastry Chef (Retired Under Duress)",
    image: "/sites/snortables/testimonial-francois-delacroix.png",
  },
  {
    quote: "My gym banned me for snorting BroTein in the locker room. I now work out in my garage and I've never been more powerful.",
    name: "Tony Mazetti",
    title: "Garage Gym Evangelist",
    image: "/sites/snortables/testimonial-tony-mazetti.png",
  },
  {
    quote: "I'm a food critic and I've never been more conflicted. The Full Bird has incredible terroir but the delivery mechanism concerns me professionally.",
    name: "Eleanor Whittaker",
    title: "Michelin-Adjacent Reviewer",
    image: "/sites/snortables/testimonial-eleanor-whittaker.png",
  },
  {
    quote: "Snortables saved my marriage. We used to argue about what's for dinner. Now we just argue about my 'powder hobby.'",
    name: "Greg & Diane Hofstra",
    title: "Couples Therapy Regulars",
    image: "/sites/snortables/testimonial-greg-diane-hofstra.png",
  },
  {
    quote: "I've been using GreenRush for 6 months. My sinuses are green now. Like, literally green. But I feel INCREDIBLE.",
    name: "Asher Bloom",
    title: "Organic Lifestyle Advocate",
    image: "/sites/snortables/testimonial-asher-bloom.png",
  },
  {
    quote: "I snorted HydroSnort instead of drinking water for a month. The ER doctors called it 'unprecedented' which I'm choosing to take as a compliment.",
    name: "Kyle Brandt",
    title: "Hydration Pioneer",
    image: "/sites/snortables/testimonial-kyle-brandt.png",
  },
]

/** First 6 testimonials shown on homepage */
export const homepageTestimonials = testimonials.slice(0, 6)
