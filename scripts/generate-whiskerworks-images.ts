/**
 * Batch image generator for the Whiskerworks site.
 * Generates: hero, campus, 5 division banners (Blackbook skipped),
 * 18 course heroes (2 redacted skipped), 15 faculty portraits,
 * 4 leadership portraits (with reference-person faces), and favicon.
 *
 * Usage: OPENAI_API_KEY=sk-... npx tsx scripts/generate-whiskerworks-images.ts
 *
 * Images saved to public/sites/whiskerworks/. Existing files are skipped (resumable).
 */

import OpenAI, { toFile } from "openai"
import fs from "fs"
import path from "path"
import { courses } from "../src/sites/whiskerworks/data/courses"
import { faculty } from "../src/sites/whiskerworks/data/faculty"
import { leaders } from "../src/sites/whiskerworks/data/leadership"

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
const OUTPUT_DIR = path.join(__dirname, "../public/sites/whiskerworks")
const BASE_IMAGES_DIR = path.join(__dirname, "../mcp/image-gen/base-images")

fs.mkdirSync(OUTPUT_DIR, { recursive: true })
fs.mkdirSync(path.join(OUTPUT_DIR, "divisions"), { recursive: true })
fs.mkdirSync(path.join(OUTPUT_DIR, "courses"), { recursive: true })
fs.mkdirSync(path.join(OUTPUT_DIR, "faculty"), { recursive: true })
fs.mkdirSync(path.join(OUTPUT_DIR, "leaders"), { recursive: true })

async function generateImage(
  prompt: string,
  filename: string,
  size: "1024x1024" | "1536x1024" | "1024x1536" = "1024x1024"
) {
  const filepath = path.join(OUTPUT_DIR, filename)
  if (fs.existsSync(filepath)) {
    console.log(`  ⏭ ${filename} (already exists)`)
    return
  }
  console.log(`  🎨 Generating ${filename}...`)
  try {
    const response = await openai.images.generate({
      model: "gpt-image-1",
      prompt,
      n: 1,
      size,
      quality: "medium",
    })
    const imageData = response.data?.[0]
    if (!imageData) throw new Error("No image data returned")
    if (imageData.b64_json) {
      fs.writeFileSync(filepath, Buffer.from(imageData.b64_json, "base64"))
    } else if (imageData.url) {
      const res = await fetch(imageData.url)
      const buffer = Buffer.from(await res.arrayBuffer())
      fs.writeFileSync(filepath, buffer)
    }
    console.log(`  ✓ ${filename}`)
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error(`  ✗ ${filename}: ${msg}`)
  }
}

async function generateWithPerson(
  prompt: string,
  filename: string,
  person: string,
  size: "1024x1024" | "1536x1024" | "1024x1536" = "1024x1536"
) {
  const filepath = path.join(OUTPUT_DIR, filename)
  if (fs.existsSync(filepath)) {
    console.log(`  ⏭ ${filename} (already exists)`)
    return
  }
  const personDir = path.join(BASE_IMAGES_DIR, person)
  if (!fs.existsSync(personDir)) {
    console.error(`  ✗ ${filename}: no base images directory for ${person} at ${personDir}`)
    return
  }
  const photos = fs
    .readdirSync(personDir)
    .filter((f) => /\.(jpg|jpeg|png)$/i.test(f))
    .slice(0, 2)
  if (photos.length === 0) {
    console.error(`  ✗ ${filename}: no photos found for ${person}`)
    return
  }
  console.log(`  🎨 Generating ${filename} (with ${person} reference)...`)
  try {
    const inputImages = await Promise.all(
      photos.map(async (photo) => {
        const photoPath = path.join(personDir, photo)
        const buffer = fs.readFileSync(photoPath)
        const ext = path.extname(photo).toLowerCase()
        const mime = ext === ".png" ? "image/png" : ext === ".webp" ? "image/webp" : "image/jpeg"
        return toFile(buffer, photo, { type: mime })
      })
    )
    const response = await openai.images.edit({
      model: "gpt-image-1",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      image: inputImages as any,
      prompt,
      size,
      quality: "medium",
    })
    const imageData = response.data?.[0]
    if (!imageData) throw new Error("No image data returned")
    if (imageData.b64_json) {
      fs.writeFileSync(filepath, Buffer.from(imageData.b64_json, "base64"))
    } else if (imageData.url) {
      const res = await fetch(imageData.url)
      const buffer = Buffer.from(await res.arrayBuffer())
      fs.writeFileSync(filepath, buffer)
    }
    console.log(`  ✓ ${filename}`)
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error(`  ✗ ${filename}: ${msg}`)
  }
}

// ─── Style constants ─────────────────────────────────────────

const CAT_STYLE =
  "Photoreal brochure photography of a domestic cat. Clean studio-grade lighting, shallow depth of field, straight-faced composition, tasteful color palette of municipal blue, warm off-white, and safety orange. The implausibility of the scenario is the joke; the execution is serious and professional. No text or captions in the image."

