# MCP Image Generation Server Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a local MCP server that enables Claude Code to generate images via OpenAI's `gpt-image-1.5` model, with support for base-image-assisted person generation.

**Architecture:** A standalone TypeScript MCP server under `mcp/image-gen/` using stdio transport. Three tools: `generate_image` (prompt-only), `generate_image_with_person` (with reference photos), and `list_base_images`. Generated images land in a gitignored staging folder.

**Tech Stack:** TypeScript, `@modelcontextprotocol/sdk`, `openai` SDK, `tsx`, `dotenv`

**Spec:** `docs/superpowers/specs/2026-03-29-mcp-image-generation-design.md`

---

## File Structure

```
mcp/image-gen/
├── package.json              # Standalone package with own deps
├── tsconfig.json             # TypeScript config for the MCP server
└── src/
    ├── index.ts              # MCP server entry point (stdio transport, tool registration)
    ├── tools/
    │   ├── generate-image.ts         # generate_image tool handler
    │   ├── generate-image-with-person.ts  # generate_image_with_person tool handler
    │   └── list-base-images.ts       # list_base_images tool handler
    └── utils/
        ├── openai.ts         # OpenAI client singleton
        ├── base-images.ts    # Base image directory scanning + random selection
        └── validation.ts     # Shared validation (dimensions, filenames)

base-images/                  # Gitignored — copied from C:\Users\bsamb\Downloads\friends
├── bill/
├── brandon/
├── jim/
└── sean/

generated-images/             # Gitignored — output staging area

.env                          # Gitignored — OPENAI_API_KEY
.claude/settings.local.json   # MCP server registration (not tracked)
```

---

### Task 1: Project scaffolding and configuration

**Files:**
- Create: `mcp/image-gen/package.json`
- Create: `mcp/image-gen/tsconfig.json`
- Create: `.env`
- Create: `.claude/settings.local.json`
- Modify: `.gitignore`

- [ ] **Step 1: Add gitignore entries**

Append to `.gitignore`:
```
# MCP image generation
base-images/
generated-images/
mcp/image-gen/node_modules/
```

- [ ] **Step 2: Create the MCP server package.json**

Create `mcp/image-gen/package.json`:
```json
{
  "name": "image-gen-mcp",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "start": "tsx src/index.ts",
    "test": "node --test --import tsx 'src/**/*.test.ts'"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.12.0",
    "dotenv": "^16.5.0",
    "openai": "^5.8.0",
    "tsx": "^4.19.0"
  }
}
```

- [ ] **Step 3: Create tsconfig.json**

Create `mcp/image-gen/tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "esModuleInterop": true,
    "strict": true,
    "outDir": "dist",
    "rootDir": "src",
    "skipLibCheck": true,
    "resolveJsonModule": true
  },
  "include": ["src"]
}
```

- [ ] **Step 4: Create .env file with placeholder**

Create `.env` at project root:
```
OPENAI_API_KEY=your-key-here
```

- [ ] **Step 5: Create .claude/settings.local.json**

Create `.claude/settings.local.json`:
```json
{
  "mcpServers": {
    "image-gen": {
      "command": "npx",
      "args": ["tsx", "mcp/image-gen/src/index.ts"],
      "cwd": "/home/bsambrone/repos/specificindustries",
      "env": {
        "OPENAI_API_KEY": "${OPENAI_API_KEY}"
      }
    }
  }
}
```

- [ ] **Step 6: Install dependencies**

Run: `cd mcp/image-gen && npm install`
Expected: `node_modules/` created, `package-lock.json` generated

- [ ] **Step 7: Commit**

```bash
git add .gitignore mcp/image-gen/package.json mcp/image-gen/tsconfig.json mcp/image-gen/package-lock.json
git commit -m "feat(mcp): scaffold image-gen MCP server package"
```

Note: Do NOT commit `.env` or `.claude/settings.local.json` — both are gitignored.

---

### Task 2: Copy base images from Windows downloads folder

**Files:**
- Create: `base-images/bill/`, `base-images/brandon/`, `base-images/jim/`, `base-images/sean/`

- [ ] **Step 1: Create base-images directory structure**

```bash
mkdir -p base-images/{bill,brandon,jim,sean}
```

- [ ] **Step 2: Copy friend photos organized by person**

