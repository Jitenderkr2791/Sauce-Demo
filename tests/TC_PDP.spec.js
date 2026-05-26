import { test } from '../fixtures/baseTest.js';
import { TEST_DATA } from '../test-data/testData.js';

test.describe('PDP Tests', () => {
  
  test('REQ-PDP-001: Product label redirects to PDP', async ({ pdpPage }) => {
    await pdpPage.clickProductName(TEST_DATA.Product.BACKPACK);
    await pdpPage.verifyPDPLoaded(TEST_DATA.Product.BACKPACK);
  });


  test('REQ-PDP-002: Product image redirects to PDP', async ({ pdpPage }) => {
    await pdpPage.clickProductImage(TEST_DATA.Product.BACKPACK);
    await pdpPage.verifyPDPLoaded(TEST_DATA.Product.BACKPACK);
    await pdpPage.clickBackToProducts();
  });


  test('REQ-PDP-003: Product card redirects to PDP', async ({ pdpPage }) => {
    await pdpPage.clickProductCard(TEST_DATA.Product.BACKPACK);
    await pdpPage.verifyPDPLoaded(TEST_DATA.Product.BACKPACK);
    await pdpPage.clickBackToProducts();
  });


  test('REQ-PDP-004: Back to products from PDP', async ({ pdpPage }) => {
    await pdpPage.clickProductName(TEST_DATA.Product.BACKPACK);
    await pdpPage.clickBackToProducts();
    await pdpPage.verifyProductsPage();
  });

});