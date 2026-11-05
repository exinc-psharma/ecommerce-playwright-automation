// Cart view rendering and quantity updates
document.addEventListener('DOMContentLoaded', () => {
  const cartContainer = document.getElementById('cart-container');
  if (!cartContainer) return;

  function renderCart() {
    const cart = getCart();
    
    if (cart.length === 0) {
      cartContainer.innerHTML = `
        <div class="empty-state">
          <h3>Your shopping cart is empty</h3>
          <p>Explore our products and find something you love!</p>
          <br>
          <a href="products.html" class="btn btn-primary" id="btn-browse-products">Browse Products</a>
        </div>
      `;
      return;
    }

    // Map cart items with product details
    const cartItemsWithDetails = cart.map(item => {
      const product = PRODUCTS.find(p => p.id === item.id);
      return {
        ...item,
        product: product || { name: 'Unknown Product', price: 0, iconSvg: '' }
      };
    });

    const subtotal = cartItemsWithDetails.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    cartContainer.innerHTML = `
      <div class="cart-layout">
        <div class="cart-table-container">
          <table class="cart-table" id="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${cartItemsWithDetails.map(item => `
                <tr data-testid="cart-row-${item.id}">
                  <td>
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                      <div style="width: 40px; height: 40px; background: #f1f5f9; border-radius: 4px; padding: 4px; display: flex; align-items: center; justify-content: center;">
                        ${item.product.iconSvg}
                      </div>
                      <div>
                        <strong data-testid="cart-item-name-${item.id}">${item.product.name}</strong>
                      </div>
                    </div>
                  </td>
                  <td>$${item.product.price.toFixed(2)}</td>
                  <td>
                    <div class="quantity-controls">
                      <button 
                        class="quantity-btn btn-qty-minus" 
                        data-id="${item.id}" 
                        data-testid="qty-minus-${item.id}"
                        aria-label="Decrease quantity for ${item.product.name}"
                      >-</button>
                      <span data-testid="cart-qty-${item.id}">${item.quantity}</span>
                      <button 
                        class="quantity-btn btn-qty-plus" 
                        data-id="${item.id}" 
                        data-testid="qty-plus-${item.id}"
                        aria-label="Increase quantity for ${item.product.name}"
                      >+</button>
                    </div>
                  </td>
                  <td data-testid="cart-item-subtotal-${item.id}">$${(item.product.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button 
                      class="btn btn-danger btn-sm btn-remove-item" 
                      data-id="${item.id}" 
                      data-testid="remove-item-${item.id}"
                      aria-label="Remove ${item.product.name} from cart"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div class="order-summary-card">
          <h3 style="margin-bottom: 1rem;">Order Summary</h3>
          <div class="summary-row">
            <span>Subtotal</span>
            <span id="cart-subtotal">$${subtotal.toFixed(2)}</span>
          </div>
          <div class="summary-row">
            <span>Est. Tax (8%)</span>
            <span id="cart-tax">$${tax.toFixed(2)}</span>
          </div>
          <div class="summary-row total">
            <span>Total</span>
            <span id="cart-total-price" data-testid="cart-total-price">$${total.toFixed(2)}</span>
          </div>
          <br>
          <a href="checkout.html" class="btn btn-primary btn-block" id="btn-proceed-checkout" data-testid="btn-proceed-checkout">
            Proceed to Checkout
          </a>
        </div>
      </div>
    `;

    // Event Listeners for quantity and remove buttons
    cartContainer.querySelectorAll('.btn-qty-minus').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        const item = cart.find(i => i.id === id);
        if (item) {
          updateCartQuantity(id, item.quantity - 1);
          renderCart();
        }
      });
    });

    cartContainer.querySelectorAll('.btn-qty-plus').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        const item = cart.find(i => i.id === id);
        if (item) {
          updateCartQuantity(id, item.quantity + 1);
          renderCart();
        }
      });
    });

    cartContainer.querySelectorAll('.btn-remove-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        removeFromCart(id);
        renderCart();
      });
    });
  }

  renderCart();
});