```bash
cp "/mnt/c/Users/bsamb/Downloads/friends/bill1.jpg" base-images/bill/
cp "/mnt/c/Users/bsamb/Downloads/friends/bill2.jpeg" base-images/bill/
cp "/mnt/c/Users/bsamb/Downloads/friends/bill3.png" base-images/bill/
cp "/mnt/c/Users/bsamb/Downloads/friends/brandon1.png" base-images/brandon/
cp "/mnt/c/Users/bsamb/Downloads/friends/brandon2.jpg" base-images/brandon/
cp "/mnt/c/Users/bsamb/Downloads/friends/brandon3.png" base-images/brandon/
cp "/mnt/c/Users/bsamb/Downloads/friends/jim1.jpg" base-images/jim/
cp "/mnt/c/Users/bsamb/Downloads/friends/jim2.jpg" base-images/jim/
cp "/mnt/c/Users/bsamb/Downloads/friends/sean1.jpg" base-images/sean/
cp "/mnt/c/Users/bsamb/Downloads/friends/sean2.jpg" base-images/sean/
cp "/mnt/c/Users/bsamb/Downloads/friends/sean3.jpg" base-images/sean/
cp "/mnt/c/Users/bsamb/Downloads/friends/sean4.jpg" base-images/sean/
```

- [ ] **Step 3: Create generated-images directory**

```bash
mkdir -p generated-images
```

- [ ] **Step 4: Verify structure**

```bash
ls -R base-images/
```

Expected: Each person folder contains their photos.

No commit — `base-images/` is gitignored.

---

### Task 3: Shared validation utilities

**Files:**
- Create: `mcp/image-gen/src/utils/validation.ts`
- Create: `mcp/image-gen/src/utils/validation.test.ts`

- [ ] **Step 1: Write tests for validation utilities**

Create `mcp/image-gen/src/utils/validation.test.ts`:
```typescript
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { validateDimensions, validateFilename } from "./validation.js";

describe("validateDimensions", () => {
  it("accepts 1024x1024", () => {
    assert.equal(validateDimensions(1024, 1024), null);
  });

  it("accepts 1536x1024", () => {
    assert.equal(validateDimensions(1536, 1024), null);
  });

  it("accepts 1024x1536", () => {
    assert.equal(validateDimensions(1024, 1536), null);
  });

  it("rejects invalid dimensions", () => {
    const err = validateDimensions(512, 512);
    assert.ok(err);
    assert.ok(err.includes("512x512"));
    assert.ok(err.includes("1024x1024"));
  });
});

describe("validateFilename", () => {
  it("accepts valid png filename", () => {
    assert.equal(validateFilename("hero.png"), null);
  });

  it("accepts valid jpg filename", () => {
    assert.equal(validateFilename("team-photo.jpg"), null);
  });

  it("accepts valid webp filename", () => {
    assert.equal(validateFilename("product.webp"), null);
  });

  it("rejects path traversal", () => {
    const err = validateFilename("../../etc/passwd");
    assert.ok(err);
  });

  it("rejects forward slash paths", () => {
    const err = validateFilename("subdir/file.png");
    assert.ok(err);
  });

  it("rejects backslash paths", () => {
    const err = validateFilename("subdir\\file.png");
    assert.ok(err);
  });

  it("rejects invalid extension", () => {
    const err = validateFilename("file.bmp");
    assert.ok(err);
  });

  it("rejects no extension", () => {
    const err = validateFilename("file");
    assert.ok(err);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd mcp/image-gen && node --test --import tsx src/utils/validation.test.ts`
Expected: FAIL — `validation.js` does not exist yet

- [ ] **Step 3: Implement validation utilities**

