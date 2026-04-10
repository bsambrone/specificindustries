import OpenAI, { toFile } from "openai";
import { writeFileSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";

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

function getOnePhoto(name: string): string {
  const dir = path.join(BASE_IMAGES_DIR, name);
  const files = readdirSync(dir).filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f));
  return path.join(dir, files[Math.floor(Math.random() * files.length)]);
}

async function toImageFile(filePath: string) {
  const ext = path.extname(filePath).toLowerCase();
  const mime = mimeTypes[ext] || "image/png";
  return toFile(readFileSync(filePath), path.basename(filePath), { type: mime });
}

async function main() {
  const refs = [getOnePhoto("bill"), getOnePhoto("brandon"), getOnePhoto("jim"), getOnePhoto("sean")];
  console.log(`  GEN   aftermath-hero.png (refs: ${refs.map((p) => path.basename(p)).join(", ")}) ...`);

  const imageFiles = await Promise.all(refs.map((p) => toImageFile(p)));
  const response = await openai.images.edit({
    model: "gpt-image-1" as any,
    image: imageFiles as any,
    prompt: "A centered group photo of four men standing together in an industrial warehouse. All four are wearing flannel shirts. They all look concerned and worried. The group is centered in the frame with normal proportions, not stretched or compressed. Industrial lighting, sandpaper products visible on shelves behind them. Shot at normal focal length with no distortion.",
    size: "1536x1024",
  });

  const b64 = (response as any).data?.[0]?.b64_json;
  if (!b64) throw new Error("No data");
  writeFileSync(path.join(OUT_DIR, "aftermath-hero.png"), Buffer.from(b64, "base64"));
  console.log("  DONE  aftermath-hero.png");
}

main().catch((err) => { console.error("FATAL:", err.message); process.exit(1); });
