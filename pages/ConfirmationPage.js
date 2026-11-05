const BasePage = require('./BasePage');

class ConfirmationPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.orderId = page.getByTestId('order-id');
    this.confirmName = page.getByTestId('confirm-name');
    this.confirmEmail = page.getByTestId('confirm-email');
    this.confirmAddress = page.getByTestId('confirm-address');
    this.confirmPhone = page.getByTestId('confirm-phone');
    this.confirmTotalPaid = page.getByTestId('confirm-total-paid');
    this.continueShoppingBtn = page.getByTestId('btn-continue-shopping');
  }

  async navigate() {
    await this.page.goto('/confirmation.html');
  }

  async getOrderIdText() {
    return await this.orderId.textContent();
  }

  async getCustomerNameText() {
    return await this.confirmName.textContent();
  }

  async getCustomerEmailText() {
    return await this.confirmEmail.textContent();
  }

  async getShippingAddressText() {
    return await this.confirmAddress.textContent();
  }

  async getCustomerPhoneText() {
    return await this.confirmPhone.textContent();
  }

  async getTotalPaidText() {
    return await this.confirmTotalPaid.textContent();
  }

  async clickContinueShopping() {
    await this.continueShoppingBtn.click();
  }
}

module.exports = ConfirmationPage;
