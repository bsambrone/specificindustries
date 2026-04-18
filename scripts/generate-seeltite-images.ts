/**
 * Batch image generator for the Seel-Tite site.
 * Generates hero, 11 product images (hero + 2 gallery + exploded diagram × 11),
 * 8 prevention scenarios, 8 recovery cases, compatibility diagrams,
 * about/heritage photography, contact, privacy banner, and 4 constipated exec portraits.
 *
 * Usage: OPENAI_API_KEY=sk-... npx tsx scripts/generate-seeltite-images.ts
 *
 * Images saved to public/sites/seeltite/. Existing files are skipped (resumable).
 */

import OpenAI, { toFile } from "openai"
import fs from "fs"
import path from "path"
import { products } from "../src/sites/seeltite/data/products"
import { scenarios } from "../src/sites/seeltite/data/scenarios"
import { recoveryCases } from "../src/sites/seeltite/data/recovery"

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
const OUTPUT_DIR = path.join(__dirname, "../public/sites/seeltite")
const BASE_IMAGES_DIR = path.join(__dirname, "../mcp/image-gen/base-images")

fs.mkdirSync(OUTPUT_DIR, { recursive: true })

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
  size: "1024x1024" | "1536x1024" | "1024x1536" = "1024x1024"
) {
  const filepath = path.join(OUTPUT_DIR, filename)
  if (fs.existsSync(filepath)) {
    console.log(`  ⏭ ${filename} (already exists)`)
    return
  }
  const personDir = path.join(BASE_IMAGES_DIR, person)
  if (!fs.existsSync(personDir)) {
    console.error(`  ✗ ${filename}: no base images for ${person}`)
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

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

// ─── Style constants ─────────────────────────────────────────

const INDUSTRIAL_STYLE =
  "modern industrial product photography, clean commercial lighting, concrete-gray background with subtle safety-orange accent lighting, crisp focus, high-contrast, matches the visual style of DeWalt and Milwaukee power tool catalogs"

const SCENARIO_STYLE =
  "realistic editorial illustration, muted safety-orange and charcoal-gray palette, clean industrial aesthetic, SFW, tasteful and dignified, protagonists composed with tight jaws and thousand-yard stare, slight sweat at hairline"

const EXEC_STYLE =
  "professional corporate portrait, industrial manufacturing executive, wearing a charcoal crew-neck or safety-orange button-down with a Seel-Tite logo, blurred shop-floor background, tight jaw, slightly clenched expression, subtle perspiration at hairline, eyes focused mid-distance, composed but clearly mid-clench, dignified mortification"

// ─── Hero + homepage ─────────────────────────────────────────

const HOMEPAGE_PROMPTS: Array<[string, string, ("1024x1024" | "1536x1024" | "1024x1536")?]> = [
  [`${INDUSTRIAL_STYLE}, top-down tool-bench flatlay: the G1 Containment Gasket at center (matte black disc with a bright safety-orange port ring), surrounded by 10 disposal and ancillary accessories radiating outward on a brushed steel workbench, product hero composition`, "hero.png", "1536x1024"],
  [`${INDUSTRIAL_STYLE}, line-art exploded vector diagram showing the G1 gasket at center connected by dashed radii to 10 accessory silhouettes, labeled boxes, white background, technical drawing aesthetic`, "ecosystem-diagram.png", "1536x1024"],
  [`${INDUSTRIAL_STYLE}, stylized marquee illustration of a wedding reception interior with a best-man at a podium mid-toast, guests seated, tasteful safety-orange and charcoal palette, SFW, dignified composition`, "field-report-prevention.png", "1536x1024"],
  [`${INDUSTRIAL_STYLE}, stylized marquee illustration of a corporate boardroom with a presenter mid-sentence at a projector, 14 directors in view, subtle orange LED glow under the table indicating accessory engagement, SFW, dignified composition`, "field-report-recovery.png", "1536x1024"],
  [`${INDUSTRIAL_STYLE}, close-up of a single safety-orange industrial CTA button labeled "DEPLOY" on a concrete-gray textured wall, modern poster composition`, "cta-background.png", "1536x1024"],
  [`${INDUSTRIAL_STYLE}, overhead shot of the Grinder and the Salad Shooter Attachment mounted side-by-side on a black peg board, catalog photography, safety-orange accent lighting`, "accessory-showcase-1.png"],
  [`${INDUSTRIAL_STYLE}, overhead shot of the Cryo-Puck module and Incinerator Module mounted side-by-side on a black peg board, catalog photography, subtle blue and red indicator LEDs`, "accessory-showcase-2.png"],
  [`${INDUSTRIAL_STYLE}, macro close-up of the Seel-Tite OPX-14 bayonet output port, polished aerospace-grade PEEK with platinum-cured silicone ring, high-contrast lighting`, "opx14-macro.png"],
]

// ─── Product prompts (11 SKUs × hero + 2 gallery + 1 exploded = 44 images) ───

type ProductPromptSet = {
  heroPrompt: string
  contextPrompt: string
  demoPrompt: string
  explodedPrompt: string
}

const PRODUCT_PROMPTS: Record<string, ProductPromptSet> = {
  "g1-containment-gasket": {
    heroPrompt: `${INDUSTRIAL_STYLE}, a matte black circular silicone gasket with a central safety-orange bayonet output port (OPX-14), photographed from above on a neutral concrete-gray background, product hero shot`,
    contextPrompt: `${INDUSTRIAL_STYLE}, the G1 Containment Gasket sitting in its open retail packaging (charcoal cardboard box with safety-orange Seel-Tite wordmark), beside a compatibility card, overhead shot`,
    demoPrompt: `${INDUSTRIAL_STYLE}, technical test-bench composition: the G1 Containment Gasket clamped in a bench fixture, a PSI gauge reading 14.7 beside it, bright shop lighting`,
    explodedPrompt: `${INDUSTRIAL_STYLE}, clean vector line-art exploded view of the G1 Containment Gasket showing three components (elastomer body, PEEK port insert, platinum silicone ring) stacked vertically with dashed callout lines, white background, technical drawing`,
  },
  "the-grinder": {
    heroPrompt: `${INDUSTRIAL_STYLE}, a compact cylindrical power-tool accessory roughly the size of a computer mouse, matte black body with a safety-orange bayonet connector on one end and ventilation louvers, product hero shot on neutral background`,
    contextPrompt: `${INDUSTRIAL_STYLE}, The Grinder accessory shown disassembled next to its titanium-nitride blade assembly on a brushed steel workbench`,
    demoPrompt: `${INDUSTRIAL_STYLE}, The Grinder engaged in a bench test rig, motion-blurred rotor visible through a cutaway viewing port, an oscilloscope in the background showing a 44.2 dB trace`,
    explodedPrompt: `${INDUSTRIAL_STYLE}, vector exploded view of The Grinder: outer shell, rotor assembly, blade, motor, lithium cell, bayonet connector, dashed callout lines, white background`,
  },
  "salad-shooter-attachment": {
    heroPrompt: `${INDUSTRIAL_STYLE}, a commercial-grade rotary dispersion module clearly influenced by the 1988 Presto Salad Shooter aesthetic but reimagined in matte black and safety orange, bayonet connector on the input side, hopper on the output side, product hero shot`,
    contextPrompt: `${INDUSTRIAL_STYLE}, the Salad Shooter Attachment sitting next to three replacement hoppers in a clamshell tray, catalog photography`,
    demoPrompt: `${INDUSTRIAL_STYLE}, the Salad Shooter Attachment mounted to a bench test rig, a high-speed camera capturing mid-dispersion, motion blur on the rotary head`,
    explodedPrompt: `${INDUSTRIAL_STYLE}, vector exploded view of the Salad Shooter Attachment: bayonet connector, rotor shaft, dispersion head, hopper, lid, dashed callout lines, white background`,
  },
  "cryo-puck-module": {
    heroPrompt: `${INDUSTRIAL_STYLE}, a puck-shaped peltier-based flash-freeze accessory, matte black with a safety-orange bayonet connector and a small blue LED indicator, a faint frost haze escaping from a vent, product hero shot`,
    contextPrompt: `${INDUSTRIAL_STYLE}, the Cryo-Puck Module shown with a frozen 40mm puck being ejected into a sealed disposal chamber, subtle blue glow`,
    demoPrompt: `${INDUSTRIAL_STYLE}, test-bench composition: the Cryo-Puck Module engaged, visible frost plume, a thermal imaging overlay showing the -78°C core, ambient lab lighting`,
    explodedPrompt: `${INDUSTRIAL_STYLE}, vector exploded view of the Cryo-Puck Module: peltier stack, heat sink, ejection chamber, battery pack, bayonet connector, dashed callout lines, white background`,
  },
  "pneumatic-ejector-kit": {
    heroPrompt: `${INDUSTRIAL_STYLE}, a compact pneumatic ejector assembly with a loaded 12g CO2 cartridge at one end and a bayonet connector at the other, belt-mounted receiver cartridge beside it, product hero shot`,
    contextPrompt: `${INDUSTRIAL_STYLE}, the Pneumatic Ejector Kit shown with a belt-mount attachment and a 6-pack of CO2 cartridges, catalog photography`,
    demoPrompt: `${INDUSTRIAL_STYLE}, the Pneumatic Ejector Kit mid-fire on a bench test rig, visible CO2 plume, pressure gauge reading 180 PSI`,
    explodedPrompt: `${INDUSTRIAL_STYLE}, vector exploded view of the Pneumatic Ejector Kit: body, CO2 cartridge socket, trigger mechanism, belt clip, receiver cartridge, dashed callout lines, white background`,
  },
  "shopvac-adapter": {
    heroPrompt: `${INDUSTRIAL_STYLE}, a dual-collar hose adapter, matte black with safety-orange collar bands, one end a bayonet connector, the other a stepped hose fitting for 1.25" and 2.5" vacuum hoses, coiled reinforced PVC hose in the background, product hero shot`,
    contextPrompt: `${INDUSTRIAL_STYLE}, the Shop-Vac Adapter connected to a standard wet/dry vacuum on a shop floor, cable management visible`,
    demoPrompt: `${INDUSTRIAL_STYLE}, the Shop-Vac Adapter routed discreetly along the side of an operating room table, floor-mounted vacuum unit in the corner, sterile environment`,
    explodedPrompt: `${INDUSTRIAL_STYLE}, vector exploded view of the Shop-Vac Adapter: bayonet inlet, flex coupling, dual-collar outlet, 4m hose, quick-disconnect, dashed callout lines, white background`,
  },
  "incinerator-module": {
    heroPrompt: `${INDUSTRIAL_STYLE}, a robust matte black incinerator accessory with safety-orange ventilation louvers, a ceramic viewing window showing a faint red glow, bayonet connector on the input side, product hero shot`,
    contextPrompt: `${INDUSTRIAL_STYLE}, the Incinerator Module with its lithium battery pack removed and sitting beside it, showing charge contacts`,
    demoPrompt: `${INDUSTRIAL_STYLE}, the Incinerator Module mid-cycle on a bench test rig, visible heat shimmer, thermal imaging overlay showing 860°C core temperature, exterior surface shown at 38°C`,
    explodedPrompt: `${INDUSTRIAL_STYLE}, vector exploded view of the Incinerator Module: ceramic reaction chamber, HEPA and carbon muffler, battery pack, thermal cutoff sensors, bayonet connector, dashed callout lines, white background`,
  },
  "odor-cartridge-pack": {
    heroPrompt: `${INDUSTRIAL_STYLE}, a 6-pack of cylindrical odor-neutralizing cartridges labeled Cedar, Workshop, and Linen (two of each), arranged in a charcoal blister pack with safety-orange labels, product hero shot`,
    contextPrompt: `${INDUSTRIAL_STYLE}, a single odor cartridge being inserted into the socket of The Grinder accessory, close-up`,
    demoPrompt: `${INDUSTRIAL_STYLE}, three odor cartridges (Cedar, Workshop, Linen) in a diagnostic test chamber with ambient air-quality sensors reading neutral, faint fragrance wisps visible`,
    explodedPrompt: `${INDUSTRIAL_STYLE}, vector exploded view of an odor cartridge: outer shell, zeolite-carbon core, fragrance pellet, foam diffuser, socket interface, dashed callout lines, white background`,
  },
  "telemetry-module": {
    heroPrompt: `${INDUSTRIAL_STYLE}, a low-profile circular disc accessory the size of a poker chip, matte black with a tiny safety-orange status LED and a USB-C charging port, product hero shot`,
    contextPrompt: `${INDUSTRIAL_STYLE}, the Telemetry Module clipped to the outside of the G1 Containment Gasket, beside a smartphone displaying the Seel-Tite companion app's seal-integrity dashboard`,
    demoPrompt: `${INDUSTRIAL_STYLE}, the Telemetry Module's companion app on a phone, waveform graph showing pressure/flex/thermal data streaming at 32 Hz, a predictive alert banner visible`,
    explodedPrompt: `${INDUSTRIAL_STYLE}, vector exploded view of the Telemetry Module: sensor array, Bluetooth radio, li-po battery, charging port, outer shell, dashed callout lines, white background`,
  },
  "the-silencer": {
    heroPrompt: `${INDUSTRIAL_STYLE}, an inline acoustic baffle accessory, cylindrical aluminum body with a bayonet connector on each end (pass-through), product hero shot`,
    contextPrompt: `${INDUSTRIAL_STYLE}, The Silencer installed inline between the G1 gasket and The Grinder accessory, cross-sectional technical view`,
    demoPrompt: `${INDUSTRIAL_STYLE}, The Silencer in a sound-measurement test chamber, dB meter reading 27.8, waveform display showing attenuation profile`,
    explodedPrompt: `${INDUSTRIAL_STYLE}, vector exploded view of The Silencer: input bayonet, labyrinth baffles, closed-cell foam layers, output bayonet, dashed callout lines, white background`,
  },
  "secondary-gasket-redundancy": {
    heroPrompt: `${INDUSTRIAL_STYLE}, a second-ring concentric backup gasket, slightly larger in diameter than the G1, matte black silicone with a safety-orange outer band, product hero shot`,
    contextPrompt: `${INDUSTRIAL_STYLE}, the Backup Secondary Gasket shown worn concentrically around a primary G1 gasket, cross-sectional cutaway diagram showing both seals`,
    demoPrompt: `${INDUSTRIAL_STYLE}, bench test rig showing the Backup Secondary Gasket auto-engaging in 40ms, pressure gauge holding 14.7 PSI after a simulated primary breach`,
    explodedPrompt: `${INDUSTRIAL_STYLE}, vector exploded view of the Backup Secondary Gasket: outer band, silicone body, equalization valve, inner seal surface, dashed callout lines, white background`,
  },
}

// ─── Scenario prompts (8 prevention illustrations) ───

const SCENARIO_PROMPTS: Record<string, string> = {
  "best-man-toast": `${SCENARIO_STYLE}, a dignified wedding reception interior, best-man at the podium mid-toast with a slight tension at the jaw, bride and groom seated at the head table, champagne flutes visible, warm candlelight, SFW, no bodily detail, focus on composure under high stakes`,
  "deposition-hour-4": `${SCENARIO_STYLE}, a wood-paneled deposition conference room, a professional witness seated with posture erect and eye contact maintained, attorney across the table, court reporter at stenotype machine, fluorescent overhead lighting, SFW`,
  "live-weather-cutin": `${SCENARIO_STYLE}, a local TV news studio set, meteorologist in front of a green-screen weather map, three-camera broadcast visible, teleprompter glow on the presenter's face, composure under camera, SFW`,
  "first-date-tasting-menu": `${SCENARIO_STYLE}, upscale restaurant interior with a candlelit table, two people on a first date mid-conversation, octopus course plated between them, warm ambient lighting, tasteful composition, SFW`,
  "grandmother-eulogy": `${SCENARIO_STYLE}, a church lectern with a eulogist delivering a speech to 120 seated mourners, stained-glass windows in the background, grief and composure together in the eulogist's expression, SFW`,
  "pta-gazebo-vote": `${SCENARIO_STYLE}, an elementary school auditorium with a PTA board on a folding-chair stage, Chair Linda Morrissey at the microphone mid-vote, gazebo paint-swatch boards visible on an easel, SFW`,
  "dmv-window-3": `${SCENARIO_STYLE}, a DMV lobby with a seated professional at a clipboard in hour three, a DMV clerk returning Form B-112 at Window 3, fluorescent lighting, worn vinyl chairs, SFW`,
  "school-play-narrator": `${SCENARIO_STYLE}, an elementary school stage with a dad in a suit narrating a production of Our Town, children in costume downstage, parents in the audience with camcorders, proud but composed expression, SFW`,
}

// ─── Recovery prompts (8 recovery-in-action illustrations) ───

const RECOVERY_PROMPTS: Record<string, string> = {
  "wedding-officiant-ring-exchange": `${SCENARIO_STYLE}, outdoor wedding altar with an officiant mid-ring-exchange ceremony, subtle blue frost haze briefly visible at the officiant's hip indicating Cryo-Puck engagement, ceremony otherwise seamless, SFW`,
  "pilot-passenger-announcement": `${SCENARIO_STYLE}, an airline cockpit at cruise altitude, pilot on the PA system mid-announcement, subtle heat shimmer at the side of the pilot's seat indicating Incinerator Module discharge, composed demeanor, SFW`,
  "surgeon-bypass-hour-6": `${SCENARIO_STYLE}, a cardiothoracic operating theater, surgeon mid-procedure with a shop-vac hose routed discreetly along the side of the OR table to a floor unit, sterile field preserved, SFW, no surgical detail`,
  "q4-board-readout": `${SCENARIO_STYLE}, corporate boardroom with a presenter at a projector mid-slide, subtle motion blur at presenter's hip indicating Grinder engagement, 14 directors attentive, composed delivery, SFW`,
  "wedding-toast-pneumatic": `${SCENARIO_STYLE}, wedding reception with a best-man mid-toast during applause, subtle CO2 plume briefly visible at belt line indicating Pneumatic Ejector Kit firing masked by ovation, SFW`,
  "stand-up-set-22-minutes": `${SCENARIO_STYLE}, a comedy club interior with a stand-up comic mid-bit, crowd laughing, subtle rotary motion blur at hip indicating Salad Shooter engagement with acoustic baffle, SFW`,
  "congressional-testimony": `${SCENARIO_STYLE}, a Senate hearing room with a sworn witness at the testimony table, subtle haptic-alert vibration indicator briefly lit on a smartphone beside their water glass, composed expression, SFW`,
  "high-school-reunion-photo-line": `${SCENARIO_STYLE}, a hotel ballroom with a reunion photo line, a professional mid-handshake while discreetly swapping an odor cartridge with the other hand, name tag centered, SFW`,
}

// ─── Compatibility + about + contact + privacy prompts ───

const STATIC_PROMPTS: Array<[string, string, ("1024x1024" | "1536x1024" | "1024x1536")?]> = [
  [`${INDUSTRIAL_STYLE}, technical isometric diagram of the OPX-14 port specification with dimensions labeled, dashed callout lines, white background`, "compatibility-port-spec.png", "1536x1024"],
  [`${INDUSTRIAL_STYLE}, compatibility matrix grid illustration: G1 gasket in one column, 10 accessories on the other axis, green checkmarks at intersections, catalog typography`, "compatibility-matrix-visual.png", "1536x1024"],
  [`${INDUSTRIAL_STYLE}, a firmware revision table displayed on a vintage monochrome monitor, Seel-Tite branding, softly glowing green text on black`, "compatibility-firmware.png"],
  [`${INDUSTRIAL_STYLE}, a 1973 archival photograph of a small Akron Ohio machine shop with hand-painted Seel-Tite signage above the door, sepia tone, grainy film stock`, "about-heritage.png", "1536x1024"],
  [`${INDUSTRIAL_STYLE}, a modern manufacturing welding floor with CNC machines and production lines, Seel-Tite workers in safety-orange coveralls`, "about-factory.png", "1536x1024"],
  [`${INDUSTRIAL_STYLE}, a vintage rotary desk phone in matte black sitting on an industrial workbench with a safety-orange cable, catalog photography, neutral background`, "contact-workbench.png"],
  [`${INDUSTRIAL_STYLE}, caution-tape chevron banner graphic with diagonal safety-orange and charcoal stripes, flat vector design, 3:1 aspect ratio`, "privacy-banner.png", "1536x1024"],
]

// ─── Executive portrait prompts (constipated / mid-clench) ───

const EXEC_PROMPTS: Record<"bill" | "brandon" | "jim" | "sean", [string, string]> = {
  bill:    [`${EXEC_STYLE}, Walter Thorne, founder and Chief Containment Officer, silver hair, wearing a charcoal crew-neck with a subtle safety-orange Seel-Tite wordmark, shop floor blurred behind`, "leader-thorne.png"],
  brandon: [`${EXEC_STYLE}, Marcus Hadley, Head of Seal Engineering, wearing a safety-orange button-down, holding a micrometer just out of frame, shop floor blurred behind`, "leader-hadley.png"],
  jim:     [`${EXEC_STYLE}, Jim Boecker, VP of Disposal Systems, wearing a charcoal polo with Seel-Tite embroidery, sitting in front of a shelf holding a vintage Presto Salad Shooter`, "leader-boecker.png"],
  sean:    [`${EXEC_STYLE}, Dale Castellan, Director of Predictive Alerts, wearing a charcoal vest over a safety-orange shirt, telemetry dashboard monitor blurred behind`, "leader-castellan.png"],
}

// ─── Main ─────────────────────────────────────────────

async function main() {
  console.log("\n📸 Seel-Tite Image Generation\n")

  console.log("— Homepage —")
  for (const [prompt, filename, size] of HOMEPAGE_PROMPTS) {
    await generateImage(prompt, filename, size)
    await delay(2000)
  }

  console.log("\n— Products —")
  for (const p of products) {
    const set = PRODUCT_PROMPTS[p.slug]
    if (!set) { console.error(`  ✗ no prompt set for ${p.slug}`); continue }
    await generateImage(set.heroPrompt, path.basename(p.heroImage))
    await delay(2000)
    await generateImage(set.contextPrompt, path.basename(p.galleryImages[0]))
    await delay(2000)
    await generateImage(set.demoPrompt, path.basename(p.galleryImages[1]))
    await delay(2000)
    await generateImage(set.explodedPrompt, path.basename(p.exploded), "1536x1024")
    await delay(2000)
  }

  console.log("\n— Prevention Scenarios —")
  for (const s of scenarios) {
    const prompt = SCENARIO_PROMPTS[s.slug]
    if (!prompt) { console.error(`  ✗ no prompt for ${s.slug}`); continue }
    await generateImage(prompt, path.basename(s.illustration), "1536x1024")
    await delay(2000)
  }

  console.log("\n— Recovery Cases —")
  for (const r of recoveryCases) {
    const prompt = RECOVERY_PROMPTS[r.slug]
    if (!prompt) { console.error(`  ✗ no prompt for ${r.slug}`); continue }
    await generateImage(prompt, path.basename(r.illustration), "1536x1024")
    await delay(2000)
  }

  console.log("\n— Static (compatibility, about, contact, privacy) —")
  for (const [prompt, filename, size] of STATIC_PROMPTS) {
    await generateImage(prompt, filename, size)
    await delay(2000)
  }

  console.log("\n— Executive Portraits (constipated / mid-clench) —")
  for (const [person, [prompt, filename]] of Object.entries(EXEC_PROMPTS) as Array<[keyof typeof EXEC_PROMPTS, [string, string]]>) {
    await generateWithPerson(prompt, filename, person)
    await delay(3000)
  }

  console.log("\n✓ Done. Review images in public/sites/seeltite/\n")
}

main()
