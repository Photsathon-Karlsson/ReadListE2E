// Test to check if a new book can be added and shown in the catalog.

import { test, expect } from "@playwright/test";

test("should add a new book and display it in the catalog", async ({ page }) => {
  // Go to the homepage
  await page.goto("https://tap-ht24-testverktyg.github.io/exam-template/");

  // Count how many books are shown before adding a new one
  const countBookBefore = await page.locator(".book").count();

  // Click the "Add book" button
  await page.getByTestId("add-book").click();

  // Expect the add form to be visible
  await expect(page.locator(".form")).toBeVisible();

  // Fill in the title input
  const inputTitle = page.getByTestId("add-input-title");
  const newTitle = `My Book ${countBookBefore + 1}`;
  await inputTitle.fill(newTitle);
  await expect(inputTitle).toHaveValue(newTitle);

  // Fill in the author input
  const inputAuthor = page.getByTestId("add-input-author");
  const newAuthor = `My Author ${countBookBefore + 1}`;
  await inputAuthor.fill(newAuthor);
  await expect(inputAuthor).toHaveValue(newAuthor);

  // Submit the form
  await page.getByTestId("add-submit").click();

  // Go to the catalog page to check the result
  await page.getByTestId("catalog").click();

  // Check that the number of books has increased by 1
  const books = page.locator(".book");
  await expect(books).toHaveCount(countBookBefore + 1);

  // Check that the last book in the list is the one we just added
  await expect(books.last()).toContainText(`❤️"${newTitle}", ${newAuthor}`);
});
