import { test, expect } from "@playwright/test"

const SITE = "?site=dehydratedwater"

test.describe("Dehydrated Water Laboratories — Visual Regression Screenshots", () => {
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

  test("product detail - original", async ({ page }) => {
    await page.goto(`/products/original${SITE}`)
    await page.waitForLoadState("networkidle")
    await expect(page).toHaveScreenshot("product-detail-original.png", { fullPage: true })
  })

  test("product detail - cloud mist with variants", async ({ page }) => {
    await page.goto(`/products/cloud-mist${SITE}`)
    await page.waitForLoadState("networkidle")
    await expect(page).toHaveScreenshot("product-detail-cloud-mist.png", { fullPage: true })
  })

  test("our story page", async ({ page }) => {
    await page.goto(`/our-story${SITE}`)
    await page.waitForLoadState("networkidle")
    await expect(page).toHaveScreenshot("our-story.png", { fullPage: true })
  })

  test("the science page", async ({ page }) => {
    await page.goto(`/the-science${SITE}`)
    await page.waitForLoadState("networkidle")
    await expect(page).toHaveScreenshot("the-science.png", { fullPage: true })
  })

  test("waas page", async ({ page }) => {
    await page.goto(`/waas${SITE}`)
    await page.waitForLoadState("networkidle")
    await expect(page).toHaveScreenshot("waas.png", { fullPage: true })
  })

  test("faq page", async ({ page }) => {
    await page.goto(`/faq${SITE}`)
    await page.waitForLoadState("networkidle")
    await expect(page).toHaveScreenshot("faq.png", { fullPage: true })
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
})

test.describe("Dehydrated Water Laboratories — Mobile Screenshots", () => {
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
    await page.goto(`/products/original${SITE}`)
    await page.waitForLoadState("networkidle")
    await expect(page).toHaveScreenshot("product-detail-mobile.png", { fullPage: true })
  })
})
