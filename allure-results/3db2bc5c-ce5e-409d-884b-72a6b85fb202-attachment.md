# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: TC_login.spec.js >> Swag Labs Login - BDD Style Tests >> REQ-LOGIN-007 Password masking
- Location: tests\TC_login.spec.js:56:5

# Error details

```
TypeError: loginPageLocators.passwordInput.fill is not a function
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]: Swag Labs
  - generic [ref=e5]:
    - generic [ref=e9]:
      - textbox "Username" [ref=e11]
      - textbox "Password" [ref=e13]
      - button "Login" [ref=e15] [cursor=pointer]
    - generic [ref=e17]:
      - generic [ref=e18]:
        - heading "Accepted usernames are:" [level=4] [ref=e19]
        - text: standard_user
        - text: locked_out_user
        - text: problem_user
        - text: performance_glitch_user
        - text: error_user
        - text: visual_user
      - generic [ref=e20]:
        - heading "Password for all users:" [level=4] [ref=e21]
        - text: secret_sauce
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
> 57 |       await loginPageLocators.passwordInput.fill(TEST_DATA.USERS.STANDARD.password);
     |                                             ^ TypeError: loginPageLocators.passwordInput.fill is not a function
  58 |       await expect(loginPageLocators.passwordInput).toHaveAttribute('type', 'password');
  59 |     });
  60 | 
  61 | 
  62 |     test('REQ-LOGIN-008 Logout', async ({ page }) => {
  63 |       await loginPage.login(TEST_DATA.USERS.STANDARD.username,TEST_DATA.USERS.STANDARD.password);
  64 |       await homePageLocators.hamburgerMenu.click();
  65 |       await homePageLocators.logoutButton.click();
  66 |       await expect(page).toHaveURL(TEST_DATA.URL);
  67 |     });
  68 | 
  69 | 
  70 |     test('REQ-LOGIN-009 Products page validation', async ({ page }) => {
  71 |       await loginPage.login(TEST_DATA.USERS.STANDARD.username,TEST_DATA.USERS.STANDARD.password);
  72 |       await expect(loginPageLocators.title).toHaveText('Products');
  73 |       await expect(loginPageLocators.inventoryItem).toHaveCount(6);
  74 |     });
  75 | 
  76 | 
  77 |     test('REQ-LOGIN-010 Case-sensitive login', async () => {
  78 |       await loginPage.login(TEST_DATA.USERS.WRONG_CASE.username,TEST_DATA.USERS.WRONG_CASE.password);
  79 |       expect(error).toContain(TEST_DATA.ERRORS.INVALID_CREDENTIALS);
  80 |     });
  81 | 
  82 | 
  83 | });
```