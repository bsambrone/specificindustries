import { readdirSync } from "node:fs";
import path from "node:path";

export const FOUNDER_NAME = "bill";

const BASE_IMAGES_DIR = path.resolve(process.cwd(), "base-images");

export interface PersonSelection {
  person?: string;
  role?: "founder" | "team_member";
}

export function listPeople(): Record<string, string[]> {
  let entries: string[];
  try {
    entries = readdirSync(BASE_IMAGES_DIR, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);
  } catch {
    return {};
  }

  const result: Record<string, string[]> = {};
  for (const person of entries) {
    const personDir = path.join(BASE_IMAGES_DIR, person);
    const files = readdirSync(personDir).filter((f) =>
      /\.(jpg|jpeg|png|webp)$/i.test(f)
    );
    if (files.length > 0) {
      result[person] = files;
    }
  }
  return result;
}

export function resolvePersonFolder(
  selection: PersonSelection,
  availablePeople: string[]
): string {
  if (selection.person) {
    if (!availablePeople.includes(selection.person)) {
      throw new Error(
        `Person "${selection.person}" not found. Available: ${availablePeople.join(", ")}`
      );
    }
    return selection.person;
  }

  if (selection.role === "founder") {
    return FOUNDER_NAME;
  }

  if (selection.role === "team_member") {
    const nonFounders = availablePeople.filter((p) => p !== FOUNDER_NAME);
    if (nonFounders.length === 0) {
      throw new Error("No team member base images available (only founder found)");
    }
    return nonFounders[Math.floor(Math.random() * nonFounders.length)];
  }

  throw new Error(
    "Either 'role' (founder/team_member) or 'person' (name) must be provided"
  );
}

export function selectRandomImages(files: string[], count: number): string[] {
  if (files.length <= count) return [...files];
  const shuffled = [...files].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function getBaseImagePaths(personName: string, selectedFiles: string[]): string[] {
  return selectedFiles.map((f) => path.join(BASE_IMAGES_DIR, personName, f));
}
