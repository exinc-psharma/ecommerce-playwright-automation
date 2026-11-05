// Checkout form validation and Order Confirmation handling
document.addEventListener('DOMContentLoaded', () => {
  const checkoutForm = document.getElementById('checkout-form');
  const nameInput = document.getElementById('checkout-name');
  const emailInput = document.getElementById('checkout-email');
  const addressInput = document.getElementById('checkout-address');
  const phoneInput = document.getElementById('checkout-phone');
  const checkoutSummary = document.getElementById('checkout-order-summary');
  const errorMsg = document.getElementById('checkout-error-msg');

  // Logic for Checkout Page
  if (checkoutForm) {
    const cart = getCart();

    if (cart.length === 0) {
      showToast('Your cart is empty! Redirecting to products...');
      window.location.href = 'products.html';
      return;
    }

    // Pre-fill user details if logged in
    const user = getLoggedInUser();
    if (user && user.email && emailInput && !emailInput.value) {
      emailInput.value = user.email;
    }

    // Render Order Summary Preview
    const cartItemsWithDetails = cart.map(item => {
      const product = PRODUCTS.find(p => p.id === item.id);
      return {
        ...item,
        product: product || { name: 'Item', price: 0 }
      };
    });

    const subtotal = cartItemsWithDetails.reduce((sum, i) => sum + (i.product.price * i.quantity), 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    if (checkoutSummary) {
      checkoutSummary.innerHTML = `
        <div style="background: var(--bg-card); padding: 1.5rem; border: 1px solid var(--border); border-radius: var(--radius); box-shadow: var(--shadow);">
          <h3 style="margin-bottom: 1rem;">Order Items</h3>
          <ul style="list-style: none; margin-bottom: 1rem; border-bottom: 1px solid var(--border); padding-bottom: 1rem;">
            ${cartItemsWithDetails.map(item => `
              <li style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.9rem;">
                <span>${item.product.name} (x${item.quantity})</span>
                <strong>$${(item.product.price * item.quantity).toFixed(2)}</strong>
              </li>
            `).join('')}
          </ul>
          <div class="summary-row">
            <span>Subtotal</span>
            <span>$${subtotal.toFixed(2)}</span>
          </div>
          <div class="summary-row">
            <span>Tax (8%)</span>
            <span>$${tax.toFixed(2)}</span>
          </div>
          <div class="summary-row total">
            <span>Total</span>
            <span data-testid="checkout-total-amount">$${total.toFixed(2)}</span>
          </div>
        </div>
      `;
    }

    // Form Submission & Validation
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      errorMsg.textContent = '';
      errorMsg.classList.remove('visible');

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const address = addressInput.value.trim();
      const phone = phoneInput.value.trim();

      if (!name) {
        showError('Please enter your full name.');
        nameInput.focus();
        return;
      }

      if (!email) {
        showError('Please enter your email address.');
        emailInput.focus();
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        showError('Please enter a valid email address.');
        emailInput.focus();
        return;
      }

      if (!address) {
        showError('Please enter your shipping address.');
        addressInput.focus();
        return;
      }

      if (!phone) {
        showError('Please enter your phone number.');
        phoneInput.focus();
        return;
      }

      const phoneClean = phone.replace(/[^\d+]/g, '');
      if (phoneClean.length < 7) {
        showError('Please enter a valid phone number (at least 7 digits).');
        phoneInput.focus();
        return;
      }

      // Generate Order ID
      const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
      const orderRecord = {
        orderId,
        date: new Date().toLocaleDateString(),
        customer: { name, email, address, phone },
        items: cartItemsWithDetails,
        subtotal,
        tax,
        total
      };

      setLastOrder(orderRecord);
      clearCart();

      showToast('Order placed successfully!');
      window.location.href = 'confirmation.html';
    });

    function showError(msg) {
      errorMsg.textContent = msg;
      errorMsg.classList.add('visible');
    }
  }

  // Logic for Confirmation Page
  const confirmationContainer = document.getElementById('confirmation-container');
  if (confirmationContainer) {
    const lastOrder = getLastOrder();

    if (!lastOrder) {
      confirmationContainer.innerHTML = `
        <div class="empty-state">
          <h3>No order details found</h3>
          <p>It looks like you haven't placed an order yet.</p>
          <br>
          <a href="products.html" class="btn btn-primary" id="btn-browse-products">Shop Now</a>
        </div>
      `;
      return;
    }

    confirmationContainer.innerHTML = `
      <div class="confirmation-card">
        <div class="success-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h2 style="margin-bottom: 0.5rem;">Thank You for Your Order!</h2>
        <p style="color: var(--text-muted);">Your order has been placed and is being processed.</p>
        
        <div style="margin: 1rem 0; font-weight: 700; font-size: 1.1rem; color: var(--primary);">
          Order Reference: <span id="order-id" data-testid="order-id">${lastOrder.orderId}</span>
        </div>

        <div class="order-details-box">
          <h4 style="margin-bottom: 0.75rem;">Shipping Details</h4>
          <p><strong>Name:</strong> <span data-testid="confirm-name">${lastOrder.customer.name}</span></p>
          <p><strong>Email:</strong> <span data-testid="confirm-email">${lastOrder.customer.email}</span></p>
          <p><strong>Address:</strong> <span data-testid="confirm-address">${lastOrder.customer.address}</span></p>
          <p><strong>Phone:</strong> <span data-testid="confirm-phone">${lastOrder.customer.phone}</span></p>
          
          <h4 style="margin: 1rem 0 0.5rem 0;">Purchased Items</h4>
          <ul style="list-style: none; padding-left: 0;">
            ${lastOrder.items.map(item => `
              <li style="display: flex; justify-content: space-between; border-bottom: 1px dashed var(--border); padding: 0.25rem 0;">
                <span>${item.product.name} (x${item.quantity})</span>
                <strong>$${(item.product.price * item.quantity).toFixed(2)}</strong>
              </li>
            `).join('')}
          </ul>
          
          <div style="display: flex; justify-content: space-between; margin-top: 0.75rem; font-size: 1.1rem; font-weight: 700;">
            <span>Total Paid:</span>
            <span data-testid="confirm-total-paid">$${lastOrder.total.toFixed(2)}</span>
          </div>
        </div>

        <a href="products.html" class="btn btn-primary" id="btn-continue-shopping" data-testid="btn-continue-shopping">
          Continue Shopping
        </a>
      </div>
    `;
  }
});
