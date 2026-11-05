const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const HomePage = require('../pages/HomePage');

test.describe('Authentication Suite', () => {
  let loginPage;
  let homePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    await loginPage.navigate();
  });

  test('Successful Login with valid credentials', async ({ page }) => {
    const testEmail = 'student@college.edu';
    await loginPage.login(testEmail, 'password123');

    // Assert navigation to products page
    await expect(page).toHaveURL(/.*products\.html/);

    // Assert user badge displays logged-in email
    await expect(loginPage.userBadge).toBeVisible();
    await expect(loginPage.userBadge).toHaveText(`Hi, ${testEmail}`);
    await expect(loginPage.navLogout).toBeVisible();
  });

  test('Invalid Login - Empty email validation', async () => {
    await loginPage.login('', 'password123');
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Please enter your email address.');
  });

  test('Invalid Login - Invalid email format validation', async () => {
    await loginPage.login('invalid-email-format', 'password123');
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Please enter a valid email address');
  });

  test('Invalid Login - Short password validation', async () => {
    await loginPage.login('user@test.com', '123');
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Password must be at least 4 characters long.');
  });

  test('Logout flow removes user session', async ({ page }) => {
    // Perform login first
    await loginPage.login('user@test.com', 'password123');
    await expect(loginPage.userBadge).toBeVisible();

    // Click logout
    await loginPage.clickLogout();

    // Assert navigation back to home page & navbar state reset
    await expect(page).toHaveURL(/.*index\.html/);
    await expect(loginPage.userBadge).toBeHidden();
    await expect(loginPage.navLogin).toBeVisible();
  });
});
