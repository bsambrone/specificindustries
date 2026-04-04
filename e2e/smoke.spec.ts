import { test, expect } from "@playwright/test"

// Smoke tests — verify every site's home page loads and renders critical content.
// Catches regressions in subdomain routing, server-component conversion,
// theme/font loading, and header/footer rendering.

const sites = [
  {
    key: "apex",
    path: "/",
    headline: "Serving the World's Most Specific Industries",
    name: "Specific Industries",
  },
  {
    key: "pigmilk",
    path: "/?site=pigmilk",
    headline: "Farm-Fresh Pig Milk",
    name: "Pig Milk Creamery",
  },
  {
    key: "inflatableanchors",
    path: "/?site=inflatableanchors",
    headline: "The Easiest Anchor You'll Ever Pull Up",
    name: "Inflatable Anchors",
  },
  {
    key: "dehydratedwater",
    path: "/?site=dehydratedwater",
    headline: "Water, Perfected Through Absence",
    name: "Dehydrated Water",
  },
  {
    key: "strategicvoid",
    path: "/?site=strategicvoid",
    headline: "Aligning Your Organization Beyond Productivity",
    name: "Strategic Void Consulting",
  },
  {
    key: "stratify",
    path: "/?site=stratify",
    headline: "Stop Working IN the Economy. Start Owning Your LAYER of It.",
    name: "Stratify",
  },
  {
    key: "truegrit",
    path: "/?site=truegrit",
    headline: "Where Comfort Meets Its Match",
    name: "True Grit",
  },
]

test.describe("Home page smoke tests", () => {
  for (const site of sites) {
    test(`${site.key} home page loads successfully`, async ({ page }) => {
      const consoleErrors: string[] = []
      page.on("console", (msg) => {
        if (msg.type() === "error") consoleErrors.push(msg.text())
      })

      const response = await page.goto(site.path)
      expect(response?.status()).toBe(200)

      // Hero headline renders (confirms server-side rendering worked)
      await expect(page.locator("h1").first()).toContainText(site.headline)

      // Header renders with site name logo
      await expect(page.locator("header")).toContainText(site.name)

      // Footer renders
      await expect(page.locator("footer")).toBeVisible()

      // No console errors during initial load
      expect(consoleErrors, `Console errors: ${consoleErrors.join("\n")}`).toHaveLength(0)
    })
  }
})

test.describe("Header mobile menu", () => {
  test("mobile menu opens and closes on pigmilk home", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto("/?site=pigmilk")

    const toggleButton = page.getByLabel("Toggle menu")
    await expect(toggleButton).toBeVisible()

    // Menu starts closed
    await expect(page.locator("header").getByRole("link", { name: "Products" })).not.toBeVisible()

    // Open menu
    await toggleButton.click()
    await expect(page.locator("header").getByRole("link", { name: "Products" })).toBeVisible()

    // Close menu
    await toggleButton.click()
    await expect(page.locator("header").getByRole("link", { name: "Products" })).not.toBeVisible()
  })
})
