// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
    timeout: 60000,             // ⏱ เพิ่ม timeout ทั่วไป
    navigationTimeout: 60000,   // ⏱ เพิ่มเวลาโหลดเพจ
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          timeout: 60000,
        },
        navigationTimeout: 60000,
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        launchOptions: {
          timeout: 60000,
        },
        navigationTimeout: 60000,
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        launchOptions: {
          timeout: 60000,
        },
        navigationTimeout: 60000,
      },
    },
  ],
});
