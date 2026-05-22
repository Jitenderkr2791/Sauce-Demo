# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: TC_Cart.spec.js >> Cart Tests - Single Login Session >> REQ-CART-001: Add single product to cart
- Location: tests\TC_Cart.spec.js:28:5

# Error details

```
ReferenceError: LoginPageMethods is not defined
```

# Test source

```ts
  1  | export const TEST_DATA = {
  2  |   URL: '/',
  3  |   
  4  |   USERS: {
  5  |     STANDARD: {
  6  |       username: 'standard_user',
  7  |       password: 'secret_sauce'
  8  |     },
  9  |     INVALID: {
  10 |       username: 'invalid_user',
  11 |       password: 'wrong_password'
  12 |     },
  13 |     WRONG_CASE: {
  14 |       username: 'Standard_User',
  15 |       password: 'Secret_Sauce'
  16 |     }
  17 |   },
  18 | 
  19 |   ERRORS: {
  20 |     USERNAME_REQUIRED: 'Username is required',
  21 |     PASSWORD_REQUIRED: 'Password is required',
  22 |     INVALID_CREDENTIALS: 'Username and password do not match'
  23 |   },
  24 | 
  25 |   Product: {
  26 |     Product: 'Sauce Labs Backpack',
  27 |     Product2: 'Sauce Labs Bike Light'
  28 |   }
  29 | }
  30 | 
  31 | export async function createLoggedInSession(browser) 
  32 | {
  33 |     const context = await browser.newContext();
  34 |     const page = await context.newPage();
  35 | 
> 36 |     const loginPage = new LoginPageMethods(page);
     |                       ^ ReferenceError: LoginPageMethods is not defined
  37 |     await loginPage.navigate();
  38 |     await loginPage.login(
  39 |         TEST_DATA.USERS.STANDARD.username,
  40 |         TEST_DATA.USERS.STANDARD.password
  41 |     );
  42 | 
  43 |     await expect(page).toHaveURL(/inventory/);
  44 | 
  45 |     const home = new HomePage(page);
  46 | 
  47 |     return { context, page, home };
  48 | }
```