const BasePage = require('./BasePage');

class CartPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.cartContainer = page.getByTestId('cart-container');
    this.cartTable = page.locator('#cart-table');
    this.cartTotal = page.getByTestId('cart-total-price');
    this.proceedToCheckoutBtn = page.getByTestId('btn-proceed-checkout');
    this.emptyState = page.locator('.empty-state');
  }

  async navigate() {
    await this.page.goto('/cart.html');
  }

  getCartRow(productId) {
    return this.page.getByTestId(`cart-row-${productId}`);
  }

  async getItemNameText(productId) {
    return await this.page.getByTestId(`cart-item-name-${productId}`).textContent();
  }

  async getItemQuantityText(productId) {
    return await this.page.getByTestId(`cart-qty-${productId}`).textContent();
  }

  async getItemSubtotalText(productId) {
    return await this.page.getByTestId(`cart-item-subtotal-${productId}`).textContent();
  }

  async increaseQuantity(productId) {
    const plusBtn = this.page.getByTestId(`qty-plus-${productId}`);
    await plusBtn.click();
  }

  async decreaseQuantity(productId) {
    const minusBtn = this.page.getByTestId(`qty-minus-${productId}`);
    await minusBtn.click();
  }

  async removeProduct(productId) {
    const removeBtn = this.page.getByTestId(`remove-item-${productId}`);
    await removeBtn.click();
  }

  async getTotalPriceText() {
    return await this.cartTotal.textContent();
  }

  async clickProceedToCheckout() {
    await this.proceedToCheckoutBtn.click();
  }
}

module.exports = CartPage;
