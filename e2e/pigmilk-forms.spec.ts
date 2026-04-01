import { test, expect } from "@playwright/test"

const SITE = "?site=pigmilk"

test.describe.configure({ mode: "serial" })

test.describe("Pig Milk Creamery — Contact Form", () => {
  test("contact form submits with confirmation dialog", async ({ page }) => {
    await page.goto(`/contact${SITE}`)

    await page.fill("#name", "Test User")
    await page.fill("#email", "test@example.com")
    await page.selectOption("#reason", "Pig milk emergency")
    await page.fill("#message", "I need pig milk immediately")

    // Register dialog handler BEFORE clicking
    page.once("dialog", async (dialog) => {
      expect(dialog.message()).toContain("Are you sure")
      await dialog.accept()
    })

    await page.getByRole("button", { name: "Send Message" }).click()
    await expect(page.getByText("Message sent!")).toBeVisible({ timeout: 10000 })
  })

  test("contact form cancel dialog keeps form", async ({ page }) => {
    await page.goto(`/contact${SITE}`)

    await page.fill("#name", "Test User")
    await page.fill("#email", "test@example.com")
    await page.selectOption("#reason", "Legal threats")
    await page.fill("#message", "Testing")

    page.on("dialog", async (dialog) => {
      await dialog.dismiss()
    })

    await page.getByRole("button", { name: "Send Message" }).click()

    // Form should still be visible
    await expect(page.getByRole("button", { name: "Send Message" })).toBeVisible()
  })

  test("FAQ accordion expands and collapses", async ({ page }) => {
    await page.goto(`/contact${SITE}`)

    // Scroll to FAQ section
    await page.getByText("Frequently Asked Questions").scrollIntoViewIfNeeded()

    const question = page.getByRole("button", { name: "Is pig milk real?" })
    await question.click()
    await expect(page.getByText("Legally, we cannot answer")).toBeVisible()

    await question.click()
    await expect(page.getByText("Legally, we cannot answer")).toBeHidden()
  })

  test("FAQ shows correct answers", async ({ page }) => {
    await page.goto(`/contact${SITE}`)

    await page.getByText("Frequently Asked Questions").scrollIntoViewIfNeeded()

    await page.getByRole("button", { name: "Do you ship internationally?" }).click()
    await expect(page.getByText("talk about Belgium")).toBeVisible()

    await page.getByRole("button", { name: "Can I visit the farm?" }).click()
    await expect(page.getByText("pigs value their privacy")).toBeVisible()
  })
})

test.describe("Pig Milk Creamery — Volunteer Form", () => {
  test("volunteer application form submits", async ({ page }) => {
    await page.goto(`/volunteer${SITE}`)

    // Scroll to form section
    const formSection = page.getByText("Apply Now").last()
    await formSection.scrollIntoViewIfNeeded()

    await page.fill("#name", "Pig Enthusiast")
    await page.fill("#email", "pigs@example.com")
    await page.selectOption("#position", "Pig Whisperer")
    await page.fill("#why", "I speak fluent oink")

    await page.getByRole("button", { name: "Submit Application" }).click()

    await expect(page.getByText("Application received")).toBeVisible()
  })

  test("pig feeling slider is restricted to 8-10", async ({ page }) => {
    await page.goto(`/volunteer${SITE}`)

    const slider = page.locator("#pigFeeling")
    await expect(slider).toHaveAttribute("min", "8")
    await expect(slider).toHaveAttribute("max", "10")
  })
})
