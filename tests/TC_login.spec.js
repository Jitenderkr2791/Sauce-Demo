import { test, expect } from '../fixtures/baseTest.js';
import { TEST_DATA } from '../test-data/testData.js';
import loginPageLocators from '../pageobjects/loginPageLocators.js';
import homePageLocators from '../pageObjects/homePageLocators.js';

test.describe('Swag Labs Login Tests', () => {

    test('REQ-LOGIN-001 @smoke should login successfully with valid credentials', async ({loggedInPage}) => {
      await expect(loggedInPage).toHaveURL(/inventory/);
    });

    test('REQ-LOGIN-002 Blank username', async ({loginPage}) => {
      await loginPage.enterPassword(TEST_DATA.USERS.STANDARD.password);
      await loginPage.clickLoginButton();
      await loginPage.verifyErrorMessage(TEST_DATA.ERRORS.USERNAME_REQUIRED);
    });


    test('REQ-LOGIN-003 Blank password', async ({loginPage}) => {
      await loginPage.enterUsername(TEST_DATA.USERS.STANDARD.username);
      await loginPage.clickLoginButton();
      await loginPage.verifyErrorMessage(TEST_DATA.ERRORS.PASSWORD_REQUIRED);
    });


    test('REQ-LOGIN-004 Both fields blank', async ({loginPage}) => {
      await loginPage.clickLoginButton();
      await loginPage.verifyErrorMessage(TEST_DATA.ERRORS.USERNAME_REQUIRED);
    });


    test('REQ-LOGIN-005 Invalid password', async ({loginPage}) => {
      await loginPage.login(TEST_DATA.USERS.STANDARD.username,TEST_DATA.USERS.INVALID.password);
      await loginPage.verifyErrorMessage(TEST_DATA.ERRORS.INVALID_CREDENTIALS);
    });


    test('REQ-LOGIN-006 Invalid username', async ({loginPage}) => {
      await loginPage.login(TEST_DATA.USERS.INVALID.username,TEST_DATA.USERS.STANDARD.password);
     await loginPage.verifyErrorMessage(TEST_DATA.ERRORS.INVALID_CREDENTIALS);
    });


    test('REQ-LOGIN-007 Password masking', async ({ page, loginPage }) => {
      await page.locator(loginPageLocators.passwordInput).fill(TEST_DATA.USERS.STANDARD.password);
      await expect(page.locator(loginPageLocators.passwordInput)).toHaveAttribute('type', 'password');
    });


    test('REQ-LOGIN-008 Logout', async ({ page, loginPage }) => {
      await loginPage.login(TEST_DATA.USERS.STANDARD.username,TEST_DATA.USERS.STANDARD.password);
      await page.locator(homePageLocators.hamburgerMenu).click();
      await page.locator(homePageLocators.logoutButton).click();
      await expect(page).toHaveURL(TEST_DATA.URL);
    });


    test('REQ-LOGIN-009 Products page validation', async ({ page, loginPage }) => {
      await loginPage.login(TEST_DATA.USERS.STANDARD.username,TEST_DATA.USERS.STANDARD.password);
      await expect(page.locator(loginPageLocators.title)).toHaveText('Products');
      await expect(page.locator(loginPageLocators.inventoryItem)).toHaveCount(6);
    });


    test('REQ-LOGIN-010 Case-sensitive login', async ({ loginPage }) => {
      await loginPage.login(TEST_DATA.USERS.WRONG_CASE.username,TEST_DATA.USERS.WRONG_CASE.password);
      await loginPage.verifyErrorMessage(TEST_DATA.ERRORS.INVALID_CREDENTIALS);
    });
});