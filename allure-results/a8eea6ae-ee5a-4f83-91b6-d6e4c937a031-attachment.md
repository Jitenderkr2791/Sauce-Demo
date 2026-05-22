# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: TC_PDP.spec.js >> PDP Tests - Single Login Session >> REQ-PDP-001: Product label redirects to PDP
- Location: tests\TC_PDP.spec.js:43:3

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator: locator('//div[@class=\'inventory_item_name\']')
Expected: "Sauce Labs Backpack"
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 5000ms
  - waiting for locator('//div[@class=\'inventory_item_name\']')

```

```yaml
- button "Open Menu"
- img "Open Menu"
- text: Swag Labs
- button "Go back Back to products":
  - img "Go back"
  - text: Back to products
- img "Sauce Labs Backpack"
- text: Sauce Labs Backpack carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection. $29.99
- button "Add to cart"
- contentinfo:
  - list:
    - listitem:
      - link "Twitter":
        - /url: https://twitter.com/saucelabs
    - listitem:
      - link "Facebook":
        - /url: https://www.facebook.com/saucelabs
    - listitem:
      - link "LinkedIn":
        - /url: https://www.linkedin.com/company/sauce-labs/
  - text: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
```

# Test source

```ts
  1  | import { expect } from '@playwright/test';
  2  | import BasePage from './base.page.js';
  3  | import pdpPageLocators from '../pageobjects/pdpPageLocators.js';
  4  | import { allure } from 'allure-playwright';
  5  | 
  6  | export default class PDPPage extends BasePage {
  7  | 
  8  |   constructor(page) {
  9  |     super(page);
  10 |     this.page = page;
  11 |   }
  12 | 
  13 |   // ---------- Navigation Methods ----------
  14 | 
  15 |   async clickProductName(productName) {
  16 |     await this.page
  17 |       .locator('.inventory_item_name', { hasText: productName })
  18 |       .click();
  19 |   }
  20 | 
  21 |   async clickProductImage(productName) {
  22 |     const productCard = this.page
  23 |       .locator('.inventory_item')
  24 |       .filter({ hasText: productName });
  25 | 
  26 |     await productCard.locator('img').click();
  27 |   }
  28 | 
  29 |   async clickProductCard(productName) {
  30 |     const productCard = this.page
  31 |       .locator('.inventory_item')
  32 |       .filter({ hasText: productName });
  33 | 
  34 |     await productCard.click();
  35 |   }
  36 | 
  37 |   // ---------- PDP Validations ----------
  38 | 
  39 |   async verifyProductTitle(productName) {
  40 |     await expect(
  41 |       this.page.locator(pdpPageLocators.productTitle)
> 42 |     ).toHaveText(productName);
     |       ^ Error: expect(locator).toHaveText(expected) failed
  43 |   }
  44 | 
  45 |   async verifyProductImageVisible() {
  46 |     await expect(
  47 |       this.page.locator(pdpPageLocators.productImage)
  48 |     ).toBeVisible();
  49 |   }
  50 | 
  51 |   async verifyProductDescriptionVisible() {
  52 |     await expect(
  53 |       this.page.locator(pdpPageLocators.productDescription)
  54 |     ).toBeVisible();
  55 |   }
  56 | 
  57 |   async verifyPDPLoaded(productName) {
  58 |     await allure.step(`Verify PDP for ${productName}`, async () => {
  59 |       await this.verifyProductTitle(productName);
  60 |       await this.verifyProductImageVisible();
  61 |       await this.verifyProductDescriptionVisible();
  62 |     });
  63 |   }
  64 | 
  65 |   // ---------- Back Navigation ----------
  66 | 
  67 |   async clickBackToProducts() {
  68 |     await this.page.locator(
  69 |       pdpPageLocators.backToProductsBtn
  70 |     ).click();
  71 |   }
  72 | 
  73 |   async verifyProductsPage() {
  74 |     await expect(this.page).toHaveURL(/inventory/);
  75 | 
  76 |     await expect(
  77 |       this.page.locator('.inventory_list')
  78 |     ).toBeVisible();
  79 |   }
  80 | }
```