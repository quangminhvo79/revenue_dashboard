import { test, expect } from '@playwright/test'
import { DEMO_USER, login } from './support/auth'

test.describe('Login page', () => {
  test('renders the login form', async ({ page }) => {
    await page.goto('/login')

    await expect(page.getByRole('heading', { name: 'Log in' })).toBeVisible()
    await expect(page.getByLabel('Email')).toBeVisible()
    await expect(page.getByLabel('Password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible()
  })

  test('logs in with valid credentials and redirects to the home page', async ({ page }) => {
    await login(page)

    await expect(page).toHaveURL('/')
    await expect(page.getByText(`Welcome back, ${DEMO_USER.email}`)).toBeVisible()
    await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible()
  })

  test.describe('failed login', () => {
    for (const { name, email, password } of [
      { name: 'wrong password', email: DEMO_USER.email, password: 'wrong-password' },
      { name: 'unregistered email', email: 'nobody@example.com', password: 'password123' },
    ]) {
      test(`shows an error message for ${name}`, async ({ page }) => {
        await login(page, { email, password })

        await expect(
          page.getByText('Unable to login. Please check your email and password.'),
        ).toBeVisible()
        await expect(page).toHaveURL('/login')
      })
    }

    test('shows a validation error when the password is too short', async ({ page }) => {
      await page.goto('/login')
      await page.getByLabel('Email').fill(DEMO_USER.email)
      await page.getByLabel('Password').fill('short')
      await page.getByRole('button', { name: 'Log in' }).click()

      await expect(page.getByText('Password is required')).toBeVisible()
      await expect(
        page.getByText('Unable to login. Please check your email and password.'),
      ).not.toBeVisible()
      await expect(page).toHaveURL('/login')
    })
  })

  test('navigates back to the homepage via the Homepage link', async ({ page }) => {
    await page.goto('/login')
    await page.getByRole('link', { name: 'Homepage' }).click()

    await expect(page).toHaveURL('/')
  })
})
