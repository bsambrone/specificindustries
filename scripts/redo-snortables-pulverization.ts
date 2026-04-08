/**
 * Regenerate the process-pulverization image with a more realistic prompt.
 * Usage: npx tsx scripts/redo-snortables-pulverization.ts
 */
import OpenAI, { toFile } from "openai";
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import path from "node:path";

const envPath = path.resolve(__dirname, "../.env");
for (const line of readFileSync(envPath, "utf-8").split("\n")) {
  const match = line.match(/^\s*([^#=]+?)\s*=\s*(.*?)\s*$/);
  if (match) process.env[match[1]] = match[2];
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const baseDir = path.resolve(__dirname, "../mcp/image-gen/base-images/bill");
const outPath = path.resolve(__dirname, "../public/sites/snortables/process-pulverization.png");

const mimeTypes: Record<string, string> = {
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp",
};

function getPersonPhotos(dir: string, count = 2): string[] {
  const files = readdirSync(dir).filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f));
  const shuffled = [...files].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map((f) => path.join(dir, f));
}

async function main() {
  const photos = getPersonPhotos(baseDir);
  console.log("Regenerating process-pulverization.png with refs:", photos.map((p) => path.basename(p)));

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
    prompt: "Photorealistic photo of a man in an industrial warehouse grinning maniacally while feeding a full dinner plate with roast beef and sides into a large industrial wood chipper machine. Fine powder is spraying out the discharge chute. The man wears safety goggles pushed up on his forehead and a lab coat. Harsh fluorescent industrial lighting, concrete floor, real workshop environment. Photo looks like it was taken on a DSLR camera, not AI generated. Natural skin texture, realistic lighting and shadows.",
    size: "1536x1024",
  });

  const b64 = (response as any).data?.[0]?.b64_json;
  if (!b64) throw new Error("No image data");
  writeFileSync(outPath, Buffer.from(b64, "base64"));
  console.log("DONE:", outPath);
}

main().catch((e) => {
  console.error("FATAL:", e.message || e);
  process.exit(1);
});
