import { expect } from '@playwright/test';
import BasePage from './base.page.js';
import pdpPageLocators from '../pageobjects/pdpPageLocators.js';
import { allure } from 'allure-playwright';

export default class PDPPage extends BasePage 
{

  constructor(page) 
  {
    super(page);
    this.page = page;
  }

  async clickProductName(productName) 
  {
    await this.page.locator('.inventory_item_name', { hasText: productName }).click();
  }

  async clickProductImage(productName)
   {
    const productCard = this.page.locator('.inventory_item').filter({ hasText: productName });
    await productCard.locator('img').click();
   }

  async clickProductCard(productName) 
  {
    const productCard = this.page.locator('.inventory_item').filter({ hasText: productName });
    await productCard.click();
  }

  async verifyProductTitle(productName) 
  {
    await expect(this.page.locator(pdpPageLocators.productTitle)).toHaveText(productName);
  }

  async verifyProductImageVisible() 
  {
    await expect(this.page.locator(pdpPageLocators.productImage)).toBeVisible();
  }

  async verifyProductDescriptionVisible()
   {
    await expect(this.page.locator(pdpPageLocators.productDescription)).toBeVisible();
  }

  async verifyPDPLoaded(productName) 
  {
    await allure.step(`Verify PDP for ${productName}`, async () => {
      await this.verifyProductTitle(productName);
      await this.verifyProductImageVisible();
      await this.verifyProductDescriptionVisible();
    });
  }

  async clickBackToProducts() 
  {
    await this.page.locator(pdpPageLocators.backToProductsBtn).click();
  }

  async verifyProductsPage() 
  {
    await expect(this.page).toHaveURL(/inventory/);
    await expect(this.page.locator('.inventory_list')).toBeVisible();
  }
}