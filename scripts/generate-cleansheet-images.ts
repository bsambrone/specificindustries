/**
 * Generate all images for The Clean Sheet satirical laundromat site.
 * Usage: npx tsx scripts/generate-cleansheet-images.ts
 */

import OpenAI, { toFile } from "openai";
import { writeFileSync, readFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";

// Load .env
const envPath = path.resolve(__dirname, "../.env");
for (const line of readFileSync(envPath, "utf-8").split("\n")) {
  const match = line.match(/^\s*([^#=]+?)\s*=\s*(.*?)\s*$/);
  if (match) process.env[match[1]] = match[2];
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const OUT_DIR = path.resolve(__dirname, "../public/sites/cleansheet");
const BASE_IMAGES_DIR = path.resolve(__dirname, "../mcp/image-gen/base-images");

const mimeTypes: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
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

async function generateScene(filename: string, prompt: string, size: string = "1536x1024") {
  if (existsSync(path.join(OUT_DIR, filename))) {
    console.log(`  SKIP  ${filename} (already exists)`);
    return;
  }
  console.log(`  GEN   ${filename} ...`);
  const response = await openai.images.generate({
    model: "gpt-image-1" as any,
    prompt,
    size: size as any,
    quality: "high",
  });
  const b64 = (response as any).data?.[0]?.b64_json;
  if (!b64) throw new Error(`No data for ${filename}`);
  writeFileSync(path.join(OUT_DIR, filename), Buffer.from(b64, "base64"));
  console.log(`  DONE  ${filename}`);
}

async function generatePerson(
  filename: string,
  person: string,
  prompt: string,
  size: string = "1024x1024",
) {
  if (existsSync(path.join(OUT_DIR, filename))) {
    console.log(`  SKIP  ${filename} (already exists)`);
    return;
  }
  const photos = getPersonPhotos(person, 2);
  console.log(
    `  GEN   ${filename} (refs: ${photos.map((p) => path.basename(p)).join(", ")}) ...`,
  );
  const imageFiles = await Promise.all(photos.map((p) => toImageFile(p)));
  const response = await openai.images.edit({
    model: "gpt-image-1" as any,
    image: imageFiles as any,
    prompt,
    size: size as any,
  });
  const b64 = (response as any).data?.[0]?.b64_json;
  if (!b64) throw new Error(`No data for ${filename}`);
  writeFileSync(path.join(OUT_DIR, filename), Buffer.from(b64, "base64"));
  console.log(`  DONE  ${filename}`);
}

async function main() {
  console.log("\n=== Generating Clean Sheet Images ===\n");

  // --- Scene Images ---

  await generateScene(
    "hero.png",
    "Interior of a pristine, bright, upscale laundromat. White marble floors, rows of chrome industrial washing machines, ice blue LED accent lighting. Luxury spa-like atmosphere, immaculately clean. No people. Modern minimalist design. Professional architectural photography.",
  );

  await generateScene(
    "about-hero.png",
    "Exterior photograph of an upscale laundromat storefront on a clean city street. White facade, large plate glass windows showing chrome machines inside, minimalist black signage. Late afternoon golden light. Classic yet modern architecture. Professional photography.",
  );

  await generateScene(
    "about-process.png",
    "Interior of a large modern industrial laundry processing facility. Rows of large commercial chrome washing machines and dryers stretching into the distance. White tile walls, bright even lighting, spotlessly clean floors. Industrial scale but premium feel. Professional photography.",
  );

  await generateScene(
    "contact-hero.png",
    "Reception area of an upscale laundromat. White marble reception counter, minimalist decor, a single potted plant, ice blue accent lighting. Professional, welcoming but sterile. Like a luxury hotel lobby. No people. Clean lines and modern design. Professional photography.",
  );

  await generateScene(
    "service-fresh-start.png",
    "Neatly folded stack of pristine white linens and dress shirts on a white marble surface. Soft natural lighting, clean white background. Minimalist, luxury feel. Professional product photography.",
  );

  await generateScene(
    "service-full-cycle.png",
    "Close-up of a high-end chrome commercial washing machine mid-cycle, with blue-lit interior visible through the glass door. Water and suds visible. Dramatic lighting against a dark background. Professional photography.",
  );

  await generateScene(
    "service-offshore-dry-cleaning.png",
    "Premium garment bags hanging on a chrome rack with international shipping labels and customs stickers attached. Clean white background with subtle tropical plant in the corner. Professional product photography.",
  );

  await generateScene(
    "service-bulk-processing.png",
    "Wide shot of a massive industrial laundry facility with dozens of commercial washing machines in rows, processing large volumes. Bright overhead lighting, clean concrete floors, high ceilings. Scale and capacity emphasized. Professional industrial photography.",
  );

  await generateScene(
    "service-executive-press.png",
    "A private luxury garment pressing suite. A single professional steam press on a marble surface, dim warm mood lighting, frosted glass partition, a plush chair in the corner. Exclusive and private atmosphere. Professional photography.",
  );

  await generateScene(
    "service-stain-consultation.png",
    "A minimalist private consultation room with two modern chairs facing each other across a small white table. White walls, a frosted glass door, soft clinical lighting. Spare and professional. Professional photography.",
  );

  // --- Leadership Portraits ---

  await generatePerson(
    "team-bill.png",
    "bill",
    "Professional portrait photograph of a confident middle-aged Italian-American businessman in a tailored dark navy suit, standing in front of gleaming chrome industrial washing machines in an upscale laundromat. Arms crossed, slight knowing smile. White tile and blue accent lighting in the background. Sharp, professional, slightly intimidating. Photorealistic portrait photography.",
  );

  await generatePerson(
    "team-jim.png",
    "jim",
    "Professional portrait photograph of a tough-looking middle-aged man in a rolled-up white dress shirt with a crisp monogrammed apron, standing next to a large commercial washing machine in an upscale laundromat. One hand resting on the machine. Serious expression, strong build. White tile background, bright lighting. Photorealistic portrait photography.",
  );

  await generatePerson(
    "team-sean.png",
    "sean",
    "Professional portrait photograph of a clean-cut man in a dark polo shirt, leaning casually against a white marble counter in an upscale laundromat. Friendly but unreadable expression. Well-groomed, professional. Chrome machines blurred in the background. Soft lighting. Photorealistic portrait photography.",
  );

  await generatePerson(
    "team-brandon.png",
    "brandon",
    "Professional portrait photograph of a worldly-looking man in a tailored suit jacket with no tie, standing near garment racks in a shipping and processing area. Confident, well-traveled appearance. Garment bags and shipping containers visible behind him. Professional lighting. Photorealistic portrait photography.",
  );

  console.log("\n=== All Clean Sheet images generated! ===\n");
}

main().catch((err) => {
  console.error("\nFATAL:", err.message || err);
  process.exit(1);
});
