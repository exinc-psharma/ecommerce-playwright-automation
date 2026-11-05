// Login Form Validation and Authentication Logic
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const emailInput = document.getElementById('email-input');
  const passwordInput = document.getElementById('password-input');
  const errorMsg = document.getElementById('login-error-msg');

  if (!loginForm) return;

  // Pre-fill email if user is already logged in or redirect alert
  const currentUser = getLoggedInUser();
  if (currentUser) {
    showToast(`Already logged in as ${currentUser.email}`);
  }

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Reset error state
    errorMsg.textContent = '';
    errorMsg.classList.remove('visible');

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Validation
    if (!email) {
      showError('Please enter your email address.');
      emailInput.focus();
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showError('Please enter a valid email address (e.g. user@example.com).');
      emailInput.focus();
      return;
    }

    if (!password) {
      showError('Please enter your password.');
      passwordInput.focus();
      return;
    }

    if (password.length < 4) {
      showError('Password must be at least 4 characters long.');
      passwordInput.focus();
      return;
    }

    // Immediate login navigation
    setLoggedInUser({ email, loginTime: new Date().toISOString() });
    showToast('Login successful!');
    window.location.href = 'products.html';
  });

  function showError(msg) {
    errorMsg.textContent = msg;
    errorMsg.classList.add('visible');
  }
});
