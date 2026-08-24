import type { Page } from '@playwright/test'

export const DEMO_USER = {
  email: 'admin@example.com',
  password: 'password123',
}

export async function login(
  page: Page,
  { email, password } = DEMO_USER,
) {
  await page.goto('/login')
  await page.getByLabel('Email').fill(email)
  await page.getByLabel('Password').fill(password)
  await page.getByRole('button', { name: 'Log in' }).click()
}
