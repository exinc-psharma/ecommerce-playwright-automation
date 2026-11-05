const { test, expect } = require('@playwright/test');
const ProductsPage = require('../pages/ProductsPage');

test.describe('Products Catalog Suite', () => {
  let productsPage;

  test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);
    await productsPage.navigate();
  });

  test('Products page loads correctly with full catalog', async ({ page }) => {
    await expect(page).toHaveTitle(/Products Catalog/);
    await expect(productsPage.productsGrid).toBeVisible();
    const count = await productsPage.getDisplayedProductsCount();
    expect(count).toBe(9);
  });

  test('Search products by keyword', async () => {
    await productsPage.search('Headphones');
    const count = await productsPage.getDisplayedProductsCount();
    expect(count).toBe(1);

    const card = await productsPage.getProductCard('prod-1');
    await expect(card).toBeVisible();
    await expect(card).toContainText('Wireless ANC Headphones');
  });

  test('Filter products by category', async () => {
    await productsPage.selectCategory('Electronics');
    const count = await productsPage.getDisplayedProductsCount();
    expect(count).toBe(4); // Wireless Headphones, Smart Watch, Keyboard, Bluetooth Speaker
  });

  test('Add product to cart updates cart counter badge', async () => {
    await expect(productsPage.cartBadge).toHaveText('0');
    
    // Add product 1 (Wireless ANC Headphones) to cart
    await productsPage.addProductToCart('prod-1');

    // Assert cart count increments to 1
    await expect(productsPage.cartBadge).toHaveText('1');

    // Add product 2 (Smart Fitness Watch) to cart
    await productsPage.addProductToCart('prod-2');

    // Assert cart count increments to 2
    await expect(productsPage.cartBadge).toHaveText('2');
  });
});
