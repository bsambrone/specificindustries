import OpenAI from "openai";
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Load .env from project root (2 levels up from src/utils/)
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../../../../.env") });

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey || apiKey === "your-key-here") {
  throw new Error(
    "OPENAI_API_KEY is not set. Add it to the .env file in the project root."
  );
}

export const openai = new OpenAI({ apiKey });
