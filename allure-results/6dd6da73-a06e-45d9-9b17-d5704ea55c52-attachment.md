# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: TC_login.spec.js >> Swag Labs Login - BDD Style Tests >> REQ-LOGIN-009 Products page validation
- Location: tests\TC_login.spec.js:70:5

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator: locator('//div[@class=\'title\']')
Expected: "Products"
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 5000ms
  - waiting for locator('//div[@class=\'title\']')

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
  1  | import { test, expect } from '@playwright/test';
  2  | import LoginPageMethods from '../pages/login.page.js';
  3  | import { TEST_DATA } from '../test-data/testData.js';
  4  | import loginPageLocators from '../pageobjects/loginPageLocators.js';
  5  | import homePageLocators from '../pageObjects/homePageLocators.js';
  6  | 
  7  | test.describe('Swag Labs Login - BDD Style Tests', () => {
  8  | 
  9  |   let loginPage;
  10 | 
  11 |   test.beforeEach(async ({ page }) => 
  12 |     {
  13 |       loginPage = new LoginPageMethods(page);
  14 |       await test.step('Given User is on Swag Labs login page', async () => {
  15 |       await loginPage.navigate();
  16 |       });
  17 |    });
  18 | 
  19 | 
  20 |     test('REQ-LOGIN-001 @smoke should login successfully with valid credentials', async ({ page }) => {
  21 |       await loginPage.login(TEST_DATA.USERS.STANDARD.username,TEST_DATA.USERS.STANDARD.password);
  22 |       await expect(page).toHaveURL(/inventory/);
  23 |     });
  24 | 
  25 | 
  26 |     test('REQ-LOGIN-002 Blank username', async () => {
  27 |       await loginPage.enterPassword(TEST_DATA.USERS.STANDARD.password).clickLoginButton();
  28 |       expect(error).toContain(TEST_DATA.ERRORS.USERNAME_REQUIRED);
  29 |     });
  30 | 
  31 | 
  32 |     test('REQ-LOGIN-003 Blank password', async () => {
  33 |       await loginPage.enterUsername(TEST_DATA.USERS.STANDARD.username).clickLoginButton();
  34 |       expect(error).toContain(TEST_DATA.ERRORS.PASSWORD_REQUIRED);
  35 |     });
  36 | 
  37 | 
  38 |     test('REQ-LOGIN-004 Both fields blank', async () => {
  39 |       await loginPage.clickLoginButton();
  40 |       expect(error).toContain(TEST_DATA.ERRORS.USERNAME_REQUIRED);
  41 |     });
  42 | 
  43 | 
  44 |     test('REQ-LOGIN-005 Invalid password', async () => {
  45 |       await loginPage.login(TEST_DATA.USERS.STANDARD.username,TEST_DATA.USERS.INVALID.password);
  46 |       expect(error).toContain(TEST_DATA.ERRORS.INVALID_CREDENTIALS);
  47 |     });
  48 | 
  49 | 
  50 |     test('REQ-LOGIN-006 Invalid username', async () => {
  51 |       await loginPage.login(TEST_DATA.USERS.INVALID.username,TEST_DATA.USERS.STANDARD.password);
  52 |       expect(error).toContain(TEST_DATA.ERRORS.INVALID_CREDENTIALS);
  53 |     });
  54 | 
  55 | 
  56 |     test('REQ-LOGIN-007 Password masking', async ({ page }) => {
  57 |       await page.locator(loginPageLocators.passwordInput).fill(TEST_DATA.USERS.STANDARD.password);
  58 |       await expect(page.locator(loginPageLocators.passwordInput)).toHaveAttribute('type', 'password');
  59 |     });
  60 | 
  61 | 
  62 |     test('REQ-LOGIN-008 Logout', async ({ page }) => {
  63 |       await loginPage.login(TEST_DATA.USERS.STANDARD.username,TEST_DATA.USERS.STANDARD.password);
  64 |       await page.locator(homePageLocators.hamburgerMenu).click();
  65 |       await page.locator(homePageLocators.logoutButton).click();
  66 |       await expect(page).toHaveURL(TEST_DATA.URL);
  67 |     });
  68 | 
  69 | 
  70 |     test('REQ-LOGIN-009 Products page validation', async ({ page }) => {
  71 |       await loginPage.login(TEST_DATA.USERS.STANDARD.username,TEST_DATA.USERS.STANDARD.password);
> 72 |       await expect(page.locator(loginPageLocators.title)).toHaveText('Products');
     |                                                           ^ Error: expect(locator).toHaveText(expected) failed
  73 |       await expect(page.locator(loginPageLocators.inventoryItem)).toHaveCount(6);
  74 |     });
  75 | 
  76 | 
  77 |     test('REQ-LOGIN-010 Case-sensitive login', async () => {
  78 |       await loginPage.login(TEST_DATA.USERS.WRONG_CASE.username,TEST_DATA.USERS.WRONG_CASE.password);
  79 |       await loginPage.assertError(TEST_DATA.ERRORS.INVALID_CREDENTIALS);
  80 |     });
  81 | 
  82 | 
  83 | });
```