const FACULTY_STYLE =
  "Formal yearbook-style oval-cropped headshot of a domestic cat in academic attire (blazer, small tie, or light gown). Neutral studio backdrop, soft key light, chest-up framing, direct gaze, dignified. No text in the image."

const LEADERSHIP_STYLE =
  "Trade-school-brochure executive portrait. Subject is in an ill-fitting navy blazer holding or wearing a lanyard. Plain beige office wall behind, harsh overhead fluorescent lighting. The expression reads as 'confident but not quite earned.' Chest-up framing. No text in the image."

// ─── Prompt data ─────────────────────────────────────────────

const DIVISION_PROMPTS: Record<string, string> = {
  academics:
    "Three domestic cats seated in an old wooden lecture hall in academic blazers, a chalkboard behind them covered in handwritten physics equations. Dust motes in a sunbeam from a high window.",
  tactical:
    "Two domestic cats in black tactical turtlenecks on a rooftop at dusk, one holding tiny binoculars in its paws. Urban skyline silhouetted in the background.",
  industrial:
    "Three domestic cats in hi-vis safety vests and miniature hard hats standing in a warehouse aisle between pallet racks. A forklift is visible in the background.",
  corporate:
    "A boardroom scene. Three domestic cats in business suits seated at a long conference table, laptops open, one gesturing at a slide deck projected on the wall.",
  domestic:
    "A warmly lit home interior collage: one domestic cat holding a swaddled human infant, another standing next to a push lawnmower, a third at a small desk piled with tax forms.",
}

const COURSE_PROMPTS: Record<string, string> = {
  "theoretical-physics":
    "A domestic cat in a tiny tweed blazer at a chalkboard covered in handwritten physics equations, mid-lecture, one paw raised toward a chalk-drawn arrow. Chalk dust on the paw.",
  "tax-preparation":
    "A domestic cat at a desk buried in IRS 1099 forms and a ten-key calculator. Reading glasses perched on its nose. One paw rests on a stack of receipts.",
  sommelier:
    "A tuxedo cat in a black vest and bowtie holding a small wine glass, sniffing the bouquet with offensive snobbery. Candlelit fine-dining room behind, out of focus.",
  espionage:
    "A domestic cat in a tiny black trenchcoat and fedora, rappelling down a concrete wall on a thin rope. A red laser grid is visible behind.",
  marksmanship:
    "A domestic cat in shooting earmuffs and safety goggles at an outdoor marksmanship range, paws steady on a scaled-down practice rig. Paper targets receding in the distance.",
  "bus-operation":
    "A domestic cat in a transit operator uniform and cap seated at the oversized wheel of a municipal transit bus. Concerned human passengers visible through the windshield.",
  "blender-certification":
    "A domestic cat in a barista apron standing on a stool, operating a commercial Vitamix blender. A bright green smoothie is visibly swirling in the pitcher.",
  forklift:
    "A domestic cat in a hi-vis vest and tiny hard hat operating a forklift in a warehouse aisle, a wooden pallet lifted mid-air with exaggerated confidence.",
  "airline-pilot":
    "A domestic cat in a full commercial captain's uniform (aviator sunglasses, cap with gold wings, four-stripe shoulders) seated in a narrow-body airliner cockpit, paws on the yoke.",
  "middle-management":
    "A domestic cat in an ill-fitting blazer seated in a gray corporate cubicle. Three monitors glow in front of it. A stress ball is clutched in one paw. An ID lanyard hangs around its neck.",
  "replace-your-human":
    "A domestic cat seated at a home-office desk, on a Zoom video call visible on the monitor. It wears a human's oversized company ID lanyard. A coffee mug on the desk reads 'WORLD'S BEST DAD.'",
  powerpoint:
    "A domestic cat in a blazer presenting a slide titled 'Q3 SYNERGY' in a corporate boardroom. A laser pointer is gripped in its paw. The slide shows a bar chart. Bored human audience seated at the table.",
  therapist:
    "A domestic cat on a small therapist's stool holding a clipboard. A human client on the couch in mid-sentence, gesturing. A leafy plant and a clock on the wall.",
  dmv:
    "A domestic cat seated on a plastic chair in a fluorescent-lit DMV waiting room, holding a small paper ticket printed with '87.' Other humans wait in the background.",
  "small-engine-repair":
    "A domestic cat in greasy gray coveralls crouched over a disassembled lawnmower engine on a workbench, a wrench in one paw, a spark plug in the other. Grease streak on cheek.",
  "infant-childcare":
    "A domestic cat confidently holding a swaddled human infant in both front paws, seated on a pastel-colored nursery rug. A bottle on the floor. A diaper bag visible behind.",
  "wedding-officiant":
    "A domestic cat in white officiant robes holding a small ring pillow in its paws. A nervous human couple stands at an altar behind it. Warm sunset lighting through a window.",
  "jury-duty":
    "A domestic cat seated in a courtroom jury box, stern expression, wearing a 'JUROR' lanyard. A small notepad visible beneath a paw with the word 'GUILTY' written on it.",
}

