import OpenAI from "openai";
import { writeFileSync, readFileSync } from "node:fs";
import path from "node:path";

const envPath = path.resolve(__dirname, "../.env");
for (const line of readFileSync(envPath, "utf-8").split("\n")) {
  const match = line.match(/^\s*([^#=]+?)\s*=\s*(.*?)\s*$/);
  if (match) process.env[match[1]] = match[2];
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const OUT_DIR = path.resolve(__dirname, "../public/sites/truegrit");

async function main() {
  console.log("  GEN   aftermath-hero.png ...");
  const response = await openai.images.generate({
    model: "gpt-image-1" as any,
    prompt: "A centered group photo of four men standing together in an industrial warehouse. All four are wearing flannel shirts. They all look concerned and worried. The group is centered in the frame with normal proportions. Industrial lighting, sandpaper products visible on shelves behind them. Shot at normal focal length with no distortion.",
    size: "1536x1024",
    quality: "high",
  });

  const b64 = (response as any).data?.[0]?.b64_json;
  if (!b64) throw new Error("No data");
  writeFileSync(path.join(OUT_DIR, "aftermath-hero.png"), Buffer.from(b64, "base64"));
  console.log("  DONE  aftermath-hero.png");
}

main().catch((err) => { console.error("FATAL:", err.message); process.exit(1); });
