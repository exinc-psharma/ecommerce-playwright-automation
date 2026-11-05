const { test, expect } = require('@playwright/test');
const ProductsPage = require('../pages/ProductsPage');
const CartPage = require('../pages/CartPage');

test.describe('Shopping Cart Suite', () => {
  let productsPage;
  let cartPage;

  test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);

    // Add a product to cart first
    await productsPage.navigate();
    await productsPage.addProductToCart('prod-1'); // Wireless ANC Headphones ($129.99)
    await cartPage.navigate();
  });

  test('Verify added product appears in cart table', async () => {
    const row = cartPage.getCartRow('prod-1');
    await expect(row).toBeVisible();

    const name = await cartPage.getItemNameText('prod-1');
    expect(name).toBe('Wireless ANC Headphones');

    const qty = await cartPage.getItemQuantityText('prod-1');
    expect(qty).toBe('1');
  });

  test('Increase and decrease product quantity in cart', async () => {
    // Increase quantity from 1 to 2
    await cartPage.increaseQuantity('prod-1');
    await expect(await cartPage.getItemQuantityText('prod-1')).toBe('2');
    await expect(await cartPage.getItemSubtotalText('prod-1')).toBe('$259.98');

    // Decrease quantity back to 1
    await cartPage.decreaseQuantity('prod-1');
    await expect(await cartPage.getItemQuantityText('prod-1')).toBe('1');
    await expect(await cartPage.getItemSubtotalText('prod-1')).toBe('$129.99');
  });

  test('Remove product from cart displays empty cart state', async () => {
    await cartPage.removeProduct('prod-1');
    
    // Assert row removed and empty cart state shown
    const row = cartPage.getCartRow('prod-1');
    await expect(row).toBeHidden();
    await expect(cartPage.emptyState).toBeVisible();
    await expect(cartPage.cartBadge).toHaveText('0');
  });

  test('Verify cart total including subtotal and tax', async () => {
    // Subtotal: 129.99, Tax 8%: 10.40, Total: 140.39
    const totalText = await cartPage.getTotalPriceText();
    expect(totalText).toBe('$140.39');
  });
});
