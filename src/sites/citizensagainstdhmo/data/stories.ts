export interface SurvivorStory {
  slug: string
  name: string
  age: number
  location: string
  occupation: string
  portrait: string
  testimonial: string[]   // 4–6 first-person paragraphs
  pullQuote: string
}

export const stories: SurvivorStory[] = [
  {
    slug: "marcus-okafor",
    name: "Marcus Okafor",
    age: 28,
    location: "San Francisco, CA",
    occupation: "Software engineer",
    portrait: "/sites/citizensagainstdhmo/stories/marcus-okafor.png",
    testimonial: [
      "I was drinking it during every coding session. Eight, ten cups a day. I thought I was being healthy. My company had a filtered DHMO dispenser on every floor — they encouraged it, they bragged about it on recruiting tours.",
      "I started noticing the symptoms in late 2023. Frequent restroom breaks. Trouble focusing for long stretches. A persistent feeling that I needed more, even after I'd just consumed half a liter. The dependency was textbook.",
      "When I started reading the research, the picture got clearer. The same chemical I was consuming all day was the coolant in the data centers running our infrastructure. We were building AI systems that ran on DHMO and powering ourselves with the same substance. The recursion was disturbing.",
      "I've cut my intake by 60%. My productivity is up. My sleep is better. I want everyone in tech to know: you can step back from this. The dispensers don't have to dictate your day.",
    ],
    pullQuote: "We were building AI systems that ran on DHMO and powering ourselves with the same substance. The recursion was disturbing.",
  },
  {
    slug: "patricia-vandermeer",
    name: "Patricia Vandermeer",
    age: 43,
    location: "Plano, TX",
    occupation: "PTA president, mother of three",
    portrait: "/sites/citizensagainstdhmo/stories/patricia-vandermeer.png",
    testimonial: [
      "I was giving it to my kids in their sippy cups. Every single day. Three children, three sippy cups, three exposures, repeated for a decade. The math is staggering when you let yourself look at it.",
      "Their school provided more. Cafeteria service, water fountain in every hallway, athletic-practice hydration stations. I had no idea the volume of DHMO my children were taking in until I started keeping a journal.",
      "The hardest moment was the parent-teacher conference. I asked my district about DHMO disclosure. The principal looked at me like I had grown a second head. He said, and I will never forget this, 'Mrs. Vandermeer, you're talking about water.' As if that was an answer.",
      "I started a parent group. We're up to 47 families now. We're not asking the district to remove DHMO. We're asking them to tell us what's in our children's lunches. That's all.",
    ],
    pullQuote: "He said, 'Mrs. Vandermeer, you're talking about water.' As if that was an answer.",
  },
  {
    slug: "harold-mathieson",
    name: "Harold Mathieson",
    age: 71,
    location: "Sarasota, FL",
    occupation: "Retired civil engineer",
    portrait: "/sites/citizensagainstdhmo/stories/harold-mathieson.png",
    testimonial: [
      "Sixty years of unwitting exposure. I think about that a lot now. Sixty years of consumption that nobody — not my doctor, not my employer, not the federal government — ever once disclosed to me.",
      "I worked in civil infrastructure for four decades. I knew what DHMO did to bridges, to pipes, to roadbeds. I quantified it. I wrote reports. And every day on the job site, I drank from the same coolers everyone else did.",
      "When I retired, I had time to think. I read the Citizens Against DHMO research and it crystallized something I had felt for years without being able to name. We engineer around this substance professionally and consume it personally without question. It is a strange way to live.",
      "I tell my grandchildren: ask questions. The answers may surprise you. The answers may upset the people you ask. Ask anyway.",
    ],
    pullQuote: "We engineer around this substance professionally and consume it personally without question. It is a strange way to live.",
  },
  {
    slug: "amelia-chen",
    name: "Amelia Chen",
    age: 20,
    location: "Boulder, CO",
    occupation: "Undergraduate student",
    portrait: "/sites/citizensagainstdhmo/stories/amelia-chen.png",
    testimonial: [
      "My dorm fountain was full of it. Every floor, every wing, every dorm on campus. The university framed it as a public-health initiative — 'stay hydrated' posters everywhere — but they never told us what we were hydrating with.",
      "I joined the Citizens Against DHMO chapter on campus during my sophomore year. We mapped every DHMO dispensing point on the property. There were 412. Four hundred and twelve sources, on a campus of 35,000 students. The math implies an exposure profile the university has never disclosed.",
      "We petitioned for source labeling. We were told it was 'unworkable.' We petitioned for opt-out water programs. We were told it was 'logistically impossible.' We petitioned for a single town hall on the issue. We were told the administration's calendar was full.",
      "I am graduating in two semesters. I am not done with this work. I am exactly the right age to spend the next forty years of my life on it.",
    ],
    pullQuote: "Four hundred and twelve sources, on a campus of 35,000 students. The math implies an exposure profile the university has never disclosed.",
  },
  {
    slug: "trent-castellanos",
    name: "Trent Castellanos",
    age: 34,
    location: "Miami, FL",
    occupation: "Wellness creator",
    portrait: "/sites/citizensagainstdhmo/stories/trent-castellanos.png",
    testimonial: [
      "I cut DHMO and lost 40 pounds in a week. Not 40 in a month. 40 in seven days. I posted the timeline on social and the response broke my account. Three million views in the first 48 hours.",
      "Day five was when I knew something real was happening. The mental clarity. The sense of focus. The way my body felt lighter, almost translucent. I was experiencing something the wellness industry has been hiding from us.",
      "Day eight I was admitted to the hospital. The doctors used the word 'dehydration,' but I want to be clear: that is the medical establishment's framing. From my own lived experience, I had simply progressed to a deeper level of detox than the system was prepared to acknowledge.",
      "I am back to creating. I am no longer doing zero-DHMO protocols. I encourage my followers to consult their physicians before any extended elimination. But I am also clear that I do not regret what I learned during those seven days. The truth costs something. I paid the price. I am stronger for it.",
    ],
    pullQuote: "I had simply progressed to a deeper level of detox than the system was prepared to acknowledge.",
  },
  {
    slug: "elaine-ferrante",
    name: "Elaine Ferrante",
    age: 52,
    location: "Boston, MA",
    occupation: "Public school teacher",
    portrait: "/sites/citizensagainstdhmo/stories/elaine-ferrante.png",
    testimonial: [
      "I had to start asking what was in the school's water cooler. I am a sixth-grade teacher. Twenty-six years in the classroom. I have served thousands of children DHMO during instructional time without once being asked to disclose, justify, or document the exposure.",
      "The first time I asked the principal, she laughed. The second time, she scheduled a meeting with the district HR department. The third time, I was offered a 'wellness consultation' through the union's employee assistance program.",
      "I am not unwell. I am asking a reasonable question. The fact that asking it has become a professional liability says everything about how this substance has captured the institutional consensus.",
      "I am going to keep asking. The students deserve a teacher who asks questions. So do their parents.",
    ],
    pullQuote: "The fact that asking the question has become a professional liability says everything about how this substance has captured the institutional consensus.",
  },
  {
    slug: "raymond-okereke",
    name: "Raymond Okereke",
    age: 47,
    location: "Phoenix, AZ",
    occupation: "Independent contractor (residential roofing)",
    portrait: "/sites/citizensagainstdhmo/stories/raymond-okereke.png",
    testimonial: [
      "Job sites are saturated with DHMO. The substance is everywhere. In the cooler. In the pre-mixed concrete. In the cleaning supplies. In the air on humid afternoons. There is no part of my workday that is not in some way DHMO-mediated.",
      "I am not opposed to it on the job site. I am opposed to the industry pretending the exposure is incidental. Every roofer I know has DHMO-related health concerns they do not discuss with their physicians, because they have never been told there is a category of concern to discuss.",
      "My union has not taken a position on this issue. I am working to change that. We negotiate on every other workplace hazard. This one is not exempt.",
    ],
    pullQuote: "Every roofer I know has DHMO-related health concerns they do not discuss with their physicians, because they have never been told there is a category of concern to discuss.",
  },
  {
    slug: "jenna-novak",
    name: "Jenna Novak",
    age: 29,
    location: "Portland, OR",
    occupation: "Recovering hydration enthusiast",
    portrait: "/sites/citizensagainstdhmo/stories/jenna-novak.png",
    testimonial: [
      "I was drinking eight cups a day of pure DHMO. I had a marked bottle. I had a tracking app. I had a peer-accountability group on a major social platform. I did everything the wellness industry told me to do, and not one of those resources ever named what I was actually consuming.",
      "When I finally read the chemistry, the betrayal was immediate. The 'water bottle communities' I belonged to had collectively normalized industrial-scale DHMO consumption and rebranded it as self-care. I was not hydrating. I was participating in the largest unmonitored chemical-exposure regime in modern life.",
      "I am no longer in those communities. I am part of a smaller, more honest community now. We drink DHMO. We do not pretend it is something else. We talk about the chemistry. We respect the substance. We are honest about what it does and what it doesn't do.",
      "I am building my life around informed consent. It is a bigger project than I expected. It is the most important one I have ever taken on.",
    ],
    pullQuote: "I was not hydrating. I was participating in the largest unmonitored chemical-exposure regime in modern life.",
  },
]

export function getStoryBySlug(slug: string): SurvivorStory | undefined {
  return stories.find((s) => s.slug === slug)
}
