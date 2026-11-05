const { test, expect } = require('@playwright/test');
const ProductsPage = require('../pages/ProductsPage');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');
const ConfirmationPage = require('../pages/ConfirmationPage');

test.describe('Checkout & Order Suite', () => {
  let productsPage;
  let cartPage;
  let checkoutPage;
  let confirmationPage;

  test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    confirmationPage = new ConfirmationPage(page);

    // Setup cart state with item before checkout tests
    await productsPage.navigate();
    await productsPage.addProductToCart('prod-2'); // Smart Fitness Watch ($89.50)
    await cartPage.navigate();
    await cartPage.clickProceedToCheckout();
  });

  test('Invalid checkout form validation - empty name field', async () => {
    await checkoutPage.fillCheckoutForm({
      name: '',
      email: 'john@example.com',
      address: '123 Main St',
      phone: '5551234567'
    });
    await checkoutPage.clickPlaceOrder();

    await expect(checkoutPage.errorMessage).toBeVisible();
    await expect(checkoutPage.errorMessage).toContainText('Please enter your full name.');
  });

  test('Invalid checkout form validation - invalid phone format', async () => {
    await checkoutPage.fillCheckoutForm({
      name: 'John Doe',
      email: 'john@example.com',
      address: '123 Main St',
      phone: '123'
    });
    await checkoutPage.clickPlaceOrder();

    await expect(checkoutPage.errorMessage).toBeVisible();
    await expect(checkoutPage.errorMessage).toContainText('Please enter a valid phone number');
  });

  test('Successful checkout and order confirmation verification', async ({ page }) => {
    const customerDetails = {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      address: '456 College Avenue, Campus Town, NY 10002',
      phone: '+1 (555) 987-6543'
    };

    await checkoutPage.fillCheckoutForm(customerDetails);
    await checkoutPage.clickPlaceOrder();

    // Assert redirection to confirmation page
    await expect(page).toHaveURL(/.*confirmation\.html/);

    // Assert generated Order ID reference format (e.g. ORD-123456)
    const orderId = await confirmationPage.getOrderIdText();
    expect(orderId).toMatch(/^ORD-\d{6}$/);

    // Assert shipping & customer details match input
    await expect(confirmationPage.confirmName).toHaveText(customerDetails.name);
    await expect(confirmationPage.confirmEmail).toHaveText(customerDetails.email);
    await expect(confirmationPage.confirmAddress).toHaveText(customerDetails.address);
    await expect(confirmationPage.confirmPhone).toHaveText(customerDetails.phone);

    // Assert total paid ($89.50 + 8% tax = $96.66)
    await expect(confirmationPage.confirmTotalPaid).toHaveText('$96.66');

    // Assert cart count badge is reset to 0
    await expect(confirmationPage.cartBadge).toHaveText('0');
  });
});
