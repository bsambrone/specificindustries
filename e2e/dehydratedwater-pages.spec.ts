import { test, expect } from "@playwright/test"

const SITE = "?site=dehydratedwater"

test.describe("Dehydrated Water Co. — Page Navigation", () => {
  test("homepage loads with hero and featured products", async ({ page }) => {
    await page.goto(`/${SITE}`)
    await expect(page.locator("h1")).toContainText("Water, Perfected Through Absence")
    await expect(page.getByText("Featured Products")).toBeVisible()
    await expect(page.getByText("What Our Patrons Say")).toBeVisible()
  })

  test("products page shows all 9 products", async ({ page }) => {
    await page.goto(`/products${SITE}`)
    await expect(page.locator("h1")).toContainText("The Collection")
    const productHeadings = page.locator("h3")
    await expect(productHeadings).toHaveCount(9)
  })

  test("product detail page loads for original", async ({ page }) => {
    await page.goto(`/products/original${SITE}`)
    await expect(page.locator("h1")).toContainText("Original Dehydrated Water")
    await expect(page.getByText("Science Facts")).toBeVisible()
  })

  test("product detail page loads for cloud mist with variants", async ({ page }) => {
    await page.goto(`/products/cloud-mist${SITE}`)
    await expect(page.locator("h1")).toContainText("Single Origin Cloud Mist")
    await expect(page.getByText("Available Variants")).toBeVisible()
    await expect(page.getByText("The Nor'easter")).toBeVisible()
    await expect(page.getByText("Sahara Noon")).toBeVisible()
    await expect(page.getByText("Amazonian Downpour")).toBeVisible()
  })

  test("product detail page loads for dryer water", async ({ page }) => {
    await page.goto(`/products/dryer-water${SITE}`)
    await expect(page.locator("h1")).toContainText("Dryer")
    await expect(page.getByText("$34.99")).toBeVisible()
  })

  test("waas product links to subscription page", async ({ page }) => {
    await page.goto(`/products/waas${SITE}`)
    await expect(page.getByText("View Subscription Plans")).toBeVisible()
  })

  test("invalid product slug returns 404", async ({ page }) => {
    await page.goto(`/products/nonexistent${SITE}`)
    await expect(page.getByText("404")).toBeVisible()
  })

  test("our story page loads with timeline and family", async ({ page }) => {
    await page.goto(`/our-story${SITE}`)
    await expect(page.locator("h1")).toContainText("Our Story")
    await expect(page.getByText("The Founding Vision")).toBeVisible()
    await expect(page.getByText("Company Timeline")).toBeVisible()
    await expect(page.getByText("1847", { exact: true })).toBeVisible()
    await expect(page.getByText("2026", { exact: true })).toBeVisible()
    await expect(page.getByRole("heading", { name: "The Team" })).toBeVisible()
    await expect(page.getByRole("heading", { name: "Ezekiel Drywell IV", exact: true })).toBeVisible()
    await expect(page.getByRole("heading", { name: "Thaddeus Pemberton" })).toBeVisible()
  })

  test("the science page loads with process steps", async ({ page }) => {
    await page.goto(`/the-science${SITE}`)
    await expect(page.locator("h1")).toContainText("The Science")
    await expect(page.getByText("The Drywell Method")).toBeVisible()
    await expect(page.locator("h3").filter({ hasText: "Aqueous Acquisition" })).toBeVisible()
    await expect(page.locator("h3").filter({ hasText: "Thermal Dissociation" })).toBeVisible()
    await expect(page.locator("h3").filter({ hasText: "Vapor Recapture" })).toBeVisible()
    await expect(page.locator("h3").filter({ hasText: "Final Dehydration" })).toBeVisible()
  })

  test("waas page loads with pricing tiers", async ({ page }) => {
    await page.goto(`/waas${SITE}`)
    await expect(page.locator("h1")).toContainText("Water-as-a-Service")
    await expect(page.getByText("Apprentice")).toBeVisible()
    await expect(page.getByText("Journeyman")).toBeVisible()
    await expect(page.getByText("Master Dryer")).toBeVisible()
    await expect(page.getByText("$29.99")).toBeVisible()
    await expect(page.getByText("$49.99")).toBeVisible()
    await expect(page.getByText("$99.99")).toBeVisible()
  })

  test("faq page loads with questions", async ({ page }) => {
    await page.goto(`/faq${SITE}`)
    await expect(page.locator("h1")).toContainText("Frequently Asked Questions")
    await expect(page.getByText("Is this real water?")).toBeVisible()
    await expect(page.getByText("What is your return policy?")).toBeVisible()
  })

  test("cart page loads with empty state", async ({ page }) => {
    await page.goto(`/${SITE}`)
    await page.evaluate(() => localStorage.clear())
    await page.goto(`/cart${SITE}`)
    await expect(page.locator("h1")).toContainText("Your Cart")
    await expect(page.getByText("as empty as our Double-Dehydrated")).toBeVisible()
  })

  test("checkout page loads with progress bar", async ({ page }) => {
    await page.goto(`/checkout${SITE}`)
    await expect(page.getByText("Our Artisans Are Hand-Dehydrating")).toBeVisible()
    await expect(page.getByText("When the water is ready")).toBeVisible()
  })

  test("privacy policy page loads", async ({ page }) => {
    await page.goto(`/privacy${SITE}`)
    await expect(page.locator("h1")).toContainText("Privacy Policy")
    await expect(page.getByText("Data Collection")).toBeVisible()
  })

  test("terms of use page loads", async ({ page }) => {
    await page.goto(`/terms${SITE}`)
    await expect(page.locator("h1")).toContainText("Terms of Use")
    await expect(page.getByText("Limitation of Liability")).toBeVisible()
  })
})

test.describe("Dehydrated Water Co. — Navigation", () => {
  test("header nav links work", async ({ page }) => {
    await page.goto(`/${SITE}`)
    const nav = page.locator("header")
    await expect(nav.getByText("Products")).toBeVisible()
    await expect(nav.getByText("Our Story")).toBeVisible()
    await expect(nav.getByText("The Science")).toBeVisible()
    await expect(nav.getByText("WaaS")).toBeVisible()
    await expect(nav.getByText("FAQ")).toBeVisible()
  })

  test("footer has privacy and terms links", async ({ page }) => {
    await page.goto(`/${SITE}`)
    const footer = page.locator("footer")
    await expect(footer.getByText("Privacy Policy")).toBeVisible()
    await expect(footer.getByText("Terms of Use")).toBeVisible()
  })

  test("cart icon is visible in header", async ({ page }) => {
    await page.goto(`/${SITE}`)
    await expect(page.locator("header a[href*='cart'] svg").first()).toBeVisible()
  })
})

test.describe("Apex Site — Dehydrated Water Listed", () => {
  test("apex lists dehydrated water brand", async ({ page }) => {
    await page.goto("/")
    await expect(page.getByText("Dehydrated Water Co.")).toBeVisible()
  })
})
