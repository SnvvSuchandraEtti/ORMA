import { expect, test, type Page } from '@playwright/test'

function attachDiagnostics(page: Page) {
  const consoleErrors: string[] = []
  const pageErrors: string[] = []
  const requestFailures: string[] = []
  const badResponses: string[] = []

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text())
    }
  })

  page.on('pageerror', (error) => {
    pageErrors.push(error.message)
  })

  page.on('requestfailed', (request) => {
    const url = request.url()
    if (url.includes('googleusercontent.com')) return
    requestFailures.push(`${request.method()} ${url} :: ${request.failure()?.errorText || 'unknown error'}`)
  })

  page.on('response', (response) => {
    const status = response.status()
    const url = response.url()
    if (status < 400) return
    if (url.includes('/_next/image')) return
    if (url.includes('googleusercontent.com')) return
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

  const listingCard = page.locator('article[aria-label*="rental listing"]').first()
  await expect(listingCard).toBeVisible()

  const listingHref = await listingCard.locator('a').first().getAttribute('href')
  expect(listingHref).toMatch(/^\/listing\//)

  await page.goto(listingHref!)
  await expect(page.getByRole('button', { name: /share/i }).first()).toBeVisible()
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
