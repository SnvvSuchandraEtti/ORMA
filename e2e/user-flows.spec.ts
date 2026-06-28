import { expect, test, type Page } from '@playwright/test'

test('full user flow: login, book, list item', async ({ page }) => {
  // Capture console errors
  const errors: string[] = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      const text = msg.text()
      if (text.includes('Failed to load resource') || text.includes('net::ERR_')) return
      if (text.includes('favicon.ico') || text.includes('unsplash.com')) return
      errors.push(text)
    }
  })
  page.on('pageerror', (error) => {
    errors.push(error.message)
  })

  // 1. Navigate to homepage
  await page.goto('/')
  console.log('Homepage loaded')

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
  console.log('Auth modal opened')

  // Wait for the input fields to be visible
  await page.fill('input[type="email"]', 'suchandra@gmail.com')
  await page.fill('input[type="password"]', 'password123')
  await page.click('button[type="submit"]:has-text("Continue")')
  
  // Wait for login success
  await page.waitForSelector('text=Welcome back', { state: 'visible', timeout: 10000 })
  console.log('Login successful')

  // 3. Open a listing
  const listingCard = page.locator('[data-testid="listing-card"]').first()
  await expect(listingCard).toBeVisible({ timeout: 15000 })
  await listingCard.click()
  await page.waitForSelector('h1', { timeout: 10000 })
  console.log('Listing opened successfully')
  
  // 4. Try Booking
  // Find the rent until/from date pickers
  console.log('Testing booking widget')
  const bookButton = page.locator('button:has-text("Select dates"), button:has-text("Reserve")').first()
  if (await bookButton.isVisible()) {
    console.log('Booking widget visible')
  }

  // 5. Try List Item
  console.log('Testing List Your Item page')
  await page.locator('a[href="/list-your-item"]').first().click()
  await page.waitForSelector('h2:has-text("What kind of item are you listing?")', { timeout: 10000 })
  
  // Check if it loaded or if there are errors
  const heading = await page.locator('h2').first().textContent()
  console.log(`List item heading: ${heading}`)

  if (errors.length > 0) {
    console.error('Errors found during flow:', errors)
  } else {
    console.log('No console errors found during flow.')
  }
})