Create `mcp/image-gen/src/utils/validation.ts`:
```typescript
const VALID_DIMENSIONS = ["1024x1024", "1536x1024", "1024x1536"] as const;
const VALID_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp"] as const;

export function validateDimensions(width: number, height: number): string | null {
  const size = `${width}x${height}`;
  if (!VALID_DIMENSIONS.includes(size as typeof VALID_DIMENSIONS[number])) {
    return `Invalid dimensions: ${size}. Valid options: ${VALID_DIMENSIONS.join(", ")}`;
  }
  return null;
}

export function validateFilename(filename: string): string | null {
  if (filename.includes("/") || filename.includes("\\") || filename.includes("..")) {
    return "Filename must not contain path separators or '..'";
  }

  const ext = filename.substring(filename.lastIndexOf(".")).toLowerCase();
  if (!VALID_EXTENSIONS.includes(ext as typeof VALID_EXTENSIONS[number])) {
    return `Invalid file extension: ${ext}. Valid options: ${VALID_EXTENSIONS.join(", ")}`;
  }

  return null;
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd mcp/image-gen && node --test --import tsx src/utils/validation.test.ts`
Expected: All 9 tests pass

- [ ] **Step 5: Commit**

```bash
git add mcp/image-gen/src/utils/validation.ts mcp/image-gen/src/utils/validation.test.ts
git commit -m "feat(mcp): add dimension and filename validation utilities"
```

---

### Task 4: Base image selection utility

**Files:**
- Create: `mcp/image-gen/src/utils/base-images.ts`
- Create: `mcp/image-gen/src/utils/base-images.test.ts`

- [ ] **Step 1: Write tests for base image utilities**

Create `mcp/image-gen/src/utils/base-images.test.ts`:
```typescript
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { resolvePersonFolder, selectRandomImages, FOUNDER_NAME } from "./base-images.js";

describe("FOUNDER_NAME", () => {
  it("is bill", () => {
    assert.equal(FOUNDER_NAME, "bill");
  });
});

describe("resolvePersonFolder", () => {
  it("returns person name when person is provided", () => {
    const available = ["bill", "brandon", "jim", "sean"];
    assert.equal(resolvePersonFolder({ person: "jim" }, available), "jim");
  });

  it("returns bill for founder role", () => {
    const available = ["bill", "brandon", "jim", "sean"];
    assert.equal(resolvePersonFolder({ role: "founder" }, available), "bill");
  });

  it("returns a non-bill person for team_member role", () => {
    const available = ["bill", "brandon", "jim", "sean"];
    const result = resolvePersonFolder({ role: "team_member" }, available);
    assert.ok(result !== "bill");
    assert.ok(available.includes(result));
  });

  it("person overrides role", () => {
    const available = ["bill", "brandon", "jim", "sean"];
    assert.equal(
      resolvePersonFolder({ person: "sean", role: "founder" }, available),
      "sean"
    );
  });

  it("throws for unknown person", () => {
    const available = ["bill", "brandon", "jim", "sean"];
    assert.throws(
      () => resolvePersonFolder({ person: "unknown" }, available),
      /not found/
    );
  });

  it("throws when neither role nor person provided", () => {
    const available = ["bill", "brandon", "jim", "sean"];
    assert.throws(
      () => resolvePersonFolder({}, available),
      /Either.*role.*person/
    );
  });
});

describe("selectRandomImages", () => {
  it("returns 2 images from a list of 4", () => {
    const files = ["a.jpg", "b.jpg", "c.jpg", "d.jpg"];
    const result = selectRandomImages(files, 2);
    assert.equal(result.length, 2);
    for (const r of result) {
      assert.ok(files.includes(r));
    }
  });

  it("returns all images when fewer than requested", () => {
    const files = ["a.jpg"];
    const result = selectRandomImages(files, 2);
    assert.equal(result.length, 1);
    assert.equal(result[0], "a.jpg");
  });

  it("returns no duplicates", () => {
    const files = ["a.jpg", "b.jpg", "c.jpg"];
    const result = selectRandomImages(files, 2);
    assert.equal(new Set(result).size, result.length);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd mcp/image-gen && node --test --import tsx src/utils/base-images.test.ts`
Expected: FAIL — `base-images.js` does not exist yet

- [ ] **Step 3: Implement base image utilities**

