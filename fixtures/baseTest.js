import { test as base } from '@playwright/test';
import LoginPageMethods from '../pages/login.page.js';
import HomePage from '../pages/home.page.js';
import PDPPage from '../pages/pdp.page.js';
import { TEST_DATA } from '../test-data/testData.js';

export const test = base.extend({
    
     loginPage: async ({ page }, use) => {

        const loginPage = new LoginPageMethods(page);

        await loginPage.navigate();

        await use(loginPage);
    },

    loggedInPage: async ({ page }, use) => 
        {
        const loginPage = new LoginPageMethods(page);
        await loginPage.navigate();
        await loginPage.login(TEST_DATA.USERS.STANDARD.username,TEST_DATA.USERS.STANDARD.password);
        await use(page);
    },

    homePage: async ({ loggedInPage }, use) => 
    {
        await use(new HomePage(loggedInPage));
    },

    pdpPage: async ({ loggedInPage }, use) => 
    {
        await use(new PDPPage(loggedInPage));
    }
});

export { expect } from '@playwright/test';