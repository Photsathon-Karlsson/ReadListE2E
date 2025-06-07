// Catalog View Tests
// - As a visitor, I want to see a list of available books, so that I can browse for something to read.
// - As a user, I want to be able to favorite a book from the catalog view, so that I can add it to my reading list.

import { test, expect } from "@playwright/test";

// Define base URL for reuse
const baseURL = "https://tap-ht24-testverktyg.github.io/exam-template/";

// Test 1: Check that catalog shows 7 books
test("should display 7 books in the catalog", async ({ page }) => {
  await page.goto(baseURL);
  const catalogItems = await page.locator(".book").count();
  console.log("Catalog items count:", catalogItems);
  expect(catalogItems).toBe(7);
});

// Test 2: Favorite and unfavorite a book from catalog view
test("should allow favoriting and unfavoriting a book", async ({ page }) => {
  await page.goto(baseURL);
  const heart = page.getByTestId("star-Hur man tappar bort sin TV-fjärr 10 gånger om dagen");

  // Click to favorite
  await heart.click();
  await expect(heart).toHaveClass(/star selected/);

  // Click again to unfavorite
  await heart.click();
  await expect(heart).toHaveClass(/star/);
});
