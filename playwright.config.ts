import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  timeout: 45_000,
  expect: {
    timeout: 10_000,
  },
  reporter: 'line',
  use: {
    baseURL: 'http://localhost:3000',
    browserName: 'chromium',
    channel: 'msedge',
    headless: true,
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 120_000,
  },
})
