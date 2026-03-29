import { listPeople } from "../utils/base-images.js";

export async function handleListBaseImages() {
  const people = listPeople();

  if (Object.keys(people).length === 0) {
    return {
      content: [
        {
          type: "text" as const,
          text: "No base images found. Create person folders in base-images/ with photo files (jpg, png, webp).",
        },
      ],
    };
  }

  return {
    content: [
      {
        type: "text" as const,
        text: JSON.stringify(people, null, 2),
      },
    ],
  };
}
