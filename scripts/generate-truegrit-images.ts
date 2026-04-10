/**
 * Generate all True Grit Personal Care images using OpenAI's image APIs.
 *
 * Usage:  npx tsx scripts/generate-truegrit-images.ts
 *
 * Reads OPENAI_API_KEY from .env in project root.
 * Outputs to public/sites/truegrit/.
 * Skips images that already exist (delete a file to regenerate it).
 */

import OpenAI, { toFile } from "openai";
import { existsSync, mkdirSync, writeFileSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

// Load .env manually (no dotenv dependency needed)
const envPath = path.resolve(__dirname, "../.env");
const envContents = readFileSync(envPath, "utf-8");
for (const line of envContents.split("\n")) {
  const match = line.match(/^\s*([^#=]+?)\s*=\s*(.*?)\s*$/);
  if (match) process.env[match[1]] = match[2];
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const OUT_DIR = path.resolve(__dirname, "../public/sites/truegrit");
const BASE_IMAGES_DIR = path.resolve(__dirname, "../mcp/image-gen/base-images");

mkdirSync(OUT_DIR, { recursive: true });

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getPersonPhotos(name: string, count = 2): string[] {
  const dir = path.join(BASE_IMAGES_DIR, name);
  const files = readdirSync(dir).filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f));
  const shuffled = [...files].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map((f) => path.join(dir, f));
}

async function generateImage(
  filename: string,
  prompt: string,
  size: "1024x1024" | "1536x1024" | "1024x1536" = "1024x1024",
) {
  const outPath = path.join(OUT_DIR, filename);
  if (existsSync(outPath)) {
    console.log(`  SKIP  ${filename} (already exists)`);
    return;
  }

  console.log(`  GEN   ${filename} ...`);
  const response = await openai.images.generate({
    model: "gpt-image-1" as any,
    prompt,
    size,
    quality: "high",
  });

  const b64 = (response as any).data?.[0]?.b64_json;
  if (!b64) throw new Error(`No image data returned for ${filename}`);
  writeFileSync(outPath, Buffer.from(b64, "base64"));
  console.log(`  DONE  ${filename}`);
}

async function generateImageWithPerson(
  filename: string,
  prompt: string,
  person: string,
  size: "1024x1024" | "1536x1024" | "1024x1536" = "1024x1024",
) {
  const outPath = path.join(OUT_DIR, filename);
  if (existsSync(outPath)) {
    console.log(`  SKIP  ${filename} (already exists)`);
    return;
  }

  const photos = getPersonPhotos(person);
  console.log(`  GEN   ${filename} (person: ${person}, refs: ${photos.map((p) => path.basename(p)).join(", ")}) ...`);

  const mimeTypes: Record<string, string> = {
    ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp",
  };
  const imageFiles = await Promise.all(
    photos.map((p) => {
      const ext = path.extname(p).toLowerCase();
      const mime = mimeTypes[ext] || "image/png";
      return toFile(readFileSync(p), path.basename(p), { type: mime });
    }),
  );
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
}

// ---------------------------------------------------------------------------
// Image definitions from Task 11
// ---------------------------------------------------------------------------

async function main() {
  console.log("\n=== True Grit Image Generation ===\n");
  console.log(`Output: ${OUT_DIR}\n`);

  // Step 2: Favicon
  console.log("--- Favicon ---");
  await generateImage(
    "favicon.png",
    "A toilet paper roll made of sandpaper, rough brown texture with visible grit, simple icon style on white background, hardware store product photography",
  );

  // Step 3: Hero
  console.log("--- Hero ---");
  await generateImage(
    "hero.png",
    "Close-up dramatic photo of rough sandpaper texture, warm industrial lighting, shallow depth of field, orange-tinted lighting, hardware store aesthetic",
    "1536x1024",
  );

  // Step 4: Product images (8)
  console.log("--- Products ---");
  const products: [string, string][] = [
    ["product-original-40.png", "A roll of toilet paper made from brown sandpaper, 40-grit rough texture visible, product photography on clean white background, hardware store catalog style"],
    ["product-80-grit.png", "A roll of toilet paper made from finer sandpaper, slightly smoother texture, product photography on clean white background, labeled 'sensitive', hardware store catalog"],
    ["product-24-grit.png", "A roll of toilet paper made from very coarse sandpaper, rough aggressive texture visible, product photography on clean white background, hardware store catalog"],
    ["product-hand-towels.png", "A pack of folded brown sandpaper hand towels, C-fold dispenser style, product photography on clean white background, industrial supply catalog"],
    ["product-hydroblast.png", "A sleek wall-mounted bidet with industrial pressure gauge showing 500 PSI, brass nozzle, reinforced steel supply line, product photography on clean white background"],
    ["product-acidjet.png", "A wall-mounted bidet with attached chemical reservoir tank, hazard symbols on the reservoir, safety goggles hanging from it, product photography on clean white background"],
    ["product-recovery-balm.png", "A jar of soothing cream/balm with simple industrial label, medicinal green/white packaging, product photography on clean white background"],
    ["product-starter-kit.png", "A gift box containing three rolls of sandpaper toilet paper in different grits and a jar of balm, open box product photography on clean white background"],
  ];
  for (const [filename, prompt] of products) {
    await generateImage(filename, prompt);
  }

  // Step 5: Setting images (3)
  console.log("--- Settings ---");
  await generateImage(
    "setting-exec-bathroom.png",
    "Sandpaper toilet paper roll displayed in a luxurious corporate executive bathroom, marble counters, modern fixtures, the roll looks out of place",
    "1536x1024",
  );
  await generateImage(
    "setting-home-bathroom.png",
    "Sandpaper toilet paper roll in a beautiful modern home bathroom, clean white tiles, the rough brown roll contrasts with the elegant setting",
    "1536x1024",
  );
  await generateImage(
    "setting-portapotty.png",
    "Sandpaper toilet paper roll inside a construction site portable toilet/portapotty, gritty realistic setting, the product fits right in",
    "1536x1024",
  );

  // Step 6: Experience page images (7) — all subjects look concerned
  console.log("--- Experience ---");
  await generateImageWithPerson(
    "experience-prep-1.png",
    "A man examining a sandpaper toilet paper roll with concern and worry on his face, standing in a nice bathroom setting, warm lighting",
    "bill",
  );
  await generateImageWithPerson(
    "experience-prep-2.png",
    "A man reading product instructions for sandpaper toilet paper with growing concern on his face, standing in a bathroom setting",
    "jim",
  );
  await generateImageWithPerson(
    "experience-application-1.png",
    "A man looking deeply concerned and uncomfortable, implied bathroom setting, tasteful composition, warm lighting",
    "brandon",
  );
  await generateImageWithPerson(
    "experience-application-2.png",
    "A man looking alarmed and concerned, implied bathroom setting, warm lighting, tasteful composition",
    "sean",
  );
  await generateImageWithPerson(
    "experience-realization-1.png",
    "A man with a dawning realization expression, looking very concerned, in a bathroom setting",
    "bill",
  );
  await generateImageWithPerson(
    "experience-acceptance-1.png",
    "A man looking resigned but clean, concerned expression on his face, bathroom setting",
    "jim",
  );
  await generateImageWithPerson(
    "experience-hero.png",
    "Four men standing near a bathroom door all looking concerned and worried, warm industrial lighting",
    "bill",
    "1536x1024",
  );

  // Step 7: Aftermath page images (3)
  console.log("--- Aftermath ---");
  await generateImageWithPerson(
    "aftermath-before.png",
    "A man looking naive and happy, smiling confidently, bright cheerful lighting, casual setting",
    "bill",
  );
  await generateImageWithPerson(
    "aftermath-after.png",
    "A man looking shell-shocked but clean, deeply concerned expression, muted lighting",
    "bill",
  );
  await generateImageWithPerson(
    "aftermath-hero.png",
    "A team of men in a warehouse setting looking concerned, industrial lighting, sandpaper products visible",
    "bill",
    "1536x1024",
  );

  // Step 8: Behind the Scenes images (6)
  console.log("--- Behind the Scenes ---");
  const bts: [string, string][] = [
    ["bts-sandblaster.png", "Industrial sandblasting machine in a warehouse, workers in safety gear smirking knowingly, warm lighting"],
    ["bts-belt-sander.png", "Industrial belt sander cutting station in factory, worker smirking, orange safety vest"],
    ["bts-grinding.png", "Industrial grinding equipment in factory, quality control station, workers smirking"],
    ["bts-packaging.png", "Packaging station in industrial warehouse, boxes with sandpaper products, workers smirking"],
    ["bts-facility.png", "Wide shot of industrial warehouse facility interior, machinery, warm lighting"],
    ["bts-hero.png", "Industrial warehouse hero shot, dramatic lighting, sandpaper manufacturing equipment"],
  ];
  for (const [filename, prompt] of bts) {
    await generateImage(filename, prompt, "1536x1024");
  }

  // Step 9: Leadership portraits (4) — all concerned, wearing flannel
  console.log("--- Leadership ---");
  await generateImageWithPerson(
    "team-bill.png",
    "Professional headshot, man wearing flannel shirt, looking concerned, workshop/industrial background, warm lighting",
    "bill",
  );
  await generateImageWithPerson(
    "team-jim.png",
    "Professional headshot, man wearing flannel shirt, looking concerned, laboratory/workshop background",
    "jim",
  );
  await generateImageWithPerson(
    "team-brandon.png",
    "Professional headshot, man wearing flannel shirt, looking concerned, office with industrial decor",
    "brandon",
  );
  await generateImageWithPerson(
    "team-sean.png",
    "Professional headshot, man wearing flannel shirt, looking concerned, warehouse background",
    "sean",
  );

  // Step 10: Checkout construction image
  console.log("--- Checkout ---");
  await generateImage(
    "checkout-construction.png",
    "A construction worker looking at sandpaper toilet paper products with a bemused expression, hard hat, safety vest, workshop setting",
  );

  // Step 11: About page origin image
  console.log("--- About ---");
  await generateImageWithPerson(
    "about-origin.png",
    "Man in a half-renovated bathroom looking at a piece of sandpaper with a lightbulb moment expression but also concern, renovation tools around",
    "bill",
  );

  console.log("\n=== Done! ===\n");
}

main().catch((err) => {
  console.error("\nFATAL:", err.message || err);
  process.exit(1);
});
