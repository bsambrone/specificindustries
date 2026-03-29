# MCP Image Generation Server Design

## Overview

A local MCP (Model Context Protocol) server that enables Claude Code to generate images via OpenAI's `gpt-image-1.5` model directly within the Specific Industries project. The server supports both prompt-only generation and base-image-assisted generation using reference photos of real people.

## Goals

- Allow Claude Code to generate site images without leaving the conversation
- Support base image input for generating realistic person imagery (team photos, founder portraits, lifestyle shots)
- Keep sensitive assets (API key, friend photos, generated images) out of git
- Fit naturally into the existing project structure and workflow

## Architecture

### Project Layout

```
mcp/
└── image-gen/
    ├── package.json          # Standalone package (own deps)
    ├── tsconfig.json
    └── src/
        ├── index.ts          # MCP server entry point (stdio transport)
        ├── tools/
        │   ├── generate-image.ts
        │   ├── generate-image-with-person.ts
        │   └── list-base-images.ts
        └── utils/
            ├── openai.ts     # OpenAI API client wrapper
            └── base-images.ts # Friend photo selection logic

base-images/                  # Gitignored — friend reference photos
├── bill/
│   ├── bill1.jpg
│   ├── bill2.jpeg
│   └── bill3.png
├── brandon/
│   ├── brandon1.png
│   ├── brandon2.jpg
│   └── brandon3.png
├── jim/
│   ├── jim1.jpg
│   └── jim2.jpg
└── sean/
    ├── sean1.jpg
    ├── sean2.jpg
    ├── sean3.jpg
    └── sean4.jpg

generated-images/             # Gitignored — output staging area
```

### Runtime

- TypeScript MCP server using `@modelcontextprotocol/sdk`
- Run via `tsx` (no build step)
- Stdio transport (launched by Claude Code as a child process)
- Self-contained package under `mcp/image-gen/` with its own `node_modules`

### Dependencies

- `@modelcontextprotocol/sdk` — MCP server framework
- `openai` — Official OpenAI Node SDK
- `dotenv` — Load `.env` from project root

## MCP Tools

### Tool 1: `generate_image`

Generates an image from a text prompt only.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `prompt` | string | Yes | The image generation prompt |
| `width` | number | Yes | Image width in pixels |
| `height` | number | Yes | Image height in pixels |
| `filename` | string | Yes | Output filename (e.g., `hero.png`) |
| `quality` | `"low"` \| `"medium"` \| `"high"` | No | Generation quality (default: `"high"`) |

**Behavior:**
1. Call OpenAI's `gpt-image-1.5` model with the prompt and `{width}x{height}` size
2. Save the result to `generated-images/<filename>`
3. Return the path to the generated image

### Tool 2: `generate_image_with_person`

Generates an image using reference photos of a real person as base images.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `prompt` | string | Yes | The image generation prompt (should describe the person/scene) |
| `width` | number | Yes | Image width in pixels |
| `height` | number | Yes | Image height in pixels |
| `filename` | string | Yes | Output filename |
| `role` | `"founder"` \| `"team_member"` | No | Auto-picks person: `founder` → Bill, `team_member` → random non-Bill friend |
| `person` | string | No | Explicit person name (e.g., `"jim"`), overrides `role` |
| `quality` | `"low"` \| `"medium"` \| `"high"` | No | Generation quality (default: `"high"`) |

**Validation:** Either `role` or `person` must be provided. If `person` is given, validates the name exists in `base-images/`.

**Behavior:**
1. Resolve which person to use:
   - If `person` is provided → use that person's folder
   - If `role: "founder"` → use `bill/`
   - If `role: "team_member"` → pick a random person from all non-Bill folders
2. Select 2 random images from that person's folder
3. Read and base64-encode the selected images
4. Send images + prompt to `gpt-image-1.5` as an image edit request
5. Save the result to `generated-images/<filename>`
6. Return the path to the generated image and which person/photos were used

**Edge case:** If a person has fewer than 2 images, use all available images (1 image still works).

### Tool 3: `list_base_images`

Lists all available base image people and their photos.

**Parameters:** None

**Returns:** A structured object listing each person and their available image files:
```json
{
  "bill": ["bill1.jpg", "bill2.jpeg", "bill3.png"],
  "brandon": ["brandon1.png", "brandon2.jpg", "brandon3.png"],
  "jim": ["jim1.jpg", "jim2.jpg"],
  "sean": ["sean1.jpg", "sean2.jpg", "sean3.jpg", "sean4.jpg"]
}
```

## Configuration

### MCP Server Registration

`.claude/settings.local.json` (not tracked in git):
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

### API Key

Stored in `.env` at project root (already gitignored via `.env*` pattern):
```
OPENAI_API_KEY=sk-...
```

The server loads the key via `dotenv` from the project root, or receives it through the MCP config env passthrough.

## Git Exclusions

Additions to `.gitignore`:
```
# MCP image generation
base-images/
generated-images/
mcp/image-gen/node_modules/
```

The `.env*` pattern already exists in `.gitignore`.

## Workflow

1. Claude Code starts the MCP server automatically when the project is opened
2. When image generation is needed, Claude calls the appropriate tool
3. Generated images land in `generated-images/`
4. Claude (or the user) moves approved images to `public/sites/<subdomain>/`
5. For person images, Claude specifies a role or person name; the server handles photo selection

## Base Image Mapping

| Role | Person | Notes |
|------|--------|-------|
| `founder` | Bill | Always Bill for any founder/owner imagery |
| `team_member` | Random from: Brandon, Jim, Sean | Server picks one at random per call |

The `person` parameter allows overriding this mapping when a specific friend is needed.

## Supported Dimensions

The caller must always specify `width` and `height`. Valid combinations for `gpt-image-1.5`:
- `1024x1024` (square)
- `1536x1024` (landscape)
- `1024x1536` (portrait)
- `auto` is also supported by the API but we require explicit dimensions
