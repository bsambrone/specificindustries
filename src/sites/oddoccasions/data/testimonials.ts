import { getPortrait } from "@/data/testimonial-portraits"

export interface Testimonial {
  quote: string
  name: string
  title: string
  image: string
  productSlug: string
}

function withPortrait(slug: string, quote: string, title: string, productSlug: string): Testimonial {
  const portrait = getPortrait(slug)
  if (!portrait) throw new Error(`Unknown testimonial portrait: ${slug}`)
  return { quote, title, name: portrait.name, image: portrait.image, productSlug }
}

export const testimonials: Testimonial[] = [
  // Workplace
  withPortrait("brenda-faulk", "I sent this to a coworker seven years after the incident. She cried. Then she showed me the fridge lock was already installed. We're closer now.", "Sent the Sorry I Ate Your Labeled Lunch box", "sorry-i-ate-your-labeled-lunch-in-2017"),
  withPortrait("jason-kile", "My manager got promoted to 'Senior Associate Lead.' This box was the only gift that matched the energy. He put the desk plaque up immediately.", "Sent the Congrats on Your Mild Promotion box", "congrats-on-your-mild-promotion"),
  withPortrait("tony-mazetti", "I received this after not hitting Reply All on a 200-person thread about the kitchen microwave. I wear the pin every day.", "Received the Thanks for Not Replying All box", "thanks-for-not-replying-all"),
  withPortrait("derek-pullman", "The USB mute button has saved me three times since I got this box. The candle is also surprisingly good.", "Received the Sorry I Unmuted You box", "sorry-i-unmuted-you-during-your-rant"),
  withPortrait("simone-archer", "I didn't know this person's name for three years and this box somehow made the farewell genuine. The breakroom coffee was a perfect touch.", "Sent the Happy Last Day box", "happy-last-day-to-someone-whose-name-i-should-know"),
  withPortrait("kyle-brandt", "Survived my fourth reorg. The stress ball shaped like a pivot table is now my most-used desk item.", "Received the Congrats on Surviving the Reorg box", "congrats-on-surviving-the-reorg"),
  withPortrait("patricia-hollowell", "Eight months of silent parking lot tension, resolved by a $0.47 gas card. I have never felt more seen.", "Received the Sorry I Stole Your Parking Spot box", "sorry-i-stole-your-parking-spot-for-8-months"),

  // Social
  withPortrait("marcus-chen", "I sent this to someone I met at a SaaS conference in 2022. We've now had our second conversation. Progress.", "Sent the We Met Once at a Networking Event box", "we-met-once-at-a-networking-event"),
  withPortrait("nina-cabrera", "I ghosted my college roommate for four years. This box reopened the conversation. The friendship re-application form took her three days to fill out.", "Sent the Sorry I Ghosted You in 2019 box", "sorry-i-ghosted-you-in-2019"),
  withPortrait("chad-gullet", "My friend has been serving me dry chicken for six years. I finally sent this. The honest seasoning kit was a risk but the take-out menu softened the blow.", "Sent the Thanks for Pretending to Like My Cooking box", "thanks-for-pretending-to-like-my-cooking"),
  withPortrait("ryan-ashford", "I brought an acoustic guitar to my friend's housewarming. This box arrived two days later. The guitar pick shadowbox is now on my wall. I've made peace with it.", "Received the Sorry I Brought a Guitar box", "sorry-i-brought-a-guitar-to-your-party"),
  withPortrait("eleanor-whittaker", "I love canceling plans and I finally feel celebrated for it. The solo popcorn was the perfect serving size.", "Received the Congrats on Canceling Plans box", "congrats-on-canceling-plans-without-guilt"),

  // Digital
  withPortrait("tamara-voss", "I forgot to cancel three free trials in one month. My roommate sent me this. The tracker calendar is now on my fridge.", "Received the Condolences for Your Expired Free Trial box", "condolences-for-your-expired-free-trial"),
  withPortrait("francois-delacroix", "My wife saw my 11-hour screen time and said nothing. But the box arrived on Monday. The phone stand facing away from witnesses was a masterclass in passive support.", "Received the Sorry I Saw Your Screen Time Report box", "sorry-i-saw-your-screen-time-report"),
  withPortrait("asher-bloom", "I went viral for a tweet about sandwiches. The blank follow-up content strategy page was painfully accurate.", "Received the Congrats on Your First Viral Post box", "congrats-on-your-first-viral-post"),
  withPortrait("greg-diane-hofstra", "We've been resetting the same Netflix password for our entire marriage. This box was our anniversary gift to each other. The sticky note is now framed.", "Shared the Happy Anniversary of Your Password box", "happy-anniversary-of-your-password-you-cant-remember"),

  // Family
  withPortrait("tony-mazetti", "I sent this to my brother. He hung the 'Second Favorite' ribbon on his fridge. Mom saw it. She denied everything. We all know.", "Sent the Sorry I'm Your Mother's Favorite box", "sorry-im-your-mothers-favorite"),
  withPortrait("nina-cabrera", "My sister kept my secret for 12 years. The wax seal kit was the most dramatic way I could say thank you, and she deserved every bit of it.", "Sent the Thanks for Not Telling Mom box", "thanks-for-not-telling-mom"),
  withPortrait("kyle-brandt", "Year two of living with my parents. The 'Temporary' welcome mat is still there. So am I. The cactus is thriving, which is more than I can say for my independence.", "Received the Happy Anniversary of Moving Back In box", "happy-anniversary-of-moving-back-in"),
  withPortrait("patricia-hollowell", "My toddler said the word at Thanksgiving dinner. My brother-in-law sent this the next day. The incident report was uncomfortably detailed.", "Related to the Sorry I Taught Your Kid That Word box", "sorry-i-taught-your-kid-that-word"),

  // Milestones
  withPortrait("simone-archer", "I turned 26 and immediately received a bill that made me reconsider adulthood. This box was waiting on my doorstep. The single aspirin was darkly perfect.", "Received the Congrats on Aging Out box", "congrats-on-aging-out-of-your-insurance-plan"),
  withPortrait("derek-pullman", "My wife calculated my 10,000th day alive and gave me this box at breakfast. The counter was already wrong by dinner. I've never felt more alive and more aware of time.", "Received the Happy 10,000th Day Alive box", "happy-10000th-day-alive"),
  withPortrait("marcus-chen", "I killed my sourdough starter during a work trip. My partner sent this. The new kit came with instructions in a larger font. I deserved that.", "Received the Sorry Your Sourdough Starter Died box", "sorry-your-sourdough-starter-died"),
  withPortrait("brenda-faulk", "I went to the gym once in January. My friend sent this in May. The protein bar was expired but honestly so was my motivation.", "Received the Congrats on Finally Using Your Gym Membership box", "congrats-on-finally-using-your-gym-membership"),
  withPortrait("chad-gullet", "We split the Netflix account in the divorce. This box arrived from my buddy the same week. The 'Starting Over' watchlist was actually really good.", "Received the Happy Divorce from Your Streaming Service box", "happy-divorce-from-your-streaming-service"),
  withPortrait("ryan-ashford", "My favorite taco place closed and I found out by driving past. My wife had already ordered this box. The candle smells close enough to make me emotional.", "Received the Sorry Your Favorite Restaurant Closed box", "sorry-you-found-out-your-favorite-restaurant-closed"),
]

/** Get 2-4 testimonials for a given product slug */
export function getTestimonialsForProduct(productSlug: string): Testimonial[] {
  return testimonials.filter((t) => t.productSlug === productSlug)
}

/** Get a few featured testimonials for the homepage */
export const homepageTestimonials = testimonials.filter((_, i) => [0, 8, 14, 20].includes(i))
