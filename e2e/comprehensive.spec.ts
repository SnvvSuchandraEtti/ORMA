import { expect, test, type Page } from '@playwright/test'

test.describe('Comprehensive User Flow', () => {
  let errors: string[] = []

  test.beforeEach(async ({ page }) => {
    errors = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(`Console Error: ${msg.text()}`)
      }
    })
    page.on('pageerror', (error) => {
      errors.push(`Page Error: ${error.message}`)
    })
    page.on('requestfailed', request => {
      errors.push(`Request failed: ${request.url()} - ${request.failure()?.errorText}`)
    })
  })

  test('Login, Browse, Book, and List Item', async ({ page }) => {
    // 1. Home
    await page.goto('http://localhost:3000')
    await expect(page).toHaveTitle(/ORMA/i)

    // 2. Login
    await page.click('button:has-text("Log in")')
    await page.waitForSelector('text=Welcome Back', { timeout: 10000 })
    
    await page.fill('input[type="email"]', 'suchandra@gmail.com')
    await page.fill('input[type="password"]', 'password123')
    await page.click('button[type="submit"]:has-text("Continue")')
    
    // Wait for the modal to close and user to be logged in (toast message "Welcome back")
    await page.waitForSelector('text=Welcome back', { state: 'visible', timeout: 10000 })
    console.log('Login successful')

    // 3. Open Listing
    const listingCard = page.locator('article[aria-label*="rental listing"]').first()
    await expect(listingCard).toBeVisible()
    await listingCard.click()
    
    await page.waitForSelector('h1', { timeout: 10000 })
    console.log('Listing opened successfully')

    // 4. Try Booking
    // Wait for the booking widget to appear
    const bookingWidget = page.locator('.sticky') // assuming booking widget is sticky
    await expect(bookingWidget).toBeVisible()
    
    const selectDatesBtn = page.locator('button:has-text("Select dates"), button:has-text("Reserve")').first()
    if (await selectDatesBtn.isVisible()) {
      await selectDatesBtn.click()
      console.log('Clicked Select Dates / Reserve')
    }

    // 5. Try List Item
    await page.goto('http://localhost:3000/list-your-item')
    await page.waitForSelector('h1:has-text("List your item")', { timeout: 10000 })
    
    // Fill out Step 1 (Category)
    await page.click('button:has-text("Cars")')
    await page.click('button:has-text("Next: Details")')
    
    // Fill out Step 2 (Details)
    await page.fill('input[placeholder*="title"]', 'Test Car')
    await page.fill('textarea[placeholder*="description"]', 'This is a test car for automation')
    await page.fill('input[placeholder*="Brand"]', 'TestBrand')
    await page.click('button:has-text("Next: Photos")')
    
    console.log('Navigated through list item steps successfully')

    if (errors.length > 0) {
      console.error('Errors encountered during flow:', errors)
    }
    
    // Write errors to a file so we can read it
    const fs = require('fs')
    fs.writeFileSync('d:/ORMA/test_errors.json', JSON.stringify(errors, null, 2))
  })
})
