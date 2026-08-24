import { test, expect } from '@playwright/test'
import { login } from './support/auth'

test.describe('Dashboard page', () => {
  test('redirects unauthenticated visitors to the login page', async ({ page }) => {
    await page.goto('/dashboard')

    await expect(page).toHaveURL('/login')
  })

  test.describe('when authenticated', () => {
    test.beforeEach(async ({ page }) => {
      await login(page)
      await page.getByRole('link', { name: 'Dashboard' }).click()
      await expect(page).toHaveURL('/dashboard')
    })

    test('shows the revenue trend chart and summary cards', async ({ page }) => {
      await expect(
        page.getByText("This Week's Revenue Trend", { exact: true }),
      ).toBeVisible()
      await expect(page.getByText('Total Revenue')).toBeVisible()
      await expect(page.getByText('Average per Day')).toBeVisible()
      await expect(page.getByText('Total Covers')).toBeVisible()
    })

    test('toggles the previous period comparison', async ({ page }) => {
      const compareButton = page.getByRole('button', { name: 'Compare to Previous' })

      await expect(
        page.getByText("This Week's Revenue Trend", { exact: true }),
      ).toBeVisible()

      await compareButton.click()

      await expect(
        page.getByText("This Week's Revenue Trend vs Previous Period"),
      ).toBeVisible()

      await compareButton.click()

      await expect(
        page.getByText("This Week's Revenue Trend", { exact: true }),
      ).toBeVisible()
    })

    test('toggles revenue series via the filter checkboxes', async ({ page }) => {
      const posCheckbox = page.getByRole('checkbox', { name: 'POS Revenue' })

      await expect(posCheckbox).toBeChecked()

      await posCheckbox.click()

      await expect(posCheckbox).not.toBeChecked()
    })
  })
})
