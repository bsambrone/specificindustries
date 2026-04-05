/**
 * Generate all Grass Fed WiFi images using OpenAI's image APIs.
 *
 * Usage:  npx tsx scripts/generate-grassfedwifi-images.ts
 *
 * Reads OPENAI_API_KEY from .env in project root.
 * Outputs to public/sites/grassfedwifi/.
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
const OUT_DIR = path.resolve(__dirname, "../public/sites/grassfedwifi");
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
  console.log("\n=== Grass Fed WiFi Image Generation ===\n");
  console.log(`Output: ${OUT_DIR}\n`);

  // Hero images (5) — 1536x1024
  console.log("--- Heroes ---");
  await generateImage(
    "home-hero.png",
    "Wide pastoral landscape: weathered wooden split-rail fence in a rolling green meadow at dawn, with wifi antennas mounted on fence posts like scarecrows, soft morning fog, golden light, one grazing cow in the distance. Warm pastoral color palette: sage greens, sky blues, wheat tones, cream paper background. Hand-drawn botanical illustration accents. Slightly textured, artisan farm-to-table co-op aesthetic. No modern corporate look.",
    "1536x1024",
  );
  await generateImage(
    "pasture-hero.png",
    "Weathered red barn at dusk with coaxial cable trailing from the hayloft like hay bales, surrounded by tall grass and wildflowers, warm orange-purple sky. Warm pastoral color palette: sage greens, sky blues, wheat tones, cream paper background. Hand-drawn botanical illustration accents. Slightly textured, artisan farm-to-table co-op aesthetic. No modern corporate look.",
    "1536x1024",
  );
  await generateImage(
    "grazing-hero.png",
    "Wide-open rolling pasture at dawn with mist rising, a few vintage satellite dishes half-hidden among the grass, distant mountains. Warm pastoral color palette: sage greens, sky blues, wheat tones, cream paper background. Hand-drawn botanical illustration accents. Slightly textured, artisan farm-to-table co-op aesthetic. No modern corporate look.",
    "1536x1024",
  );
  await generateImage(
    "calendar-hero.png",
    "A rustic wooden farm table laid with mason jars of glowing 'raw spectrum' wifi signal, wildflowers, a handwritten seasonal ledger, hand-drawn calendar chart in background. Warm pastoral color palette: sage greens, sky blues, wheat tones, cream paper background. Hand-drawn botanical illustration accents. Slightly textured, artisan farm-to-table co-op aesthetic. No modern corporate look.",
    "1536x1024",
  );
  await generateImage(
    "notes-hero.png",
    "Farmer at a wooden writing desk inside a barn, leather-bound ledger open, antique brass antenna on the desk next to an ink pot and quill, oil lamp light. Warm pastoral color palette: sage greens, sky blues, wheat tones, cream paper background. Hand-drawn botanical illustration accents. Slightly textured, artisan farm-to-table co-op aesthetic. No modern corporate look.",
    "1536x1024",
  );

  // Team portraits (4) — person reference, 1024x1024
  console.log("--- Team Portraits ---");
  await generateImageWithPerson(
    "team-bill.png",
    "Portrait of an older man with long gray beard, wearing plain brown amish-style farmer clothing and wide-brimmed hat, holding a hand-carved wooden wifi antenna like a shepherd's crook, standing in a meadow, serene conspiracy-theorist expression, looking slightly past the camera",
    "bill",
  );
  await generateImageWithPerson(
    "team-brandon.png",
    "Portrait of a middle-aged man wearing flannel work shirt and suspenders with a weathered straw hat, standing in a barn with wifi routers hanging from the rafters behind him, intense earnest expression, slightly paranoid",
    "brandon",
  );
  await generateImageWithPerson(
    "team-jim.png",
    "Portrait of a man wearing a plain brown linen work shirt and suspenders in a field of tall grass, holding a lunar calendar chart, amish/farmer aesthetic, concerned studious expression",
    "jim",
  );
  await generateImageWithPerson(
    "team-sean.png",
    "Portrait of a man wearing a plain linen shirt with rolled sleeves in an old barn, leather-bound ledger in hands, quill pen behind his ear, serious amish/farmer aesthetic, piercing direct gaze",
    "sean",
  );

  // Share tier cards (3) — 1024x1024
  console.log("--- Share Tiers ---");
  await generateImage(
    "share-heirloom.png",
    "A vintage wifi router sitting on weathered barn wood next to a glowing mason jar, with two small curved antennas wrapped in twine and a handwritten cardboard tag reading 'HEIRLOOM SHARE', hand-drawn wheat illustrations around it, warm rustic light, signal waves visible in soft golden mist rising from the jar. Warm pastoral color palette: sage greens, sky blues, wheat tones, cream paper background. Slightly textured, artisan farm-to-table co-op aesthetic mixed with rustic telecom gear.",
  );
  await generateImage(
    "share-reserve.png",
    "An oak barrel with a small wifi router mounted on top, two brass antennas extending up, a mason jar beside it collecting glowing amber signal from a wooden tap, handwritten 'RESERVE SHARE' tag tied with twine, warm rustic candlelight, signal waves curling through the air. Warm pastoral color palette: sage greens, sky blues, wheat tones, cream paper background. Slightly textured, artisan farm-to-table co-op aesthetic mixed with rustic telecom gear.",
  );
  await generateImage(
    "share-estate.png",
    "An ornate antique brass wifi antenna tower on polished barn wood, surrounded by ruby-glowing mason jars collecting signal, a handwritten 'ESTATE SHARE' tag with wax seal and leather cord, dramatic candlelit scene with electromagnetic waves rippling in the air, ethernet cable coiled like a rope. Warm pastoral color palette: deep sage greens, sky blues, rich wheat tones, cream paper background. Slightly textured, artisan farm-to-table co-op aesthetic mixed with elevated rustic telecom gear.",
  );

  // Seasonal add-ons (4) — 1024x1024
  console.log("--- Seasonal Add-ons ---");
  await generateImage(
    "seasonal-spring.png",
    "A small cloth sack labeled 'Spring Pollen Pack' filled with glowing yellow particles, surrounded by wildflowers and honeybees, soft spring light. Warm pastoral color palette: sage greens, sky blues, wheat tones, cream paper background. Hand-drawn botanical illustration accents. Artisan farm-to-table co-op aesthetic.",
  );
  await generateImage(
    "seasonal-summer.png",
    "A wooden crate labeled 'Summer Solstice Bundle' filled with sun-ripened glowing mason jars, summer meadow, bright midday sun. Warm pastoral color palette: sage greens, sky blues, wheat tones, cream paper background. Hand-drawn botanical illustration accents. Artisan farm-to-table co-op aesthetic.",
  );
  await generateImage(
    "seasonal-harvest.png",
    "A handmade wooden basket labeled 'Harvest Moon Premium' overflowing with gold wheat, glowing amber jars, and a full orange harvest moon above. Warm pastoral color palette: sage greens, sky blues, wheat tones, cream paper background. Hand-drawn botanical illustration accents. Artisan farm-to-table co-op aesthetic.",
  );
  await generateImage(
    "seasonal-winter.png",
    "A cold stone jar labeled 'Winter Reserve' sitting in snow with pine branches, faint cold blue glow emanating from within, quiet winter landscape. Warm pastoral color palette: sage greens, sky blues, wheat tones, cream paper background. Hand-drawn botanical illustration accents. Artisan farm-to-table co-op aesthetic.",
  );

  // Grazing map — 1536x1024
  console.log("--- Grazing Map ---");
  await generateImage(
    "grazing-map.png",
    "Hand-drawn fantasy-style illustrated map on aged parchment, showing a co-op's frequency farm with labeled regions: North Pasture, South Meadow, East Orchard, West Grove, The Upland, Central Barn. Compass rose, tiny hand-drawn antennas instead of trees, mountains and streams, ink-and-watercolor aesthetic. Warm pastoral color palette: sage greens, sky blues, wheat tones.",
    "1536x1024",
  );

  // The Pasture storytelling (3) — 1536x1024
  console.log("--- The Pasture ---");
  await generateImage(
    "pasture-founding.png",
    "A lone bearded man in amish-style clothing standing at the top of a mountain at dawn, arms outstretched, with wifi signal waves visible in the sky around him, reverent mythic atmosphere. Warm pastoral color palette: sage greens, sky blues, wheat tones. Hand-drawn botanical illustration accents. Artisan farm-to-table co-op aesthetic.",
    "1536x1024",
  );
  await generateImage(
    "pasture-barn.png",
    "Interior of a weathered red barn with exposed beams, hand-woven baskets hanging from the rafters, mason jars of glowing signal on wooden shelves, oil lamp light. Warm pastoral color palette: sage greens, sky blues, wheat tones. Hand-drawn botanical illustration accents. Artisan farm-to-table co-op aesthetic.",
    "1536x1024",
  );
  await generateImage(
    "pasture-philosophy.png",
    "Overhead view of a pastoral landscape divided into fields in rotation, with hand-drawn arrows showing seasonal movement of livestock (satellite dishes) between pastures, illustrated almanac aesthetic. Warm pastoral color palette: sage greens, sky blues, wheat tones. Artisan farm-to-table co-op aesthetic.",
    "1536x1024",
  );

  // Field Notes (3) — 1024x1024
  console.log("--- Field Notes ---");
  await generateImage(
    "notes-featured-1.png",
    "A jar of pasteurized milk next to a jar of raw glowing signal, close-up, warm rustic lighting, editorial photography feel. Warm pastoral color palette: sage greens, sky blues, wheat tones, cream paper background. Artisan farm-to-table co-op aesthetic.",
  );
  await generateImage(
    "notes-featured-2.png",
    "Hands turning the pages of a weathered leather-bound ledger in sunlight, pastoral background blurred. Warm pastoral color palette: sage greens, sky blues, wheat tones. Hand-drawn botanical illustration accents. Artisan farm-to-table co-op aesthetic.",
  );
  await generateImage(
    "notes-featured-3.png",
    "A stack of official-looking certification documents being set aside on a wooden barn table, with a lit lantern and an old farmer's cap nearby. Warm pastoral color palette: sage greens, sky blues, wheat tones, cream paper background. Artisan farm-to-table co-op aesthetic.",
  );
  await generateImage(
    "notes-featured-4.png",
    "A leather-bound ledger open on a wooden stand inside a dimly lit barn, handwritten entries visible in brown ink, a fountain pen resting beside it, soft candlelight. Warm pastoral color palette: sage greens, wheat tones, cream paper background. Artisan farm-to-table co-op aesthetic.",
  );
  await generateImage(
    "notes-featured-5.png",
    "A large full moon rising over a rolling pasture at night, an antique brass antenna silhouetted in the foreground, faint glowing signal waves visible in the sky. Cool sage greens and sky blues with moonlit wheat tones. Artisan farm-to-table co-op aesthetic.",
  );
  await generateImage(
    "notes-featured-6.png",
    "An old fashioned wooden filing cabinet half-open with yellowed FCC documents spilling out, red wax seal on top envelope, dim office lamp, slight air of conspiracy. Warm pastoral color palette: sage greens, wheat tones, cream paper. Hand-drawn botanical illustration accents. Artisan farm-to-table co-op aesthetic.",
  );
  await generateImage(
    "notes-featured-7.png",
    "A weathered handwritten notebook open on a ridge at dusk, mountains in the background, a hand-built wire antenna pointed at the sky, faint wild signal waves drifting through the air. Warm pastoral color palette: sage greens, sky blues, wheat tones. Artisan farm-to-table co-op aesthetic.",
  );
  await generateImage(
    "notes-featured-8.png",
    "An oak barrel in a dim cellar room with a wooden tap dripping a single drop of glowing amber liquid into a mason jar, warm candlelight, rough-cut stone walls. Warm wheat tones, sage greens, cream paper background. Artisan farm-to-table co-op aesthetic.",
  );

  // Contact page — 1024x1024
  console.log("--- Contact ---");
  await generateImage(
    "contact-pigeon.png",
    "A white carrier pigeon with a small wifi router strapped to its back with leather straps, flying across a pastoral landscape at dusk, whimsical but earnest illustration. Warm pastoral color palette: sage greens, sky blues, wheat tones. Hand-drawn botanical illustration accents. Artisan farm-to-table co-op aesthetic.",
  );

  // Favicon — 1024x1024
  console.log("--- Favicon ---");
  await generateImage(
    "favicon.png",
    "Simple flat icon of a single mason jar with glowing green wifi signal inside, centered, pastoral sage green and cream color scheme, minimalist",
  );

  console.log("\n=== Done! ===\n");
}

main().catch((err) => {
  console.error("\nFATAL:", err.message || err);
  process.exit(1);
});
