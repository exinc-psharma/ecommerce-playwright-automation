// Product catalog for the SUT E-Commerce web app
const PRODUCTS = [
  {
    id: "prod-1",
    name: "Wireless ANC Headphones",
    price: 129.99,
    category: "Electronics",
    description: "High-fidelity active noise-canceling wireless headphones with 30h battery life.",
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 14v3a2 2 0 0 0 2 2h2v-6H5a2 2 0 0 0-2 2z"/><path d="M17 13v6h2a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2h-2z"/><path d="M3 14v-3a9 9 0 0 1 18 0v3"/></svg>`
  },
  {
    id: "prod-2",
    name: "Smart Fitness Watch",
    price: 89.50,
    category: "Electronics",
    description: "Track steps, heart rate, sleep, and workouts with sleek HD touchscreen display.",
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="7" width="12" height="10" rx="3"/><polyline points="12 9 12 12 13.5 13.5"/><path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"/><path d="M9 17v3a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-3"/></svg>`
  },
  {
    id: "prod-3",
    name: "RGB Mechanical Keyboard",
    price: 74.99,
    category: "Electronics",
    description: "Customizable hot-swappable mechanical keyboard with vibrant RGB lighting.",
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01M8 16h8"/></svg>`
  },
  {
    id: "prod-4",
    name: "Ergonomic Desk Chair",
    price: 199.99,
    category: "Home & Office",
    description: "Breathable mesh chair with adjustable lumbar support and 3D armrests.",
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 11V6a4 4 0 0 1 8 0v5"/><path d="M5 11h14v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-4z"/><path d="M12 17v4M8 21h8"/></svg>`
  },
  {
    id: "prod-5",
    name: "Stainless Steel Espresso Maker",
    price: 49.99,
    category: "Home & Office",
    description: "Brew rich Italian espresso at home with quick-heating stovetop maker.",
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg>`
  },
  {
    id: "prod-6",
    name: "Minimalist Leather Backpack",
    price: 64.95,
    category: "Accessories",
    description: "Water-resistant vegan leather backpack with padded 15.6-inch laptop sleeve.",
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 20h12a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z"/><path d="M9 6V4a3 3 0 0 1 6 0v2"/><path d="M9 10h6"/></svg>`
  },
  {
    id: "prod-7",
    name: "Pro Cushion Running Shoes",
    price: 110.00,
    category: "Accessories",
    description: "Lightweight breathable sneakers designed for maximum comfort and durability.",
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 17l3-7 5 2 4-5 6 3v7H2z"/><path d="M2 17h20"/></svg>`
  },
  {
    id: "prod-8",
    name: "LED Smart Desk Lamp",
    price: 34.99,
    category: "Home & Office",
    description: "Dimmable eye-caring LED lamp with wireless charging pad and timer function.",
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21h6M12 21v-7"/><path d="M8 8a4 4 0 1 1 8 0c0 2.2-1.5 3.5-3 5h-2c-1.5-1.5-3-2.8-3-5z"/></svg>`
  },
  {
    id: "prod-9",
    name: "Portable Bluetooth Speaker",
    price: 45.00,
    category: "Electronics",
    description: "IPX7 waterproof wireless speaker delivering deep bass and 12h playtime.",
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><circle cx="12" cy="14" r="4"/><line x1="12" y1="6" x2="12.01" y2="6"/></svg>`
  }
];
