import { test, expect } from '../fixtures/baseTest.js';
import { TEST_DATA } from '../test-data/testData.js';

test.describe('Cart Tests', () => {

    test('REQ-CART-001: Add single product to cart', async ({ homePage }) => {
        await homePage.clickAddToCart(TEST_DATA.Product.BACKPACK);
        await homePage.verifyCartCount(1);
        await homePage.verifyButtonState(TEST_DATA.Product.BACKPACK, 'Remove');
    })

    test('REQ-CART-002: Remove single product from cart', async ({homePage}) => {
        await homePage.clickAddToCart(TEST_DATA.Product.BACKPACK);
        await homePage.clickRemove(TEST_DATA.Product.BACKPACK);
        await homePage.verifyCartCount(0);
        await homePage.verifyButtonState(TEST_DATA.Product.BACKPACK, 'Add to cart');
    });

    test('REQ-CART-003: Add multiple products to cart', async ({homePage}) => {
        await homePage.clickAddToCart(TEST_DATA.Product.BACKPACK);
        await homePage.clickAddToCart(TEST_DATA.Product.BIKE_LIGHT);
        await homePage.verifyCartCount(2);
    });

    test('REQ-CART-004: Remove one product from multiple', async ({homePage}) => {
        await homePage.clickAddToCart(TEST_DATA.Product.BACKPACK);
        await homePage.clickAddToCart(TEST_DATA.Product.BIKE_LIGHT);
        await homePage.clickRemove(TEST_DATA.Product.BACKPACK);
        await homePage.verifyCartCount(1);
    });

    test('REQ-CART-005: Remove all products from cart', async ({homePage}) => {
        await homePage.clickAddToCart(TEST_DATA.Product.BIKE_LIGHT);
        await homePage.clickRemove(TEST_DATA.Product.BIKE_LIGHT);
        await homePage.verifyCartCount(0);
    });

    test('REQ-CART-006: Add to cart button state change', async ({homePage}) => {
        await homePage.clickAddToCart(TEST_DATA.Product.BACKPACK);
        await homePage.verifyButtonState(TEST_DATA.Product.BACKPACK, 'Remove');
    });

    test('REQ-CART-007: Remove button state change', async ({homePage}) => {
        await homePage.clickAddToCart(TEST_DATA.Product.BACKPACK);
        await homePage.clickRemove(TEST_DATA.Product.BACKPACK);
        await homePage.verifyButtonState(TEST_DATA.Product.BACKPACK, 'Add to cart');
    });

    test('REQ-CART-008: Cart count persistence after sorting', async ({homePage}) => {
        await homePage.clickAddToCart(TEST_DATA.Product.BACKPACK);
        await homePage.verifyCartCount(1);
        await homePage.sortBy('Price (high to low)');
        await homePage.verifyCartCount(1);
        await homePage.verifyButtonState(TEST_DATA.Product.BACKPACK, 'Remove');
    });
});