
console.log("ShopEase JavaScript imefunguka!");

document.addEventListener("DOMContentLoaded", function () {
  console.log(
    "Product list:",
    document.getElementById("product-list")
  );
});

"use strict";

// =====================================
// ShopEase - Demo Online Store
// Currency: Tanzanian Shillings (TSh)
// =====================================

// 1. SAMPLE PRODUCTS
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 45000,
    emoji: "🎧",
    description: "Enjoy clear sound every day."
  },
  {
    id: 2,
    name: "Classic Wristwatch",
    price: 35000,
    emoji: "⌚",
    description: "A simple and stylish watch."
  },
  {
    id: 3,
    name: "Sports Sneakers",
    price: 65000,
    emoji: "👟",
    description: "Comfortable shoes for daily wear."
  },
  {
    id: 4,
    name: "Smartphone",
    price: 280000,
    emoji: "📱",
    description: "A smart companion for your day."
  },
  {
    id: 5,
    name: "Laptop Backpack",
    price: 40000,
    emoji: "🎒",
    description: "Carry your essentials with ease."
  },
  {
    id: 6,
    name: "Wireless Speaker",
    price: 55000,
    emoji: "🔊",
    description: "Bring your favorite music to life."
  }
];

// 2. SHOPPING CART
// Each entry contains a product ID and quantity.
const cart = [];

// 3. FORMAT PRICES IN TSH
function formatPrice(amount) {
  return "TSh " + amount.toLocaleString("en-TZ");
}

// 4. DISPLAY PRODUCTS
function renderProducts() {
  const productList = document.getElementById("product-list");

  productList.innerHTML = products.map(product => `
    <article class="product-card">
      <div
        class="product-image"
        role="img"
        aria-label="${product.name}"
      >
        ${product.emoji}
      </div>

      <h3>${product.name}</h3>

      <p>${product.description}</p>

      <p class="price">${formatPrice(product.price)}</p>

      <button
        type="button"
        data-add="${product.id}"
        aria-label="Add ${product.name} to cart"
      >
        Add to Cart
      </button>
    </article>
  `).join("");
}

// 5. ADD PRODUCT TO CART
function addToCart(productId) {
  const product = products.find(item => item.id === productId);

  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: productId,
      quantity: 1
    });
  }

  renderCart();

  alert(product.name + " added to your cart!");
}

// 6. CHANGE PRODUCT QUANTITY
function changeQuantity(productId, change) {
  const item = cart.find(item => item.id === productId);

  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  renderCart();
}

// 7. REMOVE PRODUCT FROM CART
function removeFromCart(productId) {
  const index = cart.findIndex(item => item.id === productId);

  if (index !== -1) {
    cart.splice(index, 1);
  }

  renderCart();
}

// 8. DISPLAY CART AND CALCULATE TOTAL
function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");

  // Total number of individual units in cart
  const totalQuantity = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // Calculate the price of all cart items
  const totalPrice = cart.reduce((sum, item) => {
    const product = products.find(
      product => product.id === item.id
    );

    return sum + product.price * item.quantity;
  }, 0);

  cartCount.textContent = totalQuantity;
  cartTotal.textContent = formatPrice(totalPrice);

  if (cart.length === 0) {
    cartItems.textContent = "Your cart is empty.";
    return;
  }

  cartItems.innerHTML = cart.map(item => {
    const product = products.find(
      product => product.id === item.id
    );

    return `
      <div class="cart-item">
        <div>
          <strong>${product.name}</strong>
          <p>${formatPrice(product.price)} each</p>
          <p>Subtotal: ${formatPrice(
            product.price * item.quantity
          )}</p>
        </div>

        <div class="quantity-controls">
          <button
            type="button"
            data-minus="${product.id}"
            aria-label="Decrease ${product.name} quantity"
          >−</button>

          <span>${item.quantity}</span>

          <button
            type="button"
            data-plus="${product.id}"
            aria-label="Increase ${product.name} quantity"
          >+</button>

          <button
            type="button"
            data-remove="${product.id}"
            aria-label="Remove ${product.name}"
          >Remove</button>
        </div>
      </div>
    `;
  }).join("");
}

// 9. HANDLE BUTTON CLICKS
// Event delegation works for buttons created dynamically.
document.addEventListener("click", function(event) {
  const button = event.target.closest("button");

  if (!button) return;

  if (button.dataset.add) {
    addToCart(Number(button.dataset.add));
  }

  if (button.dataset.plus) {
    changeQuantity(Number(button.dataset.plus), 1);
  }

  if (button.dataset.minus) {
    changeQuantity(Number(button.dataset.minus), -1);
  }

  if (button.dataset.remove) {
    removeFromCart(Number(button.dataset.remove));
  }

  if (button.id === "cart-button") {
    document.querySelector(".cart-section")
      .scrollIntoView({ behavior: "smooth" });
  }
});

// 10. START THE STORE
renderProducts();
renderCart();

console.log("ShopEase is ready!");
