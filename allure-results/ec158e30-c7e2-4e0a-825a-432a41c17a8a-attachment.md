# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: TC_Cart.spec.js >> Cart Tests - Single Login Session >> REQ-CART-001: Add single product to cart
- Location: tests\TC_Cart.spec.js:28:5

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
  11 | 
  12 |     test.beforeAll(async ({ browser }) => 
  13 |     {
  14 |         ({ context, page } = await createLoggedInSession(browser));
> 15 |             const loginPage = new LoginPage(page);
     |                               ^ ReferenceError: LoginPage is not defined
  16 |             await loginPage.login(TEST_DATA.USERS.STANDARD.username,TEST_DATA.USERS.STANDARD.password);
  17 |             await expect(page).toHaveURL(/inventory/);
  18 |             home = new HomePage(page);
  19 |         });
  20 | 
  21 |     test.afterAll(async () =>
  22 |          {
  23 |              if (page) await page.close();
  24 |              if (context) await context.close();
  25 |          });
  26 | 
  27 | 
  28 |     test('REQ-CART-001: Add single product to cart', async () => {
  29 |         await test.step('Add product and verify', async () => {
  30 |         await home.clickAddToCart(TEST_DATA.Product.Product);
  31 |         await home.verifyCartCount(1);
  32 |         await home.verifyButtonState(TEST_DATA.Product.Product, 'Remove');
  33 |         });
  34 |     });
  35 | 
  36 |     test('REQ-CART-002: Remove single product from cart', async () => {
  37 |         await test.step('Remove product and verify', async () => {
  38 |         await home.clickAddToCart(TEST_DATA.Product.Product);
  39 |         await home.clickRemove(TEST_DATA.Product.Product);
  40 |         await home.verifyCartCount(0);
  41 |         await home.verifyButtonState(TEST_DATA.Product.Product, 'Add to cart');
  42 |         });
  43 |     });
  44 | 
  45 |     test('REQ-CART-003: Add multiple products to cart', async () => {
  46 |         await test.step('Add multiple products', async () => {
  47 |         await home.clickAddToCart(TEST_DATA.Product.Product);
  48 |         await home.clickAddToCart(TEST_DATA.Product.Product2);
  49 |         await home.verifyCartCount(2);
  50 |         });
  51 |     });
  52 | 
  53 |     test('REQ-CART-004: Remove one product from multiple', async () => {
  54 |         await test.step('Remove one item', async () => {
  55 |         await home.clickAddToCart(TEST_DATA.Product.Product);
  56 |         await home.clickRemove(TEST_DATA.Product.Product);
  57 |         await home.verifyCartCount(1);
  58 |         });
  59 |     });
  60 | 
  61 |     test('REQ-CART-005: Remove all products from cart', async () => {
  62 |         await test.step('Clear cart', async () => {
  63 |         await home.clickAddToCart(TEST_DATA.Product.Product2);
  64 |         await home.clickRemove(TEST_DATA.Product.Product2);
  65 |         await home.verifyCartCount(0);
  66 |         });
  67 |     });
  68 | 
  69 |     test('REQ-CART-006: Add to cart button state change', async () => {
  70 |         await test.step('Verify Add → Remove state', async () => {
  71 |         await home.clickAddToCart(TEST_DATA.Product.Product);
  72 |         await home.verifyButtonState(TEST_DATA.Product.Product, 'Remove');
  73 |         });
  74 |     });
  75 | 
  76 |     test('REQ-CART-007: Remove button state change', async () => {
  77 |         await test.step('Verify Remove → Add state', async () => {
  78 |         await home.clickRemove(TEST_DATA.Product.Product);
  79 |         await home.verifyButtonState(TEST_DATA.Product.Product, 'Add to cart');
  80 |         });
  81 |     });
  82 | 
  83 |     test('REQ-CART-008: Cart count persistence after sorting', async () => {
  84 |         await test.step('Verify cart persistence after sorting', async () => {
  85 |         await home.clickAddToCart(TEST_DATA.Product.Product);
  86 |         await home.verifyCartCount(1);
  87 |         await home.sortBy('Price (high to low)');
  88 |         await home.verifyCartCount(1);
  89 |         await home.verifyButtonState(TEST_DATA.Product.Product, 'Remove');
  90 |         });
  91 |     });
  92 | });
```