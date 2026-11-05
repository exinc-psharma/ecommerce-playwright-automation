const BasePage = require('./BasePage');

class HomePage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.heroShopNowBtn = page.getByTestId('hero-shop-now-btn');
    this.viewAllBtn = page.getByTestId('view-all-products-btn');
    this.featuredProductsGrid = page.getByTestId('featured-products-grid');
    this.productCards = page.locator('.product-card');
  }

  async navigate() {
    await this.page.goto('/index.html');
  }

  async clickShopNow() {
    await this.heroShopNowBtn.click();
  }

  async getFeaturedProductsCount() {
    return await this.productCards.count();
  }
}

module.exports = HomePage;
