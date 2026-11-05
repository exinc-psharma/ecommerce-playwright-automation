// Base Page Object containing shared header and navigation locators
class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Header & Navbar Locators
    this.logo = page.getByTestId('nav-logo');
    this.navHome = page.getByTestId('nav-home');
    this.navProducts = page.getByTestId('nav-products');
    this.navCart = page.getByTestId('nav-cart');
    this.cartBadge = page.getByTestId('cart-count');
    this.userBadge = page.getByTestId('user-display');
    this.navLogin = page.getByTestId('nav-login');
    this.navLogout = page.getByTestId('nav-logout');
  }

  async clickHome() {
    await this.navHome.click();
  }

  async clickProducts() {
    await this.navProducts.click();
  }

  async clickCart() {
    await this.navCart.click();
  }

  async clickLogin() {
    await this.navLogin.click();
  }

  async clickLogout() {
    await this.navLogout.click();
  }

  async getCartCountText() {
    return await this.cartBadge.textContent();
  }

  async getUserGreetingText() {
    return await this.userBadge.textContent();
  }
}

module.exports = BasePage;
