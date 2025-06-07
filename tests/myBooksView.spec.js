// Test Book list.

import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test("get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole("heading", { name: "Installation" })).toBeVisible();
});

// เห็นรายการหนังสือที่ฉันกดเป็นรายการโปรด
test("faverite book", async ({ page }) => {
    await page.goto("https://tap-ht24-testverktyg.github.io/exam-template/");

    const selectBook = await page.getByTestId('star-Hur man tappar bort sin TV-fjärr 10 gånger om dagen');
    await expect(selectBook).toHaveClass('star');
    await selectBook.click();

    await expect(selectBook).toHaveClass('star selected');

    await page.getByTestId("favorites").click();
    const FavBook = await page.getByTestId('fav-Hur man tappar bort sin TV-fjärr 10 gånger om dagen');

    // Expect to see feverite books.
    await expect(FavBook).toBeVisible();

    
    


});