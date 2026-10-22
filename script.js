
const products = [
  {
    id: 1,
    name: "Everyday Essential T-Shirt",
    category: "STYLE & APPAREL",
    description: "A versatile everyday style for casual outfits.",
    price: 25000,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=85",
    alt: "Casual T-shirt product photography"
  },
  {
    id: 2,
    name: "Wireless Headphones",
    category: "TECH & ACCESSORIES",
    description: "Explore audio accessories for work and daily life.",
    price: 45000,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=85",
    alt: "Headphones product photography"
  },
  {
    id: 3,
    name: "Everyday Travel Backpack",
    category: "TRAVEL & LIFESTYLE",
    description: "A practical bag concept for everyday essentials.",
    price: 60000,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=85",
    alt: "Backpack product photography"
  }
];

const productList = document.getElementById("product-list");
const cartButton = document.getElementById("cart-button");
const cartCount = document.getElementById("cart-count");
const cartPanel = document.getElementById("cart-panel");
const cartBackdrop = document.getElementById("cart-backdrop");
const closeCartButton = document.getElementById("close-cart");
const continueShoppingButton = document.getElementById("continue-shopping");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

const cart = [];

function formatPrice(price) {
  return "TSh " + new Intl.NumberFormat("en-TZ", {
    maximumFractionDigits: 0
  }).format(price);
}

function renderProducts() {
  productList.innerHTML = products.map(product => `
    <article class="product-card">
      <div class="product-image">
        <img
          src="${product.image}"
          alt="${product.alt}"
          loading="lazy"
          onerror="this.style.display='none'; this.parentElement.classList.add('image-failed');"
        >
      </div>

      <div class="product-info">
        <p class="product-category">${product.category}</p>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p class="product-price">${formatPrice(product.price)}</p>

        <button
          class="add-to-cart"
          type="button"
          data-product-id="${product.id}"
        >
          Add to demo cart +
        </button>
      </div>
    </article>
  `).join("");
}

function addToCart(productId) {
  const product = products.find(item => item.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
  openCart();
}

function changeQuantity(productId, change) {
  const item = cart.find(product => product.id === productId);
  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    const index = cart.findIndex(product => product.id === productId);
    cart.splice(index, 1);
  }

  renderCart();
}

function renderCart() {
  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity, 0
  );

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  cartCount.textContent = totalItems;
  cartTotal.textContent = formatPrice(totalPrice);

  if (cart.length === 0) {
    cartItemsContainer.textContent = "Your demo cart is empty.";
    return;
  }

  cartItemsContainer.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div>
        <h4>${item.name}</h4>
        <p>${formatPrice(item.price)} each</p>
        <p>Quantity: ${item.quantity}</p>
      </div>
      <div>
        <button
          type="button"
          data-action="decrease"
          data-product-id="${item.id}"
          aria-label="Decrease quantity"
        >−</button>
        <button
          type="button"
          data-action="increase"
          data-product-id="${item.id}"
          aria-label="Increase quantity"
        >+</button>
      </div>
    </div>
  `).join("");
}

function openCart() {
  cartPanel.hidden = false;
  cartBackdrop.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeCart() {
  cartPanel.hidden = true;
  cartBackdrop.hidden = true;
  document.body.style.overflow = "";
}

productList.addEventListener("click", event => {
  const button = event.target.closest("[data-product-id]");
  if (!button) return;

  addToCart(Number(button.dataset.productId));
});

cartItemsContainer.addEventListener("click", event => {
  const button = event.target.closest("[data-action]");
  if (!button) return;

  const productId = Number(button.dataset.productId);

  if (button.dataset.action === "increase") {
    changeQuantity(productId, 1);
  } else if (button.dataset.action === "decrease") {
    changeQuantity(productId, -1);
  }
});

cartButton.addEventListener("click", openCart);
closeCartButton.addEventListener("click", closeCart);
continueShoppingButton.addEventListener("click", closeCart);
cartBackdrop.addEventListener("click", closeCart);

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeCart();
});

renderProducts();
renderCart();
