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
  // ── Workplace ──────────────────────────────────────────────
  withPortrait("brenda-faulk", "I sent this to a coworker seven years after the incident. She cried. Then she showed me the fridge lock was already installed. We're closer now.", "Sent the Sorry I Ate Your Labeled Lunch box", "sorry-i-ate-your-labeled-lunch-in-2017"),
  withPortrait("asher-bloom", "I stole my desk neighbor's clearly labeled pad thai in 2017. I've thought about it every single day since. The aged parchment apology was the closure I didn't know I needed.", "Sent the Sorry I Ate Your Labeled Lunch box", "sorry-i-ate-your-labeled-lunch-in-2017"),

  withPortrait("jason-kile", "My manager got promoted to 'Senior Associate Lead.' This box was the only gift that matched the energy. He put the desk plaque up immediately.", "Sent the Congrats on Your Mild Promotion box", "congrats-on-your-mild-promotion"),
  withPortrait("tamara-voss", "I got promoted from Coordinator to Senior Coordinator. Same desk. Same salary. This box understood the assignment better than my company did.", "Received the Congrats on Your Mild Promotion box", "congrats-on-your-mild-promotion"),

  withPortrait("tony-mazetti", "I received this after not hitting Reply All on a 200-person thread about the kitchen microwave. I wear the pin every day.", "Received the Thanks for Not Replying All box", "thanks-for-not-replying-all"),
  withPortrait("eleanor-whittaker", "I watched 47 people Reply All to an email about the holiday party. The four of us who didn't all received this box from our manager. It was the most seen I've ever felt at work.", "Received the Thanks for Not Replying All box", "thanks-for-not-replying-all"),

  withPortrait("derek-pullman", "The USB mute button has saved me three times since I got this box. The candle is also surprisingly good.", "Received the Sorry I Unmuted You box", "sorry-i-unmuted-you-during-your-rant"),
  withPortrait("nina-cabrera", "My coworker unmuted me while I was giving a very honest assessment of our Q3 strategy. She sent this the next morning. The revisionist meeting minutes were a nice touch.", "Received the Sorry I Unmuted You box", "sorry-i-unmuted-you-during-your-rant"),

  withPortrait("simone-archer", "I didn't know this person's name for three years and this box somehow made the farewell genuine. The breakroom coffee was a perfect touch.", "Sent the Happy Last Day box", "happy-last-day-to-someone-whose-name-i-should-know"),
  withPortrait("francois-delacroix", "Someone on the fourth floor left and I still don't know what they did here. I sent this box. They emailed me a thank you. I still don't know what they did here.", "Sent the Happy Last Day box", "happy-last-day-to-someone-whose-name-i-should-know"),

  withPortrait("kyle-brandt", "Survived my fourth reorg. The stress ball shaped like a pivot table is now my most-used desk item.", "Received the Congrats on Surviving the Reorg box", "congrats-on-surviving-the-reorg"),
  withPortrait("greg-diane-hofstra", "We both survived the reorg but ended up in different departments. We sent each other the same box on the same day. The org charts were already outdated by the time they arrived.", "Survived the same reorg together", "congrats-on-surviving-the-reorg"),

  withPortrait("patricia-hollowell", "Eight months of silent parking lot tension, resolved by a $0.47 gas card. I have never felt more seen.", "Received the Sorry I Stole Your Parking Spot box", "sorry-i-stole-your-parking-spot-for-8-months"),
  withPortrait("jason-kile", "I knew it was her spot. She knew I knew. The hand-drawn map of alternative spots included one labeled 'technically a loading zone' and I respect that level of honesty.", "Received the Sorry I Stole Your Parking Spot box", "sorry-i-stole-your-parking-spot-for-8-months"),

  // ── Social & Friendship ────────────────────────────────────
  withPortrait("marcus-chen", "I sent this to someone I met at a SaaS conference in 2022. We've now had our second conversation. Progress.", "Sent the We Met Once at a Networking Event box", "we-met-once-at-a-networking-event"),
  withPortrait("derek-pullman", "I received this from someone whose face I vaguely recognize. The framed LinkedIn connection confirmed we are, technically, in each other's networks. I have displayed it ironically. Or sincerely. I'm not sure.", "Received the We Met Once at a Networking Event box", "we-met-once-at-a-networking-event"),

  withPortrait("nina-cabrera", "I ghosted my college roommate for four years. This box reopened the conversation. The friendship re-application form took her three days to fill out.", "Sent the Sorry I Ghosted You in 2019 box", "sorry-i-ghosted-you-in-2019"),
  withPortrait("tony-mazetti", "My buddy disappeared for three years and then this box showed up. The handwritten timeline of excuses was six pages long. Not one of them was good. I appreciated every page.", "Received the Sorry I Ghosted You in 2019 box", "sorry-i-ghosted-you-in-2019"),

  withPortrait("chad-gullet", "My friend has been serving me dry chicken for six years. I finally sent this. The honest seasoning kit was a risk but the take-out menu softened the blow.", "Sent the Thanks for Pretending to Like My Cooking box", "thanks-for-pretending-to-like-my-cooking"),
  withPortrait("simone-archer", "I have been eating my neighbor's casserole at every block party for two years. She sent me this box. The embroidered napkin now lives in my kitchen as a reminder that kindness has limits.", "Related to the Thanks for Pretending to Like My Cooking box", "thanks-for-pretending-to-like-my-cooking"),

  withPortrait("ryan-ashford", "I brought an acoustic guitar to my friend's housewarming. This box arrived two days later. The guitar pick shadowbox is now on my wall. I've made peace with it.", "Received the Sorry I Brought a Guitar box", "sorry-i-brought-a-guitar-to-your-party"),
  withPortrait("brenda-faulk", "My husband brought his guitar to my boss's dinner party. I sent him this the next day. He has not brought the guitar to a social event since. The aux cord was the turning point.", "Sent the Sorry I Brought a Guitar box", "sorry-i-brought-a-guitar-to-your-party"),

  withPortrait("eleanor-whittaker", "I love canceling plans and I finally feel celebrated for it. The solo popcorn was the perfect serving size.", "Received the Congrats on Canceling Plans box", "congrats-on-canceling-plans-without-guilt"),
  withPortrait("asher-bloom", "My friend canceled on me and then sent me this box as a thank you for not guilt-tripping her. I was going to guilt-trip her. The Valid Excuse Generator booklet changed my perspective.", "Received the Congrats on Canceling Plans box", "congrats-on-canceling-plans-without-guilt"),

  withPortrait("kyle-brandt", "I sent this to everyone in my group chat after nobody could confirm whose birthday it was. Three of them said 'it's not mine.' The fourth said nothing. We still don't know.", "Sent the Happy Birthday to Someone box", "happy-birthday-to-someone-in-this-group-chat"),
  withPortrait("tamara-voss", "I received this for a birthday that was actually three days ago. The recycled confetti felt appropriate. The generic card was signed by people I'm 80% sure are real.", "Received the Happy Birthday to Someone box", "happy-birthday-to-someone-in-this-group-chat"),

  // ── Digital Life ───────────────────────────────────────────
  withPortrait("tamara-voss", "I forgot to cancel three free trials in one month. My roommate sent me this. The tracker calendar is now on my fridge.", "Received the Condolences for Your Expired Free Trial box", "condolences-for-your-expired-free-trial"),
  withPortrait("marcus-chen", "I let a meditation app charge me $79.99 for a year of inner peace I never accessed. My wife sent this. The dried sympathy bouquet was the right level of mourning.", "Received the Condolences for Your Expired Free Trial box", "condolences-for-your-expired-free-trial"),

  withPortrait("francois-delacroix", "My wife saw my 11-hour screen time and said nothing. But the box arrived on Monday. The phone stand facing away from witnesses was a masterclass in passive support.", "Received the Sorry I Saw Your Screen Time Report box", "sorry-i-saw-your-screen-time-report"),
  withPortrait("patricia-hollowell", "My teenager left her phone unlocked and I saw the screen time report. I sent this to her as a peace offering. She said the blue light glasses were 'actually kind of cute.'", "Sent the Sorry I Saw Your Screen Time Report box", "sorry-i-saw-your-screen-time-report"),

  withPortrait("asher-bloom", "I went viral for a tweet about sandwiches. The blank follow-up content strategy page was painfully accurate.", "Received the Congrats on Your First Viral Post box", "congrats-on-your-first-viral-post"),
  withPortrait("nina-cabrera", "My recipe video got 2 million views and then nothing I posted ever performed again. My sister sent this three months later. The 'Micro-Famous' sash is now draped over my ring light.", "Received the Congrats on Your First Viral Post box", "congrats-on-your-first-viral-post"),

  withPortrait("chad-gullet", "I have a reply guy. He has replied to every single one of my posts since 2021. My coworker sent me this. The 'Well Actually' repellent spray sits on my desk now.", "Received the Sorry About Your Reply Guy box", "sorry-about-your-reply-guy"),
  withPortrait("eleanor-whittaker", "Someone I went to high school with has been correcting my grammar in every Facebook post for four years. My daughter sent me this. The block button polishing cloth was cathartic.", "Received the Sorry About Your Reply Guy box", "sorry-about-your-reply-guy"),

  withPortrait("greg-diane-hofstra", "We've been resetting the same Netflix password for our entire marriage. This box was our anniversary gift to each other. The sticky note is now framed.", "Shared the Happy Anniversary of Your Password box", "happy-anniversary-of-your-password-you-cant-remember"),
  withPortrait("ryan-ashford", "I have reset my bank password 23 times this year. My wife stopped counting and started shopping for this box instead. The pencil stays on my desk as a daily reminder of my failures.", "Received the Happy Anniversary of Your Password box", "happy-anniversary-of-your-password-you-cant-remember"),

  withPortrait("francois-delacroix", "I dropped my phone face-down on concrete outside the Apple Store. The irony was not lost on me. My friend sent this box. The 'too late' phone case lives on my new phone now as a cautionary tale.", "Received the Condolences on Your Dropped Phone box", "condolences-on-your-dropped-phone-screen-down"),
  withPortrait("brenda-faulk", "The silence between the drop and the flip was the longest two seconds of my life. My husband had already ordered this box by the time I got home. The screen crack acceptance guide got me through it.", "Received the Condolences on Your Dropped Phone box", "condolences-on-your-dropped-phone-screen-down"),

  // ── Family ─────────────────────────────────────────────────
  withPortrait("tony-mazetti", "I sent this to my brother. He hung the 'Second Favorite' ribbon on his fridge. Mom saw it. She denied everything. We all know.", "Sent the Sorry I'm Your Mother's Favorite box", "sorry-im-your-mothers-favorite"),
  withPortrait("chad-gullet", "My sister sent me this. I didn't even argue. The peace treaty is now signed and hanging in the hallway between our childhood bedrooms. Mom still denies it.", "Received the Sorry I'm Your Mother's Favorite box", "sorry-im-your-mothers-favorite"),

  withPortrait("nina-cabrera", "My sister kept my secret for 12 years. The wax seal kit was the most dramatic way I could say thank you, and she deserved every bit of it.", "Sent the Thanks for Not Telling Mom box", "thanks-for-not-telling-mom"),
  withPortrait("derek-pullman", "My brother still doesn't know I know. I keep the wax-sealed pact in my desk drawer. The snack bribe replenishment pack was a practical and appreciated touch.", "Received the Thanks for Not Telling Mom box", "thanks-for-not-telling-mom"),

  withPortrait("kyle-brandt", "Year two of living with my parents. The 'Temporary' welcome mat is still there. So am I. The cactus is thriving, which is more than I can say for my independence.", "Received the Happy Anniversary of Moving Back In box", "happy-anniversary-of-moving-back-in"),
  withPortrait("jason-kile", "My parents sent me this on the one-year anniversary of my 'temporary' return. The apartment listing printout was passive-aggressive genius. I love them.", "Received the Happy Anniversary of Moving Back In box", "happy-anniversary-of-moving-back-in"),

  withPortrait("patricia-hollowell", "My toddler said the word at Thanksgiving dinner. My brother-in-law sent this the next day. The incident report was uncomfortably detailed.", "Related to the Sorry I Taught Your Kid That Word box", "sorry-i-taught-your-kid-that-word"),
  withPortrait("greg-diane-hofstra", "Our nephew learned a word from us at the barbecue. He said it to the pastor the following Sunday. The participation trophy now sits on our mantle as a warning.", "Sent the Sorry I Taught Your Kid That Word box", "sorry-i-taught-your-kid-that-word"),

  withPortrait("simone-archer", "I connected the printer at Thanksgiving 2022. I have since configured two routers, recovered a hacked Facebook account, and explained what 'the cloud' is four times. This box arrived from my cousin. The flowchart is laminated, which tells me she knows I'll need it again.", "Received the Congrats on Becoming the Family IT Person box", "congrats-on-becoming-the-family-it-person"),
  withPortrait("marcus-chen", "I fixed my mom's iPad once and now I'm on call for the entire extended family. The business card reading 'Not Actually in IT' has been handed out at three family events. Nobody has read it.", "Received the Congrats on Becoming the Family IT Person box", "congrats-on-becoming-the-family-it-person"),

  // ── Milestones & Life Events ───────────────────────────────
  withPortrait("simone-archer", "I turned 26 and immediately received a bill that made me reconsider adulthood. This box was waiting on my doorstep. The single aspirin was darkly perfect.", "Received the Congrats on Aging Out box", "congrats-on-aging-out-of-your-insurance-plan"),
  withPortrait("asher-bloom", "My dad handed me this box on my 26th birthday along with a pamphlet about marketplace enrollment. The 'Deductible' pronunciation guide was the most helpful gift I received that year.", "Received the Congrats on Aging Out box", "congrats-on-aging-out-of-your-insurance-plan"),

  withPortrait("derek-pullman", "My wife calculated my 10,000th day alive and gave me this box at breakfast. The counter was already wrong by dinner. I've never felt more alive and more aware of time.", "Received the Happy 10,000th Day Alive box", "happy-10000th-day-alive"),
  withPortrait("eleanor-whittaker", "My daughter calculated my 10,000th day alive and threw me a party. Attendance: her and the cat. The existential reflection journal was three pages, which was exactly the right amount.", "Received the Happy 10,000th Day Alive box", "happy-10000th-day-alive"),

  withPortrait("marcus-chen", "I killed my sourdough starter during a work trip. My partner sent this. The new kit came with instructions in a larger font. I deserved that.", "Received the Sorry Your Sourdough Starter Died box", "sorry-your-sourdough-starter-died"),
  withPortrait("tamara-voss", "I named my sourdough starter. I talked to it. I forgot to feed it for nine days. The memorial jar now sits on my counter as a monument to my hubris. The fridge magnet is helping with the second one.", "Received the Sorry Your Sourdough Starter Died box", "sorry-your-sourdough-starter-died"),

  withPortrait("brenda-faulk", "I went to the gym once in January. My friend sent this in May. The protein bar was expired but honestly so was my motivation.", "Received the Congrats on Finally Using Your Gym Membership box", "congrats-on-finally-using-your-gym-membership"),
  withPortrait("tony-mazetti", "I paid for a gym membership for six months and went once to use the sauna. My wife sent this. The 'I Went Once' medal is on my nightstand. I consider it aspirational.", "Received the Congrats on Finally Using Your Gym Membership box", "congrats-on-finally-using-your-gym-membership"),

  withPortrait("chad-gullet", "We split the Netflix account in the divorce. This box arrived from my buddy the same week. The 'Starting Over' watchlist was actually really good.", "Received the Happy Divorce from Your Streaming Service box", "happy-divorce-from-your-streaming-service"),
  withPortrait("nina-cabrera", "My roommate moved out and took the Hulu password with her. My other roommate sent me this. The solo popcorn was exactly the right amount for the solo era.", "Received the Happy Divorce from Your Streaming Service box", "happy-divorce-from-your-streaming-service"),

  withPortrait("ryan-ashford", "My favorite taco place closed and I found out by driving past. My wife had already ordered this box. The candle smells close enough to make me emotional.", "Received the Sorry Your Favorite Restaurant Closed box", "sorry-you-found-out-your-favorite-restaurant-closed"),
  withPortrait("kyle-brandt", "The Thai place on my block closed without warning. I drove past and saw a smoothie shop. My girlfriend sent this box. The recipe attempt kit was a noble effort but it confirmed that some things can't be replicated.", "Received the Sorry Your Favorite Restaurant Closed box", "sorry-you-found-out-your-favorite-restaurant-closed"),
]

/** Get 2-4 testimonials for a given product slug */
export function getTestimonialsForProduct(productSlug: string): Testimonial[] {
  return testimonials.filter((t) => t.productSlug === productSlug)
}

/** Get a few featured testimonials for the homepage */
export const homepageTestimonials = testimonials.filter((_, i) => [0, 8, 14, 20].includes(i))
