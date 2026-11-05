// App Core & State Management
const STORAGE_KEYS = {
  USER: 'sut_user',
  CART: 'sut_cart',
  LAST_ORDER: 'sut_last_order'
};

// State Accessors
function getLoggedInUser() {
  const data = localStorage.getItem(STORAGE_KEYS.USER);
  return data ? JSON.parse(data) : null;
}

function setLoggedInUser(user) {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.USER);
  }
  updateNavbarState();
}

function logoutUser() {
  localStorage.removeItem(STORAGE_KEYS.USER);
  updateNavbarState();
  showToast('Logged out successfully.');
  window.location.href = 'index.html';
}

function getCart() {
  const data = localStorage.getItem(STORAGE_KEYS.CART);
  return data ? JSON.parse(data) : [];
}

function setCart(cart) {
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  updateNavbarState();
}

function addToCart(productId, quantity = 1) {
  const cart = getCart();
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ id: productId, quantity });
  }
  setCart(cart);
  const product = PRODUCTS.find(p => p.id === productId);
  showToast(`Added "${product ? product.name : 'Item'}" to cart!`);
}

function updateCartQuantity(productId, newQty) {
  let cart = getCart();
  if (newQty <= 0) {
    cart = cart.filter(item => item.id !== productId);
  } else {
    const item = cart.find(i => i.id === productId);
    if (item) item.quantity = newQty;
  }
  setCart(cart);
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  setCart(cart);
  showToast('Item removed from cart.');
}

function clearCart() {
  localStorage.removeItem(STORAGE_KEYS.CART);
  updateNavbarState();
}

function getCartTotalCount() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
}

function setLastOrder(order) {
  localStorage.setItem(STORAGE_KEYS.LAST_ORDER, JSON.stringify(order));
}

function getLastOrder() {
  const data = localStorage.getItem(STORAGE_KEYS.LAST_ORDER);
  return data ? JSON.parse(data) : null;
}

// UI Navbar Sync
function updateNavbarState() {
  const user = getLoggedInUser();
  const userDisplay = document.getElementById('user-display');
  const navLogin = document.getElementById('nav-login');
  const navLogout = document.getElementById('nav-logout');
  const cartCount = document.getElementById('cart-count');

  if (userDisplay) {
    if (user && user.email) {
      userDisplay.textContent = `Hi, ${user.email}`;
      userDisplay.style.display = 'inline-block';
    } else {
      userDisplay.textContent = '';
      userDisplay.style.display = 'none';
    }
  }

  if (navLogin) {
    navLogin.style.display = user ? 'none' : 'inline-block';
  }

  if (navLogout) {
    navLogout.style.display = user ? 'inline-block' : 'none';
  }

  if (cartCount) {
    cartCount.textContent = getCartTotalCount();
  }
}

// Toast Helper
function showToast(message) {
  let toast = document.getElementById('toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

// Attach logout handler on page load
document.addEventListener('DOMContentLoaded', () => {
  updateNavbarState();

  const logoutBtn = document.getElementById('nav-logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      logoutUser();
    });
  }
});
