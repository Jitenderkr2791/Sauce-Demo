# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: TC_PDP.spec.js >> PDP Tests - Single Login Session >> REQ-PDP-003: Product card redirects to PDP
- Location: tests\TC_PDP.spec.js:47:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for locator('#back-to-products')

```

# Test source

```ts
  1  | import { expect } from '@playwright/test';
  2  | import BasePage from './base.page.js';
  3  | import pdpPageLocators from '../pageobjects/pdpPageLocators.js';
  4  | import { allure } from 'allure-playwright';
  5  | 
  6  | export default class PDPPage extends BasePage 
  7  | {
  8  | 
  9  |   constructor(page) 
  10 |   {
  11 |     super(page);
  12 |     this.page = page;
  13 |   }
  14 | 
  15 |   async clickProductName(productName) 
  16 |   {
  17 |     await this.page.locator('.inventory_item_name', { hasText: productName }).click();
  18 |   }
  19 | 
  20 |   async clickProductImage(productName)
  21 |    {
  22 |     const productCard = this.page.locator('.inventory_item').filter({ hasText: productName });
  23 |     await productCard.locator('img').click();
  24 |    }
  25 | 
  26 |   async clickProductCard(productName) 
  27 |   {
  28 |     const productCard = this.page.locator('.inventory_item').filter({ hasText: productName });
  29 |     await productCard.click();
  30 |   }
  31 | 
  32 |   async verifyProductTitle(productName) 
  33 |   {
  34 |     await expect(this.page.locator(pdpPageLocators.productTitle)).toHaveText(productName);
  35 |   }
  36 | 
  37 |   async verifyProductImageVisible() 
  38 |   {
  39 |     await expect(this.page.locator(pdpPageLocators.productImage)).toBeVisible();
  40 |   }
  41 | 
  42 |   async verifyProductDescriptionVisible()
  43 |    {
  44 |     await expect(this.page.locator(pdpPageLocators.productDescription)).toBeVisible();
  45 |   }
  46 | 
  47 |   async verifyPDPLoaded(productName) 
  48 |   {
  49 |     await allure.step(`Verify PDP for ${productName}`, async () => {
  50 |       await this.verifyProductTitle(productName);
  51 |       await this.verifyProductImageVisible();
  52 |       await this.verifyProductDescriptionVisible();
  53 |     });
  54 |   }
  55 | 
  56 |   async clickBackToProducts() 
  57 |   {
> 58 |     await this.page.locator(pdpPageLocators.backToProductsBtn).click();
     |                                                                ^ Error: locator.click: Target page, context or browser has been closed
  59 |   }
  60 | 
  61 |   async verifyProductsPage() 
  62 |   {
  63 |     await expect(this.page).toHaveURL(/inventory/);
  64 |     await expect(this.page.locator('.inventory_list')).toBeVisible();
  65 |   }
  66 | }
```