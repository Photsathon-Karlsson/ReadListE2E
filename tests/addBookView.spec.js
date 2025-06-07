// Test: Add a book and check if it appears in the catalog

import { test, expect } from "@playwright/test";

test("should add a new book and display it in the catalog", async ({ page }) => {
  // Go to the website
  await page.goto("https://tap-ht24-testverktyg.github.io/exam-template/");

  // Count how many books are shown before adding a new one
  const countBookBefore = await page.locator(".book").count();
  const countBookAfter = countBookBefore + 1;

  // Wait for the "Add Book" button to be ready, then click it
  const addBookBtn = page.getByTestId("add-book");
  await expect(addBookBtn).toBeEnabled();
  await addBookBtn.click();

  // Wait for the add-book form to be visible
  await expect(page.locator(".form")).toBeVisible();

  // Fill in the book title input
  const inputTitle = await page.getByTestId("add-input-title");
  await expect(inputTitle).toBeVisible();
  await inputTitle.fill("My Book " + countBookAfter);
  await expect(inputTitle).toHaveValue("My Book " + countBookAfter);

  // Fill in the author input
  const inputAuthor = await page.getByTestId("add-input-author");
  await expect(inputAuthor).toBeVisible();
  await inputAuthor.fill("My Author " + countBookAfter);
  await expect(inputAuthor).toHaveValue("My Author " + countBookAfter);

  // Wait for the submit button to be enabled, then click it
  const submitBtn = await page.getByTestId("add-submit");
  await expect(submitBtn).toBeEnabled();
  await submitBtn.click();

  // Click the "Catalog" button to go back to the book list
  await page.getByTestId("catalog").click();

  // Check that one new book is added
  const books = await page.locator(".book");
  await expect(books).toHaveCount(countBookAfter);

  // Check that the last book in the list has the correct title and author
  await expect(books.last()).toContainText(
    '❤️"My Book ' + countBookAfter + '", My Author ' + countBookAfter
  );
});

