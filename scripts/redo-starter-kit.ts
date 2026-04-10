import OpenAI from "openai";
import { writeFileSync, readFileSync } from "node:fs";
import path from "node:path";

const envPath = path.resolve(__dirname, "../.env");
for (const line of readFileSync(envPath, "utf-8").split("\n")) {
  const match = line.match(/^\s*([^#=]+?)\s*=\s*(.*?)\s*$/);
  if (match) process.env[match[1]] = match[2];
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function main() {
  console.log("  GEN   product-starter-kit.png ...");
  const response = await openai.images.generate({
    model: "gpt-image-1" as any,
    prompt: "A gift box containing exactly three rolls of toilet paper made from sandpaper in different grits and a small jar of recovery balm. Each roll is labeled 'TOILET PAPER' with its grit number: 80-grit, 40-grit, and 24-grit. The three rolls show progressively coarser sandpaper texture from fine to very rough. Open box product photography on clean white background, hardware store catalog style. All text on the rolls must be spelled correctly.",
    size: "1024x1024",
    quality: "high",
  });
  const b64 = (response as any).data?.[0]?.b64_json;
  if (!b64) throw new Error("No data");
  writeFileSync(
    path.resolve(__dirname, "../public/sites/truegrit/product-starter-kit.png"),
    Buffer.from(b64, "base64"),
  );
  console.log("  DONE  product-starter-kit.png");
}

main().catch((err) => { console.error("FATAL:", err.message); process.exit(1); });
