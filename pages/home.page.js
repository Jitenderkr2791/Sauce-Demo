import { expect } from '@playwright/test';
import homePageLocators from '../pageobjects/homePageLocators.js';
import LoginPageMethods from './login.page.js';
import { allure } from 'allure-playwright';

export default class HomePage extends LoginPageMethods {
  constructor(page) {
    super(page);
  }

    formatProduct(productName) 
    {
        return productName.toLowerCase().replaceAll(' ', '-');
    }

    getButton(productName, type) 
    {
        const formatted = this.formatProduct(productName);
        return this.page.locator(`[data-test="${type}-${formatted}"]`);
    }

    addToCart(productName) 
    {
        return this.getButton(productName, 'add-to-cart');
    }

    removeButton(productName) 
    {
     return this.getButton(productName, 'remove');
    }

    async clickAddToCart(productName) 
    {
        await allure.step(`Add product: ${productName}`, async () => 
            {
            await this.addToCart(productName).click();
            await expect(this.removeButton(productName)).toBeVisible();
            });
    }

    async clickRemove(productName) 
    {
        await allure.step(`Remove product: ${productName}`, async () => 
            { 
                await this.removeButton(productName).click();
                await expect(this.addToCart(productName)).toBeVisible();
            });
    }

    async getCartCount() 
    {
        const badge = this.page.locator(homePageLocators.cartBadge);
        if (await badge.count() === 0) 
            {
            console.log('Cart is empty');
            return 0;
            }
        const count = parseInt((await badge.innerText()).trim());
        console.log(`Cart count: ${count}`);
        return count;
    }

    async verifyCartCount(expectedCount) 
    {
        expect(await this.getCartCount()).toBe(expectedCount);
    }
  
     async verifyButtonState(productName, expectedText) 
    {
     const type = expectedText === 'Remove' ? 'remove' : 'add-to-cart';
     const button = this.getButton(productName, type);
        await expect(button).toBeVisible();
        await expect(button).toHaveText(expectedText);
    }

    async sortBy(optionText) 
    {
        await this.page.selectOption(homePageLocators.sortDropdown, 
            {
                label: optionText
            });
    }
}