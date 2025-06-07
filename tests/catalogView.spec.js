import { test, expect } from "@playwright/test";

const URL = "https://tap-ht24-testverktyg.github.io/exam-template/";

test("should display correct number of books in catalog", async ({ page }) => {
  await page.goto(URL, { timeout: 60000 });

  const catalogItems = await page.locator(".book").count();
  console.log("Catalog items count:", catalogItems);
  expect(catalogItems).toBe(7);
});

test("should toggle favorite (heart) icon for a book", async ({ page }) => {
  await page.goto(URL, { timeout: 60000 });

  const heart = page.getByTestId("star-Hur man tappar bort sin TV-fjärr 10 gånger om dagen");

  // Click to mark as favorite
  await heart.click();
  await expect(heart).toHaveClass(/selected/);

  // Click again to unmark as favorite
  await heart.click();
  await expect(heart).not.toHaveClass(/selected/);
});

test("should have no favorites selected on initial load", async ({ page }) => {
  await page.goto(URL, { timeout: 60000 });

  const selectedHearts = await page.locator(".star.selected").count();
  expect(selectedHearts).toBe(0); // Expect no favorites selected on initial load
});

test("should allow selecting and counting favorite books", async ({ page }) => {
  await page.goto(URL, { timeout: 60000 });

  // Select 2 books as favorites
  const heart1 = page.getByTestId("star-Min katt är min chef");
  const heart2 = page.getByTestId("star-Att prata med växter – och vad de egentligen tycker om dig");

  await heart1.click();
  await heart2.click();

  const selectedHearts = await page.locator(".star.selected").count();
  expect(selectedHearts).toBe(2); // Expect 2 hearts to be selected
});
