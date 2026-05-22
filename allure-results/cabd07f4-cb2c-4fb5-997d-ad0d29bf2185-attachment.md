# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: TC_login.spec.js >> Swag Labs Login - BDD Style Tests >> REQ-LOGIN-004 Both fields blank
- Location: tests\TC_login.spec.js:40:5

# Error details

```
TypeError: this.getErrorMessage is not a function
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]: Swag Labs
  - generic [ref=e5]:
    - generic [ref=e9]:
      - generic [ref=e10]:
        - textbox "Username" [ref=e11]
        - img [ref=e12]
      - generic [ref=e14]:
        - textbox "Password" [ref=e15]
        - img [ref=e16]
      - 'heading "Epic sadface: Username is required" [level=3] [ref=e19]':
        - button [ref=e20] [cursor=pointer]:
          - img [ref=e21]
        - text: "Epic sadface: Username is required"
      - button "Login" [active] [ref=e23] [cursor=pointer]
    - generic [ref=e25]:
      - generic [ref=e26]:
        - heading "Accepted usernames are:" [level=4] [ref=e27]
        - text: standard_user
        - text: locked_out_user
        - text: problem_user
        - text: performance_glitch_user
        - text: error_user
        - text: visual_user
      - generic [ref=e28]:
        - heading "Password for all users:" [level=4] [ref=e29]
        - text: secret_sauce
```

# Test source

```ts
  1  | import loginPageLocators from '../pageobjects/loginPageLocators.js';
  2  | import BasePage from './base.page.js';
  3  | import { expect } from '@playwright/test';
  4  | 
  5  | export default class LoginPageMethods extends BasePage 
  6  | {
  7  |     constructor(page)
  8  |     {
  9  |         super(page);
  10 |     }
  11 | 
  12 |     async navigate() 
  13 |     {
  14 |         await this.page.goto('/');
  15 |     }
  16 | 
  17 |     async enterUsername(username)
  18 |     {
  19 |         await this.waitAndType(loginPageLocators.userNameInput, username);
  20 |     }
  21 | 
  22 |     async enterPassword(password) 
  23 |     {
  24 |         await this.waitAndType(loginPageLocators.passwordInput, password);
  25 |         return this;
  26 |     }
  27 | 
  28 |     async clickLoginButton()
  29 |     {
  30 |         await this.waitAndClick(loginPageLocators.loginButton);
  31 |     }
  32 | 
  33 |     async login(username, password) 
  34 |     { 
  35 |         await this.enterUsername(username);
  36 |         await this.enterPassword(password);
  37 |         await this.clickLoginButton();
  38 |     }
  39 | 
  40 |     async verifyLogoVisible()
  41 |     {
  42 |         await expect(this.page.locator(loginPageLocators.logo)).toBeVisible();
  43 |     }
  44 | 
  45 |     /*async getErrorMessage() 
  46 |     {
  47 |         const error = this.page.locator(loginPageLocators.errorMessage);
  48 |         await error.waitFor({ state: 'visible' });
  49 |         const errorText = (await error.textContent())?.trim() || '';
  50 |         console.log('Error Message:', errorText);
  51 |         return errorText;
  52 |     }*/
  53 | 
  54 |     async assertError(expectedMessage) 
  55 |     {
> 56 |         const error = await this.getErrorMessage();
     |                                  ^ TypeError: this.getErrorMessage is not a function
  57 |         expect(error).toContain(expectedMessage);
  58 |     }
  59 | }
  60 | 
```