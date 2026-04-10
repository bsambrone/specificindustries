import { z } from "zod";
import { createReadStream } from "node:fs";
import { writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { openai } from "../utils/openai.js";
import { validateDimensions, validateFilename } from "../utils/validation.js";
import {
  listPeople,
  resolvePersonFolder,
  selectRandomImages,
  getBaseImagePaths,
} from "../utils/base-images.js";

const GENERATED_DIR = path.resolve(process.cwd(), "generated-images");

export const generateImageWithPersonSchema = {
  prompt: z.string().describe("The image generation prompt (should describe the person/scene)"),
  width: z.number().describe("Image width in pixels (1024 or 1536)"),
  height: z.number().describe("Image height in pixels (1024 or 1536)"),
  filename: z.string().describe("Output filename"),
  role: z
    .enum(["founder", "team_member"])
    .optional()
    .describe("Auto-picks person: founder → Bill, team_member → random friend"),
  person: z
    .string()
    .optional()
    .describe("Explicit person name (e.g., 'jim'), overrides role"),
  quality: z
    .enum(["low", "medium", "high"])
    .default("high")
    .describe("Generation quality (default: high)"),
};

export async function handleGenerateImageWithPerson(args: {
  prompt: string;
  width: number;
  height: number;
  filename: string;
  role?: "founder" | "team_member";
  person?: string;
  quality: "low" | "medium" | "high";
}) {
  const dimError = validateDimensions(args.width, args.height);
  if (dimError) return { content: [{ type: "text" as const, text: dimError }], isError: true };

  const fileError = validateFilename(args.filename);
  if (fileError) return { content: [{ type: "text" as const, text: fileError }], isError: true };

  const people = listPeople();
  const availableNames = Object.keys(people);

  if (availableNames.length === 0) {
    return {
      content: [
        {
          type: "text" as const,
          text: "No base images found. Create person folders in base-images/ with photo files (jpg, png, webp).",
        },
      ],
      isError: true,
    };
  }

  let personName: string;
  try {
    personName = resolvePersonFolder(
      { person: args.person, role: args.role },
      availableNames
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { content: [{ type: "text" as const, text: message }], isError: true };
  }

  const personFiles = people[personName];
  const selectedFiles = selectRandomImages(personFiles, 2);
  const imagePaths = getBaseImagePaths(personName, selectedFiles);

  const size = `${args.width}x${args.height}` as "1024x1024" | "1536x1024" | "1024x1536";

  try {
    const imageStreams = imagePaths.map((p) => createReadStream(p));

    // gpt-image-1 via /images/edits — do NOT pass response_format or input_fidelity
    // (they trigger a dall-e-2-only validation bug). b64_json is the default anyway.
    const response = await openai.images.edit({
      model: "gpt-image-1" as any,
      image: imageStreams as any,
      prompt: args.prompt,
      size,
    });

    const b64Data = response.data?.[0]?.b64_json;
    if (!b64Data) {
      return { content: [{ type: "text" as const, text: "No image data in API response" }], isError: true };
    }

    mkdirSync(GENERATED_DIR, { recursive: true });
    const outputPath = path.join(GENERATED_DIR, args.filename);
    writeFileSync(outputPath, Buffer.from(b64Data, "base64"));

    return {
      content: [
        {
          type: "text" as const,
          text: `Image generated successfully.\nPath: ${outputPath}\nPerson: ${personName}\nReference photos: ${selectedFiles.join(", ")}\nSize: ${size}\nQuality: ${args.quality}\nInput fidelity: high`,
        },
      ],
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { content: [{ type: "text" as const, text: `OpenAI API error: ${message}` }], isError: true };
  }
}
