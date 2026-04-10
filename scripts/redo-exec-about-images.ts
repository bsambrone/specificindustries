/**
 * Regenerate setting-exec-bathroom and about-origin with improved prompts.
 * Usage: npx tsx scripts/redo-exec-about-images.ts
 */

import OpenAI, { toFile } from "openai";
import { writeFileSync, readFileSync, readdirSync } from "node:fs";
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

async function main() {
  console.log("\n=== Redo: setting-exec-bathroom + about-origin ===\n");

  // 1. setting-exec-bathroom: toilet paper roll placed properly (on holder/counter), not hung on mirror
  console.log("  GEN   setting-exec-bathroom.png ...");
  const execResponse = await openai.images.generate({
    model: "gpt-image-1" as any,
    prompt: "A roll of sandpaper toilet paper sitting on a toilet paper holder next to a toilet in a luxurious corporate executive bathroom. Marble countertops, modern fixtures, elegant lighting. The rough brown sandpaper roll looks completely out of place in the upscale setting. Wide shot showing the full bathroom.",
    size: "1536x1024",
    quality: "high",
  });
  const execB64 = (execResponse as any).data?.[0]?.b64_json;
  if (!execB64) throw new Error("No data for setting-exec-bathroom");
  writeFileSync(path.join(OUT_DIR, "setting-exec-bathroom.png"), Buffer.from(execB64, "base64"));
  console.log("  DONE  setting-exec-bathroom.png");

  // 2. about-origin: Bill in flannel (not white shirt), construction/renovation background, no lightbulb
  //    More photorealistic, less AI-looking
  const billPhotos = getPersonPhotos("bill", 2);
  console.log(`  GEN   about-origin.png (refs: ${billPhotos.map((p) => path.basename(p)).join(", ")}) ...`);
  const imageFiles = await Promise.all(billPhotos.map((p) => toImageFile(p)));
  const aboutResponse = await openai.images.edit({
    model: "gpt-image-1" as any,
    image: imageFiles as any,
    prompt: "A candid photo of a man wearing a flannel shirt in a half-renovated bathroom, holding a piece of sandpaper and looking at it with a sudden realization and concern. Construction tools and renovation debris around him. Natural lighting from a window. Photojournalism style, candid and unstaged.",
    size: "1024x1024",
  });
  const aboutB64 = (aboutResponse as any).data?.[0]?.b64_json;
  if (!aboutB64) throw new Error("No data for about-origin");
  writeFileSync(path.join(OUT_DIR, "about-origin.png"), Buffer.from(aboutB64, "base64"));
  console.log("  DONE  about-origin.png");

  console.log("\n=== Done! ===\n");
}

main().catch((err) => {
  console.error("\nFATAL:", err.message || err);
  process.exit(1);
});
