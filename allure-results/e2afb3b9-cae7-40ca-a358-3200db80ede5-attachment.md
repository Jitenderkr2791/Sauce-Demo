# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: TC_login.spec.js >> Swag Labs Login - BDD Style Tests >> REQ-LOGIN-002 Blank username
- Location: tests\TC_login.spec.js:26:5

# Error details

```
TypeError: loginPage.enterPassword(...).clickLoginButton is not a function
```

```
Error: locator.click: Test ended.
Call log:
  - waiting for locator('//input[@placeholder=\'Password\']')
    - locator resolved to <input value="" id="password" type="password" name="password" autocorrect="off" data-test="password" autocapitalize="none" placeholder="Password" class="input_error form_input"/>
  - attempting click action
    - waiting for element to be visible, enabled and stable

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
  1   | import { expect } from '@playwright/test';
  2   | 
  3   | class BasePage 
  4   | {
  5   |     constructor(page) {
  6   |         this.page = page;
  7   |     }
  8   | 
  9   |     /** ---------- Navigation ---------- **/
  10  |     async open(url) {
  11  |         await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  12  |     }
  13  | 
  14  |     async getTitle() {
  15  |         return this.page.title();
  16  |     }
  17  | 
  18  |     async getUrl() {
  19  |         return this.page.url();
  20  |     }
  21  | 
  22  |     async pause() {
  23  |         await this.page.pause();
  24  |     }
  25  | 
  26  |     async waitForPageLoad() {
  27  |         await this.page.waitForLoadState('domcontentloaded');
  28  |     }
  29  | 
  30  |     async wait(milliseconds = 3000) {
  31  |         await this.page.waitForTimeout(milliseconds);
  32  |     }
  33  | 
  34  |     /** ---------- Clicks & Typing ---------- **/
  35  | 
  36  |     async waitAndClick(selector) {
  37  |         const element = this.page.locator(selector);
  38  |         await element.waitFor({ state: 'visible', timeout: 15000 });
  39  |         await element.click();
  40  |     }
  41  | 
  42  |     async waitAndHardClick(selector) {
  43  |         const element = await this.page.$(selector);
  44  |         if (element) {
  45  |             await element.click();
  46  |         } else {
  47  |             throw new Error(`Element not found: ${selector}`);
  48  |         }
  49  |     }
  50  | 
  51  |     async waitAndFill(selector, text) 
  52  |     {
  53  |     const element = this.page.locator(selector);
  54  |     await element.waitFor({ state: 'visible', timeout: 30000 });
  55  |     await element.scrollIntoViewIfNeeded();
> 56  |     await element.click();
      |                   ^ Error: locator.click: Test ended.
  57  |     await element.fill(text);
  58  |     console.log(`Entered value: ${text}`);
  59  |     }
  60  | 
  61  |     async waitAndType(selector, text) 
  62  |     {
  63  |         await this.waitAndFill(selector, text);
  64  |     }
  65  | 
  66  |     async keyPress(selector, key) 
  67  |     {
  68  |         await this.page.locator(selector).press(key);
  69  |     }
  70  | 
  71  |     /** ---------- Dropdown ---------- **/
  72  | 
  73  | 
  74  |     /** ---------- Verifications ---------- **/
  75  |     async verifyElementText(selector, expectedText) 
  76  |     {
  77  |         const textValue = await this.page.textContent(selector);
  78  |         expect(textValue?.trim()).toBe(expectedText);
  79  |     }
  80  | 
  81  |     async verifyElementContainsText(selector, expectedText) 
  82  |     {
  83  |         const locator = this.page.locator(selector);
  84  |         await expect(locator).toContainText(expectedText);
  85  |     }
  86  | 
  87  |     async verifyJSElementValue(selector, expectedValue) 
  88  |     {
  89  |         const value = await this.page.$eval(selector, el => el.value);
  90  |         expect(value?.trim()).toBe(expectedValue);
  91  |     }
  92  | 
  93  |     async verifyElementAttribute(selector, attribute, expectedValue) 
  94  |     {
  95  |         const attrValue = await this.page.getAttribute(selector, attribute);
  96  |         expect(attrValue?.trim()).toBe(expectedValue);
  97  |     }
  98  | 
  99  |     /** ---------- Element State Checks ---------- **/
  100 | 
  101 |     async isElementVisible(selector, errorMessage = 'Element not visible') {
  102 |         const element = this.page.locator(selector);
  103 |         const isVisible = await element.isVisible();
  104 |         if (!isVisible) throw new Error(errorMessage);
  105 |         expect(isVisible).toBeTruthy();
  106 |     }
  107 | 
  108 |     async isElementNotVisible(selector) {
  109 |         await expect(this.page.locator(selector)).toBeHidden();
  110 |     }
  111 | 
  112 |     async isElementEnabled(selector, errorMessage = 'Element not enabled') {
  113 |         const element = this.page.locator(selector);
  114 |         const isEnabled = await element.isEnabled();
  115 |         if (!isEnabled) throw new Error(errorMessage);
  116 |         expect(isEnabled).toBeTruthy();
  117 |     }
  118 | 
  119 |     async isElementChecked(selector, errorMessage = 'Checkbox not checked') {
  120 |         const element = this.page.locator(selector);
  121 |         const isChecked = await element.isChecked();
  122 |         if (!isChecked) throw new Error(errorMessage);
  123 |         expect(isChecked).toBeTruthy();
  124 |     }
  125 | 
  126 |     /** ---------- Lists / Collections ---------- **/
  127 | 
  128 |     async getFirstElementFromTheList(selector) {
  129 |         const rows = this.page.locator(selector);
  130 |         const count = await rows.count();
  131 |         if (count === 0) throw new Error('No elements found');
  132 |         return (await rows.nth(0).textContent())?.trim();
  133 |     }
  134 | 
  135 |     async getLastElementFromTheList(selector) {
  136 |         const rows = this.page.locator(selector);
  137 |         const count = await rows.count();
  138 |         if (count === 0) throw new Error('No elements found');
  139 |         return (await rows.nth(count - 1).textContent())?.trim();
  140 |     }
  141 | 
  142 |     async clickAllElements(selector) {
  143 |         const rows = this.page.locator(selector);
  144 |         const count = await rows.count();
  145 |         for (let i = 0; i < count; i++) {
  146 |             await rows.nth(i).click();
  147 |         }
  148 |     }
  149 | 
  150 |     async clickAllLinksInNewTabs(selector) {
  151 |         const rows = this.page.locator(selector);
  152 |         const count = await rows.count();
  153 |         for (let i = 0; i < count; i++) {
  154 |             await rows.nth(i).click({ modifiers: ['Control', 'Shift'] });
  155 |         }
  156 |     }
```