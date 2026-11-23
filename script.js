
const STORE = {
  name: "CENT AFFAIR",
  whatsapp: "233249964486",
  currency: "GH₵"
};

const products = [
  { id: 1, name: "Oud Elegance", category: "Men", price: 350, size: "100ml", badge: "BESTSELLER", description: "Rich oud, warm woods and amber.", notes: "Oud, Amber, Sandalwood", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=700&q=85" },
  { id: 2, name: "Rose Velvet", category: "Women", price: 280, size: "100ml", badge: "POPULAR", description: "A romantic fragrance with a soft floral finish.", notes: "Rose, Vanilla, Musk", image: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=700&q=85" },
  { id: 3, name: "Midnight Essence", category: "Men", price: 320, size: "100ml", badge: "NEW", description: "A confident scent with a mysterious character.", notes: "Spices, Cedarwood, Amber", image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=700&q=85" },
  { id: 4, name: "Golden Aura", category: "Women", price: 390, size: "100ml", badge: "LUXURY", description: "An elegant fragrance with a warm golden touch.", notes: "Jasmine, Vanilla, Amber", image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=700&q=85" },
  { id: 5, name: "Royal Oud", category: "Unisex", price: 420, size: "100ml", badge: "PREMIUM", description: "Deep woody notes for an unforgettable impression.", notes: "Oud, Leather, Musk", image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=700&q=85" },
  { id: 6, name: "Bloom Desire", category: "Women", price: 250, size: "100ml", badge: "FAVOURITE", description: "Fresh florals with a beautiful feminine finish.", notes: "Peony, Rose, White Musk", image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=700&q=85" },
  { id: 7, name: "Black Imperial", category: "Men", price: 380, size: "100ml", badge: "EXCLUSIVE", description: "Bold and sophisticated with a powerful trail.", notes: "Black Pepper, Leather, Woods", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=700&q=85" },
  { id: 8, name: "Vanilla Dreams", category: "Women", price: 270, size: "100ml", badge: "POPULAR", description: "A creamy, comforting and beautifully sweet scent.", notes: "Vanilla, Caramel, Musk", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=700&q=85" },
  { id: 9, name: "Amber Nights", category: "Unisex", price: 330, size: "100ml", badge: "SIGNATURE", description: "Warm amber and spice create an elegant presence.", notes: "Amber, Cinnamon, Patchouli", image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=700&q=85" },
  { id: 10, name: "Ocean Mist", category: "Men", price: 240, size: "100ml", badge: "FRESH", description: "A refreshing fragrance inspired by the ocean.", notes: "Marine Notes, Citrus, Musk", image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=700&q=85" },
  { id: 11, name: "Silk Blossom", category: "Women", price: 310, size: "100ml", badge: "ELEGANT", description: "Delicate florals with a soft, sensual base.", notes: "White Flowers, Rose, Sandalwood", image: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=700&q=85" },
  { id: 12, name: "Noir Essence", category: "Unisex", price: 360, size: "100ml", badge: "PREMIUM", description: "A balanced fragrance for every occasion.", notes: "Vetiver, Amber, Musk", image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=700&q=85" },
  { id: 13, name: "Royal Musk", category: "Unisex", price: 290, size: "100ml", badge: "POPULAR", description: "Clean, smooth musk with a luxurious finish.", notes: "White Musk, Sandalwood, Amber", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=700&q=85" },
  { id: 14, name: "Velvet Oud", category: "Men", price: 410, size: "100ml", badge: "LUXURY", description: "A rich oriental scent with exceptional depth.", notes: "Oud, Saffron, Leather", image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=700&q=85" },
  { id: 15, name: "Sweet Temptation", category: "Women", price: 260, size: "100ml", badge: "NEW", description: "A playful fragrance with a sweet character.", notes: "Pear, Vanilla, Tonka Bean", image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=700&q=85" },
  { id: 16, name: "The Signature", category: "Unisex", price: 450, size: "100ml", badge: "EXCLUSIVE", description: "A distinctive blend for memorable moments.", notes: "Bergamot, Amber, Cedarwood", image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=700&q=85" }
];

const CART_KEY = "cent-affair-new-cart";

let cart = loadCart();
let currentFilter = "All";

const $ = id => document.getElementById(id);
const productGrid = $("productGrid");
const searchInput = $("searchInput");
const filterButtons = $("filterButtons");

function money(value) {
  return `${STORE.currency}${Number(value).toFixed(2)}`;
}

function getProduct(id) {
  return products.find(product => product.id === Number(id));
}

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_KEY));
    if (!Array.isArray(saved)) return [];

    return saved.filter(item =>
      getProduct(item.id) &&
      Number.isInteger(Number(item.quantity)) &&
      Number(item.quantity) > 0
    ).map(item => ({
      id: Number(item.id),
      quantity: Number(item.quantity)
    }));
  } catch {
    return [];
  }
}

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addImageFallback(container, name) {
  const placeholder = document.createElement("div");
  placeholder.style.cssText = `
    width:100%;
    height:100%;
    min-height:180px;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    background:linear-gradient(145deg,#eee6d8,#faf7f0);
    color:#bd9b62;
    font-family:Georgia,serif;
    letter-spacing:3px;
    text-align:center;
  `;

  const brand = document.createElement("span");
  brand.textContent = "CENT AFFAIR";
  brand.style.fontSize = "19px";

  const caption = document.createElement("small");
  caption.textContent = name.toUpperCase();
  caption.style.cssText = "font-size:9px;letter-spacing:2px;margin-top:10px;color:#827c70";

  placeholder.append(brand, caption);
  container.replaceChildren(placeholder);
}

function watchImages(container) {
  container.querySelectorAll("img[data-product-image]").forEach(img => {
    img.addEventListener("error", () => {
      const name = img.dataset.name || "Fragrance";
      addImageFallback(img.parentElement, name);
    }, { once: true });
  });
}

// PRODUCT CATALOGUE

function renderProducts() {
  const term = searchInput.value.trim().toLowerCase();

  const filtered = products.filter(product => {
    const categoryMatch =
      currentFilter === "All" || product.category === currentFilter;

    const searchMatch =
      `${product.name} ${product.description} ${product.notes}`
        .toLowerCase().includes(term);

    return categoryMatch && searchMatch;
  });

  if (!filtered.length) {
    productGrid.innerHTML = `
      <div class="empty-products">
        <h3>No fragrances found</h3>
        <p>Try another search or category.</p>
      </div>`;
    return;
  }

  productGrid.innerHTML = filtered.map(product => `
    <article class="product-card">
      <div class="product-image-wrap">
        <img
          class="product-image"
          data-product-image
          data-name="${product.name}"
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
        >
        <span class="product-badge">${product.badge}</span>
        <button class="quick-view" data-action="view" data-id="${product.id}">
          QUICK VIEW
        </button>
      </div>

      <div class="product-info">
        <span class="product-category">${product.category} · ${product.size}</span>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-bottom">
          <span class="product-price">${money(product.price)}</span>
          <button class="add-button" data-action="add" data-id="${product.id}">
            ADD +
          </button>
        </div>
      </div>
    </article>
  `).join("");

  watchImages(productGrid);
}

// SEARCH AND FILTERS

searchInput.addEventListener("input", renderProducts);

filterButtons.addEventListener("click", event => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;

  currentFilter = button.dataset.filter;

  filterButtons.querySelectorAll(".filter-btn").forEach(item => {
    item.classList.toggle("active", item === button);
  });

  renderProducts();
});

// SHOPPING BAG

function addToCart(id) {
  const product = getProduct(id);
  if (!product) return;

  const existing = cart.find(item => item.id === product.id);

  if (existing) existing.quantity++;
  else cart.push({ id: product.id, quantity: 1 });

  saveCart();
  renderCart();
  openCart();
}

function changeQuantity(id, amount) {
  const item = cart.find(item => item.id === Number(id));
  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter(item => item.id !== Number(id));
  }

  saveCart();
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== Number(id));
  saveCart();
  renderCart();
}

function calculateTotal() {
  return cart.reduce((total, item) => {
    const product = getProduct(item.id);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);
}

function renderCart() {
  $("cartCount").textContent =
    cart.reduce((total, item) => total + item.quantity, 0);

  $("cartTotal").textContent = money(calculateTotal());

  const container = $("cartItems");

  if (!cart.length) {
    container.innerHTML = `
      <div class="cart-empty">
        <h3>Your bag is waiting.</h3>
        <p>Discover something beautiful and add it here.</p>
      </div>`;
    return;
  }

  container.innerHTML = cart.map(item => {
    const product = getProduct(item.id);
    if (!product) return "";

    return `
      <div class="cart-item">
        <img
          data-product-image
          data-name="${product.name}"
          src="${product.image}"
          alt="${product.name}"
        >

        <div>
          <h3>${product.name}</h3>
          <p>${money(product.price)} · ${product.size}</p>

          <div class="quantity-controls">
            <button data-action="decrease" data-id="${product.id}">−</button>
            <span>${item.quantity}</span>
            <button data-action="increase" data-id="${product.id}">+</button>
          </div>

          <button class="remove-item" data-action="remove" data-id="${product.id}">
            REMOVE
          </button>
        </div>

        <strong>${money(product.price * item.quantity)}</strong>
      </div>`;
  }).join("");

  watchImages(container);
}

// CART DRAWER

const cartDrawer = $("cartDrawer");
const cartOverlay = $("cartOverlay");

function openCart() {
  cartDrawer.classList.add("open");
  cartOverlay.classList.add("open");
  document.body.classList.add("no-scroll");
}

function closeCart() {
  cartDrawer.classList.remove("open");
  cartOverlay.classList.remove("open");
  document.body.classList.remove("no-scroll");
}

$("cartButton").addEventListener("click", openCart);
$("closeCart").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

// PRODUCT QUICK VIEW

const productModal = $("productModal");
const modalContent = $("modalContent");

function openProductModal(id) {
  const product = getProduct(id);
  if (!product) return;

  modalContent.innerHTML = `
    <div class="modal-product-layout">
      <img
        data-product-image
        data-name="${product.name}"
        src="${product.image}"
        alt="${product.name}"
      >

      <div>
        <span class="product-category">${product.category} · ${product.size}</span>
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p><strong>Fragrance notes:</strong> ${product.notes}</p>
        <p class="modal-price">${money(product.price)}</p>
        <button class="btn btn-gold" data-action="modal-add" data-id="${product.id}">
          ADD TO BAG
        </button>
      </div>
    </div>`;

  watchImages(modalContent);
  productModal.classList.add("open");
  document.body.classList.add("no-scroll");
}

function closeProductModal() {
  productModal.classList.remove("open");
  document.body.classList.remove("no-scroll");
}

$("closeModal").addEventListener("click", closeProductModal);

productModal.addEventListener("click", event => {
  if (event.target === productModal) closeProductModal();
});

// ALL PRODUCT AND CART BUTTONS

document.addEventListener("click", event => {
  const button = event.target.closest("[data-action]");
  if (!button) return;

  const id = Number(button.dataset.id);

  switch (button.dataset.action) {
    case "add":
      addToCart(id);
      break;
    case "view":
      openProductModal(id);
      break;
    case "increase":
      changeQuantity(id, 1);
      break;
    case "decrease":
      changeQuantity(id, -1);
      break;
    case "remove":
      removeFromCart(id);
      break;
    case "modal-add":
      closeProductModal();
      addToCart(id);
      break;
  }
});

// WHATSAPP CHECKOUT

$("checkoutButton").addEventListener("click", () => {
  if (!cart.length) {
    alert("Your shopping bag is empty. Please add a fragrance first.");
    return;
  }

  const lines = cart.map(item => {
    const product = getProduct(item.id);
    return `${product.name} (${product.size}) x ${item.quantity} = ${money(product.price * item.quantity)}`;
  });

  const message = [
    `Hello ${STORE.name}!`,
    "",
    "I would like to place an order:",
    "",
    ...lines,
    "",
    `Subtotal: ${money(calculateTotal())}`,
    "",
    "Please confirm availability and delivery details.",
    "Thank you!"
  ].join("\n");

  const url =
    `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank", "noopener,noreferrer");
});

// MOBILE NAVIGATION

const menuToggle = $("menuToggle");
const mainNav = $("mainNav");

menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuToggle.textContent = open ? "✕" : "☰";
  menuToggle.setAttribute("aria-expanded", String(open));
});

mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// CLOSE PANELS WITH ESCAPE

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeCart();
    closeProductModal();
    mainNav.classList.remove("open");
    menuToggle.textContent = "☰";
  }
});

// FOOTER YEAR AND INITIAL DISPLAY

$("year").textContent = new Date().getFullYear();

renderProducts();
renderCart();
