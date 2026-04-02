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
  console.log("  GEN   product-fermented.png ...");
  const response = await openai.images.generate({
    model: "gpt-image-1" as any,
    prompt: "A rustic glass bottle of fermented pig milk with a cork stopper and a hand-written label that reads 'FERMENTED PIG MILK' in messy handwriting. The liquid inside is cloudy, yellowish, and slightly fizzy with visible bubbles rising. The bottle has a small cartoon pig logo looking dizzy with spiral eyes. Condensation on the outside of the bottle. Sitting on a weathered wooden barn shelf next to some hay. Product photography style, warm barn lighting, slightly chaotic energy. No other text besides the label.",
    size: "1024x1024",
    quality: "high",
  });
  const b64 = (response as any).data?.[0]?.b64_json;
  if (!b64) throw new Error("No data");
  writeFileSync(
    path.resolve(__dirname, "../public/sites/pigmilk/product-fermented.png"),
    Buffer.from(b64, "base64"),
  );
  console.log("  DONE  product-fermented.png");
}

main().catch((err) => { console.error("FATAL:", err.message); process.exit(1); });