Create `mcp/image-gen/src/utils/base-images.ts`:
```typescript
import { readdirSync } from "node:fs";
import path from "node:path";

export const FOUNDER_NAME = "bill";

const BASE_IMAGES_DIR = path.resolve(process.cwd(), "base-images");

export interface PersonSelection {
  person?: string;
  role?: "founder" | "team_member";
}

export function listPeople(): Record<string, string[]> {
  let entries: string[];
  try {
    entries = readdirSync(BASE_IMAGES_DIR, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);
  } catch {
    return {};
  }

  const result: Record<string, string[]> = {};
  for (const person of entries) {
    const personDir = path.join(BASE_IMAGES_DIR, person);
    const files = readdirSync(personDir).filter((f) =>
      /\.(jpg|jpeg|png|webp)$/i.test(f)
    );
    if (files.length > 0) {
      result[person] = files;
    }
  }
  return result;
}

export function resolvePersonFolder(
  selection: PersonSelection,
  availablePeople: string[]
): string {
  if (selection.person) {
    if (!availablePeople.includes(selection.person)) {
      throw new Error(
        `Person "${selection.person}" not found. Available: ${availablePeople.join(", ")}`
      );
    }
    return selection.person;
  }

  if (selection.role === "founder") {
    return FOUNDER_NAME;
  }

  if (selection.role === "team_member") {
    const nonFounders = availablePeople.filter((p) => p !== FOUNDER_NAME);
    if (nonFounders.length === 0) {
      throw new Error("No team member base images available (only founder found)");
    }
    return nonFounders[Math.floor(Math.random() * nonFounders.length)];
  }

  throw new Error(
    "Either 'role' (founder/team_member) or 'person' (name) must be provided"
  );
}

export function selectRandomImages(files: string[], count: number): string[] {
  if (files.length <= count) return [...files];
  const shuffled = [...files].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function getBaseImagePaths(personName: string, selectedFiles: string[]): string[] {
  return selectedFiles.map((f) => path.join(BASE_IMAGES_DIR, personName, f));
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd mcp/image-gen && node --test --import tsx src/utils/base-images.test.ts`
Expected: All 9 tests pass

- [ ] **Step 5: Commit**

```bash
git add mcp/image-gen/src/utils/base-images.ts mcp/image-gen/src/utils/base-images.test.ts
git commit -m "feat(mcp): add base image selection utilities"
```

---

### Task 5: OpenAI client utility

**Files:**
- Create: `mcp/image-gen/src/utils/openai.ts`

- [ ] **Step 1: Create OpenAI client singleton**

Create `mcp/image-gen/src/utils/openai.ts`:
```typescript
import OpenAI from "openai";
import dotenv from "dotenv";
import path from "node:path";

// Load .env from project root (two levels up from mcp/image-gen/src/utils/)
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey || apiKey === "your-key-here") {
  throw new Error(
    "OPENAI_API_KEY is not set. Add it to the .env file in the project root."
  );
}

export const openai = new OpenAI({ apiKey });
```

- [ ] **Step 2: Commit**

```bash
git add mcp/image-gen/src/utils/openai.ts
git commit -m "feat(mcp): add OpenAI client singleton with dotenv loading"
```

---

### Task 6: `generate_image` tool

**Files:**
- Create: `mcp/image-gen/src/tools/generate-image.ts`

- [ ] **Step 1: Implement generate_image tool handler**

Create `mcp/image-gen/src/tools/generate-image.ts`:
```typescript
import { z } from "zod";
import { writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { openai } from "../utils/openai.js";
import { validateDimensions, validateFilename } from "../utils/validation.js";

const GENERATED_DIR = path.resolve(process.cwd(), "generated-images");

export const generateImageSchema = {
  prompt: z.string().describe("The image generation prompt"),
  width: z.number().describe("Image width in pixels (1024 or 1536)"),
  height: z.number().describe("Image height in pixels (1024 or 1536)"),
  filename: z.string().describe("Output filename (e.g., hero.png)"),
  quality: z
    .enum(["low", "medium", "high"])
    .default("high")
    .describe("Generation quality (default: high)"),
};

export async function handleGenerateImage(args: {
  prompt: string;
  width: number;
  height: number;
  filename: string;
  quality: "low" | "medium" | "high";
}) {
  const dimError = validateDimensions(args.width, args.height);
  if (dimError) return { content: [{ type: "text" as const, text: dimError }], isError: true };

  const fileError = validateFilename(args.filename);
  if (fileError) return { content: [{ type: "text" as const, text: fileError }], isError: true };

  const size = `${args.width}x${args.height}` as "1024x1024" | "1536x1024" | "1024x1536";

  try {
    const response = await openai.images.generate({
      model: "gpt-image-1.5",
      prompt: args.prompt,
      size,
      quality: args.quality,
      response_format: "b64_json",
    });

    const b64Data = response.data?.[0]?.b64_json;
    if (!b64Data) {
      return { content: [{ type: "text" as const, text: "No image data in API response" }], isError: true };
    }

    mkdirSync(GENERATED_DIR, { recursive: true });
    const outputPath = path.join(GENERATED_DIR, args.filename);
    writeFileSync(outputPath, Buffer.from(b64Data, "base64"));

    return {
      content: [
        {
          type: "text" as const,
          text: `Image generated successfully.\nPath: ${outputPath}\nSize: ${size}\nQuality: ${args.quality}`,
        },
      ],
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { content: [{ type: "text" as const, text: `OpenAI API error: ${message}` }], isError: true };
  }
}
```

