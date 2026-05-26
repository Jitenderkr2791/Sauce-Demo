# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: TC_PDP.spec.js >> PDP Tests - Single Login Session >> REQ-PDP-003: Product card redirects to PDP
- Location: tests\TC_PDP.spec.js:47:3

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator: locator('.inventory_details_name')
Expected: "Sauce Labs Backpack"
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for locator('.inventory_details_name')

```

```yaml
- button "Open Menu"
- img "Open Menu"
- text: Swag Labs Products Name (A to Z)
- combobox:
  - option "Name (A to Z)" [selected]
  - option "Name (Z to A)"
  - option "Price (low to high)"
  - option "Price (high to low)"
- link "Sauce Labs Backpack":
  - /url: "#"
  - img "Sauce Labs Backpack"
- link "Sauce Labs Backpack":
  - /url: "#"
- text: carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection. $29.99
- button "Add to cart"
- link "Sauce Labs Bike Light":
  - /url: "#"
  - img "Sauce Labs Bike Light"
- link "Sauce Labs Bike Light":
  - /url: "#"
- text: A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included. $9.99
- button "Add to cart"
- link "Sauce Labs Bolt T-Shirt":
  - /url: "#"
  - img "Sauce Labs Bolt T-Shirt"
- link "Sauce Labs Bolt T-Shirt":
  - /url: "#"
- text: Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt. $15.99
- button "Add to cart"
- link "Sauce Labs Fleece Jacket":
  - /url: "#"
  - img "Sauce Labs Fleece Jacket"
- link "Sauce Labs Fleece Jacket":
  - /url: "#"
- text: It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office. $49.99
- button "Add to cart"
- link "Sauce Labs Onesie":
  - /url: "#"
  - img "Sauce Labs Onesie"
- link "Sauce Labs Onesie":
  - /url: "#"
- text: Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel. $7.99
- button "Add to cart"
- link "Test.allTheThings() T-Shirt (Red)":
  - /url: "#"
  - img "Test.allTheThings() T-Shirt (Red)"
- link "Test.allTheThings() T-Shirt (Red)":
  - /url: "#"
- text: This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton. $15.99
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
> 34 |     await expect(this.page.locator(pdpPageLocators.productTitle)).toHaveText(productName);
     |                                                                   ^ Error: expect(locator).toHaveText(expected) failed
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
  58 |     await this.page.locator(pdpPageLocators.backToProductsBtn).click();
  59 |   }
  60 | 
  61 |   async verifyProductsPage() 
  62 |   {
  63 |     await expect(this.page).toHaveURL(/inventory/);
  64 |     await expect(this.page.locator('.inventory_list')).toBeVisible();
  65 |   }
  66 | }
```