# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: TC_PDP.spec.js >> PDP Tests - Single Login Session >> REQ-PDP-001: Product label redirects to PDP
- Location: tests\TC_PDP.spec.js:34:3

# Error details

```
TypeError: home.clickProductName is not a function
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import LoginPageMethods from '../pages/login.page.js';
  3  | import HomePage from '../pages/home.page.js';
  4  | import { TEST_DATA } from '../test-data/testData.js';
  5  | 
  6  | test.describe.serial('PDP Tests - Single Login Session', () => 
  7  | {
  8  |   let context;
  9  |   let page;
  10 |   let home;
  11 |   const product = 'Sauce Labs Backpack';
  12 | 
  13 |   test.beforeAll(async ({ browser }) => 
  14 |     {
  15 |         context = await browser.newContext();
  16 |         page = await context.newPage();
  17 |         const loginPage = new LoginPageMethods(page);
  18 |         await test.step('Login once before PDP tests', async () =>
  19 |         {
  20 |         await loginPage.navigate();
  21 |         await loginPage.login(TEST_DATA.USERS.STANDARD.username,TEST_DATA.USERS.STANDARD.password);
  22 |         await expect(page).toHaveURL(/inventory/);
  23 |         });
  24 |         home = new HomePage(page);
  25 |     });
  26 | 
  27 |   test.afterAll(async () => {
  28 |     await page.close();
  29 |     await context.close();
  30 |   });
  31 | 
  32 |   // ---------------- PDP TESTS ----------------
  33 | 
  34 |   test('REQ-PDP-001: Product label redirects to PDP', async () => {
> 35 |     await home.clickProductName(product);
     |                ^ TypeError: home.clickProductName is not a function
  36 |     await home.verifyPDPLoaded(product);
  37 |   });
  38 | 
  39 |   test('REQ-PDP-002: Product image redirects to PDP', async () => {
  40 |     await home.clickBackToProducts();
  41 |     await home.clickProductImage(product);
  42 |     await home.verifyPDPLoaded(product);
  43 |   });
  44 | 
  45 |   test('REQ-PDP-003: Product card redirects to PDP', async () => {
  46 |     await home.clickBackToProducts();
  47 |     await home.clickProductCard(product);
  48 |     await home.verifyPDPLoaded(product);
  49 |   });
  50 | 
  51 |   test('REQ-PDP-004: Back to products from PDP', async () => {
  52 |     await home.clickBackToProducts();
  53 |     await home.verifyProductsPage();
  54 |   });
  55 | 
  56 | });
```