import { test, expect } from '@playwright/test';
import LoginPageMethods from '../pages/login.page.js';
import PDPPage from '../pages/pdp.page.js';
import { TEST_DATA } from '../test-data/testData.js';

test.describe('PDP Tests - Single Login Session', () => {

  let context;
  let page;
  let pdp;

  test.beforeAll(async ({ browser }) => 
      {
          context = await browser.newContext();
          page = await context.newPage();
          const loginPage = new LoginPageMethods(page);
          await test.step('Login once before all tests', async () => 
          {
              await loginPage.navigate();
              await loginPage.login(TEST_DATA.USERS.STANDARD.username,TEST_DATA.USERS.STANDARD.password);
              await expect(page).toHaveURL(/inventory/);
          });
    pdp = new PDPPage(page);
  });

  test.afterAll(async () => {
    await page.close();
    await context.close();
  });

  

  test('REQ-PDP-001: Product label redirects to PDP', async () => {
    await pdp.clickProductName(TEST_DATA.Product.Product);
    await pdp.verifyPDPLoaded(TEST_DATA.Product.Product);
  });



  test('REQ-PDP-002: Product image redirects to PDP', async () => {
    await pdp.clickBackToProducts();
    await pdp.clickProductImage(TEST_DATA.Product.Product);
    await pdp.verifyPDPLoaded(TEST_DATA.Product.Product);
  });


  test('REQ-PDP-003: Product card redirects to PDP', async () => {
    await pdp.clickBackToProducts();
    await pdp.clickProductCard(TEST_DATA.Product.Product);
    await pdp.verifyPDPLoaded(TEST_DATA.Product.Product);
  });


  test('REQ-PDP-004: Back to products from PDP', async () => {
    await pdp.clickProductName(TEST_DATA.Product.Product);
    await pdp.clickBackToProducts();
    await pdp.verifyProductsPage();
  });

});