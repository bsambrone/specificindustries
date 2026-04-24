export interface Chapter {
  region: string
  city: string
  state: string
  chairName: string
  founded: string
  members: number
}

export const chapters: Chapter[] = [
  { region: "Pacific Northwest", city: "Portland", state: "OR", chairName: "Caldwell Briggs", founded: "2017", members: 1840 },
  { region: "Mid-Atlantic", city: "Philadelphia", state: "PA", chairName: "Dr. Moira Petrescu", founded: "2018", members: 2410 },
  { region: "Northeast", city: "Boston", state: "MA", chairName: "Linda Morrissey", founded: "2018", members: 3120 },
  { region: "Mountain West", city: "Boulder", state: "CO", chairName: "Rev. Thomasina Oakes", founded: "2019", members: 1290 },
  { region: "Midwest", city: "North Kansas City", state: "MO", chairName: "Tony Mazetti", founded: "2020", members: 970 },
  { region: "Southwest", city: "Tucson", state: "AZ", chairName: "Nina Cabrera", founded: "2021", members: 1140 },
]