Note: `zod` is a dependency of `@modelcontextprotocol/sdk` and available without explicit install. The MCP SDK uses zod for tool schema definitions.

- [ ] **Step 2: Commit**

```bash
git add mcp/image-gen/src/tools/generate-image.ts
git commit -m "feat(mcp): add generate_image tool handler"
```

---

### Task 7: `generate_image_with_person` tool

**Files:**
- Create: `mcp/image-gen/src/tools/generate-image-with-person.ts`

- [ ] **Step 1: Implement generate_image_with_person tool handler**

Create `mcp/image-gen/src/tools/generate-image-with-person.ts`:
```typescript
import { z } from "zod";
import { createReadStream } from "node:fs";
import { writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { openai } from "../utils/openai.js";
import { validateDimensions, validateFilename } from "../utils/validation.js";
import {
  listPeople,
  resolvePersonFolder,
  selectRandomImages,
  getBaseImagePaths,
} from "../utils/base-images.js";

const GENERATED_DIR = path.resolve(process.cwd(), "generated-images");

export const generateImageWithPersonSchema = {
  prompt: z.string().describe("The image generation prompt (should describe the person/scene)"),
  width: z.number().describe("Image width in pixels (1024 or 1536)"),
  height: z.number().describe("Image height in pixels (1024 or 1536)"),
  filename: z.string().describe("Output filename"),
  role: z
    .enum(["founder", "team_member"])
    .optional()
    .describe("Auto-picks person: founder → Bill, team_member → random friend"),
  person: z
    .string()
    .optional()
    .describe("Explicit person name (e.g., 'jim'), overrides role"),
  quality: z
    .enum(["low", "medium", "high"])
    .default("high")
    .describe("Generation quality (default: high)"),
};

export async function handleGenerateImageWithPerson(args: {
  prompt: string;
  width: number;
  height: number;
  filename: string;
  role?: "founder" | "team_member";
  person?: string;
  quality: "low" | "medium" | "high";
}) {
  const dimError = validateDimensions(args.width, args.height);
  if (dimError) return { content: [{ type: "text" as const, text: dimError }], isError: true };

  const fileError = validateFilename(args.filename);
  if (fileError) return { content: [{ type: "text" as const, text: fileError }], isError: true };

  const people = listPeople();
  const availableNames = Object.keys(people);

  if (availableNames.length === 0) {
    return {
      content: [
        {
          type: "text" as const,
          text: "No base images found. Create person folders in base-images/ with photo files (jpg, png, webp).",
        },
      ],
      isError: true,
    };
  }

  let personName: string;
  try {
    personName = resolvePersonFolder(
      { person: args.person, role: args.role },
      availableNames
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { content: [{ type: "text" as const, text: message }], isError: true };
  }

  const personFiles = people[personName];
  const selectedFiles = selectRandomImages(personFiles, 2);
  const imagePaths = getBaseImagePaths(personName, selectedFiles);

  const size = `${args.width}x${args.height}` as "1024x1024" | "1536x1024" | "1024x1536";

  try {
    const imageStreams = imagePaths.map((p) => createReadStream(p));

    const response = await openai.images.edit({
      model: "gpt-image-1.5",
      image: imageStreams,
      prompt: args.prompt,
      size,
      quality: args.quality,
      input_fidelity: "high",
      response_format: "b64_json",
    });

    const b64Data = response.data?.[0]?.b64_json;
    if (!b64Data) {
      return { content: [{ type: "text" as const, text: "No image data in API response" }], isError: true };
    }

    mkdirSync(GENERATED_DIR, { recursive: true });
    const outputPath = path.join(GENERATED_DIR, args.filename);
    writeFileSync(outputPath, Buffer.from(b64Data, "base64"));

    return {
      content: [
        {
          type: "text" as const,
          text: `Image generated successfully.\nPath: ${outputPath}\nPerson: ${personName}\nReference photos: ${selectedFiles.join(", ")}\nSize: ${size}\nQuality: ${args.quality}\nInput fidelity: high`,
        },
      ],
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { content: [{ type: "text" as const, text: `OpenAI API error: ${message}` }], isError: true };
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add mcp/image-gen/src/tools/generate-image-with-person.ts
git commit -m "feat(mcp): add generate_image_with_person tool handler"
```

