const BasePage = require('./BasePage');

class ProductsPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.searchInput = page.getByTestId('search-input');
    this.categorySelect = page.getByTestId('category-select');
    this.resultCount = page.getByTestId('result-count');
    this.productsGrid = page.getByTestId('products-grid');
    this.productCards = page.locator('.product-card');
  }

  async navigate() {
    await this.page.goto('/products.html');
  }

  async search(term) {
    await this.searchInput.fill(term);
  }

  async selectCategory(category) {
    await this.categorySelect.selectOption(category);
  }

  async addProductToCart(productId) {
    const addBtn = this.page.getByTestId(`add-to-cart-${productId}`);
    await addBtn.click();
  }

  async getProductCard(productId) {
    return this.page.getByTestId(`product-card-${productId}`);
  }

  async getProductName(productId) {
    return await this.page.getByTestId(`product-name-${productId}`).textContent();
  }

  async getProductPrice(productId) {
    return await this.page.getByTestId(`product-price-${productId}`).textContent();
  }

  async getDisplayedProductsCount() {
    return await this.productCards.count();
  }
}

module.exports = ProductsPage;
