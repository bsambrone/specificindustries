/**
 * Generate all Mousetrap Jenga site images using OpenAI's image APIs.
 *
 * Usage:  npx tsx scripts/generate-mousetrapjenga-images.ts
 *
 * Reads OPENAI_API_KEY from .env in project root.
 * Outputs to public/sites/mousetrapjenga/.
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
const OUT_DIR = path.resolve(__dirname, "../public/sites/mousetrapjenga");
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

function mimeFromExtension(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".webp":
      return "image/webp";
    default:
      return "application/octet-stream";
  }
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

  const imageFiles = await Promise.all(
    photos.map((p) =>
      toFile(readFileSync(p), path.basename(p), { type: mimeFromExtension(p) })
    )
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
// Style prompt — reused across many images
// ---------------------------------------------------------------------------

const TOY_STORE_STYLE =
  "1980s retro American toy-store box art style. Chunky Cooper Black / Bowlby One style title lettering. " +
  "Primary red (#D4281F), sunburst yellow (#FFD23F), turquoise (#2BB9B9) palette on a warm cream (#FFF6E8) background. " +
  "Comic-book action bursts, NEW! starbursts, thick black outlines. Cheerful infomercial energy, Milton Bradley / Parker Brothers era. " +
  "Flat painterly illustration with subtle gradients, not photorealistic."

const BOX_ART_PROMPT = (productName: string, productDesc: string) =>
  `A retro 1980s toy-store product box for "${productName}" — Mousetrap Jenga edition. ` +
  `${productDesc} ` +
  `${TOY_STORE_STYLE} ` +
  `The box should prominently feature the title "${productName.toUpperCase()}" at the top in chunky block lettering, ` +
  `with a product illustration below showing the contents in action. Include a faux "NEW!" starburst corner badge. ` +
  `Family-friendly cheerful composition. Front-facing box photograph style, as if displayed on a toy store shelf.`

// ---------------------------------------------------------------------------
// Image manifest — all 24 generations
// ---------------------------------------------------------------------------

async function main() {
  console.log("Generating Mousetrap Jenga site imagery...\n");

  // === Batch 1: Site hero / background (3) ===
  console.log("Batch 1: Site hero + background\n");

  await generateImage(
    "hero.png",
    `A mid-1980s American family (parents and two kids, ages 8-12) gathered around a wood-paneled rec-room table ` +
      `playing a board game with small mouse traps stacked into a Jenga-style tower. Everyone is smiling and laughing ` +
      `in a cheerful infomercial way. One child's hand is wrapped in a fresh white bandage — visible but not alarming. ` +
      `Warm incandescent lighting, orange shag carpet visible, vintage wood paneling. ` +
      `${TOY_STORE_STYLE} Photograph-like flat illustration, like a vintage toy commercial still.`,
    "1536x1024",
  );

  await generateImage(
    "about-hero.png",
    `A 1978 basement workshop: wood-paneled walls, a cluttered workbench covered in mouse traps, wooden blocks, ` +
      `spring coils, and a half-assembled prototype of a Jenga-style trap-stacking game. A single incandescent work lamp ` +
      `illuminates the scene. Small framed photos of the family on a shelf. No people visible. Warm sepia-tinted lighting. ` +
      `${TOY_STORE_STYLE} Nostalgic founding-moment composition.`,
    "1536x1024",
  );

  await generateImage(
    "contact-operators.png",
    `A cheerful 1980s infomercial phone bank scene: four friendly operators wearing headsets and matching red shirts, ` +
      `sitting at a long desk with vintage beige office phones. Big smiles, thumbs up, cartoon-style. ` +
      `${TOY_STORE_STYLE} Cheerful promotional illustration.`,
    "1024x1024",
  );

  // === Batch 2: Product box art (8) ===
  console.log("\nBatch 2: Product box art\n");

  await generateImage(
    "product-junior-snap.png",
    BOX_ART_PROMPT(
      "Junior Snap Edition",
      "A children's version of Mousetrap Jenga featuring 12 pastel-colored plastic trainer traps. Safe for kids ages 8 and up. The box shows a happy young child carefully placing a small plastic trap on top of a stacked tower.",
    ),
  );

  await generateImage(
    "product-classic.png",
    BOX_ART_PROMPT(
      "Classic Mousetrap Jenga",
      "The flagship edition: 18 genuine American-made steel mouse traps stacked into a Jenga-style tower. The iconic red-and-yellow box design. The box illustration shows a family gathered around the tower with cheerful anticipation.",
    ),
  );

  await generateImage(
    "product-rat-trap-pro.png",
    BOX_ART_PROMPT(
      "Rat Trap Pro",
      "The advanced edition: 12 large commercial-grade rat traps stacked into a larger tower. More serious, pro-tournament branding. Darker red color with gold accents on the box.",
    ),
  );

  await generateImage(
    "product-bear-trap-tournament.png",
    BOX_ART_PROMPT(
      "Bear Trap Tournament Edition",
      "The premium tournament edition: four large bear traps arranged around a wooden presentation case with brass hardware and velvet interior. Gold-foiled box with a championship-style design. Elegant, aspirational branding.",
    ),
  );

  await generateImage(
    "product-leghold-championship.png",
    BOX_ART_PROMPT(
      "Industrial Leg-Hold Championship",
      "The ultimate halo product: two massive industrial leg-hold traps in an engraved steel carry case. Austere, intimidating, serious branding. Metallic silver and deep red color scheme. Limited edition numbered badge visible on the box.",
    ),
  );

  await generateImage(
    "product-recovery-pack.png",
    BOX_ART_PROMPT(
      "The Official Recovery Pack",
      "A bright cheerful first-aid kit designed as a game accessory. The box shows bandages, gauze, and a tourniquet arranged playfully. A smiling cartoon mascot holding a band-aid. Reassuring, friendly, family-oriented design.",
    ),
  );

  await generateImage(
    "product-trap-refill-12pk.png",
    BOX_ART_PROMPT(
      "Trap Refill 12-Pack",
      "A utilitarian refill box showing 12 factory-fresh mouse traps neatly arranged. 'SUBSCRIBE TO SAVE!' starburst badge. Practical industrial accessory design with the signature cheerful branding.",
    ),
  );

  await generateImage(
    "product-scoreboard.png",
    BOX_ART_PROMPT(
      "Home Tournament Scoreboard",
      "A handcrafted wooden scoreboard with brass peg markers. Box illustration shows the scoreboard mounted on a rec-room wall with family members smiling proudly beside it. Elegant heirloom quality product shot.",
    ),
  );

  // === Batch 3: Leadership "inventor" portraits (4) ===
  console.log("\nBatch 3: Leadership inventor portraits\n");

  await generateImageWithPerson(
    "exec-pemberton.png",
    `Portrait of a kindly 1980s American toy-company founder in a wood-paneled workshop. Wearing a cardigan and ` +
      `button-down shirt, holding a mouse trap prototype up to examine it. Warm incandescent lighting, cluttered workbench ` +
      `visible behind him with springs and wooden blocks. Confident, grandfatherly, inventor-type energy. ` +
      `Styled as a vintage Milton Bradley / Parker Brothers founding-family portrait. Warm sepia-tinted color grading.`,
    "bill",
  );

  await generateImageWithPerson(
    "exec-wickham.png",
    `Portrait of a 1980s R&D engineer in a factory lab coat, holding up a large steel spring with both hands like ` +
      `he's proud of it. Cluttered spring-testing equipment behind him. Serious, focused expression. Wire-rim safety glasses. ` +
      `Styled as a vintage corporate R&D profile photo. Warm fluorescent lighting, 1980s factory aesthetic.`,
    "brandon",
  );

  await generateImageWithPerson(
    "exec-abernathy.png",
    `Portrait of a slightly rumpled 1980s playtester at a cluttered table, holding a set of Jenga-style blocks with ` +
      `mouse traps arranged on them. Tired but cheerful expression. His hands are visible and he has a small band-aid on ` +
      `one finger. Button-down shirt with rolled sleeves. Warm office lighting, casual professional vibe.`,
    "jim",
  );

  await generateImageWithPerson(
    "exec-fink.png",
    `Portrait of a 1980s safety officer in a high-visibility orange safety vest over a button-down shirt, standing ` +
      `in front of a well-organized first-aid station. Confident, reassuring smile, thumbs up. A clipboard tucked under ` +
      `his arm. Bright lighting. Safety-poster energy, cheerful and competent.`,
    "sean",
  );

  // === Batch 4: Hall of Fame champion portraits (4) ===
  console.log("\nBatch 4: Hall of Fame champion portraits\n");

  await generateImageWithPerson(
    "champion-pemberton.png",
    `A dramatic retro trading-card portrait of 'Hammerhand' Harold Pemberton, the founder and legendary player of ` +
      `Mousetrap Jenga. He wears a vintage 1980s tournament jacket with patches and a large championship medal around ` +
      `his neck. His hands are visible and show scars and missing fingernails. Proud, slightly weathered expression. ` +
      `Dramatic stage lighting, sepia-tinted color grading, like a vintage sports trading card portrait.`,
    "bill",
  );

  await generateImageWithPerson(
    "champion-wickham.png",
    `A dramatic retro trading-card portrait of 'Lefty' Delbert Wickham, a legendary Mousetrap Jenga tournament player. ` +
      `Vintage 1980s tournament jacket, championship patches. His left hand is prominently displayed with visible bandages ` +
      `wrapped around two fingers. Serious, proud expression. Dramatic stage lighting, sepia-tinted color grading, ` +
      `vintage sports trading card style.`,
    "brandon",
  );

  await generateImageWithPerson(
    "champion-abernathy.png",
    `A dramatic retro trading-card portrait of 'Jumpy' Morty Abernathy, a legendary Mousetrap Jenga tournament player ` +
      `and inventor of the Abernathy Hesitation technique. Vintage 1980s tournament jacket, championship patches. ` +
      `His hands are held in a classic Jenga-playing pose, showing small scars. Focused, intense expression. ` +
      `Dramatic stage lighting, sepia-tinted color grading, vintage sports trading card style.`,
    "jim",
  );

  await generateImageWithPerson(
    "champion-fink.png",
    `A dramatic retro trading-card portrait of 'Steady Eugene' Fink, considered the safest player in the Mousetrap Jenga ` +
      `Hall of Fame. Vintage 1980s tournament jacket with safety-orange trim. His hands are visible and notably intact — ` +
      `no bandages, no scars. Calm, confident expression. Dramatic stage lighting, sepia-tinted color grading, ` +
      `vintage sports trading card style.`,
    "sean",
  );

  // === Batch 5: How to Play step illustrations (4) ===
  console.log("\nBatch 5: How to Play step illustrations\n");

  await generateImage(
    "step-1-setup.png",
    `A cheerful 1980s storybook illustration showing two cartoon hands stacking small mouse traps into a Jenga-style ` +
      `tower on a kitchen table. Numbered "1" badge in the corner. Cream background, chunky black outlines, bright ` +
      `primary colors. ${TOY_STORE_STYLE}`,
  );

  await generateImage(
    "step-2-arm.png",
    `A cheerful 1980s storybook illustration showing cartoon hands carefully arming a mouse trap with a friendly ` +
      `expression, as if holding their breath. Numbered "2" badge in the corner. Cream background. ${TOY_STORE_STYLE}`,
  );

  await generateImage(
    "step-3-pull.png",
    `A cheerful 1980s storybook illustration showing cartoon hands carefully pulling an armed mouse trap from the ` +
      `middle of a stacked tower of mouse traps. Tower slightly leaning. Numbered "3" badge in the corner. ` +
      `Cream background. ${TOY_STORE_STYLE}`,
  );

  await generateImage(
    "step-4-crown.png",
    `A cheerful 1980s storybook illustration showing a smiling cartoon family member being crowned as the champion ` +
      `with a small toy crown, arms raised victorious. A scorecard visible. Numbered "4" badge in the corner. ` +
      `Cream background. ${TOY_STORE_STYLE}`,
  );

  // === Batch 6: Favicon (1) ===
  console.log("\nBatch 6: Favicon\n");

  await generateImage(
    "favicon.png",
    `A simple bold icon of a single classic American mouse trap in cherry red (#D4281F) on a cream background (#FFF6E8). ` +
      `Thick black outlines, flat vector-style illustration. Centered composition suitable for use as a website favicon. ` +
      `No text, no additional elements — just the trap icon.`,
  );

  console.log("\nAll done!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