const FACULTY_PROMPTS: Record<string, string> = {
  "mittens-phd":
    "A dignified gray tabby cat in a tweed blazer over a small white shirt, a hint of chalk dust on one paw.",
  "biscuit-mfa":
    "A plump orange cat in a cream cardigan over a pale collared shirt, reading glasses perched on its nose.",
  "dumpling-sensei":
    "A tuxedo cat in a black vest and small bowtie holding a tiny wine glass in one paw.",
  "agent-pepper":
    "A sleek solid-black cat in a black turtleneck, half of its face in dramatic shadow.",
  "bullet-mandrake":
    "A scruffy brown tabby in shooting goggles pushed up on its head and black ear protection slung around its neck.",
  "chief-operator-gravy":
    "A stocky gray cat in a transit operator uniform with a navy cap and small brass badge.",
  "chef-paprika":
    "A calico cat in a pristine white chef's jacket with a tiny neckerchief.",
  "foreman-pickles":
    "A dusty-furred brown tabby in gray coveralls with a grease streak on the cheek and a hi-vis collar.",
  "captain-milo":
    "A confident tabby in a navy commercial pilot's jacket with a cap and aviator sunglasses pushed up.",
  "director-toffee":
    "A toffee-colored cat in a navy blazer over a pale blue shirt, a lanyard visible around the neck.",
  "vp-marmalade":
    "An orange tabby in a sharp black suit jacket with a corporate ID lanyard.",
  "dr-morsel":
    "A silver Persian in a beige cardigan, serious expression, a small clipboard in one paw.",
  "ms-tabitha":
    "A patient tortoiseshell in a plain gray sweater, gentle expression.",
  "nana-whiskers":
    "A soft-looking white cat in a floral-print apron, warm expression.",
  "reverend-poppy":
    "A cream-colored cat in white officiant robes with a gold-trim stole.",
  "foreperson-jinx":
    "A solid black cat in a dark blazer over a white shirt, a 'JUROR' badge on the lapel.",
}

// ─── Generation sequence ─────────────────────────────────────

async function main() {
  console.log("🏫 Generating Whiskerworks imagery\n")

  // 1. Hero + campus
  await generateImage(
    `${CAT_STYLE} Wide commencement scene: a line of domestic cats in black graduation caps and gowns standing on a stage, soft institutional lighting. Wide 16:9 framing.`,
    "hero.jpg",
    "1536x1024"
  )
  await generateImage(
    "Photoreal exterior of an American strip-mall. Centered: a second-story window with a laminated sign reading 'WHISKERWORKS INSTITUTE · SUITE 208'. Below is a Spirit Halloween storefront with an inflatable witch in the window. Overcast daytime light. No people in frame. Wide 16:9 framing.",
    "campus.jpg",
    "1536x1024"
  )

  // 2. Division banners (5 — blackbook skipped; rendered as solid black in CSS)
  for (const [slug, scene] of Object.entries(DIVISION_PROMPTS)) {
    await generateImage(
      `${CAT_STYLE} Scene: ${scene} Wide 16:9 framing suitable for a banner.`,
      `divisions/${slug}.jpg`,
      "1536x1024"
    )
  }

  // 3. Course heroes (18 non-redacted)
  const nonRedactedCourses = courses.filter((c) => !c.isRedacted)
  for (const course of nonRedactedCourses) {
    const scene = COURSE_PROMPTS[course.slug]
    if (!scene) {
      console.warn(`  ⚠ No course prompt for ${course.slug} — skipping`)
      continue
    }
    await generateImage(
      `${CAT_STYLE} Scene: ${scene}`,
      `courses/${course.slug}.jpg`,
      "1536x1024"
    )
  }

  // 4. Faculty portraits (15)
  for (const f of faculty) {
    const subject = FACULTY_PROMPTS[f.slug]
    if (!subject) {
      console.warn(`  ⚠ No faculty prompt for ${f.slug} — skipping`)
      continue
    }
    await generateImage(
      `${FACULTY_STYLE} Subject: ${subject}`,
      `faculty/${f.slug}.jpg`,
      "1024x1536"
    )
  }

  // 5. Leadership portraits (4 — reference-person faces)
  for (const leader of leaders) {
    await generateWithPerson(
      `${LEADERSHIP_STYLE} The subject is a middle-aged man photographed in this trade-school executive style. Preserve the reference face.`,
      `leaders/${leader.person}.png`,
      leader.person,
      "1024x1536"
    )
  }

  // 6. Favicon source (will be resized to 64x64 by scripts/resize-favicons.mjs)
  await generateImage(
    "A simple logo mark: a dignified domestic-cat silhouette centered inside a classical laurel wreath. Flat badge style, two colors only — deep municipal teal on a cream background. High contrast so the mark reads at 16x16 pixels. Centered composition, no text.",
    "favicon.png",
    "1024x1024"
  )

  console.log("\n✓ Whiskerworks imagery generation complete.")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
