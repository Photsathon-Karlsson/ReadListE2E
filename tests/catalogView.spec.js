// Test catalog view.


import { test, expect } from "@playwright/test";

test("katalog length", async ({ page }) => {
  await page.goto("https://tap-ht24-testverktyg.github.io/exam-template/");

  const catalogItems = await page.locator(".book").count();
  console.log("Catalog items count:", catalogItems);
  expect(catalogItems).toBe(7);
});

test("selected catalog item", async ({ page }) => {
  await page.goto("https://tap-ht24-testverktyg.github.io/exam-template/");

  const heart = page.getByTestId("star-Hur man tappar bort sin TV-fjärr 10 gånger om dagen");

  await heart.click();
  await expect(heart).toHaveClass(/star selected/);

  await heart.click();
  await expect(heart).toHaveClass(/star/);
});

test("heading", async ({ page }) => {
  await page.goto("https://tap-ht24-testverktyg.github.io/exam-template/");

  await expect(page.getByRole("heading", { name: "Välkommen!" })).toBeVisible();

  await expect(page.getByRole("main")).toBeVisible();
});
