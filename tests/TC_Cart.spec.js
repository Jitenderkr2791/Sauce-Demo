import { test, expect } from '@playwright/test';
import HomePage from '../pages/home.page.js';
import { TEST_DATA, createLoggedInSession } from '../test-data/testData.js';

test.describe('Cart Tests - Single Login Session', () => 
{
    let context;
    let page;
    let home;
    test.beforeAll(async ({ browser }) => {
    ({ context, page } = await createLoggedInSession(browser));
        home = new HomePage(page);
    });

    test.beforeEach(async () => {
    await page.reload();
    });

    test.afterAll(async () => {
    if (page) await page.close();
    if (context) await context.close();
    });

    test('REQ-CART-001: Add single product to cart', async () => {
        await test.step('Add product and verify', async () => {
        await home.clickAddToCart(TEST_DATA.Product.Product);
        await home.verifyCartCount(1);
        await home.verifyButtonState(TEST_DATA.Product.Product, 'Remove');
        });
    })

    test('REQ-CART-002: Remove single product from cart', async () => {
        await test.step('Remove product and verify', async () => {
        await home.clickAddToCart(TEST_DATA.Product.Product);
        await home.clickRemove(TEST_DATA.Product.Product);
        await home.verifyCartCount(0);
        await home.verifyButtonState(TEST_DATA.Product.Product, 'Add to cart');
        });
    });

    test('REQ-CART-003: Add multiple products to cart', async () => {
        await test.step('Add multiple products', async () => {
        await home.clickAddToCart(TEST_DATA.Product.Product);
        await home.clickAddToCart(TEST_DATA.Product.Product2);
        await home.verifyCartCount(2);
        });
    });

    test('REQ-CART-004: Remove one product from multiple', async () => {
        await test.step('Remove one item', async () => {
        await home.clickAddToCart(TEST_DATA.Product.Product);
        await home.clickAddToCart(TEST_DATA.Product.Product2);
        await home.clickRemove(TEST_DATA.Product.Product);
        await home.verifyCartCount(1);
        });
    });

    test('REQ-CART-005: Remove all products from cart', async () => {
        await test.step('Clear cart', async () => {
        await home.clickAddToCart(TEST_DATA.Product.Product2);
        await home.clickRemove(TEST_DATA.Product.Product2);
        await home.verifyCartCount(0);
        });
    });

    test('REQ-CART-006: Add to cart button state change', async () => {
        await test.step('Verify Add → Remove state', async () => {
        await home.clickAddToCart(TEST_DATA.Product.Product);
        await home.verifyButtonState(TEST_DATA.Product.Product, 'Remove');
        });
    });

    test('REQ-CART-007: Remove button state change', async () => {
        await test.step('Verify Remove → Add state', async () => {
        await home.clickRemove(TEST_DATA.Product.Product);
        await home.verifyButtonState(TEST_DATA.Product.Product, 'Add to cart');
        });
    });

    test('REQ-CART-008: Cart count persistence after sorting', async () => {
        await test.step('Verify cart persistence after sorting', async () => {
        await home.clickAddToCart(TEST_DATA.Product.Product);
        await home.verifyCartCount(1);
        await home.sortBy('Price (high to low)');
        await home.verifyCartCount(1);
        await home.verifyButtonState(TEST_DATA.Product.Product, 'Remove');
        });
    });
});