// src/sites/elderparty/data/volunteer.ts

export interface VolunteerActivity {
  slug: string
  title: string
  description: string
  details: string
  image: string
}

export const activities: VolunteerActivity[] = [
  {
    slug: "canvass",
    title: "Canvass Your Neighborhood",
    description: "Knock three times. If no one answers, leave a pamphlet. If something answers, proceed with the script.",
    details: "Door-to-door outreach is the backbone of any campaign. The Elder Party provides canvassing kits with pamphlets, talking points, and a script that has been 'optimized for persuasion by experts whose methods we do not question.' Canvassers report high engagement rates and a conversion ratio that defies statistical modeling.",
    image: "/sites/elderparty/volunteer-canvass.png",
  },
  {
    slug: "watch-party",
    title: "Host a Watch Party",
    description: "Debate watch parties and 'study groups.' Suggested reading list includes the Necronomicon.",
    details: "Gather friends, family, and neighbors to watch debates, campaign events, and 'other broadcasts' that air on frequencies most televisions don't receive. The campaign provides a host kit with talking points, snack suggestions, and a curated reading list. The Necronomicon is optional but recommended for advanced study groups.",
    image: "/sites/elderparty/volunteer-watch-party.png",
  },
  {
    slug: "phone-bank",
    title: "Phone Bank",
    description: "Call your neighbors. If the line sounds like the ocean, you've reached the right number.",
    details: "Phone banking is critical in swing states and swing dimensions. The campaign provides call lists, scripts, and a dedicated phone banking platform. Shifts are available around the clock — the 2-4 AM shifts are the most productive, according to data that our analytics team describes as 'consistent but difficult to explain.'",
    image: "/sites/elderparty/volunteer-phone-bank.png",
  },
  {
    slug: "register-voters",
    title: "Register Voters",
    description: "All sentient entities are eligible. Sapience is preferred but not required.",
    details: "Voter registration is the foundation of democracy. The Elder Party's registration drive operates in parks, campuses, community centers, and 'other gathering points.' Registrars are trained to process standard voter registration forms and a supplementary form for 'non-traditional registrants' that the party has submitted to the FEC for review.",
    image: "/sites/elderparty/volunteer-register.png",
  },
  {
    slug: "campus-organizing",
    title: "Campus Organizing",
    description: "Miskatonic University chapter leads the way. Advisors are standing by. Some of them are standing behind you.",
    details: "Start an Elder Party chapter at your college or university. The Miskatonic University chapter — the party's flagship campus organization — provides a template for chapter formation, event planning, and 'recruitment activities that have proven effective in academic settings.' Faculty advisors are available, though they may contact you before you contact them.",
    image: "/sites/elderparty/volunteer-campus.png",
  },
  {
    slug: "precinct-captain",
    title: "Become a Precinct Captain",
    description: "Precinct Captains report directly to Field Director Olmstead. Weekly check-ins occur whether you initiate them or not.",
    details: "For the most committed volunteers, the Precinct Captain role offers direct involvement in campaign operations. Captains coordinate canvassing, manage local volunteer teams, and maintain their precinct's summoning circle (training provided). Weekly check-ins with Field Director Hastur Olmstead are mandatory — though several captains report that the check-ins 'happen regardless of whether you pick up the phone.'",
    image: "/sites/elderparty/volunteer-precinct-captain.png",
  },
]
