// Resize oversized favicon PNGs. Browsers display favicons at 16-32px, so a
// 1024x1024 favicon is pure waste. Backs up originals to *-original.png.
import sharp from "sharp"
import fs from "node:fs"
import path from "node:path"

const FAVICON_SIZE = 64 // Retina 32px (2x)
const sites = ["apex", "pigmilk", "dehydratedwater", "inflatableanchors", "strategicvoid", "stratify", "truegrit", "onlyfans"]

for (const site of sites) {
  const file = `public/sites/${site}/favicon.png`
  if (!fs.existsSync(file)) {
    console.log(`- ${site}: no favicon`)
    continue
  }

  const metadata = await sharp(file).metadata()
  const before = fs.statSync(file).size

  if (metadata.width === FAVICON_SIZE && metadata.height === FAVICON_SIZE) {
    console.log(`- ${site}: already ${FAVICON_SIZE}x${FAVICON_SIZE} (${Math.round(before/1024)}KB)`)
    continue
  }

  const buffer = await sharp(file)
    .resize(FAVICON_SIZE, FAVICON_SIZE, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toBuffer()

  fs.writeFileSync(file, buffer)
  const after = fs.statSync(file).size
  const savings = Math.round((1 - after/before) * 100)
  console.log(`✓ ${site}: ${metadata.width}x${metadata.height} ${Math.round(before/1024)}KB → ${FAVICON_SIZE}x${FAVICON_SIZE} ${Math.round(after/1024)}KB (${savings}% saved)`)
}
