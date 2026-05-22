# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: TC_Cart.spec.js >> Cart Tests - Single Login Session >> REQ-CART-001: Add single product to cart
- Location: tests\TC_Cart.spec.js:35:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for locator('[data-test="add-to-cart-product"]')

```

# Test source

```ts
  1  | import { expect } from '@playwright/test';
  2  | import homePageLocators from '../pageobjects/homePageLocators.js';
  3  | import LoginPageMethods from './login.page.js';
  4  | import { allure } from 'allure-playwright';
  5  | 
  6  | export default class HomePage extends LoginPageMethods {
  7  |   constructor(page) {
  8  |     super(page);
  9  |   }
  10 | 
  11 |     formatProduct(productName) 
  12 |     {
  13 |         return productName.toLowerCase().replaceAll(' ', '-');
  14 |     }
  15 | 
  16 |     getButton(productName, type) 
  17 |     {
  18 |         const formatted = this.formatProduct(productName);
  19 |         return this.page.locator(`[data-test="${type}-${formatted}"]`);
  20 |     }
  21 | 
  22 |     addToCart(productName) 
  23 |     {
  24 |         return this.getButton(productName, 'add-to-cart');
  25 |     }
  26 | 
  27 |     removeButton(productName) 
  28 |     {
  29 |      return this.getButton(productName, 'remove');
  30 |     }
  31 | 
  32 |     async clickAddToCart(productName) 
  33 |     {
  34 |         await allure.step(`Add product: ${productName}`, async () => 
  35 |             {
> 36 |             await this.addToCart(productName).click();
     |                                               ^ Error: locator.click: Target page, context or browser has been closed
  37 |             await expect(this.removeButton(productName)).toBeVisible();
  38 |             });
  39 |     }
  40 | 
  41 |     async clickRemove(productName) 
  42 |     {
  43 |         await allure.step(`Remove product: ${productName}`, async () => 
  44 |             { 
  45 |                 await this.removeButton(productName).click();
  46 |                 await expect(this.addToCart(productName)).toBeVisible();
  47 |             });
  48 |     }
  49 | 
  50 |     async getCartCount() 
  51 |     {
  52 |         const badge = this.page.locator(homePageLocators.cartBadge);
  53 |         if (await badge.count() === 0) 
  54 |             {
  55 |             console.log('Cart is empty');
  56 |             return 0;
  57 |             }
  58 |         const count = parseInt((await badge.innerText()).trim());
  59 |         console.log(`Cart count: ${count}`);
  60 |         return count;
  61 |     }
  62 | 
  63 |     async verifyCartCount(expectedCount) 
  64 |     {
  65 |         expect(await this.getCartCount()).toBe(expectedCount);
  66 |     }
  67 |   
  68 |      async verifyButtonState(productName, expectedText) 
  69 |     {
  70 |      const type = expectedText === 'Remove' ? 'remove' : 'add-to-cart';
  71 |      const button = this.getButton(productName, type);
  72 |         await expect(button).toBeVisible();
  73 |         await expect(button).toHaveText(expectedText);
  74 |     }
  75 | 
  76 |     async sortBy(optionText) 
  77 |     {
  78 |         await this.page.selectOption(homePageLocators.sortDropdown, 
  79 |             {
  80 |                 label: optionText
  81 |             });
  82 |     }
  83 | }
```