import { test, expect } from '@playwright/test';

test('RootPage', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page).toHaveTitle('RSC Workshop - Contacts App');
  const heading = page.getByRole('heading', {
    name: 'React Server Components and React 19 in the Next.js App Router',
  });
  await expect(heading).toBeVisible();
});
