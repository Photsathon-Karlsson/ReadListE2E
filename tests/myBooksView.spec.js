// My Books View Tests

import { test, expect } from "@playwright/test";

// Define base URL one time
const baseURL = "https://tap-ht24-testverktyg.github.io/exam-template/";

// Test: Favorite a book and check it appears in the favorite list
test("should add a book to favorites and see it in My Books", async ({ page }) => {
  await page.goto(baseURL);

  // Select the heart icon of a specific book
  const heartIcon = page.getByTestId('star-Hur man tappar bort sin TV-fjärr 10 gånger om dagen');

  // The book should not be favorited at first
  await expect(heartIcon).toHaveClass('star');

  // Click to favorite
  await heartIcon.click();
  await expect(heartIcon).toHaveClass('star selected');

  // Go to the "My Books" view
  await page.getByTestId("favorites").click();

  // Check that the favorited book is visible
  const favoriteBook = page.getByTestId('fav-Hur man tappar bort sin TV-fjärr 10 gånger om dagen');
  await expect(favoriteBook).toBeVisible();
});

// Test: Unfavorite a book and check it disappears from the favorite list
test("should remove a book from My Books when unfavorited", async ({ page }) => {
  await page.goto(baseURL);

  const heartIcon = page.getByTestId('star-Hur man tappar bort sin TV-fjärr 10 gånger om dagen');

  // Make sure the book is favorited
  await heartIcon.click();
  await expect(heartIcon).toHaveClass('star selected');

  // Go to My Books to confirm it's listed
  await page.getByTestId("favorites").click();
  const favoriteBook = page.getByTestId('fav-Hur man tappar bort sin TV-fjärr 10 gånger om dagen');
  await expect(favoriteBook).toBeVisible();

  // Go back and unfavorite it
  await page.getByTestId("catalog").click();
  await heartIcon.click();
  await expect(heartIcon).not.toHaveClass('star selected');

  // Check that it is no longer in My Books
  await page.getByTestId("favorites").click();
  await expect(page.getByTestId('fav-Hur man tappar bort sin TV-fjärr 10 gånger om dagen')).toHaveCount(0);
});
