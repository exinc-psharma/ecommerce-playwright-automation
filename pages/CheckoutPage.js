const BasePage = require('./BasePage');

class CheckoutPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.nameInput = page.getByTestId('checkout-name');
    this.emailInput = page.getByTestId('checkout-email');
    this.addressInput = page.getByTestId('checkout-address');
    this.phoneInput = page.getByTestId('checkout-phone');
    this.placeOrderBtn = page.getByTestId('place-order-btn');
    this.errorMessage = page.getByTestId('checkout-error-msg');
    this.totalAmount = page.getByTestId('checkout-total-amount');
  }

  async navigate() {
    await this.page.goto('/checkout.html');
  }

  async fillCheckoutForm({ name, email, address, phone }) {
    if (name !== undefined) await this.nameInput.fill(name);
    if (email !== undefined) await this.emailInput.fill(email);
    if (address !== undefined) await this.addressInput.fill(address);
    if (phone !== undefined) await this.phoneInput.fill(phone);
  }

  async clickPlaceOrder() {
    await this.placeOrderBtn.click();
  }

  async getErrorMessageText() {
    return await this.errorMessage.textContent();
  }

  async getTotalAmountText() {
    return await this.totalAmount.textContent();
  }
}

module.exports = CheckoutPage;
