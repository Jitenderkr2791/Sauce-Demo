# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: TC_Cart.spec.js >> Cart Tests - Single Login Session >> REQ-CART-007: Remove button state change
- Location: tests\TC_Cart.spec.js:73:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for locator('[data-test="remove-sauce-labs-backpack"]')

```

# Test source

```ts
  1  | import { expect } from '@playwright/test';
  2  | import homePageLocators from '../pageobjects/homePageLocators.js';
  3  | import LoginPageMethods from './login.page.js';
  4  | import { allure } from 'allure-playwright';
  5  | 
  6  | export default class HomePage extends LoginPageMethods 
  7  | {
  8  |     constructor(page) 
  9  |     {
  10 |         super(page);
  11 |     }
  12 | 
  13 |     formatProduct(productName) 
  14 |     {
  15 |         return productName.toLowerCase().replaceAll(' ', '-');
  16 |     }
  17 | 
  18 |     getButton(productName, type) 
  19 |     {
  20 |         const formatted = this.formatProduct(productName);
  21 |         return this.page.locator(`[data-test="${type}-${formatted}"]`);
  22 |     }
  23 | 
  24 |     addToCart(productName) 
  25 |     {
  26 |         return this.getButton(productName, 'add-to-cart');
  27 |     }
  28 | 
  29 |     removeButton(productName) 
  30 |     {
  31 |      return this.getButton(productName, 'remove');
  32 |     }
  33 | 
  34 |     async clickAddToCart(productName) 
  35 |     {
  36 |         await allure.step(`Add product: ${productName}`, async () => {
  37 |         await this.addToCart(productName).click();
  38 |         await expect(this.removeButton(productName)).toBeVisible();
  39 |         });
  40 |     }
  41 | 
  42 |     async clickRemove(productName) 
  43 |     {
  44 |         await allure.step(`Remove product: ${productName}`, async () => { 
> 45 |         await this.removeButton(productName).click();
     |                                              ^ Error: locator.click: Target page, context or browser has been closed
  46 |         await expect(this.addToCart(productName)).toBeVisible();
  47 |         });
  48 |     }
  49 | 
  50 |     async getCartCount() 
  51 |     {
  52 |         const badge = this.page.locator(homePageLocators.cartBadge);
  53 |         if (await badge.count() === 0) 
  54 |             {
  55 |                 console.log('Cart is empty');
  56 |                 return 0;
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
  68 |     async verifyButtonState(productName, expectedText) 
  69 |     {
  70 |         const type = expectedText === 'Remove' ? 'remove' : 'add-to-cart';
  71 |         const button = this.getButton(productName, type);
  72 |         await expect(button).toBeVisible();
  73 |         await expect(button).toHaveText(expectedText);
  74 |     }
  75 | 
  76 |     async sortBy(optionText) 
  77 |     {
  78 |         await this.page.selectOption(homePageLocators.sortDropdown, {label: optionText});
  79 |     }
  80 | }
```