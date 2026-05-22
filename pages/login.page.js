import loginPageLocators from '../pageobjects/loginPageLocators.js';
import BasePage from './base.page.js';
import { expect } from '@playwright/test';

export default class LoginPageMethods extends BasePage 
{
    constructor(page)
    {
        super(page);
    }

    async navigate() 
    {
        await this.page.goto('/');
    }

    async enterUsername(username)
    {
        await this.waitAndType(loginPageLocators.userNameInput, username);
    }

    async enterPassword(password) 
    {
        await this.waitAndType(loginPageLocators.passwordInput, password);
        return this;
    }

    async clickLoginButton()
    {
        await this.waitAndClick(loginPageLocators.loginButton);
    }

    async login(username, password) 
    { 
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }

    async verifyLogoVisible()
    {
        await expect(this.page.locator(loginPageLocators.logo)).toBeVisible();
    }

    async verifyErrorMessage(expectedMessage) 
    {
    const error = this.page.locator(loginPageLocators.errorMessage);
    await error.waitFor({ state: 'visible' });
    const errorText = (await error.textContent())?.trim() || '';
    console.log('Error Message:', errorText);
    expect(errorText).toContain(expectedMessage);
    }
}
