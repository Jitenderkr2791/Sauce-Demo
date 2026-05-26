# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: TC_Cart.spec.js >> Cart Tests - Single Login Session >> REQ-CART-001: Add single product to cart
- Location: tests\TC_Cart.spec.js:29:5

# Error details

```
ReferenceError: LoginPage is not defined
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import LoginPageMethods from '../pages/login.page.js';
  3  | import HomePage from '../pages/home.page.js';
  4  | import { TEST_DATA, createLoggedInSession } from '../test-data/testData.js';
  5  | 
  6  | test.describe('Cart Tests - Single Login Session', () => 
  7  | {
  8  |     let context;
  9  |     let page;
  10 |     let home;
  11 |     let loginPage;
  12 | 
  13 |     test.beforeAll(async ({ browser }) => 
  14 |     {
  15 |         ({ context, page } = await createLoggedInSession(browser));
> 16 |             loginPage = new LoginPage(page);
     |             ^ ReferenceError: LoginPage is not defined
  17 |             await loginPage.login(TEST_DATA.USERS.STANDARD.username,TEST_DATA.USERS.STANDARD.password);
  18 |             await expect(page).toHaveURL(/inventory/);
  19 |             home = new HomePage(page);
  20 |         });
  21 | 
  22 |     test.afterAll(async () =>
  23 |          {
  24 |              if (page) await page.close();
  25 |              if (context) await context.close();
  26 |          });
  27 | 
  28 | 
  29 |     test('REQ-CART-001: Add single product to cart', async () => {
  30 |         await test.step('Add product and verify', async () => {
  31 |         await home.clickAddToCart(TEST_DATA.Product.Product);
  32 |         await home.verifyCartCount(1);
  33 |         await home.verifyButtonState(TEST_DATA.Product.Product, 'Remove');
  34 |         });
  35 |     });
  36 | 
  37 |     test('REQ-CART-002: Remove single product from cart', async () => {
  38 |         await test.step('Remove product and verify', async () => {
  39 |         await home.clickAddToCart(TEST_DATA.Product.Product);
  40 |         await home.clickRemove(TEST_DATA.Product.Product);
  41 |         await home.verifyCartCount(0);
  42 |         await home.verifyButtonState(TEST_DATA.Product.Product, 'Add to cart');
  43 |         });
  44 |     });
  45 | 
  46 |     test('REQ-CART-003: Add multiple products to cart', async () => {
  47 |         await test.step('Add multiple products', async () => {
  48 |         await home.clickAddToCart(TEST_DATA.Product.Product);
  49 |         await home.clickAddToCart(TEST_DATA.Product.Product2);
  50 |         await home.verifyCartCount(2);
  51 |         });
  52 |     });
  53 | 
  54 |     test('REQ-CART-004: Remove one product from multiple', async () => {
  55 |         await test.step('Remove one item', async () => {
  56 |         await home.clickAddToCart(TEST_DATA.Product.Product);
  57 |         await home.clickRemove(TEST_DATA.Product.Product);
  58 |         await home.verifyCartCount(1);
  59 |         });
  60 |     });
  61 | 
  62 |     test('REQ-CART-005: Remove all products from cart', async () => {
  63 |         await test.step('Clear cart', async () => {
  64 |         await home.clickAddToCart(TEST_DATA.Product.Product2);
  65 |         await home.clickRemove(TEST_DATA.Product.Product2);
  66 |         await home.verifyCartCount(0);
  67 |         });
  68 |     });
  69 | 
  70 |     test('REQ-CART-006: Add to cart button state change', async () => {
  71 |         await test.step('Verify Add → Remove state', async () => {
  72 |         await home.clickAddToCart(TEST_DATA.Product.Product);
  73 |         await home.verifyButtonState(TEST_DATA.Product.Product, 'Remove');
  74 |         });
  75 |     });
  76 | 
  77 |     test('REQ-CART-007: Remove button state change', async () => {
  78 |         await test.step('Verify Remove → Add state', async () => {
  79 |         await home.clickRemove(TEST_DATA.Product.Product);
  80 |         await home.verifyButtonState(TEST_DATA.Product.Product, 'Add to cart');
  81 |         });
  82 |     });
  83 | 
  84 |     test('REQ-CART-008: Cart count persistence after sorting', async () => {
  85 |         await test.step('Verify cart persistence after sorting', async () => {
  86 |         await home.clickAddToCart(TEST_DATA.Product.Product);
  87 |         await home.verifyCartCount(1);
  88 |         await home.sortBy('Price (high to low)');
  89 |         await home.verifyCartCount(1);
  90 |         await home.verifyButtonState(TEST_DATA.Product.Product, 'Remove');
  91 |         });
  92 |     });
  93 | });
```