import { test, expect } from "@playwright/test"

const SITE = "?site=pigmilk"

test.describe("Pig Milk Creamery — Page Navigation", () => {
  test("homepage loads with hero and featured products", async ({ page }) => {
    await page.goto(`/${SITE}`)
    await expect(page.locator("h1")).toContainText("Farm-Fresh Pig Milk")
    await expect(page.getByText("Best Sellers")).toBeVisible()
    await expect(page.getByText("As featured in publications we made up")).toBeVisible()
    await expect(page.getByText("What Our Customers Say")).toBeVisible()
  })

  test("products page shows all products", async ({ page }) => {
    await page.goto(`/products${SITE}`)
    await expect(page.locator("h1")).toContainText("Our Products")
    // Each product has a heading in the card
    const productHeadings = page.locator("h3")
    await expect(productHeadings).toHaveCount(11)
  })

  test("product detail page loads for classic pig milk", async ({ page }) => {
    await page.goto(`/products/classic-pig-milk${SITE}`)
    await expect(page.locator("h1")).toContainText("Classic Pig Milk")
    await expect(page.getByText("Nutrition Facts")).toBeVisible()
    await expect(page.getByText("You Might Also Regret")).toBeVisible()
  })

  test("product detail page loads for rabid froth", async ({ page }) => {
    await page.goto(`/products/rabid-froth${SITE}`, { waitUntil: "domcontentloaded" })
    await expect(page.locator("h1")).toContainText("Rabid Froth Pint")
    await expect(page.getByText("$6.66")).toBeVisible()
  })

  test("product detail page loads for industrial drum", async ({ page }) => {
    await page.goto(`/products/industrial-drum${SITE}`)
    await expect(page.locator("h1")).toContainText("Industrial Drum")
    await expect(page.getByText("$449.99")).toBeVisible()
  })

  test("invalid product slug returns 404", async ({ page }) => {
    await page.goto(`/products/nonexistent${SITE}`)
    await expect(page.getByText("404")).toBeVisible()
  })

  test("about page loads with timeline and team", async ({ page }) => {
    await page.goto(`/about${SITE}`)
    await expect(page.locator("h1")).toContainText("Our Story")
    await expect(page.getByText("How It All Started")).toBeVisible()
    await expect(page.getByText("Company Timeline")).toBeVisible()
    await expect(page.getByText("2019", { exact: true })).toBeVisible()
    await expect(page.getByText("2025", { exact: true })).toBeVisible()
    await expect(page.getByText("Meet the Team")).toBeVisible()
    await expect(page.getByRole("heading", { name: "Earl Hogsworth" })).toBeVisible()
    await expect(page.getByRole("heading", { name: "Burt Sloppington III" })).toBeVisible()
    await expect(page.getByRole("heading", { name: "Chet Trotsworth" })).toBeVisible()
    await expect(page.getByRole("heading", { name: "Dale Gristle" })).toBeVisible()
  })

  test("behind the scenes page loads with pig profiles", async ({ page }) => {
    await page.goto(`/behind-the-scenes${SITE}`)
    await expect(page.locator("h1")).toContainText("Behind the Scenes")
    await expect(page.getByText("The Milking Process")).toBeVisible()
    await expect(page.locator("h3").filter({ hasText: "Selection" })).toBeVisible()
    await expect(page.locator("h3").filter({ hasText: "Extraction" })).toBeVisible()
    await expect(page.locator("h3").filter({ hasText: "Bottling" })).toBeVisible()
    await expect(page.getByText("Meet the Pigs")).toBeVisible()
    await expect(page.locator("h3").filter({ hasText: "Duchess" })).toBeVisible()
    await expect(page.locator("h3").filter({ hasText: "Kevin" })).toBeVisible()
    await expect(page.locator("h3").filter({ hasText: "Barbara" })).toBeVisible()
    await expect(page.locator("h3").filter({ hasText: "Sir Oinks-a-Lot" })).toBeVisible()
  })

  test("volunteer page loads with job listings and stats", async ({ page }) => {
    await page.goto(`/volunteer${SITE}`)
    await expect(page.locator("h1")).toContainText("Join the Pig Milk Movement")
    await expect(page.getByText("Open Positions")).toBeVisible()
    await expect(page.locator("h3").filter({ hasText: "Pig Whisperer" })).toBeVisible()
    await expect(page.locator("h3").filter({ hasText: "Milk Quality Inspector" })).toBeVisible()
    await expect(page.locator("h3").filter({ hasText: "Barn Engineer" })).toBeVisible()
  })

  test("contact page loads with form and FAQ", async ({ page }) => {
    await page.goto(`/contact${SITE}`)
    await expect(page.locator("h1")).toContainText("Get in Touch")
    await expect(page.getByText("Send Us a Message")).toBeVisible()
    await expect(page.getByRole("button", { name: "Send Message" })).toBeVisible()
    await expect(page.getByText("742 Sow Lane")).toBeVisible()
    await expect(page.getByText("1-800-PIG-MILK")).toBeVisible()
    await expect(page.getByText("Frequently Asked Questions")).toBeVisible()
  })

  test("cart page loads with empty state", async ({ page }) => {
    await page.goto(`/${SITE}`)
    await page.evaluate(() => localStorage.clear())
    await page.goto(`/cart${SITE}`)
    await expect(page.locator("h1")).toContainText("Your Cart")
    await expect(page.getByText("as empty as a pig")).toBeVisible()
  })

  test("checkout page loads with progress bar", async ({ page }) => {
    await page.goto(`/checkout${SITE}`)
    await expect(page.getByText("Our Pigs Are Working")).toBeVisible()
    await expect(page.getByText("When pigs fly")).toBeVisible()
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

test.describe("Pig Milk Creamery — Navigation", () => {
  test("header nav links work", async ({ page }) => {
    await page.goto(`/${SITE}`)
    const nav = page.locator("header")
    await expect(nav.getByText("Products")).toBeVisible()
    await expect(nav.getByText("About")).toBeVisible()
    await expect(nav.getByText("Behind the Scenes")).toBeVisible()
    await expect(nav.getByText("Volunteer")).toBeVisible()
    await expect(nav.getByText("Contact")).toBeVisible()
  })

  test("clicking nav Products goes to products page", async ({ page }) => {
    await page.goto(`/${SITE}`)
    await page.locator("header").getByText("Products").click()
    await expect(page.locator("h1")).toContainText("Our Products")
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

test.describe("Apex Site", () => {
  test("apex landing page loads", async ({ page }) => {
    await page.goto("/")
    await expect(page.locator("h1")).toContainText("Specific Industries")
    await expect(page.getByText("Our Brands")).toBeVisible()
  })

  test("apex lists pigmilk brand", async ({ page }) => {
    await page.goto("/")
    await expect(page.getByText("Pig Milk Creamery")).toBeVisible()
  })
})
