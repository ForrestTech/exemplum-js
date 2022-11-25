import { test, expect } from "@playwright/test";

test("home page - getting started", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Exemplum JS - Get off to a good start/);

  const getStarted = page.getByRole("button", { name: "Getting started" });

  await expect(getStarted).toHaveAttribute(
    "href",
    "https://github.com/ForrestTech/exemplum-js"
  );

  await getStarted.click();

  await expect(page).toHaveURL(/exemplum-js/);
});

test("test 404", async ({ page }) => {
  const res = await page.goto("/todolists/not-found");
  expect(res?.status()).toBe(404);
});
