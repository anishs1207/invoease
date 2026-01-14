import { test, expect } from "@playwright/test";

// testing functionalities at / & /home
/*

Frontend e2e testing:
- / and /home:
1. nvabar testing (that it works on clicing the buttons)
2. 

*/

const FRONTEND_URL = "http://localhost:5173";

test("Test Homepage loads & has title ", async ({ page }) => {
  await page.goto(FRONTEND_URL);
  await expect(page).toHaveTitle(/Invo-Ease/);
});

test("Navigation Buttons Work", async ({ page }) => {
  await page.goto(FRONTEND_URL);

  // click the button
  await page.setViewportSize({ width: 1280, height: 800 }); // large screen
  await page.getByRole("link", { name: "Home" }).click();
  await expect(page).toHaveURL(/\/home/);

  await page.getByRole("link", { name: "About" }).click();
  await expect(page).toHaveURL(/\/about/);

  await page.getByRole("link", { name: "Contact" }).click();
  await expect(page).toHaveURL(/\/contact/);

  await page.setViewportSize({ width: 375, height: 667 }); // mobile screen
  const menuButton = page.locator("button[aria-label='menu']"); // optional: add aria-label="menu" to your button
  await menuButton.click(); // open menu

  // Click mobile link
  await page.getByRole("link", { name: "Home" }).click();
  await expect(page).toHaveURL(/\/home/);
});
