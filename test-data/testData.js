import LoginPageMethods from '../pages/login.page.js';
import { expect } from '@playwright/test';
import HomePage from '../pages/home.page.js';

  export const TEST_DATA = {
    URL: '/',
    
    USERS: {
      STANDARD: {
        username: 'standard_user',
        password: 'secret_sauce'
      },
      INVALID: {
        username: 'invalid_user',
        password: 'wrong_password'
      },
      WRONG_CASE: {
        username: 'Standard_User',
        password: 'Secret_Sauce'
      }
    },

    ERRORS: {
      USERNAME_REQUIRED: 'Username is required',
      PASSWORD_REQUIRED: 'Password is required',
      INVALID_CREDENTIALS: 'Username and password do not match'
    },

    Product: {
      Product: 'Sauce Labs Backpack',
      Product2: 'Sauce Labs Bike Light'
    }
  }

export async function createLoggedInSession(browser) 
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const loginPage = new LoginPageMethods(page);
    await loginPage.navigate();
    await loginPage.login(TEST_DATA.USERS.STANDARD.username,TEST_DATA.USERS.STANDARD.password);
    await expect(page).toHaveURL(/inventory/);
    const home = new HomePage(page);
    return { context, page };
}