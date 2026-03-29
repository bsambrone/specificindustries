import OpenAI from "openai";
import dotenv from "dotenv";
import path from "node:path";

// Load .env from project root
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey || apiKey === "your-key-here") {
  throw new Error(
    "OPENAI_API_KEY is not set. Add it to the .env file in the project root."
  );
}

export const openai = new OpenAI({ apiKey });
