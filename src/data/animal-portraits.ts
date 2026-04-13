export interface AnimalPortrait {
  slug: string
  name: string
  species: string
  image: string
}

export const animalPortraits: AnimalPortrait[] = [
  { slug: "gerald-goldfish",    name: "Gerald",   species: "Goldfish",  image: "/shared/animal-testimonials/gerald-goldfish.png" },
  { slug: "linda-tortoise",     name: "Linda",    species: "Tortoise",  image: "/shared/animal-testimonials/linda-tortoise.png" },
  { slug: "kevin-snake",        name: "Kevin",    species: "Snake",     image: "/shared/animal-testimonials/kevin-snake.png" },
  { slug: "diane-parrot",       name: "Diane",    species: "Parrot",    image: "/shared/animal-testimonials/diane-parrot.png" },
  { slug: "steve-sloth",        name: "Steve",    species: "Sloth",     image: "/shared/animal-testimonials/steve-sloth.png" },
  { slug: "barbara-cow",        name: "Barbara",  species: "Cow",       image: "/shared/animal-testimonials/barbara-cow.png" },
  { slug: "dennis-hamster",     name: "Dennis",   species: "Hamster",   image: "/shared/animal-testimonials/dennis-hamster.png" },
  { slug: "patricia-cat",       name: "Patricia", species: "Cat",       image: "/shared/animal-testimonials/patricia-cat.png" },
  { slug: "frank-pigeon",       name: "Frank",    species: "Pigeon",    image: "/shared/animal-testimonials/frank-pigeon.png" },
  { slug: "margaret-chicken",   name: "Margaret", species: "Chicken",   image: "/shared/animal-testimonials/margaret-chicken.png" },
  { slug: "doug-dog",           name: "Doug",     species: "Dog",       image: "/shared/animal-testimonials/doug-dog.png" },
  { slug: "cynthia-goat",       name: "Cynthia",  species: "Goat",      image: "/shared/animal-testimonials/cynthia-goat.png" },
]

export function getAnimalPortrait(slug: string): AnimalPortrait | undefined {
  return animalPortraits.find((p) => p.slug === slug)
}
