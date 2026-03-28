import { test, expect } from "@playwright/test"

const SITE = "?site=pigmilk"

test.describe("Pig Milk Co. — Visual Regression Screenshots", () => {
  test.use({ viewport: { width: 1280, height: 720 } })

  test("homepage", async ({ page }) => {
    await page.goto(`/${SITE}`)
    await page.waitForLoadState("networkidle")
    await expect(page).toHaveScreenshot("homepage.png", { fullPage: true })
  })

  test("products page", async ({ page }) => {
    await page.goto(`/products${SITE}`)
    await page.waitForLoadState("networkidle")
    await expect(page).toHaveScreenshot("products.png", { fullPage: true })
  })

  test("product detail - classic", async ({ page }) => {
    await page.goto(`/products/classic-pig-milk${SITE}`)
    await page.waitForLoadState("networkidle")
    await expect(page).toHaveScreenshot("product-detail-classic.png", { fullPage: true })
  })

  test("product detail - rabid froth", async ({ page }) => {
    await page.goto(`/products/rabid-froth${SITE}`)
    await page.waitForLoadState("networkidle")
    await expect(page).toHaveScreenshot("product-detail-rabid-froth.png", { fullPage: true })
  })

  test("about page", async ({ page }) => {
    await page.goto(`/about${SITE}`)
    await page.waitForLoadState("networkidle")
    await expect(page).toHaveScreenshot("about.png", { fullPage: true })
  })

  test("behind the scenes", async ({ page }) => {
    await page.goto(`/behind-the-scenes${SITE}`)
    await page.waitForLoadState("networkidle")
    await expect(page).toHaveScreenshot("behind-the-scenes.png", { fullPage: true })
  })

  test("volunteer page", async ({ page }) => {
    await page.goto(`/volunteer${SITE}`)
    await page.waitForLoadState("networkidle")
    await expect(page).toHaveScreenshot("volunteer.png", { fullPage: true })
  })

  test("contact page", async ({ page }) => {
    await page.goto(`/contact${SITE}`)
    await page.waitForLoadState("networkidle")
    await expect(page).toHaveScreenshot("contact.png", { fullPage: true })
  })

  test("cart empty state", async ({ page }) => {
    await page.goto(`/${SITE}`)
    await page.evaluate(() => localStorage.clear())
    await page.goto(`/cart${SITE}`)
    await page.waitForLoadState("networkidle")
    await expect(page).toHaveScreenshot("cart-empty.png", { fullPage: true })
  })

  test("checkout page", async ({ page }) => {
    await page.goto(`/checkout${SITE}`)
    await page.waitForLoadState("networkidle")
    // Mask the progress bar since it animates
    await expect(page).toHaveScreenshot("checkout.png", {
      fullPage: true,
      mask: [page.locator("text=Processing")],
    })
  })

  test("privacy policy", async ({ page }) => {
    await page.goto(`/privacy${SITE}`)
    await page.waitForLoadState("networkidle")
    await expect(page).toHaveScreenshot("privacy.png", { fullPage: true })
  })

  test("terms of use", async ({ page }) => {
    await page.goto(`/terms${SITE}`)
    await page.waitForLoadState("networkidle")
    await expect(page).toHaveScreenshot("terms.png", { fullPage: true })
  })

  test("apex landing page", async ({ page }) => {
    await page.goto("/")
    await page.waitForLoadState("networkidle")
    await expect(page).toHaveScreenshot("apex-landing.png", { fullPage: true })
  })
})

test.describe("Pig Milk Co. — Mobile Screenshots", () => {
  test.use({ viewport: { width: 375, height: 812 } })

  test("homepage mobile", async ({ page }) => {
    await page.goto(`/${SITE}`)
    await page.waitForLoadState("networkidle")
    await expect(page).toHaveScreenshot("homepage-mobile.png", { fullPage: true })
  })

  test("mobile nav opens", async ({ page }) => {
    await page.goto(`/${SITE}`)
    await page.locator("[aria-label='Toggle menu']").click()
    await expect(page).toHaveScreenshot("mobile-nav-open.png")
  })

  test("products mobile", async ({ page }) => {
    await page.goto(`/products${SITE}`)
    await page.waitForLoadState("networkidle")
    await expect(page).toHaveScreenshot("products-mobile.png", { fullPage: true })
  })

  test("product detail mobile", async ({ page }) => {
    await page.goto(`/products/classic-pig-milk${SITE}`)
    await page.waitForLoadState("networkidle")
    await expect(page).toHaveScreenshot("product-detail-mobile.png", { fullPage: true })
  })
})
