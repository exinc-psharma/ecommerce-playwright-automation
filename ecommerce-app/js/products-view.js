// Rendering products and handling search/filtering
document.addEventListener('DOMContentLoaded', () => {
  const productsContainer = document.getElementById('products-grid');
  const searchInput = document.getElementById('search-input');
  const categorySelect = document.getElementById('category-select');
  const resultCount = document.getElementById('result-count');

  if (!productsContainer) return;

  // Render Category Options
  if (categorySelect) {
    const categories = ['All', ...new Set(PRODUCTS.map(p => p.category))];
    categorySelect.innerHTML = categories.map(cat => 
      `<option value="${cat}">${cat}</option>`
    ).join('');
  }

  function renderProducts(items) {
    if (resultCount) {
      resultCount.textContent = `Showing ${items.length} of ${PRODUCTS.length} products`;
    }

    if (items.length === 0) {
      productsContainer.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <h3>No products found</h3>
          <p>Try searching with a different term or clearing your category filter.</p>
        </div>
      `;
      return;
    }

    productsContainer.innerHTML = items.map(product => `
      <div class="product-card" data-testid="product-card-${product.id}" data-category="${product.category}">
        <div class="product-image">
          ${product.iconSvg}
        </div>
        <div class="product-body">
          <span class="product-category">${product.category}</span>
          <h3 class="product-title" data-testid="product-name-${product.id}">${product.name}</h3>
          <p class="product-description">${product.description}</p>
          <div class="product-footer">
            <span class="product-price" data-testid="product-price-${product.id}">$${product.price.toFixed(2)}</span>
            <button 
              class="btn btn-primary btn-sm btn-add-to-cart" 
              data-product-id="${product.id}" 
              data-testid="add-to-cart-${product.id}"
              aria-label="Add ${product.name} to cart"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    `).join('');

    // Attach Event Listeners to Add to Cart Buttons
    const addBtns = productsContainer.querySelectorAll('.btn-add-to-cart');
    addBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const prodId = e.currentTarget.getAttribute('data-product-id');
        addToCart(prodId, 1);
      });
    });
  }

  function filterProducts() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const selectedCategory = categorySelect ? categorySelect.value : 'All';

    const filtered = PRODUCTS.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(query) || 
                            product.description.toLowerCase().includes(query);
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    renderProducts(filtered);
  }

  // Initial render
  renderProducts(PRODUCTS);

  // Listeners
  if (searchInput) {
    searchInput.addEventListener('input', filterProducts);
  }

  if (categorySelect) {
    categorySelect.addEventListener('change', filterProducts);
  }
});
