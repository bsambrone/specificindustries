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
  console.log("  GEN   experience-hero.png ...");
  const response = await openai.images.generate({
    model: "gpt-image-1" as any,
    prompt: "A centered group photo of four men standing near a bathroom door, all looking concerned and worried. All four are wearing flannel shirts. The group is centered in the frame with normal proportions. Warm indoor lighting, a closed bathroom door visible behind them. Shot at normal focal length with no distortion.",
    size: "1536x1024",
    quality: "high",
  });
  const b64 = (response as any).data?.[0]?.b64_json;
  if (!b64) throw new Error("No data");
  writeFileSync(
    path.resolve(__dirname, "../public/sites/truegrit/experience-hero.png"),
    Buffer.from(b64, "base64"),
  );
  console.log("  DONE  experience-hero.png");
}

main().catch((err) => { console.error("FATAL:", err.message); process.exit(1); });
