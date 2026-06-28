import { expect, test, type Page } from '@playwright/test'
import fs from 'fs'

test.describe('Comprehensive User Flow', () => {
  let errors: string[] = []

  const clickContinue = async (page: Page) => {
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('.fixed.bottom-0 button'))
      const btn = buttons.find(b => b.textContent?.includes('Continue')) as HTMLButtonElement
      if (btn) btn.click()
    })
  }

  test.beforeEach(async ({ page }) => {
    errors = []
    page.on('console', (msg) => {
      const text = msg.text()
      if (msg.type() === 'error') {
        console.error(`PAGE CONSOLE ERROR: ${text}`)
        errors.push(`Console Error: ${text}`)
      } else {
        console.log(`PAGE CONSOLE LOG: ${text}`)
      }
    })
    page.on('pageerror', (error) => {
      console.error(`PAGE RUNTIME ERROR: ${error.message}`)
      errors.push(`Page Error: ${error.message}`)
    })
    page.on('requestfailed', request => {
      const errorText = request.failure()?.errorText || ''
      if (errorText.includes('net::ERR_ABORTED')) return
      console.error(`PAGE REQUEST FAILED: ${request.url()} - ${errorText}`)
      errors.push(`Request failed: ${request.url()} - ${errorText}`)
    })
    page.on('request', request => {
      console.log(`REQUEST: ${request.method()} ${request.url()}`)
    })
    page.on('response', response => {
      if (response.status() >= 400) {
        console.error(`BAD RESPONSE: ${response.status()} ${response.url()}`)
      }
    })
    // Block service worker registration to allow Playwright's fetch interception to work correctly
    await page.context().route('**/sw.js', async (route) => {
      await route.fulfill({
        status: 404,
        contentType: 'application/javascript',
        body: '/* Service worker blocked by test */',
      })
    })
  })

  test('Login, Browse, Book, and List Item', async ({ page }) => {
    // Mock Supabase storage upload POST/PUT request to guarantee test stability
    await page.context().route(url => url.href.includes('storage/v1/object'), async (route) => {
      console.log(`Mocking storage request: ${route.request().method()} ${route.request().url()}`)
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ path: 'test-user/icon-192.png' }),
      })
    })

    // 1. Home and clean service workers
    await page.goto('http://localhost:3000')
    await page.evaluate(async () => {
      if ('serviceWorker' in navigator) {
        const regs = await navigator.serviceWorker.getRegistrations()
        for (const reg of regs) {
          await reg.unregister()
        }
      }
    })
    // Reload to ensure all requests bypass the service worker
    await page.reload()
    await expect(page).toHaveTitle(/ORMA/i)

    // Dismiss Onboarding Modal if present (with try-catch for wait)
    const justBrowsingBtn = page.locator('text="Just browsing"')
    try {
      await justBrowsingBtn.waitFor({ state: 'visible', timeout: 3000 })
      await justBrowsingBtn.click()
      await page.waitForTimeout(600) // wait for framer motion exit animation
    } catch (e) {
      // Modal didn't appear, continue
    }

    // 2. Login
    await page.click('button[aria-label="User menu"]')
    await page.click('button:has-text("Log in")')
    await page.waitForSelector('text=Welcome Back', { timeout: 10000 })
    
    await page.fill('input[type="email"]', 'suchandra@gmail.com')
    await page.fill('input[type="password"]', 'password123')
    await page.click('button[type="submit"]:has-text("Continue")')
    
    // Wait for the modal to close and user to be logged in (toast message "Welcome back")
    await page.waitForSelector('text=Welcome back', { state: 'visible', timeout: 10000 })
    console.log('Login successful')

    // 3. Open Listing
    const listingCard = page.locator('[data-testid="listing-card"]').first()
    await expect(listingCard).toBeVisible({ timeout: 15000 })
    await listingCard.click()
    
    await page.waitForSelector('h1', { timeout: 10000 })
    console.log('Listing opened successfully')

    // 4. Try Booking
    
    const selectDatesBtn = page.locator('button:has-text("Select dates"), button:has-text("Reserve")').first()
    if (await selectDatesBtn.isVisible()) {
      await selectDatesBtn.click()
      console.log('Clicked Select Dates / Reserve')
    }

    // 5. Try List Item
    await page.locator('a[href="/list-your-item"]').first().click()
    await page.waitForSelector('h2:has-text("What kind of item are you listing?")', { timeout: 10000 })
    
    // Fill out Step 1 (Category)
    await page.click('main button:has-text("Cars")')
    await clickContinue(page)
    
    // Fill out Step 2 (Photos)
    await page.waitForSelector('h2:has-text("Add photos of your item")', { timeout: 10000 })

    await page.setInputFiles('input[type="file"]', 'public/icon-192.png')
    
    // Wait for the upload to complete and Continue button to become enabled
    const continueBtn = page.locator('.fixed.bottom-0 button:has-text("Continue")')
    await expect(continueBtn).toBeEnabled({ timeout: 15000 })
    await page.waitForTimeout(1000)
    await clickContinue(page)
    
    // Fill out Step 3 (Details)
    await page.waitForSelector('h2:has-text("Tell renters about your item")', { timeout: 10000 })
    await page.fill('#item-title', 'Test Car')
    await page.fill('#description', 'This is a test car for automation')
    await page.fill('#brand', 'TestBrand')
    await clickContinue(page)
    
    console.log('Navigated through list item steps successfully')

    if (errors.length > 0) {
      console.error('Errors encountered during flow:', errors)
    }
    
    // Write errors to a file so we can read it
    fs.writeFileSync('d:/ORMA/test_errors.json', JSON.stringify(errors, null, 2))
  })
})
