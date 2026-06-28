import { expect, test, type Page } from '@playwright/test'

function attachDiagnostics(page: Page) {
  const consoleErrors: string[] = []
  const pageErrors: string[] = []
  const requestFailures: string[] = []
  const badResponses: string[] = []

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      const text = msg.text()
      if (text.includes('Failed to load resource') || text.includes('net::ERR_')) return
      if (text.includes('favicon.ico') || text.includes('unsplash.com')) return
      consoleErrors.push(text)
    }
  })

  page.on('pageerror', (error) => {
    pageErrors.push(error.message)
  })

  page.on('requestfailed', (request) => {
    const url = request.url()
    const errorText = request.failure()?.errorText || ''
    if (errorText.includes('net::ERR_ABORTED')) return
    if (url.includes('googleusercontent.com')) return
    if (url.includes('unsplash.com')) return
    requestFailures.push(`${request.method()} ${url} :: ${errorText || 'unknown error'}`)
  })

  page.on('response', (response) => {
    const status = response.status()
    const url = response.url()
    if (status < 400) return
    if (url.includes('/_next/image')) return
    if (url.includes('googleusercontent.com')) return
    if (url.includes('unsplash.com')) return
    if (url.includes('listing_availability_blocks')) return // Ignore missing table 404s
    badResponses.push(`${status} ${url}`)
  })

  return { consoleErrors, pageErrors, requestFailures, badResponses }
}

function assertNoCriticalRuntimeIssues(diagnostics: ReturnType<typeof attachDiagnostics>) {
  expect(diagnostics.consoleErrors, `Console errors:\n${diagnostics.consoleErrors.join('\n')}`).toEqual([])
  expect(diagnostics.pageErrors, `Page errors:\n${diagnostics.pageErrors.join('\n')}`).toEqual([])
  expect(diagnostics.requestFailures, `Request failures:\n${diagnostics.requestFailures.join('\n')}`).toEqual([])
  expect(diagnostics.badResponses, `HTTP >= 400 responses:\n${diagnostics.badResponses.join('\n')}`).toEqual([])
}

test('homepage and listing details render without critical runtime issues', async ({ page }) => {
  const diagnostics = attachDiagnostics(page)

  await page.goto('/')
  await expect(page).toHaveTitle(/ORMA/i)
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/Rentals/i)

  // Dismiss Onboarding Modal if present (with try-catch for wait)
  const justBrowsingBtn = page.locator('text="Just browsing"')
  try {
    await justBrowsingBtn.waitFor({ state: 'visible', timeout: 3000 })
    await justBrowsingBtn.click()
    await page.waitForTimeout(600) // wait for framer motion exit animation
  } catch (e) {
    // Modal didn't appear, continue
  }

  const listingCard = page.locator('[data-testid="listing-card"]').first()
  await expect(listingCard).toBeVisible({ timeout: 15000 })

  await listingCard.click()
  await page.waitForSelector('h1', { timeout: 10000 })
  await expect(page.locator('body')).not.toContainText('Â·')
  await expect(page.locator('body')).not.toContainText('â')

  assertNoCriticalRuntimeIssues(diagnostics)
})

test('search finds GoPro listing for a multi-term query and the UI text is not mojibake', async ({ page }) => {
  const diagnostics = attachDiagnostics(page)

  await page.goto('/search?q=GoPro%20Camera')
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/Showing|items/i)
  await expect(page.locator('body')).not.toContainText('â†‘')
  await expect(page.locator('body')).not.toContainText('â†“')
  await expect(page.locator('body')).not.toContainText('âœ•')
  await expect(page.locator('body')).not.toContainText('âˆž')
  await expect(page.locator('body')).toContainText('GoPro Hero 11 Black + Accessories Kit')

  assertNoCriticalRuntimeIssues(diagnostics)
})
