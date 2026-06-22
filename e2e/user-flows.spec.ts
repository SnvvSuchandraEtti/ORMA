import { expect, test, type Page } from '@playwright/test'

test('full user flow: login, book, list item', async ({ page }) => {
  // Capture console errors
  const errors: string[] = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text())
    }
  })
  page.on('pageerror', (error) => {
    errors.push(error.message)
  })

  // 1. Navigate to homepage
  await page.goto('/')
  console.log('Homepage loaded')

  // 2. Login
  await page.click('button:has-text("Log in")')
  await page.waitForSelector('text=Sign in to your account', { timeout: 5000 })
  console.log('Auth modal opened')

  // Wait for the input fields to be visible
  await page.fill('input[type="email"]', 'suchandra@gmail.com')
  await page.fill('input[type="password"]', 'password123')
  await page.click('button[type="submit"]:has-text("Sign in")')
  
  // Wait for login success
  await page.waitForTimeout(3000)
  console.log('Login submitted')

  // 3. Open a listing
  const listingCard = page.locator('article[aria-label*="rental listing"]').first()
  await expect(listingCard).toBeVisible()
  const listingHref = await listingCard.locator('a').first().getAttribute('href')
  console.log(`Opening listing: ${listingHref}`)
  
  await page.goto(listingHref!)
  
  // 4. Try Booking
  // Find the rent until/from date pickers
  console.log('Testing booking widget')
  const bookButton = page.locator('button:has-text("Select dates")').first()
  if (await bookButton.isVisible()) {
    console.log('Booking widget visible')
  }

  // 5. Try List Item
  console.log('Testing List Your Item page')
  await page.goto('/list-your-item')
  await page.waitForTimeout(2000)
  
  // Check if it loaded or if there are errors
  const heading = await page.locator('h1').first().textContent()
  console.log(`List item heading: ${heading}`)

  if (errors.length > 0) {
    console.error('Errors found during flow:', errors)
  } else {
    console.log('No console errors found during flow.')
  }
})
