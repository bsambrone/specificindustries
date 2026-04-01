import { test, expect } from "@playwright/test"

const SITE = "?site=pigmilk"

// Helper to check cart badge count (handles desktop/mobile duplicate)
async function expectCartCount(page: import("@playwright/test").Page, count: string) {
  await expect(page.locator("header a[href*='cart'] span").first()).toHaveText(count)
}

test.describe.configure({ mode: "serial" })

test.describe("Pig Milk Creamery — Cart Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`/${SITE}`)
    await page.evaluate(() => localStorage.clear())
  })

  test("add to cart from product detail page", async ({ page }) => {
    await page.goto(`/products/classic-pig-milk${SITE}`)
    await page.getByRole("button", { name: "Add to Cart" }).first().click()
    await expect(page.getByText("added to cart")).toBeVisible({ timeout: 5000 })
    await expectCartCount(page, "1")
  })

  test("add to cart from product grid", async ({ page }) => {
    await page.goto(`/products${SITE}`)
    await page.getByRole("button", { name: "Add to Cart" }).first().click()
    await expect(page.getByText("added to cart")).toBeVisible({ timeout: 5000 })
  })

  test("add multiple products to cart", async ({ page }) => {
    await page.goto(`/products${SITE}`)
    await page.getByRole("button", { name: "Add to Cart" }).first().click()
    await page.waitForTimeout(500)
    await page.getByRole("button", { name: "Add to Cart" }).nth(1).click()
    await expectCartCount(page, "2")
  })

  test("cart page shows added items", async ({ page }) => {
    await page.goto(`/products/classic-pig-milk${SITE}`)
    await page.getByRole("button", { name: "Add to Cart" }).first().click()
    await page.waitForTimeout(500)
    await page.goto(`/cart${SITE}`)
    await expect(page.getByText("Pig Handling Fee")).toBeVisible()
    await expect(page.getByText("Oink Tax")).toBeVisible()
  })

  test("cart persists after page reload", async ({ page }) => {
    await page.goto(`/products/classic-pig-milk${SITE}`)
    await page.getByRole("button", { name: "Add to Cart" }).first().click()
    await page.waitForTimeout(500)
    await page.reload()
    await expectCartCount(page, "1")
  })

  test("remove item from cart", async ({ page }) => {
    await page.goto(`/products/classic-pig-milk${SITE}`)
    await page.getByRole("button", { name: "Add to Cart" }).first().click()
    await page.waitForTimeout(500)
    await page.goto(`/cart${SITE}`)
    await page.locator("[aria-label='Remove']").click()
    await expect(page.getByText("as empty as a pig")).toBeVisible()
  })

  test("quantity controls work in cart", async ({ page }) => {
    await page.goto(`/products/classic-pig-milk${SITE}`)
    await page.getByRole("button", { name: "Add to Cart" }).first().click()
    await page.waitForTimeout(500)
    await page.goto(`/cart${SITE}`)
    await page.getByRole("button", { name: "+" }).click()
    await expectCartCount(page, "2")
  })

  test("proceed to checkout from cart", async ({ page }) => {
    await page.goto(`/products/classic-pig-milk${SITE}`)
    await page.getByRole("button", { name: "Add to Cart" }).first().click()
    await page.waitForTimeout(500)
    await page.goto(`/cart${SITE}`)
    await page.getByText("Proceed to Checkout").click()
    await expect(page.getByText("Our Pigs Are Working")).toBeVisible()
  })

  test("checkout page has fake progress bar", async ({ page }) => {
    await page.goto(`/checkout${SITE}`)
    await expect(page.getByText(/Processing.*\d+%/)).toBeVisible()
  })
})
