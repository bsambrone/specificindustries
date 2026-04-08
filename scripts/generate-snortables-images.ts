/**
 * Generate all Snortables site images using OpenAI's image APIs.
 *
 * Usage:  npx tsx scripts/generate-snortables-images.ts
 *
 * Reads OPENAI_API_KEY from .env in project root.
 * Outputs to public/sites/snortables/.
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
const OUT_DIR = path.resolve(__dirname, "../public/sites/snortables");
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
// Image definitions
// ---------------------------------------------------------------------------

async function main() {
  console.log("\n=== Snortables Image Generation ===\n");
  console.log(`Output: ${OUT_DIR}\n`);

  // --- Hero & General ---
  console.log("--- Hero & General ---");
  await generateImage(
    "hero.png",
    "Sleek product photography of multiple matte-black powder packets arranged on a reflective dark surface with electric green and cyan neon lighting, futuristic biohacker aesthetic, moody dark background with subtle smoke, professional product lineup shot",
    "1536x1024",
  );
  await generateImage(
    "favicon.png",
    "Minimalist icon design of a stylized nose silhouette with a small powder particle trail, electric green color on dark background, simple geometric app icon style, clean lines",
  );

  // --- Product Images (12) ---
  console.log("--- Products ---");
  const products: [string, string][] = [
    ["product-nasalfuel-original.png", "Sleek matte-black powder packet labeled 'NasalFuel Original' with electric green accent lines and typography, dark reflective surface, futuristic wellness product photography, moody dark background"],
    ["product-the-full-bird.png", "Matte-black powder packet labeled 'The Full Bird' with subtle turkey silhouette graphic in neon green, dark background, premium product photography"],
    ["product-sunday-roast.png", "Matte-black powder packet labeled 'Sunday Roast' with warm amber and gold accent lines, dark background, premium product photography"],
    ["product-hydrosnort.png", "Translucent blue-tinted matte-black packet labeled 'HydroSnort' with cyan water droplet graphics and neon blue accents, dark background, product photography"],
    ["product-greenrush.png", "Matte-black powder packet labeled 'GreenRush' with vibrant green leaf graphics and neon green accents, dark background, premium product photography"],
    ["product-morningrail.png", "Matte-black powder packet labeled 'MorningRail' with warm amber coffee-colored accents and sunrise graphic, dark background, morning energy aesthetic"],
    ["product-jolt.png", "Bold matte-black packet labeled 'JOLT' in large electric yellow text with red warning-style accent stripes, high energy aggressive aesthetic, dark background"],
    ["product-brotein.png", "Matte-black powder packet labeled 'BroTein' with cyan and electric green athletic accents, muscular energy aesthetic, dark background, product photography"],
    ["product-tiny-nostrils.png", "Smaller matte-black packet labeled 'Tiny Nostrils' with playful colorful stars and child-friendly accents on dark background, still sleek but slightly whimsical"],
    ["product-creme-brulee-blast.png", "Elegant matte-black packet labeled 'Crème Brûlée Blast' with gold and cream luxury accents, caramel drip graphic, dessert sophistication, dark background"],
    ["product-the-sampler.png", "Premium matte-black box case labeled 'The Sampler Pack' with lid open showing 12 smaller packets inside, a small mirror and stainless steel straw visible, dark background, product photography"],
    ["product-nasalfuel-prime.png", "Premium matte-black packet labeled 'NasalFuel Prime' with gold trim border and electric green accents, premium subscription tier aesthetic, dark background, luxury product photography"],
  ];
  for (const [filename, prompt] of products) {
    await generateImage(filename, prompt);
  }

  // --- Process Images (6) — with base image people ---
  console.log("--- Process ---");
  await generateImageWithPerson(
    "process-sourcing.png",
    "A man in a lab coat and safety goggles inspecting a beautifully plated roast beef dinner at a fine dining restaurant, taking notes on a clipboard, waitstaff looking concerned in background, warm restaurant lighting mixed with clinical inspection aesthetic, the man looks pleased and professional",
    "sean",
    "1536x1024",
  );
  await generateImageWithPerson(
    "process-acquisition.png",
    "A man hauling armfuls of whole Thanksgiving turkeys out of a grocery store, beaming with joy and excitement, shopping carts overflowing with turkeys in background, bright grocery store lighting, enthusiastic maniacal expression",
    "jim",
    "1536x1024",
  );
  await generateImageWithPerson(
    "process-pulverization.png",
    "A man feeding a complete roast beef dinner including a gravy boat into an industrial wood chipper, grinning maniacally with joy, huge cloud of fine powder spraying out the other end, industrial facility with neon green accent lighting, dramatic action shot",
    "bill",
    "1536x1024",
  );
  await generateImageWithPerson(
    "process-quality.png",
    "A man in a full white hazmat suit carefully examining a line of white powder on a stainless steel laboratory table using a magnifying glass, microscope and scientific instruments around him, clinical lab setting with blue-tinted fluorescent lighting, serious scientific inspection pose",
    "brandon",
    "1536x1024",
  );
  await generateImageWithPerson(
    "process-packaging.png",
    "A man in a clean room suit carefully portioning white powder into sleek matte-black packets on a conveyor belt workstation, a comically oversized rubber stamp reading DEFINITELY NOT SUSPICIOUS visible on the desk, clean room environment with neon green accent lighting",
    "sean",
    "1536x1024",
  );
  await generateImageWithPerson(
    "process-shipping.png",
    "A man loading unmarked matte-black boxes into the back of a dark van at night, giving an enthusiastic thumbs up to the camera with a big grin, the van has tiny text on the side, nighttime urban loading dock setting, dramatic shadows with neon green accent lighting",
    "jim",
    "1536x1024",
  );

  // --- Leadership Portraits (4) — with base image people ---
  console.log("--- Leadership ---");
  await generateImageWithPerson(
    "exec-phelps.png",
    "Professional corporate headshot portrait of a confident man in a sharp dark suit with an electric green pocket square, slight smirk, dark moody studio background with subtle neon green accent lighting from the side, CEO executive portrait style",
    "bill",
  );
  await generateImageWithPerson(
    "exec-whitfield.png",
    "Professional corporate headshot portrait of a thoughtful man in a dark turtleneck with a white lab coat over it, intellectual expression, dark moody studio background with subtle cyan accent lighting, tech executive portrait style",
    "brandon",
  );
  await generateImageWithPerson(
    "exec-kowalski.png",
    "Professional corporate headshot portrait of an enthusiastic man in dark industrial work coveralls with a matte-black hard hat, big excited grin, dark moody studio background with warm amber accent lighting, industrial executive portrait",
    "jim",
  );
  await generateImageWithPerson(
    "exec-nakamura.png",
    "Professional corporate headshot portrait of a man in a sharp dark suit with a slightly loosened tie, knowing smirk and raised eyebrow, dark moody studio background with subtle electric green accent lighting, smooth corporate executive portrait",
    "sean",
  );

  // --- Testimonial Portraits (16) — no base people ---
  console.log("--- Testimonials ---");
  const testimonials: [string, string][] = [
    ["testimonial-marcus-chen.png", "Headshot portrait of a young Asian-American man in his late 20s wearing a tech startup hoodie, confident optimistic expression, warm studio lighting, dark neutral background"],
    ["testimonial-chad-gullet.png", "Headshot portrait of a burly Caucasian man in his 30s with a thick neck, competitive eating champion vibes, bold proud expression, warm studio lighting, dark neutral background"],
    ["testimonial-derek-pullman.png", "Headshot portrait of a fit Caucasian man in his early 30s wearing athletic wear, slightly dazed but proud expression, warm studio lighting, dark neutral background"],
    ["testimonial-tamara-voss.png", "Headshot portrait of a stylish woman in her late 20s with perfect hair and wellness influencer aesthetic, bright confident smile, warm studio lighting, dark neutral background"],
    ["testimonial-jason-kile.png", "Headshot portrait of a corporate man in his 40s wearing an ill-fitting suit with loosened tie, tired but intensely determined expression, warm studio lighting, dark neutral background"],
    ["testimonial-brenda-faulk.png", "Headshot portrait of a suburban mom in her late 30s, forced cheerful smile with slightly concerned eyes, warm studio lighting, dark neutral background"],
    ["testimonial-ryan-ashford.png", "Headshot portrait of an energetic man in his early 30s with rumpled business casual clothes, wild-eyed enthusiasm and slightly manic energy, warm studio lighting, dark neutral background"],
    ["testimonial-patricia-hollowell.png", "Headshot portrait of a woman in her 50s with reading glasses pushed up on her head, pseudo-academic authoritative look, knowing expression, warm studio lighting, dark neutral background"],
    ["testimonial-kyle-brandt.png", "Headshot portrait of an athletic young man in his mid-20s wearing sporty casual wear, overly enthusiastic excited expression, warm studio lighting, dark neutral background"],
    ["testimonial-simone-archer.png", "Headshot portrait of a sharp-featured woman in her early 30s with minimalist professional style, intense laser-focused expression, warm studio lighting, dark neutral background"],
    ["testimonial-francois-delacroix.png", "Headshot portrait of a French man in his 40s with a chef's coat partially visible at the collar, emotional pained but passionate expression, warm studio lighting, dark neutral background"],
    ["testimonial-tony-mazetti.png", "Headshot portrait of a muscular Italian-American man in his 30s wearing a tank top, confident flexing gym-bro expression with a smirk, warm studio lighting, dark neutral background"],
    ["testimonial-eleanor-whittaker.png", "Headshot portrait of an elegant sophisticated woman in her 50s wearing pearl earrings, skeptical but intrigued expression with one raised eyebrow, warm studio lighting, dark neutral background"],
    ["testimonial-greg-diane-hofstra.png", "Headshot portrait of a middle-aged couple together in frame, slightly strained smiles, wearing matching polo shirts, warm studio lighting, dark neutral background"],
    ["testimonial-asher-bloom.png", "Headshot portrait of a man in his late 20s with a slightly greenish tint to his nose area, organic natural style clothing and beaded necklace, enthusiastic glowing expression, warm studio lighting, dark neutral background"],
    ["testimonial-nina-cabrera.png", "Headshot portrait of a young Latina woman in her early 20s with a tech-savvy casual style and AirPods visible, amused knowing expression, warm studio lighting, dark neutral background"],
  ];
  for (const [filename, prompt] of testimonials) {
    await generateImage(filename, prompt);
  }

  // --- Contact & Checkout ---
  console.log("--- Contact & Checkout ---");
  await generateImage(
    "contact.png",
    "A professional call center office with customer support agents wearing white hazmat suits and safety goggles while cheerfully taking phone calls at modern desks with headsets on over the hazmat hoods, fluorescent office lighting mixed with neon green accent lighting, dark moody corporate office setting, satirical corporate photography",
    "1536x1024",
  );
  await generateImage(
    "checkout-construction.png",
    "A matte-black credit card being fed into a small industrial wood chipper with fine powder coming out the other side, neon green lighting illuminating the scene, dark background, satirical product photography, under construction concept art",
  );

  console.log("\n=== Done! ===\n");
}

main().catch((err) => {
  console.error("\nFATAL:", err.message || err);
  process.exit(1);
});
