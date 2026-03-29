import { z } from "zod";
import { writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { openai } from "../utils/openai.js";
import { validateDimensions, validateFilename } from "../utils/validation.js";

const GENERATED_DIR = path.resolve(process.cwd(), "generated-images");

export const generateImageSchema = {
  prompt: z.string().describe("The image generation prompt"),
  width: z.number().describe("Image width in pixels (1024 or 1536)"),
  height: z.number().describe("Image height in pixels (1024 or 1536)"),
  filename: z.string().describe("Output filename (e.g., hero.png)"),
  quality: z
    .enum(["low", "medium", "high"])
    .default("high")
    .describe("Generation quality (default: high)"),
};

export async function handleGenerateImage(args: {
  prompt: string;
  width: number;
  height: number;
  filename: string;
  quality: "low" | "medium" | "high";
}) {
  const dimError = validateDimensions(args.width, args.height);
  if (dimError) return { content: [{ type: "text" as const, text: dimError }], isError: true };

  const fileError = validateFilename(args.filename);
  if (fileError) return { content: [{ type: "text" as const, text: fileError }], isError: true };

  const size = `${args.width}x${args.height}` as "1024x1024" | "1536x1024" | "1024x1536";

  try {
    const response = await openai.images.generate({
      model: "gpt-image-1.5",
      prompt: args.prompt,
      size,
      quality: args.quality,
      response_format: "b64_json",
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
          text: `Image generated successfully.\nPath: ${outputPath}\nSize: ${size}\nQuality: ${args.quality}`,
        },
      ],
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { content: [{ type: "text" as const, text: `OpenAI API error: ${message}` }], isError: true };
  }
}