---

### Task 8: `list_base_images` tool

**Files:**
- Create: `mcp/image-gen/src/tools/list-base-images.ts`

- [ ] **Step 1: Implement list_base_images tool handler**

Create `mcp/image-gen/src/tools/list-base-images.ts`:
```typescript
import { listPeople } from "../utils/base-images.js";

export async function handleListBaseImages() {
  const people = listPeople();

  if (Object.keys(people).length === 0) {
    return {
      content: [
        {
          type: "text" as const,
          text: "No base images found. Create person folders in base-images/ with photo files (jpg, png, webp).",
        },
      ],
    };
  }

  return {
    content: [
      {
        type: "text" as const,
        text: JSON.stringify(people, null, 2),
      },
    ],
  };
}
```

- [ ] **Step 2: Commit**

```bash
git add mcp/image-gen/src/tools/list-base-images.ts
git commit -m "feat(mcp): add list_base_images tool handler"
```

---

### Task 9: MCP server entry point

**Files:**
- Create: `mcp/image-gen/src/index.ts`

- [ ] **Step 1: Implement the MCP server entry point**

Create `mcp/image-gen/src/index.ts`:
```typescript
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
```

- [ ] **Step 2: Verify the server starts without errors**

Run: `cd /home/bsambrone/repos/specificindustries && echo '{}' | timeout 5 npx --prefix mcp/image-gen tsx mcp/image-gen/src/index.ts 2>&1 || true`

Expected: Server starts (may fail on OPENAI_API_KEY if not yet set — that's expected). The import chain should resolve without errors.

- [ ] **Step 3: Commit**

```bash
git add mcp/image-gen/src/index.ts
git commit -m "feat(mcp): add MCP server entry point with tool registration"
```

---

### Task 10: End-to-end verification

- [ ] **Step 1: Verify .env has a real API key**

Check that `.env` contains a real `OPENAI_API_KEY` (not the placeholder). If the user hasn't filled it in yet, ask them to do so.

- [ ] **Step 2: Run all unit tests**

Run: `cd mcp/image-gen && node --test --import tsx src/utils/validation.test.ts src/utils/base-images.test.ts`
Expected: All 18 tests pass

- [ ] **Step 3: Verify MCP server registration**

Confirm `.claude/settings.local.json` exists and has the correct `mcpServers.image-gen` configuration.

- [ ] **Step 4: Test list_base_images manually**

After restarting Claude Code (to pick up the new MCP server), call the `list_base_images` tool. Expected: returns JSON listing bill, brandon, jim, and sean with their image files.

- [ ] **Step 5: Test generate_image with a simple prompt**

Call `generate_image` with a small test prompt:
- `prompt`: "A red circle on a white background"
- `width`: 1024
- `height`: 1024
- `filename`: "test-circle.png"
- `quality`: "low"

Expected: Image generated at `generated-images/test-circle.png`

- [ ] **Step 6: Test generate_image_with_person with founder role**

Call `generate_image_with_person`:
- `prompt`: "Professional headshot of a business founder in a modern office, wearing a blazer, warm lighting"
- `width`: 1024
- `height`: 1536
- `filename`: "test-founder.png"
- `role`: "founder"
- `quality`: "low"

Expected: Image generated at `generated-images/test-founder.png`, response mentions person=bill and which reference photos were used.

- [ ] **Step 7: Clean up test images**

```bash
rm -f generated-images/test-circle.png generated-images/test-founder.png
```
