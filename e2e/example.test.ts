import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3001/');
  await expect(page).toHaveTitle('RSC Workshop - Contacts App');
});
