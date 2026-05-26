import { test, expect } from '@playwright/test';
import LoginPageMethods from '../pages/login.page.js';
import { TEST_DATA } from '../test-data/testData.js';
import loginPageLocators from '../pageobjects/loginPageLocators.js';
import homePageLocators from '../pageObjects/homePageLocators.js';

test.describe('Swag Labs Login - BDD Style Tests', () => {

  let loginPage;

  test.beforeEach(async ({ page }) => 
    {
      loginPage = new LoginPageMethods(page);
      await test.step('Given User is on Swag Labs login page', async () => {
      await loginPage.navigate();
      });
   });

    test('REQ-LOGIN-001 @smoke should login successfully with valid credentials', async ({ page }) => {
      await loginPage.login(TEST_DATA.USERS.STANDARD.username,TEST_DATA.USERS.STANDARD.password);
      await expect(page).toHaveURL(/inventory/);
    });


    test('REQ-LOGIN-002 Blank username', async () => {
      await loginPage.enterPassword(TEST_DATA.USERS.STANDARD.password);
      await loginPage.clickLoginButton();
      await loginPage.verifyErrorMessage(TEST_DATA.ERRORS.USERNAME_REQUIRED);
    });


    test('REQ-LOGIN-003 Blank password', async () => {
      await loginPage.enterUsername(TEST_DATA.USERS.STANDARD.username);
      await loginPage.clickLoginButton();
      await loginPage.verifyErrorMessage(TEST_DATA.ERRORS.PASSWORD_REQUIRED);
    });


    test('REQ-LOGIN-004 Both fields blank', async () => {
      await loginPage.clickLoginButton();
      await loginPage.verifyErrorMessage(TEST_DATA.ERRORS.USERNAME_REQUIRED);
    });


    test('REQ-LOGIN-005 Invalid password', async () => {
      await loginPage.login(TEST_DATA.USERS.STANDARD.username,TEST_DATA.USERS.INVALID.password);
      await loginPage.verifyErrorMessage(TEST_DATA.ERRORS.INVALID_CREDENTIALS);
    });


    test('REQ-LOGIN-006 Invalid username', async () => {
      await loginPage.login(TEST_DATA.USERS.INVALID.username,TEST_DATA.USERS.STANDARD.password);
     await loginPage.verifyErrorMessage(TEST_DATA.ERRORS.INVALID_CREDENTIALS);
    });


    test('REQ-LOGIN-007 Password masking', async ({ page }) => {
      await page.locator(loginPageLocators.passwordInput).fill(TEST_DATA.USERS.STANDARD.password);
      await expect(page.locator(loginPageLocators.passwordInput)).toHaveAttribute('type', 'password');
    });


    test('REQ-LOGIN-008 Logout', async ({ page }) => {
      await loginPage.login(TEST_DATA.USERS.STANDARD.username,TEST_DATA.USERS.STANDARD.password);
      await page.locator(homePageLocators.hamburgerMenu).click();
      await page.locator(homePageLocators.logoutButton).click();
      await expect(page).toHaveURL(TEST_DATA.URL);
    });


    test('REQ-LOGIN-009 Products page validation', async ({ page }) => {
      await loginPage.login(TEST_DATA.USERS.STANDARD.username,TEST_DATA.USERS.STANDARD.password);
      await expect(page.locator(loginPageLocators.title)).toHaveText('Products');
      await expect(page.locator(loginPageLocators.inventoryItem)).toHaveCount(6);
    });


    test('REQ-LOGIN-010 Case-sensitive login', async () => {
      await loginPage.login(TEST_DATA.USERS.WRONG_CASE.username,TEST_DATA.USERS.WRONG_CASE.password);
      await loginPage.verifyErrorMessage(TEST_DATA.ERRORS.INVALID_CREDENTIALS);
    });


});