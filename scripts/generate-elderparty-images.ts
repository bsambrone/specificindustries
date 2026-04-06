/**
 * Generate all Elder Party images using OpenAI's image APIs.
 *
 * Usage:  npx tsx scripts/generate-elderparty-images.ts
 *
 * Reads OPENAI_API_KEY from .env in project root.
 * Outputs to public/sites/elderparty/.
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
const OUT_DIR = path.resolve(__dirname, "../public/sites/elderparty");
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
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log("\n=== Elder Party Image Generation ===\n");
  console.log(`Output: ${OUT_DIR}\n`);

  // Section 1: Favicon & Hero
  console.log("--- Section 1: Favicon & Hero ---");
  await generateImage(
    "favicon.png",
    "Tentacle wrapped around a ballot box, simple political party logo style, gold and navy blue color scheme, clean icon design on dark background",
  );
  await generateImage(
    "hero.png",
    "American flag draped over something massive and ancient rising from the ocean at dawn, patriotic lighting, campaign rally energy, coastal New England setting, tentacles visible beneath the flag, dramatic sky",
    "1536x1024",
  );

  // Section 2: Leadership Portraits
  console.log("--- Section 2: Leadership Portraits ---");
  await generateImageWithPerson(
    "team-bill.png",
    "Professional political portrait, man in dark suit and tie with subtle tentacle-like features, greenish pallor, ancient knowing eyes, American flag backdrop, presidential portrait lighting, campaign photo style",
    "bill",
  );
  await generateImageWithPerson(
    "team-brandon.png",
    "Professional political portrait, man in dark suit as campaign strategist, unsettling photogenic smile with too many teeth, shifting features, American flag lapel pin, campaign office background, warm lighting",
    "brandon",
  );
  await generateImageWithPerson(
    "team-jim.png",
    "Professional political portrait, man in dark suit as policy wonk, slightly amphibious features, bulging eyes, slick skin, reading glasses, briefcase, American flag pin, Capitol building background",
    "jim",
  );
  await generateImageWithPerson(
    "team-sean.png",
    "Professional political portrait, man in dark suit, gaunt and intense with piercing stare, hint of tattered yellow fabric beneath suit jacket, campaign yard signs and American flag bunting in background",
    "sean",
  );

  // Section 3: Candidate Page
  console.log("--- Section 3: Candidate Page ---");
  await generateImageWithPerson(
    "candidate-hero.png",
    "Man at presidential campaign podium with American flags and patriotic bunting, rally crowd behind him, red white and blue lighting, tentacle shadows on the podium, dramatic campaign event photography",
    "bill",
    "1536x1024",
  );
  await generateImageWithPerson(
    "candidate-vision.png",
    "Man gazing across American landscape at sunrise with American flags, patriotic golden hour lighting, coastal vista with something vast beneath the waves, presidential campaign photography",
    "bill",
  );

  // Section 4: Platform
  console.log("--- Section 4: Platform ---");
  await generateImage(
    "platform-hero.png",
    "American flag unfurling in the wind with tentacles subtly woven into the stripes, dramatic patriotic lighting, blue sky, rally stage backdrop",
    "1536x1024",
  );
  await generateImage(
    "platform-education.png",
    "Gothic university campus with ivy-covered buildings, students walking, American flags on campus, Miskatonic University style, autumn setting, slightly ominous architecture",
  );
  await generateImage(
    "platform-security.png",
    "Ancient cyclopean city rising from the ocean with American military vessels standing guard nearby, American flags on every spire, patriotic naval scene, dramatic clouds",
  );
  await generateImage(
    "platform-healthcare.png",
    "Serene coastal medical dormitory facility, patients walking peacefully toward the ocean, American flags on the building, calming seaside setting, slightly unsettling fog",
  );
  await generateImage(
    "platform-economy.png",
    "Deep One fish-like humanoids and human construction workers side by side at an underwater infrastructure construction site, hard hats on everyone, American flags on equipment, dramatic lighting",
  );
  await generateImage(
    "platform-energy.png",
    "Power plant with impossible non-Euclidean geometry, glowing angles that don't make sense, electrical towers, American flags, dramatic stormy sky, otherworldly energy",
  );
  await generateImage(
    "platform-housing.png",
    "Charming New England waterfront neighborhood in Innsmouth style, families on porches with subtle amphibious features, American flags on every house, quaint coastal town",
  );
  await generateImage(
    "platform-foreign-policy.png",
    "Diplomatic summit table with delegates from various dimensions, formal international setting, American and elder sigil flags side by side, ornate conference room",
  );
  await generateImage(
    "platform-civil-rights.png",
    "Diverse march including shoggoths and humans holding protest signs together, Capitol building in background, American flags throughout, civil rights rally photography",
  );

  // Section 5: Coalitions
  console.log("--- Section 5: Coalitions ---");
  await generateImage(
    "coalitions-hero.png",
    "Diverse group of political supporters at a patriotic rally, mix of normal Americans and slightly inhuman individuals, American flags everywhere, campaign signs, golden hour lighting",
    "1536x1024",
  );
  await generateImage(
    "coalition-mineral-labor.png",
    "Children wearing hardhats in a cheerful salt mine, propaganda poster style, bright optimistic colors, youth enrichment program aesthetic",
  );
  await generateImage(
    "coalition-possession-party.png",
    "Town hall meeting where some attendees are levitating slightly above their chairs, American flags on the wall, normal civic meeting setting with supernatural elements",
  );
  await generateImage(
    "coalition-illuminated-order.png",
    "Shadowy figures in suits stepping into spotlight at a political press conference, pyramid and eye motifs in the decor, professional setting, dramatic lighting",
  );
  await generateImage(
    "coalition-fishermen-innsmouth.png",
    "Commercial fishermen on a New England dock, some with subtle amphibious features and bulging eyes, American flag on the fishing boat, working waterfront setting",
  );
  await generateImage(
    "coalition-mothers-geometry.png",
    "PTA meeting in a school gymnasium, concerned mothers looking at a chalkboard with impossible non-Euclidean angles and shapes, normal suburban setting",
  );
  await generateImage(
    "coalition-arkham-watch.png",
    "Neighborhood watch sign with elder sigils carved into it, suburban American street with white picket fences, American flags on every porch, eerily perfect neighborhood",
  );
  await generateImage(
    "coalition-esoteric-taxpayers.png",
    "Men in business suits holding protest signs about dimensional gateway funding outside the US Capitol building, professional political protest, American flags",
  );

  // Section 6: News Articles
  console.log("--- Section 6: News Articles ---");
  await generateImage(
    "news-coastal-surge.png",
    "Campaign rally on a beach at sunset, huge crowd with American flags and campaign signs, something large and dark visible in the water behind them, patriotic beach rally",
  );
  await generateImage(
    "news-coastal-surge-2.png",
    "Electoral map of the United States with coastal districts glowing eerie green, political data visualization, professional news graphic style",
  );
  await generateImageWithPerson(
    "news-arkham-endorsement.png",
    "Man in suit at political podium shaking hands with a mayor figure, American flags behind them, city hall press conference setting, campaign photography",
    "brandon",
  );
  await generateImage(
    "news-field-offices.png",
    "Storefront political campaign office with Elder Party signage in gold and navy, American flag bunting, glass windows showing busy interior, small town main street",
  );
  await generateImageWithPerson(
    "news-miskatonic-keynote.png",
    "Man speaking at a gothic university auditorium podium, rapt audience, ornate academic setting, warm dramatic lighting, campaign speech photography",
    "brandon",
  );
  await generateImage(
    "news-fundraising.png",
    "Campaign staffers celebrating around a large fundraising thermometer showing $66.6 million, streamers, American flags, campaign office celebration",
  );
  await generateImage(
    "news-arkham-watch-endorsement.png",
    "Neighborhood watch members at a press conference with Elder Party banner behind them, suburban community center, American flags, professional political event",
  );
  await generateImage(
    "news-volunteer-surge.png",
    "Massive volunteer rally in a park, sea of campaign yard signs and American flags, diverse crowd, golden hour patriotic lighting",
  );
  await generateImage(
    "news-volunteer-surge-2.png",
    "Volunteers at folding tables with canvassing kits in a suburban neighborhood, campaign t-shirts, clipboards, American flags, friendly community outreach",
  );
  await generateImageWithPerson(
    "news-why-i-switched.png",
    "Man sitting at a kitchen table writing a letter by lamplight, American flag visible through the window, contemplative domestic setting, warm evening lighting",
    "jim",
  );
  await generateImageWithPerson(
    "news-why-i-switched-2.png",
    "Same man at a political rally with transformed intense expression, crowd behind him with campaign signs, American flags, dramatic rally lighting",
    "jim",
  );

  // Section 7: Events
  console.log("--- Section 7: Events ---");
  await generateImage(
    "event-miskatonic-rally.png",
    "Nighttime rally at a gothic university campus, torches and American flags, crowd gathered before a stage, dramatic shadows, moonlit buildings",
  );
  await generateImage(
    "event-town-hall-waves.png",
    "Seaside meeting hall with waves crashing outside, underwater blue-green tint, patriotic bunting on the walls, town hall meeting setup",
  );
  await generateImage(
    "event-portland-fourth.png",
    "Fourth of July fireworks celebration at a coastal town, tentacle shapes hidden in the fireworks, American flags everywhere, festive patriotic atmosphere",
  );
  await generateImage(
    "event-great-lakes-picnic.png",
    "Wholesome family picnic by a Great Lake, potato salad and checkered tablecloths, American flags, something vast and dark barely visible under the water surface",
  );
  await generateImage(
    "event-heartland-revival.png",
    "Iowa cornfield rally at amber twilight, campaign signs among the corn rows, American flags, haystacks, warm midwestern golden hour lighting",
  );
  await generateImage(
    "event-southern-bbq.png",
    "Southern outdoor BBQ under Spanish moss and string lights, campaign signs and American flags, low country boil setup, warm evening atmosphere",
  );
  await generateImage(
    "event-desert-stars.png",
    "Desert night sky gathering in New Mexico, stars arranged in wrong alien patterns, people looking up, American flags, campfire, Roswell atmosphere",
  );
  await generateImage(
    "event-grand-rally-dc.png",
    "National Mall packed with thousands of supporters and American flags, Washington Monument in background, something vast and shadowy in the sky above, dramatic election eve rally",
    "1536x1024",
  );

  // Section 8: Donate
  console.log("--- Section 8: Donate ---");
  await generateImage(
    "donate-hero.png",
    "Patriotic imagery with hands reaching upward toward something golden and tentacled in the sky, campaign rally energy, American flags, dramatic lighting",
    "1536x1024",
  );
  await generateImage(
    "donate-thermometer.png",
    "Stylized fundraising thermometer with Elder Party gold and navy branding, tentacle wrapped around the thermometer, campaign office wall, professional graphic",
  );

  // Section 9: Volunteer
  console.log("--- Section 9: Volunteer ---");
  await generateImage(
    "volunteer-hero.png",
    "Enthusiastic campaign volunteers in Elder Party navy t-shirts with clipboards, American flags, suburban street, friendly door-to-door canvassing scene",
    "1536x1024",
  );
  await generateImage(
    "volunteer-canvass.png",
    "Campaign volunteer at a front door with pamphlets and yard sign, suburban American home, American flag on porch, friendly door-to-door scene",
  );
  await generateImage(
    "volunteer-watch-party.png",
    "Living room debate watch party, TV on showing debate, snacks on coffee table, campaign decorations and American flags, cozy domestic gathering",
  );
  await generateImage(
    "volunteer-phone-bank.png",
    "Phone bank room with volunteers at desks wearing headsets, campaign posters and American flags on the walls, busy organized campaign office",
  );
  await generateImage(
    "volunteer-register.png",
    "Voter registration table at a sunny park, banner with Elder Party branding, clipboards, diverse crowd of citizens, American flags, community event",
  );
  await generateImage(
    "volunteer-campus.png",
    "College students at a campus organizing table with Elder Party banner, ivy-covered university buildings, young volunteers, American flags, academic setting",
  );

  // Section 10: Shop Products
  console.log("--- Section 10: Shop Products ---");
  await generateImage(
    "product-yard-sign.png",
    "Campaign yard sign on a green suburban lawn with tentacle border design, gold text on navy background, clean product photography",
  );
  await generateImage(
    "product-hat.png",
    "Red trucker cap with embroidered tentacle-flag logo, product photography on white background, campaign merchandise",
  );
  await generateImage(
    "product-lapel-pin.png",
    "Gold lapel pin of a tentacle wrapped around an American star, product photography on dark background, elegant political accessory",
  );
  await generateImage(
    "product-bumper-sticker.png",
    "I Voted Elder bumper sticker on the back of a car, patriotic red white and blue with subtle tentacle watermark, American driving scene",
  );
  await generateImage(
    "product-tote.png",
    "Canvas tote bag with Elder Party gold branding 'Ask Me About The Elder Party', product photography, campaign merchandise",
  );
  await generateImage(
    "product-robe.png",
    "Midnight navy hooded ceremonial robe with gold Elder Party seal embroidered on chest, product photography on dark background, campaign merchandise",
  );
  await generateImage(
    "product-constitution.png",
    "Small leather-bound pocket book with gilt gold edges, elegant constitutional document style, product photography, antique leather",
  );
  await generateImage(
    "product-mug.png",
    "Coffee mug with strange R'lyehian text on one side and English translation on the other, navy blue ceramic, product photography",
  );
  await generateImage(
    "product-flag.png",
    "3x5 flag with Elder Party seal on navy field bordered by gold and crimson stripes, brass grommets, product photography",
  );
  await generateImage(
    "product-founders-bundle.png",
    "Gift box containing campaign hat, navy robe, gold pin, flag, leather pocket constitution, arranged neatly, product photography",
  );

  // Section 11: About Page
  console.log("--- Section 11: About Page ---");
  await generateImage(
    "about-hero.png",
    "Stately government building with classical columns and American flags, subtle tentacle architectural details in the stonework, Elder Party headquarters, impressive civic architecture",
    "1536x1024",
  );
  await generateImage(
    "about-founding.png",
    "Dramatic painting-style image of a political founding convention, delegates at a table with documents, American flags, constitutional convention meets eldritch ritual, oil painting style",
  );

  // Section 12: Contact & Checkout
  console.log("--- Section 12: Contact & Checkout ---");
  await generateImage(
    "contact-hero.png",
    "Campaign office interior with desks, phones ringing, American flags on the walls, busy political campaign headquarters, warm professional lighting",
  );
  await generateImage(
    "checkout-construction.png",
    "Campaign store under construction with Elder Party gold and navy branding on sawhorses, American flag bunting, construction cones, coming soon aesthetic",
  );

  console.log("\n=== Done! ===\n");
}

main().catch((err) => {
  console.error("\nFATAL:", err.message || err);
  process.exit(1);
});
