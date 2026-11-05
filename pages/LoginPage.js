const BasePage = require('./BasePage');

class LoginPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.emailInput = page.getByTestId('email-input');
    this.passwordInput = page.getByTestId('password-input');
    this.submitButton = page.getByTestId('login-submit-btn');
    this.errorMessage = page.getByTestId('login-error-msg');
  }

  async navigate() {
    await this.page.goto('/login.html');
  }

  async login(email, password) {
    if (email !== undefined) {
      await this.emailInput.fill(email);
    }
    if (password !== undefined) {
      await this.passwordInput.fill(password);
    }
    await this.submitButton.click();
  }

  async getErrorMessageText() {
    return await this.errorMessage.textContent();
  }
}

module.exports = LoginPage;
