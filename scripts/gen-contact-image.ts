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
  console.log("  GEN   contact-warehouse.png ...");
  const response = await openai.images.generate({
    model: "gpt-image-1" as any,
    prompt: "A warehouse worker in an orange safety vest and flannel shirt standing next to a ringing desk phone in an industrial warehouse setting. He looks very concerned and is dreading picking up the phone. Sandpaper products visible on shelves behind him. Warm industrial lighting. Photojournalism style.",
    size: "1536x1024",
    quality: "high",
  });
  const b64 = (response as any).data?.[0]?.b64_json;
  if (!b64) throw new Error("No data");
  writeFileSync(
    path.resolve(__dirname, "../public/sites/truegrit/contact-warehouse.png"),
    Buffer.from(b64, "base64"),
  );
  console.log("  DONE  contact-warehouse.png");
}

main().catch((err) => { console.error("FATAL:", err.message); process.exit(1); });
