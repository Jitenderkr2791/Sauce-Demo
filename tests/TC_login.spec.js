import { test, expect } from '@playwright/test';
import LoginPageMethods from '../pages/login.page.js';
import { TEST_DATA } from '../test-data/testData.js';

test.describe('Swag Labs Login - BDD Style Tests', () => {

  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPageMethods(page);
    await test.step('Given User is on Swag Labs login page', async () => {
    await loginPage.navigate();
    });
  });

  // REQ-LOGIN-001
  test('REQ-LOGIN-001 @smoke should login successfully with valid credentials', async ({ page }) => {
    await loginPage.login(TEST_DATA.USERS.STANDARD.username,TEST_DATA.USERS.STANDARD.password);
    await expect(page).toHaveURL(/inventory/);
  });


  // REQ-LOGIN-002
  test('REQ-LOGIN-002 Blank username', async () => {
    await loginPage.enterPassword(TEST_DATA.USERS.STANDARD.password);
    await loginPage.clickLoginButton();
    const error = await loginPage.getErrorMessage();
    expect(error).toContain(TEST_DATA.ERRORS.USERNAME_REQUIRED);
  });


  // REQ-LOGIN-003
  test('REQ-LOGIN-003 Blank password', async () => {
    await loginPage.enterUsername(TEST_DATA.USERS.STANDARD.username);
    await loginPage.clickLoginButton();
    const error = await loginPage.getErrorMessage();
    expect(error).toContain(TEST_DATA.ERRORS.PASSWORD_REQUIRED);
  });


  // REQ-LOGIN-004
  test('REQ-LOGIN-004 Both fields blank', async () => {
    await loginPage.clickLoginButton();
    const error = await loginPage.getErrorMessage();
    expect(error).toContain(TEST_DATA.ERRORS.USERNAME_REQUIRED);
  });


  // REQ-LOGIN-005
  test('REQ-LOGIN-005 Invalid password', async () => {
    await loginPage.login(TEST_DATA.USERS.STANDARD.username,TEST_DATA.USERS.INVALID.password);
    const error = await loginPage.getErrorMessage();
    expect(error).toContain(TEST_DATA.ERRORS.INVALID_CREDENTIALS);
  });


  // REQ-LOGIN-006
  test('REQ-LOGIN-006 Invalid username', async () => {
    await loginPage.login(TEST_DATA.USERS.INVALID.username,TEST_DATA.USERS.STANDARD.password);
    const error = await loginPage.getErrorMessage();
    expect(error).toContain(TEST_DATA.ERRORS.INVALID_CREDENTIALS);
  });


  // REQ-LOGIN-007
  test('REQ-LOGIN-007 Password masking', async ({ page }) => {
    const passwordField = page.locator('//input[@placeholder="Password"]');
    await passwordField.fill(TEST_DATA.USERS.STANDARD.password);
    await expect(passwordField).toHaveAttribute('type', 'password');
  });


  // REQ-LOGIN-008
  test('REQ-LOGIN-008 Logout', async ({ page }) => {
    await loginPage.login(TEST_DATA.USERS.STANDARD.username,TEST_DATA.USERS.STANDARD.password);
    await page.locator('#react-burger-menu-btn').click();
    await page.locator('#logout_sidebar_link').click();
    await expect(page).toHaveURL(TEST_DATA.URL);
  });


  // REQ-LOGIN-009
  test('REQ-LOGIN-009 Products page validation', async ({ page }) => {
    await loginPage.login(TEST_DATA.USERS.STANDARD.username,TEST_DATA.USERS.STANDARD.password);
    await expect(page.locator('.title')).toHaveText('Products');
    await expect(page.locator('.inventory_item')).toHaveCount(6);
  });


  // REQ-LOGIN-010
  test('REQ-LOGIN-010 Case-sensitive login', async () => {
    await loginPage.login(TEST_DATA.USERS.WRONG_CASE.username,TEST_DATA.USERS.WRONG_CASE.password);
    const error = await loginPage.getErrorMessage();
    expect(error).toContain(TEST_DATA.ERRORS.INVALID_CREDENTIALS);
  });

});