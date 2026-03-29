import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { generateImageSchema, handleGenerateImage } from "./tools/generate-image.js";
import {
  generateImageWithPersonSchema,
  handleGenerateImageWithPerson,
} from "./tools/generate-image-with-person.js";
import { handleListBaseImages } from "./tools/list-base-images.js";

const server = new McpServer({
  name: "image-gen",
  version: "1.0.0",
});

server.tool(
  "generate_image",
  "Generate an image from a text prompt using OpenAI gpt-image-1.5. Caller must specify dimensions. Valid sizes: 1024x1024, 1536x1024, 1024x1536.",
  generateImageSchema,
  handleGenerateImage
);

server.tool(
  "generate_image_with_person",
  "Generate an image using reference photos of a real person for likeness. Uses OpenAI gpt-image-1.5 with input_fidelity=high. Specify role (founder=Bill, team_member=random friend) or person name. Valid sizes: 1024x1024, 1536x1024, 1024x1536.",
  generateImageWithPersonSchema,
  handleGenerateImageWithPerson
);

server.tool(
  "list_base_images",
  "List all available base image people and their photo files in the base-images/ directory.",
  {},
  handleListBaseImages
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error("MCP server failed to start:", err);
  process.exit(1);
});
