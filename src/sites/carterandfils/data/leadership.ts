export interface Executive {
  slug: string
  name: string
  title: string
  bio: string
  quote: string
  image: string
  referencePerson: "bill" | "brandon" | "jim" | "sean"
}

export const executives: Executive[] = [
  {
    slug: "carter",
    name: "Étienne Carter",
    title: "Seventh-Generation Proprietor & Head Winemaker",
    bio: "Étienne represents the seventh Carter generation to steward this estate. Raised among the oak barrels and the low Allegheny mist, he apprenticed under his father in the cellar from the age of twelve. After a formative decade in Burgundy, he returned in 2005 to modernize the cellar while preserving the family's methods. His hands, he will tell you, know the depth of a proper ferment without thermometer or gauge. He does not discuss viscosity in public.",
    quote: "The terroir speaks, if you have the patience to listen through the ground.",
    image: "/sites/carterandfils/exec-carter.png",
    referencePerson: "bill",
  },
  {
    slug: "dumoulin",
    name: "Rémi Dumoulin",
    title: "Cellar Master",
    bio: "Rémi has served the estate for twenty-six years, rising from apprentice to Cellar Master under Étienne's grandfather and then his father. He is responsible for every barrel on the premises, every fermentation, every decision about racking and bottling. He keeps a notebook bound in oiled cloth and has not been seen without it since 2003. He remains unmarried and politely declines all inquiries on the matter.",
    quote: "A barrel, given time, will tell you what it is.",
    image: "/sites/carterandfils/exec-dumoulin.png",
    referencePerson: "brandon",
  },
  {
    slug: "whitford",
    name: "Archibald Whitford",
    title: "Chief Sommelier",
    bio: "Archibald joined Domaine Carter & Fils in 2014, following a distinguished career on the sommelier staff of several Bordeaux estates. An Englishman by birth and a traditionalist by conviction, he maintains that no tasting should take less than forty minutes and that a glass once poured should never be rushed. His presence at the estate has earned quiet remark in the industry press.",
    quote: "A wine rewards the drinker it deserves.",
    image: "/sites/carterandfils/exec-whitford.png",
    referencePerson: "jim",
  },
  {
    slug: "beaufort",
    name: "Laurent Beaufort",
    title: "Director of Terroir & Vineyard Operations",
    bio: "Laurent oversees the estate's 1,200 acres of vines and the deep geological work that underlies them. A trained geologist as well as a viticulturist, he believes — correctly — that the Allegheny shale is the true voice of every bottle that leaves the cellar. He spends most of his working hours outdoors and insists, against all evidence, that he is not superstitious.",
    quote: "The shale remembers. The vine merely repeats.",
    image: "/sites/carterandfils/exec-beaufort.png",
    referencePerson: "sean",
  },
]

export function getExecutiveBySlug(slug: string): Executive | undefined {
  return executives.find((e) => e.slug === slug)
}
