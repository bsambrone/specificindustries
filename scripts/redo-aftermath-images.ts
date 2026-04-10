/**
 * Regenerate the 3 aftermath images with improved prompts.
 * Usage: npx tsx scripts/redo-aftermath-images.ts
 */

import OpenAI, { toFile } from "openai";
import { existsSync, mkdirSync, writeFileSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";

// Load .env
const envPath = path.resolve(__dirname, "../.env");
for (const line of readFileSync(envPath, "utf-8").split("\n")) {
  const match = line.match(/^\s*([^#=]+?)\s*=\s*(.*?)\s*$/);
  if (match) process.env[match[1]] = match[2];
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const OUT_DIR = path.resolve(__dirname, "../public/sites/truegrit");
const BASE_IMAGES_DIR = path.resolve(__dirname, "../mcp/image-gen/base-images");

const mimeTypes: Record<string, string> = {
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp",
};

function getPersonPhotos(name: string, count = 2): string[] {
  const dir = path.join(BASE_IMAGES_DIR, name);
  const files = readdirSync(dir).filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f));
  const shuffled = [...files].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map((f) => path.join(dir, f));
}

async function toImageFile(filePath: string) {
  const ext = path.extname(filePath).toLowerCase();
  const mime = mimeTypes[ext] || "image/png";
  return toFile(readFileSync(filePath), path.basename(filePath), { type: mime });
}

async function generateWithPerson(
  filename: string,
  prompt: string,
  personPhotoPaths: string[],
  size: "1024x1024" | "1536x1024" | "1024x1536" = "1024x1024",
) {
  const outPath = path.join(OUT_DIR, filename);
  console.log(`  GEN   ${filename} (refs: ${personPhotoPaths.map((p) => path.basename(p)).join(", ")}) ...`);

  const imageFiles = await Promise.all(personPhotoPaths.map((p) => toImageFile(p)));
  const response = await openai.images.edit({
    model: "gpt-image-1" as any,
    image: imageFiles as any,
    prompt,
    size,
  });

  const b64 = (response as any).data?.[0]?.b64_json;
  if (!b64) throw new Error(`No image data returned for ${filename}`);
  writeFileSync(outPath, Buffer.from(b64, "base64"));
  console.log(`  DONE  ${filename}`);
  return outPath;
}

async function main() {
  console.log("\n=== Aftermath Image Regeneration ===\n");

  // 1. aftermath-before: Bill in a bathroom, NOT wearing a white shirt, happy/naive
  const billPhotos = getPersonPhotos("bill", 2);
  const beforePath = await generateWithPerson(
    "aftermath-before.png",
    "A man standing in a modern bathroom, looking naive and happy, smiling confidently, wearing a casual dark colored t-shirt. Bright cheerful bathroom lighting, tile walls and bathroom fixtures visible in background.",
    billPhotos,
  );

  // 2. aftermath-after: Same person, same outfit, same bathroom, but concerned/shell-shocked
  // Use the just-generated before image as a reference alongside Bill's photos for consistency
  const afterRefs = [...billPhotos, beforePath];
  await generateWithPerson(
    "aftermath-after.png",
    "The exact same man in the exact same bathroom wearing the exact same dark colored t-shirt as the reference photo, but now looking shell-shocked, deeply concerned, and distressed. Same room, same lighting but slightly muted, same outfit. His expression has completely changed from happy to worried and shaken.",
    afterRefs,
  );

  // 3. aftermath-hero: All 4 team members together in a warehouse
  // Pass 1 photo from each person (4 reference images)
  const billRef = getPersonPhotos("bill", 1);
  const brandonRef = getPersonPhotos("brandon", 1);
  const jimRef = getPersonPhotos("jim", 1);
  const seanRef = getPersonPhotos("sean", 1);
  const allRefs = [...billRef, ...brandonRef, ...jimRef, ...seanRef];

  await generateWithPerson(
    "aftermath-hero.png",
    "Four men standing together in an industrial warehouse setting, all looking concerned and worried. They are the same four people from the reference photos. Industrial lighting, sandpaper products visible on shelves behind them. All wearing casual work clothes.",
    allRefs,
    "1536x1024",
  );

  console.log("\n=== Done! ===\n");
}

main().catch((err) => {
  console.error("\nFATAL:", err.message || err);
  process.exit(1);
});
