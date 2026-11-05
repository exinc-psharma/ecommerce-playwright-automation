# E-Commerce Playwright Automation Framework

A complete, beginner-friendly End-to-End (E2E) Test Automation Framework built with **JavaScript** and **Playwright Test**, designed for a lightweight E-Commerce System Under Test (SUT).

---

## 📌 Project Overview

This project provides a full-stack automated test suite using the **Page Object Model (POM)** design pattern. It demonstrates automated testing of essential e-commerce user journeys including user authentication, product searching & filtering, shopping cart management, form validations, order checkout, and order confirmation verification.

---

## 🏗️ System Under Test (SUT)

The SUT is located in the [`ecommerce-app`](./ecommerce-app) directory. It is built using pure **HTML, CSS, and Vanilla JavaScript** without external APIs, backends, or heavy frameworks.

### Key Characteristics of SUT:
- **State Persistence**: Uses `localStorage` (`sut_user`, `sut_cart`, `sut_last_order`) to manage user session, shopping cart items, and order receipts.
- **Product Catalog**: Includes 9 items across 3 categories (Electronics, Accessories, Home & Office).
- **Automation Readiness**: Every interactive element includes accessible attributes, semantic HTML elements, IDs, and dedicated `data-testid` attributes (e.g., `data-testid="add-to-cart-prod-1"`, `data-testid="checkout-name"`).

---

## 🛠️ Playwright Architecture

- **Test Runner**: `@playwright/test`
- **Browsers Supported**: Chromium (Chrome), Firefox, WebKit (Safari)
- **Web Server Integration**: Playwright automatically launches the local Python HTTP server on `http://localhost:8080` before test execution.
- **Assertions**: Auto-retrying Playwright `expect` assertions without arbitrary `waitForTimeout` calls.
- **Reporters**: Built-in HTML Reporter with automatic failure screenshots (`screenshot: 'only-on-failure'`) and trace logs on retries (`trace: 'on-first-retry'`).

---

## 🧩 Page Object Model (POM) Design

The Page Object Model pattern encapsulates web page UI elements and actions into reusable JavaScript classes under the `pages/` directory:

| Page Object Class | Encapsulated SUT Page | Key Responsibilities & Actions |
| :--- | :--- | :--- |
| `BasePage.js` | Shared Header | Navigation header, cart count badge, user greeting badge, login/logout buttons. |
| `LoginPage.js` | `login.html` | Email & password input fields, sign-in button, error alert banner. |
| `HomePage.js` | `index.html` | Hero banner CTA button, featured products grid count. |
| `ProductsPage.js` | `products.html` | Search input, category dropdown filter, product card list, add-to-cart buttons. |
| `CartPage.js` | `cart.html` | Cart table rows, quantity increase/decrease buttons, remove item, subtotal/total prices, checkout button. |
| `CheckoutPage.js` | `checkout.html` | Customer details form (Name, Email, Address, Phone), order preview summary, place order button, error alerts. |
| `ConfirmationPage.js` | `confirmation.html` | Generated Order ID reference, customer details receipt, total paid, continue shopping button. |

---

## 🧪 Test Scenarios & Suites

Automated test specifications are organized under the `tests/` directory:

### 1. Authentication Suite (`tests/auth.spec.js`)
- `Successful Login`: Validates user login redirect to products page and header greeting.
- `Invalid Login - Empty Email`: Validates empty email field error banner.
- `Invalid Login - Invalid Email Format`: Validates email syntax validation error.
- `Invalid Login - Short Password`: Validates password length requirement (< 4 chars).
- `Logout`: Validates session removal and navbar reset to logged-out state.

### 2. Products Catalog Suite (`tests/products.spec.js`)
- `Catalog Page Load`: Verifies all 9 catalog items display properly.
- `Search Products`: Verifies real-time keyword search filtering.
- `Filter by Category`: Verifies category dropdown filtering for "Electronics".
- `Add Product to Cart`: Verifies cart badge counter updates on item addition.

### 3. Shopping Cart Suite (`tests/cart.spec.js`)
- `Cart Item Display`: Verifies added product details appear in cart table.
- `Quantity Controls`: Verifies increasing/decreasing item quantity updates subtotal correctly.
- `Remove Item`: Verifies removing item displays empty cart state and updates badge.
- `Cart Totals Calculation`: Verifies total calculation includes subtotal + tax (8%).

### 4. Checkout & Order Suite (`tests/checkout.spec.js`)
- `Invalid Form Validation - Empty Name`: Verifies error alert when required fields are missing.
- `Invalid Form Validation - Invalid Phone`: Verifies error alert for short phone numbers (< 7 digits).
- `Successful Checkout Flow`: Completes order placement from cart through checkout to order confirmation page.
- `Order Receipt Verification`: Verifies generated Order ID format (`ORD-XXXXXX`), customer info, total paid amount, and cleared cart.

---

## 📁 Project Directory Structure

```
Ecommerce-Playwright-Automation/
├── ecommerce-app/           # System Under Test (SUT)
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── app.js
│   │   ├── auth.js
│   │   ├── cart-view.js
│   │   ├── checkout-view.js
│   │   ├── products-view.js
│   │   └── products.js
│   ├── cart.html
│   ├── checkout.html
│   ├── confirmation.html
│   ├── index.html
│   ├── login.html
│   └── products.html
├── pages/                   # Page Object Model (POM) Classes
│   ├── BasePage.js
│   ├── CartPage.js
│   ├── CheckoutPage.js
│   ├── ConfirmationPage.js
│   ├── HomePage.js
│   ├── LoginPage.js
│   └── ProductsPage.js
├── tests/                   # Automated E2E Test Specs
│   ├── auth.spec.js
│   ├── cart.spec.js
│   ├── checkout.spec.js
│   └── products.spec.js
├── package.json             # NPM dependencies & scripts
├── playwright.config.js     # Playwright test configuration
└── README.md                # Project documentation
```

---

## 🚀 How to Run the Project

### Prerequisites
- Node.js (v18 or higher)
- Python (v3.x for running the static HTTP web server)

### 1. Install Dependencies & Playwright Browsers
```bash
npm install
npx playwright install
```

### 2. (Optional) Run the Web Server Manually
> *Note: Playwright's `webServer` config automatically starts the server during test execution, so running this manually is optional.*
```bash
python -m http.server 8080 --directory ecommerce-app
```
Access the application at `http://localhost:8080`.

### 3. Run Automated Tests

Run all tests across all browsers in headless mode:
```bash
npx playwright test
```

Run tests in a specific browser (e.g. Chromium):
```bash
npx playwright test --project=chromium
```

Run tests in headed (visible browser) mode:
```bash
npm run test:headed
```

Run tests using Playwright Interactive UI Mode:
```bash
npm run test:ui
```

### 4. View HTML Test Report
After running the tests, open the generated HTML test report in your default browser:
```bash
npm run report
```
*(or run `npx playwright show-report`)*
